# TEMPO landing — Audit bản đang live tại v2joy.life

- Ngày: 2026-09-08
- Bản kiểm tra: commit `2ab8a38` (production route `/` → `TempoRestoreV2Staging mode="production"`)
- Cách đo: tải HTML production kèm cache-bypass, tải toàn bộ 62 asset qua `curl -L` từ chính domain live, đọc source, chạy `pnpm test` + `pnpm build` local.
- Phạm vi: hiệu năng tải, luồng chuyển đổi COD, tracking, SEO, sức khỏe code. **Chưa** kiểm: A/B copy, nội dung pháp lý, dữ liệu đơn hàng thật.

---

## P0 — Trọng lượng trang: 68 MB

Đo thật trên domain live, toàn bộ asset mà page tham chiếu:

| Nhóm | Số file | Dung lượng |
|---|---:|---:|
| Ảnh **chưa** tối ưu (không WebP, không srcset) | 29 | **45.02 MB** |
| Ảnh đã tối ưu (có srcset WebP) — phần WebP thật sự phục vụ | 7 | 0.89 MB |
| PNG fallback của nhóm đã tối ưu (không trình duyệt nào tải) | 7 | 13.75 MB |
| Video nền `.mp4` | 5 | 8.26 MB |
| **Tổng** | **62** | **67.93 MB** |

Người dùng cuộn hết trang tải khoảng **54 MB** (45 MB ảnh chưa tối ưu + 8.3 MB video + 0.9 MB WebP).

Nguyên nhân: chỉ 7 ảnh trong bộ `01-…07-` được dựng biến thể `-480/-960.webp`. 29 ảnh còn lại — gồm **toàn bộ 10 ảnh phản hồi trong gallery**, 3 ảnh packaging, 5 ảnh visual diary, 5 poster video, ảnh sản phẩm — vẫn là PNG gốc ~1.9–2.5 MB mỗi file, kích thước thật 1254×1254, hiển thị ở khung ~400px.

Gallery phản hồi nằm **ngay trước form COD**, dùng chính file PNG 2 MB làm thumbnail (`InfographicGallery` → `LegacyImage src={info.image}`, cùng file với lightbox). Người dùng phải nuốt ~19 MB thumbnail trước khi tới được ô đặt hàng.

Ảnh có `loading="lazy"` nên không chặn màn hình đầu — nhưng đây là landing storytelling dài, traffic quảng cáo bắt buộc phải cuộn để đến form.

Đã thử fix rẻ: CDN **không** hỗ trợ resize qua query param (`?x-oss-process=…`, `?width=` đều trả nguyên file 2.3 MB). Phải tự sinh biến thể WebP và đưa vào repo.

## P0 — 367 KB JS runtime của Manus nhúng thẳng vào HTML production

`dist/public/index.html` nặng **371.81 KB** (gzip 107.23 KB), trong đó **367.09 KB là một inline script `id="manus-runtime"`** — runtime debug/preview của Manus, chạy trên main thread ở mọi lượt truy cập thật.

Cộng thêm: header HTML là `Cache-Control: no-cache, no-store, must-revalidate` → mỗi lượt vào lại tải lại trọn 107 KB này.

Để so sánh, toàn bộ bundle ứng dụng thật chỉ ~154 KB gzip. Runtime debug đang chiếm ~70% chi phí parse của tài liệu gốc.

## P1 — Mỗi asset tốn thêm một round-trip không cache được

`/manus-storage/*` trả **307 redirect** sang CloudFront với URL ký tên có `Expires`, và bản thân redirect mang `Cache-Control: no-store`. Nghĩa là 62 asset = 62 lượt hỏi origin Manus không bao giờ được cache, trước khi byte đầu tiên của ảnh được tải.

## P1 — Ép đồng ý nhận marketing mới cho đặt hàng

Trong form COD bước 2:

