import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TO_EMAIL = 'Alon@a-solomon.com';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );

const formTypeLabel: Record<string, string> = {
  contact: 'טופס יצירת קשר',
  footer: 'טופס בפוטר',
};

function calcLeadScore(proceedings: boolean | null | undefined, represented: boolean | null | undefined) {
  let score = 0;
  if (proceedings === true) score += 2;
  if (represented === true) score -= 2;
  else if (represented === false) score += 1;
  if (proceedings === true && represented === false) score += 1;
  return score;
}

function scoreBadge(score: number) {
  if (score >= 3) return { bg: '#fee2e2', color: '#b91c1c' };
  if (score >= 1) return { bg: '#ffedd5', color: '#c2410c' };
  if (score === 0) return { bg: '#fef9c3', color: '#854d0e' };
  return { bg: '#f3f4f6', color: '#4b5563' };
}

function normalizePhoneIL(raw: string) {
  const digits = (raw || '').replace(/\D/g, '');
  if (digits.startsWith('972')) return digits;
  if (digits.startsWith('0')) return '972' + digits.slice(1);
  return digits;
}

function waUrl(name: string, phone: string) {
  const first = (name || '').trim().split(/\s+/)[0] || '';
  const msg = `שלום ${first}, נעים מאוד אני עורך הדין אלון סולומון, קיבלתי את הפניה שלך, אשמח לקבל ממך קצת יותר פרטים`;
  return `https://wa.me/${normalizePhoneIL(phone)}?text=${encodeURIComponent(msg)}`;
}

