#!/usr/bin/env python3
"""
Apply the Dallo golden vignette background (Opción 3) to product photos.

Usage:
    python3 scripts/apply-golden-vignette.py <input_image> [output_image]

The script:
  1. Removes the existing background (works best on plain gray/white backgrounds)
  2. Creates the warm golden vignette gradient background
  3. Composites the product onto the new background

Colors (Option 3 - Viñeta Dorada):
  Center:  #faf3e8  (warm cream)
  Mid:     #eddec8  (warm beige)
  Edge:    #d9c0a0  (warm golden tan)
"""

import sys
import os
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove

# Golden vignette gradient colors (matching CARD_BG in products.ts)
CENTER_COLOR  = (250, 243, 232)  # #faf3e8
MID_COLOR     = (237, 222, 200)  # #eddec8
EDGE_COLOR    = (217, 192, 160)  # #d9c0a0


def hex_to_rgb(h: str) -> tuple:
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def make_golden_vignette(width: int, height: int) -> Image.Image:
    """Create a radial gradient background matching Opción 3 - Viñeta Dorada."""
    cx, cy = width / 2, height * 0.40  # ellipse centered at 40% height, as in CSS

    # Normalised distances — ellipse shaped (wider than tall)
    y_coords, x_coords = np.mgrid[0:height, 0:width]
    dx = (x_coords - cx) / (width * 0.55)
    dy = (y_coords - cy) / (height * 0.60)
    dist = np.clip(np.sqrt(dx**2 + dy**2), 0, 1)

    # Two-stop blend: centre→mid at [0, 0.65], mid→edge at [0.65, 1]
    t1 = np.clip(dist / 0.65, 0, 1)         # 0→1 over first 65%
    t2 = np.clip((dist - 0.65) / 0.35, 0, 1) # 0→1 over last 35%

    c = np.array(CENTER_COLOR, dtype=float)
    m = np.array(MID_COLOR,    dtype=float)
    e = np.array(EDGE_COLOR,   dtype=float)

    # Blend
    rgb = (1 - t1)[..., None] * c + t1[..., None] * m
    rgb = (1 - t2)[..., None] * rgb + t2[..., None] * e
    rgb = np.clip(rgb, 0, 255).astype(np.uint8)

    return Image.fromarray(rgb, 'RGB')


def apply_golden_vignette(input_path: str, output_path: str):
    print(f"  Loading: {input_path}")
    with open(input_path, 'rb') as f:
        raw = f.read()

    print("  Removing background...")
    fg_bytes = remove(raw)
    fg = Image.open(__import__('io').BytesIO(fg_bytes)).convert('RGBA')

    w, h = fg.size
    print(f"  Image size: {w}x{h}")

    print("  Creating golden vignette background...")
    bg = make_golden_vignette(w, h).convert('RGBA')

    # Slight shadow/ground reflection — subtle darkening at bottom edge
    shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    shadow_arr = np.zeros((h, w, 4), dtype=np.uint8)
    for y in range(h):
        alpha = int(max(0, (y / h - 0.85) / 0.15) * 30)  # subtle at bottom 15%
        shadow_arr[y, :, 3] = alpha
    shadow = Image.fromarray(shadow_arr, 'RGBA')
    bg = Image.alpha_composite(bg, shadow)

    print("  Compositing product onto background...")
    result = Image.alpha_composite(bg, fg)

    # Save as high-quality JPEG or PNG
    ext = os.path.splitext(output_path)[1].lower()
    if ext in ('.jpg', '.jpeg'):
        result.convert('RGB').save(output_path, 'JPEG', quality=95)
    else:
        result.save(output_path, 'PNG')

    print(f"  Saved: {output_path}")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    input_path = sys.argv[1]
    if not os.path.exists(input_path):
        print(f"Error: file not found: {input_path}")
        sys.exit(1)

    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_golden_vignette.jpg"

    apply_golden_vignette(input_path, output_path)
    print("Done.")


if __name__ == '__main__':
    main()
