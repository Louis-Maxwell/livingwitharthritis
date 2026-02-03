import { memo } from "react";
import { useFundraisingOptions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const FundraisingSection = memo(() => {
  const { data: fundraisingOptions, isLoading } = useFundraisingOptions();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-8">
          {/* Fundraising Options List */}
          <div className="space-y-4">
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
        </div>
      </div>
    </section>
  );
});

FundraisingSection.displayName = "FundraisingSection";

export default FundraisingSection;
