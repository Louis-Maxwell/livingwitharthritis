import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";

const Footer = lazy(() => import("@/components/Footer"));

const EXERCISE_GUIDE_FAQS = [
  { question: "What is the best exercise for arthritis?", answer: "Low-impact aerobic activity (walking, swimming, cycling), strength training and a flexibility practice such as tai chi or yoga. UK NICE guidelines (NG226) put exercise ahead of medication for osteoarthritis. The single best exercise is the one you'll actually do 3â€“5 times per week." },
  { question: "Should I exercise if my joints hurt?", answer: "Yes â€” moderate joint pain (up to about 4/10) during arthritis exercise is normal and safe, provided the pain settles within 24 hours. Stop and reduce intensity if pain stays high overnight, joints swell, or you experience sharp catching pain." },
  { question: "How much exercise should someone with arthritis do per week?", answer: "Aim for 150 minutes of moderate aerobic activity per week (e.g. five 30-minute walks), plus 2 sessions of muscle-strengthening work, in line with UK Chief Medical Officer guidelines. Break it into 10-minute blocks if needed â€” short, frequent sessions count." },
  { question: "Is walking good for arthritis?", answer: "Yes. Walking is one of the most strongly evidenced exercises for knee and hip osteoarthritis. Start with 10â€“15 minutes on flat ground and build up. Supportive footwear and walking poles can reduce knee load by up to 25%." },
  { question: "Is swimming better than the gym for arthritis?", answer: "Swimming and water-based exercise remove weight-bearing stress, making them excellent during flares or for severe joint disease. Gym-based strength training, however, is essential for protecting joints long-term â€” most people benefit from a combination." },
  { question: "Can I do strength training with rheumatoid arthritis?", answer: "Yes â€” and you should. Progressive resistance training is safe and beneficial in stable RA, helping counter the muscle loss that comes with inflammation and steroid use. Avoid heavy loads during an acute flare and resume gradually once it settles." },
];

