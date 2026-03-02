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

/* ── Clean silhouette mannequin with white anatomical lines ── */

const BodySVG = memo(() => (
  <svg
    viewBox="0 0 220 520"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bodyFill" x1="110" y1="0" x2="110" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(var(--navy))" />
        <stop offset="100%" stopColor="hsl(220 40% 16%)" />
      </linearGradient>
      <filter id="bodyShadow" x="-10%" y="-2%" width="120%" height="106%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="hsl(220 40% 10%)" floodOpacity="0.3" />
      </filter>
    </defs>

    <g filter="url(#bodyShadow)">
      {/* HEAD */}
      <ellipse cx="110" cy="32" rx="22" ry="28" fill="url(#bodyFill)" />

      {/* NECK */}
      <rect x="100" y="56" width="20" height="16" rx="4" fill="url(#bodyFill)" />

      {/* TORSO + ARMS as one solid shape */}
      <path
        d="M100 68 Q88 70 70 76 Q50 84 40 100
           Q30 120 26 150 L22 180 Q18 200 12 224 Q8 244 6 260
           Q4 268 8 272 Q14 276 20 272 Q24 268 26 256
           L34 220 Q40 196 46 180
           Q48 190 52 210 Q58 228 68 242
           L84 256 Q96 264 110 266
           Q124 264 136 256 L152 242 Q162 228 168 210 Q172 190 174 180
           L186 220 Q190 240 194 256
           Q196 268 200 272 Q206 276 212 272 Q216 268 214 260
           Q212 244 208 224 Q202 200 198 180
           L194 150 Q190 120 180 100
           Q170 84 150 76 Q132 70 120 68
           Q116 70 110 70 Q104 70 100 68 Z"
        fill="url(#bodyFill)"
      />

      {/* HANDS — left */}
      <path d="M6 260 Q4 268 2 278 Q1 284 4 288 Q8 290 10 286 L12 274 L14 278 Q12 286 14 292 L18 290 Q16 282 18 274 L20 274 Q18 282 20 292 L24 290 Q22 282 22 272 L24 268 Q20 260 16 256 Z" fill="url(#bodyFill)" />
      <path d="M16 256 Q22 254 26 260 Q28 266 26 270 L22 272" fill="url(#bodyFill)" />
      {/* HANDS — right */}
      <path d="M214 260 Q216 268 218 278 Q219 284 216 288 Q212 290 210 286 L208 274 L206 278 Q208 286 206 292 L202 290 Q204 282 202 274 L200 274 Q202 282 200 292 L196 290 Q198 282 198 272 L196 268 Q200 260 204 256 Z" fill="url(#bodyFill)" />
      <path d="M204 256 Q198 254 194 260 Q192 266 194 270 L198 272" fill="url(#bodyFill)" />

      {/* PELVIS */}
      <path
        d="M68 242 Q72 262 80 278 L92 290 Q102 298 110 300
           Q118 298 128 290 L140 278 Q148 262 152 242 Z"
        fill="url(#bodyFill)"
      />

      {/* LEFT LEG */}
      <path
        d="M86 292 Q82 320 80 350 Q78 370 80 384
           L94 384 Q94 370 94 350 Q94 322 98 294 Z"
        fill="url(#bodyFill)"
      />
      <path
        d="M80 388 Q76 420 76 450 Q76 464 78 476
           L94 476 Q92 464 92 450 Q92 422 94 390 Z"
        fill="url(#bodyFill)"
      />
      <path
        d="M76 476 Q72 484 64 490 Q60 494 62 498 Q68 504 82 504 Q96 504 98 498 Q96 492 94 486 Q94 480 94 476 Z"
        fill="url(#bodyFill)"
      />

      {/* RIGHT LEG */}
      <path
        d="M134 292 Q138 320 140 350 Q142 370 140 384
           L126 384 Q126 370 126 350 Q126 322 122 294 Z"
        fill="url(#bodyFill)"
      />
      <path
        d="M140 388 Q144 420 144 450 Q144 464 142 476
           L126 476 Q128 464 128 450 Q128 422 126 390 Z"
        fill="url(#bodyFill)"
      />
      <path
        d="M144 476 Q148 484 156 490 Q160 494 158 498 Q152 504 138 504 Q124 504 122 498 Q124 492 126 486 Q126 480 126 476 Z"
        fill="url(#bodyFill)"
      />
    </g>

    {/* ── White anatomical lines ── */}
    <g stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round">
      {/* Neck line */}
      <path d="M100 60 L120 60" />
      {/* Collar / shoulder lines */}
      <path d="M100 72 Q86 76 70 82" />
      <path d="M120 72 Q134 76 150 82" />
      {/* Neckline V */}
      <path d="M98 72 Q110 84 122 72" />
      {/* Chest lines */}
      <path d="M70 88 Q90 100 110 96" />
      <path d="M150 88 Q130 100 110 96" />
      {/* Waist V */}
      <path d="M68 240 Q90 248 110 246 Q130 248 152 240" />
      {/* Hip / pelvis lines */}
      <path d="M80 268 Q96 280 110 282 Q124 280 140 268" />
      {/* Upper arm dividers */}
      <path d="M52 100 Q46 110 40 120" />
      <path d="M168 100 Q174 110 180 120" />
      {/* Elbow lines */}
      <path d="M32 156 Q28 160 26 166" />
      <path d="M188 156 Q192 160 194 166" />
      {/* Wrist lines */}
      <path d="M14 240 Q12 244 10 248" />
      <path d="M206 240 Q208 244 210 248" />
      {/* Knee lines */}
      <path d="M78 382 Q87 388 96 382" />
      <path d="M124 382 Q133 388 142 382" />
      {/* Ankle lines */}
      <path d="M78 474 Q87 478 96 474" />
      <path d="M124 474 Q133 478 142 474" />
      {/* Inner thigh separation */}
      <path d="M96 268 Q100 290 98 310" />
      <path d="M124 268 Q120 290 122 310" />
      {/* Finger separations — left */}
      <path d="M10 274 L10 270" />
      <path d="M14 276 L14 272" />
      <path d="M18 276 L18 272" />
      {/* Finger separations — right */}
      <path d="M210 274 L210 270" />
      <path d="M206 276 L206 272" />
      <path d="M202 276 L202 272" />
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
