# Feature Reduction Plan: Capture + Remind

## Product Scope After Reduction

Keep only:

- Item capture (manual/web share/extension)
- Metadata extraction + reader mode
- Item states (`inbox`, `reading`, `archived`, `trash`) + favorites
- Reminders:
  - Item-specific reminders
  - General reminders
  - Recurring reminders
- Notification delivery (push/email)
- Core settings (API token, notification preferences, export)

Remove:

- Notes
- Tasks
- Meetings
- Timeline
- Tags
- Projects
- Google Calendar sync

## Execution Phases

1. **UI/Route removal**
   - Remove pages/navigation/components for Notes, Tasks, Meetings, Timeline, Tags.
2. **Application logic cleanup**
   - Keep only item + reminder actions in server actions and client flows.
3. **API/cron cleanup**
   - Remove meeting/task/note routes and references from cron + export.
4. **Schema + migrations**
   - Drop removed tables/columns/enums.
5. **Dependency/test/docs cleanup**
   - Remove unused code paths and update documentation.

## Database Migration Plan

Apply in this order to avoid FK failures.

### Step 1: Drop dependent join tables first

```sql
DROP TABLE IF EXISTS notes_to_tags;
DROP TABLE IF EXISTS tasks_to_tags;
DROP TABLE IF EXISTS items_to_tags;
```

### Step 2: Drop domain tables

```sql
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS meetings;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS tags;
```

### Step 3: Simplify reminders table

```sql
ALTER TABLE reminders
  DROP COLUMN IF EXISTS "taskId",
  DROP COLUMN IF EXISTS "meetingId";
```

### Step 4: Remove obsolete enums

```sql
DROP TYPE IF EXISTS task_status;
DROP TYPE IF EXISTS task_type;
DROP TYPE IF EXISTS task_priority;
DROP TYPE IF EXISTS meeting_type;
DROP TYPE IF EXISTS interview_stage;
DROP TYPE IF EXISTS task_recurrence;
```

### Step 5: Verify remaining core tables

- `user`
- `items`
- `reminders`
- `push_subscriptions`
- `rate_limits`
- `notification_logs`
- `system_logs`
- auth/session tables (`account`, `session`, `verificationToken`)

## Rollout Safety

- Deploy app code that no longer references removed tables **before** running destructive DB migration.
- Take DB backup/snapshot before migration.
- Run migration in staging first and validate reminder flows.
