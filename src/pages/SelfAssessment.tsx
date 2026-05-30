import { useState } from "react";
import SeoHead from "@/components/SeoHead";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const ARTHRITIS_TYPES = [
  "osteoarthritis", "rheumatoid arthritis", "psoriatic arthritis", "gout",
  "ankylosing spondylitis", "juvenile arthritis", "fibromyalgia", "lupus", "other", "not sure",
];
const AREAS = ["knees", "hips", "hands", "wrists", "shoulders", "neck", "spine", "ankles", "feet", "elbows"];
const LIMITATIONS = ["walking", "stairs", "sleep", "work", "dressing", "driving"];
const GOALS = ["less pain", "more mobility", "better sleep", "return to work", "benefits", "lose weight"];

interface Result {
  id: string;
  triageScore: number;
  recommendations: {
    physioSessions: string;
    focusAreas: string[];
    exercises: { label: string; href: string }[];
    resources: { label: string; href: string }[];
    summary: string;
  };
}

const SelfAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [arthritisType, setArthritisType] = useState("osteoarthritis");
  const [painLevel, setPainLevel] = useState(5);
  const [mobilityLevel, setMobilityLevel] = useState<"high" | "moderate" | "low">("moderate");
  const [affectedAreas, setAffectedAreas] = useState<string[]>([]);
  const [limitations, setLimitations] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({ title: "Sign in required", description: "Please sign in to save your assessment." });
        navigate("/auth?redirect=/self-assessment");
        return;
      }
      const { data, error } = await supabase.functions.invoke("submit-triage", {
        body: { arthritisType, painLevel, mobilityLevel, affectedAreas, limitations, goals },
      });
      if (error || !data?.ok) {
        toast({ title: "Could not save", description: data?.error?.message ?? "Please try again.", variant: "destructive" });
        return;
      }
      setResult(data.data as Result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead
        title="Arthritis Self-Assessment"
        description="Take our free arthritis self-assessment to get personalised exercise, diet and care recommendations based on your symptoms and goals."
        path="/self-assessment"
      />
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          badge="Self-assessment"
          title="Personal arthritis self-assessment"
          subtitle="Five minutes. Personal recommendations for exercise, diet and care — based on your symptoms and goals."
        />

        <section className="container mx-auto px-4 py-16 max-w-3xl">
          {result ? (
            <Card className="border-primary/40">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Your assessment score</p>
                    <p className="text-3xl font-serif font-semibold">{result.triageScore} / 100</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">{result.recommendations.summary}</p>

                <div>
                  <h3 className="font-semibold mb-2">Suggested physiotherapy</h3>
                  <p className="text-muted-foreground">{result.recommendations.physioSessions}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Focus areas</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {result.recommendations.focusAreas.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Exercises for you</h3>
                    <ul className="space-y-1">
                      {result.recommendations.exercises.map((e) => (
                        <li key={e.href}>
                          <Link to={e.href} className="text-primary underline-offset-4 hover:underline inline-flex items-center gap-1">
                            {e.label} <ArrowRight className="h-3 w-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Resources</h3>
                    <ul className="space-y-1">
                      {result.recommendations.resources.map((r) => (
                        <li key={r.href}>
                          <Link to={r.href} className="text-primary underline-offset-4 hover:underline inline-flex items-center gap-1">
                            {r.label} <ArrowRight className="h-3 w-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button variant="outline" onClick={() => setResult(null)}>Re-take assessment</Button>
                  <Button asChild><Link to="/buddy">Get a buddy</Link></Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Label>What kind of arthritis do you have?</Label>
                  <select
                    value={arthritisType}
                    onChange={(e) => setArthritisType(e.target.value)}
                    className="w-full border border-input bg-background rounded-md h-10 px-3 capitalize"
                  >
                    {ARTHRITIS_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
                  </select>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <Label>Average pain level today (0 = none, 10 = worst)</Label>
                  <Slider value={[painLevel]} min={0} max={10} step={1} onValueChange={(v) => setPainLevel(v[0])} aria-label="Current pain level from 0 to 10" aria-valuetext={`${painLevel} out of 10`} />
                  <p className="text-sm text-muted-foreground">{painLevel} / 10</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <Label>How would you describe your mobility?</Label>
                  <RadioGroup value={mobilityLevel} onValueChange={(v) => setMobilityLevel(v as "high" | "moderate" | "low")}>
                    <div className="flex items-center gap-2"><RadioGroupItem value="high" id="m-high" /><label htmlFor="m-high">High — I move freely most days</label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="moderate" id="m-mod" /><label htmlFor="m-mod">Moderate — some difficulty, still independent</label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="low" id="m-low" /><label htmlFor="m-low">Low — I need help with daily tasks</label></div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <Label>Which joints are affected? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AREAS.map((a) => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={affectedAreas.includes(a)} onCheckedChange={() => toggle(affectedAreas, setAffectedAreas, a)} />
                        <span className="capitalize">{a}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <Label>Which daily activities are limited?</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {LIMITATIONS.map((l) => (
                      <label key={l} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={limitations.includes(l)} onCheckedChange={() => toggle(limitations, setLimitations, l)} />
                        <span className="capitalize">{l}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <Label>What are your goals?</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {GOALS.map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={goals.includes(g)} onCheckedChange={() => toggle(goals, setGoals, g)} />
                        <span className="capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Get my recommendations
                </Button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
};

export default SelfAssessment;
