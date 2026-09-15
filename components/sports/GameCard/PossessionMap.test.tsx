import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PossessionMap } from "./PossessionMap";
import type { PossessionEntry } from "@/lib/sports/esa/types";

const samplePossessions: PossessionEntry[] = [
  {
    possessionNumber: 1,
    teamId: "DEN",
    startFieldPosition: 25,
    endFieldPosition: 70,
    result: "PUNT",
    points: 0,
    isScoring: false,
  },
  {
    possessionNumber: 2,
    teamId: "DEN",
    startFieldPosition: 32,
    endFieldPosition: 100,
    result: "TD",
    points: 7,
    isScoring: true,
  },
];

describe("PossessionMap", () => {
  it("shows the honest unavailable state when no possessions are supplied", () => {
    render(<PossessionMap teamName="Denver" teamId="DEN" />);
    expect(
      screen.getByText(/Possession-level field position data is unavailable/),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders one selectable lane per possession when data is supplied", () => {
    render(<PossessionMap teamName="Denver" teamId="DEN" possessions={samplePossessions} />);
    expect(screen.getByRole("img", { name: /Denver possession production/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("updates the live detail region when a possession is selected via keyboard", async () => {
    const user = userEvent.setup();
    render(<PossessionMap teamName="Denver" teamId="DEN" possessions={samplePossessions} />);
    const [, secondPossession] = screen.getAllByRole("button");
    secondPossession.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent(/Possession 2/);
    expect(screen.getByRole("status")).toHaveTextContent(/Touchdown/);
    expect(screen.getByRole("status")).toHaveTextContent(/7 points/);
  });

  it("updates the live detail region when a possession is selected via click", async () => {
    const user = userEvent.setup();
    render(<PossessionMap teamName="Denver" teamId="DEN" possessions={samplePossessions} />);
    const [firstPossession] = screen.getAllByRole("button");
    await user.click(firstPossession);
    expect(screen.getByRole("status")).toHaveTextContent(/Possession 1/);
    expect(screen.getByRole("status")).toHaveTextContent(/Punt/);
  });
});
