# TEMPO Couple Visual QA — Launch 3ml

## Thay đổi đã phát hành chuẩn bị

- Asset cảnh hai người đàn ông ở khu bếp đã được thay bằng cảnh nam–nữ trưởng thành cùng chuẩn bị đồ uống trong không gian buổi tối.
- Asset cảnh đi bộ trong visual diary được thay bằng cảnh nam–nữ trưởng thành đi cùng nhau lúc chạng vạng.
- Cả hai visual không có chữ, logo, bao bì hoặc lời hứa công dụng trên ảnh; phần copy vẫn do HTML của landing quản lý.

## Kiểm tra trực quan asset gốc

| Asset | Xác nhận |
|---|---|
| `tempo-couple-03-kitchen-evening-woman-man` | Ảnh đã render hoàn tất: một phụ nữ và một nam giới trưởng thành cùng chuẩn bị đồ uống trong bếp buổi tối; không có chữ, logo, watermark hoặc bao bì. |
| `tempo-couple-04-walk-home-woman-man` | Ảnh đã render hoàn tất: một phụ nữ và một nam giới trưởng thành đi cùng nhau trên phố lúc chạng vạng; không có chữ, logo, watermark hoặc bao bì. |

## Kiểm tra landing

| Hạng mục | Kết quả |
|---|---|
| Desktop full-page | Cảnh nam–nữ mới hiển thị trong khu vực hình ảnh/bản đăng ký, không còn khung hai người đàn ông tại điểm chạm đã báo cáo. |
| Mobile full-page | Khung ảnh vẫn nằm trong tỷ lệ và không che CTA hoặc copy. |
| Regression test | 16/16 assertions đạt. |
| Production build | Đạt. |

## Ghi chú

Visual mới được dùng trực tiếp từ kho phân phối web. Không sử dụng lại URL `tempo-couple-01-kitchen-evening_df318ac9.webp`, `tempo-couple-02-walk-home_e372d5a3.webp` hoặc `tempo-lifestyle-03-together-at-home_2ee3a59f.webp` trong landing.
