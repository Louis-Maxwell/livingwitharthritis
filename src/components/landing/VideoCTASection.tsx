import { memo } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoCTASection = memo(() => (
  <section className="py-24 lg:py-32 bg-background section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
          <span className="section-label text-primary mb-4 block">Watch & Learn</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-5">
            Gentle exercises you can do <span className="text-primary italic">at home</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our video library features physiotherapist-led exercises designed specifically for people with arthritis. Start with just 5 minutes a day.
          </p>
          <Button className="rounded-full btn-primary-cta px-8 h-12">
            Browse Exercises <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
          <div className="aspect-video bg-navy/5 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer border border-border/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
));

VideoCTASection.displayName = "VideoCTASection";
export default VideoCTASection;
