# ALL-IN-ONE HELPER - IMPLEMENTATION PLAN
> Do NOT build until this plan is approved. This is the build blueprint.

**Status:** AWAITING APPROVAL - No code yet
**Approach:** Phase-gated, 7 weeks, $0 infra, Cloudflare Pages only
**Approval Gate:** You must reply "APPROVED" before any `npm create` or code file is touched.

---

## 1. DECISIONS TO LOCK BEFORE BUILD

| # | Decision | Options | Recommendation | Why |
|---|----------|---------|----------------|-----|
| 1 | Framework | Astro vs Vite+Svelte | **Astro** | Better SEO for 22 tool pages, island architecture = tiny JS, perfect for static. Vite+Svelte is also fine but Astro's content collections win for tool pages. |
| 2 | Styling | Tailwind vs Vanilla | **Tailwind** | Speed, consistency, tiny via purge. |
| 3 | Domain | Need to pick | **TBD by you** | Must be short, includes "tools" or "helper", .com preferred. |
| 4 | Repo | Private vs Public | **Private until 1.0, then public** | Keep private for AdSense review, open-source after. |

**Action:** Reply with framework + domain choice, or "use recommended".

---

## 2. PRE-BUILD CHECKLIST (Day 0)

- [ ] Approve SOURCE_OF_TRUTH, ROADMAP, TASKS, VOWS, CONSTITUTION
- [ ] Choose domain, purchase (~$10), add to Cloudflare
- [ ] Create GitHub repo `all-in-one-helper` (private)
- [ ] Confirm you have Node 20+ and `npm` or `bun`
- [ ] Decide: `bun` vs `npm` (recommend `npm` for Cloudflare compat)

---

## 3. BUILD PHASES (No Code Yet - Just Plan)

### Phase 0: Foundation (Week 1) - See TASKS T-001 to T-014
**Goal:** Deploy empty shell to Cloudflare.
**Risk:** WASM headers CORS - mitigated by `_headers` file.
**Deliverable:** `https://yourdomain.com` shows 22 "Coming Soon" cards, Lighthouse 95+.

### Phase 1: PDF Tools (Week 2-3) - T-101 to T-109
**Order:** Merge → Split → Compress → PDF↔JPG → Rotate → Extract → Watermark → Unlock
**Why this order:** Shared `pdf-lib` code, increasing complexity.
**Worker:** All PDF logic in `src/lib/pdf-worker.ts` via Comlink.

### Phase 2: Image Tools (Week 4) - T-201 to T-205
**Flagship:** Remove BG - requires 30MB model caching. Test on iPhone early or cut.
**Batch:** Compress + Convert share zip logic.

### Phase 3: Video/Audio + Utils (Week 5) - T-301 to T-308
**Gate:** ffmpeg.wasm only on `/tools/video-compress`, behind `if (route === 'video') import('...')`.
**Easy wins:** Utilities built in 1 day each, parallelizable.

### Phase 4: Monetization & SEO (Week 6) - T-401 to T-407
**Gate:** AdSense needs 15+ pages + legal. Apply Day 1 of Week 6. Also integrate Buy Me a Coffee `contactae2b` button (#FFDD00) in footer.
**Content:** Each tool page needs human 300-word how-to. Use no AI filler.

### Phase 5: QA & Launch (Week 7) - T-501 to T-506
**Matrix:** 22 tools × 5 browsers = 110 manual checks. Create sheet.
**Legal:** Privacy/Terms/Contact mandatory for AdSense.

---

## 4. FOLDER STRUCTURE (Planned, Not Created Yet)

```
all-in-one-helper/          (future repo, not this Desktop folder)
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   └── tools/[tool].astro
│   ├── components/
│   │   ├── ToolLayout.astro
│   │   ├── FileDropzone.tsx
│   │   └── BannerSlot.astro
│   ├── lib/
│   │   ├── file-utils.ts
│   │   ├── worker-manager.ts
│   │   └── banners.ts
│   └── layouts/
├── public/
│   ├── banners.json
│   ├── _headers
│   └── favicon.svg
├── astro.config.mjs
└── package.json
```

**Current Desktop folder** is the *planning* folder. The *code* folder will be separate (either `~/Desktop/all-in-one-helper-repo` or `~/chipotlai-max/...`).

---

## 5. NEXT STEP AFTER APPROVAL

1.  `npm create astro@latest` in new repo folder
2.  Implement T-001 → T-006
3.  First deploy to `*.pages.dev`, share URL for your review
4.  Then proceed Phase 1, tool by tool, PR by PR

**Monetization Triple:** AdSense (auto) + Custom Banners (`banners.json`) + Buy Me a Coffee `contactae2b` (#FFDD00, `button.prod.min.js`) - all three can run together.

**We will NOT run any `npm create` or `mkdir` for code until you say "APPROVED" or "GO".**

---

## 6. WHAT WE ARE NOT DOING YET

- ❌ No `package.json` created
- ❌ No `src/` created
- ❌ No Cloudflare project created
- ❌ No WASM downloaded
- ❌ No AdSense application

This plan is the full stop. Awaiting your green light.


---

## 7. DETAILED WEEK-1 DAY-BY-DAY PLAN

**Day 1: Decision & Init**
- Morning: Lock framework (Astro). Create GitHub repo, local `git init`, `npm create astro`. Install Tailwind, verify dev server.
- Afternoon: Build `ToolLayout` with header/footer/ad slots. Test responsive.

**Day 2: Components**
- Build `FileDropzone` with drag states, keyboard, file type validation. Write `file-utils`.
- Build `WorkerManager` skeleton (no WASM yet, just promise queue).

**Day 3: Homepage & SEO**
- Homepage grid, search filter, FAQ. Add `sitemap.xml` generation.
- Create `banners.json` and renderer.

**Day 4: Deploy Prep**
- Add `_headers` for WASM caching, `_redirects`, `robots.txt`.
- Build locally, fix any `window is not defined` SSR errors (Astro SSR vs client).

**Day 5: First Deploy**
- Push to GitHub, connect Cloudflare Pages, set env `NODE_VERSION=20`.
- Verify deploy log green, test `pages.dev` URL on phone.

**Day 6: Polish & Review**
- Lighthouse audit, fix CLS, add dark mode toggle.
- Share preview URL with you for approval.

**Day 7: Buffer**
- Fix review feedback, document lessons in CHANGELOG.

## 8. RISK REGISTER

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AdSense rejection for thin content | Medium | High | Ensure 300+ words per tool, delay apply until 15 pages |
| WASM OOM on iOS | High | Medium | Limit file size, show friendly error, lazy-load |
| Cloudflare build fails due to WASM size | Low | High | Use `_headers` immutable cache, code-split |
| SEO not ranking | Medium | High | Internal linking, sitemap, 3 blog posts month 2 |

## 9. SUCCESS METRICS BEFORE NEXT PHASE

- Phase 0 done when: Preview URL loads <1s on 4G, Lighthouse 90+, 22 cards visible.
- Phase 1 done when: 9 PDF tools pass QA matrix.
- Launch done when: AdSense approved, 0 upload verified, legal pages live.


## 10. APPROVAL SIGNATURE

- [ ] I have read SOURCE_OF_TRUTH, ROADMAP, TASKS, VOWS, CONSTITUTION
- [ ] I approve the 22-tool scope and $0 architecture
- [ ] I choose framework: Astro (or write alternative)
- [ ] I choose domain: _________________
- [ ] I authorize Phase 0 build to start

Sign with "APPROVED" + domain name in chat. No code will be written until then.
