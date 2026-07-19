import { useEffect, useMemo, useState, FormEvent } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { LEAD_SOURCE, SUPABASE_ANON_KEY, SUPABASE_URL } from "../lib/config";
import { defaultContent, contentSections, ContentMap } from "../landing/content";
import "./admin.css";

/* ============================================================
   פאנל ניהול — תכנית שכר טרחת מינימום
   טאב "לידים": כל הפניות שהגיעו מדף הנחיתה, עם סטטוס, הערות ופעולות.
   טאב "תוכן הדף": עריכת כל הטקסטים של דף הנחיתה בזמן אמת.
============================================================ */

type LeadStatus = "new" | "called" | "in_progress" | "irrelevant" | "reminder";

interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  form_type: string;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  proceedings_started: boolean | null;
  is_represented: boolean | null;
  client_note: string | null;
}

const statusLabels: Record<LeadStatus, string> = {
  new: "חדש",
  called: "בוצע חיוג",
  in_progress: "בתהליך",
  irrelevant: "לא רלוונטי",
  reminder: "תזכורת",
};

const fmtDate = (s: string) =>
  new Date(s).toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" });

const yesNo = (v: boolean | null) => (v === true ? "כן" : v === false ? "לא" : "לא צוין");

function calcScore(proceedings: boolean | null, represented: boolean | null) {
  let score = 0;
  if (proceedings === true) score += 2;
  if (represented === true) score -= 2;
  else if (represented === false) score += 1;
  if (proceedings === true && represented === false) score += 1;
  return score;
}

function scoreClass(score: number) {
  if (score >= 3) return "score-hot";
  if (score >= 1) return "score-warm";
  if (score === 0) return "score-mid";
  return "score-low";
}

function normalizePhoneIL(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return "972" + digits.slice(1);
  return digits;
}

function leadWaUrl(name: string, phone: string) {
  const first = (name || "").trim().split(/\s+/)[0] || "";
  const msg = `שלום ${first}, נעים מאוד אני עורך הדין אלון סולומון, קיבלתי את הפניה שלך, אשמח לקבל ממך קצת יותר פרטים`;
  return `https://wa.me/${normalizePhoneIL(phone)}?text=${encodeURIComponent(msg)}`;
}

/* ---------- מסך כניסה ---------- */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError("הכניסה נכשלה — בדקו אימייל וסיסמה.");
    setBusy(false);
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <h1>פאנל ניהול</h1>
        <div className="sub">תכנית שכר טרחת מינימום · משרד עו״ד אלון סולומון ושות׳</div>
        {error && <div className="login-error">{error}</div>}
        <label htmlFor="email">אימייל</label>
        <input id="email" type="email" required autoComplete="username" dir="ltr"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">סיסמה</label>
        <input id="password" type="password" required autoComplete="current-password" dir="ltr"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-gold btn-full" type="submit" disabled={busy}>
          {busy ? "רק רגע…" : "כניסה"}
        </button>
      </form>
    </div>
  );
}

