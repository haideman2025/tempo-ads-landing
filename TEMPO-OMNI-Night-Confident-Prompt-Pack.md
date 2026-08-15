# TEMPO × V2JOY — Omni Prompt Pack

## Night Confident · 5 short nền cho landing

Bộ prompt này tạo năm video landscape, mỗi video **8 giây** và có **6–8 quick cuts**. Trước khi chạy từng prompt, hãy đính kèm một ảnh tham chiếu sản phẩm TEMPO 3ml/5ml đã duyệt; ưu tiên mockup có logo/nhãn chuẩn. Để nối liền mạch, trích frame cuối của clip trước và dùng chính frame đó làm image reference cho clip kế tiếp.

> **Thiết lập dùng chung:** 16:9 landscape, 720p, 8 seconds, muted/no audio. Không để AI tạo chữ trên hình; phần logo V2JOY, headline và CTA nên đặt bằng HTML trên landing.

| Clip | Vai trò | Reference nên dùng | Điểm nối cuối clip |
|---|---|---|---|
| 01 · The Exit | Rời nhịp ngày dài | Chai TEMPO 3ml trên graphite desk | Đường phản chiếu teal nằm ngang |
| 02 · Pocket Signal | 3ml đi cùng lịch hẹn | Frame cuối Clip 01 | Sóng teal trên giấy ivory |
| 03 · Ritual | Khoảnh khắc 5ml chuẩn bị | Frame cuối Clip 02 | Bóng đèn ấm phủ mặt bàn |
| 04 · The Table | Có mặt trong buổi hẹn | Frame cuối Clip 03 | Vòng halo của ly thủy tinh |
| 05 · The Signal | Product hero + CTA | Frame cuối Clip 04 | Hero frame tĩnh, dư khoảng trống bên trái |

## Global Continuity Block

Sao chép nguyên khối này vào cuối **mọi** prompt.

```text
Global continuity rules: preserve the exact TEMPO product design from the supplied reference image. The 3ml and 5ml bottles are ivory soft-touch, with graphite caps and unchanged horizontal label placement. Do not change bottle geometry, proportions, cap shape, colors, material, scale, label placement, or number of products between shots. Maintain one consistent premium editorial world: matte graphite surfaces, ivory paper, frosted glass, warm tungsten practical light, restrained V2JOY teal reflections. No faces, no people, no hands, no sexual or intimate action, no medical imagery, no added readable text, no invented logos, no watermarks, no dialogue, no audio.
```

## Prompt 01 — The Exit

```text
Create an 8-second cinematic product-film montage in 16:9 landscape, silent and without on-screen text. Art direction: premium editorial tabletop film, graphite desk surfaces, ivory paper, tailored charcoal fabric, warm tungsten practical light and restrained teal reflection. The exact TEMPO 3ml bottle from the supplied reference is the hero product.

0.0–0.9s: a warm desk lamp fades down over a graphite desk. 0.9–1.8s: quick macro insert of a blank ivory reservation card beside a tailored charcoal jacket sleeve. 1.8–2.7s: the TEMPO 3ml bottle is already present and catches one narrow teal glint. 2.7–3.6s: rack focus from card to bottle. 3.6–4.5s: jacket fabric settles beside product, with no hand in frame. 4.5–5.5s: close detail of graphite cap and ivory material. 5.5–6.7s: short physical dolly across the desk. 6.7–8.0s: teal reflection stretches from the bottle base into one clean horizontal signal line in the lower-right.

Transition description: The 3ml bottle exists from the first frame and remains the same physical object in every quick cut. All changes come from focus pulls, fabric texture, shadows and physical camera movement inside one tabletop set. Hold the final teal signal line on screen until the last frame so it can match-cut into Clip 02.

[PASTE GLOBAL CONTINUITY BLOCK]
```

## Prompt 02 — Pocket Signal

```text
Create an 8-second cinematic product-film montage in 16:9 landscape, silent and without on-screen text. Start from the supplied final frame of Clip 01. Continue the exact same graphite, ivory, tungsten and teal visual world. The exact TEMPO 3ml bottle from the supplied reference remains the hero product.

0.0–1.0s: the teal signal line in the input frame becomes a reflected teal seam highlight along a charcoal jacket pocket. 1.0–2.0s: the same 3ml bottle is already partly seated in the inner pocket. 2.0–2.9s: macro of graphite cap against tailored fabric. 2.9–3.8s: a clean unbranded black smartphone sits near the bottle to establish scale. 3.8–4.7s: a zipper pull moves a few centimeters without any visible hand. 4.7–5.8s: camera tracks the pocket edge. 5.8–6.9s: a blank ivory card enters shallow focus. 6.9–8.0s: teal seam reflection becomes one curving teal wave across ivory paper.

Transition description: Keep the supplied starting frame visually intact for the opening moment, then transform the teal line only through plausible reflected light into the pocket seam. The 3ml bottle remains the same object throughout and is never resized, redesigned or duplicated. Hold the ivory paper and curved teal wave in the last frame so it can directly open Clip 03.

[PASTE GLOBAL CONTINUITY BLOCK]
```

