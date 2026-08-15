# Night Confident — Visual QA & Asset Recovery

## Kiểm tra ngày 2026-08-15

Landing đã đạt bố cục desktop/mobile, form hàng chờ và CTA hiển thị đúng cấu trúc. Tuy nhiên toàn bộ visual được tạo theo batch `tempo-reference-pair` và các ảnh 01–14 hiện trả về placeholder **“Image generation failed”**. Đây là lỗi asset, không phải lỗi CSS hoặc layout.

## Quyết định khắc phục

- Không dùng các URL asset lỗi trong bản bàn giao.
- Dùng bộ mockup TEMPO đã duyệt tại kho V2JOY làm asset ổn định tức thời: primary v2, unboxing v2, và scale-iPhone v2.
- Tạo lại bộ 10–15 visual sau khi khóa một reference frame hoạt động; không tham chiếu ảnh sinh lỗi theo chuỗi.
- Giữ logo V2JOY từ file người dùng cung cấp làm source of truth trên toàn site.

## Ghi chú UX

- Mobile có sticky CTA rõ ràng; form hiện thông báo đây là hàng chờ, không phải thanh toán.
- Trước phát hành cần thay thế toàn bộ placeholder; các ảnh concept phải có caption xác nhận là visual trước sản xuất.
