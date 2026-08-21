# PLAN 3: POLISH - Stay Under 100 Pages, De-Vibe, Cache + Skeletons

**Current:** 54 tools + 5 pages = 59 pages
**Max:** 100 pages (Cloudflare free + SEO crawl budget)
**Target:** 90 tools + 5 pages = 95 pages (5 buffer for future legal/blog)
**New tools to add:** 36 (not 46) to stay under 100

**Vibe-coded fixes:**
- Remove unlimited scrolling (homepage currently 54 cards = long scroll = vibecoded)
- Cache user data (no reload spinners on return)
- Skeletons not spinners (shimmer, not spin)

---

## 1. PAGE BUDGET - Stay ≤100

- Current 59 → Add 36 → 95 pages (safe)
- If we added 46 → 105 pages >100 → REJECTED
- 36 picks (highest traffic + easiest, all client-side, no extra WASM):
  **PDF (4):** Compare PDFs, Redact, Form Fill, Compress already → add Compare, Redact, Form Fill, Page Numbers (was watermark but split)
  **Image (4):** HEIC→JPG, Photo Collage, Watermark Remover (inpaint), Image Splitter
  **Dev (12):** JSON→CSV, CSV→JSON, XML Formatter, YAML, HTML Entity, Cron Tester, Time Zone, Color Contrast WCAG, Gradient/Shadow Gen, Scientific Calc, JSON→CSV already
  **Daily (10):** Case Converter, Text→Handwriting, Percentage Calc, Loan Calc, Countdown/Stopwatch, Habit Tracker (localStorage), Dice/Coin, Random Number, Stopwatch already
  **Security/Audio (6):** TOTP 2FA, Screen Recorder, Webcam Booth, User Agent Parser, IP Info (via ipify, cached), Audio Recorder

All 36 are pure JS or Canvas/MediaRecorder (no server), <1h each.

**If still over 100:** Consolidate PDF hub: /tools/pdf-hub with tabs (merge/split/delete etc) counts as 1 page not 9, but defer - current 95 is safe.

---

## 2. REMOVE UNLIMITED SCROLLING - Homepage Redesign

**Problem:** Homepage shows 54 cards in 4 groups = long scroll, vibecoded, no hierarchy, bad LCP.

**Fix: Category Tabs + Paginated Grid + Search**

- Header: sticky category tabs (All | PDF 15 | Image 12 | Video 9 | Utility 54) with counts, active underline, keyboard nav
- Grid: show 12 cards per tab (not all 54), with "Show 12 more" button (not infinite scroll). No auto-load on scroll.
- Search: filters within active tab, debounced 150ms, shows "X results" + skeleton while filtering
- Recent: top row "Continue where you left off" 3 recent tools from localStorage (if any), else hidden - not taking scroll
- FAQ/Why section collapsed by default (disclosure), reduces scroll
- Footer not infinite: pagination dots or "View all" link to /tools (full list paginated 20/page)
- CSS: `content-visibility: auto` for off-screen cards, `contain` for perf

**Files:** `src/pages/index.astro` (rewrite), `src/components/ToolCard.astro` + `src/components/CategoryTabs.astro` + `src/components/Pagination.astro`

---

## 3. CACHE USER DATA - No Reload

**Goal:** Returning user sees instant load, no spinner, recent tools, prefs.

**Cache Layers:**

- **Prefs:** `localStorage:helper_prefs` = {theme, lastCategory, lastTool, collapsedFAQ}
- **Recent:** `localStorage:helper_recent` = array of 5 last visited tool slugs (push on tool page load), show on homepage
- **Tool Settings:** `localStorage:helper_settings:{slug}` = {quality, format, delay etc} - restore on tool page load
- **WASM:** Cache API for `ffmpeg-core.wasm`, `tesseract-core.wasm`, `background-removal` model via `_headers` already immutable + `CacheStorage` check before fetch
- **File Metadata (not content):** `IndexedDB:helper_files` via `idb-keyval` (add dep `idb-keyval@6`) - store {name,size,type,lastUsed} for 3 recent files to show "Drop again?" - never store file content (privacy)
- **Build Cache:** `localStorage:helper_build` = {version, buildTime} to show "Updated X ago" not spinner

**Lib:** `src/lib/cache.ts` - tiny wrapper around localStorage + idbKeyval, with TTL and versioning. All reads sync or with skeleton while async.

**Privacy:** All cached is on device, never sent, clear via /privacy "Clear data" button.

---

## 4. SKELETONS NOT SPINNERS - De-Vibe

**Problem:** Current has "Processing..." text + disabled button = vibecoded, no shimmer.

**Fix: Skeleton Loaders**

- Create `src/components/Skeleton.astro` - shimmer `bg-slate-200 animate-pulse` with `aria-busy`
- Replace:
  - Homepage card loading: 12 skeleton cards (rect + lines) while JS hydrates (not spinner)
  - Tool page: dropzone loading → skeleton 2 lines, fileList → skeleton, preview → skeleton
  - Utility output: skeleton lines while processing (not "Processing 100%...")
  - Ad slots: skeleton shimmer until AdSense loads (not "Ad - Top")
- Button: while disabled, show skeleton text + `aria-busy`, not spinner
- Status: use skeleton + text, not just text

**CSS:** Add `@keyframes shimmer` to Tailwind, `animate-shimmer` class, `bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200`

**Files:** `src/components/Skeleton.astro`, update `src/layouts/Layout.astro` (ad slots), `src/pages/index.astro` (grid), `src/pages/tools/[slug].astro` (dropzone, preview)

---

## 5. EXECUTION ORDER

1. **Cache lib + Skeleton component** (1h) - no page count change
2. **Homepage redesign** (remove unlimited scroll) (2h) - no new pages yet
3. **Add 36 tools** (Day 1-3) - 54→90 tools = 95 pages (under 100)
4. **Replace spinners** (1h) - audit all `setStatus('Processing')` → skeleton
5. **Build + Deploy** - verify 95 pages, Lighthouse 90+, no infinite scroll, cached return <100ms

---

## 6. SUCCESS CRITERIA

- [ ] Total pages ≤100 (95) - `bun run build` shows 95 pages
- [ ] Homepage: no infinite scroll, 12 per tab, category tabs keyboard nav, search debounced, recent 3, FAQ collapsed
- [ ] Caching: return visit shows recent + prefs without spinner, WASM cached (2nd load instant), Clear data works
- [ ] Skeletons: no "Loading..." spinner, all loading shows shimmer, `aria-busy`, no layout shift
- [ ] All 90 tools 100% client-side, Network tab 0 upload, deployed + pushed

