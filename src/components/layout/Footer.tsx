import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const whatsappUrl = `https://wa.me/972535715552?text=${encodeURIComponent("שלום, אשמח לקבל ייעוץ משפטי")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoBody = `שם: ${name}%0Aטלפון: ${phone}%0Aהודעה: ${message}`;
    window.location.href = `mailto:alon@a-solomon.com?subject=פנייה מהאתר&body=${mailtoBody}`;
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <footer className="bg-dark text-[#FAF9F6]">
      {/* Gold divider */}
      <div className="gold-divider" />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h3 className="font-heading text-2xl font-light text-gold tracking-editorial mb-4">עו״ד אלון סולומון ושות׳</h3>
            <p className="text-[#FAF9F6]/50 font-body font-light text-sm leading-relaxed">
              משרד עורכי דין המתמחה בדיני משפחה וגירושין. 
              אנו מספקים ליווי משפטי מלא ומקצועי לאורך כל ההליך.
            </p>
          </div>

          <div>
            <span className="section-label mb-6 block font-normal text-3xl">דברו איתנו</span>
            <h3 className="font-heading text-xl font-light text-cream tracking-editorial mb-2">צריכים ייעוץ בגירושין ודיני משפחה?</h3>
            <p className="text-cream/60 font-body text-sm font-light mb-6">ייעוץ משפטי ראשוני, אישי ודיסקרטי</p>
            <ul className="space-y-3">
              {[
                { to: "/about", label: "מי אנחנו" },
                { to: "/team", label: "הצוות" },
                { to: "/faq", label: "שאלות נפוצות גירושים" },
                { to: "/guides", label: "מדריכים" },
                { to: "/blog", label: "בלוג" },
                { to: "/career", label: "קריירה" },
                { to: "/contact", label: "בואו נדבר" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#FAF9F6]/50 hover:text-gold transition-colors duration-300 font-body text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="section-label mb-6 block font-normal text-3xl">יצירת קשר</span>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold/60 mt-0.5 shrink-0" />
                <span className="text-[#FAF9F6]/50 font-body text-sm font-light whitespace-pre-line">
                  {"אלון סולומון ושות'\nהמגדל הצפוני קומה 5\nהארבעה 28, ת\"א-יפו"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold/60 shrink-0" />
                <a href="tel:077-5255923" className="text-[#FAF9F6]/50 hover:text-gold transition-colors duration-300 font-body text-sm font-light">
                  077-5255923
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold/60 shrink-0" />
                <a href="mailto:alon@a-solomon.com" className="text-[#FAF9F6]/50 hover:text-gold transition-colors duration-300 font-body text-sm font-light">
                  alon@a-solomon.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gold/60 shrink-0" />
                <span className="text-[#FAF9F6]/50 font-body text-sm font-light">
                  א׳-ה׳ 09:00-18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="gold-divider mt-16 mb-8" />
        <div className="text-center">
          <p className="text-[#E8E4DC]/40 font-body text-xs font-light tracking-wide">
            © {new Date().getFullYear()} משרד עו״ד אלון סולומון ושות׳. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
