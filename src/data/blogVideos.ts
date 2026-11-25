/** Public channel videos checked on 23–24 November 2026. No scheduled/private IDs. */
export interface BlogVideo {
  id: string;
  title: string;
  url: string;
  format?: "landscape";
}

export const BLOG_VIDEOS: Readonly<Record<string, BlogVideo>> = {
  'strength-training-arthritis-beginners': {
    id: 'zIccqNr20b8',
    title: 'Muscle, metabolism and arthritis: building everyday strength',
    url: 'https://www.youtube.com/watch?v=zIccqNr20b8',
    format: 'landscape',
  },
  'osteoporosis-arthritis-frailty-bone-joint-uk': {
    id: 'XfrDbSSwwjs',
    title: 'Bone health and arthritis: strength, food and safer movement',
    url: 'https://www.youtube.com/watch?v=XfrDbSSwwjs',
    format: 'landscape',
  },
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
