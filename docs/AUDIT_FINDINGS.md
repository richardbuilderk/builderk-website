# BuilderK Website — Senior Engineering Audit

**Date:** 2026-05-30
**Repo:** `C:\Users\kevin\builderk-website` (static multi-page site, Vercel)
**Scope:** 32 HTML pages, `css/city.css`, inline styles, `api/webhook.js`, `scripts/generate-floor-plan-pages.mjs`, `vercel.json`, `sitemap.xml`, `robots.txt`, `images/`, `videos/`.
**Method:** Four parallel read-only agents: Bugs/Correctness, Security, Performance, Code Quality/UX/A11y/SEO. Findings below are de-duplicated and re-prioritized into one backlog. Source tags: `[Bugs]` `[Sec]` `[Perf]` `[Qual]`.
**Status:** IN PROGRESS (approved; fixes landing on `main`).

## Progress log

- **Pre-flight:** WIP feature (floor-plan pages + nav/footer wiring + full-screen mobile menu fix) committed as `fef8f9b`. Audit work proceeds on `main`.
- **Batch 1 — config + security one-liners (DONE):** P0-2 blog robots/canonical tag fixed; P0-4 webhook no longer leaks the raw GHL error body; P1-1 webhook CORS locked to the production origin; P2-2 Cache-Control headers added for images/videos/css/favicons; P2-6 `rel="noopener"` added to the 5 remaining map links; P3-12 no-op `/api/webhook` rewrite removed; P0-3 baseline security headers added (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS). **CSP deferred** to its own batch — it must be preview-verified against the GA/TikTok/Formspree pixels first so it does not silently break conversion tracking.

---

## Executive summary

| Priority | Count | Theme |
|---|---|---|
| P0 — Critical | 5 | 287 MB of unoptimized media, broken canonical tag, no security headers, webhook info leak, fabricated-content legal risk |
| P1 — High | 18 | Webhook abuse surface, analytics double-counting, accessibility blockers, broken social-share previews, dead form-success code |
| P2 — Medium | 16 | Shared-CSS extraction, caching, LCP/preload, design-system drift, schema gaps |
| P3 — Low | 13 | Head ordering, CSS token unification, meta completeness, minor cleanup |
| Content to verify | 16 | Testimonials, published pricing, warranty language, stats, departed staff — FLAG ONLY |

**The five things that matter most:**

1. **Media weight (P0).** `images/` is 287 MB. Facade PNGs average 6.7 MB each (74 MB for one page); 26 project JPGs exceed 3 MB. This is the single biggest problem on the site and it directly hurts mobile conversion on your Google Ads landing pages. `[Perf]`
2. **Fabricated-content / legal risk (P0, flag only).** City-page testimonials read as illustrative ("Maria G., Orlando" etc.). Publishing invented reviews is an FTC risk. Published per-sqft pricing and a "full warranty protection" claim also conflict with your standing rule never to publish prices/warranty without confirmation. These are flagged, not touched. `[Qual][Bugs]`
3. **Security baseline (P0/P1).** `vercel.json` sets no security headers (no CSP/HSTS/X-Frame-Options). The webhook uses wildcard CORS, has no input validation/rate limiting/honeypot, and leaks the raw GHL API error body to any caller. The forms can be scripted to flood your GHL CRM. `[Sec]`
4. **Analytics integrity (P1).** The homepage fires TikTok `ViewContent` and `CompleteRegistration` twice, double-counting conversions. Timeline/home-size values the form submits don't match the webhook's tag map, so leads get mis-tagged in GHL. `[Bugs]`
5. **Accessibility blockers (P0/P1).** FAQ accordions and the calculator's tier/add-on controls are `<div onclick>` (not keyboard-usable); lightbox close buttons have no accessible name; no skip link, no `<main>`, no `prefers-reduced-motion`. `[Qual]`

**Pre-flight note — dirty working tree:** 28 modified + 13 untracked files are already uncommitted (new floor-plan pages, `scripts/`, edits across most pages). Recommend committing or stashing that work BEFORE any audit fixes, so the audit diff is reviewable in isolation. A decision is needed before Phase 3.

---

## P0 — Critical

