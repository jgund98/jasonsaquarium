import fs from "node:fs";
let c = fs.readFileSync("components/ReefCanvas.tsx", "utf8");
const o = c;
const rep = (a, b) => {
  if (!c.includes(a)) console.log("MISS", JSON.stringify(a.slice(0, 80)));
  c = c.replace(a, b);
};

// species
rep(
  `type Species = "blueTang" | "yellowTang" | "clown" | "purpleTang" | "chromis";`,
  `type Species = "blueTang" | "yellowTang" | "clown" | "purpleTang" | "chromis" | "angel" | "gramma" | "butterfly" | "mandarin" | "wrasse";`
);
rep(
  `  chromis: { body: "#4fe0d0", body2: "#1fb0a0", tail: "#8ff2e8", fin: "#159487" },\n};`,
  `  chromis: { body: "#4fe0d0", body2: "#1fb0a0", tail: "#8ff2e8", fin: "#159487" },
  angel: { body: "#2748c9", body2: "#122a8a", tail: "#ffd23a", fin: "#0d1f6b" },
  gramma: { body: "#8a3cff", body2: "#5c1fd6", tail: "#ffd23a", fin: "#4a18b0" },
  butterfly: { body: "#fff4c8", body2: "#ffd23a", tail: "#ffd23a", fin: "#2a2a2a" },
  mandarin: { body: "#2fae6e", body2: "#1a7d4c", tail: "#ff7a2a", fin: "#ff7a2a" },
  wrasse: { body: "#33d9b2", body2: "#149a8c", tail: "#ff5c8a", fin: "#0f6f66" },
};
const SOLO: Species[] = ["angel", "gramma", "butterfly", "mandarin", "wrasse", "clown", "blueTang", "yellowTang"];
const TALL: Record<Species, number> = { chromis: 0.34, clown: 0.42, blueTang: 0.56, yellowTang: 0.56, purpleTang: 0.56, angel: 0.58, gramma: 0.36, butterfly: 0.58, mandarin: 0.4, wrasse: 0.3 };`
);

// fish type: wanderer fields
rep(
  `  school: number;\n  zOff: number;`,
  `  school: number; // -1 for a solo wanderer\n  wander?: { gx: number; gy: number; respawnAt: number; active: boolean };\n  zOff: number;`
);

// smaller schools + wanderers
rep(
  `      addSchool("chromis", 0.15, Math.round(10 * k), [28, 36]);
      addSchool("chromis", 0.55, Math.round(13 * k), [30, 40]);
      addSchool("yellowTang", 0.85, Math.max(3, Math.round(5 * k)), [48, 62]);
      addSchool("blueTang", 0.95, Math.max(3, Math.round(4 * k)), [50, 66]);
      addSchool("purpleTang", 0.5, Math.max(2, Math.round(3 * k)), [44, 56]);`,
  `      addSchool("chromis", 0.15, Math.round(7 * k), [28, 36]);
      addSchool("chromis", 0.55, Math.round(9 * k), [30, 40]);
      addSchool("yellowTang", 0.85, 3, [48, 62]);
      addSchool("blueTang", 0.95, Math.max(2, Math.round(3 * k)), [50, 66]);
      // solo wanderers: enter from one side, cross, leave, come back as someone else
      const solos = small ? 3 : 5;
      for (let i = 0; i < solos; i++) spawnWanderer(i * 2.5);`
);

// spawnWanderer helper before spawn
rep(
  `    const spawn = () => {`,
  `    const spawnWanderer = (delay = 0, existing?: Fish) => {
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

    const spawn = () => {`
);

// step: handle wanderers before boids
rep(
  `      for (let i = 0; i < n; i++) {
        const f = fish[i];
        const sc = schools[f.school];`,
  `      for (let i = 0; i < n; i++) {
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
        const sc = schools[f.school];`
);

// remove shadow silhouettes: spawn nothing
rep(`    const spawnShadows = () => {\n      shadows.length = 0;`, `    const spawnShadows = () => {\n      shadows.length = 0;\n      return; // silhouette layer retired`);

// drawFish: tall lookup + new markings; skip inactive wanderers
rep(
  `      const tall = f.species === "chromis" ? 0.34 : f.species === "clown" ? 0.42 : 0.56;`,
  `      const tall = TALL[f.species];\n      if (f.school === -1 && f.wander && !f.wander.active) return;`
);
rep(
  `      } else if (f.species === "blueTang") {
        ctx.fillStyle = "rgba(6,20,80,0.75)";
        ctx.beginPath();
        ctx.ellipse(-L * 0.05, 0, L * 0.3, L * tall * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();
      }`,
  `      } else if (f.species === "blueTang") {
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
      }`
);

if (c === o) console.log("NOCHANGE");
fs.writeFileSync("components/ReefCanvas.tsx", c);
console.log("fish pass done");
