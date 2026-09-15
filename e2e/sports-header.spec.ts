import { test, expect } from "@playwright/test";

const GAME_CARD_PATH =
  "/sports/nfl/analysis/2026/week-1/denver-broncos-at-kansas-city-chiefs";

test.describe("Sports section header", () => {
  test("replaces the marketing header on every /sports route, keeps it elsewhere", async ({
    page,
  }) => {
    await page.goto("/sports");
    await expect(page.locator("header").getByText("Sports Home")).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" })).toHaveCount(0);

    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Get Started" }),
    ).toBeVisible();
  });

  test("marks the active top-level destination with aria-current at every route depth", async ({
    page,
  }) => {
    await page.goto("/sports/nfl/teams");
    await expect(page.getByRole("button", { name: /^NFL/ })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await page.goto(GAME_CARD_PATH);
    await expect(page.getByRole("button", { name: /^NFL/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("dropdowns open with mouse and close on Escape / outside click", async ({ page }) => {
    await page.goto("/sports");
    const nflButton = page.getByRole("button", { name: /^NFL/ });
    await nflButton.click();
    const menu = page.getByRole("menu", { name: "NFL" });
    await expect(menu.getByText("Games")).toBeVisible();
    await expect(menu.getByText("Analysis")).toBeVisible();
    await expect(menu.getByText("Teams")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await nflButton.click();
    await expect(page.getByRole("menu", { name: "NFL" })).toBeVisible();
    await page.mouse.click(10, 500);
    await expect(page.getByRole("menu", { name: "NFL" })).toBeHidden();
  });

  test("keyboard users can reach and operate the dropdown", async ({ page }) => {
    await page.goto("/sports");
    await page.keyboard.press("Tab"); // wordmark
    await page.keyboard.press("Tab"); // Sports Home
    await page.keyboard.press("Tab"); // NFL
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menu", { name: "NFL" })).toBeVisible();
  });

  test("Game Intelligence links to methodology and the featured game card", async ({ page }) => {
    await page.goto("/sports/game-intelligence");
    await expect(page.getByRole("heading", { name: "Game Intelligence" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Methodology" })).toBeVisible();
    await expect(page.getByRole("link", { name: /View the game card/i })).toHaveAttribute(
      "href",
      GAME_CARD_PATH,
    );
  });

  test.describe("mobile", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("hamburger opens the full sports hierarchy and no horizontal overflow", async ({
      page,
    }) => {
      await page.goto("/sports");
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow).toBe(false);

      await page.getByRole("button", { name: "Open menu" }).click();
      const panel = page.getByRole("dialog", { name: "Sports navigation menu" });
      await expect(panel.getByText("Sports Home")).toBeVisible();
      await expect(panel.getByText("College Football")).toBeVisible();
      await expect(panel.getByText("Game Intelligence")).toBeVisible();

      await panel.getByRole("button", { name: "NFL" }).click();
      await expect(panel.getByText("Analysis")).toBeVisible();
    });
  });

  test.describe("responsive overflow", () => {
    for (const width of [320, 390, 768, 1440]) {
      test(`no horizontal overflow at ${width}px on the game card`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(GAME_CARD_PATH);
        const hasOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(hasOverflow).toBe(false);
      });
    }
  });
});
