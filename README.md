# Articcus Global Website

Articcus marketing website built with Next.js App Router, React, and strict TypeScript. The original branding, SVG logo and showcase illustrations are retained, with clearer positioning, detailed service scopes, labelled solution examples, buying guides, an About page, website privacy information and two enquiry paths. Shared elements and interactive features are native React components; no HTML documents or embedded legacy scripts are used as application source.

## Run locally

Use Node.js 22.14 or newer and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On PowerShell, use `Copy-Item .env.example .env.local`. Open http://localhost:3000.

```sh
npm run build
npm start
```

## Structure

```text
src/
  app/
    (marketing)/          # Home, services, industries, process, pricing, contact
    api/leads/route.ts    # Validated server-side enquiry delivery
    layout.tsx           # Fonts, metadata, shared shell and brief provider
    error.tsx            # Recoverable error boundary
    not-found.tsx        # Missing-page fallback
    robots.ts
    sitemap.ts
  components/
    layout/              # Header, footer, CTA and original SVG sprite
    ui/                  # Icons, accessible tabs, clipboard and scroll reveal
  config/                # Site identity and navigation
  data/                  # Typed catalogue: 18 services, 10 industries, hero examples
  features/
    brief/               # Session state, actions and engagement recommendations
    contact/             # Form, validation, summary and copyable receipt
    home/                # Original showcase and persona tabs
    industries/          # Cards, grid, marquee and carousel
    services/            # Explorer and shared catalogue views
  lib/                   # Typed styles and page metadata
  server/                # Server-only provider delivery
  styles/                # Original responsive design and motion preferences
tests/
  unit/                  # Validation, storage, recommendations and delivery
  e2e/                   # Desktop/mobile navigation and complete brief flows
.github/workflows/ci.yml
```

Core routes are `/`, `/services`, `/industries`, `/how-we-work`, `/pricing`, and `/contact`. Additional routes are `/about`, `/solutions`, `/guides` and `/privacy`, plus prerendered service, example and guide detail pages. Permanent redirects preserve the six old `.html` URLs and their fragments. Dynamic detail pages reject unknown slugs.

The short enquiry form at `/contact#enquiry` requires only a name, email and description; company is optional. The detailed brief remains at `/contact#start` and keeps service selection and business context. Neither path claims success until the receiver accepts delivery.

See [content maintenance](docs/content-maintenance.md) for editorial rules and [operations](docs/operations.md) for delivery, optional booking, measurement, rate limits, monitoring and screenshot baselines. No fabricated testimonials, client case studies, team profiles, price ranges or business results are published.

## Enquiry delivery

The supplied pages used a timer to simulate a successful form submission. This application submits to `/api/leads` and confirms success only after the receiver returns a successful HTTP status.

Set these environment variables on the server:

- `NEXT_PUBLIC_SITE_URL`: deployed canonical HTTPS origin; used in metadata, sitemap and robots.
- `LEAD_WEBHOOK_URL`: HTTPS JSON receiver in your CRM, email automation, or own backend.
- `LEAD_WEBHOOK_TOKEN`: optional bearer token for that receiver. It is never exposed to the browser.

The receiver gets validated contact details, selected service IDs, industry, problem, budget, suggested engagement model, and a generated `reference`. The same reference is sent as `Idempotency-Key` and remains stable when a visitor retries an unchanged submission. The receiver should deduplicate this key and return 2xx only when the brief has been accepted. The application does not retain leads in a database.

Missing configuration returns HTTP 503 with direct contact details; provider failures return HTTP 502 and preserve the visitor's form. Client and server share the Zod validation schema. Requests require a same-origin JSON POST, have a bounded body, include a honeypot, and time out. Front the public endpoint with your host's rate limiting/bot protection. If your reverse proxy rewrites origins, preserve the public request origin in its configuration.

Brief selections use validated, per-tab `sessionStorage`, with an in-memory fallback when storage is blocked. Contact details are not written to browser storage. After confirmed delivery, the saved selections are cleared and the visitor can copy a receipt.

## Quality checks

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run check` runs type checking, lint, unit tests and the production build. CI also checks formatting and runs Chromium at desktop and phone sizes. Browser tests use intercepted delivery responses; they never send a real enquiry. Unit tests exercise the actual endpoint and provider adapter with mocked external delivery.

TypeScript enables `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`. There are no `any` escapes or suppressed type errors. Server-rendered content and catalogue lists are available without waiting for client JavaScript. Tabs support arrow keys, Home and End; the mobile drawer manages focus and Escape; motion follows the visitor's reduced-motion preference. Fonts are downloaded at build time and served by Next.js.

## Deployment

Cloudflare Workers deployment is configured with the OpenNext adapter. See [Cloudflare deployment](docs/cloudflare.md) for authentication, build and deployment commands, runtime secrets, custom domains and launch checks. The enquiry endpoint requires a server runtime, so a static-only Pages upload is not sufficient. Configure the enquiry receiver before accepting live online briefs. Standard Node.js hosting with `npm run build` and `npm start` also remains available.

`npm audit --omit=dev` checks runtime dependencies. The current Next.js lint toolchain has unpatched development-only advisories in the `fast-glob` → `micromatch` → `braces` chain. Keep the matched Next.js lint configuration and review upstream fixes rather than forcing npm's suggested framework downgrade. ESLint 9 is retained because the current lint plugins do not all declare support for ESLint 10.
