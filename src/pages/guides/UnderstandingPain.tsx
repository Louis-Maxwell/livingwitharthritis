import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Activity,
  ArrowLeft,
  Brain,
  CircleDot,
  Flame,
  HelpCircle,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_UNDERSTANDING_PAIN } from "@/data/clinical/ukCitations";

const BASE = "https://livingwitharthritis.org.uk";
const PATH = "/guides/understanding-pain";
const URL = `${BASE}${PATH}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Understanding Pain – UK Arthritis Guide",
  description:
    "Learn about pain types — inflammatory, mechanical, focal, systemic, bilateral, fibromyalgia, acute, chronic and neuropathic — and how to talk about pain with your GP.",
  url: URL,
  inLanguage: "en-GB",
  datePublished: "2026-09-21",
  dateModified: "2026-09-21",
  author: { "@type": "Organization", name: "Living With Arthritis", url: BASE },
  publisher: {
    "@type": "Organization",
    name: "Living With Arthritis",
    url: BASE,
    logo: { "@type": "ImageObject", url: `${BASE}/og/landing-share.png` },
  },
  about: { "@type": "MedicalCondition", name: "Chronic pain" },
  audience: {
    "@type": "MedicalAudience",
    audienceType: "Patient",
    geographicArea: { "@type": "Country", name: "United Kingdom" },
  },
  mainEntityOfPage: URL,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between inflammatory and mechanical pain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inflammatory pain often brings morning stiffness, warmth or swelling and may flare without a clear activity trigger. Mechanical pain is more closely tied to load, posture, injury or wear. A clinician uses your history and examination to tell them apart.",
      },
    },
    {
      "@type": "Question",
      name: "When does pain count as chronic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pain lasting longer than about three months is usually described as chronic. It can still change day to day. Report lasting pain to your GP so treatable drivers are not missed.",
      },
    },
    {
      "@type": "Question",
      name: "What does neuropathic pain feel like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nerve-related pain is often burning, tingling, electric or numb rather than a simple ache. Diabetes, some chemotherapy, HIV and multiple sclerosis are among conditions linked with it.",
      },
    },
  ],
};

/** Original animated hero — not based on third-party artwork. */
function PainSignalHero() {
  return (
    <figure className="rounded-2xl border border-border/40 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
      <svg
        viewBox="0 0 640 280"
        role="img"
        aria-labelledby="pain-hero-title pain-hero-desc"
        className="w-full h-auto max-h-[280px]"
      >
        <title id="pain-hero-title">Animated illustration of pain signals travelling along nerves</title>
        <desc id="pain-hero-desc">
          A calm stylised figure with glowing nerve pathways that pulse from a joint toward the brain, showing how the nervous system signals pain.
        </desc>
        <defs>
          <linearGradient id="nerveGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.85" />
          </linearGradient>
          <style>{`
            @keyframes pulseGlow {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 1; }
            }
            @keyframes dashFlow {
              to { stroke-dashoffset: -120; }
            }
            @keyframes jointPulse {
              0%, 100% { r: 10; opacity: 0.7; }
              50% { r: 14; opacity: 1; }
            }
            .nerve-line {
              fill: none;
              stroke: url(#nerveGrad);
              stroke-width: 3;
              stroke-linecap: round;
              stroke-dasharray: 8 10;
              animation: dashFlow 2.4s linear infinite;
            }
            .glow-dot {
              fill: hsl(var(--primary));
              animation: pulseGlow 1.8s ease-in-out infinite;
            }
            .joint-core {
              fill: hsl(var(--primary));
              animation: jointPulse 2s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .nerve-line, .glow-dot, .joint-core { animation: none !important; }
              .nerve-line { stroke-dasharray: none; opacity: 0.85; }
            }
          `}</style>
        </defs>
        <ellipse cx="320" cy="250" rx="180" ry="12" fill="hsl(var(--muted-foreground))" opacity="0.12" />
        <g stroke="hsl(var(--foreground))" strokeWidth="3" fill="none" opacity="0.55">
          <circle cx="320" cy="58" r="22" />
          <path d="M320 80 L320 150" />
          <path d="M320 100 L270 140" />
          <path d="M320 100 L370 140" />
          <path d="M320 150 L285 220" />
          <path d="M320 150 L355 220" />
        </g>
        <circle className="joint-core" cx="285" cy="210" r="12" />
        <circle className="glow-dot" cx="285" cy="210" r="22" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5" />
        <path className="nerve-line" d="M285 200 C260 160, 250 120, 300 70" />
        <path className="nerve-line" d="M285 200 C300 155, 310 110, 320 80" style={{ animationDelay: "0.4s" }} />
        <path className="nerve-line" d="M285 200 C320 165, 340 125, 335 75" style={{ animationDelay: "0.8s" }} />
        <circle className="glow-dot" cx="320" cy="58" r="8" style={{ animationDelay: "0.3s" }} />
        <circle className="glow-dot" cx="308" cy="50" r="4" style={{ animationDelay: "0.9s" }} />
        <circle className="glow-dot" cx="334" cy="52" r="5" style={{ animationDelay: "1.2s" }} />
        <text x="420" y="100" fill="hsl(var(--muted-foreground))" fontSize="13" fontFamily="system-ui,sans-serif">
          Signal travels
        </text>
        <text x="420" y="120" fill="hsl(var(--muted-foreground))" fontSize="13" fontFamily="system-ui,sans-serif">
          along the nerves
        </text>
        <text x="40" y="230" fill="hsl(var(--muted-foreground))" fontSize="13" fontFamily="system-ui,sans-serif">
          Joint focus
        </text>
      </svg>
      <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border/30">
        Animated illustration of how pain messages move from a joint along nerves toward the brain. Original artwork for Living With Arthritis.
      </figcaption>
    </figure>
  );
}

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6 }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="prose prose-lg max-w-none text-foreground/85 prose-headings:font-display prose-headings:text-foreground prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-foreground">
      {children}
    </div>
  </motion.section>
);

const UnderstandingPain = () => (
  <>
    <Helmet>
      <title>Understanding Pain | Types, Causes &amp; Talking to Your GP | UK</title>
      <meta
        name="description"
        content="Understanding pain for people with arthritis: inflammatory vs mechanical, focal vs systemic, bilateral, fibromyalgia, acute vs chronic, neuropathic pain, and questions to ask your doctor."
      />
      <meta
        name="keywords"
        content="understanding pain, types of pain, inflammatory pain, mechanical pain, neuropathic pain, fibromyalgia pain, chronic pain uk, arthritis pain explained"
      />
      <meta property="og:title" content="Understanding Pain | Living With Arthritis UK" />
      <meta
        property="og:description"
        content="A clear UK guide to pain types and how to describe them to your GP — written for people living with arthritis and joint conditions."
      />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/og/landing-share.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Understanding Pain – UK Guide" />
      <meta name="twitter:description" content="Pain types explained in plain English, plus questions to take to your GP." />
      <meta name="twitter:image" content={`${BASE}/og/landing-share.png`} />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="United Kingdom" />
      <meta name="geo.country" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <link rel="canonical" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>

    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Guides", href: "/guides" }, { label: "Understanding pain" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link
            to="/"
            className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
            <Brain className="w-3 h-3" /> Pain education
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Understanding Pain
          </h1>
          <AeoEnhancement route={PATH} />
          <p className="speakable-intro text-lg text-muted-foreground leading-relaxed mb-4">
            Learn about pain, the main ways clinicians describe it, and how to explain what you feel so your GP or rheumatology team can help more accurately.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Written for people in England, Scotland, Wales and Northern Ireland. Start with your GP or NHS 111; we also list{" "}
            <Link to="/arthritis-support" className="text-primary underline underline-offset-2">
              city support pages
            </Link>{" "}
            if you want local signposting.
          </p>
          <PainSignalHero />
        </div>
      </div>

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
        <div className="prose prose-lg max-w-none text-foreground/85 mb-12">
          <p>
            Pain is the nervous system’s alarm. It can warn that tissue is injured or under threat, or it can keep sounding after the original problem has settled. It may feel sharp, dull, burning, tingling, stabbing or deep and hard to place. It can sit in one joint or spread across the body — and two people with the same condition can rate the same day completely differently.
          </p>
          <p>
            Unrelieved pain does more than hurt. It can shrink social life, disturb sleep, sap mood and make work or caring feel impossible. Back, hip, knee and foot pain are among the sites people bring to UK GPs — and lasting pain can limit daily tasks and time at work.
          </p>
          <p>
            Pain lasting more than about three months is usually called chronic.{" "}
            <a
              href="https://www.nice.org.uk/guidance/ng193"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              NICE guideline NG193
            </a>{" "}
            covers assessment of chronic pain in people aged 16 and over in the NHS. It is not only an older person’s problem. Speaking to your GP matters: a clear description of yours is one of the best diagnostic clues you can give.
          </p>
        </div>

        <Section icon={Layers} title="Types of Pain">
          <p>
            Clinicians often treat pain as a warning signal first — then ask what is driving it. Sorting the source helps you know when to protect a joint and when carefully graded movement is safer than complete rest.
          </p>
          <p>
            Pain can be grouped by site, by inflammatory versus mechanical drivers, by whether it is focal or whole-body, by whether both sides are involved, by how severe or long-lasting it is (acute versus chronic), by fibromyalgia-type widespread sensitivity, or by nerve (neuropathic) damage. Whatever label fits best, naming the pattern is the first step toward the right treatment plan.
          </p>
        </Section>

        <Section icon={Flame} title="Inflammatory vs. Mechanical Pain">
          <p>
            Inflammatory pain can mean heightened sensitivity after tissue injury, or pain from a disease process — often autoimmune — in which the immune system targets healthy tissue. Typical features include lasting longer than three months, heat and swelling, stiffness after rest, flare–remission cycles, and a deep gnawing or throbbing quality.
          </p>
          <p>Conditions that can drive inflammatory patterns include:</p>
          <ul>
            <li>Ankylosing spondylitis</li>
            <li>Gout</li>
            <li>Inflammatory bowel disease–related arthritis</li>
            <li>Lyme disease</li>
            <li>Lupus</li>
            <li>Polymyalgia rheumatica</li>
            <li>Psoriatic arthritis</li>
            <li>Rheumatoid arthritis</li>
          </ul>
          <p>
            Inflammatory flares can intensify without a clear lifestyle trigger — for example a sudden spike of heat, redness and swelling in gout, or an unexplained step-up in psoriatic arthritis pain.
          </p>
          <p>
            Mechanical pain is often felt in the spine or weight-bearing joints and reflects stress on discs, ligaments, muscle or nerve. It tends to be acute or clearly linked to injury, load or degenerative change, may start suddenly, and does not always ease simply by keeping moving.
          </p>
          <p>Examples linked with mechanical patterns include:</p>
          <ul>
            <li>Degenerative disc disease</li>
            <li>Spinal stenosis</li>
            <li>Herniated disc</li>
            <li>Fracture</li>
            <li>Severe scoliosis</li>
            <li>Osteoarthritis</li>
          </ul>
          <p>Questions that help separate the two include how long pain has been present, family history of inflammatory arthritis, how it began, and whether mornings are worst.</p>
          <p>
            Mechanical problems are often managed with relative rest (not total stillness), NSAIDs if suitable, heat or ice, and physiotherapy — you still need modified movement so joints do not seize and muscles do not waste. Inflammatory disease usually needs medicines that calm the underlying process (from NSAIDs and steroids to DMARDs, biologics or JAK inhibitors, as advised by your team). Even after inflammation settles, some people still feel chronic pain, so ongoing symptom plans still matter.
          </p>
        </Section>

        <Section icon={CircleDot} title="Focal vs. Systemic Pain">
          <p>
            Focal pain is local — you can often point to it with one finger — and commonly follows trauma or a single injured structure. Systemic muscle or joint pain is widespread and may follow illness, infection or a medicine reaction. Most inflammatory rheumatic diseases sit in the systemic group, as do infections such as Lyme disease, COVID-19 or hepatitis.
          </p>
          <p>
            A practical contrast: waking so stiff that the whole body takes two or three hours to loosen suggests a systemic pattern; waking with stiffness mainly in one knee sounds more focal.
          </p>
        </Section>

        <Section icon={Activity} title="Bilateral Pain">
          <p>
            Bilateral means both sides of the body. Feeling pain left and right together can intensify symptoms and limit mobility; swelling and stiffness often travel with it. Bilateral patterns lean toward inflammatory illness more than a single-site mechanical injury — though osteoarthritis can sometimes affect matching joints on both sides.
          </p>
          <p>Apart from osteoarthritis, many bilateral inflammatory conditions are autoimmune. Examples (with typical sites) include:</p>
          <ul>
            <li>
              <strong>Fibromyalgia</strong> — tender points in many regions
            </li>
            <li>
              <strong>Osteoarthritis</strong> — less often strictly bilateral; knees, hips, hands, feet
            </li>
            <li>
              <strong>Polymyalgia rheumatica</strong> — shoulders, upper arms, neck, pelvis
            </li>
            <li>
              <strong>Psoriatic arthritis</strong> — knees, ankles, hands, feet
            </li>
            <li>
              <strong>Rheumatoid arthritis</strong> — hands, wrists, knees or hips
            </li>
          </ul>
          <p>
            Finding the cause matters: untreated psoriatic arthritis, osteoarthritis and rheumatoid arthritis can permanently damage joints.
          </p>
        </Section>

        <Section icon={Sparkles} title="Fibromyalgia Pain">
          <p>
            Fibromyalgia is a long-term condition of widespread pain and heightened sensitivity. There is no cure yet, but medicines and non-drug approaches can ease symptoms. The{" "}
            <a
              href="https://www.nhs.uk/conditions/fibromyalgia/"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              NHS fibromyalgia overview
            </a>{" "}
            notes it is more common in women than men and can start at any age, often between 25 and 55. It can coexist with rheumatoid arthritis, lupus, osteoarthritis or ankylosing spondylitis.
          </p>
          <p>
            Widespread aching, burning, throbbing or stabbing pain — often in the limbs, trunk, head and buttocks — is central. Other features can include fatigue, poor sleep, stiffness, tenderness, limb tingling, concentration problems, sensory sensitivity, and gut symptoms such as bloating or constipation.
          </p>
          <p>
            Tender points (small, often symmetrical areas away from the joints that hurt with light pressure) are a classic feature. Common sites include the front of the lower neck, upper chest edge, near the elbow, the knee, the skull base, the hip bone, the upper outer buttock, and the back of the neck and shoulders.
          </p>
          <p>
            Without support, symptoms can worsen and weigh heavily on mood. If you recognise widespread tender points, discuss them with your GP so you can get a clear diagnosis and a plan.
          </p>
        </Section>

        <Section icon={Zap} title="Acute vs. Chronic Pain">
          <p>
            Acute pain arrives suddenly and usually settles within days to weeks — generally under three months. It can feel sharp, throb, tingle, burn or numb, is often intense, and usually has a clear trigger such as illness, injury or surgery. That protectiveness is useful: it flags that an area needs care.
          </p>
          <p>Examples include fractures, muscle sprains or tears, post-operative pain, burns and cuts.</p>
          <p>
            Chronic pain builds or persists over months or years. Intensity can wax and wane. People describe ache, burn or shooting sensations. It touches every part of daily life and is linked with higher rates of anxiety and depression.
          </p>
          <p>Examples of how chronic disease pain may feel (everyone differs):</p>
          <ul>
            <li>
              <strong>Ankylosing spondylitis</strong> — ongoing deep, dull back pain
            </li>
            <li>
              <strong>Fibromyalgia</strong> — whole-body ache, muscle discomfort, twitching feelings
            </li>
            <li>
              <strong>Inflammatory bowel disease</strong> — abdominal cramping, burning, stabbing or aching
            </li>
            <li>
              <strong>Lower back pain</strong> — tingling, burning, dull, sharp or radiating
            </li>
            <li>
              <strong>Osteoarthritis</strong> — swelling, tenderness, stiffness, grating sensations
            </li>
            <li>
              <strong>Psoriatic arthritis</strong> — morning-worse, tender, throbbing joints
            </li>
            <li>
              <strong>Rheumatoid arthritis</strong> — hand and foot tingling, joint stiffness and swelling
            </li>
          </ul>
          <p>Pain lasting beyond three months should be reported — early treatment of some diseases can prevent irreversible joint damage.</p>
        </Section>

        <Section icon={Brain} title="Neuropathic Pain">
          <p>
            Neuropathic pain comes from disease or damage in the nerves that carry touch, pressure and temperature. Messages to the brain become distorted; the feeling is often less of a clean “cut” and more burning, tingling or electric. Not everyone with long-term joint pain has a nerve component — say if burning, tingling or numbness is part of your picture.
          </p>
          <p>Frequent drivers include:</p>
          <ul>
            <li>
              <strong>Diabetes</strong> — high glucose injures nerves; burning or tingling often starts in the feet and can climb the legs, sometimes with later loss of feeling
            </li>
            <li>
              <strong>Chemotherapy</strong> — some cancer treatments cause tingling, numbness or weakness in hands and feet that may ease after treatment ends
            </li>
            <li>
              <strong>HIV</strong> — advanced disease can bring burning, stiffness or prickling in the toes or soles
            </li>
            <li>
              <strong>Multiple sclerosis</strong> — from mild irritation to intense burning or sharp pain
            </li>
          </ul>
          <p>
            Neuropathic pain from diabetes or HIV may not fully reverse, but treating the underlying condition can slow worsening. Ask your clinical team about options suited to your diagnosis.
          </p>
        </Section>

        <Section icon={HelpCircle} title="Questions to Ask Your Doctor About Pain">
          <p>
            How you describe pain shapes what your clinician hears and which treatments they consider. It is reasonable to ask how they decided you have joint, muscle or nerve pain — for example, “How can you tell which structure is involved?”
          </p>
          <p>Other useful questions:</p>
          <ul>
            <li>If the pain shoots or burns, could it be nerve-related?</li>
            <li>When joints feel stiff or tender, which arthritis patterns should we consider?</li>
            <li>What might a deep, throbbing ache point to?</li>
            <li>Why has this lasted more than three months?</li>
            <li>Why is morning pain worse?</li>
            <li>What does pain that spreads from my back into my thighs or buttocks suggest?</li>
          </ul>
          <p>Clear communication is often the shortest route to the right next test or treatment.</p>
        </Section>

        <div className="p-8 rounded-2xl bg-accent border border-border/30 mb-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Next steps on Living With Arthritis</h2>
          <p className="text-muted-foreground mb-5">
            Put this explanation to work with practical relief ideas, flare plans and movement guidance — then talk any lasting pain through with your GP.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/guides/arthritis-pain-relief"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Arthritis pain relief tips
            </Link>
            <Link
              to="/arthritis-flare-ups"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
            >
              Flare-up guide
            </Link>
            <Link
              to="/exercises"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/40 transition-colors"
            >
              Gentle exercises
            </Link>
            <Link
              to="/self-help"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/40 transition-colors"
            >
              Self-help tool
            </Link>
          </div>
        </div>
      </main>

      <nav
        aria-label="Related pathways"
        className="container mx-auto px-6 md:px-10 max-w-3xl mb-10 rounded-xl border border-border/40 bg-muted/20 p-5"
      >
        <p className="text-sm font-semibold text-foreground m-0 mb-3">Related help</p>
        <ul className="text-sm text-muted-foreground space-y-2 m-0 list-disc list-inside">
          <li>
            <Link to="/guides/arthritis-pain-relief" className="text-primary underline underline-offset-2">
              Arthritis pain relief
            </Link>{" "}
            — heat, cold, paced movement, medicines
          </li>
          <li>
            <Link to="/guides/newly-diagnosed" className="text-primary underline underline-offset-2">
              Newly diagnosed
            </Link>{" "}
            — first steps after a diagnosis
          </li>
          <li>
            <Link to="/benefits-pip" className="text-primary underline underline-offset-2">
              Benefits &amp; PIP
            </Link>{" "}
            — when pain limits daily living
          </li>
          <li>
            <Link to="/guides" className="text-primary underline underline-offset-2">
              All guides
            </Link>
          </li>
          <li>
            <Link to="/conditions/osteoarthritis" className="text-primary underline underline-offset-2">
              Osteoarthritis
            </Link>{" "}
            and{" "}
            <Link to="/conditions/rheumatoid-arthritis" className="text-primary underline underline-offset-2">
              rheumatoid arthritis
            </Link>{" "}
            — condition pages
          </li>
          <li>
            <Link to="/arthritis-support" className="text-primary underline underline-offset-2">
              Arthritis support near you
            </Link>{" "}
            — UK city signposting
          </li>
        </ul>
      </nav>

      <ArticleCitations citations={CITATIONS_UNDERSTANDING_PAIN} />
      <EducationalDisclaimerBox lastReviewed="2026-09-21" />
      <TopicClusterNav path={PATH} />
      <GuideOnwardJourney currentPath={PATH} />
      <Footer />
    </div>
  </>
);

export default UnderstandingPain;
