# TEMPO — Sales Landing Outline

## Vai trò của trang

Trang giới thiệu TEMPO ở giai đoạn đăng ký hàng chờ. Mục tiêu là giúp khách hàng hiểu được bối cảnh sản phẩm, cách tự kiểm tra thông tin công khai và lựa chọn format quan tâm; form cuối trang chỉ thu thông tin liên hệ, không xác nhận đơn hàng hoặc thanh toán.

## Mạch video từ trên xuống dưới

| Thứ tự | File | Vai trò kể chuyện | CTA sau cảnh |
| --- | --- | --- | --- |
| 01 | `tempo-motion-01-reservation` | Khởi đầu bằng một khoảng dừng có chủ đích trước buổi tối. | Xem hành trình |
| 02 | `tempo-motion-02-carry` | Giới thiệu format nhỏ, kín đáo để mang theo. | Khám phá 3ml |
| 03 | `tempo-motion-03-craft` | Chuyển vào chất liệu, công thức và cách đối chiếu nhãn. | Xem thành phần |
| 04 | `tempo-motion-04-date-table` | Đặt sản phẩm vào một cuộc hẹn bình tĩnh, tôn trọng nhịp của cả hai. | Xem các format |
| 05 | `tempo-motion-05-duo-hero` | Khép lại bằng lựa chọn 3ml + 5ml như một hệ ritual linh hoạt. | Giữ suất hàng chờ |

## Cấu trúc bán hàng

| Chương | Vai trò | Nội dung chính | Giới hạn public |
| --- | --- | --- | --- |
| Hero | Chuyển đổi đầu trang | “Đêm nay, bạn chọn một nhịp khác.”; 1.000 suất chờ; video 01. | Không hứa kết quả hoặc thời gian. |
| Why | Gợi đúng bối cảnh | Nhịp sống nhanh, một buổi tối cần sự có mặt và chăm sóc. | Không y tế hoá vấn đề. |
| Motion timeline | Xây tin bằng câu chuyện | Video 02–05 tự phát theo thứ tự, tiến cảnh khi video kết thúc; vẫn cho phép chạm để điều hướng. | Chỉ kể bối cảnh, không claim công dụng. |
| Botanical transparency | Tạo trust | Ba infographic chữ rõ: bản đồ 9 dịch chiết, cách đọc INCI, quy tắc minh bạch nhãn. | Chỉ ghi “Giúp chăm sóc dưỡng ẩm da”; không gán vùng trồng/công dụng riêng. |
| Product formats | Chuyển đổi theo nhu cầu | 3ml dùng thử; 5ml routine; Duo mang theo + ở nhà; 2×5ml lựa chọn đầy đủ. | Không nêu giá hoặc số lần dùng chưa chốt public. |
| Waitlist | Thu lead | Danh sách 1.000 suất, chọn format, consent rõ ràng. | Không gọi là đơn đặt hàng hay thanh toán. |
| FAQ & safety | Giảm rào cản | Mỹ phẩm; đọc nhãn; chỉ dùng ngoài da; thử lượng nhỏ, ngưng nếu có biểu hiện không phù hợp. | Thông tin trên nhãn/hồ sơ cuối cùng có ưu tiên. |

## Copy anchor được phép dùng

> “Giúp chăm sóc dưỡng ẩm da.”

> “TEMPO là mỹ phẩm, không phải thuốc.”

> “Sản xuất tại Việt Nam bởi Công ty TNHH SX Công nghệ cao NANOFRANCE, KCN Đồng Văn IV, Ninh Bình.”

> “Chỉ dùng ngoài da. Thử lượng nhỏ ở mặt trong cổ tay trước lần đầu; ngưng dùng nếu có biểu hiện không phù hợp.”

## Infographic text plan

| Visual | Headline | Nhãn cần đọc rõ | Quy tắc nội dung |
| --- | --- | --- | --- |
| 01 | “9 chiết xuất thực vật trong danh mục INCI” | Xà Sàng Tử · Hoa Tiêu · Khổ Sâm; Hoàng Tinh · Đỗ Trọng · Toả Dương; Dâm Dương Hoắc · Mã Tiên Thảo · Ba Kích Thiên | Không ghi công dụng cho từng thành phần. |
| 02 | “Đọc công thức theo thứ tự công bố” | Purified Water · Alcohol (Ethanol) · Butylene Glycol · 9 chiết xuất thực vật · Panthenol | Không diễn giải công dụng ngoài công bố. |
| 03 | “Đọc nhãn trước khi chọn” | Tên sản phẩm · Dung tích · INCI · Số lô · NSX/HSD · Hướng dẫn | Không hiển thị số công bố giả hoặc giá. |

## QA giao diện — 2026-08-17

- **Desktop:** hành trình Why → How → infographic → protocol → format → visual diary → form hiển thị liên tục; không quan sát thấy tràn ngang, ảnh hỏng hay CTA bị che.
- **Mobile 390px:** timeline video chuyển sang cuộn ngang có chủ đích; infographic, card format, visual diary và form xếp một cột; không quan sát thấy card bị cắt hoặc ảnh sai tỷ lệ.
- **Nội dung:** ba infographic chữ lớn có độ tương phản cao trong bố cục; phần văn bản phụ trên trang giữ ngắn, hỗ trợ ảnh thay vì lặp lại claim.

## QA playback runtime — 2026-08-17

- **Hero 01:** Chromium ghi nhận `playing`, `paused: false`, `readyState: 4`, `muted: true`, `errorCode: null` và nguồn `tempo-motion-01-reservation`.
- **Carousel:** lần lượt ghi nhận `tempo-motion-02-carry` → `tempo-motion-03-craft` → `tempo-motion-04-date-table` → `tempo-motion-05-duo-hero`; mọi cảnh đều `playing: true`, có `currentTime` tăng và không có lỗi media.
