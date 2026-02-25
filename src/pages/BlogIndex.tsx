import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  { slug: "arthritis-and-cold-weather-uk", title: "Arthritis and Cold Weather in the UK: Why Joints Hurt More in Winter", excerpt: "Discover why arthritis pain worsens in cold weather. Evidence-based tips for managing joint pain during UK winters, from layering to indoor exercises.", date: "2026-02-24" },
  { slug: "swimming-for-arthritis-uk", title: "Swimming for Arthritis UK: The Complete Guide to Aquatic Exercise", excerpt: "Complete UK guide to swimming for arthritis. Discover benefits, find local hydrotherapy pools, learn safe strokes and get started with aquatic exercise.", date: "2026-02-23" },
  { slug: "arthritis-flare-up-what-to-do", title: "Arthritis Flare-Up: What to Do When Your Symptoms Get Worse", excerpt: "Learn what causes arthritis flare-ups and how to manage them effectively. Practical UK guide with tips for pain relief, rest and when to see your GP.", date: "2026-02-22" },
  { slug: "turmeric-for-arthritis-uk", title: "Turmeric for Arthritis UK: Evidence, Dosage and How to Use It", excerpt: "Evidence-based guide to using turmeric for arthritis. Learn about curcumin benefits, correct dosage, best supplements and safety considerations.", date: "2026-02-21" },
  { slug: "best-diet-for-joint-pain-uk", title: "Best Diet for Joint Pain in the UK", excerpt: "Discover which anti-inflammatory foods help ease joint pain and stiffness, based on evidence recommended by NHS-aligned health professionals.", date: "2026-02-20" },
  { slug: "hand-exercises-for-arthritis", title: "Hand Exercises for Arthritis: A Complete Guide", excerpt: "Step-by-step hand exercises approved by UK physiotherapists. Reduce stiffness, improve grip strength and maintain dexterity with daily routines.", date: "2026-02-19" },
  { slug: "nhs-arthritis-exercises", title: "NHS-Recommended Arthritis Exercises", excerpt: "A guide to low-impact exercises endorsed by UK physiotherapists for managing osteoarthritis and rheumatoid arthritis symptoms.", date: "2026-02-18" },
  { slug: "arthritis-and-sleep-problems", title: "Arthritis and Sleep Problems: How to Get Better Rest", excerpt: "Struggling to sleep with arthritis? Evidence-based guide to improving sleep quality, including positions, mattress advice and UK resources.", date: "2026-02-17" },
  { slug: "yoga-for-arthritis-beginners", title: "Yoga for Arthritis Beginners: A Safe and Gentle Starting Guide", excerpt: "Start yoga safely with arthritis. Beginner-friendly poses, modifications for joint pain, and how to find arthritis-friendly yoga classes in the UK.", date: "2026-02-16" },
  { slug: "osteoarthritis-symptoms-uk", title: "Osteoarthritis Symptoms & When to See Your GP", excerpt: "Recognise the early signs of osteoarthritis, understand UK treatment pathways, and learn when to seek NHS support.", date: "2026-02-15" },
  { slug: "arthritis-and-cycling-uk", title: "Cycling for Arthritis UK: Benefits, Tips and Getting Started Safely", excerpt: "Complete UK guide to cycling with arthritis. Benefits for knee and hip joints, choosing the right bike, e-bikes and safe riding tips.", date: "2026-02-14" },
  { slug: "arthritis-and-mental-health", title: "Arthritis and Mental Health: Managing the Emotional Impact", excerpt: "How arthritis affects mental health and what you can do. UK guide covering depression, anxiety, coping strategies and NHS support.", date: "2026-02-13" },
  { slug: "arthritis-supplements-uk", title: "Best Supplements for Arthritis in the UK", excerpt: "An evidence-based review of glucosamine, collagen, turmeric and omega-3 supplements available in the UK for joint health.", date: "2026-02-12" },
  { slug: "arthritis-and-omega-3-fish-oil", title: "Omega-3 and Fish Oil for Arthritis: A Complete Guide", excerpt: "Evidence-based guide to omega-3 fatty acids and fish oil for arthritis. Benefits, correct dosage, best food sources and supplement recommendations.", date: "2026-02-11" },
  { slug: "arthritis-medication-uk", title: "Understanding Arthritis Medication in the UK", excerpt: "A plain-English guide to prescription and over-the-counter arthritis medications available on the NHS and in UK pharmacies.", date: "2026-02-10" },
  { slug: "arthritis-and-weight-loss-uk", title: "Arthritis and Weight Loss UK: How Losing Weight Helps Your Joints", excerpt: "Evidence-based guide to weight loss for arthritis. How even modest weight loss dramatically reduces joint pain, with practical diet and exercise tips.", date: "2026-02-09" },
  { slug: "arthritis-and-work-uk", title: "Managing Arthritis at Work in the UK: Your Rights and Adjustments", excerpt: "Managing arthritis while working in the UK. Workplace adjustments, legal rights under the Equality Act and practical coping strategies.", date: "2026-02-08" },
  { slug: "rheumatoid-arthritis-diet-uk", title: "Best Diet for Rheumatoid Arthritis UK", excerpt: "Evidence-based dietary guide for rheumatoid arthritis. Anti-inflammatory foods, meal plans, foods to avoid and supplements for RA management.", date: "2026-02-07" },
  { slug: "knee-arthritis-exercises-uk", title: "Best Exercises for Knee Arthritis: UK Physiotherapy Guide", excerpt: "UK physiotherapist-approved exercises for knee arthritis. Strengthening, flexibility and aerobic exercises to reduce pain and improve mobility.", date: "2026-02-06" },
  { slug: "arthritis-pain-relief-natural", title: "Natural Pain Relief for Arthritis: Home Remedies That Work", excerpt: "Evidence-based natural pain relief methods. Heat therapy, turmeric, TENS machines and essential oils — what the research says.", date: "2026-02-05" },
  { slug: "arthritis-and-gardening-uk", title: "Gardening with Arthritis UK: Tips, Tools and Techniques", excerpt: "Complete UK guide to gardening with arthritis. Adaptive tools, raised bed techniques and joint-friendly planting for pain-free gardening.", date: "2026-02-04" },
  { slug: "hip-arthritis-symptoms-uk", title: "Hip Arthritis Symptoms UK: Signs, Diagnosis and Treatment", excerpt: "Recognise hip arthritis symptoms early. Signs of hip osteoarthritis, when to see your GP and NHS treatment options.", date: "2026-02-03" },
  { slug: "arthritis-and-pregnancy-uk", title: "Arthritis and Pregnancy UK: Managing Joint Pain Safely", excerpt: "UK guide to managing arthritis during pregnancy. Medication safety, RA remission, flare management and postnatal care.", date: "2026-02-02" },
  { slug: "glucosamine-vs-collagen-arthritis", title: "Glucosamine vs Collagen for Arthritis: Which Is Better?", excerpt: "Head-to-head comparison of glucosamine and collagen supplements. Evidence-based analysis of effectiveness, dosage and value for UK patients.", date: "2026-02-01" },
  { slug: "arthritis-fatigue-management", title: "Arthritis Fatigue: Why You're So Tired and How to Manage It", excerpt: "Understanding and managing arthritis fatigue. Evidence-based strategies for energy conservation, pacing and better sleep.", date: "2026-01-30" },
  { slug: "arthritis-diet-myths-debunked", title: "Arthritis Diet Myths Debunked: Fact vs Fiction", excerpt: "Debunking common arthritis diet myths with evidence. Cider vinegar, nightshades, alkaline diet — the truth about food and arthritis.", date: "2026-01-28" },
  { slug: "walking-aids-arthritis-uk", title: "Walking Aids and Gadgets for Arthritis UK", excerpt: "Complete UK guide to walking aids and daily living gadgets. Walking sticks, rollators, kitchen aids and dressing helpers.", date: "2026-01-26" },
  { slug: "juvenile-arthritis-uk", title: "Juvenile Arthritis UK: A Parent's Guide", excerpt: "Comprehensive UK guide to juvenile idiopathic arthritis. Symptoms in children, diagnosis, treatment and school support.", date: "2026-01-24" },
  { slug: "shoulder-arthritis-exercises-uk", title: "Shoulder Arthritis Exercises: UK Physiotherapy Guide", excerpt: "UK physiotherapist-approved exercises for shoulder arthritis. Range-of-motion, strengthening and stretching exercises for pain relief.", date: "2026-01-22" },
  { slug: "foot-and-ankle-arthritis-uk", title: "Foot and Ankle Arthritis UK: Symptoms, Exercises and Footwear", excerpt: "Complete UK guide to foot and ankle arthritis. Exercises, best shoes, orthotics and NHS treatment options.", date: "2026-01-20" },
  { slug: "tai-chi-for-arthritis-uk", title: "Tai Chi for Arthritis UK: A Beginner's Guide", excerpt: "Evidence-based guide to tai chi for arthritis. Benefits for balance, pain and mobility, and how to find UK classes.", date: "2026-01-18" },
  { slug: "anti-inflammatory-herbs-spices-arthritis", title: "Anti-Inflammatory Herbs and Spices for Arthritis", excerpt: "Evidence-based guide to ginger, cinnamon, garlic, rosemary and other anti-inflammatory herbs available in the UK.", date: "2026-01-16" },
  { slug: "staying-active-arthritis-winter-uk", title: "Staying Active with Arthritis in Winter UK", excerpt: "How to stay active during UK winters. Indoor exercise ideas, layering tips and motivation strategies for cold weather.", date: "2026-01-14" },
  { slug: "tens-machines-arthritis-uk", title: "TENS Machines for Arthritis UK: Do They Work?", excerpt: "Complete UK guide to TENS machines for arthritis pain. How they work, evidence, best devices and pad placement guide.", date: "2026-01-12" },
  { slug: "spinal-arthritis-back-pain-uk", title: "Spinal Arthritis and Back Pain UK: Self-Help Guide", excerpt: "UK guide to spinal arthritis. Spondylosis symptoms, exercises for spinal OA and when to see your GP about back stiffness.", date: "2026-01-10" },
  { slug: "gut-health-arthritis-connection", title: "Gut Health and Arthritis: The Microbiome Connection", excerpt: "How your gut microbiome affects joint inflammation. Best foods for gut health and practical steps to improve your gut.", date: "2026-01-08" },
  { slug: "hydrotherapy-arthritis-uk", title: "Hydrotherapy for Arthritis UK: Benefits and Access", excerpt: "Complete UK guide to hydrotherapy. Warm-water therapy benefits, finding NHS pools and what to expect in a session.", date: "2026-01-06" },
  { slug: "arthritis-meal-planning-uk", title: "Arthritis Meal Planning UK: Weekly Anti-Inflammatory Menus", excerpt: "Practical weekly meal plans for arthritis. Budget-friendly UK recipes following the Mediterranean diet for joint health.", date: "2026-01-04" },
  { slug: "mindfulness-meditation-chronic-pain", title: "Mindfulness and Meditation for Chronic Arthritis Pain", excerpt: "Evidence-based guide to mindfulness for arthritis pain. Techniques, UK courses and how meditation reduces chronic joint pain.", date: "2026-01-02" },
  { slug: "travelling-with-arthritis-uk", title: "Travelling with Arthritis UK: Tips for Comfortable Holidays", excerpt: "Complete UK guide to travelling with arthritis. Flight tips, travel insurance, accessible holidays and managing medication abroad.", date: "2025-12-28" },
];

