import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Activity, Heart, Apple, Dumbbell, Pill, ThermometerSun } from "lucide-react";
import { motion } from "framer-motion";

const BASE = "https://livingwitharthritis.org.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Osteoarthritis – Symptoms, Causes & Management | Living With Arthritis",
  "description": "Comprehensive guide to osteoarthritis (OA): symptoms, causes, risk factors, diagnosis, treatment options, exercises, diet and self-management tips for UK patients.",
  "url": `${BASE}/conditions/osteoarthritis`,
  "inLanguage": "en-GB",
  "datePublished": "2025-06-01",
  "dateModified": "2025-12-15",
  "author": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE },
  "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": BASE, "logo": { "@type": "ImageObject", "url": `${BASE}/favicon.ico` } },
  "about": {
    "@type": "MedicalCondition",
    "name": "Osteoarthritis",
    "alternateName": ["OA", "Degenerative Joint Disease", "Wear and Tear Arthritis"],
    "associatedAnatomy": { "@type": "AnatomicalStructure", "name": "Synovial joints (knees, hips, hands, spine)" },
    "riskFactor": ["Age over 50", "Obesity", "Previous joint injury", "Female sex", "Genetics"],
    "signOrSymptom": ["Joint pain", "Stiffness", "Swelling", "Reduced range of motion", "Crepitus"],
    "possibleTreatment": [
      { "@type": "MedicalTherapy", "name": "Physical therapy" },
      { "@type": "MedicalTherapy", "name": "Weight management" },
      { "@type": "MedicalTherapy", "name": "Low-impact exercise" },
      { "@type": "MedicalTherapy", "name": "Anti-inflammatory diet" }
    ]
  },
  "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
  "mainEntityOfPage": `${BASE}/conditions/osteoarthritis`
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/` },
    { "@type": "ListItem", "position": 2, "name": "Conditions", "item": `${BASE}/#conditions` },
    { "@type": "ListItem", "position": 3, "name": "Osteoarthritis", "item": `${BASE}/conditions/osteoarthritis` }
  ]
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Osteoarthritis is the most common form of arthritis, a degenerative joint disease where the protective cartilage cushioning the ends of bones gradually wears down, causing pain, stiffness, and reduced mobility." } },
    { "@type": "Question", "name": "What causes osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "OA is caused by gradual cartilage breakdown. Risk factors include age over 50, obesity, previous joint injuries, genetics, repetitive joint stress, and female sex." } },
    { "@type": "Question", "name": "Can osteoarthritis be cured?", "acceptedAnswer": { "@type": "Answer", "text": "There is no cure for osteoarthritis, but symptoms can be effectively managed through exercise, weight management, physical therapy, anti-inflammatory diet, and medication." } },
    { "@type": "Question", "name": "What is the best exercise for osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "Low-impact exercises like walking, swimming, cycling, and tai chi are recommended. Strength training and flexibility exercises also help support joints and reduce stiffness." } },
    { "@type": "Question", "name": "What foods help osteoarthritis?", "acceptedAnswer": { "@type": "Answer", "text": "An anti-inflammatory Mediterranean diet rich in oily fish, vegetables, olive oil, nuts, berries, and whole grains can help reduce inflammation and manage symptoms." } }
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

const Osteoarthritis = () => (
  <>
    <Helmet>
      <title>Osteoarthritis – Symptoms, Causes & Management | Living With Arthritis</title>
      <meta name="description" content="Everything you need to know about osteoarthritis: symptoms like joint pain and stiffness, causes, risk factors, best exercises, diet tips, and treatment options for UK patients." />
      <meta name="keywords" content="osteoarthritis, osteoarthritis symptoms, osteoarthritis treatment, osteoarthritis exercises, osteoarthritis diet, OA, degenerative joint disease, arthritis UK, knee arthritis, hip arthritis" />
      <meta property="og:title" content="Osteoarthritis – Symptoms, Causes & Management" />
      <meta property="og:description" content="Comprehensive guide to osteoarthritis including symptoms, causes, exercises, diet and self-management for UK patients." />
      <meta property="og:locale" content="en_GB" />
      <meta name="geo.region" content="GB" />
      <link rel="canonical" href={`${BASE}/conditions/osteoarthritis`} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">
        <Link to="/#conditions" className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-8 hover:gap-2.5 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70 mb-3 block">Condition Guide</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Osteoarthritis
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Osteoarthritis (OA) is the most common form of arthritis in the UK, affecting over 8.75 million people. This comprehensive guide covers everything you need to know about living with and managing osteoarthritis.
          </p>
        </motion.div>

        <Section icon={Activity} title="What Is Osteoarthritis?">
          <p>Osteoarthritis is a degenerative joint disease where the protective cartilage that cushions the ends of your bones gradually wears down over time. As cartilage deteriorates, bones begin to rub against each other, causing pain, swelling, stiffness, and reduced mobility.</p>
          <p>Unlike inflammatory types of arthritis, OA is primarily a mechanical condition — though inflammation does play a role, particularly during flare-ups. It most commonly affects the <strong>knees, hips, hands, and spine</strong>, but can occur in any joint.</p>
          <h3>How Common Is Osteoarthritis in the UK?</h3>
          <p>According to Versus Arthritis, approximately <strong>8.75 million people</strong> in the UK have sought treatment for osteoarthritis. It is the single most common cause of disability among older adults in England and Wales, and its prevalence is rising due to an ageing population and increasing obesity rates.</p>
        </Section>

        <Section icon={ThermometerSun} title="Symptoms of Osteoarthritis">
          <p>Symptoms typically develop slowly and worsen over time. They may include:</p>
          <ul>
            <li><strong>Joint pain</strong> — especially during or after activity, often described as a deep ache</li>
            <li><strong>Stiffness</strong> — particularly after rest or first thing in the morning (usually lasting less than 30 minutes)</li>
            <li><strong>Swelling</strong> — caused by inflammation of soft tissues around the joint</li>
            <li><strong>Tenderness</strong> — the joint may feel tender when light pressure is applied</li>
            <li><strong>Loss of flexibility</strong> — difficulty moving the joint through its full range</li>
            <li><strong>Grating sensation (crepitus)</strong> — a feeling or sound of bone rubbing on bone</li>
            <li><strong>Bone spurs</strong> — extra lumps of bone that form around the affected joint</li>
          </ul>
          <h3>When to See a GP</h3>
          <p>If you experience persistent joint pain or stiffness that doesn't improve, book an appointment with your GP. Early diagnosis can help you access the right support and slow progression.</p>
        </Section>

        <Section icon={Heart} title="Causes & Risk Factors">
          <p>Osteoarthritis develops when the cartilage protecting bone surfaces breaks down faster than it can repair itself. Several factors increase your risk:</p>
          <ul>
            <li><strong>Age</strong> — most common after age 50, though younger people can develop it after injury</li>
            <li><strong>Sex</strong> — women are more commonly affected, particularly after menopause</li>
            <li><strong>Obesity</strong> — excess weight places additional stress on weight-bearing joints; losing even 5% of body weight can significantly reduce knee pain</li>
            <li><strong>Previous joint injury</strong> — trauma from sports, accidents, or occupational overuse</li>
            <li><strong>Genetics</strong> — a family history increases risk</li>
            <li><strong>Repetitive stress</strong> — occupations involving repeated movements (kneeling, heavy lifting)</li>
            <li><strong>Other conditions</strong> — diabetes, metabolic disorders, and congenital joint issues</li>
          </ul>
        </Section>

        <Section icon={Dumbbell} title="Best Exercises for Osteoarthritis">
          <p>Regular exercise is one of the most effective treatments for OA. It strengthens muscles around joints, improves flexibility, reduces pain, and helps manage weight. Always start gradually and consult a physiotherapist if unsure.</p>
          <h3>Aerobic / Low-Impact</h3>
          <ul>
            <li><strong>Walking</strong> — aim for 30 minutes most days; use supportive footwear</li>
            <li><strong>Swimming & water aerobics</strong> — buoyancy reduces joint stress while providing excellent exercise</li>
            <li><strong>Cycling</strong> — stationary or outdoor; gentle on knees and hips</li>
          </ul>
          <h3>Strengthening</h3>
          <ul>
            <li><strong>Straight-leg raises</strong> — strengthen quadriceps without stressing the knee</li>
            <li><strong>Wall sits</strong> — build leg strength gradually</li>
            <li><strong>Bridges</strong> — target glutes and core stability</li>
            <li><strong>Resistance bands</strong> — gentle, progressive strengthening</li>
          </ul>
          <h3>Flexibility & Balance</h3>
          <ul>
            <li><strong>Yoga</strong> — improves range of motion and mental well-being</li>
            <li><strong>Tai chi</strong> — evidence-based benefits for balance and pain reduction</li>
            <li><strong>Daily stretching</strong> — 5-10 minutes morning and evening</li>
          </ul>
        </Section>

        <Section icon={Apple} title="Best Diet for Osteoarthritis">
          <p>An <strong>anti-inflammatory diet</strong>, particularly the Mediterranean diet, is the most evidence-supported dietary approach for OA management. It can help reduce inflammation, manage weight, and improve overall joint health.</p>
          <h3>Foods to Eat</h3>
          <ul>
            <li><strong>Oily fish</strong> — salmon, mackerel, sardines (omega-3 fatty acids, at least twice weekly)</li>
            <li><strong>Colourful vegetables</strong> — broccoli, spinach, kale, peppers (antioxidants)</li>
            <li><strong>Berries</strong> — blueberries, strawberries, cherries (anthocyanins)</li>
            <li><strong>Olive oil</strong> — extra virgin (oleocanthal has anti-inflammatory properties)</li>
            <li><strong>Nuts & seeds</strong> — walnuts, almonds, flaxseeds</li>
            <li><strong>Whole grains</strong> — oats, brown rice, quinoa</li>
            <li><strong>Turmeric & ginger</strong> — natural anti-inflammatory compounds</li>
          </ul>
          <h3>Foods to Limit</h3>
          <ul>
            <li>Processed and ultra-processed foods</li>
            <li>Added sugars and sugary drinks</li>
            <li>Red and processed meats</li>
            <li>Refined carbohydrates</li>
            <li>Excessive alcohol</li>
          </ul>
        </Section>

        <Section icon={Pill} title="Treatment & Management">
          <p>While there is no cure for osteoarthritis, a combination of approaches can significantly improve quality of life:</p>
          <h3>Self-Management</h3>
          <ul>
            <li>Stay active with regular low-impact exercise</li>
            <li>Maintain a healthy weight</li>
            <li>Pace activities to avoid overloading joints</li>
            <li>Use heat or cold packs for symptom relief</li>
            <li>Try supportive aids (walking sticks, splints, shoe insoles)</li>
          </ul>
          <h3>Medical Treatments</h3>
          <ul>
            <li><strong>Paracetamol & NSAIDs</strong> — for pain and inflammation (topical NSAIDs preferred for knees/hands)</li>
            <li><strong>Physiotherapy</strong> — tailored exercise programmes and manual therapy</li>
            <li><strong>Steroid injections</strong> — for short-term relief during severe flare-ups</li>
            <li><strong>Joint replacement surgery</strong> — for severe cases when other treatments have not worked</li>
          </ul>
          <h3>Supplements</h3>
          <p>Glucosamine, chondroitin, and collagen supplements have some evidence for modest symptom relief, though results are mixed. Turmeric/curcumin (500-1000 mg/day) shows more consistent anti-inflammatory benefits. Always consult your GP before starting supplements.</p>
        </Section>

        <div className="mt-16 p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Need more support?</h2>
          <p className="text-muted-foreground mb-5">Explore our resources, chat with our AI assistant, or book a virtual physiotherapy consultation.</p>
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
      <Footer />
    </div>
  </>
);

export default Osteoarthritis;
