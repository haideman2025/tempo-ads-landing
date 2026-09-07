# Đối chiếu brief — TEMPO Upgrade Staging

**Nguồn brief:** `/home/ubuntu/upload/TEMPO-Landing-Upgrade-Manus-AI.zip`  
**Tài liệu gốc:** `MANUS-AI-LANDING-UPGRADE-BRIEF.md` trong gói người dùng cung cấp.  
**Asset source:** Bảy ảnh trong thư mục `assets/` của cùng gói. Chỉ các bản WebP/PNG đã upload qua storage web được dùng trong staging.

| Asset brief | Vai trò staging |
|---|---|
| `01-hero-grooming` | Hero full-width, copy HTML tách khỏi ảnh trên mobile |
| `02-scale-hand-3ml` | Chứng minh tỷ lệ chai 3ml trong lòng bàn tay |
| `03-ritual-black-actuator` | Nghi thức ba bước, nút/vòi graphite và cổ bạc |
| `04-portable-grooming-pouch` | Bối cảnh mang theo kín đáo |
| `05-couple-evening-context` | Mood full-width thứ hai và cũng là mood full-width cuối |
| `06-pull-push-unboxing` | Giải thích hộp rút đứng: kéo trên, đẩy dưới |
| `07-discreet-delivery` | Context giao hàng kín đáo và form COD |

## Quy tắc đã áp dụng

1. Landing staging gồm chín section: Hero; TEMPO là gì; kích thước & bối cảnh; nghi thức; evening context; thiết kế pull–push; thông tin minh bạch; offer COD hai bước; FAQ/chính sách và CTA cuối.
2. Chai được thể hiện là **3ml nhỏ, ngắn**; nút/vòi graphite, cổ bạc; visual teal–cam nối liền trên hộp và chai.
3. Không thêm claim điều trị, gây tê, kéo dài thời gian, tăng cường sinh lý hoặc cam kết kết quả. Không dùng review/rating giả.
4. Dữ liệu nhãn đã xác nhận được giữ trong staging: INCI, hướng dẫn `xịt 3–4 nhát, chờ 60 phút rồi rửa sạch`, lưu ý chỉ dùng ngoài da/cảnh báo, số công bố và xuất xứ trong vùng thông tin chi tiết.
5. Phí giao, thời gian giao, quy cách policy và SKU chưa có dữ liệu V2JOY xác nhận; mọi vị trí này hiển thị `CẦN V2JOY XÁC NHẬN` hoặc `PLACEHOLDER CẦN V2JOY XÁC NHẬN` thay vì tự bịa.
6. Staging không tạo đơn, không giảm tồn, không gửi Pixel production. Policy funnel đã khóa: `ViewContent → InitiateCheckout → Lead → QualifiedLead → Purchase`; `QualifiedLead` sau gọi xác nhận hợp lệ và `Purchase` chỉ sau giao COD thành công.
7. Chưa có checkpoint mới hay phát hành production cho route chính `/` trong phạm vi bản staging.
