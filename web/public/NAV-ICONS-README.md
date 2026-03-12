# Nav icons (bottom bar)

- `media.png` – 社群  
- `pet-match.png` – 配對  
- `chat.png` – 訊息  
- `dog-walking.png` – 代放  
- `shops.png` – 商城  

## Same resolution

All 5 files are normalized to **128×128** by running from project root:

```bash
./scripts/normalize-nav-icons.sh
```

## Same line thickness

If some icons look thicker or thinner, that comes from the **artwork**, not the resolution. To get uniform line weight:

1. **Re-export from your design tool** (Figma, Illustrator, etc.) with the same stroke for all 5 (e.g. 2px).
2. **Or use SVG**: export as SVG; we can use them in the nav with a single `stroke-width` in CSS so every icon has the same line thickness.
