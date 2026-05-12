import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Star,
  Shield,
  HandHeart,
  ChevronDown,
  CheckCircle2,
  Users,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StripeDonationModal from "@/components/StripeDonationModal";
import { zakatAppealHero as zakatHeroImg } from "@/data/images";
import ZakatCalculator from "@/components/ZakatCalculator";

const ZAKAT_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const AMOUNT_DESCRIPTIONS: Record<number, string> = {
  25: "Could fund 3 guided physiotherapy sessions for a trauma survivor",
  50: "Could provide a pain management consultation and personalised exercise plan",
  100: "Could fund a week of rehabilitation sessions for someone recovering from war injuries",
  250: "Could fund a month of guided rehab exercises and pain management support",
  500: "Could sponsor a complete 8-week rehabilitation programme for an individual",
  1000: "Could fund a comprehensive 3-month rehab and mental health recovery programme",
};

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Shariah Compliant",
    desc: "All Zakat funds are managed in full accordance with Islamic principles, verified by qualified scholars.",
  },
  {
    icon: Star,
    title: "Full Transparency",
    desc: "Every penny is accounted for with clear reporting so you can see exactly how your contribution is used.",
  },
  {
    icon: HandHeart,
    title: "Direct Impact",
    desc: "Your Zakat directly supports war and trauma survivors who need physiotherapy and rehabilitation most.",
  },
  {
    icon: Heart,
    title: "Trusted Stewardship",
    desc: "We treat your Zakat with the responsibility, care, and trust that this sacred duty deserves.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is my Zakat eligible to fund rehabilitation?",
    a: "Yes. Zakat can be given to those in genuine need (the poor and needy — al-fuqara and al-masakin). War and trauma survivors who cannot afford rehabilitation fall under these categories. Our Zakat distribution is overseen by qualified Islamic scholars.",
  },
  {
    q: "How do I know my Zakat is Shariah-compliant?",
    a: "Our Zakat programme is guided by qualified scholars who verify that all funds are distributed in accordance with Islamic principles. We maintain strict separation of Zakat and non-Zakat funds.",
  },
  {
    q: "Can I claim Gift Aid on my Zakat?",
    a: "Yes! If you are a UK taxpayer, we can claim an extra 25p for every £1 you donate through Gift Aid at no extra cost to you. This means a £100 donation becomes £125 for our beneficiaries.",
  },
  {
    q: "How is my donation used?",
    a: "100% of your Zakat goes directly to funding physiotherapy and rehabilitation sessions for eligible individuals. Administrative costs are covered by separate general funds, not Zakat.",
  },
  {
    q: "Can I set up a recurring Zakat payment?",
    a: "Zakat is given as a one-off annual obligation, so we keep this page single-payment only. If you'd like to support our wider work every month, you can set up monthly giving on our main donate page.",
  },
];

