import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Printer, RotateCcw, Trophy, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EXERCISE_GUIDES = [
  {
    id: "knee",
    title: "Knee Exercise Routine",
    icon: "🦵",
    color: "border-sky-500/30 bg-sky-500/5",
    accentColor: "text-sky-700",
    badgeColor: "bg-sky-500/10 text-sky-700",
    exercises: [
      "Straight leg raises – 3 × 10",
      "Wall sits – hold 15–30 sec",
      "Step-ups – 2 × 10 each leg",
      "Hamstring curls – 3 × 10",
    ],
  },
  {
    id: "hand",
    title: "Hand Exercise Guide",
    icon: "✋",
    color: "border-emerald-500/30 bg-emerald-500/5",
    accentColor: "text-emerald-700",
    badgeColor: "bg-emerald-500/10 text-emerald-700",
    exercises: [
      "Finger bends – 10 reps each finger",
      "Thumb touches – 10 reps each hand",
      "Fist clenches with putty",
      "Finger spreads – hold 5 sec × 10",
    ],
  },
  {
    id: "shoulder",
    title: "Shoulder Exercises",
    icon: "💪",
    color: "border-violet-500/30 bg-violet-500/5",
    accentColor: "text-violet-700",
    badgeColor: "bg-violet-500/10 text-violet-700",
    exercises: [
      "Pendulum swings – 30 sec each arm",
      "Wall crawls – reach higher daily",
      "Cross-body stretches – hold 15 sec",
      "External rotation with band",
    ],
  },
  {
    id: "chair",
    title: "Chair Exercise Guide",
    icon: "🪑",
    color: "border-amber-500/30 bg-amber-500/5",
    accentColor: "text-amber-700",
    badgeColor: "bg-amber-500/10 text-amber-700",
    exercises: [
      "Seated marching – 2 minutes",
      "Ankle circles – 10 each direction",
      "Seated knee extensions – 3 × 10",
      "Arm raises – 2 × 8",
    ],
  },
];

type CompletionMap = Record<string, Record<string, Record<string, boolean>>>;

const STORAGE_KEY = "exercise_progress_tracker";

function loadProgress(): CompletionMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: CompletionMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getWeekLabel() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return monday.toISOString().slice(0, 10);
}

