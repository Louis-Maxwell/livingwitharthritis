export interface ArthritisCondition {
  slug: "osteoarthritis" | "rheumatoid-arthritis" | "psoriatic-arthritis";
  name: string;
  shortName: string;
  ukPrevalence: string;
  description: string;
  commonSymptoms: string[];
  managementApproaches: string[];
  whenToSeeGP: string;
  conditionPagePath: string;
}

export const arthritisConditions: ArthritisCondition[] = [
  {
    slug: "osteoarthritis",
    name: "Osteoarthritis",
    shortName: "OA",
    ukPrevalence: "Around 8.5 million adults in the UK live with osteoarthritis (Versus Arthritis).",
    description:
      "Osteoarthritis is the most common form of arthritis in the UK. It develops gradually as protective cartilage in joints wears down, most often affecting the knees, hips, hands, and spine.",
    commonSymptoms: [
      "Joint pain that worsens with activity",
      "Morning stiffness lasting under 30 minutes",
      "Reduced range of motion",
      "Grating or crunching sensations (crepitus)",
    ],
    managementApproaches: [
      "Weight management to reduce joint load",
      "Low-impact exercise (walking, swimming, cycling)",
      "Physiotherapy and strengthening programmes",
      "Pain relief medication and topical NSAIDs",
    ],
    whenToSeeGP:
      "See your GP if joint pain persists for more than a few weeks, limits daily activities, or is accompanied by swelling.",
    conditionPagePath: "/conditions/osteoarthritis",
  },
  {
    slug: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis",
    shortName: "RA",
    ukPrevalence: "Approximately 450,000 adults in the UK live with rheumatoid arthritis.",
    description:
      "Rheumatoid arthritis is an autoimmune condition where the immune system attacks the lining of joints, causing inflammation, pain, and swelling. Early diagnosis and DMARD treatment are critical.",
    commonSymptoms: [
      "Symmetrical joint pain (both hands, both feet)",
      "Morning stiffness lasting over an hour",
      "Warm, swollen, tender joints",
      "Fatigue, low-grade fever, and general unwellness",
    ],
    managementApproaches: [
      "DMARDs (e.g., methotrexate) prescribed by rheumatology",
      "Biologic and targeted therapies for moderate-to-severe RA",
      "Specialist rheumatology nurse support",
      "Occupational therapy for joint protection",
    ],
    whenToSeeGP:
      "See your GP urgently if you have persistent joint swelling, especially in the small joints of the hands or feet — early referral to rheumatology improves long-term outcomes.",
    conditionPagePath: "/conditions/rheumatoid-arthritis",
  },
  {
    slug: "psoriatic-arthritis",
    name: "Psoriatic Arthritis",
    shortName: "PsA",
    ukPrevalence: "An estimated 150,000 people in the UK have psoriatic arthritis, often linked to psoriasis.",
    description:
      "Psoriatic arthritis is an inflammatory arthritis associated with psoriasis. It can affect any joint and often causes nail changes, dactylitis (sausage-like swelling of fingers/toes), and back pain.",
    commonSymptoms: [
      "Joint pain and stiffness, often asymmetrical",
      "Dactylitis — swollen fingers or toes",
      "Nail pitting, thickening, or separation",
      "Lower back pain (axial involvement)",
    ],
    managementApproaches: [
      "DMARDs and biologics targeting inflammation",
      "Coordinated dermatology and rheumatology care",
      "Regular low-impact exercise to maintain mobility",
      "Skin and joint flare monitoring",
    ],
    whenToSeeGP:
      "If you have psoriasis and develop joint pain, swelling, or stiffness, ask your GP about referral to rheumatology for screening.",
    conditionPagePath: "/conditions/psoriatic-arthritis",
  },
];
