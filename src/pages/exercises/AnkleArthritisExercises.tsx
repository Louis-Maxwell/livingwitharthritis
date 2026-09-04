import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

/**
 * Ankle Arthritis Exercises — UK guide.
 * Targets "ankle arthritis exercises" (UK SV ~90/mo) — a content gap
 * vs versusarthritis.org flagged by the SEO scanner.
 */
const exercises = [
  {
    name: "Ankle alphabet",
    purpose: "Range of motion · sit on a chair",
    how: "Sit with one leg lifted slightly. Slowly trace each letter of the alphabet in the air with your big toe, moving only the ankle. Repeat with the other foot.",
    reps: "Once per foot, 1–2 times daily",
  },
  {
    name: "Heel and toe raises",
    purpose: "Calf and shin strength · stand near a wall",
    how: "Rise onto the balls of both feet, hold for 2 seconds, lower. Then rock back onto your heels lifting the toes off the floor, hold for 2 seconds, lower. Use a wall for balance.",
    reps: "2 sets of 10–15",
  },
  {
    name: "Seated ankle circles",
    purpose: "Joint lubrication · gentle warm-up",
    how: "Lift one foot off the floor. Rotate the ankle slowly in a wide circle, 10 times clockwise, then 10 times anti-clockwise. Keep the rest of the leg still.",
    reps: "1 set per direction, both feet",
  },
  {
    name: "Resistance band dorsiflexion",
    purpose: "Strengthens the front of the shin",
    how: "Sit on the floor with the leg out straight. Loop a resistance band around the ball of the foot, anchored to a sturdy object in front. Pull the toes back towards you against the band, then release slowly.",
    reps: "2 sets of 10–12 per foot",
  },
  {
    name: "Towel scrunches",
    purpose: "Strengthens the small foot and ankle muscles",
    how: "Place a small towel flat on the floor. Sit with bare feet on top. Use only your toes to scrunch the towel towards you, then push it back out.",
    reps: "2 minutes per foot",
  },
  {
    name: "Standing calf stretch",
    purpose: "Reduces stiffness in the back of the ankle",
    how: "Stand facing a wall, hands at shoulder height. Step one foot back, keep the back heel on the floor and the leg straight. Lean forward gently until you feel a stretch in the calf. Hold 30 seconds.",
    reps: "3 holds per leg, twice daily",
  },
  {
    name: "Single-leg balance",
    purpose: "Improves ankle stability · falls prevention",
    how: "Stand near a kitchen counter for support. Lift one foot just off the floor and balance on the other for as long as is comfortable. Build up gradually.",
    reps: "Aim for 30 seconds per leg, 2–3 times",
  },
];

const faqs = [
  {
    q: "Is walking good for ankle arthritis?",
    a: "Yes — short, regular walks on level ground are one of the best things you can do. They keep the joint moving, strengthen the surrounding muscles and help with weight control. Wear supportive trainers and build up the distance slowly. If a walk leaves you in pain that lasts more than two hours, shorten it next time.",
  },
  {
    q: "Should I exercise during an ankle flare-up?",
    a: "Avoid loaded exercises (heel raises, walking long distances) during an acute flare. Stick to gentle range-of-motion work — ankle alphabet, ankle circles — to stop the joint stiffening up. Return to strengthening once swelling and night pain settle.",
  },
  {
    q: "How long until I notice a difference?",
    a: "Most people feel less morning stiffness within 2–3 weeks of consistent daily practice. Strength and balance gains take 6–8 weeks. Keep going — the benefit is cumulative.",
  },
  {
    q: "Do I need an orthotic or ankle brace?",
    a: "Not for these exercises. A pharmacy-grade orthotic insert or soft brace can help on bad days or for long walks, but braces shouldn't be worn around the clock — the ankle still needs to move to stay healthy. A physiotherapist can advise if you're unsure.",
  },
];

