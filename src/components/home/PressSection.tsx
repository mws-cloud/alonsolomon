import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import press1 from "@/assets/press_screenshots/1.jpg";
import press2 from "@/assets/press_screenshots/2.jpg";
import press3 from "@/assets/press_screenshots/3.jpg";
import press4 from "@/assets/press_screenshots/4.jpg";

interface PressArticle {
  id: string;
  source: string;
  sourceColor: string;
  date: string;
  title: string;
  summary: string;
  quote?: string;
  url: string;
  image?: string;
}

const pressArticles: PressArticle[] = [
  {
    id: "calcalist-alimony",
    source: "כלכליסט",
    sourceColor: "bg-orange-500",
    date: "22.07.2020",
    title: "החלטה נדירה: ביהמ\"ש המחוזי התערב במזונות זמניים שהוטלו על אב – והפחית אותם",
    summary: "השופטת ורדה פלאוט קיבלה בקשת רשות ערעור של גבר, הפחיתה את החיוב במזונות שהוטל עליו ומתחה ביקורת על כך שבית המשפט למשפחה לא קבע דיון דחוף.",
    quote: "ההחלטה היא עקרונית וסביר להניח שייעשה בה שימוש במקרים נוספים",
    url: "https://www.calcalist.co.il/local/articles/0,7340,L-3841077,00.html",
    image: press1
  },
  {
    id: "globes-property",
    source: "גלובס",
    sourceColor: "bg-blue-600",
    date: "02.08.2021",
    title: "הנכס רשום על שם בן הזוג? בתנאים האלו תוכלו לקבל חצי ממנו בגירושים",
    summary: "מאמר מאת עו״ד סולומון על חזקת השיתוף וזכויות בנכסים שנרכשו לפני הנישואים.",
    url: "https://www.globes.co.il/news/article.aspx?did=1001380127",
    image: press2
  },
  {
    id: "walla-hightech",
    source: "Walla",
    sourceColor: "bg-green-600",
    date: "11.10.2021",
    title: "אקזיט לגירושים: כשהכסף הגדול מפרק משפחות בהייטק",
    summary: "כתבה על התופעה של גירושים בעקבות אקזיט בהייטק. עו\"ד סולומון מנתח את הקשר בין הצלחה כלכלית פתאומית למשברים זוגיים.",
    quote: "אחד מכל חמישה הייטקיסטים שנפל עליהם סכום כסף גדול מאוד התגרשו או נקלעו למשבר זוגי חריף",
    url: "https://www.sheee.co.il/item/3454908",
    image: press3
  },
  {
    id: "mako-cannabis",
    source: "mako",
    sourceColor: "bg-red-600",
    date: "28.07.2021",
    title: "אני מעשן קנאביס - האם זה עלול לפגוע בי במהלך הליך הגירושים?",
    summary: "מדריך משפטי מאת עו״ד סולומון על ההשלכות של שימוש בקנאביס על הליכי גירושין, משמורת ילדים וחלוקת רכוש.",
    url: "https://www.mako.co.il/cannabis-guides/Article-78d351e05beda71027.htm",
    image: press4
  }
];

const PressSection = () => {
  return (
    <section className="relative py-[120px] bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="section-label mb-6 block font-normal text-3xl">בתקשורת</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-dark tracking-editorial">
            עו״ד אלון סולומון בכותרות
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pressArticles.map((article) => (
            <div
              key={article.id}
              className="border border-warm-gray/60 rounded-sm overflow-hidden flex flex-col gold-glow-hover bg-white/50"
            >
              {article.image && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/9] overflow-hidden bg-warm-gray/20 border-b border-warm-gray/60 group"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </a>
              )}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-body text-xs font-normal tracking-wide text-gold uppercase">
                  {article.source}
                </span>
                <span className="text-[#E8E4DC]">·</span>
                <span className="font-body text-xs font-light text-dark/40">{article.date}</span>
              </div>

              <h3 className="font-heading text-xl font-light text-dark tracking-editorial mb-4 leading-tight line-clamp-2">
                {article.title}
              </h3>

              <p className="font-body text-sm font-light text-dark/60 mb-5 leading-relaxed line-clamp-3 flex-grow">
                {article.summary}
              </p>

              {article.quote && (
                <div className="border-r-2 border-r-gold pr-4 mb-5">
                  <p className="font-body text-sm font-light text-dark/70 italic">
                    ״{article.quote}״
                  </p>
                </div>
              )}

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-deep transition-colors duration-300 font-body text-sm font-light mt-auto"
              >
                לכתבה המלאה
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            </div>
          ))}
        </div>
      </div>
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default PressSection;
