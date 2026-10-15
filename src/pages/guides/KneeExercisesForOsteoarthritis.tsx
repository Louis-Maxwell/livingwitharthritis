import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Helmet } from "react-helmet-async";
import { Suspense } from "react";
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

const Footer = lazyWithRetry(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "How many reps of knee exercises for osteoarthritis should I do?",
    answer:
      "Aim for 2 to 3 sets of 8 to 12 repetitions of each strength exercise, two or three times a week on non-consecutive days. For quad sets, hold for 5 to 10 seconds and build up to 10 holds. If you are new to exercise, start with one set and build up over a few weeks. Regular practice over 6 to 12 weeks matters more than doing a lot in one session.",
  },
  {
    question: "When should I stop knee exercises?",
    answer:
      "Mild discomfort up to about 4 out of 10 that settles within 24 hours is usually fine. Stop that session and do less next time if you get sharp or catching pain, the knee locks or gives way, new swelling lasts overnight, or pain stays higher the next day. Get urgent help for a hot, red, swollen knee with fever, or a painful, swollen calf.",
  },
  {
    question: "Can I start knee OA exercises at home without seeing a physio?",
    answer:
      "Most people with stable knee osteoarthritis can start a gentle home routine like this safely. See a GP or physiotherapist first after a recent fall or injury, if your knee is suddenly hot and swollen, locks or gives way, or after recent surgery. In many UK areas you can self-refer to NHS physiotherapy.",
  },
  {
    question: "What if I am on an NHS physiotherapy waiting list?",
    answer:
      "You can usually start gentle strengthening and movement at home while you wait. Begin at the gentle level, use the 4/10 pain rule, and take notes on what helps to show your physiotherapist. If your symptoms change suddenly or you develop red flag symptoms, do not wait for the routine appointment; contact your GP or NHS 111.",
  },
  {
    question: "Does walking help knee osteoarthritis?",
    answer:
      "Yes, for most people. Regular walking is a good way to build general fitness, which NICE recommends alongside strengthening for osteoarthritis. Start with short walks on flat ground at a comfortable pace, wear supportive shoes, and add a few minutes each week. Cycling and swimming are good alternatives if walking is painful.",
  },
  {
    question: "Should I use a knee brace or support for exercise?",
    answer:
      "Braces and insoles are not needed by everyone with osteoarthritis, but they can help some people, particularly if the knee feels unstable. A physiotherapist can advise whether a support is likely to help you. A brace should not replace strengthening exercises.",
  },
];

