import { Link } from "react-router-dom";
import { FileText, Target, Map } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "הבינו מה אומר החוק",
    description: "תמונת מצב מקיפה לגבי כל היבטי הגירושין: מזונות, חלוקת רכוש, זמני שהות עם הילדים, ועוד.",
    highlights: ["אומדן לגובה המזונות", "חלוקת זמני שהייה", "חלוקת הרכוש והנכסים"],
    step: "01",
  },
  {
    icon: Target,
    title: "האסטרטגיה לפעולה הנכונה",
    description: "המלצות מבוססות ניסיון רב בטיפול במקרים קודמים. הבנה אמיתית של מה נכון עבורך.",
    highlights: ["מרוץ הסמכויות", "סיכויי הסכם", "בית דין רבני או משפט"],
    step: "02",
  },
  {
    icon: Map,
    title: "מפת דרכים מותאמת אישית",
    description: "מפת דרכים מפורטת עם המלצות ברורות, תרשימי זרימה וסרטונים להמחשה.",
    highlights: ["תוכנית פעולה ברורה", "תרשימי זרימה", "ליווי שלב אחר שלב"],
    step: "03",
  },
];

const ServicesPreview = () => {
  return (
    <section className="relative py-[120px] bg-cream">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-6 block font-normal text-3xl">השירותים שלנו</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-6">
            חבילת הייעוץ כוללת <span className="text-gold">3 מרכיבים עיקריים</span>
          </h2>
          <p className="font-body text-base font-light text-ink-muted max-w-2xl mx-auto leading-relaxed">
            הייעוץ יסייע לך בסימון והגדרת מטרות מציאותיות, ובקבלת החלטות פרקטיות ויעילות לגבי המשך היחסים.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-light rounded-sm p-8 gold-glow-hover"
            >
              <service.icon className="h-6 w-6 text-gold mb-6" strokeWidth={1} />
              <h3 className="font-heading text-2xl font-light text-ink tracking-editorial mb-4">{service.title}</h3>
              <p className="font-body text-sm font-light text-ink-muted mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2.5">
                {service.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-body text-sm font-light text-ink-muted">
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-block font-body text-sm font-light px-10 py-4 border border-gold text-gold bg-transparent hover:bg-[rgba(201,168,76,0.12)] transition-all duration-500 tracking-wide"
          >
            לפרטים נוספים על השירותים
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
