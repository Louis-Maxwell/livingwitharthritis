-- Add missing indices on foreign key columns for query performance
-- These indices improve lookups when filtering by FK values

CREATE INDEX chat_feedback_conversation_id_idx ON chat_feedback(conversation_id);
CREATE INDEX chat_feedback_message_id_idx ON chat_feedback(message_id);
CREATE INDEX forum_replies_topic_id_idx ON forum_replies(topic_id);
CREATE INDEX syndication_drafts_generated_by_idx ON syndication_drafts(generated_by);
