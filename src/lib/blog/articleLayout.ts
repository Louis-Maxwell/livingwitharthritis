/**
 * Shared article layout helpers used by every catalogue guide (BlogPost)
 * and its PDF export, so the layout applies automatically across all posts.
 */

/** Split HTML at the <h2> nearest the middle. Returns [before, after]. */
export function splitMidH2(html: string): [string, string] {
  if (!html) return ['', ''];
  const starts: number[] = [];
  const re = /<h2[\s>]/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) starts.push(m.index);
  // Need at least two sections either side to be worth a figure.
  if (starts.length < 2) return [html, ''];
  const mid = html.length / 2;
  const at = starts
    .filter((i) => i > 0)
    .reduce((best, i) => (Math.abs(i - mid) < Math.abs(best - mid) ? i : best), starts[1]);
  return [html.slice(0, at), html.slice(at)];
}

const BASE =
  'This guide is general educational information, not a diagnosis or a ' +
  'personal treatment plan. Speak to your GP, pharmacist or physiotherapist ' +
  'about your own situation. In an emergency call 999; for urgent advice ' +
  'call 111.';

/** Topic-specific safety line added to the shared disclaimer. */
export function tailoredDisclaimer(category: string, title: string): string {
  const t = `${category} ${title}`.toLowerCase();
  if (/supplement|vitamin|turmeric|curcumin|glucosamine|collagen|omega|ginger/.test(t)) {
    return `${BASE} Check with a pharmacist before starting a supplement, ` +
      'especially if you take other medicines, are pregnant or have a long-term condition.';
  }
  if (/medic|drug|dmard|methotrexate|steroid|nsaid|painkill|injection|biologic/.test(t)) {
    return `${BASE} Do not start, stop or change a prescribed medicine without ` +
      'talking to the clinician who prescribes it.';
  }
  if (/exercise|stretch|walk|yoga|pilates|tai chi|physio|strength/.test(t)) {
    return `${BASE} Stop an exercise that causes sharp or worsening pain, and ` +
      'get advice before starting if you have had recent surgery or a fall.';
  }
  if (/diet|nutrition|food|recipe|eating|smoothie/.test(t)) {
    return `${BASE} Talk to your GP or a registered dietitian before big diet ` +
      'changes, particularly if you have diabetes, kidney disease or food allergies.';
  }
  if (/pip|benefit|universal credit|blue badge|allowance|work/.test(t)) {
    return `${BASE} Benefit rules change; check GOV.UK or a welfare adviser ` +
      'for your own claim.';
  }
  return BASE;
}

const GENERIC_WORDS = new Set(['arthritis', 'living', 'guide', 'with', 'your', 'what', 'from', 'that', 'this']);

/**
 * True only when a picture's filename shares a real topic word with the
 * guide's slug or title, so generic stock never fills a slot on its own.
 */
export function isStrictTopicMatch(src: string, slug: string, title: string): boolean {
  const words = new Set(
    `${slug} ${title}`.toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 4 && !GENERIC_WORDS.has(w)),
  );
  return src.toLowerCase().split(/[^a-z]+/).some((w) => words.has(w));
}
