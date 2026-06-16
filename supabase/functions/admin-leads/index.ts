import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD') || '';
const ADMIN_PASSWORD_2 = Deno.env.get('ADMIN_PASSWORD_2') || '';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const password = (body.password || req.headers.get('x-admin-password') || '').toString();
    const validPasswords = [ADMIN_PASSWORD, ADMIN_PASSWORD_2].filter(Boolean);
    if (validPasswords.length === 0 || !validPasswords.includes(password)) {
      return json({ error: 'סיסמה שגויה' }, 401);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const action = (body.action || 'list').toString();

    switch (action) {
      case 'list': {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500);
        if (error) throw error;
        return json({ leads: data });
      }

      case 'update': {
        const id = (body.id || '').toString();
        if (!id) return json({ error: 'חסר מזהה' }, 400);
        const patch: Record<string, unknown> = {};
        if (body.status) patch.status = body.status;
        if (typeof body.notes === 'string') patch.notes = body.notes;
        if (body.reminder_at !== undefined) patch.reminder_at = body.reminder_at;
        if (Object.keys(patch).length === 0) return json({ error: 'אין מה לעדכן' }, 400);
        const { data, error } = await supabase
          .from('leads')
          .update(patch)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return json({ lead: data });
      }

      case 'delete': {
        const id = (body.id || '').toString();
        if (!id) return json({ error: 'חסר מזהה' }, 400);
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) throw error;
        return json({ ok: true });
      }

      default:
        return json({ error: 'פעולה לא מוכרת' }, 400);
    }
  } catch (err) {
    console.error('admin-leads error', err);
    return json({ error: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
});
