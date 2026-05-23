import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, ArrowRight, Shield, FlaskConical, Utensils, Activity, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const experts = [
  { name: "Dr Sarah Patel", role: "HCPC Registered Physiotherapist", credentials: "MSc Physiotherapy, BSc Sport Science", specialty: "Musculoskeletal Rehabilitation" },
  { name: "Dr Michael Chen", role: "Consultant Rheumatologist", credentials: "MBBS, MRCP, PhD Rheumatology", specialty: "Inflammatory Arthritis" },
  { name: "Emma Watson BSc RD", role: "Registered Dietitian", credentials: "BSc Nutrition & Dietetics, HCPC", specialty: "Anti-Inflammatory Nutrition" },
  { name: "Dr Aisha Khan", role: "Clinical Psychologist", credentials: "DClinPsy, BPS Chartered", specialty: "Chronic Pain Psychology" },
];

const articles = [
  {
    title: "Understanding Biologics: A Patient's Guide to Modern RA Treatment",
    author: "Dr Michael Chen",
    authorRole: "Consultant Rheumatologist",
    date: "March 2026",
    readTime: "12 min read",
    category: "Treatment",
    icon: FlaskConical,
    summary: "Biologics have transformed rheumatoid arthritis treatment. This evidence-based guide explains how they work, who they're suitable for, and what to expect from treatment in the UK the health service system.",
    keyPoints: [
      "Biologics target specific parts of the immune system, unlike traditional DMARDs which suppress broadly",
      "In the UK, biologics are typically prescribed when two conventional DMARDs have failed — following NICE guidelines (TA375)",
      "TNF inhibitors (adalimumab, etanercept) remain the most commonly prescribed first-line biologics",
      "Response rates: approximately 60-70% of patients achieve significant improvement within 3-6 months",
      "Biosimilars have made biologics more cost-effective for the health service, with no clinically meaningful differences from originator drugs",
    ],
    content: `Biologic therapies represent one of the most significant advances in rheumatology in the past two decades. For patients with moderate-to-severe rheumatoid arthritis who haven't responded adequately to conventional disease-modifying anti-rheumatic drugs (DMARDs) like methotrexate, biologics offer a targeted approach to controlling inflammation.

**How Biologics Work**

Unlike conventional DMARDs, which broadly suppress the immune system, biologics are engineered proteins that target specific molecules involved in the inflammatory cascade. The most common targets include:

- **TNF-alpha** (targeted by adalimumab, etanercept, infliximab, certolizumab, golimumab)
- **IL-6** (targeted by tocilizumab, sarilumab)
- **B-cells** (targeted by rituximab)
- **T-cell co-stimulation** (targeted by abatacept)

**Accessing Biologics through the public health service**

Under current NICE guidelines, biologics are available through the public health service for RA patients who have an inadequate response to at least two conventional DMARDs (including methotrexate unless contraindicated), and have a Disease Activity Score (DAS28) of 5.1 or above on two occasions, one month apart.

**What Patients Should Know**

Starting a biologic requires screening for tuberculosis and hepatitis B/C. Most biologics are self-injected at home (typically fortnightly or monthly), though some (infliximab, rituximab) are given as intravenous infusions in hospital. Side effects are generally manageable — injection site reactions, increased infection risk, and fatigue are most common.

Regular monitoring with blood tests every 3-6 months is essential. If a biologic isn't working after 6 months, switching to a different mechanism of action is standard practice.`
  },
  {
    title: "The Science Behind Exercise and Joint Cartilage Health",
    author: "Dr Sarah Patel",
    authorRole: "HCPC Registered Physiotherapist",
    date: "February 2026",
    readTime: "10 min read",
    category: "Exercise",
    icon: Activity,
    summary: "Contrary to outdated beliefs, exercise doesn't 'wear out' joints. This article reviews the latest research on how movement actually nourishes cartilage and slows osteoarthritis progression.",
    keyPoints: [
      "Articular cartilage has no blood supply — it relies on compression and release during movement to receive nutrients from synovial fluid",
      "A 2022 Cochrane review confirmed that exercise therapy reduces OA knee pain by 25-40% compared to no exercise",
      "The 'sweet spot' for joint health is moderate-intensity exercise: enough to stimulate cartilage, not so much as to cause acute injury",
      "Quadriceps strengthening reduces the risk of OA progression in the knee by up to 60%",
      "Aquatic exercise is particularly effective for those with severe OA, reducing pain while allowing greater range of motion",
    ],
    content: `One of the most persistent myths in arthritis care is that exercise damages joints. Many patients tell me they've been avoiding movement to 'protect' their joints. In reality, the opposite is true — controlled, appropriate exercise is one of the most effective treatments we have for osteoarthritis.

**Why Movement Matters for Cartilage**

Joint cartilage is unique among body tissues. It has no blood supply — instead, it receives nutrients through a process called 'imbibition,' where compression during movement pushes waste products out and draws fresh synovial fluid (and its nutrients) in. Think of it like a sponge: you need to squeeze and release it to keep it healthy.

Studies using MRI imaging have shown that regular exercisers maintain thicker, healthier cartilage than sedentary individuals of the same age. A landmark study published in Osteoarthritis and Cartilage (2019) demonstrated that moderate physical activity was associated with better cartilage quality over a 4-year period.

**The Evidence for Exercise Therapy**

The evidence base for exercise in OA management is now substantial:

- The 2022 Cochrane review of 54 RCTs found high-quality evidence that exercise reduces pain and improves function in knee OA
- The ESCAPE-knee pain trial showed that exercise combined with self-management was more effective than usual GP care
- NICE guideline NG226 now recommends exercise as a core treatment for ALL patients with OA, regardless of severity

**Practical Recommendations**

For patients with knee or hip OA, I recommend:
1. **Strengthening exercises** 2-3 times per week (focus on quadriceps, gluteals, hamstrings)
2. **Low-impact aerobic activity** for 150 minutes per week (walking, cycling, swimming)
3. **Flexibility work** daily (gentle stretches, yoga adapted for arthritis)
4. **Balance training** especially for over-65s (reduces fall risk by 23%)

Start slowly and progress gradually. Some discomfort during exercise is normal, but sharp pain or increased swelling for more than 24 hours means you've done too much.`
  },
  {
    title: "Anti-Inflammatory Nutrition: What the Evidence Actually Shows",
    author: "Emma Watson BSc RD",
    authorRole: "Registered Dietitian",
    date: "January 2026",
    readTime: "14 min read",
    category: "Nutrition",
    icon: Utensils,
    summary: "Separating fact from marketing hype — a registered dietitian reviews the evidence for dietary approaches to arthritis management, including the Mediterranean diet, omega-3s, and popular supplements.",
    keyPoints: [
      "The Mediterranean diet has the strongest evidence base for reducing inflammatory markers (CRP, IL-6) in arthritis patients",
      "Omega-3 fatty acids (EPA/DHA) at doses of 2-3g/day can reduce RA morning stiffness and tender joint count",
      "Curcumin (turmeric extract) at 1000mg/day shows moderate evidence for OA pain relief — comparable to ibuprofen in some trials",
      "No supplement has been proven to slow structural joint damage or reverse arthritis",
      "Weight management is the single most impactful dietary intervention for knee and hip OA",
    ],
    content: `The relationship between diet and arthritis is an area where patient interest far exceeds the current evidence base. Social media is full of claims about 'miracle foods' and 'anti-inflammatory superfoods,' but the reality is more nuanced — and, in some ways, more encouraging.

**The Mediterranean Diet: Our Best Evidence**

If there's one dietary pattern that consistently shows benefits for arthritis, it's the Mediterranean diet. Multiple systematic reviews and meta-analyses have demonstrated associations with:

- Lower C-reactive protein (CRP) levels
- Reduced interleukin-6 (IL-6)
- Improved patient-reported pain and function scores
- Better cardiovascular health (important as RA increases cardiovascular risk)

A 2021 study in Rheumatology journal found that RA patients following a Mediterranean diet for 12 weeks showed significant improvements in DAS28 scores compared to controls.

**Omega-3 Fatty Acids**

The evidence for omega-3 supplementation (fish oil) in RA is reasonably good. A Cochrane review found that omega-3s at doses of 2-3g EPA+DHA daily can reduce:
- Morning stiffness duration
- Number of tender joints
- NSAID requirement

For OA, the evidence is weaker but still suggests a modest anti-inflammatory effect.

**The Supplement Question**

Patients frequently ask about glucosamine, chondroitin, collagen, and turmeric. Here's what the evidence shows:

- **Glucosamine sulphate** (1500mg/day): Mixed results; some trials show modest pain reduction in knee OA, others show no benefit beyond placebo. NICE does not recommend it.
- **Turmeric/Curcumin** (1000mg/day standardised extract): Moderate evidence for OA pain relief. Bioavailability is a key issue — look for formulations with piperine or phospholipid complexes.
- **Collagen** (hydrolysed, 10g/day): Emerging evidence, but limited high-quality trials. May have modest benefit for OA symptoms.
- **Vitamin D**: Deficiency is common in arthritis patients and associated with worse outcomes. Supplementation (800-1000 IU/day) is recommended if deficient.

**Weight Management: The Biggest Impact**

For knee and hip OA, weight management is arguably the most powerful dietary intervention. Every 1kg of weight lost reduces the load on the knee by approximately 4kg during walking. The ADAPT trial showed that combined diet and exercise in overweight OA patients produced clinically meaningful reductions in pain and disability.`
  },
  {
    title: "Managing the Mental Health Impact of Chronic Joint Pain",
    author: "Dr Aisha Khan",
    authorRole: "Clinical Psychologist",
    date: "December 2025",
    readTime: "11 min read",
    category: "Mental Health",
    icon: Brain,
    summary: "Arthritis affects far more than joints. This clinical psychologist explores the psychological impact of chronic pain, practical coping strategies, and when to seek professional support.",
    keyPoints: [
      "Depression affects up to 40% of people with inflammatory arthritis — double the rate in the general population",
      "Pain catastrophising (amplifying threat, rumination, helplessness) is a stronger predictor of disability than X-ray severity",
      "Cognitive Behavioural Therapy (CBT) for chronic pain has a strong evidence base, with NICE recommending it alongside medical treatment",
      "Acceptance and Commitment Therapy (ACT) helps patients engage in valued activities despite pain",
      "Social isolation is a significant risk factor — peer support reduces depression scores by an average of 30%",
    ],
    content: `When we talk about arthritis, we usually talk about joints, inflammation, and physical function. But the psychological impact of living with chronic pain is profound, and frequently underestimated — both by healthcare professionals and by patients themselves.

**The Mind-Body Connection in Arthritis**

Pain is not simply a signal from damaged joints to the brain. It's a complex experience influenced by thoughts, emotions, beliefs, past experiences, and social context. This isn't to say pain is 'in your head' — it's very real — but understanding the psychological dimension opens up additional avenues for management.

Research consistently shows that psychological factors like depression, anxiety, and pain catastrophising are stronger predictors of disability and quality of life than objective measures of joint damage. Two patients with identical X-rays can have vastly different experiences of their arthritis, depending on their psychological coping resources.

**Common Psychological Challenges**

In my clinical practice with arthritis patients, I frequently encounter:

1. **Grief and loss** — mourning the life and abilities you had before diagnosis
2. **Uncertainty anxiety** — fear about disease progression and future disability
3. **Identity disruption** — 'I'm not the person I used to be'
4. **Social withdrawal** — avoiding activities and relationships due to pain or fatigue
5. **Frustration and anger** — 'Why me?' and frustration with limitations
6. **Guilt** — feeling like a burden to family and friends

**Evidence-Based Psychological Approaches**

Cognitive Behavioural Therapy (CBT) adapted for chronic pain has a robust evidence base. Key components include:

- Identifying and challenging unhelpful pain-related thoughts
- Activity pacing — learning to balance activity and rest
- Relaxation techniques — diaphragmatic breathing, progressive muscle relaxation
- Sleep hygiene — insomnia is common in arthritis and worsens pain perception
- Graded exposure to feared activities

Acceptance and Commitment Therapy (ACT) takes a different approach, focusing not on changing thoughts but on changing your relationship to them. ACT has shown promising results for chronic pain, helping patients engage in meaningful activities even when pain is present.

**Practical Self-Help Strategies**

- **Mindfulness meditation** — even 10 minutes daily can reduce pain perception and stress hormones
- **Gratitude journaling** — shifting attention from losses to retained abilities
- **Social connection** — peer support groups, whether in-person or online, consistently reduce isolation and improve mood
- **Values-based goal setting** — focusing on what matters most to you, not just pain reduction

**When to Seek Professional Help**

Consider speaking to your GP about psychological support if you experience persistent low mood for more than two weeks, loss of interest in activities, significant sleep disturbance, feelings of hopelessness, or thoughts of self-harm. Talking therapy is available through the health service IAPT services (self-referral) and many rheumatology departments now have integrated psychological support.`
  },
];

