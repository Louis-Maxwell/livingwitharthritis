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
  quickAccess: {
    label: "Quick Access",
    headingLead: "Everything you need,",
    headingAccent: "right here",
    description:
      "Jump straight to the section that helps you most — exercises, nutrition, community support or personalised AI guidance.",
    explore: "Explore",
    guidesLabel: "In-depth Guides",
    hubs: {
      exercises: { title: "Exercise Hub", description: "NHS-aligned knee, hand, shoulder & chair routines with a printable weekly tracker." },
      diet: { title: "Diet Hub", description: "Mediterranean anti-inflammatory meal plans, recipe ideas & supplement guidance." },
      community: { title: "Community", description: "Peer support forum, patient stories, downloadable resources & newly diagnosed guide." },
      chat: { title: "AI Assistant", description: "Ask anything about arthritis — symptoms, treatments, diet or exercises. Instant & personalised." },
      conditions: { title: "Conditions", description: "In-depth guides for osteoarthritis, rheumatoid & psoriatic arthritis with treatment options." },
      healthTools: { title: "Health Tools", description: "Symptom quiz, inflammation calculator & personalised exercise plan generator — all free." },
    },
    guides: {
      ukArthritis: "📖 UK Arthritis Guide",
      nhs: "🏥 NHS Services",
      diet: "🥗 Diet Guide",
      exercise: "💪 Exercise Guide",
      benefits: "📋 Benefits & PIP",
    },
    goTo: "Go to",
  },
  howItWorks: {
    label: "How It Works",
    heading: "Your path to better living",
    description:
      "A structured, evidence-based approach designed by our clinical team. Most patients report significant improvement within 8–12 weeks.",
    steps: {
      explore: { title: "Explore Resources", desc: "Browse our curated library of 120+ clinically reviewed exercises, nutrition plans, and expert articles.", linkText: "Browse articles" },
      guidance: { title: "Get Personalised Guidance", desc: "Use our AI assistant or book a free virtual consultation with a HCPC-registered physiotherapist.", linkText: "Talk to AI assistant" },
      programme: { title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory Mediterranean diet plan.", linkText: "View exercises" },
      transform: { title: "Transform Your Life", desc: "Track your progress, connect with 10,000+ people in our community, and celebrate milestones.", linkText: "Join community" },
    },
  },
  services: {
    label: "Comprehensive Care Platform",
    headingLead: "World-class services,",
    headingAccent: "for everyone",
    description:
      "Every service is clinically reviewed, NICE-compliant and designed by our multidisciplinary team. No waiting lists, no referrals, no cost.",
    learnMore: "Learn more",
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
        ? { [Q in keyof typeof en[K][P]]: typeof en[K][P][Q] extends Record<string, unknown>
            ? { [R in keyof typeof en[K][P][Q]]: string }
            : string }
        : string }
    : string;
};
