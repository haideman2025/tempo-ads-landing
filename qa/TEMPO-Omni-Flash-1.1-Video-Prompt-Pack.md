# TEMPO by V2JOY — Omni Flash 1.1 Video Prompt Pack

## Mục tiêu sử dụng

Bộ này thay thế hoàn toàn năm video nền đang mang **sản phẩm/bao bì cũ** trên landing. Chuỗi mới lấy **TEMPO 3ml concept hiện tại** làm trung tâm: hộp ivory, chữ dọc TEMPO đen, đường sóng teal–cam, nắp graphite và nhận diện V2JOY. Năm video cùng kể một buổi tối đi từ kết thúc ngày dài đến một khoảnh khắc riêng tư, bình tĩnh và có sự hiện diện.

> **Đầu ra đề xuất:** năm clip 16:9, mỗi clip 8 giây, không lời thoại, không phụ đề, không âm nhạc bắt buộc. Video được dùng làm background nên phải đọc được ngay cả khi bị overlay tối trên landing.

## Nguyên tắc không được thay đổi

Tạo từng clip bằng chế độ **image-to-video**. Với mọi clip có sản phẩm, luôn tải lên ít nhất ảnh **mặt trước hộp + chai TEMPO 3ml mới** làm product reference chính. Nếu công cụ cho phép nhiều reference, thêm ảnh **chi tiết vòi/nắp** và **mặt cạnh/mặt sau hộp**. Không dùng bất kỳ keyframe, video hoặc packshot của concept TEMPO cũ.

| Thành phần | Quy tắc cố định cho cả năm clip |
|---|---|
| Sản phẩm | Đúng một chai TEMPO 3ml và/hoặc đúng một hộp TEMPO 3ml như ảnh tham chiếu mới; tỷ lệ chai nhỏ gọn, không phóng thành chai mỹ phẩm cỡ lớn. |
| Nhận diện | Ivory ấm, graphite gần đen, teal V2JOY và một điểm nhấn cam rất tiết chế. Không tự tạo logo/wordmark sai. |
| Ánh sáng | Cinematic evening editorial; nguồn sáng ấm 2700–3200K, shadow sâu, rim teal rất mảnh. |
| Con người | Chỉ người trưởng thành; phong cách Việt Nam/Đông Nam Á tự nhiên, kín đáo, không tình dục hóa, không cảnh thân mật gợi dục. |
| Motion | Máy quay ổn định, chuyển động chậm và có chủ đích; không handheld rung, không quick zoom, không morph cơ thể. |
| Chữ trên video | Không overlay chữ, không subtitle, không watermark. Nhãn trên **ảnh tham chiếu sản phẩm** phải được giữ nguyên thay vì AI tự viết lại. |
| Landing safe area | Đặt sản phẩm/hành động chủ đạo trong 65% trung tâm khung hình; tránh đặt chi tiết quan trọng sát mép trái/phải vì landing có crop `object-fit: cover`. |

## Bản đồ continuity

Mỗi clip có một điểm nối thị giác để khi người xem cuộn landing, cả năm cảnh vẫn giống một phim ngắn. Chỉ dựng cảnh tiếp theo sau khi đã lấy frame cuối thực tế của cảnh trước nếu Omni Flash 1.1 cho phép dùng frame kết thúc làm reference.

| Clip | Vai trò trên landing | Mở đầu | Điểm nối sang clip sau |
|---|---|---|---|
| 01 | Hero — “Chậm một nhịp” | Chai đứng trên đá graphite trong studio tối | Đường sóng teal phát sáng đi ngang khung hình từ trái sang phải |
| 02 | Carry — “Khép lại ngày dài” | Cùng đường teal lướt qua khóa túi graphite | Bề mặt vải đen phủ kín khung hình, match-cut với nắp chai |
| 03 | Craft — “Dừng lại để đọc” | Nắp graphite macro trên nền tối | Phản chiếu ivory mở ra theo chuyển động tay nhẹ |
| 04 | Date — “Có mặt cho nhau” | Mặt bàn ivory/ánh đèn ấm, hai người trưởng thành ở hậu cảnh mờ | Vòng sáng teal trên bàn khép thành vòng tròn quanh chai |
| 05 | Final — “Giữ nhịp riêng” | Cùng vòng sáng teal và chai TEMPO chính giữa | Máy quay trở về bố cục chai hero, sẵn sàng loop về Clip 01 |

## Keyframe cần chuẩn bị