const ZakatAppeal = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
  const description = customAmount
    ? "Your generous contribution will make a meaningful difference"
    : AMOUNT_DESCRIPTIONS[selectedAmount] || "";

  const handleDonate = () => {
    if (activeAmount > 0) setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Zakat Appeal – Fund Rehab for War & Trauma Survivors | Living With Arthritis UK</title>
        <meta name="description" content="Give your Zakat to fund physiotherapy and rehabilitation sessions for war and trauma survivors. Shariah-compliant, transparent and life-changing." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/zakat-appeal" />
        <meta property="og:title" content="Zakat Appeal – Fund Rehab for War & Trauma Survivors" />
        <meta property="og:description" content="Your Zakat could fund life-changing physiotherapy for someone recovering from war injuries. Shariah-compliant. 100% transparent." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/zakat-appeal" />
        <meta property="og:locale" content="en_GB" />
        <meta name="keywords" content="zakat donation UK, zakat arthritis, zakat rehab, zakat war survivors, Islamic charity UK, zakat physiotherapy, shariah compliant charity" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DonateAction",
          "name": "Zakat Appeal – Rehabilitation for War & Trauma Survivors",
          "description": "Fund physiotherapy and rehabilitation sessions for individuals recovering from war and trauma injuries.",
          "recipient": { "@type": "Organization", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "price": "100",
          "priceCurrency": "GBP",
        })}</script>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Zakat Appeal – Fund Rehab for War & Trauma Survivors | Living With Arthritis UK" />
      <meta name="twitter:description" content="Give your Zakat to fund physiotherapy and rehabilitation sessions for war and trauma survivors. Shariah-compliant, transparent and life-changing." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.jpg" />
    </Helmet>

      <Header />

      <main className="bg-background">
        {/* Hero split section */}
        <section className="container mx-auto px-4 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* Left: image + educational content */}
            <div className="animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={zakatHeroImg}
                  alt="Hands raised in prayer at sunrise symbolising charity and hope"
                  className="w-full h-auto object-cover"
                  loading="eager"
                  decoding="async"
                  width={720}
                  height={480}
                  srcSet={`${zakatHeroImg.split("?")[0]}?w=640&q=80&auto=format 640w, ${zakatHeroImg.split("?")[0]}?w=800&q=80&auto=format 800w, ${zakatHeroImg.split("?")[0]}?w=1200&q=80&auto=format 1200w`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="mt-8 space-y-5">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                  Zakat — Rebuilding Lives After War & Trauma
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Zakat is one of the five fundamental pillars of Islam — an act of worship through giving that purifies wealth and draws the believer closer to Allah. The obligation applies to 2.5% of qualifying savings and assets held for a full lunar year.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Across the world, millions affected by war and trauma are left with devastating physical injuries — shattered joints, chronic pain, and mobility loss. Many cannot afford rehabilitation, leaving them trapped in cycles of pain and poverty. Your Zakat can fund life-changing physiotherapy and rehab sessions.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  At Living With Arthritis, every Zakat contribution is managed with the utmost care, integrity, and in full alignment with Shariah guidelines. Our approach is guided by qualified scholars to ensure your Zakat reaches those who are most deserving.
                </p>

                {/* Gift Aid callout */}
                <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-5 flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Gift Aid — Boost Your Donation by 25%</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      If you're a UK taxpayer, we can reclaim 25p for every £1 you give through Gift Aid — at no extra cost to you. A £100 donation becomes £125 for our beneficiaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: donation form card */}
            <div className="lg:sticky lg:top-28 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                {/* Card header */}
                <div className="bg-emerald px-6 py-5 text-white">
                  <h1 className="text-2xl sm:text-3xl font-display font-bold">Zakat Appeal</h1>
                  <p className="text-white/80 text-sm mt-1">
                    Fund rehabilitation for war & trauma survivors
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  <blockquote className="border-l-4 border-emerald/40 pl-4 italic text-muted-foreground text-sm">
                    "Take from their wealth to purify and bless them" — Qur'an 9:103
                  </blockquote>

                  {/* Amount grid */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Select an amount</p>
                    <div className="grid grid-cols-3 gap-2">
                      {ZAKAT_AMOUNTS.map((amt) => {
                        const isActive = selectedAmount === amt && !customAmount;
                        return (
                          <Button
                            key={amt}
                            variant={isActive ? "default" : "outline"}
                            onClick={() => {
                              setSelectedAmount(amt);
                              setCustomAmount("");
                            }}
                            className={`text-sm font-semibold rounded-lg transition-all ${
                              isActive
                                ? "bg-emerald hover:bg-emerald/90 text-white border-emerald shadow-sm"
                                : "hover:border-emerald/50 hover:text-emerald"
                            }`}
                          >
                            £{amt.toLocaleString()}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Impact description */}
                  {description && (
                    <div className="bg-emerald/5 border border-emerald/15 rounded-lg px-4 py-3 text-center">
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  )}

                  {/* Custom amount */}
                  <div>
                    <label htmlFor="custom-amount" className="text-sm font-medium text-foreground">
                      Or enter a custom amount
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">£</span>
                      <Input
                        id="custom-amount"
                        type="number"
                        min="1"
                        max="100000"
                        placeholder="0.00"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* Donate button */}
                  <Button
                    onClick={handleDonate}
                    disabled={activeAmount <= 0}
                    className="w-full h-12 bg-emerald hover:bg-emerald/90 text-white text-base font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Donate £{activeAmount > 0 ? activeAmount.toLocaleString() : "0"}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    Secure payment via Stripe. Your data is protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact stats strip */}
        <section className="bg-emerald text-white py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { icon: Users, stat: "500+", label: "Survivors Supported" },
                { icon: Heart, stat: "£180K+", label: "Zakat Distributed" },
                { icon: BookOpen, stat: "1,200+", label: "Rehab Sessions Funded" },
                { icon: Shield, stat: "100%", label: "Shariah Compliant" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <item.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <p className="text-2xl sm:text-3xl font-display font-bold">{item.stat}</p>
                  <p className="text-xs text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zakat Calculator */}
        <ZakatCalculator />

        {/* Trust & promise section */}
        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-center text-foreground mb-8">
              Your Zakat, Our Promise
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TRUST_ITEMS.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-card rounded-xl p-5 text-center shadow-sm border border-border hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-emerald/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-emerald" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-center text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-foreground pr-4">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
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
        fundType="zakat"
      />
    </>
  );
};

export default ZakatAppeal;
