import { memo } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is this service free?", a: "Yes, all our resources including virtual physiotherapy consultations, nutrition guides, and exercise plans are completely free for UK residents." },
  { q: "Do I need a GP referral?", a: "No referral is needed. You can access our resources directly, though we always encourage working alongside your GP or specialist." },
  { q: "What types of arthritis do you cover?", a: "We provide resources for over 100 types of arthritis, with a focus on osteoarthritis and rheumatoid arthritis — the most common forms affecting UK adults." },
  { q: "How does the virtual physiotherapy work?", a: "Book a free consultation through our platform. You'll connect with a registered physiotherapist via video call who'll create a personalised exercise plan." },
  { q: "Can diet really help with arthritis?", a: "Research shows an anti-inflammatory diet, particularly the Mediterranean diet, can reduce pain, stiffness, and inflammation associated with arthritis." },
  { q: "Is the AI assistant a replacement for medical advice?", a: "No. Our AI assistant provides general information and guidance based on published research. Always consult your healthcare professional for personalised medical advice." },
];

const FAQSection = memo(() => (
  <section className="py-24 lg:py-32 bg-background section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
        <span className="section-label text-primary mb-4 block">Common Questions</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
          Frequently <span className="text-primary italic">asked</span>
        </h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <AccordionItem value={`faq-${i}`} className="bg-card border border-border/20 rounded-2xl px-6 data-[state=open]:shadow-md transition-shadow">
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-5">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.a}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  </section>
));

FAQSection.displayName = "FAQSection";
export default FAQSection;
