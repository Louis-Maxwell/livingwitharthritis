/**
 * Joint Mobility Routine Builder data (Pillar 1, Phase 3).
 * Every step is condensed from the site's existing reviewed exercise guides
 * (knee/hip osteoarthritis guides, hand arthritis guide, neck exercises,
 * shoulder pain relief guide) - no new exercises or doses introduced here.
 */

export interface RoutineStep {
  name: string;
  how: string;
  dose: string;
  /** Seconds for the optional timer cue (0 = rep-counted, no timer). */
  timerSeconds: number;
}

export interface JointRoutine {
  joint: string;
  steps: RoutineStep[];
  safety: string;
}

export const ROUTINES: JointRoutine[] = [
  {
    joint: "Knee",
    steps: [
      {
        name: "Quad sets (thigh tightening)",
        how: "Sit or lie with your leg straight and a small rolled towel under the knee. Tighten the front thigh muscle to press the back of the knee down into the towel, hold, then relax.",
        dose: "Hold 5 seconds; build up to 10 holds of 10 seconds.",
        timerSeconds: 5,
      },
      {
        name: "Sit-to-stand",
        how: "Sit near the front of a firm chair, feet hip-width apart and slightly behind your knees. Lean forward, push through your feet to stand, then sit back down slowly. Use the armrests at first.",
        dose: "8 to 12 repetitions.",
        timerSeconds: 0,
      },
      {
        name: "Knee bend and straighten (range of movement)",
        how: "Sitting, slide one foot back under the chair to bend the knee as far as is comfortable, hold for a few seconds, then slide forward and straighten fully, tightening the thigh.",
        dose: "10 slow repetitions each leg, daily - including on flare days.",
        timerSeconds: 0,
      },
    ],
    safety:
      "Mild discomfort up to about 4 out of 10 that settles within 24 hours is usually fine. Stop that session if you get sharp or catching pain, the knee locks or gives way, or new swelling lasts overnight. Get urgent same-day help for a hot, red, swollen knee with fever, or a painful, swollen calf.",
  },
  {
    joint: "Hip",
    steps: [
      {
        name: "Side-lying hip abduction",
        how: "Lie on your less painful side, bottom knee bent, top leg straight and in line with your body. Lift the top leg to about 30 cm, hold 2 seconds, lower slowly. If lying on one side hurts, do it standing, holding a worktop.",
        dose: "8 to 12 each side.",
        timerSeconds: 2,
      },
      {
        name: "Glute bridge",
        how: "Lie on your back, knees bent, feet flat and hip-width apart. Squeeze your buttocks and lift your hips until your body is in a line from shoulders to knees. Hold, then lower slowly.",
        dose: "8 to 12 repetitions, holding 3 seconds.",
        timerSeconds: 3,
      },
      {
        name: "Standing hip flexion (marching)",
        how: "Stand holding a worktop. Lift one knee up in front of you towards hip height, or as high as is comfortable, keeping your back upright. Lower slowly and alternate legs. Easier: seated marching.",
        dose: "8 to 12 each side.",
        timerSeconds: 0,
      },
    ],
    safety:
      "Mild discomfort up to about 4 out of 10 that settles within 24 hours is usually fine. Stop that session if you get sharp or catching pain, the hip gives way, or new swelling lasts overnight. Get urgent same-day help for a hot, red, swollen joint with fever, or a painful, swollen calf.",
  },
  {
    joint: "Hands",
    steps: [
      {
        name: "Fist-to-fan",
        how: "Gently close your fingers into a loose fist, then open and spread them wide like a fan. Move slowly through a comfortable range.",
        dose: "Part of a daily 5-minute hand routine.",
        timerSeconds: 0,
      },
      {
        name: "Finger-to-thumb touches",
        how: "Touch the tip of each finger to your thumb in turn, making an 'O' shape, then open the hand back out.",
        dose: "Part of a daily 5-minute hand routine.",
        timerSeconds: 0,
      },
      {
        name: "Gentle putty squeezes",
        how: "Squeeze a soft ball of hand putty (or a soft sponge) gently, hold briefly, and release. Keep the squeeze comfortable, not maximum effort.",
        dose: "Part of a daily 5-minute hand routine.",
        timerSeconds: 5,
      },
    ],
    safety:
      "Keep every movement within a comfortable range and do not overload inflamed joints. Stop if you get sharp pain, and ask a physiotherapist or your GP before starting if your hands are hot, red and swollen or you have inflammatory arthritis that is not settled.",
  },
  {
    joint: "Spine (neck)",
    steps: [
      {
        name: "Chin tucks",
        how: "Sit tall. Without tilting your head, gently draw your chin straight back as if making a double chin. Keep your eyes level, hold, then release.",
        dose: "Hold 3 seconds; 2 sets of 10, twice daily.",
        timerSeconds: 3,
      },
      {
        name: "Slow neck rotations",
        how: "Looking forward, slowly turn your head to one side as far as is comfortable, hold 2 seconds, return to centre, then turn to the other side. Stay within a pain-free range.",
        dose: "8 turns each side, once or twice daily.",
        timerSeconds: 2,
      },
      {
        name: "Shoulder rolls",
        how: "Lift both shoulders towards your ears, roll them back and down in a smooth circle. Reverse direction halfway through.",
        dose: "10 rolls each direction.",
        timerSeconds: 0,
      },
    ],
    safety:
      "Stop any movement that causes sharp pain, dizziness or symptoms travelling into the arms. Seek medical advice if you have numbness, weakness, balance changes or pain that wakes you at night - these need proper assessment, not exercise alone.",
  },
  {
    joint: "Shoulder",
    steps: [
      {
        name: "Pendulum swings",
        how: "Lean forward, supporting yourself with the good arm on a table. Let the sore arm hang and swing it gently in small circles. This uses gravity rather than muscle to open the joint space.",
        dose: "30 seconds each direction.",
        timerSeconds: 30,
      },
      {
        name: "Table slides",
        how: "Sit at a table with your forearm resting on a cloth. Slide the arm forward as far as comfortable, then back.",
        dose: "10 repetitions.",
        timerSeconds: 0,
      },
      {
        name: "Wall walks",
        how: "Face a wall, walk your fingers up it as high as is comfortable, hold 5 seconds, then walk back down.",
        dose: "8 repetitions.",
        timerSeconds: 5,
      },
    ],
    safety:
      "Move slowly; you are not stretching to the point of pain. Mild discomfort that settles within 24 hours is usually fine. Stop if you get sharp pain, and seek medical advice promptly if the shoulder is hot, red and swollen, you feel feverish, or you cannot lift the arm at all after an injury.",
  },
];
