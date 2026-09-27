/**
 * Procedural reefscape for the hero canvas: sand, rockwork, corals, sea fans,
 * anemones and live plants. Static pieces render once to an offscreen canvas;
 * swaying pieces redraw every frame. Vector only, no images, no blend modes.
 */

type Rng = () => number;

export function seeded(seed: number): Rng {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

type Anim =
  | { kind: "grass"; x: number; y: number; h: number; w: number; blades: number; phase: number; color: string; alpha: number }
  | { kind: "fan"; x: number; y: number; r: number; phase: number; color: string; alpha: number }
  | { kind: "anemone"; x: number; y: number; r: number; n: number; phase: number; base: string; tip: string; alpha: number }
  | { kind: "stem"; x: number; y: number; h: number; phase: number; color: string; alpha: number };

export type Scenery = { statics: HTMLCanvasElement; anims: Anim[]; front: Anim[] };

const ROCK = ["#0c2c48", "#0f3557", "#123c60"];
const ROCK_TOP = "#1d5a83";

export function buildScenery(W: number, H: number, dpr: number): Scenery {
  const rng = seeded(4242);
  const c = document.createElement("canvas");
  c.width = Math.round(W * dpr);
  c.height = Math.round(H * dpr);
  const ctx = c.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const floor = H * 0.985;
  const unit = Math.min(H, W * 0.8) / 100; // scale unit

  // ---- sand bed
  const sandG = ctx.createLinearGradient(0, H * 0.86, 0, H);
  sandG.addColorStop(0, "rgba(20,64,95,0)");
  sandG.addColorStop(0.55, "rgba(20,64,95,0.65)");
  sandG.addColorStop(1, "rgba(9,38,62,0.95)");
  ctx.fillStyle = sandG;
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, H * 0.9);
  for (let x = 0; x <= W; x += W / 12) {
    const y = H * 0.9 + Math.sin(x / W * Math.PI * 3 + 1) * H * 0.012;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();

  // ---- rock clusters (far to near)
  const clusters = [
    { x: W * 0.06, s: 1.0, a: 0.75 },
    { x: W * 0.3, s: 0.7, a: 0.55 },
    { x: W * 0.55, s: 0.85, a: 0.6 },
    { x: W * 0.78, s: 1.25, a: 0.9 },
    { x: W * 0.97, s: 0.9, a: 0.8 },
  ];
  const drawRock = (x: number, y: number, rw: number, rh: number, alpha: number, fill: string) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    const pts = 9;
    for (let i = 0; i <= pts; i++) {
      const a = (i / pts) * Math.PI * 2;
      const wob = 0.82 + rng() * 0.36;
      const px = x + Math.cos(a) * rw * wob;
      const py = y + Math.sin(a) * rh * wob * (Math.sin(a) > 0 ? 0.55 : 1);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    const g = ctx.createLinearGradient(x, y - rh, x, y + rh * 0.5);
    g.addColorStop(0, ROCK_TOP);
    g.addColorStop(0.35, fill);
    g.addColorStop(1, "#071e34");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
  };
  for (const cl of clusters) {
    const n = 3 + Math.floor(rng() * 3);
    for (let i = 0; i < n; i++) {
      const rw = unit * (6 + rng() * 9) * cl.s;
      const rh = unit * (4 + rng() * 6) * cl.s;
      drawRock(cl.x + (rng() - 0.5) * unit * 18 * cl.s, floor - rh * 0.4 - rng() * unit * 4 * cl.s, rw, rh, cl.a, ROCK[i % ROCK.length]);
    }
  }

  // ---- boulder / brain corals
  const boulder = (x: number, y: number, r: number, color: string, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI, 0);
    ctx.closePath();
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.6, r * 0.1, x, y, r);
    g.addColorStop(0, lighten(color, 0.35));
    g.addColorStop(1, color);
    ctx.fillStyle = g;
    ctx.fill();
    // brain grooves
    ctx.strokeStyle = "rgba(4,33,58,0.35)";
    ctx.lineWidth = Math.max(1, r * 0.06);
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      const rr = r * (i / 4);
      for (let a = Math.PI; a <= Math.PI * 2; a += 0.15) {
        const w = Math.sin(a * 9 + i) * r * 0.05;
        const px = x + Math.cos(a) * (rr + w);
        const py = y + Math.sin(a) * (rr + w);
        if (a === Math.PI) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.restore();
  };
  boulder(W * 0.12, floor - unit * 1.5, unit * 7, "#2fb39a", 0.85);
  boulder(W * 0.6, floor - unit * 2, unit * 5.5, "#f2a65a", 0.7);
  boulder(W * 0.84, floor - unit * 1.2, unit * 9, "#7c5cff", 0.75);

  // ---- branching (staghorn) corals
  const branch = (x: number, y: number, len: number, ang: number, depth: number, w: number, color: string) => {
    if (depth === 0 || len < 3) return;
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    ctx.lineWidth = w;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    // polyps
    ctx.fillStyle = lighten(color, 0.45);
    ctx.beginPath();
    ctx.arc(ex, ey, w * 0.55, 0, Math.PI * 2);
    ctx.fill();
    const k = 2 + (rng() > 0.6 ? 1 : 0);
    for (let i = 0; i < k; i++) {
      const na = ang + (rng() - 0.5) * 1.3;
      branch(ex, ey, len * (0.62 + rng() * 0.2), na, depth - 1, w * 0.72, color);
    }
  };
  const staghorn = (x: number, y: number, size: number, color: string, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    for (let i = 0; i < 3; i++) {
      branch(x + (i - 1) * size * 0.25, y, size * 0.9, -Math.PI / 2 + (i - 1) * 0.45 + (rng() - 0.5) * 0.3, 4, size * 0.16, color);
    }
    ctx.restore();
  };
  staghorn(W * 0.03, floor - unit * 3, unit * 10, "#ff7a5c", 0.8);
  staghorn(W * 0.72, floor - unit * 3, unit * 11, "#ff6a4d", 0.85);
  staghorn(W * 0.93, floor - unit * 4, unit * 9, "#c084fc", 0.7);

  // ---- animated pieces (behind fish)
  const anims: Anim[] = [];
  const grassColors = ["#2f9e6a", "#3fbf7e", "#2a7f57"];
  for (let i = 0; i < 3; i++) {
    const x = W * (0.12 + i * 0.36) + (rng() - 0.5) * W * 0.05;
    anims.push({
      kind: "grass",
      x,
      y: floor - unit * (0.5 + rng() * 2),
      h: unit * (12 + rng() * 16),
      w: unit * (0.8 + rng() * 0.6),
      blades: 3 + Math.floor(rng() * 3),
      phase: rng() * Math.PI * 2,
      color: grassColors[i % grassColors.length],
      alpha: 0.35 + rng() * 0.25,
    });
  }
  for (let i = 0; i < 3; i++) {
    anims.push({
      kind: "stem",
      x: W * (0.18 + i * 0.3) + (rng() - 0.5) * W * 0.05,
      y: floor - unit * 1,
      h: unit * (16 + rng() * 10),
      phase: rng() * Math.PI * 2,
      color: i === 1 ? "#c94a72" : "#9b6cff",
      alpha: 0.6,
    });
  }
  anims.push({ kind: "fan", x: W * 0.42, y: floor - unit * 2, r: unit * 12, phase: 0.4, color: "#7c5cff", alpha: 0.55 });
  anims.push({ kind: "fan", x: W * 0.88, y: floor - unit * 3, r: unit * 15, phase: 2.1, color: "#b85cff", alpha: 0.6 });
  anims.push({ kind: "fan", x: W * 0.1, y: floor - unit * 2.5, r: unit * 9, phase: 1.3, color: "#ff6a4d", alpha: 0.45 });
  anims.push({ kind: "anemone", x: W * 0.66, y: floor - unit * 2.2, r: unit * 6, n: 26, phase: 0.9, base: "#c94a72", tip: "#ff8fa3", alpha: 0.85 });
  anims.push({ kind: "anemone", x: W * 0.2, y: floor - unit * 1.8, r: unit * 4.5, n: 20, phase: 2.4, base: "#2fb39a", tip: "#a7f3e3", alpha: 0.7 });

  // ---- foreground pieces (in front of fish, cropped by the edges)
  const front: Anim[] = [
    { kind: "grass", x: W * 0.99, y: H + unit * 2, h: unit * 40, w: unit * 2.4, blades: 4, phase: 1.1, color: "#17563a", alpha: 0.55 },
    { kind: "grass", x: W * 0.01, y: H + unit * 3, h: unit * 30, w: unit * 2, blades: 3, phase: 2.6, color: "#17563a", alpha: 0.45 },
    { kind: "anemone", x: W * 0.9, y: H + unit * 2, r: unit * 12, n: 28, phase: 1.7, base: "#b8385f", tip: "#ff9ab0", alpha: 0.7 },
  ];

  return { statics: c, anims, front };
}

