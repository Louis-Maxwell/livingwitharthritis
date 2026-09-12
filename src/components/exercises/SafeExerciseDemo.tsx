import { VideoOff } from "lucide-react";

/**
 * Static demo slot — never lazy-load animations or use a class ErrorBoundary.
 * A previous version imported React.Component/lazy/Suspense in a chunk that
 * also pulled a second React copy via lucide-react, which crashed /exercises
 * at the page ErrorBoundary.
 */
const LABELS: Record<string, string> = {
  neck: "Neck mobility",
  shoulder: "Shoulder pendulum",
  elbow: "Elbow flexion",
  wrist: "Wrist circles",
  hip: "Hip abduction",
  knee: "Knee extension",
  ankle: "Ankle circles",
  spine: "Spine cat-cow",
  hand: "Hand finger spread",
  chair: "Seated march",
};

interface SafeExerciseDemoProps {
  animKey: string;
  caption?: string;
  className?: string;
}

export function SafeExerciseDemo({ animKey, caption, className }: SafeExerciseDemoProps) {
  const label = LABELS[animKey];
  if (!label) return null;

  return (
    <div className={className}>
      <div
        className="flex flex-col items-center justify-center gap-2 min-h-[160px] rounded-2xl border border-border/40 bg-muted/20 px-4 py-6 text-center"
        role="img"
        aria-label={`${label} — follow the written steps`}
      >
        <VideoOff className="w-5 h-5 text-muted-foreground" aria-hidden />
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground leading-snug">
          Use the written steps on this page. Video demonstrations will return once the files are hosted.
        </p>
      </div>
      {caption ? (
        <p className="text-[11px] text-muted-foreground text-center mt-1.5 italic">{caption}</p>
      ) : null}
    </div>
  );
}

export default SafeExerciseDemo;
