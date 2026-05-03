import ExerciseVideo from "./ExerciseVideo";

import NeckAsset from "../../../public/exercise-videos/exercise-neck.mp4.asset.json";
import ShoulderAsset from "../../../public/exercise-videos/exercise-shoulder.mp4.asset.json";
import ElbowAsset from "../../../public/exercise-videos/exercise-elbow.mp4.asset.json";
import WristAsset from "../../../public/exercise-videos/exercise-wrist.mp4.asset.json";
import HipAsset from "../../../public/exercise-videos/exercise-hip.mp4.asset.json";
import KneeAsset from "../../../public/exercise-videos/exercise-knee.mp4.asset.json";
import AnkleAsset from "../../../public/exercise-videos/exercise-ankle.mp4.asset.json";
import SpineAsset from "../../../public/exercise-videos/exercise-spine.mp4.asset.json";
import HandAsset from "../../../public/exercise-videos/exercise-hand.mp4.asset.json";
import ChairAsset from "../../../public/exercise-videos/exercise-chair.mp4.asset.json";

interface AnimationProps {
  className?: string;
}

const make = (src: string, label: string) =>
  ({ className }: AnimationProps) => (
    <ExerciseVideo src={src} label={label} className={className} />
  );

export const NeckBends = make(NeckAsset.url, "Neck mobility");
export const ShoulderPendulum = make(ShoulderAsset.url, "Shoulder pendulum");
export const ElbowFlexion = make(ElbowAsset.url, "Elbow flexion");
export const WristCircles = make(WristAsset.url, "Wrist circles");
export const HipAbduction = make(HipAsset.url, "Hip abduction");
export const KneeExtension = make(KneeAsset.url, "Knee extension");
export const AnkleCircles = make(AnkleAsset.url, "Ankle circles");
export const SpineCatCow = make(SpineAsset.url, "Spine cat-cow");
export const HandFingerSpread = make(HandAsset.url, "Hand finger spread");
export const HandExercise = HandFingerSpread;
export const ChairMarch = make(ChairAsset.url, "Seated march");

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
