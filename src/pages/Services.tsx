import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { 
  FileText, Target, Map, AlertTriangle, 
  CheckCircle, XCircle, Scale, Heart, Banknote, Users 
} from "lucide-react";
import CTASection from "@/components/home/CTASection";

const Services = () => {
  return (
    <Layout>
      <SEO 
        title="שירותים משפטיים"
        description="ייעוץ לפני גירושין, ייצוג בבית המשפט, הסכמי ממון, משמורת ילדים ומזונות. ליווי משפטי צמוד ומקיף בכל שלבי הגירושין."
        canonical="/services"
      />

      {/* Hero */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">השירותים שלנו</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            ליווי משפטי צמוד ומקיף
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto">
            בכל שלבי הגירושין
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Part 1 - Understanding the Law */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <FileText className="h-6 w-6 text-gold shrink-0" strokeWidth={1} />
              <div>
                <span className="section-label block mb-1">חלק ראשון</span>
                <h2 className="font-heading text-2xl md:text-4xl font-light text-dark tracking-editorial">הבינו מה אומר החוק</h2>
              </div>
            </div>

            <p className="font-body text-base font-light text-dark/60 mb-10 leading-relaxed">
              בחלק הזה תשלח תמונת מצב מקיפה ומפורטת לגבי כל אחד מהיבטי הגירושין, סוגיית הילדים 
              (בעבר מקובל היה המונח "משמורת") וזמני שהות, מזונות, חלוקת הרכוש, מכירת הדירה, 
              הערכת שווי חברה, מה דין נכסי ירושה, מניות, אופציות, פנסיות וכו׳.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "אומדן משוער לגובה המזונות שידרשו לשלם או לקבל",
                "איך לחלק את זמני השהיה עם הילדים",
                "מה האפשרויות לגבי חלוקת הזכויות בבית המגורים",
                "איך אפשר לחלק את יתר הרכוש, הנכסים, תיק המניות, העסק",
                "התייחסות לנכסי ירושה ומתנות",
                "כל דבר אחר שרלוונטי לנתונים שלך",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 border border-warm-gray/40 p-5 rounded-sm">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-sm font-light text-dark/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Part 2 - Strategy */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <Target className="h-6 w-6 text-gold shrink-0" strokeWidth={1} />
              <div>
                <span className="section-label block mb-1">חלק שני</span>
                <h2 className="font-heading text-2xl md:text-4xl font-light text-ink tracking-editorial">האסטרטגיה לפעולה הנכונה עבורך</h2>
              </div>
            </div>

            <p className="font-body text-base font-light text-ink-muted mb-10 leading-relaxed">
              בעולם הגירושין קיימים הרבה מיתוסים נפוצים שכמעט תמיד רחוקים מאוד מהאמת. 
              בחלק הזה ישלחו המלצות לפעולה המבוססות על הניסיון הרב שצברתי מטיפול במקרים קודמים.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: "האם יש משמעות לבגידה?", icon: Heart },
                { q: "מהו 'מרוץ הסמכויות' והאם כדאי להיות הראשון לפנות לערכאה?", icon: Scale },
                { q: "האם בכלל צריך 'לפתוח תיק' או שאין בכך דחיפות?", icon: FileText },
                { q: "מה הסיכוי להגיע להסכם, ומה אפשר לצפות?", icon: Users },
                { q: "האם המטרות שהצבת לעצמך ריאליות?", icon: Target },
                { q: "האם צריך וכדאי ללכת לגישור?", icon: CheckCircle },
              ].map((item, index) => (
                <div key={index} className="card-light rounded-sm p-5 flex items-start gap-3">
                  <item.icon className="h-4 w-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-sm font-light text-ink">{item.q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Part 3 - Roadmap */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <Map className="h-6 w-6 text-gold shrink-0" strokeWidth={1} />
              <div>
                <span className="section-label block mb-1">חלק שלישי והחשוב ביותר</span>
                <h2 className="font-heading text-2xl md:text-4xl font-light text-dark tracking-editorial">מפת דרכים לגירושין המותאמת לך אישית</h2>
              </div>
            </div>

            <p className="font-body text-base font-light text-dark/60 mb-10 leading-relaxed">
              בחלק זה תשלח מפת דרכים מפורטת עם המלצות ברורות, מה הכרחי לעשות ובמיוחד מה אסור! 
              כדי להבין הכול וכדי לפשט את ההסברים, אצרף תרשים זרימה ברור שיעזור לך להבין בדיוק 
              איפה נמצאים עכשיו, ומהן האפשרויות העומדות בכל שלב.
            </p>

            <div className="border border-warm-gray/40 rounded-sm p-8 md:p-10">
              <h3 className="font-heading text-xl font-light text-dark tracking-editorial mb-6">כחלק מהייעוץ המשפטי תקבלו:</h3>
              <ul className="space-y-4">
                {[
                  "סיכום והמלצות בכתב, מונגשים בגובה העיניים בצורה קלה להבנה",
                  "סרטונים עם ידע שימושי",
                  "תרשימי זרימה להמחשה",
                  "תוכנית פעולה מומלצת שתוכלו ליישם בקצב שלכם",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="font-body text-sm font-light text-dark/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Warning Signs */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="section-label mb-4 block">סימני אזהרה</span>
              <h2 className="font-heading text-2xl md:text-4xl font-light text-ink tracking-editorial mb-4">
                האם עכשיו זה באמת הזמן?
              </h2>
              <p className="font-body text-base font-light text-ink-muted">
                סימנים שאסור להתעלם מהם - אם מזהים לפחות חלק מהם, מומלץ לפנות לייעוץ משפטי
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                "את/ה תמיד בצד הנאשם",
                "את/ה כבר מסוגלים לדמיין את החיים שלך ללא הצד השני",
                "פחות אכפת לך לתקן את הבעיות ולעבוד על האתגרים",
                "את/ה אלו ששואלים את רוב השאלות ביחסים",
                "הכל בבית הפך לטכני, סידורים ופונקציונליות",
                "אין לכם זמן איכות יחד, אין תחומי עניין משותפים",
                "חשים דיכאון והרגשת בדידות",
                "אתם כבר לא תמיד מקפידים לכבד את הצד השני",
                "אתם רבים יותר ממה שרבתם בעבר",
                "חשים שלצד השני יש אג'נדה נסתרת",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 card-light rounded-sm p-5">
                  <AlertTriangle className="h-4 w-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-sm font-light text-ink">{item}</span>
                </div>
              ))}
            </div>

            {/* Severe Warning Signs */}
            <div className="border border-red-500/30 rounded-sm p-8 bg-red-500/5">
              <h3 className="font-heading text-xl font-light text-red-400 tracking-editorial mb-5 flex items-center gap-2">
                <XCircle className="h-5 w-5" strokeWidth={1.5} />
                תמרורי אזהרה חמורים
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="font-body text-sm font-light text-ink">
                    <strong className="text-ink">אלימות על כל סוגיה</strong> - מילולית ובוודאי פיזית
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Banknote className="h-4 w-4 text-red-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="font-body text-sm font-light text-ink">
                    <strong className="text-ink">אלימות כלכלית</strong> - שימוש בכסף ובמשאבים כסנקציה וכאיום או אמצעי שליטה. 
                    מניעת גישה לחשבון בנק, הסתרת נכסים, פיקוח הדוק על כל הוצאה, יצירת חובות.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Counseling vs Legal */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl md:text-4xl font-light text-dark tracking-editorial mb-10 text-center">
              למה ללכת לעורך דין גירושין אם אפשר ייעוץ זוגי או גישור?
            </h2>

            <div className="border border-warm-gray/40 rounded-sm p-8 md:p-10 mb-10">
              <p className="font-body text-base font-light text-dark/60 mb-8 leading-relaxed">
                בגדול – אני בעד ייעוץ זוגי. אבל יש כמה דברים שכדאי לקחת בחשבון:
              </p>

              <ul className="space-y-4">
                {[
                  "יעוץ זוגי הוא לא פוליסת ביטוח",
                  "במקרים בהם אחד הצדדים מגיע ממקום פחות מחויב - יעילות הטיפול פוחתת",
                  "יש זוגות שהולכים לטיפול רק כדי להשקיט את המצפון",
                  "לעיתים צד אחד מבין תוך כדי טיפול שאין סיכוי ופונה לייעוץ משפטי - ללא ידיעת הצד השני",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                    <span className="font-body text-sm font-light text-dark/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-r-2 border-r-gold bg-white rounded-sm p-8 md:p-10 text-center">
              <p className="font-body text-base font-light text-ink-muted leading-relaxed">
                לכן אם אתם לא רוצים להתעורר מאוחר מדי ולגלות שאיבדתם את היתרון היחסי שלכם, 
                <strong className="text-gold"> אל תהססו לפנות לייעוץ משפטי, אפילו במקביל לייעוץ זוגי.</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
