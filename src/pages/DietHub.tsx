import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InternalLinks from "@/components/InternalLinks";
import ContextualLinks from "@/components/ContextualLinks";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

import ClinicalReviewBadge from "@/components/ai/ClinicalReviewBadge";
import {
  Utensils, Apple, Fish, Leaf, ArrowRight, CheckCircle,
  XCircle, Star, ChevronRight, Sparkles, Shield, Heart,
  AlertTriangle, TrendingDown, Droplets, Flame,
  MessageCircle, Download
} from "lucide-react";
import {
  StatCounter,
  ProgressRing,
  HorizontalBar,
  WaveDivider,
  EmojiCard,
  ComparisonCard,
  DonutChart,
} from "@/components/graphics/InfographicElements";

const dietSections = [
  {
    id: "anti-inflammatory",
    title: "Anti-Inflammatory Diet",
    subtitle: "Reduce Joint Inflammation Naturally",
    description: "Whole foods rich in omega-3s, antioxidants and fibre that lower inflammatory markers like CRP and IL-6.",
    icon: Leaf,
    color: "from-primary/15 to-primary/10",
    iconColor: "text-primary bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
    href: "/blog/best-diet-for-joint-pain-uk",
    goodFoods: [
      "Oily fish (salmon, mackerel, sardines) – omega-3s",
      "Berries (blueberries, strawberries) – antioxidants",
      "Leafy greens (spinach, kale) – vitamins C, K",
      "Turmeric & ginger – curcumin and gingerols",
      "Extra virgin olive oil – oleocanthal",
      "Nuts & seeds (walnuts, flaxseeds) – healthy fats",
    ],
  },
  {
    id: "foods-to-avoid",
    title: "Foods to Avoid",
    subtitle: "What May Worsen Arthritis Symptoms",
    description: "Pro-inflammatory foods that can trigger joint pain. Reducing these complements an anti-inflammatory diet.",
    icon: AlertTriangle,
    color: "from-rose-500/15 to-red-500/10",
    iconColor: "text-rose-600 bg-rose-500/10",
    borderColor: "border-rose-500/20 hover:border-rose-500/40",
    href: "/blog/best-diet-for-joint-pain-uk",
    badFoods: [
      "Processed meats (bacon, sausages) – saturated fats",
      "Refined sugar and sugary drinks – spike inflammation",
      "White bread and processed carbs – raise blood sugar",
      "Fried foods and trans fats – promote oxidative stress",
      "Excessive alcohol – increases uric acid (gout risk)",
      "Ultra-processed snacks and fast food",
    ],
  },
  {
    id: "mediterranean",
    title: "Mediterranean Diet",
    subtitle: "The Gold Standard for Arthritis",
    description: "The most studied eating pattern for arthritis — strong evidence for reduced pain, stiffness and inflammation.",
    icon: Fish,
    color: "from-primary/15 to-primary/10",
    iconColor: "text-primary bg-primary/10",
    borderColor: "border-primary/20 hover:border-primary/40",
    href: "/diet/mediterranean-diet-for-arthritis",
    mealPlan: [
      { meal: "Breakfast", example: "Greek yoghurt with berries, walnuts and honey" },
      { meal: "Lunch", example: "Grilled mackerel salad with olive oil and wholegrain bread" },
      { meal: "Dinner", example: "Baked salmon with roasted vegetables and quinoa" },
      { meal: "Snacks", example: "Mixed nuts, hummus with carrots, fresh fruit" },
    ],
  },
];

const relatedTopics = [
  { title: "Turmeric for Arthritis", icon: Sparkles, href: "/blog/turmeric-for-arthritis-uk", desc: "Evidence, dosage and best supplements" },
  { title: "Omega-3 & Fish Oil", icon: Fish, href: "/blog/arthritis-and-omega-3-fish-oil", desc: "Benefits, dosage and UK food sources" },
  { title: "Supplements Guide", icon: Heart, href: "/blog/arthritis-supplements-uk", desc: "Glucosamine, collagen and more" },
  { title: "Meal Planning", icon: Utensils, href: "/blog/meal-planning-arthritis-uk", desc: "Weekly meal plans for joint health" },
];

