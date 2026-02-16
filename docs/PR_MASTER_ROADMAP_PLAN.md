# MSALS PR Master Roadmap Plan
**MSALS = Music-Driven Adaptive Learning System (VisionaryAI.MSALS / VisionaryAI.MDALS family)**  
_Last updated: 2026-02-15_

## 1. Product North Star
**“Scan the lesson. Learn it your way.”**  
MSALS transforms any lesson plan, syllabus, or learning objective into **personalized learning experiences**—starting with **original, genre-based music lessons**, and expanding to visuals and kinesthetic supports—delivered through a **voice-first teaching assistant**.

## 2. What MSALS Does
### Inputs
- Teacher/facility lesson plan or syllabus (upload / link / LMS export)
- Student-scanned QR codes that point to lesson objectives
- Optional ingestion sources (with rights constraints):
  - Photos of notes / pages (objective extraction)
  - Web URLs
  - YouTube URLs (store summaries + timestamps, avoid storing full transcripts unless permitted)
  - Book titles/metadata
  - Purchased/licensed Bible verse references (store references + user-provided excerpts)

### Core Outputs
- **Original music lesson** (student selects genre: *country, rap, R&B, gospel*; extensible)
- Optional multi-modal add-ons:
  - Visual concept maps / summary cards
  - Kinesthetic prompts (call-and-response, rhythm/movement cues)
- Adaptive reinforcement:
  - “Remix”/regenerate with new tempo, repetition, simplification, or practice prompts

## 3. Key UX Flows
### Student
1. Create free account → describe learning preferences (visual/auditory/kinesthetic + genre)
2. Baseline established (self-report + optional grade/progress integrations where allowed)
3. Scan QR code → MSALS pulls objectives → generates personalized lesson output
4. Voice agent guides learning (“play slower”, “quiz me”, “repeat chorus”, “show visuals”)

### Teacher / Facility
1. Upload lesson plan/syllabus → generate QR code
2. Share QR code on paper/LMS
3. Teacher sees dashboards: usage, progress signals, struggle areas
4. Teacher identity remains present via **avatar attribution** (“teacher’s assistant”, not replacement)

### Licensing Growth Loop
If a user scans content that is not licensed for transformation:
- MSALS **does not transform the content**
- Shows **“Request Learning Access”** button
- Sends a licensing invitation email to the rights holder/platform partner
- Tracks request status + demand signals

## 4. Architecture Pillars (Additive-by-Design)
- **Core engine remains stable**; new capabilities are additive modules:
  - `/voice-agent` (STT/TTS + orchestration)
  - `/qr` (QR links, access control, routing)
  - `/profiles` (learning preferences, baselines, analytics)
  - `/avatar-attribution` (teacher/facility identity propagation)
  - `/music-generation` (genre selection + provider adapter)
  - `/licensing-requests` (rights checks + outreach workflows)
  - `/saas` (tenancy, billing, observability, RBAC)

## 5. Phased Roadmap
### Phase 0 — Standalone Extraction (2–4 weeks)
**Goal:** MSALS runs as its own product with its own Supabase project.
- Extract MSALS/MDALS components + edge functions + migrations into new repo
- Standalone auth + minimal shell UI
- Confirm existing MDALS engine endpoints work end-to-end
- Environment config + deployment runbook

**Exit Criteria**
- `analyze-song`, `generate-plan`, `songs`, `plans` work
- RLS enforced
- New repo deploys independently

### Phase 1 — QR Lesson MVP (6–10 weeks)
**Goal:** Teacher QR → student scan → objective-to-music lesson (text + audio pipeline optional).
- Teacher creates lesson plan + objectives
- QR code generation + short-link routing
- Student scan flow + personalized output based on profile
- Genre selection (country/rap/R&B/gospel)
- Basic adaptive loop (repeat, simplify, quiz)
- Teacher avatar attribution for trust

**Exit Criteria**
- Classroom pilot workflow works with 1–2 teachers
- Audit logs + basic analytics

### Phase 2 — Voice-First Teaching Assistant (3–6 months)
**Goal:** “No manual navigation.”
- Voice agent can navigate and perform tasks for teacher/student
- Voice tutoring behaviors (Socratic prompts, recall checks)
- Accessibility-first UX
- Expanded teacher dashboards + cohort insights

**Exit Criteria**
- Voice agent completes core tasks with >90% success in testing
- Safeguards + confirmations for sensitive actions

### Phase 3 — Licensing & Partner Distribution (6–12 months)
**Goal:** MSALS as infrastructure embedded in platforms.
- Licensing request flywheel + CRM-like tracking
- Partner API/SDK for publishers/content platforms
- Rights-aware transformation enforcement (never transform unlicensed content)
- Enterprise controls (district, facility, platform partner)

**Exit Criteria**
- At least one partner integration pathway (pilot-ready)
- Clear licensing program + pricing tiers

## 6. Success Metrics
- Student: engagement minutes/week, lesson completion, recall checks, confidence survey lift
- Teacher: time saved, lesson reuse, student participation lift
- Program: activation (QR scans), retention, paid conversions, licensing request conversion
- Safety/compliance: rights violations = 0; privacy incidents = 0

## 7. Risks & Mitigations
- **Copyright/rights risk:** default to metadata + summaries; rights checks; request-access workflow
- **Teacher adoption risk:** teacher avatar attribution + “assistant” positioning; teacher dashboards
- **AI accuracy risk:** rubric-based checks; safety constraints; “cite objectives” mode; QA harness
- **Minor privacy risk:** consent flows; minimal PII; strict RLS; retention policy

## 8. Deliverables List (PR-ready)
- Product Requirements Doc (PRD)
- Technical Design Doc (TDD)
- Data Model + RLS spec
- API contracts (QR, objectives, music-gen, licensing)
- Pilot plan + evaluation protocol
- Backlog exports (CSV + Jira-ready)
