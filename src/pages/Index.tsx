// Single-file React landing page – Lovable.dev / playground optimized
// Updated with detailed Tai Chi & Swimming benefits – February 2026

import { useEffect, useState, useRef } from "react";

// Custom debounce (no external libs)
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
    style={{ opacity: 0, transition: "opacity 0.5s ease" }}
    onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
  />
);

// ────────────────────────────────────────────────
// Latest Insights data – expanded with Tai Chi & Swimming benefits
const latestInsights = [
  {
    title: "Tai Chi for Arthritis Relief",
    content:
      "Tai Chi is a gentle, flowing movement practice that improves balance, flexibility, muscular strength, and joint function while reducing pain and stiffness. Evidence shows it can significantly lower knee osteoarthritis pain (up to 34–54% in studies), decrease joint stiffness, enhance physical function, and reduce fall risk in older adults. It promotes relaxation, better sleep, and overall quality of life. Medical reviews support Tai Chi as a safe, effective non-drug option for osteoarthritis and other forms of arthritis.",
    imageUrl:
      "https://marvel-b1-cdn.bc0a.com/f00000000229348/www.silversneakers.com/wp-content/uploads/2017/03/SSBlog_LowImpactWorkouts_700x525-1.jpg",
    alt: "Group practicing Tai Chi in a peaceful park setting",
  },
  {
    title: "Swimming & Aquatic Exercise for Arthritis",
    content:
      "Swimming and water-based activities provide excellent low-impact exercise for arthritis. Water buoyancy reduces joint stress by up to 90%, allowing freer movement without pain. Studies show it decreases joint pain and stiffness, improves range of motion, strengthens muscles around joints, enhances cardiovascular fitness, and boosts mood through endorphin release. Aquatic exercise often outperforms land-based workouts for pain relief in osteoarthritis and rheumatoid arthritis, while also supporting weight management and overall function.",
    imageUrl: "https://res.cloudinary.com/sharecare/image/upload/f_auto/v1699550642/articles/tai-chi-yoga",
    alt: "Person swimming laps in a pool for gentle joint-friendly exercise",
  },
  {
    title: "Range-of-Motion Exercises",
    content:
      "Gentle daily stretches help maintain joint flexibility, reduce morning stiffness, and support easier movement throughout the day.",
    imageUrl:
      "https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs12906-023-04070-0/MediaObjects/12906_2023_4070_Fig2_HTML.png",
    alt: "Illustrated gentle stretching routine for joints",
  },
  {
    title: "Strengthening for Joint Support",
    content:
      "Light resistance builds protective muscle around joints, helping stabilize them and improve everyday comfort and function.",
    imageUrl:
      "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd_fAVCtF-W6UYkqco0rJGzlrgtyXjpkLAqU7kh2NjGYLK17jMiaRmR8Djr3QfMZbiIEDSDNFUbYWbC6VlWKR7SxpmJVzeXo7xaVrjaEf0KmGC_0C8eglhWiPObAp50NnjsROXwYEeuXdarknq7VL8HPvsaXlsE5TitUQ1kDQ?key=ehC6xXLlbzYj_c-wtJykJw",
    alt: "Person doing light strength exercises for joint health",
  },
];

// ────────────────────────────────────────────────
// Global styles (reset + hover effects + fade-in)
const globalStyles = `
  body { margin:0; font-family: system-ui, -apple-system, sans-serif; background:#f9fafb; }
  button { cursor: pointer; }
  details { transition: all 0.25s ease; }
  details:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  }
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
  const [insightsVisible, setInsightsVisible] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");

  // Inject global styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Set page title
  useEffect(() => {
    document.title = "Arthritis Relief – Gentle Exercises & Support";
  }, []);

  // Debounced fake assistant
  const debouncedAssistant = customDebounce((query) => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    if (q.includes("tai chi") || q.includes("swimming")) {
      setAssistantResponse(
        "Both Tai Chi and swimming are highly recommended for arthritis. They reduce pain and stiffness, improve joint function, balance, and overall well-being while being very gentle on the body.",
      );
    } else {
      setAssistantResponse(
        "Low-impact movement like walking, gentle stretching, or water exercise often helps most. Consult your healthcare provider for personalized advice.",
      );
    }
  }, 600);

  useEffect(() => {
    debouncedAssistant(assistantQuery);
  }, [assistantQuery]);

  // Fake loading delay for insights
  useEffect(() => {
    if (isBelowFoldVisible) {
      setTimeout(() => setInsightsVisible(true), 1200);
    }
  }, [isBelowFoldVisible]);

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
            Explore Tai Chi, swimming, Pilates and other low-impact activities to ease arthritis symptoms and support
            daily life.
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
              placeholder="Ask about Tai Chi, swimming or arthritis relief…"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-lg"
            />
            <p className="text-sm text-gray-500 mt-3">
              Try: "What are the benefits of Tai Chi?" or "Is swimming good for arthritis?"
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

      {/* Latest Insights / Gentle Exercise Guides */}
      <section id="insights" className="py-16 bg-gray-50" ref={belowFoldRef as React.RefObject<HTMLElement>}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-teal-800">
            Latest Insights: Gentle Exercise Benefits
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Evidence-informed summaries of Tai Chi, swimming and other joint-friendly activities
          </p>

          {isBelowFoldVisible ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestInsights.map((item, idx) => (
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-72 w-full bg-gray-200 rounded-2xl animate-pulse" />
                  <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto animate-pulse" />
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                </div>
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
