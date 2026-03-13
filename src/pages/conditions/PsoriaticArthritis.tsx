import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, Fingerprint, BookOpen, ArrowRight, Users, TrendingUp, Percent, Eye } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { StatCounter, HorizontalBar, WaveDivider, EmojiCard } from "@/components/graphics/InfographicElements";
import InternalLinks from "@/components/InternalLinks";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const BASE = "https://livingwitharthritis.org.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Psoriatic Arthritis – Symptoms, Causes & Treatment | Living With Arthritis",
  "description": "Complete UK guide to psoriatic arthritis (PsA): symptoms including joint pain and skin changes, diagnosis, treatment with DMARDs and biologics, exercises and lifestyle management.",
  "url": `${BASE}/conditions/psoriatic-arthritis`,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2025-12-15",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.ico` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Psoriatic Arthritis",
    "alternateName": ["PsA", "Arthritis Psoriatica"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Joints, skin, entheses, spine" },
    "riskFactor": ["Psoriasis", "Family history", "Age 30-50", "Obesity", "Nail psoriasis"],
    "signOrSymptom": ["Joint pain and swelling", "Skin plaques", "Dactylitis (sausage digits)", "Enthesitis", "Nail changes", "Fatigue"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "DMARDs" },
      { "@type": "MedicalTherapy", "name": "Biologic therapies (anti-TNF, IL-17, IL-23)" },
      { "@type": "MedicalTherapy", "name": "Physical therapy" },
      { "@type": "MedicalTherapy", "name": "Topical skin treatments" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": `${BASE}/conditions/psoriatic-arthritis`
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
    { "@type": "ListItem", "position": 2, "name": "Conditions", "item": `${BASE}/#conditions` },
    { "@type": "ListItem", "position": 3, "name": "Psoriatic Arthritis", "item": `${BASE}/conditions/psoriatic-arthritis` }
  ]
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is psoriatic arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Psoriatic arthritis (PsA) is a chronic inflammatory condition that affects both the joints and the skin. It occurs in up to 30% of people with psoriasis and causes joint pain, swelling, stiffness, and skin plaques." } },
    { "@type": "Question", "name": "Can you have psoriatic arthritis without psoriasis?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, though uncommon. About 15% of people develop joint symptoms before skin involvement. A family history of psoriasis is a strong indicator, and nail changes may be present before skin plaques appear." } },
    { "@type": "Question", "name": "What are the early signs of psoriatic arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Early signs include swollen, painful joints (especially fingers and toes), morning stiffness, nail pitting or separation, heel or sole pain (enthesitis), and 'sausage-like' swelling of entire fingers or toes (dactylitis)." } },
    { "@type": "Question", "name": "How is psoriatic arthritis treated?", "acceptedAnswer": { "@type": "Answer", "text": "Treatment involves NSAIDs for mild symptoms, DMARDs (methotrexate) for moderate disease, and biologic therapies (anti-TNF, IL-17, IL-23 inhibitors) for more severe cases. Physiotherapy, exercise, and weight management are also important." } },
    { "@type": "Question", "name": "Is psoriatic arthritis worse than rheumatoid arthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Neither is inherently 'worse' — both can range from mild to severe. PsA uniquely involves skin and nail changes, and has distinct patterns like dactylitis and enthesitis. Both require early treatment to prevent joint damage." } }
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