const CONTENT = `
<h2 id="why-exercise-matters">Why Exercise Is the Best Medicine for Arthritis</h2>
<p>If arthritis exercise could be packaged into a pill, it would be hailed as a miracle drug. The evidence is overwhelming: regular, appropriate physical activity is the <strong>single most effective non-pharmacological treatment</strong> for arthritis. NICE guidelines (NG226) place exercise <em>ahead of medication</em> in the treatment hierarchy for osteoarthritis, and the Chartered Society of Physiotherapy describes it as "the most important thing you can do" for joint health.</p>
<p>Despite this, research shows that <strong>over 60%</strong> of adults with arthritis in the UK are insufficiently active (Sport England, 2023). Fear of worsening symptoms, lack of guidance and misinformation ("rest is best") are the primary barriers. In reality, <strong>not exercising</strong> is far more harmful: inactivity leads to muscle weakening, joint stiffness, weight gain, cardiovascular decline and worsened pain â€” creating a vicious cycle of deconditioning.</p>
<p>Benefits of regular exercise for arthritis include:</p>
<ul>
<li><strong>Pain reduction</strong> â€” exercise releases endorphins (natural painkillers) and reduces inflammatory markers</li>
<li><strong>Improved joint mobility</strong> â€” regular movement prevents stiffness and maintains range of motion</li>
<li><strong>Stronger muscles</strong> â€” muscles act as shock absorbers, protecting and stabilising joints</li>
<li><strong>Weight management</strong> â€” every 1 kg lost reduces knee load by 4 kg per step</li>
<li><strong>Better sleep</strong> â€” physical activity improves sleep quality, which in turn reduces pain perception</li>
<li><strong>Improved mental health</strong> â€” exercise reduces depression and anxiety by up to 30% (WHO, 2022)</li>
<li><strong>Cardiovascular protection</strong> â€” vital for people with inflammatory arthritis who have increased heart disease risk</li>
<li><strong>Reduced fatigue</strong> â€” counterintuitively, regular exercise reduces the chronic fatigue associated with RA</li>
</ul>

<h2 id="types-of-exercise">Types of Exercise for Arthritis</h2>
<p>A balanced arthritis exercise programme should include <strong>three types</strong> of activity:</p>

<h3 id="aerobic-exercise">1. Aerobic (Cardiovascular) Exercise</h3>
<p>Low-impact aerobic exercise improves cardiovascular fitness, helps manage weight, reduces inflammation and boosts mood. The health service recommends at least <strong>150 minutes of moderate-intensity activity per week</strong> (or 75 minutes of vigorous activity). For people with arthritis, suitable options include:</p>
<ul>
<li><strong>Walking</strong> â€” the most accessible exercise; start with 10â€“15 minutes and gradually increase. Nordic walking (with poles) reduces knee load by up to 30%</li>
<li><strong>Swimming and water aerobics</strong> â€” buoyancy reduces joint load by up to 90%, making it ideal for painful joints. Many the public health service and local authority pools offer arthritis-specific sessions</li>
<li><strong>Cycling</strong> â€” stationary or outdoor; very low joint impact. Excellent for knee OA</li>
<li><strong>Elliptical trainer</strong> â€” smooth, controlled movement without impact</li>
<li><strong>Rowing</strong> â€” full-body workout with minimal joint jarring</li>
</ul>
<p><strong>Tip:</strong> Start at a level you can manage and build up gradually. The "talk test" is useful â€” if you can hold a conversation while exercising, the intensity is appropriate. If joints are sore for more than 2 hours after exercise, you may have done too much.</p>

<h3 id="strength-training">2. Strength (Resistance) Training</h3>
<p>Strengthening the muscles around affected joints is critical. Strong muscles absorb shock, reduce load on joints and improve stability. A 2021 Cochrane review found that <strong>resistance training significantly reduces pain and improves function</strong> in knee OA, with effects comparable to or better than most medications.</p>
<p><strong>Key exercises by joint:</strong></p>

<h3>Knee exercises</h3>
<ul>
<li><strong>Straight-leg raises</strong> â€” lie on your back, keep one leg bent and slowly raise the other, hold 5 seconds. 3 sets of 10.</li>
<li><strong>Wall squats</strong> â€” lean against a wall and slide down to a comfortable squat (30â€“45Â°), hold 10 seconds. 3 sets of 5â€“10.</li>
<li><strong>Step-ups</strong> â€” using a low step (15â€“20 cm), step up and down slowly. 2 sets of 10 per leg.</li>
<li><strong>Terminal knee extensions</strong> â€” seated, slowly straighten your knee against resistance (using a resistance band or ankle weight). 3 sets of 10.</li>
</ul>

<h3>Hip exercises</h3>
<ul>
<li><strong>Bridges</strong> â€” lie on your back with knees bent, lift hips toward the ceiling, hold 5 seconds. 3 sets of 10.</li>
<li><strong>Clamshells</strong> â€” lie on your side with knees bent, keep feet together and open the top knee like a clamshell. 3 sets of 15.</li>
<li><strong>Side-lying leg raises</strong> â€” lie on your side, raise the top leg slowly, hold 3 seconds. 3 sets of 10.</li>
<li><strong>Seated hip flexion</strong> â€” seated, lift one knee toward your chest, hold 5 seconds. 2 sets of 10.</li>
</ul>

<h3>Hand and wrist exercises</h3>
<ul>
<li><strong>Finger spreads</strong> â€” spread fingers wide, hold 5 seconds, relax. 10 repetitions.</li>
<li><strong>Fist making</strong> â€” slowly make a fist, hold 5 seconds, release and spread. 10 repetitions.</li>
<li><strong>Thumb touches</strong> â€” touch each fingertip to thumb in turn. 5 cycles per hand.</li>
<li><strong>Wrist circles</strong> â€” slow circles in both directions. 10 each way.</li>
<li><strong>Putty squeezing</strong> â€” therapeutic putty or stress ball. 2 minutes per hand.</li>
</ul>

<h3>Shoulder exercises</h3>
<ul>
<li><strong>Pendulum swings</strong> â€” lean forward, let arm hang and gently swing in small circles. 1 minute each direction.</li>
<li><strong>Wall walks</strong> â€” face a wall and "walk" your fingers up the wall as high as comfortable. 10 repetitions.</li>
<li><strong>External rotation with band</strong> â€” elbow at side, rotate forearm outward against resistance. 3 sets of 10.</li>
</ul>

<h3 id="flexibility">3. Flexibility and Range of Motion</h3>
<p>Gentle stretching maintains joint flexibility, reduces stiffness and improves comfort. Best practices include:</p>
<ul>
<li>Stretch <strong>daily</strong>, ideally when joints are warm (after a bath/shower or light activity)</li>
<li>Hold each stretch for <strong>15â€“30 seconds</strong>; never bounce</li>
<li>Breathe normally and relax into the stretch; stop if you feel sharp pain</li>
<li><strong>Yoga and tai chi</strong> are excellent structured flexibility programmes â€” both have strong evidence for arthritis benefit. Tai chi in particular has been shown to reduce pain, improve balance and reduce fall risk in older adults with OA (a 2019 BMJ meta-analysis found tai chi as effective as standard physiotherapy for knee OA)</li>
</ul>

<h2 id="chair-exercises">Chair-Based Exercises</h2>
<p>For people with significant mobility limitations or during flare-ups, <strong>chair-based exercises</strong> provide an excellent way to stay active:</p>
<ul>
<li><strong>Seated marching</strong> â€” lift alternate knees for 1â€“2 minutes</li>
<li><strong>Seated leg extensions</strong> â€” straighten one knee, hold 5 seconds, lower. 10 per leg</li>
<li><strong>Seated arm raises</strong> â€” lift arms to shoulder height and lower. 10 repetitions</li>
<li><strong>Ankle circles</strong> â€” lift one foot and circle the ankle. 10 each direction</li>
<li><strong>Seated trunk rotations</strong> â€” hands on thighs, gently rotate upper body left and right. 10 each side</li>
</ul>
<p>These exercises are also ideal for office workers who need to combat prolonged sitting, which worsens joint stiffness.</p>

<h2 id="water-exercise">Water-Based Exercise (Hydrotherapy)</h2>
<p>Exercising in warm water (typically 33â€“36Â°C) is one of the most effective environments for arthritis exercise. Benefits include:</p>
<ul>
<li><strong>Buoyancy</strong> â€” water supports up to 90% of body weight, dramatically reducing joint load</li>
<li><strong>Warmth</strong> â€” warm water relaxes muscles and increases blood flow to joints</li>
<li><strong>Resistance</strong> â€” water provides natural resistance for strengthening without weights</li>
<li><strong>Pain relief</strong> â€” hydrostatic pressure reduces swelling</li>
</ul>
<p>The health service provides hydrotherapy at some hospitals (referral via GP or physiotherapist). Many local authority pools and leisure centres also offer warm-water sessions. Organisations like <strong>Swim England</strong> and <strong>Versus Arthritis</strong> maintain directories of arthritis-friendly swimming sessions.</p>

<h2 id="exercise-during-flares">Exercising During Flare-Ups</h2>
<p>A common question is whether to exercise during a flare-up. The answer is: <strong>yes, but modify</strong>. During active flares:</p>
<ul>
<li><strong>Reduce intensity and duration</strong> â€” do gentle range-of-motion exercises rather than strengthening or aerobic work</li>
<li><strong>Focus on affected joints</strong> â€” gentle stretching and movement to prevent stiffness</li>
<li><strong>Use ice after exercise</strong> â€” 10â€“15 minutes to reduce inflammation</li>
<li><strong>Listen to your body</strong> â€” pain during exercise that worsens or persists for more than 2 hours suggests you've overdone it</li>
<li><strong>Avoid complete rest</strong> â€” prolonged inactivity during flares leads to muscle wasting and longer recovery times</li>
</ul>

<h2 id="getting-started">Getting Started: A Progressive Programme</h2>
<h3>Weeks 1â€“2: Foundation</h3>
<ul>
<li>5â€“10 minutes of gentle walking or chair exercises, 3 times per week</li>
<li>Basic stretches for affected joints (5 minutes daily)</li>
<li>Focus on establishing the habit, not intensity</li>
</ul>
<h3>Weeks 3â€“4: Building</h3>
<ul>
<li>15â€“20 minutes of walking or swimming, 4 times per week</li>
<li>Add 2 strengthening exercises per affected joint area</li>
<li>Continue daily stretches</li>
</ul>
<h3>Weeks 5â€“8: Progressing</h3>
<ul>
<li>20â€“30 minutes of aerobic activity, 5 times per week</li>
<li>Full strengthening routine (3 sets, 10 reps), 2â€“3 times per week</li>
<li>Consider joining a group class (tai chi, yoga, aqua aerobics)</li>
</ul>
<h3>Weeks 9+: Maintenance</h3>
<ul>
<li>150 minutes of moderate aerobic activity per week</li>
<li>Strength training 2â€“3 times per week</li>
<li>Daily flexibility work</li>
<li>Variety â€” mix activities to prevent boredom and overuse</li>
</ul>

<h2 id="safety-guidelines">Safety Guidelines</h2>
<ul>
<li><strong>Warm up</strong> for 5 minutes before strengthening or vigorous activity</li>
<li><strong>Cool down</strong> with gentle stretches afterwards</li>
<li><strong>Use the 2-hour pain rule</strong> â€” if joint pain is worse 2 hours after exercise, reduce intensity next time</li>
<li><strong>Avoid high-impact activities</strong> during flares â€” running, jumping, contact sports</li>
<li><strong>Wear supportive footwear</strong> â€” proper shoes reduce knee and hip strain</li>
<li><strong>Stay hydrated</strong> â€” dehydration can worsen joint stiffness</li>
<li><strong>Consult a physiotherapist</strong> â€” for a personalised programme, especially if you're newly diagnosed or post-surgery</li>
</ul>

<h2 id="uk-resources-exercise">UK Exercise Resources</h2>
<ul>
<li><strong>Living With Arthritis</strong> â€” <a href="/exercises">free exercise programmes</a> for every major joint</li>
<li><strong>Versus Arthritis</strong> â€” exercise guides and video library at <a href="https://www.versusarthritis.org/about-arthritis/exercising-with-arthritis/" target="_blank" rel="noopener noreferrer">versusarthritis.org</a></li>
<li><strong>UK Health Fitness Studio</strong> â€” free exercise videos at <a href="https://www.gov.uk/browse/health-and-social-care" target="_blank" rel="noopener noreferrer">gov.uk/health</a></li>
<li><strong>Chartered Society of Physiotherapy</strong> â€” find a physiotherapist at <a href="https://www.csp.org.uk" target="_blank" rel="noopener noreferrer">csp.org.uk</a></li>
<li><strong>We Are Undefeatable</strong> â€” campaign supporting people with long-term conditions to be active</li>
</ul>

<h2 id="sources-exercise">Sources &amp; Disclaimer</h2>
<p>This guide is based on NICE guidelines (NG226), Cochrane systematic reviews of exercise interventions for OA and RA, the public health service physical activity guidelines, Sport England Active Lives survey data, and guidance from the Chartered Society of Physiotherapy and British Society for Rheumatology. Statistics cited are from the most recent publications available as of 2024. This information is for educational purposes only. Consult a physiotherapist or GP before starting a new exercise programme, particularly if you have severe or unstable joint disease.</p>
`;

