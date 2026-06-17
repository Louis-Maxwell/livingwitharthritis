import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

type Joint = "knee" | "hip" | "hand" | "shoulder" | "back" | "other";
type Goal = "walk" | "sleep" | "work" | "play";
type Age = "under-40" | "40-59" | "60-74" | "75+";

interface Pillar {
  title: string;
  summary: string;
  href: string;
}

interface PlanResponse {
  pillars: Pillar[];
}

const STEP_COUNT = 5;

export default function QuickAssessmentQuiz() {
  const [step, setStep] = useState(0);
  const [joint, setJoint] = useState<Joint | null>(null);
  const [pain, setPain] = useState(5);
  const [stiffness, setStiffness] = useState(15);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [age, setAge] = useState<Age | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Pillar[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setJoint(null);
    setPain(5);
    setStiffness(15);
    setGoal(null);
    setAge(null);
    setEmail("");
    setPlan(null);
    setError(null);
  };

  const submit = async () => {
    if (!joint || !goal || !age) return;
    setLoading(true);
    setError(null);
    try {
      trackEvent("quiz_submit", { joint, pain, goal, age });
      const { data, error: fnErr } = await supabase.functions.invoke<PlanResponse>(
        "score-arthritis-check",
        {
          body: {
            joint,
            painLevel: pain,
            stiffnessMinutes: stiffness,
            activityGoal: goal,
            ageBand: age,
            email: email || undefined,
          },
        },
      );
      if (fnErr) throw fnErr;
      if (!data?.pillars) throw new Error("No plan returned");
      setPlan(data.pillars);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const canNext =
    (step === 0 && !!joint) ||
    (step === 1 && pain >= 0) ||
    (step === 2 && stiffness >= 0) ||
    (step === 3 && !!goal) ||
    (step === 4 && !!age);

  return (
    <section id="quick-check" className="bg-card py-20 lg:py-28 border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-10 max-w-[960px]">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">
            60-second arthritis check
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]">
            Five questions. One personalised plan.
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground">
            Anonymous. No sign-up. Educational — not a diagnosis.
          </p>
        </header>

        <div className="rounded-2xl border border-border bg-background shadow-lg p-7 lg:p-10">
          {!plan ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8" aria-hidden="true">
                {Array.from({ length: STEP_COUNT }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Step 0 */}
              {step === 0 && (
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">
                    Which joint hurts most?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(["knee", "hip", "hand", "shoulder", "back", "other"] as Joint[]).map(
                      (j) => (
                        <button
                          key={j}
                          onClick={() => setJoint(j)}
                          className={`h-14 rounded-md border font-medium capitalize transition ${
                            joint === j
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          {j}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">
                    How bad is the pain today? <span className="text-primary">({pain}/10)</span>
                  </h3>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={pain}
                    onChange={(e) => setPain(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))]"
                    aria-label="Pain level"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>None</span>
                    <span>Worst imaginable</span>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">
                    Morning stiffness duration?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[5, 15, 30, 60].map((m) => (
                      <button
                        key={m}
                        onClick={() => setStiffness(m)}
                        className={`h-14 rounded-md border font-medium transition ${
                          stiffness === m
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {m === 60 ? "60+ min" : `≤ ${m} min`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">
                    What matters most to you?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      ["walk", "Walking further"],
                      ["sleep", "Sleeping through"],
                      ["work", "Working comfortably"],
                      ["play", "Playing with family"],
                    ] as [Goal, string][]).map(([g, label]) => (
                      <button
                        key={g}
                        onClick={() => setGoal(g)}
                        className={`h-14 rounded-md border font-medium transition ${
                          goal === g
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-5">
                    Your age range?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {(["under-40", "40-59", "60-74", "75+"] as Age[]).map((a) => (
                      <button
                        key={a}
                        onClick={() => setAge(a)}
                        className={`h-14 rounded-md border font-medium transition ${
                          age === a
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {a === "under-40" ? "Under 40" : a}
                      </button>
                    ))}
                  </div>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">
                      Email me my plan (optional)
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                      placeholder="you@example.com"
                      className="mt-2 w-full h-12 px-4 rounded-md border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </label>
                </div>
              )}

              {error && (
                <p className="mt-4 text-sm text-destructive">{error}</p>
              )}

              {/* Nav */}
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="h-11 px-5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  ← Back
                </button>
                {step < STEP_COUNT - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-40 transition"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={!canNext || loading}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-40 transition"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Building plan…
                      </>
                    ) : (
                      <>
                        Get my plan <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-primary mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                  Your personalised plan
                </p>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8">
                Three things you can start today.
              </h3>
              <div className="grid md:grid-cols-3 gap-5">
                {plan.map((p) => (
                  <Link
                    key={p.title}
                    to={p.href}
                    className="block p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:-translate-y-0.5 transition group"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                      {p.title}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">{p.summary}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </p>
                  </Link>
                ))}
              </div>
              <button
                onClick={reset}
                className="mt-8 text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Take the check again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
