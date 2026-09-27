import { createRequire } from "node:module"; const require = createRequire(import.meta.url);
import puppeteer from "puppeteer";
const base = process.env.BASE || "http://localhost:3591";
const paths = ["/", "/services", "/services/aquarium-cleaning-maintenance", "/services/aquarium-design-installation", "/services/aquarium-assessment", "/services/emergency-aquarium-service", "/aquariums/saltwater-reef-aquariums", "/aquariums/freshwater-planted-aquariums", "/aquariums/ponds-water-gardens", "/our-work", "/about", "/reviews", "/faq", "/guides", "/guides/hurricane-prep-for-aquariums-south-florida", "/tools", "/tools/water-test", "/tools/tank-volume", "/service-areas", "/aquarium-service/boca-raton", "/aquarium-service/parkland", "/contact"];
const exe = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find((p) => require("node:fs").existsSync(p));
const browser = await puppeteer.launch({ headless: true, executablePath: exe, args: ["--no-sandbox"] });
for (const [w, tag, dsf] of [[1440, "d", 0.5], [390, "m", 0.6]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: dsf, isMobile: w < 800, hasTouch: w < 800 });
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: "networkidle0", timeout: 60000 });
    // trigger reveal animations by scrolling through
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 600));
    });
    const name = (p === "/" ? "home" : p.slice(1).replace(/\//g, "_")) + "-" + tag + ".png";
    await page.screenshot({ path: "shots/" + name, fullPage: true });
    console.log(name);
  }
  await page.close();
}
await browser.close();
