import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Utensils,
  ShoppingBasket,
  Fish,
  Heart,
  Sparkles,
  Leaf,
} from "lucide-react";
import Header from "@/components/Header";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FaqAccordion from "@/components/faq/FaqAccordion";

const heroImage =
  "/openverse/cover-0469-organic-olive-oil-salad.webp";

const whyItWorks = [
  {
    icon: Sparkles,
    title: "Lower inflammation",
    text: "Trials show CRP — a key inflammation marker — drops by up to 20% after 12 weeks of Mediterranean eating, with pain scores down 15–25%.",
  },
  {
    icon: Heart,
    title: "Heart-friendly bonus",
    text: "Inflammatory arthritis raises cardiovascular risk. The Mediterranean pattern is the most evidence-backed diet for protecting the heart at the same time.",
  },
  {
    icon: Leaf,
    title: "Sustainable for life",
    text: "Unlike restrictive elimination plans, this is a long-term way of eating — generous, flavour-led and built around foods you already buy.",
  },
];

const eatFreely = [
  "Vegetables of every colour (aim for 5+ a day)",
  "Fruit, especially berries and citrus",
  "Wholegrains — oats, brown rice, wholemeal bread, bulgur",
  "Legumes — lentils, chickpeas, beans (3+ portions a week)",
  "Extra virgin olive oil as your main cooking fat",
  "Herbs and spices — turmeric, ginger, garlic, oregano, rosemary",
];

const eatWeekly = [
  "Oily fish — salmon, mackerel, sardines, trout (2–3 portions)",
  "Eggs (up to 6 a week)",
  "Lean poultry (1–2 portions)",
  "Plain Greek yoghurt and small amounts of cheese",
  "Unsalted nuts and seeds (a small handful daily)",
];

const eatRarely = [
  "Red meat — keep to 1 small portion a week or less",
  "Processed meats — bacon, sausages, salami, ham",
  "Sugary drinks, biscuits, cakes and pastries",
  "Ultra-processed ready meals and crisps",
  "Refined white bread and white pasta",
  "Excess alcohol (1 small glass with food, max)",
];

const shoppingList = [
  {
    title: "Produce",
    items: [
      "Spinach, rocket, kale",
      "Tomatoes, peppers, courgettes",
      "Broccoli, cauliflower, carrots",
      "Onions, garlic, leeks",
      "Lemons, oranges, bananas",
      "Frozen mixed berries (cheaper, just as nutritious)",
    ],
  },
  {
    title: "Store cupboard",
    items: [
      "Extra virgin olive oil (own-brand is fine)",
      "Tinned chopped tomatoes",
      "Tinned chickpeas, butter beans, lentils",
      "Rolled oats and wholemeal pasta",
      "Brown rice, bulgur or quinoa",
      "Black pepper, turmeric, paprika, cumin, oregano",
    ],
  },
  {
    title: "Fish counter or freezer",
    items: [
      "Tinned sardines or mackerel in olive oil",
      "Tinned wild salmon",
      "Frozen salmon or pollock fillets",
      "Smoked mackerel",
    ],
  },
  {
    title: "Dairy & extras",
    items: [
      "Plain Greek yoghurt (0% or 5%)",
      "Feta or a small block of mature cheddar",
      "Eggs (free-range, 6-pack)",
      "Walnuts, almonds and ground flaxseed",
      "Dark chocolate (70%+ cocoa)",
    ],
  },
];

