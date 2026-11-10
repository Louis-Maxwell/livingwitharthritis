/**
 * Share and stay-in-touch cards for the priority guides only.
 *
 * - `share` is the plain summary sent in a WhatsApp message. Keep it to one
 *   factual sentence that matches the page's own quick answer.
 * - `resource` drives the email card. Only link resources that already exist
 *   on the site (printable HTML pages or files in /public). Never promise a
 *   PDF that does not exist; `printable: true` offers the browser's own
 *   print / save-as-PDF for the current page.
 */
export interface GeoTopPage {
  share: string;
  resource: {
    title: string;
    description: string;
    /** Sent as the EmailSignupForm `sequence` (used as the signup source). */
    sequence: string;
    /** Existing on-site resource to link (route or /public file). */
    link?: { href: string; label: string };
    /** Offer "Print or save this guide" using the browser print dialog. */
    printable?: boolean;
  };
}

export const GEO_TOP_PAGES: Record<string, GeoTopPage> = {
  "/blog/hip-replacement-recovery-week-by-week": {
    share:
      "NHS-based hip replacement recovery guide: walking aids at first, at least 6 weeks before driving, and which symptoms need urgent help.",
    resource: {
      title: "Keep this hip recovery guide to hand",
      description:
        "Print it or save it as a PDF to share with family or a carer, and get our free practical arthritis guides by email.",
      sequence: "hip-recovery-guide",
      printable: true,
    },
  },
  "/blog/best-supplements-arthritis-uk": {
    share:
      "What the evidence says about arthritis supplements: omega-3 and turmeric have mixed evidence, and NICE says glucosamine should not be offered for osteoarthritis.",
    resource: {
      title: "Get evidence-checked arthritis tips by email",
      description:
        "Free, practical guides from a registered charity. No sponsored products. Unsubscribe at any time.",
      sequence: "supplements-guide",
    },
  },
  "/guides/knee-exercises-for-osteoarthritis": {
    share:
      "A free 8-move home routine for knee osteoarthritis, with a weekly plan, a simple pain rule and clear signs to stop.",
    resource: {
      title: "Keep the knee routine by your chair",
      description:
        "Print this page or save it as a PDF, and get our free exercise guides by email.",
      sequence: "knee-exercise-guide",
      printable: true,
    },
  },
  "/guides/benefits-pip": {
    share:
      "Step-by-step help to claim PIP with arthritis: the phone line, the form, the evidence that helps and how to challenge a decision.",
    resource: {
      title: "Free printable PIP evidence diary",
      description:
        "Record a typical week of daily living and mobility before you fill in the form. Print it from your browser, and get our free PIP and benefits tips by email.",
      sequence: "pip-diary",
      link: { href: "/resources/pip-evidence-diary", label: "Open the PIP evidence diary" },
    },
  },
  "/blog/pip-for-arthritis-uk": {
    share:
      "Can you get PIP for arthritis? It depends on how it affects daily living and mobility, not the diagnosis. Points, rates and evidence explained.",
    resource: {
      title: "Free printable PIP evidence diary",
      description:
        "Record a typical week of daily living and mobility before you fill in the form. Print it from your browser, and get our free PIP and benefits tips by email.",
      sequence: "pip-diary",
      link: { href: "/resources/pip-evidence-diary", label: "Open the PIP evidence diary" },
    },
  },
  "/conditions/polymyalgia-rheumatica/symptoms": {
    share:
      "Polymyalgia rheumatica symptoms explained: morning stiffness lasting more than 45 minutes, when to see a GP and the warning signs that need urgent help.",
    resource: {
      title: "Get practical PMR and arthritis guides by email",
      description:
        "Free guides from a registered charity on living with inflammatory conditions, steroids and staying active.",
      sequence: "pmr-guide",
    },
  },
};

export function getGeoTopPage(path: string): GeoTopPage | undefined {
  return GEO_TOP_PAGES[path.replace(/\/+$/, "") || "/"];
}
