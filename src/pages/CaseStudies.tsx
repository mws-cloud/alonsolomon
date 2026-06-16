import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Scale, Gavel, FileText, Users, ChevronDown, ChevronUp, Trophy, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudy {
  id: string;
  title: string;
  court: string;
  courtIcon: React.ElementType;
  challenge: string;
  strategy: string;
  results: string[];
  bottomLine: string;
  extendedDetails?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "exit-ban",
    title: "ביטול צו עיכוב יציאה מהארץ",
    court: "בית המשפט המחוזי (ערעור)",
    courtIcon: Scale,
    challenge: "אם \"כלואה\" בישראל במשך 6 שנים בשל צו עיכוב יציאה שהוטל עליה במסגרת סכסוך גירושין. הצו מנע ממנה לטפל בנכסיה בחו\"ל ולקיים קשרים משפחתיים.",
    strategy: "הוכחנו כי הצו הפך לכלי לחץ פסול ולא לאמצעי הבטחה לגיטימי. הדגשנו את הפגיעה הבלתי מידתית בחופש התנועה ואת העדר הצדקה להמשך הצו לאחר שנים.",
    results: [
      "ביטול קבוע של צו עיכוב היציאה",
      "שחרור מלא מערבויות בנקאיות בסך מאות אלפי שקלים",
      "חיוב הצד השני בהוצאות משפט"
    ],
    bottomLine: "לאחר 6 שנים של \"כליאה\" בישראל, הלקוחה חופשייה לצאת מהארץ ולנהל את חייה ללא הגבלות.",
    extendedDetails: "תיק זה הדגים את החשיבות של התמדה משפטית לאורך זמן. למרות שש שנים של מאבק, לא ויתרנו על זכויותיה של הלקוחה. הצלחנו לשכנע את בית המשפט המחוזי כי המשך הצו אינו משרת מטרה לגיטימית אלא הפך למכשיר לחץ והתעללות. פסק הדין מהווה תקדים חשוב בנוגע לשימוש לרעה בצווי עיכוב יציאה."
  },
  {
    id: "rabbinical-court",
    title: "מהפך בבית הדין הרבני",
    court: "בית הדין הרבני ברחובות",
    courtIcon: Gavel,
    challenge: "האם \"נעלמה\" עם הילדים תוך ניצול המצב הביטחוני והגישה תלונות שווא על אלימות האב כלפי הבת. הילדים הוחזקו בנתק מהאב במשך שבוע.",
    strategy: "הגעה פיזית לבית הדין לשחרור \"פקק\" מנהלתי. הגשת בקשה נגדית דחופה להשבת הילדים, חשיפת דפוס הפעולה של האם, ועמידה על שיחה ישירה עם הקטינים.",
    results: [
      "הפרכת טענות האלימות - בית הדין קבע כי הילדה \"תודרכה\" מה לומר",
      "העברת הילדים לאב באופן מיידי",
      "ביטול מוחלט של זמני השהות של האם - מעתה רק בפיקוח מרכז קשר"
    ],
    bottomLine: "מצב של \"חטיפה\" בחסות החוק הפך לניצחון מוחץ שבו טובת הילדים והאמת ניצחו.",
    extendedDetails: "במקרה זה, מהירות התגובה הייתה קריטית. תוך שעות ספורות מהגעת הלקוח למשרד, הגשנו בקשה דחופה שהובילה לדיון מיידי. החקירה הנגדית חשפה סתירות בולטות בעדות האם, ובית הדין קבע כי הילדה קיבלה תדריך מפורט מה לומר. זהו אחד המקרים המורכבים ביותר שטיפלנו בהם, והתוצאה משקפת את החשיבות של ייצוג נחוש ומקצועי."
  },
  {
    id: "estate-alimony",
    title: "מזונות מן העיזבון - הישג תקדימי",
    court: "בית המשפט לענייני משפחה",
    courtIcon: FileText,
    challenge: "ייצוג ידועה בציבור נגד יורשי עיזבון בשווי עשרות מיליוני שקלים. היורשים ניסו למנוע גילוי מידע כלכלי וטענו שיש להכריע תחילה בשאלת המעמד.",
    strategy: "הובלנו קו משפטי נחוש שדחה את הניסיון לפצל את הדיון. טענו כי ניהול הליך תקין מחייב \"קלפים גלויים\" כבר מהרגע הראשון.",
    results: [
      "צו גילוי נרחב לחשיפת כל חשבונות הבנק של המנוח",
      "חובת גילוי העברות נכסים בשנתיים שקדמו לפטירה",
      "קביעת הלכה משמעותית: אין להמתין להכרעה במעמד לפני גילוי מידע כלכלי"
    ],
    bottomLine: "ניצחון אסטרטגי שמבטיח ללקוחתנו גישה למלוא המידע הנדרש להבטחת עתידה הכלכלי.",
    extendedDetails: "תיק זה עוסק בסוגיה משפטית מורכבת - זכויות ידועים בציבור מול עיזבונות. הצלחנו לקבוע הלכה חשובה לפיה גילוי מידע כלכלי צריך להתבצע במקביל לבירור שאלת המעמד, ולא אחריו. ההחלטה מסייעת לאלפי ידועים בציבור שנאלצים להתמודד עם יורשים עוינים."
  },
  {
    id: "child-support-reversal",
    title: "מהפך דרמטי בתיק מזונות",
    court: "בית המשפט לענייני משפחה",
    courtIcon: Users,
    challenge: "האם תבעה מזונות כבדים מהאב (מורה במקצועו) תוך הצגת מצג של ירידה בשכרה. האב התמודד עם השלכות משבר הקורונה על הכנסותיו.",
    strategy: "חשיפת מצגי השווא של האם באמצעות עדים וראיות. הוכחת מעמד האב כהורה עיקרי (70% זמני שהות) וניתוח יחס הכנסות ריאלי.",
    results: [
      "דחיית תביעת המזונות של האם במלואה",
      "חיוב האם לשלם לאב מזונות חודשיים בסך 2,255 ש\"ח",
      "חלוקה לא שוויונית: האם 60% מהוצאות חינוך ורפואה, האב 40% בלבד"
    ],
    bottomLine: "הליך שהתחיל בניסיון לחייב את האב הסתיים בפסק דין שמעניק לו צדק כלכלי ומשאבים לגידול ילדיו.",
    extendedDetails: "מקרה זה ממחיש את השינוי בגישת בתי המשפט לענייני משפחה. הוכחנו כי האב הוא ההורה העיקרי שמגדל את הילדים רוב הזמן, וכי האם ניסתה להציג מצג כלכלי שקרי. בית המשפט קיבל את כל טיעונינו והפך את הקערה על פיה - במקום לחייב את האב, חייב את האם לשלם לו מזונות."
  },
  {
    id: "joint-custody",
    title: "מהסכם גירושין למשמורת משותפת",
    court: "בית המשפט לענייני משפחה",
    courtIcon: Users,
    challenge: "אב לנערה בת 14 ביקש להרחיב זמני שהות, אך נתקל בסירוב מוחלט מהאם שהעלתה טענות קשות לניכור הורי, \"שטיפת מוח\" והתעללות רגשית.",
    strategy: "ניטרול טענות הניכור באמצעות חקירה נגדית מדויקת, התעקשות על שמיעה ישירה של הקטינה, והוכחה שעמדותיה אותנטיות ועצמאיות.",
    results: [
      "שינוי הסטטוס למשמורת משותפת",
      "הרחבה משמעותית של זמני השהות כולל לינות באמצע שבוע",
      "חיוב האם ב-20,000 ש\"ח הוצאות משפט"
    ],
    bottomLine: "אסטרטגיה המבוססת על עובדות וחקירה יסודית ניצחה את טענות הניכור והשיבה לאב את מקומו המרכזי בחיי בתו.",
    extendedDetails: "טענות ניכור הורי הפכו לאסטרטגיה נפוצה בסכסוכי משמורת. במקרה זה, הוכחנו כי הבת ביטאה רצון אותנטי לבלות יותר זמן עם אביה, וכי טענות האם נועדו למנוע זאת מסיבות שאינן קשורות לטובת הילדה. חיוב האם בהוצאות חריגות של 20,000 ש\"ח משקף את מורת רוחו של בית המשפט מניהול הליך סרק."
  },
  {
    id: "relocation-appeal",
    title: "אישור מעבר מגורים בערעור",
    court: "בית המשפט המחוזי (ערעור)",
    courtIcon: Scale,
    challenge: "אם שעברה עם בתה מקריית אונו למודיעין קיבלה פסק דין שהורה לה לחזור ואסר מגורים במרחק העולה על 5 ק\"מ מקריית אונו.",
    strategy: "הגשת בקשה לעיכוב ביצוע למניעת זעזוע נוסף, וערעור שטען כי ההחלטה הייתה \"עונשית\" ומתעלמת מטובת הקטינה.",
    results: [
      "ביטול פסק הדין של הערכאה הראשונה",
      "אישור המעבר למודיעין באופן סופי",
      "אישור רישום הקטינה לבית הספר החדש"
    ],
    bottomLine: "ניהול נכון של הליך ערעור הצליח לשנות החלטה שנראתה סופית ולהעניק לאם ובתה חופש ויציבות.",
    extendedDetails: "הליכי ערעור בענייני משפחה דורשים מומחיות ייחודית. במקרה זה, הצלחנו לשכנע את בית המשפט המחוזי כי ההחלטה בערכאה הראשונה הייתה שגויה מיסודה. עיכוב הביצוע שקיבלנו מנע זעזוע נוסף בחיי הילדה, והערעור עצמו הביא לביטול מוחלט של ההגבלות על האם."
  },
  {
    id: "pension-protection",
    title: "הצלת כספי הפנסיה (סעיף 8)",
    court: "בית הדין הרבני תל אביב",
    courtIcon: Gavel,
    challenge: "בעל שניהל עסקיו בכספים \"שחורים\" הציג מצג של \"עני מרוד\" ודרש מחצית מכספי הפנסיה והחסכונות של האישה.",
    strategy: "חשיפת מצבו הכלכלי האמיתי והגשת תביעה לחלוקה לא שוויונית לפי סעיף 8 לחוק יחסי ממון.",
    results: [
      "הגנה על הפנסיה והחסכונות של האישה",
      "דחיית טענות הבעל לעוני",
      "חיוב הבעל בהוצאות משפט כבדות"
    ],
    bottomLine: "הבטחנו ששנות העבודה הקשות של הלקוחה לא ירדו לטמיון לטובת צד שפעל בחוסר תום לב.",
    extendedDetails: "סעיף 8 לחוק יחסי ממון מאפשר סטייה מחלוקה שוויונית במקרים חריגים. במקרה זה, הוכחנו כי הבעל הסתיר הכנסות והציג מצג שווא של עוני. בית הדין קיבל את עמדתנו וקבע כי חלוקה שוויונית תהיה עוול משווע. הפנסיה והחסכונות של האישה נשמרו במלואם."
  },
  {
    id: "deceptive-trial",
    title: "\"דין מרומה\" בבית הדין הגדול",
    court: "בית הדין הרבני הגדול (ערעור)",
    courtIcon: Scale,
    challenge: "בעל הגיש ערעור רכושי תוך הסתרת נכסים, בניסיון לקבל חלוקה שוויונית שתאפשר לו לנגוס בפנסיה של האישה.",
    strategy: "חשיפת ה\"ידיים הלא נקיות\" של המערער והגדרת המקרה כ\"דין מרומה\" - ניסיון הונאה של בית הדין.",
    results: [
      "דחיית הערעור על הסף",
      "קביעה תקדימית של \"דין מרומה\"",
      "החמרת חיוב ההוצאות"
    ],
    bottomLine: "הניסיון המתוחכם \"לעקוץ\" את כספי הפנסיה נבלם בקיר ברזל משפטי שחשף את השקרים וההסתרות.",
    extendedDetails: "\"דין מרומה\" הוא מושג הלכתי שמשמעותו ניסיון לרמות את בית הדין. בית הדין הגדול קיבל את טענתנו וקבע כי הבעל הגיע לדיון ב\"ידיים לא נקיות\". זוהי קביעה תקדימית בבית הדין הרבני הגדול שתשמש אותנו ואחרים במקרים דומים בעתיד."
  },
  {
    id: "lawsuit-blocking",
    title: "חסימת תביעה של 800,000 ש\"ח",
    court: "בית המשפט לענייני משפחה",
    courtIcon: Shield,
    challenge: "גרוש הגיש תביעת פיצויים מופרכת על סך 811,000 ש\"ח במסגרת מסע רדיפה משפטי, במטרה לרושש את האישה.",
    strategy: "הגשת בקשה לחיוב בהפקדת ערובה להוצאות, תוך הוכחת אופיה הטורדני של התביעה והתנהלות התובע.",
    results: [
      "חיוב התובע להפקיד ערבות במזומן",
      "התובע נאלץ למחוק את התביעה",
      "חיסכון של שנים של הליכים יקרים"
    ],
    bottomLine: "חסמנו תביעת ענק עוד בטרם החלה וסיימנו את ה\"חגיגה\" הטורדנית במינימום זמן ומקסימום תוצאה.",
    extendedDetails: "תביעות טורדניות הן כלי נפוץ בסכסוכי גירושין קשים. במקום להיגרר לשנים של דיונים יקרים, הגשנו בקשה אסטרטגית לערובה להוצאות. כאשר התובע נדרש להוציא כסף מכיסו כתנאי להמשך ההליך, הוא הבין שמשחקו נגמר ומחק את התביעה. חסכנו ללקוחה עשרות אלפי שקלים ושנים של מתח."
  }
];

