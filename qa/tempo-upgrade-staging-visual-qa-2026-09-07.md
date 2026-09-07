# QA trực quan — TEMPO Upgrade Staging

**Ngày kiểm tra:** 2026-09-07  
**Route staging:** `/staging/tempo-upgrade`  
**Phạm vi:** Kiểm tra không phát hành production.

| Viewport | Kết quả | Ghi nhận |
|---|---|---|
| Desktop 1440×1000 | Đạt | Chín section hiển thị theo thứ tự brief. Hero dùng visual grooming mới; kích thước 3ml, nghi thức ba bước và form COD xuất hiện sớm hơn các section cảm xúc. Các visual graphite, hộp kéo–đẩy và giao hàng kín đáo hiển thị đủ khung. |
| Mobile 390×844 | Đạt | Copy hero và copy section được đặt thành block riêng dưới media hoặc nằm trong vùng nền có độ tương phản riêng; không thấy chữ chồng lên ảnh. Form COD hai bước và CTA dính đáy còn dễ chạm. |

## Hạng mục đã xác minh

| Hạng mục | Trạng thái |
|---|---|
| Dùng đúng bảy asset của brief | Đạt |
| Chai 3ml ngắn, nút/vòi graphite và vòng cổ bạc | Đạt |
| Hộp dạng rút đứng, kéo trên và đẩy dưới | Đạt |
| Giữ tối đa hai mood visual full-width | Đạt — staging chỉ dùng hero và evening context full-width, không gắn video mới |
| Không bake copy bán hàng vào ảnh | Đạt — copy là HTML trong component |
| Không làm phát sinh đơn, giảm tồn kho hoặc Pixel production | Đạt — route staging chỉ log funnel preview |

## Ảnh nghiệm thu đã xuất

| Tệp | Kích thước | Kết quả kiểm tra |
|---|---:|---|
| `tempo-staging-desktop-1440.png` | 1440×1000 | Hero staging hiển thị đúng visual grooming, HTML copy, CTA và notice staging; ảnh sản phẩm giữ tỷ lệ ngắn gọn. |
| `tempo-staging-mobile-390.png` | 390×844 | Header đơn giản, packshot không bị crop; sticky purchase bar không che hero và copy bắt đầu ở vùng nền tách riêng phía dưới media. |

## Lưu ý trước production

> Phí giao, thời gian giao, chính sách đổi trả/bảo mật và SKU chưa được V2JOY xác nhận, nên staging giữ nguyên placeholder hiển thị rõ ràng. Cần xác nhận các dữ liệu này trước khi thay route chính hoặc bật ghi nhận COD thực tế.
