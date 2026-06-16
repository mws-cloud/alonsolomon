import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Award, BookOpen, Users, Scale } from "lucide-react";
import alonSolomon from "@/assets/alon-solomon-profile.png";
import alonAndTheTeam from "@/assets/alon_and_the_team.jpeg";

const Team = () => {
  return (
    <Layout>
      <SEO
        title="הצוות – משרד עו״ד אלון סולומון ושות׳"
        description="הכירו את הצוות המקצועי של משרד עו״ד אלון סולומון ושות׳ – מומחים בדיני משפחה, גירושין וירושה."
        canonical="/team"
      />

      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">המשרד</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            משרד עו"ד אלון סולומון ושות׳
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto leading-relaxed">
            דיני משפחה, גירושים, וירושה
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      <section className="relative bg-cream py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* About the office - moved above */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-light text-ink tracking-editorial mb-6 text-center">
                  על המשרד
                </h2>
                <div
                  dir="rtl"
                  className="font-body text-sm md:text-base font-light text-ink-muted leading-relaxed text-justify"
                  style={{ textAlignLast: "right" }}
                >
                  <p className="p1 mb-6" dir="rtl"><strong>משרד עו"ד אלון סולומון ושות׳ עוסק בדיני משפחה, גירושין, ירושה וניהול הון ונכסים משפחתיים.</strong> המשרד מלווה לקוחות בהליכים רגישים, מורכבים ובעלי השלכות אישיות וכלכליות עמוקות, תוך שילוב של מקצוענות משפטית, חשיבה אסטרטגית, דיסקרטיות מלאה וראייה רחבה של מכלול נסיבות המקרה. לאורך השנים צבר המשרד ניסיון משמעותי בטיפול בסכסוכי משפחה מורכבים, הן בבתי המשפט והן בהליכי משא ומתן ויישוב מחלוקות מחוץ לכותלי בית המשפט.</p>
                  <p className="p1 mb-6" dir="rtl"><strong>הגישה המקצועית של המשרד מבוססת על חתירה לפתרון נכון, יעיל ומדויק עבור הלקוח.</strong> מבחינתנו, הליך משפטי אינו מטרה בפני עצמה. כאשר ניתן להגיע לפתרון טוב, אחראי וישים ללא ניהול הליך ממושך — זהו לרוב המסלול הנכון. בדיני משפחה, להליך משפטי ממושך יש לעיתים מחיר כבד, אישי, משפחתי וכלכלי, ולכן יש להפעיל שיקול דעת אמיתי ולא לנהל מאבק לשם המאבק.</p>
                  <p className="p1 mb-6" dir="rtl"><strong>ומתי כן נכון להילחם?</strong> כאשר יש צורך אמיתי בפנייה לערכאות, או כאשר הצד השני בוחר לנהל את הסכסוך בדרך כוחנית, בלתי עניינית או חסרת תום לב, ואין עוד אפשרות מעשית להגיע לפתרון ראוי מחוץ לבית המשפט. במצבים כאלה המשרד פועל בנחישות, בחדות וללא פשרות, מתוך מיקוד מלא בהגנה על האינטרסים של הלקוח ובהשגת התוצאה הטובה ביותר בנסיבות העניין.</p>
                  <p className="p1 mb-6" dir="rtl"><strong>אנו רואים חשיבות עליונה בכך שלקוחות המשרד יקבלו תמונה מלאה, אמיתית ומפוכחת של מצבם המשפטים.</strong> לדעת בדיוק איפה נמצאים "על המפה". משום כך, כל מי שפונה למשרד עובר בירור ראשוני מעמיק ויסודי, שמטרתו להבין לא רק את השאלה המשפטית שעל הפרק, אלא גם את ההקשר המשפחתי, הכלכלי והאנושי הרחב שבתוכו היא מתעוררת. כבר משלב הייעוץ הראשוני ניתנת ללקוח הערכה ברורה של מצבו, לצד הצגת דרכי הפעולה האפשריות, יתרונותיהן, חסרונותיהן והשלכותיהן. לאורך כל הדרך מקפיד המשרד על סדר, ארגון, זמינות ועדכון שוטף, מתוך הבנה כי מקצוענות משפטית אמיתית נמדדת גם בדיוק, גם באחריות וגם ביכולת לנהל תיק מורכב באופן מסודר, שקול ויעיל.</p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-gold/15 gold-glow-hover">
                <img
                  src={alonAndTheTeam}
                  alt="עו״ד אלון סולומון יחד עם צוות המשרד"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

            </div>

            {/* Alon Solomon */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={alonSolomon}
                    alt="עו״ד אלון סולומון – מייסד ושותף מנהל"
                    className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
                  />
                </div>
                <div className="hidden lg:block absolute top-0 -left-8 w-[1px] h-full bg-gold/30" />
              </div>

              <div className="relative z-10">
                <span className="section-label mb-6 block font-normal text-3xl">מייסד ושותף מנהל</span>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-ink tracking-editorial mb-6">
                  עו״ד אלון סולומון
                </h2>
                <div className="space-y-4 font-body text-sm md:text-base font-light text-ink-muted leading-relaxed" dir="rtl">
                  <p className="p1" dir="rtl"><strong>בראש המשרד עומד עו"ד אלון סולומון, מבכירי עורכי הדין בישראל בתחום דיני המשפחה, בעל ניסיון מקצועי של למעלה מ־25 שנה.</strong></p>
                  <p className="p1" dir="rtl">אלון הוא בעל ארבעה תארים אקדמיים: תואר ראשון כפול במשפטים ובמנהל עסקים מאוניברסיטת בר־אילן (1999); תואר שני במשפטים מאוניברסיטת בר־אילן (2000), אותו השלים במסלול ישיר למצטיינים במקביל ללימודי התואר הראשון; וכן תואר שני במנהל עסקים, בהתמחות במימון, מהאוניברסיטה העברית בירושלים (2002).</p>
                  <p className="p1" dir="rtl">את דרכו המקצועית החל אלון בשנת 2000, תחילה כמתמחה ובהמשך כעורך דין, במשרד ש. הורביץ ושות', ולאחר מכן במשרד שבלת ושות', מן המשרדים המובילים בישראל. במהלך השנים צבר ניסיון עשיר בהופעה בפני הערכאות השונות, ובכלל זה בתי המשפט לענייני משפחה, בתי הדין הרבניים האזוריים, בית הדין הרבני הגדול בירושלים ובית המשפט העליון.</p>
                  <p className="p1" dir="rtl">השילוב בין ניסיון ליטיגטורי של למעלה משני עשורים, בקיאות עמוקה בדיני המשפחה ובמשפט העברי, והבנה פיננסית רחבה, מאפשר לאלון לנהל ולפתור סכסוכי משפחה מורכבים בזירות שבהן הם מוכרעים בפועל: בבתי המשפט לענייני משפחה ובבתי הדין הרבניים. המשרד מטפל בתיקים רגישים של גירושין, ילדים, זמני שהות, מזונות וקשר הורי, לצד תיקים רכושיים מורכבים הכוללים איזון משאבים, נכסי נדל"ן, עסקים משפחתיים, זכויות פיננסיות ומבני הון.</p>
                  <p className="p1" dir="rtl">נוסף על פעילותו המקצועית, אלון מרצה בפורומים שונים ובקורסים לסטודנטים לתואר ראשון, וחבר בוועדת בתי הדין הרבניים והמשפחה בלשכת עורכי הדין.</p>
                  <p className="p1" dir="rtl">אלון משרת כקצין בכיר במילואים, לאחר שירות סדיר וקבע באחת היחידות המובחרות והמוכרות בצה"ל. לצד זאת, הוא בעל חגורה שחורה דאן 2 בקרטה, בשיטת שוטוקאן <span className="s1">SKIF</span>, והתחרה במשך שנים בתחום.</p>
                </div>
              </div>
            </div>

            {/* Additional team note */}
            <div className="card-light rounded-sm p-10 text-center max-w-2xl mx-auto">
              <Users className="h-8 w-8 text-gold mx-auto mb-4" strokeWidth={1} />
              <h3 className="font-heading text-xl font-light text-ink tracking-editorial mb-3">צוות מקצועי ומסור</h3>
              <p className="font-body text-sm font-light text-ink-muted leading-relaxed">
                לצד עו״ד סולומון פועלים אנשי צוות נוספים המתמחים בדיני משפחה, ירושה ורכוש. הצוות עובד בשיתוף פעולה מלא
                עם גורמי רווחה, מומחים כלכליים ואנשי מקצוע נוספים להשגת התוצאות הטובות ביותר עבור לקוחותינו.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
