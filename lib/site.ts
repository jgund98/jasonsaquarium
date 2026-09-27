// Every business fact lives here. Components read from this file only.
// Change a phone number or a city once and the whole site follows.

export const site = {
  name: "Jason's Aquarium Service",
  legalName: "Jason's Aquarium Service LLC",
  shortName: "Jason's Aquarium",
  owner: "Jason",
  ownerFull: "Jason Wasloff",
  ownerFirst: "Jason",
  tagline: "Aquarium cleaning, design and care across Palm Beach County.",
  description:
    "Jason's Aquarium Service LLC is a mobile aquarium maintenance company owned and operated by Jason. He cleans, designs, installs and assesses saltwater reef tanks, freshwater and planted aquariums, and ponds for homes and businesses across Palm Beach County, Florida, from Boca Raton and Delray Beach up to Wellington and West Palm Beach, plus the north Broward towns next door.",

  phone: "(516) 528-7824",
  phoneHref: "tel:+15165287824",
  smsHref: "sms:+15165287824?&body=" + encodeURIComponent("Hi Jason, I found your site and have a question about my tank."),
  smsPhotoHref: "sms:+15165287824?&body=" + encodeURIComponent("Hi Jason, here is a photo of my tank. Can you tell me what it needs?"),
  phoneE164: "+15165287824",

  // Where website leads are emailed. Override with LEAD_TO_EMAIL in Vercel.
  leadEmail: "jgundyt@gmail.com",

  // No storefront and no home base. Mobile service across the county.
  homeCity: "Palm Beach County",
  state: "FL",
  stateLong: "Florida",
  county: "Palm Beach County",
  geo: { lat: 26.4452699, lng: -80.2065629 },
  hours: "Call or text any time. Jason answers his own phone.",
  hoursShort: "24 hours, 7 days",

  url: "https://jasonsaquariumservice.com",
  googleMapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJO5eZxNMh2YgRQxr1R7sDmGw",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJO5eZxNMh2YgRQxr1R7sDmGw",
  rating: { value: 4.6, count: 9 },

  // LLC formed May 2021 (Sunbiz L21000208619). Reviews on Google go back to
  // 2018, with clients already using Jason for years by then.
  founded: "2021",
  disambiguation:
    "Jason's Aquarium Service LLC serves Palm Beach County and north Broward, Florida and is not affiliated with Jason's Aquatics in Davie.",

  // Service priority, in the order Jason wants them presented.
  primaryServices: [
    "Aquarium Cleaning & Maintenance",
    "Aquarium Design & Installation",
    "Aquarium Assessments",
  ],

  epic: {
    name: "Epic Dev Solutions",
    url: "https://epicdevsolutions.com",
  },
} as const;

// Palm Beach County first, then the northern Broward towns within a short drive
// of west Boca. Order matters: it is the order they appear in copy and schema.
export const serviceAreas = [
  { name: "Boca Raton", county: "Palm Beach", slug: "boca-raton", minutes: 1 },
  { name: "West Boca", county: "Palm Beach", slug: "west-boca-raton", minutes: 5 },
  { name: "Delray Beach", county: "Palm Beach", slug: "delray-beach", minutes: 15 },
  { name: "Highland Beach", county: "Palm Beach", slug: "highland-beach", minutes: 20 },
  { name: "Boynton Beach", county: "Palm Beach", slug: "boynton-beach", minutes: 20 },
  { name: "Gulf Stream", county: "Palm Beach", slug: "gulf-stream", minutes: 20 },
  { name: "Ocean Ridge", county: "Palm Beach", slug: "ocean-ridge", minutes: 25 },
  { name: "Lantana", county: "Palm Beach", slug: "lantana", minutes: 25 },
  { name: "Lake Worth Beach", county: "Palm Beach", slug: "lake-worth-beach", minutes: 30 },
  { name: "Wellington", county: "Palm Beach", slug: "wellington", minutes: 30 },
  { name: "Royal Palm Beach", county: "Palm Beach", slug: "royal-palm-beach", minutes: 35 },
  { name: "Manalapan", county: "Palm Beach", slug: "manalapan", minutes: 30 },
  { name: "West Palm Beach", county: "Palm Beach", slug: "west-palm-beach", minutes: 35 },
  { name: "Palm Beach", county: "Palm Beach", slug: "palm-beach", minutes: 40 },
  { name: "Palm Beach Gardens", county: "Palm Beach", slug: "palm-beach-gardens", minutes: 45 },
  { name: "Jupiter", county: "Palm Beach", slug: "jupiter", minutes: 55 },
  { name: "Deerfield Beach", county: "Broward", slug: "deerfield-beach", minutes: 10 },
  { name: "Parkland", county: "Broward", slug: "parkland", minutes: 15 },
  { name: "Coral Springs", county: "Broward", slug: "coral-springs", minutes: 20 },
  { name: "Lighthouse Point", county: "Broward", slug: "lighthouse-point", minutes: 20 },
  { name: "Coconut Creek", county: "Broward", slug: "coconut-creek", minutes: 20 },
  { name: "Pompano Beach", county: "Broward", slug: "pompano-beach", minutes: 25 },
] as const;

export type ServiceArea = (typeof serviceAreas)[number];

export const palmBeachTowns = serviceAreas.filter((a) => a.county === "Palm Beach");
export const browardTowns = serviceAreas.filter((a) => a.county === "Broward");

export function areaNames(limit?: number) {
  const names = serviceAreas.map((a) => a.name);
  return limit ? names.slice(0, limit) : names;
}
