from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = Path('/home/ubuntu/webdev-static-assets')
LOGO = Path('/home/ubuntu/upload/v2joylogo.jpg')
MOCKUP = Path('/home/ubuntu/projects/v2joy-01369820/TEMPO-packaging-mockup-primary-v2.png')
MASTER = Path('/home/ubuntu/webdev-static-assets/tempo-commercial-master.jpg')
W, H = 1600, 2000
GRAPHITE = '#151B21'
IVORY = '#F4EEE4'
TEAL = '#2FB1C4'
MUTED = '#A4B0B6'
GOLD = '#C9A765'


def font(size, bold=False, italic=False):
    candidates = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
        '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf',
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def wrapped(draw, text, xy, width, fnt, fill, line_gap=10):
    words = text.split()
    lines, current = [], ''
    for word in words:
        trial = (current + ' ' + word).strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= width:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=fnt, fill=fill)
        y += fnt.size + line_gap
    return y


def base(label, title, subtitle):
    image = Image.new('RGB', (W, H), GRAPHITE)
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, W, 20), fill=TEAL)
    draw.text((110, 105), 'TEMPO / V2JOY', font=font(34, True), fill=IVORY)
    draw.text((110, 160), label.upper(), font=font(25, True), fill=TEAL)
    y = wrapped(draw, title, (110, 245), 1120, font(92, True), IVORY, 4)
    wrapped(draw, subtitle, (110, y + 38), 1120, font(36), MUTED, 12)
    return image, draw


def pill(draw, x, y, text, color=TEAL):
    fnt = font(28, True)
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.rounded_rectangle((x, y, x + (box[2]-box[0]) + 46, y + 58), radius=29, fill=color)
    draw.text((x+23, y+12), text, font=fnt, fill=GRAPHITE)


def card(draw, x, y, w, h, heading, value, copy, accent=TEAL):
    draw.rounded_rectangle((x, y, x+w, y+h), radius=32, fill='#212A32', outline='#31404A', width=2)
    draw.rectangle((x, y, x+10, y+h), fill=accent)
    draw.text((x+42, y+36), heading.upper(), font=font(26, True), fill=MUTED)
    draw.text((x+42, y+88), value, font=font(54, True), fill=IVORY)
    wrapped(draw, copy, (x+42, y+165), w-80, font(29), IVORY, 10)


