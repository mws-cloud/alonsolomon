// כל הטקסטים של דף הנחיתה.
// הערכים כאן הם ברירת המחדל; אם קיימת רשומה בטבלת landing_content ב-Supabase —
// היא גוברת. כך הלקוח עורך טקסטים מהפאנל בלי צורך בדיפלוי.
// בטקסטים מותר שימוש מוגבל בתגיות <u> ו-<strong> (מסונן בצד הדף).

export type ContentMap = Record<string, string>;

export const defaultContent: ContentMap = {
  // ===== סרגל עליון =====
  topbar_brand: "משרד עו״ד אלון סולומון ושות׳",
  topbar_tagline: "דיני משפחה · גירושין · ניהול הון",
  topbar_cta: "בדיקת זכאות",

  // ===== פתיח (Hero) =====
  kicker: "תכנית במכסה מוגבלת · בכפוף לבדיקת התאמה",
  hero_title_1: "השתגעתם?!",
  hero_title_hl: "70,000 עד 130,000 ש״ח",
  hero_title_2: "על גירושין?!",
  hero_sub:
    "זה שכר הטרחה המקובל בדרך כלל בישראל על תיק גירושין מלא. מזונות, רכוש, משמורת — כל הליך בנפרד, וכל אחד עשרות אלפי שקלים. ולא פעם זה גם לא נגמר בזה. בדיוק כשאתם באמצע אחת התקופות הקשות בחיים.",
  price_intro:
    "לפי כללי לשכת עורכי הדין (התעריף המינימלי המומלץ), תש״ס-2000, עלות ייצוג מלא עשויה להסתכם בכ:",
  price_amount: "39,200 ש״ח + מע״מ בלבד",
  price_note:
    "לייצוג כולל בכלל ההליכים — מזונות, רכוש וזמני שהות, במקום מחירי הייצוג הרגילים.",
  origin:
    "במסגרת תכנית שנוסדה לאחר 7 באוקטובר בהובלת משרד עו״ד אלון סולומון ושות׳: ניתנה מכסה מוגבלת שנועדה לסייע לאנשי כוחות הביטחון ולמשרתי מילואים בקבלת ייצוג מלא לפי כללי לשכת עורכי הדין והתעריף המינימלי המומלץ, במקום תעריף שכר הטרחה הרגיל. התכנית הוארכה מעת לעת, באופן משתנה, לזכאים נוספים, ומוגבלת במכסת משתתפים בכל רבעון, בכפוף לבדיקת התאמה וזכאות.",
  cta_primary: "בדיקת זכאות והתאמה »",
  cta_whatsapp: "פנייה בוואטסאפ",

  // ===== למה זה יקר =====
  problem_eyebrow: "למה זה כל כך יקר",
  problem_title: "למה שכר הטרחה בגירושין כה יקר?",
  problem_lead:
    "כאשר זוג מתגרש ללא הסכם, התיק מתפצל לשלושה הליכים נפרדים, ובשגרה נהוג לגבות עבור כל אחד מהם בנפרד. כך מגלה לקוח חדש שהוא נדרש לעשרות אלפי שקלים לכל הליך, רק כדי לקבל ייצוג הולם.",
  problem_card1_tag: "הליך ראשון",
  problem_card1_title: "מזונות ילדים",
  problem_card1_text: "לרבות בקשות למזונות זמניים — אחד ההליכים הטעונים והמורכבים ביותר.",
  problem_card2_tag: "הליך שני",
  problem_card2_title: "זמני שהות ומשמורת",
  problem_card2_text: "לרבות בקשות זמניות, בערכאה האזרחית או בבית הדין הרבני.",
  problem_card3_tag: "הליך שלישי",
  problem_card3_title: "רכוש ואיזון משאבים",
  problem_card3_text: "חלוקת הדירה, החסכונות, הפנסיות, קרנות ההשתלמות והעסק.",

  // ===== מהי התכנית =====
  program_eyebrow: "מהי התכנית",
  program_title: "תכנית שכר טרחת מינימום",
  program_lead:
    "תכנית שיזם משרד עו״ד אלון סולומון ושות׳ לאחר 7 באוקטובר 2023, כתכנית סיוע לזמן מוגבל, <u>לזכאים ובמכסה מוגבלת בכל רבעון</u>. במסגרת התכנית, הייצוג המלא ניתן לפי תעריף המינימום המומלץ של לשכת עורכי הדין.",
  program_includes_title: "מה כולל הייצוג במסגרת התכנית:",
  program_item1: "ייצוג מלא בהליך המזונות, לרבות בקשות זמניות",
  program_item2: "ייצוג מלא בהליך זמני השהות והמשמורת",
  program_item3: "ייצוג מלא בהליך הרכוש ואיזון המשאבים",
  program_item4: "ניהול אסטרטגי של התיק על ידי משרד מהמנוסים בישראל",
  program_item5: "ליווי אישי לאורך כל ההליך, ללא ירידה ברמת הייצוג",
  program_price_strike: "המחיר הרגיל בשוק: 70,000–130,000 ש״ח",
  program_price_big: "כ־39,200 ש״ח + מע״מ",
  program_price_small:
    "לייצוג כולל בכלל ההליכים, <u><strong>לזכאים</strong></u> לתכנית, לפי תעריף המינימום של לשכת עורכי הדין (התעריף המינימלי המומלץ), תש״ס-2000.",

  // ===== מי זכאי =====
  gates_eyebrow: "מי זכאי",
  gates_title: "התכנית מיועדת לזכאים בלבד",
  gates_lead:
    "הקבלה אינה אוטומטית. התכנית מוגבלת בכמות משתתפים בכל רבעון, ובכפוף לבדיקת התאמה פרטנית. הזכאות נבחנת בשני שערים:",
  gate1_title: "שער ראשון · קריטריון כלכלי",
  gate1_text: "הורים מתגרשים שהכנסתם החודשית נטו נמוכה מ־14,230 ש״ח.",
  gate2_title: "שער שני · זיקה ביטחונית, ממשלתית או תושבי הצפון",
  gate2_text:
    "משרתי מילואים, אנשי כוחות הביטחון, עובדי מדינה ועובדי מערכת החינוך, תושבי הצפון, ומי שהכנסתו נפגעה בגין סבבי הלחימה ומצב החירום המתמשך.",
  quota_title: "מכסה מוגבלת בכל רבעון",
  quota_text:
    "התכנית נולדה על רקע מצב החירום שלאחר 7 באוקטובר, והוארכה לתקופה מוגבלת נוכח המשך הלחימה ומצב החירום החל גם על תושבי הצפון. מספר המקומות מוגבל, והקבלה כפופה לאישור המשרד.",

  // ===== למה אצלנו =====
  why_eyebrow: "למה דווקא אצלנו",
  why_title: "ייצוג על ידי משרד מהמנוסים בישראל",
  why_lead:
    "המחיר החריג אינו בא על חשבון רמת הייצוג — אלא מתאפשר הודות לשיטת עבודה, ניסיון מצטבר ומבנה יעיל. מי שמלווה את התיק הוא משרד ותיק ומוערך, ובראשו עורך דין מבכירי התחום בישראל.",
  founder_name: "עו״ד אלון סולומון",
  founder_role: "מייסד ושותף מנהל · מבכירי עורכי הדין בישראל בתחום דיני המשפחה",
  founder_lead:
    "עו״ד אלון סולומון מלווה לקוחות בהליכי גירושין, סכסוכי משמורת וזמני שהות, מזונות, חלוקת רכוש, ירושה וניהול הון משפחתי — מתוך גישה מקצועית ברורה: חתירה לפתרון נכון, יעיל ומדויק כשהדבר אפשרי, ולצד זאת ניהול מאבק משפטי חד, נחוש וללא פשרות כאשר הנסיבות מחייבות.",
  cred1_title: "השכלה",
  cred1_text:
    "תואר ראשון כפול במשפטים ובמנהל עסקים, אוניברסיטת בר-אילן. תואר שני במשפטים במסלול הישיר למצטיינים, אוניברסיטת בר-אילן. תואר שני במנהל עסקים בהתמחות מימון, האוניברסיטה העברית בירושלים.",
  cred2_title: "ניסיון מקצועי",
  cred2_text:
    "מבכירי עורכי הדין בישראל בתחום דיני המשפחה, עם ניסיון של מעל 25 שנה. ניסיון עשיר בהובלת סכסוכים משפטיים מורכבים ורגישים, והופעה בפני כלל הערכאות — בתי המשפט לענייני משפחה ובתי הדין הרבניים.",
  cred3_title: "מעמד ופעילות ציבורית",
  cred3_text:
    "חבר בוועדת בתי הדין הרבניים והמשפחה בלשכת עורכי הדין. מרצה בפורומים מקצועיים ובקורסים אקדמיים לסטודנטים למשפטים.",
  cred4_title: "שירות מילואים",
  cred4_text:
    "סגן-אלוף במילואים. את התכנית יזם מתוך היכרות אישית עם המציאות של משרתי המילואים ואנשי כוחות הביטחון ומשפחותיהם בתקופת החירום.",

  // ===== טופס =====
  form_title: "בדיקת זכאות והתאמה",
  form_lead:
    "מלאו את הפרטים ונחזור אליכם לבדיקת התאמה ראשונית. הפנייה אינה מחייבת, והפרטים נשמרים בדיסקרטיות.",
  form_submit: "שליחה ובדיקת זכאות »",

  // ===== משפטי ופוטר =====
  legal_1:
    "פגישת ייעוץ משפטי כרוכה בתשלום, בהתאם לכללי לשכת עורכי הדין. למתקבלים לתכנית, עלות פגישת הייעוץ תקוזז במלואה משכר הטרחה של התכנית.",
  legal_2:
    "הסכומים הנקובים מבוססים על כללי לשכת עורכי הדין (התעריף המינימלי המומלץ), תש״ס-2000, ואינם כוללים אגרות בית משפט, מע״מ והוצאות נלוות. התכנית כפופה לבדיקת התאמה פרטנית, למכסה מוגבלת בכל רבעון, ולשיקול דעת המשרד. מורכבות חריגה של תיק עשויה להוציאו ממסגרת התכנית. אין באמור משום ייעוץ משפטי או התחייבות לתוצאה.",
  footer_brand: "משרד עו״ד אלון סולומון ושות׳",
  footer_address: "המגדל הצפוני, קומה 5, הארבעה 28, תל אביב-יפו",
};