export default function ExpertArticles() {
  return (
    <>
      <Helmet>
        <title>Expert Arthritis Articles by UK Clinicians</title>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Expert Arthritis Articles",
          "url": "https://livingwitharthritis.org.uk/expert-articles",
          "inLanguage": "en-GB",
          "description": "Clinician-written, evidence-based arthritis articles by HCPC physiotherapists, consultant rheumatologists, registered dietitians and clinical psychologists.",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "hasPart": articles ? undefined : undefined
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": articles.map((a, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Article",
              "headline": a.title,
              "author": { "@type": "Person", "name": a.author },
              "datePublished": a.date,
              "description": a.summary,
              "publisher": { "@type": "Organization", "name": "Living With Arthritis UK" }
            }
          }))
        })}</script>
        <meta name="description" content="Evidence-based arthritis articles by HCPC physiotherapists, consultant rheumatologists, registered dietitians and clinical psychologists." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/expert-articles" />
      <meta property="og:title" content="Expert Articles – Clinician-Written Arthritis Guides | Living With Arthritis UK" />
      <meta property="og:description" content="Evidence-based arthritis articles written by HCPC physiotherapists, consultant rheumatologists, registered dietitians, and clinical psychologists. Expert UK health content." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/expert-articles" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Expert Articles – Clinician-Written Arthritis Guides | Living With Arthritis UK" />
      <meta name="twitter:description" content="Evidence-based arthritis articles written by HCPC physiotherapists, consultant rheumatologists, registered dietitians, and clinical psychologists. Expert UK health content." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <PageHero
            title="Expert-Contributed Articles"
            subtitle="Evidence-based content written by HCPC registered physiotherapists, consultant rheumatologists, registered dietitians, and clinical psychologists."
          />

          {/* Expert panel */}
          <section className="bg-muted/30 py-10 border-y border-border/50">
            <div className="container mx-auto px-4">
              <h2 className="text-lg font-semibold text-center mb-6 text-foreground">Our Clinical Contributors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {experts.map(e => (
                  <Card key={e.name} className="text-center border-primary/10">
                    <CardContent className="p-4 space-y-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-semibold text-sm text-foreground">{e.name}</p>
                      <p className="text-xs text-primary">{e.role}</p>
                      <p className="text-xs text-muted-foreground">{e.credentials}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Articles */}
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl space-y-12">
              {articles.map((article, i) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="gap-1">
                          <article.icon className="w-3 h-3" />{article.category}
                        </Badge>
                        <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />{article.readTime}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">{article.date}</span>
                      </div>
                      <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{article.author} — <span className="text-primary">{article.authorRole}</span></span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-foreground/80 leading-relaxed">{article.summary}</p>

                      <div className="bg-primary/5 rounded-xl p-4">
                        <h3 className="font-semibold text-sm text-foreground mb-2">Key Takeaways</h3>
                        <ul className="space-y-2">
                          {article.keyPoints.map((point, j) => (
                            <li key={j} className="flex gap-2 text-sm text-foreground/80">
                              <span className="text-primary font-bold mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        {article.content.split("\n\n").map((para, j) => {
                          if (para.startsWith("**") && para.endsWith("**")) {
                            return <h3 key={j} className="text-base font-semibold text-foreground mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
                          }
                          if (para.startsWith("- ")) {
                            return (
                              <ul key={j} className="space-y-1 ml-4">
                                {para.split("\n").map((line, k) => (
                                  <li key={k} className="text-sm text-foreground/80">{line.replace(/^- /, "")}</li>
                                ))}
                              </ul>
                            );
                          }
                          return <p key={j} className="text-foreground/80 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary/5 py-12">
            <div className="container mx-auto px-4 text-center max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Want More Expert Content?</h2>
              <p className="text-muted-foreground">Our clinical team publishes new evidence-based articles every week on the blog.</p>
              <Button asChild><Link to="/blog">Browse All Articles <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
