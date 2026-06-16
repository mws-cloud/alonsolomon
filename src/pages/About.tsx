import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Award, BookOpen, Users, Scale } from "lucide-react";
import alonSolomon from "@/assets/alon-solomon.jpg";

const About = () => {
  return (
    <Layout>
      <SEO 
        title='הכירו את עו״ד אלון סולומון – מייסד ושותף מנהל'
        description='עו״ד אלון סולומון, חבר לשכת עורכי הדין משנת 2000, בוגר בר-אילן (מצטיינים), MBA במימון מהעברית. 25 שנות ניסיון בדיני משפחה וגירושין.'
        canonical="/about"
      />

      {/* Hero */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">המשרד</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            הכירו את עו״ד אלון סולומון
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto leading-relaxed">
            חבר לשכת עורכי הדין משנת 2000, מביא עמו ניסיון משפטי עשיר של מעל ל-25 שנה והתמחות מוכחת בהשגת תוצאות יוצאות דופן
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Values Section */}
      <section className="relative py-[120px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-label mb-4 block">הערכים שלנו</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-dark tracking-editorial">
              הערכים שלנו
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Scale, title: "מקצועיות", text: "ידע משפטי מעמיק וניסיון רב בטיפול בתיקי גירושין מורכבים" },
              { icon: Users, title: "אמפתיה", text: "הבנה עמוקה של המורכבות הרגשית והתמיכה האישית הנדרשת" },
              { icon: Award, title: "דיסקרטיות", text: "שמירה מוחלטת על פרטיות הלקוח והסודיות המקצועית" },
            ].map((val, i) => (
              <div key={i} className="text-center p-8">
                <val.icon className="h-6 w-6 text-gold mx-auto mb-5" strokeWidth={1} />
                <h3 className="font-heading text-xl font-light text-dark tracking-editorial mb-3">{val.title}</h3>
                <p className="font-body text-sm font-light text-dark/50 leading-relaxed">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>
    </Layout>
  );
};

export default About;
