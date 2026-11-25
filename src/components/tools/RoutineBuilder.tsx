import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Play, RotateCcw, TriangleAlert } from "lucide-react";
import { ROUTINES } from "@/data/routineBuilder";

/**
 * Interactive Joint Mobility & Exercise Routine Builder (Pillar 1, Phase 3).
 * Pick a joint to get a customised 3-step daily mobility sequence with
 * timer cues, form checkpoints and contraindication notices. All exercise
 * content is condensed from the site's reviewed guides (see
 * src/data/routineBuilder.ts). No sign-in, nothing stored.
 */
export default function RoutineBuilder() {
  const [joint, setJoint] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = (stepIndex: number, seconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveStep(stepIndex);
    setSecondsLeft(seconds);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setActiveStep(null);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const routine = ROUTINES.find((r) => r.joint === joint);

  return (
    <section className="no-print my-8 rounded-xl border border-border bg-white p-6" aria-label="Exercise routine builder">
      <h2 className="text-xl font-bold text-foreground mb-2">Build your 3-step daily routine</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Choose a joint and get a short mobility sequence with timer cues and safety checks, taken from
        our clinically reviewed exercise guides.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Choose a joint">
        {ROUTINES.map((r) => (
          <label
            key={r.joint}
            className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-center text-sm has-[:checked]:border-primary"
          >
            <input
              type="radio"
              name="routine-joint"
              className="h-4 w-4 accent-[hsl(350,85%,42%)]"
              checked={joint === r.joint}
              onChange={() => {
                setJoint(r.joint);
                setActiveStep(null);
                if (timerRef.current) clearInterval(timerRef.current);
              }}
            />
            {r.joint}
          </label>
        ))}
      </div>

      {routine && (
        <div className="mt-6">
          <ol className="space-y-5">
            {routine.steps.map((step, i) => (
              <li key={step.name} className="rounded-lg border border-border p-4">
                <h3 className="text-base font-semibold text-foreground">
                  {i + 1}. {step.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{step.how}</p>
                <p className="mt-1 text-sm">
                  <strong>Dose:</strong> {step.dose}
                </p>
                {step.timerSeconds > 0 && (
                  <div className="mt-3 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-12"
                      onClick={() =>
                        activeStep === i ? (setActiveStep(null), timerRef.current && clearInterval(timerRef.current)) : startTimer(i, step.timerSeconds)
                      }
                    >
                      {activeStep === i ? (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4" /> Stop
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" /> Start {step.timerSeconds}s timer
                        </>
                      )}
                    </Button>
                    {activeStep === i && (
                      <span className="text-lg font-bold text-primary" role="timer" aria-live="polite">
                        {secondsLeft}s
                      </span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>

          <aside className="mt-5 flex gap-2 rounded-lg border border-primary/30 bg-white p-4" aria-label="Safety and stop rules">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm leading-relaxed text-foreground">
              <strong>Safety check.</strong> {routine.safety}
            </p>
          </aside>

          <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <Dumbbell className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            From the clinically reviewed Living With Arthritis exercise guides (reviewer: Louis Maxwell,
            HCPC PH128483). General information, not a substitute for personalised medical advice.
          </p>
        </div>
      )}
    </section>
  );
}
