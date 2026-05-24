import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, Stethoscope } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: { label: string; scores: Record<string, number> }[];
}

const questions: Question[] = [
  {
    id: "age_onset",
    text: "When did your joint symptoms first begin?",
    options: [
      { label: "After age 45", scores: { oa: 3, ra: 0, psa: 0, gout: 1 } },
      { label: "Between 25–45", scores: { oa: 1, ra: 2, psa: 2, gout: 1 } },
      { label: "Before age 25", scores: { oa: 0, ra: 2, psa: 1, gout: 0 } },
      { label: "I'm not sure", scores: { oa: 1, ra: 1, psa: 1, gout: 1 } },
    ],
  },
  {
    id: "morning_stiffness",
    text: "How long does your morning stiffness typically last?",
    options: [
      { label: "Less than 30 minutes", scores: { oa: 3, ra: 0, psa: 0, gout: 1 } },
      { label: "30–60 minutes", scores: { oa: 1, ra: 2, psa: 2, gout: 0 } },
      { label: "Over an hour", scores: { oa: 0, ra: 3, psa: 3, gout: 0 } },
      { label: "I don't experience morning stiffness", scores: { oa: 1, ra: 0, psa: 0, gout: 2 } },
    ],
  },
  {
    id: "joints_affected",
    text: "Which joints are most affected?",
    options: [
      { label: "Weight-bearing joints (knees, hips, spine)", scores: { oa: 3, ra: 1, psa: 1, gout: 0 } },
      { label: "Small joints (fingers, wrists, toes)", scores: { oa: 1, ra: 3, psa: 2, gout: 1 } },
      { label: "Big toe or ankle", scores: { oa: 0, ra: 0, psa: 0, gout: 3 } },
      { label: "Multiple different joints", scores: { oa: 1, ra: 2, psa: 3, gout: 0 } },
    ],
  },
  {
    id: "symmetry",
    text: "Are your symptoms symmetrical (same joints on both sides)?",
    options: [
      { label: "Yes, both sides equally", scores: { oa: 0, ra: 3, psa: 1, gout: 0 } },
      { label: "No, mainly one side", scores: { oa: 2, ra: 0, psa: 2, gout: 3 } },
      { label: "It varies", scores: { oa: 1, ra: 1, psa: 2, gout: 1 } },
    ],
  },
  {
    id: "swelling",
    text: "Do you experience joint swelling?",
    options: [
      { label: "Yes, warm and swollen joints", scores: { oa: 0, ra: 3, psa: 2, gout: 3 } },
      { label: "Mild swelling occasionally", scores: { oa: 2, ra: 1, psa: 1, gout: 1 } },
      { label: "Bony enlargement but not soft swelling", scores: { oa: 3, ra: 0, psa: 0, gout: 0 } },
      { label: "No noticeable swelling", scores: { oa: 2, ra: 0, psa: 0, gout: 0 } },
    ],
  },
  {
    id: "skin",
    text: "Do you have any skin conditions (psoriasis, rashes, or skin changes)?",
    options: [
      { label: "Yes, psoriasis or scaly patches", scores: { oa: 0, ra: 0, psa: 4, gout: 0 } },
      { label: "Lumps or nodules under the skin", scores: { oa: 0, ra: 2, psa: 0, gout: 2 } },
      { label: "No skin issues", scores: { oa: 2, ra: 1, psa: 0, gout: 1 } },
    ],
  },
  {
    id: "family",
    text: "Does anyone in your family have arthritis or an autoimmune condition?",
    options: [
      { label: "Yes, autoimmune conditions", scores: { oa: 0, ra: 2, psa: 2, gout: 0 } },
      { label: "Yes, osteoarthritis", scores: { oa: 2, ra: 0, psa: 0, gout: 0 } },
      { label: "Yes, gout", scores: { oa: 0, ra: 0, psa: 0, gout: 3 } },
      { label: "No / I'm not sure", scores: { oa: 1, ra: 1, psa: 1, gout: 1 } },
    ],
  },
];

