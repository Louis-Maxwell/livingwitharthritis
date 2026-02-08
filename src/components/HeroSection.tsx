import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Heart, Users, BookOpen } from "lucide-react";
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
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh] py-16 lg:py-0">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Supporting 10 million people across the UK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.05] tracking-tight mb-6">
              Living well with{" "}
              <span className="text-primary">arthritis</span>{" "}
              starts here
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Expert guidance, compassionate care, and a community that
              understands. We're with you every step of your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="btn-primary-cta px-8 py-6 rounded-full text-base"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Resources
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/chat")}
                className="border-2 border-foreground/15 text-foreground hover:bg-foreground/5 px-8 py-6 rounded-full text-base font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to AI Assistant
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="tel:07760512084" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                <span>Free Helpline: <strong className="text-foreground">07760 512 084</strong></span>
              </a>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-large">
              <img
                src={heroImage}
                alt="Diverse community of people being active together in a park"
                className="w-full h-[300px] sm:h-[400px] lg:h-[520px] object-cover"
              />
              {/* Overlay stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-medium border border-white/50">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-display font-bold text-primary">100+</div>
                      <div className="text-xs text-muted-foreground">Conditions</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <div className="text-2xl font-display font-bold text-secondary">24/7</div>
                      <div className="text-xs text-muted-foreground">Support</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <div className="text-2xl font-display font-bold text-gold">£2.5M</div>
                      <div className="text-xs text-muted-foreground">Funded</div>
                    </div>
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