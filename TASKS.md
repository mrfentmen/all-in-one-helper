# ALL-IN-ONE HELPER — TASKS & BACKLOG
> Granular, actionable work. No task is marked done until it is deployed to Cloudflare and verified in an incognito window.

**Source of Truth:** `SOURCE_OF_TRUTH.md`
**Estimation Unit:** T-Shirt (XS, S, M, L, XL) — 1 XS = ~1 hour
**Priority:** P0 = Must for launch, P1 = Should, P2 = Nice

---

## PHASE 0: FOUNDATION (Week 1) — P0

### 0.1 Project Scaffolding
- [ ] **T-001 (S):** Initialize Astro (or Vite) project in `/` with `npm create astro@latest -- --template minimal --no-git --yes`. Enable static output. Verify `npm run build` produces `dist/`.
- [ ] **T-002 (S):** Configure Tailwind CSS. Install `tailwindcss`, `autoprefixer`, create `tailwind.config.mjs`, add base styles. Verify hot reload.
- [ ] **T-003 (XS):** Set up project structure: `/src/pages/tools/[tool].astro`, `/src/components/ToolLayout.astro`, `/src/lib/`, `/public/banners.json`, `/public/favicon.svg`.
- [ ] **T-004 (XS):** Create `ToolLayout.astro` — header with logo/search, main slot for tool, footer, Ad slots placeholders (`<div data-ad-slot="top">`), SEO meta props.
- [ ] **T-005 (S):** Build homepage `index.astro` — hero ("Free Tools, No Uploads, No Paywalls"), grid of 22 tool cards with icons, search filter (client-side), FAQ section.
- [ ] **T-006 (XS):** Add global CSS, dark/light toggle via `localStorage`, accessible focus states.

**Acceptance:** `npm run dev` shows homepage with 22 cards, layout works mobile/desktop, no console errors.

### 0.2 Core Plumbing
- [ ] **T-007 (S):** Implement `src/lib/file-utils.ts` — `downloadBlob(blob, filename)`, `readFileAsArrayBuffer(file)`, `formatBytes(bytes)`, `limitFileSize(file, maxMB)`.
- [ ] **T-008 (S):** Build reusable `FileDropzone.astro/Component` — drag & drop, click to browse, file list, remove, max file count/size, accessible keyboard.
- [ ] **T-009 (M):** Build `WorkerManager` — helper to lazy-load WASM only when needed, show loading progress, run in Web Worker to avoid blocking UI, fallback message if WASM unsupported.
- [ ] **T-010 (XS):** Create `banners.json` schema: `{ slots: { header: { type: "adsense"|"custom", html: "..." }, sidebar: {...}, belowTool: {...} } }` and component that renders it.
- [ ] **T-011 (S):** SEO boilerplate — generate `sitemap.xml` at build, `robots.txt`, per-page `title`, `description`, `og:image`, JSON-LD `SoftwareApplication` schema.

### 0.3 Deployment Pipeline
- [ ] **T-012 (S):** Connect GitHub repo to Cloudflare Pages. Set build command `npm run build`, output `dist`. Deploy on push to `main`. Test custom domain.
- [ ] **T-013 (XS):** Add `_headers` and `_redirects` for caching WASM assets (`Cache-Control: public, max-age=31536000, immutable`).
- [ ] **T-014 (XS):** Set up Cloudflare Web Analytics (free, no cookie).

---

## PHASE 1: PDF TOOLS (Week 2-3) — P0

Each PDF tool follows identical checklist: UI → `pdf-lib` logic in Worker → preview → download → SEO content → test → deploy.

- [ ] **T-101 (M): Merge PDF** — Multi-file input, reorder via drag, merge via `PDFDocument.create()` + `copyPages`, download. Handles 50+ MB.
- [ ] **T-102 (M): Split PDF** — Range input (e.g., `1,3-5`), extract pages, download as single or zip. Use `PDFDocument.load` + `copyPages`.
- [ ] **T-103 (M): Compress PDF** — Downsample embedded images, re-embed. Show before/after size.
- [ ] **T-104 (M): PDF to JPG** — Render via `pdf.js` to canvas, export JPG per page or zip.
- [ ] **T-105 (M): JPG to PDF** — Images → PDF, options: page size, orientation, margin.
- [ ] **T-106 (S): Rotate/Organize** — Grid of page thumbnails, rotate 90°, delete, reorder, save new PDF.
- [ ] **T-107 (M): Extract Text** — `pdf.js` `getTextContent()`, display, copy, download .txt.
- [ ] **T-108 (S): Watermark/Page Numbers** — Add text overlay to each page, position, opacity, font size.
- [ ] **T-109 (S): Unlock PDF** — Prompt for password, `PDFDocument.load(bytes, { password })`, save without password. Show error if wrong.

**Shared Acceptance:** No file larger than 50MB crashes tab; progress bar for >5MB; works offline after first load; each page has 300+ word how-to + FAQ for SEO.

---

## PHASE 2: IMAGE TOOLS (Week 4) — P0

