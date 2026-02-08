import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, Clock, RotateCcw, Activity, MousePointerClick } from "lucide-react";

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

// Clickable joint region shapes overlaid on the mannequin
interface JointRegion {
  id: string;
  path: string;
  label: string;
  labelX: number;
  labelY: number;
}

const jointRegions: JointRegion[] = [
  // Neck — wide band under jaw
  { id: "neck", path: "M135,78 Q140,72 150,70 Q160,72 165,78 L165,90 Q160,93 150,94 Q140,93 135,90 Z", label: "Neck", labelX: 150, labelY: 65 },
  // L Shoulder
  { id: "shoulder", path: "M100,100 Q95,95 92,102 Q90,112 95,120 L110,118 Q115,108 112,100 Z", label: "L Shoulder", labelX: 82, labelY: 98 },
  // R Shoulder
  { id: "shoulder", path: "M200,100 Q205,95 208,102 Q210,112 205,120 L190,118 Q185,108 188,100 Z", label: "R Shoulder", labelX: 218, labelY: 98 },
  // L Elbow
  { id: "elbow", path: "M80,168 Q76,160 74,168 Q72,178 76,185 L88,183 Q90,175 88,168 Z", label: "L Elbow", labelX: 62, labelY: 165 },
  // R Elbow
  { id: "elbow", path: "M220,168 Q224,160 226,168 Q228,178 224,185 L212,183 Q210,175 212,168 Z", label: "R Elbow", labelX: 238, labelY: 165 },
  // L Wrist/Hand
  { id: "wrist", path: "M62,232 Q58,225 56,232 Q54,242 58,250 L72,248 Q76,240 72,232 Z", label: "L Hand", labelX: 46, labelY: 230 },
  // R Wrist/Hand
  { id: "wrist", path: "M238,232 Q242,225 244,232 Q246,242 242,250 L228,248 Q224,240 228,232 Z", label: "R Hand", labelX: 254, labelY: 230 },
  // Spine — mid-back region
  { id: "spine", path: "M140,140 L160,140 L162,180 L158,195 L142,195 L138,180 Z", label: "Spine", labelX: 150, labelY: 133 },
  // L Hip
  { id: "hip", path: "M118,228 Q112,222 110,230 Q108,240 115,248 L130,246 Q135,238 130,228 Z", label: "L Hip", labelX: 98, labelY: 225 },
  // R Hip
  { id: "hip", path: "M182,228 Q188,222 190,230 Q192,240 185,248 L170,246 Q165,238 170,228 Z", label: "R Hip", labelX: 202, labelY: 225 },
  // L Knee
  { id: "knee", path: "M124,318 Q120,310 118,318 Q116,328 120,336 L136,334 Q140,326 136,318 Z", label: "L Knee", labelX: 108, labelY: 315 },
  // R Knee
  { id: "knee", path: "M176,318 Q180,310 182,318 Q184,328 180,336 L164,334 Q160,326 164,318 Z", label: "R Knee", labelX: 192, labelY: 315 },
  // L Ankle/Foot
  { id: "ankle", path: "M118,408 Q114,400 112,408 Q110,418 116,426 L132,424 Q136,416 132,408 Z", label: "L Foot", labelX: 102, labelY: 405 },
  // R Ankle/Foot
  { id: "ankle", path: "M182,408 Q186,400 188,408 Q190,418 184,426 L168,424 Q164,416 168,408 Z", label: "R Foot", labelX: 198, labelY: 405 },
];

const JointRegionHotspot = memo(({ region, isActive, onClick }: {
  region: JointRegion;
  isActive: boolean;
  onClick: () => void;
}) => {
  const activeColor = "hsl(172, 50%, 55%)";
  const hoverColor = "hsl(172, 50%, 65%)";
  const defaultColor = "hsl(172, 40%, 70%)";

  return (
    <g
      className="cursor-pointer"
      onClick={onClick}
      role="button"
      aria-label={`Exercise plan for ${region.label}`}
    >
      {/* Glow behind active region */}
      {isActive && (
        <path
          d={region.path}
          fill={activeColor}
          opacity="0.3"
          filter="url(#glow)"
          transform="scale(1.15)"
          style={{ transformOrigin: `${region.labelX}px ${region.labelY + 20}px` }}
        />
      )}
      {/* Region fill */}
      <path
        d={region.path}
        fill={isActive ? activeColor : defaultColor}
        opacity={isActive ? 0.9 : 0.6}
        className="transition-all duration-300 hover:opacity-90"
        style={{ filter: isActive ? "none" : "none" }}
        onMouseEnter={(e) => { e.currentTarget.style.fill = isActive ? activeColor : hoverColor; e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.fill = isActive ? activeColor : defaultColor; e.currentTarget.style.opacity = isActive ? "0.9" : "0.6"; }}
      />
      {/* Label */}
      <text
        x={region.labelX}
        y={region.labelY}
        textAnchor="middle"
        className="pointer-events-none select-none"
        fontSize="8"
        fontWeight={isActive ? "700" : "500"}
        fill={isActive ? activeColor : "hsl(172, 30%, 45%)"}
      >
        {region.label}
      </text>
    </g>
  );
});

JointRegionHotspot.displayName = "JointRegionHotspot";

