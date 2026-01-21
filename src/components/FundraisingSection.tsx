import { memo } from "react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useFundraisingOptions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const FundraisingSection = memo(() => {
  const { data: fundraisingOptions, isLoading } = useFundraisingOptions();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fundraising Options List */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="border-b border-border pb-4 last:border-0">
                  <Skeleton className="h-6 w-48" />
                </div>
              ))
            ) : (
              fundraisingOptions?.map((option) => (
                <div
                  key={option.id}
                  className="border-b border-border pb-4 last:border-0"
                >
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 font-medium text-lg transition-colors"
                  >
                    {option.title}
                  </a>
                </div>
              ))
            )}
          </div>

          {/* Young Adult Hub Card */}
          <div className="bg-primary rounded-lg p-8 text-white flex flex-col justify-between shadow-elegant">
            <div>
              <h3 className="text-2xl font-bold mb-6">Young Adult Hub</h3>
              <Button
                variant="secondary"
                className="mb-6 bg-white text-primary hover:bg-white/90"
              >
                Visit Hub
              </Button>
            </div>
            <div className="mt-4">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop"
                alt="Young adults together"
                className="w-full h-32 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FundraisingSection.displayName = "FundraisingSection";

export default FundraisingSection;
