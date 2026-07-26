/**
 * Word-count audit for every public route.
 *
 * Heuristic static extractor: reads a page file and the files it imports
 * (recursively, limited to project source) and counts visible text in JSX:
 *   - JSX text nodes between > and < (excluding pure whitespace/punctuation)
 *   - String literals passed as children: {"...", '...', `...`}
 *   - String literals to aria-label / alt / title props (these are read aloud
 *     by screen readers but also indexable signals)
 *
 * It strips: imports, type annotations, className strings, other attribute
 * strings, comments.
 *
 * Run: bunx tsx scripts/audit-word-count.ts
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const SRC = resolve(process.cwd(), "src");

const ROUTES: Array<{ path: string; file: string }> = [
  { path: "/", file: "pages/Index.tsx" },
  { path: "/chat", file: "pages/Chat.tsx" },
  { path: "/auth", file: "pages/Auth.tsx" },
  { path: "/blog", file: "pages/BlogIndex.tsx" },
  { path: "/library", file: "pages/Library.tsx" },
  { path: "/blog-hub", file: "pages/BlogHub.tsx" },
  { path: "/about", file: "pages/AboutUs.tsx" },
  { path: "/conditions/osteoarthritis", file: "pages/conditions/Osteoarthritis.tsx" },
  { path: "/conditions/rheumatoid-arthritis", file: "pages/conditions/RheumatoidArthritis.tsx" },
  { path: "/conditions/psoriatic-arthritis", file: "pages/conditions/PsoriaticArthritis.tsx" },
  { path: "/conditions/gout", file: "pages/conditions/Gout.tsx" },
  { path: "/conditions/ankylosing-spondylitis", file: "pages/conditions/AnkylosingSpondylitis.tsx" },
  { path: "/conditions/juvenile-arthritis", file: "pages/conditions/JuvenileArthritis.tsx" },
  { path: "/conditions/fibromyalgia", file: "pages/conditions/Fibromyalgia.tsx" },
  { path: "/conditions/lupus", file: "pages/conditions/Lupus.tsx" },
  { path: "/conditions/knee-arthritis", file: "pages/conditions/KneeArthritis.tsx" },
  { path: "/conditions/hand-arthritis", file: "pages/conditions/HandArthritis.tsx" },
  { path: "/conditions/shoulder-arthritis", file: "pages/conditions/ShoulderArthritis.tsx" },
  { path: "/self-help", file: "pages/SelfHelpTool.tsx" },
  { path: "/exercises", file: "pages/ExerciseHub.tsx" },
  { path: "/exercises/tai-chi-for-balance", file: "pages/exercises/TaiChiForBalance.tsx" },
  { path: "/exercises/tai-chi-for-arthritis", file: "pages/exercises/TaiChiForArthritis.tsx" },
  { path: "/exercises/seated-tai-chi-for-arthritis", file: "pages/exercises/SeatedTaiChiForArthritis.tsx" },
  { path: "/exercises/tai-chi-for-beginners", file: "pages/exercises/TaiChiForBeginners.tsx" },
  { path: "/diet", file: "pages/DietHub.tsx" },
  { path: "/diet/mediterranean-diet-for-arthritis", file: "pages/diet/MediterraneanDietForArthritis.tsx" },
  { path: "/myths/does-cracking-knuckles-cause-arthritis", file: "pages/myths/DoesCrackingKnucklesCauseArthritis.tsx" },
  { path: "/zakat-appeal", file: "pages/ZakatAppeal.tsx" },
  { path: "/trust", file: "pages/TrustCredibility.tsx" },
  { path: "/community", file: "pages/CommunityHub.tsx" },
  { path: "/privacy", file: "pages/PrivacyPolicy.tsx" },
  { path: "/cookies", file: "pages/CookiesPolicy.tsx" },
  { path: "/accessibility", file: "pages/Accessibility.tsx" },
  { path: "/arthritis-flare-ups", file: "pages/ArthritisFlareUps.tsx" },
  { path: "/shop", file: "pages/Shop.tsx" },
  { path: "/arthritis-support", file: "pages/ArthritisSupportIndex.tsx" },
  { path: "/site-index", file: "pages/Sitemap.tsx" },
  { path: "/corporate-giving", file: "pages/CorporateGiving.tsx" },
  { path: "/donation-result", file: "pages/DonationSuccess.tsx" },
  { path: "/unsubscribe", file: "pages/Unsubscribe.tsx" },
  { path: "/governance", file: "pages/Governance.tsx" },
  
  { path: "/impact", file: "pages/ImpactStories.tsx" },
  { path: "/ways-to-help", file: "pages/WaysToHelp.tsx" },
  { path: "/terms", file: "pages/TermsConditions.tsx" },
  { path: "/safeguarding", file: "pages/Safeguarding.tsx" },
  { path: "/complaints", file: "pages/Complaints.tsx" },
  { path: "/donate", file: "pages/Donate.tsx" },
  { path: "/guides/uk-arthritis", file: "pages/pillar/UKArthritisGuide.tsx" },
  { path: "/guides/health-services", file: "pages/pillar/HealthServicesGuide.tsx" },
  { path: "/guides/diet", file: "pages/pillar/DietGuide.tsx" },
  { path: "/guides/exercise", file: "pages/pillar/ExerciseGuide.tsx" },
  { path: "/guides/benefits-pip", file: "pages/pillar/BenefitsPIPGuide.tsx" },
  { path: "/press", file: "pages/Press.tsx" },
  { path: "/partners", file: "pages/Partners.tsx" },
  { path: "/stories", file: "pages/LivedExperiences.tsx" },
  { path: "/expert-articles", file: "pages/ExpertArticles.tsx" },
  { path: "/resources-directory", file: "pages/ResourceDirectory.tsx" },
  { path: "/health-tools", file: "pages/HealthTools.tsx" },
  { path: "/services", file: "pages/Services.tsx" },
  { path: "/faq", file: "pages/FAQ.tsx" },
  { path: "/contact", file: "pages/Contact.tsx" },
  { path: "/arthritis-waiting-list-help", file: "pages/WaitingListHelp.tsx" },
  { path: "/tools/waiting-time", file: "pages/tools/WaitingTimeCalculator.tsx" },
  { path: "/pedometer", file: "pages/Pedometer.tsx" },
  { path: "/arthritis-starter-guide", file: "pages/ArthritisStarterGuide.tsx" },
  { path: "/gallery", file: "pages/Gallery.tsx" },
  { path: "/credits", file: "pages/Credits.tsx" },
  { path: "/self-assessment", file: "pages/SelfAssessment.tsx" },
  { path: "/buddy", file: "pages/Buddy.tsx" },
  { path: "/newsletter/confirm", file: "pages/NewsletterConfirm.tsx" },
];

function resolveImport(spec: string, fromFile: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  const exts = [".tsx", ".ts", "/index.tsx", "/index.ts"];
  if (existsSync(base) && statSync(base).isFile()) return base;
  for (const e of exts) if (existsSync(base + e)) return base + e;
  return null;
}

function stripCode(src: string): string {
  // Remove block + line comments
  src = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  // Remove import statements
  src = src.replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?$/gm, "");
  src = src.replace(/^\s*import\s+["'][^"']+["'];?$/gm, "");
  return src;
}

const ATTR_KEEP = new Set(["aria-label", "alt", "title", "placeholder"]);

function extractText(src: string): string {
  const out: string[] = [];
  // 1) JSX text between > and < — capture greedy avoiding tags
  const textRe = />([^<>{}]+)</g;
  let m;
  while ((m = textRe.exec(src))) {
    const t = m[1].trim();
    if (t && /[A-Za-z]/.test(t)) out.push(t);
  }
  // 2) String children: {"..."} {'...'} {`...`}
  const childStrRe = /\{\s*(["'`])([^"'`\n]{2,})\1\s*\}/g;
  while ((m = childStrRe.exec(src))) {
    const t = m[2].trim();
    if (t && /[A-Za-z]/.test(t)) out.push(t);
  }
  // 3) Keep certain attribute strings
  const attrRe = /\b([a-zA-Z-]+)\s*=\s*(["'])([^"']+)\2/g;
  while ((m = attrRe.exec(src))) {
    if (ATTR_KEEP.has(m[1])) out.push(m[3]);
  }
  // 4) Array of plain strings: ["...", "..."] often used as bullet lists
  const arrStrRe = /\[\s*((?:["'`][^"'`\n]{3,}["'`]\s*,\s*){1,}["'`][^"'`\n]{3,}["'`])\s*\]/g;
  while ((m = arrStrRe.exec(src))) {
    const inner = m[1];
    const strRe = /["'`]([^"'`\n]{3,})["'`]/g;
    let sm;
    while ((sm = strRe.exec(inner))) out.push(sm[1]);
  }
  // 5) Common content-object literal keys: title:, description:, body:, content:, text:, label:, name:, summary:, q:, a:, question:, answer:
  const objStrRe = /\b(title|description|body|content|text|label|name|summary|question|answer|q|a|heading|subheading|excerpt|caption|quote|author|copy|intro|outro|p)\s*:\s*(["'`])([^"'`\n]{4,})\2/g;
  while ((m = objStrRe.exec(src))) out.push(m[3]);
  return out.join(" ");
}

function countWords(s: string): number {
  // Strip JSX expressions remnants
  s = s.replace(/\{[^}]*\}/g, " ");
  const tokens = s.match(/[A-Za-z][A-Za-z'-]*/g) ?? [];
  return tokens.length;
}

