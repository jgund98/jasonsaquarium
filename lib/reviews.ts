// The nine public Google reviews, verbatim. Never edit the quotes.
export type Review = {
  name: string;
  when: string;
  stars: number;
  text: string;
  highlight?: string;
  /** Verbatim text to show on cards when the full review opens with something we do not lead with. */
  excerpt?: string;
  tags: string[];
  reply?: string;
};

export const reviews: Review[] = [
  {
    name: "Christina Ross",
    when: "2026",
    stars: 5,
    text:
      "Jason has worked on my saltwater reef tank for the last several years and has always provided exceptional service. When my tank glass unexpectedly broke, I needed a replacement immediately, and he was there to help every step of the way. He quickly got my new tank set up and made what could have been a stressful situation completely seamless. His knowledge, professionalism, and dedication to his customers are unmatched. I highly recommend Jason to anyone looking for expert aquarium services!",
    highlight: "When my tank glass unexpectedly broke, he was there to help every step of the way.",
    tags: ["Reef tank", "Emergency replacement"],
  },
  {
    name: "Karol Abercrombie",
    when: "2026",
    stars: 5,
    text:
      "Jason is very knowledgeable and has helped numerous times troubleshoot how to adjust the levels of the aquarium at home. His suggestions are spot on. We appreciate his quick turnaround in our questions.",
    highlight: "His suggestions are spot on.",
    tags: ["Water chemistry", "Troubleshooting"],
  },
  {
    name: "Michael Zapin",
    when: "2025",
    stars: 5,
    text:
      "[Jason] (Jason's Aquarium Service LLC) has been on my virtual speed dial for several years already. Jason has been such an enormous help to me, providing assistance even when \"off the clock\" because he's just so passionate about fish and aquariums and everything that goes along with it.\n\nIt's much more of a lifestyle for Jason than it is a hobby. I use Jason for all my service/maintenance calls, and yesterday he spent nearly all day removing an old 55 gallon tank with antiquated substrate, replacing it with a pre-owned (like new) 75 gallon tank, with all the trimmings and sage advice that goes along with it.\n\nYes, Jason sells fish, and all the things that go along with it, but you don't think of Jason as a salesmen. He's much more of a mentor or \"sensei\" for the fish hobbyist. The sales just \"happen\" as part of his infectious enthusiasm for the aquatic world.\n\nThanks Jason for vastly improving my \"lens\" into this magical world. Jason understands for many of us hobbyists, dealing with the stressors of our life on land, the hobby itself isn't just aquatic. It's therapeutic.",
    highlight: "He's much more of a mentor or \"sensei\" for the fish hobbyist.",
    excerpt:
      "Jason has been such an enormous help to me, providing assistance even when \"off the clock\" because he's just so passionate about fish and aquariums and everything that goes along with it. It's much more of a lifestyle for Jason than it is a hobby.",
    tags: ["Tank upgrade", "Maintenance"],
  },
  {
    name: "Jacob Fults",
    when: "2022",
    stars: 5,
    text:
      "Jason does a great job with my aquarium. He helped me establish a beautiful reef tank, and he comes on a regular basis to service it. The selection of fish and coral created a beautiful tank and the species he helped me select have thrived. Highly recommended!",
    highlight: "The species he helped me select have thrived.",
    tags: ["Reef tank", "Fish & coral selection"],
  },
  {
    name: "Stefanie",
    when: "2022",
    stars: 5,
    text:
      "Jason does a great job at servicing my beautiful aquarium. Barrier Reef in Boca is a small local shop that's been around for years they have a great healthy selection of fish. That's how I met Jason for my service I recommend him & the store to everyone that has fish.",
    highlight: "I recommend him to everyone that has fish.",
    tags: ["Maintenance"],
  },
  {
    name: "Zachary Berwin",
    when: "2020",
    stars: 5,
    text:
      "I met Jason at an aquarium fish store and this guy is amazing! He got me into the fish hobby and taught me how to take care of my tank. He just recently came over to do some maintenance and he did everything for a cheaper price. My tank looks perfect.",
    highlight: "He got me into the fish hobby and taught me how to take care of my tank.",
    tags: ["New hobbyist", "Maintenance"],
    reply:
      "Thanks Zachary. I appreciate the review and am happy that I helped you start your aquarium. It is fun to teach you all about how to maintain a healthy environment for your fish. Call me or text me whenever you need. Your tank is looking good and it is great seeing that you have learned so much!",
  },
  {
    name: "Ethan Macier",
    when: "2018",
    stars: 5,
    text:
      "I've been using Jason for over 3 years now outstanding service. Really great guy and very knowledgeable he makes my tank look like its brand new again every time highly recommended.",
    highlight: "He makes my tank look like it's brand new again every time.",
    tags: ["Maintenance"],
  },
];

export const featuredReviews = reviews.filter((r) => r.highlight);
