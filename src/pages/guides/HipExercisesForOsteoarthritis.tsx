import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_HIP_EXERCISES } from "@/data/clinical/ukCitations";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const Footer = lazy(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "Does walking help hip osteoarthritis?",
    answer:
      "Yes. Regular walking is one of the best-evidenced treatments for hip osteoarthritis. It maintains cartilage nutrition, strengthens the glutes and quadriceps that stabilise the hip, and improves pain and function. Start with 10–15 minutes on flat ground and build up by roughly 10% each week toward the UK Chief Medical Officer target of 150 minutes of moderate activity weekly.",
  },
  {
    question: "Should I exercise through hip pain?",
    answer:
      "A mild ache up to about 4/10 during or after exercise that settles within 24 hours is normal and safe to continue with. Sharp, catching or groin pain that stays high overnight is a signal to reduce load — swap to shorter sets, water-based work or gentle range-of-motion — rather than stop moving altogether.",
  },
  {
    question: "Is cycling safe with hip arthritis?",
    answer:
      "Stationary or upright cycling is one of the safest options for hip OA because it loads the joint through a controlled range with almost no impact. Set the saddle high enough that your leg is nearly straight at the bottom of the pedal stroke, and keep resistance low. Ten to twenty minutes, three times a week is a good starting dose.",
  },
  {
    question: "How long until hip exercises start to help?",
    answer:
      "Most people notice less stiffness and easier walking within two to four weeks of a consistent programme, with pain and strength improvements building over 8–12 weeks. NICE-recommended structured exercise programmes for hip OA typically run for at least six weeks before their full effect is measured.",
  },
  {
    question: "Can exercise delay or avoid a hip replacement?",
    answer:
      "For many people, yes. Strengthening the hip abductors, glutes and quadriceps reduces pain, improves function and can delay the need for surgery — sometimes by years. If a replacement does become necessary, entering surgery with strong surrounding muscles (\"prehabilitation\") is one of the strongest predictors of a fast, successful recovery.",
  },
  {
    question: "What if my hip osteoarthritis is severe?",
    answer:
      "Even with advanced hip OA, gentle exercise remains part of first-line treatment under NICE NG226. Focus on seated and lying strength work, water-based movement, and short frequent walks rather than long sessions. A physiotherapist can tailor a plan; in most UK areas you can self-refer to musculoskeletal physiotherapy without going via a GP.",
  },
];

