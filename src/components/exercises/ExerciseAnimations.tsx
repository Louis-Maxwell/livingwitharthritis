import ExerciseVideo from "./ExerciseVideo";

/**
 * Static public paths only — do not import *.mp4.asset.json from /public.
 * Actual .mp4 binaries are often absent from the GitHub repo; ExerciseVideo
 * falls back to CinematicHumanoid / labelled placeholder on 404.
 */
const VIDEO = {
  neck: "/exercise-videos/exercise-neck.mp4",
  shoulder: "/exercise-videos/exercise-shoulder.mp4",
  elbow: "/exercise-videos/exercise-elbow.mp4",
  wrist: "/exercise-videos/exercise-wrist.mp4",
  hip: "/exercise-videos/exercise-hip.mp4",
  knee: "/exercise-videos/exercise-knee.mp4",
  ankle: "/exercise-videos/exercise-ankle.mp4",
  spine: "/exercise-videos/exercise-spine.mp4",
  hand: "/exercise-videos/exercise-hand.mp4",
  chair: "/exercise-videos/exercise-chair.mp4",
} as const;

interface AnimationProps {
  className?: string;
}

const make = (src: string, label: string) =>
  ({ className }: AnimationProps) => (
    <ExerciseVideo src={src} label={label} className={className} />
  );

export const NeckBends = make(VIDEO.neck, "Neck mobility");
export const ShoulderPendulum = make(VIDEO.shoulder, "Shoulder pendulum");
export const ElbowFlexion = make(VIDEO.elbow, "Elbow flexion");
export const WristCircles = make(VIDEO.wrist, "Wrist circles");
export const HipAbduction = make(VIDEO.hip, "Hip abduction");
export const KneeExtension = make(VIDEO.knee, "Knee extension");
export const AnkleCircles = make(VIDEO.ankle, "Ankle circles");
export const SpineCatCow = make(VIDEO.spine, "Spine cat-cow");
export const HandFingerSpread = make(VIDEO.hand, "Hand finger spread");
export const HandExercise = HandFingerSpread;
export const ChairMarch = make(VIDEO.chair, "Seated march");

// eslint-disable-next-line react-refresh/only-export-components
export const EXERCISE_ANIMATIONS = {
  // Joint Exercise Section ids
  neck: NeckBends,
  shoulder: ShoulderPendulum,
  elbow: ElbowFlexion,
  wrist: WristCircles,
  hip: HipAbduction,
  knee: KneeExtension,
  ankle: AnkleCircles,
  spine: SpineCatCow,
  // Exercise Hub category ids
  hand: HandExercise,
  chair: ChairMarch,
} as const;

export type ExerciseAnimationKey = keyof typeof EXERCISE_ANIMATIONS;
