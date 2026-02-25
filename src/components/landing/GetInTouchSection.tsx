import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { ContactFormModal } from "@/components/ContactFormModal";

const GetInTouchSection = memo(() => {
  return (
    <section aria-labelledby="get-in-touch-heading" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-12"
      >
        <h2
          id="get-in-touch-heading"
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Get in touch
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Chat with us on WhatsApp
            </h3>
            <a
              href="https://wa.me/447760512084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <MessageCircle className="h-6 w-6" />
              Chat on WhatsApp
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Quick and instant answers to any questions.
            </p>
            <a
              href="https://wa.me/447760512084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Chat now
            </a>
          </motion.div>

          {/* Enquiry */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Make an enquiry
            </h3>
            <div className="flex items-center justify-start">
              <div className="h-20 w-20 rounded-2xl bg-accent flex items-center justify-center">
                <Mail className="h-10 w-10 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Send us a message using the form below.
            </p>
            <ContactFormModal
              trigger={
                <button className="inline-block text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors cursor-pointer">
                  Send an enquiry
                </button>
              }
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Give us a call
            </h3>
            <div className="flex items-center justify-start">
              <div className="h-20 w-20 rounded-2xl bg-accent flex items-center justify-center">
                <Phone className="h-10 w-10 text-primary" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Speak to our customer service team on{" "}
              <strong className="text-foreground">07760 512 084</strong>
            </p>
            <a
              href="tel:+447760512084"
              className="inline-block text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Call now
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

GetInTouchSection.displayName = "GetInTouchSection";
export default GetInTouchSection;
