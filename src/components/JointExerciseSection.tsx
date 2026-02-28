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
      { name: "Chin Tucks", duration: "30 sec", reps: "10 reps", description: "Gently draw chin back, creating a double chin. Hold 3 seconds." },
      { name: "Neck Side Bends", duration: "1 min", reps: "8 each side", description: "Slowly tilt ear toward shoulder, hold 5 seconds each side." },
      { name: "Neck Rotations", duration: "1 min", reps: "6 each side", description: "Slowly turn head to look over each shoulder, hold 3 seconds." },
    ],
  },
  shoulder: {
    id: "shoulder",
    label: "Shoulders",
    tip: "Warm up with pendulum swings before exercises. Ice after if sore.",
    exercises: [
      { name: "Pendulum Swings", duration: "1 min", reps: "10 circles", description: "Lean forward, let arm hang and swing in small circles." },
      { name: "Wall Slides", duration: "2 min", reps: "10 reps", description: "Stand facing wall, slide hands up keeping elbows and wrists in contact." },
      { name: "Shoulder Shrugs", duration: "1 min", reps: "12 reps", description: "Raise shoulders to ears, hold 3 seconds, slowly lower." },
      { name: "Cross-Body Stretch", duration: "1 min", reps: "3 each side", description: "Pull one arm across chest with opposite hand. Hold 15 seconds." },
    ],
  },
  elbow: {
    id: "elbow",
    label: "Elbows",
    tip: "Avoid gripping objects tightly. Use adaptive aids when possible.",
    exercises: [
      { name: "Wrist Curls", duration: "2 min", reps: "12 reps", description: "Rest forearm on table, palm up. Curl a light weight up and down." },
      { name: "Elbow Flexion/Extension", duration: "1 min", reps: "10 reps", description: "Slowly bend and straighten elbow fully. Use light resistance if tolerated." },
      { name: "Towel Twist", duration: "1 min", reps: "10 reps", description: "Hold towel with both hands, wring it out in each direction." },
    ],
  },
  wrist: {
    id: "wrist",
    label: "Wrists & Hands",
    tip: "Soak hands in warm water for 10 minutes before exercising.",
    exercises: [
      { name: "Finger Spreads", duration: "1 min", reps: "10 reps", description: "Spread fingers wide apart, hold 5 seconds, then make a fist." },
      { name: "Wrist Circles", duration: "1 min", reps: "10 each way", description: "Rotate wrists slowly in circles, both clockwise and anticlockwise." },
      { name: "Thumb Touches", duration: "1 min", reps: "10 reps", description: "Touch thumb to each fingertip, making an O shape each time." },
      { name: "Prayer Stretch", duration: "30 sec", reps: "3 holds", description: "Press palms together at chest level, lower hands keeping palms together." },
    ],
  },
  hip: {
    id: "hip",
    label: "Hips",
    tip: "Always warm up before hip exercises. Avoid deep squats if painful.",
    exercises: [
      { name: "Hip Circles", duration: "1 min", reps: "10 each way", description: "Stand on one leg (hold support), circle other leg gently." },
      { name: "Seated Marching", duration: "2 min", reps: "20 reps", description: "Sit upright, march knees up one at a time. Keep core engaged." },
      { name: "Clamshells", duration: "2 min", reps: "12 each side", description: "Lie on side, knees bent. Open top knee like a clamshell, keep feet together." },
      { name: "Standing Hip Abduction", duration: "2 min", reps: "10 each side", description: "Stand holding chair, lift leg out to side. Keep body upright." },
    ],
  },
  knee: {
    id: "knee",
    label: "Knees",
    tip: "Low-impact activities like swimming and cycling are great for knee arthritis.",
    exercises: [
      { name: "Seated Leg Extensions", duration: "2 min", reps: "12 each leg", description: "Sit in chair, slowly straighten one leg. Hold 3 seconds at top." },
      { name: "Step-Ups", duration: "2 min", reps: "10 each leg", description: "Use a low step. Step up and down slowly, leading with each leg." },
      { name: "Quad Sets", duration: "2 min", reps: "10 reps", description: "Sit with leg straight. Tighten thigh muscle, pushing knee into floor. Hold 5 sec." },
      { name: "Hamstring Curls", duration: "2 min", reps: "10 each leg", description: "Stand holding chair, slowly bend knee bringing heel toward bottom." },
    ],
  },
  ankle: {
    id: "ankle",
    label: "Ankles & Feet",
    tip: "Supportive footwear makes a big difference. Consider orthotic insoles.",
    exercises: [
      { name: "Ankle Circles", duration: "1 min", reps: "10 each way", description: "Lift foot off floor, rotate ankle in circles both directions." },
      { name: "Toe Raises", duration: "1 min", reps: "12 reps", description: "Stand holding support, rise onto toes slowly. Hold 3 seconds." },
      { name: "Towel Scrunches", duration: "1 min", reps: "10 reps", description: "Place towel on floor, scrunch it toward you using only toes." },
      { name: "Heel-Toe Walks", duration: "2 min", reps: "2 lengths", description: "Walk heel-to-toe in a straight line for balance and ankle strength." },
    ],
  },
  spine: {
    id: "spine",
    label: "Spine & Back",
    tip: "Keep movements slow and controlled. Stop if you feel sharp pain.",
    exercises: [
      { name: "Cat-Cow Stretch", duration: "1 min", reps: "8 reps", description: "On all fours, arch back up (cat) then dip it down (cow). Move slowly." },
      { name: "Pelvic Tilts", duration: "1 min", reps: "10 reps", description: "Lie on back, knees bent. Flatten lower back into floor, hold 5 sec." },
      { name: "Knee-to-Chest", duration: "2 min", reps: "3 each side", description: "Lie on back, pull one knee to chest. Hold 20 seconds." },
      { name: "Seated Rotation", duration: "1 min", reps: "6 each side", description: "Sit upright, rotate torso to look behind you. Hold 5 seconds." },
    ],
  },
};

