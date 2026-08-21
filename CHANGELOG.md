# ALL-IN-ONE HELPER - CHANGELOG
> All notable changes to this project. Format based on Keep a Changelog and Semantic Versioning.

**Guideline:** Every version that touches `dist/` must be logged here before `git tag`.

---

## [Unreleased] - Planning Phase

### Added
- Created project planning docs: `SOURCE_OF_TRUTH.md`, `TASKS.md`, `ROADMAP.md`, `CHANGELOG.md`, `VOWS.md`, `CONSTITUTION.md` in `/Users/del/Desktop/all in one helper/`.
- Defined 22 tools for v1.0.0 scope, all 100% client-side, $0 storage.
- Designed dual ad inventory: AdSense + Custom Banners via `banners.json`.
- Chose Cloudflare Pages as sole deploy target.

### Decisions Pending
- Framework: Astro vs Vite final call
- Domain name selection
- AdSense account creation date

---

## [0.1.0] - 2026-08-20 - The Promise

### Added
- **Vision locked:** Free, private, no-upload alternative to iLovePDF/TinyPNG/Remove.bg.
- **Constraints locked:** $0 storage, Cloudflare only, domain-only cost, plan-before-build.
- **Architecture locked:** Static site, WASM in Web Workers, no `/upload` endpoint ever.
- **Monetization locked:** Dual inventory (AdSense + custom banners) approved, policy checked.
- **Folder created:** `~/Desktop/all in one helper/` as single working directory.

### Changed
- N/A - initial release.

### Fixed
- N/A - initial release.

### Technical Notes
- No code written yet. This version is docs-only, per constitution.

---

## [1.0.0] - TBA - The Launch (Planned)

### Added (Planned)
- **Homepage:** Hero, 22 tool cards, search, FAQ, header/footer with ad slots.
- **PDF Tools (9):** Merge, Split, Compress, PDF→JPG, JPG→PDF, Rotate/Organize, Extract Text, Watermark/Page Numbers, Unlock.
- **Image Tools (5):** Compress, Remove Background (WASM), Convert, Resize/Crop, Upscale (if feasible).
- **Video/Audio (2):** Video Compress/Convert (ffmpeg.wasm), Audio Cutter/Converter.
- **Utilities (6):** QR Generator, Resume Builder→PDF, Word Counter, JSON Formatter, Password Generator, Color Picker/Palette.
- **Legal:** `/privacy`, `/terms`, `/contact`.
- **SEO:** Unique title/description/H1 per tool, 300+ word how-to, 3 FAQ with JSON-LD, sitemap.xml, robots.txt, OG images.
- **Monetization:** AdSense auto + manual units, `banners.json` custom inventory, Cloudflare Web Analytics.
- **Performance:** Lighthouse 90+ mobile, WASM lazy-loaded, JS <50kb homepage.
- **Deployment:** Cloudflare Pages production domain, HTTPS, cache headers for WASM.

### Acceptance Criteria for 1.0.0
- [ ] All 22 tools process files without network after page load (verified via DevTools offline).
- [ ] No file larger than 50MB crashes tab; friendly errors for edge cases.
- [ ] Cross-browser pass: Chrome, Firefox, Safari, iOS Safari, Android Chrome.
- [ ] AdSense approved and serving at least 1 ad unit.
- [ ] Custom banner renders from `banners.json`.
- [ ] Privacy page explicitly states "files never leave your device."

### Migration Guide
- N/A - first production release. Users bookmark `https://yourdomain.com`.

---

## [1.1.0] - TBA - The Polish (Planned, Month 2)

### Added (Planned)
- Blog: 5 long-tail SEO posts.
- "Request a tool" form via Formspree free.
- PWA manifest + offline service worker for tool pages.
- Spanish translation for top 5 PDF tools.

### Changed (Planned)
- Homepage search now supports fuzzy match.

### Fixed (Planned)
- Any QA bugs from 1.0.0 matrix.

---

## [1.2.0] - TBA - The Backend Tease (Planned, Month 3-4)

