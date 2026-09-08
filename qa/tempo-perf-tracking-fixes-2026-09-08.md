# TEMPO — Sửa hiệu năng tải và ranh giới Purchase

- Ngày: 2026-09-08
- Nền: [audit cùng ngày](./tempo-landing-audit-2026-09-08.md)
- Kiểm chứng: `pnpm check` sạch, `pnpm test` 84 passed / 1 skipped, `pnpm build` thành công.
- **Chưa deploy.** Owner sync vào Manus và tự bấm publish.

---

## 1. Vì sao đơn COD không thành chuyển đổi

Truy tới tận gốc bằng dữ liệu tài khoản quảng cáo, không suy đoán:

| Bằng chứng | Kết quả |
|---|---|
| `orders.status` trên production | `claimed: 3` — server ghi nhận đơn bình thường |
| `promoted_object` của ad set `120255536666540562` | `custom_event_type: PURCHASE`, pixel `1955804598438163` |
| Toàn bộ `server/` | Không có một dòng CAPI nào — không `graph.facebook.com`, không access token |
| Dataset Quality của pixel | Nhận `PageView`, `ViewContent`, `InitiateCheckout`, `Lead`, `Scroll50`, `FormStart` — **không có `Purchase`** |

Chiến dịch đếm và tối ưu theo `Purchase`, còn landing chưa từng gửi `Purchase` từ bất kỳ đâu. Đơn thật sinh ra `Lead`, nhưng `Lead` không phải sự kiện chiến dịch đang đếm. Suốt 30 ngày thuật toán Meta không có tín hiệu chuyển đổi nào để học.

Dataset cũng xác nhận `ViewInfographic` / `ViewRitual` / `ViewFeedback` chưa bao giờ tới nơi: chúng được gửi qua `fbq('track')` vốn chỉ nhận tên chuẩn của Meta.

### Tỷ lệ mount 28%

Insights 30 ngày, chi 337.274đ / 400 click: `landing_page_view` = 297, `ViewContent` = 84.

`PageView` nằm trong HTML thô nên bắn ngay khi tải; `ViewContent` chỉ bắn sau khi React mount. 213/297 lượt vào trả tiền đã rời đi trước khi trang kịp hiện nội dung.

## 2. Đã sửa

### Trọng lượng trang: 54 MB → ~11,6 MB

25 ảnh PNG ~2 MB (gallery phản hồi, packaging, nghi thức, visual diary, poster video) được chuyển sang WebP ba biến thể 480w/960w/gốc, phục vụ trực tiếp từ `client/public/media` thay vì đi qua 307 redirect của Manus storage.

- Ảnh: **45,0 MB → 2,3 MB**
- Chất lượng: q90 cho bản gốc để chữ tiếng Việt trong lightbox vẫn đọc rõ; kiểm tra mắt thường trên `tempo-use-steps-960.webp` (2157 KB → 62 KB) thấy nét và đủ dấu.
- Sinh lại bằng `python scripts/optimize-media.py <thư-mục-ảnh-gốc>`.
- Bảy asset vốn đã có srcset còn để PNG ~2 MB ở `<img src>` làm fallback; đã trỏ về chính bản WebP nên không còn quả bom 2 MB nào chờ sẵn.
- `LegacyImage` (chỉ nhận URL trần, không srcset) đã bị gỡ; toàn trang dùng chung `ResponsiveImage`.

Video vẫn 8,26 MB và giờ chiếm 71% trọng lượng còn lại — chưa đụng tới trong đợt này.

### HTML: 371,88 kB → 4,73 kB (gzip 107,25 → 2,07 kB)

`vitePluginManusRuntime` nhúng inline ~367 kB runtime debug vào `index.html` và không có tuỳ chọn tắt. Nó chỉ phục vụ việc soạn/preview bên trong Manus, nhưng đang chạy trên main thread ở mọi lượt truy cập thật — mà HTML lại được trả kèm `no-store` nên tải lại mỗi lần.

Đã gate theo `command === "build"` trong `vite.config.ts`: dev server vẫn nạp (Manus preview không đổi), bản build gửi cho khách thì không.

Chọn `command` thay vì `NODE_ENV` (cách `vitePluginManusDebugCollector` đang dùng) để runtime không quay lại chỉ vì pipeline deploy quên set biến môi trường.

**Cần theo dõi sau khi publish:** nếu tính năng preview/inspect của Manus trên site đã publish có dựa vào runtime này thì nó sẽ mất. Không ảnh hưởng gì tới landing, COD, tồn kho hay tracking.

### Purchase qua Conversions API

