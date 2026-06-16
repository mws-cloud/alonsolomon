import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import PressSection from "@/components/home/PressSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";

const Press = () => {
  return (
    <Layout>
      <SEO
        title="תקשורת – עו״ד אלון סולומון ושות׳"
        description="עו״ד אלון סולומון בכותרות – כתבות, ראיונות ופרסומים מקצועיים, לצד תיקים לדוגמה ותוצאות מוכחות של המשרד."
        canonical="/press"
      />

      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">תקשורת</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            עו״ד אלון סולומון בתקשורת
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto leading-relaxed">
            כתבות, ראיונות ופרסומים מקצועיים לצד תיקים לדוגמה ותוצאות מוכחות
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      <PressSection />
      <CaseStudiesSection />
    </Layout>
  );
};

export default Press;
