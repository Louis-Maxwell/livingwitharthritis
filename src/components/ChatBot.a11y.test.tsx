// Static accessibility check for the ChatBot component.
//
// Renders ChatBot in jsdom (with the same mocks as ChatBot.test.tsx) and
// runs axe-core against the resulting DOM with WCAG 2.0 A/AA + 2.1 AA
// rulesets. Focuses on the initial "How can I help?" surface — the state
// most users first see. Streaming/message-list a11y is covered indirectly
// by ChatBot.test.tsx.

import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import axe, { type AxeResults, type Result } from "axe-core";
import { ChatBot } from "./ChatBot";

vi.mock("@/hooks/useStreamingChat", () => ({
  useStreamingChat: () => ({
    messages: [],
    isLoading: false,
    sendMessage: vi.fn(),
    clearMessages: vi.fn(),
  }),
}));

vi.mock("@/data/images", () => ({
  chatRheumatoid: "/test-image.jpg",
  chatFoods: "/test-image.jpg",
  chatExercise: "/test-image.jpg",
  chatDoctor: "/test-image.jpg",
}));

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: () => (props: Record<string, unknown>) => {
        const { children, ...rest } = props as { children?: unknown };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (globalThis as any).React
          ? // handled below
            null
          : null;
        void rest;
        void children;
      },
    },
  ),
  AnimatePresence: ({ children }: { children: unknown }) => <>{children as JSX.Element}</>,
}));

// Simpler framer-motion stub that renders each motion.X as a plain element.
vi.doMock("framer-motion", () => {
  const passthrough = (tag: keyof JSX.IntrinsicElements) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ children, ...rest }: any) => {
      const Tag = tag as unknown as string;
      return <Tag {...rest}>{children}</Tag>;
    };
  return {
    motion: new Proxy({}, { get: (_t, prop: string) => passthrough(prop as keyof JSX.IntrinsicElements) }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const AXE_OPTIONS: axe.RunOptions = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
  },
};

const formatViolations = (violations: Result[]) =>
  violations
    .map(
      (v) =>
        `\n[${v.impact ?? "unknown"}] ${v.id}: ${v.help}\n  ${v.helpUrl}\n  ${v.nodes
          .map((n) => n.target.join(" "))
          .join("\n  ")}`,
    )
    .join("\n");

describe("ChatBot accessibility", () => {
  it("has no WCAG 2.1 AA violations in the initial empty state", async () => {
    const { container } = render(
      <main>
        <ChatBot />
      </main>,
    );
    const results: AxeResults = await axe.run(container, AXE_OPTIONS);
    expect(
      results.violations,
      `axe reported ${results.violations.length} violation(s):${formatViolations(results.violations)}`,
    ).toEqual([]);
  });
});
