import dns from 'node:dns/promises';
import net from 'node:net';
import { NextRequest, NextResponse } from 'next/server';

const cache = new Map<string, { image: string | null; expires: number }>();
const TTL = 1000 * 60 * 30;
const MAX_CACHE_ENTRIES = 200;
const MAX_HTML_BYTES = 1_500_000;

function isPrivateAddress(address: string) {
  const normalized = address.toLowerCase();
  if (normalized === '::1' || normalized === '0.0.0.0' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80:')) return true;
  const mapped = normalized.startsWith('::ffff:') ? normalized.slice(7) : normalized;
  if (net.isIP(mapped) !== 4) return false;
  const [a, b] = mapped.split('.').map(Number);
  return a === 0 || a === 10 || a === 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168 || a === 198 && (b === 18 || b === 19) || a === 100 && b >= 64 && b <= 127 || a >= 224;
}

async function assertPublicUrl(target: URL) {
  if (!['http:', 'https:'].includes(target.protocol)) throw new Error('Unsupported protocol');
  const hostname = target.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname === 'metadata.google.internal' || hostname === 'instance-data.ec2.internal') throw new Error('Private host');
  const addresses = net.isIP(hostname) ? [{ address: hostname }] : await dns.lookup(hostname, { all: true });
  if (addresses.some(({ address }) => isPrivateAddress(address))) throw new Error('Private address');
}

async function fetchHtml(target: URL, redirects = 0): Promise<string> {
  await assertPublicUrl(target);
  const response = await fetch(target.toString(), {
    redirect: 'manual',
    headers: { 'User-Agent': 'PerspectraBot/1.0 (+https://perspectra.news)', Accept: 'text/html,application/xhtml+xml' },
    signal: AbortSignal.timeout(7000)
  });
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location');
    if (!location || redirects >= 2) throw new Error('Too many redirects');
    return fetchHtml(new URL(location, target), redirects + 1);
  }
  if (!response.ok) throw new Error('Article unavailable');
  const contentType = response.headers.get('content-type') || '';
  const contentLength = Number(response.headers.get('content-length') || 0);
  if (contentLength > MAX_HTML_BYTES || (contentType && !/(text\/html|application\/xhtml\+xml)/i.test(contentType))) throw new Error('Unsupported response');
  const body = await response.arrayBuffer();
  if (body.byteLength > MAX_HTML_BYTES) throw new Error('Response too large');
  return new TextDecoder().decode(body);
}

function setCache(key: string, image: string | null, expires: number) {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(key, { image, expires });
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('url');
  if (!raw) return NextResponse.json({ image: null, error: 'Missing url' }, { status: 400 });
  let target: URL;
  try {
    target = new URL(raw);
    await assertPublicUrl(target);
  } catch {
    return NextResponse.json({ image: null, error: 'Invalid or private url' }, { status: 400 });
  }
  const key = target.toString();
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return NextResponse.json({ image: cached.image, cached: true });
  try {
    const html = await fetchHtml(target);
    const match = html.match(/<meta[^>]+(?:property|name)=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']og:image["'][^>]*>/i);
    const image = match?.[1] ? new URL(match[1], target).toString() : null;
    setCache(key, image, Date.now() + TTL);
    return NextResponse.json({ image, cached: false });
  } catch {
    setCache(key, null, Date.now() + 5 * 60 * 1000);
    return NextResponse.json({ image: null, cached: false });
  }
}
