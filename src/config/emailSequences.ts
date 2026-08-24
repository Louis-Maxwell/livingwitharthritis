/**
 * Email Sequence Configuration
 * Defines multi-email nurture sequences for:
 * - Welcome new subscribers
 * - Campaign promotion (exercise plans, benefits support, etc.)
 * - Donor retention (thank you, impact updates, upsell)
 * - Urgency/time-sensitive appeals
 */

export interface EmailTemplate {
  id: string;
  subject: string;
  preheader: string;
  delay: number; // delay from trigger in hours
  type: "welcome" | "campaign" | "retention" | "urgency";
  cta: {
    text: string;
    url: string;
    type: "donate" | "learn" | "read" | "share";
  };
}

export interface EmailSequence {
  id: string;
  name: string;
  description: string;
  emails: EmailTemplate[];
  trigger: "signup" | "donation" | "campaign_join" | "last_donation_90d";
}

// WELCOME SEQUENCE — New newsletter subscribers
export const welcomeSequence: EmailSequence = {
  id: "welcome-sequence",
  name: "Welcome to Living with Arthritis",
  description: "4-email series introducing new subscribers to the mission, impact, and how to get involved",
  trigger: "signup",
  emails: [
    {
      id: "welcome-1",
      subject: "Welcome to Living with Arthritis — Your free resources start here",
      preheader: "Meet Louis. He gets it.",
      delay: 0,
      type: "welcome",
      cta: {
        text: "Get Started",
        url: "/symptom-checker",
        type: "learn",
      },
    },
    {
      id: "welcome-2",
      subject: "Your free personalized exercise plan (+ 2 free resources)",
      preheader: "Evidence-based exercises tailored to your condition",
      delay: 48,
      type: "welcome",
      cta: {
        text: "Create Your Plan",
        url: "/guides/exercise",
        type: "learn",
      },
    },
    {
      id: "welcome-3",
      subject: "How £25 changes a life (real impact stories)",
      preheader: "See what your support makes possible",
      delay: 96,
      type: "welcome",
      cta: {
        text: "Read Impact Stories",
        url: "/impact",
        type: "read",
      },
    },
    {
      id: "welcome-4",
      subject: "One more thing: join the movement",
      preheader: "Supporters like you make this work",
      delay: 168,
      type: "welcome",
      cta: {
        text: "Donate Today",
        url: "/#donate-inline",
        type: "donate",
      },
    },
  ],
};

// CAMPAIGN SEQUENCE — Exercise Plan Campaign
export const exerciseCircuitCampaign: EmailSequence = {
  id: "exercise-circuit-campaign",
  name: "Fund 500 Exercise Plans Campaign",
  description: "3-email series promoting the exercise circuit fundraising campaign",
  trigger: "campaign_join",
  emails: [
    {
      id: "campaign-exercise-1",
      subject: "£100 funds one complete exercise recovery plan",
      preheader: "Movement is medicine — help us reach 500 people",
      delay: 0,
      type: "campaign",
      cta: {
        text: "View Campaign",
        url: "/campaigns/exercise-circuit-500",
        type: "learn",
      },
    },
    {
      id: "campaign-exercise-2",
      subject: "Sarah's story: How personalized exercises changed her life",
      preheader: "From pain to hiking again in 3 months",
      delay: 72,
      type: "campaign",
      cta: {
        text: "Read Story",
        url: "/impact",
        type: "read",
      },
    },
    {
      id: "campaign-exercise-3",
      subject: "Only 375 spots left — fund a recovery plan today",
      preheader: "Help us reach 500 people this year",
      delay: 168,
      type: "campaign",
      cta: {
        text: "Fund a Plan",
        url: "/campaigns/exercise-circuit-500",
        type: "donate",
      },
    },
  ],
};

// DONOR RETENTION SEQUENCE — Thank you + impact + monthly ask
export const donorRetentionSequence: EmailSequence = {
  id: "donor-retention",
  name: "Donor Gratitude & Impact Updates",
  description: "4-email series thanking donors and sharing measurable impact",
  trigger: "donation",
  emails: [
    {
      id: "retention-1",
      subject: "Thank you — your £{amount} is already changing lives",
      preheader: "See exactly where your gift goes",
      delay: 2,
      type: "retention",
      cta: {
        text: "See Impact",
        url: "/impact",
        type: "read",
      },
    },
    {
      id: "retention-2",
      subject: "This week: we supported 47 people with your help",
      preheader: "Real numbers. Real people. Real change.",
      delay: 168,
      type: "retention",
      cta: {
        text: "View Dashboard",
        url: "/impact",
        type: "read",
      },
    },
    {
      id: "retention-3",
      subject: "Would £25/month make a bigger difference?",
      preheader: "Monthly giving supporters fund our fastest-growing program",
      delay: 336,
      type: "retention",
      cta: {
        text: "Set Up Monthly Giving",
        url: "/#donate-inline",
        type: "donate",
      },
    },
    {
      id: "retention-4",
      subject: "One more thing: tell us what matters to you",
      preheader: "Help us focus where it counts",
      delay: 504,
      type: "retention",
      cta: {
        text: "Take Survey",
        url: "/contact",
        type: "learn",
      },
    },
  ],
};

// URGENCY SEQUENCE — Lapsed donor reactivation
export const reactivationSequence: EmailSequence = {
  id: "reactivation",
  name: "We Miss You — Help Reactivated",
  description: "2-email series to reactivate lapsed donors (last donation 90+ days ago)",
  trigger: "last_donation_90d",
  emails: [
    {
      id: "reactivation-1",
      subject: "We've made huge progress since you last gave",
      preheader: "See what your support built",
      delay: 0,
      type: "urgency",
      cta: {
        text: "See What's New",
        url: "/impact",
        type: "read",
      },
    },
    {
      id: "reactivation-2",
      subject: "Help us fund Gaza appeal — exercise plans for people in crisis",
      preheader: "Your gift today reaches people who need it most",
      delay: 168,
      type: "urgency",
      cta: {
        text: "Donate Now",
        url: "/#donate-inline",
        type: "donate",
      },
    },
  ],
};

// URGENCY SEQUENCE — Time-sensitive appeal
export const gazaAppealSequence: EmailSequence = {
  id: "gaza-appeal",
  name: "Gaza Emergency Appeal",
  description: "2-email urgent campaign for global relief",
  trigger: "signup",
  emails: [
    {
      id: "gaza-1",
      subject: "Crisis appeal: Support for people with arthritis in Gaza",
      preheader: "Arthritis doesn't pause for conflict",
      delay: 432,
      type: "urgency",
      cta: {
        text: "Help Now",
        url: "/#donate-inline",
        type: "donate",
      },
    },
    {
      id: "gaza-2",
      subject: "£50 provides exercise guidance to 100 people in Gaza",
      preheader: "We're reaching beyond borders",
      delay: 600,
      type: "urgency",
      cta: {
        text: "Donate",
        url: "/#donate-inline",
        type: "donate",
      },
    },
  ],
};

// Export all sequences for easy looping/registration
export const allSequences = [
  welcomeSequence,
  exerciseCircuitCampaign,
  donorRetentionSequence,
  reactivationSequence,
  gazaAppealSequence,
];

export const sequencesByTrigger = {
  signup: [welcomeSequence],
  donation: [donorRetentionSequence],
  campaign_join: [exerciseCircuitCampaign],
  last_donation_90d: [reactivationSequence],
};
