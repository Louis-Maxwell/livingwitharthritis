import ExerciseVideo from "./ExerciseVideo";

import RootedStanceAsset from "@/assets/tai-chi-rooted-stance.mp4.asset.json";
import WeightShiftAsset from "@/assets/tai-chi-weight-shift.mp4.asset.json";
import CloudHandsAsset from "@/assets/tai-chi-cloud-hands.mp4.asset.json";
import BrushKneeAsset from "@/assets/tai-chi-brush-knee.mp4.asset.json";
import ClosingPostureAsset from "@/assets/tai-chi-closing-posture.mp4.asset.json";

interface AnimationProps {
  className?: string;
}

const make = (src: string, label: string) =>
  ({ className }: AnimationProps) => (
    <ExerciseVideo src={src} label={label} className={className} />
  );

export const RootedStance = make(RootedStanceAsset.url, "Rooted Stance");
export const WeightShift = make(WeightShiftAsset.url, "Weight Shift");
export const CloudHands = make(CloudHandsAsset.url, "Cloud Hands");
export const BrushKnee = make(BrushKneeAsset.url, "Brush Knee");
export const ClosingPosture = make(ClosingPostureAsset.url, "Closing Posture");

export const TAI_CHI_ANIMATIONS = {
  "rooted-stance": RootedStance,
  "weight-shift": WeightShift,
  "cloud-hands": CloudHands,
  "brush-knee": BrushKnee,
  "closing-posture": ClosingPosture,
} as const;
