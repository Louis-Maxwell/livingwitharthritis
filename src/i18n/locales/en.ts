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
  footer: {
    tagline: "Free physiotherapy, diet plans and evidence-based support for people living with arthritis across the UK.",
    columns: {
      getHelp: "Get Help",
      aboutArthritis: "About Arthritis",
      organisation: "Organisation",
      legal: "Legal",
      connect: "Connect",
    },
    links: {
      virtualPhysio: "Virtual Physiotherapy",
      exerciseHub: "Exercise Hub",
      dietHub: "Diet & Nutrition Hub",
      selfHelp: "Self Help Tool",
      flareUps: "Arthritis Flare-Ups",
      osteoarthritis: "Osteoarthritis",
      rheumatoid: "Rheumatoid Arthritis",
      psoriatic: "Psoriatic Arthritis",
      blog: "Blog & Research",
      ukGuide: "UK Arthritis Guide",
      nhsGuide: "NHS Services Guide",
      dietGuide: "Diet & Nutrition Guide",
      exerciseGuide: "Exercise Guide",
      benefitsGuide: "Benefits & PIP Guide",
      mission: "Our Mission",
      trust: "Trust & Credibility",
      governance: "Governance",
      finances: "Our Finances",
      impact: "Our Impact",
      community: "Community Hub",
      corporate: "Corporate Giving",
      press: "Press & Media",
      partners: "Partners",
      sitemap: "Sitemap",
      privacy: "Privacy Policy",
      cookies: "Cookies Policy",
      terms: "Terms & Conditions",
      accessibility: "Accessibility",
      safeguarding: "Safeguarding Policy",
      complaints: "Complaints Procedure",
    },
    copyright: "Living with Arthritis™ · 27 Old Gloucester Street, London WC1N 3AX · Registered in England & Wales",
    designedBy: "Designed & Built by Maxwell Health",
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
