import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Scale, Gavel, FileText, Users, ChevronDown, ChevronUp, Trophy, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CaseStudy {
  id: string;
  title: string;
  court: string;
  courtIcon: React.ElementType;
  challenge: string;
  strategy: string;
  results: string[];
  bottomLine: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "exit-ban",
    title: "ביטול צו עיכוב יציאה מהארץ",
    court: "בית המשפט המחוזי (ערעור)",
    courtIcon: Scale,
    challenge: "אם \"כלואה\" בישראל במשך 6 שנים בשל צו עיכוב יציאה שהוטל עליה במסגרת סכסוך גירושין. הצו מנע ממנה לטפל בנכסיה בחו\"ל ולקיים קשרים משפחתיים.",
    strategy: "הוכחנו כי הצו הפך לכלי לחץ פסול ולא לאמצעי הבטחה לגיטימי. הדגשנו את הפגיעה הבלתי מידתית בחופש התנועה ואת העדר הצדקה להמשך הצו לאחר שנים.",
    results: ["ביטול קבוע של צו עיכוב היציאה", "שחרור מלא מערבויות בנקאיות בסך מאות אלפי שקלים", "חיוב הצד השני בהוצאות משפט"],
    bottomLine: "לאחר 6 שנים של \"כליאה\" בישראל, הלקוחה חופשייה לצאת מהארץ ולנהל את חייה ללא הגבלות."
  },
  {
    id: "rabbinical-court",
    title: "מהפך בבית הדין הרבני",
    court: "בית הדין הרבני ברחובות",
    courtIcon: Gavel,
    challenge: "האם \"נעלמה\" עם הילדים תוך ניצול המצב הביטחוני והגישה תלונות שווא על אלימות האב כלפי הבת. הילדים הוחזקו בנתק מהאב במשך שבוע.",
    strategy: "הגעה פיזית לבית הדין לשחרור \"פקק\" מנהלתי. הגשת בקשה נגדית דחופה להשבת הילדים, חשיפת דפוס הפעולה של האם, ועמידה על שיחה ישירה עם הקטינים.",
    results: ["הפרכת טענות האלימות - בית הדין קבע כי הילדה \"תודרכה\" מה לומר", "העברת הילדים לאב באופן מיידי", "ביטול מוחלט של זמני השהות של האם - מעתה רק בפיקוח מרכז קשר"],
    bottomLine: "מצב של \"חטיפה\" בחסות החוק הפך לניצחון מוחץ שבו טובת הילדים והאמת ניצחו."
  },
  {
    id: "estate-alimony",
    title: "מזונות מן העיזבון - הישג תקדימי",
    court: "בית המשפט לענייני משפחה",
    courtIcon: FileText,
    challenge: "ייצוג ידועה בציבור נגד יורשי עיזבון בשווי עשרות מיליוני שקלים. היורשים ניסו למנוע גילוי מידע כלכלי וטענו שיש להכריע תחילה בשאלת המעמד.",
    strategy: "הובלנו קו משפטי נחוש שדחה את הניסיון לפצל את הדיון. טענו כי ניהול הליך תקין מחייב \"קלפים גלויים\" כבר מהרגע הראשון.",
    results: ["צו גילוי נרחב לחשיפת כל חשבונות הבנק של המנוח", "חובת גילוי העברות נכסים בשנתיים שקדמו לפטירה", "קביעת הלכה משמעותית: אין להמתין להכרעה במעמד לפני גילוי מידע כלכלי"],
    bottomLine: "ניצחון אסטרטגי שמבטיח ללקוחתנו גישה למלוא המידע הנדרש להבטחת עתידה הכלכלי."
  },
  {
    id: "child-support-reversal",
    title: "מהפך דרמטי בתיק מזונות",
    court: "בית המשפט לענייני משפחה",
    courtIcon: Users,
    challenge: "האם תבעה מזונות כבדים מהאב (מורה במקצועו) תוך הצגת מצג של ירידה בשכרה. האב התמודד עם השלכות משבר הקורונה על הכנסותיו.",
    strategy: "חשיפת מצגי השווא של האם באמצעות עדים וראיות. הוכחת מעמד האב כהורה עיקרי (70% זמני שהות) וניתוח יחס הכנסות ריאלי.",
    results: ["דחיית תביעת המזונות של האם במלואה", "חיוב האם לשלם לאב מזונות חודשיים בסך 2,255 ש\"ח", "חלוקה לא שוויונית: האם 60% מהוצאות חינוך ורפואה, האב 40% בלבד"],
    bottomLine: "הליך שהתחיל בניסיון לחייב את האב הסתיים בפסק דין שמעניק לו צדק כלכלי ומשאבים לגידול ילדיו."
  },
  {
    id: "joint-custody",
    title: "מהסכם גירושין למשמורת משותפת",
    court: "בית המשפט לענייני משפחה",
    courtIcon: Users,
    challenge: "אב לנערה בת 14 ביקש להרחיב זמני שהות, אך נתקל בסירוב מוחלט מהאם שהעלתה טענות קשות לניכור הורי, \"שטיפת מוח\" והתעללות רגשית.",
    strategy: "ניטרול טענות הניכור באמצעות חקירה נגדית מדויקת, התעקשות על שמיעה ישירה של הקטינה, והוכחה שעמדותיה אותנטיות ועצמאיות.",
    results: ["שינוי הסטטוס למשמורת משותפת", "הרחבה משמעותית של זמני השהות כולל לינות באמצע שבוע", "חיוב האם ב-20,000 ש\"ח הוצאות משפט"],
    bottomLine: "אסטרטגיה המבוססת על עובדות וחקירה יסודית ניצחה את טענות הניכור והשיבה לאב את מקומו המרכזי בחיי בתו."
  },
  {
    id: "relocation-appeal",
    title: "אישור מעבר מגורים בערעור",
    court: "בית המשפט המחוזי (ערעור)",
    courtIcon: Scale,
    challenge: "אם שעברה עם בתה מקריית אונו למודיעין קיבלה פסק דין שהורה לה לחזור ואסר מגורים במרחק העולה על 5 ק\"מ מקריית אונו.",
    strategy: "הגשת בקשה לעיכוב ביצוע למניעת זעזוע נוסף, וערעור שטען כי ההחלטה הייתה \"עונשית\" ומתעלמת מטובת הקטינה.",
    results: ["ביטול פסק הדין של הערכאה הראשונה", "אישור המעבר למודיעין באופן סופי", "אישור רישום הקטינה לבית הספר החדש"],
    bottomLine: "ניהול נכון של הליך ערעור הצליח לשנות החלטה שנראתה סופית ולהעניק לאם ובתה חופש ויציבות."
  },
  {
    id: "pension-protection",
    title: "הצלת כספי הפנסיה (סעיף 8)",
    court: "בית הדין הרבני תל אביב",
    courtIcon: Gavel,
    challenge: "בעל שניהל עסקיו בכספים \"שחורים\" הציג מצג של \"עני מרוד\" ודרש מחצית מכספי הפנסיה והחסכונות של האישה.",
    strategy: "חשיפת מצבו הכלכלי האמיתי והגשת תביעה לחלוקה לא שוויונית לפי סעיף 8 לחוק יחסי ממון.",
    results: ["הגנה על הפנסיה והחסכונות של האישה", "דחיית טענות הבעל לעוני", "חיוב הבעל בהוצאות משפט כבדות"],
    bottomLine: "הבטחנו ששנות העבודה הקשות של הלקוחה לא ירדו לטמיון לטובת צד שפעל בחוסר תום לב."
  },
  {
    id: "deceptive-trial",
    title: "\"דין מרומה\" בבית הדין הגדול",
    court: "בית הדין הרבני הגדול (ערעור)",
    courtIcon: Scale,
    challenge: "בעל הגיש ערעור רכושי תוך הסתרת נכסים, בניסיון לקבל חלוקה שוויונית שתאפשר לו לנגוס בפנסיה של האישה.",
    strategy: "חשיפת ה\"ידיים הלא נקיות\" של המערער והגדרת המקרה כ\"דין מרומה\" - ניסיון הונאה של בית הדין.",
    results: ["דחיית הערעור על הסף", "קביעה תקדימית של \"דין מרומה\"", "החמרת חיוב ההוצאות"],
    bottomLine: "הניסיון המתוחכם \"לעקוץ\" את כספי הפנסיה נבלם בקיר ברזל משפטי שחשף את השקרים וההסתרות."
  },
  {
    id: "lawsuit-blocking",
    title: "חסימת תביעה של 800,000 ש\"ח",
    court: "בית המשפט לענייני משפחה",
    courtIcon: Shield,
    challenge: "גרוש הגיש תביעת פיצויים מופרכת על סך 811,000 ש\"ח במסגרת מסע רדיפה משפטי, במטרה לרושש את האישה.",
    strategy: "הגשת בקשה לחיוב בהפקדת ערובה להוצאות, תוך הוכחת אופיה הטורדני של התביעה והתנהלות התובע.",
    results: ["חיוב התובע להפקיד ערבות במזומן", "התובע נאלץ למחוק את התביעה", "חיסכון של שנים של הליכים יקרים"],
    bottomLine: "חסמנו תביעת ענק עוד בטרם החלה וסיימנו את ה\"חגיגה\" הטורדנית במינימום זמן ומקסימום תוצאה."
  }
];

