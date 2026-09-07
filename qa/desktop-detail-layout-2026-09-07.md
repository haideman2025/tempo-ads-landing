# QA — Cụm chi tiết sản phẩm desktop

**Ngày kiểm tra:** 07/09/2026  
**Phạm vi:** Cụm product proof và visual details ngay sau Cảnh 02 của landing TEMPO.

## Thay đổi đã xác minh

Trên desktop, khối ảnh sản phẩm và phần copy hiện giữ tỷ lệ bất đối xứng, giúp ảnh hộp/chai là trọng tâm trước khi người dùng đọc thông tin. Phần số liệu rút về hai thông tin ra quyết định trực tiếp: dung tích và số chai tối đa; trạng thái tồn kho vẫn được cập nhật ở hero và khối COD, thay vì lặp lại tại đây.

Dải ba visual cạnh tranh cùng lúc được thay bằng một **detail showcase**: một ảnh 1:1, một panel copy, ba tab lựa chọn góc nhìn và hai nút điều hướng. Cách trình bày này giữ mỗi thời điểm một ảnh, một thông điệp và một hành động điều hướng.

Trên mobile, showcase chuyển sang một cột; asset tiếp tục dùng `object-fit: contain` trong khung vuông để không cắt chữ trên ảnh. Các tab và nút điều hướng giữ kích thước chạm tối thiểu 42–46px.

## Kết quả kỹ thuật

`pnpm test`: 35 passed, 1 skipped.  
`pnpm build`: thành công.  
Ảnh full-page đã kiểm tra tại 1440×1000 và 375×812. Nhật ký console/mạng mới nhất không cho thấy lỗi JavaScript hoặc phản hồi 4xx/5xx liên quan đến landing; truy vấn `orders.status` trả 200 và số tồn hiển thị là 1.000/1.000.
