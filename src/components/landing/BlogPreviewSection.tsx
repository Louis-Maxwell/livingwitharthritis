import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const posts = [
  { title: "5 Morning Routines to Ease Joint Stiffness", category: "Lifestyle", readTime: "4 min", date: "Feb 2026" },
  { title: "Mediterranean Diet: A Complete Guide for Arthritis", category: "Nutrition", readTime: "7 min", date: "Feb 2026" },
  { title: "Understanding Flare-Ups and How to Manage Them", category: "Health", readTime: "5 min", date: "Jan 2026" },
];

const BlogPreviewSection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-24 lg:py-32 bg-background section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="section-label text-primary mb-4 block">From Our Blog</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Latest <span className="text-primary italic">articles</span></h2>
          </div>
          <button onClick={() => navigate("/blog")} className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="p-6 rounded-3xl border-border/20 card-hover cursor-pointer group h-full flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">{p.category}</span>
                <h3 className="text-base font-display font-semibold text-foreground mb-4 group-hover:text-primary transition-colors flex-1">{p.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

BlogPreviewSection.displayName = "BlogPreviewSection";
export default BlogPreviewSection;
