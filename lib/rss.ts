export type WireArticle = {
  headline: string;
  summary: string;
  article_url: string;
  source: string;
  image_url?: string;
  published?: string;
};

function decodeEntities(text: string) {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/<[^>]+>/g, '')
    .trim();
}

function pickTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeEntities(match[1]) : '';
}

export function parseRssItems(xml: string, limit = 12): WireArticle[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  const articles: WireArticle[] = [];

  for (const block of items.slice(0, limit)) {
    const headline = pickTag(block, 'title');
    const summary = pickTag(block, 'description') || 'Read the original report for the full story.';
    const article_url = pickTag(block, 'link');
    const source = pickTag(block, 'source') || 'Wire';
    const published = pickTag(block, 'pubDate');
    const enclosure = block.match(/url="([^"]+)"/i);
    const media = block.match(/<media:content[^>]+url="([^"]+)"/i);
    const image_url = media?.[1] || enclosure?.[1];

    if (!headline || !article_url) continue;
    try {
      const target = new URL(article_url);
      if (!['http:', 'https:'].includes(target.protocol)) continue;
    } catch {
      continue;
    }

    articles.push({
      headline,
      summary: summary.slice(0, 280),
      article_url,
      source,
      image_url,
      published
    });
  }

  return articles;
}

export const WIRE_FEEDS = [
  { id: 'bbc', label: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
  { id: 'reuters', label: 'Reuters', url: 'https://feeds.reuters.com/reuters/worldNews' },
  { id: 'ap', label: 'Associated Press', url: 'https://rsshub.app/apnews/topics/apf-topnews' }
] as const;
