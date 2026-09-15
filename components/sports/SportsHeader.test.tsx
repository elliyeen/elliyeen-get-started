import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SportsHeader from "./SportsHeader";

let mockPathname = "/sports";
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("SportsHeader", () => {
  it("renders the wordmark and top-level nav items", () => {
    mockPathname = "/sports";
    render(<SportsHeader />);
    expect(screen.getByText("ELLIYEEN")).toBeVisible();
    expect(screen.getByText("Sports Home")).toBeVisible();
    expect(screen.getByRole("button", { name: /^NFL/ })).toBeVisible();
    expect(screen.getByRole("button", { name: /^College Football/ })).toBeVisible();
    expect(screen.getByRole("button", { name: /^Game Intelligence/ })).toBeVisible();
    expect(screen.getByText("Main Site")).toBeVisible();
  });

  it("marks the current top-level route with aria-current", () => {
    mockPathname = "/sports/nfl/teams";
    render(<SportsHeader />);
    expect(screen.getByRole("button", { name: /^NFL/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: /^College Football/ })).not.toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("opens the NFL dropdown on click and shows Games, Analysis, Teams", async () => {
    mockPathname = "/sports";
    const user = userEvent.setup();
    render(<SportsHeader />);
    const nflButton = screen.getByRole("button", { name: /^NFL/ });
    expect(nflButton).toHaveAttribute("aria-expanded", "false");
    await user.click(nflButton);
    expect(nflButton).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByRole("menu", { name: "NFL" });
    expect(within(menu).getByText("Games")).toBeVisible();
    expect(within(menu).getByText("Analysis")).toBeVisible();
    expect(within(menu).getByText("Teams")).toBeVisible();
  });

  it("closes the open dropdown on Escape", async () => {
    mockPathname = "/sports";
    const user = userEvent.setup();
    render(<SportsHeader />);
    await user.click(screen.getByRole("button", { name: /^NFL/ }));
    expect(screen.getByRole("menu", { name: "NFL" })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu", { name: "NFL" })).not.toBeInTheDocument();
  });

  it("does not use team-specific colors in the header", () => {
    mockPathname = "/sports";
    const { container } = render(<SportsHeader />);
    const html = container.innerHTML.toLowerCase();
    expect(html).not.toContain("#002244");
    expect(html).not.toContain("#e31837");
  });
});
