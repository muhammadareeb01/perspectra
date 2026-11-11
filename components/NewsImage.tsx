'use client';

import { useEffect, useState } from 'react';

export function NewsImage({ src, alt, credit, keywords, fallbackLetter = 'T', className = '' }: { src?: string; alt: string; credit?: string; keywords?: string; fallbackLetter?: string; className?: string }) {
  const [imageSrc, setImageSrc] = useState(src);
  const [failed, setFailed] = useState(!src);
  const [fallbackCredit, setFallbackCredit] = useState<string | null>(null);
  const [attemptedFallback, setAttemptedFallback] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setFailed(!src);
    setFallbackCredit(null);
    setAttemptedFallback(false);
  }, [src]);

  async function handleError() {
    if (!keywords || attemptedFallback) {
      setFailed(true);
      return;
    }
    setAttemptedFallback(true);
    try {
      const response = await fetch(`/api/unsplash?query=${encodeURIComponent(keywords)}`);
      const result = await response.json();
      if (result.url) {
        setImageSrc(result.url);
        setFallbackCredit(result.photographer || 'Unsplash');
        setFailed(false);
        return;
      }
    } catch {
      // Keep the neutral placeholder when the optional fallback is unavailable.
    }
    setFailed(true);
  }

  return <div className={`news-image ${failed || !imageSrc ? 'news-image--fallback' : ''} ${className}`}>
    {!failed && imageSrc ? <img src={imageSrc} alt={alt} loading="lazy" width="1200" height="675" onError={handleError} /> : <span className="news-image__fallback-letter">{fallbackLetter}</span>}
    <span className="news-image__credit">{failed || !imageSrc ? 'Image: Perspectra placeholder' : fallbackCredit ? `Photo: Unsplash / ${fallbackCredit}` : `Image: ${credit || 'original publisher'}`}</span>
  </div>;
}