export default function AnkleArthritisExercises() {
  useEffect(() => {
    const id = "ankle-arthritis-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Ankle arthritis exercises",
      description:
        "Seven evidence-informed exercises for ankle arthritis — range of motion, strengthening and balance work suitable for osteoarthritis, rheumatoid arthritis and gout.",
      step: exercises.map((e, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: e.name,
        text: e.how,
      })),
    });
    document.head.appendChild(script);
    const faqId = "ankle-arthritis-faq-jsonld";
    document.getElementById(faqId)?.remove();
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = faqId;
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqScript);
    return () => {
      document.getElementById(id)?.remove();
      document.getElementById(faqId)?.remove();
    };
  }, []);

  return (
    <>
      <SeoHead
        title="Ankle Arthritis Exercises (UK)"
        description="Seven gentle ankle arthritis exercises to ease pain and stiffness — range of motion, strength and balance work for osteoarthritis, RA and gout."
        path="/exercises/ankle-arthritis-exercises"
        type="article"
        keywords="ankle arthritis exercises, ankle arthritis exercises UK, exercises for arthritic ankle, ankle stiffness exercises"
      />
      <Header />

      <main id="main-content" className="bg-background text-foreground">
        <article className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl py-16">
          <Badge variant="secondary" className="mb-4">
            Exercise Hub · Ankle
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Ankle arthritis exercises: 7 gentle moves to do at home
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Arthritis in the ankle joint causes pain, stiffness and a sense of
            instability that can stop you walking confidently. These seven
            exercises — used by UK physiotherapy teams — keep the joint moving,
            strengthen the muscles that support it and rebuild balance. None of
            them need equipment beyond a chair, a towel and an optional
            resistance band.
          </p>

          <aside className="mb-12 p-5 rounded-xl border border-primary/20 bg-primary/5 flex gap-3 text-sm">
            <AlertTriangle className="text-primary shrink-0 mt-0.5" size={18} aria-hidden />
            <p>
              Stop any exercise that causes sharp pain. Mild discomfort that
              eases within an hour is normal; pain lasting more than two hours
              means you've done too much. Speak to your GP or physiotherapist if
              symptoms are new, severe or come with marked swelling.
            </p>
          </aside>

          <h2 className="font-serif text-2xl font-semibold mb-6">Who these exercises are for</h2>
          <ul className="space-y-2 mb-12">
            {[
              "Osteoarthritis of the ankle (wear-and-tear arthritis)",
              "Rheumatoid arthritis affecting the ankle joint",
              "Gout flares once acute swelling has settled",
              "Post-injury stiffness — old sprains, fractures, ligament tears",
              "People wanting to prevent ankle problems progressing",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl font-semibold mb-6">The seven exercises</h2>
          <ol className="space-y-8 mb-12">
            {exercises.map((e, i) => (
              <li key={e.name} className="border-l-2 border-primary/30 pl-5">
                <h3 className="font-serif text-xl font-semibold mb-1">
                  {i + 1}. {e.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{e.purpose}</p>
                <p className="leading-relaxed mb-1">{e.how}</p>
                <p className="text-sm"><strong>Reps:</strong> {e.reps}</p>
              </li>
            ))}
          </ol>

          <h2 className="font-serif text-2xl font-semibold mb-6">How often should I do them?</h2>
          <p className="mb-4 leading-relaxed">
            Aim for once a day. Start with three or four exercises and build up
            to all seven over two weeks. Consistency matters far more than
            intensity — five minutes every day beats thirty minutes twice a
            week. If you struggle to remember, pair the routine with something
            you already do — the kettle boiling, an ad break, the start of a
            podcast.
          </p>
          <p className="mb-10 leading-relaxed">
            On stiff mornings, do the ankle alphabet and ankle circles in bed
            before you put weight through the joint. It makes the first steps
            of the day far easier.
          </p>

          <h2 className="font-serif text-2xl font-semibold mb-6">Frequently asked questions</h2>
          <div className="space-y-6 mb-12">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-foreground/80 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="font-serif text-2xl font-semibold mb-6">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { to: "/conditions/osteoarthritis", label: "Osteoarthritis guide" },
                { to: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis guide" },
                { to: "/conditions/gout", label: "Gout guide" },
                { to: "/exercises/swimming-for-ankle", label: "Swimming for the ankle" },
                { to: "/exercises/tai-chi-for-ankle", label: "Tai chi for the ankle" },
                { to: "/conditions/osteoarthritis", label: "About osteoarthritis" },
              ].map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="group flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/40 transition-colors"
                >
                  <span className="font-medium">{r.label}</span>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/exercises">Browse the full Exercise Hub</Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
