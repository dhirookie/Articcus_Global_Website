# Cloudflare Workers deployment

This repository deploys the existing Next.js application with the OpenNext adapter. Workers serves the prerendered pages and runs `/api/leads` and `/api/events`; a static Pages upload would lose those endpoints.

## First deployment

Use Node.js 22.14 or newer and install the lockfile dependencies:

```sh
npm ci
npx wrangler login
npx wrangler whoami
npm run check
npm run deploy
```

The Worker name is `articcus-global-website`. Wrangler prints the public `workers.dev` URL after deployment. If you belong to multiple Cloudflare accounts, set `CLOUDFLARE_ACCOUNT_ID` to the intended account before deploying. Authentication tokens belong in your local environment or CI secrets, never in this repository.

## Production configuration

`wrangler.jsonc` sets the canonical origin to `https://articcus.com` and trusts Cloudflare's `cf-connecting-ip` header for the application's per-visitor rate limiter. Confirm the domain before launch. If the canonical origin changes, update both the Wrangler variable and `NEXT_PUBLIC_SITE_URL` in the build environment, then rebuild and redeploy. Public Next.js variables are embedded during the build.

Configure the enquiry receiver through encrypted Worker secrets:

```sh
npx wrangler secret put LEAD_WEBHOOK_URL
npx wrangler secret put LEAD_WEBHOOK_TOKEN
```

The URL must be an HTTPS JSON receiver that accepts the documented payload and idempotency key. Omit the token if the receiver does not require one. Until a receiver is configured, the form returns an explicit unavailable response with email and telephone contact details; submissions are not stored or delivered. Email and WhatsApp links remain available.

Optional settings:

- Set `NEXT_PUBLIC_BOOKING_URL` in the build environment to enable an external scheduling link.
- Analytics stays disabled by default. To enable it, configure `ANALYTICS_WEBHOOK_URL` at build time and as a Worker secret, plus `ANALYTICS_WEBHOOK_TOKEN` when required. Rebuild so the prerendered pages include the consent interface.
- The application's in-memory rate limiter is per Worker isolate. Configure Cloudflare rate limiting for POST requests to `/api/leads` and `/api/events` if stronger shared limits are needed.

## Domain and HTTPS

After deployment, in Cloudflare **Workers & Pages → articcus-global-website → Settings → Domains & Routes**, add the confirmed hostname as a Custom Domain. The zone must be active in the same Cloudflare account. Review any existing website DNS record before replacing it. Cloudflare provisions the domain certificate. Add `www` only if desired and configure its redirect to the canonical origin.

Custom domains are deliberately not assigned by the repository: domain ownership and existing DNS must be checked in the authenticated account first.

## Local Workers verification

```sh
npm run build:cloudflare
npm run preview:cloudflare
```

After building, `npm run test:e2e:cloudflare` runs the existing functional browser tests against the local Workers runtime.

The quality CI job builds the Cloudflare bundle, performs a deployment dry run and runs these Workers browser checks without Cloudflare account credentials. The visual regression job continues to compare the existing Windows screenshots.

Copy `.dev.vars.example` to `.dev.vars` only when testing local runtime secrets. Use test receivers; never send a test enquiry to a production receiver without coordinating it. `npm run deploy:check` bundles the built Worker without publishing it and reports upload size.

Marketing pages are generated during the build and this application does not currently use ISR or runtime revalidation, so no R2 bucket is required. If those features are introduced, configure a persistent incremental cache before using them in production.

## Git-based deployments

Connect `saadmaz/Articcus_Global_Website` through Cloudflare **Workers & Pages → Create → Import a repository** and choose Workers. Use:

- Build command: `npm run build:cloudflare`
- Deploy command: `npm run deploy:cloudflare`
- Root directory: repository root
- Build variable: `NEXT_PUBLIC_SITE_URL=https://articcus.com` (replace if the domain differs)

Keep enquiry and analytics credentials in Worker runtime secrets. The deploy command uses the existing build rather than building twice. Repository changes must be pushed before Cloudflare can build them.

## Launch verification

Check the home page, service detail routes, contact form, mobile navigation, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, unknown-route 404s, and the old `.html` redirects on the public hostname. Confirm canonical URLs use the final domain. Once a real receiver is configured, send one coordinated enquiry and verify it arrives exactly once. Review Worker logs for failures without logging contact details.

To roll back, select the previous working deployment under the Worker's Deployments tab. Runtime secrets are managed separately from code versions.
