import fs from "node:fs";
let changed = 0;
const rw = (f, pairs) => {
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) {
      console.log("MISS", f, JSON.stringify(a.slice(0, 70)));
      continue;
    }
    s = s.replace(a, b);
    changed++;
  }
  fs.writeFileSync(f, s);
};

rw("components/tools/WaterTestDecoder.tsx", [
  // salinity hint
  [`    hint: "1.024 to 1.026",\n    step: 0.001,`, `    hint: "1.025 to 1.026 (35 ppt)",\n    step: 0.001,`],
  // pH bad floor
  [`      v < 7.7 || v > 8.5\n        ? { level: "bad", note: "Well outside the marine range.", action: "Usually low alkalinity or CO2 in the house. Check alkalinity next." }`, `      v < 7.8 || v > 8.5\n        ? { level: "bad", note: "Well outside the marine range.", action: "Usually carbon dioxide building up in a closed house, sometimes low alkalinity. Check alkalinity and get fresh air to the tank." }`],
  // saltwater ammonia threshold
  [`      v >= 0.5\n        ? { level: "bad", note: "Toxic. Fish are being hurt right now.", action: "Stop feeding, do a water change today, and call." }\n        : v > 0\n          ? { level: "watch", note: "Should be zero in an established tank.", action: "Skip a feeding, check for a dead fish or a stalled filter." }\n          : { level: "good", note: "Zero. Filter is doing its job." },\n  },\n  {\n    key: "nitrite",\n    label: "Nitrite",\n    unit: "ppm",\n    hint: "0",\n    step: 0.05,\n    read: (v) =>\n      v >= 0.5\n        ? { level: "bad", note: "Toxic. Same urgency as ammonia.", action: "Water change today, stop feeding, call." }\n        : v > 0\n          ? { level: "watch", note: "Filter is catching up from something.", action: "Reduce feeding and retest in two days." }\n          : { level: "good", note: "Zero. Good." },`, `      v >= 0.25\n        ? { level: "bad", note: "Toxic at reef pH. The high pH turns more of it into the form that burns gills.", action: "Stop feeding, do a water change today, and call." }\n        : v > 0\n          ? { level: "watch", note: "Should be zero in an established tank.", action: "Skip a feeding, check for a dead fish or a stalled filter, retest tomorrow." }\n          : { level: "good", note: "Zero. Filter is doing its job." },\n  },\n  {\n    key: "nitrite",\n    label: "Nitrite",\n    unit: "ppm",\n    hint: "0",\n    step: 0.05,\n    read: (v) =>\n      v >= 1\n        ? { level: "bad", note: "The cycle has stalled. Nitrite is far less toxic in saltwater than in freshwater, but this high means something broke.", action: "Find the cause, hold off on feeding, and call before adding anything." }\n        : v > 0\n          ? { level: "watch", note: "The cycle was disturbed. Not the emergency ammonia is, but find out why.", action: "Reduce feeding and retest in two days." }\n          : { level: "good", note: "Zero. Good." },`],
  // phosphate hint
  [`    hint: "0.02 to 0.1",\n    target: 0.1,\n    step: 0.01,`, `    hint: "0.03 to 0.1",\n    target: 0.1,\n    step: 0.01,`],
  // magnesium hint
  [`    hint: "1250 to 1400",`, `    hint: "1250 to 1350",`],
  // freshwater ammonia conditioner note
  [`        ? { level: "bad", note: "Toxic. This is the most common reason fish die.", action: "Stop feeding, water change today, add a chloramine-safe conditioner, call." }`, `        ? { level: "bad", note: "Toxic. This is the most common reason fish die.", action: "Stop feeding, water change today, add a conditioner that detoxifies ammonia, and redose it every day or two until the reading is zero. Call if it will not drop." }`],
  // freshwater nitrate
  [`    hint: "under 20, under 30 if heavily planted",\n    target: 20,\n    read: (v) =>\n      v > 60\n        ? { level: "bad", note: "High. Stress, algae and disease follow.", action: "A few water changes over the week and less food." }\n        : v > 25\n          ? { level: "watch", note: "Creeping up.", action: "Water change and check how much you are feeding." }\n          : { level: "good", note: "Healthy." },`, `    hint: "under 20 ideal, under 40 fine, planted tanks run 20 to 50",\n    target: 20,\n    read: (v) =>\n      v > 80\n        ? { level: "bad", note: "High. This is where fish stress shows.", action: "A few water changes over the week and less food." }\n        : v > 40\n          ? { level: "watch", note: "Creeping up. Fine in a heavily planted tank, high for a fish-only community.", action: "Water change and check how much you are feeding." }\n          : { level: "good", note: "Healthy." },`],
  // GH local claim
  [`        ? { level: "watch", note: "Very hard. Normal for Palm Beach County tap water, tough on soft-water fish.", action: "Blend with RO water for discus, tetras and planted tanks." }`, `        ? { level: "watch", note: "Very hard. Not what comes out of the tap here; Boca Raton water is softened to about 4 dGH, so a reading this high usually means crushed coral, rock or a hard-water buffer in the tank.", action: "Find the source. Blend with RO water if you keep soft-water species." }`],
  // KH local claim
  [`        ? { level: "watch", note: "High, typical of local tap water.", action: "Only an issue for soft-water species." }`, `        ? { level: "watch", note: "High. Usually from crushed coral, aragonite or a buffer, not from local tap water.", action: "Only an issue for soft-water species." }`],
]);

