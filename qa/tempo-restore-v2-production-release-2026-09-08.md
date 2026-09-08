# TEMPO Restore V2 — Xác minh production

**Thời điểm:** 08-09-2026 (GMT+7)  
**Checkpoint phát hành sửa route:** `21710f67`  
**URL kiểm thử cache-bypass:** `https://v2joy.life/?release=21710f67&verify=restore-v2-root-second-906`

## Kết quả

| Hạng mục | Kết quả xác minh |
|---|---|
| Route gốc | `v2joy.life/` đã render TEMPO Restore V2 ở production mode |
| Header | Có nguyên văn `TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML` |
| Bundle mới | HTML production đã hoàn tất mount React sau fallback P0; title là `TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML \| V2JOY` |
| Hero video | Video 01 dùng `tempo-background-01_9f851f78.mp4`, `readyState=4`, `paused=false`, `currentTime` tăng, không có MediaError |
| Video theo section | Kịch bản cuộn nạp đủ năm video. Mỗi video tự phát khi section đi vào viewport và tự pause khi rời section; không cần thao tác bấm |
| Tải tuần tự | Bằng chứng phát gồm video 01 tại y=0; video 02 tại y=1440; video 03 tại y=5040/5760; video 04 tại y=6480/7200; video 05 tại y=7920/8640. Cuối lượt cuộn, cả năm video pause ngoài viewport |
| Nội dung khôi phục | Còn 10 infographic, visual diary 5 ảnh, gallery bao bì, feedback 10 visual, legal, FAQ và form COD production |

## Lưu ý cache edge

Lượt tải cache-bypass đầu tiên ngay sau checkpoint vẫn trả bundle cũ. Sau thêm một chu kỳ đồng bộ, URL xác minh ở trên đã nhận đúng bundle Restore V2 và React mount đầy đủ. Đây là độ trễ edge, không phải lỗi `#root`.

## Tracking và COD

Route production dùng COD server-side. `Lead` chỉ ghi sau server trả kết quả tạo đơn thành công; `QualifiedLead` và `Purchase` vẫn dành cho CRM/CAPI ở các trạng thái hậu xác nhận/hậu giao hàng, không phát tại gửi COD.
