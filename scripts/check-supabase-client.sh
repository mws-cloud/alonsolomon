#!/usr/bin/env bash
# Fail if browser code references the service role or embeds JWT-looking secrets.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
fail=0

if rg -n --glob '!*.d.ts' -e 'SERVICE_ROLE|service_role|SUPABASE_SERVICE' "$root/src"; then
  echo "✗ src/ must not reference SERVICE_ROLE / service_role" >&2
  fail=1
fi

# Long-lived JWTs start with eyJ — block accidental key commits in src/
if rg -n --glob '!*.d.ts' -e 'eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.' "$root/src"; then
  echo "✗ src/ must not contain embedded JWT secrets" >&2
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  exit 1
fi
echo "✓ supabase client guard: src/ is clean"