### P0-1 — 287 MB of unoptimized images `[Perf]`
- **Where:** `images/facades/*.png` (11 files, 74 MB, avg 6.7 MB), `images/projects/*.jpg` (26 files >3 MB, largest 6.4 MB), `images/interiors/*.png` (1.6–7.8 MB).
- **Why:** Photorealistic renders served as uncompressed PNG/oversized JPG. Facades page alone pulls ~74 MB on scroll; construction gallery ~120 MB. Brutal on mobile 4G — the exact audience clicking your ads.
- **Fix:** Batch re-export. Facades/interiors → AVIF q75–80 with WebP+PNG fallback via `<picture>`, target <150 KB at display size. Projects (JPG source) → WebP q80 at 1920px, target <200 KB. Add `width`/`height`. **Do not drop below q75** (Kevin: preserve image quality).
- **Risk/effort:** High effort (batch workflow), zero quality risk at q75+. Expected: facades 74 MB → ~2 MB; construction 120 MB → <15 MB.

### P0-2 — Malformed `<meta name="robots">` breaks canonical on blog post `[Qual]`
- **Where:** `blog-build-custom-home-florida-2026.html:23`
- **Why:** Missing closing `>` — the adjacent `<link rel="canonical">` is swallowed as an attribute, so no canonical URL reaches crawlers. Hard SEO breakage on a page meant to rank.
- **Fix:** Add the `>`: `<meta name="robots" content="index, follow">`.
- **Risk/effort:** Trivial / 2 min.

### P0-3 — No security headers in `vercel.json` `[Sec]`
- **Where:** `vercel.json` (no `headers` block)
- **Why:** Missing CSP (no XSS mitigation), HSTS (downgrade risk), X-Frame-Options (clickjacking — site is iframeable anywhere), X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Fix:** Add a `headers` block. CSP must allow inline scripts + Google/TikTok/Formspree origins (site uses extensive inline `<script>`). Full proposed values in the Security agent notes; `frame-ancestors 'self'` + `X-Content-Type-Options: nosniff` + HSTS + Referrer-Policy + Permissions-Policy.
- **Risk/effort:** Low (config only), high value. Verify pixels/forms still fire after CSP applied.

### P0-4 — Webhook leaks raw GHL API error body to client `[Sec]`
- **Where:** `api/webhook.js:49`
- **Why:** On GHL failure it returns `details: ghlData` (unfiltered CRM API response) to any caller — exposes internal field names, location IDs, schema.
- **Fix:** Log server-side only; return a generic `{ error: 'Failed to create contact. Please try again.' }`.
- **Risk/effort:** Trivial / 1 line.

### P0-5 — Likely-fabricated testimonials + published pricing/warranty (FLAG ONLY) `[Qual][Bugs]`
- **Where:** City-page testimonials (`orlando.html`, `tampa.html`, `melbourne.html`, `ocala.html`, `jacksonville.html`, `fort-myers.html`, `miami.html`); `index.html:1613` & `cape-coral.html:334` shared quote; pricing tiers on all city pages + `calculator.html` + both blogs; warranty claim `blog-build-custom-home-florida-2026.html:223`.
- **Why:** Invented reviews = FTC compliance risk. Published per-sqft pricing and warranty language conflict with your standing rules (no invention, no published prices/warranty without confirmation).
- **Fix:** None applied. See **Content to verify** section. Needs your decision: confirm as real (with consent), replace with verified GHL/Google reviews, or remove.
- **Risk/effort:** Decision required before any edit.

---

## P1 — High

**Webhook / security hardening `[Sec]`**
- **P1-1 — Wildcard CORS.** `api/webhook.js:3` sets `Access-Control-Allow-Origin: *`. Lock to `https://www.builderk.com`.
- **P1-2 — No input validation or size cap.** `api/webhook.js:24` passes `req.body` straight to GHL. Validate required fields + lengths (name ≤100, email pattern, notes ≤2000), drop unknown fields, cap payload size.
- **P1-3 — No bot protection on either form.** `index.html:1714`, `referral-program/index.html:493`. Add honeypot field + reject on webhook; add IP rate limit (5/10 min); consider Cloudflare Turnstile. Both forms POST to the same Formspree ID `mreybpyl` and also fire a parallel `/api/webhook` request, so the endpoint is trivially scriptable → CRM pollution.
- **P1-4 — No request timeouts on webhook fetches.** `api/webhook.js` `findLeadGenStage()` + contact create have no `AbortSignal.timeout(5000)`; slow GHL can hang the serverless function.