const BlogIndex = () => (
  <>
    <Helmet>
      <title>Arthritis Blog UK – Joint Pain, Diet & Exercise Advice</title>
      <meta name="description" content="Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements, swimming, yoga, mental health and osteoarthritis management. Free guidance for people living with arthritis." />
      <meta name="keywords" content="arthritis blog UK, joint pain advice, NHS arthritis, anti-inflammatory diet UK, osteoarthritis exercises, arthritis help UK, joint pain diet, rheumatoid arthritis UK, swimming arthritis, yoga arthritis, turmeric arthritis, arthritis flare up" />
      <meta property="og:title" content="Arthritis Blog UK – Joint Pain, Diet & Exercise Advice" />
      <meta property="og:description" content="Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements and osteoarthritis management." />
      <meta property="og:locale" content="en_GB" />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/blog" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Arthritis Blog UK",
        "description": "Expert UK arthritis articles covering anti-inflammatory diet, NHS exercises, supplements and osteoarthritis management.",
        "url": "https://livingwitharthritis.org.uk/blog",
        "inLanguage": "en-GB",
        "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
        "about": { "@type": "MedicalCondition", "name": "Arthritis" },
        "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://livingwitharthritis.org.uk/blog" }
        ]
      })}</script>
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Arthritis Advice &amp; Guidance
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
          Evidence-based articles to help UK residents manage arthritis, reduce joint pain and live well.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-medium transition-all duration-300"
            >
              <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
              <h2 className="font-display text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default BlogIndex;
