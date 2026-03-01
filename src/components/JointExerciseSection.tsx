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

/* ── Physitrack-style light anatomical mannequin ── */

const BodySVG = memo(() => (
  <svg
    viewBox="0 0 200 480"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="bodyMain" cx="45%" cy="40%" r="60%">
        <stop offset="0%" stopColor="hsl(220 10% 93%)" />
        <stop offset="100%" stopColor="hsl(220 8% 82%)" />
      </radialGradient>
      <linearGradient id="bodyHL" x1="70" y1="0" x2="140" y2="480" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(0 0% 100%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(0 0% 100%)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="bodySH" x1="140" y1="0" x2="80" y2="480" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(220 10% 68%)" stopOpacity="0" />
        <stop offset="100%" stopColor="hsl(220 10% 68%)" stopOpacity="0.25" />
      </linearGradient>
      <filter id="mShadow" x="-10%" y="-3%" width="120%" height="108%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="hsl(220 15% 40%)" floodOpacity="0.1" />
      </filter>
    </defs>

    <g filter="url(#mShadow)">
      {/* ── HEAD ── */}
      <ellipse cx="100" cy="28" rx="20" ry="24" fill="url(#bodyMain)" />
      <ellipse cx="96" cy="25" rx="12" ry="15" fill="url(#bodyHL)" />
      {/* Face hints */}
      <ellipse cx="93" cy="22" rx="2.5" ry="1.5" fill="hsl(220 6% 80%)" opacity="0.4" />
      <ellipse cx="107" cy="22" rx="2.5" ry="1.5" fill="hsl(220 6% 78%)" opacity="0.35" />
      <path d="M96 31 Q100 34 104 31" stroke="hsl(220 6% 76%)" strokeWidth="0.6" fill="none" opacity="0.35" />
      {/* Ears */}
      <ellipse cx="79" cy="28" rx="3" ry="5.5" fill="url(#bodyMain)" />
      <ellipse cx="121" cy="28" rx="3" ry="5.5" fill="url(#bodyMain)" />

      {/* ── NECK ── */}
      <rect x="90" y="50" width="20" height="16" rx="4" fill="url(#bodyMain)" />
      <rect x="90" y="50" width="10" height="14" rx="3" fill="url(#bodyHL)" />

      {/* ── FULL BODY as connected paths ── */}
      {/* Torso + shoulder caps as one shape */}
      <path
        d="M48 72 Q40 76 36 90 Q30 112 28 140
           Q28 155 28 162
           L28 164
           Q24 182 18 202 Q14 218 10 230
           L10 232 Q8 240 6 246 Q4 252 6 258 Q10 264 18 262 Q22 258 24 252
           L26 244 Q30 228 34 212 Q38 196 40 184
           L40 180
           Q42 176 44 172
           Q44 184 48 196 Q52 208 58 218
           L70 228 Q86 238 100 238
           Q114 238 130 228 L142 218 Q148 208 152 196 Q156 184 156 172
           Q158 176 160 180
           L160 184
           Q162 196 166 212 Q170 228 174 244
           L176 252 Q178 258 182 262 Q190 264 194 258 Q196 252 194 246 Q192 240 190 232
           L190 230 Q186 218 182 202 Q178 182 172 164
           L172 162
           Q172 155 172 140
           Q170 112 164 90 Q160 76 152 72
           Z"
        fill="url(#bodyMain)"
      />
      {/* Torso highlight */}
      <path
        d="M64 72 Q56 88 54 140 Q54 190 72 228 L100 238 Q84 228 76 212 Q66 190 64 140 Q62 100 66 72 Z"
        fill="url(#bodyHL)"
      />
      {/* Torso shadow */}
      <path
        d="M136 72 Q144 88 146 140 Q146 190 128 228 L100 238 Q116 228 124 212 Q134 190 136 140 Q138 100 134 72 Z"
        fill="url(#bodySH)"
      />

      {/* ── HANDS — fingers splayed ── */}
      {/* Left hand */}
      <path d="M6 258 Q4 264 2 270 Q2 274 4 278 L8 280 Q6 274 8 268 L10 270 Q8 276 10 282 L14 282 Q12 276 14 270 L16 270 Q14 278 16 284 L20 282 Q18 276 18 268 L20 260 Q18 254 14 252 Z" fill="url(#bodyMain)" />
      <path d="M14 252 Q18 250 22 254 Q24 260 22 264 L18 266" fill="url(#bodyMain)" />
      {/* Right hand */}
      <path d="M194 258 Q196 264 198 270 Q198 274 196 278 L192 280 Q194 274 192 268 L190 270 Q192 276 190 282 L186 282 Q188 276 186 270 L184 270 Q186 278 184 284 L180 282 Q182 276 182 268 L180 260 Q182 254 186 252 Z" fill="url(#bodyMain)" />
      <path d="M186 252 Q182 250 178 254 Q176 260 178 264 L182 266" fill="url(#bodyMain)" />

      {/* ── PELVIS / HIPS ── */}
      <path
        d="M60 220 Q62 240 68 254 L76 264 Q88 274 100 276 Q112 274 124 264 L132 254 Q138 240 140 220 Z"
        fill="url(#bodyMain)"
      />
      <path d="M60 220 Q62 238 68 254 L76 264 Q86 272 100 274 Q90 270 82 262 Q74 252 70 238 Q66 228 64 220 Z" fill="url(#bodyHL)" />

      {/* ── LEFT LEG ── */}
      <path
        d="M72 268 Q68 294 66 318 Q64 340 66 354
           L66 356 Q64 360 66 366 L78 366 Q80 360 78 356
           L78 354 Q78 340 78 318 Q78 296 82 272 Z"
        fill="url(#bodyMain)"
      />
      <path d="M72 268 Q70 290 68 318 Q66 336 68 350 L70 352 Q68 336 68 318 Q68 294 72 270 Z" fill="url(#bodyHL)" />
      {/* Kneecap */}
      <ellipse cx="72" cy="360" rx="5.5" ry="4.5" fill="hsl(220 6% 86%)" opacity="0.35" />
      {/* Shin */}
      <path
        d="M66 368 Q62 396 62 420 Q62 438 64 450
           L78 450 Q76 438 76 420 Q76 398 78 370 Z"
        fill="url(#bodyMain)"
      />
      <path d="M66 368 Q64 392 64 420 Q64 436 66 446 L68 448 Q66 434 66 420 Q66 396 68 370 Z" fill="url(#bodyHL)" />
      {/* Calf */}
      <path d="M64 382 Q58 398 62 414" stroke="hsl(220 6% 76%)" strokeWidth="0.8" fill="none" opacity="0.3" />
      {/* Foot */}
      <path
        d="M62 450 Q58 458 52 464 Q48 468 50 472 Q56 478 70 478 Q80 478 82 472 Q80 466 78 460 Q78 454 78 450 Z"
        fill="url(#bodyMain)"
      />

      {/* ── RIGHT LEG ── */}
      <path
        d="M128 268 Q132 294 134 318 Q136 340 134 354
           L134 356 Q136 360 134 366 L122 366 Q120 360 122 356
           L122 354 Q122 340 122 318 Q122 296 118 272 Z"
        fill="url(#bodyMain)"
      />
      <path d="M128 268 Q130 290 132 318 Q134 336 132 350 L130 352 Q132 336 132 318 Q132 294 128 270 Z" fill="url(#bodySH)" />
      <ellipse cx="128" cy="360" rx="5.5" ry="4.5" fill="hsl(220 6% 84%)" opacity="0.3" />
      <path
        d="M134 368 Q138 396 138 420 Q138 438 136 450
           L122 450 Q124 438 124 420 Q124 398 122 370 Z"
        fill="url(#bodyMain)"
      />
      <path d="M134 368 Q136 392 136 420 Q136 436 134 446 L132 448 Q134 434 134 420 Q134 396 132 370 Z" fill="url(#bodySH)" />
      <path d="M136 382 Q142 398 138 414" stroke="hsl(220 6% 76%)" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path
        d="M138 450 Q142 458 148 464 Q152 468 150 472 Q144 478 130 478 Q120 478 118 472 Q120 466 122 460 Q122 454 122 450 Z"
        fill="url(#bodyMain)"
      />
    </g>

    {/* ── Muscle definition lines ── */}
    <g stroke="hsl(220 6% 74%)" strokeWidth="0.7" fill="none" opacity="0.35">
      {/* Pectorals */}
      <path d="M74 86 Q90 94 98 90 Q100 92 100 90" />
      <path d="M126 86 Q110 94 102 90" />
      {/* Abs */}
      <line x1="100" y1="92" x2="100" y2="210" />
      <path d="M92 110 L92 118" /><path d="M108 110 L108 118" />
      <path d="M92 122 L92 130" /><path d="M108 122 L108 130" />
      <path d="M92 134 L92 142" /><path d="M108 134 L108 142" />
      {/* Obliques */}
      <path d="M78 118 Q82 138 84 158" />
      <path d="M122 118 Q118 138 116 158" />
      {/* Navel */}
      <ellipse cx="100" cy="156" rx="2.5" ry="3" />
      {/* Deltoids */}
      <path d="M48 72 Q40 80 36 92" />
      <path d="M152 72 Q160 80 164 92" />
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
  { id: "elbow",    label: "L Elbow",      top: "30%",   left: "14%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",      top: "30%",   left: "86%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",      top: "46%",   left: "8%",   labelSide: "left" },
  { id: "wrist",    label: "R Wrist",      top: "46%",   left: "92%",  labelSide: "right" },
  { id: "spine",    label: "Spine",        top: "26%",   left: "50%"  },
  { id: "hip",      label: "L Hip",        top: "48%",   left: "34%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",        top: "48%",   left: "66%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",       top: "75%",   left: "30%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",       top: "75%",   left: "70%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",      top: "93%",   left: "30%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",      top: "93%",   left: "70%",  labelSide: "right" },
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
