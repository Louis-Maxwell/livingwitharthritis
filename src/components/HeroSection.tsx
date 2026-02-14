import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";

const HeroSection = () => {
  const navigate = useNavigate();


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
                variant="outline"
                onClick={() => navigate("/chat")}
                className="border border-border text-foreground hover:bg-accent px-7 h-12 sm:h-13 rounded-full text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>

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
                width={918}
                height={520}
                loading="eager"
                fetchPriority="high"
              />
              {/* Subtle gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
