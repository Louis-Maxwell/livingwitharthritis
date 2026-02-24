import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  { title: "Virtual Yoga for Arthritis", date: "5 Mar 2026", location: "Online", attendees: 45 },
  { title: "Nutrition Workshop", date: "12 Mar 2026", location: "Online", attendees: 32 },
  { title: "Community Walk – Hyde Park", date: "20 Mar 2026", location: "London", attendees: 28 },
];

const EventsSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/20 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="section-label text-primary mb-4 block">Events</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
          Upcoming <span className="text-primary italic">events</span>
        </h2>
      </motion.div>

      <div className="space-y-4">
        {events.map((ev, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Card className="p-6 rounded-2xl border-border/20 card-hover flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground">{ev.title}</h3>
                <div className="flex flex-wrap gap-4 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ev.attendees} attending</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

EventsSection.displayName = "EventsSection";
export default EventsSection;
