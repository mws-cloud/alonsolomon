const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VimeoVideo {
  uri: string;
  name: string;
  description: string | null;
  duration: number;
  created_time: string;
  pictures?: { sizes?: Array<{ width: number; link: string }> };
  player_embed_url?: string;
}

interface VimeoResponse {
  data: VimeoVideo[];
  paging: { next: string | null };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const token = Deno.env.get('VIMEO_ACCESS_TOKEN');
  if (!token) {
    return new Response(JSON.stringify({ error: 'VIMEO_ACCESS_TOKEN is not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const all: VimeoVideo[] = [];
    let url: string | null =
      'https://api.vimeo.com/me/videos?per_page=100&sort=date&direction=desc&fields=uri,name,description,duration,created_time,pictures.sizes,player_embed_url';

    while (url) {
      const res: Response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
        },
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Vimeo API ${res.status}: ${text}`);
      }
      const json: VimeoResponse = await res.json();
      all.push(...json.data);
      url = json.paging?.next ? `https://api.vimeo.com${json.paging.next}` : null;
    }

    const cleanTitle = (raw: string) => {
      let t = raw.replace(/\.(mp4|mov|m4v|webm|avi)$/i, '');
      t = t.replace(/-?video-export-\d{4}-\d{2}-\d{2}T[\d-]+\.\d+Z$/i, '');
      t = t.replace(/^[*\s]+/, '').trim();
      return t;
    };

    const videos = all.map((v) => {
      const id = v.uri.split('/').pop() ?? '';
      const sizes = v.pictures?.sizes ?? [];
      const thumb = sizes.length ? sizes[sizes.length - 1].link : null;
      return {
        id,
        title: cleanTitle(v.name),
        description: v.description,
        duration: v.duration,
        createdAt: v.created_time,
        thumbnail: thumb,
        embedUrl: v.player_embed_url ?? `https://player.vimeo.com/video/${id}`,
      };
    });

    return new Response(JSON.stringify({ videos }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('vimeo-videos error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
