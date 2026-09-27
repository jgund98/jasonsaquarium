// One entry per service-area page. Every city gets hand-written local copy,
// its own neighborhoods, its own angle and its own FAQ so no two pages read
// as a find-and-replace of each other.

import type { Faq } from "./services";

export type City = {
  slug: string;
  name: string;
  county: "Palm Beach" | "Broward";
  zips: string[];
  drive: string; // from west Boca
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
      "Lobby and office aquariums are a big part of the work here. Medical offices near Boca Raton Regional Hospital, law firms downtown and the corporate campuses along the Yamato corridor keep tanks because they calm a waiting room. Those tanks get serviced on a schedule that fits business hours, with access arrangements made once and kept.",
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
      "Jason's Aquarium Service services aquariums in the west Boca communities along 441 and Glades Road every week: Boca Winds, Loggers' Run, Mission Bay, Boca Falls, Sandalfoot Cove, Boca Pointe and the neighbors in between. Reef tanks, freshwater tanks and backyard ponds, cleaned and maintained on a schedule.",
    local: [
      "West Boca is unincorporated Palm Beach County, and for aquarium owners that mostly means big family homes with room for a tank and a lot of west-facing windows. Sun on a tank is the most common cause of the algae problems Jason sees out here, and it is fixable with placement, lighting schedules and a proper maintenance rhythm.",
      "West Boca sits in the middle of Jason's route, so scheduling here is easy and response when something goes wrong is quick. A cracked tank in Boca Winds or a failed pump in Mission Bay is on the way, not a trip across the county.",
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
    drive: "about 15 minutes",
    lead:
      "Jason's Aquarium Service cleans, installs and troubleshoots aquariums throughout Delray Beach, from the west Delray communities near Kings Point and the Villages of Oriole to downtown Atlantic Avenue and the beachside streets east of the Intracoastal. Saltwater, reef, freshwater, planted tanks and ponds, serviced on a schedule by Jason himself.",
    local: [
      "Delray is familiar ground. The 55-plus communities west of Military Trail have a lot of long-time hobbyists with well-established tanks that need steady, knowledgeable care rather than a salesperson. Several of Jason's longest client relationships are here.",
      "Downtown Delray is a different world: restaurants and bars along Atlantic Avenue, boutique offices and condos where a tank is a design feature. Those systems get serviced early or after hours so the room is spotless when guests arrive.",
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
        a: "Yes. Kings Point, the Villages of Oriole, Huntington Lakes and the surrounding communities are on Jason's regular route, and Jason has serviced tanks there for years.",
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
    drive: "about 20 minutes",
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
    drive: "about 20 minutes",
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
    drive: "about 20 minutes",
    lead:
      "Jason's Aquarium Service maintains aquariums in the estate homes of Gulf Stream, the small oceanside town between Delray Beach and Briny Breezes. Discreet, scheduled service for reef tanks, freshwater displays and water features, with the care a property of this kind expects.",
    local: [
      "Gulf Stream is under a thousand residents and almost entirely estate homes along A1A and the Intracoastal. Aquariums here are usually large, architect-specified and part of the house, which means service has to be tidy, punctual and invisible to guests. Jason works with household staff and property managers to keep it that way.",
      "The town's quiet is part of the appeal, and so is the reliability. A standing visit at the same time each week keeps a large reef system stable and keeps everyone from ever having to think about it.",
    ],
    neighborhoods: ["Gulf Stream Golf Club area", "Place Au Soleil", "Polo Drive", "Ocean Boulevard estates"],
    angle: "estate homes, staff coordination, large architect-specified systems",
    faqs: [
      {
        q: "Can you coordinate aquarium service with my house manager or staff?",
        a: "Yes. Jason regularly works with household staff and property managers in Gulf Stream and keeps a standing schedule so nothing needs to be arranged twice.",
      },
    ],
    nearby: ["delray-beach", "highland-beach", "ocean-ridge", "boynton-beach"],
  },
  {
    slug: "ocean-ridge",
    name: "Ocean Ridge",
    county: "Palm Beach",
    zips: ["33435"],
    drive: "about 25 minutes",
    lead:
      "Jason's Aquarium Service cleans and maintains aquariums in Ocean Ridge, the barrier-island town east of Boynton Beach. Reef and freshwater tanks in oceanfront and Intracoastal homes are serviced on a schedule, with equipment checks that account for salt air and summer heat.",
    local: [
      "Ocean Ridge homes sit between the Atlantic and the Intracoastal, and many of them have a tank facing the water view. Bright rooms, salt air and the heat that comes off ocean-facing glass all affect a reef system, and Jason plans the lighting and cooling around it.",
      "It is a small town with a lot of seasonal residents. Jason keeps tanks healthy while owners are away and has them looking their best for the week they come back.",
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
    drive: "about 25 minutes",
    lead:
      "Jason's Aquarium Service offers aquarium cleaning, maintenance and setup in Lantana, including Hypoluxo Island and the neighborhoods along the Intracoastal. Freshwater community tanks, saltwater systems and ponds are serviced on a regular schedule by Jason himself.",
    local: [
      "Lantana is one of the older waterfront towns in the county, with a mix of cottages, canal homes and newer townhomes. Tanks here range from a kid's first freshwater setup to serious reef systems on Hypoluxo Island, and each gets a plan sized to it.",
      "Fishing town roots run deep, and a lot of Lantana clients want fish they can talk about. Jason helps pick livestock that will actually thrive in the tank they own rather than the tank they wish they had.",
    ],
    neighborhoods: ["Hypoluxo Island", "Lantana Heights", "Sea Pines", "Lantana Shores"],
    angle: "waterfront cottages and canal homes, first tanks and serious reefs alike",
    faqs: [
      {
        q: "Do you help beginners in Lantana set up a first aquarium?",
        a: "Yes. Some of Jason's best reviews come from people he taught to keep a tank. A setup visit and a few scheduled cleanings get most beginners on their feet.",
      },
    ],
    nearby: ["boynton-beach", "lake-worth-beach", "manalapan", "ocean-ridge"],
  },
  {
    slug: "lake-worth-beach",
    name: "Lake Worth Beach",
    county: "Palm Beach",
    zips: ["33460", "33461", "33463", "33467"],
    drive: "about 30 minutes",
    lead:
      "Jason's Aquarium Service cleans, maintains and installs aquariums in Lake Worth Beach and the western Lake Worth communities out toward 441. Reef tanks, freshwater and planted aquariums, and ponds are serviced on a schedule for homes, shops and offices.",
    local: [
      "Lake Worth Beach has an old downtown with galleries, restaurants and shops on Lake and Lucerne Avenues, and a fair number of them keep a tank as part of the look. Servicing those means working around foot traffic and leaving the display spotless.",
      "West of the city, the communities along Lake Worth Road and out toward 441 are big, family-oriented and full of first-time tank owners. Jason sets those tanks up properly and teaches owners what the water is telling them.",
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
    slug: "wellington",
    name: "Wellington",
    county: "Palm Beach",
    zips: ["33414", "33449", "33467"],
    drive: "about 30 minutes",
    lead:
      "Jason's Aquarium Service provides aquarium maintenance, installation and pond service in Wellington and the surrounding equestrian communities. Reef tanks, freshwater displays and backyard ponds in the Aero Club, Palm Beach Polo, Olympia and the neighboring villages are cleaned and tested on a regular schedule.",
    local: [
      "Wellington is horse country, with large properties, outbuildings and a lot of outdoor water. Ponds and water gardens are a bigger part of the work here than anywhere else on the route, and Florida summers are hard on them. Real filtration, UV clarification and regular cleanouts keep them clear.",
      "Inside the house, Wellington homes tend to have room for a big display tank, and seasonal residents want it looking perfect when they arrive for the winter circuit. Jason keeps those systems stable year round and steps up visits before the season.",
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
        a: "Yes. Standing service keeps the tank healthy while you are away, and Jason can add a visit right before you return so it looks its best.",
      },
    ],
    nearby: ["royal-palm-beach", "lake-worth-beach", "west-palm-beach", "boynton-beach"],
  },
  {
    slug: "royal-palm-beach",
    name: "Royal Palm Beach",
    county: "Palm Beach",
    zips: ["33411"],
    drive: "about 35 minutes",
    lead:
      "Jason's Aquarium Service maintains and installs aquariums in Royal Palm Beach and the neighboring Acreage communities. Freshwater tanks, saltwater systems and ponds in family homes are cleaned, tested and kept healthy on a scheduled visit.",
    local: [
      "Royal Palm Beach is family neighborhoods and larger lots, and a lot of tanks here belong to kids who got hooked. Jason takes those seriously: a properly set up freshwater tank with the right fish is a hobby that lasts, and a badly set up one is a lesson in disappointment.",
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
    slug: "manalapan",
    name: "Manalapan",
    county: "Palm Beach",
    zips: ["33462"],
    drive: "about 30 minutes",
    lead:
      "Jason's Aquarium Service maintains aquariums in the oceanfront and Intracoastal estates of Manalapan, south of Palm Beach. Large reef systems and freshwater displays are serviced discreetly on a standing schedule, with staff and property managers kept informed.",
    local: [
      "Manalapan is a small town of very large homes, and an aquarium there is usually a major architectural feature with its own equipment room. Service is about consistency and discretion: same day each week, same technician, nothing left out of place.",
      "Ocean-to-lake lots mean two kinds of exposure, and the equipment checks at each visit account for it.",
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
    drive: "about 35 minutes",
    lead:
      "Jason's Aquarium Service provides aquarium cleaning, maintenance and installation in West Palm Beach, including downtown, the Flagler waterfront, El Cid, Ibis and the communities west of the turnpike. Reef, saltwater and freshwater tanks in homes, offices and lobbies are serviced on a schedule.",
    local: [
      "Downtown West Palm has more office and lobby aquariums than anywhere else in the county: law firms, medical offices, hotels and the towers along Flagler Drive. Those tanks are a first impression, and they get serviced early, quietly and consistently.",
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
        a: "Yes. It is on the northern end of Jason's route, and scheduled visits are grouped so the drive from Boca never affects the service.",
      },
    ],
    nearby: ["palm-beach", "lake-worth-beach", "wellington", "palm-beach-gardens"],
  },
  {
    slug: "palm-beach",
    name: "Palm Beach",
    county: "Palm Beach",
    zips: ["33480"],
    drive: "about 40 minutes",
    lead:
      "Jason's Aquarium Service maintains aquariums on the island of Palm Beach, from the estates along South Ocean Boulevard to the condos and clubs near Worth Avenue. Reef and freshwater systems are serviced on a standing weekly schedule with the discretion the island expects.",
    local: [
      "Palm Beach aquariums are often large, custom and part of an interior designed down to the inch. Service means keeping the system stable and the display flawless without ever being noticed. Jason coordinates with staff, arrives at the same time each week and leaves no trace.",
      "Seasonal residency is the norm, so the tank has to be perfect in November and healthy in July. A standing schedule does both.",
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
    drive: "about 45 minutes",
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
        q: "Is Palm Beach Gardens too far for regular aquarium service from Boca?",
        a: "No. Palm Beach Gardens visits are grouped with other northern clients so the schedule is reliable. Jason confirms the route before the first visit.",
      },
    ],
    nearby: ["jupiter", "west-palm-beach", "palm-beach"],
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    county: "Palm Beach",
    zips: ["33458", "33477", "33478"],
    drive: "about 55 minutes",
    lead:
      "Jason's Aquarium Service provides aquarium maintenance, installation and assessments in Jupiter, including Abacoa, Jupiter Farms, Admirals Cove and the waterfront neighborhoods along the Loxahatchee River. Reef tanks, freshwater systems and ponds are serviced on scheduled routes to the north county.",
    local: [
      "Jupiter is a boating and diving town, and a lot of aquarium owners here are people who love the ocean and want a piece of it at home. Reef tanks are the specialty, with fish and coral picked for the system rather than the impulse.",
      "Jupiter Farms and the western properties have space for ponds and well water to plan around. Jason services the north county on grouped route days so the schedule stays consistent.",
    ],
    neighborhoods: ["Abacoa", "Jupiter Farms", "Admirals Cove", "Jonathan's Landing", "Jupiter Inlet Colony", "Tequesta (adjacent)"],
    landmarks: ["Jupiter Inlet Lighthouse", "Harbourside Place"],
    angle: "boaters and divers with reef tanks, ponds on western acreage",
    faqs: [
      {
        q: "Do you take on regular aquarium service in Jupiter?",
        a: "Yes, on grouped north-county route days. Emergency response to Jupiter takes longer than to Boca, and Jason will tell you honestly what he can do and when.",
      },
    ],
    nearby: ["palm-beach-gardens", "west-palm-beach"],
  },
  {
    slug: "deerfield-beach",
    name: "Deerfield Beach",
    county: "Broward",
    zips: ["33441", "33442"],
    drive: "about 10 minutes",
    lead:
      "Jason's Aquarium Service cleans, maintains and installs aquariums in Deerfield Beach, just south of Boca Raton across the county line. Deer Creek, Century Village East, The Cove and the beachside neighborhoods are on the same route days as Boca, so reef tanks, freshwater tanks and ponds here get the same easy scheduling.",
    local: [
      "Deerfield is the first town south of the Palm Beach County line and sits right on Jason's Boca route days. The Cove and the beach neighborhoods have older homes with established tanks; Deer Creek and Century Village East have a lot of retirees who have kept fish for decades and want a technician who respects that.",
      "The Deerfield fishing pier crowd tends to keep saltwater tanks, and those are Jason's favorite kind of conversation. Fish selection and reef chemistry are where he spends the most time here.",
    ],
    neighborhoods: ["The Cove", "Deer Creek", "Century Village East", "Waterways", "Deerfield Beach Island", "Crystal Lake"],
    landmarks: ["Deerfield Beach International Fishing Pier", "Quiet Waters Park"],
    angle: "minutes from base, established tanks, saltwater hobbyists",
    faqs: [
      {
        q: "You are in Palm Beach County. Do you really service Deerfield Beach?",
        a: "Yes. Deerfield Beach is minutes from Boca Raton and on the regular route. Jason serves Palm Beach County and the north Broward towns next to it.",
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
    drive: "about 15 minutes",
    lead:
      "Jason's Aquarium Service designs, installs and maintains aquariums in Parkland, including Heron Bay, Parkland Golf and Country Club, MiraLago, Cascata and Watercrest. Large built-in reef systems and family freshwater tanks are serviced on a weekly or bi-weekly schedule alongside Jason's Boca Raton route.",
    local: [
      "Parkland is newer, larger homes with a lot of great-room walls that were designed for a big tank. Many of those tanks were installed by a builder's subcontractor and never had a real maintenance plan. Jason's assessment visits often start there: what was installed, what it needs, and how to keep it healthy.",
      "Families with kids are the norm, and a well-run aquarium is one of the best things in a house full of them. Jason sets tanks up so they are safe, stable and interesting, and teaches the kids what the fish need.",
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
        a: "Yes. Parkland is minutes from Boca Raton and part of the regular route. Jason serves Palm Beach County and the north Broward towns next to it.",
      },
    ],
    nearby: ["coral-springs", "boca-raton", "west-boca-raton", "coconut-creek", "deerfield-beach"],
  },
  {
    slug: "coral-springs",
    name: "Coral Springs",
    county: "Broward",
    zips: ["33065", "33067", "33071", "33076"],
    drive: "about 20 minutes",
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
        a: "Yes. Plenty of Jason's clients are experienced keepers who want a second set of expert eyes and someone reliable for the routine work. He is happy to explain what he sees and why.",
      },
    ],
    nearby: ["parkland", "coconut-creek", "west-boca-raton", "pompano-beach"],
  },
  {
    slug: "lighthouse-point",
    name: "Lighthouse Point",
    county: "Broward",
    zips: ["33064"],
    drive: "about 20 minutes",
    lead:
      "Jason's Aquarium Service maintains aquariums in the canal-front homes of Lighthouse Point, between Deerfield Beach and Pompano Beach. Saltwater and reef tanks are the specialty here, serviced on a weekly or bi-weekly schedule with fish and coral chosen for each system.",
    local: [
      "Lighthouse Point is a boating town, almost every home on a canal, and the residents tend to love saltwater fish for the same reasons they love the Intracoastal. Reef tanks here are serious and so is the care: stable chemistry, careful stocking, equipment that is checked before it fails.",
      "It is a small, established community and word travels. Jason keeps the same weekly time and the tank always looks the way it should when the neighbors come over.",
    ],
    neighborhoods: ["Lighthouse Point Yacht Club area", "Venetian Isles", "Coral Key", "Lake Placid"],
    landmarks: ["Hillsboro Inlet Lighthouse"],
    angle: "boaters with serious saltwater tanks, canal-front homes",
    faqs: [
      {
        q: "Do you specialize in saltwater tanks in Lighthouse Point?",
        a: "Saltwater and reef systems are the majority of the work here, and choosing fish and coral that will thrive in a specific tank is part of the service.",
      },
    ],
    nearby: ["deerfield-beach", "pompano-beach", "boca-raton"],
  },
  {
    slug: "coconut-creek",
    name: "Coconut Creek",
    county: "Broward",
    zips: ["33063", "33066", "33073"],
    drive: "about 20 minutes",
    lead:
      "Jason's Aquarium Service cleans, maintains and sets up aquariums in Coconut Creek, including Wynmoor, Winston Park, Banyan Trails and the communities near the Promenade. Freshwater, planted, saltwater and reef tanks are serviced on a regular schedule alongside the Boca Raton and Parkland route days.",
    local: [
      "Coconut Creek is family neighborhoods and a very large retirement community in Wynmoor, and both keep a lot of fish. Wynmoor residents in particular have kept tanks for decades and want a technician who shows up when he says he will and treats the tank like his own.",
      "Newer homes in Winston Park and Banyan Trails often have a first family tank. Jason sets those up to succeed and keeps them clean on a schedule that fits a busy household.",
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
    drive: "about 25 minutes",
    lead:
      "Jason's Aquarium Service provides aquarium maintenance, cleaning, installation and assessments in Pompano Beach, including Palm Aire, Cypress Bend and the beachside and Intracoastal neighborhoods. Reef, saltwater and freshwater tanks in homes, condos and businesses are serviced on a schedule.",
    local: [
      "Pompano is the southern end of Jason's route and a mix of everything: high-rise condos on the beach, canal homes, golf communities in Palm Aire and a lot of businesses along Federal Highway and Atlantic Boulevard with a tank in the lobby. Each kind of client gets a schedule and a plan that fits.",
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
