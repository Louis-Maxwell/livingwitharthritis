const en = {
  nav: {
    newlyDiagnosed: "Newly Diagnosed",
    trackManage: "Track & Manage",
    treatments: "Treatments",
    conditions: "Conditions",
    blogStories: "Blog & Stories",
    supportUs: "Support Us",
    resources: "Resources",
    shop: "Shop",
    donateNow: "Donate Now",
    waysToHelp: "Ways to Help",
    menu: "Menu",
    talkToAI: "Talk to AI Assistant",
    zakatAppeal: "Zakat Appeal",
  },
  hero: {
    headlineLead: "1 in 6 people in the UK",
    headlineMid: "live with arthritis.",
    headlineAccent: "We're here for every one of them.",
    description:
      "Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support — helping people across the United Kingdom manage arthritis pain and live fuller lives.",
    donationLine: "Every donation helps us reach more people in need",
    ctaSupport: "Get Free Support",
    ctaDonate: "Donate Now",
    badgeNice: "NICE Compliant",
    stats: {
      ukAdults: "UK adults affected",
      types: "Types of arthritis",
      supported: "People supported",
      wellbeing: "Report improved wellbeing",
    },
    statsFootnote: "Based on internal user feedback surveys, 2024–2025",
  },
  language: {
    title: "Language",
    save: "Save",
    change: "Change language",
  },
} as const;

export default en;
export type Translation = {
  [K in keyof typeof en]: typeof en[K] extends Record<string, unknown>
    ? { [P in keyof typeof en[K]]: typeof en[K][P] extends Record<string, unknown>
        ? { [Q in keyof typeof en[K][P]]: string }
        : string }
    : string;
};
