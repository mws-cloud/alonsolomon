import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "972535715552";
  const message = "שלום, אשמח לקבל ייעוץ משפטי בנושא גירושין";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-[60] flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-3 py-3 md:px-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
      style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
      aria-label="צור קשר בוואטסאפ"
    >
      <MessageCircle className="h-6 w-6 md:h-5 md:w-5 fill-current" />
      <span className="hidden md:inline font-body text-sm font-light">WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
