# ROADMAP: Admin Customization UI

This roadmap outlines the planned features and milestones for the admin customization interface of the Ivi Susej Marie E. Salas portfolio.

## Goals
- Enable owner (Ivi) to edit portfolio content directly from the frontend
- Support secure authentication for edit mode
- Provide intuitive UI for managing projects, skills, experiences, certificates, and profile info
- Ensure changes sync with backend API and persist securely

## Milestones

### 1. Owner Authentication
- Implement login for owner-only edit mode
- Use JWT or session-based auth (integrate with backend)
- Show edit controls only when authenticated

### 2. Edit Mode Toggle
- Add UI toggle for switching between view and edit mode
- Display inline edit buttons for sections (projects, skills, etc.)

### 3. Content Management Panels
- Projects: Add, edit, delete, reorder
- Skills: Add, edit, delete, reorder
- Experiences: Add, edit, delete, reorder
- Certificates: Add, edit, delete, reorder
- Profile/About: Edit bio, headshot, quick facts

### 4. Form Validation & Feedback
- Use accessible forms with validation
- Show success/error toasts

### 5. API Integration
- Connect all edit actions to backend endpoints
- Handle optimistic UI updates and error states

### 6. Audit & Versioning
- Log changes for rollback/version history
- Optionally allow preview before publishing

### 7. Accessibility & UX
- Ensure admin UI is fully accessible
- Keyboard navigation, ARIA roles, focus management

### 8. Testing & Documentation
- Add unit/integration tests for admin features
- Document usage and customization steps

---

**Note:** This roadmap is iterative. Features will be added and refined based on feedback and evolving requirements.