## Prompt 03 — Ritual

```text
Create an 8-second cinematic product-film montage in 16:9 landscape, silent and without on-screen text. Start from the supplied final frame of Clip 02. The scene is a premium non-medical evening tabletop ritual: graphite stone, ivory paper, frosted water glass, warm tungsten side light and one restrained teal reflected arc. Use the exact TEMPO 5ml bottle from the supplied reference.

0.0–0.8s: the prior teal curve on ivory paper becomes a reflected arc beside the 5ml bottle on graphite stone. 0.8–1.8s: macro of ivory soft-touch finish. 1.8–2.8s: frosted glass catches a warm side highlight. 2.8–3.8s: top-down insert of an ivory box opening, with the exact same 5ml bottle already seated in a dark insert. 3.8–4.8s: subtle orbit around the closed graphite cap. 4.8–5.8s: close shot of the teal signal graphic. 5.8–6.8s: box lid creates a geometric shadow. 6.8–8.0s: warm lamp light expands across the lower frame and becomes a dining-table shadow.

Transition description: The 5ml bottle must be present before the box opens and remain unchanged as the camera reveals it more clearly. The box, frosted glass and paper must remain coherent tabletop objects in a single place. End with the warm tabletop shadow filling the lower frame so Clip 04 begins naturally.

[PASTE GLOBAL CONTINUITY BLOCK]
```

## Prompt 04 — The Table

```text
Create an 8-second cinematic product-film montage in 16:9 landscape, silent and without on-screen text. Start from the supplied final frame of Clip 03. The space becomes an elegant, discreet dining-table preparation moment: charcoal table, ivory napkin, frosted water glass, blank reservation card, warm lamp shadows and restrained teal reflection. Use the exact TEMPO 3ml and 5ml bottles from the supplied product references.

0.0–1.0s: the warm shadow of the input frame settles over the charcoal table. 1.0–1.9s: overhead insert of blank ivory card and folded charcoal napkin. 1.9–2.8s: the 3ml bottle rests near the card edge. 2.8–3.7s: frosted glass rim catches warm light. 3.7–4.6s: the 5ml bottle is revealed as a composed product pair, already part of the table set. 4.6–5.6s: camera glides laterally past both bottles. 5.6–6.7s: teal reflection arcs around the glass base. 6.7–8.0s: the glass rim grows into one luminous circular halo against dark graphite.

Transition description: The two bottles must remain physically stable in one tabletop arrangement; the 5ml is revealed by framing rather than popping into existence. The camera glide is slow and physically possible. Hold the circular glass halo for the last frame, ready to match-cut into Clip 05.

[PASTE GLOBAL CONTINUITY BLOCK]
```

## Prompt 05 — The Signal

```text
Create an 8-second cinematic product hero in 16:9 landscape, silent and without on-screen text. Start from the supplied final frame of Clip 04. The exact TEMPO 3ml and 5ml bottles from the supplied reference stand on an ivory paper pedestal in a deep graphite studio, with warm tungsten rim light and a thin teal halo reflection. Reserve large clean negative space on the left for website HTML headline and CTA.

0.0–1.0s: the circular halo in the input frame resolves into a teal reflection behind the product pedestal. 1.0–2.0s: both bottles are already standing on the pedestal. 2.0–3.0s: slow crane-in reveals ivory paper edge and graphite cap profiles. 3.0–4.1s: macro detail of the compact 3ml bottle. 4.1–5.1s: macro detail of the taller 5ml bottle. 5.1–6.1s: one teal wave reflection passes across the graphite surface. 6.1–7.0s: camera settles into a front three-quarter hero composition. 7.0–8.0s: hold an immobile premium product hero with left-side negative space.

Transition description: The products are present from the opening frame and stay upright, consistent and proportionally correct across the full clip. The teal effect is a reflection on the pedestal surface only; it must not change the bottles or create extra objects. End with a stable static frame so the landing can loop or overlay its waiting-list CTA without a visible jump.

[PASTE GLOBAL CONTINUITY BLOCK]
```

## Ghép và triển khai landing

Xuất tất cả clip dưới dạng MP4 H.264 720p. Khi ghép, dùng frame cuối của clip trước làm first-frame/reference của clip sau; vì vậy không cần hiệu ứng transition riêng giữa năm đoạn. Trên website, autoplay video ở chế độ `muted`, `playsInline`, `preload="metadata"`; đặt poster là keyframe tĩnh tương ứng và tự giảm xuống poster đối với `prefers-reduced-motion` hoặc mạng chậm. Phần CTA nên luôn là HTML: **“ĐĂNG KÝ HÀNG CHỜ · 1.000 SUẤT ĐẦU”**.