def product_panel(image, x, y, w, h):
    source_path = MASTER if MASTER.exists() else MOCKUP
    if source_path.exists():
        source = Image.open(source_path).convert('RGB')
        source.thumbnail((w, h))
        bg = Image.new('RGB', (w, h), '#0E1419')
        bg.paste(source, ((w-source.width)//2, (h-source.height)//2))
        image.paste(bg, (x, y))


def add_logo(image):
    if LOGO.exists():
        logo = Image.open(LOGO).convert('RGB').resize((150, 150))
        image.paste(logo, (W-260, H-260))


def save(image, name):
    add_logo(image)
    image.save(OUT / name, quality=95)


def trial():
    image, draw = base('TEMPO KHỞI ĐẦU · 3ML', 'NHỎ GỌN ĐỂ BẮT ĐẦU.', 'Lựa chọn trải nghiệm cho những buổi tối cần thêm một nhịp chuẩn bị chỉn chu.')
    pill(draw, 110, 625, '3ML · DÙNG THỬ')
    card(draw, 110, 730, 650, 280, 'Dung tích', '3ML', 'Gọn trong túi áo, túi du lịch hoặc ngăn bàn làm việc.')
    card(draw, 840, 730, 650, 280, 'Quy ước sử dụng', '12–15 LẦN', 'Thông tin cần đối chiếu lại với nhãn và hồ sơ công bố trước khi xuất bản.', GOLD)
    product_panel(image, 110, 1110, 1380, 620)
    draw.text((110, 1770), 'GIÁ THAM CHIẾU: 349.000Đ', font=font(31, True), fill=TEAL)
    save(image, 'tempo-i01-3ml-trial-card.jpg')


def regular():
    image, draw = base('TEMPO CHUẨN · 5ML', 'DÀNH CHO NHỊP THƯỜNG XUYÊN.', 'SKU chủ lực cho một routine chăm sóc riêng tư, không phô trương.')
    pill(draw, 110, 625, '5ML · DÙNG THƯỜNG XUYÊN')
    card(draw, 110, 730, 650, 280, 'Dung tích', '5ML', 'Quy cách dùng tại nhà, đặt cùng các vật dụng grooming quen thuộc.')
    card(draw, 840, 730, 650, 280, 'Quy ước sử dụng', '20–25 LẦN', 'Thông tin cần đối chiếu lại với nhãn và hồ sơ công bố trước khi xuất bản.', GOLD)
    product_panel(image, 110, 1110, 1380, 620)
    draw.text((110, 1770), 'GIÁ THAM CHIẾU: 499.000Đ', font=font(31, True), fill=TEAL)
    save(image, 'tempo-i02-5ml-regular-card.jpg')


def duo():
    image, draw = base('TEMPO DUO · 3ML + 5ML', 'Ở NHÀ ĐỦ. RA NGOÀI GỌN.', 'Một bộ linh hoạt: chai 5ml ở lại trong routine, chai 3ml đồng hành khi cần.')
    pill(draw, 110, 625, 'BỘ ĐÔI LINH HOẠT')
    card(draw, 110, 730, 650, 280, '3ML', 'MANG THEO', 'Travel size cho túi áo, túi du lịch và những lịch trình ngắn.')
    card(draw, 840, 730, 650, 280, '5ML', 'Ở NHÀ', 'Sản phẩm thường xuyên trong không gian chăm sóc của riêng bạn.', GOLD)
    product_panel(image, 110, 1110, 1380, 620)
    draw.text((110, 1770), 'GIÁ THAM CHIẾU: 699.000Đ · TIẾT KIỆM 149.000Đ SO VỚI MUA LẺ', font=font(25, True), fill=TEAL)
    save(image, 'tempo-i03-duo-flex-card.jpg')


def ladder():
    image, draw = base('TEMPO BUNDLE LADDER', 'CHỌN THEO NHỊP CỦA BẠN.', 'Định giá theo tình huống sử dụng, không định nghĩa giá trị chỉ bằng số ml.')
    rows = [
        ('KHỞI ĐẦU', '3ML', '349.000Đ', 'Trải nghiệm gọn nhẹ'),
        ('CHUẨN', '5ML', '499.000Đ', 'Dùng thường xuyên'),
        ('DUO', '3ML + 5ML', '699.000Đ', 'Ở nhà + mang theo'),
        ('LIỆU TRÌNH', '2 × 5ML', '899.000Đ', 'Khách quay lại'),
    ]
    y = 650
    for idx, (name, size, price, role) in enumerate(rows):
        color = TEAL if idx == 2 else GOLD if idx == 1 else '#2B363F'
        draw.rounded_rectangle((110, y, 1490, y+195), radius=30, fill=color)
        draw.text((155, y+40), name, font=font(37, True), fill=GRAPHITE if idx in (1,2) else IVORY)
        draw.text((600, y+46), size, font=font(34, True), fill=GRAPHITE if idx in (1,2) else TEAL)
        draw.text((950, y+38), price, font=font(45, True), fill=GRAPHITE if idx in (1,2) else IVORY)
        draw.text((155, y+110), role, font=font(28), fill=GRAPHITE if idx in (1,2) else MUTED)
        y += 225
    draw.text((110, 1700), 'KHUNG GIÁ THỬ NGHIỆM · CẦN XÁC NHẬN GIÁ VỐN VÀ CHI PHÍ KÊNH TRƯỚC KHI CÔNG BỐ', font=font(23, True), fill=MUTED)
    save(image, 'tempo-i04-value-ladder.jpg')


def delivery():
    image, draw = base('TEMPO · GIAO KÍN ĐÁO', 'SỰ RIÊNG TƯ ĐƯỢC TÔN TRỌNG.', 'Một trải nghiệm nhận hàng gọn gàng, trung tính và không phô trương.')
    card(draw, 110, 650, 650, 300, '01', 'HỘP TRUNG TÍNH', 'Không dùng hình ảnh nhạy cảm ở mặt ngoài kiện hàng.')
    card(draw, 840, 650, 650, 300, '02', 'KIỂM HÀNG', 'Quy trình xác nhận đơn cần tuân theo chính sách vận hành đã công bố.', GOLD)
    card(draw, 110, 1020, 650, 300, '03', 'TƯ VẤN KÍN ĐÁO', 'Ưu tiên câu trả lời rõ ràng, không phán xét và đúng tài liệu sản phẩm.')
    card(draw, 840, 1020, 650, 300, '04', 'NHẬN HÀNG GỌN GÀNG', 'Kiện hàng giữ tinh thần tối giản của V2JOY.', TEAL)
    product_panel(image, 110, 1410, 1380, 360)
    save(image, 'tempo-i05-discreet-delivery.jpg')


def brand_story():
    image, draw = base('TEMPO · NGHI THỨC CHỈN CHU', 'KHÔNG PHẢI VỘI. LÀ CÓ CHUẨN BỊ.', 'Một ngôn ngữ chăm sóc bình tĩnh, trưởng thành và dành cho cả hai.')
    points = [
        ('CHĂM SÓC', 'Đặt bản thân vào một routine gọn gàng.'),
        ('TỰ TIN', 'Giữ nhịp điềm tĩnh trong những điều quan trọng.'),
        ('KÍN ĐÁO', 'Bao bì, câu chuyện và trải nghiệm đều tôn trọng riêng tư.'),
    ]
    y = 650
    for title, copy in points:
        draw.ellipse((110, y+5, 160, y+55), fill=TEAL)
        draw.text((195, y), title, font=font(37, True), fill=IVORY)
        wrapped(draw, copy, (195, y+58), 1050, font(29), MUTED, 8)
        y += 225
    product_panel(image, 110, 1380, 1380, 390)
    save(image, 'tempo-i06-ritual-story.jpg')


def contact_sheet():
    names = [
        'tempo-p01-3ml-front.jpg', 'tempo-p02-5ml-front.jpg', 'tempo-p03-duo.jpg',
        'tempo-p04-course-2x5ml.jpg', 'tempo-p05-3ml-hand-scale.jpg',
        'tempo-l01-pocket-leaving.jpg', 'tempo-l02-workday-desk.jpg',
        'tempo-l03-weekend-travel.jpg', 'tempo-l04-evening-ritual-5ml.jpg',
        'tempo-l05-bathroom-shelf-5ml.jpg', 'tempo-l06-nightstand-5ml.jpg',
        'tempo-l07-duo-home-away.jpg', 'tempo-l08-gift-ready-duo.jpg',
        'tempo-l09-date-table.jpg', 'tempo-l10-return-2x5ml.jpg',
        'tempo-h01-night-confident-hero.jpg', 'tempo-h02-teal-signal-hero.jpg',
        'tempo-i01-3ml-trial-card.jpg', 'tempo-i02-5ml-regular-card.jpg',
        'tempo-i03-duo-flex-card.jpg', 'tempo-i04-value-ladder.jpg',
        'tempo-i05-discreet-delivery.jpg', 'tempo-i06-ritual-story.jpg',
    ]
    cols, cell_w, cell_h = 3, 420, 620
    rows = (len(names) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * cell_w + 80, rows * cell_h + 160), GRAPHITE)
    draw = ImageDraw.Draw(sheet)
    draw.text((40, 35), 'TEMPO / V2JOY — COMMERCIAL VISUAL REVIEW', font=font(34, True), fill=IVORY)
    for idx, name in enumerate(names):
        path = OUT / name
        if not path.exists():
            continue
        asset = Image.open(path).convert('RGB')
        asset.thumbnail((cell_w - 30, cell_h - 90))
        col, row = idx % cols, idx // cols
        x = 25 + col * cell_w + (cell_w - asset.width) // 2
        y = 120 + row * cell_h + 10
        sheet.paste(asset, (x, y))
        draw.text((25 + col * cell_w, 120 + row * cell_h + cell_h - 55), name.replace('.jpg', ''), font=font(18, True), fill=TEAL)
    sheet.save(OUT / 'tempo-commercial-contact-sheet.jpg', quality=92)


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    trial(); regular(); duo(); ladder(); delivery(); brand_story(); contact_sheet()
