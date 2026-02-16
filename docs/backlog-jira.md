# MSALS Backlog — Jira-Ready Format

## Epic 1: Standalone Extraction (Phase 0)

### Story: MSALS-001 — Scaffold MSALS Repository
**Priority:** P0 | **Points:** 2
- **Subtask:** Initialize Vite + React + TS project
- **Subtask:** Install Tailwind CSS + PostCSS
- **Subtask:** Initialize Supabase CLI
- **Subtask:** Create directory structure
- **AC:** `npm run dev` starts successfully

### Story: MSALS-002 — Copy MDALS Engine Files
**Priority:** P0 | **Points:** 1
- **Subtask:** Copy index.ts unchanged
- **Subtask:** Copy promptTemplates.ts unchanged
- **Subtask:** Copy deno.json and .npmrc unchanged
- **AC:** All 4 files byte-identical to source

### Story: MSALS-003 — Copy MDALS Migration
**Priority:** P0 | **Points:** 1
- **Subtask:** Copy 20251207120000_mdals_engine_schema.sql
- **AC:** File identical to source

### Story: MSALS-004 — Extract MDALS Types
**Priority:** P0 | **Points:** 1
- **Subtask:** Extract lines 1102-1232 from source types.ts
- **Subtask:** Create src/types/mdals.ts
- **AC:** `npx tsc --noEmit` passes

### Story: MSALS-005 — Adapt MdalsTestPanel
**Priority:** P0 | **Points:** 1
- **Subtask:** Copy MdalsTestPanel.tsx
- **Subtask:** Change `../../types` to `../../types/mdals`
- **AC:** Only 1 import path changed; component renders

### Story: MSALS-006 — Supabase Client Wrapper
**Priority:** P0 | **Points:** 1
- **Subtask:** Create src/lib/supabase.ts
- **Subtask:** Read from VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- **AC:** Error thrown if env vars missing

### Story: MSALS-007 — Auth Hook
**Priority:** P0 | **Points:** 2
- **Subtask:** Create src/hooks/useAuth.ts
- **Subtask:** Track session, user, loading state
- **Subtask:** Expose signOut function
- **AC:** Auth state updates on login/logout

### Story: MSALS-008 — Login Page
**Priority:** P0 | **Points:** 3
- **Subtask:** Create LoginPage with email/password form
- **Subtask:** Support sign-in and sign-up modes
- **Subtask:** Display error and success messages
- **AC:** New user can sign up and sign in

### Story: MSALS-009 — Protected Route + Dashboard
**Priority:** P0 | **Points:** 2
- **Subtask:** Create ProtectedRoute component
- **Subtask:** Create DashboardPage wrapping MdalsTestPanel
- **AC:** Unauthenticated → login; authenticated → dashboard

### Story: MSALS-010 — Supabase Project Setup
**Priority:** P0 | **Points:** 1
- **Subtask:** Create new Supabase project
- **Subtask:** Configure .env with credentials
- **Subtask:** Link CLI to project
- **AC:** `npx supabase link` succeeds

### Story: MSALS-011 — Apply Migration
**Priority:** P0 | **Points:** 1
- **Subtask:** Run `npx supabase db push`
- **AC:** 3 tables created with RLS and indexes

### Story: MSALS-012 — Deploy Edge Function
**Priority:** P0 | **Points:** 1
- **Subtask:** Deploy mdals-engine
- **Subtask:** Set GEMINI_API_KEY secret
- **AC:** Function responds to POST

### Story: MSALS-013 — End-to-End Verification
**Priority:** P0 | **Points:** 3
- **Subtask:** Test find-song
- **Subtask:** Test analyze-song
- **Subtask:** Test generate-plan
- **Subtask:** Test start-plan
- **Subtask:** Test complete-day
- **Subtask:** Test RLS enforcement
- **AC:** All 6 endpoints return expected data; RLS blocks unauthorized access

---

## Epic 2: QR Lesson MVP (Phase 1)

### Story: MSALS-020 — QR Database Schema
**Priority:** P1 | **Points:** 2
- **Subtask:** Design qr_codes table
- **Subtask:** Design qr_scans table
- **Subtask:** Write migration with RLS policies
- **AC:** Migration applies clean, RLS enforced

