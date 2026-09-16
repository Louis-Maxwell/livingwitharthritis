import { useParams, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { ukCities } from "@/data/ukCities";
import { arthritisConditions } from "@/data/arthritisConditions";

/**
 * City×condition URLs are thin doorway templates. Prefer a client redirect
 * to the city hub (HTTP 301s also live in public/_redirects + seo-redirect-map).
 * Unknown city or condition → real NotFound (noindex).
 */
const CityConditionPage = () => {
  const { city, condition } = useParams<{ city: string; condition: string }>();
  const cityData = ukCities.find((c) => c.slug === city);
  const conditionData = arthritisConditions.find((c) => c.slug === condition);

  if (!cityData || !conditionData) {
    return <NotFound />;
  }

  return <Navigate to={`/arthritis-support/${cityData.slug}`} replace />;
};

export default CityConditionPage;
