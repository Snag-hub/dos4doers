# DayOS: Scope & Master Plan

## 🗺 Roadmap

### ✅ Phase 0: Stabilization (Current Focus)
**Goal:** Make the system boringly reliable.
- [ ] **Failure Handling**:
    - [ ] Robust Metadata Fetching (Graceful fallbacks for missing OG tags).
    - [ ] Notification Failure Logging (Detect silent failures).
- [ ] **Idempotency**: Prevent duplicate URL saves.
- [ ] **Edit Capability**: Allow editing Titles/Times of saved items.
- [ ] **Analytics**: Basic internal tracking (Saved Count, Read Count).

### ⏳ Phase 1: Tasks (Action Layer)
**Goal:** Move from "Reading" to "Doing".
- [ ] **Task Entity**: Create `tasks` schema (Title, Due Date, Type: Personal/Pro).
- [ ] **Project Grouping**: Group tasks by Context/Project.
- [ ] **Notification Integration**: Tasks fire notifications just like articles.
- [ ] **Kanban/List View**: Pending -> In Progress -> Done.

### ⏳ Phase 2: Meetings (Commitment Layer)
**Goal:** granular time-blocking methods.
- [ ] **Meeting Entity**: Title, Start/End Time, Link.
- [ ] **Prep Reminders**: "Alert me 1 hour before meeting".
- [ ] **Interview Mode**: Track stages (Screening, Tech, Offer).

### ⏳ Phase 3: Notes (Knowledge Layer)
**Goal:** Contextual storage.
- [ ] **Markdown Editor**: Simple, fast note-taking.
- [ ] **Attachments**: Attach notes to Tasks/Meetings/Articles.
- [ ] **Search**: Instant retrieval of thoughts.

### ⏳ Phase 4: The Timeline (The Soul)
**Goal:** The Unified View.
- [ ] **Timeline UI**: Replace "Inbox" with a Daily Timeline.
- [ ] **Time-Blocking**: Visualizing gaps between meetings/tasks.

---

## 📝 Immediate Todo (Phase 0)

### Hardening
- [ ] **Fix Metadata Crashes**:
    - Ensure `fetchMetadata` never throws, returns default "Untitled" + Placeholder Image.
- [ ] **Duplicate Detection**:
    - Check if URL exists in DB before Insert. If exists -> Update timestamp or warn.
- [ ] **Edit Modal**:
    - Add "Edit" button to Reminder Cards.
    - Dialog to change Title and Due Date.

### Polish
- [ ] **Empty States**: "All caught up" screens for empty Inbox/Archives.
- [ ] **Settings**: Add toggle for "Email vs Push" preference (Granular control).
