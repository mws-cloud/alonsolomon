import { createClient } from 'npm:@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TO_EMAIL = 'Alon@a-solomon.com';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );

const buildHtml = (lead: any) => {
  const base = `${SUPABASE_URL}/functions/v1/lead-action?id=${encodeURIComponent(lead.id)}`;
  const btn = (href: string, bg: string, color: string, label: string) =>
    `<a href="${href}" style="display:inline-block;background:${bg};color:${color};text-decoration:none;padding:14px 20px;font-size:14px;font-weight:600;border-radius:4px;margin:4px;min-width:160px;text-align:center;border:1px solid ${bg};">${label}</a>`;

  return `
<!DOCTYPE html>
<html lang="he" dir="rtl"><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#F7F4EE;padding:24px;color:#1F2937;margin:0;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e0d6;border-radius:6px;overflow:hidden;">
    <div style="background:#C89A3D;color:#1E355E;padding:20px 24px;font-size:18px;font-weight:700;">⏰ תזכורת — ליד ממתין</div>
    <div style="padding:24px;">
      <p style="margin:0 0 16px;font-size:14px;color:#667085;">ביקשת להזכיר לך לגבי הליד הזה:</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px 0;color:#667085;width:120px;">שם:</td><td style="padding:8px 0;"><strong>${esc(lead.name)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#667085;">טלפון:</td><td style="padding:8px 0;" dir="ltr"><a href="tel:${esc(lead.phone)}" style="color:#1E355E;"><strong>${esc(lead.phone)}</strong></a></td></tr>
        ${lead.email ? `<tr><td style="padding:8px 0;color:#667085;">אימייל:</td><td style="padding:8px 0;" dir="ltr">${esc(lead.email)}</td></tr>` : ''}
        ${lead.message ? `<tr><td style="padding:8px 0;color:#667085;vertical-align:top;">הודעה:</td><td style="padding:8px 0;white-space:pre-wrap;line-height:1.6;">${esc(lead.message)}</td></tr>` : ''}
      </table>
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0ebe0;text-align:center;">
        ${btn(`${base}&action=call`, '#C89A3D', '#1E355E', '📞 חיוג לליד')}
        ${btn(`${base}&action=remind`, '#1E355E', '#fff', '⏰ תזכיר שוב בעוד שעה')}
        ${btn(`${base}&action=in_progress`, '#fff', '#1E355E', 'ליד בתהליך')}
        ${btn(`${base}&action=irrelevant`, '#fff', '#9ca3af', 'לא רלוונטי')}
      </div>
    </div>
  </div>
</body></html>`;
};

Deno.serve(async (_req) => {
  try {
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY missing');
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    const { data: due, error } = await supabase
      .from('leads')
      .select('*')
      .eq('status', 'reminder')
      .lte('reminder_at', new Date().toISOString())
      .limit(20);

    if (error) throw error;
    if (!due || due.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), { headers: { 'Content-Type': 'application/json' } });
    }

    let sent = 0;
    for (const lead of due) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'אלון סולומון - אתר <noreply@alon.606.co.il>',
          to: [TO_EMAIL],
          subject: `תזכורת: ליד מאתר החדש של אלון סולומון - ${lead.name}`,
          html: buildHtml(lead),
          ...(lead.email ? { reply_to: lead.email } : {}),
        }),
      });
      if (res.ok) {
        sent++;
        await supabase
          .from('leads')
          .update({ reminder_at: null, last_action_at: new Date().toISOString() })
          .eq('id', lead.id);
      } else {
        console.error('reminder send failed', await res.text());
      }
    }

    return new Response(JSON.stringify({ processed: due.length, sent }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('lead-reminders error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
