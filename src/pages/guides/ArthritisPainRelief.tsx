import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, ThermometerSun, Pill, Dumbbell, Apple, Moon } from "lucide-react";
import { motion } from "framer-motion";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import AeoEnhancement from "@/components/seo/AeoEnhancement";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/guides/arthritis-pain-relief`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Arthritis Pain Relief Tips – Evidence-Based UK Guide",
  "description": "UK guide to arthritis pain relief: practical, evidence-based tips on movement, heat & cold, diet, sleep, topical and oral medicines, and when to see your GP.",
  "url": URL,
  "inLanguage": "en-GB",
  "datePublished": "2026-06-12",
  "dateModified": "2026-06-12",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.ico` } },
  "about": { "@type": "MedicalCondition", "name": "Arthritis" },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": URL
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${BASE}/blog` },
    { "@type": "ListItem", "position": 3, "name": "Arthritis Pain Relief", "item": URL }
  ]
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the fastest way to relieve arthritis pain?", "acceptedAnswer": { "@type": "Answer", "text": "For an acute flare, the quickest practical relief is a 15–20 minute application of cold (for hot, swollen joints) or heat (for stiff, aching joints), combined with a short course of topical NSAID gel and gentle range-of-motion movement. Avoid full rest — joints stiffen quickly when immobilised." } },
    { "@type": "Question", "name": "What is the best painkiller for arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "UK guidance (NICE) suggests starting with topical NSAID gels (e.g. ibuprofen or diclofenac) for knee and hand osteoarthritis. Oral NSAIDs are added if needed at the lowest effective dose for the shortest time. Paracetamol alone is now considered less effective than previously believed. Always check with your GP or pharmacist before regular use." } },
    { "@type": "Question", "name": "Does exercise really help arthritis pain?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — supervised exercise is the single most evidence-supported treatment for osteoarthritis pain and function, with effect sizes comparable to NSAIDs but without the side effects. Walking, cycling, swimming, tai chi and strength work all help when done consistently for 8–12 weeks." } },
    { "@type": "Question", "name": "What foods reduce arthritis pain?", "acceptedAnswer": { "@type": "Answer", "text": "A Mediterranean-style diet rich in oily fish, olive oil, vegetables, beans, nuts and whole grains is associated with lower pain and stiffness scores. Cutting ultra-processed food, sugary drinks and excess alcohol reduces systemic inflammation." } },
    { "@type": "Question", "name": "When should I see a GP about arthritis pain?", "acceptedAnswer": { "@type": "Answer", "text": "See your GP if pain lasts more than six weeks, wakes you at night, is associated with joint swelling, redness or warmth, or limits daily activities. Early review is especially important if you suspect an inflammatory arthritis (morning stiffness lasting over an hour, multiple joints affected)." } }
  ]
};

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
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

const ArthritisPainRelief = () => (
  <>
    <Helmet>
      <title>Arthritis Pain Relief: Evidence-Based UK Tips | LWA</title>
      <meta name="description" content="Practical UK guide to arthritis pain relief — movement, heat & cold, topical NSAIDs, diet, sleep and when to see your GP. Written for everyday use." />
      <meta name="keywords" content="arthritis pain relief, arthritis pain relief tips, joint pain relief, how to relieve arthritis pain, arthritis pain management uk, arthritis flare relief, natural arthritis pain relief" />
      <meta property="og:title" content="Arthritis Pain Relief – Evidence-Based UK Tips" />
      <meta property="og:description" content="Movement, heat & cold, topical NSAIDs, diet and sleep — the practical things that lower arthritis pain." />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Pain Relief – UK Guide" />
      <meta name="twitter:description" content="Practical, evidence-based tips that lower arthritis pain day to day." />
      <meta name="geo.region" content="GB" />
      <link rel="alternate" hrefLang="en-GB" href={URL} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Guides", href: "/blog" }, { label: "Arthritis pain relief" }]} />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link to="/" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
            <Heart className="w-3 h-3" /> Practical guide
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Arthritis Pain Relief
          </h1>
            <AeoEnhancement route="/guides/arthritis-pain-relief" />
          <p className="text-lg text-muted-foreground leading-relaxed">
            More than 10 million people in the UK live with arthritis. Most days are manageable; some are not. This guide pulls together the everyday things that lower pain — the small habits, the right medicines, the moves that work — so you can build a kit that fits your life.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">

        <Section icon={Dumbbell} title="1. Move — gently, often">
          <p>Movement is the single most evidence-supported treatment for arthritis pain. Joints are nourished by motion; rest stiffens them within hours. Aim for <strong>little and often</strong>, not heroic sessions.</p>
          <ul>
            <li><strong>Walking</strong> — start at 10 minutes twice a day, build to 30 minutes</li>
            <li><strong>Cycling or swimming</strong> — minimal joint load, big cardio benefit</li>
            <li><strong>Tai chi</strong> — reduces pain and improves balance; see our <Link to="/exercises/tai-chi-for-arthritis" className="text-primary underline">tai chi guide</Link></li>
            <li><strong>Range-of-motion work</strong> — bend and straighten each painful joint through its full pain-free range, twice a day</li>
          </ul>
          <p>For joint-specific routines, browse the <Link to="/exercises" className="text-primary underline">exercise hub</Link>.</p>
        </Section>

        <Section icon={ThermometerSun} title="2. Use heat and cold — match it to the joint">
          <ul>
            <li><strong>Heat</strong> (10–20 min) — for stiff, aching joints, especially first thing. A warm shower, microwaveable wheat bag or warm bath all work.</li>
            <li><strong>Cold</strong> (10–15 min, wrapped) — for hot, swollen, flaring joints. A bag of frozen peas in a tea-towel is the cheapest cold pack you'll find.</li>
            <li><strong>Alternate</strong> — some people find swapping heat and cold every few minutes settles a persistent ache.</li>
          </ul>
        </Section>

        <Section icon={Pill} title="3. Get the right medicines">
          <p>UK NICE guidance for osteoarthritis now recommends:</p>
          <ul>
            <li><strong>Topical NSAID gel first</strong> — ibuprofen or diclofenac, applied 3× a day to the painful joint. Fewer side effects than tablets.</li>
            <li><strong>Oral NSAIDs</strong> — short courses with food, at the lowest effective dose. Always check with your pharmacist if you take blood thinners, have asthma, or have stomach problems.</li>
            <li><strong>Paracetamol</strong> — useful as an add-on, less effective on its own than once thought.</li>
            <li><strong>Capsaicin cream</strong> — derived from chilli; effective for hand and knee osteoarthritis with patient persistence (it can sting at first).</li>
            <li><strong>Corticosteroid injections</strong> — your GP can refer for these for a single severely painful joint.</li>
          </ul>
          <p>If you take regular painkillers more than 2–3 times a week, book a GP review.</p>
        </Section>

        <Section icon={Apple} title="4. Eat to lower inflammation">
          <p>A <Link to="/diet/mediterranean-diet-for-arthritis" className="text-primary underline">Mediterranean-style diet</Link> is the most consistently effective dietary pattern for arthritis pain. The core idea is simple: more plants, more oily fish, more olive oil; less ultra-processed food, less sugar, less alcohol.</p>
          <ul>
            <li>Oily fish (salmon, mackerel, sardines) <strong>twice a week</strong> for omega-3s</li>
            <li>A handful of nuts most days</li>
            <li>Olive oil as the main cooking fat</li>
            <li>Plenty of beans, lentils and whole grains</li>
            <li>Less than 14 units of alcohol a week; ideally less</li>
          </ul>
          <p>Losing even 5% of body weight measurably reduces knee and hip pain.</p>
        </Section>

        <Section icon={Moon} title="5. Protect your sleep">
          <p>Poor sleep amplifies pain by up to 40% in chronic-pain studies. Pain disturbs sleep, and broken sleep magnifies pain — breaking the loop matters.</p>
          <ul>
            <li>Same bed-time and wake-time, 7 days a week</li>
            <li>Bedroom cool, dark, screen-free for the last 30 minutes</li>
            <li>Pillow between knees if hip or back pain disturbs you</li>
            <li>If pain wakes you most nights, ask your GP about a short course of slow-release pain relief</li>
          </ul>
        </Section>

        <Section icon={Activity} title="6. Manage flares">
          <p>Flare-ups are part of life with arthritis. See our <Link to="/arthritis-flare-ups" className="text-primary underline">flare-up guide</Link> for the full playbook. The short version:</p>
          <ul>
            <li><strong>Don't stop moving</strong> — drop intensity, not movement itself</li>
            <li><strong>Cold pack</strong> for hot, swollen joints; heat for stiff ones</li>
            <li><strong>Pace the day</strong> — alternate 20 minutes of activity with 5 minutes of rest</li>
            <li><strong>Topical NSAID gel</strong> 3× a day</li>
            <li><strong>Sleep, hydration, simple food</strong> — the basics matter most when you feel worst</li>
          </ul>
        </Section>

        <Section icon={Heart} title="When to see your GP">
          <p>Book an appointment if:</p>
          <ul>
            <li>Pain has lasted more than six weeks</li>
            <li>A joint is hot, red or swollen</li>
            <li>Morning stiffness regularly lasts over an hour</li>
            <li>Pain wakes you at night</li>
            <li>You're taking regular painkillers more than 2–3 times a week</li>
            <li>You're losing weight, feeling feverish or generally unwell alongside joint pain</li>
          </ul>
          <p>If you're already on a waiting list, our <Link to="/arthritis-waiting-list-help" className="text-primary underline">waiting-list help guide</Link> covers what you can do in the meantime.</p>
        </Section>

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Build your own plan</h2>
          <p className="text-muted-foreground mb-5">Use our self-help tool to put these ideas into a simple weekly routine.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/self-help" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Open the self-help tool
            </Link>
            <Link to="/exercises" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Browse exercises
            </Link>
          </div>
        </div>
      </main>
      <GuideOnwardJourney currentPath="/guides/arthritis-pain-relief" />
      <Footer />
    </div>
  </>
);

export default ArthritisPainRelief;
