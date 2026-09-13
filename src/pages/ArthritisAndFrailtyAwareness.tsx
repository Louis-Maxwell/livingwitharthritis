import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ShieldCheck, Activity, Users, Bone, Footprints } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextReadStrip from "@/components/NextReadStrip";
import InternalLinks from "@/components/InternalLinks";
import { CHARITY } from "@/config/charity";
import { buildCharitySchema } from "@/lib/jsonLd";

const focusAreas = [
  { icon: Heart, title: "Arthritis awareness", text: "Clear, evidence-based information to help people understand common types of arthritis, symptoms, treatment options and day-to-day self-management." },
  { icon: ShieldCheck, title: "Frailty awareness and prevention", text: "Practical education about frailty, strength, muscle health and the steps that can help people maintain resilience and independence as they age." },
  { icon: Footprints, title: "Falls prevention", text: "Resources focused on mobility, balance, strength and safer everyday movement, particularly where arthritis and frailty can overlap." },
  { icon: Activity, title: "Mobility and independence", text: "Exercise, movement and practical guidance designed to help people remain active and make informed decisions about their health." },
  { icon: Bone, title: "Healthy ageing", text: "Information connecting joint health, bone health, nutrition, physical activity and muscle health in a practical UK context." },
  { icon: Users, title: "Support and self-management", text: "Free guides and signposting that help people understand their options and prepare for conversations with healthcare professionals." },
];

const conditions = [
  ["Osteoarthritis", "/conditions/osteoarthritis"],
  ["Rheumatoid arthritis", "/conditions/rheumatoid-arthritis"],
  ["Psoriatic arthritis", "/conditions/psoriatic-arthritis"],
  ["Gout", "/conditions/gout"],
  ["Knee arthritis", "/conditions/knee-arthritis"],
  ["Hip arthritis", "/conditions/hip-arthritis"],
  ["Juvenile arthritis", "/conditions/juvenile-arthritis"],
  ["Fibromyalgia", "/conditions/fibromyalgia"],
] as const;

export default function ArthritisAndFrailtyAwareness() {
  const organization = buildCharitySchema();

  return (
    <>
      <Helmet>
        <title>Arthritis &amp; Frailty Awareness | Living With Arthritis UK</title>
        <meta name="description" content="Living With Arthritis is a UK registered charity working to improve awareness and understanding of arthritis and frailty through free, evidence-based information and practical resources." />
        <link rel="canonical" href={`${CHARITY.siteUrl}/arthritis-and-frailty-awareness`} />
        <link rel="alternate" hrefLang="en-GB" href={`${CHARITY.siteUrl}/arthritis-and-frailty-awareness`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${CHARITY.siteUrl}/arthritis-and-frailty-awareness`} />
        <meta property="og:title" content="Arthritis & Frailty Awareness | Living With Arthritis UK" />
        <meta property="og:description" content="Our charity's work to improve awareness and understanding of arthritis and frailty, with free evidence-based information and practical resources." />
        <meta property="og:site_name" content={CHARITY.shortName} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Arthritis & Frailty Awareness",
          url: `${CHARITY.siteUrl}/arthritis-and-frailty-awareness`,
          inLanguage: "en-GB",
          description: "Living With Arthritis charity work to improve awareness and understanding of arthritis and frailty.",
          about: [
            { "@type": "Thing", name: "Arthritis" },
            { "@type": "Thing", name: "Frailty" },
            { "@type": "Thing", name: "Frailty prevention" },
            { "@type": "Thing", name: "Falls prevention" },
            { "@type": "Thing", name: "Healthy ageing" },
          ],
          publisher: organization,
          mainEntity: organization,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${CHARITY.siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "About", item: `${CHARITY.siteUrl}/about` },
            { "@type": "ListItem", position: 3, name: "Arthritis & Frailty Awareness", item: `${CHARITY.siteUrl}/arthritis-and-frailty-awareness` },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main id="main-content" className="container mx-auto max-w-6xl px-5 sm:px-8 py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link><span className="mx-2">/</span>
            <Link to="/about" className="hover:text-primary">About</Link><span className="mx-2">/</span>
            <span aria-current="page">Arthritis &amp; Frailty Awareness</span>
          </nav>

          <header className="max-w-4xl mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">Our charitable mission</p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Arthritis &amp; Frailty Awareness
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Living With Arthritis is a registered charity in England and Wales (no. {CHARITY.number}) working to improve awareness and understanding of arthritis and frailty.
            </p>
            <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">
              We provide free, evidence-based information and practical resources to help people stay informed, active, independent and supported. Our work recognises that arthritis, reduced mobility, muscle loss, falls and frailty can affect one another, especially as people get older.
            </p>
          </header>

          <section aria-labelledby="what-we-do" className="mb-16">
            <h2 id="what-we-do" className="text-3xl md:text-4xl font-bold mb-4">What our charity works on</h2>
            <p className="max-w-3xl text-muted-foreground leading-relaxed mb-8">
              Our focus is public awareness, education and practical support. We do not replace a person's own healthcare team. Instead, we make trustworthy information easier to understand and use.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {focusAreas.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-2xl border border-border/50 bg-card p-6">
                  <Icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="arthritis-frailty-link" className="rounded-3xl border border-primary/20 bg-primary/5 p-7 md:p-10 mb-16">
            <h2 id="arthritis-frailty-link" className="text-3xl font-bold mb-4">Why arthritis and frailty belong together</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl">
              Arthritis can make movement painful or difficult. Reduced activity can contribute to loss of strength and muscle, while frailty can increase vulnerability to falls, illness and loss of independence. These relationships are not inevitable, and the right support can help people maintain activity, strength, confidence and independence. Our resources explore these topics without suggesting that everyone with arthritis is frail or that frailty is simply a normal part of ageing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/guides/frailty-management" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Frailty management guide <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/guides/fall-prevention-older-adults" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Falls prevention <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/guides/sarcopenia-muscle-control" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Strength and muscle health <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </section>

          <section aria-labelledby="conditions" className="mb-16">
            <h2 id="conditions" className="text-3xl font-bold mb-4">Explore arthritis conditions</h2>
            <p className="text-muted-foreground mb-6">Our charity's awareness work covers a range of arthritis and related conditions.</p>
            <div className="flex flex-wrap gap-3">
              {conditions.map(([label, href]) => (
                <Link key={href} to={href} className="rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary transition-colors">{label}</Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="trust" className="border-t border-border pt-10">
            <h2 id="trust" className="text-2xl font-bold mb-3">About Living With Arthritis</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Living With Arthritis is an independent Charitable Incorporated Organisation in England and Wales. Charity number {CHARITY.number}. We publish free information for a UK audience and aim to make health information accessible, practical and evidence-based.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link to="/about" className="text-sm font-bold text-primary hover:underline">About the charity</Link>
              <Link to="/governance" className="text-sm font-bold text-primary hover:underline">Governance</Link>
              <Link to="/editorial-standards" className="text-sm font-bold text-primary hover:underline">Editorial standards</Link>
              <Link to="/trust" className="text-sm font-bold text-primary hover:underline">Our trust and evidence</Link>
            </div>
          </section>
        </main>
        <InternalLinks />
        <NextReadStrip currentPath="/arthritis-and-frailty-awareness" />
        <Footer />
      </div>
    </>
  );
}
