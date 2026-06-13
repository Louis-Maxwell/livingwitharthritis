import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import PageSchema from "@/components/seo/PageSchema";
import AnswerBox from "@/components/seo/AnswerBox";

const Footer = lazy(() => import("@/components/Footer"));

const DIET_GUIDE_FAQS = [
  { question: "What is the best diet for arthritis in the UK?", answer: "The Mediterranean diet has the strongest evidence base for arthritis. It is rich in vegetables, fruits, wholegrains, olive oil, oily fish, nuts and pulses, and limits red meat, sugar and processed food. UK trials show it can reduce inflammatory markers like CRP by up to 20%." },
  { question: "What foods make arthritis worse?", answer: "Ultra-processed foods, sugary drinks, refined carbohydrates, processed meats, excessive red meat and high-omega-6 vegetable oils are linked to higher inflammation. For gout specifically, alcohol (especially beer) and high-purine foods like organ meats and shellfish can trigger flares." },
  { question: "Does turmeric really help arthritis?", answer: "Yes — clinical trials show 1,000 mg/day of standardised curcumin extract (taken with black pepper or as a phytosome formulation for absorption) can reduce knee osteoarthritis pain similarly to ibuprofen, with fewer side effects. Cooking turmeric is healthy but the active dose needs a concentrated supplement." },
  { question: "How much oily fish should I eat with arthritis?", answer: "At least 2 portions per week, with one being oily (salmon, mackerel, sardines, trout). If you don't eat fish, a daily algae-based or fish-oil supplement providing 2–4 g of combined EPA and DHA is the closest equivalent." },
  { question: "Can losing weight reduce arthritis pain?", answer: "Yes — for knee osteoarthritis, losing 5–10% of body weight produces clinically meaningful pain and function gains. Every 1 kg lost reduces knee load by about 4 kg with each step. Combined with exercise, weight loss is the most effective non-drug treatment for knee OA." },
  { question: "Are supplements like glucosamine and collagen worth taking?", answer: "Evidence is mixed. Glucosamine sulphate (1,500 mg/day) has modest evidence for knee OA pain over 6+ months. Hydrolysed collagen peptides (10 g/day) show emerging benefit for joint comfort. Neither is a substitute for an anti-inflammatory diet, exercise and weight management." },
];