export function buildLeadEmailHtml(opts: {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  formType: string;
  isReminder?: boolean;
  proceedings_started?: boolean | null;
  is_represented?: boolean | null;
  client_note?: string | null;
}) {
  const label = formTypeLabel[opts.formType] || 'טופס באתר';
  const base = `${SUPABASE_URL}/functions/v1/lead-action?id=${encodeURIComponent(opts.id)}`;
  const btn = (href: string, bg: string, color: string, label: string) =>
    `<a href="${href}" style="display:inline-block;background:${bg};color:${color};text-decoration:none;padding:14px 20px;font-size:14px;font-weight:600;border-radius:4px;margin:4px;min-width:160px;text-align:center;border:1px solid ${bg};">${label}</a>`;

  const callHref = `${base}&action=call`;
  const remindHref = `${base}&action=remind`;
  const irrelevantHref = `${base}&action=irrelevant`;
  const progressHref = `${base}&action=in_progress`;

  const yesNo = (v: boolean | null | undefined) =>
    v === true ? 'כן' : v === false ? 'לא' : 'לא צוין';

  const score = calcLeadScore(opts.proceedings_started, opts.is_represented);
  const badge = scoreBadge(score);
  const scoreStr = score > 0 ? `+${score}` : `${score}`;
  const whatsapp = waUrl(opts.name, opts.phone);

  return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background:#F7F4EE; padding:24px; color:#1F2937; margin:0;">
  <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e5e0d6; border-radius:6px; overflow:hidden;">
    <div style="background:#1E355E; color:#C89A3D; padding:20px 24px; font-size:18px; font-weight:600; display:flex; justify-content:space-between; align-items:center;">
      <span>${opts.isReminder ? '⏰ תזכורת לליד' : 'ליד חדש מהאתר'}</span>
    </div>
    <div style="padding:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
        <p style="margin:0; color:#667085; font-size:13px;">מקור: <strong style="color:#1F2937;">${esc(label)}</strong></p>
        <span style="display:inline-block; background:${badge.bg}; color:${badge.color}; padding:6px 14px; border-radius:999px; font-size:14px; font-weight:700;">
          ציון ליד: ${scoreStr}
        </span>
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:15px;">
        <tr><td style="padding:8px 0; color:#667085; width:140px;">שם:</td><td style="padding:8px 0;"><strong>${esc(opts.name)}</strong></td></tr>
        <tr><td style="padding:8px 0; color:#667085;">טלפון:</td><td style="padding:8px 0;" dir="ltr"><a href="tel:${esc(opts.phone)}" style="color:#1E355E; text-decoration:none;"><strong>${esc(opts.phone)}</strong></a></td></tr>
        ${opts.email ? `<tr><td style="padding:8px 0; color:#667085;">אימייל:</td><td style="padding:8px 0;" dir="ltr"><a href="mailto:${esc(opts.email)}" style="color:#1E355E;">${esc(opts.email)}</a></td></tr>` : ''}
        <tr><td style="padding:8px 0; color:#667085;">נפתחו הליכים:</td><td style="padding:8px 0;"><strong>${yesNo(opts.proceedings_started)}</strong></td></tr>
        <tr><td style="padding:8px 0; color:#667085;">מיוצג ע״י עו״ד:</td><td style="padding:8px 0;"><strong>${yesNo(opts.is_represented)}</strong></td></tr>
        ${opts.client_note ? `<tr><td style="padding:8px 0; color:#667085; vertical-align:top;">הערה מהפונה:</td><td style="padding:8px 0; white-space:pre-wrap; line-height:1.6;">${esc(opts.client_note)}</td></tr>` : ''}
        ${opts.message ? `<tr><td style="padding:8px 0; color:#667085; vertical-align:top;">הודעה:</td><td style="padding:8px 0; white-space:pre-wrap; line-height:1.6;">${esc(opts.message)}</td></tr>` : ''}
      </table>

      <div style="margin-top:28px; padding-top:20px; border-top:1px solid #f0ebe0;">
        <p style="margin:0 0 12px; font-size:13px; color:#667085;">פעולות מהירות:</p>
        <div style="text-align:center;">
          ${btn(whatsapp, '#25D366', '#ffffff', '💬 שלח וואטסאפ')}
          ${btn(callHref, '#C89A3D', '#1E355E', '📞 חיוג לליד')}
          ${btn(remindHref, '#1E355E', '#ffffff', '⏰ תזכיר לי בעוד שעה')}
          ${btn(progressHref, '#ffffff', '#1E355E', 'ליד בתהליך')}
          ${btn(irrelevantHref, '#ffffff', '#9ca3af', 'לא רלוונטי')}
        </div>
      </div>
    </div>
    <div style="background:#F7F4EE; padding:14px 24px; font-size:12px; color:#667085;">נשלח אוטומטית מאתר עו"ד אלון סולומון</div>
  </div>
</body>
</html>`;
}

export async function sendLeadEmail(lead: any, isReminder = false) {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');
  const subject = isReminder
    ? `תזכורת: ליד מאתר החדש של אלון סולומון - ${lead.name}`
    : `ליד מאתר החדש של אלון סולומון - ${lead.name}`;

  const html = buildLeadEmailHtml({
    id: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    message: lead.message,
    formType: lead.form_type,
    isReminder,
    proceedings_started: lead.proceedings_started,
    is_represented: lead.is_represented,
    client_note: lead.client_note,
  });

  const body: Record<string, unknown> = {
    from: 'אלון סולומון - אתר <noreply@alon.606.co.il>',
    to: [TO_EMAIL],
    subject,
    html,
  };
  if (lead.email) body.reply_to = lead.email;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const name = (body.name || '').toString().trim().slice(0, 200);
    const phone = (body.phone || '').toString().trim().slice(0, 50);
    const email = (body.email || '').toString().trim().slice(0, 200) || null;
    const message = (body.message || '').toString().trim().slice(0, 4000) || null;
    const clientNote = (body.client_note || '').toString().trim().slice(0, 1000) || null;
    const formType = (body.formType || 'contact').toString().slice(0, 50);

    const toBool = (v: unknown): boolean | null => {
      if (v === true || v === 'yes' || v === 'true') return true;
      if (v === false || v === 'no' || v === 'false') return false;
      return null;
    };
    const proceedingsStarted = toBool(body.proceedings_started);
    const isRepresented = toBool(body.is_represented);

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'שם וטלפון הם שדות חובה' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: lead, error: insertErr } = await supabase
      .from('leads')
      .insert({
        name,
        phone,
        email,
        message,
        form_type: formType,
        status: 'new',
        proceedings_started: proceedingsStarted,
        is_represented: isRepresented,
        client_note: clientNote,
      })
      .select()
      .single();

    if (insertErr || !lead) {
      console.error('insert lead error', insertErr);
      return new Response(JSON.stringify({ error: 'שמירת הליד נכשלה' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      await sendLeadEmail(lead);
    } catch (mailErr) {
      console.error('mail send failed', mailErr);
      // lead saved; still treat as success
    }

    return new Response(JSON.stringify({ success: true, id: lead.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
