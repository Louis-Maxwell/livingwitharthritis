import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Star, Package, ShieldCheck, Truck, RotateCcw, Info } from "lucide-react";
import { affiliateProducts } from "@/data/affiliateProducts";
import { motion } from "framer-motion";

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-5 h-5 ${
            s <= Math.floor(rating)
              ? "fill-primary text-primary"
              : s - 0.5 <= rating
              ? "fill-primary/50 text-primary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
    <span className="text-sm text-muted-foreground font-medium">
      {rating} ({count.toLocaleString()} reviews)
    </span>
  </div>
);

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-primary text-primary-foreground",
  "Top Rated": "bg-primary text-white",
  "Must Have": "bg-primary text-white",
  "Popular": "bg-primary text-white",
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();

  const product = affiliateProducts.find((p) => p.id === handle);

  // Related products from same category (exclude current)
  const related = product
    ? affiliateProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
    : [];

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
          <Package className="h-16 w-16 text-muted-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Button variant="outline" onClick={() => navigate("/shop")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const categoryLabel = {
    compression: "Compression & Support",
    exercise: "Exercise Equipment",
    supplements: "Supplements",
    "daily-living": "Daily Living Aids",
    "pain-relief": "Pain Relief",
    mobility: "Mobility Aids",
  }[product.category];

  return (
    <>
      <Helmet>
        <title>{product.title} | Recommended Products — Living With Arthritis</title>
        <meta name="description" content={product.description.slice(0, 160)} />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk/products/${product.slug}`} />
        <meta property="og:title" content={`${product.title} — Recommended Product`} />
        <meta property="og:description" content={product.description.slice(0, 200)} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://livingwitharthritis.org.uk/products/${product.slug}`} />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={product.image || "https://livingwitharthritis.org.uk/images/hero-community.jpg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} — Recommended Product`} />
        <meta name="twitter:description" content={product.description.slice(0, 200)} />
        <meta name="twitter:image" content={product.image || "https://livingwitharthritis.org.uk/images/hero-community.jpg"} />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
          {/* Breadcrumb */}
          <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" onClick={() => navigate("/shop")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                {product.badge && (
                  <Badge className={`absolute top-4 left-4 text-sm ${badgeColors[product.badge] || ""}`}>
                    {product.badge}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-5">
              <div>
                <Badge variant="secondary" className="mb-3 rounded-full">{categoryLabel}</Badge>
                <h1 className="text-3xl font-bold text-foreground leading-tight">{product.title}</h1>
              </div>

              <StarRating rating={product.rating} count={product.reviewCount} />

              <p className="text-2xl font-bold text-foreground">{product.price}</p>

              <p className="text-muted-foreground leading-relaxed text-[0.95rem]">{product.description}</p>

              {/* Trust signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { icon: <ShieldCheck className="w-5 h-5 text-primary" />, label: "Amazon Verified" },
                  { icon: <Truck className="w-5 h-5 text-primary" />, label: "Prime Eligible" },
                  { icon: <RotateCcw className="w-5 h-5 text-primary" />, label: "Easy Returns" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-muted/60 border border-border">
                    {item.icon}
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full rounded-xl gap-2 text-base h-12"
                onClick={() => window.open(product.amazonUrl, "_blank", "noopener,noreferrer")}
              >
                Buy on Amazon
                <ExternalLink className="w-4 h-4" />
              </Button>

              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>As an Amazon Associate, we earn from qualifying purchases. Price may vary.</span>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((rp) => (
                  <Card
                    key={rp.id}
                    className="group cursor-pointer hover:shadow-lg transition-shadow overflow-hidden border-border/60"
                    onClick={() => navigate(`/product/${rp.id}`)}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <CardContent className="p-4 space-y-1.5">
                      <h3 className="font-semibold text-foreground line-clamp-1">{rp.title}</h3>
                      <p className="font-bold text-foreground">{rp.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
