import type { Metadata } from 'next';
import { Newsreader, Poppins, Source_Sans_3 } from 'next/font/google';
import '../app/globals.css';
import { SiteChrome } from '@/components/SiteChrome';
import { FirebaseAnalytics } from '@/components/FirebaseAnalytics';
import { brand } from '@/lib/brand';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800']
});
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
  weight: ['500', '600', '700']
});

export const metadata: Metadata = {
  title: { default: `${brand.name}. ${brand.tagline}`, template: `%s · ${brand.name}` },
  description: brand.description,
  metadataBase: new URL(brand.siteUrl)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeBoot = `(function(){try{var t=localStorage.getItem('tint-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';document.documentElement.style.colorScheme=t==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className={`${sourceSans.variable} ${newsreader.variable} ${poppins.variable}`}>
        <FirebaseAnalytics />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
