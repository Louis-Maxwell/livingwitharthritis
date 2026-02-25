import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { ContactFormModal } from "@/components/ContactFormModal";

const GetInTouchSection = memo(() => {
  return (
    <section aria-labelledby="get-in-touch-heading" className="py-24 section-divider">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <span className="section-label text-primary mb-4 block">We're Here For You</span>
        <h2
          id="get-in-touch-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
        >
          Get in touch
        </h2>
        <p className="text-base text-muted-foreground max-w-lg mx-auto">
          Whether you have a question, need support, or just want to chat — we'd love to hear from you.
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/447760512084"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative rounded-2xl border border-border/30 bg-card p-8 flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-large hover:border-primary/20 transition-all duration-300"
        >
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
            <MessageCircle className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Chat on WhatsApp</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Quick and instant answers. We typically respond within minutes.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-300">
            Chat now <ArrowRight className="h-4 w-4" />
          </span>
        </motion.a>

        {/* Enquiry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative rounded-2xl border border-border/30 bg-card p-8 flex flex-col items-center text-center space-y-4 hover:shadow-large hover:border-secondary/20 transition-all duration-300"
        >
          <div className="h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-105 transition-all duration-300">
            <Mail className="h-6 w-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Make an enquiry</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Send us a detailed message and our team will get back to you.
          </p>
          <ContactFormModal
            trigger={
              <button className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary group-hover:gap-2.5 transition-all duration-300 cursor-pointer">
                Send an enquiry <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </motion.div>

        {/* Phone */}
        <motion.a
          href="tel:+447760512084"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative rounded-2xl border border-border/30 bg-card p-8 flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-large hover:border-primary/20 transition-all duration-300"
        >
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
            <Phone className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Give us a call</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Speak to our friendly team on
            <br />
            <strong className="text-foreground text-base">07760 512 084</strong>
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-300">
            Call now <ArrowRight className="h-4 w-4" />
          </span>
        </motion.a>
      </div>
    </section>
  );
});

GetInTouchSection.displayName = "GetInTouchSection";
export default GetInTouchSection;
