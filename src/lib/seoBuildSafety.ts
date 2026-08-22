export function assertSafeBlogInventory(
  previousCount: number,
  nextCount: number,
  allowLoss = false,
): void {
  if (allowLoss || previousCount < 20) return;
  const minimum = Math.ceil(previousCount * 0.95);
  if (nextCount < minimum) {
    throw new Error(
      `[sitemap] refusing to reduce canonical blog inventory from ${previousCount} to ${nextCount} ` +
        `(minimum ${minimum}). Investigate the data source or set ALLOW_SITEMAP_URL_LOSS=1 after manual review.`,
    );
  }
}