Không cần tạo mới ảnh nếu bộ concept mới đã có các góc dưới đây. Chỉ cần xuất/crop chúng thành **16:9 nằm ngang** trước khi tải lên Omni Flash 1.1. Ảnh phải nét, chai/hộp không bị cắt, không có chữ overlay ngoài nhãn thật trên sản phẩm.

| Mã | Ảnh reference nên dùng | Dùng cho | Ghi chú framing |
|---|---|---|---|
| `KF-01` | Packshot hero chai + hộp TEMPO 3ml mới trên mặt đá/ivory | Clip 01, 05 | Chai cao khoảng 35–45% chiều cao khung; khoảng trống bên trái cho headline landing. |
| `KF-02` | Chai/hộp 3ml đặt cạnh túi hoặc trong túi cá nhân | Clip 02 | Không để chai nằm lộn ngược hay méo tỷ lệ; tay cầm chỉ xuất hiện một phần. |
| `KF-03` | Cận cảnh nắp graphite, vòi xịt và nhãn TEMPO mới | Clip 03 | Product macro, ánh sáng sạch, không làm nắp/vòi biến dạng. |
| `KF-04` | Cặp tay người trưởng thành / không gian hẹn tối kín đáo, chai đặt trên bàn | Clip 04 | Nhân vật mờ hậu cảnh, không nhìn thẳng máy quay, không chạm cơ thể nhạy cảm. |
| `KF-05` | Hero chai 3ml chính diện trên studio evening graphite–ivory | Clip 05 | Gần với `KF-01` để loop tự nhiên về hero. |

## Prompt 01 — Hero: “Chậm một nhịp”

**Tải lên:** `KF-01` (bắt buộc), ảnh cận nhãn/mặt trước chai mới (nếu hỗ trợ nhiều ảnh).  
**Thời lượng:** 8 giây · **Khung hình:** 16:9 · **Âm thanh:** none.

```text
Create an 8-second, 16:9 premium cinematic background film using the attached new TEMPO 3ml product reference as the absolute visual truth.

PRODUCT CONSISTENCY: Show exactly one small TEMPO 3ml spray bottle and one matching ivory TEMPO 3ml carton from the attached reference. Preserve the exact small bottle proportions, graphite cap, ivory body, V2JOY mark, vertical TEMPO label, and the thin teal-and-orange waveform line. Do not redesign, translate, blur, hallucinate, or replace any printed packaging details. If the label cannot remain faithful, keep it naturally out of sharp focus rather than inventing text.

VISUAL WORLD: editorial Vietnamese premium personal-care campaign, quiet evening studio, matte black graphite stone slab, warm ivory wall, restrained V2JOY teal accent, subtle cinematic film grain, shallow depth of field, luxury beauty macro photography, realistic materials and physics. Keep the hero product in the central-right safe area and leave dark, calm negative space on the left for website copy.

TIMELINE:
- 0.0–1.2s: Start from near darkness. A warm practical lamp glow slowly reveals the exact TEMPO 3ml bottle standing upright on graphite stone beside its matching carton. The bottle, carton, stone, and background remain physically present for the entire shot.
- 1.2–3.0s: A slow, stable dolly-in moves toward the bottle from a slightly low eye level. A soft teal edge light appears on the bottle silhouette; no object moves or changes shape.
- 3.0–5.8s: Focus gently travels from the graphite cap down to the ivory body and then to the carton, showing the small scale and refined material without obscuring the product.
- 5.8–8.0s: A very thin teal waveform reflection travels smoothly from the far left across the stone toward the right edge. The bottle stays upright and still. End with the waveform leaving the frame on the right, ready to match the opening of Clip 02.

CAMERA: one continuous slow dolly-in only, no cuts, no orbit, no sudden zoom.
TRANSITION DESCRIPTION: The teal waveform is a reflected light line on the stone surface, not a floating graphic. It exists subtly from 5.8 seconds onward, moves left-to-right on a physically plausible flat surface, and exits fully at the right edge while the product remains unchanged.
NEGATIVE PROMPT: old TEMPO packaging, 5ml bottle, oversized bottle, extra bottles, extra cartons, distorted cap, altered label, invented text, subtitle, overlay typography, watermark, floating product, liquid splash, medical imagery, sexual imagery, people, deformed objects, shaky camera, fast edits, CGI plastic look.
```

## Prompt 02 — Carry: “Khép lại ngày dài”

