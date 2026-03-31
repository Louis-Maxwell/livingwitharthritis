import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Globe, HandHeart, Users, Building2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DONATION_OPTIONS = [
  {
    amount: "£10",
    impact: "Provides a personalised exercise plan for one patient",
    color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400",
  },
  {
    amount: "£25",
    impact: "Funds 3 guided virtual physiotherapy sessions",
    color: "bg-sky-500/10 border-sky-500/20 text-sky-700 dark:text-sky-400",
  },
  {
    amount: "£50",
    impact: "Supports our AI health assistant for a week",
    color: "bg-violet-500/10 border-violet-500/20 text-violet-700 dark:text-violet-400",
  },
  {
    amount: "£100",
    impact: "Keeps our platform free for 500 users for one month",
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
    color: "text-amber-600 bg-amber-500/10",
  },
  {
    icon: HandHeart,
    title: "Fundraise for Us",
    desc: "Run, bake, cycle or create your own fundraising event",
    action: "Start Fundraising",
    href: "/ways-to-help",
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    icon: Building2,
    title: "Corporate Giving",
    desc: "Partner with us through workplace giving or sponsorship",
    action: "Learn More",
    href: "/corporate-giving",
    color: "text-sky-600 bg-sky-500/10",
  },
  {
    icon: Gift,
    title: "Gift Aid",
    desc: "UK taxpayers can boost their donation by 25% at no extra cost",
    action: "Learn More",
    href: "/zakat-appeal",
    color: "text-violet-600 bg-violet-500/10",
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
        <title>Donate | Living With Arthritis UK</title>
        <meta name="description" content="Support Living With Arthritis UK with a donation. Every pound helps us provide free physiotherapy, diet plans and support to people across the UK living with arthritis." />
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
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              🎁 A £100 donation becomes £125 with Gift Aid
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}