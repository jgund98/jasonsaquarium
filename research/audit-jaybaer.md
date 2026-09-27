# Jay Baer style audit: Jason's Aquarium Service

Read-only review of the source on 2026-09-27. Lens: is the site useful before it sells (Youtility), what will a customer repeat to a friend (talk trigger), does it hug the hater, and does it set expectations one person can keep.

## 1. Top 10 friction points and missed trust moments (ranked)

1. **Leads can vanish while the customer sees "Got it."** `app/api/lead/route.ts` returns HTTP 200 with `{ok:false, skipped:true}` when `BREVO_API_KEY` or `LEAD_TO_EMAIL` is unset, and `components/QuoteForm.tsx` only checks `res.ok`, so the success screen shows anyway. There is no `.env.local` in the project and a live POST to `/api/lead` on :3590 returned `skipped:true`. Change: in `route.ts` return `status: 502` when `!res.ok`; in `QuoteForm.tsx` parse the JSON and treat `ok:false` as an error. Also `site.leadEmail` in `lib/site.ts` is never read by `lib/lead-email.ts`; wire it as the fallback for `LEAD_TO_EMAIL` so the form works the day it deploys.

2. **The useful content is orphaned.** Six guides at `/guides` and three finished tools at `/tools` (`components/tools/*`) have zero links from `components/Header.tsx`, `components/Footer.tsx`, `components/MobileDock.tsx` or `app/sitemap.ts`. This is the Youtility of the site and nobody can find it. Change: in the `Header.tsx` `nav`, replace the "Areas" entry with `{ href: "/tools", label: "Free Tools" }` and add `{ href: "/guides", label: "Guides" }`; add a "Help yourself" column in `Footer.tsx` listing all nine; add both routes to `sitemap.ts`.

3. **Emergency path dead-ends in a quote form.** `QuoteForm.tsx` offers "Emergency" and "Something is wrong with my tank" chips, then walks the person through two more steps to a screen that says "usually the same day." Change: when `need` includes either chip, render a red callout at the top of step 1 and step 2: "If fish are in danger do not finish this form. Call Jason now." with `site.phoneHref`, plus a link to `/guides/why-are-my-fish-dying`. Give the success state an emergency variant (see section 2).

4. **Text links start blank.** Every `sms:` link in `Header.tsx`, `MobileDock.tsx`, `OwnerPopup.tsx`, `CtaBand.tsx`, `Footer.tsx`, `QuoteForm.tsx` and `app/contact/page.tsx` opens an empty message. The tools already prefill (`?&body=`), so the pattern exists. Change: add `smsPrefill(text)` helper in `lib/site.ts` and use bodies like "Hi Jason, I have a [saltwater/freshwater] tank in [town] and want a quote. Photo coming." The customer sends a text Jason can answer in one reply, and "he answered my text in one reply" is the story they tell.

5. **The owner popup interrupts reading.** `components/OwnerPopup.tsx` fires at 10 seconds or one viewport of scroll on every route except `/contact`, including guides where the person is mid-paragraph. Change: skip when `pathname.startsWith("/guides")` or `"/tools"`; drop the timer and fire on scroll only; render as a bottom-right card on desktop rather than a full-screen `aria-modal`. Copy in section 2.

6. **No "prefer a call or a text" choice.** The form promises "Jason will text you back." Many of his older clients and office managers want a call. Change: in `QuoteForm.tsx` step 3 add a two-chip toggle "Text me / Call me" and pass it as `fields["Reach me by"]`. Adjust the success headline to match (section 2).

7. **Reef is preselected.** `QuoteForm.tsx` sets `useState("reef")`, so anyone who taps Next without choosing sends a wrong answer. Change: default to `""` and show a gentle inline nudge if empty, or default to `"unsure"`.

8. **"Same day" is stated seven ways.** `QuoteForm.tsx`, `CtaBand.tsx`, `app/contact/page.tsx`, `lib/faqs.ts`, `lib/guides.ts`, `lib/services.ts` and `app/services/[slug]/page.tsx` all say "usually the same day." One person on a route day may not. Change: confirm the phrase with Jason. If he stands by it, use one `site.replyExpectation` string everywhere. If not, "He reads it himself and texts back from his own phone" with no clock.

9. **Only one owner reply is shown.** `lib/reviews.ts` has a `reply` on Zachary's review only, so `app/reviews/page.tsx` shows Jason answering one customer out of seven. Hug your haters means answer everyone, including the happy ones. Change (off-site first): Jason replies to the remaining six on Google, then the real replies are added to `reviews.ts` verbatim. Do not write them for him.

