# ALL-IN-ONE HELPER - ROADMAP
> 7-week plan from zero to AdSense-approved, 22-tool site on Cloudflare Pages. No building until this is approved.

---

## TIMELINE OVERVIEW

| Week | Phase | Goal | Deliverable |
|------|-------|------|-------------|
| 1 | **0: Foundation** | Skeleton that can be deployed | Homepage + ToolLayout + Dropzone + Cloudflare live |
| 2-3 | **1: PDF Tools** | 9 PDF tools, the SEO engine | 9 pages, each ranking for "free pdf X" |
| 4 | **2: Image Tools** | 5 image tools, the viral layer | Compress + Remove BG live |
| 5 | **3: Video/Audio + Utils** | 8 remaining tools, breadth | 22/22 tools complete |
| 6 | **4: Monetization & SEO** | Ads + content, ready for review | AdSense applied, SEO pages complete |
| 7 | **5: QA & Launch** | Polish + legal + ship | v1.0.0 on custom domain |
| 8+ | **Growth** | Scale traffic, add backlog | 10k views/mo target |

---

## WEEK 1: FOUNDATION - "The Skeleton Must Breathe"

**Objective:** A deployable static site that proves the $0 architecture works.

**Day 1-2: Scaffolding**
- Choose framework: **Astro** (recommended for content-heavy tool pages, perfect static SEO, minimal JS) or **Vite + Svelte** (lighter if you prefer SPA). Decision must be made Day 1 and not revisited.
- Implement `ToolLayout` - the single layout every tool reuses. It contains: header, ad slots (empty divs with `data-ad-slot`), main content area, footer, and SEO props. This ensures consistency.
- Build `FileDropzone` - the most reused component. Must handle drag, click, file list, and accessibility. Test with 10 files at once.

**Day 3-4: Homework Plumbing**
- Build `file-utils` and `WorkerManager`. The WorkerManager is critical: it is the only file that knows about WASM. All tools ask it for a worker, not directly for `ffmpeg.wasm`.
- Create `banners.json` and its renderer. Test by swapping JSON without redeploy (future Worker will enable this).
- Add SEO boilerplate - sitemap generation at build time via `@astrojs/sitemap`.

**Day 5-7: First Deploy**
- Connect GitHub → Cloudflare Pages. Push, watch build logs, fix any `top-level await` or `fs` errors (static sites cannot use Node `fs` at runtime).
- Verify: site loads on `allinonehelper.pages.dev` and on your custom domain (after DNS). Test from phone on 4G.
- Enable Cloudflare Web Analytics. This is free and cookie-free, important for privacy vow.

**Exit Criteria:** Someone who visits your URL sees a homepage with 22 tool cards (even if clicking shows "Coming Soon"). Lighthouse score 95+ because it's just static HTML.

**Risks & Mitigations:**
- Risk: Choosing Next.js and accidentally adding server code. Mitigation: Use `output: 'static'` and ban `src/pages/api`.
- Risk: WASM CORS errors on Cloudflare. Mitigation: Set correct `Cross-Origin-Embedder-Policy` headers in `_headers`.

---

## WEEK 2-3: PDF TOOLS - "The Money Phase"

**Why PDFs First:** Search volume for "merge pdf" (135k/mo), "split pdf" (33k/mo), "compress pdf" (27k/mo) is massive and CPC is high. These 9 pages will drive 70% of ad revenue.

**Week 2: Merge, Split, Compress, PDF↔JPG**
These four are technically similar (all use `pdf-lib` or `pdf.js`), so building them together shares code.
- Start with **Merge** - it is the simplest mental model and tests the whole pipeline.
- **Compress** is the hardest (image downsampling inside PDF). Budget 2 days for it.
- Each tool gets its own route: `/tools/merge-pdf`, `/tools/compress-pdf`, etc. Each is a static `.astro` file that hydrates a JS island only when visited.

**Week 3: Rotate, Extract Text, Watermark, Unlock**
- **Rotate/Organize** needs thumbnail previews - use `pdf.js` to render each page to a small canvas.
- **Extract Text** is pure `pdf.js` - show progress per page.
- **Unlock** is sensitive: must not bypass DRM illegally. Only handle user-provided passwords to remove open password. Add disclaimer.

**Content Requirement (Non-Negotiable):** Each tool page must have 300+ words of unique, human-written how-to ("How to merge PDFs without uploading") plus 3 FAQs with JSON-LD. This is what makes AdSense approve you and Google rank you. AI-generated thin content will be rejected.

**Exit Criteria:** 9 URLs live, each tool actually merges/splits a 20-page PDF in-browser without upload, each has SEO content.

---

## WEEK 4: IMAGE TOOLS - "The Viral Phase"

**Why Second:** Image tools are highly shareable ("remove bg for free") and drive social traffic.

**Days 1-2: Compress & Convert**
- **Compress** is the TinyPNG killer. Must show quality slider with live preview and before/after size. Batch up to 20 images.
- **Convert** is trivial Canvas work but must support AVIF (check Safari support and fallback).

**Days 3-5: Remove Background**
- This is the flagship. `@imgly/background-removal` requires downloading a ~30MB ONNX model. Must cache in IndexedDB or Cache API, show download progress, and work offline thereafter.
- Test on iPhone - WASM memory limits are tighter. If model fails on 1GB RAM devices, show graceful fallback: "Try desktop for best results, or compress image first."

**Days 6-7: Resize/Crop + Upscale**
- **Resize** needs preset buttons (Instagram, YouTube thumbnail) for shareability.
- **Upscale** is P1 - if WASM is too heavy, cut it and ship 4 image tools. Do not let perfect block launch.

