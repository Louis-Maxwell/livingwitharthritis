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
import bodyMannequin from "@/assets/body-mannequin.png";

const BodyImage = memo(() => (
  <img
    src={bodyMannequin}
    alt="Human body diagram for joint exercises"
    className="w-full h-auto select-none pointer-events-none"
    draggable={false}
    loading="lazy"
    decoding="async"
  />
));
BodyImage.displayName = "BodyImage";

/* ── Joint hotspot markers positioned over the mannequin image ── */

interface JointMarker {
  id: string;
  label: string;
  top: string;
  left: string;
  labelSide?: "left" | "right";
}

const jointMarkers: JointMarker[] = [
  { id: "neck",     label: "Neck",        top: "14%",   left: "50%"  },
  { id: "shoulder", label: "L Shoulder",   top: "19%",   left: "30%",  labelSide: "left" },
  { id: "shoulder", label: "R Shoulder",   top: "19%",   left: "70%",  labelSide: "right" },
  { id: "elbow",    label: "L Elbow",      top: "34%",   left: "18%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",      top: "34%",   left: "82%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",      top: "47%",   left: "12%",  labelSide: "left" },
  { id: "wrist",    label: "R Wrist",      top: "47%",   left: "88%",  labelSide: "right" },
  { id: "spine",    label: "Spine",        top: "30%",   left: "50%"  },
  { id: "hip",      label: "L Hip",        top: "48%",   left: "38%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",        top: "48%",   left: "62%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",       top: "68%",   left: "38%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",       top: "68%",   left: "62%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",      top: "88%",   left: "38%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",      top: "88%",   left: "62%",  labelSide: "right" },
];

/* ── Joint Dot — Teal-to-cyan highlight with glow ── */

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
      {/* Outer pulse ring */}
      {isActive && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-5 h-5 rounded-full"
          style={{ background: "hsl(180 70% 45% / 0.4)" }}
        />
      )}
      {/* Hover glow ring */}
      <span
        className="absolute w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, hsl(180 70% 50% / 0.25), transparent 70%)",
        }}
      />
      {/* Main dot */}
      <span
        className="w-4 h-4 rounded-full transition-all duration-300 relative z-10"
        style={{
          background: isActive
            ? "linear-gradient(135deg, hsl(180 70% 45%), hsl(200 80% 50%))"
            : "linear-gradient(135deg, hsl(180 60% 50% / 0.7), hsl(200 70% 55% / 0.7))",
          border: isActive
            ? "2.5px solid hsl(0 0% 100%)"
            : "2px solid hsl(180 60% 50% / 0.4)",
          boxShadow: isActive
            ? "0 0 16px 4px hsl(180 70% 50% / 0.5), 0 0 4px 1px hsl(200 80% 50% / 0.3)"
            : "0 0 6px 2px hsl(180 60% 50% / 0.2)",
        }}
      />
      {/* Active ring */}
      {isActive && (
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute w-6 h-6 rounded-full border-2 z-[5]"
          style={{ borderColor: "hsl(180 70% 50% / 0.6)" }}
        />
      )}
    </span>
    {/* Label */}
    <span
      className={`text-[10px] font-semibold whitespace-nowrap px-2 py-1 rounded-lg transition-all duration-200 ${
        isActive
          ? "text-primary-foreground shadow-lg"
          : "text-foreground/70 group-hover:text-foreground bg-background/60 group-hover:bg-background/80 backdrop-blur-sm"
      }`}
      style={isActive ? {
        background: "linear-gradient(135deg, hsl(180 70% 40%), hsl(200 80% 45%))",
      } : undefined}
    >
      {marker.label}
    </span>
  </button>
));

JointDot.displayName = "JointDot";

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
              <BodyImage />
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
