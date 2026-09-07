# Biên bản nghiệm thu staging — TEMPO 3ml by V2JOY

**Ngày kiểm tra:** 07/09/2026 (GMT+7)  
**Môi trường duyệt:** `/staging/tempo-upgrade`  
**Trạng thái:** **Chờ V2JOY duyệt — chưa phát hành production**

## 1. Phạm vi và biện pháp bảo toàn

| Hạng mục | Kết quả |
|---|---|
| Sao lưu trước khi làm | Đã tạo snapshot độc lập của production tại commit `fa8f78cd`: `tempo-production-before-upgrade-fa8f78cd.zip` và `tempo-production-fa8f78cd.tar.gz` trong vùng backup ngoài dự án. |
| Tách staging | Đã thêm route riêng `/staging/tempo-upgrade`; landing đang live ở `/` và file `Home.tsx` không bị chỉnh sửa trong lần nâng cấp này. |
| Trạng thái phát hành | Không lưu checkpoint và không phát hành phiên bản staging lên `v2joy.life`. |
| Chống lập chỉ mục staging | Route thêm `meta robots="noindex, nofollow"`; `robots.txt` chặn `/staging/`. Vì vậy điểm SEO Lighthouse ở staging có chủ ý bị giảm ở tiêu chí crawlability. |

> **Lưu ý:** Canonical và Product JSON-LD đã có để kiểm tra cấu trúc kỹ thuật. Khi được duyệt để thay production, chỉ dẫn `noindex` và chặn `/staging/` sẽ không được mang sang URL chính.

## 2. Cấu trúc chín section đã triển khai

| # | Section | Thay đổi chính | Asset từ gói brief |
|---:|---|---|---|
| 1 | Hero | Copy hero đầy đủ, giá 499.000đ, CTA COD sớm, trạng thái 3ml và quy trình gọi xác nhận. | `01-hero-grooming` |
| 2 | TEMPO là gì | Ba lợi ích ngắn, không dùng claim điều trị/hiệu quả. | — |
| 3 | Kích thước & bối cảnh | Đưa “3ml thực tế” và mang theo kín đáo lên sớm. | `02-scale-hand-3ml`, `04-portable-grooming-pouch` |
| 4 | Nghi thức ba bước | Vệ sinh/lắc đều → xịt 3–4 nhát → chờ 60 phút/rửa sạch; giữ cảnh báo dùng ngoài da. | `03-ritual-black-actuator` |
| 5 | Bối cảnh buổi tối | Bối cảnh cảm xúc được rút gọn sau phần thông tin thực dụng; không chứa claim nhạy cảm. | `05-couple-evening-context` |
| 6 | Thiết kế hộp | Mô tả đúng khay rút đứng: **kéo trên · đẩy dưới**, cửa kính vừa phải; không mô tả nắp mở. | `06-pull-push-unboxing` |
| 7 | Phản hồi + minh bạch | Không đưa rating, testimonial hay phản hồi chưa xác thực; giữ hướng dẫn, INCI, cảnh báo, nhà sản xuất và số công bố. | — |
| 8 | Offer + COD | Form hai bước, giá/01–02 chai, gọi xác nhận, đóng gói kín đáo và các placeholder vận hành rõ ràng. | `07-discreet-delivery` |
| 9 | FAQ + policy + CTA | FAQ claim-safe, placeholder policy và CTA cuối được gộp đúng section. | — |

Không dùng video full-width trong bản staging, tức **0/2 video tối đa** theo brief. Toàn bộ thông điệp bán hàng được viết bằng HTML; hình chỉ đóng vai trò visual.

## 3. Kiểm tra ràng buộc visual và nội dung

