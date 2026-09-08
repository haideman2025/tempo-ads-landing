# TEMPO Restore + Enhance V2 — Gói nghiệm thu staging

**Ngày QA:** 08/09/2026 (GMT+7)  
**Route review:** `/staging/tempo-restore-v2`  
**Production `/`:** vẫn map tới `TempoUpgradeProduction`; không đổi route gốc trong đợt Restore V2 này.  
**Trạng thái phát hành:** chỉ chuẩn bị staging; chưa tạo checkpoint mới vì project đang bật auto-publish và owner yêu cầu không phát hành production trước review.

> Đây là một bản **restore + enhance**. Các asset kể chuyện cũ được giữ lại và bảy ảnh V2 được bổ sung vào đúng ngữ cảnh, không dùng để thay thế infographic, video hoặc visual feedback.

## 1. Cấu hình sản phẩm và ranh giới staging

| Hạng mục | Thiết lập đã kiểm tra | Kết quả |
|---|---|---|
| Nguồn giá duy nhất | `client/src/config/tempoProduct.ts` → `PRODUCT_CONFIG` | **Đạt** |
| SKU / dung tích | `tempo-3ml` / TEMPO 3ml | **Đạt** |
| Giá owner chốt | `499.000đ` (`499_000`, VND) | **Đạt** |
| Số lượng tối đa | 2 chai | **Đạt** |
| Phương thức thanh toán | COD | **Đạt** |
| Header bắt buộc | `TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML` | **Đạt** |
| Submit tại staging | Chỉ thông báo mô phỏng và `Lead` cục bộ | **Đạt** |
| Mutation / trừ tồn / PII | Không gọi procedure tạo đơn; không lưu PII | **Đạt** |
| `QualifiedLead` / `Purchase` | Chỉ ghi tài liệu vận hành CRM/CAPI hậu xác nhận/giao thành công | **Đạt** |

## 2. Sitemap Restore V2 đã phục hồi

| # | Section staging | Nội dung và asset chính |
|---:|---|---|
| 1 | Header + hero cinematic | Header nguyên văn, video 01, poster `01-hero-grooming`, CTA đặt nhanh |
| 2 | Dải trust | TEMPO 3ml, COD, số lượng giới hạn và nguyên tắc kín đáo |
| 3 | Opening story | Tuyên ngôn nhịp riêng và hình kể chuyện legacy |
| 4 | Chương cinematic 1 | Video 02 và ảnh pouch `04-portable-grooming-pouch` |
| 5 | Product + fast conversion lane | Tóm tắt đơn sớm, packshot legacy, ảnh tỷ lệ thực `02-scale-hand-3ml` |
| 6 | Thư viện 10 infographic | 01 cover + 09 visual, grid/lightbox desktop và thao tác ảnh mobile |
| 7 | Packaging & detail | Hộp trước/hông/sau, visual cũ và ảnh `06-pull-push-unboxing` — mô tả kéo trên/đẩy dưới |
| 8 | Chương cinematic 2 + legal connection | Video 03, thông tin minh bạch thành phần/nguồn gốc |
| 9 | Nghi thức | Hướng dẫn nguyên văn: `xịt 3–4 nhát, chờ 60 phút rồi rửa sạch`; ảnh actuator graphite `03-ritual-black-actuator` |
| 10 | Chương cinematic 3 + context | Video 04 và ảnh bối cảnh cặp đôi trưởng thành `05-couple-evening-context` |
| 11 | Visual diary | Đủ năm khoảnh khắc legacy với slide, điều hướng và thao tác vuốt |
| 12 | Chương cinematic 4 | Video 05 và CTA dẫn tiếp tới phần minh bạch |
| 13 | Gallery feedback | 3 ảnh xem nhanh + điều hướng đầy đủ 10 visual + disclaimer nguồn V2JOY |
| 14 | Legal / label / thành phần | Label, INCI, Nanofrance, Việt Nam, số CBMP `354/20/CBMP-NB`, cảnh báo và bảo quản |
| 15 | COD hai bước | Order summary, consent COD, consent marketing riêng, placeholder vận hành chưa xác nhận |
| 16 | FAQ / policy placeholder / CTA cuối | FAQ, CTA cuối và điểm yêu cầu owner bổ sung chính sách |

## 3. Inventory asset trước/sau

