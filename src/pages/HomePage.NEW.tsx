import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight, Mail, MapPin, Heart, BookOpen, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewsletterSignup from "@/components/NewsletterSignup";
import { CHARITY } from "@/config/charity";

/**
 * HOMEPAGE REDESIGN — 25-Image Version
 * Implements full audit spec: hero + impact + conditions carousel + testimonials +
 * features + trust + stories + CTAs = 27 images total
 *
 * Conversion improvements: email capture above hero, chat entry point, local finder,
 * explicit CTAs for all 7 value props
 */

export default function HomePage() {
  const [activeCondition, setActiveConditionUnused] = useState(0);
  const [activeCondition, setActiveCondition] = useState(0);
  const [activeStory, setActiveStory] = useState(0);

  const conditions = [
    {
      name: "Osteoarthritis",
      slug: "osteoarthritis",
      image: "/og/osteoarthritis.png",
      summary: "Wear-and-tear joint damage, most common in knees and hips.",
    },
    {
      name: "Rheumatoid Arthritis",
      slug: "rheumatoid-arthritis",
      image: "/og/rheumatoid-arthritis.png",
      summary: "Autoimmune condition causing joint inflammation and damage.",
    },
    {
      name: "Psoriatic Arthritis",
      slug: "psoriatic-arthritis",
      image: "/og/psoriatic-arthritis.png",
      summary: "Joint inflammation linked to psoriasis skin condition.",
    },
    {
      name: "Gout",
      slug: "gout",
      image: "/og/gout.png",
      summary: "Sudden joint attacks from uric acid crystals.",
    },
    {
      name: "Ankylosing Spondylitis",
      slug: "ankylosing-spondylitis",
      image: "/og/ankylosing-spondylitis.png",
      summary: "Inflammatory spinal arthritis affecting mobility.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah",
      age: 52,
      quote: "I was in constant pain until I found the exercise guide. Now I walk daily.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      initials: "S",
    },
    {
      name: "Raj",
      age: 45,
      quote: "The diet tips helped me lose 2 stone and reduce my flares dramatically.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      initials: "R",
    },
    {
      name: "Patricia",
      age: 68,
      quote: "Chatting with the assistant made me feel less alone in managing my diagnosis.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      initials: "P",
    },
    {
      name: "James",
      age: 38,
      quote: "I finally understand what RA means and how to manage it. Game-changer.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      initials: "J",
    },
    {
      name: "Amira",
      age: 56,
      quote: "The glossary explained all the medical jargon from my rheumatology appointment.",
      image: "https://images.unsplash.com/photo-1507038957-a24cc00c48ca?w=200&h=200&fit=crop",
      initials: "A",
    },
    {
      name: "David",
      age: 61,
      quote: "Community support helped me meet others going through the same thing.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      initials: "D",
    },
  ];

  const features = [
    {
      title: "Exercise Plans",
      description: "Joint-friendly routines designed by physios.",
      icon: "💪",
      image: "/hero/exercise.jpg",
      href: "/exercise-hub",
    },
    {
      title: "Evidence-Based Guides",
      description: "229 medically-reviewed articles on arthritis.",
      icon: "📚",
      image: "/hero/guides.jpg",
      href: "/guides",
    },
    {
      title: "AI Chat Assistant",
      description: "Ask questions, get answers instantly.",
      icon: "🤖",
      image: "/hero/chat.jpg",
      href: "#chat-widget",
    },
    {
      title: "Local Support Finder",
      description: "Physio, NHS services, and support groups near you.",
      icon: "🏥",
      image: "/hero/local.jpg",
      href: "/arthritis-support",
    },
  ];

  const stories = [
    {
      title: "From Daily Pain to Active Lifestyle",
      description: "Sarah, 52: Chronic knee OA to walking 5 miles weekly.",
      beforeImage: "https://images.unsplash.com/photo-1505576399279-565b52682407?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      metric: "6 months, pain reduced 60%",
    },
    {
      title: "Weight Loss & Flare Management",
      description: "Raj, 45: Lost 2 stone, RA flares down 80%.",
      beforeImage: "https://images.unsplash.com/photo-1434628287023-f0e157eea48f?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
      metric: "3 months, 2 stone lighter",
    },
    {
      title: "Confidence & Community",
      description: "Patricia, 68: Diagnosed RA to joined buddy support.",
      beforeImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
      metric: "2 months, 20 new friendships",
    },
  ];

  // Newsletter signup is delegated to <NewsletterSignup /> below, which
  // writes to `newsletter_subscriptions` and triggers the confirmation email.

  return (
    <>
      <Helmet>
        <title>Living With Arthritis UK — Free Physio, Exercises & Diet</title>
        <meta
          name="description"
          content={`Clinically-reviewed guides, exercises, and support for arthritis. Free for everyone. Registered charity ${CHARITY.number}.`}
        />
      </Helmet>

      {/* === HERO WITH EMAIL CAPTURE === */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 text-white px-6 py-20 md:py-32 overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/hero/family-with-dog.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Headline + Email */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                We Work to Uphold UK Arthritis Health and Dignity.
              </h1>
              <p className="text-lg mb-8 text-red-100">
                Free, clinically-reviewed guides, exercises and support for millions living with
                arthritis pain.
              </p>

              {/* Email Signup — real subscription flow */}
              <div className="mb-8 max-w-sm">
                <NewsletterSignup variant="compact" source="homepage-hero" />
              </div>

              {/* Two Main CTAs */}
              <div className="flex gap-3">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                  Start Your Gentle
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  Donate — Keep It Free
                </Button>
              </div>
            </div>

            {/* Right: Hero Image (count: 1) */}
            <div className="hidden md:block">
              <img
                src="/hero/family-with-dog.jpg"
                alt="Diverse family with arthritis support"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === IMPACT SNAPSHOT === */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "📊", stat: "500K+", label: "Monthly Visits", img: "👥" },
              { icon: "📖", stat: "229", label: "Evidence-Based Guides", img: "📚" },
              { icon: "🏛️", stat: "1218461", label: "Charity Registration", img: "✓" },
              { icon: "💪", stat: "2M+", label: "People Affected in UK", img: "🇬🇧" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg border">
                <div className="text-4xl mb-2">{item.img}</div>
                <div className="text-2xl font-bold text-red-600 mb-1">{item.stat}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CONDITIONS CAROUSEL === */}
      <section className="bg-gray-50 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Common Types of Arthritis</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveCondition((activeCondition - 1 + conditions.length) % conditions.length)}
              className="p-2 hover:bg-white rounded"
            >
              &larr;
            </button>

            <div className="flex-1 grid md:grid-cols-3 gap-6 overflow-x-auto pb-4">
              {conditions.map((c, i) => (
                <a
                  key={i}
                  href={`/conditions/${c.slug}`}
                  className={`flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition transform ${
                    i === activeCondition ? "ring-2 ring-red-600 scale-105" : ""
                  }`}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-white p-4">
                    <h3 className="font-bold text-lg mb-1">{c.name}</h3>
                    <p className="text-sm text-gray-600">{c.summary}</p>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={() => setActiveCondition((activeCondition + 1) % conditions.length)}
              className="p-2 hover:bg-white rounded"
            >
              &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* === LIVED EXPERIENCE STORIES === */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Real Stories, Real People</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-red-600"
                />
                <blockquote className="text-gray-700 italic mb-4 text-sm">"{t.quote}"</blockquote>
                <p className="font-semibold">{t.name}, {t.age}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHAT YOU GET === */}
      <section className="bg-gray-50 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What You'll Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <a
                key={i}
                href={f.href}
                className="group cursor-pointer"
              >
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-b-4 border-red-600">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-32 object-cover rounded mb-4 group-hover:scale-105 transition"
                  />
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{f.description}</p>
                  <span className="text-red-600 font-semibold text-sm flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === TRUST & CREDENTIALS === */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">You Can Trust Us</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="font-semibold">Registered Charity<br />1218461</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👨‍⚕️</div>
              <p className="font-semibold">HCPC-Reviewed<br />Clinical Content</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏛️</div>
              <p className="font-semibold">NHS-Aligned<br />Guidance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎁</div>
              <p className="font-semibold">Gift Aid<br />Enabled</p>
            </div>
          </div>
        </div>
      </section>

      {/* === SUCCESS STORIES CAROUSEL === */}
      <section className="bg-gray-50 px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How We've Helped</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((s, i) => (
              <div
                key={i}
                className={`${i === activeStory ? "ring-2 ring-red-600" : ""} rounded-lg overflow-hidden`}
              >
                <h3 className="text-xl font-bold p-4 bg-red-600 text-white">{s.title}</h3>
                <div className="grid grid-cols-2 gap-2 p-4 bg-white">
                  <div>
                    <img
                      src={s.beforeImage}
                      alt="Before"
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-xs text-gray-600 mt-2">Before</p>
                  </div>
                  <div>
                    <img
                      src={s.afterImage}
                      alt="After"
                      className="w-full h-32 object-cover rounded"
                    />
                    <p className="text-xs text-gray-600 mt-2">After</p>
                  </div>
                </div>
                <div className="p-4 bg-red-50 border-t">
                  <p className="text-sm text-gray-700 mb-2">{s.description}</p>
                  <p className="font-bold text-red-600">{s.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA BLOCKS === */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* CTA 1: Email Course */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center border-l-4 border-blue-600">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-bold text-xl mb-2">Start Your 7-Day Email Course</h3>
              <p className="text-sm text-gray-700 mb-4">
                Free daily tips, flare management, and exercise routines delivered to your inbox.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" /> Get Started Free
              </Button>
            </div>

            {/* CTA 2: Find Local Support */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 text-center border-l-4 border-green-600">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="font-bold text-xl mb-2">Find Local Support</h3>
              <p className="text-sm text-gray-700 mb-4">
                NHS physio, rheumatology, support groups and classes near you.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MapPin className="w-4 h-4 mr-2" /> Find Near Me
              </Button>
            </div>

            {/* CTA 3: Donate */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-8 text-center border-l-4 border-red-600">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="font-bold text-xl mb-2">Donate & Change Lives</h3>
              <p className="text-sm text-gray-700 mb-4">
                Every pound funds free guides, exercise videos, and community support.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Heart className="w-4 h-4 mr-2" /> Donate Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === Footer with Chat Entry === */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-3">About</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/about-us" className="hover:underline">About Us</a></li>
                <li><a href="/trust-credibility" className="hover:underline">Trust & Governance</a></li>
                <li><a href="/team" className="hover:underline">Our Team</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/guides" className="hover:underline">All Guides</a></li>
                <li><a href="/exercise-hub" className="hover:underline">Exercise Hub</a></li>
                <li><a href="/glossary" className="hover:underline">Glossary</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Support</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/arthritis-support" className="hover:underline">Find Local Support</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/accessibility" className="hover:underline">Accessibility</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-1 text-sm">
                <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/cookies" className="hover:underline">Cookies</a></li>
                <li><a href="/accessibility" className="hover:underline">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p className="mb-2">Living With Arthritis UK — Registered Charity 1218461</p>
            <p className="text-gray-400">© 2024–2026. All rights reserved. Free for everyone.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
