import { getGeoTopPage } from "@/data/geoTopPages";
import WhatsAppActionCard from "./WhatsAppActionCard";
import ResourceDownloadCard from "./ResourceDownloadCard";

interface GeoPageActionsProps {
  path: string;
  title: string;
}

/** Share + keep-this-guide cards, rendered only on the configured priority pages. */
export default function GeoPageActions({ path, title }: GeoPageActionsProps) {
  const page = getGeoTopPage(path);
  if (!page) return null;
  return (
    <>
      <WhatsAppActionCard title={title} path={path} summary={page.share} />
      <ResourceDownloadCard {...page.resource} />
    </>
  );
}
