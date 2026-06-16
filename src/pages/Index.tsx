import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import WhyNowSection from "@/components/home/WhyNowSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <SEO canonical="/" />
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <WhyNowSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
