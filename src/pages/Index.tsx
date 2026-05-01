import React, { useState, useEffect, useRef, useCallback, memo } from "react";

// ─── Constants & Security ─────────────────────────────────────────────
const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
const CONTACT_EMAIL = "info@livingwitharthritis.org.uk";

// Lightweight XSS Sanitizer (Replaces dompurify to save bundle size)
const sanitize = (str: string) => {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

// ─── SEO & Schema Markup (Native DOM for speed) ──────────────────────
const useSEO = () => {
  useEffect(() => {
    document.title = `Free Arthritis Support UK — NHS-Aligned Physio & AI Help | ${SITE_NAME}`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      if (name.startsWith("og:")) el.setAttribute("property", name);
      else el.setAttribute("name", name);
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Free virtual physiotherapy, anti-inflammatory meal plans and joint-safe exercises. Built with HCPC-registered clinicians. NICE-aligned. No waiting list.",
    );
    setMeta("og:title", `Free Arthritis Support UK | ${SITE_NAME}`);
    setMeta("og:url", SITE_URL);

    // Inject JSON-LD Schema safely
    const schemaId = "lwa-schema";
    if (!document.getElementById(schemaId)) {
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["MedicalOrganization", "NGO"],
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        medicalSpecialty: "Rheumatology",
        hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "HCPC Registration" },
      });
      document.head.appendChild(script);
    }
  }, []);
};

// ─── Custom Toast System (Replaces Sonner for zero dependencies) ──────
const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className={`fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-xl text-white font-medium animate-[fadeIn_0.3s_ease-in-out] ${type === "success" ? "bg-teal-600" : "bg-red-600"}`}
    >
      {message}
      <button onClick={onClose} className="ml-4 opacity-80 hover:opacity-100">
        ✕
      </button>
    </div>
  );
};

// ─── HYPER-FAST AI CHATBOT (Optimistic UI + Streaming Simulation) ─────
const FastChatbot = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "bot", text: "Hello! I'm your instant AI assistant. How can I help with your arthritis today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const simulateStream = useCallback((text: string) => {
    setIsTyping(true);
    setMessages((prev) => [...prev, { role: "bot", text: "" }]);
    let i = 0;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: "bot", text: text.substring(0, i + 1) };
        return newArr;
      });
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 10); // 10ms per character = extremely fast perceived speed
  }, []);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userText = sanitize(input);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    // Replace this with your actual API call (e.g., OpenAI, Groq) in a real backend
    setTimeout(() => {
      simulateStream(
        "Based on NHS guidelines, I recommend gentle range-of-motion exercises for that. Would you like a customized 5-minute routine?",
      );
    }, 200); // 200ms "thinking" time to feel instant but realistic
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-teal-600 text-white p-4 rounded-full shadow-2xl hover:bg-teal-700 transition-transform hover:scale-110 animate-bounce"
          aria-label="Open AI Assistant"
        >
          💬
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-[fadeIn_0.2s_ease-in-out]">
          <div className="bg-teal-600 text-white p-4 flex justify-between items-center font-bold">
            <span>AI Arthritis Assistant</span>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${m.role === "user" ? "bg-teal-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}
                >
                  {m.text || <span className="animate-pulse">●●●</span>}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="bg-teal-600 text-white px-4 rounded-lg font-bold disabled:opacity-50 hover:bg-teal-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
});

// ─── BOUNCE RATE REDUCTION COMPONENTS ─────────────────────────────────
const ExitIntentPopup = memo(({ onClose }: { onClose: () => void }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };
    window.addEventListener("mouseout", handler);
    return () => window.removeEventListener("mouseout", handler);
  }, []);
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center animate-[fadeIn_0.3s_ease-in-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Wait! Get Your Free Arthritis Guide</h3>
        <p className="text-gray-600 mb-6">Don't leave without our NHS-aligned flare-up management checklist.</p>
        <button
          onClick={() => {
            setShow(false);
            onClose();
          }}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition"
        >
          Download Free Guide
        </button>
        <button onClick={() => setShow(false)} className="w-full mt-3 text-gray-500 hover:text-gray-800">
          Maybe later
        </button>
      </div>
    </div>
  );
});

