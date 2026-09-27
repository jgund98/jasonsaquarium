// Services (what Jason does) and specialties (what he does it on).
// Copy here is real-world grounded: nothing promised that Jason hasn't said.

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  intro: string;
  bullets: string[];
  body: string[];
  keywords: string[];
  faqs: Faq[];
  image: string;
  imageAlt: string;
  video?: string;
  poster?: string;
  accent: "lagoon" | "coral" | "kelp";
};

export const services: Service[] = [
  {
    slug: "aquarium-cleaning-maintenance",
    name: "Aquarium Cleaning & Maintenance",
    short: "Scheduled visits that keep glass clear, water stable and fish thriving.",
    eyebrow: "Maintenance",
    headline: "Aquarium cleaning and maintenance across Palm Beach County",
    intro:
      "The tank you wanted when you bought it, every week. Jason comes to your home or office on a schedule, does the water changes, cleans the glass and the rockwork, tests the water, checks every piece of equipment and looks at every fish before he leaves.",
    bullets: [
      "Weekly, bi-weekly or monthly visits",
      "Water changes with properly mixed saltwater or conditioned freshwater",
      "Glass, acrylic, substrate and decor cleaning",
      "Water testing: salinity, pH, nitrate, phosphate, alkalinity, calcium",
      "Filter, skimmer, pump and light checks",
      "Fish and coral health check every visit",
    ],
    body: [
      "Most fish tank problems are slow. Nitrate creeps up, algae takes hold, a pump gets a little louder each week. Regular fish tank cleaning catches all of it before it becomes a crash. Jason has serviced the same tanks in Boca Raton, Delray Beach and Boynton Beach for years, so he notices when something is off before you do.",
      "Every visit ends with the tank looking the way it did the day it was set up: clean glass, bright rock, clear water, fish out and eating. If a parameter drifts, you hear about it and what he is doing about it. If a piece of equipment is on its way out, you hear that too, before it fails.",
      "Maintenance plans work for saltwater reef tanks, fish-only saltwater systems, freshwater community tanks, planted aquariums, cichlid tanks and ponds. Whether it is a 20 gallon on a desk or a 300 gallon built into a wall, the routine scales to the system.",
    ],
    keywords: [
      "aquarium maintenance Boca Raton",
      "fish tank cleaning service",
      "aquarium cleaner near me",
      "saltwater tank maintenance",
      "reef tank service",
      "weekly aquarium service",
    ],
    faqs: [
      {
        q: "How often should my aquarium be serviced?",
        a: "Most saltwater reef tanks do best with a visit every one to two weeks. Freshwater community tanks are usually fine every two to four weeks. Jason looks at your tank, your stocking level and your equipment and recommends a schedule; nobody gets sold more visits than the tank needs.",
      },
      {
        q: "What does an aquarium maintenance visit include?",
        a: "A water change, glass and decor cleaning, substrate vacuuming where appropriate, water testing, filter and equipment checks, top-off, and a look at every fish and coral. Anything unusual gets flagged to you before Jason leaves.",
      },
      {
        q: "Do you bring your own water for saltwater changes?",
        a: "Yes. Saltwater is mixed and matched to your tank's salinity and temperature ahead of time so a water change never shocks the system.",
      },
      {
        q: "Can you service my tank while I am at work?",
        a: "Yes. Many of Jason's clients are offices, lobbies and homes where nobody is around during the visit. Arrangements for access are made once and kept.",
      },
      {
        q: "How much does aquarium maintenance cost in Boca Raton?",
        a: "It depends on tank size, whether it is saltwater or freshwater, and how often it is visited. Call or text Jason with the size and type of tank and you will get a straight answer, usually the same day.",
      },
    ],
    image: "/images/services/maintenance.jpg",
    imageAlt: "Cleaning the front glass of a saltwater reef aquarium",
    accent: "lagoon",
  },
  {
    slug: "aquarium-design-installation",
    name: "Aquarium Design & Installation",
    short: "From an empty wall to a living reef: tank, plumbing, lighting, rockwork, livestock.",
    eyebrow: "Design and install",
    headline: "Custom aquarium design and installation",
    intro:
      "A new aquarium is a hundred decisions, and the wrong ones cost you for years. Jason designs the whole system around the room, the light, the budget and the fish you actually want, then installs it, cycles it and stocks it so it is right from the first day.",
    bullets: [
      "Tank sizing and placement for homes, lobbies and offices",
      "Saltwater reef, fish-only, freshwater, planted and pond systems",
      "Filtration, sump, plumbing and lighting selection",
      "Aquascaping with live rock, wood and plants",
      "Cycling and staged, careful stocking",
      "Tank upgrades and replacements, including emergency swaps",
    ],
    body: [
      "Custom aquarium installation in Boca Raton is not the same as buying a kit. A wall-mounted reef in a lobby needs a plan for water changes and access. A planted tank in a bright room needs different lighting than one in a hallway. Jason has set up and upgraded tanks across Palm Beach County and designs around how the tank will actually be lived with.",
      "The stocking is where the difference shows. Fish and coral are chosen for the system, added in the right order and given time to settle. Clients have watched the species Jason picked thrive for years because they were the right animals for that tank, not whatever was in the store that week.",
      "Already have a tank that has outgrown its equipment? Jason handles upgrades and swaps too, including moving livestock from an old tank into a new one in a single day when a tank cracks or fails.",
    ],
    keywords: [
      "custom aquarium installation Boca Raton",
      "aquarium design Palm Beach County",
      "fish tank setup service",
      "saltwater aquarium installation",
      "reef tank build",
      "aquarium replacement",
    ],
    faqs: [
      {
        q: "Can you install an aquarium in a wall or built-in cabinet?",
        a: "Yes. Built-in and in-wall installations are common in Boca Raton homes and lobbies. Jason plans the plumbing, access and maintenance routine before the first bag of sand goes in.",
      },
      {
        q: "How long does it take to set up a new saltwater aquarium?",
        a: "The physical install can be a day. A saltwater system then needs to cycle, which typically takes several weeks, before fish are added gradually. Jason manages that timeline so nothing is rushed.",
      },
      {
        q: "Do you install freshwater and planted tanks too?",
        a: "Yes. Freshwater community tanks, planted aquascapes, cichlid tanks and ponds are all designed and installed.",
      },
      {
        q: "My tank cracked. Can you replace it quickly?",
        a: "Yes. Jason has replaced tanks on short notice, moving fish and coral into the new system the same day. Call or text right away so the livestock can be kept safe.",
      },
    ],
    image: "/images/services/install-2.jpg",
    imageAlt: "A built-in aquarium set into the shelving of a modern living room",
    accent: "coral",
  },
  {
    slug: "aquarium-assessment",
    name: "Aquarium Assessments",
    short: "A second set of expert eyes on a tank that is struggling, or one you just bought.",
    eyebrow: "Assessments",
    headline: "Aquarium assessments and troubleshooting",
    intro:
      "Cloudy water, algae that will not quit, fish that keep dying, a filter that never sounds right. An assessment is Jason at your tank, testing the water, checking the equipment and telling you plainly what is wrong and what to do about it.",
    bullets: [
      "Full water chemistry workup on site",
      "Equipment inspection: filtration, flow, lighting, heating, controllers",
      "Livestock health and compatibility review",
      "Algae, disease and water-quality troubleshooting",
      "Pre-purchase checks on a home with an existing tank",
      "A plain-language plan you can follow yourself, or hand back to Jason",
    ],
    body: [
      "Clients call Jason a mentor for a reason. He has helped hobbyists across Boca Raton and Delray Beach understand what their water is telling them and adjust levels themselves. An assessment is not a sales visit. It is an honest look at the system and a plan.",
      "Assessments also make sense when you inherit a tank: buying a home with a built-in aquarium, taking over an office lobby tank, or moving into a property with a pond. Jason tells you what you have, what condition it is in and what it will take to keep it healthy.",
    ],
    keywords: [
      "aquarium consultant Boca Raton",
      "fish tank troubleshooting",
      "aquarium water testing service",
      "why are my fish dying",
      "aquarium algae problem",
      "reef tank help",
    ],
    faqs: [
      {
        q: "What happens during an aquarium assessment?",
        a: "Jason tests your water, inspects every piece of equipment, looks at the fish, coral or plants, and asks about the tank's history. You get a clear explanation of what is going on and a plan, either to fix it yourself or to have Jason take it from there.",
      },
      {
        q: "Can you help me fix my tank remotely?",
        a: "For ongoing clients, yes. Jason has helped customers adjust their levels over the phone and by text many times. For a new tank he has not seen, an on-site assessment comes first.",
      },
      {
        q: "I am buying a house with a built-in aquarium. Can you check it?",
        a: "Yes. A pre-purchase assessment tells you what the system is, what condition it is in and what it will cost to run and maintain, before you close.",
      },
    ],
    image: "/images/services/assessment.jpg",
    imageAlt: "Testing aquarium water with a liquid test kit",
    accent: "kelp",
  },
  {
    slug: "emergency-aquarium-service",
    name: "Emergency Aquarium Service",
    short: "Cracked tank, leak, crash or a pump that died on a Friday night. Call, do not wait.",
    eyebrow: "Emergencies",
    headline: "Emergency aquarium service in Palm Beach County",
    intro:
      "A leaking tank, a cracked panel, a heater stuck on, a power outage in August, fish gasping at the surface. These do not wait for business hours and neither does Jason. Call the number at the top of the page and say the word emergency.",
    bullets: [
      "Cracked or leaking tank replacement, with livestock moved the same day when needed",
      "Failed pump, heater, chiller or filter diagnosis and swap",
      "Tank crash triage: water quality, oxygen, temperature",
      "Sick or dying fish assessment and next steps",
      "Post-outage and post-hurricane recovery",
      "Honest advice by phone while you wait",
    ],
    body: [
      "Two of Jason's public reviews describe emergencies: a reef whose glass broke without warning, and an old tank swapped for a new one in a single day. In both cases the fish and coral came through because someone answered the phone and showed up. That is what emergency aquarium service means here.",
      "The most useful thing you can do while you wait is nothing drastic. Turn off the lights, keep water moving if the level allows it, do not feed, and do not add chemicals. Text a photo and any test results you have so Jason can start thinking before he arrives.",
      "After the emergency, the tank usually needs a few days of daily testing and a plan to keep it from happening again. That is where a maintenance schedule comes from for most of Jason's long-term clients.",
    ],
    keywords: [
      "emergency aquarium service",
      "aquarium leak repair Boca Raton",
      "cracked fish tank replacement",
      "fish tank emergency near me",
      "aquarium crash help Palm Beach County",
    ],
    faqs: [
      {
        q: "My fish tank is leaking. What do I do first?",
        a: "Lower the water below the leak if you can see where it is, keep the pumps running if the water level allows, turn off heaters that could run dry, and call Jason. Have buckets or a spare container ready for the fish.",
      },
      {
        q: "Can you replace a cracked aquarium the same day?",
        a: "Often, yes. Jason has sourced a replacement tank and moved fish and coral into it the same day more than once. Speed depends on the size and what is in stock, so call as early as you can.",
      },
      {
        q: "Do you charge extra for emergency aquarium calls?",
        a: "Emergency visits are quoted when you call, based on the time and what is needed. Jason will tell you the number before he leaves his driveway.",
      },
      {
        q: "What should I do while I wait for help?",
        a: "Turn off the lights, do not feed, do not add chemicals, keep water moving if the level allows it, and text a photo and any test results to Jason.",
      },
    ],
    image: "/images/stock/clownfish.jpg",
    imageAlt: "A clownfish sheltering in an anemone",
    accent: "coral",
  },
];

