// One entry per service-area page. Every city gets hand-written local copy,
// its own neighborhoods, its own angle and its own FAQ so no two pages read
// as a find-and-replace of each other.

import type { Faq } from "./services";

export type City = {
  slug: string;
  name: string;
  county: "Palm Beach" | "Broward";
  zips: string[];
  drive: string; // service region label (county), never a drive time
  lead: string; // the 40 to 80 word answer capsule that opens the page
  local: string[]; // two or three unique paragraphs
  neighborhoods: string[];
  landmarks?: string[];
  angle: string; // what kind of tanks / clients dominate here
  faqs: Faq[];
  nearby: string[]; // slugs
};

export const cities: City[] = [
  {
    slug: "boca-raton",
    name: "Boca Raton",
    county: "Palm Beach",
    zips: ["33431", "33432", "33433", "33434", "33486", "33487", "33496", "33498"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service is a mobile aquarium cleaning, installation and consultation company serving Boca Raton. Jason services saltwater reef tanks, freshwater and planted aquariums and ponds in homes, offices and lobbies across Boca, from Broken Sound and Woodfield to Mizner Park and the beachside estates, on weekly, bi-weekly or monthly schedules.",
    local: [
      "Boca is a big part of the route. Much of it runs through the country club communities west of I-95, the office parks along Glades Road and Yamato Road, and the older neighborhoods east of Federal Highway where built-in tanks were part of the original architecture. A reef tank in Broken Sound and a discus tank in Old Floresta get the same attention: water tested, glass and rock cleaned, equipment checked, every fish looked at.",
      "A lot of the Boca work is commercial. Medical offices near Boca Raton Regional Hospital, law firms downtown and the corporate campuses along the Yamato corridor keep tanks because they calm a waiting room. Those tanks get serviced around business hours, with access arrangements made once and kept.",
      "Boca tap water is hard and treated, which matters for freshwater tanks and reef tanks alike. Jason mixes saltwater and conditions freshwater ahead of every visit so a water change never shocks the system.",
    ],
    neighborhoods: [
      "Broken Sound",
      "Woodfield Country Club",
      "St. Andrews",
      "Boca West",
      "Boca Pointe",
      "Boca Del Mar",
      "Mission Bay",
      "Boca Winds",
      "Loggers' Run",
      "Boca Falls",
      "Mizner Park",
      "Royal Palm Yacht & Country Club",
      "Old Floresta",
      "Spanish River",
      "Boca Harbour",
      "Polo Club",
    ],
    landmarks: ["Mizner Park", "Town Center at Boca Raton", "Boca Raton Regional Hospital", "Florida Atlantic University"],
    angle: "country-club reef tanks, downtown offices and lobby aquariums",
    faqs: [
      {
        q: "Do you service aquariums in west Boca and east Boca?",
        a: "Yes. Jason covers the whole city, from the communities along 441 to the beachside neighborhoods east of Federal Highway.",
      },
      {
        q: "Can you maintain the aquarium in my Boca Raton office or medical practice?",
        a: "Yes. Office, lobby and waiting-room tanks are serviced on a schedule that fits your hours, and Jason can work while the office is closed if access is arranged.",
      },
      {
        q: "How quickly can you come out to Boca Raton for an aquarium emergency?",
        a: "Boca is on Jason's route most days. Call or text right away if a tank is leaking, cracked or crashing and he will tell you honestly how fast he can be there.",
      },
    ],
    nearby: ["west-boca-raton", "delray-beach", "deerfield-beach", "highland-beach", "parkland"],
  },
  {
    slug: "west-boca-raton",
    name: "West Boca",
    county: "Palm Beach",
    zips: ["33428", "33433", "33434", "33498"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service is in the west Boca communities along 441 and Glades Road every week: Boca Winds, Loggers' Run, Mission Bay, Boca Falls, Sandalfoot Cove, Boca Pointe and the neighbors in between. Reef tanks, freshwater tanks and backyard ponds, cleaned and maintained on a schedule.",
    local: [
      "West Boca is unincorporated Palm Beach County, and for aquarium owners that mostly means big family homes with room for a tank and a lot of west-facing windows. Sun on a tank is the most common cause of the algae problems Jason sees out here, and it is fixable with placement, lighting schedules and a proper maintenance rhythm.",
      "West Boca sits in the middle of Jason's route, so scheduling here is easy and a problem gets looked at fast. A cracked tank in Boca Winds or a failed pump in Mission Bay is on the way to somewhere else, not a trip across the county.",
    ],
    neighborhoods: [
      "Boca Winds",
      "Loggers' Run",
      "Mission Bay",
      "Boca Falls",
      "Sandalfoot Cove",
      "Boca Pointe",
      "Boca Greens",
      "Boca Isles",
      "The Hamptons at Boca Raton",
      "Stonebridge",
      "Saturnia",
      "Boca Lago",
      "Whisper Walk",
      "Century Village Boca",
    ],
    angle: "large family homes along 441, sun-exposed tanks, backyard ponds",
    faqs: [
      {
        q: "Is west Boca inside your normal service area?",
        a: "Yes. The communities along 441 and Glades Road are in the middle of Jason's route and easy to schedule.",
      },
      {
        q: "My tank in west Boca gets a lot of algae. Can you fix that?",
        a: "Usually, yes. Sun exposure, lighting hours and nutrient levels are the typical causes here, and all three can be corrected with the right setup and a regular service schedule.",
      },
    ],
    nearby: ["boca-raton", "delray-beach", "parkland", "coral-springs", "deerfield-beach"],
  },
  {
    slug: "delray-beach",
    name: "Delray Beach",
    county: "Palm Beach",
    zips: ["33444", "33445", "33446", "33483", "33484"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service cleans, installs and troubleshoots aquariums throughout Delray Beach, from the west Delray communities near Kings Point and the Villages of Oriole to downtown Atlantic Avenue and the beachside streets east of the Intracoastal. Saltwater, reef, freshwater, planted tanks and ponds, serviced on a schedule by Jason himself.",
    local: [
      "Delray is familiar ground. The 55-plus communities west of Military Trail have a lot of long-time hobbyists with well-established tanks that need steady, knowledgeable care rather than a salesperson. Several of Jason's longest client relationships are here.",
      "Downtown Delray is a different job: restaurants and bars along Atlantic Avenue, small offices and condos where the tank was chosen by a designer. Those systems get serviced early or after hours so the room is ready when guests arrive.",
      "Delray also has some of the prettiest planted freshwater tanks on the route. The lighting in a bright Lake Ida or Tropic Isle home is a gift for plants and a challenge for algae, and the maintenance plan is built around that.",
    ],
    neighborhoods: [
      "Downtown Delray and Atlantic Avenue",
      "Lake Ida",
      "Tropic Isle",
      "Seagate",
      "Kings Point",
      "Villages of Oriole",
      "Huntington Lakes",
      "Gleneagles",
      "Polo Trace",
      "Seven Bridges",
      "The Bridges",
      "Addison Reserve",
      "Mizner Country Club",
      "Delray Lakes",
    ],
    landmarks: ["Atlantic Avenue", "Delray Municipal Beach", "Morikami Museum and Japanese Gardens"],
    angle: "long-time hobbyists in west Delray, restaurant and condo tanks downtown",
    faqs: [
      {
        q: "Do you service aquariums in the 55-plus communities in west Delray?",
        a: "Yes. Kings Point, the Villages of Oriole, Huntington Lakes and the surrounding communities are on the regular route, and Jason has serviced tanks there for years.",
      },
      {
        q: "Can you maintain a restaurant aquarium on Atlantic Avenue?",
        a: "Yes. Restaurant and bar tanks in downtown Delray are serviced outside of busy hours so the dining room is never disrupted.",
      },
      {
        q: "Do you set up new tanks in Delray Beach?",
        a: "Yes. Design, installation, cycling and stocking are all handled, whether it is a new build or a replacement for a tank that has outgrown its equipment.",
      },
    ],
    nearby: ["boca-raton", "boynton-beach", "highland-beach", "gulf-stream", "west-boca-raton"],
  },
  {
    slug: "highland-beach",
    name: "Highland Beach",
    county: "Palm Beach",
    zips: ["33487"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains aquariums in the oceanfront condos and estates of Highland Beach, along A1A between Boca Raton and Delray Beach. Reef tanks and freshwater systems in high-rise units and single-family homes are cleaned and tested on a schedule, with building access and elevator logistics handled quietly.",
    local: [
      "Highland Beach is three miles of A1A, almost all of it residential and much of it high-rise. Servicing a reef tank on the fourteenth floor means carrying mixed saltwater up, coordinating with the front desk and leaving the unit exactly as it was found. Jason has done this enough times that it is routine.",
      "Salt air and ocean-facing glass mean corrosion and heat are the equipment enemies here. Pumps, lights and controllers are checked at every visit, and anything showing wear is flagged before it fails during a hot August week.",
    ],
    neighborhoods: ["Boca Highland", "Toscana", "Villa Magna", "Regency Highland", "Coronado at Highland Beach", "Bel Lido Isle"],
    angle: "oceanfront condos and estates, high-rise logistics, salt-air equipment wear",
    faqs: [
      {
        q: "Can you service an aquarium in a Highland Beach condo building?",
        a: "Yes. Jason works with front desks and building management regularly, and brings everything needed for a water change into the unit.",
      },
      {
        q: "Does salt air affect my aquarium equipment?",
        a: "It can. Ocean-facing homes see faster corrosion on metal parts and more heat load, so equipment checks are part of every visit in Highland Beach.",
      },
    ],
    nearby: ["boca-raton", "delray-beach", "gulf-stream", "ocean-ridge"],
  },
  {
    slug: "boynton-beach",
    name: "Boynton Beach",
    county: "Palm Beach",
    zips: ["33435", "33436", "33437", "33472", "33473", "33426"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service provides aquarium cleaning, maintenance, installation and assessments across Boynton Beach, from the Canyon and Valencia communities in west Boynton to the marina district and the neighborhoods east of I-95. Reef, saltwater, freshwater, planted tanks and ponds are serviced on a schedule.",
    local: [
      "West Boynton has grown fast, and a lot of the newer homes in the Canyon communities, Cobblestone Creek and the Valencias came with a built-in spot for an aquarium. Setting those up right the first time, with filtration sized for the tank and a maintenance plan from day one, avoids the crash-and-restart cycle so many new owners go through.",
      "East Boynton, around the marina and the Intracoastal, has older homes with older tanks and a lot of ponds. Jason handles both, including the koi ponds that need real filtration to stay clear through a Florida summer.",
    ],
    neighborhoods: [
      "Canyon Lakes and Canyon Isles",
      "Valencia communities",
      "Cobblestone Creek",
      "Aberdeen",
      "Boynton Lakes",
      "Hunters Run",
      "Quail Ridge",
      "Ocean Ridge (adjacent)",
      "Boynton Harbor Marina district",
      "Leisureville",
    ],
    landmarks: ["Boynton Harbor Marina", "Oceanfront Park", "Green Cay Nature Center"],
    angle: "new-construction built-ins in west Boynton, koi ponds and older homes east",
    faqs: [
      {
        q: "Do you service koi ponds in Boynton Beach?",
        a: "Yes. Pond cleaning, filter and pump service, and water clarity problems are all handled, along with tanks inside the house.",
      },
      {
        q: "Can you set up the aquarium space in my new Boynton Beach home?",
        a: "Yes. Jason designs and installs new systems, sizes the filtration properly and puts a maintenance plan in place from the first day.",
      },
    ],
    nearby: ["delray-beach", "lantana", "ocean-ridge", "gulf-stream", "wellington"],
  },
  {
    slug: "gulf-stream",
    name: "Gulf Stream",
    county: "Palm Beach",
    zips: ["33483"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains aquariums in the estate homes of Gulf Stream, the small oceanside town between Delray Beach and Briny Breezes. Discreet, scheduled service for reef tanks, freshwater displays and water features, arranged through the household when that is how the house runs.",
    local: [
      "Gulf Stream is under a thousand residents and almost entirely estate homes along A1A and the Intracoastal. Aquariums here are usually large, specified by the architect and built into the house, so the service has to be tidy and on time, and guests should never know it happened. Jason works with household staff and property managers to keep it that way.",
      "Nobody in Gulf Stream wants to think about the aquarium. A standing visit at the same time each week keeps a large reef system stable, and keeps it off everyone's list.",
    ],
    neighborhoods: ["Gulf Stream Golf Club area", "Place Au Soleil", "Polo Drive", "Ocean Boulevard estates"],
    angle: "estate homes, staff coordination, large architect-specified systems",
    faqs: [
      {
        q: "Can you coordinate aquarium service with my house manager or staff?",
        a: "Yes. Jason works with household staff and property managers in Gulf Stream all the time and keeps a standing schedule so nothing has to be arranged twice.",
      },
    ],
    nearby: ["delray-beach", "highland-beach", "ocean-ridge", "boynton-beach"],
  },
  {
    slug: "ocean-ridge",
    name: "Ocean Ridge",
    county: "Palm Beach",
    zips: ["33435"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service cleans and maintains aquariums in Ocean Ridge, the barrier-island town east of Boynton Beach. Reef and freshwater tanks in oceanfront and Intracoastal homes are serviced on a schedule, with equipment checks that account for salt air and summer heat.",
    local: [
      "Ocean Ridge homes sit between the Atlantic and the Intracoastal, and many of them have a tank facing the water view. Bright rooms, salt air and the heat that comes off ocean-facing glass all affect a reef system, and Jason plans the lighting and cooling around it.",
      "It is a small town with a lot of seasonal residents. Jason keeps the tank healthy while the owners are away and has it looking right for the week they come back.",
    ],
    neighborhoods: ["Ocean Ridge Yacht Club", "Crown Colony Club", "Tropical Drive", "Old Ocean Boulevard"],
    angle: "seasonal residents, oceanfront light and heat, tanks kept ready while owners travel",
    faqs: [
      {
        q: "Can you keep my aquarium running while I am away for the season?",
        a: "Yes. Standing service visits continue while you travel, and Jason texts you if anything needs a decision.",
      },
    ],
    nearby: ["boynton-beach", "gulf-stream", "manalapan", "highland-beach"],
  },
  {
    slug: "lantana",
    name: "Lantana",
    county: "Palm Beach",
    zips: ["33462"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service handles aquarium cleaning, maintenance and setup in Lantana, including Hypoluxo Island and the neighborhoods along the Intracoastal. Freshwater community tanks, saltwater systems and ponds are serviced on a regular schedule by Jason himself.",
    local: [
      "Lantana is one of the older waterfront towns in the county, with a mix of cottages, canal homes and newer townhomes. Tanks here range from a kid's first freshwater setup to serious reef systems on Hypoluxo Island, and each gets a plan sized to it.",
      "Lantana was a fishing town before it was anything else, and a lot of clients here want fish they can talk about. Jason helps pick livestock that will do well in the tank they own rather than the tank they wish they had.",
    ],
    neighborhoods: ["Hypoluxo Island", "Lantana Heights", "Sea Pines", "Lantana Shores"],
    angle: "waterfront cottages and canal homes, first tanks and serious reefs alike",
    faqs: [
      {
        q: "Do you help beginners in Lantana set up a first aquarium?",
        a: "Yes. Some of Jason's longest clients started as beginners he taught to keep a tank. A setup visit and a few scheduled cleanings get most people on their feet.",
      },
    ],
    nearby: ["boynton-beach", "lake-worth-beach", "manalapan", "ocean-ridge"],
  },
  {
    slug: "lake-worth-beach",
    name: "Lake Worth Beach",
    county: "Palm Beach",
    zips: ["33460", "33461", "33463", "33467"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service cleans, maintains and installs aquariums in Lake Worth Beach and the western Lake Worth communities out toward 441. Reef tanks, freshwater and planted aquariums, and ponds are serviced on a schedule for homes, shops and offices.",
    local: [
      "Lake Worth Beach has an old downtown with galleries, restaurants and shops on Lake and Lucerne Avenues, and a fair number of them keep a tank as part of the look. Servicing those means working around foot traffic and leaving the glass clean before the first customer walks in.",
      "West of the city, the communities along Lake Worth Road and out toward 441 are family neighborhoods with a lot of first-time tank owners. Jason sets those tanks up properly and teaches owners what the water is telling them.",
    ],
    neighborhoods: ["Downtown Lake Worth Beach", "College Park", "Parrot Cove", "Lake Osborne", "Lake Charleston", "Winston Trails", "Lake Worth Corridor"],
    angle: "downtown shop and restaurant tanks, family homes and first-time owners to the west",
    faqs: [
      {
        q: "Do you service aquariums in shops and restaurants in downtown Lake Worth Beach?",
        a: "Yes. Commercial tanks are serviced on a schedule that avoids your busiest hours.",
      },
    ],
    nearby: ["lantana", "boynton-beach", "wellington", "west-palm-beach"],
  },
  {
    slug: "greenacres",
    name: "Greenacres",
    county: "Palm Beach",
    zips: ["33463", "33467"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service cleans, sets up and maintains aquariums in Greenacres. Freshwater community tanks, first tanks for kids, planted tanks and small reefs in homes along Jog Road, Lake Worth Road and Forest Hill Boulevard get tested water, clean glass and an honest read on what the tank needs, weekly, bi-weekly or monthly.",
    local: [
      "Greenacres is a family town, and the tanks here reflect it. A lot of the work is a 29 to 75 gallon freshwater tank in a living room or a kid's bedroom, set up with good intentions and now a little greener than anyone wanted. Those tanks rarely need anything dramatic. They need the filter cleaned properly, the right amount of water changed, a feeding routine that does not drown the fish, and someone who can explain why it went cloudy.",
      "A first tank goes better with a plan. Jason helps families pick fish that will actually get along at their adult size, which matters more than most pet store tags suggest, and sets up a schedule that fits a busy house. Some families want a visit every two weeks. Others want one deep clean and a lesson, then a check-in when something looks off.",
      "Greenacres water comes through a treated municipal supply with chloramine in it, which does not boil or gas off the way plain chlorine does. Every bucket of new water needs a conditioner that handles chloramine, and the dose has to match the volume. Getting that wrong is one of the quiet reasons first tanks lose fish in their first month.",
    ],
    neighborhoods: ["Jog Road corridor", "Lake Worth Road corridor", "Forest Hill Boulevard area", "Melaleuca Lane area", "Haverhill Road area"],
    landmarks: ["Okeeheelee Park"],
    angle: "family homes, first tanks and freshwater community tanks",
    faqs: [
      {
        q: "My kids' tank keeps turning cloudy. Can you fix it for good?",
        a: "Usually, yes. Cloudy water in a family tank almost always comes from overfeeding, a filter cleaned the wrong way or too many fish for the tank. Jason tests the water, fixes the cause and shows the family what to change so it stays clear between visits.",
      },
      {
        q: "Do you help pick fish for a first tank in Greenacres?",
        a: "Yes. Jason recommends fish that fit the tank at their adult size and get along with each other, and stocks the tank in stages so the filter can keep up.",
      },
    ],
    nearby: ["lake-worth-beach", "wellington", "lantana", "boynton-beach"],
  },
  {
    slug: "wellington",
    name: "Wellington",
    county: "Palm Beach",
    zips: ["33414", "33449", "33467"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service provides aquarium maintenance, installation and pond service in Wellington and the surrounding equestrian communities. Reef tanks, freshwater displays and backyard ponds in the Aero Club, Palm Beach Polo, Olympia and the neighboring villages are cleaned and tested on a regular schedule.",
    local: [
      "Wellington is horse country, with large properties, outbuildings and a lot of outdoor water. Ponds and water gardens are a bigger part of the work here than anywhere else on the route, and Florida summers are hard on them. Real filtration, UV clarification and regular cleanouts keep them clear.",
      "Inside the house, Wellington homes tend to have room for a big display tank, and seasonal residents want it looking right when they arrive for the winter circuit. Jason keeps those systems stable year round and adds a visit before the season starts.",
    ],
    neighborhoods: ["Aero Club", "Palm Beach Polo and Country Club", "Olympia", "Versailles", "Buena Vida", "Wellington's Edge", "Binks Forest", "Grand Isles"],
    landmarks: ["Wellington International", "Wellington Green"],
    angle: "equestrian estates, ponds and water gardens, seasonal residents",
    faqs: [
      {
        q: "Do you service ponds and water features in Wellington?",
        a: "Yes. Pond cleaning, filter and pump service and water clarity problems are a regular part of Jason's work in Wellington.",
      },
      {
        q: "Can you get my aquarium ready before we arrive for the season?",
        a: "Yes. Standing service keeps the tank healthy while you are away, and Jason can add a visit right before you return so it is clean when you walk in.",
      },
    ],
    nearby: ["royal-palm-beach", "lake-worth-beach", "west-palm-beach", "boynton-beach"],
  },
  {
    slug: "royal-palm-beach",
    name: "Royal Palm Beach",
    county: "Palm Beach",
    zips: ["33411"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains and installs aquariums in Royal Palm Beach and the neighboring Acreage communities. Freshwater tanks, saltwater systems and ponds in family homes are cleaned, tested and kept healthy on a scheduled visit.",
    local: [
      "Royal Palm Beach is family neighborhoods and larger lots, and a lot of tanks here belong to kids who got hooked. Jason takes those seriously: a properly set up freshwater tank with the right fish is a hobby that lasts, and a badly set up one is a dead fish and a kid who quits.",
      "The Acreage and Loxahatchee properties to the west have well water and space for ponds, both of which change how a system needs to be run. Water is tested and treated accordingly.",
    ],
    neighborhoods: ["Madison Green", "Saratoga Lakes", "Counterpoint Estates", "La Mancha", "The Acreage (adjacent)"],
    angle: "family homes, kids' first tanks, well water and ponds to the west",
    faqs: [
      {
        q: "We have well water. Does that affect the aquarium?",
        a: "It can. Well water varies in hardness, iron and other minerals, so Jason tests it and conditions or substitutes water as needed.",
      },
    ],
    nearby: ["wellington", "west-palm-beach", "lake-worth-beach"],
  },
  {
    slug: "westlake",
    name: "Westlake",
    county: "Palm Beach",
    zips: ["33470"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service designs, installs and maintains aquariums in Westlake. New construction is the best time to plan a tank, and Jason helps Westlake homeowners place a built-in or freestanding aquarium before the drywall and outlets are final, then keeps it healthy with regular cleaning and water testing.",
    local: [
      "Westlake is the newest city in Palm Beach County, and most of the homes off Seminole Pratt Whitney Road are new or still going up. That changes the conversation. In an older house the tank has to fit the room. In a new one the room can be planned around the tank: a dedicated outlet, a wall that can carry a few hundred pounds of water, a closet behind an in-wall tank for the filtration, and a path for a water cart that does not cross the new floors.",
      "Built-in tanks designed from the start are easier to live with for years. The equipment is hidden but reachable, the lights are on a timer that suits the room, and a service visit takes less time because nothing is wedged behind a cabinet. Jason talks through those details with the homeowner and, when it helps, with the builder.",
      "New homes also have new everything in the water lines. Fresh plumbing and municipal water with chloramine both point to conditioning every drop that goes into a tank, and for a reef, using RO/DI water rather than tap.",
    ],
    neighborhoods: ["Westlake new-home communities", "Seminole Pratt Whitney Road corridor"],
    landmarks: ["Westlake Adventure Park"],
    angle: "new construction, built-in tanks designed with the house",
    faqs: [
      {
        q: "We are building in Westlake. When should we plan the aquarium?",
        a: "Before the walls are closed if you want an in-wall or built-in tank. Jason can walk the plans with you so the outlet, the wall support and the equipment space are right the first time.",
      },
      {
        q: "Do you install freestanding tanks in new homes too?",
        a: "Yes. Freestanding tanks on a proper stand are often the simplest option, and Jason will tell you which makes more sense for the room and the fish you want.",
      },
    ],
    nearby: ["the-acreage", "royal-palm-beach", "wellington", "palm-beach-gardens"],
  },
  {
    slug: "the-acreage",
    name: "The Acreage",
    county: "Palm Beach",
    zips: ["33470", "33411", "33412"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains aquariums and backyard ponds in The Acreage and Loxahatchee. Homes on well water need their tank water handled differently, and Jason tests, conditions and prepares water for reef tanks, freshwater tanks and ponds on large Acreage lots on a regular schedule.",
    local: [
      "Most homes in The Acreage run on private wells, and well water is the single biggest difference between a tank here and one in town. Acreage wells commonly carry iron, hardness and sometimes the rotten egg smell of hydrogen sulfide, and every home's softener or filter setup is a little different. Water that is fine for a shower can still stain a tank orange, feed algae or swing pH in a planted tank.",
      "So the first visit starts with the water. Jason tests what comes out of the tap after the house treatment, then decides what the tank needs: conditioned well water for a hardy freshwater tank, or RO/DI water for a reef and for sensitive fish. Saltwater for reef tanks is mixed from purified water ahead of every visit.",
      "The lots are big, and a lot of them have ponds, canals and room for a water feature. Pond service here means managing the runoff from lawns and horse paddocks, keeping pumps clear of leaves and debris and keeping fish safe from the herons and otters that live along the canals.",
    ],
    neighborhoods: ["The Acreage", "Loxahatchee", "Loxahatchee Groves", "Orange Boulevard area", "Hamlin Boulevard area", "Seminole Pratt Whitney Road area"],
    landmarks: ["Acreage Community Park", "Lion Country Safari"],
    angle: "large lots on well water, backyard ponds and canals",
    faqs: [
      {
        q: "Can I use my well water in my aquarium?",
        a: "Sometimes. It depends on what your well and treatment system put out. Jason tests it first. Hardy freshwater tanks can often use conditioned well water, while reef tanks and sensitive fish do better on RO/DI water.",
      },
      {
        q: "Do you service ponds in The Acreage and Loxahatchee?",
        a: "Yes. Pond cleaning, pump and filter service, algae control and fish health checks are part of the work on Acreage and Loxahatchee properties.",
      },
    ],
    nearby: ["westlake", "royal-palm-beach", "jupiter-farms", "wellington"],
  },
  {
    slug: "manalapan",
    name: "Manalapan",
    county: "Palm Beach",
    zips: ["33462"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains aquariums in the oceanfront and Intracoastal estates of Manalapan, south of Palm Beach. Large reef systems and freshwater displays are serviced discreetly on a standing schedule, with staff and property managers kept informed.",
    local: [
      "Manalapan is a small town of very large homes, and an aquarium there is usually a major architectural feature with its own equipment room. Service is about consistency and discretion: same day each week, same technician, nothing left out of place.",
      "Ocean-to-lake lots take salt air on one side and afternoon sun on the other, and the equipment checks at each visit account for both.",
    ],
    neighborhoods: ["Point Manalapan", "South Ocean Boulevard", "Lands End Road"],
    angle: "estate-scale systems, equipment rooms, discretion",
    faqs: [
      {
        q: "Can you service a large aquarium with its own equipment room?",
        a: "Yes. Sumps, dosing, controllers and lighting in a dedicated equipment room are part of a normal visit for Jason.",
      },
    ],
    nearby: ["ocean-ridge", "lantana", "palm-beach", "boynton-beach"],
  },
  {
    slug: "west-palm-beach",
    name: "West Palm Beach",
    county: "Palm Beach",
    zips: ["33401", "33405", "33407", "33409", "33411", "33412"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service provides aquarium cleaning, maintenance and installation in West Palm Beach, including downtown, the Flagler waterfront, El Cid, Ibis and the communities west of the turnpike. Reef, saltwater and freshwater tanks in homes, offices and lobbies are serviced on a schedule.",
    local: [
      "Downtown West Palm has more office and lobby aquariums than anywhere else on the route: law firms, medical offices, hotels and the towers along Flagler Drive. A lobby tank is the first thing a client sees, so those get serviced early, before the doors open.",
      "The historic neighborhoods south of downtown, El Cid, Flamingo Park and the South End, have older homes and long-time hobbyists with established tanks. Out west, Ibis and Breakers West have the larger new builds with room for a serious display system.",
    ],
    neighborhoods: ["Downtown and Flagler Drive", "El Cid", "Flamingo Park", "South End", "Northwood", "Ibis", "Breakers West", "Bear Lakes"],
    landmarks: ["Clematis Street", "The Square", "Palm Beach Outlets"],
    angle: "downtown office and lobby tanks, historic neighborhoods, larger builds west",
    faqs: [
      {
        q: "Do you maintain office and lobby aquariums in downtown West Palm Beach?",
        a: "Yes. Commercial tanks are serviced on a schedule that fits business hours, and access is arranged once with your building.",
      },
      {
        q: "Is West Palm Beach inside your regular route?",
        a: "Yes. It is on the northern end of Jason's route, and visits are grouped with Palm Beach and the Gardens so the schedule holds.",
      },
    ],
    nearby: ["palm-beach", "lake-worth-beach", "wellington", "palm-beach-gardens"],
  },
  {
    slug: "palm-beach",
    name: "Palm Beach",
    county: "Palm Beach",
    zips: ["33480"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains aquariums on the island of Palm Beach, from the estates along South Ocean Boulevard to the condos and clubs near Worth Avenue. Reef and freshwater systems are serviced on a standing weekly schedule, quietly, through the household when that is how the house runs.",
    local: [
      "Palm Beach aquariums are often large, custom and part of an interior designed down to the inch. The job is to keep the system stable and the display clean without anyone noticing the work. Jason coordinates with staff, arrives at the same time each week and leaves the room the way he found it.",
      "Seasonal residency is the norm, so the tank has to look right in November and stay healthy in July. A standing schedule does both.",
    ],
    neighborhoods: ["Estate Section", "Worth Avenue and Midtown", "North End", "Everglades Island", "Sloan's Curve"],
    landmarks: ["Worth Avenue", "The Breakers"],
    angle: "designed interiors, seasonal residents, staff coordination",
    faqs: [
      {
        q: "Do you work with designers and household staff on Palm Beach?",
        a: "Yes. Jason coordinates with designers on new installations and with staff on ongoing service, and keeps the same weekly time so nothing needs re-arranging.",
      },
    ],
    nearby: ["west-palm-beach", "manalapan", "palm-beach-gardens"],
  },
  {
    slug: "palm-beach-gardens",
    name: "Palm Beach Gardens",
    county: "Palm Beach",
    zips: ["33403", "33408", "33410", "33418"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service cleans, maintains and installs aquariums in Palm Beach Gardens, including PGA National, Mirasol, Frenchman's Reserve and the neighborhoods around the Gardens Mall. Reef, saltwater and freshwater tanks are serviced on a regular schedule.",
    local: [
      "The Gardens is golf-club living, and the tanks match: large displays in great rooms, often built in during construction. Jason keeps them stable with scheduled water changes and equipment checks, and steps in for upgrades when a system has outgrown its original gear.",
      "It is the far northern end of the route, so visits are grouped with West Palm Beach and Jupiter clients to keep the schedule reliable.",
    ],
    neighborhoods: ["PGA National", "Mirasol", "Frenchman's Reserve", "Ballenisles", "Evergrene", "Old Palm", "Alton"],
    landmarks: ["The Gardens Mall", "PGA National Resort"],
    angle: "golf-club great-room displays, built-ins, upgrades",
    faqs: [
      {
        q: "Is Palm Beach Gardens too far north for regular aquarium service?",
        a: "No. Palm Beach Gardens visits are grouped with other north-county clients so the schedule holds. Jason confirms the route day before the first visit.",
      },
    ],
    nearby: ["jupiter", "west-palm-beach", "palm-beach"],
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    county: "Palm Beach",
    zips: ["33458", "33477", "33478"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service provides aquarium maintenance, installation and assessments in Jupiter, including Abacoa, Jupiter Farms, Admirals Cove and the waterfront neighborhoods along the Loxahatchee River. Reef tanks, freshwater systems and ponds are serviced on scheduled routes to the north county.",
    local: [
      "Jupiter is a boating and diving town, and a lot of aquarium owners here spend their weekends on the water and want a piece of it in the living room. Reef tanks are most of the work, with fish and coral picked for the system rather than on impulse.",
      "Jupiter Farms and the western properties have space for ponds and well water to plan around. Jason services the north county on grouped route days so the schedule stays consistent.",
    ],
    neighborhoods: ["Abacoa", "Jupiter Farms", "Admirals Cove", "Jonathan's Landing", "Jupiter Inlet Colony", "Tequesta (adjacent)"],
    landmarks: ["Jupiter Inlet Lighthouse", "Harbourside Place"],
    angle: "boaters and divers with reef tanks, ponds on western acreage",
    faqs: [
      {
        q: "Do you take on regular aquarium service in Jupiter?",
        a: "Yes, on grouped north-county route days. Emergency response to Jupiter takes longer than to the middle of the route, and Jason will tell you straight what he can do and when.",
      },
    ],
    nearby: ["palm-beach-gardens", "west-palm-beach"],
  },
  {
    slug: "riviera-beach",
    name: "Riviera Beach",
    county: "Palm Beach",
    zips: ["33404", "33407", "33419"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service provides aquarium cleaning, reef tank maintenance and installation in Riviera Beach and on Singer Island. Oceanfront condo tanks, marina offices and homes on the mainland get regular water changes, water testing and equipment checks on a weekly, bi-weekly or monthly schedule.",
    local: [
      "A lot of reef keepers in this part of the county started under water. The snorkel trail at Phil Foster Park under the Blue Heron Bridge is one of the best known shore dives in the country, and people who spend their weekends looking at real reef fish tend to want a reef tank that looks like the real thing. Those tanks need stable alkalinity, calcium and salinity more than anything, and that only comes from testing on a schedule.",
      "On Singer Island most tanks are in high-rise condominiums. That means service elevators, association rules about water, and a building engineer who wants to know nothing is going to leak into the unit below. Jason brings prepared saltwater in sealed containers, protects the floors, and keeps the equipment in shape so a failed seal never becomes a ceiling stain two floors down.",
      "On the mainland, the work runs from family freshwater tanks to office tanks near the Port of Palm Beach and the marinas along the Intracoastal.",
    ],
    neighborhoods: ["Singer Island", "Palm Beach Shores", "Marina District", "Lake Park area", "Ocean Avenue condominiums"],
    landmarks: ["Phil Foster Park", "Ocean Reef Park", "Port of Palm Beach"],
    angle: "Singer Island condos, reef tanks for divers and snorkelers",
    faqs: [
      {
        q: "Can you service a reef tank in a Singer Island condo?",
        a: "Yes. Condo tanks are routine. Jason brings prepared saltwater in sealed containers, works around building rules and elevator schedules, and keeps the equipment maintained so leaks do not happen.",
      },
      {
        q: "Do you set up new reef tanks in Riviera Beach?",
        a: "Yes. Jason designs, installs, cycles and stocks reef systems in stages, then keeps them on a regular service schedule.",
      },
    ],
    nearby: ["north-palm-beach", "west-palm-beach", "palm-beach-gardens", "palm-beach"],
  },
  {
    slug: "north-palm-beach",
    name: "North Palm Beach",
    county: "Palm Beach",
    zips: ["33408", "33410"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains and installs aquariums in North Palm Beach. Waterfront homes on the Intracoastal and its canals, the condominiums at Old Port Cove and homes near the North Palm Beach Country Club get reef, freshwater and pond service with tested water and a clean tank every visit.",
    local: [
      "North Palm Beach is a boating town, and a lot of its homes sit on canals that run out to the Intracoastal and Lake Worth Lagoon. People who live on the water often keep saltwater tanks, and many of those tanks are established systems that have been running for years. An older reef is usually a stable one, as long as the equipment keeps up. Heaters, return pumps and skimmers wear out quietly, and catching a tired pump before it fails is half of what a regular visit is for.",
      "Waterfront homes also take the brunt of hurricane season. A tank in North Palm Beach should have a written plan before June: a battery air pump, a way to keep temperature steady without power, and someone who will check on it if the family evacuates. Jason builds that plan with every client who wants one.",
      "Inland, around the country club and along Prosperity Farms Road, the mix is closer to the rest of the county: family freshwater tanks, planted tanks and the occasional pond.",
    ],
    neighborhoods: ["Old Port Cove", "Lost Tree Village", "North Palm Beach Country Club area", "Prosperity Farms Road area", "Juno Isles", "Village waterfront canals"],
    landmarks: ["John D. MacArthur Beach State Park"],
    angle: "waterfront homes, established saltwater and reef systems",
    faqs: [
      {
        q: "Can you take over service on an older reef tank in North Palm Beach?",
        a: "Yes. Jason starts with a full assessment, testing the water and checking every piece of equipment, then sets a schedule that keeps the system stable instead of changing everything at once.",
      },
      {
        q: "What happens to my tank if we evacuate for a hurricane?",
        a: "Plan it before the season. Jason can set up battery air and a temperature plan, and check the tank after the storm passes when roads allow.",
      },
    ],
    nearby: ["juno-beach", "palm-beach-gardens", "riviera-beach", "jupiter"],
  },
  {
    slug: "juno-beach",
    name: "Juno Beach",
    county: "Palm Beach",
    zips: ["33408"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service cleans and maintains aquariums in Juno Beach. Reef and freshwater tanks in the oceanfront condominiums along A1A and in homes west of U.S. 1 get regular water changes, water testing and equipment checks, with extra care for seasonal residents who are away part of the year.",
    local: [
      "Juno Beach is a small town with a lot of ocean in it. The Loggerhead Marinelife Center and the pier draw people who care about what lives in the water, and plenty of them keep a tank at home. Most of the tanks here are in condominiums along A1A, which usually means a mid-size reef or a fish-only saltwater tank that fits the space, and a building with rules about water and deliveries.",
      "Many Juno Beach owners are seasonal. A tank left on its own from April to November needs more than an automatic feeder. It needs someone testing the water, topping off evaporation, cleaning the glass and checking that the heater and pumps are still doing their jobs. Jason keeps those tanks on a standing schedule so the owner walks back into a clean, healthy tank in the fall.",
    ],
    neighborhoods: ["A1A oceanfront condominiums", "Universe Boulevard area", "West of U.S. 1"],
    landmarks: ["Loggerhead Marinelife Center", "Juno Beach Pier"],
    angle: "oceanfront condos, seasonal residents and mid-size reef tanks",
    faqs: [
      {
        q: "We are only in Juno Beach for the winter. Can you keep the tank going while we are away?",
        a: "Yes. A standing schedule covers testing, water changes, top-off and equipment checks all year, and Jason can add a visit right before you get back.",
      },
      {
        q: "Is a reef tank practical in a condo?",
        a: "Usually, yes, if it is sized for the floor and the building's rules. Jason will tell you what size and setup make sense for your unit.",
      },
    ],
    nearby: ["north-palm-beach", "jupiter", "palm-beach-gardens", "tequesta"],
  },
  {
    slug: "jupiter-farms",
    name: "Jupiter Farms",
    county: "Palm Beach",
    zips: ["33478"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains ponds and aquariums in Jupiter Farms. Koi and goldfish ponds, water features and indoor tanks on large rural lots get regular cleaning, water testing and pump and filter service, with water prepared for homes on private wells.",
    local: [
      "Jupiter Farms is about as rural as Palm Beach County gets, with big lots, horses and a lot of wildlife. Ponds are a large part of the work here. A pond out west lives with leaves, runoff from pastures, heavy summer rain and visitors: herons at dawn, raccoons at night and river otters wandering up from the Loxahatchee. Deep water, overhangs and places for fish to hide matter as much as the filter does.",
      "Indoor tanks here run on well water. Jason tests what the house treatment puts out before using it, and uses RO/DI water for reef tanks and sensitive freshwater fish. Some homes have a room in a barn or a workshop set aside for tanks, and those systems get the same testing and equipment checks as a living room display.",
    ],
    neighborhoods: ["Jupiter Farms", "Indiantown Road corridor", "Jupiter Farms Road area"],
    landmarks: ["Riverbend Park", "Loxahatchee River"],
    angle: "rural lots, koi ponds and water features, homes on well water",
    faqs: [
      {
        q: "Something keeps taking fish out of my pond. What can I do?",
        a: "Herons, raccoons and otters are the usual suspects out west. Deeper water, overhangs, fish caves and netting during the worst season help. Jason can look at the pond and suggest what fits it.",
      },
      {
        q: "Do you work with well water in Jupiter Farms?",
        a: "Yes. Jason tests the well water first and decides whether to condition it or use RO/DI water, depending on the tank and the fish.",
      },
    ],
    nearby: ["jupiter", "tequesta", "the-acreage", "palm-beach-gardens"],
  },
  {
    slug: "tequesta",
    name: "Tequesta",
    county: "Palm Beach",
    zips: ["33469"],
    drive: "Palm Beach County",
    lead:
      "Jason's Aquarium Service maintains and installs aquariums in Tequesta, the northernmost village in Palm Beach County. Homes along the Loxahatchee River and the Intracoastal, Tequesta Country Club and the neighborhoods off U.S. 1 get reef, freshwater and pond service with tested water and clean tanks on a regular schedule.",
    local: [
      "Tequesta sits where the Loxahatchee River meets the Intracoastal, and a lot of its homes face the water. Larger homes here tend to have room for a real display: a big reef, a fish-only saltwater tank with large fish, or a planted tank that anchors a living room. Bigger systems are more forgiving of small mistakes and less forgiving of neglect, which is why they do best on a steady weekly or bi-weekly schedule.",
      "River and Intracoastal homes also sit low, and the same planning that protects the house in hurricane season should cover the tank. Battery air, a way to hold temperature, and a check after the storm keep a large system from crashing while the power is out.",
    ],
    neighborhoods: ["Tequesta Country Club", "Turtle Creek", "Loxahatchee River waterfront", "Tequesta Drive area", "Jupiter Inlet Colony", "Beach Road condominiums"],
    landmarks: ["Coral Cove Park", "Loxahatchee River"],
    angle: "river and Intracoastal homes, large reef and fish-only displays",
    faqs: [
      {
        q: "Do you service aquariums in Tequesta?",
        a: "Yes. Tequesta is part of the regular north county route, with weekly, bi-weekly and monthly schedules for reef, freshwater and pond systems.",
      },
      {
        q: "Can you maintain a large fish-only saltwater tank?",
        a: "Yes. Large fish-only systems need steady water changes, good filtration maintenance and close attention to the fish, and Jason services them on a schedule that matches the bioload.",
      },
    ],
    nearby: ["jupiter", "jupiter-farms", "juno-beach", "palm-beach-gardens"],
  },
  {
    slug: "deerfield-beach",
    name: "Deerfield Beach",
    county: "Broward",
    zips: ["33441", "33442"],
    drive: "Broward County",
    lead:
      "Jason's Aquarium Service cleans, maintains and installs aquariums in Deerfield Beach, just south of Boca Raton across the county line. Deer Creek, Century Village East, The Cove and the beachside neighborhoods share route days with Boca, so reef tanks, freshwater tanks and ponds here get the same easy scheduling.",
    local: [
      "Deerfield is the first town south of the Palm Beach County line and shares route days with Boca. The Cove and the beach neighborhoods have older homes with established tanks; Deer Creek and Century Village East have a lot of retirees who have kept fish for decades and want a technician who respects that.",
      "The fishing pier crowd tends to keep saltwater tanks, and they ask good questions. Fish selection and reef chemistry are where Jason spends the most time in Deerfield.",
    ],
    neighborhoods: ["The Cove", "Deer Creek", "Century Village East", "Waterways", "Deerfield Beach Island", "Crystal Lake"],
    landmarks: ["Deerfield Beach International Fishing Pier", "Quiet Waters Park"],
    angle: "shares route days with Boca, established tanks, saltwater hobbyists",
    faqs: [
      {
        q: "You are in Palm Beach County. Do you really service Deerfield Beach?",
        a: "Yes. Deerfield Beach shares route days with Boca Raton. Jason serves Palm Beach County and the north Broward towns next to it.",
      },
      {
        q: "Do you service tanks in Century Village East?",
        a: "Yes. Jason arranges gate access once and keeps a standing schedule.",
      },
    ],
    nearby: ["boca-raton", "lighthouse-point", "pompano-beach", "coconut-creek", "parkland"],
  },
  {
    slug: "parkland",
    name: "Parkland",
    county: "Broward",
    zips: ["33067", "33076"],
    drive: "Broward County",
    lead:
      "Jason's Aquarium Service designs, installs and maintains aquariums in Parkland, including Heron Bay, Parkland Golf and Country Club, MiraLago, Cascata and Watercrest. Large built-in reef systems and family freshwater tanks are serviced on a weekly or bi-weekly schedule alongside Jason's Boca Raton route.",
    local: [
      "Parkland is newer, larger homes with a lot of great-room walls that were designed for a big tank. Many of those tanks were installed by a builder's subcontractor and never had a real maintenance plan. Jason's assessment visits often start there: what was installed, what it needs, and how to keep it healthy.",
      "Families with kids are the norm, and a well-run aquarium is one of the best things in a house full of them. Jason sets tanks up so they stay stable with small hands around, and teaches the kids what the fish need.",
    ],
    neighborhoods: ["Heron Bay", "Parkland Golf and Country Club", "MiraLago", "Cascata", "Watercrest", "Pine Tree Estates", "Parkland Isles", "Ternbridge"],
    landmarks: ["Pine Trails Park", "Parkland Equestrian Center"],
    angle: "new-construction built-ins, family tanks, assessments of builder installs",
    faqs: [
      {
        q: "The builder installed our aquarium. Can you take over maintaining it?",
        a: "Yes. An assessment visit documents what was installed and what it needs, then a maintenance schedule keeps it healthy from there.",
      },
      {
        q: "Do you service Parkland even though it is in Broward County?",
        a: "Yes. Parkland shares route days with Boca Raton and west Boca. Jason serves Palm Beach County and the north Broward towns next to it.",
      },
    ],
    nearby: ["coral-springs", "boca-raton", "west-boca-raton", "coconut-creek", "deerfield-beach"],
  },
  {
    slug: "coral-springs",
    name: "Coral Springs",
    county: "Broward",
    zips: ["33065", "33067", "33071", "33076"],
    drive: "Broward County",
    lead:
      "Jason's Aquarium Service provides aquarium cleaning, maintenance, installation and troubleshooting in Coral Springs, including Eagle Trace, Wyndham Lakes, Ramblewood and the neighborhoods along University Drive. Saltwater, reef, freshwater and planted tanks are serviced on a schedule for homes and offices.",
    local: [
      "Coral Springs is one of the biggest suburbs in Broward and has a long-running aquarium hobby scene. A lot of clients here are experienced keepers who want a technician who talks chemistry, not a cleaning crew. Jason fits that: he is the person people call when a parameter is off and they want to know why.",
      "The medical and professional offices along University Drive and Sample Road keep waiting-room tanks, and those are serviced around office hours with access arranged once.",
    ],
    neighborhoods: ["Eagle Trace", "Wyndham Lakes", "Ramblewood", "Turtle Run", "Coral Springs Country Club", "Cypress Run", "Heron Bay (adjacent)"],
    landmarks: ["Coral Square", "Sportsplex"],
    angle: "experienced hobbyists, chemistry conversations, office tanks along University Drive",
    faqs: [
      {
        q: "I know my tank well. Will you work with me rather than take over?",
        a: "Yes. Plenty of Jason's clients are experienced keepers who want a second set of eyes and someone reliable for the routine work. He will explain what he sees and why, and he will tell you if he disagrees.",
      },
    ],
    nearby: ["parkland", "coconut-creek", "west-boca-raton", "pompano-beach"],
  },
  {
    slug: "lighthouse-point",
    name: "Lighthouse Point",
    county: "Broward",
    zips: ["33064"],
    drive: "Broward County",
    lead:
      "Jason's Aquarium Service maintains aquariums in the canal-front homes of Lighthouse Point, between Deerfield Beach and Pompano Beach. Saltwater and reef tanks are most of the work here, serviced on a weekly or bi-weekly schedule with fish and coral chosen for each system.",
    local: [
      "Lighthouse Point is a boating town, almost every home on a canal, and people who spend their weekends on the Intracoastal tend to want saltwater fish in the house. Reef tanks here are serious and so is the care: stable chemistry, careful stocking, equipment that is checked before it fails.",
      "It is a small, established community and word travels. Jason keeps the same weekly time, and the tank looks the way it should when the neighbors come over.",
    ],
    neighborhoods: ["Lighthouse Point Yacht Club area", "Venetian Isles", "Coral Key", "Lake Placid"],
    landmarks: ["Hillsboro Inlet Lighthouse"],
    angle: "boaters with serious saltwater tanks, canal-front homes",
    faqs: [
      {
        q: "Do you specialize in saltwater tanks in Lighthouse Point?",
        a: "Saltwater and reef systems are most of the work here, and choosing fish and coral that will live well in your specific tank is part of the service.",
      },
    ],
    nearby: ["deerfield-beach", "pompano-beach", "boca-raton"],
  },
  {
    slug: "coconut-creek",
    name: "Coconut Creek",
    county: "Broward",
    zips: ["33063", "33066", "33073"],
    drive: "Broward County",
    lead:
      "Jason's Aquarium Service cleans, maintains and sets up aquariums in Coconut Creek, including Wynmoor, Winston Park, Banyan Trails and the communities near the Promenade. Freshwater, planted, saltwater and reef tanks are serviced on a regular schedule alongside the Boca Raton and Parkland route days.",
    local: [
      "Coconut Creek is family neighborhoods plus Wynmoor, a very large retirement community, and both keep a lot of fish. Wynmoor residents in particular have kept tanks for decades and want a technician who shows up when he says he will and does not need to be told twice.",
      "Newer homes in Winston Park and Banyan Trails often have a first family tank. Jason sets those up with the right filtration and the right fish, then keeps them clean on a schedule that fits a busy household.",
    ],
    neighborhoods: ["Wynmoor", "Winston Park", "Banyan Trails", "Monarch Lakes", "Cocobay", "Regency Lakes"],
    landmarks: ["The Promenade at Coconut Creek", "Butterfly World"],
    angle: "retirement community tanks, family first tanks",
    faqs: [
      {
        q: "Do you service tanks inside Wynmoor?",
        a: "Yes. Gate access is arranged once and Jason keeps a standing schedule for Wynmoor residents.",
      },
    ],
    nearby: ["parkland", "coral-springs", "deerfield-beach", "pompano-beach"],
  },
  {
    slug: "pompano-beach",
    name: "Pompano Beach",
    county: "Broward",
    zips: ["33060", "33062", "33064", "33069"],
    drive: "Broward County",
    lead:
      "Jason's Aquarium Service provides aquarium maintenance, cleaning, installation and assessments in Pompano Beach, including Palm Aire, Cypress Bend and the beachside and Intracoastal neighborhoods. Reef, saltwater and freshwater tanks in homes, condos and businesses are serviced on a schedule.",
    local: [
      "Pompano is the southern end of Jason's route and a mix of everything: high-rise condos on the beach, canal homes, golf communities in Palm Aire and a lot of businesses along Federal Highway and Atlantic Boulevard with a tank in the lobby. A condo board, a canal house and a dental office each need a different schedule, and each gets one.",
      "The Pompano fishing and diving crowd keeps saltwater tanks, and the questions are usually about fish selection and reef chemistry. Those are Jason's favorite calls.",
    ],
    neighborhoods: ["Palm Aire", "Cypress Bend", "Pompano Beach Highlands", "Harbor Village", "Santa Barbara Shores", "Garden Isles"],
    landmarks: ["Pompano Beach Pier", "Pompano Beach Airpark"],
    angle: "condos, canal homes, lobby tanks, saltwater hobbyists",
    faqs: [
      {
        q: "Is Pompano Beach at the edge of your service area?",
        a: "It is the southern end of the regular route. Scheduled visits are grouped with Lighthouse Point and Deerfield Beach so the timing stays reliable.",
      },
    ],
    nearby: ["lighthouse-point", "deerfield-beach", "coconut-creek", "coral-springs"],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
