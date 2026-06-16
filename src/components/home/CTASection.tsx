import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const CTASection = () => {
  const whatsappUrl = `https://wa.me/972535715552?text=${encodeURIComponent("שלום, אשמח לקבל ייעוץ משפטי")}`;

  return (
    <section className="relative py-[120px] bg-dark">
      {/* Gold divider top */}
      <div className="gold-divider" />

      <div className="container mx-auto px-4 text-center relative z-10 pt-[120px]">
        <span className="section-label mb-6 block font-normal text-3xl">נדבר</span>

        <h2 className="font-heading text-4xl md:text-6xl font-light text-gold tracking-editorial mb-8">
          מוכנים לקחת את הצעד הראשון?
        </h2>

        <p className="font-body text-lg font-light text-[#FAF9F6]/50 mb-12 max-w-2xl mx-auto leading-relaxed">
          צרו קשר עוד היום לייעוץ ראשוני דיסקרטי. 
          אנחנו כאן כדי לתת לכם את הכלים והידע להתמודד עם המציאות החדשה.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/contact"
            className="inline-block font-body text-sm font-normal px-12 py-4 bg-gold text-dark hover:bg-gold-light transition-all duration-500 tracking-wide"
          >
            לייעוץ ראשוני
          </Link>
          <a
            href="tel:077-5255923"
            className="inline-flex items-center justify-center gap-2 font-body text-sm font-light px-10 py-4 border border-[#FAF9F6]/20 text-[#FAF9F6]/70 hover:text-gold hover:border-gold transition-all duration-500 tracking-wide"
          >
            <Phone className="h-4 w-4" />
            077-5255923
          </a>
        </div>

        <p className="mt-16 text-cream/80 font-body text-sm font-light tracking-wide">
          אלון סולומון ושות', המגדל הצפוני קומה 5, הארבעה 28 ת"א-יפו | פקס: 077-5362173
        </p>
      </div>
    </section>
  );
};

export default CTASection;
