# Tint implementation plan

## Product scope

Tint is a multi-page news aggregator and media-bias comparison site, not a publisher. It presents concise headline snippets, source lean labels, reliability context, and links back to original publishers. The initial experience is fully usable with local mock JSON and zero API keys; optional server routes support live news and OG-image lookup later.

## Implementation approach

- Build a Next.js App Router site in TypeScript with a small set of reusable components: `Header`, `Footer`, `Logo`, `NewsTicker`, `Reveal`, `BiasBar`, `OutletChip`, `NewsImage`, `StoryCard`, `SectionHeading`, `Stat`, and `Accordion`.
- Keep content data in `/data` JSON files and use typed loaders from `/lib/data.ts`; pages render from the same source so mock and future API content share a consistent shape.
- Use client components only where interaction is required: home bias filtering/search, mobile navigation, FAQ accordion, gossip fact-check filter, funding progress reveal, and contact form success state.
- Use server routes `/api/news` and `/api/og-image` without requiring secrets. `/api/news` returns local data when provider keys are absent; `/api/og-image` safely parses an article page's `og:image` and caches the result in process memory.
- Use `next/font/google` for Source Serif 4 and Inter, with CSS variables and semantic tokens in `app/globals.css`. Use a subtle editorial layout: generous whitespace, asymmetric section intros, thin rules, and restrained motion rather than dashboard-style density.
- Add `public/manus-routes.json`, a favicon mark, `.env.example`, and a README with zero-key startup instructions.

## Design system

### Design movement

Contemporary independent editorial design: the clarity of a newspaper desk paired with the usability of a modern media index.

### Core principles

1. Make comparison legible at a glance through strong hierarchy and small, repeated source signals.
2. Keep the interface neutral while allowing blue, grey, and red to carry the bias meaning.
3. Use editorial rhythm—rules, captions, serif display type, and generous margins—instead of decorative effects.
4. Treat every link as a handoff to the original publisher, with transparency visible in the UI.

### Color philosophy

White and near-black create a calm, report-like canvas. #2F5FD0, #9A9A9A, and #D0392F are reserved for the Left / Center / Right spectrum so the color system communicates meaning instead of decoration. Soft grey surfaces separate reading zones without creating visual noise.

### Layout paradigm

A broad editorial column with offset section headers and modular story rows. Dense comparisons sit inside ruled panels, while narrative sections breathe with full-width bands and narrow text measures.

### Signature elements

- The Tint slider-line logo: a blue-to-red rule with a black center knob.
- Bias bars and lean dots repeated as a visual grammar across cards, tables, and comparison columns.
- Tiny source captions and hard-edged editorial rules that make provenance feel ever-present.

### Interaction philosophy

Interactions should clarify rather than entertain: filters visibly change the story set, comparison links open the original source, accordions disclose methodology, and hover states add just enough lift to signal clickability. All motion is optional under `prefers-reduced-motion`.

### Animation

Reveal content with short 300–400ms fade/translate transitions. Story cards lift 4px and zoom images 1.04x on hover. Bias bars fill when revealed and on card hover. Use CSS transitions, IntersectionObserver, and staggered delays only—no heavy animation library.

### Typography system

Source Serif 4 is the voice of headlines and editorial statements. Inter handles navigation, metadata, labels, tables, and controls. Display headlines use tight tracking and generous line height; supporting copy stays at a comfortable 1.6–1.7 line height.

### Brand essence

A transparent reading companion for people who want the same story from more than one angle. Personality: clear, curious, fair-minded.

### Brand voice

Direct, lightly witty, and evidence-aware. Example lines: “Same story. Different tint.” and “The headline changes. The facts still need checking.”

### Wordmark & logo

A bold serif `tint` wordmark sits beside a generated compass-eye symbol inspired by the supplied hand sketch, followed by the thin split spectrum line and center knob. The eye-compass communicates perspective and direction; the knob still shifts a few pixels on hover to suggest a moving point of view. The favicon uses a compact deterministic eye-compass mark.

### Coverage signal

Every news tile carries a red-blue-grey coverage compass. Its segmented ring maps the story’s Left / Center / Right mix, while the animated needle shifts toward the stronger side. This repeats the BiasBar semantics in a more recognizable, interactive symbol.

### Signature brand color

Near-black #111111 is Tint’s ownable anchor: it keeps the product editorial and makes the three bias colors feel purposeful rather than branded decoration.

## Project structure

- `app/`: route pages, shared layout, metadata, API handlers, and global styles.
- `components/`: reusable editorial UI and client interactions.
- `data/`: local JSON fixtures for stories, outlets, team, gossip, and spicy takes.
- `lib/`: TypeScript types, data loaders, formatting, and optional provider helpers.
- `public/`: favicon, route manifest, and static assets.
- `app.config.ts`: project logo metadata.

## Delivery workflow

Implement the foundational shell and data first, then the home experience, then the secondary pages and final server routes/accessibility pass. Keep the site runnable with `npm run dev` and `npm run build` without any API keys. Validate routes, TypeScript diagnostics, production build, the route manifest, and the server endpoints before checkpointing.
