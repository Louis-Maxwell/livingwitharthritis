/**
 * Monthly content schedule — feeds ExpertArticle and PatientStory
 * templates. Add new entries each month for fresh-content signals.
 */
export interface ExpertArticleEntry {
  id: number;
  slug: string;
  title: string;
  month: string;
  author: string;
  authorTitle: string;
  authorCredential: string;
  publishDate: string;
  summary: string;
  content: string;
}

export interface PatientStoryEntry {
  id: number;
  slug: string;
  title: string;
  month: string;
  patientName: string;
  condition: string;
  publishDate: string;
  summary: string;
  quote: string;
  content: string;
}

export const expertArticles: ExpertArticleEntry[] = [];

export const patientStories: PatientStoryEntry[] = [];
