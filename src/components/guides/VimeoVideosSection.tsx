import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play } from "lucide-react";

interface VimeoVideo {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  createdAt: string;
  thumbnail: string | null;
  embedUrl: string;
}

const formatDuration = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const VimeoVideosSection = () => {
  const [videos, setVideos] = useState<VimeoVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.functions.invoke("vimeo-videos");
      if (cancelled) return;
      if (error) {
        setError(error.message);
      } else if (data?.videos) {
        setVideos(data.videos);
      } else if (data?.error) {
        setError(data.error);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative py-[80px] md:py-[100px] bg-cream">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-label mb-6 block font-normal text-3xl">סרטונים</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-ink tracking-editorial mb-4">
            צפו ב<span className="text-gold">הסברים המקצועיים</span> שלנו
          </h2>
          <p className="font-body text-base font-light text-ink-muted leading-relaxed">
            תוכן וידאו עדכני בנושאי דיני משפחה, גירושין, משמורת ורכוש
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video bg-white/60 border border-gold/15 rounded-sm animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center font-body text-sm text-ink-muted">לא ניתן לטעון את הסרטונים כרגע.</p>
        )}

        {!loading && !error && videos.length === 0 && (
          <p className="text-center font-body text-sm text-ink-muted">אין סרטונים להצגה כרגע.</p>
        )}

        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {videos.map((video) => (
              <article
                key={video.id}
                className="card-light rounded-sm overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  {activeId === video.id ? (
                    <iframe
                      src={`${video.embedUrl}?autoplay=1&title=0&byline=0&portrait=0`}
                      title={video.title}
                      loading="lazy"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveId(video.id)}
                      aria-label={`הפעל סרטון: ${video.title}`}
                      className="absolute inset-0 w-full h-full"
                    >
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-16 w-16 rounded-full bg-gold/95 text-ink flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-7 w-7 ms-1" fill="currentColor" strokeWidth={0} />
                        </span>
                      </span>
                      {video.duration > 0 && (
                        <span className="absolute bottom-3 left-3 font-body text-xs font-light text-white bg-black/60 px-2 py-1 rounded-sm" dir="ltr">
                          {formatDuration(video.duration)}
                        </span>
                      )}
                    </button>
                  )}
                </div>
                <div className="p-5 md:p-6 flex-grow flex flex-col">
                  <h3 className="font-heading text-lg md:text-xl font-light text-ink tracking-editorial leading-snug mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="font-body text-sm font-light text-ink-muted leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default VimeoVideosSection;
