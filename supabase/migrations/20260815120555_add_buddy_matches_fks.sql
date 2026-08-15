-- Add missing foreign key constraints to buddy_matches table
-- These constraints prevent orphaned records when buddy profiles are deleted

ALTER TABLE buddy_matches
ADD CONSTRAINT buddy_matches_mentee_id_fkey
FOREIGN KEY (mentee_id) REFERENCES buddy_profiles(id) ON DELETE CASCADE;

ALTER TABLE buddy_matches
ADD CONSTRAINT buddy_matches_mentor_id_fkey
FOREIGN KEY (mentor_id) REFERENCES buddy_profiles(id) ON DELETE CASCADE;

-- Create indices on FK columns for query performance
CREATE INDEX buddy_matches_mentee_id_idx ON buddy_matches(mentee_id);
CREATE INDEX buddy_matches_mentor_id_idx ON buddy_matches(mentor_id);