10. **Buttons promise what the destination does not deliver.** `components/home/WhyHire.tsx` "Book a first visit" and `components/home/AreasBand.tsx` "Check my address" both land on the quote form with no booking and no address check. Change: relabel to "Get a first visit quote" and "See if Jason covers you" (link `/service-areas`). Also in `WhyHire.tsx`, "No contract to start, no minimum" is a policy claim; confirm with Jason or cut.

## 2. What to say so expectations are right

**Form success state** (`QuoteForm.tsx`, replace the current headline and paragraph):

- Headline: "Got it [Name]. Jason reads this himself."
- Body: "He will [text / call] you from (516) 528-7824. Save the number so you know it is him. If you have a photo of the whole tank and one of the equipment, text it now and he can answer with a real price instead of a range."
- Buttons: "Text Jason a photo" (prefilled sms) and the phone number.
- Emergency variant when the Emergency chip was tapped: headline "Do not wait on this form." Body: "Call Jason now. While you wait: stop feeding, keep pumps running if the water level allows, turn the lights off." Single button: Call.

**Owner popup** (`OwnerPopup.tsx`):

- Title: "Hi, I'm Jason."
- Body: "I am the only person here. I clean, install and troubleshoot tanks across Palm Beach County and north Broward, and I answer my own phone. Text me a photo of your tank and the size. I will tell you what it needs."
- Buttons: "Text a photo to Jason" (prefilled), "Get a quote", and keep "No thanks, just looking around."
- Drop the star rating from the popup. It is already in the hero, footer, contact card and reviews section.

**Emergency path** (contact sidebar in `app/contact/page.tsx`, the `QuoteForm.tsx` callout, the "Problems and emergencies" FAQ group). Keep to what he has actually said: he answers any hour, he has replaced a tank the same day before, and he will say honestly what he can do and when. No arrival times. Wording: "Call. Do not text and wait. Jason picks up any hour for a tank in trouble and will tell you straight what he can do tonight and what has to wait for daylight. Farther towns like Jupiter take longer and he will say so."

## 3. Highest talk-trigger tool: the Water Test Decoder

The decoder is the one people will repeat at dinner: "I typed my numbers into this guy's site and he texted me back about my alkalinity." It helps before any sale, it is personal, and it matches the public review about Jason troubleshooting levels (Karol Abercrombie). The hurricane checklist is second: seasonal, printable, shareable in neighborhood groups June through November. The Schedule Planner is weakest; it sells a cadence, and `lib/faqs.ts` says Jason recommends a schedule only after seeing the tank.

Framing for the decoder:

- Name it "Read your own water" not "Water Test Decoder." Headline on `/tools`: "Type in your test kit numbers and get plain English."
- Keep the disclaimer already in `WaterTestDecoder.tsx` line 365 (a guide, not a diagnosis).
- The "Text these results to Jason" button is the whole talk trigger. Under it, one line: "He reads every one and replies from his own phone." Nothing about timing.
- Link it from the header nav, the "Why is my aquarium water cloudy?" FAQ, `WhyHire.tsx` next to "Guessing is the expensive part," and the emergency callout.
- Every decoder text Jason answers is a chance to send the Google review link already in `components/home/Reviews.tsx`.

## 4. What to cut because it is noise

- `components/home/VisitStory.tsx`: the "62% read" counter and "All parameters in range. Tank is stable." Fake numbers on fake tubes read as a lab result. Keep the tubes, label them "Example reef test," drop the percentage and verdict.
- The star rating appears in `Hero.tsx`, `OwnerPopup.tsx`, `Footer.tsx`, `app/contact/page.tsx` and `Reviews.tsx`. Five times signals nervousness. Keep hero, reviews section and footer.
- `Hero.tsx` `TownStrip` marquee: 22 towns scrolling under the fold repeats `AreasBand.tsx` and the footer. Cut it and the hero gets a few pixels of calm.
- "Service 01 / 02 / 03" eyebrows in `lib/services.ts`. Agency styling that means nothing to a fish owner.
- `lib/guides.ts` cost guide, second paragraph: "companies publish monthly plans from a couple hundred dollars." That is a market stat with no source. Cut it or cite the competitor research file.
- `lib/reviews.ts` says "nine" reviews and `lib/schema.tsx` publishes `reviewCount: 9` while the file holds seven. Add the two missing reviews verbatim or leave the count out of schema.

## 5. Verdict

This is already better than most one-person service sites: the copy sounds like a person, every quote is real, the visit routine is explained without upsell, and the emergency FAQs give real instructions. The failures are plumbing and placement, not personality. Leads can disappear behind a green checkmark, the useful tools and guides are invisible from the navigation, the emergency chip leads into a three-step form, and the text buttons open an empty message. Fix those four, settle with Jason whether "usually the same day" is a promise he wants on his back, and put "Read your own water" one tap from the header. Then the site helps first, gives people a specific thing to say about Jason, and never promises what one man with a van cannot keep.
