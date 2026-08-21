# Trạng thái đo lường quảng cáo TEMPO — 20-08-2026

## Dữ liệu xác nhận được

| Nguồn | Chỉ số | Giá trị | Ghi chú |
|---|---|---:|---|
| Ảnh Ads Manager do chủ dự án cung cấp | Reach | 1.388 Accounts Center accounts | Màn hình quảng cáo `Tempo Video 1`, khung thời gian `TỐI ĐA`. |
| Ảnh Ads Manager do chủ dự án cung cấp | Lượt mua trên web | Data not available | Không có số liệu Purchase hiển thị trong ảnh. |
| Database landing | Reservations | 2 | Là số dòng đăng ký, không thể quy kết riêng cho quảng cáo. |
| Database landing | Bottles reserved | 3 | Tổng số chai đã được giữ; thời điểm mới nhất: `2026-08-20 10:15:39` UTC. |

## Trạng thái nguồn đo

Microsoft Clarity đang có project `Tempo By V2JOY` và mã tracking đã được cài. Dashboard chưa trả dữ liệu session có thể đọc được qua phiên hiện tại, vì vậy chưa kết luận số phiên truy cập hay hành vi từ Clarity.

Kết nối `Meta Ads Manager` trong phiên tác vụ báo `not connected`, nên chưa thể lấy dữ liệu API cho Spend, Impressions, Link clicks, Landing page views hoặc Purchase. Cần chủ dự án kết nối lại App `Meta Ads Manager` trong phần Integrations/Apps của Manus rồi mới đối chiếu funnel theo thời gian thực.

Không dùng `Reservations` làm chỉ số Purchase của Meta khi chưa có trường attribution/UTM hoặc dữ liệu API cùng khung thời gian.

## Kiểm tra phiên Meta trong trình duyệt

Ngày 21-08-2026, trình duyệt hiện tại mở được Meta Business Suite tại `https://business.facebook.com/latest/` với profile/business đang hiển thị là `Vesper Viie` và có lối vào `Trình quản lý quảng cáo`. URL Events Manager trước đó chuyển đến `eventsmanager.facebook.com/...act=344304263732341` trả HTTP 404, nên chưa xác nhận đây là đúng tài khoản quảng cáo hoặc đúng business sở hữu Pixel TEMPO. Cần mở Ads Manager từ phiên hiện tại, tìm `Tempo Video 1`/ad account tương ứng và chọn đúng tài sản trước khi diễn giải số liệu Pixel hay attribution.

Trong menu Trình quản lý quảng cáo của phiên này, thao tác `Trình quản lý sự kiện` tiếp tục mở `https://eventsmanager.facebook.com/events_manager2/overview?act=344304263732341` nhưng màn hình hiện trống, chưa có bảng event hoặc dữ liệu Pixel để đọc. Đây là dấu hiệu tài khoản `344304263732341` không có quyền/tài sản Pixel phù hợp hoặc giao diện chưa tải; không phải bằng chứng rằng Pixel TEMPO không hoạt động.

Sau khi tải xong, Events Manager của account `344304263732341` chỉ liệt kê hai tập dữ liệu `bmtest` (ID `1724310791312228`) và `bmtt2` (ID `469272795762592`), cả hai đều có `Tổng số sự kiện: 0` và `Chưa từng nhận sự kiện`. Pixel TEMPO đã được cài trên landing có ID `1955804598438163`, nên đây xác nhận account hiện tại **không phải** tài sản có Pixel TEMPO hoặc không có quyền xem nó. Không sử dụng hai dataset này để phân tích chiến dịch TEMPO.

Dropdown tài sản của phiên Meta hiện tại hiển thị các business: `Deman Company Limited` (2 tài sản), `Deman Global Ecommerce Sales Solution` (1), `Deman X Shopee BM` (2), `Die vv - Page Oniiz Cũ` (3), `Kháng BM` (1) và `Vũ Ngọc Hải` (1). Chưa có business/tài khoản nào hiển thị tên V2JOY/TEMPO hoặc Pixel ID `1955804598438163`. Cần chủ dự án xác nhận business/tài khoản quảng cáo đã khởi tạo `Tempo Video 1`, hoặc cấp quyền cho profile hiện tại đối với tài sản đó, rồi mới truy xuất số liệu PageView/Purchase đúng.

Thử mở trực tiếp `https://business.facebook.com/events_manager2/list/pixel/1955804598438163/overview` vẫn bị Meta chuyển về account `344304263732341` và chỉ hiển thị `bmtest`/`bmtt2`. Điều này củng cố rằng phiên hiện tại không có quyền đọc Pixel TEMPO `1955804598438163`; không thể tự lấy lịch sử Pixel từ tài khoản này.
