# Bằng chứng phát video — TEMPO Restore + Enhance V2 (Staging)

## Phạm vi

Kiểm tra trên Chromium desktop tại route `/staging/tempo-restore-v2` ngày 2026-09-08. Kịch bản tự cuộn từ đầu đến cuối landing qua bảy vị trí, dừng 1,8 giây mỗi vị trí, sau đó đọc trạng thái năm phần tử video.

| Asset | `preload` | `readyState` khi đã chạm vùng xem | Bằng chứng phát | Khi rời viewport | Lỗi media |
|---|---:|---:|---|---|---|
| `tempo-background-01` | `auto` | 4 | `currentTime` 4,64 giây, `paused=false` ở hero | `paused=true` sau khi cuộn xuống | Không |
| `tempo-background-02` | `metadata` | 4 | `currentTime` 4,33 giây, `paused=false` ở chương 1 | `paused=true` sau khi cuộn tiếp | Không |
| `tempo-background-03` | `metadata` | 4 | `currentTime` 1,72 giây, `paused=false` ở chương kế tiếp | `paused=true` sau khi rời vùng | Không |
| `tempo-background-04` | `metadata` | 4 | `currentTime` 1,68 giây, `paused=false` khi chương xuất hiện | `paused=true` ở mẫu kế tiếp | Không |
| `tempo-background-05` | `metadata` | 4 | `currentTime` tăng từ 1,69 lên 3,49 giây, `paused=false` khi vùng hiển thị | `paused=true` ở cuối trang | Không |

Hero được ưu tiên tải (`preload=auto`); bốn video sau chỉ dùng `metadata` và chỉ phát khi vào phạm vi quan sát. Quan sát ở điểm chuyển cảnh ghi nhận video 04 và 05 cùng phát một thời điểm ngắn vì cả hai vùng đang nằm trong viewport; đây không phải tải đồng loạt hoặc phát nền ở ngoài màn hình. Mọi video đều trả `MediaError=null`.

## Cơ chế autoplay theo viewport

Theo yêu cầu mới nhất của owner, `CinematicVideo` dùng autoplay hoàn toàn, không đòi hỏi thao tác bấm. Video vẫn có poster, `muted`, `playsInline`, `loop` và retry có giới hạn khi lỗi tải. Hai `IntersectionObserver` được tách riêng: observer preload giữ `rootMargin: 700px` để chuẩn bị tệp trước khi đến section; observer playback chỉ gọi `play()` khi tối thiểu 18% khung cinematic thực sự nằm trong viewport và gọi `pause()` khi rời vùng đó.

## Kiểm tra lại theo phản hồi owner

Lượt kiểm tra trực tiếp ngày 2026-09-08 tại route staging đã cuộn đến từng khung cinematic và đo `currentTime` trong 1,4 giây. Cả năm video đều đã mount, `readyState=4`, `paused=false`, trạng thái `playing` và `currentTime` đều tăng thêm 1,4 giây. Vì vậy không có lỗi autoplay hoặc poster che video trên route Restore V2 staging.

Tuy nhiên, tại `https://v2joy.life/` (route production đang giữ nguyên theo yêu cầu chưa phát hành) không có phần tử `<video>` nào ở lượt kiểm tra này. Owner cần xem đúng route staging `/staging/tempo-restore-v2` để thấy năm video; production chỉ có thể nhận bản Restore V2 sau khi được owner duyệt và yêu cầu phát hành rõ ràng.

## Bổ sung sau phản hồi owner: autoplay tại link demo

Kiểm tra trực tiếp tại link staging sau bản sửa xác nhận video hero có `readyState=4`, `paused=false`; `currentTime` tăng từ `4,29` lên `6,09` giây trong `1,8` giây và poster có opacity `0`. Như vậy video chuyển động thực sự, không chỉ ở trạng thái đợi phát.

Lần triển khai trước có nút khôi phục phát nền cho trình duyệt tự pause video. Owner đã yêu cầu bỏ hoàn toàn thao tác này. Cơ chế trên đã được loại bỏ khỏi component, CSS và regression test.

## Xác minh sau khi bỏ thao tác phát tay

Tại link staging cache-bypass `?review=viewport-autoplay-v3`, hero tự phát với `muted=true`, `playsInline=true`, `autoplay=true`, `readyState=4`, `paused=false`; `currentTime` tăng từ `6,03` lên `7,83` giây trong 1,8 giây. Kịch bản tự cuộn qua đủ năm khung cinematic ghi nhận 5/5 video đã mount, trạng thái `playing`, `paused=false` và `currentTime` tiếp tục tăng khi section tương ứng ở giữa viewport. Ở mỗi lần chuyển sang video kế tiếp, video liền trước có `paused=true`.

Ảnh kiểm tra viewport mobile 390×844 xác nhận hero, CTA và sticky COD không có nút phát tay hoặc lớp phủ che thao tác. `pnpm test` đạt 56 pass, 1 skip Telegram có chủ đích; `pnpm build` thành công. Production vẫn chưa được phát hành.
