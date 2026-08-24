import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { useSafeHtml } from "@/utils/sanitizeHtml";

const Footer = lazy(() => import("@/components/Footer"));

const FAQS = [
  {
    question: "Why is my shoulder in pain?",
    answer:
      "Most shoulder pain in adults comes from the rotator cuff tendons, the subacromial space, the joint capsule (frozen shoulder) or osteoarthritis of the glenohumeral or acromioclavicular joint. Pain on reaching overhead or behind your back usually points to the rotator cuff; a shoulder that has lost movement in every direction â€” including when someone else moves it for you â€” points to a frozen shoulder; deep, grinding pain with morning stiffness that eases within 30 minutes points to osteoarthritis.",
  },
  {
    question: "What is the fastest way to relieve shoulder pain?",
    answer:
      "For a painful flare, the fastest relief usually comes from combining three things: a topical NSAID gel applied to the shoulder three to four times a day, keeping the arm gently moving through pain-free range rather than resting it in a sling, and adjusting your sleeping position with a pillow under the affected arm. Most people notice a meaningful difference within seven to ten days.",
  },
  {
    question: "Should I rest or exercise a painful shoulder?",
    answer:
      "Exercise, in almost every case. Complete rest is the main cause of a stiff, weak shoulder that then hurts more. Aim for gentle range-of-motion work daily and strengthening two to three times a week. An ache up to about 4/10 during and after exercise that settles within 24 hours is acceptable and does not indicate damage.",
  },
  {
    question: "How long does shoulder pain take to settle?",
    answer:
      "Rotator cuff pain typically improves substantially over 6â€“12 weeks of consistent exercise. Frozen shoulder is slower â€” it runs a natural course of 12â€“30 months, though exercise and, where appropriate, a corticosteroid injection shorten the painful phase. Osteoarthritis is managed rather than cured, but pain and function usually improve within 8â€“12 weeks of a structured routine.",
  },
  {
    question: "When should I see a GP about shoulder pain?",
    answer:
      "See a GP if the pain follows a fall or a sudden wrench, if you cannot lift the arm at all, if the shoulder looks deformed, if you have numbness or pins and needles down the arm, if there is fever or unexplained weight loss alongside the pain, or if it has not improved after six weeks of self-management. In most parts of the UK you can also self-refer to musculoskeletal physiotherapy without going via a GP.",
  },
  {
    question: "Is heat or ice better for shoulder pain?",
    answer:
      "Use ice for the first 48 hours after a sudden, sharp flare or an injury â€” 10â€“15 minutes, wrapped in a cloth. Use heat for ongoing stiffness and arthritic aching, particularly before exercise, as it relaxes the surrounding muscles and makes movement easier. Neither changes the underlying condition; both are comfort measures that make it easier to keep moving.",
  },
];

