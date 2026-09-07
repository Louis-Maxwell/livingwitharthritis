import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowRight, Globe, HandHeart, Users, Building2, Gift, Landmark, Receipt, Briefcase, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { gazaAppealHero } from "@/data/images";
import { trackDonationClick } from "@/lib/ga-events";
import StripeDonationModal from "@/components/StripeDonationModal";
import CharityRegBadge from "@/components/CharityRegBadge";
import { buildCharitySchema, injectJsonLd, type FAQItem } from "@/lib/jsonLd";
import { CHARITY } from "@/config/charity";
import FaqAccordion from "@/components/faq/FaqAccordion";

const PRESET_AMOUNTS = [50, 150, 200, 500];
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 100000;


const DONATION_OPTIONS = [
  {
    amount: "£25",
    impact: "Three guided sessions so someone in pain can start moving again this week",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£50",
    impact: "A personalised exercise plan and a virtual physio session for one person",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£150",
    impact: "A month of real-person help-chat replies for people stuck in a flare",
    color: "bg-primary/10 border-primary/20 text-primary dark:text-primary",
  },
  {
    amount: "£500",
    impact: "Keeps the free guides, exercises and diet plans online for the season ahead",
    color: "bg-primary/10 border-primary/20 text-primary",
  },
];

const WAYS_TO_GIVE = [
  {
    icon: Heart,
    title: "One-Off Donation",
    desc: "A one-off gift that keeps free arthritis support in reach for someone who needs it today",
    action: "Give once",
    href: "/donate#give",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Globe,
    title: "Zakat & Sadaqah",
    desc: "Give your Zakat or Sadaqah to our Palestine & Gaza rehabilitation appeal",
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
    href: "/donate#gift-aid",
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


const DONATE_FAQS: FAQItem[] = [
  {
    question: "Can I add Gift Aid to my donation?",
    answer:
      "Yes, if you are a UK taxpayer. Tick Gift Aid when you donate and we reclaim 25p from HMRC for every £1 you give, at no extra cost to you. A £100 gift becomes £125.",
  },
  {
    question: "What is your charity number?",
    answer:
      "Living With Arthritis is a registered charity in England and Wales, no. 1218461, serving people across the UK. We are independent of Arthritis UK.",
  },
  {
    question: "Should I donate here or through the Zakat appeal?",
    answer:
      "Use this page for a general donation that funds our free UK arthritis support. To give Zakat or Sadaqah, use the Palestine & Gaza rehabilitation appeal at /zakat-appeal.",
  },
];

export default function Donate() {
  useEffect(() => injectJsonLd("ld-charity-donate", buildCharitySchema()), []);
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
        <title>Donate to Living With Arthritis UK | Gift Aid CIO</title>
        <meta name="description" content={`Give to ${CHARITY.shortName} (CIO 1218461): your donation funds free UK arthritis exercises, diet guides and a real helpline. Gift Aid adds 25p for every £1 at no extra cost.`} />
        <meta name="keywords" content="donate to arthritis charity, arthritis charity, arthritis foundation, arthritis research, arthritis helpline, fundraising ideas for health charity, arthritis events, arthritis advocacy, financial help for arthritis patients, joint pain charity, arthritis support, arthritis awareness, volunteer for charity" />
      <meta property="og:title" content="Donate to Living With Arthritis UK | Gift Aid CIO" />
      <meta property="og:description" content={`Give to ${CHARITY.shortName} (CIO 1218461): your donation funds free UK arthritis exercises, diet guides and a real helpline. Gift Aid adds 25p for every £1 at no extra cost.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${CHARITY.siteUrl}/donate`} />
      <meta property="og:site_name" content={CHARITY.shortName} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={`${CHARITY.siteUrl}/og/landing-share.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Donate | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Donate to Living With Arthritis UK | Gift Aid CIO" />
      <meta name="twitter:description" content={`Give to ${CHARITY.shortName} (CIO 1218461): your donation funds free UK arthritis exercises, diet guides and a real helpline. Gift Aid adds 25p for every £1 at no extra cost.`} />
      <meta name="twitter:image" content={`${CHARITY.siteUrl}/og/landing-share.png`} />
    </Helmet>
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero — story first, then the ask */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b border-border/20">
          <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-4 h-4 text-primary fill-primary/20" />
              <span className="text-xs font-bold text-primary tracking-wider uppercase">Help someone move again</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
              Give so someone with arthritis can walk, work, and hold the people they love
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              When our founder, Louis Maxwell, was 28, a GP handed him a sheet of home exercises and nothing else. No plan. No follow-up. That gap is why this charity exists.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Your gift keeps free, clinician-reviewed exercises, diet guidance and a real person on the end of the phone — for a neighbour in the UK living with joint pain, and for survivors who need rehabilitation after war injuries.
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

        {/* Urgent appeal: Palestine & Gaza */}
        <section className="container mx-auto px-6 md:px-10 pt-12 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-foreground">
            <img
              src={gazaAppealHero}
              alt="Hands held together in solidarity, symbolising support for families in Palestine"
              width={1600}
              height={700}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
            <div className="relative p-8 md:p-12 max-w-2xl">
              <p className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
                Urgent appeal
              </p>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Palestine & Gaza: fund rehabilitation for war survivors
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/90 leading-relaxed">
                Give your Zakat or Sadaqah to fund physiotherapy and pain care for
                people living with crushed joints and amputations in Gaza.
                Shariah-compliant and scholar-guided.
              </p>
              <Link
                to="/zakat-appeal"
                onClick={() => trackDonationClick({ source: "donate_page_gaza_card" })}
                className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Give to the appeal <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>



        {/* Donation Widget */}
        <section id="give" className="container mx-auto px-6 md:px-10 py-16 max-w-3xl scroll-mt-24">
          <h2 className="text-2xl font-bold text-foreground text-center mb-3">Choose what you can give</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            One-time or monthly. Gift Aid adds 25p in every £1 from UK taxpayers, at no extra cost to you.
          </p>

          <div className="bg-card rounded-2xl border border-border/40 p-4 sm:p-8 shadow-sm max-w-full overflow-x-hidden">
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
              Secured by Stripe · 256-bit encryption{isMonthly ? " · Cancel anytime" : ""} · Gift Aid eligible
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6 max-w-xl mx-auto leading-relaxed">
            Living With Arthritis is a registered charity in England and Wales (no. {CHARITY.number}).
            Card fees are taken by Stripe. What we receive funds free UK arthritis support and,
            if you choose the Zakat appeal, rehabilitation for people living with war injuries.
          </p>
        </section>

        {/* Impact Cards */}
        <section className="container mx-auto px-6 md:px-10 pb-16 max-w-5xl">
          <h2 className="text-2xl font-bold text-foreground text-center mb-3">What your gift does</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">Not a slogan. A real unit of care for one person.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DONATION_OPTIONS.map((opt) => (
              <div key={opt.amount} className={`rounded-2xl border p-6 text-center ${opt.color}`}>
                <span className="text-3xl font-extrabold">{opt.amount}</span>
                <p className="text-sm mt-3 leading-relaxed opacity-90">{opt.impact}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-4">Illustrative units of care based on typical session and programme costs. Not a guarantee of a named recipient.</p>
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
        <section id="gift-aid" className="container mx-auto px-6 md:px-10 py-16 max-w-5xl scroll-mt-24">
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
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-3 rounded-full bg-background border border-primary/40">
              <span className="text-sm font-semibold text-primary">
                🎁 A £100 donation becomes £125 with Gift Aid
              </span>
            </div>
          </div>
        </section>
        <section id="donate-faq" className="container mx-auto px-6 md:px-10 pb-16 max-w-3xl" aria-labelledby="donate-faq-heading">
          <h2 id="donate-faq-heading" className="text-2xl font-bold text-foreground mb-6 text-center">Donation FAQs</h2>
          <FaqAccordion idPrefix="donate-faq" items={DONATE_FAQS} />
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