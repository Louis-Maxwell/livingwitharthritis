// Single-file React landing page – Lovable.dev / playground optimized
// All feedback applied – February 2026 version

import { useEffect, useState, useRef } from "react";

// ────────────────────────────────────────────────
// Custom debounce (no external libs)
const customDebounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// ────────────────────────────────────────────────
// Fake visible hook (IntersectionObserver simulation)
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

// ────────────────────────────────────────────────
// Simple image (no picture element – playground friendly)
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
// Article data (short for demo, paraphrased to avoid copyright)
const articles = [
  {
    title: "Tai Chi for Arthritis Relief",
    content:
      "This gentle practice involves slow, flowing movements that enhance balance, flexibility, and joint comfort. It's particularly beneficial for older adults and those with joint conditions like osteoarthritis.",
    imageUrl:
      "https://marvel-b1-cdn.bc0a.com/f00000000229348/www.silversneakers.com/wp-content/uploads/2017/03/SSBlog_LowImpactWorkouts_700x525-1.jpg",
    alt: "Group of seniors practicing Tai Chi in park",
  },
  {
    title: "Pilates for Joint Health",
    content:
      "Pilates focuses on controlled, low-impact exercises to build core strength, improve posture, and provide better support for joints, making it suitable for managing discomfort.",
    imageUrl:
      "https://myoa.org.au/sites/default/files/styles/content_main_1000x600/public/2024-10/GettyImages-1663808463.jpg?itok=TVdZ5tw6",
    alt: "People doing Tai Chi exercises outdoors",
  },
  {
    title: "Range-of-Motion Exercises",
    content:
      "These simple stretches help maintain joint flexibility and reduce stiffness. Gently move your joints through their natural range daily, starting slowly to avoid strain.",
    imageUrl: "https://res.cloudinary.com/sharecare/image/upload/f_auto/v1699550642/articles/tai-chi-yoga",
    alt: "Women practicing yoga or Tai Chi in park",
  },
  {
    title: "Strengthening for Joint Support",
    content:
      "Using light resistance, these exercises build muscle around joints to offer protection and improve everyday function. Focus on proper technique to stay safe.",
    imageUrl:
      "https://lh7-rt.googleusercontent.com/docsz/AD_4nXd_fAVCtF-W6UYkqco0rJGzlrgtyXjpkLAqU7kh2NjGYLK17jMiaRmR8Djr3QfMZbiIEDSDNFUbYWbC6VlWKR7SxpmJVzeXo7xaVrjaEf0KmGC_0C8eglhWiPObAp50NnjsROXwYEeuXdarknq7VL8HPvsaXlsE5TitUQ1kDQ?key=ehC6xXLlbzYj_c-wtJykJw",
    alt: "Infographic of joint-friendly exercises",
  },
];

// Conditions data (backend simulation)
const conditions = [
  { title: "Osteoarthritis", description: "Common joint wear-and-tear condition affecting cartilage." },
  { title: "Rheumatoid Arthritis", description: "Autoimmune disorder causing joint inflammation." },
  { title: "Psoriatic Arthritis", description: "Inflammation linked to skin condition psoriasis." },
];

// Get Involved data (paraphrased from UK charities: Versus Arthritis, NRAS, Arthritis Action)
const getInvolved = [
  { title: "Donate", description: "Support research and services through financial contributions or legacy gifts." },
  {
    title: "Volunteer",
    description: "Join teams to raise awareness, organize events, or help with community support.",
  },
  { title: "Fundraise", description: "Participate in challenges, runs, or personal campaigns to generate funds." },
  { title: "Join Newsletter", description: "Stay updated and connected with the arthritis community." },
  { title: "Awareness Campaigns", description: "Take part in social media challenges or advocacy efforts." },
];

// About Us data (improvised backend simulation)
const aboutUs =
  "We are dedicated to supporting people with arthritis through gentle exercises, expert advice, and community resources. Our mission is to improve joint health and quality of life.";

// Anti-inflammatory foods data (paraphrased from sources)
const antiInflammatoryFoods = [
  { name: "Fatty Fish", description: "Rich in omega-3s like salmon or mackerel, helping reduce joint swelling." },
  { name: "Berries", description: "Antioxidant-packed fruits like strawberries and blueberries combat inflammation." },
  { name: "Leafy Greens", description: "Spinach and kale provide vitamins that support joint health." },
  { name: "Turmeric", description: "Contains curcumin, a natural compound that eases arthritis symptoms." },
  { name: "Nuts", description: "Almonds and walnuts offer healthy fats and anti-inflammatory properties." },
];

