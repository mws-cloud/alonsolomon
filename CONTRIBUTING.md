# Contributing (landing page)

## Safe work with Supabase

- Frontend may use **only** the anon/publishable key via env:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Import the shared client: `import { supabase } from "@/integrations/supabase/client"`.
- **Do not** add `SUPABASE_SERVICE_ROLE_KEY`, `service_role`, or any secret JWT under `src/`.
- **Do not** hardcode Supabase URLs or keys in source — use `import.meta.env.VITE_*`.
- Edge functions under `supabase/functions/` talk to the DB with the service role. Leave them alone unless you are explicitly asked to change backend/admin behavior.
- Schema / RLS changes: open a PR that adds SQL under `supabase/migrations/` with RLS enabled. Do not weaken RLS to “make the form work”.

## Local setup

```bash
cp .env.example .env
# fill VITE_* from the project owner (anon only)
npm install
npm run dev
```

Before push:

```bash
npm run check:supabase-client
```

## What belongs in a landing-page PR

- New pages/components/styles under `src/`
- Form UX that inserts via the anon client (subject to RLS)
- Not: Coolify env, Studio access, service_role, or deploy credentials
