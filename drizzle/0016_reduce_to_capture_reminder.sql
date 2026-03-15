-- Remove deprecated domains: tasks, meetings, notes, tags, projects, timeline support.

-- 1) Drop join tables first
DROP TABLE IF EXISTS "notes_to_tags";
DROP TABLE IF EXISTS "tasks_to_tags";
DROP TABLE IF EXISTS "items_to_tags";

-- 2) Drop primary deprecated domain tables
DROP TABLE IF EXISTS "notes";
DROP TABLE IF EXISTS "meetings";
DROP TABLE IF EXISTS "tasks";
DROP TABLE IF EXISTS "projects";
DROP TABLE IF EXISTS "tags";

-- 3) Remove no-longer-used reminder links
ALTER TABLE "reminders"
  DROP COLUMN IF EXISTS "taskId",
  DROP COLUMN IF EXISTS "meetingId";

-- 4) Remove obsolete enums
DROP TYPE IF EXISTS "task_status";
DROP TYPE IF EXISTS "task_type";
DROP TYPE IF EXISTS "task_priority";
DROP TYPE IF EXISTS "meeting_type";
DROP TYPE IF EXISTS "interview_stage";
DROP TYPE IF EXISTS "task_recurrence";
