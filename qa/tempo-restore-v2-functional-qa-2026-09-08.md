# Kiểm thử chức năng — TEMPO Restore + Enhance V2 (Staging)

## Luồng COD staging

Ngày 2026-09-08, form hai bước ở `/staging/tempo-restore-v2` đã nhận dữ liệu kiểm thử không định danh ở bước 01 và chuyển sang bước 02 khi bấm **Tiếp tục địa chỉ**. Bước 02 hiển thị trường địa chỉ, lời nhắn tùy chọn, consent bắt buộc để xác nhận/giao COD, consent marketing tách riêng, tổng tiền 499.000đ/chai và các placeholder vận hành chưa được owner xác nhận.

Trang hiển thị banner rõ ràng: **“Không ghi đơn, không lưu PII, không trừ tồn, không gửi Pixel/CAPI production”**. Bước tiếp theo của QA sẽ chỉ xác minh kết quả mô phỏng tại route staging; không gọi mutation server hoặc tạo đơn thật.

## Kết quả submit mô phỏng

Đã điền dữ liệu QA không định danh, chọn cả consent COD và consent marketing, rồi bấm **Xác nhận đặt COD**. Route staging trả thông báo thành công mô phỏng: **“Đã kiểm tra đủ luồng COD hai bước trên staging. Không có đơn, thông tin liên hệ, trừ tồn kho, Pixel Purchase hoặc CAPI Purchase nào được tạo.”** Không có điều hướng sang endpoint đơn hàng hay thông báo tạo đơn.

Đây là bằng chứng UI của ranh giới staging. `Lead` chỉ là event staging mô phỏng; `QualifiedLead` vẫn được dành cho CRM xác minh, còn `Purchase` chỉ dành cho CAPI sau giao thành công.
