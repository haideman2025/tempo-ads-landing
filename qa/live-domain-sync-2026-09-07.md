# Kiểm tra đồng bộ domain live — 07/09/2026

Sau checkpoint `c3b52ec7`, trang preview của dự án hiển thị concept TEMPO mới và CTA **Đặt hàng COD**. Tuy nhiên, kiểm tra trực tiếp tại `https://v2joy.life/` lúc 05:54 GMT+7 vẫn nhận bundle cũ: CTA **Hàng chờ**, giá **349.000đ**, và quota lịch sử **997 chai**.

Điều này xác nhận tên miền live chưa đồng bộ deployment COD mới; không coi đây là bản đã nghiệm thu. Cần xác định trạng thái phát hành/cache domain và kiểm tra lại khi HTML/bundle được cập nhật thành giá 499.000đ cùng CTA COD.

Hệ thống triển khai sau đó xác nhận deployment đã thành công cho `v2joy.life`, `www.v2joy.life` và domain Manus. Tuy nhiên, truy cập cache-bypass tại `https://v2joy.life/?release=c3b52ec7` lúc 05:56 GMT+7 chỉ trả trang trắng trong phiên kiểm tra. Việc này cần được tiếp tục kiểm tra sau khi edge đồng bộ; không tự coi checkpoint là nghiệm thu domain.

Kiểm tra console của phiên trang trắng không ghi nhận lỗi JavaScript. Điều này chưa loại trừ vấn đề tải HTML/bundle từ edge và cần đối chiếu trực tiếp nội dung HTML cùng HTTP response trước khi nghiệm thu.

Đối chiếu marker bundle: source/build local có `499.000` và `Đặt hàng COD`, trong khi HTML live ở cả `v2joy.life` và hostname Manus tham chiếu bundle cũ `index-BeU8QbyD.js` (~35 KB), khác bundle local `index-CcjFlTMd.js` (~66 KB). Cache-bypass trên hostname Manus cũng trả trang trắng. Sự cố nằm ở bản deployment đang phục vụ, không phải một mình DNS custom domain.

## Kết quả sau checkpoint đồng bộ 88d9e1a5

Tên miền chính `https://v2joy.life/?release=88d9e1a5` đã render thành công landing COD mới. DOM hiển thị hero, CTA “Đặt hàng COD”, giá 499.000đ, tồn kho 1.000 chai, form giao nhận COD, các visual concept mới và phần minh bạch về đánh giá xác minh. Vấn đề edge phân phối bundle cũ/trang trắng đã được khắc phục sau phát hành lại.
