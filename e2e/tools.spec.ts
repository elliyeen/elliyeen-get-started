import { test, expect, type Page } from "@playwright/test";

const VIEWPORTS = [{ name: "mobile", width: 390, height: 844 }, { name: "tablet", width: 768, height: 1024 }, { name: "desktop", width: 1440, height: 900 }];
const PAGES = ["/tools", "/tools/ai-opportunity", "/tools/security-readiness", "/tools/automation-explorer", "/tools/roi-calculator"];

function watch(page: Page) {
  const external: string[] = [], errors: string[] = [], during: string[] = []; let interacting = false;
  page.on("request", (r) => { const u = r.url(); if (!u.startsWith("http://127.0.0.1:4173") && !u.startsWith("data:")) external.push(u); if (interacting && !u.startsWith("data:")) during.push(u); });
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); }); page.on("pageerror", (e) => errors.push(String(e)));
  return { external, errors, during, startInteraction: () => { interacting = true; } };
}

for (const vp of VIEWPORTS) {
  test.describe(`tools at ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });
    for (const path of PAGES) {
      test(`${path}: loads, noindex, no third-party requests, no console errors, no horizontal scroll, privacy note`, async ({ page }) => {
        const w = watch(page); await page.goto(path); await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
        await expect(page.getByTestId("privacy-note")).toContainText("Nothing is sent, saved or tracked");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
        expect(w.external).toEqual([]); expect(w.errors).toEqual([]);
        await page.screenshot({ path: `test-results/tools-${vp.name}-${path.replace(/\W+/g, "_")}.png`, fullPage: true });
      });
    }
    test("ROI calculator: keyboard only, results focus, zero requests while using it", async ({ page }) => {
      const w = watch(page); await page.goto("/tools/roi-calculator"); w.startInteraction();
      const values = ["200", "15", "30", "3", "20", "40", "60", "5000", "300", "12"];
      await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: /skip to the tool/i })).toBeFocused(); await page.keyboard.press("Enter");
      await page.keyboard.press("Tab"); await expect(page.getByLabel(/How many times a month/)).toBeFocused();
      for (const v of values) { await page.keyboard.type(v); await page.keyboard.press("Tab"); }
      await expect(page.getByRole("button", { name: /three cases/i })).toBeFocused(); await page.keyboard.press("Enter");
      await expect(page.getByRole("heading", { name: /three cases from your numbers/i })).toBeFocused();
      await expect(page.getByRole("table")).toBeVisible(); await expect(page.getByText(/not a prediction or a promise/)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      expect(w.during).toEqual([]); expect(w.errors).toEqual([]);
    });
    test("Opportunity assessment: choose with the keyboard, see a summary, nothing sent", async ({ page }) => {
      const w = watch(page); await page.goto("/tools/ai-opportunity"); w.startInteraction();
      await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: /skip to the tool/i })).toBeFocused(); await page.keyboard.press("Enter");
      await page.keyboard.press("Tab"); await expect(page.getByRole("radio").first()).toBeFocused();
      for (let i = 0; i < 8; i++) { await page.keyboard.press("ArrowDown"); await page.keyboard.press("Tab"); }
      await page.getByRole("button", { name: /see my summary/i }).focus(); await page.keyboard.press("Enter");
      await expect(page.locator("#opp-result")).toBeFocused(); await expect(page.getByText(/What this does not tell you/)).toBeVisible();
      expect(w.during).toEqual([]); expect(w.errors).toEqual([]);
    });
    test("Security readiness: answer by mouse, see the disclaimer and a health note, nothing sent", async ({ page }) => {
      const w = watch(page); await page.goto("/tools/security-readiness"); w.startInteraction();
      for (const g of await page.getByRole("group").all()) await g.getByLabel("Yes", { exact: true }).check();
      await page.getByRole("group", { name: /patient or health/ }).getByLabel("Not sure").check();
      await page.getByRole("button", { name: /gap summary/i }).click();
      await expect(page.locator("#sec-result")).toBeFocused(); await expect(page.getByText(/not a security assessment or audit/)).toBeVisible(); await expect(page.getByText(/worth settling first/)).toBeVisible();
      expect(w.during).toEqual([]); expect(w.errors).toEqual([]);
    });
    test("Explorer: filtering updates the list and keeps the illustrative label", async ({ page }) => {
      await page.goto("/tools/automation-explorer"); await page.getByLabel(/what kind of work/i).selectOption("verification");
      await expect(page.getByRole("heading", { level: 3, name: /benefits check assistant/i })).toBeVisible(); await expect(page.getByText("Illustrative example").first()).toBeVisible();
      await page.getByLabel(/patient or health information/).check(); await expect(page.getByTestId("explorer-notes")).toContainText("HIPAA may apply");
    });
  });
}

test("the staged tools are absent from the sitemap and the main navigation", async ({ page, request }) => {
  const sm = await request.get("/sitemap.xml"); expect(await sm.text()).not.toContain("/tools");
  await page.goto("/"); await expect(page.getByRole("link", { name: /^tools$/i })).toHaveCount(0);
});
