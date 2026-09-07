# QA — TEMPO background videos (07/09/2026)

Năm video nền được thay nguyên trạng theo thứ tự storytelling đang có trên landing. Không thay đổi API `Backdrop`, lazy-load, thuộc tính autoplay/muted/loop/playsInline, form COD, tRPC, Telegram, Pixel, Clarity hoặc logic tồn kho.

| Cảnh | Asset được phát | Kết quả playback local |
|---|---|---|
| 01 — Hero | `tempo-background-01_9f851f78.mp4` | Mounted; `readyState=4`; không pause; thời gian phát tăng |
| 02 | `tempo-background-02_d44fa0b9.mp4` | Mounted; `readyState=4`; không pause; thời gian phát tăng |
| 03 | `tempo-background-03_a5a1c511.mp4` | Mounted; `readyState=4`; không pause; thời gian phát tăng |
| 04 | `tempo-background-04_d33bb416.mp4` | Mounted; `readyState=4`; không pause; thời gian phát tăng |
| 05 | `tempo-background-05_b3e7f8c0.mp4` | Mounted; `readyState=4`; không pause; thời gian phát tăng |

Đã xác minh bằng cách cuộn lần lượt Hero và Cảnh 02–05 để kích hoạt lazy-load; cả năm video không có `MediaError`. Ảnh chụp full-page ở viewport mobile 375×812 và desktop 1280×720 giữ cấu trúc storytelling, CTA và form COD hiển thị đúng. `pnpm test` đạt 36 kiểm thử, 1 kiểm thử Telegram bên ngoài được skip theo cấu hình; `pnpm build` thành công. Các request `orders.status` quan sát trong QA trả HTTP 200 và vẫn báo `claimed=0`, `remaining=1000`; không tạo đơn kiểm thử.