rw("app/tools/water-test/page.tsx", [
  [`{ q: "What should my reef tank parameters be?", a: "Salinity 1.024 to 1.026, temperature 76 to 80, pH 8.1 to 8.3, ammonia and nitrite zero, nitrate 2 to 10 ppm, phosphate 0.02 to 0.1 ppm, alkalinity 8 to 9.5 dKH, calcium 400 to 450 ppm, magnesium 1250 to 1400 ppm. Stability matters more than hitting an exact number." },`, `{ q: "What should my reef tank parameters be?", a: "Salinity 1.025 to 1.026 (35 ppt), temperature 76 to 80, pH 8.1 to 8.3, ammonia and nitrite zero, nitrate 2 to 10 ppm, phosphate 0.03 to 0.1 ppm, alkalinity 8 to 9.5 dKH, calcium 400 to 450 ppm, magnesium 1250 to 1350 ppm. Stability matters more than hitting an exact number." },`],
  [`GH 4 to 12 and KH 3 to 8 for most community tanks. Palm Beach County tap water is harder than that, which matters for soft-water fish." },`, `GH 4 to 12 and KH 3 to 8 for most community tanks. Boca Raton tap water is softened to roughly 4 dGH with a pH of 8.0 to 8.5, which suits most community fish but is too alkaline for some soft-water species." },`],
  [`If it is above 0.5 ppm, call Jason before adding anything." },`, `Above 0.25 ppm in saltwater or 0.5 ppm in freshwater, call Jason before adding anything." },`],
]);

rw("components/tools/TankCalculator.tsx", [
  [`    // reef salinity 35 ppt: about 35 g salt per liter, roughly 0.29 lb per US gallon\n    const saltLb = changeGal * 0.29;\n    const saltCups = changeGal * 0.5; // the common label rule of thumb`, `    // Dry reef salt mix to reach 1.026 (35 ppt) is about 40 g per liter, roughly 0.34 lb per US gallon.\n    // The common label rule of half a cup per gallon only lands near 1.022.\n    const saltLb = changeGal * 0.34;\n    const saltCups = changeGal * 0.6;`],
  [`<Stat label="Salt mix for that change" value={\`\${out.saltLb.toFixed(1)} lb\`} sub={\`about \${out.saltCups.toFixed(1)} cups at reef salinity. Check your salt's label and a refractometer.\`} />`, `<Stat label="Salt mix for that change" value={\`\${out.saltLb.toFixed(1)} lb\`} sub={\`about \${out.saltCups.toFixed(1)} cups to reach 1.026. The half-cup-per-gallon label rule only gets to about 1.022, so mix, wait, and trim with a refractometer.\`} />`],
]);

rw("app/tools/tank-volume/page.tsx", [
  [`{ q: "How much salt do I need for a water change?", a: "Reef salinity is about 35 grams of salt per liter, which works out to roughly 0.29 pounds, or about half a cup, per US gallon. Mix, heat and circulate before it goes in, and confirm with a refractometer." },`, `{ q: "How much salt do I need for a water change?", a: "To reach reef salinity of 1.026, plan on roughly 0.34 pounds of dry mix per US gallon, about 40 grams per liter or a generous half cup. The half-cup-per-gallon rule printed on most labels only mixes to about 1.022. Mix, heat and circulate before it goes in, and confirm with a refractometer." },`],
]);

