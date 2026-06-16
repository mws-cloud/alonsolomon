import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "רונית כהן",
    text: "עו\"ד סולומון ליווה אותי לאורך כל התהליך בצורה מקצועית ואמפתית. ההסברים היו ברורים והתוצאה הייתה מעל ומעבר למה שציפיתי.",
    rating: 5,
  },
  {
    name: "מאור שטרן",
    text: "הייעוץ המקדים שקיבלתי הציל אותי מטעויות קריטיות. הבנתי בדיוק את המצב המשפטי שלי וידעתי איך לפעול נכון.",
    rating: 5,
  },
  {
    name: "אסף גולן",
    text: "מקצועיות, זמינות ויחס אישי. עו\"ד סולומון והצוות שלו היו לצידי בכל שלב. ממליץ בחום לכל מי שעובר תהליך דומה.",
    rating: 5,
  },
  {
    name: "דנה לוי",
    text: "אחרי שנים של התמודדות מול בית הדין הרבני, אלון הצליח לסיים את התיק תוך חודשים ספורים. האסטרטגיה שלו הייתה מדויקת ויעילה.",
    rating: 5,
  },
  {
    name: "נועה ברקוביץ",
    text: "הגעתי במצב של פאניקה מוחלטת אחרי שהגרוש שלי הגיש תביעה מופרכת. עו\"ד סולומון הרגיע אותי והוביל למחיקת התביעה. מציל חיים.",
    rating: 5,
  },
  {
    name: "יואב מזרחי",
    text: "התמחות אמיתית בדיני משפחה. לא סתם עורך דין שעושה הכל - מומחה שמבין את כל הניואנסים ויודע לנצל אותם לטובתך.",
    rating: 5,
  },
  {
    name: "שירה קפלן",
    text: "הצלחנו לשנות את המשמורת לטובתי אחרי שאמרו לי שאין סיכוי. אלון לא ויתר אף פעם ונלחם על כל פרט. תודה אין סופית.",
    rating: 5,
  },
  {
    name: "תומר אביטל",
    text: "היחס האישי מרגיש כמו חבר שגם הוא עורך דין מבריק. תמיד זמין לשיחה, תמיד מסביר בסבלנות. שירות ברמה אחרת לגמרי.",
    rating: 5,
  },
  {
    name: "ענת הראל",
    text: "עברתי תהליך גירושין מורכב עם נכסים בחו\"ל. הידע של עו\"ד סולומון בתחום הבינלאומי היה קריטי להצלחה. קיבלתי הרבה מעבר למה שציפיתי.",
    rating: 5,
  },
  {
    name: "ליאת גרינברג",
    text: "הבעל לשעבר ניסה להסתיר כספים ונכסים. אלון חשף הכל בחקירה נגדית מרשימה. הרגשתי שיש לי לוחם אמיתי לצידי.",
    rating: 5,
  },
  {
    name: "הילה צדוק",
    text: "אחרי פגישת הייעוץ הראשונה כבר ידעתי שאני בידיים טובות. ההכנה לכל דיון הייתה מושלמת והתוצאות דיברו בעד עצמן.",
    rating: 5,
  },
  {
    name: "בן רוזנברג",
    text: "חסכתי מאות אלפי שקלים בזכות הטיפול של המשרד. ההשקעה בייצוג מקצועי החזירה את עצמה פי כמה וכמה.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-[120px] bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-label mb-6 block font-normal text-3xl">המלצות</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-dark tracking-editorial mb-4">
            מה אומרים <span className="text-gold">לקוחות</span>
          </h2>
          <p className="font-body font-light text-dark/50 text-center text-xl">
            ביקורת לקוחות המשרד לאורך השנים
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-warm-gray/60 rounded-sm p-8 gold-glow-hover bg-white/50">
              <span className="font-heading text-5xl text-gold/30 leading-none block mb-4">״</span>
              
              <p className="font-body text-sm font-light text-dark/70 mb-8 leading-relaxed">
                {testimonial.text}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-normal tracking-wide text-gold uppercase">{testimonial.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default TestimonialsSection;
