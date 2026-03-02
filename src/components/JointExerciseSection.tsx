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

/* ── Inline SVG humanoid silhouette with visible joint landmarks ── */

const jointLandmarks = [
  { cx: 200, cy: 62,  r: 5 },   // Neck
  { cx: 140, cy: 95,  r: 5 },   // L Shoulder
  { cx: 260, cy: 95,  r: 5 },   // R Shoulder
  { cx: 105, cy: 185, r: 4.5 }, // L Elbow
  { cx: 295, cy: 185, r: 4.5 }, // R Elbow
  { cx: 78,  cy: 275, r: 4 },   // L Wrist
  { cx: 322, cy: 275, r: 4 },   // R Wrist
  { cx: 200, cy: 155, r: 5 },   // Spine
  { cx: 168, cy: 285, r: 5 },   // L Hip
  { cx: 232, cy: 285, r: 5 },   // R Hip
  { cx: 160, cy: 420, r: 5 },   // L Knee
  { cx: 240, cy: 420, r: 5 },   // R Knee
  { cx: 155, cy: 540, r: 4 },   // L Ankle
  { cx: 245, cy: 540, r: 4 },   // R Ankle
];

const BodySVG = memo(() => (
  <svg
    viewBox="0 0 400 600"
    className="w-full h-auto select-none pointer-events-none"
    aria-label="Human body diagram for joint exercises"
    role="img"
  >
    <defs>
      <linearGradient id="bodyGrad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#6FA8B8" />
        <stop offset="100%" stopColor="#3D6B7E" />
      </linearGradient>
      <filter id="bodyShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#3D6B7E" floodOpacity="0.18" />
      </filter>
    </defs>

    {/* Head */}
    <ellipse cx="200" cy="32" rx="26" ry="30" fill="url(#bodyGrad)" filter="url(#bodyShadow)" />
    
    {/* Neck */}
    <rect x="190" y="58" width="20" height="22" rx="4" fill="url(#bodyGrad)" />

    {/* Torso */}
    <path
      d="M140,80 Q135,78 130,95 L120,160 Q118,180 125,210 L135,260 Q140,280 150,290 L165,295 Q185,300 200,300 Q215,300 235,295 L250,290 Q260,280 265,260 L275,210 Q282,180 280,160 L270,95 Q265,78 260,80 Z"
      fill="url(#bodyGrad)"
      filter="url(#bodyShadow)"
    />

    {/* Left arm */}
    <path
      d="M130,95 Q120,100 110,140 L105,185 Q100,210 90,250 L78,275 Q72,290 75,295 Q80,300 85,295 L95,270 Q100,255 105,240"
      fill="none" stroke="url(#bodyGrad)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"
      filter="url(#bodyShadow)"
    />

    {/* Right arm */}
    <path
      d="M270,95 Q280,100 290,140 L295,185 Q300,210 310,250 L322,275 Q328,290 325,295 Q320,300 315,295 L305,270 Q300,255 295,240"
      fill="none" stroke="url(#bodyGrad)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"
      filter="url(#bodyShadow)"
    />

    {/* Left leg */}
    <path
      d="M170,295 Q165,320 162,360 L160,420 Q158,460 156,500 L155,540 Q154,555 150,570 Q148,580 155,582 Q162,582 163,570 L165,555"
      fill="none" stroke="url(#bodyGrad)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"
      filter="url(#bodyShadow)"
    />

    {/* Right leg */}
    <path
      d="M230,295 Q235,320 238,360 L240,420 Q242,460 244,500 L245,540 Q246,555 250,570 Q252,580 245,582 Q238,582 237,570 L235,555"
      fill="none" stroke="url(#bodyGrad)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"
      filter="url(#bodyShadow)"
    />

    {/* Joint landmark circles — always visible */}
    {jointLandmarks.map((j, i) => (
      <circle
        key={i}
        cx={j.cx}
        cy={j.cy}
        r={j.r}
        fill="white"
        stroke="#3D6B7E"
        strokeWidth="1.5"
        opacity="0.85"
      />
    ))}
  </svg>
));
BodySVG.displayName = "BodySVG";

/* ── Joint hotspot markers positioned over the SVG ── */

interface JointMarker {
  id: string;
  label: string;
  top: string;
  left: string;
  labelSide?: "left" | "right";
}

const jointMarkers: JointMarker[] = [
  { id: "neck",     label: "Neck",        top: "12%",   left: "50%"  },
  { id: "shoulder", label: "L Shoulder",   top: "16%",   left: "24%",  labelSide: "left" },
  { id: "shoulder", label: "R Shoulder",   top: "16%",   left: "76%",  labelSide: "right" },
  { id: "elbow",    label: "L Elbow",      top: "32%",   left: "14%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",      top: "32%",   left: "86%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",      top: "48%",   left: "8%",   labelSide: "left" },
  { id: "wrist",    label: "R Wrist",      top: "48%",   left: "92%",  labelSide: "right" },
  { id: "spine",    label: "Spine",        top: "27%",   left: "50%"  },
  { id: "hip",      label: "L Hip",        top: "52%",   left: "34%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",        top: "52%",   left: "66%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",       top: "74%",   left: "30%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",       top: "74%",   left: "70%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",      top: "92%",   left: "30%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",      top: "92%",   left: "70%",  labelSide: "right" },
];

/* ── Joint Dot — Physitrack-style teal highlight ── */

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
        <motion.span
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-4 h-4 rounded-full bg-primary/40"
        />
      )}
      <span
        className="w-3.5 h-3.5 rounded-full transition-all duration-300"
        style={{
          background: isActive ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.55)",
          border: isActive ? "2px solid hsl(var(--primary-foreground))" : "1.5px solid hsl(var(--primary) / 0.3)",
          boxShadow: isActive
            ? "0 0 12px 3px hsl(var(--primary) / 0.45)"
            : "0 0 4px 1px hsl(var(--primary) / 0.15)",
        }}
      />
    </span>
    <span
      className={`text-[10px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded transition-all duration-200 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-foreground/70 group-hover:text-primary"
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
    <section id="joint-exercises" className="py-14 lg:py-20 relative overflow-hidden bg-background">
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
            <div className="relative w-full max-w-[340px]">
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
