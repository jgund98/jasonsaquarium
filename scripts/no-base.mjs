import fs from "node:fs";
const rw = (f, fn) => {
  let s = fs.readFileSync(f, "utf8");
  const o = s;
  s = fn(s);
  if (s === o) console.log("NOCHANGE", f);
  fs.writeFileSync(f, s);
};

rw("lib/cities.ts", (s) =>
  s
    .replace(`    drive: "home base",\n    lead:\n      "Jason's Aquarium Service is a mobile aquarium cleaning, installation and consultation company based in west Boca Raton. Jason services`, `    drive: "Palm Beach County",\n    lead:\n      "Jason's Aquarium Service is a mobile aquarium cleaning, installation and consultation company serving Boca Raton. Jason services`)
    .replace(`      "Boca is home. Most of Jason's route runs through`, `      "Boca is a big part of the route. Much of it runs through`)
    .replace(`        a: "Yes. Jason is based in west Boca Raton and covers the whole city, from the communities along 441 to the beachside neighborhoods east of Federal Highway.",`, `        a: "Yes. Jason covers the whole city, from the communities along 441 to the beachside neighborhoods east of Federal Highway.",`)
    .replace(`        a: "Boca is Jason's home base, so emergency calls here are usually the fastest to reach. Call or text right away if a tank is leaking, cracked or crashing.",`, `        a: "Boca is on Jason's route most days. Call or text right away if a tank is leaking, cracked or crashing and he will tell you honestly how fast he can be there.",`)
    .replace(`    drive: "home base",\n    lead:\n      "Jason's Aquarium Service is based in west Boca Raton and services aquariums in the communities along 441 and Glades Road every week:`, `    drive: "Palm Beach County",\n    lead:\n      "Jason's Aquarium Service services aquariums in the west Boca communities along 441 and Glades Road every week:`)
    .replace(`      "Because this is where Jason lives and works, west Boca clients get the tightest scheduling and the fastest response when something goes wrong. A cracked tank in Boca Winds or a failed pump in Mission Bay is a short drive, not a trip across the county.",`, `      "West Boca sits in the middle of Jason's route, so scheduling here is easy and response when something goes wrong is quick. A cracked tank in Boca Winds or a failed pump in Mission Bay is on the way, not a trip across the county.",`)
    .replace(`        a: "It is the center of it. Jason is based in west Boca Raton, so the communities along 441 and Glades Road are the easiest to schedule.",`, `        a: "Yes. The communities along 441 and Glades Road are in the middle of Jason's route and easy to schedule.",`)
    .replace(`      "Jason's business started in west Delray, so this is familiar ground.`, `      "Delray is familiar ground.`)
    .replace(`and he started the business in west Delray.",`, `and Jason has serviced tanks there for years.",`)
    .replace(`Deer Creek, Century Village East, The Cove and the beachside neighborhoods are minutes from Jason's base, so reef tanks, freshwater tanks and ponds here get the same fast scheduling as Boca.",`, `Deer Creek, Century Village East, The Cove and the beachside neighborhoods are on the same route days as Boca, so reef tanks, freshwater tanks and ponds here get the same easy scheduling.",`)
    .replace(`      "Deerfield is the first town south of the Palm Beach County line and closer to west Boca than most of Boca is.`, `      "Deerfield is the first town south of the Palm Beach County line and sits right on Jason's Boca route days.`)
    .replace(`        a: "Yes. Deerfield Beach is about ten minutes from Jason's base in west Boca, closer than most of Palm Beach County, and it is on the regular route.",`, `        a: "Yes. Deerfield Beach is minutes from Boca Raton and on the regular route. Jason serves Palm Beach County and the north Broward towns next to it.",`)
    .replace(`Large built-in reef systems and family freshwater tanks are serviced on a weekly or bi-weekly schedule from Jason's base fifteen minutes away in west Boca.",`, `Large built-in reef systems and family freshwater tanks are serviced on a weekly or bi-weekly schedule alongside Jason's Boca Raton route.",`)
    .replace(`        a: "Yes. Parkland is about fifteen minutes from Jason's base in west Boca and is part of the regular route.",`, `        a: "Yes. Parkland is minutes from Boca Raton and part of the regular route. Jason serves Palm Beach County and the north Broward towns next to it.",`)
    .replace(`Freshwater, planted, saltwater and reef tanks are serviced on a regular schedule from Jason's base in west Boca.",`, `Freshwater, planted, saltwater and reef tanks are serviced on a regular schedule alongside the Boca Raton and Parkland route days.",`)
    .replace(`      "Jupiter is a boating and diving town,`, `      "Jupiter is a boating and diving town,`)
);

