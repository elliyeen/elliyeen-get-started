import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SiteNav from "./SiteNav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("SiteNav — desktop Sports navigation", () => {
  it("displays Sports between Industries and Resources", () => {
    render(<SiteNav />);
    const labels = ["How It Works", "Industries", "Sports", "Resources"];
    const positions = labels.map((label) => screen.getByText(label).compareDocumentPosition);
    expect(positions.length).toBe(4);
    const industries = screen.getByText("Industries");
    const sports = screen.getByText("Sports");
    const resources = screen.getByText("Resources");
    // Industries precedes Sports precedes Resources in document order.
    expect(
      industries.compareDocumentPosition(sports) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      sports.compareDocumentPosition(resources) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("opens the Sports dropdown on click and shows NFL and College Football groups", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    const trigger = screen.getByRole("button", { name: /Sports/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const menu = screen.getByRole("menu", { name: "Sports" });
    expect(within(menu).getByRole("menuitem", { name: "NFL" })).toHaveAttribute(
      "href",
      "/sports/nfl",
    );
    expect(within(menu).getByRole("menuitem", { name: "College Football" })).toHaveAttribute(
      "href",
      "/sports/college-football",
    );
  });

  it("each Sports menu item resolves to the correct route", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    await user.click(screen.getByRole("button", { name: /Sports/i }));
    const menu = screen.getByRole("menu", { name: "Sports" });

    expect(within(menu).getByRole("menuitem", { name: "NFL Overview" })).toHaveAttribute(
      "href",
      "/sports/nfl",
    );
    expect(within(menu).getAllByRole("menuitem", { name: "Teams" }).length).toBe(2);
    expect(
      within(menu).getAllByRole("menuitem", { name: "Teams" })[0],
    ).toHaveAttribute("href", "/sports/nfl/teams");
    expect(
      within(menu).getAllByRole("menuitem", { name: "Game Analysis" })[0],
    ).toHaveAttribute("href", "/sports/nfl/analysis");
    expect(
      within(menu).getByRole("menuitem", { name: "College Football Overview" }),
    ).toHaveAttribute("href", "/sports/college-football");
  });

  it("closes the dropdown on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    const trigger = screen.getByRole("button", { name: /Sports/i });
    await user.click(trigger);
    expect(screen.getByRole("menu", { name: "Sports" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu", { name: "Sports" })).not.toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <SiteNav />
        <button>Outside</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /Sports/i }));
    expect(screen.getByRole("menu", { name: "Sports" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menu", { name: "Sports" })).not.toBeInTheDocument();
  });

  it("supports keyboard-only opening via Enter/Space on the trigger", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    const trigger = screen.getByRole("button", { name: /Sports/i });
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("menu", { name: "Sports" })).toBeInTheDocument();
  });

  it("existing header links and Get Started remain intact", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: "How It Works" })).toHaveAttribute(
      "href",
      "/how-it-works",
    );
    expect(screen.getByRole("link", { name: "Industries" })).toHaveAttribute("href", "/#cases");
    expect(screen.getByRole("link", { name: "Get Started" })).toBeInTheDocument();
  });
});

describe("SiteNav — active sports route", () => {
  it("marks Sports as the current page when on a sports route", async () => {
    vi.resetModules();
    vi.doMock("next/navigation", () => ({
      usePathname: () => "/sports/nfl",
    }));
    const { default: SiteNavOnSportsRoute } = await import("./SiteNav");
    render(<SiteNavOnSportsRoute />);
    expect(screen.getByRole("button", { name: /Sports/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
