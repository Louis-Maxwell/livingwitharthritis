import { Helmet } from "react-helmet-async";
import { lazyWithRetry } from "@/lib/chunkRecovery";
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
import { CITATIONS_HIP_EXERCISES } from "@/data/clinical/ukCitations";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const Footer = lazyWithRetry(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "What are the best exercises for hip osteoarthritis?",
    answer:
      "Exercises that strengthen the buttock and thigh muscles, such as bridges, side-lying leg lifts, clamshells, sit-to-stands and mini squats, combined with gentle stretches and regular aerobic activity like walking, cycling or swimming. NICE recommends tailored strengthening and aerobic exercise as a core treatment for osteoarthritis.",
  },
  {
    question: "How often should I do hip exercises for osteoarthritis?",
    answer:
      "Do the strength routine 2 or 3 times a week on non-consecutive days, with gentle movement and stretches most days. Aerobic activity on other days helps build towards 150 minutes of moderate activity a week. Start small and build up over several weeks.",
  },
  {
    question: "Is it normal for my hip to ache after exercise?",
    answer:
      "Mild aching up to about 4 out of 10 that settles within 24 hours is common, especially when you start, and is not a sign of harm. If pain is higher, lasts into the next day, or you are limping more, make the exercises smaller or do fewer repetitions next time.",
  },
  {
    question: "Should I avoid any exercises with hip arthritis?",
    answer:
      "Avoid anything that causes sharp pain or a catching feeling. High-impact activities such as running or jumping may aggravate some people's hips, but this varies. After a hip replacement, follow your surgical team's advice on positions to avoid. A physiotherapist can tailor exercises to you.",
  },
  {
    question: "Is walking good for hip osteoarthritis?",
    answer:
      "Yes, for most people. Walking builds general fitness and keeps the hip moving. Start with short walks on flat ground, use supportive shoes and consider a walking stick in the opposite hand if you limp. If walking is very painful, cycling or water exercise are good alternatives.",
  },
  {
    question: "Can exercise delay a hip replacement?",
    answer:
      "Exercise can improve pain and function for many people, and NICE recommends it before considering surgery. It cannot reverse joint damage, and some people still need a replacement. If you do need surgery, being stronger and fitter beforehand can help your recovery.",
  },
];

