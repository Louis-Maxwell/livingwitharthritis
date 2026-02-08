import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("resources");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative gradient orbs for indulgence */}
      <div className="gradient-orb w-[500px] h-[500px] bg-primary top-[-100px] right-[-100px]" />
      <div className="gradient-orb w-[400px] h-[400px] bg-secondary bottom-[-80px] left-[-80px]" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[calc(100vh-120px)] py-10 lg:py-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-5"
            >
              <Heart className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold">Supporting 10 million people across the UK</span>
            </motion.div>

            <h1 className="text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold text-foreground tracking-tight mb-5 text-balance">
              Living well with{" "}
              <span className="text-primary relative">
                arthritis
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0 7 Q50 0 100 5 Q150 10 200 3" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>{" "}
              starts here
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl">
              Expert guidance, compassionate care, and a community that
              understands. We're with you every step of your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="btn-primary-cta px-7 py-5 sm:py-6 rounded-full text-sm sm:text-base"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/chat")}
                className="border-2 border-foreground/15 text-foreground hover:bg-foreground/5 px-7 py-5 sm:py-6 rounded-full text-sm sm:text-base font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                AI Assistant
              </Button>
            </div>

            <a href="tel:07760512084" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span>Free Helpline: <strong className="text-foreground">07760 512 084</strong></span>
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-large group">
              {/* Warm gradient border effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/30 via-transparent to-secondary/30 rounded-3xl z-0" />
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Diverse community of people being active together in a park"
                  className="w-full h-[260px] sm:h-[350px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:bottom-4"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-medium border border-white/50">
                  <div className="flex items-center gap-3 sm:gap-5">
                    {[
                      { val: "100+", label: "Conditions", color: "text-primary" },
                      { val: "24/7", label: "Support", color: "text-secondary" },
                      { val: "£2.5M", label: "Funded", color: "text-gold" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center gap-3 sm:gap-5">
                        {i > 0 && <div className="w-px h-8 bg-border" />}
                        <div className="text-center">
                          <div className={`text-xl sm:text-2xl font-display font-bold ${s.color}`}>{s.val}</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;