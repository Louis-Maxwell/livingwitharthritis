import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

const Footer = lazy(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "Can exercise make osteoarthritis worse?",
    answer:
      "No — for the vast majority of people, appropriate exercise does not wear joints out and does not accelerate osteoarthritis. UK NICE guidance (NG226) places exercise ahead of medication as the first-line treatment. Cartilage actually responds to gentle, repeated load by becoming better nourished. Problems arise from doing too much too soon, sudden high-impact loading, or ignoring acute flares — not from movement itself.",
  },
  {
    question: "Is the pain I feel during exercise damaging my joints?",
    answer:
      "Usually not. A mild ache up to about 4/10 during or after exercise that settles within 24 hours is normal and safe. Sharp, catching, or locking pain — or swelling and pain that stays high overnight — is a signal to reduce load, not to stop moving altogether.",
  },
  {
    question: "What's the difference between productive soreness and a flare?",
    answer:
      "Productive soreness feels diffuse, eases as you warm up, and settles within a day. A flare feels hot, swollen, sharp or stiff for more than 24–48 hours, and often comes with reduced range of motion. During a flare, switch to gentle range-of-motion work, water-based exercise, or rest the joint for 24–48 hours, then rebuild gradually.",
  },
  {
    question: "Should I rest if my knees or hips hurt?",
    answer:
      "Short rest (24–48 hours) is reasonable during an acute flare, but prolonged rest makes osteoarthritis worse. Inactivity weakens the muscles that protect your joints, stiffens cartilage, and increases pain sensitivity. Movement — even gentle — is almost always part of the answer.",
  },
  {
    question: "What exercises are safest for osteoarthritis?",
    answer:
      "Walking, swimming, water aerobics, stationary cycling, tai chi, and progressive strength training are all strongly evidenced for knee and hip osteoarthritis. Aim for 150 minutes of moderate activity weekly, plus two strength sessions, in line with UK Chief Medical Officer guidance.",
  },
];