// קיבוץ השדות לעורך התוכן בפאנל — כותרת מקטע + תווית עברית לכל שדה.
export interface ContentField {
  key: string;
  label: string;
  multiline?: boolean;
}

export interface ContentSection {
  title: string;
  fields: ContentField[];
}

export const contentSections: ContentSection[] = [
  {
    title: "סרגל עליון",
    fields: [
      { key: "topbar_brand", label: "שם המשרד" },
      { key: "topbar_tagline", label: "שורת תיאור" },
      { key: "topbar_cta", label: "כפתור עליון" },
    ],
  },
  {
    title: "פתיח (Hero)",
    fields: [
      { key: "kicker", label: "תג עליון" },
      { key: "hero_title_1", label: "כותרת — חלק ראשון" },
      { key: "hero_title_hl", label: "כותרת — הדגשה בזהב" },
      { key: "hero_title_2", label: "כותרת — חלק אחרון" },
      { key: "hero_sub", label: "פסקת פתיחה", multiline: true },
      { key: "price_intro", label: "הקדמה למחיר", multiline: true },
      { key: "price_amount", label: "המחיר הגדול" },
      { key: "price_note", label: "הערה מתחת למחיר", multiline: true },
      { key: "origin", label: "פסקת הרקע לתכנית", multiline: true },
      { key: "cta_primary", label: "כפתור ראשי (זהב)" },
      { key: "cta_whatsapp", label: "כפתור וואטסאפ" },
    ],
  },
  {
    title: "למה זה כל כך יקר",
    fields: [
      { key: "problem_eyebrow", label: "תג מקטע" },
      { key: "problem_title", label: "כותרת" },
      { key: "problem_lead", label: "פסקה", multiline: true },
      { key: "problem_card1_tag", label: "כרטיס 1 — תג" },
      { key: "problem_card1_title", label: "כרטיס 1 — כותרת" },
      { key: "problem_card1_text", label: "כרטיס 1 — טקסט", multiline: true },
      { key: "problem_card2_tag", label: "כרטיס 2 — תג" },
      { key: "problem_card2_title", label: "כרטיס 2 — כותרת" },
      { key: "problem_card2_text", label: "כרטיס 2 — טקסט", multiline: true },
      { key: "problem_card3_tag", label: "כרטיס 3 — תג" },
      { key: "problem_card3_title", label: "כרטיס 3 — כותרת" },
      { key: "problem_card3_text", label: "כרטיס 3 — טקסט", multiline: true },
    ],
  },
  {
    title: "מהי התכנית",
    fields: [
      { key: "program_eyebrow", label: "תג מקטע" },
      { key: "program_title", label: "כותרת" },
      { key: "program_lead", label: "פסקה", multiline: true },
      { key: "program_includes_title", label: "כותרת רשימה" },
      { key: "program_item1", label: "פריט 1" },
      { key: "program_item2", label: "פריט 2" },
      { key: "program_item3", label: "פריט 3" },
      { key: "program_item4", label: "פריט 4" },
      { key: "program_item5", label: "פריט 5" },
      { key: "program_price_strike", label: "מחיר ישן (מחוק)" },
      { key: "program_price_big", label: "מחיר התכנית" },
      { key: "program_price_small", label: "הערת מחיר", multiline: true },
    ],
  },
  {
    title: "מי זכאי",
    fields: [
      { key: "gates_eyebrow", label: "תג מקטע" },
      { key: "gates_title", label: "כותרת" },
      { key: "gates_lead", label: "פסקה", multiline: true },
      { key: "gate1_title", label: "שער 1 — כותרת" },
      { key: "gate1_text", label: "שער 1 — טקסט", multiline: true },
      { key: "gate2_title", label: "שער 2 — כותרת" },
      { key: "gate2_text", label: "שער 2 — טקסט", multiline: true },
      { key: "quota_title", label: "מכסה — כותרת" },
      { key: "quota_text", label: "מכסה — טקסט", multiline: true },
    ],
  },
  {
    title: "למה דווקא אצלנו",
    fields: [
      { key: "why_eyebrow", label: "תג מקטע" },
      { key: "why_title", label: "כותרת" },
      { key: "why_lead", label: "פסקה", multiline: true },
      { key: "founder_name", label: "שם עורך הדין" },
      { key: "founder_role", label: "תפקיד" },
      { key: "founder_lead", label: "פסקת היכרות", multiline: true },
      { key: "cred1_title", label: "ריבוע 1 — כותרת" },
      { key: "cred1_text", label: "ריבוע 1 — טקסט", multiline: true },
      { key: "cred2_title", label: "ריבוע 2 — כותרת" },
      { key: "cred2_text", label: "ריבוע 2 — טקסט", multiline: true },
      { key: "cred3_title", label: "ריבוע 3 — כותרת" },
      { key: "cred3_text", label: "ריבוע 3 — טקסט", multiline: true },
      { key: "cred4_title", label: "ריבוע 4 — כותרת" },
      { key: "cred4_text", label: "ריבוע 4 — טקסט", multiline: true },
    ],
  },
  {
    title: "טופס",
    fields: [
      { key: "form_title", label: "כותרת הטופס" },
      { key: "form_lead", label: "פסקת הטופס", multiline: true },
      { key: "form_submit", label: "כפתור שליחה" },
    ],
  },
  {
    title: "משפטי ופוטר",
    fields: [
      { key: "legal_1", label: "פסקה משפטית 1", multiline: true },
      { key: "legal_2", label: "פסקה משפטית 2", multiline: true },
      { key: "footer_brand", label: "שם בפוטר" },
      { key: "footer_address", label: "כתובת" },
    ],
  },
];