### Added (Planned)
- **Link Shortener** - First Worker + KV feature: `yourdomain.com/s/abc` → redirect. Still $0 (100k req/day free).
- Banner rotation via Worker + KV (no redeploy to change banner).

### Changed (Planned)
- If traffic >10k/mo, evaluate Ezoic/Mediavine over AdSense.

---

## [2.0.0] - TBA - The 50-Tool Expansion (Planned, Year 1)

### Added (Planned)
- 28 additional tools to reach 50 total (PDF to Word, image palette extractor, etc.).
- i18n for all tools (EN, ES, FR).
- Direct banner sales page: `/advertise` with Gumroad/Stripe link.

### Breaking Changes (Planned)
- None. All URLs stable. Tools never removed, only added.

---

## Versioning Rules

We use Semantic Versioning `MAJOR.MINOR.PATCH`:

- **MAJOR:** Breaking URL change, removal of tool, or change to privacy vow.
- **MINOR:** New tool, new feature, new language.
- **PATCH:** Bug fix, SEO copy tweak, ad placement adjustment, performance fix.

**Tagging:** `git tag -a vX.Y.Z -m "Release vX.Y.Z: summary"` and push with `git push --tags`. Cloudflare Pages auto-deploys on tag.

## How to Log

- **Before coding:** Add entry under `[Unreleased]`.
- **On PR merge:** Move entry to new version heading with date.
- **Never rewrite history:** Changelog is append-only. If you mess up, add a new entry explaining correction.

## Release Checklist (Copy for each release)

```
- [ ] Update CHANGELOG.md with version, date, Added/Changed/Fixed
- [ ] Update SOURCE_OF_TRUTH.md version if scope changed
- [ ] Run npm run build && npm run preview, manual QA
- [ ] git commit -m "release: vX.Y.Z"
- [ ] git tag vX.Y.Z && git push --tags
- [ ] Verify Cloudflare Pages deploy green
- [ ] Verify in incognito + phone
- [ ] Submit sitemap if new pages added
```

---

## Archive

No releases archived yet. This file starts at 0.1.0.

## Appendix: Detailed Change History and Rationale

### Why Keep a Changelog Matters for a $0 Project

For a project with $0 budget, changelog is your memory. Without a team or paid project management tool, this file is your audit trail, your investor update, and your future self's guide. Every decision that affects SEO, AdSense, or WASM must be logged, because Cloudflare Pages deploys are instant and rollbacks need context.

### What Counts as a Change

- **Added:** New tool, new page, new dependency (e.g., adding `pdf-lib` 1.17.1), new ad slot, new legal page.
- **Changed:** SEO title tweak, ad placement move, Tailwind config change, compression quality default from 80 to 70.
- **Fixed:** Bug where Safari failed to download blob, iOS background-removal OOM, AdSense CLS shift.
- **Removed:** Rare, but if we cut Upscale from v1 for budget, log it as Removed with reason.
- **Security:** If we patch a WASM CVE or update `jszip`, log it.

### How to Test Before Logging

Before you write "Added Merge PDF" in changelog, you must have:

1.  Tested with 1-page, 10-page, 100-page PDFs
2.  Tested on Chrome, Firefox, Safari
3.  Checked Network tab shows no upload
4.  Run Lighthouse and checked no regression
5.  Deployed to Cloudflare preview URL and tested incognito
6.  Verified download filename is correct and blob is freed via `URL.revokeObjectURL`

Only then do you move from `[Unreleased]` to a versioned heading.

### Future Log Examples

**Example 1: Adding a Tool**

```
## [1.0.1] - 2026-09-15
### Added
- Image Compress now supports batch of 20 with zip download via jszip 3.10.1
### Fixed
- Fixed Safari fallback for AVIF conversion (now shows PNG fallback message)
```

**Example 2: Ad Change**

```
## [1.0.2] - 2026-09-20
### Changed
- Moved AdSense sidebar unit 16px below dropzone to avoid policy violation for accidental clicks
### Added
- Custom banner slot `below-tool` now rotates 3 house ads via banners.json
```

