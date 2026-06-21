import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";

const Footer = lazy(() => import("@/components/Footer"));

const KNEE_REPLACEMENT_FAQS = [
  { question: "When should I consider knee replacement surgery?", answer: "Knee replacement is usually considered when severe osteoarthritis or rheumatoid arthritis causes daily pain that disturbs sleep, limits walking under 30 minutes, and has not responded to at least 3–6 months of non-surgical treatment (weight loss, physiotherapy, painkillers, steroid injections). NICE guidance (NG226) recommends referral when symptoms substantially affect quality of life." },
  { question: "How long does a knee replacement last?", answer: "Modern total knee replacements last around 20–25 years in 80–90% of patients, according to the UK National Joint Registry. Longevity depends on age at surgery, weight, activity level and implant type. Younger, more active patients may need revision surgery later in life." },
  { question: "How long is recovery from knee replacement surgery ?", answer: "Most patients are discharged within 1–3 days. You can usually walk with crutches within 24 hours, drive at 6 weeks, and return to desk work at 6–8 weeks. Full recovery — including swelling reduction and maximum strength — typically takes 6–12 months. Daily physiotherapy exercises are essential during this period." },
  { question: "What is the UK waiting list for a knee replacement?", answer: "As of 2024, the median public-system wait for a knee replacement in England is around 18–22 weeks from referral, though some trusts exceed 40 weeks. You have the legal right under the UK 18-week referral-to-treatment standard to be treated within 18 weeks of referral and can request alternative providers if waits exceed this." },
  { question: "What are the risks of knee replacement surgery?", answer: "Serious complications are uncommon. Around 1 in 100 patients develop a deep infection, 1 in 100 a blood clot (DVT or pulmonary embolism), and 1 in 200 nerve damage. About 15–20% of patients have residual pain or stiffness. Mortality within 90 days is under 0.5%. Risks rise with age, obesity, smoking and uncontrolled diabetes." },
  { question: "Can I avoid knee replacement surgery?", answer: "Many patients delay or avoid surgery by combining weight loss (every 1 kg lost reduces knee load by 4 kg per step), quadriceps strengthening, low-impact exercise (swimming, cycling), an anti-inflammatory Mediterranean diet, and a stepped pain plan (paracetamol, topical NSAIDs, injections). However, end-stage arthritis with bone-on-bone changes rarely responds long-term to conservative care." },
];