Giữ nguyên ranh giới đã công bố trên trang — COD chưa thu tiền lúc đặt nên không bắn Purchase ở bước đó. Purchase giờ được báo từ server khi đơn đã giao:

- `server/metaCapi.ts` — dựng và gửi sự kiện, băm SHA-256 mọi định danh cá nhân, `access_token` đi trong body chứ không đặt trên URL, lỗi mạng bị nuốt để không chặn thao tác đánh dấu giao.
- `event_id` suy ra từ mã đơn (`purchase-<orderNumber>`) nên gửi lại cùng một đơn không nhân đôi Purchase bên Meta.
- `orders.markDelivered` (adminProcedure) đặt `status = delivered` và `purchase_reported_at` trong một câu UPDATE có điều kiện `purchase_reported_at is null` — đó là chốt chặn duy nhất quyết định ai được gửi Purchase, nên hai lần bấm đồng thời chỉ sinh một sự kiện.
- Migration `drizzle/0006_moaning_marvel_zombies.sql` thêm `fbp`, `fbc`, `client_user_agent`, `client_ip_address`, `purchase_reported_at`. Chỉ thêm cột, không đụng dữ liệu cũ.
- Client đọc `_fbp`/`_fbc` **lúc gửi đơn** chứ không lúc mount (Pixel nạp bất đồng bộ, mount xong cookie thường chưa có). Nếu `_fbc` chưa được đặt mà URL có `fbclid` thì tự dựng theo đúng định dạng `fb.1.<timestamp>.<fbclid>` — Dataset Quality đang cho thấy `Lead` chỉ có fbc ở 50% sự kiện.
- IP và User-Agent lấy từ header request (`cf-connecting-ip`, rồi `x-forwarded-for`), không tin dữ liệu client tự khai.

**Cần owner cấp:** `META_CAPI_ACCESS_TOKEN` trong biến môi trường Manus. Thiếu token thì `markDelivered` vẫn cập nhật đơn bình thường, chỉ bỏ qua bước báo Meta.

### Ba sửa lỗi nhỏ

- Bỏ `required` khỏi checkbox đồng ý nhận marketing. Server vốn khai `marketingConsent` là optional; ép tick vừa chặn phễu ở bước cuối, vừa khiến đồng ý marketing không còn là đồng ý tự nguyện theo Nghị định 13/2023. Checkbox đồng ý xử lý đơn vẫn bắt buộc.
- Sự kiện tự đặt tên chuyển sang `fbq('trackCustom')`.
- JSON-LD dùng URL ảnh tuyệt đối.
- Thêm `.env.example` — trước đó máy mới clone luôn đỏ test `metaPixel.config` vì thiếu `VITE_META_PIXEL_ID`.

## 3. Test đã thêm

| File | Bảo vệ điều gì |
|---|---|
| `client/src/config/tempoMedia.test.ts` | Đủ ba biến thể, mỗi biến thể trong ngân sách dung lượng, không có PNG Manus nào quay lại, mọi đường dẫn `/media/` đều có file thật |
| `client/src/config/buildPlugins.test.ts` | Gọi thẳng hàm config: build không có runtime debug, dev thì có |
| `server/metaCapi.test.ts` | Chuẩn hoá số điện thoại, băm, event_id ổn định, không lọt PII dạng đọc được, bỏ khoá rỗng, không đặt token trên URL, nuốt lỗi mạng |
| `server/orders.test.ts` | Nhận `_fbp`/`_fbc`, vẫn nhận đơn khi thiếu, thứ tự ưu tiên header IP, cắt UA cho vừa cột |
| `TempoRestoreV2Staging.test.ts` | Chỉ đồng ý xử lý đơn là bắt buộc; sự kiện tự đặt tên đi `trackCustom` |

`TempoUpgradeProduction.test.ts` có một assertion ghim nguyên văn lời gọi `fbq` cũ; đã cập nhật theo hành vi đã sửa, giữ nguyên ý định "COD không được tính là Purchase".

## 4. Việc còn lại

1. **Owner đổi cấu hình ad set.** Giữ `PURCHASE` nghĩa là tín hiệu chỉ về sau khi giao — chậm vài ngày và rất thưa, Meta sẽ học chậm. Đây là đánh đổi owner đã chọn có cân nhắc.
2. Cấp `META_CAPI_ACCESS_TOKEN` trong env của Manus.
3. Chưa có giao diện gọi `markDelivered`; hiện phải gọi qua tRPC bằng tài khoản admin.
4. Video 8,26 MB giờ là phần nặng nhất còn lại.
5. Chưa đo lại Lighthouse/`ViewContent` thực tế sau khi publish — cần kiểm lại tỷ lệ mount 28% có cải thiện không.