const DietHub = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Best Diet for Arthritis Pain UK – Complete Nutrition Guide",
    description: "Evidence-based arthritis diet guide covering anti-inflammatory foods, the Mediterranean diet and foods to avoid for joint pain relief.",
    url: "https://livingwitharthritis.org.uk/diet",
    mainEntity: { "@type": "MedicalCondition", name: "Arthritis" },
    about: { "@type": "Diet", dietFeatures: "Anti-inflammatory, Mediterranean, omega-3 rich" },
  };

  return (
    <>
      <Helmet>
        <title>Best Arthritis Diet UK | Anti-Inflammatory Foods</title>
        <meta name="description" content="Free anti-inflammatory diet plans and Mediterranean recipes for arthritis. Evidence-based meal plans and nutrition tips to ease joint pain." />
        <meta name="keywords" content="arthritis diet, anti-inflammatory diet, Mediterranean diet arthritis, foods for joint pain, omega 3 arthritis, turmeric arthritis, natural remedies for arthritis, arthritis meal plan, foods to avoid arthritis, how to reduce joint inflammation, joint swelling causes, arthritis nutrition, anti-inflammatory foods, gout diet, rheumatoid arthritis diet, osteoarthritis diet" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/diet" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/diet" />
        <meta property="og:title" content="Best Diet for Arthritis Pain UK – Complete Guide" />
        <meta property="og:description" content="Anti-inflammatory diet, Mediterranean eating, foods to avoid and meal plans for arthritis." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/diet" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/nutrition-berries.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/nutrition-berries.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Diet for Arthritis Pain UK – Complete Guide" />
        <meta name="twitter:description" content="Evidence-based arthritis diet guide: anti-inflammatory foods, Mediterranean diet and meal plans for joint pain relief." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Diet", "item": "https://livingwitharthritis.org.uk/diet" }
          ]
        })}</script>
      </Helmet>

      <Header />
      <PageBreadcrumb segments={[{ label: "Diet Hub" }]} />

      <PageHero
        badge={<Badge variant="outline" className="bg-primary/5 text-primary border-primary/20"><Utensils className="w-3.5 h-3.5 mr-1.5" /> Diet Hub</Badge>}
        title={<>Diet for <span className="text-primary">Arthritis</span> Pain UK</>}
        subtitle="Anti-inflammatory foods, Mediterranean eating and practical meal plans for joint pain relief."
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <Button asChild size="lg" className="min-h-[48px] text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/chat"><MessageCircle className="w-4 h-4 mr-2" /> Get Diet Advice from AI</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[48px] text-base">
            <Link to="/community"><Download className="w-4 h-4 mr-2" /> Free Meal Plan PDF</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Evidence-Based</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> UK Nutrition Guidance</span>
          <span className="flex items-center gap-1.5"><Apple className="w-4 h-4 text-primary" /> Practical Meal Plans</span>
        </div>
      </PageHero>

      <main id="main-content">
        {/* ─── Nutrition Stats Banner ─── */}
        <section className="py-12 lg:py-16 bg-tint-green">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl mb-6 flex flex-wrap items-center justify-center gap-2">
            <ClinicalReviewBadge />
          </div>
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <p className="section-label text-primary mb-6">Why Diet Matters</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCounter value="50" suffix="%" label="Inflammation reduction with Mediterranean diet" icon={<TrendingDown className="w-6 h-6" />} color="emerald" />
              <StatCounter value="5" suffix="%" label="Weight loss target for symptom relief" icon={<Flame className="w-6 h-6" />} color="amber" />
              <StatCounter value="2" suffix="×" label="Fish servings per week recommended" icon={<Fish className="w-6 h-6" />} color="sky" />
              <StatCounter value="1000" suffix="mg" label="Daily curcumin for best results" icon={<Droplets className="w-6 h-6" />} color="violet" />
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* ─── Food Comparison ─── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">What to Eat vs What to Avoid</h2>
            <p className="text-sm text-muted-foreground mb-6">A quick reference guide for arthritis-friendly eating.</p>
            <ComparisonCard
              leftTitle="Eat More"
              rightTitle="Eat Less"
              rows={[
                { label: "Fats", left: "Olive oil, omega-3 fish, nuts", right: "Trans fats, fried food, margarine" },
                { label: "Protein", left: "Salmon, lentils, beans, eggs", right: "Processed meats, bacon, sausages" },
                { label: "Carbs", left: "Whole grains, quinoa, oats", right: "White bread, pastries, sugary cereal" },
                { label: "Drinks", left: "Green tea, water, berry smoothies", right: "Sugary drinks, excess alcohol" },
                { label: "Spices", left: "Turmeric, ginger, garlic", right: "Excess salt, MSG" },
              ]}
            />
          </div>
        </section>

        {/* Quick jump */}
        <section className="py-8 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <p className="text-sm font-medium text-muted-foreground mb-3">Jump to:</p>
            <div className="flex flex-wrap gap-2">
              {dietSections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-full bg-background border border-border/60 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                  <s.icon className="w-3.5 h-3.5" /> {s.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Diet section: Anti-Inflammatory */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl space-y-16">
            {dietSections.slice(0, 1).map((sec, i) => (
              <motion.div
                key={sec.id}
                id={sec.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`border ${sec.borderColor} bg-gradient-to-br ${sec.color} overflow-hidden`}>
                  <CardContent className="p-5 sm:p-7 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${sec.iconColor} flex items-center justify-center shrink-0`}>
                        <sec.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{sec.title}</h2>
                        <p className="text-sm text-muted-foreground font-medium">{sec.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{sec.description}</p>

                    {"goodFoods" in sec && sec.goodFoods && (
                      <div className="grid sm:grid-cols-2 gap-3 mb-5">
                        {sec.goodFoods.map((food, j) => (
                          <div key={j} className="flex items-start gap-2.5 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground">{food}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-border/30">
                      <Button asChild className="min-h-[44px] font-semibold">
                        <Link to={sec.href}>Read full guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ Mid-page CTA: AI Diet Advisor ═══ */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/5 via-emerald-500/10 to-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground mb-1">Want a diet plan for your arthritis type?</h2>
                <p className="text-muted-foreground text-sm">Our AI assistant creates personalised meal suggestions based on your condition, allergies and preferences — free and instant.</p>
              </div>
              <Button asChild size="lg" className="min-h-[48px] font-semibold bg-primary hover:bg-primary text-white shadow-md shrink-0">
                <Link to="/chat">Get Diet Plan <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Diet sections: Foods to Avoid + Mediterranean */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl space-y-16">
            {dietSections.slice(1).map((sec, i) => (
              <motion.div
                key={sec.id}
                id={sec.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className={`border ${sec.borderColor} bg-gradient-to-br ${sec.color} overflow-hidden`}>
                  <CardContent className="p-5 sm:p-7 lg:p-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${sec.iconColor} flex items-center justify-center shrink-0`}>
                        <sec.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{sec.title}</h2>
                        <p className="text-sm text-muted-foreground font-medium">{sec.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">{sec.description}</p>

                    {"badFoods" in sec && sec.badFoods && (
                      <div className="grid sm:grid-cols-2 gap-3 mb-5">
                        {sec.badFoods.map((food, j) => (
                          <div key={j} className="flex items-start gap-2.5 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                            <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground">{food}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {"mealPlan" in sec && sec.mealPlan && (
                      <div className="space-y-3 mb-5">
                        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-primary" /> Sample Daily Meal Plan
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {sec.mealPlan.map((m, j) => (
                            <div key={j} className="bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                              <span className="text-xs font-bold text-primary uppercase tracking-wide">{m.meal}</span>
                              <p className="text-sm text-foreground mt-1">{m.example}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border/30">
                      <Button asChild className="min-h-[44px] font-semibold">
                        <Link to={sec.href}>Read full guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── Nutrient Benefits Chart ─── */}
        <section className="py-12 lg:py-16 bg-tint-amber">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-label text-primary mb-3">Key Nutrients</p>
                <h2 className="text-2xl font-bold text-foreground mb-2">Anti-Inflammatory Power Foods</h2>
                <p className="text-sm text-muted-foreground mb-6">Contribution to reducing arthritis inflammation.</p>
                <HorizontalBar
                  items={[
                    { label: "Omega-3 Fatty Acids", value: 85, color: "hsl(var(--sky))" },
                    { label: "Curcumin (Turmeric)", value: 78, color: "hsl(var(--amber))" },
                    { label: "Antioxidants (Berries)", value: 72, color: "hsl(var(--violet))" },
                    { label: "Oleocanthal (Olive Oil)", value: 65, color: "hsl(var(--emerald))" },
                    { label: "Gingerols (Ginger)", value: 60, color: "hsl(var(--primary))" },
                  ]}
                />
              </div>
              <div className="flex flex-col items-center gap-6">
                <DonutChart
                  label="Ideal Plate Composition"
                  segments={[
                    { percent: 40, color: "hsl(var(--emerald))", label: "Vegetables" },
                    { percent: 25, color: "hsl(var(--sky))", label: "Lean Protein" },
                    { percent: 20, color: "hsl(var(--amber))", label: "Whole Grains" },
                    { percent: 15, color: "hsl(var(--violet))", label: "Healthy Fats" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* ─── Quick Tips Emoji Grid ─── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Nutrition Quick Tips</h2>
            <p className="text-sm text-muted-foreground mb-8">Simple daily habits for joint-friendly eating.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <EmojiCard emoji="🐟" title="Eat Oily Fish" description="Salmon or mackerel 2× per week" />
              <EmojiCard emoji="🫒" title="Use Olive Oil" description="Replace butter with EVOO" />
              <EmojiCard emoji="🫐" title="Berry Boost" description="A handful of berries daily" />
              <EmojiCard emoji="🥦" title="Go Green" description="Half your plate = colourful veg" />
              <EmojiCard emoji="🧡" title="Spice It Up" description="Add turmeric & ginger daily" />
              <EmojiCard emoji="💧" title="Hydrate Well" description="8 glasses of water daily" />
            </div>
          </div>
        </section>

        {/* ═══ Mid-page CTA: Download Resources ═══ */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/5 via-sky-500/10 to-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-bold text-foreground mb-1">Free 7-Day Meal Plan PDF</h2>
                <p className="text-muted-foreground text-sm">Download our anti-inflammatory meal plan with shopping list — designed by nutrition experts for arthritis patients.</p>
              </div>
              <Button asChild size="lg" className="min-h-[48px] font-semibold bg-primary hover:bg-primary text-white shadow-md shrink-0">
                <Link to="/community">Download Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ─── Supplement Comparison Progress Rings ─── */}
        <section className="py-12 lg:py-16 bg-tint-violet">
          <div className="container mx-auto px-6 md:px-10 max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Supplement Evidence Strength</h2>
            <p className="text-sm text-muted-foreground mb-8 text-center">Research confidence for common arthritis supplements.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <ProgressRing percent={82} label="Turmeric / Curcumin" sublabel="Strong evidence" color="hsl(var(--amber))" />
              <ProgressRing percent={55} label="Glucosamine" sublabel="Mixed evidence" color="hsl(var(--emerald))" />
              <ProgressRing percent={48} label="Collagen" sublabel="Emerging data" color="hsl(var(--sky))" />
              <ProgressRing percent={75} label="Omega-3 Fish Oil" sublabel="Good evidence" color="hsl(var(--violet))" />
            </div>
          </div>
        </section>

        <WaveDivider color="hsl(var(--background))" />

        {/* Related topics */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-6 md:px-10 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground mb-3">Related Nutrition Topics</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">Dive deeper into supplements, specific foods and meal planning.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedTopics.map((topic, i) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={topic.href} className="block group">
                    <Card className="h-full border border-border/40 hover:border-primary/30 transition-all hover:shadow-md">
                      <CardContent className="p-6">
                        <topic.icon className="w-8 h-8 text-primary mb-3" />
                        <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{topic.title}</h3>
                        <p className="text-sm text-muted-foreground">{topic.desc}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3">
                          Read more <ChevronRight className="w-3 h-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get Personalised Diet Advice</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                Anti-inflammatory recipes, food swaps and meal plans tailored to your arthritis type — free and instant.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="min-h-[52px] text-base font-semibold shadow-lg hover:shadow-xl transition-shadow">
                  <Link to="/chat">Talk to Our AI Assistant <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[52px] text-base">
                  <Link to="/exercises">Exercise Hub</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CrossLinkBanner preset="diet" exclude="/diet" title="Related resources" />
          <ContextualLinks
            heading="Explore related arthritis topics"
            intro="Diet works best alongside the right movement plan and condition-specific care. Continue your reading below."
            groups={[
              {
                title: "Anti-inflammatory eating",
                links: [
                  { label: "Mediterranean diet for arthritis — 7-day UK plan", to: "/diet/mediterranean-diet-for-arthritis" },
                  { label: "Mediterranean diet for arthritis — full guide", to: "/guides/diet" },
                  { label: "How to reduce joint inflammation", to: "/arthritis-flare-ups" },
                  { label: "Foods to avoid with arthritis", to: "/blog/category/nutrition" },
                  { label: "Turmeric, omega-3 and collagen — what works", to: "/blog/category/supplements" },
                ],
              },
              {
                title: "Condition-specific diets",
                links: [
                  { label: "Osteoarthritis diet", to: "/conditions/osteoarthritis" },
                  { label: "Rheumatoid arthritis diet", to: "/conditions/rheumatoid-arthritis" },
                  { label: "Gout — low-purine eating", to: "/conditions/gout" },
                  { label: "Lupus diet & sun-safety nutrition", to: "/conditions/lupus" },
                ],
              },
              {
                title: "Pair diet with action",
                links: [
                  { label: "Arthritis-friendly exercises", to: "/exercises" },
                  { label: "Managing arthritis flare-ups", to: "/arthritis-flare-ups" },
                  { label: "Self-help joint tool", to: "/self-help" },
                  { label: "All Nutrition articles", to: "/blog/category/nutrition" },
                ],
              },
            ]}
          />
        </div>
      </main>

      <InternalLinks />
      <Footer />
    </>
  );
};

export default DietHub;
