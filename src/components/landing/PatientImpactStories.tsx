import { memo } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const stories = [
  {
    name: "Margaret, 67",
    location: "Leeds",
    condition: "Knee Osteoarthritis",
    before: "Struggled to walk to the shops. Pain kept me housebound most days and I felt completely isolated.",
    after: "After 8 weeks of guided exercises, I walk 2 miles daily and joined a local gardening club. I feel like myself again.",
    emoji: "🌻",
    accent: "from-primary/10 to-primary/5",
    borderColor: "border-primary/20",
    badgeColor: "bg-primary/10 text-primary",
  },
  {
    name: "David, 54",
    location: "Birmingham",
    condition: "Rheumatoid Arthritis",
    before: "Morning stiffness lasted 2+ hours. I nearly lost my job because I couldn't type or hold a pen.",
    after: "With hand exercises and dietary changes, stiffness is under 20 minutes. I'm back to full-time work with confidence.",
    emoji: "💪",
    accent: "from-primary/8 to-primary/3",
    borderColor: "border-primary/15",
    badgeColor: "bg-primary/10 text-primary",
  },
  {
    name: "Amina, 42",
    location: "London",
    condition: "Psoriatic Arthritis",
    before: "Constant fatigue and swollen joints. I couldn't play with my children or cook a family meal.",
    after: "The anti-inflammatory meal plans and swimming programme gave me my energy back. My children say 'Mum's fun again!'",
    emoji: "🏊",
    accent: "from-primary/10 to-primary/5",
    borderColor: "border-primary/20",
    badgeColor: "bg-primary/10 text-primary",
  },
];

const PatientImpactStories = memo(() => {
  return (
    <section className="py-14 lg:py-20 bg-background section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3.5 py-1.5 mb-4">
            <Heart className="w-3.5 h-3.5 mr-1.5" />
            Real Impact Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Your donations <span className="text-primary italic">change lives</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg mx-auto">
            Every contribution funds free physiotherapy, nutrition guidance, and support that transforms daily life for people with arthritis across the UK.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border ${story.borderColor} bg-gradient-to-br ${story.accent} p-6 flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{story.emoji}</span>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.location} · {story.condition}</p>
                </div>
              </div>

              {/* Before */}
              <div className="mb-4">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-destructive/70 mb-1.5">Before</span>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{story.before}"</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-2">
                <ArrowRight className="w-4 h-4 text-primary/40 rotate-90" />
              </div>

              {/* After */}
              <div className="flex-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">After</span>
                <p className="text-sm text-foreground leading-relaxed font-medium">"{story.after}"</p>
              </div>

              {/* Quote icon */}
              <div className="mt-5 pt-4 border-t border-border/20 flex items-center gap-2">
                <Quote className="w-3.5 h-3.5 text-primary/30" />
                <span className="text-[11px] text-muted-foreground/60">Shared with permission</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">£25</span> funds a full physiotherapy assessment.{" "}
            <span className="font-semibold text-foreground">£100</span> supports a patient for 3 months.
          </p>
          <Link
            to="/#involved"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
          >
            Help someone like Margaret, David, or Amina <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

PatientImpactStories.displayName = "PatientImpactStories";
export default PatientImpactStories;