function gatherText(entry: string, seen = new Set<string>()): string {
  if (seen.has(entry)) return "";
  seen.add(entry);
  if (!existsSync(entry)) return "";
  const raw = readFileSync(entry, "utf8");
  const stripped = stripCode(raw);
  let text = extractText(stripped);
  // Follow project-local imports (static + dynamic)
  const importRe = /import\s+(?:[^"']+?\s+from\s+)?["']([^"']+)["']/g;
  let m;
  while ((m = importRe.exec(raw))) {
    const resolved = resolveImport(m[1], entry);
    if (!resolved) continue;
    if (/\/(node_modules|integrations\/supabase)\//.test(resolved)) continue;
    text += " " + gatherText(resolved, seen);
  }
  const dynImportRe = /import\(\s*["']([^"']+)["']\s*\)/g;
  while ((m = dynImportRe.exec(raw))) {
    const resolved = resolveImport(m[1], entry);
    if (!resolved) continue;
    if (/\/(node_modules|integrations\/supabase)\//.test(resolved)) continue;
    text += " " + gatherText(resolved, seen);
  }
  return text;
}

const results = ROUTES.map((r) => {
  const file = join(SRC, r.file);
  const text = gatherText(file);
  const words = countWords(text);
  let status = "PASS";
  if (words < 200) status = "FAIL";
  else if (words < 250) status = "WARN";
  return { ...r, words, status };
});

results.sort((a, b) => a.words - b.words);
const pad = (s: string, n: number) => s.padEnd(n);
console.log(pad("ROUTE", 50), pad("WORDS", 7), "STATUS");
console.log("-".repeat(70));
for (const r of results) {
  console.log(pad(r.path, 50), pad(String(r.words), 7), r.status);
}
const failing = results.filter((r) => r.status === "FAIL");
console.log("\n" + failing.length + " FAIL, " + results.filter(r => r.status === "WARN").length + " WARN, " + results.filter(r => r.status === "PASS").length + " PASS");
