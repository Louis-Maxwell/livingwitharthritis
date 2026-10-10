import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowRight } from "lucide-react";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  FOOT_ANKLE_AFTER_HTML,
  FOOT_ANKLE_BEFORE_HTML,
  FOOT_ANKLE_DESCRIPTION,
  FOOT_ANKLE_EXERCISES as exercises,
  FOOT_ANKLE_FAQS as faqs,
  FOOT_ANKLE_INTRO,
  FOOT_ANKLE_QUICK_ANSWER,
  FOOT_ANKLE_TITLE,
} from "@/data/exerciseGuides/footAnkleExercisesContent";

/**
 * Foot and ankle arthritis exercises — UK guide (same URL as the original
 * ankle page, upgraded to cover the foot, big toe and midfoot too).
 * Content lives in src/data/exerciseGuides/footAnkleExercisesContent.ts.
 */
const PROSE =
  "prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-primary mb-12";

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
      name: "Foot and ankle arthritis exercises",
      description: FOOT_ANKLE_DESCRIPTION,
      inLanguage: "en-GB",
      step: exercises.map((e, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: e.name,
        text: `${e.how} Recommended: ${e.reps}.`,
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
        title={FOOT_ANKLE_TITLE}
        description={FOOT_ANKLE_DESCRIPTION}
        path="/exercises/ankle-arthritis-exercises"
        type="article"
        keywords="foot arthritis exercises, ankle arthritis exercises UK, big toe arthritis exercises, exercises for arthritic feet, ankle stiffness exercises"
      />
      <Header />

      <main id="main-content" className="bg-background text-foreground">
        <article className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl py-16">
          <Badge variant="secondary" className="mb-4">
            Exercise Hub · Foot &amp; ankle
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Foot and ankle arthritis exercises: 10 gentle moves to do at home
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{FOOT_ANKLE_INTRO}</p>
          <p className="quick-answer mb-8 p-5 rounded-xl bg-muted/40 leading-relaxed">
            <strong>Quick answer:</strong> {FOOT_ANKLE_QUICK_ANSWER}
          </p>

          <aside className="mb-10 p-5 rounded-xl border border-primary/20 bg-primary/5 flex gap-3 text-sm">
            <AlertTriangle className="text-primary shrink-0 mt-0.5" size={18} aria-hidden />
            <p>
              Stop any exercise that causes sharp pain, the ankle giving way or
              new swelling. Mild discomfort that eases within about two hours is
              normal. Speak to your GP or physiotherapist if symptoms are new,
              severe or come with marked swelling.
            </p>
          </aside>

          <EducationalDisclaimerBox reviewStatus="pending" />

          <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(FOOT_ANKLE_BEFORE_HTML) }} />

          <h2 id="exercises" className="font-serif text-2xl font-semibold mb-6">The ten exercises</h2>
          <p className="mb-6 leading-relaxed">
            Move slowly and within comfort. Start with three or four exercises
            and add the rest over two weeks.
          </p>
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

          <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(FOOT_ANKLE_AFTER_HTML) }} />

          <h2 className="font-serif text-2xl font-semibold mb-6">Frequently asked questions</h2>
          <div className="space-y-6 mb-12">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-foreground/80 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground bg-muted/40 rounded-xl p-4 mb-12">
            <strong>Medical disclaimer:</strong> Educational information for
            people in the UK, not a diagnosis or personal treatment plan.
            Pending clinical review. Sources: NICE NG226 and NG100, NHS foot
            pain and osteoarthritis guidance, Arthritis UK exercise information.
          </p>

          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="font-serif text-2xl font-semibold mb-6">Related guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { to: "/conditions/foot-and-ankle-arthritis", label: "Foot & ankle arthritis guide" },
                { to: "/conditions/osteoarthritis", label: "Osteoarthritis guide" },
                { to: "/conditions/rheumatoid-arthritis", label: "Rheumatoid arthritis guide" },
                { to: "/conditions/gout", label: "Gout guide" },
                { to: "/guides/fall-prevention-older-adults", label: "Fall prevention" },
                { to: "/exercises/tai-chi-for-balance", label: "Tai chi for balance" },
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
