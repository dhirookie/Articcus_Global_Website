# Website operations

## Enquiries and booking

Set `LEAD_WEBHOOK_URL` and, if needed, `LEAD_WEBHOOK_TOKEN` on the server. The same receiver handles short enquiries (`mode: enquiry`) and detailed briefs (`mode: brief`). It must return 2xx after acceptance and deduplicate the `Idempotency-Key` header. Receipt references remain stable when an unchanged submission is retried.

The site confirms receipt in the browser. Email acknowledgement, lead assignment, qualification, appointment scheduling and business outcome reporting must be implemented in your chosen receiving system. Nominate an owner and test delivery end-to-end before accepting live enquiries. Never put receiver tokens in public environment variables or Git.

`NEXT_PUBLIC_BOOKING_URL` optionally points to a real HTTPS scheduling page. Without it, discovery actions open the short enquiry form; no appointment is claimed to be booked. WhatsApp and telephone links use the existing business number.

## Endpoint protection

The enquiry endpoint requires same-origin JSON, validates the shared schema, bounds bodies, validates retry keys and has provider and browser timeouts. Production delivery failures log only the reference, not the lead contents or provider credentials. Configure your host to alert on repeated delivery errors or elevated 5xx responses.

The built-in rate limiter holds bounded, expiring counters in memory. It allows ten attempts per ten minutes for an address from `LEAD_CLIENT_IP_HEADER`. Configure that variable only for a header that your trusted proxy removes from incoming requests and sets itself. Without a trusted address, the fallback is a shared limit of sixty attempts per minute. IPs are hashed before being used as counter keys. Counters reset on process restart and are not shared across instances; use the host's shared rate limiting/bot protection for a public production deployment.

## Optional measurement

Leave `ANALYTICS_WEBHOOK_URL` empty to disable measurement completely. If configured, the site asks for permission before transmitting events or loading the Web Vitals reporter. Visitors can decline and continue using every form. Measurement preferences can be changed on the privacy page or in the footer.

The HTTPS receiver gets allowlisted events only: page categories, catalogue service IDs, enquiry/brief attempts and outcomes, and LCP/INP/CLS values. It does not receive raw URLs, query parameters, visitor identifiers, names, email addresses, phone numbers, companies, messages, budgets or enquiry references. Tokens stay server-side. Endpoint validation rejects extra fields, oversized payloads and cross-origin submissions. Measurement failures do not affect enquiries.

These are aggregate website events, not a customer-level CRM funnel. Configure business outcome reporting separately in the enquiry receiver. Define provider retention and access settings before launch, and review the website privacy description against the actual deployment and providers.

## QA and performance

Run `npm run check`, `npm run format:check`, and `npm run test:e2e`. Ubuntu CI runs all functional, responsive layout and axe accessibility checks. A separate Windows CI job compares desktop and mobile screenshots against the Windows Chromium baselines. Reference filenames include the platform; screenshots from different operating systems are not interchangeable because font rendering can differ. Visual baselines are versioned in `tests/e2e/__screenshots__`. On Windows, review intended design changes before updating them with `npx playwright test visual.spec.ts --update-snapshots`. Use `npm run test:e2e:functional` for platform-independent checks and `npm run test:e2e:visual` for Windows screenshot checks.

Automated accessibility tests are a baseline, not a compliance certificate. Manually check keyboard operation, zoom, focus visibility, screen-reader announcements and real mobile devices. Browser checks verify rendering and behavior, not field performance. With consented measurement, review the 75th percentile separately for desktop and mobile: LCP at most 2.5 seconds, INP at most 200 milliseconds and CLS at most 0.1. Use host monitoring for error rates and availability.

The build uses one worker to keep resource use predictable. Unit tests use the patched Vitest 5 toolchain on Node 22. The remaining development-only lint advisories are documented in the README; runtime audit results should be checked whenever dependencies change.
