import fs from "node:fs";
const rw = (f, fn) => {
  let s = fs.readFileSync(f, "utf8");
  const o = s;
  s = fn(s);
  if (s === o) console.log("NOCHANGE", f);
  fs.writeFileSync(f, s);
};

rw("lib/services.ts", (s) => s.replace(`image: "/images/services/install.jpg",`, `image: "/images/services/install-2.jpg",`));

rw("components/PageHero.tsx", (s) =>
  s
    .replace(`import { Bubbles, Container } from "./Section";`, `import { Bubbles, Container, Wave } from "./Section";`)
    .replace(`        </div>\n      </Container>\n    </section>\n  );\n}`, `        </div>\n      </Container>\n      <Wave from="#041a2e" to="#ffffff" className="relative" />\n    </section>\n  );\n}`)
);

rw("components/Footer.tsx", (s) =>
  s.replace(`import Logo from "./Logo";`, `import Wordmark from "./Wordmark";`).replace(`            <Logo tone="light" />`, `            <Wordmark tone="light" id="footer" className="w-56" />`)
);

rw("components/home/CtaBand.tsx", (s) =>
  s
    .replace(`import { PhoneIcon } from "@/components/Header";`, `import { PhoneIcon } from "@/components/Header";\nimport { Watermark } from "@/components/Brand";`)
    .replace(`      <Bubbles count={12} />`, `      <Bubbles count={12} />\n      <Watermark className="-right-20 top-1/2 -translate-y-1/2" />`)
);

rw("components/home/ServicesShowcase.tsx", (s) =>
  s
    .replace(`import { Container, Reveal, SectionHead } from "@/components/Section";`, `import { Container, Reveal, SectionHead } from "@/components/Section";\nimport { FishBullet } from "@/components/Brand";`)
    .replace(
      `                      <li key={b} className="flex gap-2.5">\n                        <span className={clsx("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", accentBg[s.accent])} />\n                        <span>{b}</span>`,
      `                      <li key={b} className="flex gap-2.5">\n                        <FishBullet />\n                        <span>{b}</span>`
    )
);

rw("components/home/WhyHire.tsx", (s) =>
  s
    .replace(`import { PhoneIcon } from "@/components/Header";`, `import { PhoneIcon } from "@/components/Header";\nimport { FishBullet } from "@/components/Brand";`)
    .replace(
      `                <li key={f} className="flex gap-3">\n                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />\n                  {f}`,
      `                <li key={f} className="flex gap-3">\n                  <FishBullet />\n                  {f}`
    )
);

rw("components/home/Specialties.tsx", (s) =>
  s.replace(`import { Arrow } from "./ServicesShowcase";`, `import { Arrow } from "./ServicesShowcase";\nimport { Watermark } from "@/components/Brand";`).replace(`      <Bubbles count={16} />`, `      <Bubbles count={16} />\n      <Watermark />`)
);

rw("components/home/Reviews.tsx", (s) =>
  s
    .replace(`import { Stars } from "@/components/Footer";`, `import { Stars } from "@/components/Footer";\nimport { Watermark } from "@/components/Brand";`)
    .replace(`      <Bubbles count={14} />`, `      <Bubbles count={14} />\n      <Watermark className="-left-20 right-auto top-auto bottom-0" />`)
);

