import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

/**
 * Neck Arthritis Exercises — UK guide.
 * Targets "what exercise is good for arthritis in the neck" (~20/mo UK)
 * and "neck exercises for arthritis" — cervical osteoarthritis support.
 */
const exercises = [
  {
    name: "Chin tucks",
    purpose: "Posture reset · eases upper-neck pressure",
    how: "Sit tall. Without tilting your head, gently draw your chin straight back as if making a double chin. Hold 3 seconds, release. Keep your eyes level.",
    reps: "2 sets of 10, twice daily",
  },
  {
    name: "Slow neck rotations",
    purpose: "Range of motion · seated",
    how: "Looking forward, slowly turn your head to the right as far as is comfortable. Hold 2 seconds, return to centre, then turn to the left. Move within a pain-free range.",
    reps: "8 turns each side, once or twice daily",
  },
  {
    name: "Side-to-side tilts",
    purpose: "Loosens the sides of the neck",
    how: "Drop your right ear towards your right shoulder (don't lift the shoulder). Hold 5 seconds, return to centre, repeat on the left. Stop short of any pinching.",
    reps: "6 tilts each side",
  },
  {
    name: "Forward and back flexion",
    purpose: "Front-to-back mobility",
    how: "Tuck the chin to the chest gently, hold 3 seconds. Return to neutral, then tilt the head back a small amount (avoid forcing it). Move slowly.",
    reps: "8 reps, once daily",
  },
  {
    name: "Shoulder rolls",
    purpose: "Releases the muscles that anchor the neck",
    how: "Lift both shoulders towards your ears, roll them back and down in a smooth circle. Reverse direction halfway through.",
    reps: "10 rolls each direction",
  },
  {
    name: "Isometric neck press",
    purpose: "Strengthens deep neck stabilisers",
    how: "Place your palm against your forehead. Press your head gently into your hand without letting either move — hold 5 seconds. Repeat with the hand on each side of the head and the back.",
    reps: "5 holds in each direction",
  },
  {
    name: "Upper trapezius stretch",
    purpose: "Eases tension that drives neck pain",
    how: "Sit on your right hand to anchor the shoulder down. Tilt your left ear towards your left shoulder; use the left hand to add a very gentle pull. Hold 20 seconds. Swap sides.",
    reps: "2 holds each side",
  },
];

const faqs = [
  {
    q: "What exercise is good for arthritis in the neck?",
    a: "Chin tucks, slow neck rotations and gentle side-to-side tilts are the safest starting point for cervical osteoarthritis. They keep the joints lubricated, ease morning stiffness and don't load the spine. Build up to isometric strengthening and upper-trapezius stretches once the basics feel comfortable.",
  },
  {
    q: "Should I exercise when my neck is in a flare?",
    a: "Yes — but stay with gentle range-of-motion work only (chin tucks, slow rotations within a small range). Avoid loaded stretches, end-range bending and any movement that triggers radiating pain into the arm. If symptoms last more than two weeks, see a GP or physiotherapist.",
  },
  {
    q: "Are neck circles safe?",
    a: "Full rolling circles aren't recommended for arthritic necks — the backward portion compresses the small facet joints. Use rotations, tilts and forward flexion as separate movements instead.",
  },
  {
    q: "When should I see a doctor?",
    a: "Get medical advice promptly if you have pins and needles, weakness or numbness in the arms or hands, problems with balance or bladder control, or pain that wakes you at night. These can signal nerve involvement that needs proper assessment.",
  },
];

export default function NeckArthritisExercises() {
  useEffect(() => {
    const id = "neck-arthritis-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Neck arthritis exercises",
      description:
        "Seven gentle neck exercises for cervical osteoarthritis — mobility, strength and stretches aligned with NICE guidance for managing joint pain.",
      step: exercises.map((e, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: e.name,
        text: e.how,
      })),
    });
    document.head.appendChild(script);
    const faqId = "neck-arthritis-faq-jsonld";
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
        title="Neck Arthritis Exercises (UK)"
        description="Seven gentle neck exercises for cervical osteoarthritis — safe mobility, strengthening and stretches you can do at home, aligned with NICE guidance."
        path="/exercises/neck-arthritis-exercises"
        type="article"
        keywords="neck exercises for arthritis, what exercise is good for arthritis in the neck, cervical osteoarthritis exercises, neck arthritis exercises UK"
      />
      <Header />

      <main id="main-content" className="bg-background text-foreground">
        <article className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl py-16">
          <Badge variant="secondary" className="mb-4">
            Exercise Hub · Neck
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Neck arthritis exercises: 7 gentle moves for cervical osteoarthritis
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Cervical osteoarthritis (arthritis in the neck) causes stiffness,
            aching and reduced rotation that can make driving, sleeping and
            looking up uncomfortable. These seven exercises — used by UK
            physiotherapy teams and aligned with NICE guidance for joint pain —
            keep the neck mobile, build the deep stabilising muscles and ease
            the upper-back tension that often drives symptoms.
          </p>

          <aside className="mb-12 p-5 rounded-xl border border-primary/20 bg-primary/5 flex gap-3 text-sm">
            <AlertTriangle className="text-primary shrink-0 mt-0.5" size={18} aria-hidden />
            <p>
              Stop any movement that causes sharp pain, dizziness or symptoms
              travelling into the arms. Seek medical advice if you have
              numbness, weakness, balance changes or pain that wakes you at
              night — these need proper assessment, not exercise alone.
            </p>
          </aside>

          <h2 className="font-serif text-2xl font-semibold mb-6">Who these exercises are for</h2>
          <ul className="space-y-2 mb-12">
            {[
              "Cervical osteoarthritis (wear-and-tear of the neck joints)",
              "General neck stiffness from desk work or poor posture",
              "Rheumatoid arthritis affecting the cervical spine (under physio guidance)",
              "Recovery from a neck strain once acute pain has settled",
              "People wanting to maintain neck mobility as they age",
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
            Once or twice a day is enough. Start with chin tucks, rotations and
            shoulder rolls for the first week, then layer in the stretches and
            isometric press as your neck tolerates them. Five minutes daily is
            more useful than a long session twice a week.
          </p>
          <p className="mb-10 leading-relaxed">
            If your job involves long hours at a screen, set a reminder to do
            chin tucks and shoulder rolls every hour — most flare-ups in the
            neck come from sustained postures, not from heavy use.
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
                { to: "/exercises/shoulder-arthritis-exercises", label: "Shoulder arthritis exercises" },
                { to: "/exercises/tai-chi-for-arthritis", label: "Tai chi for arthritis" },
                { to: "/conditions/osteoarthritis", label: "About osteoarthritis" },
                { to: "/guides/arthritis-pain-relief", label: "Arthritis pain-relief tips" },
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
              <Link to="/exercise-hub">Browse the full Exercise Hub</Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
