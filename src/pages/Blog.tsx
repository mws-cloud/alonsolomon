import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Mic, Music2 } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "כיצד להתכונן להליך גירושין – המדריך המלא",
      excerpt: "טיפים מעשיים והמלצות מקצועיות להכנה מושכלת לקראת הליך גירושין.",
      date: "2026-04-10",
      slug: "#",
    },
    {
      title: "זכויות הורים בבית המשפט לענייני משפחה",
      excerpt: "סקירה של זכויות הורים והשפעתן על הסדרי משמורת וחלוקת זמני שהות.",
      date: "2026-03-25",
      slug: "#",
    },
    {
      title: "חלוקת רכוש בגירושין – מה חשוב לדעת",
      excerpt: "כל מה שצריך לדעת על חלוקת נכסים, פנסיה וזכויות כלכליות בהליך גירושין.",
      date: "2026-03-12",
      slug: "#",
    },
  ];

  return (
    <Layout>
      <SEO
        title="בלוג – עו״ד אלון סולומון ושות׳"
        description="מאמרים ותובנות מקצועיות בתחום דיני משפחה, גירושין וירושה ממשרד עו״ד אלון סולומון ושות׳."
        canonical="/blog"
      />

      <section className="relative bg-dark noise-overlay hero-glow pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-label mb-6 block font-normal text-3xl">בלוג</span>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-editorial text-[#FAF9F6]">
            מאמרים ותובנות מקצועיות
          </h1>
          <p className="font-body text-base md:text-lg font-light text-[#FAF9F6]/50 mt-6 max-w-2xl mx-auto leading-relaxed">
            תוכן מקצועי ועדכני בתחום דיני משפחה וגירושין
          </p>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* Podcast & Social Section */}
      <section className="relative bg-cream py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-label mb-4 block">פודקאסט · רשתות חברתיות</span>
              <h2 className="font-heading text-3xl md:text-5xl font-light text-ink tracking-editorial mb-6">
                סודות הגירושין
              </h2>
              <p className="font-body text-base md:text-lg font-light text-ink-muted leading-relaxed max-w-3xl mx-auto">
                פודקאסט שמדבר על מה שקורה באמת כשזוגיות מתפרקת — לא רק החוק והמסמכים, אלא הרגשות, הפחדים, ההחלטות והמחיר.
                אני אלון סולומון, עו״ד לגירושין מעל 20 שנה, ובכל פרק נצלול לרגעים שאף אחד לא מכין אליהם: איך יודעים שזה
                נגמר, איך בוחרים עורך דין נכון, האם אפשר להיפרד בלי מלחמה, ומה עושים כדי לשמור על הילדים ועל עצמנו.
                בלי מסכות, בלי סיסמאות — אמת נקייה ומעשית למי שעומד מול אחת ההחלטות המשמעותיות בחייו.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Spotify */}
              <a
                href="https://open.spotify.com/show/0fbCU7fGyAMQ7u21nnQnrE?si=qdvLeQh2Rg62zqL-Xtz_TQ"
                target="_blank"
                rel="noopener noreferrer"
                className="card-light rounded-sm p-8 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E355E] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105">
                  <Mic className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-light text-ink tracking-editorial mb-2">
                  האזינו בספוטיפיי
                </h3>
                <p className="font-body text-sm font-light text-ink-muted leading-relaxed mb-5">
                  הפרקים המלאים של “סודות הגירושין” — זמינים להאזנה חינם
                </p>
                <span className="btn-primary">לעמוד הפודקאסט</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@alonsolomonlawyer"
                target="_blank"
                rel="noopener noreferrer"
                className="card-light rounded-sm p-8 flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E355E] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105">
                  <Music2 className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-light text-ink tracking-editorial mb-2">
                  עקבו בטיקטוק
                </h3>
                <p className="font-body text-sm font-light text-ink-muted leading-relaxed mb-5">
                  טיפים קצרים, תובנות מהשטח ותשובות לשאלות הכי נפוצות בדיני משפחה
                </p>
                <span className="btn-secondary">@alonsolomonlawyer</span>
              </a>
            </div>
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>

      <section className="relative bg-cream py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {posts.map((post, i) => (
              <article key={i} className="card-light rounded-sm p-8">
                <time className="text-gold-deep font-body text-xs font-light">{post.date}</time>
                <h2 className="font-heading text-xl md:text-2xl font-light text-ink tracking-editorial mt-2 mb-3">
                  {post.title}
                </h2>
                <p className="font-body text-sm font-light text-ink-muted leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="gold-divider absolute bottom-0 left-0 right-0" />
      </section>
    </Layout>
  );
};

export default Blog;
