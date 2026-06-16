import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Scale, Banknote, Home, FileText, Users, Clock, BookOpen, Gavel, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import VimeoVideosSection from "@/components/guides/VimeoVideosSection";

interface Guide {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  summary: string;
  content: string;
  readTime: number;
  icon: React.ElementType;
}

const guides: Guide[] = [
  {
    id: "jurisdiction-race",
    title: "מרוץ הסמכויות - למה להיות ראשון?",
    category: "אסטרטגיה משפטית",
    categoryColor: "bg-blue-500",
    summary: "הסבר על התחרות בין בית המשפט לענייני משפחה לבית הדין הרבני, ולמה תזמון הגשת התביעה יכול להשפיע דרמטית על התוצאה.",
    readTime: 6,
    icon: Scale,
    content: `מהו מרוץ הסמכויות?

בישראל קיימות שתי ערכאות מקבילות לטיפול בענייני גירושין ומשפחה: בית המשפט לענייני משפחה ובית הדין הרבני. שתי הערכאות מוסמכות לדון בנושאים רבים הקשורים לגירושין, אך לעיתים יש הבדלים משמעותיים בגישה ובתוצאות.

"מרוץ הסמכויות" הוא המצב בו כל אחד מבני הזוג ממהר להגיש תביעה בערכאה שלדעתו תיטיב עמו. הערכאה שאליה הוגשה התביעה ראשונה - היא שתדון בעניין.

למה זה חשוב?

1. הבדלים בגישה לחלוקת רכוש: בית המשפט נוטה ליישם את חוק יחסי ממון באופן שוויוני יותר, בעוד בית הדין הרבני עשוי לתת משקל לשיקולים הלכתיים.

2. מזונות אישה: בית הדין הרבני עשוי לפסוק מזונות לאישה עד מתן הגט, בעוד בית המשפט בוחן את המצב הכלכלי של שני הצדדים.

3. משמורת ילדים: למרות ששתי הערכאות מכריזות על עקרון טובת הילד, לעיתים יש הבדלים בפרשנות.

4. סרבנות גט: בית הדין הרבני הוא הערכאה היחידה שיכולה לכפות מתן או קבלת גט.

מה צריך לדעת?

• תכנון מוקדם: אם אתם שוקלים גירושין, חשוב להתייעץ עם עורך דין מנוסה שיוכל לייעץ לכם באיזו ערכאה עדיף להגיש.

• מהירות הפעולה: ברגע שההחלטה התקבלה, תזמון נכון יכול להיות קריטי.

• כריכת עניינים: ניתן "לכרוך" נושאים כמו רכוש, מזונות ומשמורת יחד עם תביעת הגירושין, מה שקובע את הסמכות לגביהם.

• ייעוץ מקצועי: כל מקרה הוא ייחודי, ומה שנכון לזוג אחד לא בהכרח נכון לאחר.

לסיכום

מרוץ הסמכויות הוא אחד ההיבטים האסטרטגיים החשובים ביותר בתהליך הגירושין. החלטה נכונה יכולה להשפיע על כל ההליך - מחלוקת הרכוש ועד למשמורת הילדים. אל תהססו לפנות לייעוץ משפטי מקצועי.`
  },
  {
    id: "child-support",
    title: "מזונות ילדים - כל מה שצריך לדעת",
    category: "מזונות",
    categoryColor: "bg-green-500",
    summary: "מדריך מקיף להבנת נושא מזונות הילדים: איך מחשבים, מה ההבדל בין הגילאים, ומה השתנה לאחר הלכת בע\"מ 919/15.",
    readTime: 8,
    icon: Banknote,
    content: `מזונות ילדים - המדריך המלא

מזונות ילדים הם אחד הנושאים המרכזיים והרגישים ביותר בהליכי גירושין. הבנת העקרונות הבסיסיים תעזור לכם להתמודד עם הנושא בצורה מושכלת.

העקרונות הבסיסיים

על פי הדין העברי והחוק הישראלי, שני ההורים חייבים במזונות ילדיהם. עם זאת, ישנם הבדלים משמעותיים בחובות בין הגילאים השונים:

• גיל 0-6: חובת האב מוחלטת - האב נושא במלוא האחריות למזונות ההכרחיים.
• גיל 6-15: חובה משותפת - שני ההורים משתתפים, עם דגש על יכולת הכלכלית של כל אחד.
• גיל 15-18: חובה על פי דין צדקה - שני ההורים חייבים באופן שווה יחסית.

הלכת בע"מ 919/15 - המהפכה

בשנת 2017 פורסמה הלכת בע"מ 919/15, שחוללה מהפכה בתחום:

1. שוויון מגדרי: ההלכה קבעה כי יש לבחון את חובת שני ההורים באופן שוויוני יותר.

2. השפעת המשמורת: במשמורת משותפת (לפחות 30% מהזמן אצל כל הורה), יש לבחון את ההכנסות של שני ההורים ולחשב את המזונות בהתאם.

3. גמישות: בית המשפט בוחן כל מקרה לגופו, תוך התחשבות בנסיבות הספציפיות.

מה כולל חישוב המזונות?

• צרכים הכרחיים: מזון, ביגוד, מדור (דיור), חינוך, בריאות.
• צרכים מדין צדקה: חוגים, בילויים, נופשים.
• הוצאות מיוחדות: טיפולים רפואיים חריגים, צרכים מיוחדים.

גורמים המשפיעים על גובה המזונות

• הכנסות שני ההורים
• רמת החיים שאליה הורגלו הילדים
• חלוקת זמני השהות
• מספר הילדים וגילאיהם
• צרכים מיוחדים של הילדים

טיפים חשובים

1. תיעוד הוצאות: שמרו קבלות ואסמכתאות להוצאות הילדים.
2. שקיפות כלכלית: הציגו תמונה מלאה של המצב הכלכלי.
3. גמישות: היו פתוחים למשא ומתן - הסכמות טובות יותר מפסיקות.
4. עדכון: המזונות ניתנים לעדכון בהתאם לשינויים בנסיבות.`
  },
  {
    id: "property-division",
    title: "חלוקת רכוש בגירושין - מה מגיע לכם?",
    category: "רכוש",
    categoryColor: "bg-purple-500",
    summary: "הסבר מקיף על חוק יחסי ממון, מה נחשב רכוש משותף, כיצד מתייחסים לנכסי ירושה ומתנות, ומתי אפשרית חלוקה לא שוויונית.",
    readTime: 7,
    icon: Home,
    content: `חלוקת רכוש בגירושין - המדריך המלא

חוק יחסי ממון בין בני זוג, התשל"ג-1973, מסדיר את אופן חלוקת הרכוש בין בני זוג שנישאו לאחר 1974. הבנת עקרונות החוק חיונית לכל מי שעומד בפני הליך גירושין.

הסדר איזון משאבים

העיקרון המרכזי בחוק הוא "הסדר איזון משאבים": עם פקיעת הנישואין, כל אחד מבני הזוג זכאי למחצית משווי כלל נכסי בני הזוג.

מה נכלל באיזון?

• דירת המגורים: גם אם רשומה על שם אחד מבני הזוג
• חסכונות ופנסיה: כל החסכונות שנצברו במהלך הנישואין
• השקעות: מניות, קרנות, נדל"ן להשקעה
• עסקים: שווי עסקים שנבנו במהלך הנישואין
• רכבים ונכסים אחרים

מה לא נכלל באיזון?

• נכסים שהיו לפני הנישואין: ובתנאי שנשמרו בנפרד
• ירושות ומתנות: שהתקבלו במהלך הנישואין לאחד מבני הזוג
• גמלאות מהמוסד לביטוח לאומי
• נכסים שהוסכם שלא יאוזנו: בהסכם ממון

חשוב לדעת - ערבוב נכסים

אם נכס "חיצוני" (ירושה, מתנה, נכס מלפני הנישואין) עורבב עם הרכוש המשותף - הוא עלול להפוך למשותף. לדוגמה:
• כספי ירושה שהופקדו בחשבון משותף
• דירה שעברה שיפוץ מכספים משותפים
• נכס שהוכנס להסכם משכנתא משותף

סעיף 8 - חלוקה לא שוויונית

בנסיבות מיוחדות, בית המשפט רשאי לסטות מחלוקה שוויונית:
• נסיבות מיוחדות הקשורות לרכוש
• נסיבות הקשורות למערכת היחסים
• תרומה מיוחדת של אחד מבני הזוג

מועד הקרע

"מועד הקרע" הוא המועד שבו נפסקה השותפות בין בני הזוג. זהו המועד הקובע לחישוב שווי הנכסים לחלוקה. קביעת מועד הקרע יכולה להשפיע משמעותית על התוצאה.

טיפים מעשיים

1. איתור נכסים: ודאו שיש לכם תמונה מלאה של כל הנכסים
2. הערכות שווי: קבלו הערכות מקצועיות לנכסים משמעותיים
3. תיעוד: שמרו אסמכתאות לנכסים "חיצוניים"
4. ייעוץ מקצועי: כל מקרה דורש בחינה פרטנית`
  },
  {
    id: "prenup-agreement",
    title: "הסכם ממון - ההגנה שלכם לעתיד",
    category: "הסכמים",
    categoryColor: "bg-orange-500",
    summary: "למה כדאי לערוך הסכם ממון, מה הוא צריך לכלול, מתי הוא תקף משפטית, ובאילו מקרים בית המשפט עלול לפסול אותו.",
    readTime: 5,
    icon: FileText,
    content: `הסכם ממון - כל מה שחשוב לדעת

הסכם ממון הוא הסכם משפטי בין בני זוג (לפני או אחרי הנישואין) המסדיר את יחסי הממון ביניהם. זהו כלי חשוב להגנה על האינטרסים של שני הצדדים.

למה צריך הסכם ממון?

• ודאות: ידיעה מראש מה יקרה עם הרכוש
• הגנה על נכסים: שמירה על נכסים שהובאו לנישואין
• הגנה על עסקים: מניעת פגיעה בעסק משפחתי
• הימנעות מסכסוכים: הפחתת חיכוכים במקרה של גירושין
• נישואין שניים: הגנה על ילדים מנישואין קודמים

מתי עורכים הסכם ממון?

1. לפני הנישואין (הסכם קדם-נישואין): הזמן האידיאלי, כשאין לחץ ויש אווירה חיובית.

2. במהלך הנישואין: אפשרי בכל עת, אך דורש הסכמה של שני הצדדים.

3. לקראת גירושין: לרוב מהווה חלק מהסכם הגירושין הכולל.

מה כולל הסכם ממון טוב?

• פירוט נכסים קיימים: של כל אחד מבני הזוג
• הגדרת נכסים נפרדים: מה יישאר של כל צד
• הסדרי רכוש עתידי: כיצד יחולק רכוש שייצבר
• התייחסות לדירת מגורים: מי יישאר, כיצד תחולק
• הסדרי פנסיה וחסכונות
• התייחסות לחובות

דרישות תוקף משפטי

• חתימה בפני נוטריון או בית משפט/בית דין
• הסכמה חופשית של שני הצדדים
• גילוי מלא של המצב הכלכלי
• ייעוץ משפטי עצמאי (מומלץ)

מתי הסכם ממון יכול להיפסל?

• עושק או כפייה: אם צד אחד נאלץ לחתום
• הטעיה: אם הוסתר מידע מהותי
• חוסר סבירות קיצוני: תנאים בלתי סבירים בעליל
• פגמים פורמליים: אישור לקוי

טיפים חשובים

1. עורך דין לכל צד: מומלץ שלכל צד יהיה ייצוג עצמאי
2. שקיפות מלאה: חשפו את כל המידע הכלכלי
3. הגינות: הסכם מאוזן יעמוד טוב יותר במבחן הזמן
4. עדכון: שקלו לעדכן את ההסכם בשינויי חיים משמעותיים`
  },
  {
    id: "custody-guide",
    title: "משמורת ילדים וזמני שהות - המדריך המלא",
    category: "משמורת",
    categoryColor: "bg-pink-500",
    summary: "הבנת סוגי המשמורת השונים, עקרון טובת הילד, כיצד בית המשפט מחליט, ומה חשוב להוכיח בהליך משמורת.",
    readTime: 7,
    icon: Users,
    content: `משמורת ילדים וזמני שהות - המדריך המלא

סוגיית המשמורת היא לעיתים קרובות הנושא הרגיש והמורכב ביותר בהליכי גירושין. הבנת העקרונות והאפשרויות תעזור לכם לקבל החלטות מושכלות.

סוגי משמורת

1. משמורת בלעדית
הילדים מתגוררים באופן קבוע אצל הורה אחד (ההורה המשמורן), והורה שני מקבל זמני שהות.

2. משמורת משותפת
הילדים מחלקים את זמנם באופן שווה או קרוב לשווה בין שני ההורים. דורשת שיתוף פעולה גבוה.

3. משמורת מפוצלת
ילדים שונים מאותה משפחה מתגוררים אצל הורים שונים (נדיר יחסית).

עקרון טובת הילד

זהו העיקרון המנחה בכל החלטה הנוגעת לילדים. בית המשפט בוחן:

• יציבות ורציפות: שמירה על סביבה מוכרת
• קשר עם שני ההורים: חשיבות הקשר עם שניהם
• רצון הילד: משקל הולך וגובר עם הגיל
• יכולות הוריות: מי מסוגל לספק את צרכי הילד
• מסוגלות לשתף פעולה: נכונות לאפשר קשר עם ההורה השני

גורמים שבית המשפט בוחן

• גיל הילדים: ילדים צעירים לרוב נשארים עם האם (חזקת הגיל הרך)
• בריאות ההורים: פיזית ונפשית
• זמינות: מי יכול להקדיש זמן לילדים
• תמיכה מורחבת: סבים, דודים וכו'
• יציבות כלכלית ודיור
• קרבה גיאוגרפית בין בתי ההורים

זמני שהות

גם כשיש משמורת בלעדית, להורה הלא-משמורן יש זכות לזמני שהות:
• סופי שבוע לסירוגין
• יום באמצע השבוע
• חלק מהחגים והחופשות
• זמן נוסף בהתאם לנסיבות

טיפים חשובים

1. שיתוף פעולה: הראו נכונות לשתף פעולה עם ההורה השני
2. מיקוד בילד: שימו את צרכי הילד במרכז
3. תיעוד: תעדו את מעורבותכם בחיי הילד
4. גמישות: היו גמישים ומוכנים להתפשר
5. יחידת סיוע: שקלו פנייה ליחידת הסיוע לפני ההליך המשפטי

בית משפט מעדיף הורים ש:
• מכבדים את ההורה השני
• מעודדים קשר עם ההורה השני
• שמים את הילד במקום הראשון
• מוכנים לשתף פעולה`
  }
];

