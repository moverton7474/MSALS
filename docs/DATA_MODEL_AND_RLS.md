# MSALS Data Model & RLS Policies

## Core Tables (MDALS Engine — Immutable)

### mdals_songs
Stores song metadata submitted by users for analysis.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Song identifier |
| user_id | UUID | FK → auth.users, NOT NULL | Owner |
| title | TEXT | NOT NULL | Song title |
| artist | TEXT | | Artist name |
| album | TEXT | | Album name |
| source_type | TEXT | CHECK (spotify/apple/youtube/manual/other) | Music platform |
| source_id | TEXT | | Platform-specific ID |
| source_url | TEXT | | Link to song |
| user_notes | TEXT | | User's notes about the song |
| language | TEXT | DEFAULT 'en' | Song language |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | |

**Indexes:** user_id, source_type, created_at
**Unique:** (user_id, title, artist, source_type)

### mdals_song_insights
AI-generated analysis results. NO lyrics stored — only summaries.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Insight identifier |
| song_id | UUID | FK → mdals_songs, NOT NULL | Parent song |
| summary | TEXT | NOT NULL | AI-generated thematic summary |
| themes | JSONB | DEFAULT '[]' | Array of theme strings |
| emotions | JSONB | DEFAULT '[]' | Array of emotion strings |
| domain_tags | JSONB | DEFAULT '[]' | Domain classification tags |
| references | JSONB | DEFAULT '[]' | Pedagogical references |
| raw_model_output | TEXT | | Full model response (debug) |
| model_used | TEXT | | Gemini model version |
| domain_preferences | TEXT[] | | User's domain selections |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | |

**Indexes:** song_id, created_at, GIN(themes), GIN(domain_tags)

### mdals_learning_plans
Multi-day structured learning plans generated from song analysis.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, gen_random_uuid() | Plan identifier |
| user_id | UUID | FK → auth.users, NOT NULL | Owner |
| song_id | UUID | FK → mdals_songs | Source song |
| title | TEXT | NOT NULL | Plan title |
| goal_description | TEXT | | User's learning goal |
| duration_days | INT | CHECK (1-90), DEFAULT 7 | Plan length |
| domain_preferences | JSONB | DEFAULT '[]' | Selected domains |
| plan_json | JSONB | NOT NULL | Array of day objects |
| status | TEXT | CHECK (active/completed/paused/abandoned), DEFAULT 'paused' | |
| current_day | INT | DEFAULT 0 | Progress tracker |
| started_at | TIMESTAMPTZ | | When plan was activated |
| completed_at | TIMESTAMPTZ | | When plan was completed |
| model_used | TEXT | | Gemini model version |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | |

**Indexes:** user_id, song_id, status, created_at, GIN(domain_preferences)

## RLS Policies (Immutable)

All three tables have RLS enabled with user-ownership policies:

```sql
-- mdals_songs: Users can only access their own songs
CREATE POLICY "Users own songs"
  ON mdals_songs FOR ALL
  USING (auth.uid() = user_id);

-- mdals_song_insights: Access through song ownership
CREATE POLICY "Users access insights through song"
  ON mdals_song_insights FOR ALL
  USING (EXISTS (
    SELECT 1 FROM mdals_songs
    WHERE mdals_songs.id = mdals_song_insights.song_id
    AND mdals_songs.user_id = auth.uid()
  ));

-- mdals_learning_plans: Users can only access their own plans
CREATE POLICY "Users own plans"
  ON mdals_learning_plans FOR ALL
  USING (auth.uid() = user_id);
```

## Helper Functions (Immutable)

```sql
-- Get song with its latest insight
get_song_with_insight(p_song_id UUID) RETURNS JSONB
-- SECURITY DEFINER

-- Get all user songs with insights and plan counts
get_user_songs_with_insights(p_user_id UUID, p_limit INT DEFAULT 50) RETURNS JSONB
-- SECURITY DEFINER
```

## Entity Relationship Diagram

```
auth.users
    │
    ├──< mdals_songs (user_id FK)
    │        │
    │        ├──< mdals_song_insights (song_id FK)
    │        │
    │        └──< mdals_learning_plans (song_id FK)
    │
    └──< mdals_learning_plans (user_id FK)
```

## Planned Expansion Tables

These tables will be added in future phases. They reference MDALS tables via foreign keys but never modify them.

### Phase 1: QR + Profiles
- `qr_codes` → references `mdals_learning_plans(id)`, `mdals_songs(id)`
- `qr_scans` → references `qr_codes(id)`
- `learning_profiles` → references `auth.users(id)`
- `learning_progress` → references `mdals_learning_plans(id)`

### Phase 2: Voice + Music
- `voice_sessions` → references `mdals_learning_plans(id)`
- `generated_music` → references `mdals_learning_plans(id)`, `mdals_songs(id)`

### Phase 3: Avatar + Licensing
- `teacher_profiles` → references `auth.users(id)`
- `facility_profiles` → standalone
- `plan_attributions` → references `mdals_learning_plans(id)`, `teacher_profiles(id)`
- `access_requests` → references `teacher_profiles(id)`, `mdals_learning_plans(id)`
- `plan_access` → references `mdals_learning_plans(id)`

### Phase 4: SaaS
- `tenants` → standalone
- `tenant_members` → references `tenants(id)`, `auth.users(id)`
- `usage_metrics` → references `tenants(id)`

## Migration Strategy

1. Each phase gets its own migration file: `YYYYMMDD_phase_N_description.sql`
2. All new tables follow the same conventions: UUID PK, user_id FK, RLS enabled, timestamps
3. Rollback SQL included in each migration file as comments
4. Migrations are applied via `npx supabase db push`

## Data Safety

- **No lyrics stored** — only AI-generated summaries and analysis
- **No audio hosted** — only external platform links (Spotify, Apple, YouTube)
- **User isolation** — RLS enforces per-user data boundaries
- **Cascade deletes** — removing a user cascades to all their data