| Tiêu chí bắt buộc | Kết quả staging |
|---|---|
| Đúng bảy ảnh trong `assets` | Đủ bảy visual; mỗi visual có WebP 480px, 960px, bản gốc và PNG fallback. Không tạo visual sản phẩm mới. |
| Chai TEMPO 3ml | Nội dung mô tả nhỏ gọn; không phóng đại dung tích hoặc kéo dài chai. |
| Nút nhấn/vòi graphite, vòng cổ bạc | Alt text và visual nghi thức chỉ định nút nhấn đen graphite, vòng cổ bạc. |
| Hộp rút đứng | Nội dung và visual dùng nguyên tắc kéo trên/đẩy dưới, có cửa kính vừa phải. |
| Visual teal–cam liền mạch | Được mô tả nhất quán từ hộp sang chai trong section thiết kế. |
| Legal/product safety | Giữ hướng dẫn đã xác nhận: “xịt 3–4 nhát, chờ 60 phút rồi rửa sạch”, INCI, cảnh báo, Nanofrance, xuất xứ Việt Nam và số công bố hiển thị `354/20/CBMP-NB`. |
| Claim và social proof | Không thêm claim điều trị, gây tê, kéo dài thời gian, tăng cường sinh lý, cam kết hiệu quả, rating hoặc phản hồi giả. |

## 4. COD, tracking và dữ liệu vận hành

| Hành vi | Thiết kế staging | Khi được duyệt chuyển production |
|---|---|---|
| Form COD | Hai bước: **Thông tin** → **Địa chỉ & xác nhận**. Staging chỉ hiển thị notice, không gọi mutation tạo đơn. | Nối lại thủ tục tạo đơn nguyên tử hiện có sau khi V2JOY duyệt. |
| Tồn kho | Chỉ đọc trạng thái hiển thị; không tạo đơn và không giảm tồn kho. | Giữ giới hạn 1.000 chai và tối đa 02 chai/đơn. |
| Pixel/CAPI | Chỉ ghi `console.info` staging; không gửi Pixel production. | `ViewContent` khi xem; `InitiateCheckout` khi bắt đầu form; `Lead` khi server nhận COD thành công; `QualifiedLead` khi V2JOY xác nhận đơn hợp lệ; `Purchase` **chỉ** sau khi đơn được đánh dấu giao thành công. |
| Dữ liệu cá nhân | Form mang `data-clarity-mask="true"`; event không mang PII. | Duy trì che Clarity và không truyền PII qua tracking payload. |

## 5. Dữ liệu cần V2JOY xác nhận trước production

| Dữ liệu thiếu | Hiển thị trên staging | Cần V2JOY xác nhận |
|---|---|---|
| Phí giao hàng | `CẦN V2JOY XÁC NHẬN` | Mức phí, miễn phí theo điều kiện nào và phạm vi áp dụng. |
| Thời gian giao | `CẦN V2JOY XÁC NHẬN` | SLA theo khu vực và khung giao. |
| Chính sách | Placeholder cho bảo mật, giao hàng, đổi trả, điều khoản/hỗ trợ. | URL hoặc nội dung pháp lý chính thức của từng chính sách. |
| SKU | Chưa tự gán. | SKU TEMPO 3ml chính thức để dùng trong feed/tracking nếu cần. |
| Funnel hậu cần | Chưa tự suy diễn trạng thái. | Trạng thái nghiệp vụ/nguồn dữ liệu xác nhận đơn và giao thành công để kích hoạt `QualifiedLead`/`Purchase` server-side. |
| Phản hồi nhóm dùng thử | Không trích riêng trong staging. | Xác nhận quyền dùng và cách ghi nguồn nếu muốn đưa lại gallery phản hồi thật. |

## 6. Kiểm thử và Lighthouse

### Regression & build

| Kiểm thử | Kết quả |
|---|---|
| Vitest | **47 passed, 1 skipped**. Kiểm thử bị skip là kiểm tra credential Telegram ngoài mạng theo cấu hình, không phải lỗi landing. |
| Production build | Thành công. Route staging được code-split, bundle riêng `TempoUpgradeStaging` khoảng 11,03 KiB gzip; stylesheet staging khoảng 4,38 KiB gzip. |
| QA trực quan | Đã kiểm tra desktop 1440px và mobile 390px; Hero/CTA rõ, text không bake vào ảnh, các khối text-media tách thứ tự trên mobile, form hai bước và sticky CTA hiển thị. |
| Form/inventory | Không submit mutation trong QA; không tạo COD và không thay đổi tồn kho. |