const days = [
  {
    day: 1,
    breakfast: "Overnight oats with blueberries, walnuts, chia seeds and honey",
    lunch: "Mediterranean salad with chickpeas, roasted peppers, feta and olive-oil dressing",
    dinner: "Baked salmon with sweet potato, broccoli and turmeric-ginger sauce",
    snack: "Apple slices with almond butter",
  },
  {
    day: 2,
    breakfast: "Spinach and mushroom omelette with wholemeal toast",
    lunch: "Lentil and vegetable soup with crusty wholegrain bread",
    dinner: "Grilled mackerel with quinoa tabbouleh and roasted courgettes",
    snack: "Handful of mixed nuts and dried cranberries",
  },
  {
    day: 3,
    breakfast: "Greek yoghurt with strawberries, ground flaxseed and granola",
    lunch: "Avocado and smoked salmon on rye bread with cherry tomatoes",
    dinner: "Chicken and vegetable stir-fry with ginger, garlic and brown rice",
    snack: "Hummus with carrot and cucumber sticks",
  },
  {
    day: 4,
    breakfast: "Porridge with banana, walnuts and a spoon of tahini",
    lunch: "Tuna and white-bean salad with red onion, parsley and olive oil",
    dinner: "Chickpea and spinach curry with brown basmati rice",
    snack: "Plain yoghurt with mixed berries",
  },
  {
    day: 5,
    breakfast: "Wholemeal toast with smashed avocado, tomato and chilli flakes",
    lunch: "Greek-style chicken bowl with bulgur, cucumber, feta and olives",
    dinner: "Mediterranean tray bake — sardines, tomatoes, peppers, olives, olive oil",
    snack: "Two squares of dark chocolate and a small orange",
  },
  {
    day: 6,
    breakfast: "Beet & berry anti-inflammatory smoothie",
    lunch: "Roasted vegetable and butter-bean soup with seeded sourdough",
    dinner: "Trout fillet with new potatoes, green beans and lemon-herb dressing",
    snack: "Small bowl of mixed olives and cherry tomatoes",
  },
  {
    day: 7,
    breakfast: "Greek yoghurt parfait with oats, walnuts and stewed apple",
    lunch: "Big leafy salad with hard-boiled eggs, chickpeas and seeds",
    dinner: "Slow-cooked Moroccan-style lentil and aubergine stew with couscous",
    snack: "Pear with a small piece of cheese",
  },
];

const recipes = [
  {
    title: "Baked salmon with Mediterranean veg",
    text: "20 minutes, one tray, packed with omega-3, oleocanthal-rich olive oil and antioxidants.",
    href: "/guides/diet#omega-3-fatty-acids",
  },
  {
    title: "Chickpea & spinach stew",
    text: "Plant-based, high in fibre and iron — a freezer-friendly midweek staple.",
    href: "/guides/diet#anti-inflammatory-foods",
  },
  {
    title: "Overnight oats with berries",
    text: "5 minutes the night before. Beta-glucan oats, anthocyanin-rich berries, plant omega-3 from chia.",
    href: "/guides/diet#berries-and-antioxidants",
  },
  {
    title: "Sardine & tomato tray bake",
    text: "Tinned sardines are the cheapest omega-3 source on the UK shelf — and surprisingly delicious roasted.",
    href: "/guides/diet#omega-3-fatty-acids",
  },
  {
    title: "Beet & berry anti-inflammatory smoothie",
    text: "Beetroot, berries, ginger, flaxseed and turmeric — five anti-inflammatory compounds in one glass.",
    href: "/guides/diet#anti-inflammatory-smoothie",
  },
];

const mistakes = [
  {
    title: "Drowning everything in cheese",
    text: "Cheese is included, but in small amounts. A matchbox-sized piece of feta is a portion — not a generous handful.",
  },
  {
    title: "Buying the cheapest blended olive oil",
    text: "Use extra virgin olive oil for the anti-inflammatory oleocanthal compound. Own-brand EVOO is fine — 'pomace' or 'light' olive oil is not.",
  },
  {
    title: "Skipping the oily fish",
    text: "The 2-portions-a-week target is what shifts inflammation markers. Tinned sardines and mackerel count and cost under £1 a portion.",
  },
  {
    title: "Falling for 'Mediterranean-style' ready meals",
    text: "Most are ultra-processed, salt-heavy and low in vegetables. The pattern only works when most of your food is recognisable ingredients.",
  },
  {
    title: "Ignoring portion size",
    text: "Olive oil, nuts and cheese are healthy but calorie-dense. If weight loss is a goal, measure rather than free-pour.",
  },
];

const faqs = [
  {
    q: "Is the Mediterranean diet expensive on a UK budget?",
    a: "It doesn't have to be. The four cheapest staples — tinned chickpeas, tinned sardines, frozen berries and own-brand extra virgin olive oil — sit at the heart of the pattern. Lentils, oats, eggs and seasonal vegetables stretch a weekly food budget further than most processed alternatives.",
  },
  {
    q: "Can I follow it as a vegetarian or vegan?",
    a: "Yes. Replace the oily fish with daily ground flaxseed, walnuts and chia seeds, and consider an algae-based EPA/DHA supplement (1–2 g a day). Pulses and tofu cover the protein side; the rest of the pattern stays identical.",
  },
  {
    q: "What about alcohol?",
    a: "The traditional Mediterranean diet includes a small glass of red wine with food. Current UK guidance keeps total alcohol under 14 units a week, spread over several days, with alcohol-free days. If you have gout or take methotrexate, less is better — discuss with your GP.",
  },
  {
    q: "Do I have to give up dairy?",
    a: "No. The Mediterranean diet keeps yoghurt and small amounts of cheese; both are linked with lower inflammation in most studies. Fermented dairy like live yoghurt and kefir also supports gut health, which itself influences arthritis.",
  },
  {
    q: "Should I take supplements alongside the diet?",
    a: "If you eat oily fish twice a week, you usually don't need a fish-oil supplement. Vitamin D 10 mcg daily through autumn and winter is recommended for all UK adults. Curcumin (turmeric extract) and collagen have modest evidence — discuss with your GP, especially if you take blood thinners.",
  },
  {
    q: "How long until I notice a difference?",
    a: "Energy and digestion often shift within 2 weeks. Joint pain and morning stiffness typically begin to ease at the 6–12 week mark, with the strongest evidence at 16 weeks of consistent eating combined with gentle daily movement.",
  },
];

