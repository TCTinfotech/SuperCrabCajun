# Website Accessibility Report

**SuperCrab Cajun Seafood** — Google Lighthouse automated audit, production build, home page. **August 28, 2026**

## Overall Result

**Score: 89 / 100** — a strong baseline. Three issues were identified, all low-effort fixes
with no visible impact on the site's design, estimated at roughly one hour of work in total.

## Findings

**1. Hidden mobile menu remains keyboard-reachable.** When the mobile menu is closed, its
links can still be reached with the keyboard, so keyboard and screen-reader users can land
on invisible links — a confusing, broken navigation experience.
*Fix:* a one-line code change to fully disable the menu while it is closed.

**2. Footer text contrast is below standard.** The red "today" highlight in the hours list
and the white text on the red copyright bar fall just short of WCAG contrast minimums
(measured 3.7:1 and 4.4:1 against the required 4.5:1), making them hard to read for
low-vision users.
*Fix:* slightly adjust two shades of the brand red — visually near-identical to the current design.

**3. Footer headings skip levels.** Screen-reader users navigate by heading structure; the
footer jumps from heading level 2 to level 4, making the page harder to traverse with
assistive technology.
*Fix:* change the footer heading tags to the correct level; visual styling is unchanged.

## Why This Matters

- **Customer experience:** the site works for customers using keyboards, screen readers, or with low vision.
- **Compliance:** strengthens WCAG 2.1 AA / ADA compliance posture, reducing legal exposure.
- **Quality:** the audit is now a repeatable project task (`pnpm lighthouse`), so future changes can be checked before release.

## Recommendation

Approve the three fixes and re-run the audit to confirm a clean result. Estimated effort:
about one hour, with no design review required.