const CONTENT = `
<h2 id="diet-and-arthritis">Why Diet Matters for Arthritis</h2>
<p>The relationship between diet and arthritis is one of the most researched areas in rheumatology. While no single food can cure arthritis, mounting evidence demonstrates that what you eat can significantly influence <strong>inflammation levels, pain intensity, joint stiffness, disease activity</strong> and even the effectiveness of medications. A 2021 systematic review published in <em>Nutrients</em> found that dietary interventions — particularly the Mediterranean diet — can reduce pain scores by <strong>15–25%</strong> and lower inflammatory markers like C-reactive protein (CRP) by up to <strong>20%</strong>.</p>
<p>For people with osteoarthritis, diet also plays a critical role in <strong>weight management</strong>. Excess weight is the single most modifiable risk factor for OA: every 1 kg of body weight lost reduces the load on each knee by approximately <strong>4 kg</strong> with every step (Messier et al., 2013). For overweight individuals with knee OA, losing just <strong>5–10% of body weight</strong> can produce clinically meaningful reductions in pain and improvements in function.</p>

<h2 id="mediterranean-diet">The Mediterranean Diet: The Gold Standard</h2>
<p>The Mediterranean diet is the most extensively studied dietary pattern for arthritis and chronic inflammation. It consistently outperforms other diets in clinical trials for reducing inflammatory markers, joint pain and cardiovascular risk — which is elevated in people with inflammatory arthritis.</p>
<p><strong>Want a plan to follow this week?</strong> See the focused <a href="/diet/mediterranean-diet-for-arthritis">7-day Mediterranean eating plan for arthritis</a> — UK shopping list, recipes and what to eat freely, weekly and rarely.</p>
<h3>Core Principles</h3>
<ul>
<li><strong>Abundant vegetables and fruits</strong> — aim for 7+ portions daily, focusing on colourful varieties rich in antioxidants (berries, leafy greens, tomatoes, peppers, beetroot)</li>
<li><strong>Wholegrains</strong> — oats, brown rice, wholemeal bread, quinoa, bulgur wheat</li>
<li><strong>Healthy fats</strong> — extra virgin olive oil as the primary fat source (rich in oleocanthal, which has ibuprofen-like anti-inflammatory properties)</li>
<li><strong>Oily fish</strong> — at least 2 portions per week (salmon, mackerel, sardines, trout) for omega-3 fatty acids EPA and DHA</li>
<li><strong>Legumes and pulses</strong> — lentils, chickpeas, beans — excellent protein and fibre sources</li>
<li><strong>Nuts and seeds</strong> — walnuts (highest plant omega-3), almonds, flaxseeds, chia seeds</li>
<li><strong>Herbs and spices</strong> — turmeric, ginger, garlic, oregano, rosemary — many have documented anti-inflammatory properties</li>
<li><strong>Moderate dairy</strong> — yoghurt and cheese in moderation; fermented dairy supports gut health</li>
<li><strong>Limited red meat</strong> — no more than 1–2 portions per week; processed meats avoided</li>
<li><strong>Limited sugar and refined carbohydrates</strong> — these promote inflammation</li>
</ul>
<p>A landmark 2023 trial in <em>Annals of the Rheumatic Diseases</em> found that RA patients following a Mediterranean diet for 16 weeks experienced a <strong>significant reduction in DAS28 scores</strong> (a composite measure of disease activity) compared to controls, with improvements in fatigue and quality of life.</p>

<h2 id="anti-inflammatory-foods">Key Anti-Inflammatory Foods</h2>
<h3 id="omega-3-fatty-acids">Omega-3 Fatty Acids</h3>
<p>Omega-3s are the most well-evidenced dietary component for arthritis. EPA and DHA — found primarily in oily fish — are converted into anti-inflammatory compounds called resolvins and protectins that actively help resolve inflammation. A 2017 meta-analysis in the <em>British Journal of Clinical Pharmacology</em> found that fish oil supplementation (2–4 g/day of combined EPA/DHA) significantly reduced joint pain, morning stiffness and NSAID use in RA patients.</p>
<p><strong>Best food sources:</strong></p>
<ul>
<li>Salmon (wild-caught) — 2.2 g omega-3 per 100 g</li>
<li>Mackerel — 2.6 g per 100 g</li>
<li>Sardines — 1.5 g per 100 g</li>
<li>Trout — 1.0 g per 100 g</li>
<li>Walnuts — 2.5 g ALA (plant omega-3) per 30 g</li>
<li>Flaxseeds — 6.7 g ALA per 30 g (ground for absorption)</li>
<li>Chia seeds — 5.0 g ALA per 30 g</li>
</ul>
<p><strong>Recommendation:</strong> Aim for 2 portions of oily fish per week plus daily plant sources. If you don't eat fish, consider an algae-based omega-3 supplement (providing EPA/DHA directly).</p>

<h3 id="turmeric-and-curcumin">Turmeric and Curcumin</h3>
<p>Turmeric's active compound, curcumin, is one of the most extensively studied natural anti-inflammatory agents. It works by blocking NF-κB — a master regulator of inflammation — and inhibiting COX-2 and LOX enzymes (similar mechanisms to NSAIDs like ibuprofen). A 2016 systematic review and meta-analysis published in the <em>Journal of Medicinal Food</em> concluded that <strong>1,000 mg/day of curcumin</strong> significantly reduced pain and improved function in knee OA patients.</p>
<p>Key considerations:</p>
<ul>
<li>Curcumin has poor bioavailability on its own — pairing with <strong>black pepper (piperine)</strong> increases absorption by up to <strong>2,000%</strong></li>
<li>Curcumin supplements (500–1,000 mg/day) are more practical than dietary turmeric for therapeutic doses</li>
<li>Some trials show curcumin provides comparable pain relief to diclofenac with fewer side effects</li>
<li>Consult your doctor if taking blood thinners or diabetes medication, as curcumin may interact</li>
</ul>

<h3 id="ginger">Ginger</h3>
<p>Ginger contains gingerols and shogaols — bioactive compounds with anti-inflammatory and analgesic properties. A 2015 meta-analysis of 5 randomised controlled trials found that ginger supplementation (500–1,000 mg/day) significantly reduced OA pain compared to placebo. Fresh ginger can be used in cooking (1–2 cm fresh root daily) or as a tea.</p>

<h3 id="berries-and-antioxidants">Berries and Antioxidant-Rich Foods</h3>
<p>Berries — particularly blueberries, strawberries, cherries and blackcurrants — are rich in anthocyanins, powerful antioxidants that reduce oxidative stress and inflammation. Tart cherry juice has been specifically studied for gout, where it has been shown to reduce uric acid levels and flare frequency. Other antioxidant-rich foods include dark leafy greens (kale, spinach), beetroot, sweet potatoes and dark chocolate (70%+ cocoa).</p>

<h2 id="foods-to-avoid">Foods That May Worsen Arthritis</h2>
<p>While individual responses vary, certain foods are consistently associated with increased inflammation and worsened arthritis symptoms:</p>
<ul>
<li><strong>Processed and ultra-processed foods</strong> — ready meals, crisps, biscuits, processed meats (bacon, sausages, ham) — high in advanced glycation end products (AGEs) that promote inflammation</li>
<li><strong>Added sugars</strong> — fizzy drinks, sweets, cakes — trigger inflammatory cytokine release</li>
<li><strong>Refined carbohydrates</strong> — white bread, white pasta, pastries — spike blood sugar and insulin, promoting inflammation</li>
<li><strong>Excessive alcohol</strong> — increases uric acid (worsens gout) and systemic inflammation</li>
<li><strong>Excessive omega-6 fatty acids</strong> — found in sunflower oil, corn oil and many processed foods — when consumed in excess relative to omega-3, these promote pro-inflammatory pathways</li>
<li><strong>Trans fats</strong> — hydrogenated oils found in some margarines and commercial baked goods</li>
<li><strong>Excessive red meat</strong> — particularly processed meats, which contain nitrites and saturated fats</li>
</ul>

<h2 id="supplements-evidence">Supplements: What the Evidence Says</h2>
<h3>Glucosamine and Chondroitin</h3>
<p>These are the most widely used OA supplements in the UK. Evidence is mixed: a 2018 Cochrane review found glucosamine provides <strong>small, uncertain benefits</strong> for pain compared to placebo. Chondroitin alone showed similarly modest effects. Combined glucosamine/chondroitin may offer slightly better outcomes, but the evidence is not strong enough for NICE to recommend routine use.</p>

<h3>Collagen (Hydrolysed)</h3>
<p>Emerging research suggests hydrolysed collagen peptides (10 g/day) may modestly reduce joint pain and stiffness in OA. A 2019 meta-analysis in <em>International Orthopaedics</em> found statistically significant improvements in pain and function, though effect sizes were small. Collagen is generally well-tolerated.</p>

<h3>Vitamin D</h3>
<p>Vitamin D deficiency is extremely common in the UK (affecting up to <strong>1 in 5 adults</strong>) and is associated with worse arthritis outcomes. The health service recommends all UK adults take a <strong>10 mcg (400 IU) vitamin D supplement daily</strong> during autumn and winter. People with inflammatory arthritis may benefit from higher doses (discuss with your doctor).</p>

<h3>Fish Oil (Omega-3 Supplements)</h3>
<p>If you don't consume enough oily fish, a high-quality fish oil supplement providing <strong>1–3 g of combined EPA/DHA daily</strong> is the most well-evidenced supplement for arthritis. Look for purified, sustainably sourced products with high EPA content. Algae-based alternatives are equally effective for vegetarians and vegans.</p>

<h2 id="sample-meal-plan">Sample 7-Day Anti-Inflammatory Meal Plan</h2>
<p>This plan follows Mediterranean diet principles and provides approximately 1,800–2,000 kcal/day:</p>
<h3>Day 1</h3>
<ul>
<li><strong>Breakfast:</strong> Overnight oats with blueberries, walnuts, chia seeds and honey</li>
<li><strong>Lunch:</strong> Mediterranean salad with chickpeas, roasted peppers, feta, olives, extra virgin olive oil dressing</li>
<li><strong>Dinner:</strong> Baked salmon with sweet potato, broccoli and turmeric-ginger sauce</li>
<li><strong>Snack:</strong> Apple slices with almond butter</li>
</ul>
<h3>Day 2</h3>
<ul>
<li><strong>Breakfast:</strong> Spinach and mushroom omelette with wholemeal toast</li>
<li><strong>Lunch:</strong> Lentil and vegetable soup with crusty wholegrain bread</li>
<li><strong>Dinner:</strong> Grilled mackerel with quinoa tabbouleh and roasted courgettes</li>
<li><strong>Snack:</strong> Handful of mixed nuts and dried cranberries</li>
</ul>
<h3>Day 3</h3>
<ul>
<li><strong>Breakfast:</strong> Greek yoghurt with strawberries, ground flaxseed and granola</li>
<li><strong>Lunch:</strong> Avocado and smoked salmon on rye bread with cherry tomatoes</li>
<li><strong>Dinner:</strong> Chicken and vegetable stir-fry with ginger, garlic and brown rice</li>
<li><strong>Snack:</strong> Hummus with carrot and cucumber sticks</li>
</ul>
<h3>Day 4–7</h3>
<p>Continue rotating fish (2–3 times), lean poultry, legume-based meals and plenty of colourful vegetables. Include turmeric, ginger and garlic regularly. Use extra virgin olive oil for cooking and dressings. Stay hydrated with water, green tea and ginger tea.</p>

<h2 id="gut-health">Gut Health and Arthritis</h2>
<p>Emerging research links the <strong>gut microbiome</strong> to inflammatory arthritis. An imbalanced gut microbiome (dysbiosis) may trigger or worsen autoimmune responses in conditions like RA and PsA. To support gut health:</p>
<ul>
<li>Eat <strong>30+ different plant foods per week</strong> — diversity feeds diverse beneficial bacteria</li>
<li>Include <strong>fermented foods</strong> — kefir, sauerkraut, kimchi, live yoghurt, miso</li>
<li>Consume <strong>prebiotic fibre</strong> — garlic, onions, leeks, asparagus, bananas, oats</li>
<li>Limit <strong>artificial sweeteners and emulsifiers</strong> — these may disrupt gut bacteria</li>
</ul>

<h2 id="weight-management">Weight Management for Joint Health</h2>
<p>Maintaining a healthy weight is arguably the most impactful dietary intervention for OA. Evidence-based strategies include:</p>
<ul>
<li>Focus on <strong>nutrient-dense, high-satiety foods</strong> — vegetables, protein, wholegrains and healthy fats keep you fuller for longer</li>
<li>Avoid <strong>crash diets</strong> — they lead to muscle loss, which worsens joint instability</li>
<li>Aim for <strong>gradual weight loss</strong> — 0.5–1 kg per week is sustainable and preserves muscle mass</li>
<li>Combine dietary changes with <strong>regular low-impact exercise</strong> — walking, swimming, cycling</li>
<li>Consider <strong>portion control</strong> rather than food restriction — using smaller plates and mindful eating techniques</li>
</ul>
<p>The NICE guidelines for OA (NG226) specifically recommend weight loss as a first-line treatment alongside exercise, stating it should be offered before medication.</p>

<h2 id="practical-tips">Practical Tips for UK Shoppers</h2>
<ul>
<li><strong>Budget-friendly options</strong> — tinned fish (sardines, mackerel), frozen berries, dried lentils and tinned chickpeas are just as nutritious as fresh alternatives</li>
<li><strong>Read labels</strong> — look for traffic-light labels; aim for green on fat, sugar and salt</li>
<li><strong>Buy seasonal UK produce</strong> — cheaper and more nutritious; farmer's markets often have better value</li>
<li><strong>Batch cooking</strong> — prepare soups, stews and curries in bulk and freeze portions</li>
<li><strong>Joint-friendly cooking</strong> — use electric can openers, lightweight pans and adaptive kitchen utensils from organisations like the Arthritis Action or OT referral</li>
</ul>

<h2 id="anti-inflammatory-smoothie">Anti-Inflammatory Smoothie Recipe</h2>
<p><strong>Beet &amp; Berry Anti-Inflammatory Smoothie</strong> (serves 1):</p>
<ul>
<li>1 small cooked beetroot (peeled, chopped)</li>
<li>1 cup frozen mixed berries</li>
<li>1 banana</li>
<li>1-inch fresh ginger (grated)</li>
<li>1 tbsp ground flaxseed</li>
<li>1 cup unsweetened almond milk or oat milk</li>
<li>Optional: 1 tsp turmeric powder + pinch black pepper</li>
</ul>
<p>Blend until smooth. This provides omega-3 (flaxseed), betalains (beetroot), anthocyanins (berries), gingerols (ginger) and curcumin (turmeric) — a powerhouse of anti-inflammatory compounds in one glass.</p>

<h2 id="sources-diet">Sources &amp; Disclaimer</h2>
<p>This guide is based on evidence from NICE guidelines (NG226), systematic reviews published in <em>Nutrients</em>, <em>Annals of the Rheumatic Diseases</em>, <em>British Journal of Clinical Pharmacology</em>, <em>Journal of Medicinal Food</em>, and guidance from the British Dietetic Association. Statistics cited are from the most recent publications available as of 2024. This information is for educational purposes only. Always consult a registered dietitian or your GP before making significant dietary changes, especially if you take medication.</p>
`;