const CaseCard = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = caseStudy.courtIcon;

  return (
    <div className="card-light rounded-sm p-8 h-full flex flex-col gold-glow-hover">
      <div className="flex items-center gap-3 mb-5">
        <Icon className="h-5 w-5 text-gold" strokeWidth={1} />
        <span className="font-body text-xs font-light text-ink-muted tracking-wide">{caseStudy.court}</span>
      </div>
      <h3 className="font-heading text-xl font-light text-gold tracking-editorial leading-tight mb-5">{caseStudy.title}</h3>
      
      <div className="mb-5">
        <span className="font-body text-xs font-normal tracking-wide text-ink-muted uppercase block mb-2">האתגר</span>
        <p className="font-body text-sm font-light text-ink-muted leading-relaxed">{caseStudy.challenge}</p>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex-1">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between font-body text-sm font-light text-gold hover:text-gold-light transition-colors duration-300 mb-5 py-2 border-b border-[rgba(201,168,76,0.15)]">
            <span>{isOpen ? "הסתר פרטים" : "קרא עוד"}</span>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4">
          <div>
            <span className="font-body text-xs font-normal tracking-wide text-ink-muted uppercase block mb-2">האסטרטגיה</span>
            <p className="font-body text-sm font-light text-ink-muted leading-relaxed">{caseStudy.strategy}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="mt-auto pt-5 border-t border-[rgba(201,168,76,0.15)]">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-4 w-4 text-gold" strokeWidth={1} />
          <span className="font-body text-xs font-normal tracking-wide text-gold uppercase">התוצאה</span>
        </div>
        <ul className="space-y-2 mb-5">
          {caseStudy.results.map((result, idx) => (
            <li key={idx} className="flex items-start gap-2 font-body text-sm font-light text-ink-muted">
              <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
        
        <div className="border-r-2 border-r-gold pr-4">
          <p className="font-body text-sm font-light text-ink-muted leading-relaxed">
            <strong className="text-gold">השורה התחתונה:</strong> {caseStudy.bottomLine}
          </p>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesSection = () => {
  return (
    <section className="relative py-[120px] bg-cream">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-6 block font-normal text-3xl">הצלחות המשרד</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-4">
            תיקים לדוגמה – <span className="text-gold">תוצאות מוכחות</span>
          </h2>
          <p className="font-body text-base font-light text-ink-muted max-w-2xl mx-auto">
            מבחר מקרים אמיתיים המדגימים את הגישה האסטרטגית והתוצאות שהמשרד משיג עבור לקוחותיו
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {caseStudies.slice(0, 4).map((caseStudy) => (
            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/case-studies"
            className="inline-block font-body text-sm font-light px-10 py-4 border border-gold text-gold bg-transparent hover:bg-[rgba(201,168,76,0.12)] transition-all duration-500 tracking-wide"
          >
            צפו בכל התיקים לדוגמה ({caseStudies.length})
          </Link>
        </div>
      </div>
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default CaseStudiesSection;
