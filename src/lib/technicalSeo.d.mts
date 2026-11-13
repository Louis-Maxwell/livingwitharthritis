export const SITE_ORIGIN: string;
export function cleanBrand(value: unknown): string;
export function canonicalPath(value: string): string;
export function isHealthAdviceGuide(route: string): boolean;
export function distinctSeoTitle(
  title: string,
  headline: string,
  context?: string | { route?: string; breadcrumb?: string; city?: string },
): string;
export function cleanJsonLd<T>(value: T): T;
export function buildShareLinks(path: string, title: string, image?: string):
  Array<{ label: string; href: string }>;