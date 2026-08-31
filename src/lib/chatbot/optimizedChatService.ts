/**
 * Optimized Chatbot Service - High Performance, No Backend Dependencies
 * Features:
 * - In-memory response caching for instant replies
 * - Streaming simulation for perceived performance
 * - Rate limiting to prevent abuse
 * - Fallback answers for all questions
 * - Parallel processing without blocking
 */

interface CacheEntry {
  response: string;
  timestamp: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 messages per minute
const STREAMING_CHUNK_DELAY = 10; // ms between chunks for streaming effect

class OptimizedChatService {
  private responseCache = new Map<string, CacheEntry>();
  private rateLimits = new Map<string, RateLimitEntry>();
  private questionKnowledgeBase: Record<string, string> = {};

  constructor() {
    this.initializeKnowledgeBase();
  }

  /**
   * Initialize with arthritis-specific Q&A
   */
  private initializeKnowledgeBase() {
    this.questionKnowledgeBase = {
      arthritis: `Arthritis is a condition affecting one or more joints, causing inflammation and pain. There are over 100 types of arthritis:

**Common Types:**
- **Osteoarthritis (OA)**: Wear-and-tear arthritis, most common in older adults
- **Rheumatoid Arthritis (RA)**: Autoimmune condition causing inflammation
- **Gout**: Caused by uric acid crystal buildup
- **Lupus**: Autoimmune disease affecting joints and organs

We have detailed guides, exercises, and resources to help manage your arthritis. Would you like information about a specific type or management strategy?`,

      pain: `Pain management is essential for living well with arthritis. Multiple strategies can help:

**Physical Approaches:**
- Regular, gentle exercise (tai chi, swimming, walking)
- Heat therapy for stiffness
- Ice for acute inflammation
- Massage and stretching

**Medical Options:**
- Anti-inflammatory medications
- Topical pain relief creams
- Steroid injections
- Prescription treatments

**Lifestyle Changes:**
- Weight management (reduces joint stress)
- Stress reduction
- Good sleep habits
- Anti-inflammatory diet

Explore our exercise library and diet guides for specific recommendations.`,

      exercise: `Safe exercise is crucial for arthritis management. It improves flexibility, strength, and reduces pain:

**Recommended Exercises:**
- Tai Chi: Gentle, flowing movements (especially for balance)
- Swimming: Low-impact, full-body workout
- Walking: Start slowly, build gradually
- Yoga: Adapted poses for joint health
- Strength training: Light weights or resistance bands

**Exercise Guidelines:**
- Start slowly and build gradually
- Avoid high-impact activities
- Exercise on good pain days
- 20-30 minutes most days is ideal
- Warm up and cool down properly

We have video guides for specific joint exercises. Which area interests you?`,

      diet: `An anti-inflammatory diet can significantly help manage arthritis symptoms:

**Anti-Inflammatory Foods:**
- Fatty fish (salmon, mackerel, sardines)
- Berries (blueberries, strawberries)
- Olive oil
- Nuts and seeds
- Leafy greens
- Whole grains

**Foods to Limit:**
- Processed foods
- Sugary drinks
- Refined carbohydrates
- Some vegetable oils
- Excessive red meat

**Mediterranean Diet Benefits:**
Research shows the Mediterranean diet is particularly beneficial for arthritis. We have meal plans and recipes available.`,

      doctor: `See a healthcare provider if you experience:

**Immediate Concerns:**
- Sudden severe joint swelling
- High fever with joint pain
- Inability to move a joint
- Suspected joint infection

**Ongoing Management:**
- New or worsening joint pain
- Swelling lasting more than 2 weeks
- Stiffness affecting daily activities
- Need for medication adjustments

**Preparation Tips:**
- Track your symptoms before visiting
- Keep a pain diary
- Write down questions beforehand
- Bring a list of current medications
- Discuss your activity goals

Don't hesitate to seek professional advice—early intervention is often more effective.`,

      treatment: `Treatment options vary based on arthritis type and severity:

**Non-Medication Approaches:**
- Physical therapy
- Exercise programs
- Weight management
- Stress reduction
- Heat/cold therapy

**Medications:**
- NSAIDs (anti-inflammatory pain relievers)
- Corticosteroids
- Disease-modifying antirheumatic drugs (DMARDs)
- Biologics (for autoimmune arthritis)

**Procedures:**
- Joint injections
- Joint replacement surgery (for severe cases)

**Lifestyle Changes:**
- Ergonomic adjustments
- Assistive devices
- Activity pacing

Your doctor can recommend the best approach for your specific situation.`,

      frailty: `Frailty is a state of reduced strength and resilience. It's different from just aging:

**Signs of Frailty:**
- Weakness and fatigue
- Slow walking speed
- Weight loss
- Reduced activity
- Difficulty with daily tasks

**Prevention & Management:**
- Regular exercise (especially strength training)
- Adequate nutrition and protein
- Fall prevention strategies
- Social engagement
- Cognitive activity
- Managing chronic conditions

**Resources:**
We have specific guides on fall prevention, muscle building, and maintaining independence. Would you like information on any of these?`,

      support: `Support is essential for managing arthritis long-term:

**Types of Support Available:**
- Online community forum
- Support group connections
- Expert articles and guides
- Exercise programs
- Peer stories and experiences
- Professional resources

**Getting Help:**
- Join our community forum
- Connect with others through buddy system
- Access expert advice
- Share your story
- Learn from others' experiences

Remember, you're not alone. Many people successfully manage arthritis with proper support and strategies.`,
    };
  }

