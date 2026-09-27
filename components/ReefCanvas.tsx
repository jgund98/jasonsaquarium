"use client";

/**
 * The living reef. The hero IS the tank.
 *
 * Interaction model
 *  - Desktop: the pointer is a light in the water. Hold it still and the
 *    nearest school gathers to it (fish come to the glass). Move fast and they
 *    scatter. Moving leaves a bubble wake. Click drops food. The scene has
 *    pointer parallax so the reef has depth.
 *  - Touch: a sideways swipe does what the mouse does (vertical swipes always
 *    scroll the page thanks to touch-action: pan-y). Tap drops food. Scrolling
 *    parallaxes the reef. Device tilt (where allowed without a prompt) shifts
 *    the scene.
 *  - Always: schools drift toward and away from the glass on their own, so the
 *    tank has depth and motion with no input at all.
 *
 * Plain 2D canvas, no blend modes, no images, DPR capped, pauses offscreen,
 * respects prefers-reduced-motion.
 */

import { useEffect, useRef, useState, type RefObject } from "react";
import clsx from "clsx";
import { buildScenery, drawAnims, type Scenery } from "./reef-scenery";

type Species = "blueTang" | "yellowTang" | "clown" | "purpleTang" | "chromis" | "angel" | "gramma" | "butterfly" | "mandarin" | "wrasse";

type Fish = {
  x: number;
  y: number;
  z: number; // 0 far .. 1 at the glass
  vx: number;
  vy: number;
  size: number;
  species: Species;
  school: number; // -1 for a solo wanderer
  wander?: { gx: number; gy: number; respawnAt: number; active: boolean };
  zOff: number;
  phase: number;
  wagSpeed: number;
};

type School = {
  species: Species;
  z: number;
  tz: number;
  tx: number;
  ty: number;
  retarget: number;
  anchor?: { x: number; y: number };
};
type Flake = { x: number; y: number; vy: number; life: number; r: number; wob: number };
type Ripple = { x: number; y: number; t: number; big: boolean };
type Bubble = { x: number; y: number; r: number; vy: number; wob: number; life: number; wake: boolean };

const PALETTE: Record<Species, { body: string; body2: string; tail: string; fin: string }> = {
  blueTang: { body: "#2f7dff", body2: "#1a48c2", tail: "#ffd23a", fin: "#163f9e" },
  yellowTang: { body: "#ffd23a", body2: "#f0a800", tail: "#ffe680", fin: "#dc9c00" },
  clown: { body: "#ff7a2a", body2: "#e85a10", tail: "#ff9a4a", fin: "#c94a08" },
  purpleTang: { body: "#7a5cf0", body2: "#4f34bf", tail: "#ffd23a", fin: "#3e2a9c" },
  chromis: { body: "#4fe0d0", body2: "#1fb0a0", tail: "#8ff2e8", fin: "#159487" },
  angel: { body: "#2748c9", body2: "#122a8a", tail: "#ffd23a", fin: "#0d1f6b" },
  gramma: { body: "#8a3cff", body2: "#5c1fd6", tail: "#ffd23a", fin: "#4a18b0" },
  butterfly: { body: "#fff4c8", body2: "#ffd23a", tail: "#ffd23a", fin: "#2a2a2a" },
  mandarin: { body: "#2fae6e", body2: "#1a7d4c", tail: "#ff7a2a", fin: "#ff7a2a" },
  wrasse: { body: "#33d9b2", body2: "#149a8c", tail: "#ff5c8a", fin: "#0f6f66" },
};
const SOLO: Species[] = ["angel", "gramma", "butterfly", "mandarin", "wrasse", "clown", "blueTang", "yellowTang"];
const TALL: Record<Species, number> = { chromis: 0.34, clown: 0.42, blueTang: 0.56, yellowTang: 0.56, purpleTang: 0.56, angel: 0.58, gramma: 0.36, butterfly: 0.58, mandarin: 0.4, wrasse: 0.3 };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const zScale = (z: number) => 0.42 + z * 0.78;
const zAlpha = (z: number) => 0.28 + z * 0.72;
const zSpeed = (z: number) => 0.5 + z * 0.55;

