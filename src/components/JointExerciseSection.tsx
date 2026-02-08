import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, Clock, RotateCcw, ChevronRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// SVG body outline with clickable hotspot positions
const jointPositions: { id: string; cx: number; cy: number; label: string }[] = [
  { id: "neck", cx: 150, cy: 72, label: "Neck" },
  { id: "shoulder", cx: 107, cy: 105, label: "L Shoulder" },
  { id: "shoulder", cx: 193, cy: 105, label: "R Shoulder" },
  { id: "elbow", cx: 88, cy: 170, label: "L Elbow" },
  { id: "elbow", cx: 212, cy: 170, label: "R Elbow" },
  { id: "wrist", cx: 75, cy: 232, label: "L Wrist" },
  { id: "wrist", cx: 225, cy: 232, label: "R Wrist" },
  { id: "spine", cx: 150, cy: 155, label: "Spine" },
  { id: "hip", cx: 128, cy: 230, label: "L Hip" },
  { id: "hip", cx: 172, cy: 230, label: "R Hip" },
  { id: "knee", cx: 132, cy: 320, label: "L Knee" },
  { id: "knee", cx: 168, cy: 320, label: "R Knee" },
  { id: "ankle", cx: 130, cy: 410, label: "L Ankle" },
  { id: "ankle", cx: 170, cy: 410, label: "R Ankle" },
];

const JointHotspot = memo(({ joint, isActive, onClick }: {
  joint: typeof jointPositions[0];
  isActive: boolean;
  onClick: () => void;
}) => (
  <g className="cursor-pointer" onClick={onClick} role="button" aria-label={`Exercise plan for ${joint.label}`}>
    {/* Pulse ring */}
    <circle
      cx={joint.cx}
      cy={joint.cy}
      r={isActive ? 16 : 12}
      className={`transition-all duration-300 ${isActive ? "fill-primary/30" : "fill-primary/10"}`}
    />
    {isActive && (
      <circle
        cx={joint.cx}
        cy={joint.cy}
        r={18}
        fill="none"
        className="stroke-primary"
        strokeWidth="2"
        opacity="0.5"
      >
        <animate attributeName="r" from="16" to="24" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
    )}
    {/* Dot */}
    <circle
      cx={joint.cx}
      cy={joint.cy}
      r={isActive ? 8 : 6}
      className={`transition-all duration-300 ${isActive ? "fill-primary" : "fill-primary/70 hover:fill-primary"}`}
    />
    {/* Label */}
    <text
      x={joint.cx}
      y={joint.cy - 16}
      textAnchor="middle"
      className={`text-[9px] font-semibold fill-foreground/70 pointer-events-none select-none ${isActive ? "fill-primary" : ""}`}
    >
      {joint.label}
    </text>
  </g>
));

JointHotspot.displayName = "JointHotspot";

