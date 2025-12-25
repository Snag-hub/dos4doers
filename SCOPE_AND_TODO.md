# DayOS: Scope & Master Plan

## 🗺 Roadmap

### ✅ Phase 0: Stabilization (COMPLETE!)
**Goal:** Make the system boringly reliable.
- [x] **Failure Handling**:
    - [x] Robust Metadata Fetching (Graceful fallbacks for missing OG tags).
    - [x] Notification Failure Logging (Detect silent failures).
- [x] **Idempotency**: Prevent duplicate URL saves.
- [x] **Edit Capability**: Allow editing Titles/Times of saved items.
- [x] **Analytics**: Basic internal tracking (Saved Count, Read Count).

### ⏳ Phase 1: Tasks (Action Layer)
**Goal:** Move from "Reading" to "Doing".
- [x] **Task Entity**: Create `tasks` schema (Title, Due Date, Type: Personal/Pro).
- [x] **Project Grouping**: Group tasks by Context/Project.
- [x] **Notification Integration**: Tasks fire notifications just like articles.
- [x] **Kanban/List View**: Pending -> In Progress -> Done.

### ⏳ Phase 2: Meetings (Commitment Layer)
**Goal:** granular time-blocking methods.
- [x] **Meeting Entity**: Title, Start/End Time, Link.
- [x] **Prep Reminders**: 
    - [x] Defaults: 1d, 1h, 30m, 10m, 5m, 2m before (Auto-created).
    - [x] Custom: Ability to add specific time-based reminders.
- [x] **Interview Mode**: Track stages (Screening, Tech, Offer).

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

## 📝 Immediate Todo (Phase 3 - Notes)

### Core Features
- [ ] **Markdown Editor**:
    - Simple, fast note-taking interface.
    - Support for basic markdown formatting.
- [ ] **Note Attachments**:
    - Attach notes to Tasks, Meetings, and Articles.
    - Link notes to specific items.
- [ ] **Search**:
    - Instant retrieval of notes.
    - Full-text search across all notes.

### Polish
- [x] **Empty States**: "All caught up" screens for empty Inbox/Archives.
- [x] **Settings**: Add toggle for "Email vs Push" preference (Granular control).
