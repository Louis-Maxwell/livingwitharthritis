import React from 'react';
import ClusterHub from './ClusterHub';

const CLUSTER_DATA = {
  clusterSlug: 'rheumatoid-arthritis',
  clusterName: 'Rheumatoid Arthritis',
  clusterDescription: 'Complete resources on managing rheumatoid arthritis, from autoimmune disease basics to biologic therapies and living well.',
  pillarArticleSlug: 'rheumatoid-arthritis-guide',
  pillarArticleTitle: 'Rheumatoid Arthritis: Complete Management Guide',
  statsKeywords: 38,
  statsTraffic: '600-900/mo',
  statsSnippets: 5,
  articles: [
    { slug: 'ra-causes-autoimmune', title: 'RA Causes: Autoimmune System Explained', description: 'Understanding why the immune system attacks joints in RA.', keywords: ['autoimmune', 'immune system', 'causes'] },
    { slug: 'ra-diagnosis-blood-tests', title: 'RA Diagnosis & Blood Tests', description: 'How RA is diagnosed and what test results mean.', keywords: ['diagnosis', 'rheumatoid factor', 'anti-CCP'] },
    { slug: 'biologic-therapies-ra', title: 'Biologic Therapies for RA', description: 'Modern biologic medications that target the immune system.', keywords: ['biologics', 'TNF inhibitors', 'treatment'] },
    { slug: 'ra-flare-management', title: 'RA Flare Management: Emergency Guide', description: 'What to do when you experience an RA flare.', keywords: ['flares', 'emergency', 'management'] },
    { slug: 'ra-remission', title: 'RA Remission: What It Takes', description: 'Understanding remission and how to achieve it.', keywords: ['remission', 'low disease activity', 'goals'] },
    { slug: 'dmards-disease-modifying', title: 'DMARDs: Disease-Modifying Drugs', description: 'Overview of DMARD medications for RA treatment.', keywords: ['DMARDs', 'methotrexate', 'medications'] },
    { slug: 'ra-systemic-inflammation', title: 'RA & Systemic Inflammation', description: 'How RA inflammation affects your whole body.', keywords: ['inflammation', 'systemic', 'complications'] },
    { slug: 'ra-fatigue', title: 'RA Fatigue: Causes & Energy Management', description: 'Managing the fatigue that often accompanies RA.', keywords: ['fatigue', 'energy', 'management'] },
    { slug: 'ra-women-hormonal', title: 'RA in Women: Hormonal Factors', description: 'How hormones influence RA in women.', keywords: ['women', 'hormones', 'pregnancy'] },
    { slug: 'ra-men', title: 'RA in Men: Unique Challenges', description: 'RA specific considerations for men.', keywords: ['men', 'male RA', 'unique challenges'] },
    { slug: 'ra-work-accommodations', title: 'RA Work Accommodations', description: 'Getting workplace support for RA.', keywords: ['work', 'employment', 'accommodations'] },
    { slug: 'ra-mental-health', title: 'RA Mental Health Impact', description: 'Addressing mental health with RA.', keywords: ['mental health', 'depression', 'anxiety'] },
  ],
};

export default function RheumatoidArthritisHub() {
  return <ClusterHub {...CLUSTER_DATA} />;
}
