import { memo } from "react";
import { Link } from "react-router-dom";
import { Activity, Brain, Heart, ArrowRight, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Activity className="w-7 h-7 text-destructive" />,
    label: "Recognise the problem",
    title: "Pain, fatigue & flare-ups",
    desc: "Arthritis affects over 10 million people in the UK. Unpredictable flare-ups, morning stiffness, and joint pain make everyday life exhausting — but you are not alone.",
    color: "from-destructive/5 to-amber/5",
    border: "border-destructive/10",
  },
  {
    num: "02",
    icon: <Brain className="w-7 h-7 text-primary" />,
    label: "Understand your condition",
    title: "Track, learn & manage",
    desc: "Our clinician-reviewed tools help you log symptoms, identify triggers, and understand exactly what your body needs — personalised to your condition.",
    color: "from-primary/5 to-sky/5",
    border: "border-primary/10",
  },
  {
    num: "03",
    icon: <Heart className="w-7 h-7 text-violet" />,
    label: "Take back control",
    title: "Live well with arthritis",
    desc: "With the right support, routine, and community, most people significantly reduce their pain and improve their quality of life. That journey starts here — for everyone.",
    color: "from-violet/5 to-violet/10",
    border: "border-violet/10",
  },
];

const ActionPathSection = memo(() => (
  <section aria-labelledby="action-path-heading" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-label text-primary block mb-4">Your Journey</span>
        <h2 id="action-path-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Living with arthritis is hard. <span className="text-primary">Managing it doesn't have to be.</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We guide you from pain and confusion to clarity and confidence — completely for everyone, no waiting lists.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        <div
          className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-destructive/20 via-primary/20 to-violet/20"
          aria-hidden="true"
        />
        {steps.map((s) => (
          <div key={s.num} className={`relative rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} p-8`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-card shadow-sm flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="absolute -top-2 -end-2 text-xs font-black text-muted-foreground" aria-hidden="true">
                  {s.num}
                </span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to="/self-help"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Start tracking your symptoms <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          Learn how it works <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
));

ActionPathSection.displayName = "ActionPathSection";
export default ActionPathSection;
