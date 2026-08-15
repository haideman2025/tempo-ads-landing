# TEMPO — Image-led QA Record

## Kết quả giao diện

Landing đã được kiểm tra ở desktop 1280×720 và mobile 375×812 sau khi chuyển sang cấu trúc ưu tiên hình ảnh. Mạch mới giữ một visual lớn cho mỗi nhịp chính, đưa chapter “Botanical Studies + Made in Vietnam” vào trước phần minh bạch, rút diary còn caption ngắn và giữ các chi tiết tra cứu trong phần mở rộng.

Trên mobile, nhóm visual nguồn gốc xếp thành một cột tuần tự; không có tràn ngang ở khung ảnh, visual diary hoặc form hàng chờ. Form vẫn hiện đầy đủ bốn format, bao gồm 3ml, 5ml, Duo và 2×5ml.

## Ranh giới thông tin đã kiểm tra

Visual và copy chỉ khẳng định TEMPO **sản xuất tại Việt Nam** bởi NANOFRANCE, Ninh Bình. Ảnh thảo mộc được ghi chú là diễn giải danh mục chiết xuất thực vật; không có tuyên bố vùng trồng hoặc nước xuất xứ cho từng nguyên liệu. Công dụng duy nhất còn lại là đúng theo nhãn: “Giúp chăm sóc dưỡng ẩm da.”

## Kiểm thử tự động

`pnpm test` đã chạy thành công: 4 test suite, 19 assertions. Bộ test bao phủ video motion, visual diary, Golden Circle, bốn SKU hàng chờ, packshot đúng quy cách, module minh bạch, ranh giới tuyên bố về nguyên liệu/xuất xứ, carousel, typography và accessibility baseline. Production build cũng hoàn tất thành công.

Sáu URL asset image-led trả `200 image/webp` qua lớp phân phối, gồm bốn visual provenance và hai keyframe nghi thức. Visual thứ hai, `Carry the Signal`, đã hiện hữu tại độ phân giải 1664×2080 ở kho asset.

Không gửi form thật trên môi trường đang dùng vì thao tác đó sẽ tạo một dữ liệu liên hệ và chiếm một trong 1.000 suất hàng chờ. Luồng server-side được xác nhận qua test hiện hữu của `server/waitlist.test.ts`; cần một đăng ký thật do chủ dự án thực hiện khi muốn nghiệm thu luồng production, với một thông tin liên hệ hợp lệ và có sự đồng ý rõ ràng.

## Redesign lifestyle-first — 15/08/2026

Đã kiểm tra full-page ở desktop 1280×720 và mobile 390×844 sau khi chuyển các điểm nhịp chính từ packshot trực diện sang bối cảnh cảm xúc: rời ngày dài, đi bộ ban đêm, chuẩn bị ở nhà, khoảng riêng và buổi sáng trở lại. Các vùng ảnh mới giữ đúng tỷ lệ, không xuất hiện ảnh vỡ hoặc tràn ngang trong hai viewport đã kiểm tra; logo V2JOY ở header, trust chapter và footer đều dùng badge bo tròn tái sử dụng.

Năm asset lifestyle đầu tiên đã được kiểm tra qua lớp phân phối. Bốn ảnh trả `200 image/webp`; asset date-night cũ trả SVG báo lỗi tạo ảnh. Phương án tạo lại cũng trả placeholder lỗi, nên đã loại khỏi landing thay vì giữ ảnh chờ. Điểm nhịp này hiện dùng visual date-table hiện hữu `tempo-l09-date-table_dcf91e62.jpg`, đã xác nhận là JPEG 1600×2000 hợp lệ qua lớp phân phối. Không còn URL placeholder trong markup landing.

## Video, carousel và typography — 15/08/2026

Năm video người dùng cung cấp đã được tích hợp vào các chapter nhịp tối, mỗi video có fallback poster và thuộc tính `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"`. Carousel có control tiến/lùi, indicator có nhãn truy cập và tự chuyển sang bố cục một cột ở viewport 375 px. Cảnh cặp đôi hiển thị trên landing đã được thay bằng một nam và một nữ trưởng thành.

Font mặc định được chuyển sang Be Vietnam Pro, Lora dùng có chủ đích cho nhịp chữ biên tập; trang không còn phụ thuộc vào font thiếu Latin Extended. Screenshot full-page desktop 1280×720 và mobile 375×812 không cho thấy placeholder, ảnh lỗi tải hay tràn ngang ở các module video, carousel, infographic, diary và hàng chờ. `pnpm test` đạt 4 suites / 19 tests; `pnpm build` hoàn tất thành công.

