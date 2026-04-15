# ✅ Checklist — Approval Clarity Layer

---

## Phase 0 — Setup

- [x] Initialize Next.js app (TypeScript)
- [ ] Install dependencies:
  - [x] tailwindcss
  - [ ] shadcn/ui
  - [ ] lucide-react
  - [ ] react-hook-form
  - [x] zod
- [x] Setup Tailwind config
- [x] Setup base layout (App shell)

---

## Phase 1 — Data Modeling (Mock First)

- [ ] Create mock approval dataset
  - [ ] id
  - [ ] title
  - [ ] action_type
  - [ ] tool (email, calendar, finance, etc.)
  - [ ] risk_level (low, medium, high)
  - [ ] summary
  - [ ] explanation
  - [ ] impact.before
  - [ ] impact.after
  - [ ] recommendation
  - [ ] timestamp

- [ ] Store in `/lib/mock-data.ts`

---

## Phase 2 — Approval Inbox (List View)

- [ ] Build `ApprovalTable` component
- [ ] Build `ApprovalRow` component

- [ ] Display:
  - [ ] title
  - [ ] risk badge
  - [ ] timestamp
  - [ ] action button (“View”)

- [ ] Implement:
  - [ ] risk color mapping
  - [ ] click row → open detail drawer

---

## Phase 3 — Detail Drawer (Core UX)

- [ ] Create Drawer (shadcn Sheet)

- [ ] Sections:
  - [ ] Title + close button
  - [ ] “What will happen” (explanation)
  - [ ] Risk section
  - [ ] Data used (optional)
  - [ ] Before / After diff
  - [ ] Recommendation box
  - [ ] Approve / Reject buttons

---

## Phase 4 — Core Components

- [ ] Build `RiskBadge`
  - [ ] low → green
  - [ ] medium → yellow
  - [ ] high → red

- [ ] Build `RecommendationCard`
  - [ ] message
  - [ ] optional confidence

- [ ] Build `BeforeAfterDiff`
  - [ ] side-by-side comparison
  - [ ] key-value rendering

---

## Phase 5 — Interaction & State

- [ ] Manage state:
  - [ ] selected approval
  - [ ] drawer open/close

- [ ] Implement actions:
  - [ ] approve → console log
  - [ ] reject → console log

- [ ] Add feedback:
  - [ ] optional toast or status message

---

## Phase 6 — UI Polish

- [ ] Improve spacing and typography
- [ ] Add icons (lucide)
- [ ] Add hover states
- [ ] Add empty state
- [ ] Ensure mobile responsiveness (basic)

---

## Phase 7 — Automated Testing

### Setup

- [ ] Install:
  - [ ] Vitest (or Jest)
  - [ ] React Testing Library
  - [ ] @testing-library/user-event
  - [ ] jsdom

---

### Unit Tests (Logic)

- [ ] Test risk level mapping
- [ ] Test recommendation mapping
- [ ] Test fallback for unknown risk
- [ ] Test diff formatting logic

---

### Component Tests

- [ ] ApprovalTable renders rows
- [ ] RiskBadge renders correct label + style
- [ ] DetailDrawer renders selected approval
- [ ] RecommendationCard shows correct message
- [ ] BeforeAfterDiff renders both states

---

### Interaction Tests

- [ ] Click row → opens drawer
- [ ] Close drawer → hides details
- [ ] Approve button triggers handler
- [ ] Reject button triggers handler

---

### Edge Cases

- [ ] Missing explanation handled
- [ ] Missing before/after handled
- [ ] Empty list handled
- [ ] Unknown risk handled gracefully

---

## Phase 8 — Manual Verification (User Validation)

### Core Flow

- [ ] User sees approval list
- [ ] User opens approval
- [ ] User understands action clearly
- [ ] User identifies risk level quickly
- [ ] User can decide to approve/reject

---

### Clarity Checks

- [ ] Explanation understood in <10 seconds
- [ ] Risk visible without searching
- [ ] Before/after difference obvious
- [ ] Recommendation is clear

---

### User Simulation (3 personas)

- [ ] Founder:
  - [ ] Can decide quickly
- [ ] Finance operator:
  - [ ] Feels confident about correctness
- [ ] Non-technical user:
  - [ ] Understands what will happen

---

### Validation Questions

Ask yourself (or another person):

- [ ] “What will happen if you approve this?”
- [ ] “What is the risk level?”
- [ ] “Would you approve this?”
- [ ] “What is unclear?”

---

### Capture Findings

- [ ] Confusing wording
- [ ] Missing context
- [ ] Layout issues
- [ ] Trust gaps

---

## Phase 9 — QA Pass

- [ ] Run all tests
- [ ] Fix failing tests
- [ ] Run manual verification
- [ ] Fix clarity issues
- [ ] Re-test after fixes

---

## Phase 10 — Stretch (Optional)

- [ ] Add filtering (risk level)
- [ ] Add search
- [ ] Add grouping
- [ ] Add confidence score UI
- [ ] Add mock “approval history”

---

## ✅ Definition of Done

- [ ] User can:
  - [ ] View approvals
  - [ ] Open details
  - [ ] Understand impact
  - [ ] Identify risk
  - [ ] Make decision confidently

- [ ] All tests pass
- [ ] No critical UI bugs
- [ ] Manual verification passed

- [ ] A new user understands the UI in <10 seconds