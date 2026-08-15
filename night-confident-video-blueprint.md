# TEMPO — Night Confident Video Blueprint

**Mục tiêu.** Chuỗi video nền dẫn người xem từ nhịp ngày dài đến khoảnh khắc đăng ký hàng chờ. Video là lớp cảm xúc, chạy muted và không có chữ trong hình; toàn bộ thông điệp, logo V2JOY và CTA hiển thị bằng HTML trên landing để không biến dạng chữ hoặc nhãn.

| Hạng mục | Đặc tả đã chốt |
|---|---|
| Định dạng | 5 short liên tiếp, mỗi short 8 giây, khung 16:9 landscape |
| Nhịp dựng | 6–8 quick cuts mỗi short; 0,7–1,5 giây mỗi cut; transitions là match-cut theo ánh sáng, vật liệu hoặc đường Signal Teal |
| Phong cách | Product-film editorial. Bề mặt graphite, giấy ivory, thủy tinh mờ, ánh đèn tungsten ấm và phản quang teal tiết chế |
| Product continuity | TEMPO 3ml và 5ml là chai ivory soft-touch, nắp graphite, nhãn ngang; không đổi màu, dáng chai, dung tích, số lượng hoặc nhãn giữa các đoạn |
| Con người | Không lộ mặt, không thoại, không cử chỉ thân mật hoặc hành vi mang tính tình dục. Thế giới kể chuyện chỉ là không gian chuẩn bị riêng tư |
| Âm thanh | Không có audio trong video nền. Landing tự chạy muted và có poster fallback |

## Arc 40 giây

| Clip | Vai trò | Nhịp hình | Điểm nối |
|---|---|---|---|
| C01 · The Exit | Rời khỏi ngày dài | Ánh đèn văn phòng tắt dần, jacket, thiệp hẹn và túi áo | Phản chiếu teal trên mặt bàn match-cut sang chai 3ml |
| C02 · Pocket Signal | 3ml đi cùng lịch hẹn | 3ml, túi áo, phone scale, khóa kéo và cửa thang máy mờ | Đường teal ở viền túi nối sang sóng teal trên giấy ivory |
| C03 · Ritual | Nhịp chuẩn bị 5ml | 5ml, bàn đá graphite, ly mờ, hộp mở và bóng đèn ấm | Ánh đèn ở đáy chai tan vào bóng bàn ăn |
| C04 · The Table | Có mặt trong buổi hẹn | Thiệp đặt bàn, ly nước, khăn than chì, 3ml/5ml như vật riêng tư | Viền tròn ly match-cut thành vòng halo của product hero |
| C05 · The Signal | Chuyển đổi sang đăng ký hàng chờ | Cặp 3ml/5ml, paper pedestal, teal signal light và negative space | Kết trên khung product hero tĩnh để HTML CTA xuất hiện |

## Prompt thực thi bằng Omni

### C01 — The Exit · 8s

**Narrative purpose:** Establish. **Pacing:** Fast but deliberate. **Camera:** Macro insert, controlled handheld, then slow dolly. **First keyframe:** graphite desk at dusk, closed TEMPO 3ml resting beside a dark jacket sleeve and an ivory reservation card.

```text
Create an 8-second cinematic product montage in 16:9 landscape, silent, no on-screen text. Art direction: premium editorial product film, graphite desk surfaces, ivory paper, warm tungsten practical light, restrained V2JOY teal reflections, high tactile material detail. The exact TEMPO 3ml ivory soft-touch bottle with graphite cap from the supplied reference must remain the same object in every shot; do not alter its proportions, color, label placement, or cap.

Timeline: 0.0–0.9s a desk lamp turns off leaving a warm edge-light over a graphite table; 0.9–1.8s macro of an ivory reservation card sliding beside a charcoal jacket sleeve; 1.8–2.7s TEMPO 3ml is already present and catches a thin teal reflection; 2.7–3.6s quick rack focus from the card to the bottle; 3.6–4.5s jacket fabric folds beside the product without any hand entering; 4.5–5.5s close detail of graphite cap and ivory finish; 5.5–6.7s camera dollies across the tabletop toward the product; 6.7–8.0s the teal reflection stretches across the table into a clean horizontal signal line.

Transition description: The same 3ml bottle remains on the desk throughout the sequence and never pops in or changes position abruptly. The camera moves only through the physical tabletop space, while the teal reflection gradually elongates from the bottle base to a horizontal line. The final signal line occupies the lower-right third and continues visually into the next clip. No people, no hands, no faces, no medical devices, no logos or readable text added by the model.
```

### C02 — Pocket Signal · 8s

**Narrative purpose:** Develop. **Pacing:** Fast. **Camera:** Product macro, tilt and short tracking move. **First keyframe:** a tailored charcoal jacket inner pocket with the same TEMPO 3ml bottle partially visible and teal signal line at the bottom.

```text
Create an 8-second cinematic product montage in 16:9 landscape, silent, no on-screen text. Continue the same tabletop editorial world: graphite tailoring, ivory paper, tungsten warmth, discreet teal accent. Preserve the exact same TEMPO 3ml ivory bottle with graphite cap from the supplied reference; no change to bottle geometry, color, or label arrangement.

Timeline: 0.0–1.0s begin on the prior clip’s thin teal line, which match-cuts into a teal seam highlight on a charcoal jacket pocket; 1.0–2.0s the 3ml bottle is already partially seated in the pocket; 2.0–2.9s macro on the bottle cap against dense tailored fabric; 2.9–3.8s a clean unbranded black smartphone sits next to the bottle to establish compact scale; 3.8–4.7s quick insert of a zipper pull moving a few centimeters without a visible hand; 4.7–5.8s tracking shot follows the pocket edge; 5.8–6.9s a white ivory card passes through shallow focus; 6.9–8.0s the teal seam expands into a curving wave on an ivory paper surface.

Transition description: The 3ml bottle is visible from the opening frame and remains the same physical product across all quick cuts. Every cut is motivated by fabric texture, an edge, or the teal reflection, never by impossible movement. The last ivory paper surface and teal curve remain in frame for the next clip. No faces, no explicit material, no added labels, no generated words.
```

