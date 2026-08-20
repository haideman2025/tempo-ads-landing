# Audit định tính landing TEMPO — 10 góc nhìn người dùng

**Ngày thực hiện:** 20-08-2026 (GMT+7)  
**Phạm vi:** `www.v2joy.life`, luồng từ quảng cáo đến form hàng chờ TEMPO 3ml.  
**Tính chất:** Đây là **đánh giá heuristic theo chân dung giả định**, dùng để tìm rủi ro UX và thông điệp trước khi chạy Ads. Đây không phải khảo sát, không phải dữ liệu khách hàng thật và không được dùng để suy ra tỷ lệ chuyển đổi.

## Tiêu chí đánh giá

Mỗi góc nhìn được đối chiếu theo năm câu hỏi: người dùng có hiểu sản phẩm và trạng thái hàng chờ trong 10–15 giây đầu không; có hiểu giá, quy cách và giới hạn số lượng không; có đủ lý do tin tưởng để để lại số điện thoại không; có đọc được cảnh báo/giới hạn claim không; và có thấy lời kêu gọi hành động rõ ràng trên điện thoại không.

| # | Chân dung giả định | Nhu cầu chính | Dấu hiệu tích cực trên landing | Câu hỏi/rào cản có thể còn lại |
|---:|---|---|---|---|
| 01 | Nam 27 tuổi, coi trọng riêng tư | Một bước chăm sóc kín đáo, không phô trương | Tone thị giác kín đáo, form không yêu cầu địa chỉ/thanh toán | Số điện thoại được dùng vào việc gì, có bị gọi ngoài mục đích mở bán không? |
| 02 | Người lướt Facebook bằng điện thoại | Hiểu nhanh trước khi quyết định cuộn | Hero có giá, CTA, số lượng còn lại và video | CTA “mua” có thể bị hiểu là thanh toán ngay nếu không có nhãn giải thích sát nút bấm. |
| 03 | Người so sánh giá lần đầu | Hiểu giá trị của chai 3ml | Giá 349.000đ, số lượng 1–2 chai, size thực tế | Cần thấy sớm hơn thông tin “khoảng 12–15 lần sử dụng” để không chỉ so sánh theo ml. |
| 04 | Người thận trọng với thành phần | Kiểm tra INCI, nhãn và cảnh báo | Chapter thành phần, INCI và lưu ý da nhạy cảm | Cần giữ câu chữ công bố ngắn, tránh cảm giác “hứa hiệu quả” quá mức. |
| 05 | Người nghi ngờ landing mới | Xác minh đây là thương hiệu có thông tin rõ | Tên NSX, INCI, nguyên tắc đối chiếu nhãn | Muốn biết rõ đây là hàng chờ; không nên tạo cảm giác “sắp giao ngay”. |
| 06 | Người quan tâm bối cảnh mối quan hệ | Câu chuyện tế nhị, tôn trọng cả hai | Storytelling nhấn chuẩn bị, giao tiếp và đồng thuận | Không nên đẩy các câu hứa liên quan công năng tình dục vào quảng cáo công khai. |
| 07 | Người bận rộn 35–40 tuổi | Quy trình ngắn, minh bạch | CTA cố định mobile, chọn 1–2 chai rõ | Cần thấy rõ điều gì xảy ra ngay sau khi gửi form. |
| 08 | Người có da nhạy cảm | Biết giới hạn an toàn trước khi đăng ký | Hướng dẫn thử lượng nhỏ, cảnh báo chỉ dùng ngoài da | Không nên suy diễn “phù hợp mọi loại da” hoặc “không tác dụng phụ”. |
| 09 | Người thích bằng chứng xã hội | Tìm review/đánh giá thật | Landing không giả review hoặc rating | Không có review thật ở giai đoạn đầu là chấp nhận được; cần dùng minh bạch sản phẩm thay thế. |
| 10 | Người mua online thường xuyên | Giao hàng, liên hệ, trạng thái đơn | FAQ nêu đây chưa phải đơn đặt hàng | Cần lặp lại “chưa thanh toán” và mục đích lưu số điện thoại ngay trong vùng chuyển đổi. |

## Kết luận ưu tiên

Landing có nền tảng storytelling, video, tính minh bạch thành phần và form hoạt động. Điểm có khả năng ảnh hưởng nhiều nhất đến hành động đăng ký không phải là thiếu thêm nội dung dài, mà là **làm rõ trạng thái giao dịch trong vài giây đầu**: đây là hàng chờ, chưa có thanh toán, mức giá dự kiến là bao nhiêu, chai 3ml được dùng theo khoảng bao nhiêu lần và V2JOY dùng số điện thoại với mục đích nào.

| Mức ưu tiên | Việc cần làm | Lý do |
|---|---|---|
| P0 | Đặt một dải thông tin nhanh cạnh CTA hero: 349.000đ, 3ml, khoảng 12–15 lần dùng, đăng ký hàng chờ/chưa thanh toán. | Giảm mơ hồ giữa “mua” và “đăng ký”. |
| P0 | Đổi CTA hero thành “Đăng ký hàng chờ · chưa thanh toán”. | Đồng bộ với FAQ và logic form thực tế. |
| P1 | Bổ sung thông báo ngắn sau form và cạnh checkbox về mục đích sử dụng số điện thoại. | Tăng cảm giác kiểm soát dữ liệu, đặc biệt với sản phẩm riêng tư. |
| P1 | Nêu rõ “V2JOY liên hệ xác nhận khi có thông tin mở bán” ngay dưới CTA/form. | Giúp người dùng hiểu bước kế tiếp mà không hứa thời điểm giao hàng chưa xác nhận. |
| P2 | Tách các giả thuyết quảng cáo theo bốn angle: chuẩn bị kín đáo, kích thước/mang theo, minh bạch thành phần, hàng chờ lô đầu. | Tránh nhồi mọi lý do mua vào một mẫu quảng cáo và giữ claim-safe. |

## Giới hạn cần giữ khi chạy Ads

Nội dung public chỉ mô tả TEMPO là mỹ phẩm, nêu đúng claim ghi nhãn “Giúp chăm sóc dưỡng ẩm da”, thông tin thành phần, hướng dẫn và trải nghiệm thương hiệu. Không dùng ngôn ngữ chẩn đoán, điều trị, cam kết thời lượng/kết quả, mô tả bộ phận cơ thể hay review/rating không có thật.