// ────────────────────────────────────────────────
// Global styles (reset + card hover + fade-in)
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
  const [articlesVisible, setArticlesVisible] = useState(false);
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
    if (q.includes("tai chi") || q.includes("pilates")) {
      setAssistantResponse(
        "Yes — both Tai Chi and Pilates are excellent for arthritis. They improve flexibility, strength and balance while being very gentle on joints.",
      );
    } else {
      setAssistantResponse(
        "Low-impact activities like walking, swimming or Tai Chi usually help best. Always check with your doctor first.",
      );
    }
  }, 600);

  useEffect(() => {
    debouncedAssistant(assistantQuery);
  }, [assistantQuery]);

  // Fake loading delay for articles
  useEffect(() => {
    if (isBelowFoldVisible) {
      setTimeout(() => setArticlesVisible(true), 1200);
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
            <a href="#guides" className="hover:text-teal-600">
              Guides
            </a>
            <a href="#conditions" className="hover:text-teal-600">
              Conditions
            </a>
            <a href="#get-involved" className="hover:text-teal-600">
              Get Involved
            </a>
            <a href="#about-us" className="hover:text-teal-600">
              About Us
            </a>
            <a href="#anti-inflammatory" className="hover:text-teal-600">
              Anti-Inflammatory Foods
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-28 text-center bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-teal-800">
            Gentle Movement for Better Joints
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Discover Tai Chi, Pilates and low-impact exercises to ease arthritis pain and improve daily mobility.
          </p>
          <button className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition shadow-md">
            Book Free Consultation
          </button>
        </div>
      </section>

      {/* Virtual Assistant */}
      <section id="assistant" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-center text-teal-800">Ask the Assistant</h3>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200">
            <label htmlFor="assistant-query" className="sr-only">
              Ask about arthritis exercises, Tai Chi or Pilates
            </label>
            <input
              id="assistant-query"
              type="text"
              value={assistantQuery}
              onChange={(e) => setAssistantQuery(e.target.value)}
              placeholder="Ask about Tai Chi, Pilates or joint pain relief…"
              className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition text-lg"
            />
            <p className="text-sm text-gray-500 mt-3">
              Try asking: "Is Tai Chi good for arthritis?" or "Best exercises for knee pain"
            </p>
            <div
              role="region"
              aria-label="Assistant answer"
              aria-live="polite"
              className="mt-6 min-h-[6rem] text-gray-700 leading-relaxed bg-white p-5 rounded-xl border border-gray-200"
            >
              {assistantResponse || <span className="text-gray-500 italic">Your answer will appear here…</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section id="conditions" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-teal-800">Arthritis Conditions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conditions.map((cond, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-teal-700">{cond.title}</h3>
                <p className="text-gray-700">{cond.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-teal-800">Get Involved</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getInvolved.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-teal-700">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-800">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{aboutUs}</p>
        </div>
      </section>

      {/* Anti-Inflammatory Foods Section */}
      <section id="anti-inflammatory" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-teal-800">Anti-Inflammatory Foods</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {antiInflammatoryFoods.map((food, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-teal-700">{food.name}</h3>
                <p className="text-gray-700">{food.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gentle Exercise Guides / Latest Insights */}
      <section id="guides" className="py-16 bg-gray-50" ref={belowFoldRef}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-teal-800">
            Latest Insights: Gentle Exercise Guides
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Paraphrased insights on Tai Chi, Pilates & other movements from open sources
          </p>

          {articlesVisible ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, idx) => (
                <details
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group"
                >
                  <SimpleImage
                    src={article.imageUrl}
                    alt={article.alt}
                    className="h-64 md:h-72 lg:h-80"
                    priority={idx < 2}
                  />
                  <summary className="px-6 py-5 text-xl font-semibold cursor-pointer group-open:text-teal-700 transition-colors">
                    {article.title}
                  </summary>
                  <div className="px-6 pb-8 text-gray-700 leading-relaxed">{article.content}</div>
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

      {/* Living with Arthritis Section (clean, same color theme) */}
      <section id="living-with-arthritis" className="py-16 bg-teal-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-800">Living with Arthritis</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Managing arthritis involves daily gentle movement, balanced nutrition, and community support. Explore our
            guides for tips on maintaining an active lifestyle.
          </p>
          <button className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition shadow-md">
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-gray-300 text-center text-sm">
        <p>© {new Date().getFullYear()} Arthritis Relief – Supporting joint health naturally</p>
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
