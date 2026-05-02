import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, Clock, RotateCcw, Activity } from "lucide-react";

interface Exercise {
  name: string;
  duration: string;
  reps: string;
  description: string;
}

interface JointData {
  id: string;
  label: string;
  exercises: Exercise[];
  tip: string;
}

const jointDatabase: Record<string, JointData> = {
  neck: {
    id: "neck",
    label: "Neck",
    tip: "Gentle movements help relieve stiffness. Never force through pain.",
    exercises: [
      { name: "Chin Tucks", duration: "30 sec", reps: "10 reps", description: "Gently draw your chin straight back, creating a \"double chin\" position. Hold for 3 seconds, then release. Strengthens the deep cervical flexors and helps correct forward head posture — a common contributor to neck pain." },
      { name: "Neck Side Bends", duration: "1 min", reps: "8 each side", description: "Slowly tilt your ear toward your shoulder, stretching the opposite side of the neck. Hold for 5 seconds each side. Improves lateral flexibility and relieves tension in the upper trapezius and scalene muscles." },
      { name: "Neck Rotations", duration: "1 min", reps: "6 each side", description: "Slowly turn your head to look over each shoulder, holding for 3 seconds at end of range. Maintains rotational mobility in the cervical spine, often restricted in cervical spondylosis." },
    ],
  },
  shoulder: {
    id: "shoulder",
    label: "Shoulders",
    tip: "Warm up with pendulum swings before exercises. Ice after if sore.",
    exercises: [
      { name: "Pendulum Swings", duration: "1 min", reps: "10 circles", description: "Lean forward with one hand on a table, letting the other arm hang freely. Swing in small, gentle circles. This uses gravity to mobilise the glenohumeral joint without muscular effort — ideal for frozen shoulder recovery." },
      { name: "Wall Slides", duration: "2 min", reps: "10 reps", description: "Stand facing a wall with forearms and palms against it. Slowly slide hands upward as high as comfortable. Improves shoulder flexion and scapular control while strengthening the serratus anterior." },
      { name: "Shoulder Shrugs", duration: "1 min", reps: "12 reps", description: "Raise both shoulders toward your ears, hold the tension for 3 seconds, then slowly relax. Relieves upper trapezius tension and improves blood flow to the neck and shoulders." },
      { name: "Cross-Body Stretch", duration: "1 min", reps: "3 each side", description: "Pull one arm gently across your chest at shoulder height with the opposite hand. Hold for 15 seconds. Improves posterior shoulder flexibility — often restricted in shoulder arthritis or rotator cuff issues." },
    ],
  },
  elbow: {
    id: "elbow",
    label: "Elbows",
    tip: "Avoid gripping objects tightly. Use adaptive aids when possible.",
    exercises: [
      { name: "Wrist Curls", duration: "2 min", reps: "12 reps", description: "Rest your forearm on a table with palm facing upward. Slowly curl a light dumbbell (0.5–2kg) up, then lower with control. Strengthens wrist flexors and forearm muscles, improving grip strength for daily tasks." },
      { name: "Elbow Flexion/Extension", duration: "1 min", reps: "10 reps", description: "Slowly bend your elbow bringing your hand toward your shoulder, then straighten fully. Add light resistance as tolerated. Maintains full range of motion and strengthens the biceps and triceps." },
      { name: "Towel Twist", duration: "1 min", reps: "10 reps", description: "Hold a rolled towel with both hands and wring it in each direction. Strengthens forearm rotators and grip muscles — essential for everyday activities like turning door handles and carrying bags." },
    ],
  },
  wrist: {
    id: "wrist",
    label: "Wrists & Hands",
    tip: "Soak hands in warm water for 10 minutes before exercising.",
    exercises: [
      { name: "Finger Spreads", duration: "1 min", reps: "10 reps", description: "Spread all fingers as wide apart as possible, hold for 5 seconds, then slowly close into a gentle fist. Maintains finger joint range of motion and strengthens the intrinsic hand muscles." },
      { name: "Wrist Circles", duration: "1 min", reps: "10 each way", description: "Rotate your wrists slowly in full circles — both clockwise and anticlockwise. Improves synovial fluid distribution, reduces morning stiffness, and maintains range of motion needed for typing and cooking." },
      { name: "Thumb Touches", duration: "1 min", reps: "10 reps", description: "Touch the tip of your thumb to each fingertip in turn, making an \"O\" shape each time. Exercises the opponens pollicis, maintaining the precision grip needed for buttons, zips, and writing." },
      { name: "Prayer Stretch", duration: "30 sec", reps: "3 holds", description: "Press your palms together at chest level in a prayer position. Slowly lower your hands while keeping palms together until you feel a stretch. Excellent for carpal tunnel relief and wrist extension range." },
    ],
  },
  hip: {
    id: "hip",
    label: "Hips",
    tip: "Always warm up before hip exercises. Avoid deep squats if painful.",
    exercises: [
      { name: "Hip Circles", duration: "1 min", reps: "10 each way", description: "Stand on one leg (holding a chair for support), and gently circle the other leg in small, controlled circles. Improves hip joint mobility and activates the deep hip rotators." },
      { name: "Seated Marching", duration: "2 min", reps: "20 reps", description: "Sit upright in a sturdy chair and march your knees up one at a time, keeping your core engaged. This low-impact exercise strengthens hip flexors and improves circulation." },
      { name: "Clamshells", duration: "2 min", reps: "12 each side", description: "Lie on your side with knees bent at 45 degrees. Keeping feet together, open the top knee like a clamshell. Targets the gluteus medius — a key stabiliser that, when weak, contributes to hip and knee pain." },
      { name: "Standing Hip Abduction", duration: "2 min", reps: "10 each side", description: "Stand holding a chair for balance. Lift one leg straight out to the side, keeping your body upright. Strengthens hip abductors, critical for walking stability and reducing compensatory knee stress." },
    ],
  },
  knee: {
    id: "knee",
    label: "Knees",
    tip: "Low-impact activities like swimming and cycling are great for knee arthritis.",
    exercises: [
      { name: "Seated Leg Extensions", duration: "2 min", reps: "12 each leg", description: "Sit in a chair with feet flat. Slowly straighten one leg, hold for 3 seconds at the top, then lower with control. Strengthens the quadriceps — the primary muscle group supporting the knee joint." },
      { name: "Step-Ups", duration: "2 min", reps: "10 each leg", description: "Use a low step (10–15cm). Step up leading with one leg, bring the other up, then step back down. Strengthens quadriceps, glutes, and calf muscles for functional stair climbing." },
      { name: "Quad Sets", duration: "2 min", reps: "10 reps", description: "Sit with your leg straight. Tighten your thigh muscle firmly, pressing the back of your knee into the surface. Hold for 5 seconds. This isometric exercise strengthens the quadriceps without moving the knee — ideal during flare-ups." },
      { name: "Hamstring Curls", duration: "2 min", reps: "10 each leg", description: "Stand holding a chair, slowly bend one knee bringing your heel toward your bottom. Strengthens the hamstrings, which work alongside quadriceps to support and protect the knee joint." },
    ],
  },
  ankle: {
    id: "ankle",
    label: "Ankles & Feet",
    tip: "Supportive footwear makes a big difference. Consider orthotic insoles.",
    exercises: [
      { name: "Ankle Circles", duration: "1 min", reps: "10 each way", description: "Lift foot off the floor and rotate ankle in smooth, controlled circles — both clockwise and anticlockwise. Improves synovial fluid circulation and maintains range of motion in the talocrural joint." },
      { name: "Toe Raises", duration: "1 min", reps: "12 reps", description: "Stand holding a chair or wall for balance, rise slowly onto your toes, hold for 3 seconds, then lower with control. Strengthens the gastrocnemius and soleus, supporting ankle stability." },
      { name: "Towel Scrunches", duration: "1 min", reps: "10 reps", description: "Place a small towel flat on the floor. Using only your toes, scrunch and pull it toward you. Strengthens intrinsic foot muscles and improves arch support — beneficial for flat feet alongside arthritis." },
      { name: "Heel-Toe Walks", duration: "2 min", reps: "2 lengths", description: "Walk in a straight line placing the heel of one foot directly in front of the toes of the other. Improves proprioception, balance, and ankle stability — reducing fall risk for those with lower limb arthritis." },
    ],
  },
  spine: {
    id: "spine",
    label: "Spine & Back",
    tip: "Keep movements slow and controlled. Stop if you feel sharp pain.",
    exercises: [
      { name: "Cat-Cow Stretch", duration: "1 min", reps: "8 reps", description: "On all fours, slowly arch your back toward the ceiling (cat), then gently dip it toward the floor (cow). Mobilises the entire spinal column and is recommended by NICE for chronic low back pain." },
      { name: "Pelvic Tilts", duration: "1 min", reps: "10 reps", description: "Lie on your back with knees bent and feet flat. Gently flatten your lower back into the floor by tilting your pelvis, hold for 5 seconds. Activates the deep core stabilisers that protect the lumbar spine." },
      { name: "Knee-to-Chest", duration: "2 min", reps: "3 each side", description: "Lie on your back and gently pull one knee toward your chest, holding with both hands for 20 seconds. Stretches hip flexors, lower back extensors, and glutes — effective for sacroiliac joint stiffness." },
      { name: "Seated Rotation", duration: "1 min", reps: "6 each side", description: "Sit upright in a chair, cross your arms, and slowly rotate your torso to look behind you. Hold for 5 seconds each side. Improves thoracic spine rotation — often restricted in ankylosing spondylitis." },
    ],
  },
};
/* ── Anatomical humanoid SVG with clickable joint regions ── */