### Story: MSALS-022 — QR Manager Edge Function
**Priority:** P1 | **Points:** 5
- **Subtask:** Implement create-qr action
- **Subtask:** Implement resolve-qr action
- **Subtask:** Implement log-scan action
- **Subtask:** Implement list-teacher-qrs action
- **AC:** All 4 actions return correct responses

### Story: MSALS-023 — QR Creation Page (Teacher)
**Priority:** P1 | **Points:** 5
- **Subtask:** Plan/song selector
- **Subtask:** Access type configuration (public/enrolled/code)
- **Subtask:** QR code generation and display
- **Subtask:** Download/print functionality
- **AC:** Teacher creates QR linked to plan, printable image generated

### Story: MSALS-024 — QR Scan Landing (Student)
**Priority:** P1 | **Points:** 5
- **Subtask:** QR code scanner (camera integration)
- **Subtask:** URL-based scan route (/scan/:code)
- **Subtask:** Access verification
- **Subtask:** Redirect to plan content
- **AC:** Student scans QR, sees plan content after auth check

---

## Epic 3: Student Profiles (Phase 1)

### Story: MSALS-027 — Profile Database Schema
**Priority:** P1 | **Points:** 2
- **Subtask:** Design learning_profiles table
- **Subtask:** Design learning_progress table
- **Subtask:** Write migration with RLS
- **AC:** Migration applies clean

### Story: MSALS-029 — Profiles Manager Edge Function
**Priority:** P1 | **Points:** 5
- **Subtask:** Create/update/get profile
- **Subtask:** Save reflection responses
- **Subtask:** Generate progress summary
- **AC:** Full CRUD + aggregation working

### Story: MSALS-031 — Baseline Assessment
**Priority:** P1 | **Points:** 5
- **Subtask:** Learning style quiz (visual/auditory/kinesthetic/reading)
- **Subtask:** Domain preference selection
- **Subtask:** Results storage in learning_profiles
- **AC:** Assessment completes and stores results

---

## Epic 4: Voice Assistant (Phase 2)

### Story: MSALS-036 — Voice Assistant Edge Function
**Priority:** P2 | **Points:** 8
- **Subtask:** Read plan content from mdals_learning_plans
- **Subtask:** Build conversational context
- **Subtask:** Call Gemini for AI response
- **Subtask:** Store transcript in voice_sessions
- **AC:** Multi-turn conversation about plan content works

### Story: MSALS-037 — Voice Coach Widget
**Priority:** P2 | **Points:** 5
- **Subtask:** Floating mic button UI
- **Subtask:** Recording state management
- **Subtask:** Audio playback for responses
- **AC:** User can start/stop voice interaction from any page

---

## Epic 5: Music Generation (Phase 2)

### Story: MSALS-043 — Music Generator Adapter
**Priority:** P2 | **Points:** 8
- **Subtask:** Read themes/emotions from mdals_song_insights
- **Subtask:** Build music generation prompt by genre
- **Subtask:** Call external music API (adapter interface)
- **Subtask:** Store result URL in generated_music
- **AC:** Original music generated matching plan themes

---

## Epic 6: Avatar Attribution (Phase 3)

### Story: MSALS-048 — Teacher Profile Page
**Priority:** P2 | **Points:** 5
- **Subtask:** Profile creation/edit form
- **Subtask:** Avatar upload
- **Subtask:** Institution and specialization fields
- **AC:** Teacher profile created and visible to students

---

## Epic 7: Licensing Workflow (Phase 3)

### Story: MSALS-052 — Access Manager Edge Function
**Priority:** P2 | **Points:** 5
- **Subtask:** Request access action
- **Subtask:** Approve/deny actions
- **Subtask:** Check access action
- **Subtask:** List requests for teacher
- **AC:** Full request-approval workflow completes

---

## Epic 8: SaaS Infrastructure (Phase 4)

### Story: MSALS-057 — Tenant Manager Edge Function
**Priority:** P2 | **Points:** 8
- **Subtask:** Create tenant
- **Subtask:** Invite member
- **Subtask:** Assign role
- **Subtask:** Check quota
- **Subtask:** Get usage metrics
- **AC:** Multi-tenant RBAC fully functional

### Story: MSALS-058 — Admin Dashboard
**Priority:** P2 | **Points:** 8
- **Subtask:** Tenant overview page
- **Subtask:** Member management
- **Subtask:** Usage charts
- **Subtask:** Billing integration hooks
- **AC:** Admin can manage tenant, see usage, invite members
