// Tell Bing (and every IndexNow engine: Yandex, Seznam, Naver) which URLs
// changed. Bing is what ChatGPT reads. Run after each production deploy:
//   node scripts/indexnow.mjs            -> submits every URL in the live sitemap
//   node scripts/indexnow.mjs /guides/x  -> submits only the given paths
const host = "www.jasonsaquariumservice.com";
const key = "e84eb39f107896b6e0e85ce5812cbf93"; // served at https://<host>/<key>.txt from public/
const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `https://${host}${p}`));
} else {
  const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
