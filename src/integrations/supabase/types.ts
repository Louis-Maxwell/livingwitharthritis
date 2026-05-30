export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      about_us_sections: {
        Row: {
          content: string
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_safety_certifications: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_safety_faqs: {
        Row: {
          answer: string
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_safety_principles: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon_name: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_type: string
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          preferred_date: string
          preferred_time: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          appointment_type: string
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          preferred_date: string
          preferred_time: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          appointment_type?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string
          preferred_time?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      arthritis_types: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_articles: {
        Row: {
          author: string | null
          author_credentials: string | null
          category: string
          content: string
          created_at: string
          date: string
          display_order: number
          excerpt: string
          id: string
          image_url: string | null
          is_published: boolean
          keywords: string | null
          meta_description: string | null
          meta_title: string | null
          reviewed_by: string | null
          reviewer_credentials: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          author_credentials?: string | null
          category?: string
          content?: string
          created_at?: string
          date?: string
          display_order?: number
          excerpt: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          keywords?: string | null
          meta_description?: string | null
          meta_title?: string | null
          reviewed_by?: string | null
          reviewer_credentials?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          author_credentials?: string | null
          category?: string
          content?: string
          created_at?: string
          date?: string
          display_order?: number
          excerpt?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          keywords?: string | null
          meta_description?: string | null
          meta_title?: string | null
          reviewed_by?: string | null
          reviewer_credentials?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          author_name: string
          content: string
          created_at: string
          id: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          author_name: string
          content: string
          created_at?: string
          id?: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          content?: string
          created_at?: string
          id?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_helpfulness: {
        Row: {
          created_at: string
          helpful: boolean
          id: string
          slug: string
        }
        Insert: {
          created_at?: string
          helpful: boolean
          id?: string
          slug: string
        }
        Update: {
          created_at?: string
          helpful?: boolean
          id?: string
          slug?: string
        }
        Relationships: []
      }
      blog_views: {
        Row: {
          created_at: string
          id: string
          slug: string
          updated_at: string
          view_count: number
        }
        Insert: {
          created_at?: string
          id?: string
          slug: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          created_at?: string
          id?: string
          slug?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: []
      }
      buddy_matches: {
        Row: {
          compatibility_breakdown: Json
          compatibility_score: number
          created_at: string
          feedback: Json
          id: string
          last_check_in: string | null
          mentee_id: string
          mentor_id: string
          message_count: number
          status: string
          updated_at: string
        }
        Insert: {
          compatibility_breakdown?: Json
          compatibility_score: number
          created_at?: string
          feedback?: Json
          id?: string
          last_check_in?: string | null
          mentee_id: string
          mentor_id: string
          message_count?: number
          status?: string
          updated_at?: string
        }
        Update: {
          compatibility_breakdown?: Json
          compatibility_score?: number
          created_at?: string
          feedback?: Json
          id?: string
          last_check_in?: string | null
          mentee_id?: string
          mentor_id?: string
          message_count?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      buddy_profiles: {
        Row: {
          age_band: string
          arthritis_type: string
          available: boolean
          bio: string | null
          created_at: string
          id: string
          location_region: string
          max_mentees: number
          mobility_level: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age_band: string
          arthritis_type: string
          available?: boolean
          bio?: string | null
          created_at?: string
          id?: string
          location_region: string
          max_mentees?: number
          mobility_level: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age_band?: string
          arthritis_type?: string
          available?: boolean
          bio?: string | null
          created_at?: string
          id?: string
          location_region?: string
          max_mentees?: number
          mobility_level?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conditions: {
        Row: {
          category: string
          color: string
          created_at: string
          description: string
          display_order: number
          id: string
          image_url: string | null
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          color: string
          created_at?: string
          description: string
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_refresh_queue: {
        Row: {
          ai_rewritten_intro: string | null
          id: string
          notes: string | null
          original_intro: string | null
          queued_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          slug: string
          status: string
        }
        Insert: {
          ai_rewritten_intro?: string | null
          id?: string
          notes?: string | null
          original_intro?: string | null
          queued_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug: string
          status?: string
        }
        Update: {
          ai_rewritten_intro?: string | null
          id?: string
          notes?: string | null
          original_intro?: string | null
          queued_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug?: string
          status?: string
        }
        Relationships: []
      }
      donation_tiers: {
        Row: {
          amount: string
          benefits: string[]
          color: string
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          amount: string
          benefits: string[]
          color: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          amount?: string
          benefits?: string[]
          color?: string
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_address_line1: string | null
          donor_address_line2: string | null
          donor_city: string | null
          donor_country: string | null
          donor_email: string | null
          donor_location: string | null
          donor_name: string | null
          donor_postcode: string | null
          fund_type: string
          gift_aid: boolean | null
          id: string
          payment_intent_id: string | null
          status: string
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_address_line1?: string | null
          donor_address_line2?: string | null
          donor_city?: string | null
          donor_country?: string | null
          donor_email?: string | null
          donor_location?: string | null
          donor_name?: string | null
          donor_postcode?: string | null
          fund_type?: string
          gift_aid?: boolean | null
          id?: string
          payment_intent_id?: string | null
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_address_line1?: string | null
          donor_address_line2?: string | null
          donor_city?: string | null
          donor_country?: string | null
          donor_email?: string | null
          donor_location?: string | null
          donor_name?: string | null
          donor_postcode?: string | null
          fund_type?: string
          gift_aid?: boolean | null
          id?: string
          payment_intent_id?: string | null
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      face_stories: {
        Row: {
          age_band: string
          alt_text: string
          attribution: string
          condition: string
          created_at: string
          cta_href: string
          cta_label: string
          display_order: number
          eyebrow: string
          fund_type: string | null
          id: string
          image_url: string
          is_active: boolean
          is_feature: boolean
          quote: string
          region: string
          title: string
          updated_at: string
        }
        Insert: {
          age_band: string
          alt_text: string
          attribution: string
          condition: string
          created_at?: string
          cta_href: string
          cta_label: string
          display_order?: number
          eyebrow: string
          fund_type?: string | null
          id: string
          image_url: string
          is_active?: boolean
          is_feature?: boolean
          quote: string
          region: string
          title: string
          updated_at?: string
        }
        Update: {
          age_band?: string
          alt_text?: string
          attribution?: string
          condition?: string
          created_at?: string
          cta_href?: string
          cta_label?: string
          display_order?: number
          eyebrow?: string
          fund_type?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          is_feature?: boolean
          quote?: string
          region?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      faces_trust_facts: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          label: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          label: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          label?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      featured_stories: {
        Row: {
          age: string | null
          body: string | null
          created_at: string
          diagnosis: string | null
          headline: string
          id: string
          kicker: string
          location: string
          name: string
          portrait_alt: string
          portrait_url: string
          published: boolean
          published_at: string
          slug: string
          sort_order: number
          updated_at: string
          with_us_since: string | null
        }
        Insert: {
          age?: string | null
          body?: string | null
          created_at?: string
          diagnosis?: string | null
          headline: string
          id?: string
          kicker?: string
          location: string
          name: string
          portrait_alt: string
          portrait_url: string
          published?: boolean
          published_at?: string
          slug: string
          sort_order?: number
          updated_at?: string
          with_us_since?: string | null
        }
        Update: {
          age?: string | null
          body?: string | null
          created_at?: string
          diagnosis?: string | null
          headline?: string
          id?: string
          kicker?: string
          location?: string
          name?: string
          portrait_alt?: string
          portrait_url?: string
          published?: boolean
          published_at?: string
          slug?: string
          sort_order?: number
          updated_at?: string
          with_us_since?: string | null
        }
        Relationships: []
      }
      feedback_responses: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          navigation_rating: number
          nps_score: number | null
          speed_rating: number
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          navigation_rating: number
          nps_score?: number | null
          speed_rating: number
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          navigation_rating?: number
          nps_score?: number | null
          speed_rating?: number
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          status: string
          topic_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          status?: string
          topic_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          status?: string
          topic_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          body: string
          category: string
          created_at: string
          id: string
          is_pinned: boolean
          reply_count: number
          status: string
          title: string
          updated_at: string
          user_id: string | null
          view_count: number
        }
        Insert: {
          body: string
          category?: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          reply_count?: number
          status?: string
          title: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          id?: string
          is_pinned?: boolean
          reply_count?: number
          status?: string
          title?: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Relationships: []
      }
      fundraising_inquiries: {
        Row: {
          contact_name: string
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string | null
          organization_name: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          contact_name: string
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message?: string | null
          organization_name?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string | null
          organization_name?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      fundraising_options: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      healthy_living_resources: {
        Row: {
          category: string
          created_at: string
          description: string
          display_order: number
          external_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          display_order?: number
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          display_order?: number
          external_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      joint_exercises: {
        Row: {
          created_at: string
          description: string
          display_order: number
          duration: string
          exercise_name: string
          id: string
          is_active: boolean
          joint_id: string
          reps: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          duration: string
          exercise_name: string
          id?: string
          is_active?: boolean
          joint_id: string
          reps: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          duration?: string
          exercise_name?: string
          id?: string
          is_active?: boolean
          joint_id?: string
          reps?: string
          updated_at?: string
        }
        Relationships: []
      }
      journey_chapters: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          is_active: boolean
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          categories: string[]
          confirmation_token: string | null
          confirmed_at: string | null
          email: string
          frequency: string
          id: string
          is_active: boolean
          source: string
          subscribed_at: string
          unsubscribe_token: string | null
        }
        Insert: {
          categories?: string[]
          confirmation_token?: string | null
          confirmed_at?: string | null
          email: string
          frequency?: string
          id?: string
          is_active?: boolean
          source?: string
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Update: {
          categories?: string[]
          confirmation_token?: string | null
          confirmed_at?: string | null
          email?: string
          frequency?: string
          id?: string
          is_active?: boolean
          source?: string
          subscribed_at?: string
          unsubscribe_token?: string | null
        }
        Relationships: []
      }
      nutrition_sections: {
        Row: {
          content: string
          created_at: string
          display_order: number
          foods: string[]
          icon_name: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          display_order?: number
          foods?: string[]
          icon_name: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          display_order?: number
          foods?: string[]
          icon_name?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pain_journal_entries: {
        Row: {
          activities: string | null
          created_at: string
          entry_date: string
          id: string
          joints_affected: string[]
          medications: string | null
          mood: string | null
          notes: string | null
          pain_level: number
          sleep_quality: number | null
          stiffness_duration: number | null
          triggers: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activities?: string | null
          created_at?: string
          entry_date?: string
          id?: string
          joints_affected?: string[]
          medications?: string | null
          mood?: string | null
          notes?: string | null
          pain_level: number
          sleep_quality?: number | null
          stiffness_duration?: number | null
          triggers?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activities?: string | null
          created_at?: string
          entry_date?: string
          id?: string
          joints_affected?: string[]
          medications?: string | null
          mood?: string | null
          notes?: string | null
          pain_level?: number
          sleep_quality?: number | null
          stiffness_duration?: number | null
          triggers?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      physio_myths: {
        Row: {
          created_at: string
          display_order: number
          fact: string
          id: string
          image_url: string | null
          is_active: boolean
          myth: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          fact: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          myth: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          fact?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          myth?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          arthritis_type: string | null
          avatar_initial: string | null
          bio: string | null
          condition: string | null
          created_at: string
          display_name: string
          id: string
          location_region: string | null
          mobility_level: string | null
          pain_level: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          arthritis_type?: string | null
          avatar_initial?: string | null
          bio?: string | null
          condition?: string | null
          created_at?: string
          display_name?: string
          id?: string
          location_region?: string | null
          mobility_level?: string | null
          pain_level?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          arthritis_type?: string | null
          avatar_initial?: string | null
          bio?: string | null
          condition?: string | null
          created_at?: string
          display_name?: string
          id?: string
          location_region?: string | null
          mobility_level?: string | null
          pain_level?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rank_history: {
        Row: {
          captured_at: string
          id: string
          keyword_id: string
          position: number | null
          ranking_url: string | null
          search_volume: number | null
        }
        Insert: {
          captured_at?: string
          id?: string
          keyword_id: string
          position?: number | null
          ranking_url?: string | null
          search_volume?: number | null
        }
        Update: {
          captured_at?: string
          id?: string
          keyword_id?: string
          position?: number | null
          ranking_url?: string | null
          search_volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rank_history_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "tracked_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_refresh_runs: {
        Row: {
          ai_txt_updated: boolean
          created_at: string
          duration_ms: number
          error_message: string | null
          id: string
          llms_txt_updated: boolean
          ok: boolean
          psi_scores: Json
          ran_at: string
          routes_checked: number
          schema_errors: Json
          sitemap_count: number
        }
        Insert: {
          ai_txt_updated?: boolean
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          llms_txt_updated?: boolean
          ok?: boolean
          psi_scores?: Json
          ran_at?: string
          routes_checked?: number
          schema_errors?: Json
          sitemap_count?: number
        }
        Update: {
          ai_txt_updated?: boolean
          created_at?: string
          duration_ms?: number
          error_message?: string | null
          id?: string
          llms_txt_updated?: boolean
          ok?: boolean
          psi_scores?: Json
          ran_at?: string
          routes_checked?: number
          schema_errors?: Json
          sitemap_count?: number
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          display_order: number
          gradient: string
          icon_name: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          gradient: string
          icon_name: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          gradient?: string
          icon_name?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_visitor_count: {
        Row: {
          id: number
          total_count: number
          updated_at: string
        }
        Insert: {
          id?: number
          total_count?: number
          updated_at?: string
        }
        Update: {
          id?: number
          total_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      sitemap_cache: {
        Row: {
          id: number
          updated_at: string
          url_count: number
          xml: string
        }
        Insert: {
          id?: number
          updated_at?: string
          url_count?: number
          xml: string
        }
        Update: {
          id?: number
          updated_at?: string
          url_count?: number
          xml?: string
        }
        Relationships: []
      }
      statistics: {
        Row: {
          created_at: string
          display_order: number
          icon_name: string
          id: string
          is_active: boolean
          label: string
          number_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon_name: string
          id?: string
          is_active?: boolean
          label: string
          number_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon_name?: string
          id?: string
          is_active?: boolean
          label?: string
          number_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      syndication_drafts: {
        Row: {
          facebook_post: string | null
          generated_at: string
          generated_by: string | null
          id: string
          linkedin_article: string | null
          medium_markdown: string | null
          pinterest_description: string | null
          posted_channels: Json
          reddit_post: string | null
          slug: string
          title: string
          twitter_thread: string | null
        }
        Insert: {
          facebook_post?: string | null
          generated_at?: string
          generated_by?: string | null
          id?: string
          linkedin_article?: string | null
          medium_markdown?: string | null
          pinterest_description?: string | null
          posted_channels?: Json
          reddit_post?: string | null
          slug: string
          title: string
          twitter_thread?: string | null
        }
        Update: {
          facebook_post?: string | null
          generated_at?: string
          generated_by?: string | null
          id?: string
          linkedin_article?: string | null
          medium_markdown?: string | null
          pinterest_description?: string | null
          posted_channels?: Json
          reddit_post?: string | null
          slug?: string
          title?: string
          twitter_thread?: string | null
        }
        Relationships: []
      }
      tracked_keywords: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          keyword: string
          market: string
          target_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          keyword: string
          market?: string
          target_url: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          keyword?: string
          market?: string
          target_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      triage_assessments: {
        Row: {
          affected_areas: string[]
          arthritis_type: string
          created_at: string
          goals: string[]
          id: string
          limitations: string[]
          mobility_level: string
          pain_level: number
          recommendations: Json
          triage_score: number
          updated_at: string
          user_id: string
          valid_until: string
        }
        Insert: {
          affected_areas?: string[]
          arthritis_type: string
          created_at?: string
          goals?: string[]
          id?: string
          limitations?: string[]
          mobility_level: string
          pain_level: number
          recommendations?: Json
          triage_score: number
          updated_at?: string
          user_id: string
          valid_until?: string
        }
        Update: {
          affected_areas?: string[]
          arthritis_type?: string
          created_at?: string
          goals?: string[]
          id?: string
          limitations?: string[]
          mobility_level?: string
          pain_level?: number
          recommendations?: Json
          triage_score?: number
          updated_at?: string
          user_id?: string
          valid_until?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteer_signups: {
        Row: {
          area_of_interest: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
        }
        Insert: {
          area_of_interest: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
        }
        Update: {
          area_of_interest?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_public_profile: {
        Args: { p_user_id: string }
        Returns: {
          avatar_initial: string
          display_name: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_blog_view: { Args: { p_slug: string }; Returns: number }
      increment_visitor_count: { Args: never; Returns: number }
      is_admin: { Args: never; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