**Analytics / data integrity `[Bugs]`**
- **P1-5 — Duplicate TikTok events.** `index.html:1974` & `:2029` both fire `ViewContent`; `CompleteRegistration` registered twice (`:1982`, `:2032`). Conversions double-counted. Delete the second block (`:2027–2035`).
- **P1-6 — Form values don't match webhook tag map.** Form sends timeline `ASAP / 1-3 months / 3-6 months / 6-12 months` (`index.html:1771`) but `api/webhook.js:239` map expects `Ready to start / Within 6 months / Within 1 year`. `home_size` "Under 1,500 sq ft" (`index.html:1750`) has no mapping (`:222`) → tagged `custom-size`. Align map to current form values.

**Forms / UX `[Bugs]`**
- **P1-7 — Dead `handleSubmit()` — no success feedback.** `index.html:1900` defined but never wired to the form at `:1714` (no `onsubmit`/listener). Users get no inline confirmation. Wire it, or surface real success/error.
- **P1-8 — Referral form shows success before delivery.** `referral-program/index.html:611` flips button to "Submitted!" via `setTimeout` regardless of whether Formspree/webhook succeeded; errors swallowed by `.catch(function(){})`. Confirm only on a 2xx response.

**Accessibility `[Qual]`**
- **P1-9 — FAQ accordions not keyboard-usable.** `<div class="faq-q" onclick>` on all 8 city pages + `financing.html` + referral page. No focus/role/Enter-Space. Convert to `<button aria-expanded aria-controls>`.
- **P1-10 — Calculator controls not keyboard-usable.** `calculator.html:363,407–424` tier/garage/add-on are `<div onclick>`; range sliders (`:355,390,397`) have no accessible name. Convert to buttons / add labels.
- **P1-11 — Lightbox close has no accessible name.** All 9 floor-plan pages + `construction.html` + `interior-gallery.html`: `<button class="close">x</button>`, and `<img id="lightboxImg" alt="">` announces empty. Add `aria-label`, populate `alt` from JS.
- **P1-12 — No skip link + no `<main>` landmark** on any of 32 pages. Add visually-hidden skip link + wrap content in `<main id="main-content">`.
- **P1-13 — Hamburger ARIA broken/inconsistent.** `index.html:1335` `<ul>` missing `id="nav-links"` referenced by `aria-controls`; `about.html:347` hamburger has no `aria-label`/`aria-expanded`; blog + `resources.html` set `aria-expanded` once and never update it via inline `onclick`. Standardize the nav pattern site-wide.
- **P1-14 — Focus indicator suppressed.** `index.html:892`, `calculator.html:71` `outline:none` on range inputs; inputs rely on color-only focus (fails 1.4.1). Add `:focus-visible` box-shadow ring.
- **P1-15 — No `prefers-reduced-motion`.** Site-wide IntersectionObserver fades + infinite CSS animations with no reduce-motion block. Add the global reduced-motion override.

**SEO / social share `[Qual]`**
- **P1-16 — SVG used for `og:image` on 6 floor-plan pages.** `floor-plan-1450/1850/2200/2650/3050/3300-sq-ft.html:23`. OG doesn't support SVG → broken link previews on FB/LinkedIn/iMessage/WhatsApp. Export 1200×630 PNGs.
- **P1-17 — OG/Twitter tags missing on 8 pages** (`calculator`, `floor-plans`, `construction`, `facades`, `interiors`, `interior-gallery`, `privacy`, `terms`) and **wrong `og:type="article"`** on all 9 floor-plan pages (should be `website`/`product`). Add/fix.
- **P1-18 — Font loading not optimized on 13 pages.** Missing `preconnect` to `fonts.googleapis.com`/`fonts.gstatic.com` (about, both blogs, 8 city pages, financing, resources). Adds 200–300ms render-blocking delay on ad landing pages. Add preconnect; consider the async-load pattern already used in `referral-program/index.html`.

---

## P2 — Medium