const conditionInfo: Record<string, { name: string; color: string; desc: string; link: string }> = {
  oa: { name: "Osteoarthritis", color: "bg-primary/10 text-primary", desc: "The most common type — caused by wear and tear of joint cartilage over time.", link: "/conditions/osteoarthritis" },
  ra: { name: "Rheumatoid Arthritis", color: "bg-primary/10 text-primary", desc: "An autoimmune condition where the immune system attacks joint lining.", link: "/conditions/rheumatoid-arthritis" },
  psa: { name: "Psoriatic Arthritis", color: "bg-primary/10 text-primary", desc: "Joint inflammation linked with the skin condition psoriasis.", link: "/conditions/psoriatic-arthritis" },
  gout: { name: "Gout", color: "bg-primary/10 text-primary", desc: "Caused by uric acid crystal buildup, often affecting the big toe.", link: "/about" },
};

export default function SymptomQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({}); // question index -> option index
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [step]: optionIndex }));
  };

  const calculateResults = () => {
    const totals: Record<string, number> = { oa: 0, ra: 0, psa: 0, gout: 0 };
    questions.forEach((q, qi) => {
      const chosen = answers[qi];
      if (chosen !== undefined) {
        const scores = q.options[chosen].scores;
        Object.entries(scores).forEach(([k, v]) => { totals[k] += v; });
      }
    });
    const max = Math.max(...Object.values(totals));
    const total = Object.values(totals).reduce((a, b) => a + b, 0);
    return Object.entries(totals)
      .map(([key, score]) => ({
        key,
        score,
        percentage: total > 0 ? Math.round((score / max) * 100) : 0,
        ...conditionInfo[key],
      }))
      .sort((a, b) => b.score - a.score);
  };

  const finish = () => setShowResults(true);
  const restart = () => { setStep(0); setAnswers({}); setShowResults(false); };

  if (showResults) {
    const results = calculateResults();
    const top = results[0];
    return (
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary dark:bg-primary/20 border border-primary dark:border-primary/30">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-primary dark:text-primary">
            <strong>Important:</strong> This quiz is for educational purposes only and does not replace a medical diagnosis. Please consult your GP or rheumatologist for proper assessment.
          </p>
        </div>

        <div className="text-center mb-6">
          <Badge className={`${top.color} text-sm px-4 py-1.5 mb-3`}>Most Likely</Badge>
          <h3 className="text-2xl font-bold text-foreground">{top.name}</h3>
          <p className="text-muted-foreground mt-1 text-sm max-w-md mx-auto">{top.desc}</p>
        </div>

        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.key} className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground w-40 shrink-0">{r.name}</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${r.percentage}%` }}
                />
              </div>
              <span className="text-sm font-bold text-foreground w-12 text-right">{r.percentage}%</span>
            </div>
          ))}
        </div>

        <Card className="border-border/30">
          <CardContent className="pt-5 pb-5">
            <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Stethoscope className="w-4 h-4 text-primary" /> Recommended Next Steps
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Book an appointment with your GP to discuss your symptoms</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Keep a symptom diary to track pain, stiffness and swelling patterns</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Your GP may refer you to a rheumatologist for specialist assessment</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> Blood tests and imaging may be needed to confirm a diagnosis</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="outline" onClick={restart}>Take Quiz Again</Button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const selected = answers[step];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-muted-foreground">Question {step + 1} of {questions.length}</span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground">{q.text}</h3>

      <div className="space-y-2.5">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              selected === i
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border/30 bg-card hover:border-primary/30 text-foreground"
            }`}
          >
            <span className="text-sm font-medium">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        {step < questions.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={selected === undefined} className="gap-1">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={finish} disabled={selected === undefined} className="gap-1">
            See Results <CheckCircle className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
