import { useQuery } from "@tanstack/react-query";

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
export interface NutritionSection {
  id: string;
  title: string;
  icon_name: string;
  content: string;
  foods: string[];
  display_order: number;
}

const empty = async <T,>(): Promise<T[]> => [];

export function useServices() {
  return useQuery({ queryKey: ["services"], queryFn: empty<Service>, initialData: [] });
}
export function useConditions() {
  return useQuery({ queryKey: ["conditions"], queryFn: empty<Condition>, initialData: [] });
}
export function useArthritisTypes() {
  return useQuery({ queryKey: ["arthritis_types"], queryFn: empty<ArthritisType>, initialData: [] });
}
export function useStatistics() {
  return useQuery({ queryKey: ["statistics"], queryFn: empty<Statistic>, initialData: [] });
}
export function usePhysioMyths() {
  return useQuery({ queryKey: ["physio_myths"], queryFn: empty<PhysioMyth>, initialData: [] });
}
export function useDonationTiers() {
  return useQuery({ queryKey: ["donation_tiers"], queryFn: empty<DonationTier>, initialData: [] });
}
export function useFundraisingOptions() {
  return useQuery({ queryKey: ["fundraising_options"], queryFn: empty<FundraisingOption>, initialData: [] });
}
export function useNutritionSections() {
  return useQuery({ queryKey: ["nutrition_sections"], queryFn: empty<NutritionSection>, initialData: [] });
}
