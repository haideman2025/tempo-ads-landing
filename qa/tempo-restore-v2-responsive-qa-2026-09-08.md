# QA responsive — TEMPO Restore + Enhance V2 (Staging)

## Ảnh nghiệm thu đã chụp

| Kiểm tra | Route | Viewport | Kết quả quan sát |
|---|---|---:|---|
| Desktop full-page | `/staging/tempo-restore-v2?qa=desktop-teal` | 1440 × 1000 | Hiển thị đủ tuyến câu chuyện: hero, trust, story, video, product/order lane, 10 infographic, bao bì, ritual, diary, feedback, legal, COD và CTA cuối. CTA được điều chỉnh về teal nhất quán với hệ ivory–graphite–teal. |
| Mobile full-page | `/staging/tempo-restore-v2?qa=mobile-teal` | 390 × 844 | Header giữ đủ nguyên văn `TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML`; ảnh infographic/feedback giữ tỷ lệ `contain` để tránh cắt text. Sticky CTA vẫn hiện ở đáy trong preview trực tiếp (ảnh full-page chủ động ẩn fixed chrome theo cơ chế chụp). |

## Ghi chú UI

Đợt rà soát đã thay màu CTA, ribbon staging, focus state, signal điều hướng và legal callout từ accent cam sang teal. Sắc teal–cam vẫn là một phần của **visual trên artwork bao bì**, đúng yêu cầu nhận diện; không dùng cam như màu hành động thứ hai trên giao diện.

Không ghi nhận nội dung bị chồng lấp trong ảnh kiểm tra. Vì môi trường kiểm thử là Chromium, phần xác minh Safari iOS được ghi là kiểm thử mô phỏng viewport/chuẩn web, không được mô tả như kiểm thử trên thiết bị Safari vật lý.

## Lượt chụp sau fallback tải

Ngày 2026-09-08, lượt full-page desktop `1440 × 1000` tại `/staging/tempo-restore-v2?qa=acceptance-desktop` tiếp tục mount đủ hero, dải trust, tuyến story, chương video, lane đặt hàng, infographic, bao bì, ritual, diary, feedback, legal, form và CTA cuối sau khi `Suspense` chuyển từ vùng trống sang `LoadingFallback` có thương hiệu. Lượt chụp mobile được thực hiện riêng với viewport `390px` để không suy diễn từ ảnh desktop.

Lượt full-page mobile `390 × 844` tại `/staging/tempo-restore-v2?qa=acceptance-mobile-390` giữ đủ header bắt buộc, các visual vuông được hiển thị trong khung không crop text, section flow không chồng chữ và form COD xuất hiện đầy đủ. Sticky CTA là phần tử `fixed` nên bị cơ chế chụp full-page chủ động ẩn; trạng thái sticky đã được kiểm tra trong preview trực tiếp ở lượt QA trước.
