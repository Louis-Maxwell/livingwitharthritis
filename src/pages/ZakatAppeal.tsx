import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Star, Shield, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationBanner from "@/components/DonationBanner";
import StripeDonationModal from "@/components/StripeDonationModal";
import zakatHeroImg from "@/assets/zakat-appeal-hero.jpg";

const ZAKAT_AMOUNTS = [100, 150, 250, 500, 1000];

const AMOUNT_DESCRIPTIONS: Record<number, string> = {
  100: "Could fund a week of physiotherapy rehab sessions for a war or trauma survivor rebuilding their mobility",
  150: "Could provide a full rehabilitation assessment and personalised recovery plan for someone affected by conflict",
  250: "Could fund a month of guided rehab exercises and pain management support for a trauma survivor",
  500: "Could sponsor a complete 8-week rehabilitation programme for an individual recovering from war-related injuries",
  1000: "Could fund a comprehensive 3-month rehab and mental health recovery programme for a conflict survivor",
};

const ZakatAppeal = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <meta name="description" content="Give your Zakat to fund physiotherapy and rehabilitation sessions for war and trauma survivors. Shariah-compliant, transparent and life-changing. Donate £100, £150, £250, £500 or £1,000." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/zakat-appeal" />
        <meta property="og:title" content="Zakat Appeal – Fund Rehab for War & Trauma Survivors" />
        <meta property="og:description" content="Your Zakat could fund life-changing physiotherapy for someone recovering from war injuries. Shariah-compliant. 100% transparent." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/zakat-appeal" />
        <meta property="og:locale" content="en_GB" />
        <meta name="keywords" content="zakat donation UK, zakat arthritis, zakat rehab, zakat war survivors, Islamic charity UK, zakat physiotherapy, shariah compliant charity, zakat appeal UK" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DonateAction",
          "name": "Zakat Appeal – Rehabilitation for War & Trauma Survivors",
          "description": "Fund physiotherapy and rehabilitation sessions for individuals recovering from war and trauma injuries.",
          "recipient": { "@type": "Organization", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "price": "100",
          "priceCurrency": "GBP"
        })}</script>
      </Helmet>

      <DonationBanner />
      <Header />

      <main className="bg-background">
        {/* Hero split section */}
        <section className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: image + educational content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={zakatHeroImg}
                  alt="Hands raised in prayer at sunrise symbolising charity and hope"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 space-y-6"
              >
                <h2 className="text-2xl font-bold text-foreground">
                  Zakat — Rebuilding Lives After War & Trauma
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Zakat is one of the five fundamental pillars of Islam — an act of worship through giving that purifies wealth and draws the believer closer to Allah. The obligation applies to 2.5% of qualifying savings and assets held for a full lunar year, required of those whose wealth exceeds the minimum threshold (nisab).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Across the world, millions of people affected by war, conflict and trauma are left with devastating physical injuries — shattered joints, chronic musculoskeletal pain, and mobility loss that steals their independence. Many survivors cannot afford rehabilitation, leaving them trapped in cycles of pain and poverty. Your Zakat can fund life-changing physiotherapy and rehab sessions for individuals who have endured unimaginable hardship.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  At Living With Arthritis, every Zakat contribution is managed with the utmost care, integrity, and in full alignment with Shariah guidelines. Our approach is guided by qualified scholars to ensure your Zakat reaches those who are most deserving — war survivors, trauma victims, and vulnerable individuals who need rehabilitation to rebuild their lives with dignity and hope.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether it's funding a week of physio sessions, sponsoring a full recovery programme, or supporting someone's journey from injury to independence — your generosity has the power to transform a life shattered by conflict into one filled with possibility.
                </p>
              </motion.div>
            </div>

            {/* Right: donation form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Zakat Appeal
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  Your Zakat could help fund rehabilitation sessions for someone who has been involved in war and trauma — restoring their mobility, independence and hope for the future.
                </p>
                <blockquote className="border-l-4 border-emerald pl-4 italic text-muted-foreground">
                  "Take from their wealth to purify and bless them" — Qur'an 9:103
                </blockquote>

                {/* Amount grid */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Select an amount</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {ZAKAT_AMOUNTS.map((amt) => (
                      <Button
                        key={amt}
                        variant={selectedAmount === amt && !customAmount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`text-sm font-semibold rounded-lg ${
                          selectedAmount === amt && !customAmount
                            ? "bg-emerald hover:bg-emerald/90 text-white border-emerald"
                            : "hover:border-emerald"
                        }`}
                      >
                        £{amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {description && (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 text-center">
                    {description}
                  </p>
                )}

                {/* Custom amount */}
                <div>
                  <label className="text-sm font-medium text-foreground">£ Other</label>
                  <Input
                    type="number"
                    min="1"
                    max="100000"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                    }}
                    className="mt-1"
                  />
                </div>

                {/* Donate button */}
                <Button
                  onClick={handleDonate}
                  disabled={activeAmount <= 0}
                  className="w-full h-12 bg-emerald hover:bg-emerald/90 text-white text-lg font-bold rounded-xl"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Donate £{activeAmount > 0 ? activeAmount.toLocaleString() : "0"}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust & impact section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-10">
              Your Zakat, Our Promise
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Shariah Compliant",
                  desc: "All Zakat funds are managed in full accordance with Islamic principles and verified by qualified scholars.",
                },
                {
                  icon: Star,
                  title: "Full Transparency",
                  desc: "Every penny is accounted for with clear reporting so you can see exactly how your contribution is used.",
                },
                {
                  icon: HandHeart,
                  title: "Direct Impact",
                  desc: "Your Zakat directly supports individuals and families living with arthritis who need it most.",
                },
                {
                  icon: Heart,
                  title: "Trusted Stewardship",
                  desc: "We treat your Zakat with the responsibility, care, and trust that this sacred duty deserves.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-xl p-6 text-center shadow-sm border border-border"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-emerald" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
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
