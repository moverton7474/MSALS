# MSALS Architecture

## System Overview

MSALS (Music-Driven Adaptive Learning System) transforms learning objectives into personalized experiences anchored by music. The architecture preserves the immutable MDALS engine core while enabling additive expansion through adapter and wrapper modules.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React + TS)                  │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Login /  │  │  MDALS   │  │   QR     │  │ Voice  │ │
│  │   Auth    │  │ TestPanel│  │  Pages   │  │ Coach  │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│        │              │              │            │      │
│  ┌─────┴──────────────┴──────────────┴────────────┘     │
│  │           Supabase Client (lib/supabase.ts)          │
│  └──────────────────────┬───────────────────────────┘   │
└─────────────────────────┼───────────────────────────────┘
                          │ HTTPS
┌─────────────────────────┼───────────────────────────────┐
│                Supabase Backend                          │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Edge Functions                      │    │
│  │                                                  │    │
│  │  ┌────────────────┐   ┌──────────────────┐     │    │
│  │  │  mdals-engine   │   │  Future modules  │     │    │
│  │  │  (IMMUTABLE)    │   │  (qr-manager,    │     │    │
│  │  │                 │   │   voice-assistant,│     │    │
│  │  │  - find-song    │   │   music-generator,│    │    │
│  │  │  - analyze-song │   │   profiles-manager│    │    │
│  │  │  - generate-plan│   │   access-manager) │    │    │
│  │  │  - start-plan   │   │                   │    │    │
│  │  │  - get-active   │   └──────────────────┘    │    │
│  │  │  - complete-day │                            │    │
│  │  └────────┬────────┘                            │    │
│  │           │                                      │    │
│  └───────────┼──────────────────────────────────────┘   │
│              │                                           │
│  ┌───────────┼──────────────────────────────────────┐   │
│  │        PostgreSQL Database                        │   │
│  │                                                   │   │
│  │  Core (IMMUTABLE):        Expansion (ADDITIVE):   │   │
│  │  - mdals_songs            - qr_codes              │   │
│  │  - mdals_song_insights    - learning_profiles     │   │
│  │  - mdals_learning_plans   - teacher_profiles      │   │
│  │                           - generated_music       │   │
│  │  All tables have RLS      - voice_sessions        │   │
│  │  enforced per user        - access_requests       │   │
│  │                           - tenants               │   │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Supabase Auth                         │  │
│  │              (Email/Password)                      │  │
│  └───────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          │
                    External APIs
              ┌───────────┼───────────┐
              │           │           │
        ┌─────┴──┐  ┌────┴───┐  ┌───┴────┐
        │ Gemini │  │ Music  │  │ Future │
        │   AI   │  │  Gen   │  │  APIs  │
        │ (LLM)  │  │  API   │  │        │
        └────────┘  └────────┘  └────────┘
```

## Core Principles

### 1. MDALS Engine Immutability
The original MDALS engine (`mdals-engine/index.ts`, `promptTemplates.ts`) is **never modified**. All new capabilities are built through:
- **Adapters**: New edge functions that read MDALS data and transform it
- **Wrappers**: New frontend components that compose with MdalsTestPanel
- **Extension tables**: New database tables that JOIN to MDALS tables via foreign keys

### 2. Additive-Only Development
New features are added as separate modules. Each module has:
- Its own database migration file
- Its own edge function(s)
- Its own frontend component(s)
- Foreign key references to MDALS tables (never schema modifications)

### 3. Data Flow

```
User Input → Frontend Component → Supabase Client → Edge Function → Gemini AI
                                                           │
                                                           ▼
                                                     PostgreSQL
                                                    (with RLS)
                                                           │
                                                           ▼
                                              Response → Frontend Display
```

## Module Boundaries

| Module | Database | Edge Function | Frontend | Status |
|--------|----------|---------------|----------|--------|
| MDALS Core | mdals_songs, mdals_song_insights, mdals_learning_plans | mdals-engine | MdalsTestPanel | Extracted |
| Auth | auth.users (built-in) | N/A (Supabase Auth) | LoginPage, ProtectedRoute | Extracted |
| QR | qr_codes, qr_scans | qr-manager | QRCreatePage, QRScanPage | Planned |
| Profiles | learning_profiles, learning_progress | profiles-manager | ProfilePage | Planned |
| Music | generated_music | music-generator | MusicPlayer | Planned |
| Voice | voice_sessions | voice-assistant | VoiceCoachWidget | Planned |
| Avatar | teacher_profiles, facility_profiles, plan_attributions | N/A (CRUD) | TeacherProfilePage | Planned |
| Licensing | access_requests, plan_access | access-manager | AccessRequestFlow | Planned |
| SaaS | tenants, tenant_members, usage_metrics | tenant-manager | AdminDashboard | Planned |

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + TypeScript | 18.3 / 5.6 |
| Bundler | Vite | 6.x |
| Styling | Tailwind CSS | 3.4 |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) | v2 |
| AI/LLM | Google Gemini 2.0 Flash | Current |
| Runtime (Edge Functions) | Deno | Supabase-managed |

## Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `VITE_SUPABASE_URL` | `.env` (frontend) | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `.env` (frontend) | Supabase anonymous key |
| `SUPABASE_URL` | Auto-injected (edge) | Database URL for edge functions |
| `SUPABASE_SERVICE_ROLE_KEY` | Auto-injected (edge) | Service role key for edge functions |
| `GEMINI_API_KEY` | Supabase Secrets | Google Gemini API key |