| Nhóm asset bắt buộc | Trước triển khai | Sau triển khai staging | Trạng thái |
|---|---:|---:|---|
| Cinematic MP4 | 5 URL legacy đã kiểm kê | 5/5 có trong route và trả HTTP 200 `video/mp4` | **Đạt** |
| Infographic | 10 visual legacy | 10/10 trong `INFOGRAPHICS`, grid/lightbox | **Đạt** |
| Visual diary | 5 visual legacy | 5/5 trong `DIARY`, carousel/snap | **Đạt** |
| Packaging legacy | Front, sides, back + product/detail/label | Được đưa vào product, packaging, legal và infographic | **Đạt** |
| Feedback | 10 visual người dùng cung cấp | 10/10 trong `FEEDBACK`, không thêm rating/tên/trích dẫn | **Đạt** |
| Ảnh V2 bổ sung | 7 ảnh WebP/PNG responsive | 7/7 dùng đúng mapping hero, scale, actuator, pouch, couple, pull-push, delivery | **Đạt** |
| Định dạng ảnh | Legacy PNG/WebP + V2 responsive source set | 62 URL media dùng trực tiếp được quét đều trả HTTP 200 và MIME ảnh/video phù hợp | **Đạt** |

### Mapping bảy ảnh V2

| Asset | Vị trí dùng |
|---|---|
| `01-hero-grooming` | Poster/fallback hero cinematic |
| `02-scale-hand-3ml` | Khối product + kích thước thực tế |
| `03-ritual-black-actuator` | Khối nghi thức, xác nhận vòi graphite |
| `04-portable-grooming-pouch` | Chương cinematic 1 / mang theo kín đáo |
| `05-couple-evening-context` | Chương cinematic 3 / bối cảnh nam–nữ trưởng thành |
| `06-pull-push-unboxing` | Packaging / hộp khay trượt kéo trên–đẩy dưới |
| `07-discreet-delivery` | COD / nhận hàng kín đáo |

## 4. QA media, P0 và responsive

| Hạng mục | Bằng chứng | Kết quả |
|---|---|---|
| Video 01 | `readyState=4`, `currentTime=4,64s`, phát tại hero; pause khi rời vùng | **Đạt** |
| Video 02–05 | `readyState=4`, `currentTime` tăng khi chạm vùng; pause ngoài viewport; `MediaError=null` | **Đạt** |
| Video policy | Hero `preload=auto`; 4 clip sau `metadata`, intersection lazy-load, poster, `muted`, `loop`, `playsInline` | **Đạt** |
| Reduced-motion / data saver | `prefers-reduced-motion` và `navigator.connection.saveData` hiển thị poster thay autoplay | **Đạt** |
| P0 direct reload | `/staging/tempo-restore-v2?qa=p0-reload-1` mount `#root[data-app-mounted="true"]` | **Đạt** |
| P0 direct reload sau retry video | Browser tải `/staging/tempo-restore-v2?qa=post-retry-build`; route hiển thị header, CTA, 10 infographic, 5 diary, 10 feedback và form | **Đạt** |
| P0 fallback | Static fallback trước React, guard `#root`, `onRecoverableError`, event `tempo:boot-ready`, ErrorBoundary không lộ stack | **Đạt** |
| Service worker | `navigator.serviceWorker.getRegistrations()` → `0` | **Đạt** |
| Desktop | Full-page `1440 × 1000`, full sitemap hiển thị | **Đạt** |
| Mobile | Full-page `390 × 844`, header đủ text, visual contain, không quan sát chồng chữ | **Đạt** |
| Android Chrome mô phỏng | Chromium headless + Android UA + viewport 390 | DOM mount thành công |
| iPhone Safari mô phỏng | Chromium headless + iPhone Safari UA + viewport 390 | DOM mount thành công; **không thay thế Safari/WebKit thật** |
| Ẩn danh | Chromium `--incognito`, viewport desktop | DOM mount thành công |

## 5. Ma trận event và tracking

| Event | Trigger kỳ vọng | Staging đã kiểm tra | Pixel/CAPI production |
|---|---|---|---|
| `ViewContent` | Mở page | Logger staging cục bộ có `event_id` | Không gửi |
| `ViewInfographic` | 50% gallery vào viewport | Quan sát được qua CustomEvent | Không gửi |
| `ViewRitual` | 50% ritual vào viewport | Quan sát được qua CustomEvent | Không gửi |
| `ViewFeedback` | 50% feedback vào viewport | Quan sát được qua CustomEvent | Không gửi |
| `InitiateCheckout` | CTA/form entry | Quan sát UUID `event_id`, SKU, VND, value 499000 | Không gửi |
| `Lead` | Submit mô phỏng staging | Chỉ log cục bộ; không tạo đơn | Không gửi |
| `QualifiedLead` | Xác minh CRM | Không phát từ UI | Cần vận hành CRM/CAPI owner xác nhận |
| `Purchase` | Giao thành công | Không phát từ UI / không có source `Purchase` | Cần vận hành CRM/CAPI owner xác nhận |