**Tải lên:** `KF-02`, mặt trước chai/hộp 3ml mới.  
**Điểm nối:** dùng frame cuối Clip 01 làm first-frame reference nếu công cụ hỗ trợ; nếu không, tái tạo đường teal lướt qua khóa túi theo prompt.

```text
Create an 8-second, 16:9 premium cinematic background film using the attached new TEMPO 3ml product reference. This is the second chapter of the same quiet-evening campaign.

PRODUCT CONSISTENCY: The product is exactly the same small TEMPO 3ml spray bottle from the reference: ivory body, graphite cap, V2JOY mark, vertical TEMPO label, delicate teal-and-orange waveform detail. It must remain one small 3ml bottle, never a larger cosmetic bottle and never an old package design.

OPENING CONTINUITY: Begin with a slim teal reflected light line entering from the left and gliding across the black zipper of a compact personal graphite bag. This is the direct visual continuation of the left-to-right teal line at the end of Clip 01.

VISUAL WORLD: blue-hour apartment entryway, textured charcoal coat and black personal bag, a small warm lamp in deep background bokeh, graphite–ivory–teal palette, adult Vietnamese/Asian presence shown only through natural hands and torso, elegant and discreet.

TIMELINE:
- 0.0–1.5s: The teal reflection travels across the zipper from left to right. The bag is already on a bench; no objects pop in.
- 1.5–3.6s: An adult hand calmly opens the bag. The exact small TEMPO 3ml bottle is already inside an inner pocket; the hand lightly adjusts it upright without covering the cap or altering the bottle.
- 3.6–5.7s: The camera tracks a short, physically plausible path along the bag opening. Focus settles briefly on the bottle beside a folded ivory fabric item, showing scale and discretion.
- 5.7–8.0s: The hand gently closes the bag. The black fabric and zipper fill most of the frame from right to left until the final frame is a rich graphite texture with a soft round highlight, designed as a match cut to the graphite cap macro of Clip 03.

CAMERA: close tabletop tracking shot, slow rightward move, stable gimbal-like motion, shallow depth of field.
TRANSITION DESCRIPTION: The bottle stays inside the bag from the moment the bag opens until it closes. The closure is smooth and complete; after the zipper shuts, the dark bag fabric gradually fills the frame without a jump cut, leaving a single circular graphite highlight that matches the cap shape in Clip 03.
NEGATIVE PROMPT: old packaging, 5ml packaging, large bottle, multiple bottles, visible product text invented by AI, advertising text, watermark, suitcase travel montage, car scene, nightclub, rushed hand movement, jewelry close-up, sexual content, deformed hands, extra fingers, morphing bag, shakiness, fast cuts.
```

## Prompt 03 — Craft: “Dừng lại để đọc”

**Tải lên:** `KF-03`, mặt cạnh/mặt sau hộp mới nếu có.  
**Điểm nối:** frame cuối Clip 02 hoặc một crop nắp graphite macro.

```text
Create an 8-second, 16:9 cinematic macro background film using the attached new TEMPO 3ml product reference as the exact product identity. This is an intimate, transparent product-detail chapter.

PRODUCT CONSISTENCY: Show one exact TEMPO 3ml bottle and optionally one matching TEMPO 3ml carton only. Preserve the graphite cap, fine spray nozzle, ivory body, V2JOY mark, vertical TEMPO label, and package proportions exactly as the attached reference. Do not generate new claims, new labels, or readable AI-made text.

OPENING CONTINUITY: Begin on an extreme macro of a real graphite cap against a deep charcoal textile background. The cap's circular highlight and texture must visually match the dark final frame of Clip 02.

VISUAL WORLD: quiet product-reading moment in a warm ivory studio, premium cosmetic macro, clean realistic materials, dark graphite foreground, very fine teal reflected light, soft warm practical light. The mood is considered and factual, never clinical or medical.

TIMELINE:
- 0.0–1.6s: Hold an extreme macro on the graphite cap with the soft circular highlight. The cap is attached to the bottle and stays still.
- 1.6–3.4s: A single adult hand lifts the cap vertically in a careful, natural motion, revealing the real fine spray nozzle. The bottle stays fixed upright on a matte ivory surface.
- 3.4–5.8s: The camera makes a slow 25-degree micro-arc around the nozzle and bottle shoulder. A soft ivory reflection moves across the surface; no liquid sprays and no mist appears.
- 5.8–8.0s: Focus pulls gently down toward the upright bottle body and the adjacent carton edge. The ivory reflection expands into a warm pale field, ending with a calm ivory glow that can open Clip 04.

CAMERA: macro dolly with one restrained 25-degree arc, no cutaways, no rack focus jumps.
TRANSITION DESCRIPTION: The cap remains physically connected to the bottle until the hand lifts it straight upward; it does not disappear, rotate, or morph. The bottle, nozzle, carton edge, and ivory tabletop remain continuously present. The final warm ivory reflection grows naturally from the tabletop lighting and fills the background without covering or transforming the product.
NEGATIVE PROMPT: old TEMPO bottle, wrong cap, extra nozzle, aerosol cloud, liquid explosion, hand applying product to skin, medical laboratory, syringes, clinical white coat, sexual content, distorted hands, extra fingers, label gibberish, added captions, watermarks, 3D render, fast cuts, dramatic spin.
```

