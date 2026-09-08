# Ma trận tracking — TEMPO Restore + Enhance V2 (Staging)

## Kết quả kiểm thử trực tiếp

Route kiểm tra: `/staging/tempo-restore-v2?qa=analytics-boundary` trên Chromium desktop ngày 2026-09-08.

| Hạng mục | Kỳ vọng staging | Kết quả |
|---|---|---|
| React mount | `#root[data-app-mounted="true"]`, không còn fallback | Đạt: root mount `true`; `.tempo-boot-fallback` không còn trong DOM sau mount |
| Pixel Meta | Không init `fbq`, không tải `fbevents`, không gọi `/tr` | Đạt: `typeof window.fbq = undefined`; không có resource Pixel |
| Clarity | Không init hoặc gửi dữ liệu từ staging | Đạt: `typeof window.clarity = undefined`; không có resource Clarity |
| Analytics ngoài | Không tải Umami ở staging | Đạt: không có resource `/umami` |
| Sự kiện V2 | Chỉ log cục bộ với `event_id`; không chứa PII | Thiết kế đã dùng `console.info` và CustomEvent `tempo:staging-event` với `event_id`, SKU, currency và payload không có PII |
| COD mutation | Không gọi procedure tạo đơn / không trừ tồn | Submit staging chỉ gọi `stagingTrack("Lead")`, không gọi mutation; kiểm tra form trước đó đã hiện thông báo mô phỏng |
| `Purchase` | Không gửi khi form COD staging submit | Đạt: không có logic `Purchase` trong event type hoặc submit; chỉ ghi rõ là CRM/CAPI hậu xác nhận/giao hàng |

> **Ranh giới vận hành:** `QualifiedLead` chỉ được gửi sau xác nhận CRM; `Purchase` chỉ được gửi sau trạng thái giao thành công qua CRM/CAPI. Không có tín hiệu nào trong hai nhóm này được phát từ giao diện staging hoặc lúc submit COD.

## Bằng chứng kích hoạt CTA

Sau khi cài listener CustomEvent cục bộ, CTA hero `ĐẶT TEMPO 3ML · 499.000đ` được kích hoạt trên cùng route. Logger trả về `InitiateCheckout` với `event_id` UUID, `content_ids: ["tempo-3ml"]`, `currency: "VND"`, `value: 499000`, `num_items: 1` và `staging: true`. Khi cuộn đến form, ba event quan sát nội dung `ViewInfographic`, `ViewRitual` và `ViewFeedback` cũng xuất hiện với event ID riêng.

| Kiểm tra sau CTA | Kết quả |
|---|---|
| `fbq` / `clarity` | Đều `undefined` |
| Resource Pixel, Clarity, Umami | Không có |
| Request tạo đơn COD | Không có |
| Event cục bộ quan sát được | `InitiateCheckout`, `ViewInfographic`, `ViewRitual`, `ViewFeedback` |