const CONTENT = `
<h2 id="why-hip-oa-needs-exercise">Why hip OA needs a specific routine</h2>
<p>Hip osteoarthritis makes the ball-and-socket joint stiffer and more painful, particularly on standing up, walking uphill and turning in bed. The muscles that stabilise the hip — the <strong>gluteus medius, gluteus maximus, deep hip rotators and quadriceps</strong> — quickly weaken when the joint hurts, which then loads the hip even more and speeds the decline. A targeted routine breaks that cycle by rebuilding the muscular corset around the joint.</p>
<p>UK <strong>NICE guideline NG226 (2022)</strong> places structured exercise <em>ahead of</em> medication and injections as the first-line treatment for hip OA. A 2022 Cochrane review of land-based exercise for hip osteoarthritis (13 trials, 1,557 participants) found moderate-certainty evidence of reduced pain and improved physical function, with no evidence of joint harm. This routine translates that evidence into a plan you can start today at home, without equipment.</p>

<h2 id="how-exercise-helps">How exercise helps a stiff, painful hip</h2>
<p>Movement helps hip OA in four ways:</p>
<ul>
<li><strong>Cartilage nutrition.</strong> Cartilage has no blood supply. It feeds through gentle, repeated compression — exactly what walking, cycling and squatting provide.</li>
<li><strong>Muscular support.</strong> Stronger glutes and quads offload the joint by taking work off the cartilage and bone.</li>
<li><strong>Range of motion.</strong> Regular movement prevents the capsule around the hip tightening, which is what causes the "stuck" feeling first thing in the morning.</li>
<li><strong>Pain modulation.</strong> Exercise reduces the sensitivity of pain pathways over 6–12 weeks — a real physiological effect, not distraction.</li>
</ul>

<h2 id="before-you-start">Before you start</h2>
<p>Most people with hip OA can start this programme safely. Speak to a GP or physiotherapist first if you have: a recent fall or fracture, sudden hip swelling or fever, a new sharp catching or locking sensation, hip pain that wakes you at night, or a suspected labral tear. In most parts of the UK you can self-refer directly to musculoskeletal physiotherapy without going via your GP.</p>
<p>Use the <strong>4/10 pain rule</strong>: mild ache up to 4/10 during or after exercise, settling within 24 hours, is safe. Anything sharper, or pain lasting longer than a day, means dial back — don't stop.</p>

<h2 id="warm-up">Warm-up (2–3 minutes)</h2>
<p>Start every session by getting blood into the muscles and the joint moving through its available range.</p>
<ul>
<li><strong>Marching on the spot</strong> — 60 seconds, lifting knees to a comfortable height.</li>
<li><strong>Hip circles</strong> — hold a chair, stand on one leg, circle the other leg gently in each direction. 10 each way, per side.</li>
<li><strong>Standing hip swings</strong> — hold a wall, swing one leg forward and back with a relaxed knee. 10 each side.</li>
</ul>

<h2 id="core-routine">The core routine — 8 hip exercises</h2>
<p>Aim for 2–3 sets of 8–12 repetitions of each strength exercise, unless a different target is given. Move slowly, breathe out on the effort, and stop 1–2 reps short of failure. Rest 30–60 seconds between sets.</p>

<h3 id="ex-1">1. Side-lying hip abduction</h3>
<p>Lie on your side, bottom leg bent for balance, top leg straight. Lift the top leg toward the ceiling to about 30° — no higher — keeping the toes pointing forward, not up. Lower with control. <em>Targets:</em> gluteus medius, the primary hip stabiliser.</p>

<h3 id="ex-2">2. Clamshell</h3>
<p>Lie on your side with knees bent and heels together. Keeping the heels touching, rotate the top knee open like a clamshell. Pause at the top, lower slowly. <em>Targets:</em> deep hip external rotators, which control the alignment of the knee over the foot when walking.</p>

<h3 id="ex-3">3. Glute bridge</h3>
<p>Lie on your back, knees bent, feet flat, hip-width apart. Press through your heels and lift your hips until your body forms a straight line from shoulders to knees. Squeeze your glutes at the top, hold two seconds, lower with control. <em>Targets:</em> gluteus maximus and hamstrings.</p>

<h3 id="ex-4">4. Standing hip extension</h3>
<p>Hold a chair or worktop for balance. Standing tall, kick one leg straight backward about 15–20 cm without leaning forward. Keep the movement small and the glute working. Return with control. <em>Targets:</em> gluteus maximus, hip mobility into extension (usually the first range hip OA loses).</p>

<h3 id="ex-5">5. Sit-to-stand</h3>
<p>From a firm chair, cross your arms and stand up without using your hands, then sit back down under control. If that's too hard, use your hands at first and progress to arms-crossed over 2–3 weeks. Aim for 2 sets of 10. <em>Targets:</em> quadriceps and glutes together — the most functional strength exercise for hip and knee OA.</p>

<h3 id="ex-6">6. Mini squat</h3>
<p>Stand with feet hip-width apart, holding a worktop lightly for balance. Bend your knees and hips to lower about 15–20 cm, keeping your weight in your heels. Stand up. <em>Targets:</em> whole lower-body chain. Progress by holding the bottom position for 3 seconds.</p>

<h3 id="ex-7">7. Standing hip flexion (marching)</h3>
<p>Stand tall, hold a chair for balance. Lift one knee to a comfortable height — hip level if you can — pause for one second, lower slowly. Alternate legs. <em>Targets:</em> hip flexors and balance.</p>

<h3 id="ex-8">8. Cool-down stretches — hamstring &amp; hip flexor</h3>
<p>Finish with two gentle 30-second holds per side. Hamstring: sit on the edge of a chair, straighten one leg with the heel on the floor, hinge forward until you feel a stretch behind the thigh. Hip flexor: kneel on a cushion with one foot in front, tuck the pelvis under and gently press the hips forward until you feel a stretch at the front of the back hip. Never stretch into pain — a gentle pull is enough.</p>

<h2 id="weekly-plan">A sensible weekly plan</h2>
<ul>
<li><strong>Strength routine</strong> — 2–3 sessions per week on non-consecutive days.</li>
<li><strong>Low-impact aerobic work</strong> — walking, cycling, swimming or water aerobics on the other days, working toward 150 minutes of moderate activity per week.</li>
<li><strong>Mobility &amp; balance</strong> — a weekly tai chi or yoga class if possible; both have strong evidence for hip OA function and fall prevention.</li>
</ul>
<p>Consistency matters more than intensity. Three short 15-minute sessions a week done for six months beat a heroic hour done twice and abandoned.</p>

<h2 id="flare-ups-and-surgery">Flare-ups, prehab and post-hip-replacement</h2>
<p><strong>During a flare</strong> (24–48 hours of hot, sharper pain) drop to gentle range-of-motion work only: hip circles, seated marches, glute squeezes, short water walks. Return to the full routine within a week — prolonged rest deconditions the joint and prolongs the flare.</p>
<p><strong>If a hip replacement is on the horizon</strong>, this routine doubles as prehabilitation. Entering surgery with strong glutes and quads is one of the strongest predictors of a fast recovery. Continue exercises like the clamshell, glute bridge and sit-to-stand right up to the week before surgery unless your surgical team advises otherwise.</p>
<p><strong>After a hip replacement</strong>, do not restart this routine unsupervised. Your surgical team will provide a phased protocol, typically starting with hip abduction and gentle glute work in week one and progressing through 12 weeks. Return to this general programme once your surgeon or physiotherapist has signed you off — usually around week 10–12.</p>

<h2 id="progression-and-red-flags">Progression and red flags</h2>
<p>You are ready to progress an exercise when you can complete the top of the rep range with clean technique and a manageable pain response over three consecutive sessions. Add reps first, then sets, then resistance (a small ankle weight or a resistance band). Progress by no more than 10% per week.</p>
<p>Stop and seek medical advice if you experience: sudden severe pain, a hip that gives way or locks, calf swelling or warmth (possible clot), fever with hip pain, or pain that does not settle after a week of reduced activity.</p>

<h2 id="next-steps">Your next step</h2>
<p>Pick two of the eight exercises above and do them today — even one set is enough to start. Add the rest over the coming fortnight. Track how the hip feels the morning after each session. Within three to six weeks you should notice easier walking, less morning stiffness and more confidence on stairs.</p>

<h2 id="sources">Sources &amp; disclaimer</h2>
<p>Based on NICE guideline NG226 (Osteoarthritis in over 16s, 2022), the 2022 Cochrane review of land-based exercise for hip osteoarthritis (Bartholdy et al.), UK Chief Medical Officer Physical Activity Guidelines (2019) and Chartered Society of Physiotherapy hip OA guidance. For educational use only and not a substitute for personalised advice from a physiotherapist or GP, particularly in severe or unstable joint disease.</p>
`;

