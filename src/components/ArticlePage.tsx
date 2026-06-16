import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

interface ArticleSection {
  title: string;
  content: ReactNode;
}

interface ArticlePageProps {
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  heroTitle: string;
  heroSubtitle?: string;
  sections: ArticleSection[];
  ctaTitle: string;
  ctaText: string;
}

const ArticlePage = ({ seo, heroTitle, heroSubtitle, sections, ctaTitle, ctaText }: ArticlePageProps) => {
  return (
    <Layout>
      <SEO title={seo.title} description={seo.description} canonical={seo.canonical} />
      
      {/* Hero */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">מדריך מקצועי</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-6xl font-light leading-[1.2] tracking-editorial max-w-4xl mx-auto text-[#FAF9F6]">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-8 max-w-3xl mx-auto leading-relaxed">
              {heroSubtitle}
            </p>
          )}
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Article sections — alternating cream / dark */}
      {sections.map((section, index) => {
        const isDark = index % 2 !== 0;
        return (
          <section
            key={index}
            className={`relative py-[80px] md:py-[100px] ${isDark ? "bg-midnight noise-overlay" : "bg-cream"}`}
          >
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className={`font-heading text-2xl md:text-4xl font-light tracking-editorial mb-8 ${isDark ? "text-[#FAF9F6]" : "text-dark"}`}>
                  {section.title}
                </h2>
                <div className={`prose prose-lg max-w-none leading-relaxed space-y-4 font-body font-light ${isDark ? "text-[#FAF9F6]/70 prose-strong:text-gold" : "text-dark/70 prose-strong:text-dark"}`}>
                  {section.content}
                </div>
              </div>
            </div>
            <div className="gold-divider absolute bottom-0 left-0 right-0" />
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="relative py-[120px] bg-dark noise-overlay">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-gold tracking-editorial mb-6">{ctaTitle}</h2>
          <p className="font-body text-base font-light text-[#FAF9F6]/50 mb-12 max-w-2xl mx-auto leading-relaxed">{ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="inline-block font-body text-sm font-normal px-12 py-4 bg-gold text-dark hover:bg-gold-light transition-all duration-500 tracking-wide"
            >
              לתיאום פגישת ייעוץ
            </Link>
            <a
              href="tel:077-5255923"
              className="inline-flex items-center justify-center gap-2 font-body text-sm font-light px-10 py-4 border border-[#FAF9F6]/20 text-[#FAF9F6]/70 hover:text-gold hover:border-gold transition-all duration-500 tracking-wide"
            >
              <Phone className="h-4 w-4" />
              077-5255923
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticlePage;
