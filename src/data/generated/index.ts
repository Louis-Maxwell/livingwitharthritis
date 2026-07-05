/**
 * Re-export barrel for auto-generated data files.
 *
 * The generator scripts still write to `src/data/*.generated.ts` (their
 * historic location). This barrel gives callers a single import path
 * (`@/data/generated`) so future consumers don't need to know where each
 * dataset physically lives.
 */
export { GENERATED_KEYWORDS } from "@/data/keywords.generated";
export type { KeywordRow } from "@/data/keywords.generated";
export { CITY_ROUTES } from "@/data/city-routes.generated";
export { COMPARISON_ROUTES } from "@/data/comparison-routes.generated";
export { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";
export { PET_ARTICLES } from "@/data/pets-arthritis.generated";
export type {
  PetArticle,
  PetImage,
  PetSection,
  PetFaq,
} from "@/data/pets-arthritis.generated";
