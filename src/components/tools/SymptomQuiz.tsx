import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Dumbbell,
  HandHeart,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  RotateCcw,
  ShieldAlert,
  Stethoscope,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailSignupForm from "@/components/EmailSignupForm";
import { Progress } from "@/components/ui/progress";
import {
  BODY_AREAS,
  DURATION_OPTIONS,
  FLOW_STEPS,
  NEXT_STEP_RESOURCES,
  QuizAnswers,
  QuizStepId,
  RED_FLAGS,
  SEVERITY_OPTIONS,
  SKIN_OPTIONS,
  SOFT_CTAS,
  STORAGE_KEY,
  SWELLING_OPTIONS,
  TIMING_OPTIONS,
  BodyAreaId,
  DurationId,
  SeverityId,
  TimingId,
  SwellingId,
  SkinId,
  emptyAnswers,
  getTriggeredRedFlags,
  highestRedFlagLevel,
  progressPercent,
  rankEducationalGuides,
  stepLabel,
} from "@/data/symptomChecker";

interface SymptomQuizProps {
  /** Compact mode when embedded in Health Tools tabs */
  compact?: boolean;
  onComplete?: () => void;
}

function loadStored(): { step: QuizStepId; answers: QuizAnswers } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { step: QuizStepId; answers: QuizAnswers };
    if (!parsed?.step || !parsed?.answers) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persist(step: QuizStepId, answers: QuizAnswers) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
  } catch {
    /* private mode / quota */
  }
}

