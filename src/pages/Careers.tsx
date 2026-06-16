import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import CTASection from "@/components/home/CTASection";
import { Mail } from "lucide-react";

const Careers = () => {
  return (
    <Layout>
      <SEO
        title="קריירה – הצטרפו לצוות"
        description="הצטרפו לצוות עורכי הדין של משרד אלון סולומון ושות׳. משרות פתוחות ואפשרויות התמחות בדיני משפחה."
        canonical="/careers"
      />

      {/* Hero */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">הצטרפו אלינו</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            קריירה
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto">
            הצטרפו לצוות מקצועי המתמחה בדיני משפחה
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Content */}
      <section className="relative py-[120px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-light text-dark tracking-editorial mb-4">
                לבנות קריירה עם המשרד
              </h2>
              <p className="font-body text-base font-light text-dark/60 leading-relaxed">
                אנו מחפשים עורכי דין ומתמחים עם תשוקה לדיני משפחה, יכולת ניתוח גבוהה ורצון לעבוד בסביבה מקצועית ותומכת.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { title: "עורך/ת דין – דיני משפחה", level: "ניסיון 2-5 שנים" },
                { title: "מתמחה/ת", level: "שנת התמחות" },
                { title: "מזכירה לשעות אחה\"צ", level: "ניסיון שנה לפחות" },
              ].map((job, i) => (
                <div key={i} className="border border-warm-gray/50 rounded-sm p-8 bg-white/50 gold-glow-hover flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-light text-dark tracking-editorial mb-1">{job.title}</h3>
                    <p className="font-body text-xs font-light text-dark/40">{job.level}</p>
                  </div>
                  <a
                    href="mailto:alon@a-solomon.com?subject=פנייה לגבי קריירה"
                    className="flex items-center gap-2 font-body text-sm font-light text-gold hover:text-gold-deep transition-colors duration-300"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1} />
                    שלח קורות חיים
                  </a>
                </div>
              ))}
            </div>

            <p className="font-body text-xs font-light text-dark/40 text-center mt-10">
              לפרטים נוספים ולשליחת קורות חיים:&nbsp;
              <a href="mailto:alon@a-solomon.com" className="text-gold hover:underline">
                alon@a-solomon.com
              </a>
            </p>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      <CTASection />
    </Layout>
  );
};

export default Careers;
