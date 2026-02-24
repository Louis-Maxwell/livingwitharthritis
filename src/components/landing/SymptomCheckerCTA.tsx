import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SymptomCheckerCTA = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-24 lg:py-32 bg-background section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-navy rounded-[2rem] p-10 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 pointer-events-none" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-4">
              Not sure what to do next?
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              Our AI assistant can help you understand your symptoms and point you to the right resources — free and confidential.
            </p>
            <Button onClick={() => navigate("/chat")} className="rounded-full h-12 px-8 bg-white text-navy hover:bg-white/90">
              Talk to AI Assistant <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

SymptomCheckerCTA.displayName = "SymptomCheckerCTA";
export default SymptomCheckerCTA;