/* ── Anatomical SVG body ── */

const BodySVG = memo(() => (
  <svg
    viewBox="0 0 200 520"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bodyGrad" x1="100" y1="0" x2="100" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id="strokeGrad" x1="100" y1="0" x2="100" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
      </linearGradient>
    </defs>

    {/* Head */}
    <ellipse cx="100" cy="38" rx="22" ry="28" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.5" />
    
    {/* Neck */}
    <rect x="92" y="64" width="16" height="16" rx="4" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Torso */}
    <path
      d="M62 80 Q60 82 58 100 Q54 140 58 180 Q60 200 68 210 L80 215 Q90 218 100 218 Q110 218 120 215 L132 210 Q140 200 142 180 Q146 140 142 100 Q140 82 138 80 Z"
      fill="url(#bodyGrad)"
      stroke="url(#strokeGrad)"
      strokeWidth="1.5"
    />

    {/* Spine line (subtle) */}
    <line x1="100" y1="80" x2="100" y2="210" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3 3" />

    {/* Left upper arm */}
    <path d="M58 88 Q44 95 36 130 Q34 142 36 148" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M62 92 Q50 98 42 130 Q40 142 42 148" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M58 88 Q60 90 62 92" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.2" />
    <path d="M36 148 Q38 149 42 148" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Left forearm */}
    <path d="M36 152 Q32 180 28 200 Q26 210 24 218" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M42 152 Q38 180 34 200 Q32 210 30 218" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Left hand */}
    <ellipse cx="27" cy="224" rx="7" ry="10" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Right upper arm */}
    <path d="M142 88 Q156 95 164 130 Q166 142 164 148" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M138 92 Q150 98 158 130 Q160 142 158 148" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M142 88 Q140 90 138 92" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.2" />
    <path d="M164 148 Q162 149 158 148" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Right forearm */}
    <path d="M164 152 Q168 180 172 200 Q174 210 176 218" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M158 152 Q162 180 166 200 Q168 210 170 218" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right hand */}
    <ellipse cx="173" cy="224" rx="7" ry="10" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Pelvis */}
    <path
      d="M68 210 Q72 230 78 240 L84 250 Q92 258 100 260 Q108 258 116 250 L122 240 Q128 230 132 210"
      fill="url(#bodyGrad)"
      stroke="url(#strokeGrad)"
      strokeWidth="1.5"
    />

    {/* Left thigh */}
    <path d="M82 252 Q78 280 76 310 Q74 330 76 340" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M90 256 Q86 280 84 310 Q82 330 84 340" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M76 340 Q78 342 84 340" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Left shin */}
    <path d="M76 346 Q74 380 74 410 Q74 430 76 440" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M84 346 Q82 380 82 410 Q82 430 84 440" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Left foot */}
    <path d="M74 442 Q72 450 68 458 Q66 462 64 464 Q70 470 80 470 Q86 470 88 464 Q86 456 84 448 Q84 444 84 442" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Right thigh */}
    <path d="M118 252 Q122 280 124 310 Q126 330 124 340" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M110 256 Q114 280 116 310 Q118 330 116 340" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M124 340 Q122 342 116 340" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Right shin */}
    <path d="M124 346 Q126 380 126 410 Q126 430 124 440" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M116 346 Q118 380 118 410 Q118 430 116 440" fill="none" stroke="url(#strokeGrad)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right foot */}
    <path d="M126 442 Q128 450 132 458 Q134 462 136 464 Q130 470 120 470 Q114 470 112 464 Q114 456 116 448 Q116 444 116 442" fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" />

    {/* Joint circles (anatomical markers) */}
    {/* Neck */}
    <circle cx="100" cy="72" r="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Shoulders */}
    <circle cx="58" cy="88" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    <circle cx="142" cy="88" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Elbows */}
    <circle cx="38" cy="150" r="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    <circle cx="162" cy="150" r="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Wrists */}
    <circle cx="27" cy="218" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    <circle cx="173" cy="218" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Hips */}
    <circle cx="80" cy="245" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    <circle cx="120" cy="245" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Knees */}
    <circle cx="80" cy="343" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    <circle cx="120" cy="343" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Ankles */}
    <circle cx="80" cy="442" r="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    <circle cx="120" cy="442" r="3.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Spine mid */}
    <circle cx="100" cy="150" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.3" />
  </svg>
));

