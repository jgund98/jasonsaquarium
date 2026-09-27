// Builds public/og.jpg (1200x630) from the real Wordmark: brand first, almost no text.
import fs from "node:fs";
import sharp from "sharp";
let src = fs.readFileSync("components/Wordmark.tsx", "utf8");
let inner = src.slice(src.indexOf("<defs>"), src.lastIndexOf("</svg>"));
inner = inner
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  .replace(/\{`\$\{id\}-(\w)`\}/g, '"og-$1"')
  .replace(/\{`url\(#\$\{id\}-(\w)\)`\}/g, '"url(#og-$1)"')
  .replace(/\{g1\}/g, '"#ffffff"').replace(/\{g2\}/g, '"#bff3ff"').replace(/\{caps\}/g, '"#33d6f2"')
  .replace(/\{light \? 0\.95 : 0\.9\}/g, '"0.95"')
  .replace(/stopColor/g, "stop-color").replace(/stopOpacity/g, "stop-opacity")
  .replace(/strokeWidth/g, "stroke-width").replace(/strokeLinecap/g, "stroke-linecap");
if (/\{[^}]*\}/.test(inner)) throw new Error("unconverted JSX: " + inner.match(/\{[^}]*\}/)[0]);

const W = 1200, H = 630, mw = 760, mh = mw / 2.7067;
const bubbles = Array.from({ length: 26 }, (_, i) => {
  const r = 3 + ((i * 7) % 11); const x = (i * 173) % W; const y = 80 + ((i * 251) % 480);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#33d6f2" stroke-opacity="${0.18 + (i % 4) * 0.08}" stroke-width="1.6"/>`;
}).join("");
const branch = (x, y, s, c, o) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}">
  <path d="M0 0 C-6 -40 -18 -80 -10 -130 C-6 -150 6 -150 10 -130 C18 -80 6 -40 0 0 Z"/>
  <path d="M-4 -60 C-30 -80 -50 -110 -48 -150 C-46 -162 -36 -160 -34 -148 C-30 -112 -14 -90 -4 -60 Z"/>
  <path d="M4 -70 C28 -95 44 -125 40 -170 C38 -182 28 -180 26 -168 C26 -130 14 -100 4 -70 Z"/>
  <path d="M-2 -100 C-20 -130 -22 -160 -12 -190 C-8 -200 2 -198 2 -186 C0 -160 -4 -130 -2 -100 Z"/>
</g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <radialGradient id="bg" cx="0.5" cy="0.42" r="0.75"><stop offset="0" stop-color="#0f5f8f"/><stop offset="0.55" stop-color="#083a5e"/><stop offset="1" stop-color="#04213a"/></radialGradient>
  <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#33d6f2" stop-opacity="0.55"/><stop offset="1" stop-color="#33d6f2" stop-opacity="0"/></radialGradient>
  <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff3ff" stop-opacity="0.22"/><stop offset="1" stop-color="#bff3ff" stop-opacity="0"/></linearGradient>
  <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04213a" stop-opacity="0"/><stop offset="1" stop-color="#021427" stop-opacity="0.9"/></linearGradient>
  <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<ellipse cx="600" cy="300" rx="520" ry="230" fill="url(#glow)" filter="url(#blur)"/>
<polygon points="110,0 200,0 420,630 250,630" fill="url(#ray)" opacity="0.8"/>
<polygon points="960,0 1030,0 1200,420 1200,630 1140,630" fill="url(#ray)" opacity="0.6"/>
<g filter="url(#soft)">
  ${branch(90, 640, 1.15, "#ff6a4d", 0.75)}${branch(180, 650, 0.8, "#c084fc", 0.6)}${branch(1090, 645, 1.2, "#ff6a4d", 0.7)}${branch(1000, 650, 0.85, "#33d6f2", 0.5)}${branch(1150, 655, 0.7, "#c084fc", 0.55)}
</g>
${branch(60, 640, 1.0, "#ff8a6d", 0.95)}${branch(1130, 640, 1.05, "#ff8a6d", 0.95)}${branch(1010, 650, 0.75, "#33d6f2", 0.8)}${branch(150, 655, 0.65, "#c084fc", 0.85)}
<rect y="450" width="${W}" height="180" fill="url(#sand)"/>
${bubbles}
<g transform="translate(${(W - mw) / 2} ${(H - mh) / 2 - 8}) scale(${mw / 406})">${inner}</g>
</svg>`;
fs.writeFileSync("scripts/og-preview.svg", svg);
const out = await sharp(Buffer.from(svg), { density: 144 }).resize(W, H).jpeg({ quality: 90, mozjpeg: true }).toFile("public/og.jpg");
console.log("og.jpg", out.width, out.height, out.size);