export default function HipExercisesForOsteoarthritis() {
  const html = addHeadingIds(CONTENT);
  const title = "Hip exercises for osteoarthritis: 8-move UK physio-aligned routine";
  const description =
    "A safe, NICE-aligned home routine of eight hip exercises for osteoarthritis — with warm-up, weekly plan, flare-up modifications and progression rules.";
  const url = "https://livingwitharthritis.org.uk/guides/hip-exercises-for-osteoarthritis";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
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
        url="/guides/hip-exercises-for-osteoarthritis"
        name="Hip exercises for osteoarthritis"
        description={description}
        medical={{ condition: "Hip osteoarthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Hip exercises for osteoarthritis" },
        ]}
        faqs={FAQS}
        lastReviewed="2026-09-15"
        idPrefix="hip-oa-exercises"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Hip exercises for osteoarthritis"
          subtitle="A safe, physio-aligned home routine — eight moves, a weekly plan, and clear rules for progressing without provoking a flare."
          badge="Clinical Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <AeoEnhancement route="/guides/hip-exercises-for-osteoarthritis" />
          <ArticleCitations citations={CITATIONS_HIP_EXERCISES} />
          <EducationalDisclaimerBox lastReviewed="2026-09-15" />
          <TopicClusterNav path="/guides/hip-exercises-for-osteoarthritis" />
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Hip osteoarthritis responds to targeted strength and mobility work.
            UK NICE guidance (NG226) puts structured exercise <em>ahead of</em>{" "}
            medication as the first-line treatment. This guide gives you eight
            evidence-based hip exercises, a warm-up, a sensible weekly plan and
            clear rules for flare-ups — everything you need to start at home
            today.
          </p>
          <TableOfContents html={html} />
          <article
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
          />

          <div className="mt-12 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">
              People also ask
            </h3>
            <FaqAccordion
              idPrefix="hip-oa-exercises-faq"
              items={FAQS}
              injectSchema={false}
            />
          </div>

          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Next steps</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/guides/exercise"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Pillar guide →
                </p>
                <p className="font-bold text-foreground">
                  Best exercises for arthritis
                </p>
              </Link>
              <Link
                to="/guides/can-exercise-make-osteoarthritis-worse"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Related →
                </p>
                <p className="font-bold text-foreground">
                  Can exercise make osteoarthritis worse?
                </p>
              </Link>
              <Link
                to="/guides/knee-replacement-surgery"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  If surgery is on the horizon →
                </p>
                <p className="font-bold text-foreground">
                  Joint replacement surgery guide
                </p>
              </Link>
              <Link
                to="/chat"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Need tailored advice? →
                </p>
                <p className="font-bold text-foreground">
                  Ask our help &amp; support team
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
<GuideOnwardJourney currentPath="/guides/hip-exercises-for-osteoarthritis" />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

