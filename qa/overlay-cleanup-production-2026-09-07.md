# QA — Đồng bộ production sau dọn overlay video (07/09/2026)

| Lần kiểm tra | URL | Kết quả |
|---|---|---|
| 10:00 GMT+7 | `https://v2joy.life/?release=4be6b261&verify=1` | Edge vẫn trả bundle cũ có nhãn `VIDEO ĐANG PHÁT`; bản xem trước tại thời điểm kiểm tra đã không còn nhãn này. |
| 10:02 GMT+7 | `https://v2joy.life/?release=4f5c03c2&verify=2` | Edge đã đồng bộ: Hero không còn nhãn `VIDEO ĐANG PHÁT` hay `CẢNH 01`; CTA COD và nội dung thương mại vẫn hiện diện. |

Không thực hiện thao tác đặt hàng hoặc thay đổi dữ liệu COD/tồn kho trong lượt xác minh này. Cần kích hoạt lại deployment và kiểm tra bằng URL cache-bypass mới trước khi coi phát hành hoàn tất.