export default function ExerciseGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Best Arthritis Exercises | UK Patient Guide</title>
        <meta name="description" content="Evidence-based arthritis exercise guide: low-impact aerobic, strength, flexibility, water and chair routines for knee, hip, hand & shoulder." />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content="Best Exercises for Arthritis UK â€“ Knee, Hip, Hand &amp; Chair Exercises Guide" />
      <meta property="og:description" content="Evidence-based exercise guide for arthritis: low-impact aerobic, strength training, flexibility, water-based and chair exercises. Progressive programmes for knee, hip, hand and shoulder joints." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/exercise" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Best Exercises for Arthritis UK â€“ Knee, Hip, Hand &amp; Chair Exercises Guide" />
      <meta name="twitter:description" content="Evidence-based exercise guide for arthritis: low-impact aerobic, strength training, flexibility, water-based and chair exercises. Progressive programmes for knee, hip, hand and shoulder joints." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
      <PageSchema
        url="/guides/exercise"
        name="Best Exercises for Arthritis (UK)"
        description="Evidence-based exercise guide for arthritis: low-impact aerobic, strength, flexibility, water-based and chair exercises for every major joint."
        medical={{ condition: "Arthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Exercise Guide" },
        ]}
        faqs={EXERCISE_GUIDE_FAQS}
        lastReviewed="2026-06-01"
        idPrefix="exercise-guide"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Exercise Guide for Arthritis"
          subtitle="The definitive guide to exercising with arthritis â€” from gentle chair-based routines to progressive strength programmes, backed by clinical evidence."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Exercise is the single most effective non-drug treatment for arthritis. UK NICE
            guidelines (NG226) put it ahead of medication for osteoarthritis. Aim for 150
            minutes of low-impact aerobic activity per week (walking, swimming, cycling),
            plus two sessions of strength work and a flexibility practice such as tai chi.
            Start short, build gradually, and pick activities you enjoy.
          </p>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/diet" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">â† Previous Guide</p>
                <p className="font-bold text-foreground">Diet &amp; Nutrition Guide</p>
              </Link>
              <Link to="/exercises" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Interactive â†’</p>
                <p className="font-bold text-foreground">Visit the Exercise Hub</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/exercise" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


