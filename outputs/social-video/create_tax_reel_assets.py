from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = Path(__file__).parent
W, H = 1080, 1920

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size, bold=False):
    path = FONT_BOLD if bold else FONT_REGULAR
    return ImageFont.truetype(path, size=size)


def wrap_text(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=fnt)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def rounded(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def background():
    img = Image.new("RGB", (W, H), "#f8fafc")
    pix = img.load()
    for y in range(H):
        t = y / H
        r = int(248 * (1 - t) + 219 * t)
        g = int(250 * (1 - t) + 234 * t)
        b = int(252 * (1 - t) + 254 * t)
        for x in range(W):
            pix[x, y] = (r, g, b)

    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse((-170, -120, 560, 610), fill=(45, 212, 191, 62))
    od.ellipse((620, -160, 1290, 520), fill=(59, 130, 246, 70))
    overlay = overlay.filter(ImageFilter.GaussianBlur(26))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def draw_brand(draw):
    rounded(draw, (72, 62, 130, 120), 16, "#2563eb")
    draw.text((91, 75), "V", font=font(30, True), fill="white")
    draw.text((148, 68), "Venveel", font=font(40, True), fill="#0f172a")


def draw_text_block(draw, eyebrow, title, support=None, pills=None, card=None, url=None):
    y = 360
    rounded(draw, (72, y, 72 + draw.textbbox((0, 0), eyebrow, font=font(30, True))[2] + 60, y + 72), 36, "#ffffff", "#bfdbfe", 2)
    draw.text((102, y + 19), eyebrow, font=font(30, True), fill="#1d4ed8")
    y += 112

    title_font = font(86 if len(title) < 42 else 76, True)
    for line in wrap_text(draw, title, title_font, 920):
        draw.text((72, y), line, font=title_font, fill="#020617")
        y += int(title_font.size * 1.03)

    if support:
        y += 34
        support_font = font(42, True)
        for line in wrap_text(draw, support, support_font, 860):
            draw.text((72, y), line, font=support_font, fill="#334155")
            y += 54

    if pills:
        y += 44
        for i, pill in enumerate(pills, 1):
            text = pill[1] if isinstance(pill, tuple) else pill
            icon = pill[0] if isinstance(pill, tuple) else str(i)
            rounded(draw, (72, y, 940, y + 96), 26, "#ffffff", "#dbeafe", 2)
            rounded(draw, (98, y + 21, 152, y + 75), 16, "#dbeafe")
            draw.text((115, y + 31), icon, font=font(26, True), fill="#1d4ed8")
            draw.text((178, y + 26), text, font=font(38, True), fill="#0f172a")
            y += 118

    if card:
        y += 46
        rounded(draw, (72, y, 972, y + 285), 34, "#ffffff", "#bfdbfe", 2)
        draw.text((108, y + 38), card[0], font=font(34, True), fill="#1d4ed8")
        card_font = font(58, True)
        cy = y + 96
        for line in wrap_text(draw, card[1], card_font, 820):
            draw.text((108, cy), line, font=card_font, fill="#020617")
            cy += 64

    if url:
        y += 56
        rounded(draw, (72, y, 910, y + 92), 24, "#0f172a")
        draw.text((102, y + 26), url, font=font(36, True), fill="white")


def draw_footer(draw):
    draw.text((72, 1768), "Tax Calculator", font=font(28, True), fill="#475569")
    draw.text((612, 1768), "New regime ITR guides", font=font(28, True), fill="#475569")
    rounded(draw, (72, 1834, 1008, 1844), 5, "#bfdbfe")


slides = [
    ("ITR filing season", "Filing under the new tax regime?", "Do not submit your return blindly.", None, None, None),
    ("Before you file", "Check the documents that change your tax.", None, [("1", "Form 16"), ("2", "AIS / TIS"), ("3", "Form 26AS")], None, None),
    ("Common mistake", "Many taxpayers miss AIS income or TDS credits.", "Interest, dividends, refund interest, TCS and capital gains can change the final amount.", None, None, None),
    ("Free tool", "Use the Tax Calculator before filing.", None, None, ("Know your exact tax amount", "Compare new vs old regime in one place."), None),
    ("Guides included", "Step-by-step help for the full filing flow.", None, [("✓", "New regime portal guide"), ("✓", "AIS download guide"), ("✓", "Form 16 vs AIS vs 26AS")], None, None),
    ("Start here", "Open Wealth → Tax filing guides.", "Free calculator, ITR checklist, rebate guide and document help.", None, None, "www.venveel.com/wealth"),
]

frames = []
for idx, slide in enumerate(slides, 1):
    img = background()
    d = ImageDraw.Draw(img)
    draw_brand(d)
    draw_text_block(d, *slide)
    draw_footer(d)
    path = OUT / f"tax-reel-slide-{idx}.png"
    img.convert("RGB").save(path, quality=95)
    frames.append(img.convert("P", palette=Image.ADAPTIVE))

gif_path = OUT / "venveel-tax-filing-reel.gif"
frames[0].save(
    gif_path,
    save_all=True,
    append_images=frames[1:],
    duration=[4000, 4000, 4000, 4000, 4000, 5000],
    loop=0,
    optimize=False,
)

print(gif_path)