interface JointPart {
  id: string;
  label: string;
  /** SVG path or shape props for the clickable joint region */
  shape: "circle" | "ellipse" | "path";
  /** circle/ellipse coords */
  cx?: number;
  cy?: number;
  r?: number;
  rx?: number;
  ry?: number;
  /** path d attribute */
  d?: string;
  /** position for the floating label */
  labelX: number;
  labelY: number;
  labelAnchor?: "start" | "middle" | "end";
}

const HUMANOID_JOINTS: JointPart[] = [
  // Head / neck
  { id: "neck", label: "Neck", shape: "ellipse", cx: 100, cy: 56, rx: 12, ry: 7, labelX: 142, labelY: 56, labelAnchor: "start" },
  // Shoulders
  { id: "shoulder", label: "Shoulders", shape: "circle", cx: 70, cy: 80, r: 10, labelX: 22, labelY: 80, labelAnchor: "end" },
  // Elbows
  { id: "elbow", label: "Elbows", shape: "circle", cx: 52, cy: 130, r: 8, labelX: 22, labelY: 130, labelAnchor: "end" },
  // Wrists & Hands
  { id: "wrist", label: "Wrists & Hands", shape: "circle", cx: 40, cy: 180, r: 8, labelX: 22, labelY: 180, labelAnchor: "end" },
  // Spine (torso)
  { id: "spine", label: "Spine & Back", shape: "path", d: "M 92 95 L 108 95 L 110 165 L 90 165 Z", labelX: 178, labelY: 130, labelAnchor: "start" },
  // Hips
  { id: "hip", label: "Hips", shape: "ellipse", cx: 100, cy: 175, rx: 22, ry: 10, labelX: 178, labelY: 175, labelAnchor: "start" },
  // Knees
  { id: "knee", label: "Knees", shape: "circle", cx: 88, cy: 250, r: 9, labelX: 22, labelY: 250, labelAnchor: "end" },
  // Ankles & Feet
  { id: "ankle", label: "Ankles & Feet", shape: "circle", cx: 86, cy: 325, r: 8, labelX: 22, labelY: 325, labelAnchor: "end" },
];

