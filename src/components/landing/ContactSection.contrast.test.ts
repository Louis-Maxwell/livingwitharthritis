/**
 * WCAG AA contrast audit for ContactSection tokens (light theme only —
 * this project has no dark theme; see mem://style/visual-identity).
 *
 * Computes contrast ratios from the HSL values declared in src/index.css
 * for every text/background token pair actually used in
 * src/components/landing/ContactSection.tsx and asserts each meets the
 * WCAG 2.1 AA threshold:
 *   - 4.5:1 for normal body text
 *   - 3.0:1 for large text (>= 18.66px bold or >= 24px)
 *
 * Border-only and background-only tokens (--border, --card) are excluded
 * — they carry no readable text.
 */

import { describe, it, expect } from "vitest";

// ── Colour math ────────────────────────────────────────────────────────

/** HSL (h 0-360, s/l 0-100) → sRGB [0-1] triple. */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const S = s / 100;
  const L = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = S * Math.min(L, 1 - L);
  const f = (n: number) => L - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)];
}

/** Relative luminance per WCAG 2.1 (input sRGB 0-1). */
function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(fg: [number, number, number], bg: [number, number, number]): number {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

// ── Tokens (mirrored from src/index.css :root — light theme) ──────────
//
// Kept in sync manually. If index.css changes, update these and the tests
// will re-verify AA compliance in the new palette.
const TOKENS = {
  background: [34, 50, 95],       // warm cream
  foreground: [0, 0, 6],          // near-black
  card: [0, 0, 100],              // pure white
  primary: [354, 85, 46],         // MAP red (darkened for AA contrast)
  primaryForeground: [0, 0, 100], // white on red buttons
  mutedForeground: [0, 0, 18],
  destructive: [354, 85, 46],
} as const;

const rgb = (t: readonly [number, number, number]) =>
  hslToRgb(t[0], t[1], t[2]);

// ── Assertions ─────────────────────────────────────────────────────────

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

describe("ContactSection contrast (WCAG AA)", () => {
  it("foreground text on white card meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.foreground), rgb(TOKENS.card))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("foreground text on cream background meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.foreground), rgb(TOKENS.background))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("muted-foreground body text on white card meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.mutedForeground), rgb(TOKENS.card))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("muted-foreground body text on cream background meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.mutedForeground), rgb(TOKENS.background))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  // Was a KNOWN AA GAP: #EE2737 (--primary, l=54%) on #FFFFFF gave 4.24:1,
  // below the 4.5:1 threshold for normal text. Fixed by darkening --primary
  // (and --destructive, which shares the same red) to l=46% (#D91226),
  // giving 5.17:1 — see src/index.css.
  it("primary-foreground on primary (Send message button) meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.primaryForeground), rgb(TOKENS.primary))).toBeGreaterThanOrEqual(AA_NORMAL);
  });
  it("destructive error text on white card meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.destructive), rgb(TOKENS.card))).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  // The channel-card labels use text-foreground/70 (opacity 0.7). Even
  // fully opaque, foreground on white is ~19:1, so a 30 % lift toward
  // the white bg still clears the 3:1 large-text bar comfortably. This
  // test locks that in by simulating the alpha-blended colour.
  it("foreground/70 label on white clears large-text AA (3.0:1)", () => {
    const [fr, fg, fb] = rgb(TOKENS.foreground);
    const [br, bg, bb] = rgb(TOKENS.card);
    const blend = (f: number, b: number) => f * 0.7 + b * 0.3;
    const blended: [number, number, number] = [blend(fr, br), blend(fg, bg), blend(fb, bb)];
    expect(contrast(blended, rgb(TOKENS.card))).toBeGreaterThanOrEqual(AA_LARGE);
  });

  // Same red used directly as body-text colour (e.g. the mailto link),
  // not just as a button background — verified separately from the
  // button-contrast test above since it's a distinct usage.
  it("primary red text on white card meets AA (4.5:1)", () => {
    expect(contrast(rgb(TOKENS.primary), rgb(TOKENS.card))).toBeGreaterThanOrEqual(AA_NORMAL);
  });
});