## Prompt 04 — Presence: “Có mặt cho nhau”

**Tải lên:** `KF-04` và ảnh product front mới.  
**Điểm nối:** bắt đầu trong trường sáng ivory ấm từ Clip 03.

```text
Create an 8-second, 16:9 premium cinematic background film for the fourth chapter of the same TEMPO evening story. Use the attached new TEMPO 3ml product reference as the absolute product truth.

PRODUCT CONSISTENCY: Show exactly one small TEMPO 3ml bottle standing upright on an ivory tabletop. Preserve its exact ivory body, graphite cap, V2JOY mark, vertical TEMPO label, and teal-and-orange waveform detail. The bottle remains small, stable, and never changes design.

VISUAL WORLD: a calm, tasteful evening at home. Two consenting adult Vietnamese/Asian people are present only as softly defocused silhouettes or hands in the far background; they are fully clothed, relaxed, and naturally conversing without visible dialogue. Warm table lamp, natural ivory textile, graphite ceramic tray, slender teal reflected light, editorial lifestyle photography.

TIMELINE:
- 0.0–1.5s: Open on the warm ivory reflection continuing from Clip 03. The TEMPO bottle is already standing in the center-right foreground on a graphite tray; the softly blurred adults sit across the room in background.
- 1.5–3.6s: One hand places a small warm cup on the far side of the table, well away from the bottle. The product remains untouched, upright, and in crisp focus.
- 3.6–5.8s: Camera makes a slow sideways slider move. The two adults remain soft background silhouettes, lean slightly toward conversation, and never pose sexually or touch sensitive areas.
- 5.8–8.0s: A thin teal reflection forms a gentle circular arc around the base of the bottle on the tabletop. It gradually closes into an incomplete ring while the warm practical light remains steady. End on the circle and bottle, ready for Clip 05.

CAMERA: one quiet lateral slider move, eye-level tabletop framing, subtle depth-of-field breathing only.
TRANSITION DESCRIPTION: The ivory field at the start is the same calm warm reflection from Clip 03 and slowly resolves into a real tabletop. The bottle is present from the first frame and remains in the same position throughout. The teal circle is a low-intensity reflected light on the table surface; it grows continuously around the bottle and does not become a floating digital graphic.
NEGATIVE PROMPT: old product design, multiple products, couple kissing, undressing, bed scene, suggestive touch, sexual activity, minors, alcohol bottles, party nightlife, spoken dialogue, captions, visible AI-created text, deformed hands, face morphing, camera shake, fast cutting, neon cyberpunk, medical claims, watermark.
```

## Prompt 05 — Final: “Giữ nhịp riêng”

**Tải lên:** `KF-05` và mặt trước chai/hộp TEMPO mới.  
**Điểm nối:** dùng frame cuối Clip 04 làm first-frame reference khi có thể.  
**Mục đích:** kết thúc trọn cảm xúc nhưng loop tự nhiên về hero Clip 01.

