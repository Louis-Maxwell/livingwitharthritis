import { getGeoTopPage } from "@/data/geoTopPages";
import WhatsAppActionCard from "./WhatsAppActionCard";
import ResourceDownloadCard from "./ResourceDownloadCard";

interface GeoPageActionsProps {
  path: string;
  title: string;
  /** Placement label sent with share events. */
  position?: string;
}

/** Share + keep-this-guide cards, rendered only on the configured priority pages. */
export default function GeoPageActions({ path, title, position = "after_article" }: GeoPageActionsProps) {
  const page = getGeoTopPage(path);
  if (!page) return null;
  return (
    <>
      <WhatsAppActionCard title={title} path={path} summary={page.share} position={position} />
      <ResourceDownloadCard {...page.resource} pagePath={path} />
    </>
  );
}
