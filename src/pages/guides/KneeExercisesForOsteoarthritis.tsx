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
import { CITATIONS_KNEE_EXERCISES } from "@/data/clinical/ukCitations";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const Footer = lazy(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "How many reps of knee exercises for osteoarthritis should I do?",
    answer:
      "Aim for 2–3 sets of 8–12 repetitions of each strength exercise, two to three times a week on non-consecutive days. For holds (quad sets), use 5–10 seconds and build toward 10–12 holds. Progress by no more than about 10% per week. Consistency over six weeks matters more than high reps in one session.",
  },
  {
    question: "When should I stop knee osteoarthritis exercises?",
    answer:
      "Use the 4/10 pain rule: a mild ache up to about 4/10 during or after exercise that settles within 24 hours is usually safe. Stop that session and scale back if you get sharp, catching or locking pain, new swelling that lasts overnight, giving-way, calf warmth/swelling, fever with joint pain, or pain that stays high for more than a day.",
  },
  {
    question: "Do I need a physiotherapist or can I start knee OA exercises at home?",
    answer:
      "Most people with stable knee osteoarthritis can start this NICE-aligned home routine safely. See a GP or physiotherapist first after a recent fall or fracture, sudden hot swelling or fever, new locking, night pain that wakes you, or unexplained giving-way. In many UK areas you can self-refer to musculoskeletal physiotherapy without a GP letter.",
  },
  {
    question: "What if I am stuck on an NHS physiotherapy waiting list for knee arthritis?",
    answer:
      "You can usually begin gentle strength and mobility work at home while you wait — this free routine is designed for that gap. Keep activity short and frequent, follow the 4/10 rule, and ask your GP practice about self-referral to MSK physio or local authority exercise-on-referral schemes. Escalate urgently for red-flag symptoms rather than waiting for a routine appointment.",
  },
  {
    question: "Does walking help knee osteoarthritis?",
    answer:
      "Yes. Regular walking is one of the best-evidenced treatments for knee OA. It supports cartilage nutrition, strengthens the quadriceps and glutes that stabilise the knee, and improves pain and function. Start with 10–15 minutes on flat ground and build by roughly 10% each week toward the UK Chief Medical Officers' target of 150 minutes of moderate activity weekly.",
  },
  {
    question: "Are these free knee exercises for osteoarthritis suitable in the UK?",
    answer:
      "Yes. This guide follows UK NICE NG226 (exercise as first-line for osteoarthritis) and is published free by Living With Arthritis (registered charity 1218461), independent of Arthritis UK. It is educational information, not a personal physio prescription — adapt with your clinician if you have complex or unstable disease.",
  },
];

