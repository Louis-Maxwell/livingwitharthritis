#!/usr/bin/env node
/**
 * AEO codemod — inserts <AeoEnhancement route="..." /> immediately after the
 * first <h1> in each configured page file. Idempotent: skips files that
 * already reference AeoEnhancement.
 *
 * Configuration comes from src/data/page-aeo.ts (source of truth for which
 * routes get enhancement). We map each route to a page file via a manual
 * map + filesystem probe.
 *
 * Usage: bun scripts/apply-aeo.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());

// Route -> page file. Add entries here when adding new AEO routes.
const ROUTE_TO_FILE = {
  "/conditions/osteoarthritis": "src/pages/conditions/Osteoarthritis.tsx",
  "/conditions/rheumatoid-arthritis": "src/pages/conditions/RheumatoidArthritis.tsx",
  "/conditions/psoriatic-arthritis": "src/pages/conditions/PsoriaticArthritis.tsx",
  "/conditions/ankylosing-spondylitis": "src/pages/conditions/AnkylosingSpondylitis.tsx",
  "/conditions/gout": "src/pages/conditions/Gout.tsx",
  "/conditions/fibromyalgia": "src/pages/conditions/Fibromyalgia.tsx",
  "/conditions/lupus": "src/pages/conditions/Lupus.tsx",
  "/conditions/knee-arthritis": "src/pages/conditions/KneeArthritis.tsx",
  "/conditions/hip-arthritis": "src/pages/conditions/HipArthritis.tsx",
  "/conditions/hand-arthritis": "src/pages/conditions/HandArthritis.tsx",
  "/conditions/shoulder-arthritis": "src/pages/conditions/ShoulderArthritis.tsx",
  "/conditions/elbow-arthritis": "src/pages/conditions/ElbowArthritis.tsx",
  "/conditions/juvenile-arthritis": "src/pages/conditions/JuvenileArthritis.tsx",
  "/conditions/reactive-arthritis": "src/pages/conditions/ReactiveArthritis.tsx",
  "/conditions/polymyalgia-rheumatica": "src/pages/conditions/PolymyalgiaRheumatica.tsx",
  "/guides/newly-diagnosed": "src/pages/guides/NewlyDiagnosed.tsx",
  "/guides/arthritis-pain-relief": "src/pages/guides/ArthritisPainRelief.tsx",
  "/guides/hip-exercises-for-osteoarthritis": "src/pages/guides/HipExercisesForOsteoarthritis.tsx",
  "/guides/can-exercise-make-osteoarthritis-worse": "src/pages/guides/CanExerciseMakeOsteoarthritisWorse.tsx",
  "/guides/fall-prevention-older-adults": "src/pages/guides/FallPreventionOlderAdults.tsx",
  "/guides/sarcopenia-muscle-control": "src/pages/guides/SarcopeniaMuscleControl.tsx",
  "/guides/bone-density-osteoporosis": "src/pages/guides/BoneDensityOsteoporosis.tsx",
  "/guides/disability-support": "src/pages/guides/DisabilitySupport.tsx",
  "/guides/frailty-management-hub": "src/pages/guides/FrailtyManagementHub.tsx",
  "/guides/preventative-msk-health": "src/pages/guides/PreventativeMSKHealth.tsx",
  "/guides/musculoskeletal-health": "src/pages/guides/MusculoskeletalHealth.tsx",
  "/diet-hub": "src/pages/DietHub.tsx",
  "/exercise-hub": "src/pages/ExerciseHub.tsx",
};

const IMPORT_LINE = 'import AeoEnhancement from "@/components/seo/AeoEnhancement";';

let touched = 0;
let skipped = 0;
let missing = 0;

for (const [route, relPath] of Object.entries(ROUTE_TO_FILE)) {
  const full = join(ROOT, relPath);
  if (!existsSync(full)) {
    missing++;
    console.warn(`[aeo] missing: ${relPath}`);
    continue;
  }
  let src = await readFile(full, "utf8");
  if (src.includes("AeoEnhancement")) {
    skipped++;
    continue;
  }

  // 1) Add import after last existing import
  const importBlockEnd = src.lastIndexOf("\nimport ");
  if (importBlockEnd === -1) {
    console.warn(`[aeo] no import block in ${relPath}, skipping`);
    skipped++;
    continue;
  }
  const eolAfterImports = src.indexOf("\n", importBlockEnd + 1);
  src = src.slice(0, eolAfterImports + 1) + IMPORT_LINE + "\n" + src.slice(eolAfterImports + 1);

  // 2) Insert component immediately after first </h1>
  const h1Close = src.indexOf("</h1>");
  if (h1Close === -1) {
    console.warn(`[aeo] no </h1> in ${relPath}, skipping insertion (import kept for manual use)`);
    // Still keep the import; user may add it manually.
    await writeFile(full, src);
    skipped++;
    continue;
  }
  const insertAt = h1Close + "</h1>".length;
  const injection = `\n            <AeoEnhancement route="${route}" />`;
  src = src.slice(0, insertAt) + injection + src.slice(insertAt);

  await writeFile(full, src);
  touched++;
  console.log(`[aeo] enhanced ${route} -> ${relPath}`);
}

console.log(`\n[aeo] done. touched=${touched} skipped=${skipped} missing=${missing}`);
