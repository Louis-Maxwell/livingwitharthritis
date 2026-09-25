import type { HubGuide } from "./types";
import { drugGuide } from "./drugGuide";
import { surgeryOptions } from "./surgeryOptions";
import { complementaryTherapies } from "./complementaryTherapies";
import { workWithArthritis } from "./workWithArthritis";
import { travelWithArthritis } from "./travelWithArthritis";

export type { HubGuide, HubGuideSection, HubGuideFaq, HubGuideLink } from "./types";

export const HUB_GUIDES: HubGuide[] = [
  drugGuide,
  surgeryOptions,
  complementaryTherapies,
  workWithArthritis,
  travelWithArthritis,
];

export const HUB_GUIDES_BY_SLUG: Record<string, HubGuide> = Object.fromEntries(
  HUB_GUIDES.map((g) => [g.slug, g]),
);

export const HUB_GUIDE_REVIEWER = {
  name: "Louis Maxwell",
  credentials: "First Contact Practitioner, HCPC PH128483",
  profileHref: "/reviewers/maxwell",
};
