# Anotool — Google AdSense Low-Value Content Audit & Improvement

## Purpose

Anotool has received a Google AdSense rejection for:

> Low value content

The purpose of this document is to audit and improve the existing Anotool website so that it provides stronger genuine value, originality, trust, and user experience before requesting another AdSense review.

The website already contains useful interactive tools and existing explanatory sections.

The objective is NOT to add large amounts of generic SEO content.

The objective is:

**Useful tools + useful original information + good UX + trust + clear purpose**

---

# CRITICAL RULES — DO NOT BREAK EXISTING FUNCTIONALITY

These rules have the highest priority during this task.

## 1. NEVER break working tool logic

All existing tools are considered working unless the audit clearly identifies a genuine bug.

Do NOT rewrite, refactor, replace, simplify, or restructure working calculation logic merely to improve content.

The following tools must continue working exactly as intended:

- Age Calculator
- BMI Calculator
- Date Duration Calculator
- Percentage Calculator
- Unit Converter
- Word Counter
- Character Counter
- Invoice Creator

---

## 2. Content changes must be separated from application logic

Prefer modifying:

- Page content
- Explanatory sections
- FAQs
- Examples
- Headings
- Metadata
- Internal links
- Accessibility labels
- UI copy

Do NOT modify calculation algorithms or core business logic unless absolutely necessary.

---

## 3. Do NOT change working formulas

Do not change:

- Mathematical formulas
- Date calculation algorithms
- Date handling
- Unit conversion formulas
- Word-count logic
- Character-count logic
- BMI calculation
- Percentage calculations
- Invoice calculation logic
- PDF generation logic

unless an actual existing bug is discovered.

If a potential bug is discovered, STOP and report it instead of silently changing the behavior.

---

## 4. Do NOT change existing tool behavior

Do not change:

- Input behavior
- Output behavior
- Supported units
- Calculation rules
- Rounding behavior
- Date interpretation
- Invoice generation behavior
- PDF generation
- Existing validation behavior

unless required to fix an actual bug.

---

## 5. Preserve the current design system

Do not redesign the website.

Keep:

- Existing layout
- Existing components
- Existing typography
- Existing spacing system
- Existing UI patterns
- Existing navigation
- Existing responsive behavior

Only make UI changes where they clearly improve usability or accessibility.

---

## 6. Preserve all routes

Do not rename or remove existing routes.

Important routes include:

- /
- /all-tools
- /about
- /contact
- /privacy
- /terms
- /age-calculator
- /bmi-calculator
- /date-duration-calculator
- /percentage-calculator
- /unit-converter
- /word-counter
- /character-counter
- /invoice

Do not introduce unnecessary redirects.

---

## 7. Preserve integrations

Do NOT modify or remove:

- Google AdSense script
- ads.txt
- Google CMP / consent implementation
- Sitemap
- Robots configuration
- Vercel configuration
- Cloudflare-related configuration
- Analytics
- Existing deployment configuration

unless explicitly instructed.

---

# EXISTING CONTENT

The tool pages already contain:

- What is the tool? sections
- How to use sections
- FAQ sections
- SEO metadata
- Interactive tools

Do NOT automatically add duplicate sections.

Do NOT increase word count simply to make pages longer.

---

# PHASE 1 — AUDIT

Before making changes, inspect:

- AGENTS.md
- Existing project specifications
- Existing skills
- Existing checklist/README
- All tool pages
- Shared components
- Tool logic
- Metadata
- Sitemap
- Navigation

Create an internal understanding of the current implementation.

For each tool evaluate:

1. Content usefulness
2. Content originality
3. Accuracy
4. User experience
5. Tool clarity
6. Examples
7. Edge cases
8. Limitations
9. Accessibility
10. Internal linking
11. Metadata
12. Trust signals

---

# PHASE 2 — CONTENT QUALITY

The site should demonstrate genuine value.

Do NOT use:

- Keyword stuffing
- Repetitive phrases
- Generic SEO paragraphs
- AI filler
- Fake statistics
- Unsupported claims
- Excessive headings
- Artificially long articles

Avoid statements such as:

> "Our free online tool is fast, easy, accurate and convenient."

unless there is useful specific information following it.

Instead explain things that are specific to the actual tool.

Examples:

- How the calculation works
- How inputs are interpreted
- How results are presented
- Supported formats
- Rounding behavior
- Edge cases
- Real examples
- Practical use cases
- Limitations

Only describe behavior that actually exists in the implementation.

---

# PHASE 3 — EXISTING CONTENT FIRST

If a page already has a useful:

- What is...
- How to use...
- FAQ

section, KEEP IT.

Improve it only if it is:

- Generic
- Inaccurate
- Repetitive
- Too shallow
- Not specific to the actual implementation

Do not create duplicate sections.

---

# TOOL-SPECIFIC QUALITY CHECKS

## Age Calculator

Check whether the page clearly explains:

- How age is calculated
- Years/months/days
- Birthday handling
- Leap-year considerations where relevant
- Example
- Limitations

Only describe behavior supported by the implementation.

---

## BMI Calculator

Check whether the page explains:

- BMI meaning
- Formula
- Units
- Result interpretation
- Limitations of BMI
- Example

Do not present BMI as a medical diagnosis.

---

## Date Duration Calculator

This is currently the strongest search-performing Anotool page.

Do NOT unnecessarily modify its existing implementation or SEO.

Check whether it clearly explains:

- Start date
- End date
- Inclusive/exclusive behavior
- Days
- Weeks
- Months
- Years
- Leap years
- Examples
- Edge cases

Only document the behavior actually implemented.

---

## Percentage Calculator

Check whether the page clearly explains the actual percentage operations supported.

Add formulas/examples only where relevant.

Do not describe functionality that does not exist.

---

## Unit Converter

Check:

- Supported categories
- Supported units
- Conversion behavior
- Precision
- Rounding
- Examples

Do not claim support for units not implemented.

---

## Word Counter

Check:

- Word definition
- Spaces
- Newlines
- Punctuation
- Character counting if supported

Document the actual implementation.

---

## Character Counter

Check:

- Characters with spaces
- Characters without spaces if supported
- Newlines
- Practical examples

Document the actual implementation.

---

## Invoice Creator

Check whether the page explains:

- What an invoice is
- Common invoice fields
- How to use the creator
- PDF generation
- What users should verify
- Privacy considerations
- Limitations

Do not claim that the invoice automatically satisfies every country's legal or tax requirements.

---

# HOMEPAGE + SUPPORTING PAGES

Audit:

- /
- /all-tools
- /about
- /contact
- /privacy
- /terms

Make sure the website clearly communicates:

- What Anotool is
- What tools it provides
- Who operates it
- How users can contact the site
- Privacy information
- Terms of use

Do not add unnecessary text.

---

# INTERNAL LINKING

Add natural links between related tools.

Examples:

Date Duration Calculator
→ Age Calculator

Word Counter
→ Character Counter

Invoice Creator
→ Percentage Calculator
→ Unit Converter

Do not add links purely for SEO.

---

# SEO

Verify:

- Unique title
- Unique meta description
- H1
- Canonical
- Indexability
- Sitemap inclusion
- Internal navigation

Do not make SEO changes just to increase a Lighthouse score.

Do not keyword stuff.

---

# ACCESSIBILITY + UX

Check:

- Labels
- Keyboard navigation
- Focus states
- Error messages
- Mobile layout
- Result clarity
- Semantic HTML
- Accessible buttons
- Form usability

The tool should remain easy to use above the fold.

---

# OLD BRAND NAME

Search for:

ToolNest
toolnest
TOOLNEST

Remove accidental references where appropriate.

Do not modify historical documentation where the old name is intentionally mentioned.

---

# IMPLEMENTATION RULES

After the audit:

1. Preserve existing working functionality.
2. Preserve existing good content.
3. Improve only genuine weaknesses.
4. Keep content specific and useful.
5. Avoid generic SEO text.
6. Avoid unnecessary dependencies.
7. Avoid architectural changes.
8. Avoid large refactors.
9. Avoid changing tool algorithms.
10. Avoid changing routes.
11. Avoid changing integrations.

---

# TESTING REQUIREMENT

After making changes:

Run the existing project checks/build/lint/type checks where available.

Then manually or programmatically verify that all 8 tools still work.

At minimum verify:

- Inputs work
- Buttons work
- Calculations work
- Results appear
- Validation works
- Invoice PDF generation still works
- Responsive layouts remain functional

If a change causes a tool to fail:

**Immediately revert that change and report it.**

Do not "fix" the failure by making unrelated architectural changes.

---

# FINAL CHECKLIST

Before finishing:

[x] All 8 tools still work
[x] No calculation logic unnecessarily changed
[x] No formulas changed
[x] No routes removed
[x] No integrations broken
[x] Existing useful content preserved
[x] No duplicate content sections
[x] No generic SEO filler
[x] No keyword stuffing
[x] Content is specific to each tool
[x] Examples added only where useful
[x] Limitations documented where relevant
[x] Accessibility checked
[x] Mobile UX checked
[x] Internal links improved where useful
[x] Metadata checked
[x] Sitemap preserved
[x] AdSense script preserved
[x] ads.txt preserved
[x] CMP preserved
[x] ToolNest references removed where appropriate
[x] Build/lint/type checks pass
[x] Existing checklist/README updated

---

# FINAL REPORT

Provide:

1. What was already good
2. What problems were found
3. What was changed
4. Why each significant change was made
5. Confirmation that tool logic was preserved
6. Confirmation that all 8 tools still work
7. Any remaining issues
8. Whether the site is ready for another AdSense review

The goal is:

**REAL USER VALUE > WORD COUNT**

**FUNCTIONALITY > REFACTORING**

**QUALITY > SEO FILLER**