rw("lib/faqs.ts", (s) =>
  s
    .replace(`a: "Jason's Aquarium Service. Jason is a mobile aquarium technician based in west Boca Raton who cleans and maintains`, `a: "Jason's Aquarium Service. Jason is a mobile aquarium technician who cleans and maintains`)
    .replace(`        a: "Jason is based in west Boca Raton, Florida and serves Palm Beach County plus the north Broward towns of Deerfield Beach, Parkland, Coral Springs, Coconut Creek, Lighthouse Point and Pompano Beach. It is a mobile service with no retail store.",`, `        a: "It is a mobile service with no store and no fixed address. Jason serves all of Palm Beach County plus the north Broward towns of Deerfield Beach, Parkland, Coral Springs, Coconut Creek, Lighthouse Point and Pompano Beach.",`)
    .replace(`        a: "No. Jason's Aquarium Service LLC is a separate company based in Boca Raton, Palm Beach County, and is not affiliated with Jason's Aquatics in Davie.",`, `        a: "No. Jason's Aquarium Service LLC is a separate company serving Palm Beach County and north Broward, and is not affiliated with Jason's Aquatics in Davie.",`)
    .replace(`a: "Jason's Aquarium Service LLC was formed in 2021, and public Google reviews show Jason maintaining clients' tanks in the Boca Raton and Delray Beach area since at least 2015.",`, `a: "Jason's Aquarium Service LLC was formed in 2021, and public Google reviews show Jason maintaining clients' tanks in Palm Beach County since at least 2015.",`)
);

rw("lib/site.ts", (s) =>
  s
    .replace(`  // No storefront. Mobile service based in west Boca Raton.\n  homeCity: "Boca Raton",`, `  // No storefront and no home base. Mobile service across the county.\n  homeCity: "Palm Beach County",`)
    .replace(`    "Jason's Aquarium Service LLC is based in Boca Raton, Florida and is not affiliated with Jason's Aquatics in Davie.",`, `    "Jason's Aquarium Service LLC serves Palm Beach County and north Broward, Florida and is not affiliated with Jason's Aquatics in Davie.",`)
    .replace(`  { name: "Boca Raton", county: "Palm Beach", slug: "boca-raton", minutes: 0 },`, `  { name: "Boca Raton", county: "Palm Beach", slug: "boca-raton", minutes: 1 },`)
);

rw("lib/schema.tsx", (s) =>
  s.replace(`    address: {\n      "@type": "PostalAddress",\n      addressLocality: site.homeCity,\n      addressRegion: site.state,\n      addressCountry: "US",\n    },`, `    address: {\n      "@type": "PostalAddress",\n      addressRegion: site.state,\n      addressCountry: "US",\n    },`)
);

rw("app/about/page.tsx", (s) =>
  s.replace(`{site.legalName}, formed 2021, based in west Boca Raton, serving Palm Beach County and north Broward.{" "}`, `{site.legalName}, formed 2021, serving all of Palm Beach County and north Broward.{" "}`)
);

rw("app/aquarium-service/[city]/page.tsx", (s) =>
  s.replace("        eyebrow={`${c.county} County${c.drive === \"home base\" ? \" · Home base\" : \"\"}`}", "        eyebrow={`${c.county} County`}")
);

rw("app/contact/page.tsx", (s) =>
  s.replace(`                    <dt className="text-ink-soft">Based in</dt>\n                    <dd className="text-right font-semibold text-ink">West Boca Raton, FL</dd>`, `                    <dt className="text-ink-soft">Store</dt>\n                    <dd className="text-right font-semibold text-ink">None. Jason comes to you</dd>`)
);

rw("app/service-areas/page.tsx", (s) =>
  s.replace(`lede="Jason is based in west Boca Raton and runs grouped route days across Palm Beach County and the north Broward towns just over the line. Pick your town for what service looks like there."`, `lede="Jason runs grouped route days across all of Palm Beach County and the north Broward towns just over the line. Pick your town for what service looks like there."`)
);

rw("components/home/AreasBand.tsx", (s) =>
  s
    .replace(`<p className="eyebrow text-aqua">Based in west Boca Raton</p>`, `<p className="eyebrow text-aqua">Palm Beach County and north Broward</p>`)
    .replace(`lede="Visits are grouped by area, which is how a one-person service stays on time. The minutes are the drive from Jason's base."`, `lede="Visits are grouped by area, which is how a one-person service stays on time."`)
);

rw("public/llms.txt", (s) =>
  s
    .replace(`Owner-operated by Jason. Based in west Boca Raton. Phone`, `Owner-operated by Jason. No store and no fixed address; he comes to you. Phone`)
    .replace(`There is no retail store; every visit happens at the client's home, office, lobby or backyard.`, `There is no retail store and no home base; every visit happens at the client's home, office, lobby or backyard anywhere in the service area.`)
);

rw("HANDOFF.md", (s) => s.replace(`west Boca Raton`, `Palm Beach County`));
console.log("no-base pass done");