  /**
   * Check rate limit for a user/IP
   */
  private isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const limit = this.rateLimits.get(identifier);

    if (!limit || now > limit.resetTime) {
      this.rateLimits.set(identifier, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW,
      });
      return false;
    }

    if (limit.count >= RATE_LIMIT_MAX) {
      return true;
    }

    limit.count++;
    return false;
  }

  /**
   * Find cached response
   */
  private getCachedResponse(query: string): string | null {
    const normalized = query.toLowerCase().trim();
    const cached = this.responseCache.get(normalized);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.response;
    }

    // Clear expired cache
    if (cached) {
      this.responseCache.delete(normalized);
    }

    return null;
  }

  /**
   * Match query to knowledge base and generate response
   */
  private generateResponse(query: string): string {
    const lower = query.toLowerCase();

    // Match keywords and return relevant response
    for (const [keyword, answer] of Object.entries(this.questionKnowledgeBase)) {
      if (lower.includes(keyword)) {
        return answer;
      }
    }

    // Default fallback response
    return `Thank you for your question about arthritis and living well.

We have comprehensive resources covering:
- **Different types of arthritis** and their management
- **Exercise programs** tailored for arthritis
- **Pain management** strategies
- **Diet and nutrition** guidance
- **Support and community** resources

What specific aspect would you like to learn more about? You can ask about:
- Types of arthritis
- Exercise and movement
- Pain management
- Diet recommendations
- When to see a doctor
- Support options`;
  }

  /**
   * Send message with streaming effect
   */
  async sendMessage(
    query: string,
    userId: string,
    onChunk: (text: string) => void,
    onComplete: () => void
  ): Promise<void> {
    // Validate input
    if (!query || query.trim().length === 0) {
      onChunk("Please ask me something about arthritis management.");
      onComplete();
      return;
    }

    if (query.length > 5000) {
      onChunk("Your message is too long. Please keep it under 5000 characters.");
      onComplete();
      return;
    }

    // Check rate limit
    if (this.isRateLimited(userId)) {
      onChunk(
        "You've sent many messages recently. Please wait a moment before sending another."
      );
      onComplete();
      return;
    }

    try {
      // Check cache first
      let response = this.getCachedResponse(query);

      // Generate if not cached
      if (!response) {
        response = this.generateResponse(query);
        // Cache for future use
        this.responseCache.set(query.toLowerCase().trim(), {
          response,
          timestamp: Date.now(),
        });
      }

      // Stream response in chunks for better UX
      await this.streamResponse(response, onChunk);
      onComplete();
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "An unexpected error occurred";
      onChunk(`Sorry, I encountered an error: ${errorMsg}`);
      onComplete();
    }
  }

  /**
   * Stream response text for smooth rendering
   */
  private async streamResponse(text: string, onChunk: (chunk: string) => void): Promise<void> {
    // Split into sentences for better chunking
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    for (const sentence of sentences) {
      // Send sentence with slight delay for streaming effect
      onChunk(sentence);
      // Use requestAnimationFrame for non-blocking delay
      await new Promise(resolve => {
        setTimeout(resolve, STREAMING_CHUNK_DELAY);
      });
    }
  }

  /**
   * Get cache statistics for monitoring
   */
  getCacheStats() {
    const now = Date.now();
    const validCache = Array.from(this.responseCache.values()).filter(
      entry => now - entry.timestamp < CACHE_DURATION
    );

    return {
      totalCached: this.responseCache.size,
      validCached: validCache.length,
      hitRate: validCache.length / Math.max(1, this.responseCache.size),
      rateLimitEntries: this.rateLimits.size,
    };
  }

  /**
   * Clear old cache entries
   */
  cleanupCache() {
    const now = Date.now();
    for (const [key, entry] of this.responseCache.entries()) {
      if (now - entry.timestamp > CACHE_DURATION) {
        this.responseCache.delete(key);
      }
    }

    // Clear old rate limit entries
    for (const [key, entry] of this.rateLimits.entries()) {
      if (now > entry.resetTime) {
        this.rateLimits.delete(key);
      }
    }
  }
}

// Single instance for entire app
export const chatService = new OptimizedChatService();

// Periodic cleanup (every 5 minutes)
setInterval(() => {
  chatService.cleanupCache();
}, 5 * 60 * 1000);

export default OptimizedChatService;
