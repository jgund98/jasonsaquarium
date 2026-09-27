# Jason's Aquarium Service: build handoff

Built 2026-09-27. Next.js 16 + Tailwind 4 + TypeScript.

- Repo: https://github.com/jgund98/jasonsaquarium (private, branch `main`)
- Live preview: https://jasonsaquarium.vercel.app (Vercel project `jasonsaquarium`, deployed with `vercel --prod` from the project folder; the project is also linked to the GitHub repo)
- Custom domain not yet attached; `site.url` in `lib/site.ts` assumes jasonsaquarium.epicdevsolutions.com
- Vercel pnpm quirk: build-script approvals live in `pnpm-workspace.yaml` (`allowBuilds` + `onlyBuiltDependencies` + `strictDepBuilds: false`); without them Vercel's pnpm fails the install step. Client-facing notes are in CLIENT-HANDOFF.md.

- Dev: `pnpm dev` on http://localhost:3590 (launch name `jasons-dev`)
- Prod: `npx next build` then `pnpm start` on http://localhost:3591 (launch name `jasons-prod`)
- Domain assumed in code: jasonsaquarium.epicdevsolutions.com (change `site.url` in `lib/site.ts` if different)

## What is in it

49 URLs, all static: home, 4 service pages (cleaning/maintenance, design/install, assessments, emergency), 3 specialty pages (reef, freshwater/planted, ponds), 22 city pages with hand-written local copy and their own FAQs, our work, about, reviews, FAQ (28 questions), 6 guides, 4 free tools, contact with a 3-step quote form, sitemap, robots, llms.txt, OG image, favicon.

Signature moments: the living reef hero (schools, cursor light, tap to feed, parallax, swipe and tilt on phones), the 12-week neglect slider, the scrolling water-test rack, the algae wipe on the maintenance page, and the four tools (water test decoder, tank volume calculator, schedule planner, hurricane checklist), each ending in a prefilled text to Jason.

Every business fact lives in `lib/site.ts`. Copy for services, cities, FAQs and guides lives in `lib/*.ts`.

## Before going live (Jordan)

1. Set `BREVO_API_KEY` in Vercel. Recipient defaults to jgundyt@gmail.com in `lib/lead-email.ts`; change to Jason's inbox or set `LEAD_TO_EMAIL`. Until the key exists the form shows an error with the phone number instead of a false success.
2. Confirm with Jason: "usually the same day" reply promise (used on the form and CTAs), "no contract, no minimum" (home), and whether he wants pricing published. Aquaholic publishes prices and it is the one thing they have that we do not.
3. Ask Jason for a photo of himself (About page and corner card use the fish mark for now) and for 10 to 15 seconds of phone video per visit. The only real photos are the two usable ones from his Google listing; the other two uploads there are junk phone screenshots and he should delete them.
4. The 516 phone reads as out of area to Google and to people. A 561 number forwarding to his cell would help the map pack.
5. Sensitive: see `research/competitors-and-seo.md` section 6. The site uses first name only everywhere and the surname appears nowhere in rendered HTML. Decide whether to raise it with him.

## Off-site SEO the site cannot do (Jason or Jordan)

Google Business Profile category "Aquarium service" with the service area set to the 22 towns, review velocity, Bing Places (this is what ChatGPT reads), Yelp, Facebook Page, Apple Business Connect, Nextdoor, Thumbtack, BBB, with identical name and phone everywhere. Full checklist in `research/competitors-and-seo.md` section 5 and the three audits in `research/audit-*.md`.

## Jordan's standing rules on this site

- No home base or "based in" anywhere. Jason serves Palm Beach County and north Broward; no drive-time minutes, no review counts.
- No stretched empty cards to fill a column. Balance columns with real content or a photo; never pin (sticky) a column.
- No decorative fish blobs or watermarks. Brand shows through the wordmark, fish bullets and the brand band strips.
- Real, vibrant reef photography blended into the hero is welcome; the vector scene and schools stay on top.

## Gotchas learned

- Never put a canonical in the root layout; every page sets its own.
- Custom `.btn` classes must live in `@layer components` or Tailwind's `hidden` will not beat them.
- Any `overflow-hidden` ancestor kills `position: sticky`. The shorter column in a two-column grid gets the sticky, never the taller one.
- The reef canvas draws far fish on a back layer and near fish on a front layer above the headline on desktop; on phones everything stays behind the text.
- `pnpm build` runs a dependency check that fails on ignored build scripts; `pnpm-workspace.yaml` lists sharp, puppeteer and unrs-resolver in `onlyBuiltDependencies`.
- Lenis fights Next's scroll reset on navigation; `SmoothScroll.tsx` scrolls to top on every route change.
