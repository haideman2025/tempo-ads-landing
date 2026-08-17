# TEMPO Packaging Replacement Audit

**Mục đích:** Chặn toàn bộ visual bao bì thiếu chữ TEMPO, nhãn không hoàn chỉnh hoặc sai quy cách khỏi landing trước khi chạy ads.

| Asset chuẩn đã kiểm tra | Kết quả quan sát | Phạm vi sử dụng được phép |
| --- | --- | --- |
| `tempo-pack-5ml-standalone-final` | Một chai 5ml và một hộp 5ml; chữ **TEMPO** rõ trên chai/hộp, sóng teal, badge V2JOY và nắp graphite. | Card 5ml, visual tham chiếu sản phẩm và cảnh cần thể hiện một format 5ml. |
| `tempo-pack-2x5ml-verified` | Hai chai 5ml và hai hộp 5ml; toàn bộ chữ **TEMPO** rõ, không xuất hiện 3ml. | Card bundle 2×5ml và visual tham chiếu bundle. |

## Danh mục thay thế trong code

Các asset tên `tempo-p01-3ml-front`, `tempo-p03-duo`, `tempo-pack-primary-v2`, `tempo-pack-scale-v2`, `tempo-pack-unboxing-v2`, `tempo-l09-date-table` và các ảnh lifestyle/provenance cũ chưa được duyệt lại về độ rõ nhãn sẽ không còn là nguồn ảnh bao bì trên trang. Các visual mới sẽ ưu tiên bối cảnh không có packshot, hoặc chỉ dùng packshot đã ghi ở bảng trên khi cần trình bày sản phẩm.

## Video hero

Markup bản chạy vẫn công bố nguồn MP4 `tempo-motion-05-duo-hero`; sự cố cần xử lý ở tầng phát/khôi phục client và độ nhìn thấy qua lớp phủ, không phải URL nguồn bị thiếu trong HTML.

## Kiểm tra visual chapter thảo mộc mới

| Visual | Kết quả kiểm tra trực quan | Trạng thái |
| --- | --- | --- |
| `tempo-botanical-01-traditional-herbarium` | Tĩnh vật lá/rễ/chất liệu thủ công trên nền graphite; không có chữ, bao bì, bản đồ, chứng nhận hay claim. Có khoảng thở để đặt caption. | Đạt |
| `tempo-botanical-02-extraction-studio` | Bố cục thủy tinh, chất liệu thực vật, sắc teal tiết chế; không có ký tự rác, thương hiệu hoặc tín hiệu y khoa. | Đạt |
| `tempo-botanical-03-ingredient-ledger` | Sổ mở trắng, kính lúp và vật liệu thực vật; không có ký tự rác, nhãn hoặc nội dung tự nhận là tài liệu xác thực. | Đạt |
| `tempo-botanical-04-materials-night` | Tĩnh vật tối với lá/rễ, khay sơn mài và sóng teal; không xuất hiện bao bì, chứng nhận, bản đồ hoặc claim. | Đạt |

Các visual này được dùng như diễn giải hình ảnh, không phải bằng chứng cho vùng trồng, nước xuất xứ hoặc công dụng riêng của từng chiết xuất.

## Kiểm tra infographic bán hàng có chữ

| Visual | Kết quả kiểm tra trực quan | Trạng thái |
| --- | --- | --- |
| `tempo-infographic-03-botanical-index` | Chữ TEMPO, tiêu đề “9 CHIẾT XUẤT THỰC VẬT TRONG DANH MỤC INCI”, chín tên thành phần và ghi chú không gán công dụng riêng đều đọc rõ; không có chai hoặc claim y khoa. | Đạt |
| `tempo-infographic-04-inci-order` | Thứ tự Purified Water → Alcohol (Ethanol) → Butylene Glycol → 9 chiết xuất thực vật → Panthenol và claim “Giúp chăm sóc dưỡng ẩm da.” hiển thị rõ; không có claim ngoài hồ sơ. | Đạt |
