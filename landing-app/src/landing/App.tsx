import { useEffect, useRef, useState, FormEvent, ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { supabase } from "../lib/supabase";
import { FORM_ENDPOINT, LEAD_SOURCE, trackLead, waLink } from "../lib/config";
import { defaultContent, ContentMap } from "./content";
import "./landing.css";

/* ---------- תוכן: ברירות מחדל + דריסה ממסד הנתונים ---------- */
function useContent(): ContentMap {
  const [content, setContent] = useState<ContentMap>(defaultContent);
  useEffect(() => {
    supabase
      .from("landing_content")
      .select("key,value")
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setContent((c) => ({
            ...c,
            ...Object.fromEntries(data.map((r: { key: string; value: string }) => [r.key, r.value])),
          }));
        }
      });
  }, []);
  return content;
}

/* מרנדר טקסט מהעורך עם תמיכה בתגיות <u>/<strong>/<b> בלבד (כל השאר מנוטרל) */
function Rich({ text }: { text: string }) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const html = escaped
    .replace(/&lt;(\/?)(u|strong|b)&gt;/g, "<$1$2>")
    .replace(/\n/g, "<br/>");
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ---------- אנימציות ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* אם הדף נטען כשהטאב מוסתר (למשל נפתח בטאב ברקע) — מציגים את התוכן מיד,
   בלי אנימציית כניסה, כדי שהדף לעולם לא ייראה ריק. */
const startShown =
  typeof document !== "undefined" && document.visibilityState === "hidden";

function Section({
  soft,
  id,
  children,
}: {
  soft?: boolean;
  id?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={soft ? "section-soft" : undefined}
      variants={stagger}
      initial={startShown ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="wrap">{children}</div>
    </motion.section>
  );
}

const WaIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 3C9 3 3.5 8.5 3.5 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-2.1c1.8 1 3.9 1.5 6 1.5 7 0 12.5-5.5 12.5-12.5S23 3 16 3zm0 22.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.4 1.2 1.2-4.3-.3-.4c-1-1.6-1.6-3.5-1.6-5.5C5.4 9.6 10.1 5 16 5s10.6 4.6 10.6 10.5S21.9 25.7 16 25.7zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
  </svg>
);

const genericWaMessage =
  "שלום, הגעתי מדף תכנית שכר טרחת המינימום ואשמח לבדוק זכאות והתאמה לתכנית.";

