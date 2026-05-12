import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Globe, HandHeart, Users, Building2, Gift, Landmark, Receipt, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const DONATION_OPTIONS = [
  {
    amount: "£50",
    impact: "Funds a personalised exercise plan and a virtual physio session",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£150",
    impact: "Supports our AI health assistant for a full month",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£200",
    impact: "Keeps the platform free for 1,000 users for a month",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£500",
    impact: "Powers a full quarter of patient guidance content",
    color: "bg-primary/10 border-primary/20 text-primary",
  },
];

const WAYS_TO_GIVE = [
  {
    icon: Heart,
    title: "One-Off Donation",
    desc: "Make a single gift to support our work",
    action: "Donate Now",
    href: "/zakat-appeal",
    color: "text-rose-600 bg-rose-500/10",
  },
  {
    icon: Globe,
    title: "Zakat Appeal",
    desc: "Give your Zakat to joint health research and support",
    action: "Give Zakat",
    href: "/zakat-appeal",
    color: "text-primary bg-primary/10",
  },
  {
    icon: HandHeart,
    title: "Fundraise for Us",
    desc: "Run, bake, cycle or create your own fundraising event",
    action: "Start Fundraising",
    href: "/ways-to-help",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Building2,
    title: "Corporate Giving",
    desc: "Partner with us through workplace giving or sponsorship",
    action: "Learn More",
    href: "/corporate-giving",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Gift,
    title: "Gift Aid",
    desc: "UK taxpayers can boost their donation by 25% at no extra cost",
    action: "Learn More",
    href: "/zakat-appeal",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Users,
    title: "Volunteer",
    desc: "Give your time and skills to help people with arthritis",
    action: "Get Involved",
    href: "/ways-to-help",
    color: "text-primary bg-primary/10",
  },
];

export default function Donate() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Donate to Arthritis Support UK: Fund Free Physio, Diet & AI Help</title>
        <meta name="description" content="Donate to Living With Arthritis UK and fund free virtual physiotherapy, anti-inflammatory diet plans and AI support for over 10,000 people with arthritis." />
        <meta name="keywords" content="donate to arthritis charity, arthritis charity, arthritis foundation, arthritis research, arthritis helpline, fundraising ideas for health charity, arthritis events, arthritis advocacy, financial help for arthritis patients, joint pain charity, arthritis support, arthritis awareness, volunteer for charity" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/donate" />
      <meta property="og:title" content="Donate to Arthritis Support UK: Fund Free Physio, Diet & AI Help" />
      <meta property="og:description" content="Donate to Living With Arthritis UK and fund free virtual physiotherapy, anti-inflammatory diet plans and AI support for over 10,000 people with arthritis." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/donate" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Donate to Arthritis Support UK: Fund Free Physio, Diet & AI Help" />
      <meta name="twitter:description" content="Donate to Living With Arthritis UK and fund free virtual physiotherapy, anti-inflammatory diet plans and AI support for over 10,000 people with arthritis." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
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
        <section className="container mx-auto px-6 md:px-10 py-16 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-3">Tax-Efficient Giving</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Make your donation go further. UK taxpayers have several ways to give that increase your impact at no extra cost.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Gift Aid (+25%)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tick one box and we reclaim 25p for every £1 you donate from HMRC — at no cost to you. A £100 gift becomes £125.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Higher-Rate Relief</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                40% and 45% taxpayers can claim back the difference through Self Assessment — up to £31.25 back on a £100 gift.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Payroll Giving</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Donate directly from your salary before tax — your employer's scheme makes giving simple and even more tax-efficient.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Legacy Gifts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gifts in your Will are exempt from Inheritance Tax and can reduce the rate on the rest of your estate from 40% to 36%.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Shares & Securities</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Donating qualifying shares gives you both Income Tax relief on the value and exemption from Capital Gains Tax.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border/30 p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Zakat</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fulfil your Zakat through our Shariah-compliant appeal, funding rehabilitation for those most in need.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary">
                🎁 A £100 donation becomes £125 with Gift Aid
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}