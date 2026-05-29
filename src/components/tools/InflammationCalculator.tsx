import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Minus, Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Factor {
  id: string;
  label: string;
  description: string;
  type: "slider" | "toggle";
  weight: number;
  // For sliders: 0=best, 100=worst
  defaultValue: number;
  tip: string;
  link?: string;
}

const factors: Factor[] = [
  { id: "diet", label: "Diet Quality", description: "How anti-inflammatory is your diet? (fruits, veg, oily fish, whole grains)", type: "slider", weight: 20, defaultValue: 50, tip: "Follow a Mediterranean diet rich in omega-3 fish, berries and olive oil", link: "/diet" },
  { id: "exercise", label: "Physical Activity", description: "How often do you exercise? (Low = rarely, High = 5+ times/week)", type: "slider", weight: 18, defaultValue: 40, tip: "Aim for 150 minutes of low-impact exercise per week — swimming, walking or cycling", link: "/exercises" },
  { id: "weight", label: "Weight Management", description: "How well are you managing your weight? (Low = over target, High = healthy)", type: "slider", weight: 18, defaultValue: 50, tip: "Every 1lb lost removes 4lbs of pressure from your knees", link: "/blog/arthritis-and-weight-loss-uk" },
  { id: "stress", label: "Stress Levels", description: "How stressed are you? (Low = calm, High = very stressed)", type: "slider", weight: 12, defaultValue: 50, tip: "Try mindfulness, deep breathing or tai chi to lower cortisol and inflammation" },
  { id: "sleep", label: "Sleep Quality", description: "How well do you sleep? (Low = poor, High = excellent)", type: "slider", weight: 14, defaultValue: 50, tip: "Aim for 7–9 hours. Keep a consistent bedtime and cool bedroom", link: "/blog/arthritis-and-sleep-problems" },
  { id: "smoking", label: "Smoking", description: "Do you currently smoke?", type: "toggle", weight: 10, defaultValue: 0, tip: "Smoking significantly increases systemic inflammation and RA risk" },
  { id: "alcohol", label: "Excess Alcohol", description: "Do you regularly drink more than 14 units/week?", type: "toggle", weight: 8, defaultValue: 0, tip: "Excess alcohol triggers gout and raises inflammatory markers" },
];

function getRiskBand(score: number) {
  if (score <= 30) return { label: "Low Risk", color: "text-primary bg-primary dark:bg-primary/30 border-primary", icon: TrendingDown, barColor: "bg-primary" };
  if (score <= 60) return { label: "Moderate Risk", color: "text-primary bg-primary dark:bg-primary/30 border-primary", icon: Minus, barColor: "bg-primary" };
  return { label: "High Risk", color: "text-primary bg-primary dark:bg-primary/30 border-primary", icon: TrendingUp, barColor: "bg-primary" };
}

export default function InflammationCalculator() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(factors.map((f) => [f.id, f.defaultValue]))
  );

  const updateValue = (id: string, val: number) => setValues((prev) => ({ ...prev, [id]: val }));

  // Calculate score: for "good" sliders (diet, exercise, sleep, weight) high value = low risk
  // For "bad" sliders (stress) high value = high risk
  // Toggles: on = high risk
  const calculateScore = () => {
    let totalWeighted = 0;
    const goodFactors = ["diet", "exercise", "sleep", "weight"];
    
    factors.forEach((f) => {
      const v = values[f.id];
      let risk: number;
      if (f.type === "toggle") {
        risk = v ? 100 : 0;
      } else if (goodFactors.includes(f.id)) {
        risk = 100 - v; // high value = low risk
      } else {
        risk = v; // high value = high risk (stress)
      }
      totalWeighted += (risk * f.weight) / 100;
    });
    
    const maxWeight = factors.reduce((a, f) => a + f.weight, 0);
    return Math.round((totalWeighted / maxWeight) * 100);
  };

  const score = calculateScore();
  const band = getRiskBand(score);
  const BandIcon = band.icon;

  // Get worst factors for tips
  const getWeakAreas = () => {
    const goodFactors = ["diet", "exercise", "sleep", "weight"];
    return factors
      .map((f) => {
        const v = values[f.id];
        let risk: number;
        if (f.type === "toggle") risk = v ? 100 : 0;
        else if (goodFactors.includes(f.id)) risk = 100 - v;
        else risk = v;
        return { ...f, risk };
      })
      .filter((f) => f.risk > 40)
      .sort((a, b) => b.risk - a.risk)
      .slice(0, 3);
  };

  const weakAreas = getWeakAreas();

  return (
    <div className="space-y-8">
      {/* Score display */}
      <div className="text-center">
        <div className="relative w-36 h-36 mx-auto mb-4">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke={score <= 30 ? "#000000" : "hsl(var(--primary))"}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 327} 327`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{score}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">/ 100</span>
          </div>
        </div>
        <Badge className={`${band.color} border text-sm px-4 py-1.5 gap-1.5`}>
          <BandIcon className="w-4 h-4" />
          {band.label}
        </Badge>
      </div>

      {/* Factors */}
      <div className="space-y-6">
        {factors.map((f) => (
          <div key={f.id}>
            <div className="flex items-center justify-between mb-1.5">
              <Label className="text-sm font-semibold text-foreground">{f.label}</Label>
              {f.type === "slider" && (
                <span className="text-xs font-mono text-muted-foreground">{values[f.id]}%</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-3">{f.description}</p>
            {f.type === "slider" ? (
              <Slider
                value={[values[f.id]]}
                onValueChange={([v]) => updateValue(f.id, v)}
                min={0} max={100} step={5}
                className="w-full"
              />
            ) : (
              <div className="flex items-center gap-3">
                <Switch
                  checked={!!values[f.id]}
                  onCheckedChange={(checked) => updateValue(f.id, checked ? 1 : 0)}
                />
                <span className="text-sm text-muted-foreground">{values[f.id] ? "Yes" : "No"}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actionable tips */}
      {weakAreas.length > 0 && (
        <Card className="border-primary/20">
          <CardContent className="pt-5 pb-5">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-primary" /> Personalised Tips
            </h4>
            <div className="space-y-3">
              {weakAreas.map((area) => (
                <div key={area.id} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground font-medium">{area.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{area.tip}</p>
                    {area.link && (
                      <button onClick={() => navigate(area.link!)} className="text-xs text-primary font-medium mt-1 flex items-center gap-1 hover:underline">
                        Learn more about {area.label.toLowerCase()} <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
