import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, Package } from "lucide-react";
import { toast } from "sonner";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.product) {
          setProduct(data.data.product);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    if (handle) fetchProduct();
  }, [handle]);

  const handleAddToCart = async () => {
    if (!product) return;
    const variant = product.variants.edges[selectedVariantIdx]?.node;
    if (!variant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: product.title, position: "top-center" });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

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

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  return (
    <>
      <Helmet>
        <title>{product.title} | Shop — Living With Arthritis</title>
        <meta name="description" content={product.description?.slice(0, 160)} />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" className="mb-6" onClick={() => navigate("/shop")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                {images[selectedImage] ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        idx === selectedImage ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
              {variant && (
                <p className="text-2xl font-bold text-primary">
                  {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Variant selector */}
              {product.variants.edges.length > 1 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Variant</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((v, idx) => (
                      <Button
                        key={v.node.id}
                        variant={idx === selectedVariantIdx ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVariantIdx(idx)}
                        disabled={!v.node.availableForSale}
                      >
                        {v.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={cartLoading || !variant?.availableForSale}>
                {cartLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {variant?.availableForSale ? "Add to Cart" : "Sold Out"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