const PsoriaticArthritis = () => (
  <>
    <Helmet>
      <title>Psoriatic Arthritis – Symptoms, Causes & Treatment | Living With Arthritis</title>
      <meta name="description" content="UK guide to psoriatic arthritis: understanding the link between psoriasis and joint inflammation, recognising symptoms like dactylitis, treatment options and lifestyle management." />
      <meta name="keywords" content="psoriatic arthritis, psoriatic arthritis symptoms, psoriatic arthritis treatment, PsA, psoriasis arthritis, dactylitis, enthesitis, psoriatic arthritis UK, biologic therapy, psoriatic arthritis diet" />
      <meta property="og:title" content="Psoriatic Arthritis – Symptoms, Causes & Treatment" />
      <meta property="og:description" content="Complete UK guide to psoriatic arthritis: symptoms, modern treatments, exercises and self-management." />
      <meta property="og:url" content={`${BASE}/conditions/psoriatic-arthritis`} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:image" content={`${BASE}/images/og-psoriatic-arthritis.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Psoriatic Arthritis – Symptoms, Causes & Treatment guide" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Psoriatic Arthritis – Symptoms, Causes & Treatment" />
      <meta name="twitter:description" content="Complete UK guide to psoriatic arthritis: symptoms, modern treatments, exercises and self-management." />
      <meta name="twitter:image" content={`${BASE}/images/og-psoriatic-arthritis.jpg`} />
      <meta name="geo.region" content="GB" />
      <link rel="canonical" href={`${BASE}/conditions/psoriatic-arthritis`} />
      <link rel="alternate" hrefLang="en-GB" href={`${BASE}/conditions/psoriatic-arthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb segments={[{ label: "Conditions", href: "/#conditions" }, { label: "Psoriatic Arthritis" }]} />
      <PageHero
        badge={
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 text-xs font-bold tracking-wider uppercase border border-violet-500/20">
            <Fingerprint className="w-3.5 h-3.5" /> Joint & Skin Condition
          </span>
        }
        title={<>Psoriatic <span className="text-gradient">Arthritis</span></>}
        subtitle="Psoriatic arthritis (PsA) affects up to 30% of people with psoriasis in the UK — an estimated 150,000 people. It causes joint inflammation alongside skin symptoms and requires early treatment to prevent permanent joint damage."
        gradient="from-violet-500/8 via-background to-rose-500/5"
        pattern="diagonal"
      >
        <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
        </Link>
      </PageHero>
      {/* ─── PsA Key Stats ─── */}
      <section className="py-12 lg:py-16 bg-tint-violet">
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <p className="section-label text-violet-600 mb-6">Psoriatic Arthritis at a Glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCounter value="150K" label="People with PsA in the UK" icon={<Users className="w-6 h-6" />} color="violet" />
            <StatCounter value="30" suffix="%" label="Of psoriasis patients develop PsA" icon={<Percent className="w-6 h-6" />} color="amber" />
            <StatCounter value="5" label="Distinct PsA patterns" icon={<Fingerprint className="w-6 h-6" />} color="sky" />
            <StatCounter value="80" suffix="%" label="Develop skin symptoms first" icon={<Eye className="w-6 h-6" />} color="rose" />
          </div>
        </div>
      </section>
      <WaveDivider color="hsl(var(--background))" />

      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">
        <Section icon={Activity} title="What Is Psoriatic Arthritis?">
          <p>Psoriatic arthritis is a chronic inflammatory condition that combines the joint inflammation of arthritis with the skin disease psoriasis. The immune system attacks both the joints and skin, causing pain, swelling, stiffness, and characteristic scaly skin patches.</p>
          <p>PsA can affect any joint and varies considerably between individuals. It was once considered a mild form of arthritis, but we now know it can be <strong>progressive and destructive</strong> if left untreated.</p>
          <h3>Five Patterns of Psoriatic Arthritis</h3>
          <ul>
            <li><strong>Asymmetric oligoarthritis</strong> — fewer than 5 joints, different on each side (most common pattern)</li>
            <li><strong>Symmetric polyarthritis</strong> — resembles rheumatoid arthritis, affecting joints on both sides</li>
            <li><strong>Distal interphalangeal (DIP)</strong> — affects the small joints nearest the fingernails</li>
            <li><strong>Spondylitis</strong> — inflammation of the spine and sacroiliac joints</li>
            <li><strong>Arthritis mutilans</strong> — severe, destructive form (rare)</li>
          </ul>
        </Section>

        <Section icon={Fingerprint} title="Symptoms">
          <p>PsA symptoms can develop gradually or suddenly, and may alternate between flares and periods of remission:</p>
          <h3>Joint Symptoms</h3>
          <ul>
            <li><strong>Joint pain, swelling, and warmth</strong> — can affect any joint</li>
            <li><strong>Dactylitis ("sausage digits")</strong> — entire finger or toe swells, a hallmark of PsA</li>
            <li><strong>Enthesitis</strong> — pain where tendons and ligaments attach to bone (Achilles heel, elbow, sole of foot)</li>
            <li><strong>Morning stiffness</strong> — lasting over 30 minutes</li>
            <li><strong>Lower back pain</strong> — from spinal involvement (spondylitis)</li>
          </ul>
          <h3>Skin & Nail Symptoms</h3>
          <ul>
            <li><strong>Psoriasis plaques</strong> — red, scaly patches on elbows, knees, scalp, or other areas</li>
            <li><strong>Nail changes</strong> — pitting, ridging, crumbling, separation from the nail bed (onycholysis)</li>
            <li><strong>Scalp psoriasis</strong> — thick, crusted plaques</li>
          </ul>
          <h3>Other Symptoms</h3>
          <ul>
            <li><strong>Fatigue</strong> — significant and pervasive</li>
            <li><strong>Eye inflammation (uveitis)</strong> — red, painful eyes requiring urgent treatment</li>
          </ul>
        </Section>

        <Section icon={Heart} title="Causes & Risk Factors">
          <p>PsA is an autoimmune condition with both genetic and environmental triggers:</p>
          <ul>
            <li><strong>Psoriasis</strong> — the strongest risk factor; 70-80% develop skin symptoms before joint symptoms</li>
            <li><strong>Genetics</strong> — HLA-B27 gene (especially with spinal involvement); family history of psoriasis or PsA</li>
            <li><strong>Age</strong> — most commonly develops between ages 30 and 50</li>
            <li><strong>Obesity</strong> — increases risk and reduces treatment effectiveness</li>
            <li><strong>Nail psoriasis</strong> — nail involvement is a strong predictor of developing PsA</li>
            <li><strong>Infections or physical trauma</strong> — may trigger onset in genetically susceptible individuals</li>
            <li><strong>Smoking</strong> — increases risk, though less strongly than in RA</li>
          </ul>
        </Section>

        <Section icon={Pill} title="Treatment">
          <p>Treatment aims to control both joint inflammation and skin disease, prevent joint damage, and maintain quality of life:</p>
          <h3>Mild Disease</h3>
          <ul>
            <li><strong>NSAIDs</strong> — ibuprofen, naproxen for pain and inflammation</li>
            <li><strong>Topical treatments</strong> — for skin psoriasis (corticosteroid creams, vitamin D analogues)</li>
            <li><strong>Local steroid injections</strong> — for individual swollen joints</li>
          </ul>
          <h3>Moderate to Severe Disease</h3>
          <ul>
            <li><strong>Methotrexate</strong> — first-line DMARD, treats both joints and skin</li>
            <li><strong>Leflunomide</strong> — alternative DMARD</li>
            <li><strong>Apremilast</strong> — PDE4 inhibitor, oral option for joints and skin</li>
          </ul>
          <h3>Biologic Therapies</h3>
          <ul>
            <li><strong>Anti-TNF</strong> — adalimumab, etanercept, infliximab, certolizumab, golimumab</li>
            <li><strong>IL-17 inhibitors</strong> — secukinumab, ixekizumab (excellent for skin and joints)</li>
            <li><strong>IL-23 inhibitors</strong> — guselkumab, risankizumab</li>
            <li><strong>JAK inhibitors</strong> — tofacitinib, upadacitinib (oral alternatives to biologics)</li>
          </ul>
        </Section>

        <Section icon={Dumbbell} title="Exercise & Lifestyle">
          <p>Regular exercise is vital for managing PsA — it maintains joint function, supports weight management, improves mood, and may help reduce skin symptoms through stress reduction.</p>
          <ul>
            <li><strong>Swimming</strong> — excellent for joints; chlorinated water may irritate skin psoriasis (use emollients before and after)</li>
            <li><strong>Walking & cycling</strong> — low impact, effective for cardiovascular fitness</li>
            <li><strong>Pilates & yoga</strong> — improve flexibility, core strength, and stress management</li>
            <li><strong>Strength training</strong> — protects joints by strengthening surrounding muscles</li>
            <li><strong>Hand exercises</strong> — important if fingers are affected</li>
          </ul>
          <h3>Skin Care During Exercise</h3>
          <p>Wear moisture-wicking, loose-fitting clothes. Apply emollients before swimming. Shower promptly after exercise and moisturise to prevent skin flares.</p>
        </Section>

        <Section icon={Apple} title="Diet & Nutrition">
          <p>Diet plays a role in managing both the skin and joint components of PsA:</p>
          <ul>
            <li><strong>Mediterranean diet</strong> — anti-inflammatory pattern that benefits both joints and skin</li>
            <li><strong>Omega-3 fatty acids</strong> — from oily fish, may reduce joint and skin inflammation</li>
            <li><strong>Maintain healthy weight</strong> — obesity worsens PsA and reduces treatment effectiveness; weight loss improves outcomes</li>
            <li><strong>Limit alcohol</strong> — can trigger psoriasis flares and interact with medications</li>
            <li><strong>Vitamin D</strong> — many people with psoriasis are deficient; discuss supplementation with your GP</li>
            <li><strong>Turmeric</strong> — curcumin has anti-inflammatory properties that may benefit both skin and joints</li>
          </ul>
          <p>Some individuals report food triggers for skin flares (gluten, nightshades, dairy). Keeping a food diary may help identify personal triggers, though evidence for elimination diets is limited.</p>
        </Section>

        {/* Related Articles */}
        <section className="mt-16 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Related Articles</h2>
          </div>
          <div className="grid gap-3">
            {[
              { href: "/blog/best-diet-for-joint-pain-uk", title: "Best Diet for Joint Pain UK", desc: "Anti-inflammatory Mediterranean diet guidance" },
              { href: "/blog/arthritis-and-omega-3-fish-oil", title: "Omega-3 & Fish Oil for Arthritis", desc: "How omega-3s reduce joint and skin inflammation" },
              { href: "/blog/arthritis-fatigue-management", title: "Managing Arthritis Fatigue", desc: "Coping strategies for PsA exhaustion" },
              { href: "/blog/arthritis-pain-relief-natural", title: "Natural Pain Relief for Arthritis", desc: "Evidence-based home remedies that work" },
              { href: "/blog/swimming-for-arthritis-uk", title: "Swimming for Arthritis UK", desc: "Low-impact exercise ideal for PsA joints" },
              { href: "/blog/arthritis-diet-myths-debunked", title: "Arthritis Diet Myths Debunked", desc: "Separating fact from fiction about food and arthritis" },
            ].map((a) => (
              <Link key={a.href} to={a.href} className="group flex items-center justify-between gap-4 rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors">
                <div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{a.title}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{a.desc}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Other Conditions */}
        <section className="mb-12">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Explore Other Conditions</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link to="/conditions/osteoarthritis" className="group rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Osteoarthritis →</span>
              <span className="block text-xs text-muted-foreground mt-0.5">Degenerative joint disease: symptoms, exercises & diet</span>
            </Link>
            <Link to="/conditions/rheumatoid-arthritis" className="group rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Rheumatoid Arthritis →</span>
              <span className="block text-xs text-muted-foreground mt-0.5">Autoimmune joint inflammation: symptoms, DMARDs & biologics</span>
            </Link>
          </div>
        </section>

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Managing psoriatic arthritis</h2>
          <p className="text-muted-foreground mb-5">Modern treatments can control both skin and joint symptoms. Explore our resources or chat with our AI assistant for personalised guidance.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Chat with our AI assistant
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors">
              Read our articles
            </Link>
          </div>
        </div>
      </main>
      <InternalLinks />
      <Footer />
    </div>
  </>
);

export default PsoriaticArthritis;