- [ ] **T-201 (M): Compress Image** — Quality slider 10-100, format selector, before/after preview, batch. Use `browser-image-compression` + Canvas `toBlob`.
- [ ] **T-202 (L): Remove Background** — Integrate `@imgly/background-removal`. Lazy-load 30MB model with progress. Show original vs cutout, download PNG. Handle 1 image at a time.
- [ ] **T-203 (S): Convert Image** — WEBP/PNG/JPG/AVIF via `canvas.toBlob(type)`. Batch convert, zip download via `jszip`.
- [ ] **T-204 (S): Resize/Crop** — Inputs for W/H, aspect lock, preset sizes (YouTube thumb, Instagram), canvas crop with drag handle.
- [ ] **T-205 (M): Upscale Image (Stretch P1)** — `upscalerjs` 2x. Load model on demand.

---

## PHASE 3: VIDEO/AUDIO + UTILITIES (Week 5) — P0/P1

- [ ] **T-301 (L): Video Compress/Convert** — `ffmpeg.wasm` only loaded here. Convert MP4↔WEBM, compress preset, trim by seconds. MUST be in Worker. Show warning for >100MB.
- [ ] **T-302 (M): Audio Cutter** — MP3 cutter, visualize waveform via `wavesurfer.js` (optional), convert MP3↔WAV via `ffmpeg.wasm`.
- [ ] **T-303 (S): QR Generator** — `qrcode` lib, options: text/URL, size, color, logo overlay, download PNG/SVG.
- [ ] **T-304 (M): Resume Builder** — Form sections (experience, education), 2 templates, live preview, export PDF via `pdf-lib`. Save to `localStorage`.
- [ ] **T-305 (XS): Word Counter** — Real-time count words/chars/sentences/reading time.
- [ ] **T-306 (XS): JSON Formatter** — Prettify/minify/validate with error line highlight.
- [ ] **T-307 (XS): Password Generator** — Length, uppercase/numbers/symbols, strength meter, copy.
- [ ] **T-308 (XS): Color Picker** — `<input type="color">`, HEX/RGB/HSL, palette generation.

---

## PHASE 4: MONETIZATION & SEO (Week 6) — P0

### 4.1 Ad Integration
- [ ] **T-401 (S): AdSense Integration** — Create AdSense account, insert `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">`, place `ins.adsbygoogle` units in `ToolLayout` slots, verify no CLS. Must not load in dev.
- [ ] **T-402 (S): Custom Banner System** — Render `banners.json` slots. Add `?nobanners` kill switch for testing. Style custom banners distinct from AdSense.
- [ ] **T-403 (XS): Ad Policy Check** — Ensure no ads on 404, no sticky ads covering tool, all ads labeled.
- [ ] **T-407 (XS): Buy Me a Coffee Integration** — Add BMC script `https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js` with `data-slug="contactae2b"` to `ToolLayout` footer + `/support` page. Style #FFDD00, fallback static link if blocked. Load async/defer, verify not blocking WASM.

### 4.2 SEO Content
- [ ] **T-404 (L): Per-Tool SEO Pages** — Each of 22 tools gets: unique `<title>` ("Free Merge PDF - No Upload, 100% Private"), `<meta description>`, H1, 300-word how-to, 3 FAQ with JSON-LD `FAQPage`, 2 internal links.
- [ ] **T-405 (S): Blog (Optional P1)** — 3 launch posts: "Why we don't upload your files", "How browser PDF merging works", "TinyPNG vs client-side compression".
- [ ] **T-406 (S): Performance Polish** — Lazy-load WASM, code-split per tool, preload only homepage JS, Lighthouse audit 90+.

---

## PHASE 5: QA, LEGAL, LAUNCH (Week 7) — P0

- [ ] **T-501 (M): Cross-Browser QA** — Test each tool on Chrome, Firefox, Safari (desktop + iOS Safari + Android Chrome). Record bugs in `TASKS.md` checklist.
- [ ] **T-502 (S): Error Handling** — For each tool: empty input, huge file, corrupt file, WASM load fail, offline — all show friendly message, never white-screen.
- [ ] **T-503 (S): Legal Pages** — `/privacy` (we collect nothing, files never leave device), `/terms`, `/contact`. Required for AdSense.
- [ ] **T-504 (S): Favicon, OG Image, Manifest** — PWA manifest, `og:image` for social sharing.
- [ ] **T-505 (XS): Final Deployment** — Tag `v1.0.0`, deploy to production domain, purge Cloudflare cache, verify in incognito.
- [ ] **T-506 (XS): Submit to Search Console** — Submit sitemap, request indexing for homepage + 5 top tools.

---

## BACKLOG (P2) — POST-LAUNCH

- [ ] P2: Link Shortener via Cloudflare Worker + KV (needs backend)
- [ ] P2: Image palette extractor
- [ ] P2: PDF to Word (docx via `docx` lib)
- [ ] P2: Unit tests with Vitest + Playwright e2e
- [ ] P2: i18n (Spanish, French)

---

## TASK RULES

1.  One task at a time. Mark `[x]` only when verified on Cloudflare preview.
2.  No task may introduce server storage. If it does, it is rejected.
3.  Every tool task must include a 5-minute manual test script in its PR description.
4.  WASM tasks must be behind dynamic `import()` — homepage never loads WASM.

**Total Estimate:** ~7 weeks solo, ~3 weeks with AI assistance, if scope is frozen at 22 tools.