const CONTENT = `
<h2 id="the-short-answer">The short answer</h2>
<p>No — for almost everyone with osteoarthritis, exercise <strong>does not make the condition worse</strong>. The opposite is true. UK <strong>NICE guidance (NG226)</strong> places structured exercise <em>ahead of medication</em> as the first-line treatment for osteoarthritis of the knee, hip and hand. The Chartered Society of Physiotherapy describes movement as "the single most important thing you can do" for arthritic joints.</p>
<p>The fear that exercise grinds joints down comes from the older "wear and tear" model of osteoarthritis. Modern research has overturned this: cartilage is living tissue that responds to gentle, repeated load by becoming <strong>better nourished and more resilient</strong>. Inactivity, not movement, is what allows joints to stiffen and surrounding muscles to weaken.</p>

<h2 id="why-the-myth-persists">Why the "exercise wears joints out" myth persists</h2>
<p>The myth survives for three reasons:</p>
<ul>
<li><strong>Mechanical intuition.</strong> Joints look like hinges, and hinges wear out with use. But cartilage is not a mechanical surface — it is metabolically active tissue that depends on loading for its nutrient supply.</li>
<li><strong>Pain feels like damage.</strong> When a joint hurts during movement it is natural to assume harm is being done. In osteoarthritis, however, pain levels correlate poorly with the amount of joint change visible on an X-ray. Many people with severe X-ray changes have little pain; others with mild changes have significant pain. Pain is a protection signal, not a damage meter.</li>
<li><strong>Bad early experiences.</strong> Doing too much too soon — long walks, heavy gardening, a sudden gym programme — provokes a flare, which then reinforces the fear of moving at all.</li>
</ul>
<p>A 2022 Cochrane review of land-based exercise for knee osteoarthritis pooled 60 randomised trials and over 8,000 participants. It concluded that exercise <strong>reduces pain and improves function</strong>, with no evidence of joint harm.</p>

<h2 id="good-pain-vs-bad-pain">Productive soreness vs flare pain</h2>
<p>Learning to read your joints is the most useful skill for managing osteoarthritis. Use this simple framework:</p>
<ul>
<li><strong>Productive soreness (safe to continue).</strong> A mild ache up to about 4/10 during or after exercise. Eases as you warm up. Settles within 24 hours. Often felt in the muscles around the joint rather than deep inside it.</li>
<li><strong>Flare pain (back off).</strong> Sharp, catching or locking sensations. Hot, swollen joints. Pain that stays above 4/10 for more than 24–48 hours or wakes you at night. Reduced range of motion.</li>
</ul>
<p>Productive soreness is part of normal adaptation and can be exercised through. Flare pain is a signal to reduce load — not to stop moving altogether.</p>

<h2 id="balancing-rest-and-movement">A practical framework for balancing rest with movement</h2>
<p>The goal is steady, sustainable activity — not heroic effort followed by long recovery. Use this five-step framework:</p>
<ol>
<li><strong>Start lower than feels necessary.</strong> If you can comfortably walk 30 minutes, start with 10. If a strength exercise feels easy at 3 sets of 10, stay there for two weeks before progressing. Small starting doses prevent the boom-and-bust cycle that breeds fear.</li>
<li><strong>Progress by no more than 10% per week.</strong> Add minutes, reps or resistance gradually. Most flares come from sudden jumps in volume, not from exercise itself.</li>
<li><strong>Use the 24-hour rule.</strong> If joint pain has settled to baseline within 24 hours, the previous session was appropriate. If not, scale the next session back by about 25%.</li>
<li><strong>Modify, don't stop, during flares.</strong> Switch to gentle range-of-motion work, water-based exercise, or seated movement for 24–48 hours. Returning to gentle activity quickly prevents deconditioning.</li>
<li><strong>Build a weekly mix.</strong> Aim for 150 minutes of low-impact aerobic work (walking, swimming, cycling), two short strength sessions for the muscles around your affected joints, and a flexibility practice such as tai chi or yoga.</li>
</ol>

<h2 id="when-to-seek-advice">When to seek professional advice</h2>
<p>See a GP or physiotherapist if you experience any of the following:</p>
<ul>
<li>Joint pain that has not settled after a week of reduced activity</li>
<li>Sudden swelling, redness or warmth in a joint</li>
<li>Locking, giving way or sharp catching sensations</li>
<li>Pain that wakes you at night or is unrelieved by rest</li>
<li>A new symptom you cannot explain</li>
</ul>
<p>A physiotherapist can tailor a programme to your joints, stage of disease and goals. In the UK you can refer yourself directly to NHS musculoskeletal physiotherapy in most areas, without going via your GP.</p>

<h2 id="bottom-line">Bottom line</h2>
<p>Exercise does not wear osteoarthritis joints out. Avoiding movement does far more harm than careful, progressive activity ever will. Start small, progress slowly, distinguish productive soreness from flare pain, and treat exercise as treatment — because that is what the evidence says it is.</p>

<h2 id="sources">Sources &amp; disclaimer</h2>
<p>Based on NICE guideline NG226 (Osteoarthritis in over 16s, 2022), Cochrane systematic reviews of land-based and aquatic exercise for knee and hip osteoarthritis, UK Chief Medical Officer Physical Activity Guidelines (2019), and guidance from the Chartered Society of Physiotherapy. For educational use only. Speak to a physiotherapist or GP before starting a new exercise programme, particularly with severe or unstable joint disease.</p>
`;

export default function CanExerciseMakeOsteoarthritisWorse() {
  const html = addHeadingIds(CONTENT);
  const title =
    "Can exercise make osteoarthritis worse? UK clinical answer";
  const description =
    "Short answer: no. NICE-aligned guide explaining why exercise does not wear joints out, how to tell productive soreness from a flare, and a framework for balancing rest with movement.";
  const url = "https://livingwitharthritis.org.uk/guides/can-exercise-make-osteoarthritis-worse";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      </Helmet>
      <PageSchema
        url="/guides/can-exercise-make-osteoarthritis-worse"
        name="Can exercise make osteoarthritis worse?"
        description={description}
        medical={{ condition: "Osteoarthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Can exercise make osteoarthritis worse?" },
        ]}
        faqs={FAQS}
        lastReviewed="2026-06-01"
        idPrefix="oa-exercise-myth"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Can exercise make osteoarthritis worse?"
          subtitle="The short answer is no. NICE puts exercise ahead of medication for osteoarthritis. Here's how to move with confidence — and how to tell productive soreness from a flare."
          badge="Clinical Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Exercise does not wear osteoarthritis joints out. UK NICE guidance
            (NG226) places structured movement <em>ahead of</em> medication as
            the first-line treatment. Problems come from doing too much too
            soon — not from movement itself. Start small, progress slowly, and
            learn to read your joints.
          </p>
          <TableOfContents html={html} />
          <article
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/guides/exercise"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">Pillar guide →</p>
                <p className="font-bold text-foreground">Best exercises for arthritis</p>
              </Link>
              <Link
                to="/arthritis-flare-ups"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">Related →</p>
                <p className="font-bold text-foreground">Managing arthritis flare-ups</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/can-exercise-make-osteoarthritis-worse" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
