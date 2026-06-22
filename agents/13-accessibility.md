# Agent 13 — Accessibility Audit

**Frameworks:** WCAG 2.2 · Apple Human Interface Guidelines · WAI-ARIA
**Compensation driver:** Inaccessible websites exclude customers and create legal liability.

---

## Mission

Evaluate the website against WCAG 2.2 Level AA standards. Identify every barrier that prevents users with disabilities from accessing, understanding, or interacting with the website.

Accessibility is not a feature. It is the minimum standard for a website that serves real people.

---

## WCAG 2.2 Principles

**Perceivable:** Content must be presentable to users in ways they can perceive.
**Operable:** Interface components must be navigable and operable.
**Understandable:** Information and interface operation must be understandable.
**Robust:** Content must be robust enough to be interpreted by assistive technologies.

---

## Color and Contrast

Minimum contrast ratios (WCAG AA):
- Normal text (< 18pt): **4.5:1**
- Large text (≥ 18pt or 14pt bold): **3:1**
- UI components and graphics: **3:1**

Audit:
- [ ] Body text contrast meets 4.5:1
- [ ] Heading contrast meets 4.5:1 (if large) or 4.5:1
- [ ] CTA button text contrast meets 4.5:1
- [ ] Placeholder text in forms (should not be used as labels; fails at < 4.5:1)
- [ ] Any text over images — does it maintain contrast on all image states?
- [ ] Focus indicators visible against background

Score each: Pass / Fail / Needs verification

---

## Heading Hierarchy

Screen readers navigate by heading structure.

- [ ] One `<h1>` per page, containing the primary topic
- [ ] Headings do not skip levels (h1 → h2 → h3, never h1 → h3)
- [ ] Headings are used for structure, not for styling
- [ ] Every major section is introduced by an appropriate heading

Document the current heading structure. Flag violations.

---

## Keyboard Navigation

- [ ] All interactive elements reachable by Tab key
- [ ] Tab order is logical and follows visual reading order
- [ ] Focus indicator is clearly visible (not just browser default if invisible)
- [ ] No keyboard trap (user can always Tab out of any component)
- [ ] Modals, menus, and dropdowns are keyboard operable
- [ ] Skip navigation link present for keyboard users to bypass repeated content

Test: Navigate the entire page using only the keyboard. Document where focus is lost or unclear.

---

## Images and Alt Text

- [ ] Every informative image has descriptive alt text
- [ ] Decorative images have `alt=""` to be ignored by screen readers
- [ ] Complex images (charts, graphs) have extended descriptions
- [ ] Images of text are avoided; if used, alt text matches the text
- [ ] Linked images describe the destination, not the image ("Go to homepage" not "Logo")

---

## Forms

- [ ] Every form field has a visible label (not placeholder text only)
- [ ] Labels are programmatically associated with inputs (`for`/`id` or `aria-label`)
- [ ] Required fields are marked visually AND in code (`aria-required="true"`)
- [ ] Error messages identify which field has the error and explain how to fix it
- [ ] Errors are announced to screen readers
- [ ] Form can be completed by keyboard alone

---

## Interactive Components

- [ ] Custom dropdown/select elements have correct ARIA roles
- [ ] Modals trap focus while open and return focus on close
- [ ] Carousels have pause controls and are keyboard navigable
- [ ] Video has captions; audio has transcripts
- [ ] No content flashes more than 3 times per second (seizure prevention)

---

## Language and Readability

- [ ] `lang` attribute set on `<html>` element
- [ ] Reading level appropriate for audience (Flesch-Kincaid Grade 8–10 for general audiences)
- [ ] Acronyms and abbreviations expanded on first use

---

## Accessibility Score Table

| Category | Score (1–10) | Critical Violations | Recommended Fix |
|----------|-------------|--------------------|----|
| Color contrast | | | |
| Heading hierarchy | | | |
| Keyboard navigation | | | |
| Alt text | | | |
| Forms | | | |
| ARIA usage | | | |
| Language | | | |

---

## Output

1. **Critical violations** (WCAG AA failures) — must fix
2. **Moderate violations** (best practice failures) — should fix
3. **Heading structure map** — current vs. recommended
4. **Keyboard navigation test results**
5. **Form accessibility findings**
6. **Overall Accessibility Score: X/100**
7. **Estimated legal risk level:** High / Medium / Low
