# GaryVee Audit: Jason's Aquarium Service

Read-only review of the source and the rendered homepage on 2026-09-27. Lens: attention, authenticity, mom-and-pop humanity, proof, urgency, and whether every screen turns into a call or a text to (516) 528-7824. All constraints respected: no em dashes, no commas in headlines, no invented facts, first name only, real review text only.

Short version: the writing is better than 95 percent of local-service sites. The bones convert. What is missing is Jason. There is not one photo of the man whose name is the brand, one real tank is recycled on every page, and the one truly human CTA on the site (text him a photo) is buried under a generic "Get a Free Quote."

## 1. Ten changes ranked by impact

**1. Put Jason's face on the site. Everywhere the copy says "Hi, I'm Jason" there is a fish icon or a stock blue tang.**
Files: `components/OwnerPopup.tsx` (FishMark avatar), `app/about/page.tsx` (PageHero image `/images/stock/blue-tang-sand.jpg`), `components/Hero.tsx`.
Change: one phone photo of Jason at a client tank, sleeves wet, replaces the About hero image and the popup avatar. A second photo of him with a client (with permission) goes in the home Reviews section header. Not a headshot. Him working. Every competitor in the research notes has zero real people on their About page; this alone separates him.

**2. Make "Text Jason a photo of your tank" the primary CTA site-wide. "Get a Free Quote" is what a franchise says.**
Files: `components/Hero.tsx` line ~93 (`Get a Free Quote`), `components/home/CtaBand.tsx` (button order), `components/MobileDock.tsx` (Get a Quote gets flex 1.4, Text gets 1), `components/OwnerPopup.tsx` (`Get a Free Quote`).
Change: Primary coral button becomes `Text Jason a Photo` (href `site.smsHref`), secondary is the phone, tertiary is `Or fill out the form`. In MobileDock swap the widths so Text is the wide coral button. The form is fine for desktop; on a phone a one-man business wins on the text thread, and this copy already knows that (it says so on the contact page sidebar and every service aside).

**3. Kill the full name on the homepage. The Zapin review prints "Jason Wasloff (Jason's Aquarium Service LLC)" in the first visible line.**
File: `components/home/Reviews.tsx` line clamping `r.text`; data in `lib/reviews.ts`.
Change: add an optional `excerpt` field to the Review type and for Zapin start the visible excerpt at "It's much more of a lifestyle for Jason than it is a hobby." Still verbatim, still public, just a later sentence. Given the SERP findings in Section 6 of the research notes, the homepage should never be the page that pairs his full name with anything.

**4. Turn the "more than a decade" claim into something a reviewer said.**
Files: `components/Hero.tsx` line 89, `app/about/page.tsx` metadata description ("A decade of hands-on").
Current: "maintained by the owner himself for more than a decade."
Replacement: "maintained by the owner himself since his clients were reviewing him in 2018. And he still answers his own phone." Or simpler: "maintained by the owner himself, the same owner for years." The decade math rests on one 2018 review saying "over 3 years." It is defensible but it is exactly the kind of number a competitor or a skeptic pokes at. Use what is on Google verbatim or drop the number.

**5. Add the one urgency that is real today: hurricane season.**
Files: `components/home/WhyHire.tsx` (the "This is for you if" block), `components/home/CtaBand.tsx` default body, `lib/guides.ts` (the hurricane guide already exists).
Change: a single line under the hero CTAs or in the WhyHire close: "Hurricane season runs through November 30. If your tank has no battery air pump yet, text Jason before the next storm." Link to `/guides/hurricane-prep-for-aquariums-south-florida`. This is true, seasonal, local, and it gives a fence-sitter a reason to text today instead of "someday."

**6. Fix the fake-corporate hours line.**
Files: `lib/site.ts` `hours` and `hoursShort`, rendered in `components/Hero.tsx`, `components/Footer.tsx`, `app/contact/page.tsx` ("Open 24 hours, 7 days").
Current: "Open 24 hours. Call or text any time."
Replacement: "One phone and Jason answers it. Text any time. Tank emergencies get a callback day or night." A one-man shop that says "Open 24 hours" reads like a Google Business Profile default, not a person. Keep the GBP hours as they are; change the words on the site.

**7. Delete the invented-sounding stat that opens WhyHire.**
File: `components/home/WhyHire.tsx`.
Current: "Most people who call Jason waited a year too long. Not because they could not do the work, but because nobody was watching the numbers between the weekends they had time."
Replacement: "Nobody calls the day the nitrate starts creeping. They call the week the coral browns out. The difference is somebody watching the numbers between your weekends." Same idea, no implied statistic.

