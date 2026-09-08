# Runbook phát hành PR #1 lên v2joy.life

Áp dụng cho PR #1 `perf/media-weight-and-capi-purchase`.
Bối cảnh kỹ thuật: [audit](./tempo-landing-audit-2026-09-08.md) · [biên bản sửa](./tempo-perf-tracking-fixes-2026-09-08.md)

---

## ĐỌC TRƯỚC: thứ tự bắt buộc

**Chạy migration TRƯỚC khi publish.** Không phải sở thích, mà là bắt buộc.

`createTempoCodOrder` gọi `getTempoCodOrderByPhone` ngay thao tác DB đầu tiên, và Drizzle sinh câu
`select` liệt kê đủ mọi cột trong schema — gồm `fbp`, `fbc`, `client_user_agent`, `client_ip_address`,
`purchase_reported_at`. Nếu DB chưa có các cột đó, MySQL trả `Unknown column ... in 'field list'`
và **mọi đơn COD đều submit lỗi**. Trang vẫn tải bình thường, tồn kho vẫn hiển thị đúng (đọc từ bảng
`tempo_inventory` không đổi) — nên nhìn bề ngoài không phát hiện được.

Chiều ngược lại thì an toàn tuyệt đối: migration chỉ `ADD COLUMN` và mọi cột đều nullable, nên chạy
xong mà code cũ vẫn đang phục vụ cũng không sao — code cũ không hề biết tới các cột này.

Vậy nên: **migration trước, publish sau.** Giữa hai bước đó site vẫn chạy bình thường, không downtime.

---

## Bước 1 — Merge PR #1

```bash
gh pr merge 1 --squash --delete-branch
```

Hoặc bấm Merge trên https://github.com/haideman2025/tempo-ads-landing/pull/1

Merge chỉ cập nhật GitHub. **Không có gì lên v2joy.life ở bước này** — repo là bản export một chiều
từ Manus, mọi commit trên `main` đều do `Manus <dev-agent@manus.ai>` tạo.

## Bước 2 — Đưa code vào Manus

Đây là bước phụ thuộc vào Manus, không kiểm chứng được từ ngoài. Theo lịch sử commit thì dev-agent của
Manus có chạy `git`, `pnpm test`, `pnpm build` trong sandbox dự án, nên cách khả thi nhất là bảo nó tự kéo:

> Fetch branch `main` từ origin và merge vào workspace hiện tại. Sau đó chạy `pnpm install`
> (có file ảnh mới trong `client/public/media`), `pnpm check`, `pnpm test`, `pnpm build`.

Nếu Manus có sẵn tính năng sync/import từ GitHub thì dùng thẳng.

**Kiểm tra đã vào đủ chưa** — bốn thứ này phải có mặt trong workspace Manus:

```
client/public/media/            75 file .webp
client/src/config/tempoMedia.ts
server/metaCapi.ts
drizzle/0006_moaning_marvel_zombies.sql
```

Thiếu thư mục `client/public/media` thì toàn bộ ảnh landing sẽ vỡ. Đây là rủi ro thật vì đó là 75 file
nhị phân — cơ chế đồng bộ nào chỉ chuyển được văn bản sẽ bỏ sót chúng.

## Bước 3 — Chạy migration trên DB production

Kiểm tra trạng thái trước, đừng chạy mù:

```sql
-- Các cột mới đã có chưa? Kỳ vọng: 0 dòng.
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'tempo_cod_orders'
  AND COLUMN_NAME IN ('fbp','fbc','client_user_agent','client_ip_address','purchase_reported_at');

-- Drizzle có đang theo dõi migration không? Kỳ vọng: 6 dòng (0000..0005).
SELECT COUNT(*) FROM __drizzle_migrations;
```

**Nếu `__drizzle_migrations` có đúng 6 dòng** — dùng đường chính thức của dự án:

```bash
pnpm db:push
```

**Nếu bảng `__drizzle_migrations` không tồn tại** (schema từng được tạo bằng cách khác) thì `drizzle-kit
migrate` sẽ cố chạy lại từ `0000` và chết vì bảng đã tồn tại. Khi đó chạy tay 5 câu lệnh — chính là nội
dung file `drizzle/0006_moaning_marvel_zombies.sql`:

```sql
ALTER TABLE `tempo_cod_orders` ADD `fbp` varchar(255);
ALTER TABLE `tempo_cod_orders` ADD `fbc` varchar(255);
ALTER TABLE `tempo_cod_orders` ADD `client_user_agent` varchar(500);
ALTER TABLE `tempo_cod_orders` ADD `client_ip_address` varchar(64);
ALTER TABLE `tempo_cod_orders` ADD `purchase_reported_at` timestamp NULL;
```