export default function ReefCanvas({
  className,
  interactive = true,
  avoid,
  onFirstFeed,
}: {
  className?: string;
  interactive?: boolean;
  avoid?: RefObject<HTMLElement | null>;
  onFirstFeed?: () => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const fedRef = useRef(false);
  const onFirstFeedRef = useRef(onFirstFeed);
  onFirstFeedRef.current = onFirstFeed;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const front = frontRef.current;
    const fctx = front?.getContext("2d", { alpha: true }) ?? null;
    if (!ctx || !front || !fctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let W = 0;
    let H = 0;
    let fish: Fish[] = [];
    let schools: School[] = [];
    let scenery: Scenery | null = null;
    const flakes: Flake[] = [];
    const ripples: Ripple[] = [];
    const bubbles: Bubble[] = [];
    // far-distance silhouettes for depth
    type Shadow = { x: number; y: number; vx: number; vy: number; L: number; phase: number; wag: number; big: boolean };
    const shadows: Shadow[] = [];
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0, on: false, t: -10, still: 0 };
    const par = { x: 0, y: 0, tx: 0, ty: 0 }; // parallax
    const tilt = { x: 0, y: 0, on: false };
    const avoidBox = { x: 0, y: 0, w: 0, h: 0, on: false };
    let raf = 0;
    let running = true;
    let visible = true;
    let last = performance.now();
    let time = 0;
    let avoidTick = 0;
    let wakeTick = 0;
    let scrollBase = 0;

    const addSchool = (species: Species, z: number, n: number, sizeRange: [number, number], anchor?: { x: number; y: number }) => {
      const id = schools.length;
      // enter from off the right edge on load
      // schools enter from off the right edge; single residents start scattered in the open water
      const cx = anchor ? anchor.x : n === 1 ? rand(W * 0.35, W * 0.95) : W + rand(80, 260);
      const cy = anchor ? anchor.y : n === 1 ? rand(H * 0.14, H * 0.7) : rand(H * 0.25, H * 0.65);
      schools.push({ species, z, tz: z, tx: rand(W * 0.5, W * 0.9), ty: cy, retarget: rand(1, 3), anchor });
      for (let i = 0; i < n; i++) {
        fish.push({
          x: cx + rand(-70, 70),
          y: cy + rand(-40, 40),
          z,
          vx: n === 1 ? rand(-0.5, 0.5) : -0.9,
          vy: 0,
          size: rand(sizeRange[0], sizeRange[1]),
          species,
          school: id,
          zOff: rand(-0.08, 0.08),
          phase: rand(0, Math.PI * 2),
          wagSpeed: rand(7, 10),
        });
      }
    };

    const spawnWanderer = (delay = 0, existing?: Fish) => {
      const species = SOLO[Math.floor(Math.random() * SOLO.length)];
      const fromLeft = Math.random() < 0.5;
      const z = rand(0.35, 1);
      const size = species === "angel" || species === "butterfly" ? rand(52, 70) : species === "gramma" || species === "mandarin" ? rand(30, 40) : rand(42, 60);
      const y = rand(H * 0.14, H * 0.7);
      const f: Fish = existing ?? {
        x: 0, y: 0, z, vx: 0, vy: 0, size, species, school: -1, zOff: 0, phase: rand(0, Math.PI * 2), wagSpeed: rand(6, 9),
      };
      f.species = species; f.size = size; f.z = z; f.school = -1;
      f.x = fromLeft ? -80 : W + 80;
      f.y = y;
      f.vx = fromLeft ? 0.5 : -0.5;
      f.vy = 0;
      f.wander = { gx: fromLeft ? W + 120 : -120, gy: rand(H * 0.14, H * 0.7), respawnAt: time + delay, active: delay <= 0 };
      if (!existing) fish.push(f);
      return f;
    };

    const spawn = () => {
      fish = [];
      schools = [];
      const small = W < 720;
      const k = small ? 0.62 : W < 1100 ? 0.8 : 1;
      // One small school of chromis, plus residents: individuals that live in the
      // tank at their own depth and pace, retargeting like real fish do.
      addSchool("chromis", 0.5, Math.round(8 * k), [28, 38]);
      if (!small) addSchool("chromis", 0.15, 4, [24, 30]);
      const residents: [Species, number, [number, number]][] = [
        ["yellowTang", 0.9, [50, 58]],
        ["blueTang", 0.7, [52, 62]],
        ["angel", 0.85, [58, 70]],
        ["gramma", 0.6, [30, 36]],
        ["butterfly", 0.75, [52, 60]],
        ["mandarin", 0.45, [30, 38]],
        ["wrasse", 0.65, [44, 54]],
        ["purpleTang", 0.55, [46, 54]],
        ["wrasse", 0.95, [40, 48]],
        ["yellowTang", 0.4, [40, 48]],
        ["butterfly", 0.35, [40, 48]],
      ];
      const count = small ? 6 : residents.length;
      for (let i = 0; i < count; i++) {
        const [sp, z, sz] = residents[i];
        addSchool(sp, z, 1, sz);
      }
      // two transient visitors that cross and leave
      for (let i = 0; i < 2; i++) spawnWanderer(4 + i * 6);
      addSchool("clown", 0.9, 2, [38, 46], { x: W * 0.66, y: H * 0.86 });
    };

    const spawnShadows = () => {
      shadows.length = 0;
      return; // silhouette layer retired
      const n = W < 720 ? 10 : 18;
      const cx = rand(W * 0.3, W * 0.8), cy = rand(H * 0.15, H * 0.5);
      for (let i = 0; i < n; i++) {
        shadows.push({ x: cx + rand(-140, 140), y: cy + rand(-70, 70), vx: -0.22, vy: 0, L: rand(14, 22), phase: rand(0, 6.28), wag: rand(5, 8), big: false });
      }
      // one large slow shape far back
      shadows.push({ x: -220, y: rand(H * 0.12, H * 0.4), vx: 0.28, vy: 0, L: W < 720 ? 110 : 170, phase: 0, wag: 3.5, big: true });
    };

    const spawnBubbles = () => {
      bubbles.length = 0;
      const n = Math.round((W * H) / 170000);
      for (let i = 0; i < n; i++) {
        bubbles.push({ x: rand(0, W), y: rand(0, H), r: rand(1.2, 3.2), vy: rand(0.2, 0.55), wob: rand(0, Math.PI * 2), life: 1, wake: false });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      if (nw === W && nh === H && fish.length) return;
      W = nw;
      H = nh;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      front.width = canvas.width;
      front.height = canvas.height;
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
      spawnBubbles();
      spawnShadows();
      scenery = buildScenery(W, H, dpr);
      scrollBase = window.scrollY;
    };

    resize();
    setReady(true);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    const io = new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }, { threshold: 0.01 });
    io.observe(canvas);
    const onVis = () => { running = !document.hidden; last = performance.now(); };
    document.addEventListener("visibilitychange", onVis);

    const readAvoid = () => {
      const el = avoid?.current;
      if (!el) { avoidBox.on = false; return; }
      const r = el.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      avoidBox.x = r.left - c.left - 24;
      avoidBox.y = r.top - c.top - 24;
      avoidBox.w = r.width + 48;
      avoidBox.h = r.height + 48;
      avoidBox.on = true;
    };
    readAvoid();

    // ---------- input ----------
    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const setPointer = (x: number, y: number) => {
      if (pointer.on) {
        const dx = x - pointer.x, dy = y - pointer.y;
        const sp = Math.hypot(dx, dy);
        pointer.speed = pointer.speed * 0.6 + sp * 0.4;
        if (sp > 1.5) pointer.still = 0;
      }
      pointer.x = x; pointer.y = y; pointer.on = true; pointer.t = time;
      par.tx = (x / W - 0.5);
      par.ty = (y / H - 0.5);
    };
    const onMove = (e: PointerEvent) => {
      if (reduced || !interactive) return;
      const p = toLocal(e);
      setPointer(p.x, p.y);
    };
    const onLeave = () => { pointer.on = false; par.tx = 0; par.ty = 0; };
    const feed = (x: number, y: number) => {
      for (let i = 0; i < 7; i++) {
        flakes.push({ x: x + rand(-14, 14), y: y + rand(-10, 10), vy: rand(0.18, 0.4), life: 1, r: rand(1.6, 3), wob: rand(0, Math.PI * 2) });
      }
      ripples.push({ x, y, t: 0, big: true });
      if (!fedRef.current) { fedRef.current = true; onFirstFeedRef.current?.(); }
    };
    let downAt: { x: number; y: number; t: number; id: number } | null = null;
    const onDown = (e: PointerEvent) => {
      if (reduced || !interactive) return;
      const p = toLocal(e);
      downAt = { x: p.x, y: p.y, t: performance.now(), id: e.pointerId };
      setPointer(p.x, p.y);
      pointer.speed = 0;
    };
    const onUp = (e: PointerEvent) => {
      if (!downAt || downAt.id !== e.pointerId) return;
      const p = toLocal(e);
      const dx = p.x - downAt.x, dy = p.y - downAt.y, dt = performance.now() - downAt.t;
      downAt = null;
      if (dx * dx + dy * dy < 15 * 15 && dt < 450) feed(p.x, p.y);
      if (e.pointerType === "touch") pointer.t = time - 2.2; // fade the touch light soon after lift
    };
    const onCancel = () => { downAt = null; };
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });
    canvas.addEventListener("pointerdown", onDown, { passive: true });
    canvas.addEventListener("pointerup", onUp, { passive: true });
    canvas.addEventListener("pointercancel", onCancel, { passive: true });

    // tilt, only where no permission prompt is needed
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tilt.on = true;
      tilt.x = Math.max(-1, Math.min(1, e.gamma / 30));
      tilt.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    };
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined;
    if (coarse && !reduced && DOE && typeof DOE.requestPermission !== "function") {
      window.addEventListener("deviceorientation", onTilt, { passive: true });
    }

    // ---------- simulation ----------
    const step = (dt: number) => {
      time += dt;
      const t = time;
      avoidTick += dt;
      if (avoidTick > 0.5) { avoidTick = 0; readAvoid(); }

      // parallax target: pointer on desktop, tilt or scroll on touch
      if (coarse) {
        if (tilt.on) { par.tx = tilt.x * 0.5; par.ty = tilt.y * 0.3; }
        else if (!pointer.on || t - pointer.t > 2) { par.tx = 0; par.ty = Math.max(-0.5, Math.min(0.5, (window.scrollY - scrollBase) / (H * 2))); }
      }
      par.x += (par.tx - par.x) * Math.min(1, dt * 3);
      par.y += (par.ty - par.y) * Math.min(1, dt * 3);

      pointer.speed *= Math.pow(0.02, dt); // decay quickly when no move events
      pointer.still += dt;
      const pointerOn = pointer.on && t - pointer.t < 3;
      const calm = pointerOn && pointer.speed < 4 && pointer.still > 0.25;
      const fast = pointerOn && pointer.speed > 14;

      // wake bubbles while the pointer moves through the water
      wakeTick += dt;
      if (pointerOn && pointer.speed > 3 && wakeTick > 0.045) {
        wakeTick = 0;
        bubbles.push({ x: pointer.x + rand(-6, 6), y: pointer.y + rand(-6, 6), r: rand(1.2, 3.4), vy: rand(0.5, 1.1), wob: rand(0, Math.PI * 2), life: 1, wake: true });
        if (pointer.speed > 18 && Math.random() < 0.35) ripples.push({ x: pointer.x, y: pointer.y, t: 0.5, big: false });
      }

      // schools: wander, and drift in depth
      for (const s of schools) {
        s.retarget -= dt;
        if (s.retarget <= 0) {
          s.retarget = rand(3, 8);
          if (s.anchor) {
            s.tx = s.anchor.x + rand(-W * 0.06, W * 0.06);
            s.ty = s.anchor.y + rand(-H * 0.08, -H * 0.02);
          } else {
            const left = avoidBox.on ? avoidBox.x + avoidBox.w : 0;
            const openW = W - left;
            if (openW > 260) {
              s.tx = rand(left + 40, W - 40);
              s.ty = rand(H * 0.15, H * 0.72);
            } else if (avoidBox.on) {
              // phone layout: the copy spans the width, so swim above or below it
              const below = H * 0.86 - (avoidBox.y + avoidBox.h);
              const above = avoidBox.y - Math.max(H * 0.08, 110);
              s.tx = rand(40, W - 40);
              s.ty = below > 60 && (above < 60 || Math.random() < 0.65)
                ? rand(avoidBox.y + avoidBox.h + 10, H * 0.86)
                : rand(Math.max(H * 0.08, 110), Math.max(H * 0.08 + 20, avoidBox.y - 10));
            } else {
              s.tx = rand(40, W - 40);
              s.ty = rand(H * 0.15, H * 0.72);
            }
            if (Math.random() < 0.55) s.tz = Math.max(0.1, Math.min(1, s.z + rand(-0.45, 0.45)));
          }
        }
        s.z += (s.tz - s.z) * Math.min(1, dt * 0.35);
      }

      const n = fish.length;
      for (let i = 0; i < n; i++) {
        const f = fish[i];
        if (f.school === -1 && f.wander) {
          const w = f.wander;
          if (!w.active) { if (t >= w.respawnAt) { spawnWanderer(0, f); f.wander!.active = true; } continue; }
          // ease toward the exit with a lazy sine drift, slower when the light is calm nearby
          const dx = w.gx - f.x, dy = w.gy - f.y;
          const d = Math.hypot(dx, dy) || 1;
          let ax = (dx / d) * 0.012 + Math.sin(t * 0.6 + f.phase) * 0.006;
          let ay = (dy / d) * 0.006 + Math.cos(t * 0.5 + f.phase) * 0.008;
          if (pointerOn) {
            const px = f.x - pointer.x, py = f.y - pointer.y, p2 = px * px + py * py;
            const R = 160 * zScale(f.z);
            if (p2 < R * R) { const pd = Math.sqrt(p2) || 1; const k = fast ? 0.35 : calm ? -0.03 : 0.1; ax += (px / pd) * k; ay += (py / pd) * k; }
          }
          if (flakes.length) {
            let best: Flake | null = null, bd = 1e9;
            for (const fl of flakes) { const ex = fl.x - f.x, ey = fl.y - f.y, e2 = ex * ex + ey * ey; if (e2 < bd) { bd = e2; best = fl; } }
            if (best && bd < (420 * zScale(f.z)) ** 2) { const bd2 = Math.sqrt(bd) || 1; ax += ((best.x - f.x) / bd2) * 0.1; ay += ((best.y - f.y) / bd2) * 0.1; if (bd2 < 10) { best.life = 0; } }
          }
          f.vx += ax * dt * 60; f.vy += ay * dt * 60;
          const sp = Math.hypot(f.vx, f.vy) || 1e-6;
          const mx = (reduced ? 0.35 : 0.75) * zSpeed(f.z) * (fast || flakes.length ? 1.8 : 1);
          if (sp > mx) { f.vx = (f.vx / sp) * mx; f.vy = (f.vy / sp) * mx; }
          if (sp < 0.25) { f.vx = (f.vx / sp) * 0.25; f.vy = (f.vy / sp) * 0.25; }
          f.x += f.vx * dt * 60; f.y += f.vy * dt * 60;
          f.phase += dt * f.wagSpeed * (0.6 + sp);
          if ((w.gx > W && f.x > W + 100) || (w.gx < 0 && f.x < -100)) { w.active = false; w.respawnAt = t + rand(4, 12); f.x = -9999; }
          continue;
        }
        const sc = schools[f.school];
        f.z += (Math.max(0.05, Math.min(1, sc.z + f.zOff)) - f.z) * Math.min(1, dt * 0.6);
        const scale = zScale(f.z);
        let sepX = 0, sepY = 0, aliX = 0, aliY = 0, cohX = 0, cohY = 0, cnt = 0;
        const perceive = 90 * scale;
        const sepR = f.size * 0.9 * scale;

        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          const o = fish[j];
          if (o.school !== f.school) continue;
          const dx = o.x - f.x, dy = o.y - f.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > perceive * perceive || d2 === 0) continue;
          const d = Math.sqrt(d2);
          cnt++;
          aliX += o.vx; aliY += o.vy; cohX += o.x; cohY += o.y;
          if (d < sepR) { sepX -= (dx / d) * (sepR - d); sepY -= (dy / d) * (sepR - d); }
        }

        let ax = 0, ay = 0;
        if (cnt > 0) {
          aliX /= cnt; aliY /= cnt;
          cohX = cohX / cnt - f.x; cohY = cohY / cnt - f.y;
          ax += (aliX - f.vx) * 0.06 + cohX * 0.003 + sepX * 0.02;
          ay += (aliY - f.vy) * 0.06 + cohY * 0.003 + sepY * 0.02;
        }
        {
          const dx = sc.tx - f.x, dy = sc.ty - f.y;
          const d = Math.hypot(dx, dy) || 1;
          const k = sc.anchor ? 0.012 : 0.006;
          ax += (dx / d) * Math.min(1, d / 200) * k;
          ay += (dy / d) * Math.min(1, d / 200) * k;
        }
        ax += Math.sin(t * 0.35 + f.phase) * 0.004;
        ay += Math.cos(t * 0.27 + f.phase * 1.3) * 0.003;

        // food
        let feeding = false;
        if (flakes.length) {
          let best: Flake | null = null, bd = 1e9;
          for (const fl of flakes) {
            const dx = fl.x - f.x, dy = fl.y - f.y, d2 = dx * dx + dy * dy;
            if (d2 < bd) { bd = d2; best = fl; }
          }
          if (best && bd < (460 * scale) ** 2) {
            feeding = true;
            const d = Math.sqrt(bd) || 1;
            ax += ((best.x - f.x) / d) * 0.1;
            ay += ((best.y - f.y) / d) * 0.1;
            if (d < 7 * scale + 4) { best.life = 0; ripples.push({ x: best.x, y: best.y, t: 0.55, big: false }); }
          }
        }

        // the light in the water: curious when calm, scatter when fast
        if (pointerOn && !feeding) {
          const dx = f.x - pointer.x, dy = f.y - pointer.y, d2 = dx * dx + dy * dy;
          if (fast) {
            const R = 200 * scale;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1, k = (1 - d / R) * 0.42;
              ax += (dx / d) * k; ay += (dy / d) * k;
            }
          } else if (calm && !sc.anchor) {
            const R = 300 * scale;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1;
              const ring = 46 * scale;
              const k = d > ring ? 0.05 * Math.min(1, (d - ring) / 120) : -0.04;
              ax -= (dx / d) * k; ay -= (dy / d) * k;
              // they also come toward the glass
              f.z += (1 - f.z) * Math.min(1, dt * 0.5);
            }
          } else {
            const R = 90 * scale;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1, k = (1 - d / R) * 0.12;
              ax += (dx / d) * k; ay += (dy / d) * k;
            }
          }
        }

        // keep out of the copy box
        if (avoidBox.on && !flakes.length && !calm) {
          const bx = avoidBox.x, by = avoidBox.y, bw = avoidBox.w, bh = avoidBox.h;
          if (f.x > bx && f.x < bx + bw && f.y > by && f.y < by + bh) {
            const dl = f.x - bx, dr = bx + bw - f.x, dtp = f.y - by, dbt = by + bh - f.y;
            const m = Math.min(dl, dr, dtp, dbt);
            const k = W < 768 ? 0.14 : 0.05;
            if (m === dl) ax -= k; else if (m === dr) ax += k; else if (m === dtp) ay -= k; else ay += k;
          }
        }

        const m = 40;
        if (f.x < m) ax += (m - f.x) * 0.004;
        if (f.x > W - m) ax -= (f.x - (W - m)) * 0.004;
        const top = Math.max(H * 0.08, 110);
        if (f.y < top) ay += (top - f.y) * 0.006;
        if (f.y > H * 0.9) ay -= (f.y - H * 0.9) * 0.006;
        ay -= f.vy * 0.03;

        f.vx += ax * dt * 60;
        f.vy += ay * dt * 60;
        const sp = Math.hypot(f.vx, f.vy) || 1e-6;
        const boost = flakes.length || fast ? 1.7 : 1;
        const maxSp = (reduced ? 0.4 : 1.15) * zSpeed(f.z) * boost;
        const minSp = 0.3 * zSpeed(f.z);
        if (sp > maxSp) { f.vx = (f.vx / sp) * maxSp; f.vy = (f.vy / sp) * maxSp; }
        else if (sp < minSp) { f.vx = (f.vx / sp) * minSp; f.vy = (f.vy / sp) * minSp; }
        f.x += f.vx * dt * 60;
        f.y += f.vy * dt * 60;
        f.phase += dt * f.wagSpeed * (0.6 + sp);
      }

      for (let i = flakes.length - 1; i >= 0; i--) {
        const fl = flakes[i];
        fl.y += fl.vy * dt * 60;
        fl.x += Math.sin(t * 2 + fl.wob) * 0.15;
        fl.life -= dt * 0.055;
        if (fl.life <= 0 || fl.y > H + 10) flakes.splice(i, 1);
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].t += dt;
        if (ripples[i].t > 1.4) ripples.splice(i, 1);
      }
      // distant school drifts as a loose group, wraps around
      {
        const small = shadows.filter((s) => !s.big);
        let mx = 0, my = 0;
        for (const s of small) { mx += s.x; my += s.y; }
        mx /= small.length || 1; my /= small.length || 1;
        for (const s of shadows) {
          if (!s.big) {
            s.vx += ((mx - s.x) * 0.0006 + Math.sin(t * 0.4 + s.phase) * 0.004 - 0.22 * 0.02) * dt * 60;
            s.vy += ((my - s.y) * 0.0006 + Math.cos(t * 0.3 + s.phase) * 0.003) * dt * 60;
            const sp = Math.hypot(s.vx, s.vy) || 1e-6;
            const mx2 = 0.45;
            if (sp > mx2) { s.vx = (s.vx / sp) * mx2; s.vy = (s.vy / sp) * mx2; }
          } else {
            s.vy = Math.sin(t * 0.2) * 0.08;
          }
          s.x += s.vx * dt * 60;
          s.y += s.vy * dt * 60;
          s.phase += dt * s.wag;
          if (s.big) {
            if (s.vx > 0 && s.x > W + 260) { s.x = -260; s.y = rand(H * 0.12, H * 0.4); }
            if (s.vx < 0 && s.x < -260) { s.x = W + 260; s.y = rand(H * 0.12, H * 0.4); }
            if (s.y > H * 0.45) s.y = H * 0.45;
          } else {
            if (s.x < -60) s.x = W + 60;
            if (s.x > W + 60) s.x = -60;
            if (s.y < H * 0.06) s.y = H * 0.06;
            if (s.y > H * 0.7) s.y = H * 0.7;
          }
        }
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y -= b.vy * dt * 60;
        b.x += Math.sin(t * 1.4 + b.wob) * 0.12;
        if (b.wake) {
          b.life -= dt * 0.9;
          if (b.life <= 0) { bubbles.splice(i, 1); continue; }
        }
        if (b.y < -10) { b.y = H + 10; b.x = rand(0, W); }
      }
    };

    // ---------- drawing ----------
    const drawFish = (ctx: CanvasRenderingContext2D, f: Fish, lit: number) => {
      const scale = zScale(f.z);
      const L = f.size * scale;
      const ang = Math.atan2(f.vy, f.vx);
      const flip = Math.cos(ang) < 0;
      const wag = Math.sin(f.phase) * 0.35;
      const c = PALETTE[f.species];
      const tall = TALL[f.species];
      if (f.school === -1 && f.wander && !f.wander.active) return;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(ang);
      if (flip) ctx.scale(1, -1);
      ctx.globalAlpha = Math.min(1, zAlpha(f.z) + lit * 0.5);

      ctx.save();
      ctx.translate(-L * 0.42, 0);
      ctx.rotate(wag * 0.9);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-L * 0.34, -L * 0.24);
      ctx.quadraticCurveTo(-L * 0.24, 0, -L * 0.34, L * 0.24);
      ctx.closePath();
      ctx.fillStyle = c.tail;
      ctx.fill();
      ctx.restore();

      const body = () => {
        ctx.beginPath();
        ctx.moveTo(-L * 0.45, 0);
        ctx.bezierCurveTo(-L * 0.25, -L * tall, L * 0.2, -L * tall, L * 0.5, 0);
        ctx.bezierCurveTo(L * 0.2, L * tall, -L * 0.25, L * tall, -L * 0.45, 0);
        ctx.closePath();
      };
      body();
      const g = ctx.createLinearGradient(0, -L * tall, 0, L * tall);
      g.addColorStop(0, c.body);
      g.addColorStop(1, c.body2);
      ctx.fillStyle = g;
      ctx.fill();

      ctx.fillStyle = c.fin;
      ctx.beginPath();
      ctx.moveTo(-L * 0.25, -L * tall * 0.75);
      ctx.quadraticCurveTo(0, -L * tall * 1.45, L * 0.22, -L * tall * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-L * 0.2, L * tall * 0.7);
      ctx.quadraticCurveTo(0, L * tall * 1.3, L * 0.16, L * tall * 0.65);
      ctx.closePath();
      ctx.fill();

      if (f.species === "clown") {
        ctx.save();
        body();
        ctx.clip();
        ctx.fillStyle = "#ffffff";
        for (const bx of [L * 0.2, -L * 0.08, -L * 0.34]) ctx.fillRect(bx - L * 0.045, -L, L * 0.09, L * 2);
        ctx.restore();
      } else if (f.species === "blueTang") {
        ctx.fillStyle = "rgba(6,20,80,0.75)";
        ctx.beginPath();
        ctx.ellipse(-L * 0.05, 0, L * 0.3, L * tall * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (f.species === "angel") {
        ctx.save(); body(); ctx.clip();
        ctx.strokeStyle = "#ffd23a"; ctx.lineWidth = Math.max(1, L * 0.035);
        for (let i = 0; i < 5; i++) { const x0 = -L * 0.36 + i * L * 0.16; ctx.beginPath(); ctx.moveTo(x0, -L); ctx.quadraticCurveTo(x0 + L * 0.1, 0, x0, L); ctx.stroke(); }
        ctx.restore();
      } else if (f.species === "gramma") {
        ctx.save(); body(); ctx.clip();
        ctx.fillStyle = "#ffd23a"; ctx.fillRect(-L * 0.6, -L, L * 0.5, L * 2);
        ctx.restore();
      } else if (f.species === "butterfly") {
        ctx.save(); body(); ctx.clip();
        ctx.fillStyle = "#1a1a1a"; ctx.fillRect(L * 0.24, -L, L * 0.07, L * 2);
        ctx.fillStyle = "rgba(0,0,0,0.85)"; ctx.beginPath(); ctx.arc(-L * 0.3, -L * tall * 0.35, L * 0.06, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      } else if (f.species === "mandarin") {
        ctx.save(); body(); ctx.clip();
        ctx.strokeStyle = "#ff7a2a"; ctx.lineWidth = Math.max(1, L * 0.04);
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-L * 0.4 + i * L * 0.22, -L * tall * 0.6); ctx.bezierCurveTo(-L * 0.3 + i * L * 0.22, 0, -L * 0.5 + i * L * 0.22, 0, -L * 0.4 + i * L * 0.22, L * tall * 0.6); ctx.stroke(); }
        ctx.restore();
      } else if (f.species === "wrasse") {
        ctx.save(); body(); ctx.clip();
        ctx.strokeStyle = "#ff5c8a"; ctx.lineWidth = Math.max(1.5, L * 0.06);
        ctx.beginPath(); ctx.moveTo(-L * 0.45, -L * tall * 0.15); ctx.quadraticCurveTo(0, -L * tall * 0.35, L * 0.5, -L * tall * 0.05); ctx.stroke();
        ctx.restore();
      }

      // light catch on the flank when lit
      if (lit > 0.05) {
        ctx.globalAlpha = lit * 0.35;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(L * 0.05, -L * tall * 0.35, L * 0.28, L * tall * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = Math.min(1, zAlpha(f.z) + lit * 0.5);
      }

      ctx.fillStyle = "#061426";
      ctx.beginPath();
      ctx.arc(L * 0.3, -L * tall * 0.15, Math.max(1.3, L * 0.05), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.arc(L * 0.315, -L * tall * 0.18, Math.max(0.5, L * 0.018), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // On phones the copy spans the width, so every fish stays behind the text.
    const FRONT_Z = coarse || W < 768 ? 1.01 : 0.78;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      fctx.clearRect(0, 0, W, H);
      const t = time;
      const pointerOn = pointer.on && t - pointer.t < 3;
      const lightK = pointerOn ? Math.max(0, 1 - Math.max(0, t - pointer.t - 1.5) / 1.5) : 0;

      // far silhouettes: flat shapes slightly darker than the water, drawn first
      ctx.save();
      for (const s of shadows) {
        const ang = Math.atan2(s.vy, s.vx);
        const flip = Math.cos(ang) < 0;
        const L = s.L;
        const tall = s.big ? 0.5 : 0.36;
        const wag = Math.sin(s.phase) * 0.3;
        ctx.save();
        ctx.translate(s.x - par.x * (s.big ? 10 : 6), s.y + par.y * 4);
        ctx.rotate(ang);
        if (flip) ctx.scale(1, -1);
        ctx.fillStyle = s.big ? "rgba(3,18,34,0.42)" : "rgba(3,18,34,0.5)";
        ctx.beginPath();
        ctx.moveTo(-L * 0.45, 0);
        ctx.bezierCurveTo(-L * 0.25, -L * tall, L * 0.2, -L * tall, L * 0.5, 0);
        ctx.bezierCurveTo(L * 0.2, L * tall, -L * 0.25, L * tall, -L * 0.45, 0);
        ctx.closePath();
        ctx.fill();
        ctx.save();
        ctx.translate(-L * 0.42, 0);
        ctx.rotate(wag);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-L * 0.34, -L * 0.24);
        ctx.quadraticCurveTo(-L * 0.24, 0, -L * 0.34, L * 0.24);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        if (s.big) {
          ctx.beginPath();
          ctx.moveTo(-L * 0.25, -L * tall * 0.75);
          ctx.quadraticCurveTo(0, -L * tall * 1.5, L * 0.22, -L * tall * 0.7);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.restore();

      // light rays, shifted by parallax
      for (let i = 0; i < 3; i++) {
        const cx = W * (0.3 + i * 0.28) + Math.sin(t * 0.15 + i) * W * 0.03 - par.x * 40;
        const w = W * 0.05;
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, "rgba(143,242,255,0.11)");
        g.addColorStop(0.7, "rgba(143,242,255,0.02)");
        g.addColorStop(1, "rgba(143,242,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx - w * 0.3, 0);
        ctx.lineTo(cx + w * 0.3, 0);
        ctx.lineTo(cx + w * 1.6 + Math.sin(t * 0.25 + i) * 30, H);
        ctx.lineTo(cx - w * 1.6 + Math.sin(t * 0.25 + i) * 30, H);
        ctx.closePath();
        ctx.fill();
      }

      // the light in the water
      if (lightK > 0) {
        const R = coarse ? 170 : 230;
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, R);
        g.addColorStop(0, `rgba(160,245,255,${0.22 * lightK})`);
        g.addColorStop(0.45, `rgba(120,225,255,${0.09 * lightK})`);
        g.addColorStop(1, "rgba(120,225,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(pointer.x - R, pointer.y - R, R * 2, R * 2);
      }

      if (scenery) {
        ctx.save();
        ctx.translate(-par.x * 22, par.y * 10);
        ctx.drawImage(scenery.statics, 0, 0, W, H);
        drawAnims(ctx, scenery.anims, t);
        ctx.restore();
      }

      ctx.save();
      ctx.lineWidth = 1;
      for (const b of bubbles) {
        if (b.wake) continue;
        ctx.strokeStyle = "rgba(200,245,255,0.3)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      fish.sort((a, b) => a.z - b.z);
      for (const f of fish) {
        let lit = 0;
        if (lightK > 0) {
          const d = Math.hypot(f.x - pointer.x, f.y - pointer.y);
          lit = Math.max(0, 1 - d / 230) * lightK;
        }
        drawFish(f.z >= FRONT_Z ? fctx : ctx, f, lit);
      }

      // ---- front layer: in front of the headline
      if (lightK > 0) {
        const R = coarse ? 150 : 200;
        const g = fctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, R);
        g.addColorStop(0, `rgba(160,245,255,${0.1 * lightK})`);
        g.addColorStop(1, "rgba(120,225,255,0)");
        fctx.fillStyle = g;
        fctx.fillRect(pointer.x - R, pointer.y - R, R * 2, R * 2);
      }

      if (scenery) {
        fctx.save();
        fctx.translate(-par.x * 46, par.y * 18);
        drawAnims(fctx, scenery.front, t);
        fctx.restore();
      }

      fctx.save();
      fctx.lineWidth = 1;
      for (const b of bubbles) {
        if (!b.wake) continue;
        fctx.strokeStyle = `rgba(200,245,255,${0.7 * b.life})`;
        fctx.beginPath();
        fctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        fctx.stroke();
      }
      fctx.restore();

      fctx.save();
      for (const fl of flakes) {
        fctx.globalAlpha = Math.min(1, fl.life * 1.4);
        fctx.fillStyle = "#ffe9b0";
        fctx.beginPath();
        fctx.arc(fl.x, fl.y, fl.r, 0, Math.PI * 2);
        fctx.fill();
      }
      fctx.restore();

      const ctx2 = fctx;
      ctx2.save();
      for (const r of ripples) {
        const k = r.t / 1.4;
        const size = r.big ? 70 : 34;
        ctx2.globalAlpha = (1 - k) * 0.55;
        ctx2.strokeStyle = "#8ff2ff";
        ctx2.lineWidth = 1.5;
        ctx2.beginPath();
        ctx2.arc(r.x, r.y, 6 + k * size, 0, Math.PI * 2);
        ctx2.stroke();
        if (r.big) {
          ctx2.globalAlpha = (1 - k) * 0.3;
          ctx2.beginPath();
          ctx2.arc(r.x, r.y, 4 + k * 38, 0, Math.PI * 2);
          ctx2.stroke();
        }
      }
      ctx2.restore();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!running || !visible) return;
      step(dt);
      draw();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("deviceorientation", onTilt);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
    };
  }, [interactive, avoid]);

  return (
    <div className={clsx("absolute inset-0", className)} aria-hidden="true">
      <canvas
        ref={ref}
        className={clsx("absolute inset-0 z-0 block h-full w-full transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}
        style={{ touchAction: "pan-y" }}
      />
      <canvas
        ref={frontRef}
        className={clsx("pointer-events-none absolute inset-0 z-20 block h-full w-full transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
}
