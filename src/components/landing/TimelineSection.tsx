import { memo } from "react";
import { motion } from "framer-motion";

const milestones = [
  { year: "2020", title: "Founded", desc: "Living With Arthritis launched to support UK patients." },
  { year: "2021", title: "Virtual Physio", desc: "Introduced free virtual physiotherapy sessions." },
  { year: "2023", title: "AI Assistant", desc: "Deployed an AI-powered health assistant." },
  { year: "2024", title: "10K Users", desc: "Reached 10,000 active community members." },
  { year: "2025", title: "Nationwide", desc: "Expanded services to cover all UK regions." },
];

const TimelineSection = memo(() => (
  <section className="py-24 lg:py-32 bg-background section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Our Journey</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
          How we <span className="text-primary italic">grew</span>
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />
        {milestones.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`relative flex items-start gap-6 mb-12 last:mb-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12 lg:ml-0" : "lg:pl-12 lg:ml-auto"}`}>
            <div className="absolute left-4 lg:left-auto lg:right-auto w-3 h-3 rounded-full bg-primary border-4 border-background z-10 top-1.5 -translate-x-1/2 lg:translate-x-0"
              style={i % 2 === 0 ? { right: "-6px", left: "auto" } : { left: "-6px" }} />
            <div className="ml-8 lg:ml-0">
              <span className="text-xs font-bold text-primary tracking-wider">{m.year}</span>
              <h3 className="text-lg font-display font-semibold text-foreground mt-1">{m.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

TimelineSection.displayName = "TimelineSection";
export default TimelineSection;
