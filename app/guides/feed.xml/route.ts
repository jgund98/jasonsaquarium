import { site } from "@/lib/site";
import { guides } from "@/lib/guides";

// RSS for the guides. Bing and feed readers pick up new guides from here.
export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = [...guides]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((g) => {
      const url = `${site.url}/guides/${g.slug}`;
      return `    <item>
      <title>${esc(g.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(g.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description>${esc(g.description)}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} guides</title>
    <link>${site.url}/guides</link>
    <atom:link href="${site.url}/guides/feed.xml" rel="self" type="application/rss+xml" />
    <description>Aquarium guides for Palm Beach County tank owners.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
