import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface AboutUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutUsModal = ({ open, onOpenChange }: AboutUsModalProps) => {
  const sections = [
    {
      title: "The Scale of Arthritis",
      content:
        "According to statistics from the past 10 years, arthritis affects more than 63% of people over 70 years. But this is not a reason to consider the disease purely age-related. Across the planet, arthritis affects several tens of millions of people, and these dismal figures are soaring. And, according to WHO, soon the day will come when one-third of the inhabitants of the Earth will be affected by this disease.",
    },
    {
      title: "The Unknown Cause",
      content:
        "But even more startling facts are as follows. Doctors still cannot pinpoint the exact causes of the disease. And today, there are absolutely no medicines that can fully heal, for example, rheumatoid arthritis.",
    },
    {
      title: "Current Treatments",
      content:
        "Arthritis is treated with medical approaches including NSAIDs (aspirin, ibuprofen) and chondroprotectors. Physical therapy and many traditional remedies also help manage symptoms and improve quality of life.",
    },
    {
      title: "Our Commitment",
      content:
        "Doclandmed.com recommends only those doctors and technology which are recognised as best in the world. Living With Arthritis is dedicated to providing trusted, evidence-based resources to help you manage your condition with confidence.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0 rounded-2xl border-border/50">
        {/* Editorial header */}
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

        {/* Content sections */}
        <div className="px-8 py-8 space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
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
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsModal;