rw("app/services/[slug]/page.tsx", (s) =>
  s
    .replace(`import AlgaeWipe from "@/components/AlgaeWipe";`, `import AlgaeWipe from "@/components/AlgaeWipe";\nimport { BrandBand, Callout, FishBullet } from "@/components/Brand";`)
    .replace(
      `              <Reveal delay={100} className="prose-lg mt-10 space-y-5 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">\n                {s.body.map((p) => (\n                  <p key={p.slice(0, 24)}>{p}</p>\n                ))}\n              </Reveal>`,
      `              <Reveal delay={100} className="mt-10 space-y-6">\n                <p className="font-display text-pretty text-[1.25rem] leading-snug text-abyss md:text-[1.45rem]">{s.body[0]}</p>\n                {s.body[1] && <Callout eyebrow="Where the difference shows">{s.body[1]}</Callout>}\n                {s.body.slice(2).map((p) => (\n                  <p key={p.slice(0, 24)} className="text-pretty text-[1.05rem] leading-relaxed text-ink-soft">{p}</p>\n                ))}\n              </Reveal>`
    )
    .replace(
      `                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-kelp/15 text-kelp">\n                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6">\n                          <path d="M4 10.5l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />\n                        </svg>\n                      </span>`,
      `                      <FishBullet />`
    )
    .replace(
      `      <section className="bg-shell py-20 md:py-24">\n        <Container>\n          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">\n            <SectionHead eyebrow="Questions"`,
      `      <BrandBand />\n\n      <section className="bg-shell py-20 md:py-24">\n        <Container>\n          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">\n            <SectionHead eyebrow="Questions"`
    )
);

rw("app/aquarium-service/[city]/page.tsx", (s) =>
  s
    .replace(`import { Stars } from "@/components/Footer";`, `import { Stars } from "@/components/Footer";\nimport { BrandBand, Callout } from "@/components/Brand";`)
    .replace(
      `                {c.local.map((p) => (\n                  <p key={p.slice(0, 30)} className="text-ink-soft">{p}</p>\n                ))}`,
      `                {c.local.slice(0, -1).map((p) => (\n                  <p key={p.slice(0, 30)} className="text-ink-soft">{p}</p>\n                ))}\n                <Callout eyebrow={\`Good to know in \${c.name}\`}>{c.local[c.local.length - 1]}</Callout>`
    )
    .replace(`                  {[...services, ...specialties].map((s) => (`, `                  {[...services, ...specialties, { slug: "tools", name: "Free tools for your tank" }].map((s) => (`)
    .replace(
      `                      href={"bullets" in s ? \`/services/\${s.slug}\` : \`/aquariums/\${s.slug}\`}`,
      `                      href={s.slug === "tools" ? "/tools" : "bullets" in s ? \`/services/\${s.slug}\` : \`/aquariums/\${s.slug}\`}`
    )
    .replace(
      `      <section className="bg-shell py-20 md:py-24">\n        <Container>\n          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">\n            <div>\n              <SectionHead eyebrow="Local questions"`,
      `      <BrandBand />\n\n      <section className="bg-shell py-20 md:py-24">\n        <Container>\n          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">\n            <div>\n              <SectionHead eyebrow="Local questions"`
    )
);

rw("app/about/page.tsx", (s) =>
  s
    .replace(`import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";`, `import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";\nimport { Callout, FishBullet, Watermark } from "@/components/Brand";\nimport { Bubbles } from "@/components/Section";`)
    .replace(
      `              <p className="font-semibold text-abyss">\n                Text me a photo of your tank. I will tell you what it needs.\n              </p>`,
      `              <Callout tone="coral">\n                <span className="font-display text-[1.2rem] leading-snug">Text me a photo of your tank. I will tell you what it needs.</span>\n              </Callout>`
    )
    .replace(
      `      <section className="bg-shell py-20 md:py-24">\n        <Container>\n          <SectionHead eyebrow="Plainly" title="What you get and what you do not" />\n          <div className="mt-10 grid gap-5 md:grid-cols-3">`,
      `      <section className="relative isolate overflow-hidden bg-abyss py-20 text-white md:py-24">\n        <Bubbles count={10} />\n        <Watermark />\n        <Container className="relative">\n          <SectionHead tone="dark" eyebrow="Plainly" title="What you get and what you do not" />\n          <div className="mt-10 grid gap-8 md:grid-cols-3">`
    )
    .replace(
      `              <Reveal key={c.t} delay={i * 80} className="rounded-[1.5rem] bg-white p-7 ring-1 ring-[var(--line)]">\n                <h3 className="font-display text-[1.3rem] leading-tight text-abyss">{c.t}</h3>\n                <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{c.b}</p>\n              </Reveal>`,
      `              <Reveal key={c.t} delay={i * 80} className="border-l-2 border-aqua/50 pl-5">\n                <h3 className="font-display flex items-start gap-2 text-[1.35rem] leading-tight">\n                  <FishBullet className="mt-1.5" />\n                  {c.t}\n                </h3>\n                <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/75">{c.b}</p>\n              </Reveal>`
    )
    .replace(`          <Reveal delay={200} className="mt-10 text-[0.9rem] text-ink-soft">`, `          <Reveal delay={200} className="mt-10 text-[0.9rem] text-white/60">`)
    .replace(`            <Link href="/service-areas" className="font-semibold text-abyss underline-offset-4 hover:underline">`, `            <Link href="/service-areas" className="font-semibold text-aqua underline-offset-4 hover:underline">`)
);

