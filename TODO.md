# Tint delivery TODO

## 1. Foundation, data, and brand shell

- [x] Set up Next.js App Router, TypeScript, Tailwind-compatible utility styling, Source Serif 4 and Inter, and a light-only design token system with white, near-black, #E5E5E5, #666, #F7F7F8, #2F5FD0, #D0392F, and #9A9A9A.
- [x] Add local JSON data in `/data` for stories, outlets, team, gossip, and spicy takes; include realistic outlets such as BBC, CNN, Fox News, RT, Reuters, AP, Al Jazeera, Guardian, and NY Post; keep article content limited to headline, short snippet, thumbnail, and original link.
- [x] Implement reusable Logo SVG, favicon line-and-knob mark, sticky Header with desktop/mobile navigation, NewsTicker, Footer, Reveal, BiasBar, OutletChip, NewsImage, and StoryCard components.
- [x] Preserve accessible contrast, descriptive alt text, visible focus states, semantic HTML, keyboard navigation, and reduced-motion behavior.

## 2. Home editorial experience

- [x] Build `/` in this order: NewsTicker; hero with “Same story. Different tint.”, subtext, search field, interactive Left-Center-Right slider, and stats; Top Stories grid of 6–9 StoryCards; Same Story, Different Headline three-column comparison; Blindspot cards; Spicy Takes; Source Reliability preview; six-step How It Works row; Dome Gossip teaser; Support CTA band.
- [x] Make the home slider filter/re-sort demo cards with a crossfade/glide effect, and make search filter story headlines and summaries.
- [x] Add 16:9 lazy-loaded story images with explicit dimensions, credits, fallback behavior, and original-article links opening in a new tab with `noopener noreferrer`.
- [x] Keep Spicy Takes clearly separated into framed headline, factual explanation, and True/Misleading/False fact-check label; use real news imagery or neutral graphics only.

## 3. Secondary pages

- [x] Build `/how-it-works` with expanded six steps, flat line-style diagram, smooth FAQ accordion, answers to the four requested questions, and aggregator disclaimer.
- [x] Build `/story/[id]` with title, credited hero image, time, BiasBar, Left/Center/Right outlet lists, original links, coverage-gap summary, and per-outlet reliability line.
- [x] Build `/sources` with methodology note, searchable/filterable outlet table, lean dots, factual rating, and country.
- [x] Build `/dome-gossip` with 21 harmless fake-rumour cards in `gossip.json`, satire banner, Reliability 0/5 and Source: Dome Gossip footer, and TRUE/FALSE filter.
- [x] Build `/support` with support explanation, animated funding progress and unlock goals, reward tiers, referral section, Blue vs Red challenge counter, and donation/QR placeholder.
- [x] Build `/about`, `/who-we-are`, and `/contact`; include mission/problem/approach/values, 21 team cards, and a validated contact form with success state, social links, and source-rating feedback note.

## 4. Optional data routes and project handoff

- [x] Add `/api/news` that uses GNews or NewsData.io only when `NEWS_API_KEY` exists and otherwise returns `stories.json`, filtering malformed provider records.
- [x] Add `/api/og-image?url=...` that fetches a remote article page server-side, extracts `og:image`, caches results, and fails safely with SSRF, redirect, content-type, response-size, and cache bounds.
- [x] Add an optional `/api/unsplash` fallback using `UNSPLASH_ACCESS_KEY`; otherwise `NewsImage` shows a neutral placeholder.
- [x] Add `.env.example`, `README.md`, `public/manus-routes.json`, and project logo metadata; confirm `npm run dev` works with zero API keys.
- [x] Run diagnostics, production build, route-manifest and API checks; preserve the accepted implementation in the project checkpoint.
