import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useFundraisingOptions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactFormModal } from "@/components/ContactFormModal";
import { Button } from "@/components/ui/button";

const FundraisingSection = memo(() => {
  const { data: fundraisingOptions, isLoading } = useFundraisingOptions();

  return (
    <section id="involved" className="py-24 lg:py-36 bg-accent/30 relative overflow-hidden section-divider">
      <div className="gradient-orb w-[600px] h-[600px] bg-primary top-[-150px] left-[-200px]" />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="section-label text-primary mb-4 block">Get Involved</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5 leading-[1.04]">
              Fundraising
            </h2>
            <div className="w-12 h-[2px] bg-primary/25 rounded-full mb-5" />
            <p className="text-sm text-muted-foreground/70 leading-[1.7] mb-8">
              Make a real difference. Explore ways to support arthritis research and care.
            </p>
            <ContactFormModal
              trigger={
                <Button className="btn-primary-cta px-8 h-12 rounded-full text-sm tracking-wider">
                  Get In Touch
                </Button>
              }
            />
          </motion.div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="py-5 border-b border-border/30">
                    <Skeleton className="h-6 w-48" />
                  </div>
                ))
              ) : (
                fundraisingOptions?.map((option, i) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ContactFormModal
                      trigger={
                        <button className="group flex items-center justify-between py-5 border-b border-border/30 hover:border-primary/15 transition-all duration-500 w-full text-left cursor-pointer">
                          <div className="flex items-center gap-4">
                            <span className="section-label text-muted-foreground/20 w-7 text-[10px]">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-base sm:text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                              {option.title}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500 flex-shrink-0" />
                        </button>
                      }
                    />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FundraisingSection.displayName = "FundraisingSection";
export default FundraisingSection;