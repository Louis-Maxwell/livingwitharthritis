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
      <div className="gradient-orb w-[600px] h-[600px] bg-primary top-[-200px] right-[-200px]" />
      <div className="gradient-orb w-[500px] h-[500px] bg-secondary bottom-[-150px] left-[-150px]" />

      <div className="container mx-auto px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-140px)] py-12 lg:py-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 lg:order-1 max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-2 mb-6"
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wide">Supporting 10 million people across the UK</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-display font-bold text-foreground tracking-tight mb-6 leading-[1.06]">
              Living well with{" "}
              <span className="text-primary">arthritis</span>{" "}
              starts here
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-[1.7] mb-8 max-w-md">
              Expert guidance, compassionate care, and a community that
              understands. We're with you every step of your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="btn-primary-cta px-7 h-12 sm:h-13 rounded-full text-sm"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/chat")}
                className="border border-border text-foreground hover:bg-accent px-7 h-12 sm:h-13 rounded-full text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>

            <a href="tel:07760512084" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <Phone className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
              <span>Free Helpline: <strong className="text-foreground font-semibold">07760 512 084</strong></span>
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[1.75rem] overflow-hidden shadow-large">
              <img
                src={heroImage}
                alt="Diverse community of people being active together in a park"
                className="w-full h-[280px] sm:h-[380px] lg:h-[520px] object-cover"
                loading="eager"
                fetchPriority="high"
              />
              {/* Subtle gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-auto sm:bottom-5"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-large border border-white/60">
                  <div className="flex items-center gap-5">
                    {[
                      { val: "100+", label: "Conditions", color: "text-primary" },
                      { val: "24/7", label: "Support", color: "text-secondary" },
                      { val: "£2.5M", label: "Funded", color: "text-gold" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center gap-5">
                        {i > 0 && <div className="w-px h-9 bg-border" />}
                        <div className="text-center">
                          <div className={`text-xl sm:text-2xl font-display font-bold ${s.color}`}>{s.val}</div>
                          <div className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">{s.label}</div>
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
