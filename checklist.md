# ✅ Checklist — Approval Clarity Layer

---

## Workflow — phase management

Use this at the **end of every phase** (and before opening a PR) so the tree stays green.

This repo uses **pnpm** for installs and scripts (not Yarn); if tooling changes, swap `pnpm` for the project’s package manager.


### Engineering gate (run every phase)

- [ ] **Dependencies:** `pnpm install` (lockfile committed; no drift)
- [ ] **TypeScript:** `pnpm exec tsc --noEmit`
- [ ] **Lint:** `pnpm lint`
- [ ] **Production build:** `pnpm build`
- [ ] **Unit tests:** `pnpm test` — all tests pass; **add or extend unit tests** for code introduced or changed in this phase

### User verification gate (run when the phase ships UI or behavior)

- [ ] Manually exercise what this phase added (happy path)
- [ ] Note any confusing copy, layout, or trust issues for Phase 8 / backlog

---

## Phase 0 — Setup

- [x] Initialize Next.js app (TypeScript)
- [x] Install dependencies:
  - [x] tailwindcss
  - [x] shadcn/ui
  - [x] lucide-react
  - [x] react-hook-form
  - [x] zod
- [x] Setup Tailwind config
- [x] Setup base layout (App shell)

### Test tooling (required before Phase 1 — unit tests every phase)

- [x] Install and wire:
  - [x] Vitest
  - [x] React Testing Library
  - [x] @testing-library/user-event
  - [x] jsdom
- [x] Add `pnpm test` script (and optional `pnpm test:watch` if useful)
- [x] Add at least one committed unit test (e.g. utility or trivial component) so CI can run `pnpm test`

### Phase gate — engineering

- [x] `pnpm install`
- [x] `pnpm exec tsc --noEmit`
- [x] `pnpm lint`
- [x] `pnpm build`
- [x] `pnpm test`

### Phase gate — user verification

- [ ] Open the app locally; confirm header/shell and placeholder inbox look correct

---

## Phase 1 — Data Modeling (Mock First)

- [x] Create mock approval dataset
  - [x] id
  - [x] title
  - [x] action_type
  - [x] tool (email, calendar, finance, etc.)
  - [x] risk_level (low, medium, high)
  - [x] summary
  - [x] explanation
  - [x] impact.before
  - [x] impact.after
  - [x] recommendation
  - [x] timestamp

- [x] Store in `/lib/mock-data.ts` (`src/lib/mock-data.ts`)

### Unit tests (this phase)

- [x] Unit tests for mock data shape / invariants (e.g. every record has required fields, valid `risk_level`, valid `tool`)

### Phase gate — engineering

- [x] `pnpm install`
- [x] `pnpm exec tsc --noEmit`
- [x] `pnpm lint`
- [x] `pnpm build`
- [x] `pnpm test`

### Phase gate — user verification

- [x] N/A (data-only) unless exposed in UI; then spot-check consumers still render

---

## Phase 2 — Approval Inbox (List View)

- [x] Build `ApprovalTable` component
- [x] Build `ApprovalRow` component

- [x] Display:
  - [x] title
  - [x] risk badge
  - [x] timestamp
  - [x] action button (“View”)

- [x] Implement:
  - [x] risk color mapping
  - [x] click row → open detail drawer

### Unit tests (this phase)

- [x] Tests for list rendering (rows, columns) and risk styling helpers used by the table

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Scan the inbox: titles, risk, and time read clearly; “View” is obvious

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

### Unit tests (this phase)

- [ ] Tests for drawer content given a sample approval (sections render; close control present)

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Open an approval: can answer “what will happen?” without hunting; close and reopen feels natural

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

### Unit tests (this phase)

- [ ] `RiskBadge` label + class/variant per level
- [ ] `RecommendationCard` message (and confidence when set)
- [ ] `BeforeAfterDiff` renders before/after keys

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Risk colors read at a glance; diff is scannable; recommendation reads as a single clear callout

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

### Unit tests (this phase)

- [ ] Tests for state transitions (select, open, close) and action handlers (mocked)

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Full loop: pick row → drawer → approve/reject feedback behaves as expected

---

## Phase 6 — UI Polish

- [ ] Improve spacing and typography
- [ ] Add icons (lucide)
- [ ] Add hover states
- [ ] Add empty state
- [ ] Ensure mobile responsiveness (basic)

### Unit tests (this phase)

- [ ] Tests for empty state and any new formatting helpers; snapshot or RTL only where stable

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Resize viewport; hover states; empty inbox still feels intentional

---

## Phase 7 — Automated Testing (breadth & hardening)

Expand coverage beyond per-phase unit tests: integration-style and interaction tests.

### Unit & logic tests (consolidate / extend)

- [ ] Test risk level mapping
- [ ] Test recommendation mapping
- [ ] Test fallback for unknown risk
- [ ] Test diff formatting logic

---

### Component tests

- [ ] ApprovalTable renders rows
- [ ] RiskBadge renders correct label + style
- [ ] DetailDrawer renders selected approval
- [ ] RecommendationCard shows correct message
- [ ] BeforeAfterDiff renders both states

---

### Interaction tests

- [ ] Click row → opens drawer
- [ ] Close drawer → hides details
- [ ] Approve button triggers handler
- [ ] Reject button triggers handler

---

### Edge cases

- [ ] Missing explanation handled
- [ ] Missing before/after handled
- [ ] Empty list handled
- [ ] Unknown risk handled gracefully

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Run through regression script: list, drawer, edge-case records if available in mock data

---

## Phase 8 — Manual Verification (User Validation)

Structured user validation (deeper than per-phase spot checks).

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

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

---

## Phase 9 — QA Pass

- [ ] Run all tests
- [ ] Fix failing tests
- [ ] Run manual verification
- [ ] Fix clarity issues
- [ ] Re-test after fixes

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Repeat Phase 8 scenarios after fixes; sign off or file follow-ups

---

## Phase 10 — Stretch (Optional)

- [ ] Add filtering (risk level)
- [ ] Add search
- [ ] Add grouping
- [ ] Add confidence score UI
- [ ] Add mock “approval history”

### Unit tests (this phase)

- [ ] Tests for any new filters, search, or grouping logic (pure functions first)

### Phase gate — engineering

- [ ] `pnpm install`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `pnpm test`

### Phase gate — user verification

- [ ] Exercise new filters/search on real mock data

---

## ✅ Definition of Done

- [ ] User can:
  - [ ] View approvals
  - [ ] Open details
  - [ ] Understand impact
  - [ ] Identify risk
  - [ ] Make decision confidently

- [ ] All tests pass (`pnpm test`)
- [ ] Typecheck, lint, and build pass (`pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`)
- [ ] No critical UI bugs
- [ ] Manual verification passed

- [ ] A new user understands the UI in <10 seconds
