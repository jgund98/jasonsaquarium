// Local, useful guides. Each targets a real long-tail query and answers it
// properly. Dates are publish dates; all published (no scheduled drip).

export type Guide = {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  image: string;
  imageAlt: string;
  keywords: string[];
  sections: { h: string; p: string[] }[];
  takeaway: string;
};

export const guides: Guide[] = [
  {
    slug: "aquarium-maintenance-cost-palm-beach-county",
    title: "How much does aquarium maintenance cost in Palm Beach County",
    description:
      "What drives the price of professional aquarium service in Boca Raton, Delray Beach and across Palm Beach County: tank size, saltwater versus freshwater, visit frequency and equipment. Plus what is included and what is not.",
    date: "2026-09-27",
    minutes: 6,
    image: "/images/stock/blue-tang-sand.jpg",
    imageAlt: "A blue tang over clean white sand in a well-kept reef aquarium",
    keywords: ["aquarium maintenance cost", "fish tank cleaning price", "aquarium service cost Boca Raton"],
    sections: [
      {
        h: "The four things that set the price",
        p: [
          "Size is the obvious one. A 30 gallon freshwater tank and a 300 gallon reef are different jobs, and the water alone for a large saltwater change has real cost. Saltwater versus freshwater is the second: reef systems need mixed saltwater, more testing and more equipment attention. Frequency is the third, and the tank should set it, not a plan tier. Weekly for most reefs, every two to four weeks for most freshwater tanks. Equipment is the fourth. Sumps, dosing, controllers and skimmers add time to every visit.",
          "In Palm Beach County you will see companies publish monthly plans from a couple hundred dollars for a small tank on a bi-weekly schedule up to several hundred a month for large reefs on weekly visits with extras. Jason quotes each tank on its own instead of fitting it to a tier. Small tanks usually come in under the published plans, and large ones pay for the work they actually need.",
        ],
      },
      {
        h: "What a visit should include",
        p: [
          "Water testing with the numbers written down, a properly prepared water change, cleaning of glass, rock, decor and substrate, filter and equipment checks, top-off, and a look at every fish and coral. If a service is cheaper because it skips testing, it is not cheaper.",
        ],
      },
      {
        h: "What costs more than the service",
        p: [
          "A crash. A stocked reef in a Boca Raton living room can hold thousands of dollars of coral and fish, and one missed problem can take it all in a week. Most crashes show up in the test numbers a week or two before anything looks wrong. That is what the testing is for.",
        ],
      },
      {
        h: "How to get an exact number",
        p: [
          "Text Jason the tank size, whether it is saltwater or freshwater, and a photo. He replies with a price, usually the same day. If the tank needs fewer visits than you were planning on, he will say so.",
        ],
      },
    ],
    takeaway: "Price follows size, water type, frequency and equipment. Get a per-tank quote, not a tier.",
  },
  {
    slug: "hurricane-prep-for-aquariums-south-florida",
    title: "Hurricane prep for your aquarium in South Florida",
    description:
      "A practical checklist for keeping fish and coral alive through a Palm Beach County storm and power outage: air, temperature, feeding, water changes before and after, and what to do when the power comes back.",
    date: "2026-09-27",
    minutes: 7,
    image: "/images/stock/reef-tangs.jpg",
    imageAlt: "Two yellow tangs over coral in a reef aquarium",
    keywords: ["hurricane aquarium prep", "power outage fish tank", "aquarium generator Florida"],
    sections: [
      {
        h: "Before the storm",
        p: [
          "Do a water change two or three days before landfall so the tank starts the outage as clean as possible. Top off. Charge a battery air pump, or two, and test them. If you have a generator, know which outlets the return pump and heater are on. Stop feeding the day before the storm so there is less waste to break down while filtration is off.",
        ],
      },
      {
        h: "During an outage",
        p: [
          "Oxygen, temperature and the ammonia that builds while filtration is off are what kill fish in an outage. A battery air pump handles oxygen. For temperature, keep the room closed, blinds down, and the tank covered with a towel or blanket to slow heat gain in summer. Do not feed. Do not open the tank more than you must. In a heavily stocked reef, hours matter; in a lightly stocked freshwater tank you have more time.",
          "If the outage runs past a day and you have no air pump, a small partial water change with pre-mixed water at the right temperature buys time. Otherwise leave the water alone. Bottled water is not a substitute for prepared saltwater.",
        ],
      },
      {
        h: "When the power comes back",
        p: [
          "Check that pumps restarted and that nothing lost prime. Watch for a spike in ammonia or nitrite over the next few days as bacteria recover, and test daily. A water change the day after is usually the right call. If you see cloudy water, gasping fish or a smell, call before adding anything.",
        ],
      },
    ],
    takeaway: "Air, temperature, no feeding, and a water change before and after. Call Jason before the storm if you want help setting up.",
  },
  {
    slug: "how-to-choose-an-aquarium-service-boca-raton",
    title: "How to choose an aquarium service in Boca Raton",
    description:
      "What to check before hiring an aquarium maintenance company: who actually shows up, whether they test water, how they handle saltwater, what they do in an emergency, and the questions to ask before you hire anyone.",
    date: "2026-09-27",
    minutes: 6,
    image: "/images/work/lobby-reef-1200.jpg",
    imageAlt: "A wall-mounted reef aquarium in a Palm Beach County lobby",
    keywords: ["best aquarium service Boca Raton", "aquarium maintenance company reviews", "how to hire fish tank cleaner"],
    sections: [
      {
        h: "Ask who is coming",
        p: [
          "Some companies send whoever is available. Others send the owner. The difference shows in a month, when the technician who knows your tank's history notices a pump that sounds different. Ask who services the tank and whether it is the same person every visit.",
        ],
      },
      {
        h: "Ask what they test",
        p: [
          "A service that does not test water is a cleaning service, and cleaning is the easy part. For a reef, expect salinity, alkalinity, calcium, magnesium, nitrate and phosphate. For freshwater, ammonia, nitrite, nitrate, pH and hardness. Ask to see the numbers.",
        ],
      },
      {
        h: "Ask about saltwater",
        p: [
          "Where does the saltwater come from, and is it matched to your tank's salinity and temperature before it goes in? A mismatched water change is one of the most common ways a reef gets stressed by the person paid to keep it healthy.",
        ],
      },
      {
        h: "Ask what happens at nine at night",
        p: [
          "Tanks crack, pumps die and power fails on their own schedule. Ask whether the number you call is a person and how fast they can actually be there. Then read the reviews and look for the word emergency.",
        ],
      },
      {
        h: "Read the reviews for the right words",
        p: [
          "Look for reviews that describe a problem being solved, not just a tank being cleaned. Look for years, not weeks. And look for the owner replying.",
        ],
      },
    ],
    takeaway: "Same person every visit, real testing, matched saltwater, a phone that gets answered. That is the whole checklist.",
  },
  {
    slug: "boca-raton-tap-water-aquarium",
    title: "What Boca Raton tap water means for your aquarium",
    description:
      "Palm Beach County tap water comes from shallow wells, is treated with chloramine and is softened before it reaches you. Here is what that does to freshwater and reef tanks, and how to prepare water so a water change does not set the tank back.",
    date: "2026-09-27",
    minutes: 5,
    image: "/images/stock/tetras.jpg",
    imageAlt: "Neon tetras over driftwood in a planted freshwater aquarium",
    keywords: ["Boca Raton tap water aquarium", "chloramine fish tank", "RO DI water reef tank"],
    sections: [
      {
        h: "Softened and treated",
        p: [
          "Municipal water in south Palm Beach County comes from shallow wells in the surficial aquifer system, the Biscayne Aquifer in Boca Raton. The raw water is hard, but Boca Raton softens it to a moderate 65 to 80 mg/L, about 4 dGH, with a pH around 8.0 to 8.5, and other county systems land somewhat harder. It is disinfected with chloramine, which does not gas off the way chlorine does. Straight from the tap it stresses fish and damages the filter's bacteria.",
        ],
      },
      {
        h: "For freshwater tanks",
        p: [
          "A proper conditioner that neutralizes chloramine, not just chlorine, is the minimum. The pH of 8 and up is the bigger issue for soft-water fish like discus and wild tetras, and for those species blending with RO water brings it down to where they want it.",
        ],
      },
      {
        h: "For reef tanks",
        p: [
          "Reefs should never see tap water. Chloramine, the residual hardness and the high pH are wrong for mixing salt, and any phosphate or silicate in the supply feeds algae. RO/DI water, mixed with a quality salt and matched to the tank's salinity and temperature, is what Jason brings to every saltwater visit.",
        ],
      },
    ],
    takeaway: "Condition for chloramine on freshwater, use RO/DI for reefs, and know that Boca water is softened but alkaline.",
  },
  {
    slug: "why-are-my-fish-dying",
    title: "Why are my fish dying and what to do in the next hour",
    description:
      "Sudden fish losses almost always trace to water quality, temperature or disease. Here is how to tell which, what to stop doing immediately, and when to call for help in Palm Beach County.",
    date: "2026-09-27",
    minutes: 5,
    image: "/images/stock/clownfish.jpg",
    imageAlt: "A clownfish peeking out of an anemone",
    keywords: ["fish dying in tank", "aquarium emergency help", "fish gasping at surface"],
    sections: [
      {
        h: "Stop first",
        p: [
          "Stop feeding. Do not add any chemical, medication or new water until you know what is wrong. Most tanks are made worse in the first hour by well-meant fixes.",
        ],
      },
      {
        h: "Check the three things",
        p: [
          "Temperature: a failed heater or a chiller that quit in August will kill fast. Oxygen: fish gasping at the surface means a pump or air problem. Water: test ammonia, nitrite and, on a reef, salinity and alkalinity. A single number out of range usually tells the story.",
        ],
      },
      {
        h: "Look at the fish",
        p: [
          "Spots, clamped fins, rapid breathing, hiding, or one species affected and not others point to disease or aggression rather than water. Take a photo. It will help whoever you call.",
        ],
      },
      {
        h: "Then call",
        p: [
          "If more than one fish is affected or you cannot find the cause, call Jason with the photo and the test results. He has talked people through this on the phone before, and if the tank needs someone standing in front of it, he will come out.",
        ],
      },
    ],
    takeaway: "Stop feeding, check temperature, oxygen and water, photograph the fish, then call.",
  },
  {
    slug: "saltwater-vs-freshwater-aquarium-which-is-right",
    title: "Saltwater or freshwater: which aquarium is right for your home",
    description:
      "For Palm Beach County homeowners deciding on a first tank or an upgrade: cost, effort, what lives in each, how each is serviced, and which one fits a busy household.",
    date: "2026-09-27",
    minutes: 6,
    image: "/images/stock/planted-angelfish.jpg",
    imageAlt: "Angelfish in a heavily planted freshwater aquarium",
    keywords: ["saltwater vs freshwater aquarium", "first aquarium for home", "reef tank for beginners"],
    sections: [
      {
        h: "What you get",
        p: [
          "Freshwater gives you planted aquascapes, discus, angelfish, tetras, cichlids and a lower cost of entry with forgiving chemistry. Saltwater gives you coral, anemones, clownfish and tangs, and the kind of color people build a room around, with tighter chemistry and more equipment.",
        ],
      },
      {
        h: "What it takes",
        p: [
          "A freshwater tank on a service schedule needs a visit every two to four weeks. A reef usually wants weekly or bi-weekly attention with real testing. Neither is hard when someone is doing the routine; both go wrong when nobody is.",
        ],
      },
      {
        h: "What Jason usually recommends",
        p: [
          "For a family's first tank, a well-planted freshwater system stocked carefully. For a statement piece in a living room or lobby, a reef, designed with maintenance access from day one. Either way, the stocking is chosen for the tank, not the other way around.",
        ],
      },
    ],
    takeaway: "Freshwater is the forgiving one, saltwater is the showpiece. Both depend on a schedule.",
  },
  {
    slug: "moving-an-aquarium-palm-beach-county",
    title: "Moving an aquarium across town without losing a fish",
    description:
      "How a tank move actually goes in Palm Beach County: what to do the week before, how the fish and rock travel, why the filter media must never dry out, and what the new room needs before the water goes back in.",
    date: "2026-10-01",
    minutes: 6,
    image: "/images/stock/living-room-tank.jpg",
    imageAlt: "A large freshwater aquarium set into a living room wall",
    keywords: ["aquarium moving service Palm Beach County", "how to move a fish tank", "relocate aquarium Boca Raton"],
    sections: [
      {
        h: "The week before",
        p: [
          "Stop adding anything new. No fish, no coral, no fertilizer changes. Do a normal water change five or six days out, not the day before, so the tank is clean but settled. Cut feeding to once a day and skip it entirely for the last twenty four hours. Fish travel better with an empty gut and the water stays cleaner in the buckets.",
          "Measure the new spot. A filled 90 gallon tank weighs close to a thousand pounds, and a second-floor condo in Boca Raton or an older house in Lake Worth Beach may need the floor checked. Find the outlets, find the nearest water source and look at where the afternoon sun lands. A west-facing window will grow algae on the new glass within a month.",
        ],
      },
      {
        h: "What never travels in the tank",
        p: [
          "Water. A glass tank is built to be supported evenly from below. Carry it with even an inch of water sloshing in the bottom and the seams take stress they were never designed for. The sand or gravel comes out too, or at most stays as a thin damp layer. Deep substrate that has sat undisturbed for years holds pockets of gas that will foul the water the moment it is stirred.",
          "Rock, plants and filter media ride in their own containers, under tank water, out of the sun. The bacteria that keep ammonia at zero live on those surfaces, not in the water column. Let the media dry out for an hour and the tank has to cycle all over again, with the fish in it.",
        ],
      },
      {
        h: "How the fish ride",
        p: [
          "Small fish go in bags with tank water and air, inside a cooler or an insulated box so the temperature holds. Larger fish and anything with spines go in buckets with lids. Corals sit in shallow containers so they are not stacked on each other. In South Florida the car is the danger, not the distance. A sealed car in July climbs past a hundred degrees in minutes, so the fish go in last, the air conditioning runs the whole way and nobody stops for lunch.",
        ],
      },
      {
        h: "Setting back up",
        p: [
          "Level the stand first, then the tank, before a drop of water goes in. Rock and hardscape go back, then the old water that was saved, then fresh water mixed and matched to the same temperature and, for saltwater, the same salinity. Filters and heaters start, the water clears, and only then do the fish come out of their bags, floated and acclimated the way they would be on the day they were bought.",
          "Keep the lights off the first day, feed lightly for a week and test ammonia and nitrite daily for the first several days. A small bump is common. A climbing number means the bacteria took a hit and a water change is due.",
        ],
      },
      {
        h: "When to hand it off",
        p: [
          "Anything over about 50 gallons, anything in a wall, anything with a sump, and any reef tank are moves worth not doing alone. Jason moves tanks across Palm Beach County and north Broward as part of his installation work, and the same visit can swap in a bigger tank or newer equipment if the move was the excuse you were waiting for.",
        ],
      },
    ],
    takeaway: "Empty the tank fully, keep the rock and media wet, keep the fish cool, and level everything before the water goes back.",
  },
  {
    slug: "office-aquarium-palm-beach-county",
    title: "An office aquarium for your Palm Beach County business",
    description:
      "What a lobby or waiting room tank really involves: the right size for the space, where it can and cannot go, how service fits around business hours, and who looks after it over a holiday closure or a hurricane.",
    date: "2026-10-01",
    minutes: 5,
    image: "/images/stock/office-tank.jpg",
    imageAlt: "A planted aquarium on a cabinet in a clean office",
    keywords: ["office aquarium service", "lobby fish tank maintenance Palm Beach County", "commercial aquarium Boca Raton"],
    sections: [
      {
        h: "Why offices keep tanks",
        p: [
          "A waiting room with a tank is quieter. People watch fish instead of the clock, kids settle, and the front desk hears fewer complaints. Medical and dental practices figured this out decades ago, which is why so many of the tanks on Jason's route sit in offices along Glades Road, in downtown West Palm Beach and in the Jupiter medical corridor.",
          "It only works if the tank looks good every single day. A dirty tank in a lobby says more about a business than no tank at all, and that is the real reason an office tank needs a schedule rather than a volunteer from the staff.",
        ],
      },
      {
        h: "Size and placement",
        p: [
          "Bigger is easier. A 75 to 125 gallon tank holds its temperature and chemistry far better than a 20 gallon on a reception counter, and it reads as a feature instead of a fishbowl. It needs a wall that can take the weight, an outlet on its own circuit if possible, no direct sun, and a path for a water cart. In-wall tanks in a leased space usually need the landlord's sign-off before anyone cuts drywall, so that conversation comes first.",
          "Freshwater or saltwater is a budget and maintenance choice, not a looks choice. A well-planted freshwater tank or a bright African cichlid tank holds a room as well as a reef at a fraction of the running cost. A reef is the showpiece and it is serviced weekly for a reason.",
        ],
      },
      {
        h: "How service fits the business",
        p: [
          "Visits are scheduled around patients and clients, early or late or on a quiet afternoon. Access is arranged once, with a key, a code or a front desk contact, and it stays that way. Jason brings his own water, so a visit does not involve the office kitchen, and the only sign he was there is a cleaner tank.",
          "Feeding is the one daily job that stays with the office. An automatic feeder handles it, and over a long weekend or a holiday closure the feeder, an auto top-off and a quick check visit cover the gap. For a hurricane closure there is a plan written down before June, not improvised the day the cone appears.",
        ],
      },
      {
        h: "What it costs",
        p: [
          "An office tank is quoted the same way as a home tank: by size, water type, visit frequency and equipment. Most offices land on a weekly or bi-weekly visit, and the number comes before the first one, not after.",
        ],
      },
    ],
    takeaway: "Go bigger than you think, keep it out of the sun, put the feeding on a machine and the cleaning on a schedule.",
  },
  {
    slug: "aquarium-algae-types-and-what-they-mean",
    title: "Aquarium algae: what each kind is telling you",
    description:
      "Brown film, green dots, hair, red slime, green water and black tufts each point to a different cause. How to tell them apart in a Palm Beach County tank and what actually fixes each one.",
    date: "2026-10-01",
    minutes: 6,
    image: "/images/wipe/dirty.jpg",
    imageAlt: "Green algae film covering the front glass of a neglected aquarium",
    keywords: ["brown algae in fish tank", "green hair algae reef tank", "red slime cyanobacteria aquarium", "how to get rid of aquarium algae"],
    sections: [
      {
        h: "Brown dust on everything",
        p: [
          "Diatoms. A tan film on the glass, sand and rock that wipes off with a finger. It shows up in nearly every new tank and after a big substrate change because it feeds on silicates in fresh sand and tap water. It usually burns itself out in a few weeks. If it keeps coming back in an established tank, the water source is the suspect, and in Palm Beach County that often means tap water going in where RO/DI water should.",
        ],
      },
      {
        h: "Hard green dots on the glass",
        p: [
          "Green spot algae. Tiny circles that laugh at a sponge and need a blade. It likes strong light and low phosphate, so it is common on reef tanks that are otherwise very clean and on freshwater tanks sitting near a window. Scrape it on a schedule and shorten the photoperiod. It is the one algae that is more of a chore than a warning.",
        ],
      },
      {
        h: "Green hair and green fuzz",
        p: [
          "Hair algae is a nutrient problem wearing a green wig. Nitrate and phosphate are high, usually from overfeeding, too many fish, a filter that has not been cleaned, or a water change schedule that slipped. Pulling it by hand helps for a week. Fixing it means testing, cutting the food, cleaning the filter and getting water changes back on schedule, then giving the clean-up crew a chance to keep up.",
        ],
      },
      {
        h: "Red or dark slime",
        p: [
          "Cyanobacteria, called red slime in saltwater and blue-green algae in freshwater. It is a bacterium, not an algae, and it grows in sheets that peel off in one piece and smell like a swamp. It wants low flow and dissolved organics. More flow across the dead spots, a deep clean of the sand, and a hard look at the feeding usually clears it. Chemical cures exist and they treat the symptom.",
        ],
      },
      {
        h: "Green water you cannot see through",
        p: [
          "Free-floating single-celled algae, mostly a freshwater and pond problem. Light plus nutrients, often after a filter was rinsed in tap water and the bacteria crashed. Water changes alone rarely win because the algae doubles faster than you can dilute it. A few days of darkness or a UV sterilizer clears it, and then the cause gets fixed so it stays clear.",
        ],
      },
      {
        h: "Black tufts and bubbles",
        p: [
          "Black beard algae in planted tanks grows on leaf edges and driftwood where flow is weak and carbon dioxide swings. Steady CO2, better circulation and trimming the worst leaves beat it. In reefs, green bubble algae is a different animal, a sack that spreads when it pops, so it comes out whole, by hand, with the tank's water running through a filter sock. Bryopsis, the feathery one, needs a specific treatment and is worth a photo to Jason before trying anything.",
        ],
      },
      {
        h: "The pattern underneath",
        p: [
          "Almost every algae comes down to light, nutrients and flow. A South Florida tank near a window gets more light than its owner thinks. A tank fed twice a day by two different people gets more nutrients than anyone admits. And a pump that has slowed with age moves less water than the day it was bought. Test the water, read the numbers and the algae will tell you which of the three it is.",
        ],
      },
    ],
    takeaway: "Brown means new or silicates, green dots mean light, hair means nutrients, slime means flow, green water means both. Fix the cause or it comes back.",
  },
  {
    slug: "koi-pond-care-south-florida-year",
    title: "Koi pond care through a South Florida year",
    description:
      "Palm Beach County ponds skip the frozen winter and get a long hot summer instead. Season by season: heat and oxygen, rainy-season runoff, hurricane prep, cool-front feeding, spawning and the predators that visit at dawn.",
    date: "2026-10-01",
    minutes: 6,
    image: "/images/stock/koi-group.jpg",
    imageAlt: "A group of koi gathered near the surface of a clear garden pond",
    keywords: ["koi pond maintenance Florida", "pond algae green water South Florida", "koi pond service Wellington", "koi feeding temperature"],
    sections: [
      {
        h: "Summer is the hard season",
        p: [
          "Up north a pond's danger is ice. Here it is heat. Warm water holds less oxygen, and a pond at 88 degrees with a dozen big koi and a weak air pump can lose fish overnight with no warning. Summer means aeration running around the clock, shade over at least part of the surface from plants or a sail, and never cleaning the filter and doing a large water change on the same hot afternoon.",
          "Feed in the morning and evening when the water is cooler and skip feeding entirely on days over 90. Koi are always happy to eat. They are not always able to digest.",
        ],
      },
      {
        h: "Rainy season and runoff",
        p: [
          "The afternoon storms from June to October do two things to a pond. They dump a lot of soft, acidic rain that can move pH fast, and they wash fertilizer, mulch and dirt off the lawn and into the water. A pond in Wellington or Royal Palm Beach with a grass slope running toward it gets a dose of lawn fertilizer with every storm, which is exactly the fuel string algae wants.",
          "A lip or a planted edge that keeps runoff out does more for water quality than any chemical. After a very heavy rain, test and skim the surface, and check that the overflow is clear so the pond drains where it is supposed to and not into the house.",
        ],
      },
      {
        h: "Hurricane season",
        p: [
          "The pond has the same two problems as a tank in a storm, no power and debris, plus a third: it can flood. Before a storm, lower the level a few inches, pull or secure anything that can blow in, and have a battery air pump ready. After, net out leaves and branches before they rot, test ammonia, and expect the water to go cloudy and then clear over a week as the filter catches up. Power can be out for days, and koi survive that far better with air than with a running pump that does nothing.",
        ],
      },
      {
        h: "The cool fronts",
        p: [
          "December through February brings a handful of nights in the 40s, and the western communities cool off more than the coast. Koi slow down below 60 degrees and their digestion slows faster than their appetite. Switch to a wheat germ food and feed less when the water drops into the 50s, and skip a day entirely after a front. The pond does not need to be shut down; it needs you to stop feeding like it is July.",
        ],
      },
      {
        h: "Spring spawning and visitors",
        p: [
          "As the water warms through March and April, koi spawn. It looks like a fight at dawn, the water goes milky from the eggs, and ammonia can spike. A water change the next day settles it. Spring also brings the herons, and raccoons and otters are year-round, so a pond with nowhere for the fish to hide loses fish. Depth, overhangs and a few tunnels of pipe on the bottom are the real defense.",
        ],
      },
      {
        h: "What a service visit covers",
        p: [
          "Skimmer and filter cleaning, a proper water change with dechlorinated water, string algae removal, pump and UV checks, a look at every fish for ulcers or clamped fins, and water testing written down. Ponds in Boca Raton, Delray Beach and Wellington are part of Jason's regular route, on a schedule set by the season, more often in the hottest months.",
        ],
      },
    ],
    takeaway: "Oxygen in summer, runoff in the rain, air during a storm, lighter feeding on cool nights, and hiding places all year.",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

// Which guides each service and specialty page links to. Every guide is
// linked from at least one money page so none of them sits orphaned.
const related: Record<string, string[]> = {
  "aquarium-cleaning-maintenance": ["aquarium-maintenance-cost-palm-beach-county", "aquarium-algae-types-and-what-they-mean", "how-to-choose-an-aquarium-service-boca-raton"],
  "aquarium-design-installation": ["saltwater-vs-freshwater-aquarium-which-is-right", "office-aquarium-palm-beach-county", "moving-an-aquarium-palm-beach-county"],
  "aquarium-assessment": ["aquarium-algae-types-and-what-they-mean", "why-are-my-fish-dying", "boca-raton-tap-water-aquarium"],
  "emergency-aquarium-service": ["why-are-my-fish-dying", "hurricane-prep-for-aquariums-south-florida", "moving-an-aquarium-palm-beach-county"],
  "saltwater-reef-aquariums": ["aquarium-algae-types-and-what-they-mean", "boca-raton-tap-water-aquarium", "saltwater-vs-freshwater-aquarium-which-is-right"],
  "freshwater-planted-aquariums": ["aquarium-algae-types-and-what-they-mean", "saltwater-vs-freshwater-aquarium-which-is-right", "office-aquarium-palm-beach-county"],
  "ponds-water-gardens": ["koi-pond-care-south-florida-year", "hurricane-prep-for-aquariums-south-florida", "aquarium-algae-types-and-what-they-mean"],
};

export function guidesFor(pageSlug: string): Guide[] {
  return (related[pageSlug] ?? []).map(getGuide).filter((g): g is Guide => Boolean(g));
}

/** The next three guides in order, wrapping around, so every guide is linked
 *  from three others instead of the first three getting every link. */
export function nextGuides(slug: string, n = 3): Guide[] {
  const i = guides.findIndex((g) => g.slug === slug);
  return Array.from({ length: Math.min(n, guides.length - 1) }, (_, k) => guides[(i + 1 + k) % guides.length]);
}
