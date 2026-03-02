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
    viewBox="0 0 240 520"
    className="w-full h-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="skinBase" cx="48%" cy="38%" r="58%">
        <stop offset="0%" stopColor="hsl(25 30% 85%)" />
        <stop offset="100%" stopColor="hsl(22 18% 72%)" />
      </radialGradient>
      <linearGradient id="skinHL" x1="80" y1="0" x2="160" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(30 40% 92%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(30 20% 88%)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="skinSH" x1="160" y1="0" x2="90" y2="520" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(20 15% 58%)" stopOpacity="0" />
        <stop offset="60%" stopColor="hsl(20 15% 58%)" stopOpacity="0.22" />
      </linearGradient>
      <radialGradient id="faceGrad" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="hsl(25 28% 87%)" />
        <stop offset="100%" stopColor="hsl(22 20% 78%)" />
      </radialGradient>
      <filter id="bodyShadow" x="-8%" y="-2%" width="116%" height="106%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="hsl(220 20% 30%)" floodOpacity="0.12" />
      </filter>
    </defs>

    <g filter="url(#bodyShadow)">
      {/* ── HEAD ── */}
      <ellipse cx="120" cy="34" rx="22" ry="27" fill="url(#faceGrad)" />
      <ellipse cx="115" cy="30" rx="14" ry="18" fill="url(#skinHL)" />
      {/* Hairline suggestion */}
      <path d="M100 14 Q108 6 120 8 Q132 6 140 14 Q142 18 140 22 Q134 14 120 12 Q106 14 100 22 Q98 18 100 14Z" fill="hsl(20 12% 50%)" opacity="0.12" />
      {/* Eyes */}
      <ellipse cx="112" cy="28" rx="3" ry="2" fill="hsl(20 8% 72%)" opacity="0.45" />
      <ellipse cx="128" cy="28" rx="3" ry="2" fill="hsl(20 8% 70%)" opacity="0.4" />
      <circle cx="112" cy="28" r="1" fill="hsl(20 12% 50%)" opacity="0.3" />
      <circle cx="128" cy="28" r="1" fill="hsl(20 12% 50%)" opacity="0.3" />
      {/* Nose */}
      <path d="M118 32 Q120 36 122 32" stroke="hsl(20 10% 66%)" strokeWidth="0.8" fill="none" opacity="0.35" />
      {/* Mouth */}
      <path d="M114 40 Q120 44 126 40" stroke="hsl(20 10% 68%)" strokeWidth="0.7" fill="none" opacity="0.3" />
      {/* Ears */}
      <path d="M97 30 Q93 24 93 32 Q93 38 97 36" fill="url(#faceGrad)" />
      <path d="M143 30 Q147 24 147 32 Q147 38 143 36" fill="url(#faceGrad)" />
      {/* Jaw definition */}
      <path d="M100 38 Q104 48 120 52 Q136 48 140 38" stroke="hsl(20 10% 68%)" strokeWidth="0.6" fill="none" opacity="0.2" />

      {/* ── NECK ── */}
      <path d="M108 56 Q108 52 110 50 L130 50 Q132 52 132 56 L132 68 Q128 70 120 70 Q112 70 108 68 Z" fill="url(#skinBase)" />
      <path d="M108 56 L118 56 L118 66 Q114 68 110 66 Z" fill="url(#skinHL)" />
      {/* Neck tendons */}
      <path d="M112 54 L110 66" stroke="hsl(20 8% 68%)" strokeWidth="0.5" opacity="0.2" />
      <path d="M128 54 L130 66" stroke="hsl(20 8% 68%)" strokeWidth="0.5" opacity="0.2" />

      {/* ── TORSO (trapezius, shoulders, chest, waist) ── */}
      <path
        d="M108 68 Q100 70 84 72 Q62 76 52 82
           Q42 90 38 104 Q32 126 30 152
           L30 168
           Q26 186 20 208 Q16 224 12 238 Q10 246 8 254
           Q6 260 8 266 Q12 270 18 268 Q24 266 26 258
           L28 250 Q32 234 36 218 Q40 202 44 190
           L46 182
           Q48 178 50 176
           Q50 190 54 206 Q60 220 68 232
           L82 244 Q100 256 120 256
           Q140 256 158 244 L172 232 Q180 220 186 206 Q190 190 190 176
           Q192 178 194 182
           L196 190
           Q200 202 204 218 Q208 234 212 250
           L214 258 Q216 266 222 268 Q228 270 232 266 Q234 260 232 254
           Q230 246 228 238 Q224 224 220 208 Q214 186 210 168
           L210 152
           Q208 126 202 104 Q198 90 188 82
           Q178 76 156 72 Q140 70 132 68
           Q128 70 120 70 Q112 70 108 68 Z"
        fill="url(#skinBase)"
      />
      {/* Torso highlight */}
      <path
        d="M84 72 Q68 82 58 104 Q50 130 50 160 Q52 200 74 238 L100 256
           Q86 244 76 228 Q64 206 60 170 Q56 130 62 100 Q68 82 84 72 Z"
        fill="url(#skinHL)"
      />
      {/* Torso shadow */}
      <path
        d="M156 72 Q172 82 182 104 Q190 130 190 160 Q188 200 166 238 L140 256
           Q154 244 164 228 Q176 206 180 170 Q184 130 178 100 Q172 82 156 72 Z"
        fill="url(#skinSH)"
      />

      {/* ── HANDS with detailed fingers ── */}
      {/* Left hand */}
      <path d="M8 266 Q6 272 4 280 Q3 284 5 288 Q7 290 10 288 Q8 282 10 274 L12 276 Q10 284 12 292 L16 290 Q14 284 16 276 L18 276 Q16 284 18 294 L22 292 Q20 284 20 274 L22 268 Q20 262 16 258 Z" fill="url(#skinBase)" />
      {/* Left thumb */}
      <path d="M16 258 Q20 256 24 260 Q26 266 24 270 L20 272" fill="url(#skinBase)" />
      {/* Right hand */}
      <path d="M232 266 Q234 272 236 280 Q237 284 235 288 Q233 290 230 288 Q232 282 230 274 L228 276 Q230 284 228 292 L224 290 Q226 284 224 276 L222 276 Q224 284 222 294 L218 292 Q220 284 220 274 L218 268 Q220 262 224 258 Z" fill="url(#skinBase)" />
      {/* Right thumb */}
      <path d="M224 258 Q220 256 216 260 Q214 266 216 270 L220 272" fill="url(#skinBase)" />

      {/* ── PELVIS / HIPS ── */}
      <path
        d="M72 238 Q74 256 80 270 L90 282 Q104 292 120 294 Q136 292 150 282 L160 270 Q166 256 168 238 Z"
        fill="url(#skinBase)"
      />
      <path d="M72 238 Q74 254 80 270 L90 282 Q102 290 120 292 Q106 288 96 280 Q86 268 82 254 Q78 244 76 238 Z" fill="url(#skinHL)" />

      {/* ── LEFT LEG ── */}
      {/* Thigh */}
      <path
        d="M86 284 Q82 310 80 338 Q78 358 80 372
           L80 374 Q78 378 80 384 L94 384 Q96 378 94 374
           L94 372 Q94 358 94 338 Q94 314 98 288 Z"
        fill="url(#skinBase)"
      />
      <path d="M86 284 Q84 308 82 338 Q80 354 82 368 L84 370 Q82 354 82 338 Q82 312 86 286 Z" fill="url(#skinHL)" />
      {/* Kneecap — anatomical oval with highlight */}
      <ellipse cx="87" cy="380" rx="7" ry="6" fill="hsl(25 22% 80%)" opacity="0.45" />
      <ellipse cx="85" cy="378" rx="3" ry="2.5" fill="hsl(30 30% 88%)" opacity="0.3" />
      {/* Shin */}
      <path
        d="M80 386 Q76 416 76 442 Q76 458 78 470
           L94 470 Q92 458 92 442 Q92 418 94 388 Z"
        fill="url(#skinBase)"
      />
      <path d="M80 386 Q78 412 78 442 Q78 456 80 466 L82 468 Q80 454 80 442 Q80 416 82 388 Z" fill="url(#skinHL)" />
      {/* Calf muscle */}
      <path d="M78 400 Q72 418 76 436" stroke="hsl(20 10% 66%)" strokeWidth="0.9" fill="none" opacity="0.25" />
      {/* Ankle bone */}
      <ellipse cx="80" cy="468" rx="3.5" ry="2.5" fill="hsl(25 18% 76%)" opacity="0.3" />
      {/* Foot */}
      <path
        d="M76 470 Q72 478 64 484 Q60 488 62 492 Q68 498 82 498 Q96 498 98 492 Q96 486 94 480 Q94 474 94 470 Z"
        fill="url(#skinBase)"
      />
      <path d="M76 470 Q74 476 68 482 Q64 486 66 490 Q70 494 80 496 Q74 492 70 488 Q66 484 72 474 Z" fill="url(#skinHL)" />

      {/* ── RIGHT LEG ── */}
      <path
        d="M154 284 Q158 310 160 338 Q162 358 160 372
           L160 374 Q162 378 160 384 L146 384 Q144 378 146 374
           L146 372 Q146 358 146 338 Q146 314 142 288 Z"
        fill="url(#skinBase)"
      />
      <path d="M154 284 Q156 308 158 338 Q160 354 158 368 L156 370 Q158 354 158 338 Q158 312 154 286 Z" fill="url(#skinSH)" />
      <ellipse cx="153" cy="380" rx="7" ry="6" fill="hsl(25 20% 78%)" opacity="0.4" />
      <ellipse cx="155" cy="378" rx="3" ry="2.5" fill="hsl(30 28% 86%)" opacity="0.25" />
      <path
        d="M160 386 Q164 416 164 442 Q164 458 162 470
           L146 470 Q148 458 148 442 Q148 418 146 388 Z"
        fill="url(#skinBase)"
      />
      <path d="M160 386 Q162 412 162 442 Q162 456 160 466 L158 468 Q160 454 160 442 Q160 416 158 388 Z" fill="url(#skinSH)" />
      <path d="M162 400 Q168 418 164 436" stroke="hsl(20 10% 66%)" strokeWidth="0.9" fill="none" opacity="0.25" />
      <ellipse cx="160" cy="468" rx="3.5" ry="2.5" fill="hsl(25 18% 76%)" opacity="0.3" />
      <path
        d="M164 470 Q168 478 176 484 Q180 488 178 492 Q172 498 158 498 Q144 498 142 492 Q144 486 146 480 Q146 474 146 470 Z"
        fill="url(#skinBase)"
      />
    </g>

    {/* ── Muscle definition lines ── */}
    <g stroke="hsl(20 10% 62%)" strokeWidth="0.7" fill="none" opacity="0.25">
      {/* Collarbones */}
      <path d="M108 70 Q96 72 80 78" />
      <path d="M132 70 Q144 72 160 78" />
      {/* Pectorals */}
      <path d="M82 90 Q100 100 116 96 Q118 98 120 96" />
      <path d="M158 90 Q140 100 124 96" />
      {/* Pec lower line */}
      <path d="M82 92 Q92 102 100 106" />
      <path d="M158 92 Q148 102 140 106" />
      {/* Abs center line */}
      <line x1="120" y1="100" x2="120" y2="228" />
      {/* Ab segments */}
      <path d="M112 120 L112 130" /><path d="M128 120 L128 130" />
      <path d="M112 136 L112 146" /><path d="M128 136 L128 146" />
      <path d="M112 152 L112 162" /><path d="M128 152 L128 162" />
      <path d="M114 168 L114 178" /><path d="M126 168 L126 178" />
      {/* Obliques */}
      <path d="M90 130 Q96 156 98 178" />
      <path d="M150 130 Q144 156 142 178" />
      {/* Navel */}
      <ellipse cx="120" cy="174" rx="2.8" ry="3.5" />
      {/* Deltoid caps */}
      <path d="M52 82 Q42 92 38 106" />
      <path d="M188 82 Q198 92 202 106" />
      {/* Bicep lines */}
      <path d="M38 110 Q34 130 30 152" />
      <path d="M202 110 Q206 130 210 152" />
      {/* Inner arm */}
      <path d="M46 110 Q48 130 48 150" />
      <path d="M194 110 Q192 130 192 150" />
      {/* V-taper waist */}
      <path d="M88 186 Q96 198 100 214" />
      <path d="M152 186 Q144 198 140 214" />
      {/* Quad definition on thighs */}
      <path d="M88 290 Q86 320 84 348" />
      <path d="M92 290 Q92 318 92 346" />
      <path d="M152 290 Q154 320 156 348" />
      <path d="M148 290 Q148 318 148 346" />
      {/* Shin bone */}
      <path d="M84 390 Q82 420 80 450" />
      <path d="M156 390 Q158 420 160 450" />
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
  { id: "shoulder", label: "L Shoulder",   top: "16%",   left: "22%",  labelSide: "left" },
  { id: "shoulder", label: "R Shoulder",   top: "16%",   left: "78%",  labelSide: "right" },
  { id: "elbow",    label: "L Elbow",      top: "32%",   left: "12%",  labelSide: "left" },
  { id: "elbow",    label: "R Elbow",      top: "32%",   left: "88%",  labelSide: "right" },
  { id: "wrist",    label: "L Wrist",      top: "48%",   left: "6%",   labelSide: "left" },
  { id: "wrist",    label: "R Wrist",      top: "48%",   left: "94%",  labelSide: "right" },
  { id: "spine",    label: "Spine",        top: "27%",   left: "50%"  },
  { id: "hip",      label: "L Hip",        top: "50%",   left: "32%",  labelSide: "left" },
  { id: "hip",      label: "R Hip",        top: "50%",   left: "68%",  labelSide: "right" },
  { id: "knee",     label: "L Knee",       top: "73%",   left: "30%",  labelSide: "left" },
  { id: "knee",     label: "R Knee",       top: "73%",   left: "70%",  labelSide: "right" },
  { id: "ankle",    label: "L Ankle",      top: "91%",   left: "30%",  labelSide: "left" },
  { id: "ankle",    label: "R Ankle",      top: "91%",   left: "70%",  labelSide: "right" },
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