const CONTENT = `
<h2 id="what-causes-shoulder-pain">What is actually causing your shoulder pain</h2>
<p>The shoulder is the most mobile joint in the body, and that mobility comes at the cost of stability. Four small <strong>rotator cuff</strong> muscles hold the ball of the upper arm bone into a shallow socket while the larger muscles do the lifting. Nearly all non-traumatic shoulder pain traces back to one of four sources:</p>
<ul>
<li><strong>Rotator cuff related shoulder pain</strong> (roughly 70% of cases) â€” pain on the outer upper arm, worst when reaching overhead, out to the side, or behind your back to fasten a seatbelt.</li>
<li><strong>Frozen shoulder (adhesive capsulitis)</strong> â€” the joint capsule thickens and tightens. The hallmark is loss of movement in <em>every</em> direction, including when someone else lifts your arm for you. More common between 40 and 60, and in people with diabetes or thyroid disease.</li>
<li><strong>Shoulder osteoarthritis</strong> â€” deep, grinding pain, morning stiffness that eases within about 30 minutes, and sometimes an audible crunch on movement. It affects the main ball-and-socket joint or the smaller acromioclavicular joint on top of the shoulder.</li>
<li><strong>Inflammatory arthritis</strong> â€” rheumatoid arthritis and polymyalgia rheumatica both commonly involve the shoulders, typically with stiffness lasting well over an hour in the morning and often affecting both sides.</li>
</ul>
<p>Distinguishing between these matters, because the routine below is deliberately staged: mobility first, then strength. Pushing strengthening work into a genuinely frozen or acutely inflamed shoulder makes things worse.</p>

<h2 id="immediate-relief">Immediate relief in a painful week</h2>
<p>When the shoulder is at its most painful, four measures give the fastest change:</p>
<ul>
<li><strong>Topical NSAID gel.</strong> UK NICE guidance recommends topical non-steroidal anti-inflammatories ahead of oral tablets for a single painful joint. Applied three to four times daily, they reach the tissue directly with far less risk to the stomach and kidneys.</li>
<li><strong>Keep moving within a pain-free range.</strong> Slings and total rest are the single biggest cause of a shoulder that stiffens and stays painful. Move the arm gently every hour you are awake.</li>
<li><strong>Fix your sleeping position.</strong> Lie on the unaffected side with a pillow hugged in front of you to support the sore arm, or sleep on your back with a folded towel under the elbow. Night pain is the symptom people find hardest, and positioning helps more than anything else.</li>
<li><strong>Heat before movement.</strong> Ten minutes of a warm shower or a heat pack before your exercises makes the range-of-motion work considerably easier.</li>
</ul>

<h2 id="mobility-routine">Stage one: the daily mobility routine</h2>
<p>Do these every day, including flare days. They take about eight minutes. Move slowly; you are not stretching to the point of pain.</p>
<ul>
<li><strong>Pendulum swings.</strong> Lean forward, supporting yourself with the good arm on a table. Let the sore arm hang and swing it gently in small circles, 30 seconds each direction. This uses gravity rather than muscle to open the joint space.</li>
<li><strong>Table slides.</strong> Sit at a table with your forearm resting on a cloth. Slide the arm forward as far as comfortable, then back. 10 repetitions.</li>
<li><strong>Wall walks.</strong> Face a wall, walk your fingers up it as high as is comfortable, hold five seconds, walk back down. 8 repetitions.</li>
<li><strong>Assisted external rotation.</strong> Hold a walking stick or broom handle with both hands, elbows tucked at your sides. Use the good arm to push the sore forearm outwards. Hold 10 seconds, 8 repetitions.</li>
<li><strong>Cross-body reach.</strong> Bring the sore arm across your chest, supporting it at the elbow with the other hand. Hold 20 seconds, 3 repetitions.</li>
</ul>

<h2 id="strength-routine">Stage two: strengthening, two to three times a week</h2>
<p>Add these once daily mobility work is comfortable â€” usually after one to two weeks. Use a light resistance band or a tin of beans; the rotator cuff responds to control, not heavy load.</p>
<ul>
<li><strong>Isometric holds.</strong> Stand beside a wall and press the outside of your elbow into it, holding gently at about 30% effort for 10 seconds. 5 repetitions. These are the safest starting point because the shoulder does not move.</li>
<li><strong>Band external rotation.</strong> Elbow tucked at your side at 90 degrees, band anchored at waist height, rotate the forearm outwards away from your body. 2â€“3 sets of 10.</li>
<li><strong>Band internal rotation.</strong> The same setup, rotating inwards across your stomach. 2â€“3 sets of 10.</li>
<li><strong>Scapular squeezes.</strong> Draw both shoulder blades down and together, hold five seconds. 10 repetitions. Shoulder blade control is routinely the missing link in stubborn shoulder pain.</li>
<li><strong>Scaption raises.</strong> With a light weight, raise the arm to shoulder height at about 30 degrees in front of your body (not straight out to the side). 2 sets of 8.</li>
<li><strong>Wall press-ups.</strong> Hands on the wall at chest height, slow press-ups. 2 sets of 10. Builds tolerance to loading through the whole shoulder girdle.</li>
</ul>

<h2 id="weekly-plan">A realistic weekly plan</h2>
<ul>
<li><strong>Every day</strong> â€” the eight-minute mobility routine, ideally after a warm shower.</li>
<li><strong>Monday, Wednesday, Friday</strong> â€” add the strengthening set (about 15 minutes).</li>
<li><strong>Most days</strong> â€” 20â€“30 minutes of walking. General activity reduces pain sensitivity across all joints, shoulders included, and counts toward the UK Chief Medical Officer target of 150 minutes of moderate activity weekly.</li>
</ul>
<p>Three short sessions a week sustained for three months beat an intensive fortnight followed by abandonment. Track how the shoulder feels the morning after each session rather than during it â€” the next-morning response is the honest signal.</p>

<h2 id="daily-adjustments">Everyday adjustments that reduce shoulder load</h2>
<ul>
<li>Move frequently used items in cupboards down to waist height so you are not repeatedly reaching overhead.</li>
<li>Carry bags in the unaffected hand, or use a rucksack across both shoulders.</li>
<li>Raise your work surface or screen so you are not shrugging or reaching forward all day.</li>
<li>Swap a heavy handbag for a cross-body bag worn on the opposite side.</li>
<li>Use a long-handled sponge or a hair-washing rinse jug during the painful phase.</li>
</ul>

<h2 id="treatments">When self-management is not enough</h2>
<p>If six to eight weeks of consistent exercise has not shifted the pain, options in the UK include a referral to musculoskeletal physiotherapy (self-referral is available in most areas), a corticosteroid injection â€” most useful for frozen shoulder and acutely inflamed cuff pain, and best combined with continued exercise rather than used alone â€” and imaging or a specialist opinion if a full-thickness cuff tear or advanced osteoarthritis is suspected. Surgery is a late option and, for most rotator cuff pain, no better than a well-delivered exercise programme in trial comparisons.</p>

<h2 id="red-flags">Red flags â€” seek medical advice promptly</h2>
<p>Contact a GP or urgent care if you have: shoulder pain after a fall or a sudden wrench with an inability to lift the arm, a visibly deformed shoulder, numbness or weakness spreading down the arm, fever or feeling systemically unwell alongside the pain, unexplained weight loss, a history of cancer, or new severe pain in both shoulders with prolonged morning stiffness in someone over 50 (which can indicate polymyalgia rheumatica and needs prompt assessment).</p>

<h2 id="next-steps">Your next step</h2>
<p>Start today with the pendulum swings and cross-body reach â€” two minutes total. Build to the full mobility routine over the coming week, then add strengthening. Most people with rotator cuff pain see a clear improvement within six weeks of doing this consistently.</p>

<h2 id="sources">Sources &amp; disclaimer</h2>
<p>Based on NICE Clinical Knowledge Summaries on shoulder pain and rotator cuff disorders, NICE guideline NG226 (Osteoarthritis in over 16s, 2022), UK Chief Medical Officer Physical Activity Guidelines (2019) and Chartered Society of Physiotherapy shoulder rehabilitation guidance. For educational use only and not a substitute for personalised advice from a physiotherapist or GP.</p>
`;

