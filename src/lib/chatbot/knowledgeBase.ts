/**
 * Living With Arthritis — local chatbot knowledge base.
 * Educational UK guidance only: no diagnosis, no doses/prescribing.
 * Signpost GP / NHS 111 / 999. Charity 1218461 · HCPC PH128483.
 */

export type ChatResourceRef = {
  type: "guide" | "exercise" | "condition" | "article" | "video";
  title: string;
  url: string;
  description?: string;
};

export type KnowledgeTopic = {
  id: string;
  keywords: string[];
  synonyms?: string[];
  requireAny?: string[];
  priority?: number;
  answer: string;
  nextSteps?: string[];
  related?: ChatResourceRef[];
};

export const SAFETY_DISCLAIMER =
  "\n\n---\n\n_General guidance from Living With Arthritis (registered charity 1218461). Educational information only — not a diagnosis or prescription. Speak with your GP, pharmacist or rheumatology team before changing medication or starting a new programme. For urgent symptoms call **NHS 111**; for emergencies call **999**._";

export const TOPICS: KnowledgeTopic[] = [
  {
    id: "emergency",
    keywords: [
      "chest pain", "can't breathe", "cannot breathe", "difficulty breathing",
      "slurred speech", "face drooping", "stroke", "anaphylaxis",
      "swelling of the face", "call 999", "heart attack",
    ],
    synonyms: ["emergency", "999", "life threatening"],
    priority: 100,
    answer: `**This may need emergency care**

If you have **chest pain**, sudden weakness or slurred speech, severe difficulty breathing, or swelling of the face/throat, call **999** now.

For a joint that is suddenly **hot, red, very swollen** with fever or feeling very unwell, seek urgent care today (possible joint infection) — call **NHS 111** or go to A&E if you cannot get through.

This chat cannot replace emergency services.`,
    nextSteps: [
      "Call 999 for life-threatening symptoms",
      "Call NHS 111 for urgent but non-life-threatening advice",
    ],
    related: [
      { type: "guide", title: "Contact us", url: "/contact", description: "Non-urgent charity contact" },
    ],
  },
  {
    id: "who-we-are",
    keywords: [
      "who are you", "who we are", "about you", "about the charity",
      "what is living with arthritis", "are you arthritis uk", "versus arthritis",
      "charity number", "hcpc", "louis maxwell", "motion is lotion",
    ],
    synonyms: ["about us", "independent", "who runs", "founder", "ph128483", "1218461"],
    priority: 20,
    answer: `**Who we are**

We are **Living With Arthritis** — an independent UK charity (Charitable Incorporated Organisation, registered charity **1218461** in England and Wales).

- We are **not** Arthritis UK (formerly Versus Arthritis) and **not** the US Arthritis Foundation.
- Clinical review is led by our founder **Louis Maxwell**, an HCPC-registered First Contact Practitioner (**PH128483**) and CSP member.
- Our motto: **Motion is Lotion** — gentle, regular movement is one of the best treatments for most arthritis.
- Everything on the site is free; we do **not** diagnose or prescribe.

Ask about exercises, diet, flares, PIP, or browse **/about**.`,
    nextSteps: [
      "Read our About page",
      "Donate or get in touch if you want to support the work",
    ],
    related: [
      { type: "guide", title: "About us", url: "/about", description: "Charity 1218461 · independent of Arthritis UK" },
      { type: "guide", title: "Contact", url: "/contact", description: "Email or WhatsApp the team" },
      { type: "guide", title: "Donate", url: "/donate", description: "Support free UK arthritis guidance" },
    ],
  },
  {
    id: "donate-contact",
    keywords: ["donate", "donation", "gift aid", "contact", "email you", "phone number", "whatsapp", "get in touch", "helpline"],
    synonyms: ["support the charity", "how to help", "volunteer"],
    priority: 15,
    answer: `**Donate or contact Living With Arthritis**

We are a small independent UK charity (**1218461**). Donations and Gift Aid help keep guides, exercises and this chat free.

**Contact**
- Email: **info@livingwitharthritis.org.uk** (we aim to reply within two working days)
- Phone / WhatsApp: **07760 512 084**
- Web forms: **/contact**

**Donate:** **/donate**

We cannot provide emergency medical care by phone — for urgent symptoms use **NHS 111** or **999**.`,
    nextSteps: ["Open the contact page", "Consider a one-off or monthly donation"],
    related: [
      { type: "guide", title: "Contact", url: "/contact" },
      { type: "guide", title: "Donate", url: "/donate" },
      { type: "guide", title: "About us", url: "/about" },
    ],
  },
  {
    id: "pip-benefits",
    keywords: ["pip", "personal independence payment", "disability benefit", "dla", "attendance allowance", "universal credit", "benefits", "claim pip"],
    synonyms: ["welfare", "disability support", "daily living component", "mobility component"],
    priority: 18,
    answer: `**PIP and arthritis benefits (UK) — orientation only**

**Personal Independence Payment (PIP)** is a working-age disability benefit for people who need help with daily living or getting around because of a long-term condition — including many forms of arthritis. It is **not means-tested** and you can claim whether or not you work.

**In broad terms:**
- Two components: **daily living** and **mobility** (standard or enhanced rates after assessment).
- Assessment focuses on how your condition affects **activities** (cooking, dressing, managing treatment, moving around) — not only diagnosis labels.
- Keep a brief symptom/flare diary and examples of bad days; assessors look at reliability, safety, and needing help or aids.

**Practical next steps:**
- Read our plain-English hub: **/guides/benefits-pip**
- Check current rules on GOV.UK
- Citizens Advice or a local welfare-rights adviser can help with forms and mandatory reconsiderations

We cannot assess your entitlement — rules change.`,
    nextSteps: [
      "Read /guides/benefits-pip",
      "Gather examples of how arthritis affects daily tasks on bad days",
      "Consider Citizens Advice support with the form",
    ],
    related: [
      { type: "guide", title: "Benefits & PIP guide", url: "/guides/benefits-pip", description: "UK PIP orientation for arthritis" },
      { type: "guide", title: "Benefits hub", url: "/benefits-pip" },
      { type: "guide", title: "Contact", url: "/contact" },
    ],
  },
];
