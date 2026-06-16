import { Link } from "react-router-dom";
import { Shield, Scale, Users, Phone, MessageCircle } from "lucide-react";
import dnbBadge from "@/assets/dnb.webp";
import alonSolomon from "@/assets/alon-solomon.jpg";

const HeroSection = () => {
  const whatsappUrl = `https://wa.me/972535715552?text=${encodeURIComponent("שלום, אשמח לקבל ייעוץ משפטי בנושא גירושין")}`;

  return (
    <section className="relative min-h-screen flex items-center bg-dark overflow-hidden noise-overlay hero-glow">
      <div className="container mx-auto px-4 py-28 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 text-center lg:text-right">
            {/* Section label */}
            <div className="animate-fade-in mb-6" style={{ animationDelay: "0.1s" }}>
              <span className="section-label">משרד עורכי דין | דיני משפחה</span>
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-editorial mb-6" style={{ animationDelay: "0.2s" }}>
              <span className="text-[#FAF9F6]">משרד עו״ד אלון סולומון ושות׳</span>
              <span className="block text-gold mt-3">מומחיות בדיני משפחה, גירושין וניהול הון</span>
            </h1>

            {/* Subheading */}
            <p className="animate-fade-in font-body text-base md:text-lg font-light text-[#FAF9F6]/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ animationDelay: "0.4s" }}>
              ניסיון משפטי עשיר של מעל ל-25 שנה והתמחות מוכחת בהשגת תוצאות יוצאות דופן
            </p>

            {/* CTAs */}
            <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10" style={{ animationDelay: "0.6s" }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-normal px-10 py-4 bg-gold text-dark hover:bg-gold-light transition-all duration-500 tracking-wide"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                לתיאום פגישת ייעוץ
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-body text-sm font-light px-10 py-4 border border-gold text-gold bg-transparent hover:bg-[rgba(201,168,76,0.12)] transition-all duration-500 tracking-wide"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                שיחת וואטסאפ
              </a>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="glass-panel rounded-sm p-4 text-center gold-glow-hover">
                <Scale className="h-5 w-5 text-gold mb-2 mx-auto" strokeWidth={1} />
                <h3 className="font-body text-xs font-light text-[#FAF9F6]/80 tracking-wide">מעל 25+ שנות ניסיון</h3>
              </div>
              <div className="glass-panel rounded-sm p-4 text-center gold-glow-hover">
                <Shield className="h-5 w-5 text-gold mb-2 mx-auto" strokeWidth={1} />
                <h3 className="font-body text-xs font-light text-[#FAF9F6]/80 tracking-wide">תוצאות חדות ויעילות</h3>
              </div>
              <div className="glass-panel rounded-sm p-4 text-center gold-glow-hover">
                <Users className="h-5 w-5 text-gold mb-2 mx-auto" strokeWidth={1} />
                <h3 className="font-body text-xs font-light text-[#FAF9F6]/80 tracking-wide">ניהול הליך מדויק ויעיל</h3>
              </div>
            </div>

            {/* D&B Badge */}
            <div className="animate-fade-in mt-10 flex items-center justify-center gap-5" style={{ animationDelay: "1s" }}>
              <img
                src={dnbBadge}
                alt="D&B – הסמכת איכות עסקית"
                className="h-24 w-auto object-contain opacity-90"
                loading="lazy"
              />
              <div className="h-16 w-px bg-gold/30" />
              <p className="font-body text-sm font-light text-[#FAF9F6]/60 tracking-wide leading-relaxed">
                דירוג איתנות<br />עסקית D&amp;B
              </p>
            </div>
          </div>

          {/* Portrait column */}
          <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="relative max-w-sm mx-auto lg:max-w-md">
              {/* Soft gold glow halo behind */}
              <div className="absolute inset-0 -m-6 bg-gold/10 blur-3xl rounded-full pointer-events-none" />

              {/* Decorative offset gold frame */}
              <div className="absolute -top-5 -right-5 w-full h-full border border-gold/50 rounded-sm pointer-events-none hidden md:block" />

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-gold pointer-events-none z-20" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b border-r border-gold pointer-events-none z-20" />

              {/* Image frame */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-dark shadow-2xl">
                <img
                  src={alonSolomon}
                  alt="עו״ד אלון סולומון – מומחה לדיני משפחה וגירושין"
                  className="w-full h-full object-cover object-top contrast-[1.08] brightness-105"
                  loading="eager"
                />
                {/* Subtle gradient for nameplate legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

                {/* Inner gold border */}
                <div className="absolute inset-0 border border-gold/20 pointer-events-none" />

                {/* Nameplate */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <div className="w-10 h-px bg-gold mx-auto mb-3" />
                  <p className="font-heading text-xl font-light text-[#FAF9F6] tracking-editorial">
                    עו״ד אלון סולומון
                  </p>
                  <p className="font-body text-[11px] uppercase tracking-[0.25em] text-gold mt-2">
                    מייסד ושותף מנהל
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