BodySVG.displayName = "BodySVG";

/* ── Joint hotspot markers positioned over the SVG ── */

interface JointMarker {
  id: string;
  label: string;
  /* percentages relative to the SVG viewBox mapped to the container */
  top: string;
  left: string;
  labelSide?: "left" | "right";
}

const jointMarkers: JointMarker[] = [
  { id: "neck",     label: "Neck",            top: "13.8%", left: "50%"  },
  { id: "shoulder", label: "L Shoulder",       top: "17%",   left: "29%",  labelSide: "left" },
  { id: "shoulder", label: "R Shoulder",       top: "17%",   left: "71%",  labelSide: "right" },
  { id: "elbow",    label: "L Elbow",          top: "28.8%", left: "19%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",          top: "28.8%", left: "81%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",          top: "42%",   left: "13.5%", labelSide: "left" },
  { id: "wrist",    label: "R Wrist",          top: "42%",   left: "86.5%", labelSide: "right" },
  { id: "spine",    label: "Spine",            top: "28.8%", left: "50%"  },
  { id: "hip",      label: "L Hip",            top: "47%",   left: "36%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",            top: "47%",   left: "64%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",           top: "66%",   left: "30%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",           top: "66%",   left: "70%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",          top: "85%",   left: "30%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",          top: "85%",   left: "70%",  labelSide: "right" },
];

/* ── Joint Dot ── */

const JointDot = memo(({ marker, isActive, onClick }: {
  marker: JointMarker;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={`Exercise plan for ${marker.label}`}
    className="absolute flex items-center gap-1 group cursor-pointer z-10"
    style={{
      top: marker.top,
      left: marker.left,
      transform: "translate(-50%, -50%)",
      flexDirection: marker.labelSide === "left" ? "row-reverse" : "row",
    }}
  >
    <span className="relative flex items-center justify-center">
      {isActive && (
        <span
          className="absolute w-7 h-7 rounded-full animate-ping"
          style={{ background: "hsl(var(--primary) / 0.2)" }}
        />
      )}
      <span
        className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 border-2"
        style={{
          background: isActive ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.7)",
          borderColor: "hsl(var(--background))",
          boxShadow: isActive
            ? "0 0 10px 3px hsl(var(--primary) / 0.4)"
            : "0 0 4px 1px hsl(var(--primary) / 0.2)",
        }}
      >
        <span className="w-1 h-1 rounded-full bg-white/90" />
      </span>
    </span>
    <span
      className={`text-[10px] font-medium whitespace-nowrap px-1.5 py-0.5 rounded transition-all duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-card/90 text-muted-foreground shadow-sm group-hover:bg-primary group-hover:text-primary-foreground"
      }`}
    >
      {marker.label}
    </span>
  </button>
));

JointDot.displayName = "JointDot";

/* ── Exercise Panel ── */

const ExercisePanel = memo(({ joint, onClose }: { joint: JointData; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden"
  >
    <div className="p-5 relative bg-primary">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors text-primary-foreground"
        aria-label="Close exercise panel"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center text-primary-foreground">
          <Activity className="w-5 h-5" />
        </div>
        <div className="text-primary-foreground">
          <h3 className="text-xl font-display font-bold">{joint.label}</h3>
          <p className="text-primary-foreground/80 text-xs">Home Exercise Plan</p>
        </div>
      </div>
      <p className="text-primary-foreground/70 text-sm mt-2 leading-relaxed">💡 {joint.tip}</p>
    </div>

    <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
      {joint.exercises.map((ex, i) => (
        <motion.div
          key={ex.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="group p-4 rounded-xl bg-accent/50 hover:bg-accent border border-border/30 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <h4 className="font-semibold text-foreground text-sm">{ex.name}</h4>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed mb-2 ml-8">{ex.description}</p>
          <div className="flex gap-3 ml-8">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
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
    <section id="joint-exercises" className="py-14 lg:py-20 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
          {/* Body silhouette with joint markers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[320px]">
              <BodySVG />
              {jointMarkers.map((marker, idx) => (
                <JointDot
                  key={`${marker.id}-${idx}`}
                  marker={marker}
                  isActive={activeJoint === marker.id}
                  onClick={() => handleJointClick(marker.id)}
                />
              ))}
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
                  <div className="text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-border/50 bg-background/50 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <Dumbbell className="w-8 h-8 text-primary" />
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
