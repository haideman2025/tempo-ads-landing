# Biên bản bằng chứng funnel TEMPO — 21/08/2026

## Nguồn và phạm vi

Ảnh chụp Ads Manager do chủ dự án cung cấp, bộ lọc hiển thị **Hôm qua: 20 tháng 8, 2026**. Hai lát đầu xác nhận đây là một chiến dịch đang bật, có tên giao diện bị cắt ngắn: `V2JOY | TEMPO 3ml | Conversion | Test 10 mẫu k...`.

## Số liệu xác minh được từ hai lát đầu

| Chỉ số hiển thị trong Ads Manager | Giá trị đọc được | Ghi chú |
|---|---:|---|
| Reach | 2.051 | Đơn vị Reach của Meta là Accounts Center accounts. |
| Frequency | 1,03 | Dữ liệu một ngày, có thể thay đổi do ảnh được lọc “Hôm qua”. |
| Budget | 500.000 ₫ mỗi ngày | Là mức ngân sách cấu hình, không phải Amount spent. |
| Trạng thái | Đang diễn ra | Không suy diễn về kết quả chuyển đổi từ trạng thái này. |

## Số liệu xác minh từ toàn bộ ảnh Ads Manager

| Chỉ số hiển thị trong Ads Manager | Giá trị đọc được | Ghi chú |
|---|---:|---|
| Amount spent | 106.498 ₫ | Chi phí ghi nhận trong khung ngày của ảnh. |
| Impressions | 2.115 | Hiển thị ghi nhận trong khung ngày của ảnh. |
| CPM (cost per 1,000 impressions) | 50.354 ₫ | Giá trị hiển thị trực tiếp trong Ads Manager. |
| Link clicks | 237 | Đây là chỉ số có thể đối chiếu với session landing, không dùng Clicks (all). |
| CPC (cost per link click) | 449 ₫ | Giá trị hiển thị trực tiếp trong Ads Manager. |
| CTR (link click-through rate) | 11,21% | Giá trị hiển thị trực tiếp trong Ads Manager. |

Ảnh không hiển thị landing page views, Purchase hoặc cost per result. Các chỉ số này phải được lấy ở cấp tài sản Pixel/campaign đúng và đối chiếu với Clarity cùng khung ngày; không được tự tính hay ước lượng.

## Số liệu xác minh từ Clarity

Ảnh Clarity đang lọc **Last 3 days**. Vì khung ngày này rộng hơn ảnh Ads Manager, bảng dưới chỉ dùng để phân tích hành vi và hiệu năng; không dùng làm tỷ lệ đối soát trực tiếp với chi phí một ngày của Ads Manager.

| Chỉ số | Giá trị đọc được | Diễn giải có kiểm soát |
|---|---:|---|
| Sessions | 237 | Clarity ghi rõ đã loại 9 bot sessions. |
| Unique users | 235 | Hầu như không có lượt quay lại trong khung quan sát. |
| Pages per session | 1,14 | Phần lớn là một phiên trang đơn. |
| Scroll depth trung bình | 34,94% | Form hàng chờ hiện ở rất sâu trong trang nên đa số người dùng chưa tới form. |
| Active time spent | 15 giây | Trong tổng thời lượng phiên hiển thị là 1 phút. |
| Facebook App | 228 sessions / 96,20% | Luồng tối ưu cần ưu tiên in-app browser của Facebook. |
| facebook.com + m.facebook.com | 227 sessions | Nguồn referral chính; thêm `l.facebook.com` là 1 session. |
| LCP | 6,1 giây | Clarity phân loại Poor; đây là chỉ số cần khắc phục ưu tiên. |
| INP | 200 ms | Clarity phân loại Good. |
| CLS | 0 | Clarity phân loại Good. |
| JavaScript errors | 11 lỗi / 3,80% | 90,91% được Clarity phân loại `error invoking postmessage: java object is gone`; chưa đủ bằng chứng để gán đây là lỗi của mã TEMPO, cần theo dõi tách theo source sau khi phát hành. |

### Kết luận thao tác

Traffic vào landing là có thật và gần khớp giữa Meta Link clicks cùng Clarity sessions. Dấu hiệu rớt chính nằm **sau click**: trang dài, form ở cuối, thời gian chú ý ngắn và LCP kém trong Facebook App. Các lượt đăng ký đã tồn tại không có UTM lịch sử, nên không được gán nguồn hồi tố.