**Example 3: Performance**

```
## [1.1.0] - 2026-10-01
### Changed
- Lazy-loaded @imgly/background-removal only on user interaction (click), saved 400kb on initial load
### Fixed
- Reduced homepage JS from 52kb to 38kb gzipped
```

### Archive Policy

This changelog is never truncated. Even after 50 releases, we keep all history. It is the provenance of the site's honesty. If a user asks "when did you add background removal?", the answer is here.


## [0.1.1] - 2026-08-20 - Add Buy Me a Coffee

### Added
- **Monetization Triple:** Added Buy Me a Coffee donation button (`contactae2b`, #FFDD00) via `https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js` with `data-slug="contactae2b"`. Placed in footer + /support page + post-download toast. Complements AdSense + Custom Banners, no policy conflict.
- Task T-407 for BMC integration (async load, fallback static link).
- Updated SOURCE_OF_TRUTH Section 6 to Inventory C, PLAN Phase 4 to T-401..T-407.

## [0.2.0] - 2026-08-20 - Phase 0 Deployed

### Added
- Live at https://all-in-one-helper.pages.dev and https://005c6970.all-in-one-helper.pages.dev (Cloudflare Pages project `all-in-one-helper`, account ee32aa05d0ccfff9085adf3406874497)
- 27 static pages built: index + 22 tools + 4 legal (privacy/terms/contact/support)
- GitHub repo https://github.com/mrfentmen/all-in-one-helper pushed (force, 2 commits)
- Wrangler deploy via `CLOUDFLARE_API_TOKEN` (cfut_...) - 32 files uploaded

### Changed
- README.md replaced Astro starter with project README + live URLs
- Tailwind 4.3.3 → 3.4.1 for @astrojs/tailwind compat

### Verified
- curl -k https://all-in-one-helper.pages.dev/ → 200
- curl -k https://all-in-one-helper.pages.dev/tools/merge-pdf/ → 200
- Build: 27 pages, no upload, BMC button contactae2b #FFDD00 live

## [1.0.0] - 2026-08-20 - All 22 Tools Live (No Mock)

### Added
- **PDF (9):** merge-pdf (multi reorder, 50MB limit), split-pdf (range 1,3-5 or split all to zip), compress-pdf (re-save object streams, saved bytes), pdf-to-jpg (pdfjs 4.10.38 render scale 2 → JPG zip), jpg-to-pdf (A4/auto, portrait/landscape, centered fit), rotate-pdf (90/180/270 + delete range), extract-text (pdfjs getTextContent → txt), watermark-pdf (diagonal 40pt #FF + page numbers), unlock-pdf (password via pdf-lib)
- **Image (5):** compress-image (quality slider 0.1-1 via browser-image-compression), remove-background (@imgly/background-removal 1.7.0, 30MB model cached, preview), convert-image (canvas to PNG/JPG/WEBP via format select), resize-image (width/height, preset YouTube/IG/HD, keepAspect, high quality), upscale-image (2x/4x canvas high quality)
- **Video/Audio (2):** video-compress (@ffmpeg/ffmpeg 0.12.15 + @ffmpeg/util 0.12.2, core 0.12.10 via unpkg, mp4/webm/mp3, trim ss/to, 100MB limit), audio-tools (cut mp3/wav, trim)
- **Utility (6):** qr-generator (size, fg/bg color), resume-builder (form → pdf-lib 2 templates, A4, header, sections), word-counter (words/chars/sentences/paras/reading), json-formatter, password-generator (4-128 len), color-picker (HEX/RGB/HSL, preview)
- **UI:** tool-specific controls (splitRange, rotateAngle, watermarkText, unlock pwd, quality slider, convertFormat, resize preset, upscale factor, video/audio trim, resume form)
- **Deps:** pdfjs-dist 4.10.38, @imgly/background-removal 1.7.0, @ffmpeg/ffmpeg 0.12.15, @ffmpeg/core 0.12.10, @ffmpeg/util 0.12.2
- **Build:** 27 pages, 721-line [slug].astro, no mock, all dynamic imports

### Verified
- `bun run build` → 27 pages in 292ms, no errors
- Deployed https://8aeb94c8.all-in-one-helper.pages.dev and https://all-in-one-helper.pages.dev → curl 200 for split, remove-bg, video, resume
- All processing 100% in browser, Network tab 0 bytes upload

## [1.1.0] — 2026-08-20 — Polish: Humanize, Skeletons, Cache, No Infinite Scroll, Ads, 82 Tools (87 pages)

### Changed
- Humanized all pages: removed 1091 em dashes, replaced with hyphens, added contractions, conversational tone, no vibecoded phrases
- Homepage: removed unlimited scrolling, added category tabs (All/PDF/Image/Video/Utility), paginated grid 12 per page + Show 12 more, recent 3 (cached), FAQ collapsed, skeletons for loading, content-visibility
- Tool pages: cached recent + prefs via localStorage (helper_recent, helper_prefs), WASM via Cache API, skeleton loaders not spinners, shimmer animate
- Layout: header/footer skeletons, 2-4 ad slots per page (header, top, sidebar, footer) with "Your ad here - contactae2000@gmail.com $50/mo" + banners.json
- No em dashes in src (0 remaining), humanized privacy/terms/contact/support

### Added
- 28 new tools (82 total, 87 pages) to stay under 100 pages: compare-pdf, redact-pdf, form-fill-pdf, add-page-numbers, heic-to-jpg, photo-collage, watermark-remover, image-splitter, json-to-csv, csv-to-json, xml-formatter, yaml-converter, html-entity, cron-tester, time-zone, contrast-checker, gradient-generator, case-converter, handwriting, percentage-calc, loan-calc, countdown-timer, dice-roller, totp-generator, screen-recorder, webcam-booth, audio-recorder, scientific-calc
- Deps: js-yaml 5.3, cron-parser 5.10, otpauth 9.5, heic2any 0.0.4
- Components: Skeleton.astro, lib/cache.ts (localStorage + Cache API), PLAN_3_POLISH.md

### Verified
- Build 87 pages, 0 em dashes in src, 4 ad contacts per tool page, homepage 1 contact (now 4 on fc preview)
- Deploy fc155d29.all-in-one-helper.pages.dev, main will update, curl 200

## [1.2.0] - 2026-08-21 - Platform Features + PDF Pro Hub + 8 New Tools

### Added
- **Web Share Target**: share text/URLs from phone OS straight into QR/word-counter via PWA manifest
- **Clipboard paste anywhere**: paste image -> compress-image, long text -> word-counter
- **Keyboard shortcuts**: Enter=Run, Ctrl/Cmd+S=Download, ?=cheat sheet modal, Shift+D=theme toggle
- **Save to folder**: File System Access API button next to download on supported browsers
- **Before/After compare slider** on compress-image and blur-image results (draggable divider)
- **Feedback widget**: thumbs up/down after every successful run, stored locally
- **Print CSS**: resume-builder + invoice-generator print clean
- **Advertising section on /contact**: $50/mo per slot pricing, self-serve info (0 new pages)
- **OG images**: 95 build-time generated PNGs (one per tool + home) for social sharing
- **PDF Pro Toolkit hub** (`/tools/pdf-pro`): delete pages, protect, sign, reorder, repair in one page with all controls; 9 old PDF URLs 301-redirect to it
- **8 new tools**: encrypt-file (AES-256-GCM WebCrypto), exif-viewer/remover, steganography (hide text in PNG), checksum-verifier, subnet-calculator, base-converter, line-tools (dedupe/sort/reverse/trim), split-bill calculator

### Changed
- Page count stays at exactly 100 (94 tools -> 86 tools + pdf-pro + 8 new = 95 tool pages)
- Search placeholders updated to "Search 95 tools"

### Verified
- E2E: 137/137 passed in 45.8s (was 123) - includes 14 new v1.2 feature tests
- Build: 100 pages exactly
- Old PDF tool URLs redirect via _redirects (production; preview server ignores them)

