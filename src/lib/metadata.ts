import ogs from 'open-graph-scraper';
import nodeFetch from 'node-fetch';

export interface Metadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  author?: string;
  type?: 'article' | 'video' | 'social' | 'other';
  duration?: number;
}

export async function getMetadata(url: string): Promise<Metadata> {
  const timeoutMs = 5000; // 5 second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Custom fetch wrapper with timeout and user-agent
    const customFetch = async (input: any) => {
      return nodeFetch(input, {
        signal: controller.signal as any,
        headers: {
          'User-Agent': 'DayOS-Bot/1.0 (+https://dayos.app)', // Identify ourselves
        }
      });
    };

    const options = { url, fetch: customFetch as any };
    // ogs doesn't support signal directly in options for all versions, but passing custom fetch wraps it
    const { result } = await ogs(options);
    clearTimeout(timeoutId);

    // Determine type
    let type: Metadata['type'] = 'other';
    if (result.ogType?.includes('video') || url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com')) {
      type = 'video';
    } else if (result.ogType?.includes('article')) {
      type = 'article';
    } else if (url.includes('twitter.com') || url.includes('x.com') || url.includes('reddit.com')) {
      type = 'social';
    }

    // Get favicon (using Google's service as reliable fallback)
    let domain = '';
    try {
      domain = new URL(url).hostname;
    } catch {
      domain = 'unknown'; // fallback if URL is weirdly malformed but ogs somehow worked
    }

    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    return {
      title: result.ogTitle || result.twitterTitle,
      description: result.ogDescription || result.twitterDescription,
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url,
      siteName: result.ogSiteName || domain,
      favicon,
      author: result.author,
      type,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Metadata fetch failed for ${url}:`, error);

    // SAFE FALLBACK - Never throw
    try {
      const u = new URL(url);
      return {
        title: 'Untitled Link',
        siteName: u.hostname,
        favicon: `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`,
        type: 'other'
      };
    } catch {
      // If even URL parsing fails, return bare minimum
      return {
        title: 'Invalid Link',
        type: 'other'
      };
    }
  }
}
