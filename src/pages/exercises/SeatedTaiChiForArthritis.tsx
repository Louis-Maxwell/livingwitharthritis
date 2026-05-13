import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Clock, Accessibility, Heart, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const heroImage = "/openverse/wellness-02-tai-chi-young-and-old.jpg";

const whoFor = [
  { icon: Accessibility, title: "Severe knee or hip OA", text: "Standing for long is painful or unsafe — but you still want the proven benefits of tai chi for stiffness and mood." },
  { icon: Heart, title: "Recovering from surgery", text: "Post hip or knee replacement, when your physio has cleared gentle movement but not weight-bearing tai chi." },
  { icon: Shield, title: "Fall risk or frailty", text: "You feel unsteady on your feet and want to rebuild balance from a safe, supported base before progressing to standing." },
];

const moves = [
  {
    name: "Seated rooted breath",
    duration: "2 min",
    how: "Sit forward on a sturdy chair (no arms ideal), feet flat hip-width apart. Imagine a thread lifting the crown of your head. Hands rest on thighs. Breathe slowly through the nose for 8 cycles.",
    why: "Establishes posture and calms the nervous system before movement.",
  },
  {
    name: "Seated weight shift",
    duration: "3 min",
    how: "Slowly shift your weight onto your right sit-bone, then your left, as if rocking gently side to side. Keep both feet planted. Repeat 10 times each side.",
    why: "Wakes up the hips and core stabilisers safely — the seated equivalent of standing weight-shifts.",
  },
  {
    name: "Seated Cloud Hands",
    duration: "3 min",
    how: "Sweep your left hand across your body at chest height as if wiping a window, palm facing you. As it crosses, gently turn your torso. Alternate with right hand. Keep movements slow — 8 reps.",
    why: "Mobilises shoulders, thoracic spine and wrists in one flowing pattern.",
  },
  {
    name: "Seated Brush Knee",
    duration: "3 min",
    how: "Push one palm forward at chest height while the other 'brushes' lightly across the same-side thigh. Alternate arms. Coordinate with a slow exhale on each push.",
    why: "Coordinates upper body with breath — keeps the practice flowing without standing.",
  },
  {
    name: "Closing posture",
    duration: "2 min",
    how: "Return hands to your thighs. Lower your gaze. Take 6 long exhales, letting the shoulders drop on each one.",
    why: "Down-regulates the nervous system — research links this to reduced pain perception.",
  },
];

const safety = [
  "Use a sturdy chair without wheels. Avoid sofas — they're too soft for a stable base.",
  "If your chair has arms, that's fine — just keep elbows free to move.",
  "Stop any movement that causes sharp pain. Stiffness easing during practice is normal; sharp pain is not.",
  "If you feel dizzy, slow your breathing and rest. Many people are unused to slow nasal breathing at first.",
];