const ExercisePanel = memo(({ joint, onClose }: { joint: JointData; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="bg-card rounded-2xl border border-border/50 shadow-medium overflow-hidden"
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-primary to-primary/80 p-5 text-white relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        aria-label="Close exercise panel"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold">{joint.label}</h3>
          <p className="text-white/80 text-xs">Home Exercise Plan</p>
        </div>
      </div>
      <p className="text-white/70 text-sm mt-2 leading-relaxed">💡 {joint.tip}</p>
    </div>

    {/* Exercises */}
    <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
      {joint.exercises.map((ex, i) => (
        <motion.div
          key={ex.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="group p-4 rounded-xl bg-accent/50 hover:bg-accent border border-border/30 hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <h4 className="font-semibold text-foreground text-sm">{ex.name}</h4>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed mb-2 ml-8">{ex.description}</p>
          <div className="flex gap-3 ml-8">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              <Clock className="w-3 h-3" /> {ex.duration}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <RotateCcw className="w-3 h-3" /> {ex.reps}
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Footer */}
    <div className="p-4 border-t border-border/50 bg-accent/30">
      <p className="text-[11px] text-muted-foreground text-center">
        Always consult your physiotherapist before starting a new exercise programme.
      </p>
    </div>
  </motion.div>
));

ExercisePanel.displayName = "ExercisePanel";

const JointExerciseSection = memo(() => {
  const [activeJoint, setActiveJoint] = useState<string | null>(null);

  const handleJointClick = useCallback((jointId: string) => {
    setActiveJoint((prev) => (prev === jointId ? null : jointId));
  }, []);

  const activeData = activeJoint ? jointDatabase[activeJoint] : null;

  return (
    <section id="joint-exercises" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="gradient-orb w-80 h-80 bg-primary top-10 -left-40" />
      <div className="gradient-orb w-60 h-60 bg-secondary bottom-20 -right-20" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label text-primary mb-3 block">Interactive Tool</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 tracking-tight">
            Tap a joint. <span className="text-primary">Get your plan.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Click any highlighted joint on the body map below to access tailored home exercise plans designed by physiotherapy experts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Body diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative bg-accent/50 rounded-3xl border border-border/50 p-6 sm:p-8 w-full max-w-sm">
              <svg viewBox="0 0 300 450" className="w-full h-auto" aria-label="Interactive body joint diagram">
                {/* Body silhouette */}
                <g className="fill-muted-foreground/10 stroke-muted-foreground/30" strokeWidth="1.5">
                  {/* Head */}
                  <ellipse cx="150" cy="38" rx="24" ry="28" />
                  {/* Neck */}
                  <rect x="142" y="62" width="16" height="18" rx="4" />
                  {/* Torso */}
                  <path d="M110 80 Q108 85 105 95 L100 170 Q98 200 110 230 L120 240 Q130 245 140 245 L160 245 Q170 245 180 240 L190 230 Q202 200 200 170 L195 95 Q192 85 190 80 Z" />
                  {/* Left arm */}
                  <path d="M105 95 Q95 100 88 120 L80 170 Q75 195 72 220 L70 240" strokeLinecap="round" fill="none" strokeWidth="12" className="stroke-muted-foreground/10" />
                  <path d="M105 95 Q95 100 88 120 L80 170 Q75 195 72 220 L70 240" strokeLinecap="round" fill="none" strokeWidth="1.5" />
                  {/* Right arm */}
                  <path d="M195 95 Q205 100 212 120 L220 170 Q225 195 228 220 L230 240" strokeLinecap="round" fill="none" strokeWidth="12" className="stroke-muted-foreground/10" />
                  <path d="M195 95 Q205 100 212 120 L220 170 Q225 195 228 220 L230 240" strokeLinecap="round" fill="none" strokeWidth="1.5" />
                  {/* Left leg */}
                  <path d="M125 240 Q128 270 132 300 L133 340 Q133 360 132 380 L130 420" strokeLinecap="round" fill="none" strokeWidth="14" className="stroke-muted-foreground/10" />
                  <path d="M125 240 Q128 270 132 300 L133 340 Q133 360 132 380 L130 420" strokeLinecap="round" fill="none" strokeWidth="1.5" />
                  {/* Right leg */}
                  <path d="M175 240 Q172 270 168 300 L167 340 Q167 360 168 380 L170 420" strokeLinecap="round" fill="none" strokeWidth="14" className="stroke-muted-foreground/10" />
                  <path d="M175 240 Q172 270 168 300 L167 340 Q167 360 168 380 L170 420" strokeLinecap="round" fill="none" strokeWidth="1.5" />
                </g>

                {/* Hotspots */}
                {jointPositions.map((joint, i) => (
                  <JointHotspot
                    key={`${joint.id}-${i}`}
                    joint={joint}
                    isActive={activeJoint === joint.id}
                    onClick={() => handleJointClick(joint.id)}
                  />
                ))}
              </svg>

              {/* Mobile prompt */}
              {!activeJoint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-4 lg:hidden"
                >
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                    Tap a joint to see exercises
                  </p>
                </motion.div>
              )}
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
                  <div className="text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-border/50 bg-accent/20 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <Dumbbell className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Select a Joint
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Click on any highlighted point on the body diagram to view a personalised home exercise plan for that area.
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
