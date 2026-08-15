-- Add missing foreign key constraints to tables that reference auth.users
-- These prevent orphaned records when users are deleted
-- Using SET NULL to allow user deletion while preserving record history

ALTER TABLE buddy_profiles
ADD CONSTRAINT buddy_profiles_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE forum_topics
ADD CONSTRAINT forum_topics_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE forum_replies
ADD CONSTRAINT forum_replies_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE profiles
ADD CONSTRAINT profiles_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE triage_assessments
ADD CONSTRAINT triage_assessments_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Note: chat_feedback references auth.users for the user_id column
-- This table already has FK constraints to chat_conversations and chat_messages
-- Adding user_id FK for consistency
ALTER TABLE chat_feedback
ADD CONSTRAINT chat_feedback_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create indices on FK columns for query performance
CREATE INDEX buddy_profiles_user_id_idx ON buddy_profiles(user_id);
CREATE INDEX forum_topics_user_id_idx ON forum_topics(user_id);
CREATE INDEX forum_replies_user_id_idx ON forum_replies(user_id);
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
CREATE INDEX triage_assessments_user_id_idx ON triage_assessments(user_id);
CREATE INDEX chat_feedback_user_id_idx ON chat_feedback(user_id);
