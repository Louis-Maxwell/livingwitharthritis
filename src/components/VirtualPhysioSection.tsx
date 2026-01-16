import physioMyth1 from "@/assets/physio-myth-1.jpg";
import physioMyth2 from "@/assets/physio-myth-2.jpg";
import physioMyth3 from "@/assets/physio-myth-3.jpg";
import physioMyth4 from "@/assets/physio-myth-4.jpg";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const myths = [
  {
    id: 1,
    myth: "You can't get proper treatment without seeing a physio in person.",
    fact: "Over 85–90% of patients report the same or higher satisfaction with virtual sessions. Most physio success comes through guided exercises and education—which work brilliantly over video.",
    image: physioMyth1,
  },
  {
    id: 2,
    myth: "Virtual physio won't help real pain or serious injuries.",
    fact: "NHS-backed research shows similar results for back pain, neck issues, and sports injuries—whether in-clinic or online. Pain drops, movement improves.",
    image: physioMyth2,
  },
  {
    id: 3,
    myth: "It's only for people who can't travel.",
    fact: "Busy professionals, parents, and night-shift workers choose virtual because it fits their life—no more rushing across town after work.",
    image: null,
  },
  {
    id: 4,
    myth: "Online feels cold and less personal.",
    fact: "Many say it's MORE personal! One-to-one focus, no waiting room chaos. Patients often feel they get deeper attention online.",
    image: physioMyth3,
  },
  {
    id: 5,
    myth: "You need fancy gym equipment at home.",
    fact: "Just YOU. Most plans use bodyweight, a chair, or simple resistance bands. Your physio customises everything to what you have.",
    image: null,
  },
  {
    id: 6,
    myth: "Long-term recovery? Virtual won't cut it.",
    fact: "Studies show virtual physio patients stick with it longer, get better adherence, and sometimes recover faster over time.",
    image: physioMyth4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const VirtualPhysioSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Virtual Physio: <span className="text-gradient">Myths Busted</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Think online physio is just "nice-to-have" or second-best? Think again. 
            Thousands are recovering faster and feeling better—all from home.
          </p>
        </motion.div>

        {/* Myths Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {myths.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl border border-border/50 hover:border-primary/20 hover:shadow-large transition-all duration-500 overflow-hidden">
                {/* Image section */}
                {item.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={`Virtual physiotherapy illustration ${item.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                )}
                
                <div className="p-6 space-y-5">
                  {/* Myth */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-destructive uppercase tracking-wider">
                        Myth #{item.id}
                      </span>
                      <p className="text-foreground font-medium mt-1 leading-relaxed">
                        "{item.myth}"
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Fact */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        Reality
                      </span>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                        {item.fact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-10 lg:p-14 border border-border/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
                Virtual physiotherapy isn't the future—it's the now.
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Flexible. Effective. Personal. And seriously convenient.
              </p>
              <Button
                size="lg"
                className="btn-premium text-primary-foreground font-bold px-10 py-6 rounded-full text-base"
              >
                Talk to a Physio Today
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualPhysioSection;
