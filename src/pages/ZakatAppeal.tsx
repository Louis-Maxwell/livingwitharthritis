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

const ZAKAT_AMOUNTS = [100, 249, 350, 500, 1000, 2500, 5000, 10000];

const AMOUNT_DESCRIPTIONS: Record<number, string> = {
  100: "Could help fund rehab sessions for someone in need",
  249: "Could help fund rehab sessions for a family in need",
  350: "Could help fund a month of rehabilitation sessions for someone in need",
  500: "Could help fund specialist rehab sessions for someone in need",
  1000: "Could help fund a full rehab programme for someone in need",
  2500: "Could help fund community rehab sessions for those in need",
  5000: "Could help fund outreach rehab sessions for those in need",
  10000: "Could help fund a local rehab centre for those in need",
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
        <title>Zakat Appeal | Living With Arthritis</title>
        <meta
          name="description"
          content="Fulfil your Zakat obligation by supporting those living with arthritis. Your contribution is managed with full transparency and in accordance with Islamic principles."
        />
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
                  Zakat — A Sacred Responsibility
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Zakat is one of the five fundamental pillars of Islam and represents a duty upon every eligible Muslim. It is an act of worship through giving — a way to purify one's wealth and draw closer to Allah by caring for those in need. The obligation applies to 2.5% of qualifying savings and assets held for a full lunar year, and is required of those whose wealth exceeds the minimum threshold (nisab).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  At Living With Arthritis, we are committed to ensuring every Zakat contribution is handled with the utmost care, integrity, and in full alignment with Shariah guidelines. Our approach is guided by qualified scholars to guarantee that your Zakat reaches those who are most deserving, providing real relief to individuals and families affected by arthritis.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in building a compassionate world where no one suffers alone. Your Zakat can transform the lives of vulnerable community members — helping them access treatment, rehabilitation, and the support they need to live with dignity.
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
                  Zakat is a means of serving Allah through serving His creation. By fulfilling your Zakat, you align your intentions with justice, mercy, and devotion.
                </p>
                <blockquote className="border-l-4 border-emerald pl-4 italic text-muted-foreground">
                  "Take from their wealth to purify and bless them" — Qur'an 9:103
                </blockquote>

                {/* Amount grid */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Select an amount</p>
                  <div className="grid grid-cols-4 gap-2">
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
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                            : "hover:border-emerald-500"
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
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-xl"
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
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-emerald-600" />
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
