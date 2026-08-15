# TEMPO — Video Integration Plan

## Nguồn video do người dùng cung cấp

| Tệp nguồn | Vai trò đề xuất | Nội dung chính | Cách dùng an toàn |
| --- | --- | --- | --- |
| `1-3.mp4` | Intro công nghệ/pack | Bottle, bàn tối, thẻ reservation, macro và đường teal quét | Chỉ dùng trong module Design Signal, kèm ghi chú hình ảnh diễn giải; không diễn tả hiệu quả công nghệ hay y khoa. |
| `2-2.mp4` | Carousel Carry the Signal | 3ml, suit pocket, điện thoại, zip pocket | Gắn với ngữ cảnh mang theo; không dùng waveform như claim về cơ thể. |
| `3-2.mp4` | Carousel Material & Design | Tĩnh vật dinner table, hộp, macro chất liệu | Dùng làm chapter design/craft, không thay mô tả công dụng trên nhãn. |
| `4-2.mp4` | Motion Date Table | Bàn ăn, hai SKU, menu, ly nước và hiệu ứng sáng | Dùng ở chapter Date Night, kèm "Hình ảnh diễn giải"; tránh ám chỉ sản phẩm tác động vào nước. |
| `5-2.mp4` | Hero/format comparison | Hai size, pedestal, macro và graphic teal | Dùng ở hero trên desktop hoặc carousel format. Graphic signal là nhận diện thương hiệu, không phải chỉ báo sinh học. |

## Ràng buộc nội dung

Tất cả video đều thiên về visual concept và chưa phải bằng chứng sản phẩm cuối. Mọi chữ bị méo/không phải tiếng Việt trong footage được che bằng overlay hoặc không đặt ở vùng focal. Video không có cặp đôi; các asset tĩnh có cặp đôi phải thể hiện **nam–nữ trưởng thành**. Không dùng visual ánh sáng, waveform hoặc vòng sáng như bằng chứng về hiệu quả, an toàn hoặc tác động sinh lý.

## Nhịp responsive

Trên mobile, video nằm trong carousel một cảnh mỗi lần, có nút trước/sau, indicator, poster và reduced-motion fallback ảnh. Trên desktop, video xuất hiện theo pairs/asymmetric panels; chỉ hero duy trì autoplay muted loop. Mọi video có `playsInline`, `preload="metadata"`, `poster`, và fallback ảnh tương ứng.