const CONTENT = `
<h2 id="why-knee-oa-needs-exercise">Why knee OA needs a specific routine</h2>
<p>Knee osteoarthritis makes the joint stiffer and more painful, particularly on stairs, rising from a chair and after sitting. The muscles that protect the knee — especially the <strong>quadriceps, hamstrings, glutes and calves</strong> — weaken quickly when the joint hurts, which then loads the cartilage even more. A targeted routine breaks that cycle by rebuilding support around the joint.</p>
<p>UK <strong>NICE guideline NG226 (2022)</strong> places structured exercise <em>ahead of</em> medication and injections as first-line treatment for knee osteoarthritis. Land-based strengthening and aerobic exercise have consistent evidence for less pain and better function, without evidence of joint harm when progressed sensibly. This free UK routine translates that guidance into eight moves you can start at home, without equipment.</p>

<h2 id="how-exercise-helps">How exercise helps a painful knee</h2>
<p>Movement helps knee OA in four ways:</p>
<ul>
<li><strong>Cartilage nutrition.</strong> Cartilage has no blood supply. Gentle, repeated loading from walking, sit-to-stands and controlled squats helps nourish it.</li>
<li><strong>Muscular support.</strong> Stronger quads and glutes offload the joint by sharing work that would otherwise fall on bone and cartilage.</li>
<li><strong>Range of motion.</strong> Regular movement limits the "stuck" morning stiffness that comes from a tightening capsule.</li>
<li><strong>Pain modulation.</strong> Over 6–12 weeks, exercise can reduce sensitivity of pain pathways — a real physiological effect, not distraction.</li>
</ul>

<h2 id="before-you-start">Before you start</h2>
<p>Most people with knee OA can start this programme safely. Speak to a GP or physiotherapist first if you have: a recent fall or fracture, sudden knee swelling with fever, a new sharp catching or locking sensation, night pain that wakes you, or a knee that repeatedly gives way. In most parts of the UK you can self-refer directly to musculoskeletal physiotherapy.</p>
<p>Use the <strong>4/10 pain rule</strong>: mild ache up to 4/10 during or after exercise, settling within 24 hours, is safe. Anything sharper, or pain lasting longer than a day, means dial back — don't stop moving altogether.</p>

<h2 id="warm-up">Warm-up (2–3 minutes)</h2>
<p>Start every session by getting blood into the muscles and the joint moving through its available range.</p>
<ul>
<li><strong>Marching on the spot</strong> — 60 seconds, lifting knees to a comfortable height.</li>
<li><strong>Seated knee swings</strong> — sit tall and gently swing one heel forward and back under the chair. 10 each side.</li>
<li><strong>Ankle pumps</strong> — point and flex both feet 20 times to wake the calves and improve circulation.</li>
</ul>

<h2 id="core-routine">The core routine — 8 free knee exercises for osteoarthritis</h2>
<p>Aim for 2–3 sets of 8–12 repetitions of each strength exercise, unless a different target is given. Move slowly, breathe out on the effort, and stop 1–2 reps short of failure. Rest 30–60 seconds between sets.</p>

<h3 id="ex-1">1. Quad sets (isometric quadriceps)</h3>
<p>Sit or lie with the leg straight. Tighten the thigh muscle so the knee presses gently into the bed or floor, hold 5–10 seconds, relax. <em>Targets:</em> quadriceps — the primary shock absorber for the knee. Ideal on flare days when movement range is limited.</p>

<h3 id="ex-2">2. Straight-leg raise</h3>
<p>Lie on your back, one knee bent, the other straight. Tighten the straight-leg thigh, then lift the leg about 20–30 cm. Hold 2–3 seconds, lower with control. <em>Targets:</em> quadriceps and hip flexors without deep knee bending.</p>

<h3 id="ex-3">3. Sit-to-stand</h3>
<p>From a firm chair, cross your arms and stand up without using your hands, then sit back down under control. Use your hands at first if needed and progress to arms-crossed over 2–3 weeks. Aim for 2 sets of 10. <em>Targets:</em> quadriceps and glutes together — the most functional strength exercise for knee OA.</p>

<h3 id="ex-4">4. Mini squat</h3>
<p>Stand with feet hip-width apart, holding a worktop lightly for balance. Bend your knees and hips to lower about 15–20 cm, keeping weight in your heels and knees tracking over toes. Stand up. <em>Targets:</em> whole lower-body chain. Progress by holding the bottom for 3 seconds.</p>

<h3 id="ex-5">5. Step-ups</h3>
<p>Using a low step (about 15–20 cm), step up with one foot, bring the other up, then step down with control. Lead with the more comfortable leg first if one side is irritable. 2 sets of 8–10 per leg. <em>Targets:</em> quads, glutes and real-world stair strength.</p>

<h3 id="ex-6">6. Hamstring curl (standing)</h3>
<p>Hold a chair. Standing tall, bend one knee to bring the heel toward the buttock without swinging the hips forward. Lower slowly. <em>Targets:</em> hamstrings, which balance the quads and support knee control when walking.</p>

<h3 id="ex-7">7. Calf raise</h3>
<p>Hold a worktop. Rise onto the balls of both feet, pause, lower slowly. Progress to one leg when ready. <em>Targets:</em> calves and ankle stiffness that often accompany knee OA and affect push-off when walking.</p>

<h3 id="ex-8">8. Gentle knee range of motion</h3>
<p>Sit on a chair. Slide the foot back under the chair to bend the knee as far as comfortable, then slide forward to straighten. Or lie on your back and gently bend/straighten within a pain-free arc. 10–15 slow repetitions. Finish with a gentle hamstring stretch: sit, straighten one leg with the heel on the floor, hinge forward until you feel a mild pull — 30 seconds each side. Never stretch into sharp pain.</p>

<h2 id="weekly-plan">A sensible weekly plan</h2>
<ul>
<li><strong>Strength routine</strong> — 2–3 sessions per week on non-consecutive days.</li>
<li><strong>Low-impact aerobic work</strong> — walking, cycling, swimming or water aerobics on the other days, working toward 150 minutes of moderate activity per week.</li>
<li><strong>Mobility &amp; balance</strong> — short daily ROM and, if possible, a weekly tai chi or yoga class; both have strong evidence for knee OA function and fall prevention.</li>
</ul>
<p>Consistency matters more than intensity. Three short 15-minute sessions a week for six months beat a heroic hour done twice and abandoned.</p>

<h2 id="flare-ups-and-surgery">Flare-ups, prehab and post-knee-replacement</h2>
<p><strong>During a flare</strong> (24–48 hours of hotter, sharper pain) drop to gentle range-of-motion, quad sets and short water walks. Return to the full routine within a week — prolonged rest deconditions the joint and prolongs the flare.</p>
<p><strong>If a knee replacement is on the horizon</strong>, this routine doubles as prehabilitation. Entering surgery with stronger quads and better sit-to-stand ability is linked with faster recovery. Continue quad sets, straight-leg raises and sit-to-stands up to the week before surgery unless your surgical team advises otherwise.</p>
<p><strong>After a knee replacement</strong>, do not restart this routine unsupervised. Follow your surgical team's phased protocol. Return to this general programme only once your surgeon or physiotherapist has signed you off.</p>

<h2 id="progression-and-red-flags">Progression and red flags</h2>
<p>You are ready to progress an exercise when you can complete the top of the rep range with clean technique and a manageable pain response over three consecutive sessions. Add reps first, then sets, then light resistance (ankle weight or band). Progress by no more than 10% per week.</p>
<p>Stop and seek medical advice if you experience: sudden severe pain, a knee that locks or gives way, calf swelling or warmth (possible clot), fever with knee pain, or pain that does not settle after a week of reduced activity.</p>

<h2 id="free-charity-callout">Free UK charity support</h2>
<p>This page is free from <strong>Living With Arthritis</strong> (registered charity in England and Wales no.&nbsp;1218461). We are independent of Arthritis UK (formerly Versus Arthritis). For more free home routines see our <a href="/guides/exercise">exercise guide</a>, <a href="/exercises">exercise hub</a> and <a href="/guides/hip-exercises-for-osteoarthritis">hip osteoarthritis exercises</a>. Printable tools such as the <a href="/resources/pip-evidence-diary">PIP evidence diary</a> and <a href="/resources/flare-action-plan">flare action plan</a> are also free.</p>

<h2 id="next-steps">Your next step</h2>
<p>Pick two of the eight exercises above and do them today — even one set is enough to start. Add the rest over the coming fortnight. Track how the knee feels the morning after each session. Within three to six weeks you should notice easier stairs, less morning stiffness and more confidence rising from a chair.</p>

<h2 id="sources">Sources &amp; disclaimer</h2>
<p>Based on NICE guideline NG226 (Osteoarthritis in over 16s, 2022), NHS osteoarthritis guidance, UK Chief Medical Officers' Physical Activity Guidelines and Versus Arthritis / Arthritis UK exercise information. For educational use only and not a substitute for personalised advice from a physiotherapist or GP, particularly in severe or unstable joint disease.</p>
`;

