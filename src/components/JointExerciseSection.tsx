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

/* ── Physitrack-style clean mannequin — minimal, flat, no internal detail ── */

const BodySVG = memo(() => (
  <svg
    viewBox="0 0 200 520"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bodyFill" x1="60" y1="0" x2="160" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(0, 40%, 90%)" />
        <stop offset="100%" stopColor="hsl(0, 30%, 82%)" />
      </linearGradient>
      <linearGradient id="bodyHighlight" x1="80" y1="0" x2="130" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(0, 0%, 100%)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(0, 0%, 100%)" stopOpacity="0" />
      </linearGradient>
      <filter id="mannequinShadow" x="-15%" y="-3%" width="130%" height="110%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="hsl(0, 20%, 30%)" floodOpacity="0.08" />
      </filter>
    </defs>

    <g filter="url(#mannequinShadow)">
      {/* HEAD — simple oval */}
      <ellipse cx="100" cy="30" rx="22" ry="26" fill="url(#bodyFill)" />
      <ellipse cx="95" cy="26" rx="13" ry="16" fill="url(#bodyHighlight)" />

      {/* NECK */}
      <rect x="88" y="54" width="24" height="18" rx="6" fill="url(#bodyFill)" />

      {/* TORSO — smooth rounded shape */}
      <path
        d="M56 70
           Q42 78 36 100 Q30 130 30 158
           Q30 180 34 198
           L40 198
           Q38 180 38 158 Q38 130 44 100 Q48 84 60 74
           Z"
        fill="url(#bodyFill)"
      />
      <path
        d="M144 70
           Q158 78 164 100 Q170 130 170 158
           Q170 180 166 198
           L160 198
           Q162 180 162 158 Q162 130 156 100 Q152 84 140 74
           Z"
        fill="url(#bodyFill)"
      />
      {/* Main torso body */}
      <path
        d="M60 72 Q56 72 52 74
           L40 198
           Q42 220 50 238 Q60 254 72 262
           L76 264 Q88 272 100 274
           Q112 272 124 264 L128 262
           Q140 254 150 238 Q158 220 160 198
           L148 74 Q144 72 140 72
           Q130 68 100 66 Q70 68 60 72
           Z"
        fill="url(#bodyFill)"
      />
      {/* Torso highlight overlay */}
      <path
        d="M70 72 Q64 80 58 110 Q54 150 56 200 Q60 240 78 264
           L100 274
           Q86 268 78 256 Q66 236 62 200 Q58 150 62 110 Q66 82 74 72 Z"
        fill="url(#bodyHighlight)"
      />

      {/* LEFT ARM */}
      <path
        d="M36 100 Q28 120 22 148 Q16 176 12 200
           Q10 210 8 218 Q6 228 8 232
           L18 232 Q16 226 16 218 Q18 210 20 200
           Q24 178 30 152 Q34 130 38 112
           Z"
        fill="url(#bodyFill)"
      />
      {/* Left hand — simple mitt */}
      <path
        d="M8 232 Q4 242 2 250 Q0 258 4 264 Q8 268 14 268
           Q18 268 22 264 Q24 258 22 250 Q20 242 18 232 Z"
        fill="url(#bodyFill)"
      />
      {/* Left thumb */}
      <ellipse cx="3" cy="244" rx="4" ry="6" fill="url(#bodyFill)" />

      {/* RIGHT ARM */}
      <path
        d="M164 100 Q172 120 178 148 Q184 176 188 200
           Q190 210 192 218 Q194 228 192 232
           L182 232 Q184 226 184 218 Q182 210 180 200
           Q176 178 170 152 Q166 130 162 112
           Z"
        fill="url(#bodyFill)"
      />
      {/* Right hand — simple mitt */}
      <path
        d="M192 232 Q196 242 198 250 Q200 258 196 264 Q192 268 186 268
           Q182 268 178 264 Q176 258 178 250 Q180 242 182 232 Z"
        fill="url(#bodyFill)"
      />
      {/* Right thumb */}
      <ellipse cx="197" cy="244" rx="4" ry="6" fill="url(#bodyFill)" />

      {/* PELVIS — smooth connection */}
      <path
        d="M62 240 Q64 260 72 274 Q82 286 100 290
           Q118 286 128 274 Q136 260 138 240 Z"
        fill="url(#bodyFill)"
      />

      {/* LEFT LEG */}
      <path
        d="M72 278 Q68 310 66 345 Q64 370 66 390
           Q66 394 68 398
           L82 398
           Q80 394 80 390
           Q80 370 80 345 Q80 312 82 282 Z"
        fill="url(#bodyFill)"
      />
      {/* Left shin */}
      <path
        d="M66 400 Q62 430 62 455 Q62 472 64 484
           L80 484
           Q78 472 78 455 Q78 432 80 402 Z"
        fill="url(#bodyFill)"
      />
      {/* Left foot */}
      <path
        d="M62 484 Q56 494 50 500 Q46 506 50 510
           Q58 516 72 516 Q82 516 84 510
           Q82 504 80 496 Q80 490 80 484 Z"
        fill="url(#bodyFill)"
      />

      {/* RIGHT LEG */}
      <path
        d="M128 278 Q132 310 134 345 Q136 370 134 390
           Q134 394 132 398
           L118 398
           Q120 394 120 390
           Q120 370 120 345 Q120 312 118 282 Z"
        fill="url(#bodyFill)"
      />
      {/* Right shin */}
      <path
        d="M134 400 Q138 430 138 455 Q138 472 136 484
           L120 484
           Q122 472 122 455 Q122 432 120 402 Z"
        fill="url(#bodyFill)"
      />
      {/* Right foot */}
      <path
        d="M138 484 Q144 494 150 500 Q154 506 150 510
           Q142 516 128 516 Q118 516 116 510
           Q118 504 120 496 Q120 490 120 484 Z"
        fill="url(#bodyFill)"
      />
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
  { id: "neck",     label: "Neck",        top: "11%",   left: "50%"  },
  { id: "shoulder", label: "L Shoulder",   top: "15%",   left: "24%",  labelSide: "left" },
  { id: "shoulder", label: "R Shoulder",   top: "15%",   left: "76%",  labelSide: "right" },
  { id: "elbow",    label: "L Elbow",      top: "28%",   left: "12%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",      top: "28%",   left: "88%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",      top: "43%",   left: "6%",   labelSide: "left" },
  { id: "wrist",    label: "R Wrist",      top: "43%",   left: "94%",  labelSide: "right" },
  { id: "spine",    label: "Spine",        top: "24%",   left: "50%"  },
  { id: "hip",      label: "L Hip",        top: "50%",   left: "34%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",        top: "50%",   left: "66%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",       top: "74%",   left: "35%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",       top: "74%",   left: "65%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",      top: "91%",   left: "33%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",      top: "91%",   left: "67%",  labelSide: "right" },
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