export type Specialty = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  points: string[];
  body: string[];
  keywords: string[];
  faqs: Faq[];
  image: string;
  imageAlt: string;
  tone: "dark" | "light";
};

export const specialties: Specialty[] = [
  {
    slug: "saltwater-reef-aquariums",
    name: "Saltwater & Reef Tanks",
    short: "Corals, tangs, clownfish and the chemistry that keeps them alive.",
    headline: "Saltwater and reef aquarium service",
    intro:
      "Reef tanks are where Jason's clients talk about him most. Coral, invertebrates and marine fish need stable salinity, alkalinity, calcium and nutrients, and a service visit that keeps all of it in range without upsetting the system.",
    points: [
      "Mixed reef, SPS, LPS and soft coral systems",
      "Fish-only and fish-with-live-rock tanks",
      "Skimmers, sumps, dosing and reef lighting",
      "Coral and fish selection for your system",
    ],
    body: [
      "Saltwater is less forgiving than freshwater, and reef tanks least of all. The difference between a tank full of color and a tank full of brown rock is usually water chemistry that drifted for a few weeks. Jason's maintenance visits test the numbers that matter and keep them where the coral wants them.",
      "He also helps pick the animals. Clients in Boca Raton have reef tanks whose fish and corals have thrived for years because they were selected for that tank's size, light and flow rather than bought on impulse.",
    ],
    keywords: [
      "reef tank service Boca Raton",
      "saltwater aquarium maintenance Palm Beach County",
      "coral tank care",
      "marine aquarium service",
    ],
    faqs: [
      {
        q: "Do you service reef tanks with SPS coral?",
        a: "Yes. SPS-heavy systems need tighter alkalinity, calcium and magnesium control, and the visit schedule and testing are set up for that.",
      },
      {
        q: "Can you help me choose fish and coral for my reef?",
        a: "Yes. Selecting compatible, healthy livestock for the specific tank is part of what Jason does, and clients have seen those picks thrive for years.",
      },
    ],
    image: "/images/specialties/reef.jpg",
    imageAlt: "Colorful coral reef aquarium under blue lighting",
    tone: "dark",
  },
  {
    slug: "freshwater-planted-aquariums",
    name: "Freshwater & Planted Tanks",
    short: "Community tanks, cichlids, discus and lush planted aquascapes.",
    headline: "Freshwater and planted aquarium service",
    intro:
      "Freshwater tanks look simple and are easy to get wrong. Overstocking, over-feeding, wrong lighting for the plants, filters that were never sized for the fish. Jason services and sets up freshwater systems of every kind across Palm Beach County.",
    points: [
      "Community, cichlid, discus and betta tanks",
      "Planted aquascapes with CO2 and proper lighting",
      "Filter, heater and light selection and care",
      "Algae control without harming plants or fish",
    ],
    body: [
      "A planted tank is a garden underwater. It needs the right light for the right number of hours, nutrients in balance and regular trimming, or the algae wins. Jason keeps planted tanks in Boca Raton and Delray Beach looking the way they do in the photos.",
      "Community tanks get the same care: scheduled water changes, gravel vacuuming, filter maintenance and a look at every fish for early signs of trouble.",
    ],
    keywords: [
      "freshwater aquarium maintenance Boca Raton",
      "planted tank service",
      "fish tank cleaning near me",
      "cichlid tank maintenance",
    ],
    faqs: [
      {
        q: "Do you service planted tanks with CO2 systems?",
        a: "Yes. CO2, fertilization and lighting schedules are all part of planted tank service.",
      },
      {
        q: "How often does a freshwater tank need cleaning?",
        a: "Usually every two to four weeks depending on stocking and filtration. Jason recommends a schedule after seeing the tank.",
      },
    ],
    image: "/images/specialties/freshwater.jpg",
    imageAlt: "A lush planted freshwater aquarium with tetras",
    tone: "light",
  },
  {
    slug: "ponds-water-gardens",
    name: "Ponds & Water Gardens",
    short: "Koi and goldfish ponds, fountains and outdoor water features.",
    headline: "Pond and water garden service",
    intro:
      "South Florida sun, rain and heat make ponds work harder than tanks. Jason cleans, maintains and troubleshoots koi ponds, goldfish ponds and water features so they stay clear and the fish stay healthy through the summer.",
    points: [
      "Koi and goldfish pond maintenance",
      "Pump, filter and UV clarifier service",
      "Algae and water clarity control",
      "Seasonal cleanouts and plant care",
    ],
    body: [
      "Ponds in Boca Raton and Wellington deal with heavy rain, high temperatures and a lot of sunlight. Green water, string algae and clogged pumps are the usual complaints, and all of them are fixable with the right filtration and a regular visit.",
      "Jason services ponds the same way he services tanks: on a schedule, with water testing and equipment checks, and with a look at every fish.",
    ],
    keywords: [
      "pond maintenance Boca Raton",
      "koi pond service Palm Beach County",
      "pond cleaning near me",
      "water feature maintenance",
    ],
    faqs: [
      {
        q: "Do you service koi ponds?",
        a: "Yes. Koi and goldfish ponds, along with fountains and small water features, are part of Jason's regular service work.",
      },
      {
        q: "My pond water is green. Can you fix it?",
        a: "Yes. Green water is usually a filtration, UV or nutrient problem. An assessment identifies which, and a maintenance plan keeps it clear.",
      },
    ],
    image: "/images/specialties/pond.jpg",
    imageAlt: "Koi swimming in a clear garden pond",
    tone: "light",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function getSpecialty(slug: string) {
  return specialties.find((s) => s.slug === slug);
}

// Search vocabulary that customers actually type. Used in FAQ copy and schema.
export const searchVocabulary = [
  "aquarium service near me",
  "fish tank cleaning near me",
  "aquarium maintenance Boca Raton",
  "fish tank cleaner",
  "fish tank guy",
  "aquarium cleaning service Palm Beach County",
  "saltwater tank maintenance",
  "reef tank service",
  "coral tank cleaning",
  "aquarium installation",
  "custom fish tank",
  "aquarium setup service",
  "aquarium repair",
  "fish tank leaking",
  "aquarium consultant",
  "pond cleaning",
  "koi pond maintenance",
  "aquarium water testing",
];