const CONTENT = `
<h2 id="who-this-is-for">Who this routine is for</h2>
<p>This routine is for adults with knee osteoarthritis (OA), or long-standing knee pain that a GP or physiotherapist has said is likely to be OA. It also suits people waiting for an NHS physiotherapy appointment, people who have been told they are "not ready" for surgery yet, and people preparing for a knee replacement. It is general guidance, not a personal prescription. If a physiotherapist has already given you exercises, do theirs first and use this page to fill in gaps.</p>
<p>NICE guideline NG226 (2022) recommends therapeutic exercise, tailored to the person, as a core treatment for everyone with osteoarthritis. That means local muscle strengthening around the joint plus general aerobic fitness. NICE also advises against routinely offering paracetamol or weak opioids for OA, and against glucosamine and strong opioids, which puts even more weight on exercise, weight management and self-help as the foundations of care.</p>

<h2 id="why-knee-oa-needs-exercise">Why exercise helps a knee with osteoarthritis</h2>
<p>Knee OA makes the joint stiffer and more painful, especially on stairs, when rising from a chair and after sitting still. The muscles that protect the knee, particularly the quadriceps at the front of the thigh, weaken quickly when the knee hurts. Weaker muscles mean the joint absorbs more load, which can mean more pain, and so the cycle continues. A targeted routine breaks that cycle.</p>
<ul>
<li><strong>Muscle support.</strong> Stronger quadriceps, hamstrings, hip and calf muscles share the work the joint would otherwise do on its own.</li>
<li><strong>Joint health.</strong> Cartilage has no blood supply of its own. Regular, moderate loading and movement help keep it nourished.</li>
<li><strong>Less stiffness.</strong> Moving the knee through its range regularly helps limit the stiffness that builds up after rest.</li>
<li><strong>Calmer pain system.</strong> Over 6 to 12 weeks, regular exercise can reduce how sensitive the knee feels, as well as improving strength.</li>
<li><strong>Confidence.</strong> Practising sit-to-stands and steps in a controlled way makes everyday tasks feel less risky.</li>
</ul>
<p>Exercise does not wear the joint out faster when it is built up sensibly. Our guide to <a href="/guides/can-exercise-make-osteoarthritis-worse">whether exercise can make osteoarthritis worse</a> explains the evidence in more detail.</p>

<h2 id="before-you-start">Before you start: safety check</h2>
<p>Most people with knee OA can start this routine safely at home. Speak to a GP or physiotherapist before starting if you have:</p>
<ul>
<li>a recent fall, injury or suspected fracture</li>
<li>a knee that is suddenly hot, red and swollen, especially with a high temperature or feeling unwell</li>
<li>a knee that locks (gets stuck) or repeatedly gives way</li>
<li>pain that wakes you every night or is getting quickly worse</li>
<li>had knee surgery, including a replacement, in the last few months</li>
<li>heart or lung problems that limit what you can do</li>
</ul>
<p><strong>The 4/10 pain rule.</strong> Many physiotherapists use a simple guide: mild discomfort during or after exercise, up to about 4 out of 10, that settles back to your usual level within 24 hours, is acceptable. If pain goes higher, lasts into the next day, or the knee swells more, do less next time: fewer reps, a smaller movement, or a lower step. Do not stop moving altogether.</p>

<h2 id="warm-up">Warm-up (2–3 minutes)</h2>
<ul>
<li><strong>Marching on the spot</strong> or seated marching: 60 seconds, lifting knees to a comfortable height.</li>
<li><strong>Seated knee swings:</strong> sit tall and gently swing one lower leg forward and back. 10 each side.</li>
<li><strong>Ankle pumps:</strong> point and flex both feet 20 times.</li>
</ul>

<h2 id="core-routine">The core routine: 8 knee exercises for osteoarthritis</h2>
<p>For each strength exercise, aim for 2 to 3 sets of 8 to 12 repetitions unless shown otherwise. Move slowly, breathe out as you push, and stop a couple of repetitions before you are too tired to keep good form. Rest 30 to 60 seconds between sets. If you are new to exercise, start with one set of each.</p>

<h3 id="ex-1">1. Quad sets (thigh tightening)</h3>
<p>Sit or lie with your leg straight and a small rolled towel under the knee. Tighten the muscle at the front of the thigh to press the back of the knee down into the towel. Hold for 5 seconds, relax. Build up to 10 holds of 10 seconds. <em>Good for:</em> bad days, early after a flare and as a starting point if other exercises hurt.</p>

<h3 id="ex-2">2. Straight-leg raise</h3>
<p>Lie on your back with one knee bent and foot flat. Tighten the thigh of the straight leg, then lift it to the height of the bent knee. Hold for 2 to 3 seconds and lower slowly. 8 to 12 each leg. <em>Easier:</em> lift only a few centimetres. <em>Harder:</em> add a light ankle weight once 3 sets of 12 feel easy.</p>

<h3 id="ex-3">3. Sit-to-stand</h3>
<p>Sit near the front of a firm chair with feet hip-width apart and slightly behind your knees. Lean forward, push through your feet and stand up, then sit back down slowly. Use your hands on the armrests at first. 8 to 12 repetitions. <em>Easier:</em> use a higher chair or add a cushion. <em>Harder:</em> arms crossed, a lower chair, or a slow 3-second lowering.</p>

<h3 id="ex-4">4. Mini squat</h3>
<p>Stand holding a worktop, feet hip-width apart. Bend your knees and hips slightly as if starting to sit, keeping your weight through your heels and knees in line with your toes. Go only as far as is comfortable, often 10 to 20 cm, then stand up. 8 to 12 repetitions.</p>

<h3 id="ex-5">5. Step-ups</h3>
<p>Using the bottom stair with a banister, step up with one foot, bring the other up, then step down with control. Lead with the stronger leg first if one is more painful. 8 to 10 each leg. <em>Easier:</em> use a lower step or a thick book. <em>Harder:</em> slow the step down.</p>

<h3 id="ex-6">6. Standing hamstring curl</h3>
<p>Hold a chair back. Bend one knee to bring the heel towards your bottom without moving the thigh forward. Lower slowly. 8 to 12 each leg. <em>Harder:</em> add a light ankle weight or resistance band.</p>

<h3 id="ex-7">7. Calf raise</h3>
<p>Hold a worktop with both hands. Rise up onto the balls of your feet, pause, and lower slowly. 10 to 15 repetitions. <em>Harder:</em> one leg at a time.</p>

<h3 id="ex-8">8. Knee bend and straighten (range of movement)</h3>
<p>Sit on a chair. Slide one foot back under the chair to bend the knee as far as is comfortable, hold for a few seconds, then slide it forward and straighten the knee fully, tightening the thigh. 10 slow repetitions each leg. Do this daily, including on flare days.</p>

<h2 id="three-levels">Choose your starting level</h2>
<table>
<thead><tr><th>Level</th><th>Who it suits</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Gentle</td><td>Very painful knees, new to exercise, recovering from a flare</td><td>Exercises 1, 2, 3 (with hands) and 8. One set each, daily or most days.</td></tr>
<tr><td>Standard</td><td>Can manage stairs and short walks</td><td>All 8 exercises, 2 sets, 3 days a week, plus walking on other days.</td></tr>
<tr><td>Progressing</td><td>Standard level feels easy for 2 weeks</td><td>3 sets, harder versions, light weights or bands, plus longer walks or cycling.</td></tr>
</tbody>
</table>

<h2 id="weekly-plan">A sensible weekly plan</h2>
<table>
<thead><tr><th>Day</th><th>Activity</th></tr></thead>
<tbody>
<tr><td>Monday</td><td>Strength routine (15–25 minutes)</td></tr>
<tr><td>Tuesday</td><td>Walk, cycle or swim (10–30 minutes)</td></tr>
<tr><td>Wednesday</td><td>Strength routine</td></tr>
<tr><td>Thursday</td><td>Walk, cycle or swim; daily knee bends</td></tr>
<tr><td>Friday</td><td>Strength routine</td></tr>
<tr><td>Weekend</td><td>Something you enjoy: a longer walk, gardening, a class, or rest</td></tr>
</tbody>
</table>
<p>The UK Chief Medical Officers recommend adults build up to at least 150 minutes of moderate activity a week, plus strengthening on at least two days. Build up gradually; small, regular amounts count. Our guide to <a href="/blog/walking-with-arthritis-start-build-up-keep-going">walking with arthritis</a> explains how to build up walking safely.</p>

<h2 id="progression">How to progress</h2>
<p>Move up when you can do the top of the rep range with good form, and your knee settles within 24 hours, for three sessions in a row. Change only one thing at a time:</p>
<ol>
<li>add repetitions (up to 12 to 15)</li>
<li>add a set</li>
<li>make the exercise harder (lower chair, slower lowering, one leg)</li>
<li>add light resistance (ankle weights or a band)</li>
</ol>
<p>Expect ups and downs. If a harder version causes a flare-up, go back a step for a week and try again.</p>

<h2 id="everyday-tips">Everyday tips that protect the knee</h2>
<ul>
<li><strong>Stairs:</strong> "up with the good, down with the bad". Lead with the less painful leg going up and the more painful leg going down, and use the rail.</li>
<li><strong>Footwear:</strong> cushioned, supportive shoes with a thick, flexible sole help many people. Insoles and braces are not needed by everyone, but some people find them helpful; ask your physiotherapist.</li>
<li><strong>Walking aids:</strong> a stick held in the hand opposite the painful knee can reduce load. Ask a physio to check the height.</li>
<li><strong>Weight:</strong> if you are overweight, NICE says any amount of weight loss is likely to help knee OA.</li>
<li><strong>Break up sitting:</strong> stand and move every 30 to 60 minutes to limit stiffness.</li>
</ul>

<h2 id="flare-ups-and-surgery">Flare-ups, prehab and knee replacement</h2>
<p><strong>During a flare</strong> (a few days of more pain, warmth or swelling), drop to the gentle level: quad sets, knee bends and short, flat walks. Use a wrapped ice pack for 10 to 15 minutes on a warm, swollen knee. Build back up over a week or two rather than resting completely.</p>
<p><strong>If a knee replacement is being considered,</strong> carry on with this routine as "prehab". Going into surgery with stronger muscles and good knee straightening can help recovery.</p>
<p><strong>After a knee replacement,</strong> follow your surgical team's exercise programme. Only return to a general routine like this one when your physiotherapist or surgeon says it is suitable.</p>

<h2 id="group-programmes">Group programmes and NHS physiotherapy</h2>
<p>In many areas you can refer yourself to NHS musculoskeletal (MSK) physiotherapy without seeing a GP. Ask your GP practice or check your local NHS website. Some areas also offer group exercise and education programmes for knee and hip pain, such as ESCAPE-pain, through NHS services or leisure centres. For other activities that suit knees, see our <a href="/exercises">exercise hub</a>.</p>

<h2 id="progression-and-red-flags">Stop rules and when to get medical help</h2>
<p><strong>Stop the session and rest if you get:</strong> sharp or stabbing pain, the knee locking or giving way, sudden new swelling, or pain that keeps increasing as you go.</p>
<ul>
<li><strong>Call 999</strong> if you have chest pain, severe breathlessness, or feel faint during exercise and it does not settle with rest.</li>
<li><strong>Call NHS 111 or go to A&amp;E</strong> if your knee suddenly becomes hot, red, swollen and very painful, especially with a high temperature, or you cannot put weight on it after a fall or twist.</li>
<li><strong>Get urgent advice the same day</strong> if your calf is painful, swollen and warm, as this can be a sign of a blood clot.</li>
<li><strong>See your GP or physiotherapist</strong> if pain is getting steadily worse over weeks, the knee keeps giving way or locking, pain wakes you every night, or you are not improving after 6 to 12 weeks of regular exercise.</li>
</ul>

<h2 id="next-steps">Your next step</h2>
<p>Pick your level from the table above and do two of the exercises today. Add the rest over the next fortnight. Note how your knee feels the morning after each session. Most people need 6 to 12 weeks of regular exercise to notice a real difference in strength and pain, so keep going even if progress feels slow at first.</p>

<h2 id="sources">Sources and disclaimer</h2>
<p>Based on NICE guideline NG226 (Osteoarthritis in over 16s: diagnosis and management, 2022), NHS osteoarthritis guidance, the UK Chief Medical Officers' Physical Activity Guidelines (2019) and Arthritis UK (formerly Versus Arthritis) exercise information. This page is free from Living With Arthritis (registered charity 1218461). It is educational information, not a diagnosis or personal treatment plan. Pending clinical review.</p>
`;

export default function KneeExercisesForOsteoarthritis() {
  const html = addHeadingIds(CONTENT);
  const title = "Knee Osteoarthritis Exercises: 8-Move Home Routine (UK)";
  const description =
    "Free NICE-aligned knee osteoarthritis exercises: 8 home moves with levels, weekly plan, progression, 4/10 pain rule, stop rules and when to see a physio.";
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
        <meta property="og:site_name" content="Living With Arthritis" />
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
          <EducationalDisclaimerBox reviewStatus="pending" />
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