Xác nhận lại bằng đúng câu SELECT ở trên — lần này phải ra **5 dòng**.

## Bước 4 — Đặt biến môi trường trong Manus

Thêm vào phần biến môi trường / secrets của dự án Manus:

```
META_CAPI_ACCESS_TOKEN=<token đã cấp>
```

Token là loại SYSTEM_USER, không hết hạn, đã kiểm chứng ghi được vào dataset `1955804598438163`.

Thiếu biến này thì `markDelivered` vẫn cập nhật đơn bình thường, chỉ lặng lẽ bỏ qua bước báo Meta —
`sendMetaCapiEvent` trả `{ delivered: false, skipped: true }` chứ không ném lỗi.

Kiểm tra các biến cũ vẫn còn nguyên: `DATABASE_URL`, `JWT_SECRET`, `TELEGRAM_BOT_TOKEN`,
`TELEGRAM_CHAT_ID`, `VITE_META_PIXEL_ID`.

`VITE_META_PIXEL_ID` đặc biệt quan trọng: nó được nhúng vào HTML **lúc build**, nên thiếu là bản build
ra không có Pixel, mất sạch tracking. Sẽ kiểm lại ở bước 6.

## Bước 5 — Publish

Bấm publish trong Manus như mọi lần.

Lịch sử repo cho thấy lần cache-bypass đầu tiên trên v2joy.life hay còn trả bundle cũ, đã phải publish
lại vài lần (`4f5c03c`, `262be12`, `e764d2c`). Nếu bước 6 vẫn thấy số cũ thì publish lại rồi kiểm tiếp,
đừng vội kết luận code hỏng.

## Bước 6 — Nghiệm thu

Chạy từ máy, không cần vào Manus:

```bash
# 1. HTML phải nhẹ hẳn: kỳ vọng ~2 KB, trước đây 107 KB
curl -sS -H 'Accept-Encoding: gzip' -o /dev/null -w '%{size_download}\n' "https://v2joy.life/?cb=$(date +%s)"

# 2. Không còn runtime debug: kỳ vọng 0
curl -sS "https://v2joy.life/?cb=$(date +%s)" | grep -c 'manus-runtime'

# 3. Pixel vẫn được nhúng: kỳ vọng in ra fbq('init', '1955804598438163')
curl -sS "https://v2joy.life/?cb=$(date +%s)" | grep -o "fbq('init', '[0-9]*')"

# 4. Ảnh đã tối ưu phục vụ được: kỳ vọng 200 và ~62 KB
curl -sS -o /dev/null -w '%{http_code} %{size_download}\n' https://v2joy.life/media/tempo-use-steps-960.webp

# 5. Backend còn sống: kỳ vọng JSON có remaining
curl -sS 'https://v2joy.life/api/trpc/orders.status?batch=1&input=%7B%7D'
```

Sau đó **bắt buộc đặt thử một đơn COD thật** trên điện thoại rồi huỷ sau — đây là cách duy nhất chứng
minh migration đã ăn. Nếu quên migration, form sẽ báo lỗi ở bước xác nhận. Nhớ số điện thoại dùng để
thử, vì hệ thống chặn trùng số.

Kiểm trong Events Manager: `Lead` phải xuất hiện. `Purchase` thì chưa — đúng thiết kế, nó chỉ được gửi
khi đơn được đánh dấu đã giao.

## Bước 7 — Vài ngày sau

Mở lại Ads Manager và so tỷ lệ mount. Trước khi sửa: 297 `landing_page_view` nhưng chỉ 84 `ViewContent`
— 28%. Đây là con số nói thẳng tiền quảng cáo có được dùng đúng không. Nếu vẫn quanh 28% thì nút thắt
nằm chỗ khác chứ không phải trọng lượng trang, và cần đo lại.

## Nếu phải quay đầu

Revert commit trên `main` rồi publish lại từ Manus. **Không cần đụng vào DB** — năm cột mới đều nullable
và code cũ không tham chiếu tới chúng, để nguyên hoàn toàn vô hại.

## Chưa có, cần biết

Chưa có giao diện gọi `markDelivered`. Hiện phải gọi qua tRPC bằng tài khoản admin (`users.role = 'admin'`).
Nghĩa là **Purchase chưa tự động được gửi** — cho tới khi có chỗ bấm "đã giao" cho từng đơn.
