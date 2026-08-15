# QA — Visual Diary Repair

## Kiểm tra đã thực hiện

Landing được kiểm tra lại sau khi khởi động preview sạch ở hai viewport: **390×844** và **1440×1050**. Toàn bộ mười frame của visual diary hiện hiển thị như một trình tự ảnh, không còn khung `Image generation failed` hay frame rỗng trong ảnh chụp kiểm tra.

| Hạng mục | Kết quả |
|---|---|
| Visual diary | Một keyframe mới được tạo cho cảnh mở đầu; chín frame còn lại dùng visual thương mại TEMPO đã xác minh, tạo nhịp từ tan làm đến không gian riêng. |
| Fallback | Mỗi khung diary đi qua `SafeImage`; khi ảnh không tải được, UI dùng master tabletop thay vì để khung trống. |
| Thứ bậc ảnh | Desktop dùng nhịp cảnh lớn–nhỏ bất đối xứng; mobile chuyển thành một cột với opening frame cao hơn để giữ câu chuyện dễ đọc. |
| Card format | Ảnh pack và copy được tách cấu trúc, nên card không còn bị overlay tối che khuất sản phẩm. |
| Regression | `pnpm test` đạt **3 file / 9 tests**. |

## Pass kiểm tra cuối

Tất cả **30** URL media đang được tham chiếu trong `Home.tsx` trả HTTP **200** sau lần thay asset cuối. Console mới nhất sau khởi động preview chỉ có kết nối Vite và thông báo React DevTools; không có lỗi tải asset, lỗi render hoặc duplicate key mới.

## Lưu ý

Các ảnh trên landing vẫn là **concept trước sản xuất**, không phải ảnh sản phẩm thật. Khi có prototype, nên chụp lại cùng shot list để thay asset AI mà không đổi cấu trúc story.