rw("app/guides/[slug]/page.tsx", (s) =>
  s
    .replace(`import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";`, `import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";\nimport { Callout } from "@/components/Brand";`)
    .replace(
      `              {g.sections.map((s, i) => (\n                <Reveal key={s.h} delay={Math.min(i, 2) * 50} className="mb-10">`,
      `              {g.sections.map((s, i) => (\n                <Reveal key={s.h} delay={Math.min(i, 2) * 50} className="mb-10">\n                  {i === 2 && (\n                    <Callout eyebrow="Try it on your tank" className="mb-10">\n                      The free tools on this site do the math for you: decode a water test, size a water change, or plan a service schedule.{" "}\n                      <Link href="/tools" className="font-bold text-abyss underline-offset-4 hover:underline">Open the tools</Link>\n                    </Callout>\n                  )}`
    )
);

rw("app/faq/page.tsx", (s) =>
  s
    .replace(`import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";`, `import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";\nimport { FishBullet } from "@/components/Brand";`)
    .replace(
      `      <section className="bg-white py-16 md:py-24">\n        <Container>\n          <div className="mx-auto max-w-4xl space-y-14">\n            {faqGroups.map((g, i) => (\n              <Reveal key={g.title} delay={Math.min(i, 2) * 60}>\n                <h2 className="font-display text-[1.6rem] leading-tight text-abyss md:text-[2rem]">{g.title}</h2>\n                <div className="mt-4">\n                  <FaqList faqs={g.faqs} defaultOpen={i === 0 ? 0 : null} />\n                </div>\n              </Reveal>\n            ))}\n          </div>\n        </Container>\n      </section>`,
      `      {faqGroups.map((g, i) => (\n        <section key={g.title} className={i % 2 ? "bg-shell py-14 md:py-20" : "bg-white py-14 md:py-20"}>\n          <Container>\n            <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">\n              <h2 className="font-display flex items-start gap-3 text-[1.6rem] leading-tight text-abyss md:text-[2rem]">\n                <FishBullet className="mt-2 h-5 w-6" />\n                {g.title}\n              </h2>\n              <FaqList faqs={g.faqs} defaultOpen={i === 0 ? 0 : null} />\n            </Reveal>\n          </Container>\n        </section>\n      ))}`
    )
);

rw("app/reviews/page.tsx", (s) =>
  s
    .replace(`import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";`, `import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";\nimport { FishMark } from "@/components/Logo";`)
    .replace(
      `<span className="grid h-10 w-10 place-items-center rounded-full bg-abyss text-[0.95rem] font-bold text-aqua">{r.name.charAt(0)}</span>`,
      `<span className="grid h-10 w-10 place-items-center rounded-full bg-abyss"><FishMark className="h-6 w-7" id={\`rv-\${i}\`} /></span>`
    )
);

console.log("brand pass done");
