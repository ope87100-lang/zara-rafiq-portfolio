import math
import os
import shutil
import struct
import subprocess
import wave
from PIL import Image, ImageDraw, ImageFont

ROOT = r"C:\Users\lenovo\.gemini\antigravity\scratch\zara-rafiq-portfolio"
BRAIN = r"C:\Users\lenovo\.gemini\antigravity\brain\03429278-a8c9-43ea-9ebb-fe707c5eb289"
USER_PORTRAIT = os.path.join(BRAIN, ".user_uploaded", "media_1795548474327_9ddd9f89.jpg")
USER_CV = os.path.join(BRAIN, ".user_uploaded", "media_1795548593828_cc5336bd.pdf")

PUB_IMAGES = os.path.join(ROOT, "public", "images")
PUB_DOCS = os.path.join(ROOT, "public", "documents")
PUB_AUDIO = os.path.join(ROOT, "public", "audio")
PUB_FAVICON = os.path.join(ROOT, "public", "favicon")

for d in (PUB_IMAGES, PUB_DOCS, PUB_AUDIO, PUB_FAVICON):
    os.makedirs(d, exist_ok=True)


def copy_primary_assets():
    # 1. Preserve original portrait untouched + create WebP derivatives
    shutil.copy2(USER_PORTRAIT, os.path.join(PUB_IMAGES, "zara-rafiq-portrait.jpg"))
    with Image.open(USER_PORTRAIT) as im:
        im.save(os.path.join(PUB_IMAGES, "zara-rafiq-portrait.webp"), "WEBP", quality=92, method=6)
        sm = im.resize((640, 426), Image.Resampling.LANCZOS)
        sm.save(os.path.join(PUB_IMAGES, "zara-rafiq-portrait-sm.webp"), "WEBP", quality=90, method=6)

    # 2. Preserve original CV PDF untouched
    shutil.copy2(USER_CV, os.path.join(PUB_DOCS, "Zara-Rafiq-CV.pdf"))


def get_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def create_favicons_and_og():
    # SVG Favicon
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#0C0C0C"/>
  <rect x="4" y="4" width="56" height="56" rx="13" fill="none" stroke="#F7D928" stroke-width="2.5"/>
  <text x="32" y="40" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="25" fill="#F7D928">ZR</text>