```
<input type="checkbox" checked={form.marketingConsent} … required />
Tôi đồng ý nhận thông tin cập nhật sản phẩm và ưu đãi từ V2JOY.
```

Checkbox marketing đang để `required` — không tick thì không submit được đơn.

Server **không** yêu cầu điều này: `server/orders.ts:20` khai `marketingConsent: z.boolean().optional().default(false)`. Ràng buộc thuần do UI đặt ra.

Hai hệ quả: thêm một rào bắt buộc ngay bước cuối phễu, và đồng ý marketing bị ép buộc thì không phải đồng ý tự nguyện theo Nghị định 13/2023 — vốn đòi hỏi sự đồng ý cho mục đích marketing phải tách rời và tự nguyện. Checkbox `orderConsent` (đồng ý xử lý đơn) là cái duy nhất chính đáng để bắt buộc.

## P1 — Ba sự kiện Pixel gửi sai API

`trackFunnel` đẩy mọi sự kiện qua `window.fbq("track", event, …)`, kể cả `ViewInfographic`, `ViewRitual`, `ViewFeedback`.

`fbq('track', …)` chỉ dành cho danh sách sự kiện chuẩn của Meta. Sự kiện tự đặt tên phải đi qua `fbq('trackCustom', …)`. Ba sự kiện trên hiện không đăng ký đáng tin cậy làm custom conversion và bị Pixel Helper cảnh báo.

`ViewContent`, `InitiateCheckout`, `Lead` là sự kiện chuẩn nên vẫn đúng.

## P2 — JSON-LD dùng đường dẫn ảnh tương đối

`productJsonLd.image` truyền `/manus-storage/…` (tương đối). Schema.org yêu cầu URL tuyệt đối; Google bỏ qua ảnh khai kiểu này trong rich result.

## P2 — Test suite không tự chạy được nếu thiếu env

`pnpm test` fail 1 test (`metaPixel.config.test.ts`) trên máy sạch vì thiếu `VITE_META_PIXEL_ID`. Không phải lỗi sản phẩm, nhưng repo không có `.env.example` nên người mới clone luôn gặp đỏ. Đã tạo `.env` local (đã nằm trong `.gitignore`); sau đó **56 pass / 1 skipped**, `pnpm build` thành công.

---

## Những thứ đang làm đúng

- Video nền có IntersectionObserver hai tầng: preload trước 700px, phát/dừng theo viewport, `preload="metadata"` cho video không phải hero, có retry khi lỗi.
- Poster hero là WebP 53 KB — LCP của màn hình đầu không phải là vấn đề.
- Phễu CTA đầy đủ: sticky header, sticky bar mobile, CTA ở hero / sản phẩm / cuối trang, tất cả cuộn về form.
- Form COD hai bước, `autoComplete` và `inputMode="tel"` đúng chuẩn, `data-clarity-mask` che dữ liệu cá nhân khỏi session replay.
- Ranh giới tracking đúng chủ ý: `Lead` khi tạo đơn, `QualifiedLead`/`Purchase` để dành cho sau xác nhận/giao hàng.
- Tồn kho là số thật lấy từ server, không phải urgency giả.
- `robots.txt` chặn `/staging/`.

---

## Đề xuất thứ tự xử lý

1. **Sinh WebP cho 29 ảnh chưa tối ưu** (kèm biến thể 480/960) và đưa vào `client/public/`, bỏ luôn 13.75 MB PNG fallback vô dụng. Ước tính: 54 MB → dưới 6 MB, và tránh được cả 307 redirect.
2. **Gỡ inline runtime Manus khỏi bundle production** — cần xác minh xem có tắt được từ `vite-plugin-manus-runtime` khi `NODE_ENV=production` không.
3. **Bỏ `required` khỏi checkbox marketing.**
4. **Đổi 3 sự kiện tự đặt tên sang `trackCustom`.**
5. JSON-LD dùng URL tuyệt đối; thêm `.env.example`.