const faqs = [
  { q: "Is seated tai chi as effective as standing tai chi?", a: "For balance and lower-limb strength, standing practice has more evidence. But for stiffness, mood, breathing and upper-body mobility, seated tai chi delivers most of the same benefits — and it's far better than no practice at all. Many people alternate seated and standing days based on how their joints feel." },
  { q: "Can I do seated tai chi if I use a wheelchair?", a: "Yes. Lock the wheels, sit as upright as your back allows, and follow the upper-body movements (Cloud Hands, Brush Knee, Closing Posture). Skip the seated weight-shift if it's uncomfortable." },
  { q: "How often should I practise?", a: "Start with 15 minutes, 3 times a week. Daily 10-minute sessions also work well. Consistency matters more than length — aim to make it a habit before lengthening sessions." },
  { q: "Is there a UK chair-based tai chi class I can join?", a: "Many UK Age UK branches, NHS social-prescribing schemes and local leisure trusts run chair-based exercise classes that include tai chi elements. Search the Tai Chi Union for Great Britain directory for instructors who offer seated adaptations." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExercisePlan",
  name: "Seated Tai Chi for Arthritis",
  description: "A 13-minute seated tai chi routine designed for people with severe arthritis, post-surgery recovery, or balance concerns. UK-focused, evidence-informed.",
  exerciseType: "Tai Chi",
  intensity: "Low",
  exerciseCourse: { "@type": "CourseInstance", courseMode: "Self-paced" },
  publisher: { "@type": "Organization", name: "Living With Arthritis UK" },
  audience: { "@type": "PeopleAudience", suggestedMinAge: 18, healthCondition: { "@type": "MedicalCondition", name: "Arthritis" } },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SeatedTaiChiForArthritis() {
  useEffect(() => {
    const a = document.createElement("script");
    a.type = "application/ld+json";
    a.text = JSON.stringify(jsonLd);
    const b = document.createElement("script");
    b.type = "application/ld+json";
    b.text = JSON.stringify(faqJsonLd);
    document.head.appendChild(a);
    document.head.appendChild(b);
    return () => {
      document.head.removeChild(a);
      document.head.removeChild(b);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Seated Tai Chi for Arthritis: 13-Minute Chair Routine (UK)"
        description="Chair-based tai chi for arthritis. A 13-minute seated routine for severe knee or hip OA, post-surgery recovery and balance concerns. UK guidance, no equipment."
        path="/exercises/seated-tai-chi-for-arthritis"
        type="article"
        keywords="seated tai chi for arthritis, chair tai chi arthritis, seated tai chi UK, tai chi for severe arthritis, tai chi after hip replacement"
      />
      <Header />

      <PageBreadcrumb segments={[
        { label: "Exercises", href: "/exercises" },
        { label: "Tai Chi for Arthritis", href: "/exercises/tai-chi-for-arthritis" },
        { label: "Seated Tai Chi" },
      ]} />

      <PageHero
        badge={<Badge variant="secondary" className="bg-primary/10 text-primary border-0">Chair-based · No equipment</Badge>}
        title="Seated Tai Chi for Arthritis"
        subtitle="A 13-minute chair routine adapted from the NICE-recommended Sun-style 'Tai Chi for Arthritis' programme. For severe knee or hip OA, post-surgery recovery, and anyone unsteady on their feet."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><a href="#routine">Start the routine <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
          <Button asChild variant="outline" size="lg"><Link to="/exercises/tai-chi-for-arthritis">Back to tai chi guide</Link></Button>
        </div>
      </PageHero>

      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="A seated tai chi practitioner moving the arms slowly while sitting upright" className="w-full h-auto object-cover" loading="eager" decoding="async" width={1600} height={900} />
          </figure>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Who seated tai chi is for</h2>
            <p className="text-muted-foreground leading-relaxed">Seated tai chi keeps the flowing rhythm and breathing of standing practice — without loading painful joints or risking a fall.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whoFor.map((b) => (
              <Card key={b.title} className="p-6 border border-border/40">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4"><b.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="font-display text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The routine */}
      <section id="routine" className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1000px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">13 minutes · 5 movements</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">The seated routine</h2>
            <p className="text-muted-foreground leading-relaxed">Move through these in order, sitting on a sturdy chair. Breathe slowly through the nose throughout.</p>
          </div>

          <ol className="space-y-5">
            {moves.map((m, i) => (
              <li key={m.name}>
                <Card className="p-6 md:p-8 border border-border/40">
                  <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
                    <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 md:w-20 shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-lg font-bold">{i + 1}</div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{m.duration}</div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">{m.name}</h3>
                      <p className="text-foreground/90 leading-relaxed mb-3"><span className="font-medium text-foreground">How:</span> {m.how}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed"><span className="font-medium text-foreground">Why it helps:</span> {m.why}</p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">Stay safe</h2>
          <ul className="space-y-3">
            {safety.map((s) => (
              <li key={s} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">Common questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-background rounded-lg border border-border/40 p-5">
                <summary className="cursor-pointer font-display text-lg font-semibold flex items-center justify-between gap-4">
                  {f.q}
                  <ArrowRight className="h-4 w-4 shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
