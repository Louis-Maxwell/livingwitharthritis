import { memo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MessageCircle,
  FileText,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { CONTACT_EMAILS, CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/config/contact";
import { trackContactSubmit } from "@/lib/analytics";
import { submitContactInquiry } from "@/lib/backendSubmit";
import { trackContactFormSubmit } from "@/lib/ga-events";
import { trackEvent } from "@/lib/analytics";

const CONTACT_EMAIL = CONTACT_EMAILS.info;
const WHATSAPP_URL = `https://wa.me/44${CONTACT_PHONE_TEL.replace(/^0/, "")}`;

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

type ChannelCard = {
  Icon: typeof Phone;
  label: string;
  value: string;
  sub: string;
  href: string;
  internal?: boolean;
  external?: boolean;
};

const channels: ChannelCard[] = [
  {
    Icon: Phone,
    label: "Call us",
    value: CONTACT_PHONE,
    sub: "Mon–Fri, 9am – 5pm",
    href: `tel:${CONTACT_PHONE_TEL}`,
  },
  {
    Icon: Mail,
    label: "Email us",
    value: CONTACT_EMAIL,
    sub: "Opens your email app — we reply in 2 working days",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    sub: "Fast, friendly replies",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    Icon: FileText,
    label: "Contact form",
    value: "Send a message",
    sub: "A human will read it",
    href: "/contact",
    internal: true,
  },
];

const ContactSection = memo(() => {
  const blank = { name: "", email: "", subject: "", message: "" };
  const [form, setForm] = useState<ContactForm>(blank);
  const [errors, setErrors] = useState<FieldErr>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
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
    if (honeypot.trim()) {
      return;
    }
    setLoading(true);
    try {
      const result = await submitContactInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      if (result.via === "mailto") {
        trackContactSubmit({ topic: form.subject });
        trackContactFormSubmit(form.subject);
        // Mailto-only — not delivery confirmation
        toast.message(result.message);
        setSubmitted(true);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(
        `Something went wrong. Please email ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors";
  const inputOk = `${inputBase} border-border focus:ring-primary focus:border-primary bg-card`;
  const inputErr = `${inputBase} border-destructive/50 focus:ring-destructive focus:border-destructive bg-destructive/5`;

  return (
    <section aria-labelledby="contact-heading" className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border pt-16" />
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label text-foreground/60 block mb-4 text-[11px] font-bold uppercase tracking-[0.2em]">
            Get in touch
          </span>
          <h2 id="contact-heading" className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            A real person will reply.
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Living with arthritis can feel lonely. Messages open in your email app as a draft
            to our inbox — nothing is stored on this website. When you press Send, a human reads it
            (usually Louis or someone on our small UK team) and we aim to reply within
            two working days (Monday to Friday, 9am – 5pm).
          </p>
        </div>

        {/* 4-across on desktop, 2x2 on tablet, single column on mobile */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-16 motion-safe:animate-fade-in-up">
          {channels.map(({ Icon, label, value, sub, href, internal, external }) => {
            const cardClass =
              "group flex min-w-0 w-full max-w-full flex-col items-center text-center gap-3 overflow-hidden p-5 sm:p-6 rounded-2xl bg-white border border-border hover:border-primary hover:-translate-y-0.5 transition-all duration-300 h-full min-h-[220px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";
            const inner = (
              <>
                <span
                  className="w-14 h-14 shrink-0 rounded-full border border-primary/40 bg-white flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300"
                  aria-hidden
                >
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/70">
                  {label}
                </span>
                <span className="font-bold text-sm sm:text-base text-foreground leading-snug w-full min-w-0 max-w-full px-1 break-all [overflow-wrap:anywhere]">
                  {value}
                </span>
                <span className="text-xs text-muted-foreground leading-relaxed w-full min-w-0 px-1 break-words">
                  {sub}
                </span>
              </>
            );
            return (
              <li key={label}>
                {internal ? (
                  <Link to={href} className={cardClass}>{inner}</Link>
                ) : (
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cardClass}
                    onClick={() => {
                      if (href.startsWith("mailto:")) {
                        trackEvent("mailto_click", { source: "contact_channel_card", topic: label });
                        trackContactFormSubmit("mailto_channel");
                      } else if (href.startsWith("tel:")) {
                        trackEvent("tel_click", { source: "contact_channel_card" });
                      } else if (external) {
                        trackEvent("click_external_link", { source: "contact_channel_card", url: href });
                      }
                    }}
                  >
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-border p-6 sm:p-10" data-testid="contact-form-card">
          {submitted ? (
            <div className="text-center py-12" role="alert">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Email draft ready — please press Send
              </h3>
              <p className="text-muted-foreground mb-6">
                Your email app should have opened with a draft to{" "}
                <strong>{CONTACT_EMAIL}</strong>. We only receive your message after you press
                Send there — nothing was submitted automatically. A real person will reply within
                two working days once it arrives.
              </p>
              <button
                onClick={() => { setForm(blank); setSubmitted(false); }}
                type="button"
                className="min-h-11 px-6 py-2.5 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-semibold text-foreground mb-1.5">
                    Your name <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span>
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
                    Email address <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span>
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
                  Subject <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span>
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
                  Your message <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span>
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

              <div className="hidden" aria-hidden="true">
                <label htmlFor="c-website">Website</label>
                <input
                  id="c-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={handleSend}
                disabled={loading}
                aria-busy={loading}
                className="w-full min-h-11 flex items-center justify-center gap-2 py-3.5 px-6 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-sm"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Preparing your email…</>
                ) : (
                  <><Send className="w-4 h-4" aria-hidden="true" /> Open Mail App</>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                This opens a draft in your email app, addressed to{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() => {
                    trackEvent("mailto_click", { source: "contact_form_footnote" });
                    trackContactFormSubmit("mailto_footnote");
                  }}
                  className="text-primary underline underline-offset-2 break-all [overflow-wrap:anywhere]"
                >{CONTACT_EMAIL}</a>
                . Press Send there and we will reply within 2 working days.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
