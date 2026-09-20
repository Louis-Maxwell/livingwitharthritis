import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FAQSection from "@/components/landing/FAQSection";
import { HelmetProvider } from "react-helmet-async";

const LINKS: { question: string; label: string; href: string }[] = [
  { question: "Can diet really make a difference?", label: "Read the diet guide", href: "/diet" },
  { question: "Is your help chat the same as seeing a doctor?", label: "Open the help chat", href: "/chat" },
  {
    question: "What are the first signs of osteoarthritis?",
    label: "Read the osteoarthritis guide",
    href: "/conditions/osteoarthritis",
  },
  { question: "Can I claim PIP for arthritis in the UK?", label: "PIP and benefits guide", href: "/benefits-pip" },
  {
    question: "What can I do while waiting for rheumatology or physiotherapy?",
    label: "Waiting-list help",
    href: "/arthritis-waiting-list-help",
  },
  {
    question: "Does the Equality Act cover arthritis at work?",
    label: "Work rights guide",
    href: "/blog/working-with-arthritis-uk-rights",
  },
];

describe("homepage FAQ deep links", () => {
  it("links diet, chat, osteoarthritis, PIP, waiting-list and work-rights answers", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <FAQSection />
        </MemoryRouter>
      </HelmetProvider>,
    );

    for (const item of LINKS) {
      fireEvent.click(screen.getByRole("button", { name: item.question }));
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
  });
});
