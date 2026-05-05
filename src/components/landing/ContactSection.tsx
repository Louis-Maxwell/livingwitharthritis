import { memo, useRef, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT_EMAILS } from "@/config/contact";

const CONTACT_EMAIL = CONTACT_EMAILS.info;

type ContactForm = { name: string; email: string; subject: string; message: string };
type FieldErr = Partial<ContactForm>;

function validateContact(f: ContactForm): FieldErr {
  const e: FieldErr = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.subject.trim()) e.subject = "Please choose a subject.";
  if (f.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
  return e;
}

const subjects = [
  "General enquiry",
  "Medical / clinical question",
  "Volunteering & partnerships",
  "Media & press",
  "Technical support",
  "Donation / funding",
  "Other",
];

const contactDetails = [
  {
    Icon: Mail,
    label: "Email us",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    desc: "For all general enquiries",
  },
  {
    Icon: Phone,
    label: "Call us",
    value: "0800 000 0000",
    href: "tel:+448000000000",
    desc: "Mon–Fri, 9 am – 5 pm",
  },
  {
    Icon: MapPin,
    label: "Our address",
    value: "Living With Arthritis UK\nLondon, United Kingdom",
    href: undefined,
    desc: "Registered social enterprise",
  },
];

const ContactSection = memo(() => {
  const blank = { name: "", email: "", subject: "", message: "" };
  const [form, setForm] = useState<ContactForm>(blank);
  const [errors, setErrors] = useState<FieldErr>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstErrRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  const set =
    (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }));
      setErrors((p) => ({ ...p, [k]: undefined }));
    };

  const handleSend = async () => {
    const errs = validateContact(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      firstErrRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      const { error: dbErr } = await supabase.from("contact_inquiries").insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        subject: form.subject,
        message: form.message.trim(),
      });
      if (dbErr) throw dbErr;

      const { error: fnErr } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          subject: form.subject,
          message: form.message.trim(),
        },
      });
      if (fnErr) console.warn("Email notification failed (message saved to DB):", fnErr);

      setSubmitted(true);
      toast.success("Message sent! We'll reply to " + form.email.trim() + " within 2 business days.");
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please email us directly at " + CONTACT_EMAIL);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors";
  const inputOk = `${inputBase} border-border focus:ring-primary focus:border-primary bg-card`;
  const inputErr = `${inputBase} border-destructive/50 focus:ring-destructive focus:border-destructive bg-destructive/5`;

  return (
    <section aria-labelledby="contact-heading" className="py-20 bg-accent" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label text-primary/60 block mb-4">Get In Touch</span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            We'd love to hear from you
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a question, want to partner with us, or need clinical guidance? Our team replies within 2 business days.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <aside className="lg:col-span-2 space-y-6">
            {contactDetails.map(({ Icon, label, value, href, desc }) => (
              <div key={label} className="flex gap-4 bg-card rounded-2xl p-5 border border-border shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-foreground hover:text-primary transition-colors focus:outline-none focus:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground whitespace-pre-line">{value}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-primary text-primary-foreground rounded-2xl p-5">
              <h3 className="font-bold mb-1">Medical emergencies</h3>
              <p className="text-sm text-primary-foreground/80">
                We are not a medical emergency service. If you are experiencing a medical emergency, please call{" "}
                <a href="tel:999" className="font-bold underline">999</a> or visit your nearest A&E.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-sm p-8">
            {submitted ? (
              <div className="text-center py-12" role="alert">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Message received!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll reply to <strong>{form.email}</strong> within 2 business days.
                </p>
                <button
                  onClick={() => { setForm(blank); setSubmitted(false); }}
                  className="px-6 py-2.5 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="c-name" className="block text-sm font-semibold text-foreground mb-1.5">
                      Your name <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="c-name" type="text" value={form.name} onChange={set("name")}
                      placeholder="Jane Smith" autoComplete="name" aria-required="true"
                      aria-describedby={errors.name ? "c-name-err" : undefined}
                      aria-invalid={!!errors.name} className={errors.name ? inputErr : inputOk}
                      ref={errors.name ? (el) => { firstErrRef.current = el; } : undefined}
                    />
                    {errors.name && <p id="c-name-err" role="alert" className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-semibold text-foreground mb-1.5">
                      Email address <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="c-email" type="email" value={form.email} onChange={set("email")}
                      placeholder="jane@example.com" autoComplete="email" aria-required="true"
                      aria-describedby={errors.email ? "c-email-err" : undefined}
                      aria-invalid={!!errors.email} className={errors.email ? inputErr : inputOk}
                      ref={!errors.name && errors.email ? (el) => { firstErrRef.current = el; } : undefined}
                    />
                    {errors.email && <p id="c-email-err" role="alert" className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="block text-sm font-semibold text-foreground mb-1.5">
                    Subject <span className="text-destructive" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="c-subject" value={form.subject} onChange={set("subject")}
                    aria-required="true" aria-describedby={errors.subject ? "c-subject-err" : undefined}
                    aria-invalid={!!errors.subject} className={errors.subject ? inputErr : inputOk}
                  >
                    <option value="" disabled>Select a subject…</option>
                    {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p id="c-subject-err" role="alert" className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-sm font-semibold text-foreground mb-1.5">
                    Your message <span className="text-destructive" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="c-message" rows={5} value={form.message} onChange={set("message")}
                    placeholder="Tell us how we can help…" aria-required="true"
                    aria-describedby={errors.message ? "c-message-err" : undefined}
                    aria-invalid={!!errors.message} className={`resize-none ${errors.message ? inputErr : inputOk}`}
                  />
                  {errors.message && <p id="c-message-err" role="alert" className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  <p className="text-xs text-muted-foreground mt-1">{form.message.trim().length} / 1000 characters</p>
                </div>

                <button
                  onClick={handleSend} disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending your message…</>
                  ) : (
                    <><Send className="w-4 h-4" aria-hidden="true" /> Send Message</>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  Your message is sent to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
                  . We reply within 2 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
