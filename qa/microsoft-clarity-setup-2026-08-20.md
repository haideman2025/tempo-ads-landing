# Trạng thái Microsoft Clarity — 20-08-2026

| Hạng mục | Kết quả xác nhận |
|---|---|
| Project | **Tempo By V2JOY** |
| Project URL | `https://clarity.microsoft.com/projects/view/y468d5yk1c/gettingstarted` |
| Trạng thái tài khoản | Đã đăng nhập trong trình duyệt của chủ dự án. |
| Trạng thái cài đặt | Trang Getting Started hiển thị “Almost there”, cho thấy script tracking chưa được cài/xác nhận. |
| Bước tiếp theo | Lấy mã tracking của project `y468d5yk1c`, tích hợp trong HTML landing và xác minh request Clarity trên `v2joy.life`/`www.v2joy.life`. |

Nguồn: phiên Microsoft Clarity của chủ dự án, kiểm tra ngày 20-08-2026.

## Mã tracking và bảo vệ form

Mã tracking được Microsoft Clarity hiển thị trong phần **Settings → Setup → Get tracking code** dùng project ID `y468d5yk1c` và tải `https://www.clarity.ms/tag/y468d5yk1c`.

| Quyết định triển khai | Cơ sở |
|---|---|
| Chèn script Clarity trong `<head>` cùng Meta Pixel. | Hướng dẫn cài đặt trực tiếp trên giao diện project Clarity. |
| Không gửi số điện thoại, họ tên hoặc dữ liệu định danh qua custom event/tag. | Clarity xác định input box là nội dung được che mặc định. |
| Thêm `data-clarity-mask="true"` cho toàn bộ form hàng chờ. | Thuộc tính này che node và mọi phần tử con trước khi dữ liệu được tải lên Clarity. |

Nguồn chính thức: [Masking content](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking) và [Clarity client API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api), truy cập ngày 20-08-2026.
