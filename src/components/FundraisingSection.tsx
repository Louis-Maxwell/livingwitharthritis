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
    <section id="involved" className="py-20 lg:py-28 bg-accent/50 relative overflow-hidden section-divider">
      <div className="gradient-orb w-[500px] h-[500px] bg-primary top-[-100px] left-[-150px]" />

      <div className="container mx-auto px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <span className="section-label text-primary mb-3 block">Get Involved</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-[1.06]">
              Fundraising
            </h2>
            <div className="w-10 h-0.5 bg-primary rounded-full mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Make a real difference. Explore ways to support arthritis research and care.
            </p>
            <ContactFormModal
              trigger={
                <Button className="btn-primary-cta px-6 h-11 rounded-full text-sm">
                  Get In Touch
                </Button>
              }
            />
          </motion.div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="py-4 border-b border-border">
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
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <ContactFormModal
                      trigger={
                        <button className="group flex items-center justify-between py-4 border-b border-border/60 hover:border-primary/20 transition-colors w-full text-left cursor-pointer">
                          <div className="flex items-center gap-3">
                            <span className="section-label text-muted-foreground/25 w-7 text-[10px]">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-base sm:text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                              {option.title}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground/25 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
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
