import { Link } from "react-router-dom";
import { FileText, Target, Map, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

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

const InstantConsultation = () => {
  return (
    <Layout>
      <SEO
        title="חבילת ייעוץ מיידי – עו״ד אלון סולומון"
        description="חבילת ייעוץ מיידי בדיני משפחה וגירושין. שלושה מרכיבים מובילים: הבנת החוק, אסטרטגיה מותאמת אישית, ומפת דרכים מעשית. פגישה תוך 24-48 שעות."
        canonical="/instant-consultation"
      />

      {/* Hero */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">פתרון מיידי</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            חבילת ייעוץ <span className="text-gold">מיידי</span>
          </h1>
          <p className="font-body text-[1.2rem] md:text-[1.35rem] font-light text-[#FAF9F6]/60 mt-6 max-w-2xl mx-auto leading-relaxed">
            ייעוץ מקצועי מקיף תוך 24-48 שעות. מידע ברור, אסטרטגיה חדה, ומפת דרכים מעשית — בדיוק ברגע שבו אתם צריכים אותה.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="tel:077-5255923"
              className="inline-flex items-center gap-2 font-body text-sm font-light px-8 py-3.5 bg-gold text-dark hover:bg-gold-deep transition-all duration-500 tracking-wide"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              077-5255923
            </a>
            <a
              href="https://wa.me/972535715552"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm font-light px-8 py-3.5 border border-gold text-gold bg-transparent hover:bg-[rgba(201,168,76,0.12)] transition-all duration-500 tracking-wide"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              שלחו וואטסאפ
            </a>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* About the firm — moved to home page */}

      {/* 3 components */}
      <section className="relative py-[120px] bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block text-[0.9rem]">מה כוללת החבילה</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-6">
              חבילת הייעוץ כוללת <span className="text-gold-deep">3 מרכיבים עיקריים</span>
            </h2>
            <p className="font-body text-[1.2rem] font-light text-ink-muted max-w-2xl mx-auto leading-relaxed">
              הייעוץ יסייע לך בסימון והגדרת מטרות מציאותיות, ובקבלת החלטות פרקטיות ויעילות לגבי המשך היחסים.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="card-light rounded-sm p-8">
                <service.icon className="h-6 w-6 text-gold mb-6" strokeWidth={1} />
                <h3 className="font-heading text-[1.8rem] font-light text-ink tracking-editorial mb-4">{service.title}</h3>
                <p className="font-body text-[1.05rem] font-light text-ink-muted mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-body text-[1.05rem] font-light text-ink/80">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services" className="btn-secondary">
              לפרטים נוספים על השירותים
            </Link>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>


      {/* What you get */}
      <section className="relative py-[120px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label mb-4 block text-dark/60 text-[0.9rem]">למה עכשיו</span>
              <h2 className="font-heading text-3xl md:text-5xl font-light text-dark tracking-editorial mb-6">
                זמן הוא המשאב היקר ביותר
              </h2>
              <p className="font-body text-[1.2rem] font-light text-dark/60 max-w-2xl mx-auto leading-relaxed">
                בהליכי משפחה, כל יום משנה. ייעוץ מיידי מקצועי יחסוך לך טעויות יקרות — כלכלית ורגשית.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: "24-48 שעות", sub: "זמן תגובה לפנייה" },
                { icon: FileText, title: "מפת דרכים בכתב", sub: "תיעוד מלא לשימוש עתידי" },
                { icon: Target, title: "המלצות מעשיות", sub: "מותאמות למצב הספציפי שלך" },
              ].map((item, i) => (
                <div key={i} className="border border-warm-gray/60 rounded-sm p-8 bg-white/60 text-center">
                  <item.icon className="h-6 w-6 text-gold mx-auto mb-4" strokeWidth={1} />
                  <h3 className="font-heading text-2xl font-light text-dark tracking-editorial mb-1">{item.title}</h3>
                  <p className="font-body text-[1.05rem] font-light text-dark/50">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Instant contact CTA */}
      <section className="relative py-[120px] bg-cream">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-label mb-4 block text-[0.9rem]">יצירת קשר מיידית</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-6">
              קבעו פגישה <span className="text-gold">עכשיו</span>
            </h2>
            <p className="font-body text-[1.2rem] font-light text-ink max-w-xl mx-auto leading-relaxed mb-10">
              בחרו את הערוץ הנוח לכם — אנחנו נחזור אליכם תוך 24 שעות לקביעת מועד לייעוץ.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <a
                href="tel:077-5255923"
                className="card-light rounded-sm p-6 gold-glow-hover flex flex-col items-center gap-3"
              >
                <Phone className="h-6 w-6 text-gold" strokeWidth={1} />
                <div>
                  <p className="font-body text-[0.9rem] font-light text-ink-muted mb-1">טלפון</p>
                  <p className="font-body text-[1.05rem] text-ink">077-5255923</p>
                </div>
              </a>
              <a
                href="https://wa.me/972535715552"
                target="_blank"
                rel="noopener noreferrer"
                className="card-light rounded-sm p-6 gold-glow-hover flex flex-col items-center gap-3"
              >
                <MessageCircle className="h-6 w-6 text-gold" strokeWidth={1} />
                <div>
                  <p className="font-body text-[0.9rem] font-light text-ink-muted mb-1">וואטסאפ</p>
                  <p className="font-body text-[1.05rem] text-ink">הודעה מיידית</p>
                </div>
              </a>
              <a
                href="mailto:alon@a-solomon.com"
                className="card-light rounded-sm p-6 gold-glow-hover flex flex-col items-center gap-3"
              >
                <Mail className="h-6 w-6 text-gold" strokeWidth={1} />
                <div>
                  <p className="font-body text-[0.9rem] font-light text-ink-muted mb-1">מייל</p>
                  <p className="font-body text-[1.05rem] text-ink">alon@a-solomon.com</p>
                </div>
              </a>
            </div>

            <Link
              to="/contact"
              className="inline-block font-body text-sm font-light px-10 py-4 bg-gold text-dark hover:bg-gold-deep transition-all duration-500 tracking-wide"
            >
              למילוי טופס יצירת קשר מלא
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InstantConsultation;
