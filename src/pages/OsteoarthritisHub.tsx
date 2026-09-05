import React from 'react';
import ClusterHub from './ClusterHub';

const CLUSTER_DATA = {
  clusterSlug: 'osteoarthritis',
  clusterName: 'Osteoarthritis',
  clusterDescription:
    'Comprehensive guides on understanding, managing, and living well with osteoarthritis. From causes and diagnosis to treatment options and pain management strategies.',
  pillarArticleSlug: 'osteoarthritis-complete-guide',
  pillarArticleTitle: 'Osteoarthritis: Complete Guide to Causes, Symptoms & Treatment',
  statsKeywords: 45,
  statsTraffic: '800-1,200/mo',
  statsSnippets: 6,
  articles: [
    {
      slug: 'osteoarthritis-causes-risk-factors',
      title: 'Osteoarthritis Causes & Risk Factors',
      description: 'Understand why osteoarthritis develops and what increases your risk.',
      keywords: ['causes', 'risk factors', 'joint damage'],
    },
    {
      slug: 'osteoarthritis-diagnosis',
      title: 'OA Diagnosis: What to Expect',
      description: 'Learn about diagnostic tests and what doctors look for.',
      keywords: ['diagnosis', 'X-rays', 'blood tests'],
    },
    {
      slug: 'osteoarthritis-pain-management',
      title: 'OA Pain Management Strategies',
      description: 'Evidence-based approaches to manage osteoarthritis pain effectively.',
      keywords: ['pain relief', 'management', 'treatment'],
    },
    {
      slug: 'osteoarthritis-joint-damage',
      title: 'Osteoarthritis & Joint Damage Progression',
      description: 'How osteoarthritis progresses and what you can do to slow it.',
      keywords: ['progression', 'cartilage', 'joint health'],
    },
    {
      slug: 'osteoarthritis-medications',
      title: 'OA Medications: Complete Guide',
      description: 'Overview of medications used to treat osteoarthritis.',
      keywords: ['medications', 'NSAIDs', 'injections'],
    },
    {
      slug: 'hand-osteoarthritis',
      title: 'Hand Osteoarthritis: Finger Joint Pain',
      description: 'Managing osteoarthritis in hands and fingers.',
      keywords: ['hand OA', 'finger pain', 'hand exercises'],
    },
    {
      slug: 'knee-osteoarthritis',
      title: 'Knee Osteoarthritis: Walking & Exercise',
      description: 'Strategies for staying active with knee osteoarthritis.',
      keywords: ['knee OA', 'walking', 'knee exercises'],
    },
    {
      slug: 'hip-osteoarthritis',
      title: 'Hip Osteoarthritis: Mobility Recovery',
      description: 'Improving mobility and reducing pain with hip osteoarthritis.',
      keywords: ['hip OA', 'hip pain', 'mobility'],
    },
    {
      slug: 'spine-osteoarthritis',
      title: 'Spine/Cervical Osteoarthritis',
      description: 'Managing osteoarthritis of the spine and neck.',
      keywords: ['cervical OA', 'spine pain', 'neck stiffness'],
    },
    {
      slug: 'young-onset-osteoarthritis',
      title: 'OA in Young Adults: Early Onset',
      description: 'Understanding osteoarthritis when it occurs before age 45.',
      keywords: ['early onset', 'young adults', 'prevention'],
    },
    {
      slug: 'osteoarthritis-comorbidities',
      title: 'Osteoarthritis & Other Health Conditions',
      description: 'How osteoarthritis relates to other health conditions.',
      keywords: ['comorbidities', 'related conditions', 'health'],
    },
    {
      slug: 'osteoarthritis-prevention',
      title: 'OA: Prevention & Risk Reduction',
      description: 'Steps to prevent osteoarthritis or slow its progression.',
      keywords: ['prevention', 'risk reduction', 'lifestyle'],
    },
  ],
};

export default function OsteoarthritisHub() {
  return <ClusterHub {...CLUSTER_DATA} />;
}