Trên route staging, `window.fbq`, `window.clarity` đều là `undefined`, không có resource Meta Pixel, Clarity hay Umami. Form và các vùng PII mang `data-clarity-mask="true"`; staging không gửi PII ra ngoài.

## 6. Lighthouse staging

Lighthouse được chạy trên preview dev staging, vì vậy số bundle gồm HMR/development không được dùng như chỉ số production cuối cùng.

| Chỉ số | Kết quả staging dev |
|---|---:|
| Performance | 36 |
| Accessibility | 94 |
| Best Practices | 81 |
| SEO | 66 |
| FCP | 4,4s |
| LCP | 23,0s |
| TBT | 1.350ms |
| CLS | 0,044 |
| Speed Index | 6,2s |
| Tổng tải trang | 16.654 KiB |

**Nhận định:** accessibility và CLS ở mức ổn cho staging, nhưng performance chưa đủ điều kiện đưa vào kết luận production. Lighthouse phát hiện phần lớn JavaScript chưa minify do dev server và dung lượng lớn đến từ video/PNG legacy đã được yêu cầu bảo toàn. Bản production build đã tách `TempoRestoreV2Staging` thành chunk riêng `109,58kB` (`16,00kB gzip`) và CSS riêng `24,91kB` (`5,37kB gzip`); đánh giá cuối cần chạy lại trên bundle production sau khi owner duyệt phát hành staging.

## 7. Inventory kinh doanh sau QA

Snapshot truy vấn sau QA trả về: `on_hand=1000`, `reserved=3`, `remaining=997`, `cod_order_count=2` cho `tempo-3ml`.

> Biên bản baseline Restore V2 trước đó xác nhận capacity 1.000 và chưa tạo đơn từ các bước Restore; tuy nhiên transcript truy vấn baseline không giữ giá trị hàng. Vì production vẫn đang hoạt động, không thể quy hai đơn/ba chai hiện có cho staging. Source regression, network audit và submit QA xác nhận **route staging không gọi mutation tạo đơn hoặc trừ tồn**. Owner nên đối chiếu hai đơn qua quy trình vận hành production nếu cần xác định nguồn.

## 8. Kết quả kiểm thử tự động và log

| Kiểm tra | Kết quả |
|---|---|
| Vitest | 10 file pass, 56 test pass; 1 test credential Telegram được skip có chủ đích |
| Production build | Thành công sau retry video; 1.719 module transform; Restore V2 tách chunk `109,93kB` (`16,11kB gzip`) |
| Log sau 06:45 ngày 08/09 | Không có browser error, HTTP 4xx/5xx hoặc Vite syntax/load failure mới |
| Media audit | 62 URL `/manus-storage` trả HTTP 200 với MIME mong đợi |

## 9. Owner cần xác nhận trước phát hành production

| Dữ liệu thiếu | Hiển thị hiện tại | Quyết định owner cần cung cấp |
|---|---|---|
| Phí vận chuyển | Placeholder rõ ràng | Phí COD thực tế theo khu vực/đơn |
| SLA giao hàng | Placeholder rõ ràng | Thời gian giao dự kiến |
| Đổi trả / hoàn tiền / riêng tư | Link/placeholder không tự bịa nội dung | Chính sách đã duyệt hoặc URL chính thức |
| Kênh hỗ trợ | Không suy đoán số điện thoại/địa chỉ | Hotline/Zalo/email chính thức |
| CRM/CAPI | Chỉ nêu quy tắc hậu xác nhận/giao thành công | Trigger, status mapping, event ID/CAPI dedupe owner duyệt |
| Hiệu năng production | Lighthouse chỉ là preview dev | Cho phép checkpoint staging để chạy production-bundle Lighthouse và review live noindex |

## 10. Kết luận review

Route Restore V2 staging đã khôi phục đầy đủ **10 infographic, 5 video, 5 diary visual, gallery packaging, 10 feedback** và toàn bộ 7 ảnh V2 bổ sung; đồng thời giữ nguyên giá 499.000đ qua `PRODUCT_CONFIG`, luồng COD staging không tạo đơn và ranh giới event an toàn. Production root chưa được remap. Bước tiếp theo là owner review staging, chốt dữ liệu vận hành còn thiếu và cho phép checkpoint/phát hành khi phù hợp.
