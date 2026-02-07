import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AboutUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
        <div className="bg-accent px-8 pt-10 pb-8 border-b border-border/30">
          <DialogHeader>
            <p className="editorial-caption text-muted-foreground mb-3">Our Mission</p>
            <DialogTitle className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight leading-tight">
              About Us
            </DialogTitle>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">
              Understanding arthritis — and why we exist.
            </p>
          </DialogHeader>
        </div>

        <div className="px-8 py-8 space-y-8">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-start gap-5">
                  <div className="w-10 h-10 bg-muted rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/3 bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            sections.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-start gap-5">
                  <span className="text-4xl font-display font-bold text-primary/15 leading-none select-none mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
                  <div className="mt-6 h-px bg-border/50" />
                )}
              </motion.div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsModal;
