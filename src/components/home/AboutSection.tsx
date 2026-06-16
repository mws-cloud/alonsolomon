import { Link } from "react-router-dom";
import { Award, BookOpen, Users, Scale } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative bg-cream">
      <div className="container mx-auto px-4 py-[100px]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label mb-6 block font-normal text-3xl">אודות</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-10">
            ניסיון, מקצועיות <span className="text-gold">ותוצאות</span>
          </h2>

          <div className="space-y-6 font-body text-base md:text-lg font-light text-ink-muted leading-[1.85] text-justify max-w-3xl mx-auto">
            <p className="font-normal text-ink text-lg md:text-xl leading-[1.8]">
              משרד עו״ד אלון סולומון ושות׳ מלווה לקוחות בהליכי גירושין, סכסוכי משמורת וזמני שהות, מזונות, חלוקת רכוש, ירושה, ניהול הון ונכסים משפחתיים וסכסוכי משפחה מורכבים. המשרד פועל מתוך גישה מקצועית ברורה: חתירה לפתרון נכון, יעיל ומדויק כאשר הדבר אפשרי — ולצד זאת ניהול מאבק משפטי חד, נחוש וללא פשרות כאשר הנסיבות מחייבות זאת.
            </p>
            <p>
              בראש המשרד עומד <span className="text-ink font-normal">עו״ד אלון סולומון</span>, מבכירי עורכי הדין בישראל בתחום דיני המשפחה, בעל ניסיון של מעל 25 שנה. אלון הוא בוגר תואר ראשון כפול במשפטים ומנהל עסקים מאוניברסיטת בר אילן, תואר שני במשפטים במסלול ישיר למצטיינים מאוניברסיטת בר-אילן, ובנוסף בעל תואר שני במנהל עסקים (מימון) מהאוניברסיטה העברית בירושלים.
            </p>
            <p>
              את דרכו המקצועית החל בשנת 2000 כמתמחה ועו״ד במשרד ש. הורביץ ושות׳, ולאחר מכן במשרד שבלת ושות׳ עד הקמת משרד אלון סולומון ושות׳. לצד עיסוקו המקצועי, אלון מרצה בפורומים שונים ובקורסים לסטודנטים לתואר ראשון, וחבר בוועדת בתי הדין הרבניים והמשפחה בלשכת עורכי הדין.
            </p>
            <p>
              במהלך השנים צבר ניסיון עשיר בהופעה בפני כלל הערכאות, בפרט בתי המשפט לענייני משפחה ובתי הדין הרבניים, ובהובלת סכסוכים משפטיים מורכבים ורגישים.
            </p>
          </div>

          {/* Video — reality vs legal process */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <span className="section-label mb-6 block font-normal text-3xl">צפו בסרטון</span>
              <h3 className="font-heading text-2xl md:text-4xl font-light text-ink tracking-editorial">
                המציאות מול <span className="text-gold">ההליך המשפטי</span>
              </h3>
            </div>

            <div className="max-w-sm mx-auto">
              <div className="relative rounded-xl overflow-hidden border border-gold/20 bg-black" style={{ paddingTop: "177.78%" }}>
                <iframe
                  src="https://player.vimeo.com/video/1184491800?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute top-0 left-0 w-full h-full"
                  title="המציאות מול ההליך המשפטי"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-block font-body text-sm font-light px-10 py-4 border border-gold text-gold bg-transparent hover:bg-[rgba(201,168,76,0.12)] transition-all duration-500 tracking-wide"
            >
              לקביעת פגישת ייעוץ
            </Link>
          </div>
        </div>
      </div>
      <div className="gold-divider" />
    </section>
  );
};

export default AboutSection;
