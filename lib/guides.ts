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
          "Size is the obvious one. A 30 gallon freshwater tank and a 300 gallon reef are different jobs, and the water alone for a large saltwater change has real cost. Saltwater versus freshwater is the second: reef systems need mixed saltwater, more testing and more equipment attention. Frequency is the third, and it is set by the tank, not by a sales target. Weekly for most reefs, every two to four weeks for most freshwater tanks. Equipment is the fourth. Sumps, dosing, controllers and skimmers add time to every visit.",
          "In Palm Beach County you will see companies publish monthly plans from a couple hundred dollars for a small tank on a bi-weekly schedule up to several hundred a month for large reefs on weekly visits with extras. Jason quotes each tank individually rather than forcing it into a tier, which usually lands lower for small tanks and fairer for large ones.",
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
          "A crash. A stocked reef in a Boca Raton living room can hold thousands of dollars of coral and fish, and one missed problem can take it all in a week. Regular testing is what turns a crash into a note on a clipboard.",
        ],
      },
      {
        h: "How to get an exact number",
        p: [
          "Text Jason the tank size, whether it is saltwater or freshwater, and a photo. He replies with a real price, usually the same day, and will tell you if the tank needs fewer visits than you assumed.",
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
          "Oxygen and temperature are the two things that kill fish in an outage. A battery air pump handles oxygen. For temperature, keep the room closed, blinds down, and the tank covered with a towel or blanket to slow heat gain in summer. Do not feed. Do not open the tank more than you must. In a heavily stocked reef, hours matter; in a lightly stocked freshwater tank you have more time.",
          "If the outage runs long, small partial water changes with pre-mixed water at the right temperature buy time. Bottled water is not a substitute for prepared saltwater.",
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
      "What separates a good aquarium maintenance company from an expensive mistake: who actually shows up, whether they test water, how they handle saltwater, what they do in an emergency, and the questions to ask before you hire anyone.",
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
      "Palm Beach County tap water is hard, treated with chloramine and can carry phosphate. Here is what that does to freshwater and reef tanks, and how water is prepared so a water change helps instead of hurts.",
    date: "2026-09-27",
    minutes: 5,
    image: "/images/stock/tetras.jpg",
    imageAlt: "Neon tetras over driftwood in a planted freshwater aquarium",
    keywords: ["Boca Raton tap water aquarium", "chloramine fish tank", "RO DI water reef tank"],
    sections: [
      {
        h: "Hard and treated",
        p: [
          "Municipal water across Boca Raton, Delray Beach and Boynton Beach comes from the Biscayne Aquifer and is hard, with high calcium and alkalinity, and it is disinfected with chloramine, which does not gas off the way chlorine does. Straight from the tap it will kill the bacteria your filter depends on and stress fish.",
        ],
      },
      {
        h: "For freshwater tanks",
        p: [
          "A proper conditioner that neutralizes chloramine, not just chlorine, is the minimum. For soft-water fish like discus and many tetras, and for serious planted tanks, blending with RO water gets the hardness down to where the fish and plants want it.",
        ],
      },
      {
        h: "For reef tanks",
        p: [
          "Reefs should never see tap water. Phosphate and silicate in county water feed algae, and the mineral content is wrong for mixing salt. RO/DI water, mixed with a quality salt and matched to the tank's salinity and temperature, is what Jason brings to every saltwater visit.",
        ],
      },
    ],
    takeaway: "Condition for chloramine on freshwater, use RO/DI for reefs, and never assume tap water is neutral.",
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
          "If more than one fish is affected or you cannot find the cause, call Jason with the photo and the test results. He has talked clients through this on the phone many times and can usually get to a Palm Beach County tank fast when it matters.",
        ],
      },
    ],
    takeaway: "Stop feeding, check temperature, oxygen and water, photograph the fish, then call.",
  },
  {
    slug: "saltwater-vs-freshwater-aquarium-which-is-right",
    title: "Saltwater or freshwater: which aquarium is right for your home",
    description:
      "An honest comparison for Palm Beach County homeowners deciding on a first tank or an upgrade: cost, effort, what lives in each, how each is serviced, and which one fits a busy household.",
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
    takeaway: "Freshwater for forgiving beauty, saltwater for the showpiece. Both thrive on a schedule.",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
