import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  gradient: string;
  display_order: number;
}

export interface Condition {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  image_url: string | null;
  display_order: number;
}

export interface ArthritisType {
  id: string;
  title: string;
  description: string;
  display_order: number;
}

export interface Statistic {
  id: string;
  number_value: string;
  label: string;
  icon_name: string;
  display_order: number;
}

export interface PhysioMyth {
  id: string;
  myth: string;
  fact: string;
  image_url: string | null;
  display_order: number;
}

export interface DonationTier {
  id: string;
  amount: string;
  color: string;
  benefits: string[];
  display_order: number;
}

export interface FundraisingOption {
  id: string;
  title: string;
  display_order: number;
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useConditions() {
  return useQuery({
    queryKey: ["conditions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conditions")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as Condition[];
    },
  });
}

export function useArthritisTypes() {
  return useQuery({
    queryKey: ["arthritis_types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("arthritis_types")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as ArthritisType[];
    },
  });
}

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("statistics")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as Statistic[];
    },
  });
}

export function usePhysioMyths() {
  return useQuery({
    queryKey: ["physio_myths"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("physio_myths")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as PhysioMyth[];
    },
  });
}

export function useDonationTiers() {
  return useQuery({
    queryKey: ["donation_tiers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donation_tiers")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as DonationTier[];
    },
  });
}

export function useFundraisingOptions() {
  return useQuery({
    queryKey: ["fundraising_options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fundraising_options")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as FundraisingOption[];
    },
  });
}

export interface NutritionSection {
  id: string;
  title: string;
  icon_name: string;
  content: string;
  foods: string[];
  display_order: number;
}

export function useNutritionSections() {
  return useQuery({
    queryKey: ["nutrition_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nutrition_sections")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as NutritionSection[];
    },
  });
}

export interface NutritionFoodGalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
  recipe_text: string | null;
}

export function useNutritionFoodGallery() {
  return useQuery({
    queryKey: ["nutrition_food_gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("nutrition_food_gallery")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as NutritionFoodGalleryItem[];
    },
  });
}