**8. Stop recycling the lobby reef. One photo on six page types tells the visitor you have one photo.**
Files: `app/services/[slug]/page.tsx` (bottom band), `app/aquarium-service/[city]/page.tsx` (bottom band), `app/about/page.tsx`, `app/our-work/page.tsx`, `components/home/RealWork.tsx`.
Change: keep it on Our Work and the home RealWork section. On the service and city pages replace the band with a short first-person line from Jason and the text CTA, or with the `reef-display.jpg` and specialty video posters that already exist. Then the real fix: Jason shoots 15 seconds of vertical video at the end of every visit for 30 days. That footage replaces every stock image on the site by November and feeds Instagram and GBP posts. That is the whole Gary playbook: document, don't create.

**9. Retire the pop-up or make it earn its interruption.**
File: `components/OwnerPopup.tsx`.
Current: fires at 10 seconds or one screen of scroll on every page except /contact, blocks the page, "Hi, I'm Jason" with a fish icon.
Change: either cut it entirely (the MobileDock already carries call/text/quote) or convert it to a non-blocking bottom-right card that appears once at 60 percent scroll with Jason's real photo and a single button, `Text me a photo of your tank`. A modal at 10 seconds is the fastest way to lose the person who came from a "fish tank cleaning near me" search on a phone.

**10. Numbered service eyebrows and the "Reef & Saltwater" nav item.**
Files: `lib/services.ts` (`eyebrow: "Service 01"` etc.), `components/Header.tsx` nav array.
Change eyebrows to plain human labels: "Most of what Jason does" / "When a room changes" / "When something is wrong". "Service 01" is the numbered-card pattern the brief bans and it reads templated. In the header drop "Reef & Saltwater" (it is one click away under Services) so the nav is Services, Our Work, About Jason, Reviews, Areas, and the phone number gets the breathing room it deserves.

## 2. Copy rewrites where the voice is not human enough

Hero H1 (`components/Hero.tsx`). Current: "Palm Beach's finest aquariums have one thing in common." It is clever but the visitor has to wait for the payoff and the payoff is a clause about reading water. Option that says what he does and who he is in one breath: **"The guy Boca calls when the tank needs somebody"** with the subline "Reef, saltwater, freshwater, planted tanks and ponds. Cleaned and kept by the owner. Text him a photo and he tells you what it needs." If the team is attached to the current line, keep it but make the underline word "one guy" instead of "one thing in common."

AreasBand button (`components/home/AreasBand.tsx`). Current: "Check my address" links to /contact and does not check anything. Replacement: "Ask if Jason covers my street" linking to `site.smsHref`.

Services page eyebrow (`app/services/page.tsx`). Current: "The three core services." Replacement: "What people actually call about."

Reviews header (`components/home/Reviews.tsx`). Current lede is strong. Add one line of Jason's own voice above the wall: "I do not ask for these. People just write them." Only if that is true; confirm with Jason.

City page bottom band (`app/aquarium-service/[city]/page.tsx`). Current: "The standard every {city} tank gets." Replacement: "This is what a tank looks like when someone shows up every week."

Contact page hero (`app/contact/page.tsx`). Current title "Tell Jason about your tank" is good. Change the lede to "Three taps and a phone number. Or skip all of it and text him a photo. He reads both himself."

Owner popup body (if kept). Current: "Tell me what tank you have and what it needs. I answer my own phone and texts, and I come to you anywhere in Palm Beach County." Replacement: "Send me a picture of your tank. I will tell you what I see, no charge, and whether you even need me."

## 3. What I would cut

- The TownStrip marquee at the bottom of the hero (`components/Hero.tsx`). Twenty-two towns scrolling under the headline is a distraction from the two buttons that matter, and the AreasBand below already does this job better.
- The OwnerPopup as a modal (see item 9).
- "Get a Free Quote" as button text anywhere. "Free" is assumed for a one-man service and the word cheapens the brand.
- "Service 01 / 02 / 03" eyebrows.
- The stock blue tang on About and the stock koi and angelfish on city pages until real footage exists; a smaller real photo beats a larger stock one every time.
- The "more than a decade" and "A decade of" phrasing.
- "Open 24 hours" wording on the site.
- The fourth and fifth uses of `lobby-reef.jpg`.

## 4. Verdict

This site is already honest, specific and better written than every competitor named in the research, and the structure (one page per service, one per city, real FAQ, verbatim reviews, text-first contact) is exactly right. What it lacks is the thing Gary would scream about first: the human. Nobody hires "Jason's Aquarium Service," they hire Jason, and right now Jason is a fish icon and a stock blue tang. Get one real photo of him at a tank, make the text-a-photo CTA the star instead of the understudy, scrub the full name and the soft "decade" claim off the homepage, kill the modal, and add the hurricane-season line so there is a real reason to act this week. Then have him shoot fifteen seconds of video per visit for a month and let the footage replace the stock. Do those things and this site does not just outrank Aquaholic on Boca and Delray searches, it out-humans them, which is the only moat a one-man business ever really has.