const CONTENT = `
<h2 id="overview">A Patient's Guide to Knee Replacement Surgery</h2>
<p>Knee replacement — known clinically as <strong>knee arthroplasty</strong> — is one of the most successful and well-studied operations performed in the UK. Around <strong>110,000 knee replacements</strong> are carried out each year in England, Wales and Northern Ireland (National Joint Registry, 2023), and the great majority of patients report substantial pain relief and improved mobility within a year of surgery.</p>
<p>This guide walks you through every stage of the patient journey: deciding whether surgery is right for you, what to expect in hospital, how to prepare your home, and the realities of recovery. It is written for UK patients and reflects current NICE guidance (NG226) and Royal College of Surgeons standards.</p>

<h2 id="when-to-consider">When to Consider Knee Replacement</h2>
<p>Knee replacement is recommended when conservative treatments no longer control pain and disability. Typical triggers include:</p>
<ul>
<li><strong>Pain that disturbs sleep</strong> — waking at night or being unable to find a comfortable position</li>
<li><strong>Reduced walking distance</strong> — struggling to walk for more than 20–30 minutes</li>
<li><strong>Difficulty with stairs</strong>, getting out of a chair, or driving</li>
<li><strong>Persistent stiffness</strong> and visible deformity (bow-leg or knock-knee)</li>
<li><strong>X-ray evidence of advanced arthritis</strong> — narrowed joint space, bone spurs, bone-on-bone contact</li>
<li>Symptoms not improving after <strong>3–6 months</strong> of weight loss, physiotherapy, analgesia and (where appropriate) steroid injections</li>
</ul>
<p>If these apply, ask your GP for an orthopaedic referral. You may also want to read our companion guide on <a href="/conditions/knee-arthritis">knee arthritis</a> and <a href="/arthritis-waiting-list-help">managing the wait for surgery</a>.</p>

<h2 id="types-of-surgery">Types of Knee Replacement</h2>
<h3>Total Knee Replacement (TKR)</h3>
<p>The whole joint surface is replaced — the lower end of the femur, the top of the tibia, and usually the underside of the patella. TKR accounts for around <strong>90% of UK knee replacements</strong>. Implants are typically cobalt-chromium and polyethylene, fixed with bone cement.</p>
<h3>Partial (Unicompartmental) Knee Replacement</h3>
<p>Only the damaged compartment (usually the inner side) is resurfaced. Recovery is faster and the knee feels more "natural", but it suits only around <strong>1 in 4 patients</strong> — those with arthritis confined to one compartment and intact ligaments.</p>
<h3>Patellofemoral Replacement</h3>
<p>Resurfaces only the kneecap and its groove. Used for isolated kneecap arthritis — about 1–2% of cases.</p>
<h3>Revision Knee Replacement</h3>
<p>A second operation if the original implant loosens, wears out or becomes infected. Revisions are technically harder, take longer to recover from, and are best done in specialist centres.</p>

<h2 id="before-surgery">Preparing for Surgery (Prehabilitation)</h2>
<p>"Prehab" — getting fitter <em>before</em> surgery — has strong evidence for shorter hospital stays and faster recovery. UK enhanced recovery programmes recommend:</p>
<ul>
<li><strong>Quadriceps and glute strengthening</strong> — straight-leg raises, mini-squats, step-ups (3–4 sessions per week for 6+ weeks)</li>
<li><strong>Aerobic conditioning</strong> — cycling, swimming, or aqua-walking</li>
<li><strong>Weight loss</strong> — a BMI under 35 reduces complication risk; many trusts now require BMI optimisation</li>
<li><strong>Stopping smoking</strong> at least 8 weeks before surgery — smoking doubles wound infection risk</li>
<li><strong>Reducing alcohol</strong> to under 14 units per week</li>
<li><strong>Optimising chronic conditions</strong> — diabetes (HbA1c &lt; 69 mmol/mol), blood pressure, anaemia</li>
<li><strong>Dental check-up</strong> — untreated dental infection is a known source of implant infection</li>
</ul>
<p>You will usually attend a <strong>pre-operative assessment clinic</strong> 2–6 weeks before surgery for blood tests, ECG, MRSA swabs, and an anaesthetic review.</p>

<h2 id="preparing-home">Preparing Your Home</h2>
<p>A small amount of planning makes early recovery far easier:</p>
<ul>
<li>Move frequently used items to <strong>waist height</strong> — no bending or reaching</li>
<li>Set up a recovery base downstairs if possible, with a firm chair (knee at 90°), footstool, and bedside table</li>
<li>Remove <strong>trip hazards</strong> — loose rugs, trailing cables, clutter on stairs</li>
<li>Buy or borrow a <strong>raised toilet seat</strong>, long-handled shoe horn, sock aid, grabber and shower stool</li>
<li>Batch-cook and freeze meals for the first 2–3 weeks</li>
<li>Arrange help with shopping, pets, laundry and childcare for at least 2 weeks</li>
<li>Tell family you will not be driving for around <strong>6 weeks</strong></li>
</ul>

<h2 id="in-hospital">What Happens in Hospital</h2>
<p>Most UK hospital trusts now follow an <strong>enhanced recovery after surgery (ERAS)</strong> pathway. A typical timeline:</p>
<h3>Day of Surgery</h3>
<p>You arrive fasted (usually from midnight, or as instructed). Anaesthetic is most often <strong>spinal with sedation</strong>, which is associated with less blood loss and quicker recovery than general anaesthesia. Surgery takes 60–90 minutes. You are encouraged to <strong>stand and walk within a few hours</strong> with a physiotherapist.</p>
<h3>Days 1–2</h3>
<p>Pain is managed with regular paracetamol, an anti-inflammatory if suitable, and short-term opioids. You will practise walking with crutches or a frame, climbing stairs, and bending the knee. <strong>Most patients are discharged within 1–3 days</strong>, some on the same day under modern ERAS protocols.</p>
<h3>Before Discharge</h3>
<p>You will be given blood-thinning injections or tablets for 2–4 weeks to reduce clot risk, a clear exercise sheet, contact numbers, and a follow-up appointment for around 6 weeks.</p>

<h2 id="recovery-timeline">Recovery Timeline: Week by Week</h2>
<p>Recovery is gradual. The pattern below is typical but individual — your surgical team's advice always takes priority.</p>
<h3>Weeks 1–2: Pain &amp; Swelling Control</h3>
<ul>
<li>Walk short distances with crutches every 1–2 hours</li>
<li>Ice the knee for 15–20 minutes, 4–6 times daily</li>
<li>Elevate the leg above heart level when resting</li>
<li>Do the prescribed exercises 3–4 times daily — quad sets, ankle pumps, heel slides</li>
<li>Aim for <strong>knee bend (flexion) of 70–90°</strong> by the end of week 2</li>
</ul>
<h3>Weeks 3–6: Building Movement</h3>
<ul>
<li>Progress to one crutch, then walking unaided indoors</li>
<li>Target <strong>flexion of 100–110°</strong> and full extension (straight knee)</li>
<li>Begin stationary cycling on low resistance once you have 100° of bend</li>
<li>6-week orthopaedic review — surgeon checks wound, range of movement and X-rays</li>
<li>Most patients can <strong>return to driving</strong> once they can do an emergency stop comfortably (typically 6 weeks for a right knee)</li>
</ul>
<h3>Weeks 6–12: Strength &amp; Confidence</h3>
<ul>
<li>Return to desk-based work, light shopping, social activities</li>
<li>Add resistance training, swimming, and longer walks</li>
<li>Swelling around the knee is normal for several more months</li>
</ul>
<h3>Months 3–12: Long-Term Recovery</h3>
<ul>
<li>Steady improvement in pain, strength and stamina</li>
<li>Return to recommended activities: <strong>walking, cycling, swimming, golf, doubles tennis, gentle hiking</strong></li>
<li>Avoid high-impact activities — running, contact sport, jumping — which shorten implant life</li>
<li>Full recovery is usually reached between <strong>6 and 12 months</strong></li>
</ul>

<h2 id="exercises">Essential Recovery Exercises</h2>
<p>These exercises should be done daily from day 1 unless your physiotherapist advises otherwise. See our full <a href="/exercises">exercise hub</a> for more progressions.</p>
<ul>
<li><strong>Quad sets</strong> — tighten the thigh muscle and push the back of the knee into the bed for 5 seconds, 10 reps</li>
<li><strong>Ankle pumps</strong> — move feet up and down to reduce clot risk, 20 reps every hour</li>
<li><strong>Heel slides</strong> — slide the heel towards the buttock to bend the knee, 10 reps</li>
<li><strong>Straight-leg raise</strong> — with knee locked straight, lift the leg 20 cm, hold 5 seconds, 10 reps</li>
<li><strong>Seated knee extension</strong> — sit on a firm chair, straighten the knee fully, hold 5 seconds, 10 reps</li>
<li><strong>Standing knee bends</strong> — holding a worktop, bend the operated knee back behind you, 10 reps</li>
</ul>

<h2 id="risks-complications">Risks and How They Are Managed</h2>
<p>Serious complications are uncommon but worth understanding. UK National Joint Registry data show:</p>
<ul>
<li><strong>Deep infection</strong> — around 1 in 100. Risk reduced by antibiotics at induction, laminar-flow theatres and good blood sugar control.</li>
<li><strong>Blood clots (DVT / PE)</strong> — around 1 in 100 symptomatic, reduced by early mobilisation and post-op anticoagulants.</li>
<li><strong>Stiffness</strong> requiring manipulation under anaesthetic — around 2–3%.</li>
<li><strong>Nerve or blood-vessel injury</strong> — under 1%.</li>
<li><strong>Persistent pain</strong> — 15–20% of patients report ongoing discomfort at 1 year; usually mild and manageable.</li>
<li><strong>Implant loosening or wear</strong> — gradual; most implants last 20–25 years.</li>
<li><strong>Death within 90 days</strong> — under 0.5%, mostly from cardiovascular events.</li>
</ul>
<p>Risk is higher in patients who smoke, have a BMI above 40, or have poorly controlled diabetes, heart or kidney disease. Your surgical team will discuss your individual risk before consent.</p>

<h2 id="public-vs-private">Public Waiting Lists and Private Options</h2>
<p>Knee replacement is a routine UK operation. Under the UK 18-week referral-to-treatment standard you have the right to be treated within <strong>18 weeks of referral</strong>. If your local trust cannot meet this, you can ask to be transferred to another public or publicly funded independent provider — this is sometimes called the <strong>"right to choose"</strong>.</p>
<p>Private knee replacement in the UK typically costs <strong>£12,000–£16,000</strong> all-inclusive. Patients often choose private care to shorten waits or to select a specific consultant. Outcomes are similar to public care when the same surgeon and implant are used. See our guide on <a href="/arthritis-waiting-list-help">managing the UK waiting list</a> for practical steps while you wait.</p>

<h2 id="alternatives">Alternatives and Delaying Surgery</h2>
<p>Many patients can delay or avoid surgery with a structured non-surgical plan. NICE recommends offering <strong>all</strong> patients with knee osteoarthritis a combined approach before considering surgery:</p>
<ul>
<li><strong>Weight management</strong> — losing 5–10% of body weight reduces knee pain as much as some surgical interventions</li>
<li><strong>Structured exercise</strong> — supervised physiotherapy for 6–12 weeks; ESCAPE-pain is a UK programme proven to reduce pain by 30–50%</li>
<li><strong>Topical NSAID gels</strong> (ibuprofen or diclofenac) — first-line analgesia under NICE NG226</li>
<li><strong>Oral analgesia</strong> — paracetamol, short courses of oral NSAIDs with gastric protection</li>
<li><strong>Intra-articular steroid injections</strong> — short-term pain relief lasting 4–12 weeks</li>
<li><strong>Walking aids</strong> — a stick used in the opposite hand can reduce knee load by 25%</li>
<li><strong>An <a href="/diet/mediterranean-diet-for-arthritis">anti-inflammatory Mediterranean diet</a></strong> to reduce systemic inflammation and aid weight loss</li>
</ul>
<p>Newer treatments — PRP (platelet-rich plasma), hyaluronic acid injections and stem-cell therapy — have <strong>limited or inconsistent evidence</strong> and are not routinely funded by the UK health service.</p>

<h2 id="emotional-side">The Emotional Side of Surgery</h2>
<p>Major surgery can be daunting. Anxiety, low mood and sleep disturbance are common before and after the operation. Patients often describe a "<strong>third-week dip</strong>" when the initial momentum fades and progress feels slow. This is normal. Recovery is rarely linear. Things that help:</p>
<ul>
<li>Setting small weekly goals — bending 5° more, walking 5 minutes longer</li>
<li>Keeping a brief daily diary of pain, swelling and movement</li>
<li>Staying socially connected — visitors, video calls, the <a href="/community">Living With Arthritis community</a></li>
<li>Speaking to your GP early if low mood persists beyond 2–3 weeks</li>
</ul>

<h2 id="sources">Sources &amp; Disclaimer</h2>
<p>This guide draws on NICE guideline NG226 (Osteoarthritis in over 16s: diagnosis and management), the UK National Joint Registry 20th Annual Report (2023), Royal College of Surgeons of England commissioning guidance for knee replacement, British Orthopaedic Association enhanced recovery standards, and Cochrane reviews of prehabilitation and post-operative physiotherapy. It is for general education and does not replace personalised advice from your GP, surgeon or physiotherapist.</p>
`;

export default function KneeReplacementSurgeryGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Knee Replacement Surgery UK – Patient Guide, Recovery &amp; Public Waits</title>
        <meta name="description" content="Evidence-based UK patient guide to knee replacement surgery: when to consider it, prehab, what happens in hospital, recovery timeline, exercises, risks and UK waiting list options." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/guides/knee-replacement-surgery" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Knee Replacement Surgery UK – Patient Guide, Recovery &amp; Public Waits" />
        <meta property="og:description" content="Comprehensive UK patient guide to knee replacement surgery: decision-making, prehab, hospital stay, week-by-week recovery, exercises, risks and how to manage UK waiting lists." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/knee-replacement-surgery" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Knee Replacement Surgery UK – Patient Guide, Recovery &amp; Public Waits" />
        <meta name="twitter:description" content="Evidence-based UK patient guide to knee replacement surgery: when to consider it, prehab, recovery timeline, exercises, risks and UK waiting list options." />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
      </Helmet>
      <PageSchema
        url="/guides/knee-replacement-surgery"
        name="Knee Replacement Surgery: UK Patient Guide"
        description="Evidence-based UK patient guide to knee replacement surgery, prehab, recovery, exercises, risks and UK waiting list options."
        medical={{ condition: "Knee Osteoarthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Knee Replacement Surgery" },
        ]}
        faqs={KNEE_REPLACEMENT_FAQS}
        lastReviewed="2026-06-01"
        idPrefix="knee-replacement-guide"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Knee Replacement Surgery: A UK Patient Guide"
          subtitle="From deciding on surgery to post-operative recovery — an evidence-based walk-through of every stage, written for UK patients."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <p className="speakable-intro text-lg md:text-xl text-foreground/85 leading-relaxed mb-8">
            Knee replacement is one of the most successful operations performed in the UK, with
            around 110,000 carried out each year. Most patients gain substantial pain relief and
            improved mobility within a year. This guide explains who benefits, how to prepare,
            what to expect in hospital, and what realistic recovery looks like week by week.
          </p>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/conditions/knee-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Related →</p>
                <p className="font-bold text-foreground">Knee Arthritis Guide</p>
              </Link>
              <Link to="/arthritis-waiting-list-help" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Practical →</p>
                <p className="font-bold text-foreground">Managing the Waiting List</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
