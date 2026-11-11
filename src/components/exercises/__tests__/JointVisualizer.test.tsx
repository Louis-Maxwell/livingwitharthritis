import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import JointVisualizer from "@/components/exercises/JointVisualizer";
import { JOINT_AREAS, requiredAnchors, type Joint } from "@/data/jointAreas";
import { getPageAeo } from "@/data/page-aeo";

const PAGES: Record<Joint, { route: string; file: string }> = {
  knee: { route: "/guides/knee-exercises-for-osteoarthritis", file: "src/pages/guides/KneeExercisesForOsteoarthritis.tsx" },
  hip: { route: "/guides/hip-exercises-for-osteoarthritis", file: "src/pages/guides/HipExercisesForOsteoarthritis.tsx" },
};

describe("JointVisualizer", () => {
  for (const joint of ["knee", "hip"] as Joint[]) {
    it(`${joint}: hotspots are 44px+ buttons with aria-pressed and keyboard navigation`, () => {
      render(<JointVisualizer joint={joint} />);
      const areas = JOINT_AREAS[joint];
      const buttons = areas.map((a) => screen.getByRole("button", { name: a.name }));
      buttons.forEach((b) => expect(b.className).toMatch(/min-h-\[44px\].*min-w-\[44px\]|min-w-\[44px\].*min-h-\[44px\]/));
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
      expect(buttons[1]).toHaveAttribute("aria-pressed", "false");

      fireEvent.click(buttons[1]);
      expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByText(areas[1].feel)).toBeVisible();

      fireEvent.keyDown(buttons[1], { key: "ArrowRight" });
      expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
      expect(document.activeElement).toBe(buttons[2]);
      fireEvent.keyDown(buttons[2], { key: "Home" });
      expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    });

    it(`${joint}: every jump link points at an id that exists on ${PAGES[joint].route}`, () => {
      const src = readFileSync(PAGES[joint].file, "utf8");
      for (const anchor of requiredAnchors(joint)) expect(src, anchor).toContain(`id="${anchor}"`);
      expect(src).toContain(`<JointVisualizer joint="${joint}" />`);
      // Placed below the answer block.
      expect(src.indexOf("<JointVisualizer")).toBeGreaterThan(src.indexOf("<AeoEnhancement"));
    });
  }

  it("uses no WebGL/3D runtime, no hardcoded hex colours and no unsourced authority labels", () => {
    const src = readFileSync("src/components/exercises/JointVisualizer.tsx", "utf8") + readFileSync("src/data/jointAreas.ts", "utf8");
    expect(src).not.toMatch(/from ["'](three|@react-three\/)|getContext\(|<canvas/);
    const imports = [...src.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    expect(imports.every((m) => ["react", "lucide-react", "@/data/jointAreas"].includes(m))).toBe(true);
    expect(src).not.toMatch(/#[0-9a-f]{6}\b/i);
    expect(src).not.toMatch(/Clinical Visuali[sz]er|Physiotherapy Guideline/);
    const copy = JSON.stringify(JOINT_AREAS);
    expect(copy).not.toMatch(/\d+\s?%|\d+ ?kg|weeks/);
    expect(src).toContain("motion-safe:");
  });
});

describe("AEO blocks on OA pages avoid unsourced figures", () => {
  const routes = [
    "/guides/knee-exercises-for-osteoarthritis",
    "/guides/hip-exercises-for-osteoarthritis",
    "/conditions/knee-arthritis",
    "/conditions/osteoarthritis",
  ];
  it.each(routes)("%s", (route) => {
    const aeo = getPageAeo(route)!;
    const text = JSON.stringify(aeo);
    expect(aeo.reviewer).toBe("Louis Maxwell, HCPC PH128483");
    expect(text).not.toMatch(/70%|25%|4 out of 10|4\/10|\d+ ?kg|sets of|repetitions|\d+(-|–| to )\d+ weeks|as effectively as/i);
    expect(text).not.toMatch(/Living With Arthritis UK/);
    expect(aeo.takeaways!.length).toBeGreaterThanOrEqual(3);
  });

  it("knee arthritis and OA blocks carry the NG226 points that are sourced", () => {
    const knee = JSON.stringify(getPageAeo("/conditions/knee-arthritis"));
    expect(knee).toMatch(/topical NSAID/);
    expect(knee).toMatch(/45 or over/);
    expect(JSON.stringify(getPageAeo("/conditions/osteoarthritis"))).toMatch(/Paracetamol and weak opioids are not routinely recommended/);
  });

  it("the hip guide has a single FAQ source (page schema), not a second AEO FAQPage", () => {
    expect(getPageAeo("/guides/hip-exercises-for-osteoarthritis")!.faqs ?? []).toHaveLength(0);
  });
});
