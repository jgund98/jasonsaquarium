# SEO Audit: Jason's Aquarium Service (pre-launch)

Audited 2026-09-27 against the rendered dev build (localhost:3590) and source. Benchmark: aquaholicspb.com (25 URLs, 15 PBC city pages, published pricing, zero JSON-LD, no meta descriptions, dead blog). Read-only audit; nothing was edited.

Snapshot: 43 sitemap URLs, all 200. 22 city pages (16 PBC + 6 Broward) with hand-written leads (35 to 53 words each) and unique angles. 6 guides. 28-question FAQ. Sitewide LocalBusiness + per-page Breadcrumb/Service/FAQPage/Article JSON-LD. robots.txt allows every AI crawler. llms.txt present. Home 2,343 words, cleaning page 888, Boca city 828, Parkland 649, Manalapan 547.

## 1. Technical issues (file, fix)

1. **Surname leaks into every page.** `lib/site.ts` line 13 `description` contains "owned by Jason Wasloff". It renders as the meta description, og:description, twitter description and the LocalBusiness `description` on all 43 pages (10 occurrences on the home HTML). Fix: rewrite to "...owner-operated by Jason. Jason cleans, designs, installs and assesses..." The Michael Zapin review in `lib/reviews.ts` line 36 also opens with the full name; it is verbatim and lives on /reviews and the home Reviews card (line-clamp-3 shows the first line). Owner decision: keep verbatim on /reviews only, and swap the home card to a review that does not open with the surname.

2. **Titles truncate at 100+ characters.** The layout template `%s | Jason's Aquarium Service` adds 27 chars. Measured: city pages 101, /reviews 101, /services 102, /service-areas 86, cleaning page 83. Two pages repeat the brand twice (/reviews, /about), the exact flaw the research flags on Aquaholic. Fix: use `title: { absolute: "..." }` in `app/aquarium-service/[city]/page.tsx`, `app/reviews/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/service-areas/page.tsx` with the strings in section 2.

3. **City meta descriptions cut mid-sentence.** `app/aquarium-service/[city]/page.tsx` line 28 slices `c.lead` at 150 chars: Boca renders "Jason services saltwater reef. Call or text..." and Parkland "MiraLago,. Call or text...". Fix: add a `meta: string` field to `City` in `lib/cities.ts` (one hand-written 140-char sentence per city) and use it directly.

4. **Sitemap lastmod is always "now".** `app/sitemap.ts` sets `lastModified: now` on 37 of 43 URLs, so Google will learn to ignore lastmod. Fix: a `const BUILD = new Date("2026-09-27")` constant, bumped when content changes, or per-entry dates like the guides already have.

5. **22 phantom LocalBusiness entities.** Each city page emits `@type: LocalBusiness` named "Jason's Aquarium Service LLC in Boca Raton" with `parentOrganization`. That reads as 22 fake branch locations of a one-man mobile business. Fix in `app/aquarium-service/[city]/page.tsx` lines 52 to 61: change to `@type: "Service"`, `name: "Aquarium service in {city}"`, `provider: { "@id": site.url + "/#business" }`, keep `areaServed`.

6. **Self-serving AggregateRating on all pages.** `lib/schema.tsx` lines 40 to 46 put `aggregateRating` (with `reviewCount: 9`) in the sitewide LocalBusiness. Google's policy excludes LocalBusiness/Organization self-reported ratings from rich results, and it publishes the review count the owner does not want highlighted. Fix: remove `aggregateRating` from `localBusinessJsonLd()`. If you want rating markup anywhere, put individual `Review` objects (author, datePublished, reviewRating, reviewBody) on /reviews only, sourced from `lib/reviews.ts`.

7. **Home canonical vs sitemap mismatch.** Canonical renders `https://jasonsaquariumservice.com` (no slash); sitemap lists `.../`. Harmless for root but make `app/page.tsx` canonical `"/"` resolve consistently by checking `next.config.ts` `trailingSlash` and picking one form for `site.url` usage.

8. **Modal popup on every page.** `components/OwnerPopup.tsx` fires at 10 s or 1.05 viewports on all routes, mobile included. Delayed modals are lower risk than on-load interstitials, but on a search landing on mobile this is still the pattern Google's intrusive-interstitial guidance targets and it costs INP. Fix: skip when `matchMedia("(max-width: 767px)")` matches, or render as a bottom slide-in bar (MobileDock already owns that space).

