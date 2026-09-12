import { Component, Suspense, lazy, type ReactNode } from "react";
import { VideoOff } from "lucide-react";
import type { ExerciseAnimationKey } from "./ExerciseAnimations";

const KNOWN_KEYS = new Set([
  "neck", "shoulder", "elbow", "wrist", "hip", "knee", "ankle", "spine", "hand", "chair",
]);

/**
 * Isolates exercise demo chunks so a missing video / bad animation
 * never takes down ExerciseHub or the joint diagram.
 */
class DemoErrorBoundary extends Component<
  { children: ReactNode; label?: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Intentionally quiet — fallback UI is enough for static hosting.
  }

  render() {
    if (this.state.failed) {
      return (
        <div
          className="flex flex-col items-center justify-center gap-2 min-h-[160px] rounded-2xl border border-border/40 bg-muted/20 px-4 py-6 text-center"
          role="status"
        >
          <VideoOff className="w-5 h-5 text-muted-foreground" aria-hidden />
          <p className="text-sm font-medium text-foreground">Demonstration unavailable</p>
          <p className="text-[11px] text-muted-foreground">
            {this.props.label
              ? `${this.props.label} — use the written steps instead.`
              : "Use the written exercise list on this page."}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const LazyAnimSlot = lazy(async () => {
  const mod = await import("./ExerciseAnimations");
  const Slot = ({ animKey }: { animKey: ExerciseAnimationKey }) => {
    const Anim = mod.EXERCISE_ANIMATIONS[animKey];
    if (!Anim) return null;
    return <Anim />;
  };
  return { default: Slot };
});

interface SafeExerciseDemoProps {
  animKey: string;
  caption?: string;
  className?: string;
}

export function SafeExerciseDemo({ animKey, caption, className }: SafeExerciseDemoProps) {
  if (!KNOWN_KEYS.has(animKey)) return null;
  const key = animKey as ExerciseAnimationKey;

  return (
    <div className={className}>
      <DemoErrorBoundary label={animKey}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[160px] rounded-2xl border border-border/40 bg-muted/10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            </div>
          }
        >
          <LazyAnimSlot animKey={key} />
        </Suspense>
      </DemoErrorBoundary>
      {caption ? (
        <p className="text-[11px] text-muted-foreground text-center mt-1.5 italic">{caption}</p>
      ) : null}
    </div>
  );
}

export default SafeExerciseDemo;
