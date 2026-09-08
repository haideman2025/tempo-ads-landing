# P0 Blank-Screen Investigation — TEMPO Restore V2

## Lần quan sát ban đầu

- Thời điểm: 2026-09-07 12:24 GMT+7.
- URL: `/staging/tempo-restore-v2` trên preview nội bộ.
- Kết quả: viewport trắng, không có phần tử tương tác; title vẫn là title mặc định của ứng dụng.
- Console browser: chưa trả lỗi hiển thị trong lượt quan sát đầu.

Sự kiện này được giữ làm mốc điều tra. Chưa có production route nào bị thay đổi hoặc phát hành trong Restore V2.

## Quan sát sau khi bundle ổn định

Ở lần kiểm tra lại, DOM trong `#root` đã có toàn bộ landing Restore V2, title đã chuyển thành `STAGING · TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML`, và phần tử tương tác xuất hiện đầy đủ. Điều này cho thấy lỗi trắng đầu tiên không phải là lỗi render React lặp lại, nhưng vẫn là một rủi ro P0 ở giai đoạn trước mount hoặc khi bundle tải chậm. Lớp fallback trước React và guard mount vẫn cần được bổ sung.

## Kiểm tra tải trực tiếp sau khi bổ sung fallback

Lượt cache-bypass ngày 2026-09-08 tại `/staging/tempo-restore-v2?qa=p0-reload-1` trả về title staging đúng và `#root` chứa header, gallery, form COD hai bước cùng điều hướng. Không quan sát thấy màn ivory trống hay fallback khởi động, nên React đã mount thành công trong Chrome sandbox.

Regression test hiện kiểm tra fallback HTML trước React, guard khi thiếu `#root`, xử lý `onRecoverableError`, sự kiện `tempo:boot-ready` và ErrorBoundary thương hiệu không lộ stack. Audit mã nguồn `client` và `server` không tìm thấy tham chiếu đăng ký service worker.

## Lượt kiểm tra cache-bypass và cache worker bổ sung

Lượt tải trực tiếp ngày 2026-09-08 tại `/staging/tempo-restore-v2?qa=analytics-boundary` tiếp tục trả `#root[data-app-mounted="true"]` và fallback đã bị React thay thế. `navigator.serviceWorker.getRegistrations()` trả về `0` registration. Trên route staging, Pixel, Clarity và analytics ngoài đều không được khởi tạo; do đó không có worker hoặc tracker production nào tạo cache/mount path riêng cho trang review.

## Kiểm tra pre-React

Ngày 08/09/2026, Chromium headless tải trực tiếp `/staging/tempo-restore-v2?qa=pre-react-fallback` với JavaScript bị tắt để mô phỏng bundle không khởi động. DOM vẫn có `.tempo-boot-fallback` và nội dung TEMPO; vì vậy người dùng nhận được trạng thái chờ mang thương hiệu thay cho nền ivory trống. Đây là kiểm tra cơ chế Chromium, không thay thế kiểm thử lỗi mạng thực tế hoặc thiết bị Safari vật lý.
