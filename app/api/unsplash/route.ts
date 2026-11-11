import { NextRequest, NextResponse } from 'next/server';

const cache = new Map<string, { url: string | null; photographer: string | null; expires: number }>();

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')?.trim();
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!query || !key) return NextResponse.json({ url: null, photographer: null });
  const cached = cache.get(query);
  if (cached && cached.expires > Date.now()) return NextResponse.json(cached);
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`, { headers: { Authorization: `Client-ID ${key}` }, next: { revalidate: 1800 } });
    if (!response.ok) throw new Error('Unsplash unavailable');
    const payload = await response.json();
    const photo = payload.results?.[0];
    const value = { url: photo?.urls?.regular || null, photographer: photo?.user?.name || null, expires: Date.now() + 1800000 };
    cache.set(query, value);
    return NextResponse.json(value);
  } catch {
    return NextResponse.json({ url: null, photographer: null });
  }
}
