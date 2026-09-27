import type { Faq } from "./services";

// Written the way people actually ask, including voice and AI-search phrasing.
export type FaqGroup = { title: string; note: string; link: { label: string; href: string }; faqs: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    note: "What it is like to hire one person instead of a company.",
    link: { label: "How a visit works", href: "/services/aquarium-cleaning-maintenance" },
    faqs: [
      {
        q: "Who cleans fish tanks near me in Palm Beach County?",
        a: "Jason's Aquarium Service. Jason is a mobile aquarium technician who cleans and maintains saltwater, reef, freshwater and planted aquariums and ponds in homes and businesses across Palm Beach County and the north Broward towns next door. Call or text (516) 528-7824.",
      },
      {
        q: "Do you come to my house or do I bring the tank somewhere?",
        a: "Jason comes to you. There is no storefront. Every visit happens at your home, office, lobby or backyard, with the water, tools and supplies brought along.",
      },
      {
        q: "Can I hire someone to take care of my aquarium completely?",
        a: "Yes. A scheduled maintenance plan covers water changes, cleaning, testing, equipment checks and livestock health so you can simply enjoy the tank. Many of Jason's clients never touch their tanks between visits.",
      },
      {
        q: "Do you do one-time cleanings or only ongoing service?",
        a: "Both. One-time cleanings, deep cleans and rescues are available, and most people move to a schedule once they see the difference.",
      },
      {
        q: "How do I get a quote?",
        a: "Text or call Jason with the tank size, whether it is saltwater or freshwater, and what you need. A photo helps. You will usually get a straight answer the same day.",
      },
    ],
  },
  {
    title: "Maintenance and cost",
    note: "What drives the price and how often a tank really needs a visit.",
    link: { label: "Plan a schedule for your tank", href: "/tools/service-planner" },
    faqs: [
      {
        q: "How much does aquarium maintenance cost in Palm Beach County?",
        a: "It depends on tank size, saltwater versus freshwater, how often it is visited and what equipment it has. A small freshwater tank on a monthly visit costs far less than a large reef on weekly service. Jason quotes each tank individually and does not sell more visits than a tank needs.",
      },
      {
        q: "How often should a professional clean my aquarium?",
        a: "Reef tanks generally do best on a weekly or bi-weekly visit. Freshwater community tanks are usually fine every two to four weeks. Ponds vary by season. Jason recommends a schedule after seeing the tank.",
      },
      {
        q: "What does an aquarium service visit include?",
        a: "Water testing, a water change with properly prepared water, cleaning of glass, rock, decor and substrate, filter and equipment checks, top-off and a health check on every fish and coral. Anything unusual gets flagged to you before Jason leaves.",
      },
      {
        q: "Do you bring your own saltwater?",
        a: "Yes. Saltwater is mixed ahead of time and matched to your tank's salinity and temperature so a water change never shocks the system.",
      },
      {
        q: "Can you service my aquarium while I am away for the summer?",
        a: "Yes. Seasonal residents across Palm Beach County keep Jason on a standing schedule while they are away, and he texts if anything needs a decision.",
      },
      {
        q: "Do you service office and lobby aquariums?",
        a: "Yes. Medical offices, law firms, restaurants, hotels and lobbies are a regular part of the route. Visits are scheduled around business hours and access is arranged once.",
      },
    ],
  },
  {
    title: "Saltwater, freshwater and ponds",
    note: "Every kind of water Jason works in, and what each one needs.",
    link: { label: "Reef and saltwater service", href: "/aquariums/saltwater-reef-aquariums" },
    faqs: [
      {
        q: "Do you service both saltwater and freshwater tanks?",
        a: "Yes. Saltwater reef and fish-only systems, freshwater community tanks, planted aquascapes, cichlid and discus tanks, and ponds are all serviced.",
      },
      {
        q: "Do you work on koi ponds and water features?",
        a: "Yes. Pond cleaning, pump and filter service, UV clarifiers and water clarity problems are handled, along with seasonal cleanouts.",
      },
      {
        q: "Can you help me pick fish and coral for my reef tank?",
        a: "Yes. Livestock selection for the specific tank is part of what Jason does, and clients have watched those picks thrive for years. He also sells fish and coral to his service clients.",
      },
      {
        q: "Do you service planted tanks with CO2?",
        a: "Yes. CO2 systems, fertilization and lighting schedules are part of planted tank service.",
      },
    ],
  },
  {
    title: "Problems and emergencies",
    note: "What to do in the first hour, before you add anything to the tank.",
    link: { label: "Decode your water test", href: "/tools/water-test" },
    faqs: [
      {
        q: "My fish are dying. What should I do?",
        a: "Stop feeding, do not add anything else to the tank, test ammonia and nitrite if you can, and call or text Jason right away with a photo and the results. Sudden losses are usually water quality, temperature or a disease that needs to be identified quickly.",
      },
      {
        q: "My aquarium is leaking or the glass cracked. Can you help today?",
        a: "Call immediately. Jason has replaced tanks on short notice, moving fish and coral into a new system the same day. Speed matters most for the livestock.",
      },
      {
        q: "Why is my aquarium water cloudy?",
        a: "New tanks cloud from bacterial blooms, established tanks from overfeeding, a filter problem or a large change all at once. An assessment finds the cause and fixes it rather than masking it with chemicals.",
      },
      {
        q: "How do I prepare my aquarium for a hurricane in Florida?",
        a: "Have a battery air pump ready, top off before the storm, do not feed during an outage, and keep the tank covered and out of direct sun if the air conditioning is off. Jason walks clients through this every season and can help before and after a storm.",
      },
      {
        q: "The power went out. How long can my fish survive?",
        a: "Often several hours in a lightly stocked tank and much less in a heavily stocked reef. Oxygen and temperature are the issues. A battery-powered air pump buys time. Call Jason for what to do with your specific tank.",
      },
    ],
  },
  {
    title: "Installation and assessments",
    note: "New tanks, inherited tanks, moves and second opinions.",
    link: { label: "Design and installation", href: "/services/aquarium-design-installation" },
    faqs: [
      {
        q: "Can you set up a new aquarium in my home or office?",
        a: "Yes. Jason designs the system for the room and the animals you want, installs it, cycles it and stocks it in stages. Built-in and in-wall tanks are common.",
      },
      {
        q: "How much does a custom aquarium cost in South Florida?",
        a: "It ranges widely with size, saltwater versus freshwater, equipment and cabinetry. Jason will give you an honest range for what you are picturing and help you decide where the money matters.",
      },
      {
        q: "I am buying a house with a built-in aquarium. Can you look at it?",
        a: "Yes. A pre-purchase assessment tells you what the system is, what condition it is in and what it costs to run and maintain.",
      },
      {
        q: "Can you move my aquarium to a new house?",
        a: "Tank moves and upgrades, including transferring livestock into a new system, are handled. Call to talk through the specifics of your move.",
      },
    ],
  },
  {
    title: "About the company",
    note: "Who Jason is, where he drives, and who he is not.",
    link: { label: "About Jason", href: "/about" },
    faqs: [
      {
        q: "Where is Jason's Aquarium Service located?",
        a: "It is a mobile service with no store and no fixed address. Jason serves all of Palm Beach County plus the north Broward towns of Deerfield Beach, Parkland, Coral Springs, Coconut Creek, Lighthouse Point and Pompano Beach.",
      },
      {
        q: "Are you the same as Jason's Aquatics in Davie?",
        a: "No. Jason's Aquarium Service LLC is a separate company serving Palm Beach County and north Broward, and is not affiliated with Jason's Aquatics in Davie.",
      },
      {
        q: "Is Jason's Aquarium Service open on weekends?",
        a: "Yes. Jason is available seven days a week and answers calls and texts around the clock for emergencies.",
      },
      {
        q: "How long has Jason been servicing aquariums?",
        a: "Jason's Aquarium Service LLC was formed in 2021, and public Google reviews show Jason maintaining clients' tanks in Palm Beach County since at least 2015.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);

export const homeFaqs: Faq[] = [
  faqGroups[0].faqs[0],
  faqGroups[1].faqs[0],
  faqGroups[1].faqs[1],
  faqGroups[1].faqs[2],
  faqGroups[1].faqs[3],
  faqGroups[2].faqs[0],
  faqGroups[3].faqs[1],
  faqGroups[1].faqs[5],
];
