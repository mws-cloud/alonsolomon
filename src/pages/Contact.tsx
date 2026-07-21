import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    proceedings_started: "" as "" | "yes" | "no",
    is_represented: "" as "" | "yes" | "no",
    client_note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({ title: "שדות חובה", description: "אנא מלא/י שם וטלפון.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // מנוע ה-edge functions בשרת המנוהל (mws) שבור ("worker boot error"),
      // ולכן supabase.functions.invoke נכשל. שולחים ישירות לפונקציה בענן הישן
      // שעדיין חיה ושולחת את המייל לעו"ד (verify_jwt=false — אין צורך במפתח).
      // כשמנוע הפונקציות בשרת המנוהל יתוקן — אפשר לחזור ל-invoke.
      const res = await fetch(
        "https://emkrjhmlorbjqaltivpo.supabase.co/functions/v1/send-contact-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formType: "contact", ...formData }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (data as any)?.error) throw new Error((data as any)?.error || `HTTP ${res.status}`);

      toast({
        title: "הפנייה נשלחה",
        description: "תודה על פנייתך, נחזור אליך בהקדם.",
      });
      setFormData({ name: "", phone: "", email: "", message: "", proceedings_started: "", is_represented: "", client_note: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "שליחה נכשלה",
        description: "אירעה שגיאה. נסה/י שוב או צור/צרי קשר בטלפון.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const phoneNumber = "972535715552";
  const whatsappMessage = "שלום, אשמח לקבל ייעוץ משפטי בנושא גירושין";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Layout>
      <SEO 
        title="צור קשר"
        description="קביעת פגישת ייעוץ ראשונית במשרד בתל אביב. טלפון: 077-5255923. המגדל הצפוני, רחוב הארבעה 28, תל אביב."
        canonical="/contact"
      />

      {/* Hero */}
      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">נדבר</span>
          <h1 className="font-heading text-4xl md:text-6xl font-light leading-[1.2] tracking-editorial text-gold">
            צור קשר
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto">
            לייעוץ אישי עם עו״ד אלון סולומון
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Contact Content */}
      <section className="relative py-[100px] bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="card-light rounded-sm p-8 md:p-10">
              <h2 className="font-heading text-2xl font-light text-ink tracking-editorial mb-2">צריכים ייעוץ בגירושין ודיני משפחה?</h2>
              <p className="text-ink font-body text-sm font-light mb-8">ייעוץ משפטי ראשוני, אישי ודיסקרטי</p>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    שם מלא *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="הכנס את שמך"
                    className="w-full bg-transparent border-0 border-b border-gold/40 pb-3 text-ink font-body text-sm font-light placeholder:text-[#FAF9F6]/25 focus:outline-none focus:border-gold transition-colors duration-300 text-right"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    טלפון *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="050-0000000"
                    dir="ltr"
                    className="w-full bg-transparent border-0 border-b border-gold/40 pb-3 text-ink font-body text-sm font-light placeholder:text-[#FAF9F6]/25 focus:outline-none focus:border-gold transition-colors duration-300 text-right"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    אימייל
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    dir="ltr"
                    className="w-full bg-transparent border-0 border-b border-gold/40 pb-3 text-ink font-body text-sm font-light placeholder:text-[#FAF9F6]/25 focus:outline-none focus:border-gold transition-colors duration-300 text-right"
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    האם נפתחו הליכים משפטיים?
                  </label>
                  <div className="flex gap-6 text-ink font-body text-sm font-light">
                    {[
                      { v: "yes", l: "כן" },
                      { v: "no", l: "לא" },
                    ].map((o) => (
                      <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="proceedings_started"
                          value={o.v}
                          checked={formData.proceedings_started === o.v}
                          onChange={handleChange}
                          className="accent-gold"
                        />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    האם את/ה מיוצג/ת ע״י עו״ד אחר?
                  </label>
                  <div className="flex gap-6 text-ink font-body text-sm font-light">
                    {[
                      { v: "yes", l: "כן" },
                      { v: "no", l: "לא" },
                    ].map((o) => (
                      <label key={o.v} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="is_represented"
                          value={o.v}
                          checked={formData.is_represented === o.v}
                          onChange={handleChange}
                          className="accent-gold"
                        />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="client_note" className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    הערה קצרה (אופציונלי)
                  </label>
                  <input
                    id="client_note"
                    name="client_note"
                    value={formData.client_note}
                    onChange={handleChange}
                    placeholder="משהו שחשוב לך שנדע מראש"
                    maxLength={300}
                    className="w-full bg-transparent border-0 border-b border-gold/40 pb-3 text-ink font-body text-sm font-light placeholder:text-[#FAF9F6]/25 focus:outline-none focus:border-gold transition-colors duration-300 text-right"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-xs font-normal tracking-wide text-gold uppercase mb-3">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="ספר/י לנו במה נוכל לעזור..."
                    className="w-full bg-transparent border-0 border-b border-gold/40 pb-3 text-ink font-body text-sm font-light placeholder:text-[#FAF9F6]/25 focus:outline-none focus:border-gold transition-colors duration-300 text-right resize-none"
                  />
                </div>


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-body text-sm font-normal py-4 bg-gold text-dark hover:bg-gold-light transition-all duration-500 tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "שולח..." : "שליחה"}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-[rgba(201,168,76,0.15)]">
                <p className="text-center font-body text-xs font-light text-ink-muted mb-5">או צרו קשר ישיר:</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:077-5255923"
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#FAF9F6]/20 text-ink hover:text-gold hover:border-gold transition-all duration-300 font-body text-sm font-light"
                  >
                    <Phone className="h-4 w-4" />
                    077-5255923
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BA5C] text-white transition-all duration-300 font-body text-sm font-light"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="card-light rounded-sm p-8 md:p-10">
                <span className="section-label mb-8 block">פרטי המשרד</span>
                <div className="space-y-8">
                  {[
                    { icon: MapPin, title: "כתובת", content: "אלון סולומון ושות'\nהמגדל הצפוני קומה 5\nהארבעה 28, ת\"א-יפו", href: undefined },
                    { icon: Phone, title: "טלפון", content: "077-5255923", href: "tel:077-5255923", sub: "פקס: 077-5362173" },
                    { icon: Mail, title: "אימייל", content: "alon@a-solomon.com", href: "mailto:alon@a-solomon.com" },
                    { icon: Clock, title: "שעות פעילות", content: "ימים א׳-ה׳: 09:00-18:00", href: undefined },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <item.icon className="h-5 w-5 text-gold shrink-0 mt-0.5" strokeWidth={1} />
                      <div>
                        <h3 className="font-body text-xs font-normal tracking-wide text-gold uppercase mb-1">{item.title}</h3>
                        {item.href ? (
                          <a href={item.href} className="font-body text-sm font-light text-ink hover:text-gold transition-colors duration-300 whitespace-pre-line">
                            {item.content}
                          </a>
                        ) : (
                          <p className="font-body text-sm font-light text-ink whitespace-pre-line">{item.content}</p>
                        )}
                        {item.sub && <p className="font-body text-sm font-normal text-ink mt-1">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-sm border border-[rgba(201,168,76,0.15)]">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.0073456789!2d34.7842!3d32.0731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b9d9e0b0001%3A0x0!2sHaArba&#39;a%20St%2028%2C%20Tel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="מיקום המשרד"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