## Tương tác motion & reduced-motion — 15/08/2026

Carousel motion hiện ghi nhận điểm chạm đầu/cuối, chỉ đổi scene khi dịch ngang tối thiểu 44 px và giữ thao tác cuộn dọc bằng `touch-action: pan-y`. Các nút trước/sau và indicator vẫn là phương án tương tác bằng chuột/bàn phím. Toàn bộ hành vi này được kiểm tra tĩnh qua `Home.visuals.test.ts` cùng thuộc tính `data-swipe="enabled"` trên stage.

Khi hệ điều hành đặt `prefers-reduced-motion: reduce`, hook `useReducedMotion` ngăn video autoplay, CSS ẩn video và giữ poster/fallback có alt text. Ở chế độ mặc định, video carousel cập nhật trạng thái phát qua `onPlaying`, tạm dừng qua `onPause`, và hiển thị fallback khi `onError`; trạng thái hiện diện dưới `data-playback-state` để có thể quan sát trong browser inspector. Desktop 1280×720 và mobile 375×812 đã được chụp lại sau thay đổi, không thấy tràn ngang hoặc khung ảnh lỗi. Việc xác nhận chuyển động frame-by-frame trên thiết bị thật vẫn nên thực hiện trước khi tăng ngân sách quảng cáo.

## Xác minh playback UI — 15/08/2026

Kiểm thử UI bằng Chromium headless qua DevTools Protocol đã mở landing thật, chuyển lần lượt cả bốn tab carousel và đo DOM media ở desktop lẫn mobile. Cả 8 phép đo đều trả `data-playback-state="playing"`, `readyState: 4`, `paused: false`, `currentTime > 0`, `muted: true`, `autoplay: true`, `loop: true`, `playsInline: true` và `errorCode: null`. Cảnh đầu từng có thể phát trước hydration nên giữ nhãn `loading`; đã bổ sung đồng bộ `timeupdate` để phản ánh đúng trạng thái phát thực tế. Kiểm thử cuối xác nhận cảnh 01–04 đều hiển thị `playing` ở cả hai breakpoint.

## Audit UI cuối: hero, fallback, form và asset media — 15/08/2026

Audit Chromium mới nhất chạy trực tiếp trên `http://localhost:3000` với desktop 1280×720 và mobile 375×812. **Hero và cả bốn tab carousel** đều đạt `readyState: 4`, `currentTime > 0`, `paused: false`, `muted: true`, `autoplay: true`, `loop: true`, `playsInline: true`, `errorCode: null`; carousel báo `data-playback-state="playing"`, không có fallback được render và video hiển thị thật ở chế độ mặc định.

Khi mô phỏng `prefers-reduced-motion: reduce`, hero không autoplay; carousel báo `reduced-motion`, video carousel bị ẩn và một ảnh fallback hiển thị. Khi cố ý đổi nguồn carousel sang một tệp không tồn tại, carousel báo `error`, video bị ẩn và fallback xuất hiện. Kiểm thử form rỗng trên DOM trả `validWhenEmpty: false` với 3 trường bắt buộc, không gửi mutation và không tạo dữ liệu hay chiếm quota danh sách chờ.

Năm video đã được nạp trong audit mà không có lỗi media. Artifact desktop ghi nhận thời gian tài nguyên **241,4–741,3 ms**; mobile ghi nhận **252,8–678,6 ms**. Ở mỗi viewport, Resource Timing nhận 16 entry `/manus-storage/` và `Network.loadingFailed: 0`; status/transfer size trong DevTools đều là `0` vì response opaque/cache, nên không dùng trường đó để suy luận lỗi HTTP hay dung lượng byte.

### Response và byte audit — 15/08/2026

Để tách lỗi HTTP khỏi hạn chế opaque của DevTools, toàn bộ URL phân phối được audit độc lập bằng request Range. Kết quả: **61/61 URL** trả HTTP **206 Partial Content** hợp lệ — 56 ảnh `image/webp` và 5 video `video/mp4`; không có 4xx/5xx. `Content-Range` ghi tổng **6.511.884 bytes** cho ảnh WebP và **12.188.111 bytes** cho video, tức **18.699.995 bytes**. Artifact dự án [`TEMPO-asset-audit-20260815.tsv`](./TEMPO-asset-audit-20260815.tsv) lưu nguyên kết quả tổng hợp `TOTAL=61 OK=61 FAILED=0`. Những con số này là baseline phát hành; không suy luận tỷ lệ giảm so với file nguồn vì manifest chuyển đổi không lưu byte nguồn.
