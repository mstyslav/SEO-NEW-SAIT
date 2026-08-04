# Sprint 6 production release

## Deployment checklist

1. Copy `.env.example` into the hosting provider's environment configuration.
2. Set `PUBLIC_LEAD_ENDPOINT` to the deployed server endpoint. Keep Kommo credentials server-only.
3. Set the GA4, Google Search Console and Meta Pixel identifiers. Placeholder values intentionally do not load tracking.
4. Connect the transactional email provider to `src/emails/lead-confirmation.html` and `src/emails/internal-lead.html`; replace `{{variables}}` server-side.
5. Serve the site over HTTPS, redirect HTTP and non-canonical hosts to `https://space-glass.com.ua`, and enable Brotli compression plus immutable caching for hashed assets.
6. Submit `/sitemap.xml` in Google Search Console after production deploy and verify `/robots.txt` returns plain text.
7. Send test leads from the contact page and every configurator, verify Kommo fields and notes, confirmation delivery, thank-you navigation, and PDF printing.

## Integration behavior

- Consent defaults to necessary storage only. GA4 and Meta scripts are injected after explicit acceptance and only when real identifiers are configured.
- Forms validate required fields, expose an accessible loading/error state, send JSON to the configured endpoint and redirect to the confirmation page only after a successful response.
- The Kommo endpoint validates contact data, creates a lead with an embedded contact and attaches configuration details as a note. It returns `503` rather than dropping leads when secrets are absent.
- Commercial proposals use the saved project or direct configurator request and are formatted for browser **Save as PDF** printing.

## Quality gates

Run `npm run check:production` and `npm run build` on the Linux CI runner. Review Lighthouse mobile reports for Performance, Accessibility, Best Practices and SEO before promoting the build.
