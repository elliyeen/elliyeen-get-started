import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { EsaGameCard } from "./EsaGameCard";
import { sampleGameCard } from "@/lib/sports/esa/sample-game-card";

const replace = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/sports/nfl/analysis/2026/week-1/denver-broncos-at-kansas-city-chiefs",
  useSearchParams: () => mockSearchParams,
}));

beforeEach(() => {
  replace.mockClear();
  mockSearchParams = new URLSearchParams();
});

describe("EsaGameCard — functional (F-01..F-10)", () => {
  it("F-01: initial render with no URL parameters selects Denver offense", () => {
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    expect(screen.getByRole("tab", { name: /Denver/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Offense/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Denver’s offense could not sustain possessions/)).toBeInTheDocument();
  });

  it("F-02: selecting Kansas City renders Kansas City content", async () => {
    const user = userEvent.setup();
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    await user.click(screen.getByRole("tab", { name: "Kansas City" }));
    expect(screen.getByText(/Kansas City’s offense won with run control/)).toBeInTheDocument();
  });

  it("F-03/F-04: switches independently to Kansas City defense", async () => {
    const user = userEvent.setup();
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);

    await user.click(screen.getByRole("tab", { name: "Kansas City" }));
    await user.click(screen.getByRole("tab", { name: "Defense" }));

    expect(screen.getByText(/How Kansas City.*restricted Denver|restricted Denver’s efficiency/)).toBeTruthy();
    expect(screen.getByText("2/12")).toBeInTheDocument();
    expect(screen.getByText("Prevent chunk gains")).toBeVisible();

    await user.click(screen.getByRole("tab", { name: "Denver" }));
    expect(screen.getByRole("tab", { name: "Defense" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Denver’s defense could not stop Kansas City/)).toBeInTheDocument();
  });

  it("F-05: selecting a finding reveals its evidence", async () => {
    const user = userEvent.setup();
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    await user.click(screen.getByRole("button", { name: /Create chunk gains/i }));
    expect(screen.getByRole("status", { name: "Selected finding evidence" })).toHaveTextContent(
      /two gains of at least 15 yards/i,
    );
  });

  it("F-06: reloads with ?team=KC&unit=defense preselected", () => {
    mockSearchParams = new URLSearchParams("team=KC&unit=defense");
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    expect(screen.getByRole("tab", { name: "Kansas City" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Defense" })).toHaveAttribute("aria-selected", "true");
  });

  it("F-07: invalid URL values fall back to Denver offense", () => {
    mockSearchParams = new URLSearchParams("team=XYZ&unit=nonsense");
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    expect(screen.getByRole("tab", { name: "Denver" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Offense" })).toHaveAttribute("aria-selected", "true");
  });

  it("F-08: all four combinations are reachable", async () => {
    const user = userEvent.setup();
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    for (const team of ["Denver", "Kansas City"]) {
      await user.click(screen.getByRole("tab", { name: team }));
      for (const unitName of ["Offense", "Defense"]) {
        await user.click(screen.getByRole("tab", { name: unitName }));
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      }
    }
  });

  it("F-09: missing analysis shows an unavailable-state message", () => {
    const data = structuredClone(sampleGameCard);
    data.analyses = data.analyses.filter((a) => !(a.teamId === "KC" && a.unit === "defense"));
    mockSearchParams = new URLSearchParams("team=KC&unit=defense");
    render(<EsaGameCard gameId={data.gameId} data={data} />);
    expect(screen.getByRole("alert")).toHaveTextContent(/not available for this team and unit/i);
  });

  it("F-10: schema-invalid response shows a safe data error, not invented values", () => {
    const data = structuredClone(sampleGameCard) as unknown as Record<string, unknown>;
    delete data.recordStatus;
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={data as never} />);
    expect(screen.getByRole("alert")).toHaveTextContent(/failed validation/i);
  });
});

describe("EsaGameCard — data integrity (D-01..D-08)", () => {
  it("D-01: final score renders Kansas City 31, Denver 10", () => {
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    expect(screen.getByLabelText(/Final score: Denver 10, Kansas City 31/)).toBeInTheDocument();
  });

  // D-02 (original spec): preliminary record status must render a visible
  // preliminary/gamebook-pending notice. That visible notice was explicitly
  // removed from the UI at the user's direction; recordStatus/gamebookVerified
  // remain "preliminary"/false in the underlying data (see sample-game-card.ts),
  // but no on-page label communicates that to a viewer anymore.

  it("D-03: a failed metric is withheld from the metric strip", () => {
    const data = structuredClone(sampleGameCard);
    data.analyses[0].metrics[0].validationStatus = "failed";
    render(<EsaGameCard gameId={data.gameId} data={data} />);
    expect(screen.queryByText(data.analyses[0].metrics[0].label)).not.toBeInTheDocument();
  });

  it("D-04: a null unavailable metric displays 'Unavailable', never 0", () => {
    mockSearchParams = new URLSearchParams("team=DEN&unit=defense");
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    expect(screen.getByText("Unavailable")).toBeInTheDocument();
    const metricStrip = screen.getByRole("list", { name: "Decision-relevant metrics" });
    expect(within(metricStrip).queryByText("0")).not.toBeInTheDocument();
  });

  it("D-05: a Grade D finding does not appear among published findings", () => {
    mockSearchParams = new URLSearchParams("team=DEN&unit=defense");
    render(<EsaGameCard gameId={sampleGameCard.gameId} data={sampleGameCard} />);
    expect(screen.queryByText("Validate fits and tackling")).not.toBeInTheDocument();
  });
});
