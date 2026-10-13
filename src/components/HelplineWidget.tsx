import { Phone, Mail, MessageCircle, MessageSquare, ArrowUpRight } from "lucide-react";
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

/** Accessible contact cards with shared analytics tracking. */
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
      className="border-y border-border bg-white text-foreground"
    >
      <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 max-w-6xl">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2
            id="helpline-heading"
            className="font-display text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.01em]"
          >
            We’re here to help
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
            A real person — not a chatbot — replies within 2 working days.
            Available Monday to Friday, 9am – 5pm.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {channels.map(({ Icon, eyebrow, value, sub, href, external, track }) => {
            const cardClass =
              "group flex h-full w-full min-w-0 flex-col rounded-2xl border border-transparent bg-background p-6 md:p-8 text-left text-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 motion-reduce:transition-none";
            const inner = (
              <>
                <span className="mb-8 flex w-full items-center justify-between gap-4">
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                    {eyebrow}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-white transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white motion-reduce:transition-none" aria-hidden="true">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </span>
                <span className={`w-full min-w-0 font-medium tracking-[-0.01em] leading-snug [overflow-wrap:anywhere] ${track === "email" ? "text-lg sm:text-xl lg:text-2xl" : "text-2xl md:text-3xl"}`}>
                  {track === "email" ? <>{value.split("@")[0]}@<wbr />{value.split("@")[1]}</> : value}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-muted-foreground">{sub}</span>
              </>
            );
            return (
              <li key={eyebrow} className="min-w-0">
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