export function drawAnims(ctx: CanvasRenderingContext2D, items: Anim[], t: number) {
  for (const it of items) {
    const sway = Math.sin(t * 0.7 + it.phase) * 0.12 + Math.sin(t * 1.9 + it.phase * 1.7) * 0.03;
    ctx.save();
    ctx.globalAlpha = it.alpha;
    if (it.kind === "grass") {
      ctx.lineCap = "round";
      for (let b = 0; b < it.blades; b++) {
        const off = (b - (it.blades - 1) / 2) * it.w * 1.6;
        const h = it.h * (0.7 + ((b * 37) % 10) / 30);
        const s = sway + Math.sin(t * 1.1 + b + it.phase) * 0.05;
        ctx.strokeStyle = it.color;
        ctx.lineWidth = it.w;
        ctx.beginPath();
        ctx.moveTo(it.x + off, it.y);
        ctx.quadraticCurveTo(it.x + off + h * s * 0.6, it.y - h * 0.55, it.x + off + h * s * 1.6, it.y - h);
        ctx.stroke();
      }
    } else if (it.kind === "stem") {
      // sea whip: a few thin rods from one holdfast, tiny polyp dots along each
      ctx.strokeStyle = it.color;
      ctx.lineCap = "round";
      for (let b = 0; b < 3; b++) {
        const h = it.h * (0.75 + b * 0.12);
        const lean = (b - 1) * 0.35;
        const s = sway * 0.8 + lean;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(it.x, it.y);
        ctx.quadraticCurveTo(it.x + h * s * 0.5, it.y - h * 0.5, it.x + h * s * 1.3, it.y - h);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        for (let i = 1; i <= 5; i++) {
          const k = i / 5.5;
          const px = it.x + h * s * (0.5 * k * k + 0.8 * k * k * k);
          const py = it.y - h * k;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (it.kind === "fan") {
      ctx.translate(it.x, it.y);
      ctx.rotate(sway * 0.35);
      ctx.strokeStyle = it.color;
      ctx.lineWidth = 1.2;
      const ribs = 11;
      for (let i = 0; i < ribs; i++) {
        const a = -Math.PI / 2 + (i - (ribs - 1) / 2) * 0.16;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(Math.cos(a) * it.r * 0.5, Math.sin(a) * it.r * 0.55, Math.cos(a) * it.r, Math.sin(a) * it.r);
        ctx.stroke();
        for (let j = 1; j <= 3; j++) {
          const k = j / 3.4;
          const bx = Math.cos(a) * it.r * k;
          const by = Math.sin(a) * it.r * k;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + Math.cos(a + 1.2) * it.r * 0.14, by + Math.sin(a + 1.2) * it.r * 0.14);
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + Math.cos(a - 1.2) * it.r * 0.14, by + Math.sin(a - 1.2) * it.r * 0.14);
          ctx.stroke();
        }
      }
    } else if (it.kind === "anemone") {
      // base disc
      ctx.fillStyle = it.base;
      ctx.beginPath();
      ctx.ellipse(it.x, it.y, it.r * 0.9, it.r * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineCap = "round";
      for (let i = 0; i < it.n; i++) {
        const a = -Math.PI + (i / it.n) * Math.PI * 2;
        const len = it.r * (0.8 + ((i * 13) % 7) / 10);
        const s = sway * 1.4 + Math.sin(t * 1.6 + i * 0.7 + it.phase) * 0.18;
        const bx = it.x + Math.cos(a) * it.r * 0.8;
        const by = it.y + Math.sin(a) * it.r * 0.3;
        const dir = -Math.PI / 2 + Math.cos(a) * 0.9;
        const ex = bx + Math.cos(dir + s) * len;
        const ey = by + Math.sin(dir + s) * len;
        const g = ctx.createLinearGradient(bx, by, ex, ey);
        g.addColorStop(0, it.base);
        g.addColorStop(1, it.tip);
        ctx.strokeStyle = g;
        ctx.lineWidth = Math.max(1.5, it.r * 0.11);
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.quadraticCurveTo(bx + Math.cos(dir + s * 0.4) * len * 0.5, by + Math.sin(dir + s * 0.4) * len * 0.5, ex, ey);
        ctx.stroke();
        ctx.fillStyle = it.tip;
        ctx.beginPath();
        ctx.arc(ex, ey, Math.max(1.5, it.r * 0.085), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}

function lighten(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const f = (v: number) => Math.round(v + (255 - v) * k);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
