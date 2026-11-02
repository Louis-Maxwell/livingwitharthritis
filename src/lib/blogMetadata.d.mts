export function normaliseBlogText(value: unknown): string;
export function clipMetadataText(value: unknown, max: number): string;
export function looksTruncatedBlogMeta(meta: unknown, title: unknown): boolean;
export function pickBlogHeadline(row: Record<string, unknown>): string;
export function buildBlogMetadata(row: Record<string, unknown>): { title: string; description: string };
