import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Globe, HandHeart, Users, Building2, Gift, Landmark, Receipt, Briefcase, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import StripeDonationModal from "@/components/StripeDonationModal";
import CharityRegBadge from "@/components/CharityRegBadge";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import { buildCharitySchema, injectJsonLd } from "@/lib/jsonLd";
import { CHARITY } from "@/config/charity";

const PRESET_AMOUNTS = [50, 150, 200, 500];
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 100000;


const DONATION_OPTIONS = [
  {
    amount: "£50",
    impact: "Funds a personalised exercise plan and a virtual physio session",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£150",
    impact: "Supports our help chat for a full month",
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
    href: "#give",
    color: "text-primary bg-primary/10",
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
    action: "Learn about corporate giving",
    href: "/corporate-giving",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Gift,
    title: "Gift Aid",
    desc: "UK taxpayers can boost their donation by 25% at no extra cost",
    action: "Learn about Gift Aid",
    href: "#gift-aid",
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
  useEffect(() => injectJsonLd("ld-charity-donate", buildCharitySchema()), []);
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(timer);
  }, []);
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customNum = Number(customAmount);
  const isCustomValid =
    customAmount !== "" &&
    Number.isFinite(customNum) &&
    customNum >= MIN_AMOUNT &&
    customNum <= MAX_AMOUNT;
  const activeAmount = customAmount !== "" ? (isCustomValid ? customNum : 0) : selectedAmount;
  const canDonate = activeAmount >= MIN_AMOUNT && activeAmount <= MAX_AMOUNT;
  const isMonthly = frequency === "monthly";

  const scrollToGive = () => {
    document.getElementById("give")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>Donate to {CHARITY.shortName}</title>
        <link rel="canonical" href={`${CHARITY.siteUrl}/donate`} />
        <meta name="description" content={`Support ${CHARITY.shortName}: Donate to fund free arthritis education, research & community support. Help others manage arthritis better.`} />
        <meta name="keywords" content="donate to arthritis charity, arthritis charity, arthritis foundation, arthritis research, arthritis helpline, fundraising ideas for health charity, arthritis events, arthritis advocacy, financial help for arthritis patients, joint pain charity, arthritis support, arthritis awareness, volunteer for charity" />
      <meta property="og:title" content={`Donate to ${CHARITY.shortName}`} />
      <meta property="og:description" content={`Support ${CHARITY.shortName}: Donate to fund free arthritis education, research & community support. Help others manage arthritis better.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${CHARITY.siteUrl}/donate`} />
      <meta property="og:site_name" content={CHARITY.shortName} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Donate | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Donate to ${CHARITY.shortName}`} />
      <meta name="twitter:description" content={`Support ${CHARITY.shortName}: Donate to fund free arthritis education, research & community support. Help others manage arthritis better.`} />
      <meta name="twitter:image" content={`${CHARITY.siteUrl}/images/hero-walking-group-1600.webp`} />
    </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b border-border/20">
          <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-xs font-bold text-primary tracking-wider uppercase">Every Donation Matters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
              Help us keep arthritis support{" "}
              <span className="text-gradient italic">free for everyone</span>
            </h1>
            <AeoEnhancement route="/donate" />
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Your generosity funds free virtual physiotherapy, evidence-based diet plans, online health support and community programmes for people across the UK living with arthritis.
            </p>
            <Button
              size="lg"
              onClick={scrollToGive}
              className="btn-primary-cta px-10 h-14 rounded-full text-sm font-bold tracking-wide group"
            >
              <Heart className="w-5 h-5 mr-2 fill-current/20 group-hover:scale-110 transition-transform" />
              Donate Now
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Button>
          </div>
        </section>

        {/* Donation Widget */}
        <section id="give" className="container mx-auto px-6 md:px-10 py-16 max-w-3xl scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground text-center mb-3">Make a Donation</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Choose a one-time gift or set up monthly giving. Every contribution funds free arthritis support.
          </p>

          <div className="bg-card rounded-2xl border border-border/40 p-6 sm:p-8 shadow-sm">
            {/* Frequency toggle */}
            <div
              role="radiogroup"
              aria-label="Donation frequency"
              className="grid grid-cols-2 gap-1 p-1 bg-muted/50 rounded-full mb-6"
            >
              {(["one-time", "monthly"] as const).map((f) => {
                const active = frequency === f;
                const Icon = f === "monthly" ? RefreshCw : Heart;
                return (
                  <button
                    key={f}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setFrequency(f)}
                    className={`inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold transition-all ${
                      active
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {f === "one-time" ? "One-time" : "Monthly"}
                  </button>
                );
              })}
            </div>

            {/* Amount picker */}
            <label className="block text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
              Amount {isMonthly && <span className="text-primary">(per month)</span>}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {PRESET_AMOUNTS.map((amt) => {
                const active = customAmount === "" && selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    aria-pressed={active}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`h-12 rounded-xl border-2 text-base font-bold transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    £{amt}
                  </button>
                );
              })}
            </div>

            {/* Custom amount */}
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">£</span>
              <Input
                type="number"
                inputMode="decimal"
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                placeholder="Other amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="pl-9 h-12 rounded-xl"
                aria-label="Custom donation amount in pounds"
              />
            </div>

            {customAmount !== "" && !isCustomValid && (
              <p className="text-xs text-destructive mb-3" role="alert">
                Please enter an amount between £{MIN_AMOUNT} and £{MAX_AMOUNT.toLocaleString()}.
              </p>
            )}

            {isMonthly && canDonate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 px-1">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  £{activeAmount.toLocaleString()} / month ·{" "}
                  <strong className="text-foreground">£{(activeAmount * 12).toLocaleString()}</strong> over a year
                </span>
              </div>
            )}

            <Button
              size="lg"
              disabled={!canDonate}
              onClick={() => setIsModalOpen(true)}
              className="btn-primary-cta w-full h-14 rounded-full text-sm font-bold tracking-wide group"
            >
              <Heart className="w-5 h-5 mr-2 fill-current/20" />
              {isMonthly ? `Give £${activeAmount || 0} / month` : `Donate £${activeAmount || 0}`}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
            </Button>

            <p className="text-[11px] text-muted-foreground text-center mt-4">
              Secured by Stripe · 256-bit encryption{isMonthly ? " · Cancel anytime" : ""}
            </p>
          </div>
        </section>

        {/* Impact Cards */}
        <section className="container mx-auto px-6 md:px-10 pb-16 max-w-5xl">
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
          <p className="text-[10px] text-muted-foreground text-center mt-4">Impact estimates based on average programme costs, 2024–2025.</p>
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
                      onClick={() => {
                        if (way.href.startsWith("#")) {
                          document
                            .getElementById(way.href.slice(1))
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          return;
                        }
                        navigate(way.href);
                      }}
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
          <div className="mb-10 max-w-3xl mx-auto">
            <CharityRegBadge variant="card" />
          </div>
          <div className="text-center mb-10">

            <h2 className="text-2xl font-bold text-foreground mb-3">Tax-Efficient Giving</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Make your donation go further. UK taxpayers have several ways to give that increase your impact at no extra cost.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div id="gift-aid" className="bg-card rounded-2xl border border-border/30 p-6 scroll-mt-24">
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
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-full bg-background border border-primary/40">
              <span className="text-sm font-semibold text-primary">
                🎁 A £100 donation becomes £125 with Gift Aid
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StripeDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={activeAmount}
        currency="GBP"
        fundType="general"
        recurring={isMonthly}
      />
    </>
  );
}