# MSALS Security, Privacy & Compliance

## Authentication Model

### Current (Phase 0)
- **Method:** Email/password via Supabase Auth
- **Session management:** JWT tokens (Supabase-managed)
- **Token refresh:** Automatic via `@supabase/supabase-js`

### Planned
- OAuth providers (Google, Microsoft) for school SSO
- Magic link login for students (passwordless)
- Role-based access (teacher, student, admin) via custom claims or profiles table

## Row Level Security (RLS)

All data tables have RLS enabled. Current policies:
- Users can only CRUD their own records (`auth.uid() = user_id`)
- Song insights accessible through song ownership (JOIN check)
- Helper functions use `SECURITY DEFINER` to bypass RLS for aggregation queries

### RLS Best Practices
- Every new table MUST have `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- User-owned tables MUST have `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE`
- Policies use `auth.uid()` for ownership verification
- Service role key is used only in edge functions, never in frontend

## API Key Management

| Key | Storage | Access |
|-----|---------|--------|
| Supabase Anon Key | `.env` (frontend) | Public (safe, used with RLS) |
| Supabase Service Role Key | Supabase Secrets | Edge functions only |
| Gemini API Key | Supabase Secrets | Edge functions only |

### Key Rotation
- Supabase keys can be rotated via Dashboard > Settings > API
- Gemini key: `npx supabase secrets set GEMINI_API_KEY=new-key`
- After rotation, redeploy edge functions: `npx supabase functions deploy mdals-engine`

## Content Safety

### Copyright Compliance
- **No lyrics stored** — All AI prompts explicitly prohibit lyric quoting
- **Only summaries** — Database stores AI-generated analysis, not copyrighted content
- **External links** — Music platform URLs stored; no audio files hosted
- **Transformative use** — Analysis produces educational pedagogical content

### Content Moderation
- AI prompts include domain-specific instructions (spiritual, leadership, etc.)
- Generated plans are educational in nature
- No user-generated content shared publicly (all data is per-user)

## Privacy Considerations

### Data Collected
| Data | Purpose | Retention |
|------|---------|-----------|
| Email | Authentication | Account lifetime |
| Song metadata | Analysis input | Account lifetime |
| Learning plans | Educational content | Account lifetime |
| Plan progress | Track completion | Account lifetime |

### Data NOT Collected
- Location data
- Device fingerprints
- Third-party tracking
- Advertising identifiers
- Biometric data

### COPPA Compliance (Future — Phase 1+)
When targeting K-12 students:
- [ ] Parental consent flow before account creation for under-13
- [ ] Minimal PII collection (email only, no real names required)
- [ ] Data retention policy (auto-delete after school year)
- [ ] No behavioral advertising
- [ ] Teacher/school acts as agent for parental consent

### FERPA Compliance (Future — Phase 3+)
When integrated with schools:
- [ ] Student education records accessible only to authorized teachers
- [ ] No data sharing with third parties without consent
- [ ] Audit trail for data access
- [ ] Data portability on request
- [ ] Annual notification to parents about data practices

## Edge Function Security

### Current Patterns
- CORS headers allow all origins (`*`) — acceptable for Phase 0
- Service role client used for database operations
- No input sanitization beyond Gemini prompt structure

### Planned Hardening (Phase 1+)
- [ ] Restrict CORS to specific domains
- [ ] Move Gemini API key from URL to header
- [ ] Add input validation/sanitization layer
- [ ] Rate limiting per user
- [ ] Request logging for audit trail

## Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Unauthorized data access | High | RLS enforces per-user isolation |
| API key exposure (frontend) | Low | Anon key only; RLS protects data |
| API key exposure (Gemini) | Medium | Server-side only; in Supabase Secrets |
| Prompt injection | Medium | Structured prompts with domain constraints |
| Data breach | High | Supabase encryption at rest; minimal PII |
| Cross-user data leakage | High | RLS on all tables; ownership checks |

## Incident Response

1. **Detection:** Monitor Supabase logs for unusual query patterns
2. **Containment:** Disable affected edge functions via dashboard
3. **Investigation:** Review edge function logs and database audit trail
4. **Remediation:** Rotate compromised keys, patch vulnerabilities
5. **Communication:** Notify affected users per applicable regulations