export default function ShoulderPainRelief() {
  const html = addHeadingIds(CONTENT);
  const title = "Shoulder pain relief: UK physio-aligned exercises & self-care";
  const description =
    "Why your shoulder is in pain and how to relieve it â€” a staged mobility and strengthening routine, fast-relief measures, red flags and when to see a GP.";
  const url = "https://livingwitharthritis.org.uk/guides/shoulder-pain-relief";

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
        <meta property="og:image" content="https://livingwitharthritis.org.uk/og/home.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og/home.png" />
      </Helmet>
      <PageSchema
        url="/guides/shoulder-pain-relief"
        name="Shoulder pain relief"
        description={description}
        medical={{ condition: "Shoulder pain" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Shoulder pain relief" },
        ]}
        faqs={FAQS}
        lastReviewed="2026-07-29"
        idPrefix="shoulder-pain-relief"
      />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Shoulder pain relief"
          subtitle="What is causing it, what settles it fastest, and a staged mobility-then-strength routine you can start at home today."
          badge="Clinical Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Most shoulder pain comes from the rotator cuff, a stiffening joint
            capsule, or osteoarthritis â€” and in nearly every case, gentle
            movement relieves it faster than rest. This guide explains how to
            tell the causes apart, what settles a painful week quickly, and
            gives you a staged routine of mobility and strengthening exercises
            aligned with UK physiotherapy practice.
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
              idPrefix="shoulder-pain-relief-faq"
              items={FAQS}
              injectSchema={false}
            />
          </div>

          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Next steps</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/conditions/shoulder-arthritis"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Condition â†’
                </p>
                <p className="font-bold text-foreground">Shoulder arthritis</p>
              </Link>
              <Link
                to="/guides/exercise"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Pillar guide â†’
                </p>
                <p className="font-bold text-foreground">
                  Best exercises for arthritis
                </p>
              </Link>
              <Link
                to="/guides/arthritis-pain-relief"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">Related â†’</p>
                <p className="font-bold text-foreground">
                  Arthritis pain relief options
                </p>
              </Link>
              <Link
                to="/chat"
                className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <p className="text-xs text-primary font-bold mb-1">
                  Need tailored advice? â†’
                </p>
                <p className="font-bold text-foreground">
                  Ask our help &amp; support team
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/shoulder-pain-relief" />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

