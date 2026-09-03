import { useQuery } from "@tanstack/react-query";

export interface FaceStoryRow {
  id: string;
  title: string;
  eyebrow: string;
  quote: string;
  attribution: string;
  region: string;
  age_band: string;
  condition: string;
  image_url: string;
  alt_text: string;
  cta_label: string;
  cta_href: string;
  fund_type: string | null;
  is_feature: boolean;
  display_order: number;
}

export interface FacesTrustFactRow {
  id: string;
  value: string;
  label: string;
  display_order: number;
}

export function useFaceStories() {
  return useQuery({
    queryKey: ["face_stories"],
    queryFn: async (): Promise<FaceStoryRow[]> => [],
    initialData: [],
  });
}

export function useFacesTrustFacts() {
  return useQuery({
    queryKey: ["faces_trust_facts"],
    queryFn: async (): Promise<FacesTrustFactRow[]> => [],
    initialData: [],
  });
}
