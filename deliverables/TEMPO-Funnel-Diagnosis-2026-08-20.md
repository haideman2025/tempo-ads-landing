# Chẩn đoán funnel TEMPO — Dữ liệu hiện có

**Ngày lập:** 20–21/08/2026 (GMT+7)  
**Phạm vi:** Tempo Video 1, Pixel `1955804598438163`, landing `v2joy.life`, Microsoft Clarity và database hàng chờ.  
**Tính chất:** Báo cáo dựa trên dữ liệu quan sát được; không suy diễn hành vi hay nguyên nhân nhân quả khi nguồn dữ liệu chưa có quyền truy cập hoặc chưa phát sinh dữ liệu.

## Kết luận điều hành

> **Chưa có bằng chứng để kết luận rằng “nhiều người đã vào landing nhưng không chuyển đổi”.** Con số 1.388 trong ảnh Ads Manager là *reach* — số tài khoản được tiếp cận — chứ không phải số lượt click hay số phiên landing. Hiện không có số Link Click, Landing Page View, PageView Pixel hoặc Session Clarity để nối tiếp funnel sau reach.

Hai reservation với tổng ba chai đã có trong database, nhưng không có UTM hay attribution theo click quảng cáo, nên không thể gán chúng cho Tempo Video 1. Dữ liệu hiện tại cho thấy vấn đề ưu tiên là **đứt đoạn quan sát funnel**, chưa phải kết luận rằng sản phẩm, creative hoặc landing đã thất bại chuyển đổi.

| Tầng funnel | Dữ liệu hiện có | Trạng thái diễn giải |
|---|---:|---|
| Reach Meta | 1.388 tài khoản | Đã xác nhận từ ảnh; không suy ra traffic website. |
| Impressions / frequency / spend | Chưa có | Cần Ads Insights đúng tài khoản. |
| Link clicks / outbound clicks | Chưa có | Không biết có bao nhiêu người bấm sang landing. |
| Landing page views / Pixel PageView | Chưa có | Pixel TEMPO chưa truy cập được qua phiên Meta hiện tại. |
| Clarity sessions / scroll / rage clicks | Chưa có | Script mới cài; dashboard chưa trả số liệu đọc được. |
| Reservation | 2 lượt | Có thật trong database; không có attribution. |
| Số chai giữ | 3 chai | Có thật trong database; không có attribution. |
| Meta Purchase | Chưa có dữ liệu hiển thị | Không kết luận là 0 cho đến khi mở đúng Pixel. |

## Điều gì đang làm mờ nguyên nhân chuyển đổi

Landing đang gửi sự kiện `Purchase` sau khi đăng ký hàng chờ thành công, nhưng chưa có chuỗi event trung gian đủ để phân biệt: người không vào landing, người vào nhưng không cuộn, người đọc nhưng không chạm form, người bắt đầu form rồi rời đi, hay người submit bị lỗi. Trong khi đó, bản chất offer là **hàng chờ, chưa thanh toán ngay**, nên một khách chưa gửi form không đồng nghĩa với việc họ “không mua”; có thể họ chưa sẵn sàng để lại số điện thoại hoặc chưa hiểu bước tiếp theo.

Tên quảng cáo `Tempo Video 1` gợi ý một creative video, nhưng **không xác nhận mục tiêu tối ưu** của campaign. Nếu campaign được tối ưu cho reach hoặc video views thay vì website conversion/landing-page view, thì reach tăng mà form không tăng là một kết quả có thể xảy ra theo đúng cách Meta phân phối. Điều này phải được kiểm chứng bằng mục tiêu, bidding, placement, spend và delivery trong Ads Manager; không thể kết luận từ tên quảng cáo.

## Ba giả thuyết ưu tiên cần kiểm chứng

