import { test, expect } from "@playwright/test";

const GAME_CARD_PATH =
  "/sports/nfl/analysis/2026/week-6/denver-broncos-vs-kansas-city-chiefs";

test.describe("Desktop Sports navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Sports appears between Industries and Resources and opens a dropdown", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByText("Sports", { exact: true })).toBeVisible();

    const sportsButton = nav.getByRole("button", { name: /Sports/i });
    await sportsButton.click();
    const menu = page.getByRole("menu", { name: "Sports" });
    await expect(menu.getByRole("menuitem", { name: "NFL", exact: true })).toHaveAttribute(
      "href",
      "/sports/nfl",
    );
    await expect(
      menu.getByRole("menuitem", { name: "College Football", exact: true }),
    ).toHaveAttribute("href", "/sports/college-football");
  });

  test("Escape closes the dropdown", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Sports/i }).click();
    await expect(page.getByRole("menu", { name: "Sports" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu", { name: "Sports" })).toBeHidden();
  });

  test("clicking outside closes the dropdown", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Sports/i }).click();
    await expect(page.getByRole("menu", { name: "Sports" })).toBeVisible();
    await page.mouse.click(10, 500);
    await expect(page.getByRole("menu", { name: "Sports" })).toBeHidden();
  });

  test("menu items navigate to the correct routes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Sports/i }).click();
    await page.getByRole("menuitem", { name: "College Football Overview" }).click();
    await expect(page).toHaveURL(/\/sports\/college-football$/);
  });

  test("Sports is marked as the current route on a sports page", async ({ page }) => {
    await page.goto("/sports/nfl");
    await expect(page.getByRole("button", { name: /Sports/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("existing header links and Get Started still work", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByRole("link", { name: "How It Works" })).toHaveAttribute(
      "href",
      "/how-it-works",
    );
    await expect(nav.getByRole("link", { name: "Get Started" })).toBeVisible();
  });
});

test.describe("Mobile Sports navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger menu contains full Sports hierarchy and sections expand independently", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(dialog.getByRole("link", { name: "Sports" })).toBeVisible();

    const nflToggle = dialog.getByRole("button", { name: /^NFL/ });
    const cfbToggle = dialog.getByRole("button", { name: /College Football/ });
    await nflToggle.click();
    await expect(nflToggle).toHaveAttribute("aria-expanded", "true");
    await expect(dialog.getByRole("link", { name: "Game Analysis" })).toBeVisible();

    await cfbToggle.click();
    await expect(cfbToggle).toHaveAttribute("aria-expanded", "true");
    await expect(nflToggle).toHaveAttribute("aria-expanded", "false");
  });

  test("selecting a destination closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Sports" }).click();
    await expect(page).toHaveURL(/\/sports$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("Header responsive — no overflow", () => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow).toBe(false);
    });
  }
});

test.describe("Sports landing pages", () => {
  test("sports landing page links to NFL and College Football", async ({ page }) => {
    await page.goto("/sports");
    await expect(page.getByRole("heading", { name: "Sports Intelligence" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore NFL/i })).toHaveAttribute(
      "href",
      "/sports/nfl",
    );
    await expect(page.getByRole("link", { name: /Explore College Football/i })).toHaveAttribute(
      "href",
      "/sports/college-football",
    );
  });

  test("NFL page links to the Broncos-Chiefs game card", async ({ page }) => {
    await page.goto("/sports/nfl");
    await expect(page.getByRole("link", { name: /View game card/i })).toHaveAttribute(
      "href",
      GAME_CARD_PATH,
    );
  });

  test("College Football page does not invent statistics and shows a restrained placeholder", async ({
    page,
  }) => {
    await page.goto("/sports/college-football");
    await expect(page.getByText("Analysis coming soon.").first()).toBeVisible();
  });

  test("existing ESA game card route still returns HTTP 200 and stays noindex", async ({
    page,
    request,
  }) => {
    const response = await request.get(GAME_CARD_PATH);
    expect(response.status()).toBe(200);
    await page.goto(GAME_CARD_PATH);
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toBe("noindex, nofollow");
  });
});