const SITE = "https://livingwitharthritis.org.uk";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mediterranean Diet for Arthritis: A 7-Day UK Eating Plan",
  description:
    "A free, evidence-based 7-day Mediterranean eating plan for UK adults with arthritis. Shopping list, recipes and the foods to eat freely, weekly and rarely.",
  inLanguage: "en-GB",
  image: "https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp",
  datePublished: "2024-09-01",
  dateModified: "2025-01-15",
  author: {
    "@type": "Organization",
    name: "Living With Arthritis UK Clinical Team",
    url: SITE,
  },
  about: {
    "@type": "Diet",
    name: "Mediterranean diet",
    dietFeatures: "Anti-inflammatory, omega-3 rich, plant-forward",
  },
  publisher: {
    "@type": "Organization",
    name: "Living With Arthritis UK",
    url: SITE,
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Follow a 7-day Mediterranean diet for arthritis",
  description:
    "A 7-day Mediterranean eating plan adapted for UK adults with arthritis, with breakfast, lunch, dinner and a snack each day.",
  totalTime: "P7D",
  inLanguage: "en-GB",
  step: days.map((d) => ({
    "@type": "HowToStep",
    name: `Day ${d.day}`,
    text: `Breakfast: ${d.breakfast}. Lunch: ${d.lunch}. Dinner: ${d.dinner}. Snack: ${d.snack}.`,
  })),
};

