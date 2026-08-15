# TEMPO — Image-led QA Record

## Kết quả giao diện

Landing đã được kiểm tra ở desktop 1280×720 và mobile 375×812 sau khi chuyển sang cấu trúc ưu tiên hình ảnh. Mạch mới giữ một visual lớn cho mỗi nhịp chính, đưa chapter “Botanical Studies + Made in Vietnam” vào trước phần minh bạch, rút diary còn caption ngắn và giữ các chi tiết tra cứu trong phần mở rộng.

Trên mobile, nhóm visual nguồn gốc xếp thành một cột tuần tự; không có tràn ngang ở khung ảnh, visual diary hoặc form hàng chờ. Form vẫn hiện đầy đủ bốn format, bao gồm 3ml, 5ml, Duo và 2×5ml.

## Ranh giới thông tin đã kiểm tra

Visual và copy chỉ khẳng định TEMPO **sản xuất tại Việt Nam** bởi NANOFRANCE, Ninh Bình. Ảnh thảo mộc được ghi chú là diễn giải danh mục chiết xuất thực vật; không có tuyên bố vùng trồng hoặc nước xuất xứ cho từng nguyên liệu. Công dụng duy nhất còn lại là đúng theo nhãn: “Giúp chăm sóc dưỡng ẩm da.”

## Kiểm thử tự động

`pnpm test` đã chạy thành công: 4 test suite, 16 assertions. Bộ test bao phủ video motion, visual diary, Golden Circle, bốn SKU hàng chờ, packshot đúng quy cách, module minh bạch, ranh giới tuyên bố về nguyên liệu/xuất xứ và accessibility baseline. Production build cũng hoàn tất thành công.

Sáu URL asset image-led trả `200 image/webp` qua lớp phân phối, gồm bốn visual provenance và hai keyframe nghi thức. Visual thứ hai, `Carry the Signal`, đã hiện hữu tại độ phân giải 1664×2080 ở kho asset.

Không gửi form thật trên môi trường đang dùng vì thao tác đó sẽ tạo một dữ liệu liên hệ và chiếm một trong 1.000 suất hàng chờ. Luồng server-side được xác nhận qua test hiện hữu của `server/waitlist.test.ts`; cần một đăng ký thật do chủ dự án thực hiện khi muốn nghiệm thu luồng production, với một thông tin liên hệ hợp lệ và có sự đồng ý rõ ràng.