export default function DietGuide() {
  const html = addHeadingIds(CONTENT);

  return (
    <>
      <Helmet>
        <title>Anti-Inflammatory Diet for Arthritis UK – Mediterranean Diet, Foods &amp; Meal Plans</title>
        <meta name="description" content="Evidence-based guide to the best diet for arthritis: Mediterranean diet, anti-inflammatory foods, omega-3s, turmeric, supplements, sample meal plans and weight management tips for UK patients." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/guides/diet" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content="Anti-Inflammatory Diet for Arthritis UK – Mediterranean Diet, Foods &amp; Meal Plans" />
      <meta property="og:description" content="Evidence-based guide to the best diet for arthritis: Mediterranean diet, anti-inflammatory foods, omega-3s, turmeric, supplements, sample meal plans and weight management tips for UK patients." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/diet" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Anti-Inflammatory Diet for Arthritis UK – Mediterranean Diet, Foods &amp; Meal Plans" />
      <meta name="twitter:description" content="Evidence-based guide to the best diet for arthritis: Mediterranean diet, anti-inflammatory foods, omega-3s, turmeric, supplements, sample meal plans and weight management tips for UK patients." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
    </Helmet>
      <PageSchema
        url="/guides/diet"
        name="Anti-Inflammatory Diet for Arthritis (UK)"
        description="Evidence-based guide to the best diet for arthritis: Mediterranean eating, anti-inflammatory foods, omega-3s, turmeric and supplements."
        medical={{ condition: "Arthritis" }}
        speakableSelector=".speakable-intro"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/blog-hub" },
          { name: "Diet Guide" },
        ]}
        faqs={DIET_GUIDE_FAQS}
        idPrefix="diet-guide"
      />
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Diet &amp; Nutrition Guide for Arthritis"
          subtitle="The evidence-based guide to eating for joint health — anti-inflammatory foods, Mediterranean meal plans, supplements and practical tips for UK shoppers."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <AnswerBox
            question="What is the best diet for arthritis joint pain?"
            reviewed="2026-06-13"
          >
            <p>
              The best diet for arthritis is the <strong>Mediterranean diet</strong> — rich in
              vegetables, fruit, wholegrains, olive oil, oily fish, nuts and pulses. UK trials
              show it can reduce inflammatory markers by up to 20% and ease joint pain. For
              osteoarthritis, losing 5–10% of body weight on this pattern often delivers the
              largest pain relief of any non-drug treatment.
            </p>
          </AnswerBox>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-16 pt-8 border-t border-border/30">
            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/exercise" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Next Guide →</p>
                <p className="font-bold text-foreground">Exercise Guide for Arthritis</p>
              </Link>
              <Link to="/diet" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Interactive →</p>
                <p className="font-bold text-foreground">Visit the Diet Hub</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}