9. **Hero media weight.** `public/videos` totals 20 MB; specialty PageHero autoplays 1.9 to 4.1 MB mp4s (`preload="metadata"` is ignored once `autoPlay` is set). Fix: re-encode to 720p, under 1.5 MB, 6 to 8 s loops; mount `<video>` only after an IntersectionObserver fires. `ReefCanvas` on the home hero already respects reduced motion, caps DPR at 1.5 and pauses when hidden, so LCP (text) is fine; watch TBT on low-end Android in PageSpeed after deploy.

10. **/aquariums hub 404s** while `/aquariums/*` pages exist and breadcrumb to /services. Either add a thin `app/aquariums/page.tsx` that redirects to `/services#by-type`, or leave it out of all link paths (currently nothing links to it, so this is a nicety).

11. **robots.txt `Host:` directive** (`app/robots.ts` line 19) is Yandex-only. Harmless; remove for cleanliness.

12. **No email in schema, no sameAs beyond Google Maps.** Add `email` and each profile URL to `lib/site.ts` as they are created (Bing Places, Yelp, Facebook Page, Apple Business Connect, Nextdoor, Thumbtack) and map them into `sameAs`.

## 2. Title / meta / H1 by page type (exact strings)

No em dashes, no commas in H1s, "Jason" only.

**Home** (`app/layout.tsx` default title; `components/Hero.tsx` H1)
- Title: `Aquarium Service in Boca Raton & Palm Beach County | Jason's Aquarium Service`
- Meta: `Mobile aquarium cleaning, maintenance, installation and assessments for saltwater, reef, freshwater and pond systems. Owner-operated by Jason from west Boca Raton. Call or text (516) 528-7824.`
- H1: keep the brand line as a visual headline but make the H1 `Aquarium service in Boca Raton and Palm Beach County by the owner who answers`. Current H1 "Palm Beach's finest aquariums have one thing in common" has zero query terms.

**Service pages** (`app/services/[slug]/page.tsx`)
- Cleaning title (absolute): `Aquarium Cleaning & Maintenance in Boca Raton FL | Jason's Aquarium Service`
- Cleaning H1: `Aquarium cleaning and maintenance in Boca Raton and Palm Beach County`
- Cleaning meta: `Weekly, bi-weekly or monthly fish tank cleaning and aquarium maintenance for reef, saltwater, freshwater and planted tanks in Boca Raton, Delray Beach, Parkland and across Palm Beach County. Owner-operated by Jason.`
- Install title: `Custom Aquarium Design & Installation in Palm Beach County | Jason's Aquarium Service`; H1: `Custom aquarium design and installation in Boca Raton and Palm Beach County`
- Assessment title: `Aquarium Assessments & Troubleshooting in Palm Beach County | Jason's Aquarium Service`; H1: `Aquarium assessments and troubleshooting in Palm Beach County`

**City pages** (`app/aquarium-service/[city]/page.tsx`)
- Title (absolute): `Aquarium Service in {City} FL | Jason's Aquarium Service` (58 chars for Parkland; exact-match to the query that Aquaholic wins with)
- H1: `Aquarium cleaning and maintenance in {City}` (puts the money keyword in the H1 while the title owns "aquarium service")
- Meta: hand-written per city, pattern: `Aquarium cleaning, maintenance and installation in Parkland including Heron Bay, MiraLago and Parkland Golf and Country Club. Jason is fifteen minutes away in west Boca. Call or text (516) 528-7824.`

**Specialty pages** (`app/aquariums/[slug]/page.tsx`)
- Reef title: `Saltwater & Reef Tank Service in Boca Raton FL | Jason's Aquarium Service`; H1: `Saltwater and reef aquarium service in Boca Raton and Palm Beach County`
- Freshwater title: `Freshwater & Planted Aquarium Service in Palm Beach County | Jason's Aquarium Service`
- Ponds title: `Koi Pond Cleaning & Maintenance in Palm Beach County | Jason's Aquarium Service`; H1: `Koi pond and water garden service in Boca Raton and Wellington`