</svg>"""
    with open(os.path.join(PUB_FAVICON, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(svg)

    # PNG Favicons
    for size, name in [(32, "favicon-32x32.png"), (180, "apple-touch-icon.png")]:
        img = Image.new("RGB", (size, size), "#0C0C0C")
        draw = ImageDraw.Draw(img)
        margin = max(2, size // 16)
        draw.rounded_rectangle(
            [margin, margin, size - margin - 1, size - margin - 1],
            radius=max(6, size // 5),
            outline="#F7D928",
            width=max(2, size // 24),
        )
        font = get_font(int(size * 0.42), bold=True)
        bbox = draw.textbbox((0, 0), "ZR", font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        draw.text(((size - tw) / 2, (size - th) / 2 - size * 0.05), "ZR", fill="#F7D928", font=font)
        img.save(os.path.join(PUB_FAVICON, name))

    # Open Graph Cover (1200x630)
    og = Image.new("RGB", (1200, 630), "#0A0A0A")
    draw = ImageDraw.Draw(og)
    draw.rounded_rectangle([36, 36, 1164, 594], radius=36, fill="#161614", outline="#2E2E2A", width=2)
    draw.rounded_rectangle([84, 96, 390, 134], radius=19, fill="#F7D928")
    f_badge = get_font(18, bold=True)
    f_title = get_font(62, bold=True)
    f_sub = get_font(28, bold=False)
    f_foot = get_font(22, bold=False)

    draw.text((104, 103), "DIGITAL MARKETING & E-COMMERCE", fill="#111111", font=f_badge)
    draw.text((84, 185), "Zara Rafiq", fill="#FFFFFF", font=f_title)
    draw.text((84, 272), "Junior Digital Marketing Assistant | E-commerce Assistant", fill="#F7D928", font=f_sub)
    draw.text((84, 325), "eBay Listing Preparation · Product Research · Canva Design", fill="#C8C8C2", font=f_sub)
    draw.text((84, 515), "Lahore, Pakistan  ·  zararafiq18@gmail.com", fill="#A0A098", font=f_foot)
    og.save(os.path.join(PUB_IMAGES, "og-cover.png"))


def draw_preview_card(path, tag, title, subtitle, rows, accent_mode="yellow"):
    W, H = 960, 640
    bg = "#FCFDFF" if accent_mode == "light" else "#161614"
    card_bg = "#F2F2EE" if accent_mode == "light" else "#20201C"
    fg = "#111111" if accent_mode == "light" else "#F5F5F4"
    muted = "#555550" if accent_mode == "light" else "#B4B4AC"
    border = "#DFDFD8" if accent_mode == "light" else "#31312C"

    im = Image.new("RGB", (W, H), bg)
    d = ImageDraw.Draw(im)

    # Outer panel
    d.rounded_rectangle([32, 32, W - 32, H - 32], radius=28, fill=card_bg, outline=border, width=2)

    # Top bar dots + Illustrative Preview tag
    for idx, c in enumerate(["#F7D928", "#8C8C82", "#55554E"]):
        d.ellipse([64 + idx * 22, 62, 78 + idx * 22, 76], fill=c)

    f_tag = get_font(17, bold=True)
    d.rounded_rectangle([W - 290, 52, W - 64, 88], radius=18, fill="#F7D928")
    d.text((W - 270, 59), tag, fill="#111111", font=f_tag)

    # Title & subtitle
    f_h = get_font(34, bold=True)
    f_sub = get_font(21, bold=False)
    d.text((64, 118), title, fill=fg, font=f_h)
    d.text((64, 168), subtitle, fill=muted, font=f_sub)

    # Structured wireframe rows
    f_row_k = get_font(19, bold=True)
    f_row_v = get_font(19, bold=False)
    y = 232
    for label, val in rows:
        row_fill = "#FFFFFF" if accent_mode == "light" else "#141412"
        d.rounded_rectangle([64, y, W - 64, y + 72], radius=16, fill=row_fill, outline=border, width=2)
        d.rounded_rectangle([82, y + 20, 94, y + 52], radius=6, fill="#F7D928")
        d.text((112, y + 23), label, fill=fg, font=f_row_k)
        d.text((385, y + 23), val, fill=muted, font=f_row_v)
        y += 88

    im.save(path, "WEBP", quality=92, method=6)


def create_project_previews():
    draw_preview_card(
        os.path.join(PUB_IMAGES, "ebay-listing-preview.webp"),
        "ILLUSTRATIVE PREVIEW",
        "eBay Listing Structure Draft",
        "Practical layout: keyword-clear title, structured item specifics & feature bullets",
        [
            ("Listing Title Draft", "Clear product attributes, model specs & condition wording"),
            ("Item Specifics Table", "Brand, material, dimensions, color & compatibility fields"),
            ("Feature Description", "Readable buyer-focused bullet list & specification summary"),
            ("Visual Asset Plan", "Primary photo framing + simple feature-callout infographic"),
        ],
        accent_mode="light",
    )

    draw_preview_card(
        os.path.join(PUB_IMAGES, "ebay-research-preview.webp"),
        "ILLUSTRATIVE PREVIEW",
        "Product & Item Specifics Checklist",
        "Self-directed product information verification & listing readiness workflow",
        [
            ("Feature Verification", "Cross-checking product dimensions, specs & variant labels"),
            ("Category & Attributes", "Matching required vs. recommended marketplace specifics"),
            ("Title Optimization", "Structuring concise 80-character descriptive listing titles"),
            ("Accuracy Review", "Proofreading copy for spelling, clarity & specification match"),
        ],
        accent_mode="dark",
    )

    draw_preview_card(
        os.path.join(PUB_IMAGES, "canva-social-preview.webp"),
        "ILLUSTRATIVE PREVIEW",
        "Facebook & Instagram Content Grid",
        "Practical content calendar & visual layout planning in Canva",
        [
            ("Post Format Mix", "Square product highlights, carousel tips & feature cards"),
            ("Visual Consistency", "Aligned color contrast, readable headlines & clean spacing"),
            ("Caption Planning", "Clear product messaging paired with concise social copy"),
            ("Scheduling Draft", "Weekly Facebook & Instagram topic organization"),
        ],
        accent_mode="light",
    )

    draw_preview_card(
        os.path.join(PUB_IMAGES, "canva-infographic-preview.webp"),
        "ILLUSTRATIVE PREVIEW",
        "Canva Product-Content Visuals",
        "Simple feature callout & promotional graphic layout practice",
        [
            ("Hero Feature Frame", "Clean product focal zone with clear top headline"),
            ("Callout Highlights", "3-point visual feature breakdown for quick buyer scanning"),
            ("Typography Hierarchy", "Legible title, concise subtext & uncluttered whitespace"),
            ("Export Readiness", "Sized cleanly for e-commerce galleries & social feeds"),
        ],
        accent_mode="dark",
    )


def create_ambient_piano_audio():
    # Generate a gentle, original felt-piano ambient chord progression (~32 seconds seamless loop)
    sr = 22050
    duration = 32.0
    n_samples = int(sr * duration)
    buf = [0.0] * n_samples

    # Warm Cmaj9 -> Am9 -> Fmaj7 -> G6 chord sequence (4 bars x 8s = 32s, or 8 chords x 4s)
    chords = [
        # (start_s, notes_hz, vel)
        (0.0,  [261.63, 329.63, 392.00, 493.88, 587.33], 0.16),  # Cmaj9
        (2.0,  [392.00, 523.25], 0.08),
        (4.0,  [220.00, 261.63, 329.63, 392.00, 493.88], 0.15),  # Am9
        (6.0,  [329.63, 440.00], 0.08),
        (8.0,  [174.61, 261.63, 329.63, 440.00], 0.15),          # Fmaj7
        (10.0, [329.63, 392.00], 0.08),
        (12.0, [196.00, 293.66, 329.63, 392.00], 0.15),          # G6
        (14.0, [293.66, 493.88], 0.08),
        (16.0, [261.63, 329.63, 392.00, 523.25], 0.15),          # Cmaj7
        (18.0, [392.00, 587.33], 0.08),
        (20.0, [220.00, 293.66, 329.63, 440.00], 0.15),          # Asus2/Am
        (22.0, [329.63, 493.88], 0.08),
        (24.0, [174.61, 220.00, 261.63, 392.00], 0.15),          # Fadd9
        (26.0, [329.63, 440.00], 0.08),
        (28.0, [196.00, 246.94, 293.66, 392.00], 0.14),          # G
        (30.0, [293.66, 392.00], 0.07),
    ]

    for start_s, notes, vel in chords:
        start_idx = int(start_s * sr)
        note_len = int(4.5 * sr)
        for ni, freq in enumerate(notes):
            arpeggio_offset = int(ni * 0.08 * sr)
            for i in range(note_len):
                idx = (start_idx + arpeggio_offset + i) % n_samples
                t = i / sr
                # Soft felt-piano attack + warm exponential decay
                attack = min(1.0, t / 0.035)
                decay = math.exp(-t * 0.95)
                # Fundamental + gentle 2nd & 3rd harmonics
                sig = (
                    math.sin(2 * math.pi * freq * t) * 0.78
                    + math.sin(2 * math.pi * freq * 2.0 * t) * 0.16 * math.exp(-t * 1.4)
                    + math.sin(2 * math.pi * freq * 3.0 * t) * 0.04 * math.exp(-t * 2.0)
                )
                buf[idx] += sig * attack * decay * vel

    # Normalize softly and apply smooth fade at very start/end for click-free loop
    peak = max(abs(x) for x in buf) or 1.0
    scale = 0.72 / peak
    fade_samples = int(0.08 * sr)

    wav_path = os.path.join(PUB_AUDIO, "ambient-piano.wav")
    mp3_path = os.path.join(PUB_AUDIO, "ambient-piano.mp3")

    with wave.open(wav_path, "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        frames = bytearray()
        for i, x in enumerate(buf):
            val = x * scale
            if i < fade_samples:
                val *= i / fade_samples
            elif i > n_samples - fade_samples:
                val *= (n_samples - i) / fade_samples
            s = max(-32767, min(32767, int(val * 32767)))
            frames.extend(struct.pack("<h", s))
        wf.writeframes(bytes(frames))

    ffmpeg_exe = shutil.which("ffmpeg") or r"C:\Users\lenovo\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-essentials_build\bin\ffmpeg.exe"
    subprocess.run(
        [ffmpeg_exe, "-y", "-i", wav_path, "-codec:a", "libmp3lame", "-qscale:a", "4", mp3_path],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    os.remove(wav_path)


if __name__ == "__main__":
    copy_primary_assets()
    create_favicons_and_og()
    create_project_previews()
    create_ambient_piano_audio()
    print("All portfolio assets prepared successfully.")