const ExercisePanel = memo(({ joint, onClose }: { joint: JointData; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="bg-card rounded-2xl border border-border/50 shadow-medium overflow-hidden"
  >
    <div className="p-5 relative" style={{ background: "linear-gradient(135deg, hsl(172,50%,40%), hsl(172,50%,50%))" }}>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
        aria-label="Close exercise panel"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
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
          className="group p-4 rounded-xl bg-accent/50 hover:bg-accent border border-border/30 hover:border-secondary/30 transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-secondary/15 text-secondary text-xs font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <h4 className="font-semibold text-foreground text-sm">{ex.name}</h4>
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
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Header — minimal like reference */}
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
            Tap a highlighted region on the body to get a home exercise plan
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Body mannequin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[340px]">
              <svg viewBox="0 0 300 460" className="w-full h-auto" aria-label="Interactive body diagram — choose a joint area">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Subtle body gradient for 3D mannequin feel */}
                  <radialGradient id="bodyGrad" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="hsl(0,0%,92%)" />
                    <stop offset="100%" stopColor="hsl(0,0%,82%)" />
                  </radialGradient>
                  <radialGradient id="headGrad" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="hsl(0,0%,90%)" />
                    <stop offset="100%" stopColor="hsl(0,0%,80%)" />
                  </radialGradient>
                </defs>

                {/* === MANNEQUIN BODY === */}
                <g>
                  {/* Head */}
                  <ellipse cx="150" cy="38" rx="22" ry="28" fill="url(#headGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.8" />
                  {/* Ears */}
                  <ellipse cx="127" cy="38" rx="4" ry="7" fill="hsl(0,0%,85%)" />
                  <ellipse cx="173" cy="38" rx="4" ry="7" fill="hsl(0,0%,85%)" />
                  {/* Eyes hint */}
                  <circle cx="142" cy="33" r="1.5" fill="hsl(0,0%,70%)" />
                  <circle cx="158" cy="33" r="1.5" fill="hsl(0,0%,70%)" />
                  {/* Nose */}
                  <line x1="150" y1="36" x2="150" y2="42" stroke="hsl(0,0%,75%)" strokeWidth="0.6" />
                  {/* Mouth */}
                  <path d="M145,47 Q150,50 155,47" fill="none" stroke="hsl(0,0%,72%)" strokeWidth="0.6" />

                  {/* Neck */}
                  <rect x="140" y="64" width="20" height="20" rx="6" fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.5" />

                  {/* Torso */}
                  <path
                    d="M108,84 Q102,90 98,110 L94,160 Q92,195 96,220 L108,248 Q120,258 150,260 Q180,258 192,248 L204,220 Q208,195 206,160 L202,110 Q198,90 192,84 Z"
                    fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.8"
                  />
                  {/* Chest line */}
                  <path d="M120,105 Q135,115 150,112 Q165,115 180,105" fill="none" stroke="hsl(0,0%,78%)" strokeWidth="0.5" />
                  {/* Abs hint */}
                  <line x1="150" y1="130" x2="150" y2="200" stroke="hsl(0,0%,78%)" strokeWidth="0.4" />

                  {/* Left arm */}
                  <path
                    d="M98,100 Q88,105 82,125 L76,165 Q72,190 66,215 L60,245 Q58,252 62,256 L68,254 Q72,248 74,240 L82,210 Q86,190 90,170 L96,140"
                    fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.8"
                  />
                  {/* Left hand */}
                  <path d="M60,245 Q55,255 54,260 L56,264 Q60,262 64,258 L68,254" fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.6" />
                  {/* Left fingers */}
                  <path d="M54,260 L50,268 M56,262 L52,272 M58,263 L56,273 M60,262 L60,270" fill="none" stroke="hsl(0,0%,75%)" strokeWidth="0.5" />

                  {/* Right arm */}
                  <path
                    d="M202,100 Q212,105 218,125 L224,165 Q228,190 234,215 L240,245 Q242,252 238,256 L232,254 Q228,248 226,240 L218,210 Q214,190 210,170 L204,140"
                    fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.8"
                  />
                  {/* Right hand */}
                  <path d="M240,245 Q245,255 246,260 L244,264 Q240,262 236,258 L232,254" fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.6" />
                  {/* Right fingers */}
                  <path d="M246,260 L250,268 M244,262 L248,272 M242,263 L244,273 M240,262 L240,270" fill="none" stroke="hsl(0,0%,75%)" strokeWidth="0.5" />

                  {/* Left leg */}
                  <path
                    d="M118,250 Q115,270 118,300 L120,330 Q122,350 122,370 L120,400 Q118,420 116,435 L118,440 Q122,442 128,440 L130,435 Q128,420 128,400 L130,370 Q132,350 132,330 L134,300 Q136,275 138,255"
                    fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.8"
                  />
                  {/* Left foot */}
                  <path d="M116,435 Q112,440 108,442 L108,446 Q115,448 128,446 L130,442 Q128,440 128,438" fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.6" />

                  {/* Right leg */}
                  <path
                    d="M182,250 Q185,270 182,300 L180,330 Q178,350 178,370 L180,400 Q182,420 184,435 L182,440 Q178,442 172,440 L170,435 Q172,420 172,400 L170,370 Q168,350 168,330 L166,300 Q164,275 162,255"
                    fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.8"
                  />
                  {/* Right foot */}
                  <path d="M184,435 Q188,440 192,442 L192,446 Q185,448 172,446 L170,442 Q172,440 172,438" fill="url(#bodyGrad)" stroke="hsl(0,0%,75%)" strokeWidth="0.6" />
                </g>

                {/* === CLICKABLE JOINT REGIONS (teal highlights) === */}
                {jointRegions.map((region, i) => (
                  <JointRegionHotspot
                    key={`${region.id}-${i}`}
                    region={region}
                    isActive={activeJoint === region.id}
                    onClick={() => handleJointClick(region.id)}
                  />
                ))}
              </svg>

              {/* Prompt below figure */}
              {!activeJoint && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2"
                >
                  <MousePointerClick className="w-4 h-4 text-secondary" />
                  Click a highlighted area
                </motion.p>
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
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                      <Dumbbell className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      Select a Joint
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Click on any teal-highlighted region on the body diagram to view a personalised home exercise plan.
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