- **P2-1 — Extract shared CSS `[Perf]`.** 278 KB of identical inline CSS duplicated across 23 non-city pages (index 29.8 KB, calculator 21.2 KB, about 20.1 KB), none cacheable. Extract reset/tokens/nav/footer/buttons/breakpoints to `css/main.css` (city pages already model this with `city.css`). High effort, big repeat-visit win.
- **P2-2 — No cache-control headers `[Perf]`.** `vercel.json` default re-validates every asset on every request. Add long-lived caching for `/images`, `/videos`, `/css`, favicons (use `max-age=86400` unless filenames are versioned, since images are replaced in place).
- **P2-3 — 14.1 MB autoplay hero video `[Perf]`.** `index.html:1379`, single MP4, no WebM, no mobile source. Re-encode to <5 MB, add WebM VP9 + a 720p mobile source, consider `preload="none"` + IntersectionObserver. Keep ≥1500 kbps (quality).
- **P2-4 — 190 `<img>` missing width/height (CLS) `[Perf]`.** Team photos, all floor-plan images, galleries. Add intrinsic dimensions.
- **P2-5 — LCP not preloaded `[Perf]`.** City-page hero `<img>` (8 pages) and floor-plan main image (9 pages) have no preload/`fetchpriority="high"`; index hero is a CSS background (can't use `fetchpriority`) and preloads the desktop image even on mobile. Add conditional preloads + `fetchpriority`.
- **P2-6 — `target="_blank"` missing `rel="noopener noreferrer"` `[Sec]`.** `index.html:1831`, `calculator.html:641`, `privacy.html:359`, `terms.html:363`, `referral-program/index.html:589`. (Most other pages already correct.)
- **P2-7 — Interiors page depends entirely on Unsplash hotlinks `[Bugs]`.** `interiors.html` — all images from `images.unsplash.com`; expiry/outage = broken page. Host locally like `interior-gallery.html` does.
- **P2-8 — Emoji icons on city pages violate design system `[Qual]`.** City pages use emoji (🚤📈🏡…) where the system specifies Lucide; main pages use inline SVG. Lucide imported nowhere. Standardize; at minimum `aria-hidden` the emoji.
- **P2-9 — CTA button radius drift `[Qual]`.** Nav "Talk to a Builder" radius is `4px` (about), `8px` (calculator/floor-plans/construction/interior-gallery), `50px` (index/city/blogs/referral). Pick one (recommend the 8px-scale or pill) and centralize.
- **P2-10 — 6 floor-plan pages share identical "Plan Highlights" filler `[Qual]`.** Same boilancing body text under different headings → in-page duplicate content. Write plan-specific copy or collapse to one paragraph. (Content — confirm before writing specifics.)
- **P2-11 — FAQ `max-height:300px` clips long answers `[Qual]`.** `css/city.css:109`, referral page. Use grid-rows `0fr/1fr` or a safe large max-height.
- **P2-12 — Article schema missing `publisher.logo` `[Qual]`.** Both blogs — blocks article rich results. Add ImageObject logo.
- **P2-13 — No structured data on 6 key pages `[Qual]`.** about (Organization/Person), floor-plans (ItemList), interiors/interior-gallery (ImageGallery), construction, facades.
- **P2-14 — Vercel Insights on only 2 of 32 pages `[Perf/Qual]`.** Add `defer` script site-wide for full analytics.
- **P2-15 — Inline `onmouseover` hover JS on index process cards `[Qual]`.** `index.html:1399–1448`. Move to CSS `:hover` (also respects reduced-motion).
- **P2-16 — Dual-submission swallows errors `[Sec]`.** Forms submit to Formspree AND `/api/webhook` independently with no correlation and silent catches. Consider unifying through the webhook; at minimum surface errors.

---

## P3 — Low / polish

- **P3-1** `<head>` ordering: charset/viewport should precede tracking scripts (`index.html:26`, most pages). `[Qual]`
- **P3-2** Three divergent CSS variable systems (`--dark` means different colors on index vs city). Consolidate to one token file. `[Qual]`
- **P3-3** Duplicate Escape keydown handlers on `index.html:1948+1963`, `about.html:566+582` (second omits aria reset). Remove duplicates. `[Bugs][Qual]`
- **P3-4** `interior-gallery.html` not in `sitemap.xml`. (Verify whether it's linked from nav — agents disagreed.) `[Bugs][Qual]`
- **P3-5** `referral-program/` footer link is relative (`index.html:1805`) vs `/referral-program/` everywhere else. `[Bugs]`
- **P3-6** Floor-plan generated pages omit TikTok pixel (only GA4). `[Bugs]`
- **P3-7** `sitemap.xml` stale `lastmod` (2026-03-25) + floor-plans priority mismatch (0.8 vs generator's 0.9). `[Bugs]`
- **P3-8** `about.html` CTA uses black text on orange; other pages white. `[Qual]`
- **P3-9** `css/city.css` duplicate `@media (max-width:1280px)` blocks + z-index sprawl (1000 vs 10000 `:has()` overrides). `[Qual]`
- **P3-10** `<a>` with no `href` used for address display (`cape-coral.html:412`). Use `<address>`/`<p>`. `[Qual]`
- **P3-11** Generator (`scripts/generate-floor-plan-pages.mjs:4`) Windows path regex is fragile — use `fileURLToPath`. `existingPlans` (1700/1977/2377) lack fields `detailPage()` needs. `[Bugs]`
- **P3-12** Identity rewrite `/api/webhook` → `/api/webhook` in `vercel.json:8` is a no-op; remove. `[Bugs]`
- **P3-13** Add `dns-prefetch`/`preconnect` for `formspree.io` on form pages; add `decoding="async"` to lazy images. `[Perf]`

---

## Content to verify — FLAG ONLY (no edits without Kevin's confirmation)

Per your standing rules (no invention on the site; never publish prices/warranty without confirmation), these are listed, not changed:

1. **Testimonials on all 7 city pages** read as illustrative (named individuals, 5 stars). Confirm each is a real, consented client or replace with verified Google/GHL reviews. **FTC risk if fabricated.**
2. **Shared testimonial** "Build in 7 months — James & Lisa T." appears on both `index.html:1613` and `cape-coral.html:334`.
3. **Published per-sqft pricing** ($150–180 Standard / $180–220 Mid / $220+ Luxury) on all city pages, `calculator.html`, both blogs.
4. **"Full warranty protection"** claim — `blog-build-custom-home-florida-2026.html:223`; no warranty terms defined anywhere.
5. **"30–50%" / "$3,000–$8,000+/yr" insurance savings** — `blog-build-on-your-lot-vs-buy.html:314`. Needs a source.
6. **"680+ credit score"** in FAQ JSON-LD — `cape-coral.html:114`, `financing.html`. Lender-specific.
7. **Hero stats** "150+ Homes Built" and "15+ Years Experience" (index + all city pages) vs **"25+ Years Combined"** on `about.html:360` — inconsistent; clarify.
8. **About-page awards** (Tiara "Project of the Year", Tides "Condo Conversion of the Year", Mariner's Key "Gold Prism") are Mark Jackson's prior-employer credentials — ensure context makes clear they're personal career accomplishments, not BuilderK company awards.
9. **"3% commission" referral terms** (`referral-program/`) — confirm current contractual rate.
10. **Departed staff on About page** — Alejandra Sosa and Michelle Hernandez (`about.html:411,414`) appear as current team. (Memory: Alejandra departed; Michelle status unclear.) Confirm before removing.
11. Equity dollar figures in `blog-build-on-your-lot-vs-buy.html` comparison tables.

---

## Suggested execution order (Phase 3, after approval)

1. **Config + 1-liners (fast, low-risk):** P0-2 robots tag, P0-3 security headers, P0-4 webhook leak, P1-1 CORS, P2-2 cache headers, P3-12 rewrite, P2-6 `rel=noopener`. One reviewable batch.
2. **Webhook robustness:** P1-2 validation, P1-3 honeypot+rate limit, P1-4 timeouts, P1-6 tag map.
3. **Analytics + forms:** P1-5 dup TikTok, P1-7 form success, P1-8 referral success, P3-3 dup handlers.
4. **Accessibility batch:** P1-9..P1-15.
5. **SEO/social batch:** P1-16, P1-17, P1-18, P2-12, P2-13.
6. **Performance — images/video/CSS:** P0-1, P2-1, P2-3, P2-4, P2-5 (largest effort; image conversion workflow).
7. **Design-system + polish:** P2-8, P2-9, P3-* .
8. **Content items:** only after Kevin confirms each in the "Content to verify" list.

Every batch verified in-browser (preview server, console, snapshot, mobile width, forms) before moving on.
