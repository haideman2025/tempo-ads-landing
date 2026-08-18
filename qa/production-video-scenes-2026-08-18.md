# Nghiệm thu production — Video scenes TEMPO

Ngày kiểm tra: 18-08-2026 (GMT+7)

| Hạng mục | Kết quả |
|---|---|
| Tên miền kiểm tra | `https://www.v2joy.life` |
| Bundle đã đồng bộ | `assets/index-B-d77kHG.js` |
| Cảnh 02 | Hiển thị `Khép lại ngày dài. Mang theo điều vừa đủ.` cùng nhãn `VIDEO NỀN`. |
| Cảnh 03 | Hiển thị `Dừng lại để đọc. Biết trước khi chọn.` cùng nhãn `VIDEO NỀN`. |
| Cảnh 04 | Bundle production chứa và trang xác nhận mạch `Đến cuộc hẹn`. |
| Cảnh 05 | Được gắn thành chapter video độc lập trước vùng form; không còn cạnh tranh thị giác với CTA. |
| Trạng thái còn lại | `v2joy.life` (không www) chưa được xác minh DNS/SSL; cần chủ dự án cấu hình trong Domains. |

> Lần tải đầu ngay sau checkpoint còn trả bundle cũ. Sau thời gian đồng bộ, production trả bundle mới và trình duyệt hiển thị chapter Cảnh 02–03 với nhãn video nền. Cần tải lại cứng trên thiết bị người dùng nếu trình duyệt đang giữ một tab cũ.

## Kiểm tra chuyển động thực tế

Ngày kiểm tra: 18-08-2026 (GMT+7), sau checkpoint `4d50fef9`.

| Điều kiện nghiệm thu | Kết quả Video 02–05 |
|---|---|
| Media decode | Mỗi video trả `readyState=4`, độ phân giải 1280×720. |
| Playback | Bốn video đều `paused=false`; `currentTime` thay đổi sau khoảng 1,8 giây. Video 03–04 vượt điểm lặp trong khi đo nên thời gian quay về đầu, đồng thời hash ảnh chụp thay đổi. |
| Khung hình | Hash PNG của hai lần chụp khác nhau cho cả bốn scene, xác nhận pixels thực tế đã thay đổi chứ không chỉ có trạng thái `play()`. |
| Mô phỏng `prefers-reduced-motion: reduce` | Bốn video vẫn `visible=true`, `paused=false` và thời gian phát tăng khoảng 1,8 giây sau bản sửa. |

> Bản `4d50fef9` đã loại bỏ nhánh chỉ dành cho Video 02–05 vốn pause video và thay bằng poster khi trình duyệt báo `prefers-reduced-motion`. Hero không có nhánh này, vì vậy trước đây người dùng có thể thấy chỉ Video 01 còn chuyển động.

## QA domain live theo viewport

Ngày kiểm tra: 18-08-2026 (GMT+7), domain: `https://www.v2joy.life/`, sau khi bundle `index-CuEfwCSD.js` đồng bộ.

| Viewport | Video 02–05 | Form hàng chờ | Artifact |
|---|---|---|---|
| Desktop 1280×720 | Bốn thẻ video hiển thị, `readyState=4`, `paused=false`; thời gian phát tăng khoảng 1,8 giây trên từng thẻ. | Có mặt, 427,7×715,7 px; không bị video che. | `qa/live-video-qa/desktop-scene-2.png`, `desktop-scene-5.png`, `desktop-form.png` |
| Mobile 375×812 | Bốn thẻ video hiển thị, `readyState=4`, `paused=false`; thời gian phát tăng khoảng 1,8 giây trên từng thẻ. | Có mặt, rộng 333 px, cao 715,7 px; CTA không bị che. | `qa/live-video-qa/mobile-scene-2.png`, `mobile-scene-5.png`, `mobile-form.png` |

Ảnh hiện trường desktop và mobile của Scene 02 cho thấy đây là một chapter video nền độc lập, có nhãn `VIDEO ĐANG PHÁT`, tiêu đề và caption; không phải ảnh poster chen trong một card nội dung.
