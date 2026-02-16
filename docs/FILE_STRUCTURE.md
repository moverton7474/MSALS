# MSALS Recommended Repository File Structure

```
msals/
  README.md
  LICENSE
  .env.example
  package.json
  tsconfig.json

  docs/
    PR_MASTER_ROADMAP_PLAN.md
    PRODUCT_DESCRIPTION.md
    ARCHITECTURE.md
    DATA_MODEL_AND_RLS.md
    SECURITY_PRIVACY_COMPLIANCE.md
    IP_STRATEGY_AND_ASSETS.md
    COMPETITIVE_LANDSCAPE.md
    BUSINESS_PLAN.md
    PITCH_ONE_PAGER.md
    RUNBOOK_DEPLOYMENT.md
    RUNBOOK_PARTNER_LICENSING.md

  src/
    app/ or pages/               # depending on Next.js vs Vite router
    components/
      mdals/                     # legacy engine UI harness (copied intact)
      qr/
      voice/
      profiles/
      avatar/
      music/
      licensing/
    lib/
      mdals/                     # legacy MDALS engine client wrappers (unchanged)
      adapters/
        musicProviders/
        llmProviders/
        storage/
      rights/
      analytics/
      auth/
    types/
      mdals.ts
      objectives.ts
      licensing.ts
      voice.ts
    server/
      api/                       # REST endpoints
      jobs/                      # queue workers
      webhooks/
    tests/
      unit/
      integration/
      e2e/

  supabase/
    migrations/
    functions/
      mdals-engine/              # legacy edge function (copied intact)
      _shared/
    config.toml

  scripts/
    export_backlog_csv.ts
    generate_qr.ts
    seed_demo_data.ts
```

## Notes
- “Legacy engine” directories are copied as-is; new features live alongside them in new modules.
- Additive-only rule: don’t rewrite the engine; wrap it.