const CONTENT = `
<h2 id="who-this-is-for">Who this routine is for</h2>
<p>This routine is for adults with hip osteoarthritis (OA), or long-standing hip or groin pain that a GP or physiotherapist has said is likely to be OA. It suits people starting out, people on a physiotherapy waiting list, and people preparing for a hip replacement. It is general guidance, not a personal prescription. If a physiotherapist has given you exercises, do theirs first.</p>
<p>Hip OA often shows up as pain in the groin, buttock or front of the thigh, sometimes spreading to the knee. Stiffness is common when you first get up or after sitting, and everyday tasks such as putting on socks, getting in and out of the car, or climbing stairs can become harder.</p>

<h2 id="why-hip-oa-needs-exercise">Why exercise helps a hip with osteoarthritis</h2>
<p>NICE guideline NG226 (2022) recommends therapeutic exercise, tailored to the person, as a core treatment for everyone with osteoarthritis, combining local muscle strengthening with general aerobic fitness. The NHS also lists regular exercise and losing weight if you are overweight among the main ways to manage OA symptoms.</p>
<ul>
<li><strong>Stronger hip muscles.</strong> The buttock muscles (gluteals) keep the pelvis level when you walk and take load off the joint. They weaken quickly when the hip hurts.</li>
<li><strong>Better movement.</strong> Hip OA tends to reduce how far the hip bends, turns and moves backwards. Regular movement helps keep what you have.</li>
<li><strong>Easier everyday tasks.</strong> Sit-to-stands and squats rehearse the exact movements needed to get out of chairs, cars and the bath.</li>
<li><strong>Less pain over time.</strong> Over 6 to 12 weeks, regular exercise can make the hip less sensitive, as well as stronger.</li>
</ul>
<p>Built up gradually, exercise does not speed up hip damage. Our guide to <a href="/guides/can-exercise-make-osteoarthritis-worse">whether exercise can make osteoarthritis worse</a> explains why.</p>

<h2 id="before-you-start">Before you start: safety check</h2>
<p>Speak to a GP or physiotherapist before starting if you have:</p>
<ul>
<li>had a fall and now have hip pain, or cannot put weight on the leg</li>
<li>had hip surgery, including a replacement, in the last few months</li>
<li>a hip that is suddenly very painful with a high temperature or feeling unwell</li>
<li>pain that is getting quickly worse, or night pain that does not ease when you change position</li>
<li>heart or lung problems that limit activity</li>
</ul>
<p><strong>The 4/10 pain rule.</strong> Mild discomfort during or after exercise, up to about 4 out of 10, that settles back to your usual level within 24 hours, is acceptable. If pain goes higher or lasts into the next day, make the exercise smaller next time rather than stopping altogether.</p>

<h2 id="warm-up">Warm-up (2–3 minutes)</h2>
<ul>
<li><strong>Marching on the spot</strong> while holding a worktop: 60 seconds.</li>
<li><strong>Gentle leg swings:</strong> hold on and swing one leg slowly forward and back, within comfort. 10 each side.</li>
<li><strong>Hip circles:</strong> hands on hips, make small slow circles with the pelvis. 5 each way.</li>
</ul>

<h2 id="core-routine">The core routine: 8 hip exercises for osteoarthritis</h2>
<p>For each strength exercise, aim for 2 to 3 sets of 8 to 12 repetitions, unless shown otherwise. Move slowly, breathe out as you push, and rest 30 to 60 seconds between sets. If you are new to exercise, start with one set.</p>

<h3 id="ex-1">1. Side-lying hip abduction</h3>
<p>Lie on your less painful side with your head supported and the bottom knee bent. Keep the top leg straight and in line with your body, toes pointing forward. Lift the top leg up to about 30 cm, hold for 2 seconds, and lower slowly. 8 to 12 each side. <em>Easier:</em> do it standing, holding a worktop, lifting the leg out to the side. <em>If lying on one side hurts,</em> use the standing version.</p>

<h3 id="ex-2">2. Clamshell</h3>
<p>Lie on your side with hips and knees bent and feet together. Keeping your feet touching, lift the top knee as far as is comfortable without rolling your pelvis back. Lower slowly. 10 to 15 each side. <em>Harder:</em> loop a light resistance band just above the knees.</p>

<h3 id="ex-3">3. Glute bridge</h3>
<p>Lie on your back with knees bent and feet flat, hip-width apart. Squeeze your buttocks and lift your hips until your body is in a line from shoulders to knees. Hold for 3 seconds and lower slowly. 8 to 12 repetitions. <em>Easier:</em> lift only a little way. <em>Harder:</em> hold for 5 seconds, or straighten one leg while lifted.</p>

<h3 id="ex-4">4. Standing hip extension</h3>
<p>Stand facing a worktop and hold on. Keeping your back straight and knee straight, take one leg backwards a little way, squeezing the buttock. Do not lean forward. Return slowly. 8 to 12 each leg.</p>

<h3 id="ex-5">5. Sit-to-stand</h3>
<p>Sit near the front of a firm chair with feet slightly behind your knees. Lean forward, push through both feet evenly and stand up, then sit down slowly with control. Use the armrests at first. 8 to 12 repetitions. <em>Easier:</em> a higher chair or cushion. <em>Harder:</em> arms crossed or a slow 3-second lowering.</p>

<h3 id="ex-6">6. Mini squat</h3>
<p>Stand holding a worktop, feet hip-width apart. Push your bottom back and bend your knees slightly, as if starting to sit, keeping your chest up. Go only as far as is comfortable and stand up. 8 to 12 repetitions.</p>

<h3 id="ex-7">7. Standing hip flexion (marching)</h3>
<p>Stand holding a worktop. Lift one knee up in front of you towards hip height, or as high as is comfortable, keeping your back upright. Lower slowly. Alternate legs, 8 to 12 each side. <em>Easier:</em> seated marching.</p>

<h3 id="ex-8">8. Cool-down stretches: hamstring and hip flexor</h3>
<p><strong>Hamstring:</strong> sit near the front of a chair with one leg straight, heel on the floor. Keeping your back straight, lean forward from the hips until you feel a stretch at the back of the thigh. Hold 20 to 30 seconds, twice each side.</p>
<p><strong>Hip flexor:</strong> stand side-on to a worktop. Step one foot back, keep your back upright and gently tuck your bottom under until you feel a stretch at the front of the back hip. Hold 20 to 30 seconds, twice each side.</p>

<h2 id="three-levels">Choose your starting level</h2>
<table>
<thead><tr><th>Level</th><th>Who it suits</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Gentle</td><td>Very painful hip, new to exercise, after a flare</td><td>Exercises 3 (small), 5 (with hands), 7 (seated) and 8. One set each, most days.</td></tr>
<tr><td>Standard</td><td>Can walk for 10 minutes and manage stairs</td><td>All 8 exercises, 2 sets, 3 days a week, plus walking, cycling or swimming on other days.</td></tr>
<tr><td>Progressing</td><td>Standard level feels easy for 2 weeks</td><td>3 sets, harder versions, resistance bands or light weights, longer aerobic sessions.</td></tr>
</tbody>
</table>

<h2 id="weekly-plan">A sensible weekly plan</h2>
<ul>
<li><strong>Strength routine:</strong> 2 to 3 sessions a week on non-consecutive days, 15 to 25 minutes.</li>
<li><strong>Aerobic activity:</strong> walking, cycling (static or outdoor), swimming or water exercise on other days, building towards the UK Chief Medical Officers' target of 150 minutes of moderate activity a week.</li>
<li><strong>Daily movement:</strong> a few minutes of marching, hip circles and stretches, and breaking up long spells of sitting.</li>
<li><strong>Balance:</strong> tai chi or simple balance exercises once or twice a week, which also help prevent falls.</li>
</ul>
<p>Water exercise suits many people with hip OA because the water supports your weight. See our guide to <a href="/blog/swimming-exercises-hip-osteoarthritis">swimming exercises for hip osteoarthritis</a>.</p>

<h2 id="progression">How to progress</h2>
<p>Move up when you can complete the top of the rep range with good form, and your hip settles within 24 hours, for three sessions in a row. Change one thing at a time: add repetitions, then a set, then a harder version, then light resistance. If you have a flare after progressing, drop back for a week, then try again.</p>
<table>
<thead><tr><th>Exercise</th><th>Starting version</th><th>Next step</th><th>Later</th></tr></thead>
<tbody>
<tr><td>Abduction</td><td>Standing, holding on</td><td>Side-lying</td><td>Band around ankles</td></tr>
<tr><td>Bridge</td><td>Small lift</td><td>Full lift, 3-second hold</td><td>Single leg</td></tr>
<tr><td>Sit-to-stand</td><td>High chair, hands</td><td>Standard chair, no hands</td><td>Slow lowering, holding a weight</td></tr>
<tr><td>Squat</td><td>Quarter range, holding on</td><td>Deeper, light hold</td><td>Holding a light weight</td></tr>
</tbody>
</table>

<h2 id="everyday-tips">Everyday tips for a painful hip</h2>
<ul>
<li><strong>Stairs:</strong> lead with the less painful leg going up and the painful leg going down, holding the rail.</li>
<li><strong>Walking stick:</strong> held in the hand opposite the painful hip, a stick can reduce load on the joint. Ask a physiotherapist to check the height.</li>
<li><strong>Chairs:</strong> a firm, higher chair is easier to get out of. Cushions or chair raisers can help.</li>
<li><strong>Socks and shoes:</strong> long-handled shoe horns and sock aids reduce bending. An occupational therapist can advise on equipment.</li>
<li><strong>Sleep:</strong> a pillow between the knees when lying on your side can ease night-time hip pain.</li>
<li><strong>Weight:</strong> if you are overweight, losing some weight can reduce the load through your hips.</li>
</ul>

<h2 id="common-mistakes">Common mistakes to avoid</h2>
<ul>
<li><strong>Doing too much on a good day.</strong> A big burst of activity often leads to a flare. Keep to your plan and build up steadily.</li>
<li><strong>Letting the pelvis tip or twist.</strong> In side-lying lifts and clamshells, keep your hips stacked and move only the leg. Fewer good repetitions beat many sloppy ones.</li>
<li><strong>Holding your breath.</strong> Breathe out as you lift or push.</li>
<li><strong>Stopping when it gets easier.</strong> Strength fades within weeks if you stop. Keep at least two sessions a week going long term.</li>
<li><strong>Only stretching.</strong> Stretches help stiffness, but strengthening is what builds support around the hip.</li>
</ul>

<h2 id="flare-ups-and-surgery">Flare-ups, prehab and hip replacement</h2>
<p><strong>During a flare,</strong> drop to the gentle level: small bridges, seated marching, gentle stretches and short, flat walks. Warmth often helps a stiff hip. Build back up over a week or two rather than resting completely, as long rest makes muscles weaker.</p>
<p><strong>If a hip replacement is being considered,</strong> continue this routine. Stronger muscles and better fitness before surgery can help you recover.</p>
<p><strong>After a hip replacement,</strong> follow your surgical team's exercises and any advice about positions to avoid. Only return to a general routine like this when your physiotherapist or surgeon says it is suitable.</p>

<h2 id="group-programmes">NHS physiotherapy and group programmes</h2>
<p>In many areas you can refer yourself to NHS physiotherapy without seeing a GP first; check your GP practice or local NHS website. Some areas run group exercise and education programmes for knee and hip pain, such as ESCAPE-pain. For more options, including water-based and seated exercise, see our <a href="/exercises">exercise hub</a>. Knee pain often comes alongside hip OA; our <a href="/guides/knee-exercises-for-osteoarthritis">knee exercises for osteoarthritis</a> can be combined with this routine.</p>

<h2 id="progression-and-red-flags">Stop rules and when to get medical help</h2>
<p><strong>Stop the session if you get:</strong> sharp or stabbing pain, a feeling of the hip catching or giving way, pain that keeps increasing as you go, or pins and needles or numbness down the leg.</p>
<ul>
<li><strong>Call 999</strong> for chest pain, severe breathlessness or feeling faint during exercise that does not settle with rest.</li>
<li><strong>Go to A&amp;E</strong> if you fall and cannot put weight on your leg, or the leg looks shorter or turned outwards.</li>
<li><strong>Call NHS 111 urgently</strong> if your hip becomes suddenly very painful with a high temperature, or a hip replacement becomes hot, swollen and painful.</li>
<li><strong>See your GP or physiotherapist</strong> if pain is steadily getting worse, night pain is disturbing your sleep most nights, you are limping more, or you are not improving after 6 to 12 weeks of regular exercise.</li>
</ul>

<h2 id="next-steps">Your next step</h2>
<p>Choose your level and try three of the exercises today. Add the others over the next two weeks, and note how your hip feels the next morning. Most people need 6 to 12 weeks of regular practice to notice real change, so be patient and keep going.</p>

<h2 id="sources">Sources and disclaimer</h2>
<p>Based on NICE guideline NG226 (Osteoarthritis in over 16s, 2022), NHS guidance on osteoarthritis and hip pain, the UK Chief Medical Officers' Physical Activity Guidelines (2019) and Arthritis UK (formerly Versus Arthritis) exercise information. Free from Living With Arthritis (registered charity 1218461). Educational information, not a diagnosis or personal treatment plan. Pending clinical review.</p>
`;

export default function HipExercisesForOsteoarthritis() {
  const html = addHeadingIds(CONTENT);
  const title = "Hip Osteoarthritis Exercises: 8-Move Home Routine (UK)";
  const description =
    "A safe, NICE-aligned routine of 8 hip osteoarthritis exercises: levels, weekly plan, progression table, flare-up changes, stop rules and when to see a GP.";
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
        url="/guides/hip-exercises-for-osteoarthritis"
        name="Hip exercises for osteoarthritis"
        description={description}
        medical={{ condition: "Hip osteoarthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guides" },
          { name: "Hip exercises for osteoarthritis" },
        ]}
        faqs={FAQS}
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
          <EducationalDisclaimerBox reviewStatus="pending" />
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

