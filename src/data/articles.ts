export interface Article {
  title: string;
  content: string;
  imageUrl: string;
  alt: string;
}

export const fallbackArticles: Article[] = [
  {
    title: "Tai Chi for Joint Health",
    content:
      "Tai Chi is a gentle, low-impact martial art that combines slow, flowing movements with deep breathing. Studies show it significantly reduces pain and stiffness in people with osteoarthritis, particularly in the knees and hips. Its focus on balance and coordination also helps prevent falls, a major concern for those with joint problems.",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80&fm=webp",
    alt: "Person practicing Tai Chi outdoors",
  },
  {
    title: "Pilates & Arthritis Relief",
    content:
      "Pilates strengthens the core muscles that support your joints, reducing the load placed on them during everyday activities. For arthritis sufferers, modified Pilates exercises can improve posture, flexibility, and muscle strength without aggravating inflamed joints. Many people report less pain and improved function after a consistent Pilates programme.",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&fm=webp",
    alt: "Person doing Pilates exercise",
  },
  {
    title: "Anti-Inflammatory Nutrition",
    content:
      "An anti-inflammatory diet rich in omega-3 fatty acids, antioxidants, and whole foods can help reduce joint inflammation. Key foods include fatty fish like salmon and mackerel, colourful vegetables and fruits, extra-virgin olive oil, nuts, and legumes. The Mediterranean diet pattern is particularly well-studied for its benefits in reducing arthritis symptoms.",
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&fm=webp",
    alt: "Colourful anti-inflammatory foods",
  },
  {
    title: "Hydrotherapy & Swimming",
    content:
      "Water-based exercise is one of the most effective forms of physical activity for arthritis. The buoyancy of water reduces stress on joints by up to 90%, allowing you to move more freely with less pain. Hydrotherapy pools are typically warmer than standard pools, which helps relax muscles and ease stiffness before exercise.",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80&fm=webp",
    alt: "Person swimming for joint health",
  },
];
