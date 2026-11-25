import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ClipboardList, Printer } from "lucide-react";

const JOINTS = [
  "Knee",
  "Hip",
  "Hands or fingers",
  "Shoulder",
  "Spine or back",
  "Foot or ankle",
  "Several joints",
] as const;

const DURATIONS = [
  "Under 6 weeks",
  "6 weeks to 3 months",
  "3 to 12 months",
  "Over a year",
] as const;

const LIMITS = [
  "Walking distance",
  "Stairs",
  "Dressing or washing",
  "Gripping or opening jars",
  "Sleep",
  "Work or caring",
] as const;

const SLEEP_OPTIONS = ["Sleep is fine", "Woken some nights", "Woken most nights"] as const;

const GP_QUESTIONS = [
  "What is the most likely cause of these symptoms?",
  "What treatment should I try first, and for how long?",
  "Should I be referred to physiotherapy or rheumatology?",
  "What should I do if things get worse, and what are the warning signs?",
];

/**
 * GP Appointment Prep Sheet (Pillar 1, Phase 1).
 * A 60-second questionnaire that builds a one-page printable summary
 * designed for an 8-minute GP appointment. No sign-in, nothing stored.
 */
export default function GpPrepSheet() {
  const [joint, setJoint] = useState<string>("");
  const [pain, setPain] = useState<number[]>([5]);
  const [duration, setDuration] = useState<string>("");
  const [sleep, setSleep] = useState<string>("");
  const [limits, setLimits] = useState<string[]>([]);
  const [built, setBuilt] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = () => {
      document.body.classList.remove("gp-prep-printing");
      hostRef.current?.parentElement?.classList.remove("gp-sheet-keep");
    };
    window.addEventListener("afterprint", cleanup);
    return () => window.removeEventListener("afterprint", cleanup);
  }, []);

  const toggleLimit = (item: string) =>
    setLimits((prev) => (prev.includes(item) ? prev.filter((l) => l !== item) : [...prev, item]));

  const summary = useMemo(
    () => ({
      joint: joint || "Not specified",
      pain: pain[0],
      duration: duration || "Not specified",
      sleep: sleep || "Not specified",
      limits: limits.length ? limits : ["None selected"],
    }),
    [joint, pain, duration, sleep, limits],
  );

  const handlePrint = () => {
    hostRef.current?.parentElement?.classList.add("gp-sheet-keep");
    document.body.classList.add("gp-prep-printing");
    window.print();
  };

  return (
    <section
      ref={hostRef}
      className="gp-prep-sheet-root my-8 rounded-xl border border-border bg-white p-6"
      aria-label="GP appointment prep sheet"
    >
      <div className="no-print">
        <h2 className="text-xl font-bold text-foreground mb-2">GP appointment prep sheet</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Answer five quick questions and get a one-page summary to take to your GP appointment.
          Nothing is saved or sent — it stays on your device.
        </p>

        <div className="space-y-5">
          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">Which joint troubles you most?</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {JOINTS.map((j) => (
                <label key={j} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-[:checked]:border-primary">
                  <input
                    type="radio"
                    name="gp-joint"
                    className="h-4 w-4 accent-[hsl(350,85%,42%)]"
                    checked={joint === j}
                    onChange={() => setJoint(j)}
                  />
                  {j}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">
              Pain over the past week: <span className="text-primary">{pain[0]}/10</span>
            </legend>
            <Slider value={pain} onValueChange={setPain} min={0} max={10} step={1} aria-label="Pain level out of 10" />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>0 = no pain</span>
              <span>10 = worst pain</span>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">How long has it been going on?</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {DURATIONS.map((d) => (
                <label key={d} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-[:checked]:border-primary">
                  <input
                    type="radio"
                    name="gp-duration"
                    className="h-4 w-4 accent-[hsl(350,85%,42%)]"
                    checked={duration === d}
                    onChange={() => setDuration(d)}
                  />
                  {d}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">What does it stop you doing? (tick all that apply)</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {LIMITS.map((l) => (
                <label key={l} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-[:checked]:border-primary">
                  <Checkbox checked={limits.includes(l)} onCheckedChange={() => toggleLimit(l)} aria-label={l} />
                  {l}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">How is your sleep?</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {SLEEP_OPTIONS.map((s) => (
                <label key={s} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm has-[:checked]:border-primary">
                  <input
                    type="radio"
                    name="gp-sleep"
                    className="h-4 w-4 accent-[hsl(350,85%,42%)]"
                    checked={sleep === s}
                    onChange={() => setSleep(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="button" className="min-h-12 w-full sm:w-auto" onClick={() => setBuilt(true)}>
            <ClipboardList className="mr-2 h-4 w-4" /> Build my one-page sheet
          </Button>
        </div>
      </div>

      {built && (
        <div className="mt-6 rounded-lg border border-border bg-white p-5">
          <div className="mb-3 flex items-center justify-between gap-3 no-print">
            <h3 className="text-lg font-bold text-foreground">Your GP appointment sheet</h3>
            <Button type="button" variant="outline" className="min-h-12" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
          </div>
          <h3 className="print-only text-lg font-bold">GP appointment sheet</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2"><dt className="font-semibold">Main problem joint:</dt><dd>{summary.joint}</dd></div>
            <div className="flex gap-2"><dt className="font-semibold">Pain this week:</dt><dd>{summary.pain}/10</dd></div>
            <div className="flex gap-2"><dt className="font-semibold">How long:</dt><dd>{summary.duration}</dd></div>
            <div className="flex gap-2"><dt className="font-semibold">Sleep:</dt><dd>{summary.sleep}</dd></div>
            <div className="flex gap-2">
              <dt className="font-semibold">It stops me:</dt>
              <dd>{summary.limits.join(", ")}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-foreground mb-1">Questions I want to ask</h4>
            <ol className="list-decimal space-y-1 pl-5 text-sm">
              {GP_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Prepared with Living With Arthritis (registered charity 1218461). This summary is your own notes to
            support the conversation with your GP — it is not a medical assessment. If a joint is suddenly hot,
            red and swollen, or you feel feverish or very unwell, seek same-day medical help.
          </p>
        </div>
      )}
    </section>
  );
}
