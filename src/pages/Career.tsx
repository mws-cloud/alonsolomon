import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Briefcase, Mail } from "lucide-react";

const Career = () => {
  return (
    <Layout>
      <SEO
        title="קריירה – הצטרפו למשרד עו״ד אלון סולומון ושות׳"
        description="מחפשים את האתגר הבא? הצטרפו למשרד עורכי דין מוביל בתחום דיני משפחה וגירושין."
        canonical="/career"
      />

      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">קריירה</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            הצטרפו לצוות שלנו
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto leading-relaxed">
            אנו מחפשים אנשי מקצוע מוכשרים ומחויבים להצטרף למשרד המוביל בתחום דיני המשפחה
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      <section className="relative bg-cream py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="card-light rounded-sm p-10 border border-gold/10 text-center">
              <Briefcase className="h-10 w-10 text-gold mx-auto mb-6" strokeWidth={1} />
              <h2 className="font-heading text-2xl md:text-3xl font-light text-ink tracking-editorial mb-4">
                משרות פתוחות
              </h2>
              <p className="font-body text-sm font-light text-ink-muted leading-relaxed mb-8 max-w-lg mx-auto">
                כרגע אין משרות פתוחות. אנו מזמינים אתכם לשלוח קורות חיים ונשמח ליצור קשר כאשר תיפתח משרה מתאימה.
              </p>
              <a
                href="mailto:alon@a-solomon.com?subject=פנייה בנושא קריירה"
                className="inline-flex items-center gap-2 font-body text-sm font-light px-8 py-3 border border-gold text-gold bg-transparent hover:bg-[rgba(201,168,76,0.12)] transition-all duration-300 tracking-wide"
              >
                <Mail className="h-4 w-4" />
                שלחו קורות חיים
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Career;
