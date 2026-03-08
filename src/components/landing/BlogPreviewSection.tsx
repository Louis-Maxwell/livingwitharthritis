import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const posts = [
  { slug: "arthritis-and-cold-weather-uk", title: "Arthritis and Cold Weather in the UK: Why Joints Hurt More in Winter", category: "Lifestyle", color: "bg-sky-500/10 text-sky-700", readTime: "6 min", date: "Mar 2026" },
  { slug: "arthritis-and-mental-health", title: "Arthritis and Mental Health: Breaking the Pain-Mood Cycle", category: "Health", color: "bg-rose-500/10 text-rose-700", readTime: "7 min", date: "Mar 2026" },
  { slug: "best-diet-for-joint-pain-uk", title: "Best Diet for Joint Pain in the UK: Anti-Inflammatory Foods", category: "Nutrition", color: "bg-emerald-500/10 text-emerald-700", readTime: "8 min", date: "Mar 2026" },
];

const BlogPreviewSection = memo(() => {
  const navigate = useNavigate();
  return (
    <section className="py-14 lg:py-20 bg-tint-cyan section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
        >
          <div>
            <span className="section-label text-primary mb-4 block">From Our Blog</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Latest <span className="text-primary italic">articles</span></h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">Evidence-based guidance from UK physiotherapists and nutritionists.</p>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate("/blog")}
            className="text-sm font-bold text-primary flex items-center gap-1.5 tracking-wider uppercase group"
          >
            View all 40 articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/blog/${p.slug}`} className="block h-full">
                <Card className="p-7 premium-card cursor-pointer group h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${p.color}`}>{p.category}</span>
                    {i === 0 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-primary/70">
                        <TrendingUp className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-display font-semibold text-foreground mb-5 group-hover:text-primary transition-colors duration-300 flex-1 leading-snug">{p.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground/40 font-medium">
                      <span>{p.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                    </div>
                    <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick topic links to reduce bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {["Diet & Nutrition", "Joint Exercises", "Mental Health", "Supplements", "Winter Tips"].map((topic) => (
            <Link
              key={topic}
              to="/blog"
              className="px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground bg-card border border-border/30 hover:border-primary/20 hover:text-primary transition-all duration-200"
            >
              {topic}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

BlogPreviewSection.displayName = "BlogPreviewSection";
export default BlogPreviewSection;
