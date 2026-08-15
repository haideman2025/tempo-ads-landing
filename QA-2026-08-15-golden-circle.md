# QA — Golden Circle and Bundle Upgrade

## Scope checked

The revised landing was captured at a 1440×1000 desktop viewport and a 390×844 mobile viewport. The page renders a sequential Why–How–What narrative, large product-format cards, the formula/origin transparency module, and the waitlist selector with four options.

## Findings

| Area | Result |
|---|---|
| Product imagery | Cards now use approved packaging studies and the consistent master tabletop image; `object-fit: contain` prevents bottle/box crops. The previously flagged Pocket, Gift Ready and The Table frames are no longer used in the conversion journey. |
| Golden Circle | The page visibly moves from emotional intent (Why) to a transparent approach centered on label, INCI and traceability (How), then to SKU and bundle choices (What). |
| Product selection | Desktop renders four prominent cards; mobile stacks them for readable comparison. The waitlist exposes 3ml, 5ml, Duo, and 2×5ml. |
| Responsive layout | No horizontal overflow or obscured CTA was observed in the captured desktop/mobile views. |
| Automated regression | `pnpm test` passed: 3 files, 8 tests. |

## Known follow-up

Only the first user-supplied motion video is stored and integrated. The remaining four videos still need to be uploaded again before their corresponding story chapters can be populated. Formula, manufacturer and origin details intentionally remain neutral on the public landing until they are confirmed against the final label and product dossier.
