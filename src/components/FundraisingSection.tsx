import { memo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useFundraisingOptions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactFormModal } from "@/components/ContactFormModal";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FundraisingSection = memo(() => {
  const { data: fundraisingOptions, isLoading } = useFundraisingOptions();

  return (
    <section id="involved" className="py-28 lg:py-36 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — editorial heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-border" />
              Get Involved
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-[0.95] tracking-tight">
              Fund
              <br />
              <span className="font-display italic font-normal text-muted-foreground">raising</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground leading-relaxed font-light mb-8">
              Make a real difference. Explore ways to support arthritis research and care.
            </p>
            <ContactFormModal
              trigger={
                <Button className="btn-gold px-8 py-3 rounded-full text-xs uppercase tracking-wider font-bold">
                  Get In Touch
                </Button>
              }
            />
          </motion.div>

          {/* Right — editorial list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="space-y-0">
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="py-6 border-b border-border/50">
                    <Skeleton className="h-7 w-56" />
                  </div>
                ))
              ) : (
                fundraisingOptions?.map((option, i) => (
                  <motion.div key={option.id} variants={itemVariants}>
                    <ContactFormModal
                      trigger={
                        <button
                          className="group flex items-center justify-between py-6 border-b border-border/50 hover:border-primary/30 transition-all duration-500 w-full text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <span className="editorial-caption text-muted-foreground/40 w-8">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-xl lg:text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
                              {option.title}
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                        </button>
                      }
                    />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

FundraisingSection.displayName = "FundraisingSection";

export default FundraisingSection;