const Guides = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <Layout>
      <SEO 
        title="מדריכים משפטיים - דיני משפחה"
        description="מדריכים מקצועיים בנושאי גירושין, מזונות, משמורת וחלוקת רכוש. הבינו את הנושאים המשפטיים המרכזיים בתחום דיני המשפחה."
        canonical="/guides"
      />
      {/* Hero Section */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">מדריכים משפטיים</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            מדריכים מקצועיים בדיני משפחה
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto">
            מדריכים מקצועיים שיעזרו לכם להבין את הנושאים המשפטיים המרכזיים בתחום דיני המשפחה והגירושין
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Vimeo Videos Section */}
      <VimeoVideosSection />

      {/* Guides Grid */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4 relative z-10">
          {/* Featured Article — Appeals */}
          <Link
            to="/appeal-family-law"
            className="card-light rounded-sm p-8 md:p-10 mb-10 group gold-glow-hover flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
          >
            <div className="shrink-0 h-16 w-16 rounded-full bg-[rgba(201,168,76,0.12)] flex items-center justify-center">
              <Gavel className="h-7 w-7 text-gold" strokeWidth={1.25} />
            </div>
            <div className="flex-grow">
              <span className="font-body text-xs font-normal tracking-wide text-gold uppercase">מאמר חדש · ערעורים</span>
              <h3 className="font-heading text-2xl md:text-3xl font-light text-ink tracking-editorial mt-2 mb-3 group-hover:text-gold transition-colors duration-300">
                ערעור בדיני משפחה וירושה – מתי יש טעם לערער, מהו המועד, ואיך עושים זאת נכון
              </h3>
              <p className="font-body text-sm md:text-base font-light text-ink-muted leading-relaxed">
                מתי ניתן לערער על פסק דין או החלטה בדיני משפחה, מה ההבדל בין ערעור לבקשת רשות ערעור, מהם המועדים בבית המשפט לענייני משפחה ובבית הדין הרבני, ומה חשוב לעשות מיד.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 font-body text-sm text-gold">
              <span>למאמר המלא</span>
              <ArrowLeft className="h-4 w-4" />
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {guides.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <div
                  key={guide.id}
                  className="card-light rounded-sm p-8 cursor-pointer group gold-glow-hover flex flex-col"
                  onClick={() => setSelectedGuide(guide)}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-body text-xs font-normal tracking-wide text-gold uppercase">
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-1 font-body text-xs font-light text-ink-muted">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{guide.readTime} דקות קריאה</span>
                    </div>
                  </div>
                  <IconComponent className="h-6 w-6 text-gold mb-5" strokeWidth={1} />
                  <h3 className="font-heading text-xl font-light text-ink tracking-editorial mb-4 group-hover:text-gold transition-colors duration-300">
                    {guide.title}
                  </h3>
                  <p className="font-body text-sm font-light text-ink-muted mb-6 leading-relaxed flex-grow">
                    {guide.summary}
                  </p>
                  <button className="w-full py-3 border border-gold/40 text-gold font-body text-sm font-light tracking-wide hover:bg-[rgba(201,168,76,0.12)] transition-all duration-300 flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    קרא עוד
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* CTA Section */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-light text-dark tracking-editorial mb-4">
            צריכים ייעוץ משפטי אישי?
          </h2>
          <p className="font-body text-base font-light text-dark/50 mb-8 max-w-xl mx-auto">
            המדריכים שלנו מספקים מידע כללי, אך כל מקרה הוא ייחודי. 
            פנו אלינו לייעוץ מקצועי המותאם למצבכם.
          </p>
          <a href="/contact" className="inline-block font-body text-sm font-normal px-12 py-4 bg-gold text-dark hover:bg-gold-light transition-all duration-500 tracking-wide">
            לייעוץ ראשוני
          </a>
        </div>
      </section>

      {/* Guide Dialog */}
      <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#FAF9F6] border-[rgba(201,168,76,0.25)]">
          {selectedGuide && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-body text-xs font-normal tracking-wide text-gold uppercase">
                    {selectedGuide.category}
                  </span>
                  <span className="text-[#E8E4DC]">·</span>
                  <span className="font-body text-xs font-light text-dark/40 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {selectedGuide.readTime} דקות קריאה
                  </span>
                </div>
                <DialogTitle className="font-heading text-2xl font-light text-dark tracking-editorial">
                  {selectedGuide.title}
                </DialogTitle>
                <DialogDescription className="font-body text-sm font-light text-dark/50">
                  {selectedGuide.summary}
                </DialogDescription>
              </DialogHeader>
              <div className="gold-divider my-6" />
              <div className="prose prose-lg max-w-none">
                {selectedGuide.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('•')) {
                    const items = paragraph.split('\n').filter(item => item.startsWith('•'));
                    return (
                      <ul key={index} className="list-none space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 font-body text-sm font-light text-dark/70">
                            <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                            {item.substring(2)}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.match(/^\d\./)) {
                    const items = paragraph.split('\n').filter(item => item.match(/^\d\./));
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="font-body text-sm font-light text-dark/70">{item.substring(3)}</li>
                        ))}
                      </ol>
                    );
                  }
                  if (paragraph.endsWith('?') || paragraph.endsWith(':')) {
                    return (
                      <h3 key={index} className="font-heading text-xl font-light text-dark tracking-editorial mt-8 mb-3">
                        {paragraph}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className="font-body text-sm font-light text-dark/70 leading-relaxed my-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
              <div className="gold-divider my-6" />
              <div>
                <p className="font-body text-xs font-light text-dark/40 mb-4">
                  * המידע במדריך זה הינו כללי בלבד ואינו מהווה ייעוץ משפטי. לקבלת ייעוץ המותאם למצבכם, פנו אלינו.
                </p>
                <a href="/contact" className="inline-block font-body text-sm font-normal px-8 py-3 bg-gold text-dark hover:bg-gold-light transition-all duration-500 tracking-wide">
                  לייעוץ אישי
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Guides;
