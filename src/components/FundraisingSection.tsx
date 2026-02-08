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
    <section id="involved" className="py-20 lg:py-28 bg-accent relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="section-label text-primary mb-3 block">Get Involved</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-[1.05]">
              Fundraising
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-4" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Make a real difference. Explore ways to support arthritis research and care.
            </p>
            <ContactFormModal
              trigger={
                <Button className="btn-primary-cta px-6 py-3 rounded-full text-sm">
                  Get In Touch
                </Button>
              }
            />
          </motion.div>

          {/* Right — list */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="py-5 border-b border-border">
                    <Skeleton className="h-7 w-56" />
                  </div>
                ))
              ) : (
                fundraisingOptions?.map((option, i) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <ContactFormModal
                      trigger={
                        <button className="group flex items-center justify-between py-5 border-b border-border hover:border-primary/30 transition-colors w-full text-left cursor-pointer">
                          <div className="flex items-center gap-4">
                            <span className="section-label text-muted-foreground/40 w-8">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-lg lg:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {option.title}
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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