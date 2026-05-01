import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Globe, HandHeart, Users, Building2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MedicallyReviewed from "@/components/ui/MedicallyReviewed";

const DONATION_OPTIONS = [
  {
    amount: "£10",
    impact: "Sends one personalised exercise plan to a newly diagnosed patient",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£25",
    impact: "Funds three guided virtual physiotherapy sessions for someone on an NHS waiting list",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£50",
    impact: "Keeps our clinician-reviewed AI assistant answering questions for a full week",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£100",
    impact: "Keeps the entire platform free for 500 people for one month",
    color: "bg-primary/10 border-primary/20 text-primary",
  },
];

const WAYS_TO_GIVE = [
  {
    icon: Heart,
    title: "Single donation",
    desc: "A one-off gift. Any amount. Goes straight into clinician hours, content review and platform costs.",
    action: "Donate now",
    href: "/zakat-appeal",
    color: "text-rose-600 bg-rose-500/10",
  },
  {
    icon: Globe,
    title: "Zakat appeal",
    desc: "Eligible to give Zakat? Direct it to joint-health support and rehabilitation for those in need.",
    action: "Give Zakat",
    href: "/zakat-appeal",
    color: "text-primary bg-primary/10",
  },
  {
    icon: HandHeart,
    title: "Fundraise for us",
    desc: "Run, bake, cycle, swim, sit-stand-30-times. Any challenge — we'll set you up with a page and resources.",
    action: "Start fundraising",
    href: "/ways-to-help",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Building2,
    title: "Workplace giving",
    desc: "Match employee donations, sponsor a programme, or pick us as your charity of the year.",
    action: "Talk to us",
    href: "/corporate-giving",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Gift,
    title: "Gift Aid",
    desc: "If you pay UK income tax, every £1 you give becomes £1.25 — at no cost to you. Just tick the box.",
    action: "How it works",
    href: "/zakat-appeal",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Users,
    title: "Volunteer",
    desc: "Clinical reviewer, peer moderator, content writer, translator. Two hours a month genuinely helps.",
    action: "Get involved",
    href: "/ways-to-help",
    color: "text-primary bg-primary/10",
  },
];

export default function Donate() {
  const navigate = useNavigate();

  const SITE_URL = "https://livingwitharthritis.org.uk";
  const PAGE_URL = `${SITE_URL}/donate`;
  const OG_IMAGE = `${SITE_URL}/images/hero-community.jpg`;

  const schemaWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Donate to Living With Arthritis UK",
    description: "Donate to fund free virtual physiotherapy, anti-inflammatory diet plans and AI-guided arthritis support for people across the UK.",
    url: PAGE_URL,
    inLanguage: "en-GB",
    isPartOf: { "@type": "WebSite", name: "Living With Arthritis UK", url: SITE_URL },
    potentialAction: {
      "@type": "DonateAction",
      name: "Donate",
      target: PAGE_URL,
      recipient: { "@type": "NGO", name: "Living With Arthritis UK", url: SITE_URL },
    },
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Donate", item: PAGE_URL },
    ],
  };

  const schemaFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is my donation eligible for Gift Aid?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. UK taxpayers can boost donations by 25% at no extra cost by ticking the Gift Aid box during checkout." },
      },
      {
        "@type": "Question",
        name: "How is my donation used?",
        acceptedAnswer: { "@type": "Answer", text: "Donations fund free virtual physiotherapy, AI-guided support, anti-inflammatory diet plans and community programmes for over 10,000 people in the UK living with arthritis." },
      },
      {
        "@type": "Question",
        name: "Can I set up a monthly recurring donation?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. You can choose a monthly recurring gift on the donation form. Recurring support helps us plan services for the long term." },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <html lang="en-GB" />
        <title>Donate to Arthritis Support UK: Fund Free Physio, Diet & AI Help</title>
        <meta name="description" content="Donate to Living With Arthritis UK and fund free virtual physiotherapy, anti-inflammatory diet plans and AI support for over 10,000 people with arthritis." />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-GB" href={PAGE_URL} />
        <meta name="geo.region" content="GB" />

        <meta property="og:title" content="Donate to Living With Arthritis UK — Free Support for All" />
        <meta property="og:description" content="Fund free virtual physiotherapy, diet plans and AI support for over 10,000 people in the UK living with arthritis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Living With Arthritis UK community" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Donate to Living With Arthritis UK" />
        <meta name="twitter:description" content="Fund free arthritis support — physiotherapy, diet plans and AI help for the UK." />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(schemaWebPage)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
      </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-rose-500/5 border-b border-border/20">
          <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-xs font-bold text-primary tracking-wider uppercase">Every Donation Matters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
              Help us keep arthritis support{" "}
              <span className="text-gradient italic">free for everyone</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Your generosity funds free virtual physiotherapy, evidence-based diet plans, AI health support and community programmes for over 10,000 people across the UK living with arthritis.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/zakat-appeal")}
              className="btn-primary-cta px-10 h-14 rounded-full text-sm font-bold tracking-wide group"
            >
              <Heart className="w-5 h-5 mr-2 fill-current/20 group-hover:scale-110 transition-transform" />
              Donate Now
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Button>
          </div>
        </section>

        {/* Impact Cards */}
        <section className="container mx-auto px-6 md:px-10 py-16 max-w-5xl">
          <h2 className="text-2xl font-bold text-foreground text-center mb-3">Your Impact</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">See exactly how your donation helps people living with arthritis across the UK.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DONATION_OPTIONS.map((opt) => (
              <div key={opt.amount} className={`rounded-2xl border p-6 text-center ${opt.color}`}>
                <span className="text-3xl font-extrabold">{opt.amount}</span>
                <p className="text-sm mt-3 leading-relaxed opacity-90">{opt.impact}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center mt-4">Impact estimates based on average programme costs, 2024–2025.</p>
        </section>

        {/* Ways to Give */}
        <section className="bg-muted/30 border-y border-border/20">
          <div className="container mx-auto px-6 md:px-10 py-16 max-w-5xl">
            <h2 className="text-2xl font-bold text-foreground text-center mb-3">Ways to Give</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">Whether it's a one-off gift, regular giving, or your time — every contribution makes a difference.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WAYS_TO_GIVE.map((way) => {
                const Icon = way.icon;
                return (
                  <div key={way.title} className="bg-background rounded-2xl border border-border/30 p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className={`w-11 h-11 rounded-xl ${way.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{way.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{way.desc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(way.href)}
                      className="rounded-full text-xs font-semibold"
                    >
                      {way.action}
                      <ArrowRight className="w-3 h-3 ml-1.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tax-Efficient Giving */}
        <section className="container mx-auto px-6 md:px-10 py-16 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Tax-Efficient Giving</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If you're a UK taxpayer, Gift Aid allows us to claim an extra 25p for every £1 you donate — at no extra cost to you. Simply tick the Gift Aid box when you donate. For higher-rate taxpayers, you can also claim additional tax relief through your Self Assessment.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-semibold text-primary dark:text-primary">
              🎁 A £100 donation becomes £125 with Gift Aid
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}