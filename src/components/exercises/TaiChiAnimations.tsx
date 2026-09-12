import ExerciseVideo from "./ExerciseVideo";

/**
 * Static paths for tai chi demos. Lovable *.mp4.asset.json pointed at
 * /__l5e/ CDN URLs that 404 on GitHub-only hosting — ExerciseVideo
 * shows the SVG / "Demonstration unavailable" fallback when files are missing.
 */
const VIDEO = {
  "rooted-stance": "/exercise-videos/tai-chi-rooted-stance.mp4",
  "weight-shift": "/exercise-videos/tai-chi-weight-shift.mp4",
  "cloud-hands": "/exercise-videos/tai-chi-cloud-hands.mp4",
  "brush-knee": "/exercise-videos/tai-chi-brush-knee.mp4",
  "closing-posture": "/exercise-videos/tai-chi-closing-posture.mp4",
} as const;

interface AnimationProps {
  className?: string;
}

const make = (src: string, label: string) =>
  ({ className }: AnimationProps) => (
    <ExerciseVideo src={src} label={label} className={className} />
  );

export const RootedStance = make(VIDEO["rooted-stance"], "Rooted Stance");
export const WeightShift = make(VIDEO["weight-shift"], "Weight Shift");
export const CloudHands = make(VIDEO["cloud-hands"], "Cloud Hands");
export const BrushKnee = make(VIDEO["brush-knee"], "Brush Knee");
export const ClosingPosture = make(VIDEO["closing-posture"], "Closing Posture");

// eslint-disable-next-line react-refresh/only-export-components
export const TAI_CHI_ANIMATIONS = {
  "rooted-stance": RootedStance,
  "weight-shift": WeightShift,
  "cloud-hands": CloudHands,
  "brush-knee": BrushKnee,
  "closing-posture": ClosingPosture,
} as const;

export type TaiChiAnimKey = keyof typeof TAI_CHI_ANIMATIONS;

// eslint-disable-next-line react-refresh/only-export-components
export const TAI_CHI_VIDEOS: Record<TaiChiAnimKey, { src: string; label: string }> = {
  "rooted-stance": { src: VIDEO["rooted-stance"], label: "Rooted Stance" },
  "weight-shift": { src: VIDEO["weight-shift"], label: "Weight Shift" },
  "cloud-hands": { src: VIDEO["cloud-hands"], label: "Cloud Hands" },
  "brush-knee": { src: VIDEO["brush-knee"], label: "Brush Knee" },
  "closing-posture": { src: VIDEO["closing-posture"], label: "Closing Posture" },
};