rw("components/tools/HurricaneChecklist.tsx", [
  [`      "Move the tank away from windows if it is small enough to move safely",`, `      "Shade the windows. Only move a tank that can be moved safely with the water lowered",`],
  [`      "Run the battery air pump, one airstone per 50 gallons or so",`, `      "Run the battery air pump, one pump per 50 gallons or so, or as the pump is rated",`],
  [`      "Keep the room closed, blinds down, and cover the tank with a towel to slow heat gain",`, `      "Keep the room closed, blinds down, and cover the tank with a towel to slow heat gain. A battery fan across the water surface cools it by evaporation",`],
  [`      "Every few hours, gently stir the surface or swap in a little prepared water at the same temperature",\n      "Watch for gasping at the surface or a cloudy haze; both mean oxygen is running low",`, `      "Every few hours, gently stir the surface. Leave the water alone unless the outage runs past a day with no air pump, then a small change with matched water helps",\n      "Gasping at the surface means oxygen is low. A cloudy haze means bacteria are dying off and the water is turning. Both mean act now",`],
  [`      "Do a water change the next day, then resume light feeding",`, `      "Do a water change the next day, or sooner if ammonia or nitrite reads above zero, then resume light feeding",`],
]);

rw("lib/guides.ts", [
  [`          "If the outage runs long, small partial water changes with pre-mixed water at the right temperature buy time. Bottled water is not a substitute for prepared saltwater.",`, `          "If the outage runs past a day and you have no air pump, a small partial water change with pre-mixed water at the right temperature buys time. Otherwise leave the water alone. Bottled water is not a substitute for prepared saltwater.",`],
  [`          "Oxygen and temperature are the two things that kill fish in an outage.`, `          "Oxygen, temperature and the ammonia that builds while filtration is off are what kill fish in an outage.`],
  [`      "Palm Beach County tap water is hard, treated with chloramine and can carry phosphate. Here is what that does to freshwater and reef tanks, and how water is prepared so a water change helps instead of hurts.",`, `      "Palm Beach County tap water comes from shallow wells, is treated with chloramine and is softened before it reaches you. Here is what that does to freshwater and reef tanks, and how water is prepared so a water change helps instead of hurts.",`],
  [`        h: "Hard and treated",\n        p: [\n          "Municipal water across Boca Raton, Delray Beach and Boynton Beach comes from the Biscayne Aquifer and is hard, with high calcium and alkalinity, and it is disinfected with chloramine, which does not gas off the way chlorine does. Straight from the tap it will kill the bacteria your filter depends on and stress fish.",\n        ],`, `        h: "Softened and treated",\n        p: [\n          "Municipal water in south Palm Beach County comes from shallow wells in the surficial aquifer system, the Biscayne Aquifer in Boca Raton. The raw water is hard, but Boca Raton softens it to a moderate 65 to 80 mg/L, about 4 dGH, with a pH around 8.0 to 8.5, and other county systems land somewhat harder. It is disinfected with chloramine, which does not gas off the way chlorine does. Straight from the tap it stresses fish and damages the filter's bacteria.",\n        ],`],
  [`          "A proper conditioner that neutralizes chloramine, not just chlorine, is the minimum. For soft-water fish like discus and many tetras, and for serious planted tanks, blending with RO water gets the hardness down to where the fish and plants want it.",`, `          "A proper conditioner that neutralizes chloramine, not just chlorine, is the minimum. The pH of 8 and up is the bigger issue for soft-water fish like discus and wild tetras, and for those species blending with RO water brings it down to where they want it.",`],
  [`          "Reefs should never see tap water. Phosphate and silicate in county water feed algae, and the mineral content is wrong for mixing salt. RO/DI water, mixed with a quality salt and matched to the tank's salinity and temperature, is what Jason brings to every saltwater visit.",`, `          "Reefs should never see tap water. Chloramine, the residual hardness and the high pH are wrong for mixing salt, and any phosphate or silicate in the supply feeds algae. RO/DI water, mixed with a quality salt and matched to the tank's salinity and temperature, is what Jason brings to every saltwater visit.",`],
  [`    takeaway: "Condition for chloramine on freshwater, use RO/DI for reefs, and never assume tap water is neutral.",`, `    takeaway: "Condition for chloramine on freshwater, use RO/DI for reefs, and know that Boca water is softened but alkaline.",`],
]);

rw("lib/faqs.ts", [
  [`a: "Stop feeding, do not add anything else to the tank, and call or text Jason right away with a photo and any test results you have. Sudden losses are usually water quality, temperature or a disease that needs to be identified quickly.",`, `a: "Stop feeding, do not add anything else to the tank, test ammonia and nitrite if you can, and call or text Jason right away with a photo and the results. Sudden losses are usually water quality, temperature or a disease that needs to be identified quickly.",`],
]);

rw("components/tools/SchedulePlanner.tsx", [
  [`      if (water === "reef") checks.push("Salinity, alkalinity, calcium, magnesium, nitrate and phosphate written down every visit");`, `      if (water === "reef") checks.push("Salinity, temperature, pH, alkalinity, calcium, magnesium, nitrate and phosphate written down every visit");`],
]);

console.log("factcheck pass applied", changed, "edits");