```text
Create an 8-second, 16:9 premium cinematic background film using the attached new TEMPO 3ml product reference as the absolute visual truth. This is the final chapter of a five-part quiet-evening editorial film and must loop gracefully back to the first hero shot.

PRODUCT CONSISTENCY: Show exactly one authentic small TEMPO 3ml bottle and one matching TEMPO 3ml carton from the attached reference. Maintain exact ivory carton and bottle proportions, graphite cap, V2JOY mark, vertical TEMPO label, and thin teal-and-orange waveform. No old packaging, no 5ml item, no product redesign, no AI-invented readable text.

OPENING CONTINUITY: Begin with the same soft teal incomplete light ring around the base of the TEMPO bottle on a warm ivory tabletop, continuing directly from the final frame of Clip 04.

VISUAL WORLD: refined final hero studio, graphite stone, warm ivory wall, soft practical evening lamp, restrained V2JOY teal signal, realistic premium photography, calm closure, deep contrast with clean negative space.

TIMELINE:
- 0.0–1.7s: The teal incomplete ring slowly completes a subtle circle around the upright bottle. The bottle and carton are already present; the scene is calm and still.
- 1.7–3.8s: Camera begins a slow pull-back while the warm ivory tabletop visually transitions into a graphite stone stage through a practical change in framing and focus, not a magical object morph. The bottle remains exact and upright.
- 3.8–6.0s: The final composition settles into the same hero world as Clip 01: bottle central-right, carton nearby, dark quiet negative space on the left, a soft lamp glow above and behind.
- 6.0–8.0s: The teal ring stretches into one thin left-to-right waveform reflection across the stone. The camera arrives at the same approximate wide hero framing as the first frame of Clip 01, then holds long enough for an invisible loop.

CAMERA: slow pull-back with a barely perceptible upward tilt, stable tripod/dolly motion, no cuts.
TRANSITION DESCRIPTION: The teal ring stays on the physical tabletop and elongates gradually as the camera pulls back. The bottle and carton never morph, duplicate, disappear, or change location. By the final second, the scene must match the lighting, product position, scale, and negative space of Clip 01's opening shot so the entire five-clip compilation can restart naturally.
NEGATIVE PROMPT: old packshot, 5ml package, multiple bottles, product duplication, bottle morphing, floating carton, invented labels, subtitles, brand slogans, watermark, night cityscape, fireworks, sexual content, medical imagery, human close-up, hand deformation, shaky camera, fast montage, overexposed white studio, plastic CGI look.
```

## Cách dựng và kiểm tra trước khi upload landing

Tạo Clip 01 trước. Lấy **frame cuối thực tế** để làm first-frame của Clip 02, rồi tiếp tục theo chuỗi `01 → 02 → 03 → 04 → 05`. Không dùng một keyframe AI tự diễn giải lại ở giữa chuỗi; đây là cách dễ nhất để chai, nắp và tỷ lệ 3ml bị trôi thiết kế. Nếu mỗi clip chỉ được dùng một ảnh tham chiếu, ưu tiên ảnh mặt trước chai/hộp mới cho Clip 01, 03 và 05; ưu tiên ảnh bối cảnh/túi/cặp tay nhưng vẫn kèm product reference cho Clip 02 và 04.

| Kiểm tra nghiệm thu | Tiêu chí đạt |
|---|---|
| Bao bì | Không còn chai/hộp TEMPO cũ, không có 5ml, không thêm chai/hộp thứ hai ngoài mô tả từng clip. |
| Nhãn | Không có chữ AI sai. Nhãn đúng theo reference hoặc không đủ nét để đọc; không dùng overlay text để bù. |
| Cảnh người | Đều là người trưởng thành, kín đáo, không có biểu đạt tình dục hay claim điều trị. |
| Crop landing | Nội dung quan trọng nằm vùng trung tâm; thử preview `object-fit: cover` tại desktop và mobile. |
| Nhịp video | Video loop mượt, không flash frame, không cut gấp, 8 giây đọc được ngay cả khi tắt tiếng. |
| File xuất | MP4 H.264, 16:9, 1920×1080, 24 hoặc 30 fps, không audio hoặc audio tắt; đảm bảo poster frame cũng dùng concept mới. |

## Thứ tự thay video trên landing

Sau khi render và duyệt đủ năm clip, giữ thứ tự mapping sau để câu chuyện không bị đảo:

| File xuất đề xuất | Vị trí landing thay thế |
|---|---|
| `tempo-01-slow-down-hero.mp4` | Video 01 / Hero |
| `tempo-02-carry-evening.mp4` | Cảnh 02 / Carry |
| `tempo-03-read-the-label.mp4` | Cảnh 03 / Craft & transparency |
| `tempo-04-present-together.mp4` | Cảnh 04 / Presence |
| `tempo-05-keep-your-rhythm.mp4` | Cảnh 05 / Final |

> Chỉ cần bạn gửi lại năm file MP4 đã duyệt, tôi sẽ thay mapping video cũ trên landing, giữ cơ chế autoplay muted/loop/playsInline, poster fallback và kiểm tra lại desktop/mobile.