/* ---------- טאב לידים ---------- */
function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from("leads")
      .select("id,name,phone,message,form_type,status,notes,created_at,proceedings_started,is_represented,client_note")
      .eq("form_type", LEAD_SOURCE)
      .order("created_at", { ascending: false });
    if (err) {
      setError(err.message);
    } else {
      setLeads((data as Lead[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    const { error: err } = await supabase.from("leads").update(patch).eq("id", id);
    if (err) {
      alert("העדכון נכשל: " + err.message);
      return;
    }
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const filtered = useMemo(() => {
    const q = search.trim();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.name.includes(q) ||
        l.phone.includes(q) ||
        (l.client_note ?? "").includes(q) ||
        (l.notes ?? "").includes(q)
      );
    });
  }, [leads, search, statusFilter]);

  if (loading) return <div className="spin">טוען לידים…</div>;

  if (error) {
    return (
      <div className="notice">
        <b>אין עדיין גישה לרשימת הלידים.</b>
        <br />
        כדי שהפאנל יוכל לקרוא את הלידים, יש להריץ פעם אחת את קובץ ההקמה{" "}
        <code>landing-app/sql/setup.sql</code> ב-SQL Editor של פרויקט ה-Supabase (ראו הוראות ב-
        <code>landing-app/sql/README.md</code>).
        <br />
        <small dir="ltr">{error}</small>
      </div>
    );
  }

  return (
    <>
      <div className="leads-toolbar">
        <input
          type="search"
          placeholder="חיפוש לפי שם, טלפון או הערה…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">כל הסטטוסים</option>
          {Object.entries(statusLabels).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <button className="btn btn-ghost btn-sm" onClick={load}>רענון</button>
      </div>
      <div className="leads-count">{filtered.length} לידים מדף הנחיתה</div>

      {filtered.length === 0 && <div className="empty">אין עדיין לידים להצגה.</div>}

      {filtered.map((lead) => {
        const score = calcScore(lead.proceedings_started, lead.is_represented);
        return (
          <div className="lead-card" key={lead.id}>
            <div className="lead-head">
              <div>
                <div className="lead-name">{lead.name}</div>
                <div className="lead-date">{fmtDate(lead.created_at)}</div>
              </div>
              <div className="lead-badges">
                <span className={`score ${scoreClass(score)}`}>ציון ליד: {score > 0 ? `+${score}` : score}</span>
                <span className={`badge badge-${lead.status}`}>{statusLabels[lead.status]}</span>
              </div>
            </div>

            <div className="lead-details">
              <div><span className="lbl">טלפון:</span><a href={`tel:${lead.phone}`} dir="ltr">{lead.phone}</a></div>
              <div><span className="lbl">נפתחו הליכים:</span>{yesNo(lead.proceedings_started)}</div>
              <div><span className="lbl">מיוצג/ת כעת:</span>{yesNo(lead.is_represented)}</div>
            </div>

            {lead.message && <div className="lead-message">{lead.message}</div>}
            {lead.client_note && (
              <div className="lead-message">הערת הפונה: {lead.client_note}</div>
            )}

            <div className="lead-actions">
              <a className="btn btn-wa btn-sm" href={leadWaUrl(lead.name, lead.phone)} target="_blank" rel="noopener noreferrer">
                וואטסאפ
              </a>
              <a className="btn btn-primary btn-sm" href={`tel:${lead.phone}`}>חיוג</a>
              <select
                value={lead.status}
                onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus })}
              >
                {Object.entries(statusLabels).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>

            <div className="lead-notes">
              <textarea
                placeholder="הערות פנימיות על הליד…"
                value={notesDraft[lead.id] ?? lead.notes ?? ""}
                onChange={(e) => setNotesDraft((d) => ({ ...d, [lead.id]: e.target.value }))}
              />
              {(notesDraft[lead.id] ?? lead.notes ?? "") !== (lead.notes ?? "") && (
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => updateLead(lead.id, { notes: notesDraft[lead.id] ?? "" })}
                >
                  שמירה
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ---------- טאב תוכן ---------- */
function ContentTab() {
  const [values, setValues] = useState<ContentMap>(defaultContent);
  const [saved, setSaved] = useState<ContentMap>(defaultContent);
  const [openSection, setOpenSection] = useState(0);
  const [status, setStatus] = useState<Record<number, "ok" | "err" | "busy" | undefined>>({});
  const [loadErr, setLoadErr] = useState("");

  useEffect(() => {
    supabase
      .from("landing_content")
      .select("key,value")
      .then(({ data, error }) => {
        if (error) {
          setLoadErr(error.message);
          return;
        }
        if (data && data.length > 0) {
          const overrides = Object.fromEntries(
            data.map((r: { key: string; value: string }) => [r.key, r.value])
          );
          setValues((v) => ({ ...v, ...overrides }));
          setSaved((v) => ({ ...v, ...overrides }));
        }
      });
  }, []);

  const saveSection = async (idx: number) => {
    const section = contentSections[idx];
    const rows = section.fields
      .filter((f) => values[f.key] !== saved[f.key])
      .map((f) => ({ key: f.key, value: values[f.key] }));
    if (rows.length === 0) return;
    setStatus((s) => ({ ...s, [idx]: "busy" }));
    const { error } = await supabase.from("landing_content").upsert(rows);
    if (error) {
      setStatus((s) => ({ ...s, [idx]: "err" }));
      return;
    }
    setSaved((sv) => ({ ...sv, ...Object.fromEntries(rows.map((r) => [r.key, r.value])) }));
    setStatus((s) => ({ ...s, [idx]: "ok" }));
    setTimeout(() => setStatus((s) => ({ ...s, [idx]: undefined })), 2500);
  };

  return (
    <>
      <p className="content-intro">
        כאן עורכים את הטקסטים של דף הנחיתה. שינוי נשמר ומופיע בדף באופן מיידי — בלי צורך במתכנת.
        אפשר להשתמש בתגיות &lt;u&gt;קו תחתון&lt;/u&gt; ו-&lt;strong&gt;הדגשה&lt;/strong&gt;.
      </p>
      {loadErr && (
        <div className="notice">
          <b>עורך התוכן עדיין לא הופעל.</b>
          <br />
          יש להריץ פעם אחת את <code>landing-app/sql/setup.sql</code> ב-SQL Editor של Supabase
          (הוראות ב-<code>landing-app/sql/README.md</code>). עד אז הדף מציג את טקסט ברירת המחדל.
          <br />
          <small dir="ltr">{loadErr}</small>
        </div>
      )}
      {contentSections.map((section, idx) => {
        const isOpen = openSection === idx;
        const dirty = section.fields.some((f) => values[f.key] !== saved[f.key]);
        return (
          <div className="content-section" key={section.title}>
            <button className="cs-head" onClick={() => setOpenSection(isOpen ? -1 : idx)}>
              <span>
                {section.title}
                {dirty ? " •" : ""}
              </span>
              <span className={`chev ${isOpen ? "open" : ""}`}>▾</span>
            </button>
            {isOpen && (
              <div className="cs-body">
                {section.fields.map((f) => (
                  <div className="cs-field" key={f.key}>
                    <label htmlFor={`f-${f.key}`}>{f.label}</label>
                    {f.multiline ? (
                      <textarea
                        id={`f-${f.key}`}
                        className={values[f.key] !== saved[f.key] ? "dirty" : ""}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      />
                    ) : (
                      <input
                        id={`f-${f.key}`}
                        className={values[f.key] !== saved[f.key] ? "dirty" : ""}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
                <div className="cs-save">
                  <button className="btn btn-gold" disabled={!dirty || status[idx] === "busy"} onClick={() => saveSection(idx)}>
                    {status[idx] === "busy" ? "שומר…" : "שמירת שינויים"}
                  </button>
                  {status[idx] === "ok" && <span className="save-ok">✓ נשמר — הדף התעדכן</span>}
                  {status[idx] === "err" && <span className="save-err">השמירה נכשלה — בדקו הרשאות</span>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ---------- טאב משתמשים ---------- */
// לקוח נפרד להרשמה: אחרת signUp היה מחליף את הסשן של המנהל המחובר.
const signupClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, storageKey: "sb-panel-signup" },
});

interface PanelUser {
  email: string;
  created_at: string;
}

function UsersTab({ myEmail }: { myEmail: string }) {
  const [users, setUsers] = useState<PanelUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setLoadErr("");
    const { data, error } = await supabase
      .from("panel_users")
      .select("email,created_at")
      .order("created_at", { ascending: true });
    if (error) setLoadErr(error.message);
    else setUsers((data as PanelUser[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addUser = async (e: FormEvent) => {
    e.preventDefault();
    setOkMsg("");
    setErrMsg("");
    const email = newEmail.trim().toLowerCase();
    if (newPass.length < 8) {
      setErrMsg("הסיסמה חייבת להכיל לפחות 8 תווים.");
      return;
    }
    setBusy(true);

    // שלב 1: יצירת המשתמש במערכת האימות.
    const { data, error: signErr } = await signupClient.auth.signUp({
      email,
      password: newPass,
    });
    if (signErr && !/already|registered|exists/i.test(signErr.message)) {
      setErrMsg(
        /mail|smtp|send/i.test(signErr.message)
          ? "השרת לא מצליח לשלוח מייל אישור. יש לבקש מהמתכנת להפעיל אישור אוטומטי (GOTRUE_MAILER_AUTOCONFIRM=true) — ואז ההוספה תעבוד מיידית."
          : "יצירת המשתמש נכשלה: " + signErr.message
      );
      setBusy(false);
      return;
    }

    // שלב 2: הוספה לרשימת המורשים — בלעדיה אין גישה לנתונים.
    const { error: insErr } = await supabase
      .from("panel_users")
      .insert({ email, added_by: myEmail });
    if (insErr && !/duplicate|already exists/i.test(insErr.message)) {
      setErrMsg("המשתמש נוצר אך הוספתו להרשאות נכשלה: " + insErr.message);
      setBusy(false);
      return;
    }

    const needsConfirm = !signErr && !data?.session && data?.user && !data.user.email_confirmed_at;
    setOkMsg(
      needsConfirm
        ? `${email} נוסף. נשלח אליו מייל אישור — הכניסה תתאפשר אחרי לחיצה על הקישור שבמייל.`
        : `${email} נוסף בהצלחה ויכול להתחבר עכשיו עם הסיסמה שהוגדרה.`
    );
    setNewEmail("");
    setNewPass("");
    setBusy(false);
    load();
  };

  const removeUser = async (email: string) => {
    if (email === myEmail.toLowerCase()) {
      alert("אי אפשר להסיר את המשתמש שאיתו אתם מחוברים כרגע.");
      return;
    }
    if (!confirm(`להסיר את הגישה של ${email} לפאנל?`)) return;
    const { error } = await supabase.from("panel_users").delete().eq("email", email);
    if (error) alert("ההסרה נכשלה: " + error.message);
    else load();
  };

  if (loading) return <div className="spin">טוען משתמשים…</div>;

  if (loadErr) {
    return (
      <div className="notice">
        <b>ניהול המשתמשים עדיין לא הופעל.</b>
        <br />
        יש לוודא שהמיגרציות האחרונות הוחלו על מסד הנתונים (נעשה אוטומטית בדחיפה ל-main).
        <br />
        <small dir="ltr">{loadErr}</small>
      </div>
    );
  }

  return (
    <>
      <p className="content-intro">
        המשתמשים ברשימה יכולים להיכנס לפאנל, לצפות בלידים ולערוך את תוכן הדף.
        הסרה מהרשימה חוסמת את הגישה מיידית.
      </p>

      <form className="user-add" onSubmit={addUser}>
        <input
          type="email"
          required
          dir="ltr"
          placeholder="אימייל של המשתמש החדש"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          required
          dir="ltr"
          placeholder="סיסמה ראשונית (8+ תווים)"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          autoComplete="new-password"
        />
        <button className="btn btn-gold" type="submit" disabled={busy}>
          {busy ? "מוסיף…" : "הוספת משתמש"}
        </button>
      </form>
      {okMsg && <div className="save-ok user-msg">✓ {okMsg}</div>}
      {errMsg && <div className="notice">{errMsg}</div>}

      {users.map((u) => (
        <div className="lead-card user-row" key={u.email}>
          <div>
            <div className="lead-name" dir="ltr">{u.email}</div>
            <div className="lead-date">נוסף: {fmtDate(u.created_at)}</div>
          </div>
          {u.email === myEmail.toLowerCase() ? (
            <span className="badge badge-new">מחובר/ת כעת</span>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => removeUser(u.email)}>
              הסרת גישה
            </button>
          )}
        </div>
      ))}
    </>
  );
}

/* ---------- מסגרת הפאנל ---------- */
export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"leads" | "content" | "users">("leads");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="spin">טוען…</div>;
  if (!session) return <Login />;

  return (
    <>
      <div className="panel-top">
        <div className="ttl">
          פאנל ניהול — תכנית שכר טרחת מינימום
          <small>משרד עו״ד אלון סולומון ושות׳</small>
        </div>
        <div className="actions">
          <a className="btn btn-gold btn-sm" href="../" target="_blank" rel="noopener noreferrer">
            צפייה בדף
          </a>
          <button className="btn btn-sm logout" onClick={() => supabase.auth.signOut()}>
            יציאה
          </button>
        </div>
      </div>
      <div className="tabs">
        <button className={`tab ${tab === "leads" ? "active" : ""}`} onClick={() => setTab("leads")}>
          לידים
        </button>
        <button className={`tab ${tab === "content" ? "active" : ""}`} onClick={() => setTab("content")}>
          תוכן הדף
        </button>
        <button className={`tab ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>
          משתמשים
        </button>
      </div>
      <div className="panel-body">
        {tab === "leads" ? (
          <LeadsTab />
        ) : tab === "content" ? (
          <ContentTab />
        ) : (
          <UsersTab myEmail={session.user.email ?? ""} />
        )}
      </div>
    </>
  );
}