**Exit Criteria:** User can drag 10 JPGs, compress them 70%, and download zip - all without network after page load.

---

## WEEK 5: VIDEO/AUDIO + UTILITIES - "The Breadth Phase"

**The Heavy Lift: Video (2 days)**
- `ffmpeg.wasm` is 31MB. It MUST be lazy-loaded only when user visits `/tools/video-compress` and MUST run in a Web Worker or the tab will freeze.
- Show explicit warning: "Video processing happens on your device. Large files may take a minute and use battery."
- Limit input to 100MB to avoid OOM crashes. Provide clear error: "File too large for browser. Try compressing first."

**The Easy Wins: Utilities (3 days)**
- These 6 tools are pure JS and can be built in parallel. They are high-frequency daily use: QR, word counter, etc.
- **Resume Builder** is the most complex - needs form + template + `pdf-lib` export. Keep templates simple (2 designs) but make export pristine.
- All utilities must work offline after first load (service worker optional, but at least no network needed).

**Exit Criteria:** 22/22 tool cards on homepage are clickable and functional. Site feels "complete".

---

## WEEK 6: MONETIZATION & SEO - "The Business Phase"

**Day 1-2: Ads**
- Apply for AdSense only after 22 tool pages + homepage + privacy/terms are live (Google checks for thin content).
- While waiting (24-48h approval), fill custom banner slots with house ads: "All tools are free & private - bookmark us!" and affiliate banners (e.g., Namecheap domain affiliate).
- Implement `banners.json` renderer so you can later sell a sidebar banner to a local business by editing one JSON, no code deploy.

**Day 3-5: SEO Hardening**
- Audit every tool page with `npm run build && npm run preview` + Lighthouse + manual `view-source:` check for title/description.
- Add internal linking: each PDF tool links to 2 other PDF tools ("Also try: Split PDF").
- Create 3 blog posts (optional but helps AdSense): each 500 words, original.
- Generate OG images for each tool (Canvas-generated, not Figma) for Twitter sharing.

**Day 6-7: Performance**
- Run `npm run build -- --analyze` - ensure homepage JS < 50kb, each tool JS < 200kb, WASM not on homepage.
- Add `loading="lazy"` to all images, `rel="preload"` for critical fonts only.

**Exit Criteria:** PageSpeed Insights 90+ on mobile, AdSense code serving (or pending), no ad policy violations.

---

## WEEK 7: QA, LEGAL, LAUNCH - "The Polish Phase"

**QA Matrix:**
- Test each tool with: empty input, 1 file, 10 files, 50MB file, corrupt file, offline.
- Test on: Chrome (Win/Mac), Firefox, Safari (Mac + iOS), Chrome Android.
- Create 22-row QA sheet in `TASKS.md`, check each cell.

**Legal (Required for AdSense):**
- `/privacy` - State: "We do not store files, we do not track you, files never leave your device, we use Cloudflare Web Analytics (no cookies) and AdSense (which may use cookies per their policy)."
- `/terms` - Standard disclaimer: tools provided as-is, not liable for data loss, user must own files.
- `/contact` - Simple email or form (even `mailto:` is fine for v1).

**Launch:**
- Tag `v1.0.0` in git, push, Cloudflare deploys to production domain.
- Purge cache, test incognito, test from friend's phone.
- Submit sitemap to Google Search Console + Bing Webmaster Tools.
- Post to 3 places: Reddit r/SideProject, Product Hunt (free tier), Twitter/X.

---

## POST-LAUNCH ROADMAP (Month 2-12)

**Month 2: The 0 → 1k Users Grind**
- Add 5 blog posts targeting long-tail: "how to merge pdf on iphone without app"
- Answer Quora/Reddit questions with genuine help + link.
- Add "Request a tool" form (via Formspree free or Google Form, no backend).

**Month 3-4: The 1k → 10k Scale**
- If traffic > 10k/mo, apply to Mediavine or Ezoic (higher RPM than AdSense).
- Add link shortener via Worker + KV (first backend feature, still $0).
- Translate top 5 tools to Spanish (huge search volume).

**Month 6: The 10k+ Sustain**
- Sell direct banner: "$50/month sidebar on all PDF tools" via Gumroad or simple Stripe link.
- Consider donating 1% to `pdf-lib` and `ffmpeg.wasm` open source - good karma and badge.

**Year 1 Vision:**
- 50 tools, 50k pageviews/mo, ~$600/mo revenue (at $12 RPM), still $0 infra cost.
- The constitution (see `CONSTITUTION.md`) ensures we never add paywalls, never require login, never upload files.

---

## MILESTONE GANTT (Text)

```
W1 ████ Foundation
W2 ██████ PDF Batch 1 (Merge/Split/Compress/PDF↔JPG)
W3 ██████ PDF Batch 2 (Rotate/Text/Watermark/Unlock)
W4 ██████ Images (Compress/BG Remove/Convert/Resize)
W5 ██████ Video/Audio + 6 Utilities
W6 ████ Ads + SEO
W7 ██ QA + Legal + Launch
M2-12 ░░░░ Growth
```

**Critical Path:** PDF Compress → Background Removal → Video → AdSense Approval. If any slips, cut Upscale (P1) first.

---

## DEPENDENCIES

- WASM tools (BG Remove, Video) depend on `WorkerManager` from Week 1.
- AdSense depends on 15+ content pages + legal pages.
- SEO depends on all tool pages having unique content.
- Launch depends on QA matrix 100% green.

**No build starts until this roadmap is approved and `SOURCE_OF_TRUTH.md` is signed off.**