### C03 — Ritual · 8s

**Narrative purpose:** Develop. **Pacing:** Measured quick-cut ritual. **Camera:** Top-down, macro, then subtle orbit. **First keyframe:** same teal curve on ivory paper, framing the TEMPO 5ml bottle on matte graphite stone.

```text
Create an 8-second cinematic product montage in 16:9 landscape, silent, no on-screen text. Preserve the precise TEMPO 5ml bottle from the supplied reference: ivory soft-touch body, graphite cap, same horizontal label location. The setting is a premium, non-medical personal evening ritual on graphite stone with ivory paper, a frosted water glass and warm tungsten light.

Timeline: 0.0–0.8s the teal paper curve from the prior clip becomes a reflected arc beside the 5ml bottle; 0.8–1.8s macro of ivory soft-touch finish; 1.8–2.8s cut to a frosted glass catching a warm highlight; 2.8–3.8s top-down of an ivory box opening with the bottle already settled in a dark insert; 3.8–4.8s slow orbit around the closed graphite cap; 4.8–5.8s close shot of the signal-wave detail on the package; 5.8–6.8s the box lid casts a geometric shadow; 6.8–8.0s warm lamp light expands across the lower frame and dissolves into the shadow of a dining table.

Transition description: The 5ml bottle appears from the first frame and remains an unchanged physical product; the unboxing shot only reveals it more clearly rather than creating a new bottle. The frosted glass and ivory box are present as coherent tabletop objects in the same room. The final warm shadow fills the lower frame and becomes the table shadow in the next clip. No people, no hands, no medical imagery, no text generated by the model.
```

### C04 — The Table · 8s

**Narrative purpose:** Emotional resolve. **Pacing:** Moderate. **Camera:** Low table glide, top-down inserts, macro. **First keyframe:** warm dining table shadow, ivory reservation card and frosted glass, with 3ml/5ml TEMPO products discreetly placed at the edge.

```text
Create an 8-second cinematic product montage in 16:9 landscape, silent, no on-screen text. Use the exact TEMPO 3ml and 5ml packaging from the supplied reference without altering shape, color or label placement. The scene is an elegant, discreet restaurant-table preparation moment: charcoal table, ivory napkin, frosted water glass, non-readable reservation card, warm lamp shadows and a restrained teal reflection.

Timeline: 0.0–1.0s the warm shadow from the prior clip settles over the table; 1.0–1.9s overhead view of ivory card and folded charcoal napkin; 1.9–2.8s the 3ml bottle rests near the card edge; 2.8–3.7s frosted glass rim catches warm light; 3.7–4.6s the 5ml bottle appears in a composed product pairing, already present in the set; 4.6–5.6s camera glides laterally past both bottles; 5.6–6.7s teal reflection arcs around the base of the glass; 6.7–8.0s the glass rim becomes a luminous circular halo against a dark background.

Transition description: The exact two products persist across the table composition and are never handled or moved impossibly. The camera glides within a single physical tabletop arrangement. The glass halo grows smoothly to fill the frame, allowing a match-cut into the product hero circle. No faces, no body parts, no romance action, no readable text or added logos.
```

### C05 — The Signal · 8s

**Narrative purpose:** Conversion. **Pacing:** Calm final build. **Camera:** Crane-in followed by locked hero frame. **First keyframe:** dark circular halo resolves into a graphite product pedestal with the TEMPO 3ml and 5ml bottles.

```text
Create an 8-second cinematic product hero in 16:9 landscape, silent, no on-screen text. Keep the exact approved TEMPO 3ml and 5ml bottle design from the supplied reference: ivory soft-touch bottles, graphite caps, unchanged geometry, unchanged label placement. Product film art direction: deep graphite studio, ivory paper pedestal, thin teal signal reflection, warm tungsten rim light, large negative space on the left for website typography.

Timeline: 0.0–1.0s the circular halo from the prior clip resolves into a teal reflection behind the product pedestal; 1.0–2.0s both bottles are already standing on the pedestal; 2.0–3.0s slow crane-in reveals ivory paper edge and graphite cap profiles; 3.0–4.1s macro detail on the smaller 3ml bottle; 4.1–5.1s macro detail on the taller 5ml bottle; 5.1–6.1s a teal wave reflection passes across the graphite surface; 6.1–7.0s camera settles into a front three-quarter hero composition; 7.0–8.0s hold an immobile premium hero frame with left-side negative space.

Transition description: Both products exist from the opening frame and remain perfectly consistent, upright and proportionally correct for all eight seconds. The teal light travels only as a reflection across the physical pedestal surface; it does not alter the bottles or create extra objects. End on a stable hero composition that can loop back to the site CTA without a visible jump. No people, no faces, no text, no added logos or watermarks.
```

## Keyframe requirements

| Reference frame | Used by | Framing |
|---|---|---|
| K01 | C01 | Graphite desk, 3ml, jacket sleeve, ivory card, dusk |
| K02 | C02 | 3ml in charcoal inner pocket, teal seam reflection |
| K03 | C03 | 5ml on graphite stone, ivory paper curve and frosted glass |
| K04 | C04 | 3ml/5ml at table edge, reservation card, frosted glass halo |
| K05 | C05 | 3ml/5ml hero on graphite pedestal, teal halo, left negative space |