export default function ExerciseProgressTracker() {
  const [completions, setCompletions] = useState<CompletionMap>(loadProgress);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const weekKey = getWeekLabel();

  const toggle = useCallback(
    (guideId: string, exerciseIdx: string, day: string) => {
      setCompletions((prev) => {
        const next = { ...prev };
        if (!next[weekKey]) next[weekKey] = {};
        if (!next[weekKey][guideId]) next[weekKey][guideId] = {};
        const key = `${exerciseIdx}_${day}`;
        next[weekKey][guideId][key] = !next[weekKey][guideId][key];
        saveProgress(next);
        return next;
      });
    },
    [weekKey]
  );

  const getCompleted = (guideId: string, exerciseIdx: number, day: string) =>
    !!completions[weekKey]?.[guideId]?.[`${exerciseIdx}_${day}`];

  const getGuideTotal = (guideId: string, exerciseCount: number) => {
    let count = 0;
    for (let i = 0; i < exerciseCount; i++) {
      for (const day of DAYS) {
        if (completions[weekKey]?.[guideId]?.[`${i}_${day}`]) count++;
      }
    }
    return count;
  };

  const getTotalCompleted = () =>
    EXERCISE_GUIDES.reduce(
      (sum, g) => sum + getGuideTotal(g.id, g.exercises.length),
      0
    );

  const getTotalPossible = () =>
    EXERCISE_GUIDES.reduce((sum, g) => sum + g.exercises.length * 7, 0);

  const resetWeek = () => {
    setCompletions((prev) => {
      const next = { ...prev };
      delete next[weekKey];
      saveProgress(next);
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const totalDone = getTotalCompleted();
  const totalPossible = getTotalPossible();
  const weekPercent = Math.round((totalDone / totalPossible) * 100);

  // Week start display
  const weekStart = new Date(weekKey);
  const weekEnd = new Date(weekKey);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return (
    <section className="py-16 lg:py-20 bg-muted/10 print:py-4">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center print:hidden">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Weekly Progress Tracker</h2>
              <p className="text-sm text-muted-foreground">
                Week of {fmt(weekStart)} – {fmt(weekEnd)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <Button variant="outline" size="sm" onClick={resetWeek} className="gap-1.5 text-xs">
              <RotateCcw className="w-3.5 h-3.5" /> Reset Week
            </Button>
            <Button size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </Button>
          </div>
        </div>

        {/* Overall progress */}
        <Card className="border border-border/40 mb-8 print:mb-4 print:shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-foreground">Overall Weekly Progress</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {totalDone} / {totalPossible} sessions
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-3 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${weekPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-muted-foreground">0%</span>
              <span className="text-xs font-semibold text-primary">{weekPercent}% complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Guide trackers */}
        <div className="space-y-5">
          {EXERCISE_GUIDES.map((guide) => {
            const done = getGuideTotal(guide.id, guide.exercises.length);
            const possible = guide.exercises.length * 7;
            const pct = Math.round((done / possible) * 100);
            const isExpanded = expanded[guide.id] !== false; // default open

            return (
              <Card
                key={guide.id}
                className={`border ${guide.color} overflow-hidden print:break-inside-avoid`}
              >
                {/* Guide header — clickable to collapse */}
                <button
                  className="w-full text-left print:pointer-events-none"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [guide.id]: !isExpanded }))
                  }
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center justify-between p-5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">{guide.icon}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{guide.title}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="w-24 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-1.5 rounded-full bg-primary transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${guide.accentColor}`}>
                            {done}/{possible}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 print:hidden">
                      <Badge variant="outline" className={`text-xs ${guide.badgeColor} border-0`}>
                        {pct}%
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <CardContent className="px-5 pb-5 pt-0">
                        {/* Day header row */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs min-w-[520px]">
                            <thead>
                              <tr>
                                <th className="text-left py-2 pr-3 font-medium text-muted-foreground w-48">
                                  Exercise
                                </th>
                                {DAYS.map((d) => (
                                  <th
                                    key={d}
                                    className="text-center py-2 px-1 font-medium text-muted-foreground w-10"
                                  >
                                    {d}
                                  </th>
                                ))}
                                <th className="text-center py-2 px-1 font-medium text-muted-foreground w-12">
                                  Done
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                              {guide.exercises.map((ex, i) => {
                                const exDone = DAYS.filter((d) =>
                                  getCompleted(guide.id, i, d)
                                ).length;
                                return (
                                  <tr key={i} className="group">
                                    <td className="py-2.5 pr-3 text-foreground text-xs font-medium leading-tight">
                                      {ex}
                                    </td>
                                    {DAYS.map((day) => {
                                      const checked = getCompleted(guide.id, i, day);
                                      return (
                                        <td
                                          key={day}
                                          className="text-center py-2.5 px-1"
                                        >
                                          <button
                                            onClick={() =>
                                              toggle(guide.id, String(i), day)
                                            }
                                            aria-label={`${checked ? "Unmark" : "Mark"} ${ex} on ${day}`}
                                            className="mx-auto flex items-center justify-center w-7 h-7 rounded-full hover:bg-background transition-colors print:pointer-events-none"
                                          >
                                            {checked ? (
                                              <CheckCircle className="w-5 h-5 text-primary" />
                                            ) : (
                                              <Circle className="w-5 h-5 text-muted-foreground/40 print:text-muted-foreground" />
                                            )}
                                          </button>
                                        </td>
                                      );
                                    })}
                                    <td className="text-center py-2.5 px-1">
                                      <span
                                        className={`text-xs font-bold ${
                                          exDone === 7
                                            ? "text-primary"
                                            : exDone > 0
                                            ? "text-amber-600"
                                            : "text-muted-foreground/40"
                                        }`}
                                      >
                                        {exDone}/7
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        {/* Motivational tip */}
                        {pct === 100 && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-primary font-medium bg-primary/5 rounded-lg px-3 py-2">
                            <Trophy className="w-3.5 h-3.5 shrink-0" />
                            Excellent work — you completed all {guide.title} sessions this week! 🎉
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

        {/* Print footer */}
        <div className="hidden print:block mt-8 text-center text-xs text-muted-foreground border-t border-border/40 pt-4">
          <p>Living With Arthritis – Exercise Progress Tracker · Week of {fmt(weekStart)} – {fmt(weekEnd)}</p>
          <p className="mt-1">livingwitharthritis.org.uk · Always consult your physiotherapist before starting a new exercise programme.</p>
        </div>

        {/* Print styles injected inline */}
        <style>{`
          @media print {
            body > *:not(#root) { display: none !important; }
            header, footer, nav, .print\\:hidden { display: none !important; }
            .container { max-width: 100% !important; padding: 0 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
