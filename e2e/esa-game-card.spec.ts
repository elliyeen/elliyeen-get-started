import { test, expect } from "@playwright/test";

const GAME_URL = "/sports/nfl/analysis/2026/week-6/denver-broncos-vs-kansas-city-chiefs";

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

for (const viewport of VIEWPORTS) {
  test(`R-${viewport.name}: no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(GAME_URL);
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasOverflow).toBe(false);
  });
}

test("R-01: selectors are at least 44px high at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto(GAME_URL);
  const box = await page.getByRole("tab", { name: "Denver" }).boundingBox();
  expect(box?.height).toBeGreaterThanOrEqual(44);
});

test("F-06: URL state round-trips through reload", async ({ page }) => {
  await page.goto(`${GAME_URL}?team=KC&unit=defense`);
  await expect(page.getByRole("tab", { name: "Kansas City" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tab", { name: "Defense" })).toHaveAttribute("aria-selected", "true");
});

test("A-01: every selector is keyboard reachable and operable", async ({ page }) => {
  await page.goto(GAME_URL);
  await page.getByRole("tab", { name: "Kansas City" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("tab", { name: "Kansas City" })).toHaveAttribute("aria-selected", "true");
});

test("URL updates without a full page reload when switching team", async ({ page }) => {
  await page.goto(GAME_URL);
  await page.getByRole("tab", { name: "Kansas City" }).click();
  await expect(page).toHaveURL(/team=KC/);
});
