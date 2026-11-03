import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import MobileNav from "./MobileNav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("MobileNav — Sports hierarchy", () => {
  it("contains the complete Sports hierarchy inside the hamburger menu", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const dialog = screen.getByRole("dialog", { name: "Navigation menu" });
    expect(within(dialog).getByRole("link", { name: "Sports" })).toHaveAttribute(
      "href",
      "/sports",
    );
    expect(within(dialog).getByRole("button", { name: /NFL/ })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: /College Football/ })).toBeInTheDocument();
  });

  it("expands NFL and College Football sections independently (only one open at a time)", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const nflToggle = screen.getByRole("button", { name: /NFL/ });
    const cfbToggle = screen.getByRole("button", { name: /College Football/ });
    expect(nflToggle).toHaveAttribute("aria-expanded", "false");
    expect(cfbToggle).toHaveAttribute("aria-expanded", "false");

    await user.click(nflToggle);
    expect(nflToggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Game Analysis" })).toHaveAttribute(
      "href",
      "/sports/nfl/analysis",
    );

    await user.click(cfbToggle);
    expect(cfbToggle).toHaveAttribute("aria-expanded", "true");
    expect(nflToggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes after a destination is selected and restores focus to the hamburger button", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    await user.click(trigger);

    await user.click(screen.getByRole("link", { name: "Sports" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("existing links and Get Started remain intact", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("link", { name: "How It Works" })).toHaveAttribute(
      "href",
      "/how-it-works",
    );
    expect(screen.getByRole("link", { name: "Get Started" })).toBeInTheDocument();
  });
});
