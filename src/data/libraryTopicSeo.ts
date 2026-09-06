/**
 * Unique titles, descriptions and cross-links for high-value library
 * topics. Overlay only — do not rewrite src/data/healthTopics.ts.
 *
 * Used when the generated subtitle is too short or too generic for
 * Google (e.g. "Understanding widespread chronic pain").
 */
export interface LibraryTopicSeo {
  title: string;
  description: string;
  h1?: string;
  related?: { label: string; href: string }[];
}

export const LIBRARY_TOPIC_SEO: Record<string, LibraryTopicSeo> = {
  fibromyalgia: {
    title: "Fibromyalgia UK: symptoms, diagnosis and treatment",
    description:
      "UK guide to fibromyalgia — widespread pain, fatigue, fibro fog, how GPs diagnose it, and NICE-aligned pacing, exercise and medication options.",
    h1: "Fibromyalgia in the UK: widespread pain, fatigue and fibro fog",
    related: [
      { label: "Fibromyalgia condition guide", href: "/conditions/fibromyalgia" },
      { label: "Fibromyalgia exercises", href: "/conditions/fibromyalgia/exercises" },
      { label: "Why cold weather worsens pain", href: "/faq/arthritis-and-cold-weather" },
      { label: "Mental health and chronic pain", href: "/arthritis-mental-health" },
    ],
  },
  osteoarthritis: {
    title: "Osteoarthritis UK: what it is and how to manage it",
    description:
      "Plain-English UK library note on osteoarthritis — why cartilage wears, which joints are affected, and the NICE first-line steps of exercise, weight and pain relief.",
    h1: "Osteoarthritis: the UK's most common joint condition",
    related: [
      { label: "Full osteoarthritis guide", href: "/conditions/osteoarthritis" },
      { label: "OA symptoms and diagnosis", href: "/conditions/osteoarthritis/symptoms" },
      { label: "What is osteoarthritis? FAQ", href: "/faq/what-is-osteoarthritis" },
      { label: "OA vs rheumatoid arthritis", href: "/faq/osteoarthritis-vs-rheumatoid-arthritis" },
    ],
  },
  amitriptyline: {
    title: "Amitriptyline for pain: UK arthritis and fibro guide",
    description:
      "How amitriptyline is used in the UK for nerve pain, fibromyalgia and sleep — typical doses, side effects, and what to ask your GP or pharmacist.",
    related: [
      { label: "Fibromyalgia treatment", href: "/conditions/fibromyalgia" },
      { label: "Arthritis medication explained", href: "/faq/arthritis-medication-explained" },
      { label: "Pain relief creams", href: "/faq/best-pain-relief-creams-arthritis" },
    ],
  },
};

export function getLibraryTopicSeo(slug: string): LibraryTopicSeo | undefined {
  return LIBRARY_TOPIC_SEO[slug];
}
