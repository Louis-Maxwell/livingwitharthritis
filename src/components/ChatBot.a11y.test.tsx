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

// Passthrough framer-motion mock — same shape as the one used by
// src/components/__tests__/ChatBot.test.tsx.
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

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
      <main id="main-content">
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
