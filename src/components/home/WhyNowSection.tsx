import { AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Lightbulb,
    title: "ידע מקדים",
    description: "לדעת כבר היום את מצבך המשפטי, מה מומלץ לעשות, למה לשים לב וממה להיזהר",
  },
  {
    icon: TrendingUp,
    title: "יתרון משמעותי",
    description: "יתרון כזה יכול להיות Game Changer במיוחד כאשר ההליך מתנהל בבית הדין הרבני",
  },
  {
    icon: AlertTriangle,
    title: "מניעת טעויות",
    description: "טעות אסטרטגית בגירושין יכולה להיות ההבדל בין לצאת עם או בלי דירה למגורים",
  },
];

const WhyNowSection = () => {
  return (
    <section className="relative py-[120px] bg-cream">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label mb-6 block font-normal text-3xl">למה עכשיו</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-4">
              למה חשוב ייעוץ <span className="text-gold">לפני גירושין?</span>
            </h2>
            <p className="font-body text-base font-light text-ink-muted">
              הפעולה הראשונה: מעבירים את הכוח לידיים שלך! חשוב להבין, ידע הוא כוח.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-5 shadow-elegant group-hover:shadow-xl transition-all group-hover:-translate-y-1">
                  <reason.icon className="h-9 w-9 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <Lightbulb className="h-6 w-6 text-gold mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-heading text-xl font-light text-ink tracking-editorial mb-3">ידע מקדים</h3>
              <p className="font-body text-sm font-light text-ink-muted leading-relaxed">
                לדעת כבר היום את מצבך המשפטי, מה מומלץ לעשות, למה לשים לב וממה להיזהר
              </p>
            </div>

            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-gold mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-heading text-xl font-light text-ink tracking-editorial mb-3">יתרון משמעותי</h3>
              <p className="font-body text-sm font-light text-ink-muted leading-relaxed">
                יתרון כזה יכול להיות Game Changer במיוחד כאשר ההליך מתנהל בבית הדין הרבני
              </p>
            </div>

            <div className="text-center">
              <AlertTriangle className="h-6 w-6 text-gold mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-heading text-xl font-light text-ink tracking-editorial mb-3">מניעת טעויות</h3>
              <p className="font-body text-sm font-light text-ink-muted leading-relaxed">
                טעות אסטרטגית בגירושין יכולה להיות ההבדל בין לצאת עם או בלי דירה למגורים
              </p>
            </div>
          </div>

          <div className="card-light rounded-sm p-8 md:p-10 border-r-2 border-r-gold">
            <p className="font-body text-base font-light text-ink-muted leading-relaxed">
              <strong className="text-gold">חשוב להבין:</strong> גירושין הם העסקה הכי מורכבת ומשמעותית שתעשו, 
              הם נוגעים לכל היבט של חייכם ושל חיי הילדים שלכם. לא פעם מדובר בעסקה של מיליונים רבים - 
              שווי הדירה, החסכונות, קרנות ההשתלמות, הפנסיות, העסק, ותשלומי המזונות לאורך השנים.
            </p>
          </div>
        </div>
      </div>
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default WhyNowSection;
