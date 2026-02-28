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

/* ── Physitrack-inspired solid anatomical silhouette ── */

const BodySVG = memo(() => (
  <svg
    viewBox="0 0 220 560"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bodyFill" x1="110" y1="0" x2="110" y2="560" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(210 24% 16%)" stopOpacity="0.85" />
        <stop offset="50%" stopColor="hsl(210 20% 22%)" stopOpacity="0.78" />
        <stop offset="100%" stopColor="hsl(210 18% 28%)" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id="bodyHighlight" x1="90" y1="0" x2="130" y2="560" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(210 20% 40%)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="hsl(210 20% 30%)" stopOpacity="0" />
      </linearGradient>
      <filter id="bodyShadow" x="-10%" y="-5%" width="120%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="hsl(210 24% 16%)" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Full body solid silhouette — anatomically proportioned */}
    <g filter="url(#bodyShadow)">
      {/* Head */}
      <ellipse cx="110" cy="36" rx="24" ry="30" fill="url(#bodyFill)" />
      {/* Inner head highlight */}
      <ellipse cx="106" cy="32" rx="14" ry="18" fill="url(#bodyHighlight)" />

      {/* Neck */}
      <path d="M98 64 L98 80 L122 80 L122 64" fill="url(#bodyFill)" />

      {/* Torso — broad shoulders tapering to waist */}
      <path
        d="M56 84 Q54 86 52 100 Q48 130 48 160 Q48 185 54 200 Q58 210 66 218 L78 224 Q94 230 110 230 Q126 230 142 224 L154 218 Q162 210 166 200 Q172 185 172 160 Q172 130 168 100 Q166 86 164 84 Z"
        fill="url(#bodyFill)"
      />
      {/* Torso highlight strip */}
      <path
        d="M80 84 Q78 110 78 160 Q78 200 90 224 L110 230 Q100 220 96 200 Q90 160 92 100 Z"
        fill="url(#bodyHighlight)"
      />

      {/* Left arm — upper */}
      <path
        d="M56 84 Q52 86 46 96 Q38 112 32 138 Q28 155 30 162 L38 164 Q36 155 40 138 Q46 116 52 100 Q56 92 60 88 Z"
        fill="url(#bodyFill)"
      />
      {/* Left arm — forearm */}
      <path
        d="M30 166 Q26 190 22 212 Q18 228 16 238 L28 240 Q28 228 32 212 Q36 192 38 168 Z"
        fill="url(#bodyFill)"
      />
      {/* Left hand */}
      <path
        d="M16 238 Q14 248 12 256 Q10 262 14 266 Q18 268 24 266 Q28 262 30 256 Q30 248 28 240 Z"
        fill="url(#bodyFill)"
      />

      {/* Right arm — upper */}
      <path
        d="M164 84 Q168 86 174 96 Q182 112 188 138 Q192 155 190 162 L182 164 Q184 155 180 138 Q174 116 168 100 Q164 92 160 88 Z"
        fill="url(#bodyFill)"
      />
      {/* Right arm — forearm */}
      <path
        d="M190 166 Q194 190 198 212 Q202 228 204 238 L192 240 Q192 228 188 212 Q184 192 182 168 Z"
        fill="url(#bodyFill)"
      />
      {/* Right hand */}
      <path
        d="M204 238 Q206 248 208 256 Q210 262 206 266 Q202 268 196 266 Q192 262 190 256 Q190 248 192 240 Z"
        fill="url(#bodyFill)"
      />

      {/* Pelvis / hips */}
      <path
        d="M66 218 Q68 238 74 252 L82 264 Q92 274 110 276 Q128 274 138 264 L146 252 Q152 238 154 218 Z"
        fill="url(#bodyFill)"
      />

      {/* Left thigh */}
      <path
        d="M78 268 Q74 296 72 324 Q70 348 72 362 L86 364 Q84 348 84 324 Q84 300 88 272 Z"
        fill="url(#bodyFill)"
      />
      {/* Left shin */}
      <path
        d="M72 368 Q70 400 70 432 Q70 452 72 464 L86 466 Q84 452 84 432 Q84 402 86 370 Z"
        fill="url(#bodyFill)"
      />
      {/* Left foot */}
      <path
        d="M70 466 Q66 474 60 480 Q56 484 58 488 Q64 494 80 494 Q88 494 90 488 Q88 480 86 474 Q86 468 86 466 Z"
        fill="url(#bodyFill)"
      />

      {/* Right thigh */}
      <path
        d="M142 268 Q146 296 148 324 Q150 348 148 362 L134 364 Q136 348 136 324 Q136 300 132 272 Z"
        fill="url(#bodyFill)"
      />
      {/* Right shin */}
      <path
        d="M148 368 Q150 400 150 432 Q150 452 148 464 L134 466 Q136 452 136 432 Q136 402 134 370 Z"
        fill="url(#bodyFill)"
      />
      {/* Right foot */}
      <path
        d="M150 466 Q154 474 160 480 Q164 484 162 488 Q156 494 140 494 Q132 494 130 488 Q132 480 134 474 Q134 468 134 466 Z"
        fill="url(#bodyFill)"
      />
    </g>

    {/* Subtle anatomical lines for muscle definition */}
    <g stroke="hsl(0 0% 100%)" strokeOpacity="0.08" strokeWidth="0.8" fill="none">
      {/* Spine */}
      <line x1="110" y1="80" x2="110" y2="230" />
      {/* Chest lines */}
      <path d="M88 100 Q110 115 132 100" />
      <path d="M92 130 Q110 140 128 130" />
      {/* Ab lines */}
      <line x1="110" y1="145" x2="110" y2="218" />
      {/* Shoulder lines */}
      <path d="M56 84 Q50 88 46 96" />
      <path d="M164 84 Q170 88 174 96" />
    </g>
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
  { id: "shoulder", label: "L Shoulder",   top: "15.5%", left: "24%",  labelSide: "left" },
  { id: "shoulder", label: "R Shoulder",   top: "15.5%", left: "76%",  labelSide: "right" },
  { id: "elbow",    label: "L Elbow",      top: "29%",   left: "15%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",      top: "29%",   left: "85%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",      top: "42%",   left: "10%",  labelSide: "left" },
  { id: "wrist",    label: "R Wrist",      top: "42%",   left: "90%",  labelSide: "right" },
  { id: "spine",    label: "Spine",        top: "29%",   left: "50%"  },
  { id: "hip",      label: "L Hip",        top: "47%",   left: "34%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",        top: "47%",   left: "66%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",       top: "65%",   left: "30%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",       top: "65%",   left: "70%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",      top: "83.5%", left: "30%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",      top: "83.5%", left: "70%",  labelSide: "right" },
];

/* ── Joint Dot — Physitrack-inspired ring marker ── */

const JointDot = memo(({ marker, isActive, onClick }: {
  marker: JointMarker;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={`Exercise plan for ${marker.label}`}
    className="absolute flex items-center gap-1.5 group cursor-pointer z-10"
    style={{
      top: marker.top,
      left: marker.left,
      transform: "translate(-50%, -50%)",
      flexDirection: marker.labelSide === "left" ? "row-reverse" : "row",
    }}
  >
    <span className="relative flex items-center justify-center">
      {/* Pulse ring on active */}
      {isActive && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-5 h-5 rounded-full border-2"
          style={{ borderColor: "hsl(var(--primary))" }}
        />
      )}
      {/* Outer ring */}
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          border: isActive ? "2.5px solid hsl(var(--primary))" : "2px solid hsl(0 0% 100% / 0.85)",
          background: isActive
            ? "hsl(var(--primary))"
            : "hsl(0 0% 100% / 0.15)",
          boxShadow: isActive
            ? "0 0 12px 3px hsl(var(--primary) / 0.5), inset 0 0 4px hsl(var(--primary) / 0.3)"
            : "0 0 6px 1px hsl(0 0% 0% / 0.2)",
        }}
      >
        {/* Inner dot */}
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: isActive ? "hsl(var(--primary-foreground))" : "hsl(0 0% 100% / 0.9)",
          }}
        />
      </span>
    </span>
    {/* Label */}
    <span
      className={`text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-md transition-all duration-200 backdrop-blur-sm ${
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-foreground/80 text-background shadow-sm group-hover:bg-primary group-hover:text-primary-foreground"
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
    <section id="joint-exercises" className="py-14 lg:py-20 relative overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
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
