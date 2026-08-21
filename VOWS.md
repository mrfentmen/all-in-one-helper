# ALL-IN-ONE HELPER - VOWS
> Public promises to every user. These are not marketing. They are binding. If we break a vow, we have failed.

**Effective:** 2026-08-20
**Version:** 1.0
**Applies to:** All tools on all domains, forever.

---

## PREAMBLE

We built All-in-One Helper because we were tired of needing to pay $9 to remove a background, $15 to merge a PDF, and giving our private files to a server we don't trust - just to get them back watermarked.

We make these vows so you never have to wonder what we do with your files, your data, or your trust.

---

## VOW 1: YOUR FILES NEVER LEAVE YOUR DEVICE

**We vow that your files never touch our servers.**

Every tool - Merge PDF, Compress Image, Remove Background, Video Convert - runs 100% in your browser. You can verify this yourself:

1.  Open DevTools (F12) → Network tab.
2.  Use any tool with a large file.
3.  Watch: zero bytes uploaded. No POST to `/upload`. No fetch while processing.

We do not have an upload endpoint. We do not want your files. We could not see them even if we tried, because they never leave your RAM.

**Why this matters:** Your PDFs may contain contracts, medical records, job offers. Your images may be family photos. A server that receives them can be hacked, subpoenaed, or sold. A browser that never sends them cannot.

**Technical proof:** The site is static HTML/JS on Cloudflare Pages. There is no server process that can receive files. All processing uses `pdf-lib`, Canvas, and WebAssembly in a Web Worker on your device.

**If we ever add a tool that requires a server, we will label it with a red banner: "⚠️ This tool uploads your file to process. We delete it after 1 hour." We will never silently upload.**

---

## VOW 2: FREE MEANS FREE, FOREVER

**We vow that all 22 launch tools will remain free, with no paywall, no account, no limits, no watermarks, forever.**

We will not:
- Add a "Free 3 merges per day, then pay" gate.
- Require email to download.
- Add watermarks unless you ask for one.
- Throttle quality to upsell "Pro HD".

We may add optional donation links or ad-free tips, but the core tools will never be paywalled. If we add 28 more tools in v2, they too will be free.

**Why we can promise this:** Our costs are near-zero. Cloudflare Pages is free. Browser processing is free. Our only bill is the domain (~$10/year). We don't need to charge you to cover servers, because we have no servers for file processing. Ads cover the domain and our time.

---

## VOW 3: NO ACCOUNT, NO TRACKING, NO SURPRISES

**We vow to collect the minimum data possible and to be explicit about what we do collect.**

**We DO NOT collect:**
- Your files or their contents.
- Your name, email, or any login (there is no login).
- Your file names beyond what stays in your browser tab.
- Cross-site tracking profiles.

**We DO collect (transparently):**
- **Cloudflare Web Analytics:** Aggregated, anonymized pageviews, no cookies, no fingerprinting. Used to know which tools are popular so we know what to improve. You can block it with any ad blocker and the site still works.
- **Google AdSense (if you see ads):** Google may use cookies to show ads, per their policy. We do not control it. You can opt out via `myadcenter.google.com`. We load AdSense only on pages with ads, and we never sell your data to them - they serve the ad.
- **Custom Banners:** Our own `banners.json` is static and sets no cookies.
- **localStorage (on your device only):** We may save preferences like dark mode or recent tools - this never leaves your device.

**We will never:** Sell data, send newsletters without explicit opt-in, or add Facebook Pixel.

---

## VOW 4: PRIVATE BY DESIGN, NOT BY POLICY

**We vow that privacy is architectural, not just a promise.**

Many sites say "we delete your files after 1 hour." We say "we never received them." The first is a policy you must trust. The second is physics you can verify.

We will:
- Keep the site static and open-source-able.
- Allow you to use the site fully offline after first load (once WASM is cached, disconnect Wi-Fi and try).
- Never add analytics that requires file inspection.

---

## VOW 5: HONEST ADS, CLEAR LABELS

**We vow that ads will never trick you.**

We use two ad types, both clearly distinguishable:

- **AdSense ads:** Labeled by Google as "Ads" or "Sponsored". They may be personalized if you allow.
- **Custom banners:** Labeled "Sponsored" or "Partner" or "House Pick" in small text above the banner.

We will never:
- Make an ad look like a "Download" button.
- Place an ad that covers the tool or file dropzone.
- Use pop-ups, pop-unders, or auto-playing video ads with sound.
- Have more than 3 AdSense units + 2 custom banners per tool page.

We need ads to keep the site free, but we will lose money before we ruin the experience. If an ad violates this, email us and we will remove the network.

---

## VOW 6: ACCESSIBLE TO EVERYONE

**We vow that the site will be usable by everyone, regardless of device, ability, or income.**

- **No install:** Works in any modern browser, no app, no extension, no 100MB download.
- **Mobile first:** Every tool works on a $150 Android phone.
- **Accessible:** Keyboard navigable, screen reader labels, color contrast WCAG AA, no seizure triggers.
- **Low bandwidth:** Homepage <50kb JS, tools <200kb, WASM loaded only when needed. Works on 3G.

---

## VOW 7: OPEN AND ACCOUNTABLE

**We vow to stay accountable.**

- We will publish a `CHANGELOG.md` with every update.
- We will keep `SOURCE_OF_TRUTH.md` public in the repo so you can see our roadmap.
- We will have a `/contact` page that actually reaches a human.
- If we break a vow, we will publicly acknowledge it in the changelog and fix it within 7 days.

---

## VOW 8: WE WILL NOT ABANDON YOU

**We vow that if we stop maintaining the site, we will not take it down silently.**

If we can no longer maintain All-in-One Helper, we will:
1.  Make the GitHub repo public and archived.
2.  Keep the Cloudflare Pages deployment alive as long as free tier exists.
3.  Add a banner: "Maintenance mode - tools still work but no updates."

We will not sell the domain to a spam network. We would rather let it expire than betray trust.

---

## HOW TO HOLD US TO THESE VOWS

You don't have to trust us. Verify:

- **Check the Network tab** - prove no upload.
- **View Source** - it's static HTML.
- **Block JS** - see graceful message, not silent failure.
- **Email us** - we publish contact for a reason.

These vows are versioned. If we change them, the old version stays in git history and the changelog explains why. We will never weaken Vows 1-3 without a major version bump and 30-day notice.

**Signed:** The All-in-One Helper Team, 2026-08-20

> "Free tools should not cost your privacy. If a task can be done in your browser, it must be done in your browser."