export default function MediterraneanDietForArthritis() {
  useEffect(() => {
    // BreadcrumbList intentionally not emitted here — <PageBreadcrumb> below covers it.
    // FAQPage intentionally not emitted here — <FaqAccordion> below covers it.
    const scripts = [articleJsonLd, howToJsonLd].map(
      (data) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.text = JSON.stringify(data);
        document.head.appendChild(s);
        return s;
      },
    );
    return () => {
      scripts.forEach((s) => document.head.removeChild(s));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Mediterranean Diet for Arthritis: Does It Help?"
        description="What the evidence shows about the Mediterranean diet and arthritis pain, plus a practical UK shopping list and a simple 7-day meal plan. Educational guidance, not a personal prescription."
        path="/diet/mediterranean-diet-for-arthritis"
        type="article"
        keywords="mediterranean diet for arthritis, anti inflammatory mediterranean diet UK, mediterranean meal plan arthritis, mediterranean diet recipes UK, anti inflammatory eating plan"
      />
      <Header />

      <PageBreadcrumb
        segments={[
          { label: "Diet", href: "/diet" },
          { label: "Mediterranean Diet for Arthritis" },
        ]}
      />

      <PageHero
        badge={
          <Badge variant="secondary" className="bg-background text-primary border-0">
            Eating plan · UK · Free
          </Badge>
        }
        title="Mediterranean Diet for Arthritis: A UK Eating Plan"
        subtitle="The most evidence-backed diet for joint pain, heart health and inflammation — translated into a practical 7-day plan, a UK shopping list and five anti-inflammatory recipes."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#seven-day-plan">
              See the 7-day plan <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/diet">Back to the Diet Hub</Link>
          </Button>
        </div>
      </PageHero>
      <div className="container mx-auto px-6 md:px-10 max-w-3xl"><p className="speakable-intro text-lg text-muted-foreground leading-relaxed mb-4">A practical UK Mediterranean-style eating pattern to support joint health — educational nutrition guidance, not a personal diet prescription.</p><AeoEnhancement route="/diet/mediterranean-diet-for-arthritis" /></div>

      {/* Hero image */}
      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt="A spread of Mediterranean foods — olive oil, tomatoes, oily fish, lentils and leafy greens"
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
              width={1600}
              height={900}
            />
          </figure>
        </div>
      </section>

      {/* Why it works */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Why this is the diet to try first
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Three things the evidence keeps showing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {whyItWorks.map((p) => (
              <Card key={p.title} className="p-6 border border-border/40">
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The plate at a glance */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <Utensils className="h-3 w-3 mr-1 inline" /> The plate
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              What to eat freely, weekly and rarely
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Not a calorie diet. Just three lists.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Eat freely", items: eatFreely, tone: "text-primary" },
              { title: "Eat weekly", items: eatWeekly, tone: "text-primary" },
              { title: "Eat rarely", items: eatRarely, tone: "text-primary" },
            ].map((col) => (
              <Card key={col.title} className="p-6 border border-border/40 bg-background">
                <h3 className={`font-display text-xl font-semibold mb-4 ${col.tone}`}>
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UK shopping list */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <ShoppingBasket className="h-3 w-3 mr-1 inline" /> UK shopping list
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              One trip to the supermarket
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Everything is available in Tesco, Sainsbury's, Asda, Morrisons, Aldi and Lidl. Own-brand
              is fine across the board.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {shoppingList.map((cat) => (
              <Card key={cat.title} className="p-6 border border-border/40">
                <h3 className="font-display text-lg font-semibold mb-3">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7-day plan */}
      <section id="seven-day-plan" className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              7-day plan
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Your first Mediterranean week
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Roughly 1,800–2,000 kcal a day. Swap meals between days to suit your week — the pattern
              matters more than the order.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {days.map((d) => (
              <Card key={d.day} className="p-6 border border-border/40 bg-background flex flex-col gap-3">
                <Badge variant="secondary" className="bg-background text-primary border-0 w-fit">
                  Day {d.day}
                </Badge>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    <span className="font-semibold text-foreground">Breakfast.</span>{" "}
                    <span className="text-muted-foreground">{d.breakfast}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Lunch.</span>{" "}
                    <span className="text-muted-foreground">{d.lunch}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Dinner.</span>{" "}
                    <span className="text-muted-foreground">{d.dinner}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Snack.</span>{" "}
                    <span className="text-muted-foreground">{d.snack}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <Fish className="h-3 w-3 mr-1 inline" /> Recipes
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              5 anti-inflammatory recipes to start with
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Each links into the full Diet Guide for ingredients and the science behind them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map((r) => (
              <Link key={r.title} to={r.href} className="group">
                <Card className="p-6 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-md transition-all flex flex-col">
                  <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{r.text}</p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm">
                    Open the recipe{" "}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 bg-background text-primary border-0">
              <AlertCircle className="h-3 w-3 mr-1 inline" /> Avoid these
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              5 common mistakes to sidestep
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These are the slip-ups that quietly cancel out the benefits.
            </p>
          </div>
          <div className="space-y-3">
            {mistakes.map((m) => (
              <Card key={m.title} className="p-5 bg-background border border-border/40">
                <h3 className="font-display text-base font-semibold mb-1">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Keep going
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Read more, or pair the plan with your specific arthritis type.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Diet Hub", desc: "All anti-inflammatory eating tools, calculators and recipes in one place.", to: "/diet" },
              { title: "Pain relief", desc: "Practical UK pain-relief steps when joints hurt today.", to: "/guides/arthritis-pain-relief" },
              { title: "Newly diagnosed", desc: "First-week checklist after an arthritis diagnosis.", to: "/guides/newly-diagnosed" },
              { title: "Benefits & PIP", desc: "When pain or stiffness limits daily living or mobility.", to: "/benefits-pip" },
              { title: "Turmeric / curcumin", desc: "Evidence, dose and safety for curcumin supplements.", to: "/supplements/turmeric" },
              { title: "14-day meal plan", desc: "A fortnight Mediterranean plan with UK supermarket ingredients.", to: "/blog/mediterranean-diet-arthritis-14-day-plan" },
              { title: "Full Diet Guide", desc: "The pillar guide — Mediterranean diet, supplements, gut health and weight management.", to: "/guides/diet#mediterranean-diet" },
              { title: "Osteoarthritis diet", desc: "Pair eating with weight management — the highest-impact lever for OA pain.", to: "/conditions/osteoarthritis" },
            ].map((c) => (
              <Link key={c.to} to={c.to} className="group">
                <Card className="p-6 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-md transition-all flex flex-col">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{c.desc}</p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm">
                    Open <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Mediterranean Diet for Arthritis: FAQs
          </h2>
          <FaqAccordion
            idPrefix="diet-mediterranean-faq"
            items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
          />
        </div>
      </section>

      
      <EducationalDisclaimerBox />
      <TopicClusterNav path="/diet/mediterranean-diet-for-arthritis" />
<Footer />
    </div>
  );
}
