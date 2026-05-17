# BuilderK Marketing Revamp — 2026 Q2/Q3

**Plan owner:** Kevin Gallopp
**Created:** 2026-05-13
**Status:** Draft, awaiting Kevin sign-off

---

## 1. Strategic context

BuilderK has a strong foundation: a complete brand kit (BUILDERK wordmark, BK monogram, K-only icon, color tokens, typography), a deployed website at builderk.com with 28 pages including 8 city landing pages, GA4 + Google Ads + TikTok conversion tracking, and an active social presence on Instagram, TikTok, and Facebook as `@builderkinc`.

Three problems are slowing growth:

1. **Pipeline conversion is too slow.** 17 leads worth $13.55M+ are in the pipeline (Richard's note, 2026-05-05). They need sales enablement, social proof, and urgency to close.
2. **Top of funnel is leaking.** Blog content is stale (2 posts dated March 2026), Google Ads has been paused on billing since March, Apollo outreach has not been confirmed as active. The acquisition engine is idle.
3. **Authority signals are weak.** No visible reviews, no project gallery, no third-party endorsements, no thought-leadership cadence. A $200K-$700K custom home buyer needs more proof before they sign.

This plan attacks all three jobs in parallel.

---

## 2. Goals (90-day)

| # | Goal | Measurable |
|---|---|---|
| 1 | Close 8 of 17 pipeline leads | Signed contracts logged in BuilderK OS |
| 2 | Add 30 new qualified leads to pipeline | Calculator submissions + referral form + inbound contact form |
| 3 | Restart paid traffic | Google Ads campaign live, $1500/mo budget, conversion tracking validated |
| 4 | Build content authority | 8 new long-form posts + 1 case study live by 2026-08-15 |
| 5 | Establish review presence | 15+ Google reviews + Houzz profile activated |

---

## 3. Current state — what was inventoried

### Brand kit
- BUILDERK brand kit complete at `C:\Users\kevin\OneDrive\Documents\Codex\BuilderK-Brand-Kit\`
- Backed up to Google Drive folder `BuilderK Brand Kit`
- All required logo variations exist: wordmark on dark/light, BK monogram, K-only, favicons, social variants, email header banner, OG card

### Website (builderk-website repo)
- 28 HTML pages live on Vercel
- 8 city pages: orlando, tampa, miami, fort-myers, cape-coral, jacksonville, melbourne, ocala
- Feature pages: calculator, financing, construction, interiors, facades, resources, referral-program, interior-gallery
- 2 blog posts from 2026-03-07
- 6 social/promo HTML templates in `templates/` (stats-post, construction-tip, why-build-now, interior-showcase, referral-promo, story-template)
- Tracking: GA4 (S03X1HTEDN), Google Ads (AW-11388675250), TikTok Pixel (D6P0MRRC77UBOQFNQ5UG)
- Forms: Formspree (referral form at `formspree.io/f/mreybpyl`)
- Sitemap.xml: 24 URLs, robots.txt allows all
- Schema.org JSON-LD on blog, calculator, financing pages

### Social
- Instagram `@builderkinc` (credentials in hand)
- TikTok `@builderkinc`
- Facebook business page (Builderk Inc portfolio)
- WhatsApp Business `+1 407 890-5341` (BK monogram profile, set 2026-04-25)
- Cadence: unknown, presumed inconsistent

### Paid + outbound
- Google Ads account `544-466-9423` under kevin@builderk.com, Campaign ID `23660601595`
- Status as of 2026-03-24: paused on billing issue
- Apollo Professional trial under kevin@builderk.com — 25 Orlando realtors enriched, 5 emails sent in March, warmup not started

### Audit blind spots (Phase 1 will fix)
1. `index.html` is too large to read in one pass — hero, CTAs, sections need a dedicated review
2. City page content was not opened — uniqueness vs. duplicate-with-find-replace unknown
3. No Lighthouse / PageSpeed score
4. Image optimization status (webp/avif) unconfirmed
5. Meta Pixel (Facebook) presence not confirmed on site
6. Formspree → CRM (GHL) wiring not verified

---

## 4. Phases

### Phase 1 — Audit close-out + quick wins (Week 1, 2026-05-13 to 2026-05-20)

| Task | Owner | Notes |
|---|---|---|
| Run Lighthouse audit on index, calculator, top city pages | Kevin / dev | Capture LCP, CLS, TBT |
| Read full `index.html`, document hero/CTAs/sections | Kevin / dev | Identify any cut-points or above-the-fold issues |
| Audit all 8 city pages for unique copy, neighborhoods, FAQ | Kevin / dev | Flag duplicates for rewrite |
| Verify Formspree → GHL pipeline (does every form land in GHL?) | Kevin | Per memory: leads land in GHL, not BuilderK OS |
| Install Meta Pixel sitewide | Kevin / dev | Required for FB/IG retargeting later |
| Confirm SPF / DKIM / DMARC on builderk.com sender domains | Kevin | Cold outbound deliverability depends on this |
| Confirm `web@americasa.co` migration status (separate user, see today's task) | Kevin | Social media inbox needs a real owner |

### Phase 2 — Pipeline-close enablement (Week 1-2)

Goal: Help Sofia close the 17 warm leads faster.

| Task | Owner | Notes |
|---|---|---|
| Build 2 case studies (Pinsa Fire + Sudhagar in-progress) | Kevin + Sofia | Photos, scope, timeline, before/after |
| Photograph 1 in-progress and 1 recent completion site | Kevin | Drone + interior + exterior |
| Create a one-page sales sheet PDF (overview, process, pricing tiers, financing, warranty) | Kevin + Sofia | Send with every proposal |
| Set up a "Why BuilderK" deck (Canva or Slides) | Kevin | 8 slides max, sent post-call |
| Get 3 active clients to record short testimonial videos (60-90 sec each) | Sofia | Used on site + social |
| Build a Google Business Profile review request flow | Sofia | Auto-text after final inspection |

### Phase 3 — Top-of-funnel restart (Week 2-4)

Goal: Turn the acquisition engine back on.

| Task | Owner | Notes |
|---|---|---|
| Resolve Google Ads billing, relaunch primary campaign | Kevin | Confirmed paused as of 2026-03-24 |
| Add gtag conversion event to all Formspree submissions if not already | Dev | Currently the conversion is configured but the form fire may not be |
| Build a remarketing list (visitors who hit calculator but didn't submit) | Kevin | Both Google + Meta |
| Restart Apollo outreach: enable warmup, set up 3-email sequence | Kevin | Per March memo, was paused after 5 sends |
| Enrich Orlando + Tampa + Miami realtors (target 100 contacts) | Kevin / Sofia | $200K-$700K homes; realtors are the highest-quality referral channel |
| Launch Meta Ads test campaign ($500/mo, video + lead form) | Kevin | Use existing TikTok pixel learnings |

### Phase 4 — Content engine (Week 2-12, ongoing)

Goal: Authority and SEO.

| Task | Owner | Cadence |
|---|---|---|
| Editorial calendar: 2 long-form blog posts/month | Kevin + writer | First batch in by 2026-05-31 |
| Social cadence: IG/TikTok/FB 4 posts/week + 2 reels/week | Kevin + new web@ user | Mix: 1 educational, 1 jobsite, 1 client/social proof, 1 CTA |
| Topic backlog (first 12 posts): | | |
| - Florida hurricane code 2026: what custom home buyers must know | | |
| - VA Construction-to-Perm loans (relevant to Eli C., Sudhagar profile) | | |
| - CBS vs. wood frame in Florida: real cost difference | | |
| - How impact windows pay for themselves (insurance math) | | |
| - The "Build on your lot" advantage: 5 real BuilderK case studies | | |
| - One-time-close construction loans explained | | |
| - Miami-Dade lot purchase checklist | | |
| - Orlando vs Tampa vs Cape Coral: where to build in 2026 | | |
| - Choosing between custom and semi-custom (when each makes sense) | | |
| - Realistic build timeline: month-by-month with photos | | |
| - Permitting in Lee County: what we learned on Lewis St | | |
| - Custom home financing FAQ (15 questions) | | |
| Email newsletter (monthly to all leads + past inquiries) | Kevin | Use Mailchimp or Resend |
| YouTube channel launch: 1 long-form video / month | Kevin | Same content repurposed from blog |

### Phase 5 — Authority + social proof (Week 4-10)

| Task | Owner | Notes |
|---|---|---|
| Google Business Profile optimization (3 locations max) | Kevin | Orlando primary, claim secondary cities |
| Houzz Pro profile activation | Kevin | Existing invitation in inbox, declined twice |
| FHBA + GOBA member directory listings (already member) | Kevin | Confirm logo + link on each |
| BBB accreditation application | Kevin | Adds trust signal at the bottom of every page |
| Industry directory listings (HomeAdvisor, Angi, ImproveNet) | Sofia | Be selective — quality leads only |
| Project portfolio page on site (real photos, not stock) | Kevin / dev | After Phase 2 photography |
| Press outreach: 1 local trade pub story per quarter | Kevin | FHBA Buzz, GOBA newsletter |

### Phase 6 — Owned audience + retention (Week 8-12)

| Task | Owner | Notes |
|---|---|---|
| Lead magnet: "Florida Custom Home Buyer's Guide" PDF (20 pages) | Kevin + writer | Gated by email — feeds nurture |
| 6-email nurture sequence for calculator submissions | Kevin | Triggered by Formspree → CRM |
| Referral program redesign with tracked link + payout transparency | Kevin | Current page exists but conversion is unclear |
| Quarterly webinar: "Buying land + building in Florida" | Kevin + Richard | 45 min + Q&A, partner with a lender |

---

## 5. Owners + cadence

| Role | Who | Hours/week |
|---|---|---|
| Marketing lead | Kevin | 8h/wk strategic, decision making |
| Social media + community | New `web@americasa.co` user (hire/assign) | 15h/wk |
| Content writing (blog + email) | Contractor or assign | 10h/wk |
| Dev (site changes, tracking, pixel) | Existing dev resource | 5h/wk |
| Project photography | Outsourced or Kevin's phone+drone | 1 session every 6 weeks |
| Sales enablement (case studies, decks) | Sofia + Kevin | 4h/wk in Phase 2, then 1h/wk maintenance |

---

## 6. Budget (90-day estimate)

| Line | Monthly | Notes |
|---|---|---|
| Google Ads | $1,500 | Restart |
| Meta Ads | $500 | Test |
| Apollo (post-trial) | $99 | Professional plan if trial closes |
| Photographer | $400 | Avg, 1 session every 6 weeks |
| Content writer (4 posts) | $1,200 | $300/post freelance |
| Email platform (Mailchimp or Resend) | $50 | |
| Social media manager (15h/wk) | $1,800 | $30/hr contractor |
| Houzz Pro | $99 | If activated |
| **Monthly total** | **~$5,650** | |
| **90-day total** | **~$17,000** | |

---

## 7. Measurement

Weekly review (Monday morning):
- New calculator submissions (target: 10/wk by week 6)
- New referral form submissions (target: 2/wk by week 6)
- Google Ads CPL (target: under $80/qualified lead)
- Pipeline movement (leads to proposal, proposal to signed)
- Social: follower growth + engagement rate
- Reviews: net new each week

Dashboard:
- GA4 weekly email report
- Google Ads weekly summary
- Apollo weekly send/reply stats
- Simple Notion or Sheets page that rolls these up

---

## 8. Immediate next steps (this week)

1. Kevin sign-off on this plan or push back
2. Resolve Google Ads billing (Phase 3 task #1, gates the whole acquisition restart)
3. Migrate `web@americasa.co` to a real user (today's separate admin task)
4. Lighthouse + index.html review (Phase 1)
5. Schedule project photography for first 2 case studies (Phase 2)
6. Reach out to first 3 clients for testimonial videos (Phase 2)

---

## 9. Open questions for Kevin

1. **Who is the social media owner?** The plan assumes the new `web@americasa.co` user is a real person handling 15h/wk of social. If that's not the plan, this needs reshaping.
2. **Content writer:** in-house, contractor, or do you want me to draft the first batch?
3. **Budget:** is $5,650/mo realistic for the next 90 days? If not, which lines do we cut?
4. **Photography:** existing in-progress sites (Sudhagar, Pinsa Fire, T.Land) are eligible — anything off-limits?
5. **Testimonials:** which 3 clients would say yes to a 90-second video?
6. **Tools:** Mailchimp, Resend, or other for email? Buffer/Later/Meta Suite for social scheduling?