const EngagementPrompt = memo(() => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-20 right-6 z-40 max-w-xs bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-[fadeIn_0.3s_ease-in-out]">
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
      >
        ✕
      </button>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Struggling with joint pain?</strong> Try our free AI assistant now.
      </p>
      <button
        onClick={() => setShow(false)}
        className="w-full bg-gray-100 text-teal-700 py-2 rounded-lg text-sm font-semibold hover:bg-teal-50"
      >
        Ask AI a Question
      </button>
    </div>
  );
});

// ─── CONTACT FORM WITH VALIDATION (API READY) ────────────────────────
const ContactForm = memo(({ onToast }: { onToast: (m: string, t: "success" | "error") => void }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!form.name.trim()) {
      errors.name = "Required";
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Invalid email";
      valid = false;
    }
    if (!form.message.trim()) {
      errors.message = "Required";
      valid = false;
    }
    setErrors({ ...errors });
    if (!valid) return;

    setLoading(true);
    try {
      // TARGET ENDPOINT: Replace with your Lovable backend function or external API (e.g., Resend, Sendgrid)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onToast("Message sent successfully to " + CONTACT_EMAIL, "success");
        setForm({ name: "", email: "", message: "" });
      } else throw new Error("Failed");
    } catch (err) {
      onToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact Us</h3>
      <p className="text-gray-500 text-sm mb-6">Emails go directly to {CONTACT_EMAIL}</p>
      <div>
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <textarea
          placeholder="Your Message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`w-full p-3 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition disabled:bg-gray-400"
      >
        {loading ? "Sending Securely..." : "Send Message"}
      </button>
    </form>
  );
});

// ─── MAIN LANDING PAGE LAYOUT ─────────────────────────────────────────
export default function App() {
  useSEO();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showExit, setShowExit] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showExit && <ExitIntentPopup onClose={() => setShowExit(false)} />}
      <EngagementPrompt />
      <FastChatbot />

      {/* Skip Link for Accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-teal-600 focus:text-white focus:p-2 focus:rounded"
      >
        Skip to main content
      </a>

      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-teal-700">{SITE_NAME}</h1>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
            <a href="#resources" className="hover:text-teal-700">
              Resources
            </a>
            <a href="#contact" className="hover:text-teal-700">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="main" className="max-w-7xl mx-auto px-4 py-12 space-y-24">
        {/* Hero Section - Highly Optimized */}
        <section className="text-center space-y-6 py-12">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Free Arthritis Support.
            <br />
            <span className="text-teal-600">No Waiting Lists.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            NHS-aligned virtual physiotherapy, AI-guided symptom tracking, and anti-inflammatory diet plans. Built by
            HCPC-registered clinicians.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#contact"
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-700 transition-transform hover:scale-105"
            >
              Get Free Help Now
            </a>
            <a
              href="#resources"
              className="bg-white text-teal-700 px-8 py-3 rounded-lg font-bold border-2 border-teal-600 hover:bg-teal-50 transition"
            >
              Explore Resources
            </a>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {["HCPC Registered", "NICE Aligned", "100% Free", "UK Based"].map((item) => (
            <div
              key={item}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 font-semibold text-teal-800"
            >
              {item}
            </div>
          ))}
        </section>

        {/* Quick Tips (Bounce Rate Reduction) */}
        <section id="resources">
          <h3 className="text-3xl font-bold text-center mb-8">Quick Tips for Arthritis Relief</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Manage Flare-ups", desc: "Learn effective techniques to reduce pain quickly.", img: "🔥" },
              { title: "Joint-Friendly Exercise", desc: "Strengthen muscles without stressing joints.", img: "🧘" },
              {
                title: "Anti-Inflammatory Diet",
                desc: "Foods that reduce inflammation and improve symptoms.",
                img: "🥗",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{tip.img}</div>
                <h4 className="text-xl font-bold mb-2">{tip.title}</h4>
                <p className="text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="pb-12">
          <ContactForm onToast={(m, t) => setToast({ message: m, type: t })} />
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="font-bold text-white text-lg">{SITE_NAME}</p>
          <p>
            Email us:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-sm">© {new Date().getFullYear()} Living With Arthritis UK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