**Hubs and utility pages**
- /services title (absolute): `Aquarium Services in Palm Beach County FL | Jason's Aquarium Service`; H1: `Aquarium services in Palm Beach County from one person who answers`
- /service-areas: `Aquarium Service Areas in Palm Beach & Broward County | Jason's Aquarium Service`; H1: `Aquarium service areas across Palm Beach County and north Broward`
- /faq: `Aquarium Service FAQ for Palm Beach County | Jason's Aquarium Service`; H1: `Aquarium service questions answered for Palm Beach County`
- /guides: `Aquarium Care Guides for Palm Beach County | Jason's Aquarium Service`; H1: `Aquarium guides for Palm Beach County tank owners`
- /reviews (absolute): `Reviews of Jason's Aquarium Service in Palm Beach County`; H1: `What Palm Beach County clients say about Jason`
- /about (absolute): `About Jason | Owner of Jason's Aquarium Service in Boca Raton`; H1: `Meet Jason the owner and only technician`

## 3. Keyword gaps vs research vocabulary

Terms with zero occurrences across all copy, and where each belongs:

| Missing term | Put it here |
|---|---|
| saltwater aquarium service, reef tank maintenance, coral care | `specialties[0]` intro and H1 in `lib/services.ts`; "coral care" is in `knowsAbout` only |
| emergency aquarium service, 24 hour aquarium service, aquarium repair, tank leaking/reseal | **New page** `/services/emergency-aquarium-service` (Aquaholic has one; Jason has two real emergency-replacement reviews to anchor it) |
| aquarium relocation, aquarium moving, move a fish tank | New page or a dedicated section + FAQ on the install page; currently one FAQ line |
| commercial aquarium service, office aquarium maintenance, dental/medical office | An "Office and lobby aquariums" section on the cleaning page plus a Boca/WPB city FAQ; "dental" appears nowhere despite medical offices being named |
| mobile aquarium service, in-home aquarium service, aquarium technician | Home hero lede and the footer entity line (llms.txt has "mobile aquarium" only) |
| aquarium sitting, vacation fish feeding | FAQ already has "away for the summer"; add the literal phrase and a bullet on the cleaning page (Ocean World's niche, easy win) |
| licensed, insured | About page and footer entity block (confirm facts with Jason first) |
| algae removal, aiptasia, cyano, quarantine, clean-up crew, Apex controller | Reef specialty bullets and a reef FAQ; these are the words hobbyists type |
| fish tank cleaning cost, aquarium service prices, affordable | Cost guide H2s and the maintenance FAQ; "fish tank" phrasing appears 5 times vs "aquarium" hundreds |
| aquarium health check, tank inspection, second opinion | Assessment page H2 and title |
| turtle tank, goldfish tank cleaning, betta | Freshwater specialty bullets (betta appears 3 times, turtle zero) |

Also: the cleaning page H1 says Boca Raton while its title says Palm Beach County; align per section 2. Only 1 use of "fish tank cleaner"/"aquarium cleaner" sitewide; add one natural sentence each to the cleaning page and the "who cleans fish tanks near me" FAQ.

## 4. Internal linking and hub-spoke

- **Guides are orphaned.** Zero links to `/guides` or any guide from home, service pages, city pages, FAQ, header nav or footer. Fix: add "Guides" to the footer Company column (`components/Footer.tsx`) and to the header nav (`components/Header.tsx` nav array). Link the cost guide from the maintenance FAQ answer and the CtaBand on the cleaning page; the hurricane guide from every city page FAQ block; the "how to choose" guide from /reviews and the home Reviews section; the tap-water guide from the Boca and West Boca city pages.
- **Service pages list 12 area names as plain text** (`app/services/[slug]/page.tsx` "Serving" card). Make the first 6 real links with descriptive anchors ("aquarium maintenance in Boca Raton", "...in Parkland").
- **City pages link to all 6 service pages with generic anchors.** Keep, but make the "Services available in {city}" anchors contextual: `Aquarium cleaning in {city}` etc. to pass city relevance to the service pages.
- **FAQ page is a dead end.** Its answers never link out. Add inline links from the cost answer to `/guides/aquarium-maintenance-cost-palm-beach-county`, the leak/crack answer to the install page (or the new emergency page), and the "where are you located" answer to `/service-areas`.
- Footer already links all 22 cities and 6 services on every page (39 internal links per page). That is enough; do not add more footer links.

## 5. Schema fixes

1. Remove `aggregateRating` from the sitewide LocalBusiness (`lib/schema.tsx` 40 to 46). Add `Review` items only on /reviews.
2. Convert per-city LocalBusiness to `Service` with `provider @id` (section 1, item 5).
3. Add to `localBusinessJsonLd()`: `email`, `foundingDate: "2021"`, `address.postalCode` (33428 or 33498 for west Boca), `areaServed` as `City` objects with `containedInPlace` (County) so Broward towns are distinguishable, `serviceType` array from `searchVocabulary`, and `hasMap: site.googleMapsUrl`.
4. Strip the surname from `description` (inherits from `lib/site.ts`).
5. Add `Offer`-level `areaServed` and `description` to each `hasOfferCatalog` item so the catalog is not just names.
6. Guides `Article`: add `author.url: site.url + "/about"` and set `dateModified` independently of `datePublished` when edited.
7. Keep FAQPage everywhere (no rich result for local businesses since 2023, but AI engines read it). Ensure the same question text is not repeated on more than two URLs; home FAQs are a subset of /faq today, which is fine.
8. `openingHoursSpecification` says 00:00 to 23:59 seven days. Match the GBP hours exactly or the two will conflict.

## 6. On-site AI-search recommendations

- Add a one-line **entity block** to the footer above the copyright: "Jason's Aquarium Service LLC. Owner-operated by Jason since 2021. Based in west Boca Raton FL. (516) 528-7824. Not affiliated with Jason's Aquatics in Davie." The disambiguation string already exists in `lib/site.ts` but only renders in the FAQ.
- Every city lead is already a quotable 35 to 53 word capsule. Do the same on the three service pages: replace the current `intro` with a first sentence that literally states "Jason's Aquarium Service provides {service} in Boca Raton and Palm Beach County for..." before the brand-voice copy.
- Publish real **price ranges** once Jason supplies them (do not invent). The cost guide already explains drivers; a "typical range by tank size" table on that page and on the cleaning page is the single biggest content gap vs Aquaholic and the #1 AI query type.
- Add a **"How to choose" comparison table** to the existing guide (same-tech-every-visit, tests water, brings matched saltwater, emergency line) since engines cite list/guide pages over sales pages.
- Add the 516 area-code explanation in the FAQ ("Jason's cell is a 516 number; he is local to Boca since 2015") or move to a 561 forwarding number before citations propagate.
- Add `humans.txt` and a Sunbiz `sameAs` URL. llms.txt is present; do not expect lift from it.
- Real photos of Jason at work with alt text naming city and service; today the site has 3 real work photos and the rest is stock.

## 7. Ranked top-10 actions

1. Fix `site.description` surname leak (lib/site.ts) and swap the home review card.
2. Set absolute titles per section 2; fix city meta descriptions with a hand-written `meta` field.
3. Remove sitewide `aggregateRating`; convert city LocalBusiness to Service.
4. Link Guides from header, footer, FAQ answers, service pages and city pages.
5. Put keywords in the home and hub H1s (section 2).
6. Build `/services/emergency-aquarium-service` (24-hour, leaks, cracked tank replacement, power outage) anchored by the two real emergency reviews.
7. Get real price ranges from Jason and publish them on the cost guide and cleaning page.
8. Add missing vocabulary (section 3) to the reef, freshwater and cleaning pages; add office/commercial and aquarium-sitting sections.
9. Disable OwnerPopup on mobile; compress hero videos under 1.5 MB.
10. Fix sitemap lastmod, add email/sameAs/postalCode/foundingDate to schema, footer entity block.

## 8. Verdict

On-site, this already beats Aquaholic: 43 indexable URLs vs 25, unique city copy vs templates, six Broward pages they do not have, full JSON-LD vs none, meta descriptions on every page, a live FAQ and guides section, AI crawlers allowed, and a base in west Boca that wins proximity for Boca, Delray and Parkland "near me" queries. After the section 1 and 2 fixes there is nothing on-page Aquaholic does better except one thing: published prices. That gap alone will keep them winning "cost" queries and AI cost answers until Jason supplies ranges.

What the site cannot fix: Aquaholic ranks #1 on a GBP with claimed 200+ reviews and six years of category history. Jason has 9 reviews and zero citations for his phone number anywhere on the web. The site will get him into the top 3 organic for Boca/Parkland/Delray city queries within a few months of indexing; the map pack (where "aquarium service near me" is actually decided) depends on GBP category set to Aquarium service, service-area cities set, review velocity to 30+, and Bing Places, Yelp, Facebook Page and Apple listings with identical NAP. Without that off-site work, expect strong organic and a weak pack; with it, Jason should take the pack for Boca and everything south of Boynton within six months.
