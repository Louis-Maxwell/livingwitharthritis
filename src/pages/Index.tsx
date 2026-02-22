// Single-file React landing page – Lovable.dev / playground optimized
// Updated with Pilates + Yoga benefits, concise content, open-source images, fake backend

import { useEffect, useState, useRef } from "react";

// Custom debounce
const customDebounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Fake visible hook
const useVisible = (threshold = "400px") => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
};

// Simple image component
const SimpleImage = ({ src, alt, className = "", priority = false }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full object-cover ${className}`}
    loading={priority ? "eager" : "lazy"}
    width={800}
    height={480}
    style={{ opacity: 0, transition: "opacity 0.6s ease" }}
    onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
  />
);

// ────────────────────────────────────────────────
// Latest Insights articles (concise + new Pilates & Yoga cards)
const articlesData = [
  {
    title: "Tai Chi for Arthritis Relief",
    content:
      "Slow, flowing movements improve balance, flexibility, muscle strength, and joint function. Studies show it reduces knee pain by up to 50%, eases stiffness, lowers fall risk, and enhances sleep and quality of life.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg",
    alt: "Group practicing Tai Chi outdoors",
  },
  {
    title: "Pilates Benefits for Arthritis",
    content:
      "Low-impact Pilates strengthens core muscles, improves posture, and increases joint stability. It reduces pain and stiffness in knee and hip osteoarthritis, enhances flexibility, and supports better daily function with no joint strain.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beach-2563446_1280.jpg",
    alt: "Woman doing Pilates on mat near beach",
  },
  {
    title: "Yoga for Joint Health",
    content:
      "Gentle yoga increases range of motion, reduces joint stiffness, and strengthens supporting muscles. It lowers inflammation, eases chronic pain, improves balance to prevent falls, and promotes relaxation for better arthritis management.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/08/06/20/11/woman-2595930_1280.jpg",
    alt: "Woman in yoga pose at sunrise",
  },
  {
    title: "Swimming & Water Exercise",
    content:
      "Water buoyancy reduces joint load by up to 90%, allowing pain-free movement. It decreases stiffness, builds strength, improves cardiovascular health, and enhances mood through low-impact, full-body activity.",
    imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/09/32/woman-1868632_1280.jpg",
    alt: "Person swimming in pool for joint relief",
  },
];

// ────────────────────────────────────────────────
// Global styles
const globalStyles = `
  body { margin:0; font-family: system-ui, sans-serif; background:#f9fafb; }
  button { cursor: pointer; }
  details { transition: all 0.25s ease; }
  details:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 10px 25px rgba(0,0,0,0.12); }
  details[open] summary { font-weight: 600; color: #0d9488; }
  details[open] > div { animation: fadeIn 0.4s ease; }
  summary { list-style: none; outline: none; }
  summary::-webkit-details-marker { display: none; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
`;

// ────────────────────────────────────────────────
// Main component
export default function ArthritisRelief() {
  const [belowFoldRef, isBelowFoldVisible] = useVisible("400px");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");

  // Fake backend fetch for articles
  useEffect(() => {
    if (!isBelowFoldVisible) return;

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      // Simulate network + occasional failure
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 800));

      // 15% chance of "backend failure" for demo
      if (Math.random() < 0.15) {
        setError("Backend temporarily unavailable – showing fallback content");
        setArticles(articlesData);
      } else {
        setArticles(articlesData);
      }
      setLoading(false);
    };

    fetchArticles();
  }, [isBelowFoldVisible]);

  // Set title
  useEffect(() => {
    document.title = "Arthritis Relief – Gentle Exercises & Joint Health";
  }, []);

  // Inject styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Debounced assistant
  const debouncedAssistant = customDebounce((query) => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    if (q.includes("tai chi") || q.includes("pilates") || q.includes("yoga") || q.includes("swimming")) {
      setAssistantResponse(
        "These low-impact activities (Tai Chi, Pilates, yoga, swimming) are among the best for arthritis. They reduce pain, improve flexibility, strengthen supporting muscles, and enhance balance with minimal joint stress.",
      );
    } else {
      setAssistantResponse(
        "Low-impact movement and gentle stretching usually help most. Always consult your doctor for personalized advice.",
      );
    }
  }, 600);

  useEffect(() => {
    debouncedAssistant(assistantQuery);
  }, [assistantQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900">
      {/* Header */}
      <header className="py-6 bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">Arthritis Relief</h1>
          <nav className="space-x-6 text-sm md:text-base">
            <a href="#assistant" className="hover:text-teal-600">
              Assistant
            </a>
            <a href="#insights" className="hover:text-teal-600">
              Insights
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28 text-center bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-teal-800">
            Gentle Movement for Joint Comfort
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Tai Chi, Pilates, yoga, swimming and other low-impact practices to ease arthritis symptoms.
          </p>
          <button className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition shadow-md">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Virtual Assistant */}
      <section id="assistant" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-center text-teal-800">Your Arthritis Assistant</h3>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">
            <label htmlFor="assistant-query" className="sr-only">
              Ask about arthritis exercises or joint health
            </label>
            <input
              id="assistant-query"
              type="text"
              value={assistantQuery}
              onChange={(e) => setAssistantQuery(e.target.value)}
              placeholder="Ask about Tai Chi, Pilates, yoga or swimming…"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-lg"
            />
            <p className="text-sm text-gray-500 mt-3">
              Try: "Benefits of Pilates for arthritis?" or "Is yoga good for joints?"
            </p>
            <div
              role="region"
              aria-label="Assistant response"
              aria-live="polite"
              className="mt-6 min-h-[6rem] text-gray-700 leading-relaxed bg-white p-5 rounded-xl border border-gray-200"
            >
              {assistantResponse || <span className="text-gray-500 italic">Your answer will appear here…</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section id="insights" className="py-16 bg-gray-50" ref={belowFoldRef}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-teal-800">
            Latest Insights: Gentle Exercise Benefits
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Concise, evidence-informed benefits of joint-friendly activities
          </p>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-72 w-full bg-gray-200 rounded-2xl animate-pulse" />
                  <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto animate-pulse" />
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-600 font-medium">{error}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((item, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group"
                >
                  <SimpleImage src={item.imageUrl} alt={item.alt} className="h-64 md:h-72 lg:h-80" priority={idx < 2} />
                  <summary className="px-6 py-5 text-xl font-semibold cursor-pointer group-open:text-teal-700 transition-colors">
                    {item.title}
                  </summary>
                  <div className="px-6 pb-8 text-gray-700 leading-relaxed">{item.content}</div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-300 text-center text-sm">
        <p>© {new Date().getFullYear()} Arthritis Relief – Gentle movement for better joint health</p>
      </footer>

      {/* Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden bg-white/80 backdrop-blur-xl border-t border-gray-200 px-5 py-4 shadow-2xl">
        <button className="w-full bg-teal-600 text-white h-14 rounded-2xl text-base font-semibold shadow-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
          </svg>
          Book Free Consultation
        </button>
      </div>
    </div>
  );
}
