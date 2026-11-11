/** Prefix for absolute public URLs when hosted under a subpath (e.g. GitHub Pages). */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!path.startsWith('/') || !base) return path;
  if (path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}

/** Use with `next/link` — Next.js already applies `basePath`; do not wrap with `withBasePath`. */
export type NextLinkPath = `/${string}`;