### Lighthouse từ production-local staging

| Profile | Performance | Accessibility | Best practices | SEO | Chỉ số chính |
|---|---:|---:|---:|---:|---|
| Mobile | 36 | 100 | 81 | 69 | FCP 7,2s; LCP 10,5s; TBT 1.060ms; CLS 0; TTI 15,0s |
| Desktop | 83 | 100 | 81 | 69 | FCP 1,5s; LCP 2,1s; TBT 70ms; CLS 0,001; TTI 3,0s |

Điểm **SEO 69** ở cả hai profile phản ánh route staging bị `noindex`/robots chặn có chủ ý, không phải một khuyến nghị đưa staging vào chỉ mục. Mobile performance hiện **chưa phải mức nên phát hành production**: audit chỉ ra tải JavaScript của application shell, CSS/JS chưa dùng hết và công việc main thread cao trong mô phỏng CPU mobile. Các ảnh hero và sáu visual còn lại đã dùng `srcset` WebP 480/960, `sizes`, `width`/`height`, `decoding="async"`, lazy-loading ngoài hero.

> **Khuyến nghị nghiệm thu:** duyệt trước cấu trúc, copy và visual; sau khi nhận dữ liệu vận hành, thực hiện một vòng tối ưu performance mobile và nối tracking server-side trước khi thay route production. Không nên dùng điểm SEO staging làm điểm SEO cuối của `v2joy.life`.

## 7. Tệp nghiệm thu

| Tệp | Mục đích |
|---|---|
| `tempo-staging-desktop-1440.png` | Ảnh chụp staging desktop viewport 1440px. |
| `tempo-staging-mobile-390.png` | Ảnh chụp staging mobile viewport 390px. |
| `lighthouse-staging-final-acceptance-mobile-2026-09-07.report.html` | Báo cáo Lighthouse mobile chi tiết. |
| `lighthouse-staging-acceptance-desktop-2026-09-07.report.report.html` | Báo cáo Lighthouse desktop chi tiết. |
| `tempo-upgrade-brief-implementation-2026-09-07.md` | Đối chiếu brief và mapping bảy asset. |
| `tempo-upgrade-staging-visual-qa-2026-09-07.md` | Biên bản QA trực quan trước nghiệm thu. |

## 8. Bảng kiểm nghiệm thu

| # | Hạng mục | Kết quả | Trạng thái |
|---:|---|---|---|
| 1 | Snapshot và staging route riêng | Có snapshot tại `fa8f78cd`; route staging tách biệt | Đạt |
| 2 | Chín section theo brief | Đủ 09 section semantic | Đạt |
| 3 | Hero và bảy asset | Hero 01, dùng đủ bảy asset gốc/biến thể responsive | Đạt |
| 4 | Ưu tiên 3ml/mang theo/nghi thức | Section 3 và 4 được đặt trước section cảm xúc | Đạt |
| 5 | Video/mood | 0 video full-width, không vượt giới hạn 02 | Đạt |
| 6 | Hộp rút đứng pull–push | Visual 06 + copy kéo trên/đẩy dưới | Đạt |
| 7 | COD hai bước và vận hành | UI đạt; phí/SLA/policy còn placeholder đúng yêu cầu | Chờ xác nhận |
| 8 | FAQ, policy, JSON-LD, responsive, a11y | Đã có; accessibility Lighthouse 100 | Đạt |
| 9 | Funnel event | Policy đúng; staging không gửi Pixel/không tạo Purchase | Chờ nối production sau duyệt |
| 10 | Hiệu năng mobile | Có WebP responsive/lazy load nhưng LH mobile Performance 36 | Cần tối ưu trước production |
| 11 | Production | Chưa checkpoint/chưa publish | Đúng yêu cầu |

**Đề nghị duyệt:** xác nhận phần cấu trúc/visual/copy cùng các dữ liệu vận hành tại Mục 5. Sau khi có xác nhận, có thể thực hiện vòng tối ưu mobile và chuyển staging đã duyệt sang route production một cách kiểm soát.
