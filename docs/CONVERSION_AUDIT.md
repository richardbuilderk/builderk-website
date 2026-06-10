# BuilderK Website: Conversion & Content Audit

**Date:** 2026-06-10
**Repo:** `C:\Users\kevin\builderk-website` (live: builderk.com)
**Method:** Four parallel read-only agents: Positioning & Trust, Conversion Paths (CRO), Content & IA, Competitive Benchmark (vs ICI Homes, Cogdill Builders, Florida Lifestyle Homes).
**Relationship to prior work:** This covers the layer `docs/AUDIT_FINDINGS.md` (technical audit, same day) did not: positioning, conversion, content, information architecture. Technical findings are cited by ID (P0-x, P1-x, CV-x), not re-reported. Strategy context: `MARKETING_REVAMP_PLAN.md`.
**Status:** WAVE 0 EXECUTED 2026-06-10 (same day). Kevin approved: $160-$180 Standard floor, team-framed stat bar ("150+ Units Delivered by Our Leadership / 25+ Years Combined Experience / CGC #1537163"), 1-year builder warranty paragraph, AI hero video kept as decorative (improve later, never captioned as real).

**Wave 0 execution log (all verified by grep sweep + browser preview, zero console errors):**
- Fabricated testimonials removed from index + all 8 city pages; homepage slot replaced with a "Real Jobsites, Real Florida Builds" section linking to the construction gallery (CA-1, partial CA-2).
- Stat bar and all "150+ homes built / 15+ years" claims reframed sitewide (index, 8 city pages + metas, about metas + hero, referral page, both blogs, 3 floor-plan pages, social template). "100% completion record" removed. "$250M+ Projects Delivered" relabeled "Largest Project Led by Our Team" (CA-3).
- Warranty: approved 1-year paragraph published on calculator; "full warranty protection" blog claim replaced (CA-3).
- Pricing: Standard floor raised to $160-$180 everywhere (calculator UI + JS + meta, homepage, 7 city pages, both blogs incl. recalculated table; Miami already ran $180-$220). Central Florida + permit-fees + site-work disclaimer added to homepage pricing, calculator (3 spots), all 8 city pricing sections, city FAQ JSON-LD + visible FAQs. Calculator "Included" list corrected: "Permit processing & engineering coordination", "Standard slab-on-grade foundation", expanded not-included line (CA-7 + Kevin's permit/site-work requirement).
- Financing: hard "680+ minimum" softened to vary-by-program language (asset-based mentioned) across financing page (metas, JSON-LD, hero, requirement cards, FAQ), index tiles, 8 city pages, blog. "0% down" qualified as "possible" (CA-11).
- Honest labels: facades hero notes images are architectural renders; interiors hero notes inspiration gallery; AI-video section copy no longer implies real footage ("watch how a BuilderK home comes together" removed); about "Licensed, Bonded & Insured" corrected to "Licensed & Insured"; "production builder pricing" claim removed; on-time guarantee softened to process description (CA-5, CA-18).
- Departed staff (Michelle Hernandez, Alejandra Sosa) removed from About team grid (CV-10). Mark's GC section now explicitly framed as prior-roles career portfolio.

**Revision (Kevin, same day):** About-page Mark framing reverted (label back to "Projects Delivered", prior-roles sentence removed) and render/inspiration/video labels reverted (facades, interiors, index video line). Pricing, financing, stat bar, team removal, and security work stay. Fabricated testimonials were NOT restored (FTC fake-review rule); replacement plan is real client quotes (Sudhagar, Adriana, Pinsa Fire, Ted Gatlin), section returns when 2-3 real quotes are in hand.

**Wave 1 EXECUTED 2026-06-10 (browser-verified, zero console errors):**
- Nav: Construction link added to all 32 pages; footers completed everywhere (About, Construction Gallery, Interior Gallery, Floor Plans, Financing, Calculator, Referral Program absolute path, Resources, Privacy) (CA-9, CA-8).
- interior-gallery un-orphaned: hero button on interiors.html, footer links sitewide, sitemap entry (CA-2, P3-4).
- Lead context: 6 hidden fields on the homepage form (source_page, city_interest, plan_interest, utm_*) populated from referrer/URL; verified e2e (visitor from /tampa tags source=/tampa city=tampa; utm params captured). Webhook buildTags emits src-/city-/plan-/utm-/camp- tags; timeline map now matches live form values (ASAP, 1-3, 3-6, 6-12 months); Under-1,500 sqft size mapped (CA-4 partial, CA-10, P1-6).
- Form UX: consolidated single submit handler (AJAX to Formspree with inline "Thank You" success, native fallback on failure); duplicate TikTok ViewContent/CompleteRegistration blocks removed (P1-5, P1-7); duplicate Escape handler removed (P3-3); budget now required; CGC + 1-business-day response promise at the form (CA-17).
- Referral form: success state only on confirmed 2xx, native fallback otherwise (P1-8).
- CTAs: "Estimate My Build" repointed to /calculator on facades/floor-plans/interior-gallery (CA-16 partial); blogs got internal links + retained end CTA (CA-12 partial); privacy/terms exit CTAs (CA-26); about.html footer phone/email now clickable (CA-12); CGC in index footer (CA-24).

**Wave 2 EXECUTED 2026-06-10 (browser-verified, zero console errors):**
- NEW /contact page (MP-1): full qualification form mirroring the homepage (same field values, hidden source/city/plan/utm fields, AJAX submit with inline success, GHL webhook), "what happens next" panel, direct phone/email, fallback links. All 30 secondary pages' CTAs repointed from /#contact to /contact (referral page nav included); calculator nav/sticky/CTAs repointed.
- NEW /process page (MP-3): 8 steps with honest timeframes (all durations sourced from existing site claims), warranty paragraph, one-team note, CTA.
- NEW /service-areas hub (MP-2): 8 city cards + "don't see your area" CTA. All three pages in sitemap.
- Calculator estimate capture (CA-6): "Want a builder to review this estimate?" email capture on the result card posts full configuration (sqft, tier, beds/baths, garage, extras, estimate, monthly payment, lot status) to the webhook; fires Ads conversion; validation + failure fallback tested.
- Webhook: calculator-estimate handling (contact source "Cost Calculator", opportunity named with estimate amount, monetaryValue from the real estimate figure, tier/sqft tags, email-handle fallback name).
- Floor-plan pages: 6 boilerplate pages rewritten with spec-only unique copy (1450/1850/2200/2650/3050/3300); no layout details invented.

Remaining Wave 2 item deferred: city-page localization (CA-14) needs verified local facts (permit timelines per county) — flagged for Kevin input or careful sourcing. Then Wave 3 (a11y batch) and Wave 4 (images/CSS/CSP) from the technical backlog.

---

## Executive summary

**Conversion readiness: weak, for one dominant reason: proof.** The site is well built for a young company (good offer clarity, a calculator no competitor has, a referral program no competitor has), but it cannot close a skeptical $500K buyer because its proof layer is inverted:

> **The proof the site shows is not real, and the proof that is real is hidden.**
> Anonymous, likely fabricated testimonials sit on the homepage and every ad landing page. Stock photos and renders are presented without labels. Meanwhile the genuinely persuasive assets, 35+ real jobsite photos on construction.html and 6 real interior photos, are buried in the footer or fully orphaned (interior-gallery.html has zero inbound links).

**Where BuilderK already beats all three competitors (protect these):**
1. Only site of the four with a public interactive cost calculator.
2. Only site publishing $/sqft ranges (legitimate pre-qualification tool; needs the Central Florida qualifier).
3. Only site with a structured, public 3% realtor referral program (currently invisible: in one footer, nowhere else).
4. Clearest financing/process explanation (payment milestone breakdowns).

**Where BuilderK loses:** validated social proof (zero external reviews vs ICI's platforms and 45-year tenure), completed single-family portfolio (zero project pages), content depth (2 blog posts vs 9+ for competitors), and organic search (confirmed absent from page 1 for "build on your lot custom home builder Florida" and "custom home builder Orlando"; Cogdill and FLHFL rank).

**3 biggest opportunities:**
1. Fix the proof inversion: remove/verify fake-looking proof, surface real proof (CA-1, CA-2, CA-5).
2. Stop discarding lead context: one form on the homepage serves 24 bouncing CTAs with no hidden fields; calculator estimates vanish (CA-4, CA-6, CA-10).
3. Expose the two unique assets: referral program into nav/footers, calculator capture at the estimate moment (CA-8, CA-6).

**3 fastest wins (each under an hour once approved):**
1. Add Construction (real photos) to the main nav; un-orphan interior-gallery (CA-2, CA-9).
2. Hidden fields (source page, city, plan, UTM) + webhook tags so GHL knows where leads came from (CA-10).
3. Central Florida pricing qualifier on the homepage pricing section and city-page FAQ schema (CA-7).

---

## Findings

Categories: [Trust] [CRO] [IA] [Content] [Comp]. Effort: S/M/L.

### P0: kills trust or blocks conversion

**CA-1 [Trust] Likely-fabricated testimonials displayed sitewide, including duplicates a buyer can catch.**
Evidence: index.html:1603-1627 (three anonymous testimonials); "James & Lisa T." verbatim on index.html:1613 AND cape-coral.html:334; "Maria & Carlos R." on index and orlando.html:322; templated testimonials on all 8 city pages (extends AUDIT_FINDINGS P0-5).
Why: a buyer who sees the same quote on two pages distrusts everything else; FTC exposure.
Fix: Kevin decision (Q1): verify + fully attribute real ones, or remove all now and replace with real Google reviews as they arrive (Phase 5).
Effort: S to remove. Acceptance: no testimonial without name, city, date, and consent/review link on file.

**CA-2 [Trust] Real proof assets are buried or orphaned.**
Evidence: construction.html (35+ real jobsite photos, the strongest proof on the site) is footer-only, absent from every nav; interior-gallery.html has zero inbound links anywhere and is not in sitemap.xml (extends P3-4); six real interior photos (real-*.jpg, interior-gallery.html:584-656) sit unlabeled among renders.
Fix: add Construction (or "Our Work") to main nav; link interior-gallery from interiors.html and footers + sitemap; badge the six real photos "From our projects".
Effort: S. Acceptance: real-photo pages reachable in one click from any page; real photos visually distinguished from renders.

**CA-3 [Trust] Claim-integrity cluster: stats and promises that do not survive due diligence.**
Evidence: "150+ Units Built" sitewide while about.html's portfolio shows those units are Mark Jackson's multifamily career at prior employers (288-unit Davis Creek etc.); "15+ Years Experience" (index:1364) vs "25+ Years Combined" (about:360) (CV-7); "$250M+ Projects Delivered" (about:435) reads as company volume but is one commercial project Mark managed (CV-3); "100% completion record" (referral-program:441) unverified; "1-year builder warranty" (calculator.html:607) and "full warranty protection" (blog 2026:223) with no terms defined anywhere (CV-12); awards are Mark's prior-employer credentials styled like company awards (CV-5/6).
Why: these are verifiable claims on ad landing pages; one caught inconsistency kills the deal and creates legal exposure.
Fix: Kevin supplies true numbers (Q2, Q3); then one consistent claim set sitewide; reframe Mark's section explicitly as career credentials ("prior roles"); define warranty in one paragraph or remove claims.
Effort: S once decided. Acceptance: every number on the site is true for Builders Knowledge Development Inc. specifically, or clearly framed as team/career credentials.

**CA-4 [CRO] Single-form architecture discards context from 24 pages.**
Evidence: the only lead form is index.html:1714 (#contact). Every other page's CTAs link to /#contact: all 8 city heroes ("Start Your Tampa Project" loses Tampa), all 9 floor-plan pages ("Request This Plan" loses the plan), calculator (loses the estimate), galleries, blogs, about, financing. The form has zero hidden fields (no source page, no UTM, no city, no plan).
Why: ad spend buys geographic and plan-level intent that is thrown away at the form; sales gets indistinguishable leads.
Fix: Phase 1 (S): query params + hidden fields (source_page, utm_*, city, plan) read on index and tagged in webhook buildTags() (api/webhook.js:208). Phase 2 (M): standalone /contact page (MP-1) and inline capture on high-intent pages.
Acceptance: a GHL lead shows origin page, city, and plan where applicable.

**CA-5 [Trust] Stock and renders presented as BuilderK work, unlabeled.**
Evidence: interiors.html is 100% Unsplash hotlinks framed as "Choose every finish in your custom Florida home" (extends P2-7: the conversion risk is buyers recognizing stock); facades.html and index style grid are renders with no "architectural render" label anywhere (about.html:489 actually sells renders as a feature, correctly); homepage video (index:1379) has no attribution, real or stock unknown (Q5).
Fix: label render galleries ("Architectural renders: every style buildable on your lot"), label or replace stock interiors ("Inspiration gallery"), caption the video if real, replace if stock.
Effort: S. Acceptance: nothing on the site implies third-party imagery is BuilderK's built work.

### P1: significant conversion impact

**CA-6 [CRO] Calculator (highest-intent page) has zero lead capture at the estimate moment.** Result card (calculator.html:432-444) shows the number then a bouncing CTA; no "email me this estimate", no inline fields; estimate state (sqft, tier, extras) is never transmitted. Fix: inline name+email capture posting calculator state to /api/webhook; query-param fallback on the CTA. Effort: M. This is the single highest-converting change available. (Marketing plan KPI: 10 calculator submissions/week by week 6.)

**CA-7 [Trust] Central Florida pricing qualifier exists only on the calculator.** Homepage pricing section (index.html:1635-1653) and all 8 city-page FAQ JSON-LD answers publish $150-$220+/sqft with no geography. Coastal builds run far higher (real BuilderK range runs to ~$357/sqft on coastal work). Featured-snippet risk: Google can surface the unqualified $150 answer for Miami/Cape Coral queries. Fix: extend the qualifier added to calculator.html on 2026-06-10 to the homepage section and city JSON-LD. Effort: S.

**CA-8 [CRO/Comp] The referral program, a unique competitive asset, is invisible.** Only link: index footer, relative path (P3-5). Absent from every nav, every city/blog/legal footer. None of the three competitors have a public 3% program; BuilderK's is unfindable. Fix: nav or prominent footer item sitewide + homepage "Realtors: earn 3%" mention. Effort: S.

**CA-9 [IA] Main nav starves the consideration stage; five different footer variants exist.** about, construction, facades, interiors, interior-gallery, resources are all unreachable from the main nav on every page. Recommended canonical nav: Floor Plans | Construction | Financing | Calculator | Talk to a Builder (About moves to footer; one footer HTML across all 32 pages: Company / Build / Areas We Serve / Contact). Effort: S-M.

**CA-10 [CRO] GHL data quality: form sends nothing about origin; budget optional.** No hidden fields (see CA-4); budget select not required despite lead-priority rules needing lot + budget; timeline values already mismatched with webhook map (P1-6, in backlog). Fix: hidden fields + make budget required + align maps. Effort: S.

**CA-11 [Trust] Financing page overclaims and undermines BuilderK's own advantage.** "680+ minimum credit score" stated as universal (financing.html:469-471, city FAQ JSON-LD, CV-13) although BuilderK's lender relationship (asset-based) does not underwrite on credit; "0% down if you own your lot" unqualified; no named lender anywhere; "not a lender" disclaimer missing from the financing page itself. Fix: soften to "varies by program, we match you to the right lender", add lender-requirements qualifier to both stats; pursue named-lender permission (Q6). Effort: S.

**CA-12 [CRO] Dead ends and broken contact paths.** about.html footer phone/email are plain spans, not links (about.html:530-532): not tappable on the trust page; blogs, galleries, resources, privacy, terms end with no or generic next step; blogs contain zero internal links to calculator/plans/cities. Fix: tel:/mailto links, end-of-page CTAs, 2-3 contextual links per blog. Effort: S.

**CA-13 [Content] Content engine stalled, with confirmed SEO consequence.** 2 blog posts (both 2026-03-07), resources page has 3 cards, Phase 4 first deadline (2026-05-31) passed with nothing shipped. Confirmed: BuilderK absent from page 1 for both core queries while Cogdill and FLHFL rank. Fix: execute Phase 4; first two posts from real experience: month-by-month build timeline, and county permitting lessons. Effort: M per post, ongoing.

**CA-14 [Content] City pages are template-with-find-replace.** Orlando/Tampa sampled: identical structure and near-identical copy with swapped neighborhood names; Cape Coral (canal/seawall content) is genuinely local and is the model. These are the Google Ads landing pages. Fix: one genuinely local paragraph + one unique FAQ per city, starting with active ad cities. Effort: M (8 pages).

**CA-15 [Content] Floor-plan pages: 27 identical "Plan Highlights" paragraphs and context-free CTAs.** Extends P2-10; CTAs send no plan info (CA-4); no facade imagery or built-home links on plan pages (competitors pair plans with real photos). Fix: unique 2-3 sentence highlights per plan (from drawings, no invention), plan-context CTAs, link facades from plan pages. Effort: M.

### P2: meaningful improvement

**CA-16 [CRO] CTA label chaos: same label, different destinations.** "Estimate My Build" goes to /calculator on the index sticky bar but to /#contact on facades.html:608, floor-plans.html:446, interior-gallery.html:670. Five labels total for one destination. Standardize: "Talk to a Builder" = contact, "Estimate My Build" = calculator, city pages keep localized labels. Effort: S.

**CA-17 [Trust] No trust elements at the moment of commitment.** Form section has the good "What happens next" panel (keep) but no CGC number, no response-time promise at the button, no proof nearby. Add a compact trust strip (CGC + phone + "we respond within 1 business day"). Effort: S.

**CA-18 [Trust] Unsubstantiated soft claims to soften.** "We set realistic timelines and stick to them: no excuses" (about:393), "custom quality at production builder pricing" (about:490), "TRANSPARENT PRICING" label over estimate ranges (index:1635). Reword to process descriptions, not outcome guarantees. Effort: S.

**CA-19 [CRO] Referral program trust mechanics.** No written-agreement mention, no autoresponse confirmation, FAQ wording ambiguity (each referral "qualifies for its own 3%": clarify 1.5% + 1.5% = 3% total). 3% rate itself needs confirmation (CV-14). Effort: S-M.

**CA-20 [IA] interiors.html vs interior-gallery.html: two disconnected pages, the weaker one exposed.** Cross-link now, consolidate later; resolve with CA-5 labeling/replacement. Effort: S then M.

**CA-21 [CRO] No alternative contact channel.** Zero WhatsApp/chat presence despite an active WhatsApp Business number. Only add if staffed (Q6). Effort: S.

**CA-22 [CRO] No lead magnet anywhere.** Resources/blog pages capture nothing; an email-only "get all guides as a PDF" hook (Phase 6 alignment) costs near zero. Effort: S for capture, M for the PDF.

**CA-23 [Content] Eleven buyer questions the site never answers.** Build duration detail, what is included, draw/payment schedule, warranty coverage, change orders, who manages my build, first-meeting expectations, lot evaluation help, post-Ian flood/BFE realities for SWFL, CBS vs wood frame guidance, county-level cost differences. Feeds /process page (MP-3), FAQs, and the Phase 4 topic list. Warranty/payment specifics need Kevin input first.

### P3: polish

**CA-24** CGC number missing from index.html footer (present on about/financing). S.
**CA-25** Phone format inconsistency (tel:+1 vs tel:), calculator footer missing Terms link, "technology-driven" tagline variant on 2 pages. S.
**CA-26** Privacy/terms pages: add a small "Ready to build?" exit above the footer. S.

---

## Missing pages (only what makes sense)

**MP-1 `/contact` standalone page.** Same fields + webhook as the index form. Unblocks CA-4 for all 24 bouncing pages; consolidates analytics. Effort: S.
**MP-2 `/service-areas` hub.** Intro + 8 city cards + "don't see your county?" CTA. Captures statewide queries no current page targets; gives city pages a parent. Effort: S.
**MP-3 `/process` page.** Expand the homepage 4-step anchor into the 8 real steps with durations, responsibilities, first-meeting expectations, change-order and communication policy (answers most of CA-23). Becomes the source for the Phase 6 buyer-guide PDF. Effort: M (content from real practice; payment/warranty parts need Q3).
**MP-4 `/our-work` current-projects page (reduced scope, earlier than Phase 5).** 3 cards from active projects with real photos and milestones, labeled "Current Projects", no pricing. Highest-trust asset available right now for the 17 warm leads. Gated on photography + Kevin approval (Q5). Effort: M.

---

## Competitive snapshot (full detail in agent report)

| Dimension | BuilderK | ICI Homes | Cogdill | FL Lifestyle |
|---|---|---|---|---|
| Offer clarity above fold | Strong (tied best) | Strong | Strong | Weak |
| Proof: completed homes, tours, reviews | **Weakest of four** | Strongest | Moderate | Strong |
| Pricing transparency | **Only one publishing $/sqft + calculator** | Partial | None | None |
| Process/financing explanation | **Best** (milestone breakdowns) | Strong | Blog-level | Weak |
| Lead capture mechanics | **Best** (calculator, sticky CTA, referral) | Standard | Personal cell | Standard |
| Content depth / SEO | 2 posts; **not on page 1** | Deepest | Page 1, 9+ posts | Page 1, 9+ posts |
| Realtor program | **Only public 3% program** | Unconfirmed | None | None (404) |

Read: BuilderK has the best conversion *machinery* and the worst conversion *evidence*. Fix proof; protect and expose the machinery.

---

## Merged roadmap

Waves merge this audit (CA-x, MP-x) with the technical backlog (docs/AUDIT_FINDINGS.md, P-x) and defer to MARKETING_REVAMP_PLAN.md where it owns the work.

**Wave 0: Truth and safety (this week; gated on Q1-Q4 answers).**
Goal: nothing on the site is false or unverifiable.
Tasks: CA-1 testimonials decision + removal/attribution; CA-3 stat unification + career framing + warranty language; CA-11 financing softening; CA-7 pricing qualifier sitewide; CA-5 render/stock labels; CV-10 departed staff off About.
Difficulty: S-M. Dependency: Kevin's answers. Impact: removes FTC/trust risk from every ad landing page.

**Wave 1: Quick wins (1-2 days, no decisions needed).**
Goal: real proof reachable, lead context captured, paths unbroken.
Tasks: CA-2 nav + un-orphan gallery + real-photo badges; CA-9 canonical nav/footer sitewide; CA-8 referral exposure; CA-10/CA-4 hidden fields + webhook tags; AUDIT batches: P1-7 form feedback, P1-8 referral success, P1-6 timeline map, P1-5 duplicate pixels; CA-12 tel links + blog internal links; CA-16 CTA labels; CA-17 trust strip; CA-24/25/26 polish.
Impact: every lead tagged with origin; proof one click away.

**Wave 2: Conversion architecture (1-3 weeks).**
Goal: capture intent where it happens.
Tasks: MP-1 /contact + repoint 24 pages; CA-6 calculator inline capture; CA-15 plan-page copy + context CTAs + facade links; MP-2 service-areas hub; MP-3 process page; CA-20/CA-5 interiors consolidation; CA-14 city differentiation (ad cities first); CA-19 referral mechanics; CA-22 email capture on resources.
Dependency: MP-3 partially on Q3.

**Wave 3: Design system and accessibility polish.**
Owned by the existing technical backlog: AUDIT P1-9 to P1-15 (keyboard/ARIA/skip link/reduced motion), P2-8 emoji to Lucide, P2-9 CTA radius, P3 CSS token unification.

**Wave 4: Performance, SEO, technical hardening.**
Owned by the existing technical backlog: P0-1 image optimization (287MB), P2-1 shared CSS extraction, P2-3 hero video, CSP rollout (deferred from Batch 1), P1-16/17 OG images, P2-12/13 schema. New here: Google Business Profile setup + review widget once reviews exist; Houzz claim once real photos exist.

**Wave 5: Growth and proof engine (MARKETING_REVAMP_PLAN owns; site work supports).**
Review campaign (Phase 5), MP-4 our-work then full portfolio + case studies (Phase 2 photography), one real video walkthrough, named lender, blog cadence 2/month (Phase 4), WhatsApp channel if staffed, lead magnet PDF (Phase 6).

---

## Implementation checklist

Wave 0 (after answers):
- [ ] Remove or attribute all testimonials (CA-1)
- [ ] One true stat set sitewide; reframe career section; fix $250M label (CA-3)
- [ ] Warranty claims match confirmed terms or removed (CA-3)
- [ ] Soften 680+/0% down; add "not a lender" note (CA-11)
- [ ] Central FL qualifier on homepage pricing + 8 city JSON-LD (CA-7)
- [ ] "Architectural renders" / "Inspiration gallery" labels (CA-5)
- [ ] Remove departed staff from About (CV-10)

Wave 1:
- [ ] Canonical nav with Construction; one footer everywhere (CA-9)
- [ ] interior-gallery linked + in sitemap; real-photo badges (CA-2)
- [ ] Referral link sitewide + homepage mention (CA-8)
- [ ] Hidden fields source/UTM/city/plan + webhook tags; budget required (CA-10)
- [ ] Form feedback + referral success + timeline map + dup pixels (P1-5/6/7/8)
- [ ] about.html tel/mailto links; blog internal links; legal-page exits (CA-12, CA-26)
- [ ] CTA label standardization (CA-16); trust strip at form (CA-17); CGC in footer (CA-24)

Wave 2:
- [ ] /contact page; repoint all /#contact CTAs (MP-1)
- [ ] Calculator "email me my estimate" inline capture (CA-6)
- [ ] Unique plan highlights + plan-context CTAs + facade links (CA-15)
- [ ] /service-areas hub (MP-2); /process page (MP-3)
- [ ] City-page localization, ad cities first (CA-14)
- [ ] Referral terms note + autoresponse (CA-19); resources email capture (CA-22)

---

## Questions for Kevin (these change the roadmap)

1. **Testimonials (gates Wave 0):** are any of the named testimonials real, consented clients? Keep + fully attribute, or remove all now and backfill with real Google reviews?
2. **True numbers (gates Wave 0):** how many custom homes has Builders Knowledge Development Inc. itself completed? Which years figure do we use? OK to frame Mark's section explicitly as prior-career credentials? Keep or kill "100% completion record"?
3. **Warranty (gates Wave 0 + MP-3):** what warranty do you actually provide? (calculator currently promises "1-year builder warranty".) One-paragraph definition to publish, or remove claims?
4. **Pricing tiers:** confirm $150-180 / $180-220 / $220+ as current Central Florida ranges. Note: today's calculator audit found the floor sits well below your internal base rate; do we adjust numbers, or keep and qualify harder?
5. **Real assets:** are the real-*.jpg interior photos and the homepage video genuinely BuilderK projects? Greenlight a reduced "Current Projects" page using Sudhagar / Pinsa Fire / duplex photos?
6. **Channels:** is WhatsApp (+1 407 890-5341) staffed for buyer chats? May we name your lender on the financing page (needs their consent)?

---

## Decisions (Kevin, 2026-06-10)

1. **Testimonials: none exist.** All testimonial blocks are fabricated and come out sitewide. Proof rebuilt from real assets only (jobsite photos, license, leadership credentials). Real Google reviews backfill later (Phase 5).
2. **Numbers:** BuilderK is new to custom homes; experience belongs to the leadership team (Mark Jackson qualifier + Richard). Stat-bar wording options presented to Kevin; never company-track-record framing.
3. **Warranty:** 1-year builder warranty is the comfortable baseline. Published paragraph pending Kevin's pick of options.
4. **Pricing:** $150/sqft Central FL floor confirmed real (possible raise to $160 pending). New required exclusions everywhere pricing appears: government permit and impact fees billed at cost, and site work beyond standard slab-on-grade (land clearing, fill, tree removal, stem wall or elevated foundations) quoted separately. Calculator "Included in Every Build" list contradicts this today ("Permitting & engineering", "Site prep & foundation") and must be corrected.
5. **Real assets:** construction.html photos and real-*.jpg interiors confirmed real BuilderK jobs (badge + promote). Homepage hero video is AI-generated: must never be presented as real footage; replace/keep decision pending.
6. **Channels:** no WhatsApp buyer chat. Chatbot direction = GHL chat widget (Wave 2 candidate). Named-lender question still open.

## Not checked (consolidated)

Live form/Formspree submit behavior and autoresponses (needs browser test); Google Business Profile status; ICI Homes pages (403-blocked, search-supplemented); provenance of real-*.jpg, style-*.png, and house-video.mp4; mobile above-the-fold rendering; 5 of 8 city pages sampled by template inference; Formspree-to-GHL wiring (marketing plan Phase 1 flags it unverified).