/* ---------- הטופס ---------- */
function LeadForm({ c }: { c: ContentMap }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = e.currentTarget;
    const val = (name: string) =>
      (f.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value.trim();

    const name = val("fname");
    const phone = val("fphone");
    const gate = val("fgate");
    const proc = val("fproc");
    const rep = val("frep");
    const note = val("fnote");

    const msg =
      "פנייה חדשה — תכנית שכר טרחת מינימום\n" +
      "שם: " + name + "\n" +
      "טלפון: " + phone + "\n" +
      "שער כניסה: " + gate + "\n" +
      "נפתחו הליכים: " + proc + "\n" +
      "מיוצג כעת: " + rep +
      (note ? "\nפרטים: " + note : "");

    const yesNo = (v: string) => (v.indexOf("כן") === 0 ? "yes" : "no");

    setSending(true);
    try {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          formType: LEAD_SOURCE,
          name,
          phone,
          proceedings_started: yesNo(proc),
          is_represented: yesNo(rep),
          message: "מקור: דף נחיתה — תכנית שכר טרחת מינימום\nשער כניסה: " + gate,
          client_note: note,
        }),
      }).catch(() => undefined);
      // כתיבה כפולה: FORM_ENDPOINT (הענן הישן) שולח את המייל לעו"ד, אבל
      // שומר במסד הישן; הפאנל קורא מהמסד החדש — לכן הליד נשמר גם בו ישירות.
      // להסיר יחד עם החזרת FORM_ENDPOINT לשרת החדש (ראו config.ts).
      supabase
        .from("leads")
        .insert({
          name,
          phone,
          message: "מקור: דף נחיתה — תכנית שכר טרחת מינימום\nשער כניסה: " + gate,
          form_type: LEAD_SOURCE,
          status: "new",
          proceedings_started: yesNo(proc) === "yes",
          is_represented: yesNo(rep) === "yes",
          client_note: note || null,
        })
        .then(() => undefined, () => undefined);
    } catch {
      /* הליד ממשיך לוואטסאפ גם אם הרשת נכשלה */
    }

    trackLead("form_submit");
    window.open(waLink(msg), "_blank");
    setSending(false);
  };

  return (
    <motion.div className="formwrap" variants={fadeUp}>
      <h2>{c.form_title}</h2>
      <p className="lead">
        <Rich text={c.form_lead} />
      </p>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="fname">שם מלא</label>
          <input type="text" id="fname" name="fname" required autoComplete="name" placeholder="שם פרטי ושם משפחה" />
        </div>
        <div className="field">
          <label htmlFor="fphone">טלפון</label>
          <input type="tel" id="fphone" name="fphone" required autoComplete="tel" placeholder="מספר טלפון לחזרה" />
        </div>
        <div className="field">
          <label htmlFor="fgate">שער הכניסה לתכנית</label>
          <select id="fgate" name="fgate" required defaultValue="">
            <option value="" disabled>בחרו את הקריטריון המתאים</option>
            <option value="מילואים / כוחות הביטחון">משרת/ת מילואים או כוחות הביטחון</option>
            <option value="הכנסה שנפגעה בסבבי הלחימה">הכנסה שנפגעה בגין סבבי הלחימה</option>
            <option value="קריטריון כלכלי (הכנסה נטו מתחת ל-14,230)">הכנסה חודשית נטו מתחת ל־14,230 ש״ח</option>
            <option value="לא בטוח/ה — מבקש/ת בדיקה">לא בטוח/ה — מבקש/ת בדיקה</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="fproc">האם כבר נפתחו הליכים משפטיים?</label>
          <select id="fproc" name="fproc" required defaultValue="">
            <option value="" disabled>בחרו</option>
            <option value="כן, נפתחו הליכים">כן, נפתחו הליכים</option>
            <option value="לא, טרם נפתחו">לא, טרם נפתחו</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="frep">האם את/ה מיוצג/ת כעת על ידי עורך דין?</label>
          <select id="frep" name="frep" required defaultValue="">
            <option value="" disabled>בחרו</option>
            <option value="כן, מיוצג/ת">כן, מיוצג/ת</option>
            <option value="לא, איני מיוצג/ת">לא, איני מיוצג/ת</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="fnote">פרטים נוספים (לא חובה)</label>
          <textarea id="fnote" name="fnote" rows={3} placeholder="בקצרה על מצבכם / שלב ההליך" />
        </div>
        <div className="field">
          <label className="consent-label">
            <input type="checkbox" id="fconsent" name="fconsent" required />
            <span>
              אני מאשר/ת את השימוש בפרטיי לצורך יצירת קשר, דיוור ישיר וניתוחים סטטיסטיים, בהתאם ל
              <a href="/program/privacy/" target="_blank" rel="noopener">מדיניות הפרטיות</a>.
            </span>
          </label>
        </div>
        <button type="submit" className="btn btn-wa form-submit" disabled={sending}>
          {c.form_submit}
        </button>
      </form>
    </motion.div>
  );
}

