import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { ContactFormModal } from "@/components/ContactFormModal";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const GetInTouchSection = memo(() => {
  return (
    <section aria-labelledby="get-in-touch-heading" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6 text-center mb-16"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          We're here for you
        </p>
        <h2
          id="get-in-touch-heading"
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Get in touch
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you have a question, need support, or just want to chat — we'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/447760512084"
          target="_blank"
          rel="noopener noreferrer"
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 lg:p-10 flex flex-col items-center text-center space-y-5 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="relative text-xl font-bold text-foreground">
            Chat on WhatsApp
          </h3>
          <p className="relative text-muted-foreground text-sm leading-relaxed">
            Quick and instant answers to any questions. We typically respond within minutes.
          </p>
          <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
            Chat now <ArrowRight className="h-4 w-4" />
          </span>
        </motion.a>

        {/* Enquiry */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 lg:p-10 flex flex-col items-center text-center space-y-5 shadow-sm hover:shadow-xl transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/15 transition-colors duration-300">
            <Mail className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="relative text-xl font-bold text-foreground">
            Make an enquiry
          </h3>
          <p className="relative text-muted-foreground text-sm leading-relaxed">
            Send us a detailed message and our team will get back to you as soon as possible.
          </p>
          <ContactFormModal
            trigger={
              <button className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-secondary group-hover:gap-3 transition-all duration-300 cursor-pointer">
                Send an enquiry <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </motion.div>

        {/* Phone */}
        <motion.a
          href="tel:+447760512084"
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 lg:p-10 flex flex-col items-center text-center space-y-5 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-16 w-16 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
            <Phone className="h-8 w-8 text-gold-foreground" />
          </div>
          <h3 className="relative text-xl font-bold text-foreground">
            Give us a call
          </h3>
          <p className="relative text-muted-foreground text-sm leading-relaxed">
            Speak to our friendly team on
            <br />
            <strong className="text-foreground text-base">07760 512 084</strong>
          </p>
          <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:gap-3 transition-all duration-300">
            Call now <ArrowRight className="h-4 w-4" />
          </span>
        </motion.a>
      </div>
    </section>
  );
});

GetInTouchSection.displayName = "GetInTouchSection";
export default GetInTouchSection;
