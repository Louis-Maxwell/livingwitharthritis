import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import { PAGE_AEO } from "@/data/page-aeo";
import { HOMEPAGE_FAQS, HOMEPAGE_INTRODUCTION, CHARITY_MISSION, ORGANIZATION_DESCRIPTION, REVIEWED_DISCLAIMER_SHORT, UK_URGENT_CARE, PIP_INTRODUCTION, PIP_ANSWER_HEADING } from "@/data/reviewedPublicCopy";
import { ORGANIZATION_PAYLOAD, WEBSITE_PAYLOAD } from "@/lib/rootOrganizationSchema";
import { MEDICAL_DISCLAIMER_CHAT, MEDICAL_DISCLAIMER_TOOL, nhsEscalationLine } from "@/lib/medicalDisclaimer";
import pip from "@/content/blog/posts/pip-for-arthritis-uk.json";

const index = readFileSync("index.html", "utf8");
const head = JSON.parse(readFileSync("scripts/ai-head-data.json", "utf8"));
const staticNode = (id: string) => JSON.parse(index.match(new RegExp(`<script id="${id}"[^>]*>([\\s\\S]*?)</script>`))![1]);

describe("reviewed public wording", () => {
  it("keeps the single homepage answer source and static/runtime identity in step", () => {
    expect(HOMEPAGE_FAQS).toHaveLength(15);
    expect(new Set(HOMEPAGE_FAQS.map((faq) => faq.q)).size).toBe(15);
    expect(PAGE_AEO["/"].faqs).toBe(HOMEPAGE_FAQS);
    expect(PAGE_AEO["/"].answer).toBe(ORGANIZATION_DESCRIPTION);
    expect(PAGE_AEO["/"].reviewer).toBe("");
    expect(head["/"].faqs).toEqual(HOMEPAGE_FAQS);
    expect(staticNode("root-organization-jsonld").description).toBe(ORGANIZATION_PAYLOAD.description);
    expect(ORGANIZATION_PAYLOAD.description).toBe(ORGANIZATION_DESCRIPTION);
    expect(staticNode("root-website-jsonld").description).toBe(WEBSITE_PAYLOAD.description);
    expect(WEBSITE_PAYLOAD.description).toBe(HOMEPAGE_INTRODUCTION);
    expect(staticNode("root-organization-jsonld")).not.toHaveProperty("foundingDate");
    expect(ORGANIZATION_PAYLOAD).not.toHaveProperty("foundingDate");
    expect(CHARITY_MISSION).toMatch(/^Our aim is/);
  });

  it("renders all 15 approved answers on demand with one identical schema, without a clinical-review badge", async () => {
    const { rerender } = render(<AeoEnhancement route="/" />);
    expect(screen.queryByText(/Medically reviewed/)).not.toBeInTheDocument();
    for (const faq of HOMEPAGE_FAQS) {
      fireEvent.click(screen.getByRole("button", { name: faq.q }));
      expect(await screen.findByText(faq.a)).toBeVisible();
    }
    const nodes = document.querySelectorAll('script[data-aeo-faq="/"]');
    expect(nodes).toHaveLength(1);
    const schema = JSON.parse(nodes[0].textContent || "{}");
    expect(schema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }) => ({ q: faq.name, a: faq.acceptedAnswer.text }))).toEqual(HOMEPAGE_FAQS);
    rerender(<AeoEnhancement route="/no-configured-copy" />);
    await waitFor(() => expect(document.querySelectorAll('script[data-aeo-faq="/"]')).toHaveLength(0));
  });

  it("uses the approved shared warning and distinct national urgent-care routes", () => {
    expect(MEDICAL_DISCLAIMER_CHAT).toBe(REVIEWED_DISCLAIMER_SHORT);
    expect(MEDICAL_DISCLAIMER_TOOL).toBe(REVIEWED_DISCLAIMER_SHORT);
    expect(nhsEscalationLine()).toContain("Northern Ireland: contact your GP");
    expect(nhsEscalationLine()).toContain("Scotland: NHS 24 on 111");
    expect(nhsEscalationLine()).not.toContain("Samaritans");
    expect(UK_URGENT_CARE[1].a).toContain("call 999 or go to A&E immediately");
    expect(UK_URGENT_CARE[2].a).toMatch(/^Ask for an urgent GP appointment/);
    expect(head["/disclaimer"].pageType).toBe("WebPage");
    expect(head["/disclaimer"]).not.toHaveProperty("reviewedBy");
  });

  it("preserves the PIP title, national scope, application cross-link and honest review limits", () => {
    const body = new DOMParser().parseFromString(pip.content, "text/html");
    expect(body.querySelector("p")?.textContent).toBe(PIP_INTRODUCTION);
    expect(body.querySelector('a[href="/guides/benefits-pip"]')).not.toBeNull();
    expect(pip.content).toContain("Adult Disability Payment");
    expect(pip.content).toContain("Northern Ireland");
    expect(pip.editorial_review_note).toContain("not had a fresh specialist welfare-rights or qualified clinical review");
    expect(PIP_ANSWER_HEADING).not.toBe(pip.title);
  });
});