/** Mirror coords for the right side of the body where applicable */
const mirroredX = (x: number) => 200 - x;

const Humanoid = memo(({ activeJoint, onJointClick }: {
  activeJoint: string | null;
  onJointClick: (id: string) => void;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const renderJointShape = (p: JointPart, mirror = false) => {
    const isActive = activeJoint === p.id;
    const isHover = hovered === p.id;
    const fill = isActive
      ? "url(#jointActiveGrad)"
      : isHover
        ? "hsl(180 70% 50% / 0.85)"
        : "hsl(180 60% 50% / 0.55)";
    const stroke = isActive ? "hsl(0 0% 100%)" : "hsl(180 70% 35% / 0.6)";
    const strokeWidth = isActive ? 2 : 1.2;

    const commonProps = {
      fill,
      stroke,
      strokeWidth,
      style: {
        cursor: "pointer",
        filter: isActive
          ? "drop-shadow(0 0 8px hsl(180 70% 50% / 0.7))"
          : isHover
            ? "drop-shadow(0 0 4px hsl(180 70% 50% / 0.5))"
            : "none",
        transition: "all 0.25s ease",
      } as React.CSSProperties,
      onClick: () => onJointClick(p.id),
      onMouseEnter: () => setHovered(p.id),
      onMouseLeave: () => setHovered(null),
      role: "button",
      tabIndex: 0,
      "aria-label": `Exercise plan for ${p.label}`,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onJointClick(p.id);
        }
      },
    };

    if (p.shape === "circle") {
      return <circle cx={mirror ? mirroredX(p.cx!) : p.cx} cy={p.cy} r={p.r} {...commonProps} />;
    }
    if (p.shape === "ellipse") {
      return <ellipse cx={mirror ? mirroredX(p.cx!) : p.cx} cy={p.cy} rx={p.rx} ry={p.ry} {...commonProps} />;
    }
    return <path d={p.d} {...commonProps} />;
  };

  // Joints that have left/right pairs
  const paired = new Set(["shoulder", "elbow", "wrist", "knee", "ankle"]);

  return (
    <svg
      viewBox="0 0 200 360"
      className="w-full h-auto select-none"
      role="img"
      aria-label="Interactive human body — click a joint to see its exercise plan"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 30% 96%)" />
          <stop offset="100%" stopColor="hsl(220 25% 88%)" />
        </linearGradient>
        <linearGradient id="bodyGradDark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(220 15% 22%)" />
          <stop offset="100%" stopColor="hsl(220 15% 16%)" />
        </linearGradient>
        <linearGradient id="jointActiveGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(180 75% 50%)" />
          <stop offset="100%" stopColor="hsl(200 80% 55%)" />
        </linearGradient>
        <radialGradient id="bodyShade" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="hsl(0 0% 100% / 0.4)" />
          <stop offset="100%" stopColor="hsl(0 0% 100% / 0)" />
        </radialGradient>
      </defs>

      {/* === HUMANOID BODY === */}
      <g className="text-foreground">
        {/* Head */}
        <ellipse cx="100" cy="30" rx="18" ry="22" fill="url(#bodyGrad)" stroke="hsl(220 15% 75%)" strokeWidth="1" className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]" />
        {/* Neck stem */}
        <rect x="93" y="48" width="14" height="12" rx="3" fill="url(#bodyGrad)" stroke="hsl(220 15% 75%)" strokeWidth="1" className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]" />
        {/* Torso */}
        <path
          d="M 70 70 Q 70 65 78 63 L 122 63 Q 130 65 130 70 L 132 165 Q 132 175 125 178 L 75 178 Q 68 175 68 165 Z"
          fill="url(#bodyGrad)"
          stroke="hsl(220 15% 75%)"
          strokeWidth="1.2"
          className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]"
        />
        {/* Pelvis */}
        <path
          d="M 75 175 L 125 175 Q 130 195 122 205 L 110 205 L 105 195 L 95 195 L 90 205 L 78 205 Q 70 195 75 175 Z"
          fill="url(#bodyGrad)"
          stroke="hsl(220 15% 75%)"
          strokeWidth="1.2"
          className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]"
        />
        {/* Left arm (upper) */}
        <path d="M 65 78 Q 56 80 54 90 L 48 128" stroke="hsl(220 15% 75%)" strokeWidth="14" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 65 78 Q 56 80 54 90 L 48 128" stroke="url(#bodyGrad)" strokeWidth="11" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Left forearm */}
        <path d="M 50 132 L 42 178" stroke="hsl(220 15% 75%)" strokeWidth="12" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 50 132 L 42 178" stroke="url(#bodyGrad)" strokeWidth="9" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Left hand */}
        <ellipse cx="40" cy="190" rx="7" ry="11" fill="url(#bodyGrad)" stroke="hsl(220 15% 75%)" strokeWidth="1" className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]" />

        {/* Right arm (upper) */}
        <path d="M 135 78 Q 144 80 146 90 L 152 128" stroke="hsl(220 15% 75%)" strokeWidth="14" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 135 78 Q 144 80 146 90 L 152 128" stroke="url(#bodyGrad)" strokeWidth="11" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Right forearm */}
        <path d="M 150 132 L 158 178" stroke="hsl(220 15% 75%)" strokeWidth="12" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 150 132 L 158 178" stroke="url(#bodyGrad)" strokeWidth="9" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Right hand */}
        <ellipse cx="160" cy="190" rx="7" ry="11" fill="url(#bodyGrad)" stroke="hsl(220 15% 75%)" strokeWidth="1" className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]" />

        {/* Left thigh */}
        <path d="M 88 200 L 84 250" stroke="hsl(220 15% 75%)" strokeWidth="20" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 88 200 L 84 250" stroke="url(#bodyGrad)" strokeWidth="17" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Left shin */}
        <path d="M 86 254 L 84 320" stroke="hsl(220 15% 75%)" strokeWidth="16" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 86 254 L 84 320" stroke="url(#bodyGrad)" strokeWidth="13" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Left foot */}
        <ellipse cx="78" cy="338" rx="14" ry="7" fill="url(#bodyGrad)" stroke="hsl(220 15% 75%)" strokeWidth="1" className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]" />

        {/* Right thigh */}
        <path d="M 112 200 L 116 250" stroke="hsl(220 15% 75%)" strokeWidth="20" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 112 200 L 116 250" stroke="url(#bodyGrad)" strokeWidth="17" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Right shin */}
        <path d="M 114 254 L 116 320" stroke="hsl(220 15% 75%)" strokeWidth="16" strokeLinecap="round" fill="none" className="dark:stroke-[hsl(220_15%_30%)]" />
        <path d="M 114 254 L 116 320" stroke="url(#bodyGrad)" strokeWidth="13" strokeLinecap="round" fill="none" className="dark:stroke-[url(#bodyGradDark)]" />
        {/* Right foot */}
        <ellipse cx="122" cy="338" rx="14" ry="7" fill="url(#bodyGrad)" stroke="hsl(220 15% 75%)" strokeWidth="1" className="dark:fill-[url(#bodyGradDark)] dark:stroke-[hsl(220_10%_35%)]" />

        {/* Subtle highlight overlay */}
        <ellipse cx="100" cy="120" rx="60" ry="120" fill="url(#bodyShade)" pointerEvents="none" />
      </g>

      {/* === CLICKABLE JOINTS === */}
      <g>
        {HUMANOID_JOINTS.map((p) => (
          <g key={p.id}>
            {renderJointShape(p, false)}
            {paired.has(p.id) && renderJointShape(p, true)}
            {/* Pulse for active */}
            {activeJoint === p.id && p.shape === "circle" && (
              <>
                <circle cx={p.cx} cy={p.cy} r={p.r! + 4} fill="none" stroke="hsl(180 70% 50% / 0.6)" strokeWidth="1.5">
                  <animate attributeName="r" from={p.r} to={p.r! + 10} dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                {paired.has(p.id) && (
                  <circle cx={mirroredX(p.cx!)} cy={p.cy} r={p.r! + 4} fill="none" stroke="hsl(180 70% 50% / 0.6)" strokeWidth="1.5">
                    <animate attributeName="r" from={p.r} to={p.r! + 10} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </>
            )}
          </g>
        ))}
      </g>

      {/* === LABELS WITH CONNECTOR LINES === */}
      <g pointerEvents="none">
        {HUMANOID_JOINTS.map((p) => {
          const isActive = activeJoint === p.id;
          const startX = p.shape === "circle" ? p.cx! : p.shape === "ellipse" ? p.cx! : 100;
          const startY = p.shape === "circle" ? p.cy! : p.shape === "ellipse" ? p.cy! : p.labelY;
          return (
            <g key={`label-${p.id}`} opacity={isActive || hovered === p.id ? 1 : 0.7}>
              <line
                x1={startX}
                y1={startY}
                x2={p.labelX}
                y2={p.labelY}
                stroke={isActive ? "hsl(180 70% 45%)" : "hsl(220 10% 60%)"}
                strokeWidth="0.6"
                strokeDasharray="2 2"
              />
              <text
                x={p.labelX}
                y={p.labelY + 3}
                fontSize="9"
                fontWeight={isActive ? 700 : 600}
                textAnchor={p.labelAnchor || "middle"}
                fill={isActive ? "hsl(180 70% 35%)" : "hsl(var(--foreground))"}
                className="font-display"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
});
Humanoid.displayName = "Humanoid";



/* ── Exercise Panel ── */

const ExercisePanel = memo(({ joint, onClose }: { joint: JointData; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 30 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="rounded-2xl border border-border/30 shadow-xl overflow-hidden backdrop-blur-sm"
    style={{ background: "hsl(var(--card))" }}
  >
    {/* Header with teal gradient */}
    <div className="p-5 relative" style={{ background: "linear-gradient(135deg, hsl(180 70% 40%), hsl(200 75% 45%))" }}>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white/90 hover:text-white"
        style={{ background: "hsl(0 0% 100% / 0.2)" }}
        aria-label="Close exercise panel"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: "hsl(0 0% 100% / 0.2)" }}>
          <Activity className="w-5 h-5" />
        </div>
        <div className="text-white">
          <h3 className="text-xl font-display font-bold">{joint.label}</h3>
          <p className="text-white/80 text-xs">Home Exercise Plan</p>
        </div>
      </div>
      <p className="text-white/70 text-sm mt-2 leading-relaxed">💡 {joint.tip}</p>
    </div>

    <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
      {joint.exercises.map((ex, i) => (
        <motion.div
          key={ex.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="group p-4 rounded-xl bg-accent/50 hover:bg-accent border border-border/30 hover:border-border/60 transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(180 70% 45%), hsl(200 75% 50%))" }}
            >
              {i + 1}
            </span>
            <h4 className="font-semibold text-foreground text-sm">{ex.name}</h4>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed mb-2 ml-8">{ex.description}</p>
          <div className="flex gap-3 ml-8">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: "hsl(180 70% 35%)", background: "hsl(180 70% 45% / 0.1)" }}>
              <Clock className="w-3 h-3" /> {ex.duration}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              <RotateCcw className="w-3 h-3" /> {ex.reps}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="p-4 border-t border-border/50 bg-accent/30">
      <p className="text-[11px] text-muted-foreground text-center">
        Always consult your physiotherapist before starting a new exercise programme.
      </p>
    </div>
  </motion.div>
));

ExercisePanel.displayName = "ExercisePanel";

/* ── Main Section ── */

const JointExerciseSection = memo(() => {
  const [activeJoint, setActiveJoint] = useState<string | null>(null);

  const handleJointClick = useCallback((jointId: string) => {
    setActiveJoint((prev) => (prev === jointId ? null : jointId));
  }, []);

  const activeData = activeJoint ? jointDatabase[activeJoint] : null;

  return (
    <section id="joint-exercises" className="py-14 lg:py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
            Choose an area
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Click a joint on the body to get a home exercise plan
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Body silhouette with gradient overlay and joint markers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[340px]">
              {/* Subtle gradient backdrop for premium feel */}
              <div
                className="absolute inset-0 rounded-3xl -m-4 opacity-40"
                style={{
                  background: "radial-gradient(ellipse at center 30%, hsl(200 80% 90% / 0.6), transparent 70%)",
                }}
              />
              <Humanoid activeJoint={activeJoint} onJointClick={handleJointClick} />
            </div>
          </motion.div>

          {/* Exercise panel */}
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeData ? (
                <ExercisePanel
                  key={activeData.id}
                  joint={activeData}
                  onClose={() => setActiveJoint(null)}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-border/50 bg-background/50 max-w-md mx-auto backdrop-blur-sm">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{ background: "linear-gradient(135deg, hsl(180 70% 45% / 0.15), hsl(200 80% 50% / 0.1))" }}
                    >
                      <Dumbbell className="w-8 h-8" style={{ color: "hsl(180 70% 40%)" }} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Select a Joint
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Click on any joint marker on the body to view a personalised home exercise plan.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});

JointExerciseSection.displayName = "JointExerciseSection";
export default JointExerciseSection;
