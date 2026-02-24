import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = memo(() => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-24 lg:py-32 bg-accent/30 section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Stay <span className="text-primary italic">informed</span></h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Get weekly tips on managing arthritis, new research updates, and community stories.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full h-12 px-5 bg-card border-border/30" required />
            <Button type="submit" className="rounded-full h-12 px-6 btn-primary-cta">
              Subscribe <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = "NewsletterSection";
export default NewsletterSection;
