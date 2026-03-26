import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Star,
  Package,
  Shield,
  Dumbbell,
  Pill,
  HandHelping,
  Heart,
  Footprints,
  Search,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { affiliateProducts, categories, type AffiliateProduct } from "@/data/affiliateProducts";
import PageHero from "@/components/ui/PageHero";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Dumbbell: <Dumbbell className="w-4 h-4" />,
  Pill: <Pill className="w-4 h-4" />,
  HandHelping: <HandHelping className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Footprints: <Footprints className="w-4 h-4" />,
};

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-primary text-primary-foreground",
  "Top Rated": "bg-amber-500 text-white",
  "Must Have": "bg-emerald-600 text-white",
  "Popular": "bg-blue-600 text-white",
};

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : s - 0.5 <= rating
              ? "fill-amber-400/50 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
    <span className="text-xs text-muted-foreground">({count.toLocaleString()})</span>
  </div>
);

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = affiliateProducts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Best Arthritis Products UK – Compression Gloves, Supplements & Aids</title>
        <meta name="description" content="Top-rated arthritis products recommended for UK patients: compression gloves, joint supplements, exercise equipment, daily living aids and ergonomic tools for osteoarthritis and RA relief." />
        <meta name="keywords" content="arthritis products UK, compression gloves arthritis, arthritis supplements UK, daily living aids arthritis, arthritis gadgets UK, ergonomic tools joint pain, knee support arthritis UK, arthritis exercise equipment, arthritis pain relief products, best arthritis aids UK" />
        <meta property="og:title" content="Best Arthritis Products UK – Compression Gloves, Supplements & Aids" />
        <meta property="og:description" content="Curated arthritis products for UK patients: compression gloves, supplements, exercise equipment and daily living aids." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/shop" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Best Arthritis Products UK" />
        <meta name="twitter:description" content="Top-rated arthritis products recommended for UK patients." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/shop" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/shop" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Best Arthritis Products UK",
          "description": "Curated arthritis products including compression gloves, supplements, exercise equipment and daily living aids for UK patients.",
          "url": "https://livingwitharthritis.org.uk/shop",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Recommended Products"
          subtitle="Carefully selected products to help manage arthritis symptoms and improve daily life"
        />

        <div className="container mx-auto px-4 sm:px-6 py-10 max-w-7xl">
          {/* Affiliate notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/60 border border-border mb-8">
            <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              As an Amazon Associate, we earn from qualifying purchases. All products are independently selected based on quality and relevance to arthritis management. Prices shown are approximate.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="space-y-4 mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full gap-1.5"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {iconMap[cat.icon]}
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Product count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No products match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

const ProductCard = ({ product, index }: { product: AffiliateProduct; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04, duration: 0.35 }}
  >
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/60">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <Badge className={`absolute top-3 left-3 text-xs font-semibold ${badgeColors[product.badge] || "bg-primary text-primary-foreground"}`}>
            {product.badge}
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2 text-[0.95rem]">
          {product.title}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2 mt-auto">
          <span className="text-lg font-bold text-foreground">{product.price}</span>
          <Button
            size="sm"
            className="rounded-full gap-1.5"
            onClick={() => window.open(product.amazonUrl, "_blank", "noopener,noreferrer")}
          >
            View on Amazon
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default Shop;
