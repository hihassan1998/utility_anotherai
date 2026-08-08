---
name: deployment-seo
description: Production deployment, custom domain, technical SEO, search engine indexing, analytics, and AdSense readiness for the utility tools website.
---

# Deployment, SEO & Monetization Skill

## Purpose

This skill covers the production launch and ongoing SEO infrastructure of the utility tools website.

The application is hosted on Vercel.

The custom domain may be registered through Cloudflare Registrar.

Cloudflare is used for DNS.

Do not move application hosting to the domain registrar.

---

# Production Deployment

Before production deployment:

- Ensure the application builds successfully.
- Run linting and type checks.
- Fix all production build errors.
- Verify all tool calculations.
- Verify responsive layouts.
- Verify mobile usability.
- Verify accessibility.
- Verify all navigation links.
- Verify legal pages.
- Verify metadata.

The production deployment must be compatible with Vercel Hobby initially.

Do not introduce unnecessary paid infrastructure.

---

# Custom Domain

The application should work correctly with a custom domain.

Ensure:

- Root domain works.
- `www` domain works if configured.
- One canonical domain is selected.
- HTTP redirects to HTTPS.
- Alternate hostname redirects to the canonical hostname.
- Canonical URLs use the production domain.

Do not hard-code temporary Vercel URLs into SEO metadata.

Use an environment variable or centralized site configuration for the production URL.

Example:

NEXT_PUBLIC_SITE_URL=https://example.com

Never invent DNS records.

When configuring DNS, use the records currently provided by Vercel.

---

# Technical SEO

Every indexable tool page must have:

- Unique title
- Unique meta description
- Canonical URL
- One H1
- Logical H2/H3 hierarchy
- Semantic HTML
- Open Graph metadata
- Twitter/X metadata
- Descriptive URLs
- Internal links
- Breadcrumb navigation
- Relevant structured data

Avoid:

- Keyword stuffing
- Duplicate metadata
- Hidden SEO text
- Automatically generated low-quality content
- Duplicate tool pages targeting the same keyword

---

# Sitemap

Generate a valid sitemap.xml.

The sitemap should include only canonical, indexable pages.

Do not include:

- Admin pages
- API routes
- Duplicate URLs
- Temporary URLs
- Pages marked noindex

Whenever a new tool is added, it should automatically become eligible for inclusion in the sitemap.

---

# Robots.txt

Generate a valid robots.txt.

Allow normal search-engine crawling.

Do not accidentally block:

- Tool pages
- CSS
- Required JavaScript
- Important static assets

Disallow private/internal routes where appropriate.

Include the production sitemap URL.

---

# Structured Data

Use structured data only when it accurately represents visible page content.

Consider:

- WebSite
- WebPage
- BreadcrumbList
- FAQPage where appropriate

Do not add misleading schema simply to gain search visibility.

---

# Internal Linking

Every tool page should link to relevant tools.

Examples:

Age Calculator
→ Date Duration Calculator
→ Percentage Calculator

BMI Calculator
→ Unit Converter

Percentage Calculator
→ Unit Converter

The homepage should link to all important tools.

Avoid orphan pages.

---

# Search Engine Indexing

The project must be ready for:

- Google Search Console
- Bing Webmaster Tools
- Yandex Webmaster

The application itself should generate the technical requirements.

Search-engine account verification and sitemap submission are performed manually outside the application.

---

# Google Search Console

After production deployment:

1. Add the production domain as a Domain Property.
2. Verify ownership through DNS.
3. Submit:

/sitemap.xml

4. Use URL Inspection for important newly published pages when appropriate.

Do not add Search Console credentials or API keys to the repository.

---

# Bing Webmaster Tools

After deployment:

1. Add the production domain.
2. Verify ownership.
3. Submit the sitemap.

If Bing offers Google Search Console import, that can be used.

---

# Yandex Webmaster

Yandex is optional.

If used:

1. Add the production domain.
2. Verify ownership.
3. Submit the sitemap.

Do not add unnecessary Yandex-specific code unless required.

---

# Analytics

The application should support privacy-conscious analytics.

Analytics must not interfere with:

- Performance
- Accessibility
- Core functionality

Do not expose analytics IDs directly throughout the application.

Keep configuration centralized.

---

# Google AdSense Readiness

The application should be technically ready for Google AdSense but should not depend on AdSense for core functionality.

Before applying, the site should have:

- Useful original tools
- Useful explanatory content
- About page
- Contact page
- Privacy Policy
- Terms of Service
- Clear navigation
- Good mobile experience
- No broken pages
- No placeholder content

Do not place fake advertisements.

Create reusable ad placement components that can be enabled later.

Possible placements:

- Top of content
- Between content sections
- Sidebar on desktop
- Bottom of content

Ads must never interfere with the actual utility tool.

---

# Performance

Maintain excellent Core Web Vitals.

Prioritize:

- Static rendering
- Minimal client-side JavaScript
- Optimized assets
- Fast page loads
- Minimal third-party scripts
- Lazy loading where appropriate

Do not install analytics, advertising, tracking, or UI libraries unnecessarily.

---

# Launch Checklist

Before declaring production ready:

- [ ] Production build succeeds
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] All tools tested
- [ ] Mobile layout tested
- [ ] Accessibility checked
- [ ] Metadata checked
- [ ] Canonical URLs checked
- [ ] Sitemap generated
- [ ] Robots.txt generated
- [ ] Structured data checked
- [ ] Internal links checked
- [ ] Legal pages available
- [ ] Custom domain configured
- [ ] HTTPS working
- [ ] Google Search Console ready
- [ ] Bing Webmaster ready
- [ ] Yandex Webmaster optional
- [ ] Analytics configured
- [ ] AdSense-ready ad components available

---

# Ongoing SEO Workflow

When adding a new tool:

1. Create the tool page.
2. Give it a unique URL.
3. Add unique metadata.
4. Add useful explanatory content.
5. Add examples.
6. Add relevant FAQs.
7. Add internal links.
8. Ensure it is included in the sitemap.
9. Deploy to Vercel.
10. Verify the production URL.
11. Request indexing in Google Search Console when appropriate.

Never create pages solely to increase the number of indexed URLs.

Every indexed page should provide genuine user value.