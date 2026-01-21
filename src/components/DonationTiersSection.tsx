import { memo } from "react";
import { useDonationTiers } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const TierSkeleton = () => (
  <div className="bg-muted/50 p-8 rounded-lg max-w-sm">
    <Skeleton className="h-8 w-32 mb-6" />
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <Skeleton className="w-2 h-2 mt-2 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  </div>
);

const DonationTiersSection = memo(() => {
  const { data: tiers, isLoading } = useDonationTiers();

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 justify-start">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <TierSkeleton key={i} />)
          ) : (
            tiers?.map((tier) => (
              <div
                key={tier.id}
                className={`bg-gradient-to-br ${tier.color} text-white p-8 rounded-lg shadow-lg relative overflow-hidden max-w-sm`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)"
                }}
              >
                <h3 className="text-3xl font-bold mb-6">
                  Donation of {tier.amount}
                </h3>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span className="text-white">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
});

DonationTiersSection.displayName = "DonationTiersSection";

export default DonationTiersSection;