export default function KneeExercisesForOsteoarthritis() {
  const html = addHeadingIds(CONTENT);
  const title = "Free knee exercises for osteoarthritis UK: 8-move home physio routine";
  const description =
    "Free NICE-aligned knee exercises for osteoarthritis in the UK — eight home moves, weekly plan, 4/10 pain rule, red flags and FAQs. Living With Arthritis charity 1218461.";
  const url = "https://livingwitharthritis.org.uk/guides/knee-exercises-for-osteoarthritis";

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
        url="/guides/knee-exercises-for-osteoarthritis"
        name="Free knee exercises for osteoarthritis UK"
        description={description}
        medical={{ condition: "Knee osteoarthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guides" },
          { name: "Free knee exercises for osteoarthritis UK" },
        ]}
        faqs={FAQS}
        lastReviewed="2026-09-17"
        idPrefix="knee-oa-exercises"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Free knee exercises for osteoarthritis UK"
          subtitle="An 8-move NICE-aligned home routine — warm-up, weekly plan, 4/10 pain rule and clear red flags. Free from Living With Arthritis (charity 1218461)."
          badge="Clinical Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <AeoEnhancement route="/guides/knee-exercises-for-osteoarthritis" />
          <ArticleCitations citations={CITATIONS_KNEE_EXERCISES} />
          <EducationalDisclaimerBox lastReviewed="2026-09-17" />
          <TopicClusterNav path="/guides/knee-exercises-for-osteoarthritis" />
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Free knee exercises for osteoarthritis in the UK. NICE guidance
            (NG226) puts structured exercise <em>ahead of</em>{" "}
            medication as first-line treatment. This guide gives you eight
            evidence-based moves — quad sets, straight-leg raise, sit-to-stand,
            mini squat, step-ups, hamstring curl, calf raise and gentle ROM —
            plus a weekly plan and clear rules for flares.
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
              idPrefix="knee-oa-exercises-faq"
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
                  Free physiotherapy exercises for arthritis at home
                </p>
              </Link>
              <Link
                to="/guides/hip-exercises-for-osteoarthritis"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Related joint →
                </p>
                <p className="font-bold text-foreground">
                  Hip exercises for osteoarthritis
                </p>
              </Link>
              <Link
                to="/guides/can-exercise-make-osteoarthritis-worse"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">Related →</p>
                <p className="font-bold text-foreground">
                  Can exercise make osteoarthritis worse?
                </p>
              </Link>
              <Link
                to="/guides/free-arthritis-resources-uk"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Free charity tools →
                </p>
                <p className="font-bold text-foreground">
                  Free arthritis resources UK
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
<GuideOnwardJourney currentPath="/guides/knee-exercises-for-osteoarthritis" />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

