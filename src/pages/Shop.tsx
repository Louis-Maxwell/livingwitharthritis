import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Loader2, Package } from "lucide-react";
import { toast } from "sonner";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import PageHero from "@/components/ui/PageHero";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <>
      <Helmet>
        <title>Shop | Living With Arthritis</title>
        <meta name="description" content="Browse arthritis support products and aids from Living With Arthritis." />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background">
        <PageHero
          title="Shop"
          subtitle="Browse our range of arthritis support products"
        />
        <div className="container mx-auto px-4 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading products...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No products found</h2>
              <p className="text-muted-foreground">
                Our shop is coming soon. Check back later for arthritis support products!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const image = product.node.images.edges[0]?.node;
                const price = product.node.priceRange.minVariantPrice;
                return (
                  <Card
                    key={product.node.id}
                    className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  >
                    <div
                      className="aspect-square overflow-hidden bg-muted"
                      onClick={() => navigate(`/product/${product.node.handle}`)}
                    >
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <h3
                        className="font-semibold text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                        onClick={() => navigate(`/product/${product.node.handle}`)}
                      >
                        {product.node.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.node.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-foreground">
                          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
                        </span>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          disabled={cartLoading}
                        >
                          {cartLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
