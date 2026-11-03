import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { EsaGameCard } from "./EsaGameCard";
import { sampleGameCardDalNyg } from "@/lib/sports/esa/sample-game-card-dal-nyg";

// Architecture test, not a sports-accuracy test: proves the shared
// EsaGameCard, types and schema render an entirely different matchup with
// zero code changes — only the data changes. No DEN/KC-specific code path
// should be required for this to pass.

const replace = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/sports/nfl/analysis/2026/week-9/dallas-cowboys-vs-new-york-giants",
  useSearchParams: () => mockSearchParams,
}));

beforeEach(() => {
  replace.mockClear();
  mockSearchParams = new URLSearchParams();
});

describe("EsaGameCard — reusability with a second matchup (DAL vs NYG)", () => {
  it("renders both team names for a completely different matchup", () => {
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);
    expect(screen.getByRole("tab", { name: "Dallas" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "NY Giants" })).toBeInTheDocument();
  });

  it("defaults to the away team (Dallas), not a hard-coded franchise", () => {
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);
    expect(screen.getByRole("tab", { name: "Dallas" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Offense" })).toHaveAttribute("aria-selected", "true");
  });

  it("team and unit selectors work for the new matchup", async () => {
    const user = userEvent.setup();
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);

    await user.click(screen.getByRole("tab", { name: "NY Giants" }));
    expect(screen.getByText(/New York's offense controlled the game/)).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Defense" }));
    expect(screen.getByText(/New York's defense limited Dallas/)).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Dallas" }));
    expect(screen.getByRole("tab", { name: "Defense" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Dallas's defense could not get off the field/)).toBeInTheDocument();
  });

  it("all four team/unit combinations render for the new matchup", async () => {
    const user = userEvent.setup();
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);
    for (const teamName of ["Dallas", "NY Giants"]) {
      await user.click(screen.getByRole("tab", { name: teamName }));
      for (const unitName of ["Offense", "Defense"]) {
        await user.click(screen.getByRole("tab", { name: unitName }));
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      }
    }
  });

  it("accepts ?team=NYG from the URL for this game", () => {
    mockSearchParams = new URLSearchParams("team=NYG&unit=defense");
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);
    expect(screen.getByRole("tab", { name: "NY Giants" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Defense" })).toHaveAttribute("aria-selected", "true");
  });

  it("falls back to the away team (Dallas) for a team ID not in this game", () => {
    mockSearchParams = new URLSearchParams("team=KC&unit=offense");
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);
    expect(screen.getByRole("tab", { name: "Dallas" })).toHaveAttribute("aria-selected", "true");
  });

  it("final score renders both team names and scores from data", () => {
    render(<EsaGameCard gameId={sampleGameCardDalNyg.gameId} data={sampleGameCardDalNyg} />);
    expect(screen.getByLabelText(/Final score: Dallas 17, New York Giants 24/)).toBeInTheDocument();
  });
});
