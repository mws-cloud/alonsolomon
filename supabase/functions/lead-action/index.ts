import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const page = (title: string, body: string, autoCloseMs = 0) => `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  ${autoCloseMs ? `<script>setTimeout(()=>{try{window.close()}catch(e){}},${autoCloseMs})</script>` : ''}
  <style>
    body{margin:0;font-family:Arial,sans-serif;background:#F7F4EE;color:#1F2937;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
    .card{background:#fff;border:1px solid #e5e0d6;border-radius:8px;padding:40px 32px;max-width:480px;text-align:center;box-shadow:0 4px 24px rgba(30,53,94,.08);}
    h1{color:#1E355E;font-size:24px;margin:0 0 12px;}
    p{color:#667085;font-size:15px;margin:0 0 20px;line-height:1.6;}
    .accent{color:#C89A3D;font-weight:600;}
    a.btn{display:inline-block;background:#1E355E;color:#fff;text-decoration:none;padding:12px 24px;border-radius:4px;font-size:14px;margin-top:8px;}
  </style>
</head>
<body><div class="card">${body}</div></body>
</html>`;

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const action = url.searchParams.get('action');

  if (!id || !action) {
    return new Response(page('שגיאה', '<h1>קישור לא תקין</h1><p>חסרים פרטי הליד.</p>'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data: lead, error } = await supabase.from('leads').select('*').eq('id', id).maybeSingle();
  if (error || !lead) {
    return new Response(page('לא נמצא', '<h1>הליד לא נמצא</h1><p>ייתכן שהקישור פג תוקף.</p>'), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const now = new Date().toISOString();

  switch (action) {
    case 'call': {
      await supabase
        .from('leads')
        .update({
          call_attempts: (lead.call_attempts || 0) + 1,
          last_action_at: now,
          status: lead.status === 'new' ? 'called' : lead.status,
        })
        .eq('id', id);
      // Redirect to tel: so the phone dialer opens
      return new Response(null, {
        status: 302,
        headers: { Location: `tel:${lead.phone}` },
      });
    }

    case 'remind': {
      const remindAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      await supabase
        .from('leads')
        .update({ status: 'reminder', reminder_at: remindAt, last_action_at: now })
        .eq('id', id);
      return new Response(
        page(
          'תזכורת נקבעה',
          `<h1>⏰ תזכורת נקבעה</h1><p>נשלח אליך מייל תזכורת לגבי <span class="accent">${lead.name}</span> בעוד שעה בדיוק.</p>`,
          3000
        ),
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    case 'irrelevant': {
      await supabase
        .from('leads')
        .update({ status: 'irrelevant', last_action_at: now })
        .eq('id', id);
      return new Response(
        page(
          'סומן',
          `<h1>סומן כלא רלוונטי</h1><p>הליד של <span class="accent">${lead.name}</span> סומן כלא רלוונטי.</p>`,
          3000
        ),
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    case 'in_progress': {
      await supabase
        .from('leads')
        .update({ status: 'in_progress', last_action_at: now })
        .eq('id', id);
      return new Response(
        page(
          'סומן בתהליך',
          `<h1>הליד בתהליך</h1><p>הליד של <span class="accent">${lead.name}</span> סומן כליד בתהליך טיפול.</p>`,
          3000
        ),
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    default:
      return new Response(page('שגיאה', '<h1>פעולה לא מוכרת</h1>'), {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
  }
});
