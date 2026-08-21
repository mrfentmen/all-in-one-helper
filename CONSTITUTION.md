# ALL-IN-ONE HELPER — CONSTITUTION
> The governing law of the project. Amendments require a changelog entry and a new version tag. This document outranks all others except SOURCE_OF_TRUTH.

**Ratified:** 2026-08-20
**Version:** 1.0
**Status:** In Effect

---

## ARTICLE I: PURPOSE AND SOVEREIGNTY

1.1 **Purpose:** All-in-One Helper exists to provide free, private, instant file utilities that run entirely in the user's browser, funded by non-deceptive advertising, at $0 infrastructure cost beyond a domain name.

1.2 **Sovereignty:** This Constitution, together with `SOURCE_OF_TRUTH.md` and `VOWS.md`, is the supreme law. Any feature, design, or task that conflicts with these is void.

1.3 **Amendment:** Amendments require (a) proposal in `CHANGELOG.md` under `[Unreleased]`, (b) 24-hour review, (c) commit with message `constitution: amend Article X`. No silent edits.

---

## ARTICLE II: THE $0 INFRASTRUCTURE CLAUSE

2.1 **No Storage Budget:** The project shall not incur recurring storage or compute costs for user files. User files shall never be written to disk, R2, S3, D1, KV, or any server.

2.2 **Allowed Free Tier:** Cloudflare Pages (static), Cloudflare Workers (free tier, 100k req/day), KV (for banner config or short links only, never for files), and `localStorage`/`IndexedDB` (client-side only) are permitted. Any service that costs >$0/month requires constitutional amendment.

2.3 **Build vs Runtime:** Build-time generation (sitemap, OG images) is allowed to use Node at build. Runtime must be 100% static and WASM-in-browser. No Node at runtime.

2.4 **Verification:** Any PR that adds a `fetch` POST with file bytes, or an `/upload` endpoint, shall be rejected. Review checklist must include "Network tab shows zero upload."

---

## ARTICLE III: PRIVACY AND DATA SOVEREIGNTY

3.1 **Data Minimization:** Collect no data that is not strictly needed for ads or analytics. Prefer aggregated, anonymized, cookie-free analytics (Cloudflare Web Analytics).

3.2 **No File Inspection:** No code shall read file contents for purposes other than performing the tool the user requested, and that reading shall happen in-browser.

3.3 **Transparency:** `/privacy` must be written in plain English, state what is collected (Web Analytics + AdSense if present), and be linked in the footer of every page.

3.4 **Right to Offline:** After first load, each tool should function offline. No tool shall require continuous network during processing.

---

## ARTICLE IV: ADVERTISING ETHICS

4.1 **Dual Inventory Permitted:** Both Google AdSense and custom banners are permitted and encouraged. They shall coexist with clear visual distinction.

4.2 **Ad Labeling:** All ads must be labeled. AdSense units are labeled by Google. Custom banners must have text "Sponsored", "Partner", or "House" above them, in 12px muted color.

4.3 **Prohibited Practices:** No ad shall mimic a "Download" button, cover the dropzone, auto-play sound, or be placed within 8px of a primary action button (to avoid misclicks). No more than 5 total ad units per tool page.

4.4 **Policy Compliance:** AdSense placement must comply with AdSense policies. Custom banners must not violate them by proximity or mimicry.

4.5 **User Respect:** Provide a `?noads` param for screenshots/testing that hides custom banners (AdSense still governed by Google). House ads shall be genuinely useful or cross-promotional, not deceptive.

---

## ARTICLE V: ARCHITECTURE AND CODE LAW

5.1 **Static First:** Framework shall be Astro or Vite (static export). No server-side rendering, no API routes for file handling.

5.2 **Component Reuse:** `ToolLayout.astro`, `FileDropzone`, `file-utils.ts`, `WorkerManager`, and `banners.json` renderer are sacred shared components. Duplicating their logic in a tool is prohibited.

5.3 **WASM Isolation:** All WASM (ffmpeg.wasm, background-removal) shall be lazy-loaded via dynamic `import()` and run in a Web Worker. Homepage shall never load WASM.

5.4 **JS Budget:** Homepage JS <50kb gzipped, each tool JS <200kb gzipped (excluding WASM). Performance is a feature.

5.5 **Accessibility:** All interactive elements must be keyboard operable, have visible focus, aria-labels, and color contrast AA. No tool ships if it fails axe-core audit.

5.6 **Error Handling:** Every tool must handle: empty input, too-large file, corrupt file, WASM load failure, and offline. Errors must be friendly, not stack traces.

---

## ARTICLE VI: CONTENT AND SEO LAW

6.1 **Unique Content:** Each tool page must have unique title, description, H1, 300+ word how-to, and 3 FAQs with JSON-LD. No duplicate boilerplate.

6.2 **No Thin Content:** AI-generated filler without human review is prohibited. AdSense will reject thin content and we will deserve it.

6.3 **Internal Linking:** Each tool page shall link to 2 related tools. Homepage shall link to all tools.

6.4 **Sitemap:** Build must generate `sitemap.xml` and `robots.txt`. Sitemap must be submitted to Search Console on launch.

---

## ARTICLE VII: DEVELOPMENT PROCESS

7.1 **Plan Before Build:** No code beyond docs shall be written until `SOURCE_OF_TRUTH.md`, `ROADMAP.md`, `TASKS.md`, and this Constitution are approved. This was enforced for v1.

7.2 **One Task at a Time:** TASKS.md is the single backlog. Tasks are checked only when verified on Cloudflare preview URL and in incognito.

7.3 **Branch Law:** Work on `feature/<tool-name>` branches, merge via PR with manual test script (5-minute steps) in description. `main` is always deployable.

7.4 **No Secrets:** No API keys, no secrets in repo. AdSense ID is public but should be via `import.meta.env` for flexibility.

7.5 **Commit Hygiene:** Conventional commits: `feat(pdf): add merge tool`, `fix(image): handle avif fallback`, `docs: update vows`.

---

## ARTICLE VIII: GOVERNANCE AND ROLES

8.1 **Owner:** You, the domain owner, are sovereign. You interpret this Constitution.

8.2 **AI Collaborator:** The AI is a builder, not a decider. It proposes, you dispose.

8.3 **User as Citizen:** Users are citizens with rights defined in VOWS.md. Any user report of broken vow is P0 bug.

---

## ARTICLE IX: GROWTH AND SUSTAINABILITY

9.1 **Free Forever:** Article II and Vow 2 together guarantee 22 launch tools remain free. Adding paywalls requires 75% user notice + 30-day delay + major version bump. Practically, we never will.

9.2 **Revenue Reinvestment:** First revenue covers domain, then funds better WASM models, then accessibility audits. No dark patterns to juice RPM.

9.3 **Open Source Intent:** Goal to open-source the repo after 1.0.0, so the community can self-host and verify vows.

---

## ARTICLE X: SUCCESSION

10.1 **Maintenance Mode:** If development ceases, site shall be archived, not sold to spam network. See Vow 8.

10.2 **Domain Stewardship:** Domain shall be renewed for 5+ years if possible, or allowed to expire cleanly.

10.3 **Legacy:** This Constitution shall be included in any open-source release, so forks inherit the same ethics.

---

## SIGNATURE

By creating `~/Desktop/all in one helper/` and tagging `v0.1.0`, we ratify this Constitution.

**Ratified on:** 2026-08-20
**Location:** Cloudflare Pages, Global Edge

> "We hold these truths to be self-evident: that tools can be free, that files can stay private, and that ads can be honest."