const ExpandedCaseCard = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const [isOpen, setIsOpen] = useState(true);
  const Icon = caseStudy.courtIcon;

  return (
    <Card className="bg-card border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
            <Icon className="h-6 w-6 text-gold" />
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground block">{caseStudy.court}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gold leading-tight">{caseStudy.title}</h2>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            האתגר המשפטי
          </h3>
          <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            האסטרטגיה המנצחת
          </h3>
          <p className="text-muted-foreground leading-relaxed">{caseStudy.strategy}</p>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-gold hover:text-gold hover:bg-gold/10"
            >
              <span>{isOpen ? "הסתר פרטים נוספים" : "הצג פרטים נוספים"}</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="pt-4">
            {caseStudy.extendedDetails && (
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-primary mb-2">רקע והקשר נוסף</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{caseStudy.extendedDetails}</p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold" />
            התוצאה המנצחת
          </h3>
          <ul className="space-y-3 mb-6">
            {caseStudy.results.map((result, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <span className="text-foreground">{result}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-gold/10 rounded-lg p-4 border-r-4 border-r-gold">
            <p className="text-foreground font-medium leading-relaxed">
              <strong className="text-gold">השורה התחתונה:</strong> {caseStudy.bottomLine}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CaseStudies = () => {
  return (
    <Layout>
      <SEO 
        title="תיקים לדוגמה - הצלחות המשרד"
        description="תיקי גירושין מורכבים שטופלו בהצלחה בבית המשפט ובבית הדין הרבני. מקרים אמיתיים המדגימים את הגישה האסטרטגית של המשרד."
        canonical="/case-studies"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-cream">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              תיקים לדוגמה – <span className="text-gold">הצלחות המשרד</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              מבחר מקרים אמיתיים המדגימים את הגישה האסטרטגית והתוצאות המרשימות שהמשרד משיג עבור לקוחותיו בערכאות השונות
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-gold" />
                בית המשפט המחוזי
              </span>
              <span className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-gold" />
                בית הדין הרבני
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gold" />
                בית המשפט לענייני משפחה
              </span>
            </div>
          </div>
        </section>

        {/* Cases Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {caseStudies.map((caseStudy) => (
                <ExpandedCaseCard key={caseStudy.id} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              מתמודדים עם אתגר משפטי דומה?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              כל מקרה הוא ייחודי, אך הגישה האסטרטגית נשארת זהה. צרו קשר לייעוץ ראשוני ונבחן יחד את האפשרויות שלכם.
            </p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary-foreground">
              <Link to="/contact" className="flex items-center gap-2">
                צרו קשר עכשיו
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CaseStudies;