| Giả thuyết | Dấu hiệu cần xem | Quyết định sau khi có dữ liệu |
|---|---|---|
| **H1 — Cầu nối quảng cáo → landing yếu** | Link click hoặc LPV thấp so với impressions/reach; URL đích hoặc CTA creative không rõ. | Sửa CTA trên video/caption, link đích, mục tiêu tối ưu và UTM. |
| **H2 — Offer hàng chờ tạo do dự** | LPV/scroll tốt, Form Start thấp; recording cho thấy người xem giá rồi rời trang. | Nói rõ “giữ chỗ, chưa thanh toán”, giá 349.000đ, 3ml/12–15 lần dùng và bước liên hệ ngay gần CTA. |
| **H3 — Ma sát tại form** | Form Start có nhưng Reservation Success thấp; Clarity cho thấy lỗi nhập hoặc bỏ dở. | Rút trường không cần thiết, kiểm tra validation, bổ sung reassurance quyền riêng tư và CTA cố định. |

Hiện landing đã làm rõ giá trị 3ml, trạng thái hàng chờ/chưa thanh toán và masking form. Do đó, **không nên tiếp tục đổi copy lớn chỉ từ reach 1.388**. Trước hết cần xác định người dùng thực sự rơi ở bước nào.

## Kế hoạch đo đủ để ra quyết định

1. **Cấp đúng quyền Meta.** Profile đang mở chỉ nhìn thấy account `344304263732341` với hai dataset thử nghiệm, không phải Pixel TEMPO. Cần thêm quyền xem Pixel `1955804598438163` và tài khoản chứa `Tempo Video 1`, hoặc kết nối lại App Meta Ads Manager.
2. **Đọc cùng một khoảng ngày/giờ.** Lấy spend, impressions, frequency, CPM, outbound clicks, CTR, landing-page views, Purchase và breakdown theo age/placement. Không cộng dồn breakdown để tránh double counting.
3. **Bổ sung sự kiện funnel không chứa PII.** Các điểm tối thiểu: `ViewContent` (landing), `Scroll50`, `FormStart`, `FormSubmitAttempt`, và `ReservationSuccess`. Sự kiện cuối có thể tiếp tục gửi `Purchase` như hiện tại; không gửi tên, điện thoại hoặc email.
4. **Lưu UTM khi reservation thành công.** Ghi `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` và click ID (nếu có) vào bản ghi riêng để attribution dựa trên first-touch; không thay thế dữ liệu platform bằng phỏng đoán.
5. **Đọc Clarity sau khi có session được xử lý.** Chỉ dùng recordings/heatmap để phát hiện pattern giao diện; không dùng dữ liệu form đã mask để suy luận nội dung khách nhập.

## Chỉ số cần xem trong vòng test kế tiếp

| Câu hỏi kinh doanh | Chỉ số cần có | Ý nghĩa đúng |
|---|---|---|
| Quảng cáo có đưa người sang site không? | Outbound clicks, LPV, LPV/click | Chẩn đoán cầu nối ads → trang. |
| Người có đọc offer không? | Scroll 50%, ViewContent, CTA click | Chẩn đoán narrative/CTA. |
| Người có chạm form không? | FormStart / LPV | Chẩn đoán mức ý định và độ rõ offer. |
| Form có gây rớt không? | ReservationSuccess / FormStart, validation errors | Chẩn đoán ma sát biểu mẫu. |
| Creative nào tạo reservation? | Reservation theo UTM content/campaign | Chẩn đoán creative và audience. |

## Kết luận hành động

Trong 24 giờ tới, ưu tiên không phải là thay toàn bộ landing hay tắt campaign chỉ vì không thấy Purchase. Cần **mở quyền đúng cho Pixel/tài khoản quảng cáo và cài lớp đo funnel + UTM**. Khi có ít nhất một cửa sổ thời gian khớp giữa Ads Insights, Pixel và Clarity, nguyên nhân sẽ rơi rõ vào một trong ba nhóm: delivery/traffic, hiểu offer/niềm tin, hoặc ma sát form. Khi đó mới nên ra quyết định về creative, audience hoặc trải nghiệm landing.

## Nguồn dữ liệu

[1]: ../qa/ad-measurement-2026-08-20.md "Biên bản đo lường quảng cáo TEMPO"
[2]: https://www.facebook.com/business/help/750785952855662 "Meta Events Manager — Dataset overview"
[3]: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking "Microsoft Clarity — Masking content"
