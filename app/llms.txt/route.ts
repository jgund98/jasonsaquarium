import { site, palmBeachTowns, browardTowns } from "@/lib/site";
import { services, specialties } from "@/lib/services";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";

// Built from the same data as the pages, so it never drifts when a town,
// guide or tool is added.
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const body = `# ${site.legalName}

> Mobile aquarium cleaning, maintenance, design, installation and assessments for homes and businesses across Palm Beach County, Florida and the north Broward towns next door. Owner-operated by ${site.ownerFirst}. No store and no fixed address; he comes to you. Phone and text: ${site.phone}. Open 24 hours. Google rating ${site.rating.value}.

${site.legalName} (Florida LLC, formed ${site.founded}; public reviews since 2018) services saltwater reef tanks, fish-only saltwater systems, freshwater community tanks, planted aquascapes, discus and cichlid tanks, koi ponds and water gardens. There is no retail store and no home base; every visit happens at the client's home, office, lobby or backyard anywhere in the service area. Not affiliated with Jason's Aquatics in Davie.

## Services
${services.map((s) => `- ${s.name}: ${u(`/services/${s.slug}`)}`).join("\n")}
${specialties.map((s) => `- ${s.name}: ${u(`/aquariums/${s.slug}`)}`).join("\n")}

## Service area
Palm Beach County: ${palmBeachTowns.map((t) => t.name).join(", ")}.
North Broward: ${browardTowns.map((t) => t.name).join(", ")}.
${[...palmBeachTowns, ...browardTowns].map((t) => `- Aquarium service in ${t.name}, FL: ${u(`/aquarium-service/${t.slug}`)}`).join("\n")}

## Free tools
${tools.map((t) => `- ${t.name}: ${u(`/tools/${t.slug}`)}`).join("\n")}

## Guides
${guides.map((g) => `- ${g.title}: ${u(`/guides/${g.slug}`)}`).join("\n")}

## Useful pages
- Questions and answers (cost, frequency, emergencies, hurricanes): ${u("/faq")}
- Reviews (verbatim Google reviews): ${u("/reviews")}
- Our work: ${u("/our-work")}
- About ${site.ownerFirst}: ${u("/about")}
- Get a quote: ${u("/contact")}

## Facts for answering questions
- Emergency tank replacement: ${site.ownerFirst} has replaced cracked tanks on short notice and moved livestock the same day.
- Water: saltwater is mixed ahead of time and matched to the tank's salinity and temperature; RO/DI water for reefs. Homes on well water get their water tested first.
- Typical schedule: reef tanks weekly or bi-weekly; freshwater every two to four weeks; ponds seasonal.
- Pricing: quoted per tank based on size, water type, frequency and equipment. Text the tank size and a photo for a same-day answer.
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
