# All-in-One Helper - Free Private Tools (Live)

**Live:** https://all-in-one-helper.pages.dev - also https://005c6970.all-in-one-helper.pages.dev

Free, private, no-upload clone of iLovePDF + TinyPNG + Remove.bg - 22 tools, 100% client-side, $0 infra (Cloudflare Pages + domain only).

## Monetization Triple
- **AdSense** (auto + 3 manual slots: top/sidebar/footer) - `ca-pub-...` placeholder, swap after approval
- **Custom Banners** via `public/banners.json` (header/sidebar/belowTool/footer) - sell for $50/mo
- **Buy Me a Coffee** `contactae2b` - `https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js` with `data-slug="contactae2b"` + #FFDD00 - footer + post-download toast

Both AdSense + custom + BMC run simultaneously, labeled, no policy conflict.

## Stack
- **Astro 7.2.4 + Tailwind 3.4.1** - static, 27 pages, 14KB CSS
- **pdf-lib 1.17.1, jszip 3.10.1, browser-image-compression 2.0.2, qrcode 1.5.4** - lazy-loaded, Web Worker
- **Cloudflare Pages** - `dist/` deploy via `wrangler pages deploy`
- **GitHub:** https://github.com/mrfentmen/all-in-one-helper

## Tools (22)
**PDF (9):** merge, split, compress, pdf→jpg, jpg→pdf, rotate, extract text, watermark, unlock
**Image (5):** compress, remove BG (WASM @imgly), convert, resize, upscale
**Video/Audio (2):** video compress (ffmpeg.wasm), audio cutter
**Utility (6):** QR gen, resume builder, word counter, JSON formatter, password gen, color picker

All run 100% in browser - verify Network tab: 0 bytes upload.

## Quick Start
```sh
bun install
bun run dev   # http://localhost:4321
bun run build # dist/
```

## Deploy
```sh
bunx wrangler pages deploy dist --project-name=all-in-one-helper --branch=main
# live at https://all-in-one-helper.pages.dev
```

## Planning Docs (Source of Truth)
- `SOURCE_OF_TRUTH.md` (1508w) - vision, 22 tools, constraints
- `TASKS.md` (1378w) - 40+ tasks
- `ROADMAP.md` (1698w) - 7-week plan
- `CHANGELOG.md` - Keep a Changelog
- `VOWS.md` (1221w) - 8 vows (privacy, free forever)
- `CONSTITUTION.md` (1084w) - governance
- `PLAN.md` (1065w) - build blueprint
- `PLANNING_INDEX.md` - index of planning docs

## Privacy Vow
Your files never leave your device. No `/upload` endpoint. Static on Cloudflare Pages. See `/privacy`.

## Status
Phase 0 ✅ - Foundation live, 27 pages built, deployed to Cloudflare Pages. Next: Phase 1 PDF tools full logic.
