/**
 * Areas shown by <JointVisualizer />. Descriptive, not diagnostic.
 */
export type Joint = "knee" | "hip";

export interface JointArea {
  id: string;
  name: string;
  /** Hotspot position as a percentage of the diagram box. */
  x: number;
  y: number;
  /** Plain-language description of where people often feel it. */
  feel: string;
  /** Exercises on this page that work the muscles around this area. */
  exercises: { label: string; anchor: string }[];
}

/**
 * Content is deliberately descriptive, not diagnostic, and makes no numeric
 * claims. Every anchor must match an id on the page the joint is used on
 * (see src/components/exercises/__tests__/JointVisualizer.test.tsx).
 */
export const JOINT_AREAS: Record<Joint, JointArea[]> = {
  knee: [
    {
      id: "front",
      name: "Front of the knee (kneecap)",
      x: 50,
      y: 36,
      feel: "Pain around or behind the kneecap, often on stairs, when squatting or when getting up from a low chair.",
      exercises: [
        { label: "Quad sets", anchor: "ex-1" },
        { label: "Straight-leg raise", anchor: "ex-2" },
      ],
    },
    {
      id: "inner",
      name: "Inner side of the knee",
      x: 32,
      y: 52,
      feel: "Aching along the inner side of the knee, often after walking or standing for a while.",
      exercises: [
        { label: "Sit-to-stand", anchor: "ex-3" },
        { label: "Mini squat", anchor: "ex-4" },
      ],
    },
    {
      id: "outer",
      name: "Outer side of the knee",
      x: 68,
      y: 52,
      feel: "Aching along the outer side of the knee, sometimes with a feeling that the knee is less steady.",
      exercises: [
        { label: "Step-ups", anchor: "ex-5" },
        { label: "Standing hamstring curl", anchor: "ex-6" },
      ],
    },
    {
      id: "stiffness",
      name: "Whole knee stiffness",
      x: 50,
      y: 74,
      feel: "Stiffness after sitting or first thing in the morning that eases as you get moving.",
      exercises: [
        { label: "Knee bend and straighten", anchor: "ex-8" },
        { label: "Calf raise", anchor: "ex-7" },
      ],
    },
  ],
  hip: [
    {
      id: "groin",
      name: "Groin and front of the hip",
      x: 52,
      y: 46,
      feel: "A deep ache in the groin or front of the hip, often when walking, getting up or putting on socks and shoes.",
      exercises: [
        { label: "Glute bridge", anchor: "ex-3" },
        { label: "Standing hip extension", anchor: "ex-4" },
      ],
    },
    {
      id: "outer",
      name: "Outer side of the hip",
      x: 26,
      y: 50,
      feel: "Pain on the outer hip. This can come from the hip joint or from the tendons nearby; a GP or physiotherapist can tell them apart.",
      exercises: [
        { label: "Side-lying hip abduction", anchor: "ex-1" },
        { label: "Clamshell", anchor: "ex-2" },
      ],
    },
    {
      id: "buttock",
      name: "Buttock and thigh",
      x: 46,
      y: 24,
      feel: "Aching in the buttock or thigh, and tired legs when rising from a chair or climbing stairs.",
      exercises: [
        { label: "Sit-to-stand", anchor: "ex-5" },
        { label: "Mini squat", anchor: "ex-6" },
      ],
    },
    {
      id: "stiffness",
      name: "Hip stiffness",
      x: 60,
      y: 76,
      feel: "Stiffness after sitting or in the morning, and difficulty lifting the leg or standing up straight at first.",
      exercises: [
        { label: "Standing hip flexion (marching)", anchor: "ex-7" },
        { label: "Hamstring and hip flexor stretches", anchor: "ex-8" },
      ],
    },
  ],
};

/** Ids every page using the visualiser must provide (red flags + exercises). */
export const requiredAnchors = (joint: Joint): string[] => [
  ...new Set([...JOINT_AREAS[joint].flatMap((a) => a.exercises.map((e) => e.anchor)), "progression-and-red-flags"]),
];
