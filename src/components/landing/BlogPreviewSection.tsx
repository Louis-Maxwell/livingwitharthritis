import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, TrendingUp, BookOpen, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const posts = [
  { slug: "arthritis-and-cold-weather-uk", title: "Why Joints Hurt More in Cold Weather", category: "Lifestyle", color: "bg-primary/10 text-primary border-primary/20", accent: "from-primary/20 to-primary/5", readTime: "6 min", date: "Mar 2026", emoji: "❄️" },
  { slug: "arthritis-and-mental-health", title: "Breaking the Pain-Mood Cycle", category: "Health", color: "bg-primary/10 text-primary border-primary/20", accent: "from-primary/15 to-primary/5", readTime: "7 min", date: "Mar 2026", emoji: "🧠" },
  { slug: "best-diet-for-joint-pain-uk", title: "Anti-Inflammatory Foods for Joint Pain", category: "Nutrition", color: "bg-primary/10 text-primary border-primary/20", accent: "from-primary/20 to-primary/5", readTime: "8 min", date: "Mar 2026", emoji: "🥗" },
  { slug: "swimming-for-arthritis-uk", title: "Complete Guide to Aquatic Exercise", category: "Exercise", color: "bg-primary/10 text-primary border-primary/20", accent: "from-primary/15 to-primary/5", readTime: "5 min", date: "Mar 2026", emoji: "🏊" },
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
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              40+ Articles
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Latest <span className="text-primary italic">articles</span></h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">Evidence-based guidance from UK physiotherapists and nutritionists.</p>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate("/blog")}
            className="text-sm font-bold text-primary flex items-center gap-1.5 tracking-wider uppercase group"
          >
            View all articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/blog/${p.slug}`} className="block h-full">
                <Card className="p-0 overflow-hidden premium-card cursor-pointer group h-full flex flex-col">
                  {/* Colorful top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${p.color}`}>{p.category}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />{p.readTime}
                      </span>
                    </div>
                    <div className="text-2xl mb-3">{p.emoji}</div>
                    <h3 className="text-sm font-display font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 flex-1 leading-snug">{p.title}</h3>
                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <span className="text-[10px] text-muted-foreground/50 font-medium">{p.date}</span>
                      {i === 0 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                          <TrendingUp className="w-3 h-3" /> Popular
                        </span>
                      ) : (
                        <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick topic links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {[
            { label: "🍎 Diet & Nutrition", color: "hover:border-emerald-500/30 hover:text-emerald-700" },
            { label: "🦴 Joint Exercises", color: "hover:border-violet-500/30 hover:text-violet-700" },
            { label: "🧠 Mental Health", color: "hover:border-rose-500/30 hover:text-rose-700" },
            { label: "💊 Supplements", color: "hover:border-amber-500/30 hover:text-amber-700" },
            { label: "❄️ Winter Tips", color: "hover:border-sky-500/30 hover:text-sky-700" },
          ].map((topic) => (
            <Link
              key={topic.label}
              to="/blog"
              className={`px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground bg-card border border-border/30 ${topic.color} transition-all duration-200`}
            >
              {topic.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

BlogPreviewSection.displayName = "BlogPreviewSection";
export default BlogPreviewSection;
