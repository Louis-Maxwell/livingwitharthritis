import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footprints, Play, Pause, RotateCcw, TrendingUp, Target, Flame, Trophy } from "lucide-react";
import { ProgressRing } from "@/components/graphics/InfographicElements";

const STEP_THRESHOLD = 1.2; // acceleration magnitude threshold
const STEP_COOLDOWN = 300; // ms between steps
const DAILY_GOAL = 6000;
const STORAGE_KEY = "lwa_pedometer";

interface PedometerState {
  steps: number;
  date: string;
  history: { date: string; steps: number }[];
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadState(): PedometerState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const state = JSON.parse(raw) as PedometerState;
      if (state.date !== getTodayKey()) {
        // New day — archive yesterday and reset
        const history = [...(state.history || [])];
        if (state.steps > 0) {
          history.push({ date: state.date, steps: state.steps });
        }
        return { steps: 0, date: getTodayKey(), history: history.slice(-30) };
      }
      return state;
    }
  } catch { /* ignore */ }
  return { steps: 0, date: getTodayKey(), history: [] };
}

function saveState(state: PedometerState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

function estimateCalories(steps: number) {
  return Math.round(steps * 0.04);
}

function estimateDistance(steps: number) {
  return (steps * 0.762 / 1000).toFixed(1); // km, avg stride 0.762m
}

const Pedometer = () => {
  const [state, setState] = useState<PedometerState>(loadState);
  const [isTracking, setIsTracking] = useState(false);
  const [sensorAvailable, setSensorAvailable] = useState<boolean | null>(null);
  const lastStepTime = useRef(0);
  const prevMagnitude = useRef(0);
  const rising = useRef(false);

  // Save to localStorage on state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Check sensor availability
  useEffect(() => {
    if (typeof DeviceMotionEvent !== "undefined") {
      // iOS 13+ requires permission
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        setSensorAvailable(true); // Will need to request on start
      } else {
        setSensorAvailable(true);
      }
    } else {
      setSensorAvailable(false);
    }
  }, []);

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const acc = event.accelerationIncludingGravity;
    if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

    const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2) / 9.81;
    const now = Date.now();

    // Peak detection algorithm
    if (magnitude > prevMagnitude.current && !rising.current) {
      rising.current = true;
    } else if (magnitude < prevMagnitude.current && rising.current) {
      rising.current = false;
      // A peak was found
      if (prevMagnitude.current > STEP_THRESHOLD && now - lastStepTime.current > STEP_COOLDOWN) {
        lastStepTime.current = now;
        setState((prev) => ({ ...prev, steps: prev.steps + 1 }));
      }
    }
    prevMagnitude.current = magnitude;
  }, []);

  const startTracking = useCallback(async () => {
    try {
      // iOS 13+ permission request
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== "granted") {
          alert("Motion sensor permission is needed for the pedometer. Please allow access in your browser settings.");
          return;
        }
      }
      window.addEventListener("devicemotion", handleMotion);
      setIsTracking(true);
    } catch (err) {
      console.error("Motion sensor error:", err);
      alert("Could not access motion sensors. This feature requires a mobile device with an accelerometer.");
    }
  }, [handleMotion]);

  const stopTracking = useCallback(() => {
    window.removeEventListener("devicemotion", handleMotion);
    setIsTracking(false);
  }, [handleMotion]);

  const resetToday = useCallback(() => {
    stopTracking();
    setState((prev) => ({ ...prev, steps: 0 }));
  }, [stopTracking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [handleMotion]);

  const goalPercent = Math.min(100, Math.round((state.steps / DAILY_GOAL) * 100));
  const calories = estimateCalories(state.steps);
  const distance = estimateDistance(state.steps);

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Footprints className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Step Counter</h2>
            <p className="text-sm text-muted-foreground">Track your daily walking — a key exercise for arthritis</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Main counter */}
          <Card className="border border-border/40 bg-gradient-to-br from-primary/5 to-primary/5">
            <CardContent className="p-6 flex flex-col items-center gap-6">
              <ProgressRing
                percent={goalPercent}
                label={`${state.steps.toLocaleString()} steps`}
                sublabel={`Goal: ${DAILY_GOAL.toLocaleString()}`}
                size={160}
                strokeWidth={12}
                color="hsl(var(--emerald))"
              />

              {state.steps >= DAILY_GOAL && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-primary"
                >
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-bold">Goal reached! 🎉</span>
                </motion.div>
              )}

              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="text-center p-3 rounded-xl bg-background/60 border border-border/30">
                  <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="stat-number text-lg">{calories}</p>
                  <p className="text-[10px] text-muted-foreground">kcal</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-background/60 border border-border/30">
                  <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="stat-number text-lg">{distance}</p>
                  <p className="text-[10px] text-muted-foreground">km</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-background/60 border border-border/30">
                  <Target className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="stat-number text-lg">{goalPercent}%</p>
                  <p className="text-[10px] text-muted-foreground">of goal</p>
                </div>
              </div>

              {sensorAvailable === false ? (
                <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    📱 Motion sensors not available on this device. Open this page on your mobile phone to use the step counter.
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 w-full">
                  <Button
                    onClick={isTracking ? stopTracking : startTracking}
                    className={`flex-1 min-h-[44px] ${isTracking ? "bg-primary hover:bg-primary" : "bg-primary hover:bg-primary"} text-white`}
                  >
                    {isTracking ? (
                      <><Pause className="w-4 h-4 mr-2" /> Pause</>
                    ) : (
                      <><Play className="w-4 h-4 mr-2" /> Start Walking</>
                    )}
                  </Button>
                  <Button
                    onClick={resetToday}
                    variant="outline"
                    className="min-h-[44px]"
                    aria-label="Reset today's steps"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {isTracking && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                  ● Tracking active — keep your phone in your pocket
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* History & tips */}
          <div className="space-y-6">
            {/* Weekly history */}
            <Card className="border border-border/40">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground text-sm mb-4">Recent History</h3>
                {state.history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No previous data yet. Start tracking to build your history!</p>
                ) : (
                  <div className="space-y-2">
                    {state.history.slice(-7).reverse().map((day) => {
                      const pct = Math.min(100, Math.round((day.steps / DAILY_GOAL) * 100));
                      return (
                        <div key={day.date} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-20 shrink-0">
                            {new Date(day.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                          </span>
                          <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                background: pct >= 100 ? "hsl(var(--emerald))" : "hsl(var(--primary))",
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground w-14 text-right">
                            {day.steps.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Walking tips for arthritis */}
            <Card className="border border-border/40 bg-tint-amber">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground text-sm mb-3">🚶 Walking Tips for Arthritis</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Aim for 6,000 steps daily — studies show this reduces knee OA disability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Use supportive, cushioned footwear to absorb joint impact
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Walk on flat, even surfaces when possible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Start with shorter walks and increase gradually over 4 weeks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    If joints ache afterwards, reduce distance and apply ice
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pedometer;
