"""Sinh biến thể WebP responsive cho ảnh landing TEMPO.

Đọc ảnh nguồn trong thư mục truyền vào, ghi ba biến thể (480w / 960w / gốc) vào
client/public/media và in ra bảng TEMPO_MEDIA để dán vào client/src/config/tempoMedia.ts.

Dùng khi thay ảnh nguồn:
    python scripts/optimize-media.py <thu-muc-anh-goc>

Chất lượng chọn theo mục đích: ảnh landing là infographic nhiều chữ tiếng Việt, nên bản
gốc giữ q90 để đọc được trong lightbox, còn bản thu nhỏ hạ xuống vừa đủ cho khung hiển thị.
"""

import re
import sys
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parent.parent
DEST = REPO / "client" / "public" / "media"
VARIANTS = (("webp480", 480, 82), ("webp960", 960, 85), ("webp", None, 90))
HASH_SUFFIX = re.compile(r"_[0-9a-f]{8}$")


def optimize(source: Path) -> dict[str, object]:
    image = Image.open(source).convert("RGB")
    width, height = image.size
    base = HASH_SUFFIX.sub("", source.stem)
    entry: dict[str, object] = {"width": width, "height": height}
    for key, target, quality in VARIANTS:
        resized = image if target is None or target >= width else image.resize(
            (target, round(height * target / width)), Image.LANCZOS
        )
        name = f"{base}.webp" if target is None else f"{base}-{target}.webp"
        resized.save(DEST / name, "WEBP", quality=quality, method=6)
        entry[key] = f"/media/{name}"
    entry["fallback"] = entry["webp"]
    return {"base": base, **entry}


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 1
    sources = sorted(Path(sys.argv[1]).glob("*.png"))
    if not sources:
        print("Không tìm thấy ảnh .png nào trong thư mục nguồn.")
        return 1
    DEST.mkdir(parents=True, exist_ok=True)
    before = after = 0
    for source in sources:
        before += source.stat().st_size
        entry = optimize(source)
        after += sum((DEST / Path(str(entry[key])).name).stat().st_size for key, _, _ in VARIANTS)
        print(
            f'  "{entry["base"]}": {{ webp480: "{entry["webp480"]}", webp960: "{entry["webp960"]}", '
            f'webp: "{entry["webp"]}", fallback: "{entry["fallback"]}", '
            f'width: {entry["width"]}, height: {entry["height"]} }},'
        )
    print(f"\n{len(sources)} ảnh: {before / 1048576:.1f} MB -> {after / 1048576:.1f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
