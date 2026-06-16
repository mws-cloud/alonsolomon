import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "בית" },
    { path: "/team", label: "המשרד" },
    { path: "/faq", label: "שאלות נפוצות גירושים" },
    { path: "/instant-consultation", label: "חבילת ייעוץ מיידי" },
    { path: "/guides", label: "מדריכים" },
    { path: "/press", label: "תקשורת" },
    { path: "/blog", label: "בלוג" },
    { path: "/career", label: "קריירה" },
    { path: "/contact", label: "בואו נדבר" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-dark/85 backdrop-blur-xl border-b border-gold/15 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
            : "bg-gradient-to-b from-dark/40 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center shrink-0 bg-white/95 rounded-sm px-2.5 py-1.5 border border-gold/20 hover:border-gold/50 transition-all duration-300"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.2)" }}
            >
              <img
                src="/alon-logo.webp"
                alt="אלון סולומון ושות' - עורכי דין"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-5 xl:gap-x-7 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative font-body text-[13px] xl:text-sm font-light tracking-wide whitespace-nowrap transition-colors duration-300 py-2 ${
                    isActive(item.path)
                      ? "text-gold"
                      : "text-[#FAF9F6]/85 hover:text-gold"
                  }`}
                >
                  {item.label}
                  <span
                    className={`pointer-events-none absolute -bottom-0.5 right-0 left-0 h-px bg-gold origin-center transition-transform duration-300 ${
                      isActive(item.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
              <a
                href="tel:077-5255923"
                className="hidden xl:flex items-center gap-2 text-[#FAF9F6]/70 hover:text-gold transition-colors duration-300 font-body text-sm font-light"
              >
                <Phone className="h-3.5 w-3.5" />
                <span dir="ltr">077-5255923</span>
              </a>
              <Link
                to="/contact"
                className="font-body text-[13px] xl:text-sm font-light px-5 xl:px-6 py-2.5 border border-gold text-gold bg-gold/5 hover:bg-gold hover:text-dark transition-all duration-300 rounded-none tracking-wide whitespace-nowrap"
              >
                לייעוץ ראשוני
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gold p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="תפריט"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-dark flex flex-col items-center justify-center">
          <button
            className="absolute top-6 left-6 text-gold p-2"
            onClick={() => setIsMenuOpen(false)}
            aria-label="סגור תפריט"
          >
            <X className="h-7 w-7" />
          </button>

          <div className="mb-10">
            <img src="/alon-logo.webp" alt="אלון סולומון ושות'" className="h-16 w-auto object-contain bg-white rounded-sm px-3 py-2 border border-gold/30" />
          </div>

          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-heading text-3xl font-light tracking-editorial transition-colors duration-300 ${
                  isActive(item.path) ? "text-gold" : "text-[#FAF9F6]/80 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href="tel:077-5255923"
              className="flex items-center gap-2 text-[#FAF9F6]/60 font-body text-sm"
            >
              <Phone className="h-4 w-4" />
              077-5255923
            </a>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="font-body text-sm px-8 py-3 border border-gold text-gold hover:bg-[rgba(201,168,76,0.12)] transition-all duration-300"
            >
              לייעוץ ראשוני
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
