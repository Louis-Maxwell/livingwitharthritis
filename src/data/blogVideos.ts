/** Public channel videos checked on 23 November 2026. No scheduled/private IDs. */
export interface BlogVideo {
  id: string;
  title: string;
  url: string;
}

export const BLOG_VIDEOS: Readonly<Record<string, BlogVideo>> = {
  'arthritis-hows-life-living-with-arthritis': {
    id: 'LkOgyDMPStw',
    title: 'Living With Arthritis: The Pain You Cannot See',
    url: 'https://www.youtube.com/shorts/LkOgyDMPStw',
  },
  'energy-management-and-pacing-arthritis': {
    id: 'nb1cYjY3Cp0',
    title: 'Arthritis fatigue: how to pace your energy',
    url: 'https://www.youtube.com/shorts/nb1cYjY3Cp0',
  },
  'cooking-with-arthritis-uk': {
    id: 'i5scWVhB-ZY',
    title: 'Cooking with hand arthritis: kitchen tools that help',
    url: 'https://www.youtube.com/shorts/i5scWVhB-ZY',
  },
};
