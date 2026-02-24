import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, BookOpen, Rocket, Users, Target, TrendingUp } from "lucide-react";

interface AboutUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sectionIcons: Record<string, React.ElementType> = {
  "Our Story": BookOpen,
  "The Scale of Arthritis": TrendingUp,
  "Our Mission": Target,
  "Our Commitment": Heart,
  "What We've Built": Users,
  "Looking Ahead": Rocket,
};

const AboutUsModal = ({ open, onOpenChange }: AboutUsModalProps) => {
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["about_us_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_us_sections")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0 rounded-2xl border-border/50">
        {/* Hero header */}
        <div className="relative bg-gradient-to-br from-primary/10 via-accent to-accent/60 px-8 pt-12 pb-10 border-b border-border/30 overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
          <DialogHeader className="relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-4">
              <Heart className="w-3 h-3" />
              Est. 2020
            </div>
            <DialogTitle className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight leading-tight">
              Our Story
            </DialogTitle>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed max-w-md">
              From a personal mission to a national movement — how Living with Arthritis came to be.
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-1">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex items-start gap-5">
                  <div className="w-10 h-10 bg-muted rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/3 bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            sections.map((section, i) => {
              const Icon = sectionIcons[section.title] || Heart;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="group"
                >
                  <div className="flex items-start gap-5 py-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/6 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300 mt-0.5">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground mb-2 tracking-tight">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  {i < sections.length - 1 && (
                    <div className="h-px bg-border/40 ml-[3.75rem]" />
                  )}
                </motion.div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <div className="rounded-2xl bg-accent/50 border border-border/20 p-6 text-center">
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              Living with Arthritis is a registered charitable initiative. Every resource on this platform is free and evidence-based.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsModal;
