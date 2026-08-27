import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Supabase client removed - restore

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
    queryFn: async () => {
      const { data, error } = await supabase
        .from("face_stories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as FaceStoryRow[];
    },
  });
}

export function useFacesTrustFacts() {
  return useQuery({
    queryKey: ["faces_trust_facts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faces_trust_facts")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as FacesTrustFactRow[];
    },
  });
}
