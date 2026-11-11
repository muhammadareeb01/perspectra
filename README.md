# Tint

Tint is a multi-page news aggregator and media-bias comparison website. It shows how different outlets cover the same story, labels source lean, adds reliability context, and links readers to the original publisher. Tint does not republish articles.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The site is fully populated from local JSON fixtures and requires no API keys.

## Optional data integrations

Copy `.env.example` to `.env.local` and add `NEWS_API_KEY` to enable the optional live news route. The UI continues to use local mock data if no key is present. `UNSPLASH_ACCESS_KEY` enables the optional image search fallback; otherwise `NewsImage` uses a neutral placeholder when an image fails.

## Project shape

Routes live in `app/`, reusable UI in `components/`, fixtures in `data/`, and typed data helpers in `lib/`. The server routes are `/api/news` and `/api/og-image?url=...`. `public/manus-routes.json` lists every user-facing page route.

## Editorial note

The story fixture links are illustrative publisher home/topic URLs. Replace them with the current original article URL when connecting a live provider. Headlines and summaries remain intentionally short; full articles are never reproduced.
