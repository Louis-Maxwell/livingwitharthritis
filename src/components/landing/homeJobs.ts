import {
  HeartPulse,
  BookOpen,
  Dumbbell,
  Wallet,
  HandHeart,
  ShieldCheck,
  MessagesSquare,
  Heart,
  type LucideIcon,
} from "lucide-react";

/**
 * Visitor jobs for the homepage router (HomeJobRouter). Every internal href
 * must resolve to a route in App.tsx, a published blog slug or a library
 * topic — enforced by __tests__/HomeJobRouter.test.tsx.
 */
export const GOFUNDME_URL = "https://www.gofundme.com/f/help-fund-critical-arthritis-research";

export type JobLink = { label: string; href: string; external?: boolean };

export type VisitorJob = {
  id: string;
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  more: JobLink[];
};

export const VISITOR_JOBS: VisitorJob[] = [
  {
    id: "pain",
    title: "I'm in pain right now",
    desc: "Practical steps that can help today — movement, heat and medicines explained.",
    href: "/guides/arthritis-pain-relief",
    icon: HeartPulse,
    more: [
      { label: "Flare-up: what to do", href: "/blog/arthritis-flare-up-what-to-do" },
      { label: "Flare action plan", href: "/resources/flare-action-plan" },
    ],
  },
  {
    id: "newly-diagnosed",
    title: "I've just been diagnosed",
    desc: "A calm first-steps checklist and plain-English guides to each condition.",
    href: "/guides/newly-diagnosed",
    icon: BookOpen,
    more: [
      { label: "Condition guides", href: "/conditions/arthritis" },
      { label: "Symptom checker", href: "/symptom-checker" },
    ],
  },
  {
    id: "exercises",
    title: "Exercises — Motion is Lotion",
    desc: "Gentle home routines for knees, hips, hands and more. Start small, build slowly.",
    href: "/exercises",
    icon: Dumbbell,
    more: [
      { label: "Knee exercises for osteoarthritis", href: "/guides/knee-exercises-for-osteoarthritis" },
      { label: "Seated tai chi", href: "/exercises/seated-tai-chi-for-arthritis" },
    ],
  },
  {
    id: "money",
    title: "Money, benefits & work",
    desc: "PIP claims and appeals, Access to Work and your rights at work.",
    href: "/benefits-pip",
    icon: Wallet,
    more: [
      { label: "Access to Work", href: "/library/access-to-work" },
      { label: "Working with arthritis", href: "/guides/work-with-arthritis" },
    ],
  },
  {
    id: "carers",
    title: "I care for someone with arthritis",
    desc: "Practical ways to help without taking over — and looking after yourself too.",
    href: "/blog/caring-for-parent-with-arthritis",
    icon: HandHeart,
    more: [
      { label: "Helping without taking over", href: "/blog/carers-how-to-help-without-taking-over-uk" },
      { label: "Carer's assessments", href: "/blog/carers-assessment-arthritis-frailty-uk" },
    ],
  },
  {
    id: "trust",
    title: "Can I trust this information?",
    desc: "How we write and check our guides, and who reviews them.",
    href: "/editorial-standards",
    icon: ShieldCheck,
    more: [
      { label: "Meet our clinical reviewer", href: "/authors/maxwell" },
      { label: "Trust & credibility", href: "/trust" },
    ],
  },
  {
    id: "community",
    title: "Talk to someone & find support",
    desc: "Peer-support groups, our helpline and the wider community.",
    href: "/community",
    icon: MessagesSquare,
    more: [
      { label: "Helpline & support", href: "/helpline" },
      { label: "Connect groups", href: "/community/connect-groups" },
    ],
  },
  {
    id: "donate",
    title: "I'd like to help",
    desc: "Donations keep every guide free and help fund arthritis research.",
    href: "/donate",
    icon: Heart,
    more: [
      { label: "Research fund on GoFundMe", href: GOFUNDME_URL, external: true },
      { label: "Other ways to help", href: "/ways-to-help" },
    ],
  },
];

/** Quieter "everything else" links under the grid — all real routes. */
export const MORE_TOPICS: JobLink[] = [
  { label: "Search all guides", href: "/search" },
  { label: "Diet & nutrition", href: "/diet" },
  { label: "Medicines explained", href: "/treatments/drug-guide" },
  { label: "Arthritis blog", href: "/blog" },
  { label: "Resource centre", href: "/resource-centre" },
  { label: "FAQs", href: "/faq" },
  { label: "For healthcare professionals", href: "/healthcare-professionals" },
];