/* ---------- הדף ---------- */
export default function App() {
  const c = useContent();

  const onWaClick = () => trackLead("whatsapp_click");

  return (
    <MotionConfig reducedMotion="user">
      {/* ===== סרגל עליון ===== */}
      <div className="topbar">
        <div className="brand">
          {c.topbar_brand}
          <span>{c.topbar_tagline}</span>
        </div>
        <a className="tcta" href="#zakaut">{c.topbar_cta}</a>
      </div>

      {/* ===== פתיח ===== */}
      <header className="hero">
        <motion.div className="wrap" variants={stagger} initial={startShown ? false : "hidden"} animate="show">
          <motion.span className="kicker" variants={fadeUp}>{c.kicker}</motion.span>
          <motion.h1 variants={fadeUp}>
            {c.hero_title_1} <span className="hl">{c.hero_title_hl}</span> {c.hero_title_2}
          </motion.h1>
          <motion.p className="sub" variants={fadeUp}><Rich text={c.hero_sub} /></motion.p>
          <motion.div className="price" variants={fadeUp}>
            <Rich text={c.price_intro} />
            <b>{c.price_amount}</b>
            <small><Rich text={c.price_note} /></small>
          </motion.div>
          <motion.p className="origin" variants={fadeUp}><Rich text={c.origin} /></motion.p>
          <motion.div className="hero-cta" variants={fadeUp}>
            <a className="btn btn-wa" href={waLink(genericWaMessage)} target="_blank" rel="noopener noreferrer" onClick={onWaClick}>
              <WaIcon />
              {c.cta_whatsapp}
            </a>
            <a className="btn btn-gold" href="#zakaut">{c.cta_primary}</a>
          </motion.div>
        </motion.div>
      </header>

      {/* ===== למה זה יקר ===== */}
      <Section>
        <motion.div className="eyebrow" variants={fadeUp}>{c.problem_eyebrow}</motion.div>
        <motion.h2 variants={fadeUp}>{c.problem_title}</motion.h2>
        <motion.p className="lead" variants={fadeUp}><Rich text={c.problem_lead} /></motion.p>
        <div className="grid3">
          {[1, 2, 3].map((i) => (
            <motion.div className="card" key={i} variants={fadeUp}>
              <span className="num">{c[`problem_card${i}_tag`]}</span>
              <h3>{c[`problem_card${i}_title`]}</h3>
              <p><Rich text={c[`problem_card${i}_text`]} /></p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== מהי התכנית ===== */}
      <Section soft id="hatochnit">
        <motion.div className="eyebrow" variants={fadeUp}>{c.program_eyebrow}</motion.div>
        <motion.h2 variants={fadeUp}>{c.program_title}</motion.h2>
        <motion.p className="lead" variants={fadeUp}><Rich text={c.program_lead} /></motion.p>
        <motion.div className="program" variants={fadeUp}>
          <span className="program-includes">{c.program_includes_title}</span>
          <ul>
            {[1, 2, 3, 4, 5].map((i) => (
              <li key={i}><Rich text={c[`program_item${i}`]} /></li>
            ))}
          </ul>
          <div className="pricebox">
            <span className="strike">{c.program_price_strike}</span>
            <span className="big">{c.program_price_big}</span>
            <span className="small"><Rich text={c.program_price_small} /></span>
          </div>
        </motion.div>
      </Section>

      {/* ===== מי זכאי ===== */}
      <Section>
        <motion.div className="eyebrow" variants={fadeUp}>{c.gates_eyebrow}</motion.div>
        <motion.h2 variants={fadeUp}>{c.gates_title}</motion.h2>
        <motion.p className="lead" variants={fadeUp}><Rich text={c.gates_lead} /></motion.p>
        <div className="gates">
          {[1, 2].map((i) => (
            <motion.div className="gate" key={i} variants={fadeUp}>
              <h3>{c[`gate${i}_title`]}</h3>
              <p><Rich text={c[`gate${i}_text`]} /></p>
            </motion.div>
          ))}
        </div>
        <motion.div className="quota" variants={fadeUp}>
          <h2>{c.quota_title}</h2>
          <p><Rich text={c.quota_text} /></p>
        </motion.div>
      </Section>

      {/* ===== למה אצלנו ===== */}
      <Section soft>
        <motion.div className="eyebrow" variants={fadeUp}>{c.why_eyebrow}</motion.div>
        <motion.h2 variants={fadeUp}>{c.why_title}</motion.h2>
        <motion.p className="lead" variants={fadeUp}><Rich text={c.why_lead} /></motion.p>
        <motion.div className="founder" variants={fadeUp}>
          <div className="founder-head">
            <div className="founder-badge">{c.founder_name}</div>
            <div className="founder-role">{c.founder_role}</div>
          </div>
          <p className="founder-lead"><Rich text={c.founder_lead} /></p>
          <div className="cred-grid">
            {[1, 2, 3, 4].map((i) => (
              <div className="cred" key={i}>
                <h4>{c[`cred${i}_title`]}</h4>
                <p><Rich text={c[`cred${i}_text`]} /></p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ===== טופס ===== */}
      <Section id="zakaut">
        <LeadForm c={c} />
      </Section>

      {/* ===== משפטי ===== */}
      <div className="legal">
        <div className="wrap">
          <p><Rich text={c.legal_1} /></p>
          <p><Rich text={c.legal_2} /></p>
        </div>
      </div>

      {/* ===== פוטר ===== */}
      <footer>
        <div className="wrap">
          <div className="fbrand">{c.footer_brand}</div>
          <p>{c.footer_address}</p>
          <p>
            טלפון: <a href="tel:077-5255923">077-5255923</a> · פקס: 077-5362173
          </p>
          <p>
            <a href="https://a-solomon.com" target="_blank" rel="noopener noreferrer">לאתר המשרד — a-solomon.com</a>
          </p>
          <p>
            <a href="/program/privacy/" target="_blank" rel="noopener">מדיניות פרטיות</a> ·{" "}
            <a href="/program/accessibility/" target="_blank" rel="noopener">הצהרת נגישות</a>
          </p>
        </div>
      </footer>

      {/* ===== וואטסאפ צף ===== */}
      <a
        className="fab"
        href={waLink(genericWaMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="וואטסאפ"
        onClick={onWaClick}
      >
        <WaIcon />
      </a>

      {/* ===== פס CTA דביק במובייל ===== */}
      <div className="mcta" role="navigation" aria-label="פעולות מהירות">
        <a className="btn btn-wa" href={waLink(genericWaMessage)} target="_blank" rel="noopener noreferrer" onClick={onWaClick}>
          {c.cta_whatsapp}
        </a>
        <a className="btn btn-gold" href="#zakaut">{c.topbar_cta}</a>
      </div>
    </MotionConfig>
  );
}
