from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path('/home/ubuntu/webdev-static-assets')

VARIANTS = {
    'tempo-p01-3ml-front.jpg': ('tempo-visual-01-pocket-3ml.jpg', (1600, 1600)),
    'tempo-p02-5ml-front.jpg': ('tempo-visual-02-ritual-5ml.jpg', (1600, 1600)),
    'tempo-p03-duo.jpg': ('tempo-visual-08-travel-kit.jpg', (1600, 2000)),
    'tempo-p04-course-2x5ml.jpg': ('tempo-visual-04-unboxing.jpg', (1600, 2000)),
    'tempo-p05-3ml-hand-scale.jpg': ('tempo-visual-03-scale-pair.jpg', (1600, 2000)),
    'tempo-l01-pocket-leaving.jpg': ('tempo-visual-01-pocket-3ml.jpg', (1600, 2000)),
    'tempo-l02-workday-desk.jpg': ('tempo-visual-02-ritual-5ml.jpg', (1600, 2000)),
    'tempo-l03-weekend-travel.jpg': ('tempo-visual-08-travel-kit.jpg', (1600, 2000)),
    'tempo-l04-evening-ritual-5ml.jpg': ('tempo-visual-05-nightstand.jpg', (1600, 2000)),
    'tempo-l05-bathroom-shelf-5ml.jpg': ('tempo-visual-10-ivory-daylight.jpg', (1600, 2000)),
    'tempo-l06-nightstand-5ml.jpg': ('tempo-visual-06-jacket-sleeve.jpg', (1600, 2000)),
    'tempo-l07-duo-home-away.jpg': ('tempo-visual-08-travel-kit.jpg', (1600, 2000)),
    'tempo-l08-gift-ready-duo.jpg': ('tempo-visual-04-unboxing.jpg', (1600, 2000)),
    'tempo-l09-date-table.jpg': ('tempo-visual-11-evening-card.jpg', (1600, 2000)),
    'tempo-l10-return-2x5ml.jpg': ('tempo-visual-05-nightstand.jpg', (1600, 2000)),
    'tempo-h01-night-confident-hero.jpg': ('tempo-visual-07-signal-hero.jpg', (1920, 1080)),
    'tempo-h02-teal-signal-hero.jpg': ('tempo-visual-10-ivory-daylight.jpg', (1920, 1080)),
}


def cover(source: Image.Image, target: tuple[int, int]) -> Image.Image:
    tw, th = target
    sw, sh = source.size
    scale = max(tw / sw, th / sh)
    resized = source.resize((round(sw * scale), round(sh * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - tw) // 2
    top = (resized.height - th) // 2
    return resized.crop((left, top, left + tw, top + th))


def export_variant(filename: str, source_name: str, target: tuple[int, int]) -> None:
    src_path = ROOT / source_name
    if not src_path.exists():
        raise FileNotFoundError(src_path)
    source = Image.open(src_path).convert('RGB')
    image = cover(source, target)
    image.save(ROOT / filename, quality=93, optimize=True)


if __name__ == '__main__':
    for output, (source, size) in VARIANTS.items():
        export_variant(output, source, size)