function clearStored() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export default function SymptomQuiz({ compact = false, onComplete }: SymptomQuizProps) {
  const headingId = useId();
  const liveRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<QuizStepId>("intro");
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const [hydrated, setHydrated] = useState(false);
  const [resumeOffer, setResumeOffer] = useState(false);

  useEffect(() => {
    const saved = loadStored();
    if (saved && saved.step !== "intro" && saved.step !== "results") {
      setResumeOffer(true);
      setAnswers(saved.answers);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (step === "intro") return;
    persist(step, answers);
  }, [step, answers, hydrated]);

  useEffect(() => {
    liveRef.current?.focus({ preventScroll: true });
  }, [step]);

  const progress = progressPercent(step);
  const flowIndex = Math.max(0, FLOW_STEPS.indexOf(step === "urgent" ? "redflags" : step));
  const flowTotal = FLOW_STEPS.length - 1; // exclude results from "of N questions" feel

  const go = useCallback((next: QuizStepId) => setStep(next), []);

  const resume = () => {
    const saved = loadStored();
    if (saved) {
      setAnswers(saved.answers);
      setStep(saved.step);
    }
    setResumeOffer(false);
  };

  const restart = () => {
    clearStored();
    setAnswers(emptyAnswers());
    setStep("intro");
    setResumeOffer(false);
  };

  const toggleRedFlag = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      redFlags: prev.redFlags.includes(id)
        ? prev.redFlags.filter((x) => x !== id)
        : [...prev.redFlags, id],
    }));
  };

  const toggleArea = (id: BodyAreaId) => {
    setAnswers((prev) => {
      const has = prev.areas.includes(id);
      return {
        ...prev,
        areas: has ? prev.areas.filter((a) => a !== id) : [...prev.areas, id],
      };
    });
  };

  const continueAfterRedFlags = () => {
    const triggered = getTriggeredRedFlags(answers.redFlags);
    const level = highestRedFlagLevel(triggered);
    if (level) {
      go("urgent");
      return;
    }
    go("areas");
  };

  const finish = () => {
    go("results");
    onComplete?.();
  };

  const guides = useMemo(
    () => (step === "results" ? rankEducationalGuides(answers) : []),
    [step, answers],
  );

  const triggered = useMemo(
    () => getTriggeredRedFlags(answers.redFlags),
    [answers.redFlags],
  );
  const urgentLevel = highestRedFlagLevel(triggered);

  const optionClass = (selected: boolean) =>
    `w-full text-left px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      selected
        ? "border-primary bg-primary/5 text-foreground"
        : "border-border bg-card hover:border-primary/40 text-foreground"
    }`;

  const stepHeading = (
    <h2 id={headingId} className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
      {stepLabel(step)}
    </h2>
  );

  return (
    <div className={compact ? "space-y-6" : "space-y-8"} role="region" aria-labelledby={headingId}>
      <div
        ref={liveRef}
        tabIndex={-1}
        className="sr-only"
        aria-live="polite"
      >
        {stepLabel(step)}
      </div>

      {step !== "intro" && step !== "urgent" && (
        <div className="space-y-2" aria-hidden={false}>
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold text-foreground">
              {step === "results"
                ? "Complete"
                : `Step ${Math.min(flowIndex, flowTotal)} of ${flowTotal}`}
            </span>
            <span className="text-muted-foreground tabular-nums">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" aria-label={`Progress ${progress} percent`} />
        </div>
      )}

      {/* INTRO */}
      {step === "intro" && (
        <div className="space-y-6">
          {stepHeading}
          <div
            className="rounded-xl border border-amber-600/40 bg-amber-50 dark:bg-amber-950/40 p-4 sm:p-5 flex gap-3"
            role="note"
          >
            <ShieldAlert className="w-5 h-5 text-amber-800 dark:text-amber-200 shrink-0 mt-0.5" aria-hidden />
            <div className="text-sm sm:text-base text-amber-950 dark:text-amber-50 leading-relaxed">
              <p className="font-semibold mb-1">Educational tool — not a diagnosis</p>
              <p>
                This checker helps you find UK arthritis guides that often overlap with your symptom pattern.
                It cannot diagnose arthritis. Always speak to a GP or rheumatologist for personal medical advice.
                In an emergency call <strong>999</strong>; for urgent advice use{" "}
                <strong>NHS 111</strong>.
              </p>
            </div>
          </div>

          {resumeOffer && (
            <div className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <p className="text-sm text-foreground">You have an unfinished session on this device.</p>
              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={resume} className="min-h-11">
                  Resume
                </Button>
                <Button type="button" variant="outline" onClick={restart} className="min-h-11">
                  Start fresh
                </Button>
              </div>
            </div>
          )}

          <ul className="text-sm sm:text-base text-muted-foreground space-y-2 list-disc pl-5">
            <li>About 3–4 minutes · answers stay in your browser only</li>
            <li>Starts with an urgent-symptom screen for safety</li>
            <li>Ends with condition hubs, exercise, diet and PIP links — not a label</li>
          </ul>

          <Button type="button" size="lg" className="min-h-12 gap-2 w-full sm:w-auto text-base" onClick={() => go("redflags")}>
            Start symptom check <ArrowRight className="w-4 h-4" aria-hidden />
          </Button>
        </div>
      )}

      {/* RED FLAGS */}
      {step === "redflags" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground leading-relaxed">
            Select any that apply right now. If none apply, choose Continue. This screen exists so urgent problems
            are not buried under educational content.
          </p>
          <fieldset className="space-y-3">
            <legend className="sr-only">Urgent or emergency symptoms</legend>
            {RED_FLAGS.map((flag) => {
              const checked = answers.redFlags.includes(flag.id);
              return (
                <label key={flag.id} className={`${optionClass(checked)} flex gap-3 cursor-pointer items-start`}>
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[hsl(var(--primary))] shrink-0"
                    checked={checked}
                    onChange={() => toggleRedFlag(flag.id)}
                    aria-describedby={`rf-help-${flag.id}`}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm sm:text-base font-medium text-foreground leading-snug">
                      {flag.label}
                    </span>
                    <span
                      id={`rf-help-${flag.id}`}
                      className={`mt-1 inline-block text-xs font-bold uppercase tracking-wide ${
                        flag.level === "emergency" ? "text-destructive" : "text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {flag.level === "emergency" ? "Emergency — 999" : "Urgent — 111 / GP"}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("intro")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button type="button" className="min-h-11 gap-1" onClick={continueAfterRedFlags}>
              Continue <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* URGENT INTERRUPT */}
      {step === "urgent" && (
        <div
          className="space-y-5 rounded-2xl border-2 border-destructive bg-destructive/5 p-5 sm:p-8"
          role="alert"
          aria-labelledby={headingId}
        >
          <div className="flex gap-3 items-start">
            <AlertTriangle className="w-7 h-7 text-destructive shrink-0" aria-hidden />
            <div>
              <h2 id={headingId} className="font-display text-2xl font-bold text-foreground">
                {urgentLevel === "emergency" ? "Call 999 now" : "Get urgent NHS advice"}
              </h2>
              <p className="mt-2 text-base text-foreground leading-relaxed">
                Based on what you selected, please seek clinical help before browsing educational guides.
                This tool cannot assess emergencies.
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {triggered.map((f) => (
              <li key={f.id} className="rounded-xl bg-background/80 border border-border p-4 text-sm sm:text-base">
                <p className="font-semibold text-foreground">{f.label}</p>
                <p className="mt-1 text-muted-foreground">{f.help}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {urgentLevel === "emergency" ? (
              <Button asChild size="lg" className="min-h-14 text-base gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90">
                <a href="tel:999" aria-label="Call 999 emergency services">
                  <PhoneCall className="w-5 h-5" aria-hidden /> Call 999
                </a>
              </Button>
            ) : (
              <Button asChild size="lg" className="min-h-14 text-base gap-2">
                <a href="tel:111" aria-label="Call NHS 111 for urgent advice">
                  <Phone className="w-5 h-5" aria-hidden /> Call NHS 111
                </a>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="min-h-14 text-base gap-2">
              <a
                href="https://111.nhs.uk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open NHS 111 online in a new tab"
              >
                NHS 111 online
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            If you are sure these symptoms have resolved and a clinician has already assessed you, you may continue
            for educational reading only.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="min-h-11" onClick={() => go("areas")}>
              Continue for education only
            </Button>
            <Button type="button" variant="ghost" className="min-h-11" onClick={restart}>
              Start again
            </Button>
          </div>
        </div>
      )}

      {/* AREAS */}
      {step === "areas" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground">Select all areas that bother you most. Multi-select is fine.</p>
          <fieldset className="grid sm:grid-cols-2 gap-3">
            <legend className="sr-only">Affected body areas</legend>
            {BODY_AREAS.map((area) => {
              const selected = answers.areas.includes(area.id);
              return (
                <button
                  key={area.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleArea(area.id)}
                  className={optionClass(selected)}
                >
                  <span className="block text-sm sm:text-base font-semibold">{area.label}</span>
                  <span className="block text-xs sm:text-sm text-muted-foreground mt-0.5">{area.hint}</span>
                </button>
              );
            })}
          </fieldset>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("redflags")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button
              type="button"
              className="min-h-11 gap-1"
              disabled={answers.areas.length === 0}
              onClick={() => go("duration")}
            >
              Next <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* DURATION */}
      {step === "duration" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground">Roughly how long have the main symptoms been present?</p>
          <div className="space-y-3" role="radiogroup" aria-label="Symptom duration">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={answers.duration === opt.id}
                onClick={() => setAnswers((a) => ({ ...a, duration: opt.id as DurationId }))}
                className={optionClass(answers.duration === opt.id)}
              >
                <span className="text-sm sm:text-base font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("areas")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button
              type="button"
              className="min-h-11 gap-1"
              disabled={!answers.duration}
              onClick={() => go("severity")}
            >
              Next <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* SEVERITY */}
      {step === "severity" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground">On a typical day recently, how much do symptoms limit you?</p>
          <div className="space-y-3" role="radiogroup" aria-label="Symptom severity">
            {SEVERITY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={answers.severity === opt.id}
                onClick={() => setAnswers((a) => ({ ...a, severity: opt.id as SeverityId }))}
                className={optionClass(answers.severity === opt.id)}
              >
                <span className="block text-sm sm:text-base font-semibold">{opt.label}</span>
                <span className="block text-xs sm:text-sm text-muted-foreground mt-0.5">{opt.description}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("duration")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button
              type="button"
              className="min-h-11 gap-1"
              disabled={!answers.severity}
              onClick={() => go("timing")}
            >
              Next <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* TIMING */}
      {step === "timing" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground">When do symptoms usually feel worst?</p>
          <div className="space-y-3" role="radiogroup" aria-label="When symptoms are worst">
            {TIMING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={answers.timing === opt.id}
                onClick={() => setAnswers((a) => ({ ...a, timing: opt.id as TimingId }))}
                className={optionClass(answers.timing === opt.id)}
              >
                <span className="text-sm sm:text-base font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("severity")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button
              type="button"
              className="min-h-11 gap-1"
              disabled={!answers.timing}
              onClick={() => go("swelling")}
            >
              Next <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* SWELLING */}
      {step === "swelling" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground">Which best describes any swelling?</p>
          <div className="space-y-3" role="radiogroup" aria-label="Swelling pattern">
            {SWELLING_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={answers.swelling === opt.id}
                onClick={() => setAnswers((a) => ({ ...a, swelling: opt.id as SwellingId }))}
                className={optionClass(answers.swelling === opt.id)}
              >
                <span className="text-sm sm:text-base font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("timing")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button
              type="button"
              className="min-h-11 gap-1"
              disabled={!answers.swelling}
              onClick={() => go("skin")}
            >
              Next <ArrowRight className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* SKIN */}
      {step === "skin" && (
        <div className="space-y-5">
          {stepHeading}
          <p className="text-base text-muted-foreground">Any skin changes that might relate to your joints?</p>
          <div className="space-y-3" role="radiogroup" aria-label="Skin changes">
            {SKIN_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={answers.skin === opt.id}
                onClick={() => setAnswers((a) => ({ ...a, skin: opt.id as SkinId }))}
                className={optionClass(answers.skin === opt.id)}
              >
                <span className="text-sm sm:text-base font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" variant="ghost" className="min-h-11 gap-1" onClick={() => go("swelling")}>
              <ArrowLeft className="w-4 h-4" aria-hidden /> Back
            </Button>
            <Button
              type="button"
              className="min-h-11 gap-1"
              disabled={!answers.skin}
              onClick={finish}
            >
              See educational guides <CheckCircle2 className="w-4 h-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {step === "results" && (
        <div className="space-y-8">
          <div
            className="rounded-xl border border-amber-600/40 bg-amber-50 dark:bg-amber-950/40 p-4 flex gap-3"
            role="note"
          >
            <ShieldAlert className="w-5 h-5 text-amber-800 dark:text-amber-200 shrink-0 mt-0.5" aria-hidden />
            <p className="text-sm sm:text-base text-amber-950 dark:text-amber-50 leading-relaxed">
              <strong>Not a diagnosis.</strong> These are educational guides whose typical patterns may overlap with
              your answers. Real conditions overlap — only a clinician can diagnose you.
            </p>
          </div>

          <div>
            <h2 id={headingId} className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
              Guides worth reading next
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-5">
              Ranked by educational pattern overlap — not certainty, probability of disease, or clinical risk.
            </p>

            <ol className="space-y-4">
              {guides.map((g, i) => (
                <li key={g.key}>
                  <article className="rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/50 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shrink-0"
                          aria-hidden
                        >
                          {i + 1}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">{g.name}</h3>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary border border-primary/30 px-2.5 py-1 rounded-full whitespace-nowrap">
                        Pattern overlap {g.relevance}%
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">{g.summary}</p>
                    <p className="text-sm text-foreground/90 flex gap-2 items-start mb-4">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
                      <span>{g.whyRelevant}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" className="min-h-10 gap-1">
                        <Link to={g.path}>
                          <BookOpen className="w-3.5 h-3.5" aria-hidden /> Read {g.name} hub
                        </Link>
                      </Button>
                      {g.jointHint && g.jointHint !== g.path && (
                        <Button asChild size="sm" variant="outline" className="min-h-10">
                          <Link to={g.jointHint}>Related joint page</Link>
                        </Button>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <section aria-labelledby="next-steps-heading" className="space-y-4">
            <h3 id="next-steps-heading" className="font-display text-lg font-bold text-foreground">
              Practical next steps
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {NEXT_STEP_RESOURCES.map((r) => {
                const Icon =
                  r.href.includes("exercise")
                    ? Dumbbell
                    : r.href.includes("diet")
                      ? Utensils
                      : r.href.includes("benefits") || r.href.includes("pip") || r.href.includes("/faq/")
                        ? HandHeart
                        : r.href.includes("osteoarthritis")
                          ? BookOpen
                          : Stethoscope;
                return (
                  <Link
                    key={r.href}
                    to={r.href}
                    className="rounded-xl border border-border p-4 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Icon className="w-5 h-5 text-primary mb-2" aria-hidden />
                    <p className="font-semibold text-foreground text-sm sm:text-base">{r.label}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{r.description}</p>
                  </Link>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If symptoms last more than a few weeks, book a GP appointment. Take a short symptom diary (when it hurts,
              which joints, morning stiffness length, swelling, and what helps).
            </p>
          </section>

          <section
            aria-labelledby="checker-email-heading"
            className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-2 inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" /> Optional email
            </p>
            <h3 id="checker-email-heading" className="font-display text-lg font-bold text-foreground mb-2">
              Want a short guide series after this?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
              Free PECR-consent emails on flare prep, GP visits and living well with arthritis.
              Educational only — not a diagnosis or medical advice. Living With Arthritis UK
              (charity 1218461).
            </p>
            <EmailSignupForm
              sequence="symptom-checker"
              buttonText="Request guides by email"
              label="Email for practical arthritis guides"
            />
          </section>

          <section aria-labelledby="soft-cta-heading" className="rounded-2xl border border-border/60 bg-muted/20 p-5">
            <h3 id="soft-cta-heading" className="font-display text-base font-bold text-foreground mb-3">
              Optional extras
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {SOFT_CTAS.map((c) => (
                <Button key={c.href} asChild variant="outline" className="min-h-11 justify-start gap-2">
                  <Link to={c.href}>
                    {c.href === "/chat" ? (
                      <MessageCircle className="w-4 h-4" aria-hidden />
                    ) : c.href === "/donate" ? (
                      <HandHeart className="w-4 h-4" aria-hidden />
                    ) : (
                      <BookOpen className="w-4 h-4" aria-hidden />
                    )}
                    {c.label}
                  </Link>
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Soft prompts only — never required to use this tool.</p>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="min-h-11 gap-2" onClick={restart}>
              <RotateCcw className="w-4 h-4" aria-hidden /> Start again
            </Button>
            <Button asChild className="min-h-11">
              <Link to="/guides/newly-diagnosed">Prepare for your GP visit</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
