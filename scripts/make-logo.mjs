import opentype from "opentype.js";
import fs from "node:fs";

const load = (p) => { const b = fs.readFileSync(p); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const snig = load("raw/fonts/Sniglet-ExtraBold.ttf");
const popp = load("raw/fonts/Poppins-SemiBold.ttf");

function glyphs(font, text, size, x0, y0, spacing = 0) {
  const out = [];
  let x = x0;
  font.forEachGlyph(text, x0, y0, size, { kerning: true, letterSpacing: spacing / size }, (g, gx, gy) => {
    const p = g.getPath(gx, gy, size);
    const bb = p.getBoundingBox();
    const f = (v) => (Number.isFinite(v) ? v.toFixed(2) : null);
    let d = "", last = [0, 0];
    for (const c of p.commands) {
      if (c.type === "M" || c.type === "L") { d += `${c.type}${f(c.x)} ${f(c.y)} `; last = [c.x, c.y]; }
      else if (c.type === "Q") { const x1 = Number.isFinite(c.x1) ? c.x1 : last[0], y1 = Number.isFinite(c.y1) ? c.y1 : last[1]; d += `Q${f(x1)} ${f(y1)} ${f(c.x)} ${f(c.y)} `; last = [c.x, c.y]; }
      else if (c.type === "C") { d += `C${f(c.x1)} ${f(c.y1)} ${f(c.x2)} ${f(c.y2)} ${f(c.x)} ${f(c.y)} `; last = [c.x, c.y]; }
      else if (c.type === "Z") d += "Z ";
    }
    out.push({ ch: String.fromCodePoint(g.unicode ?? 63), d: d.trim(), x: gx, bb, adv: (g.advanceWidth / font.unitsPerEm) * size });
    x = gx;
  });
  return out;
}

const SIZE = 100;
const word = glyphs(snig, "Jason’s", SIZE, 0, 100);
const apos = word.find((g) => g.ch === "’" || g.ch === "'");
const body = word.filter((g) => g !== apos);
const last = word[word.length - 1];
const wordW = last.x + last.adv;
const o = word.find((g) => g.ch === "o");

const capsRaw = glyphs(popp, "AQUARIUM SERVICE", 26, 0, 130, 6.2);
const capsLast = capsRaw[capsRaw.length - 1];
const capsW = capsLast.x + capsLast.adv - 6.2;
// scale caps to match word width exactly
const capsScale = wordW / capsW;

const data = {
  wordW,
  body: body.map((g) => g.d),
  apos: apos ? { x: apos.bb.x1, x2: apos.bb.x2, y1: apos.bb.y1, y2: apos.bb.y2 } : null,
  o: o ? { x1: o.bb.x1, x2: o.bb.x2, y1: o.bb.y1, y2: o.bb.y2 } : null,
  caps: capsRaw.map((g) => g.d),
  capsScale,
  wordBB: body.reduce((a, g) => ({ x1: Math.min(a.x1, g.bb.x1), y1: Math.min(a.y1, g.bb.y1), x2: Math.max(a.x2, g.bb.x2), y2: Math.max(a.y2, g.bb.y2) }), { x1: 1e9, y1: 1e9, x2: -1e9, y2: -1e9 }),
};
fs.writeFileSync("scripts/logo-data.json", JSON.stringify(data));
console.log("wordW", wordW.toFixed(1), "apos", data.apos, "o", data.o, "wordBB", data.wordBB, "capsScale", capsScale.toFixed(3));
