import { Phone, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_EMAILS,
} from "@/config/contact";

const WHATSAPP_URL = `https://wa.me/44${CONTACT_PHONE_TEL.replace(/^0/, "")}`;

const trackClick = (channel: string) => {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
      "event",
      "helpline_click",
      { channel },
    );
  } catch {
    /* no-op */
  }
};

/**
 * Full-width helpline strip — placed above the footer on every page.
 * Renders the four contact channels (phone, email, WhatsApp, form) with
 * shared GA tracking. Uses brand red token for the band itself; channel
 * cards use card surface so the band reads scannably on any page.
 */
type Channel = {
  Icon: typeof Phone;
  eyebrow: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
  track: string;
};

const channels: Channel[] = [
  {
    Icon: Phone,
    eyebrow: "Call",
    value: CONTACT_PHONE,
    sub: "Mon–Fri, 9am–5pm",
    href: `tel:${CONTACT_PHONE_TEL}`,
    track: "phone",
  },
  {
    Icon: Mail,
    eyebrow: "Email",
    value: CONTACT_EMAILS.info,
    sub: "Reply within 2 working days",
    href: `mailto:${CONTACT_EMAILS.info}`,
    track: "email",
  },
  {
    Icon: MessageCircle,
    eyebrow: "WhatsApp",
    value: "Chat with us",
    sub: "Fast, friendly replies",
    href: WHATSAPP_URL,
    external: true,
    track: "whatsapp",
  },
  {
    Icon: MessageSquare,
    eyebrow: "Contact form",
    value: "Send a message",
    sub: "We’ll get back to you",
    href: "/contact",
    track: "form",
  },
];

export default function HelplineWidget() {
  return (
    <section
      aria-labelledby="helpline-heading"
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-6xl">
        <div className="text-center mb-10">
          <h2
            id="helpline-heading"
            className="font-display text-3xl md:text-4xl font-black tracking-tight"
          >
            We’re here to help
          </h2>
          <p className="mt-3 text-sm md:text-base text-primary-foreground/90 max-w-2xl mx-auto">
            A real person — not a chatbot — replies within 2 working days.
            Available Monday to Friday, 9am – 5pm.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {channels.map(({ Icon, eyebrow, value, sub, href, external, track }) => {
            const cardClass =
              "group relative flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white text-foreground shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60";
            const inner = (
              <>
                <span
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300"
                  aria-hidden
                >
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                  {eyebrow}
                </span>
                <span className="font-bold text-sm md:text-base text-foreground break-words leading-snug">
                  {value}
                </span>
                <span className="text-xs text-muted-foreground">{sub}</span>
              </>
            );
            return (
              <li key={eyebrow}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(track)}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                ) : href.startsWith("/") ? (
                  <Link to={href} onClick={() => trackClick(track)} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <a href={href} onClick={() => trackClick(track)} className={cardClass}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
