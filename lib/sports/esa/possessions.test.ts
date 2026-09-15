import { describe, expect, it } from "vitest";
import { possessionsByTeam } from "./possessions";
import { possessionEntrySchema } from "./schema";

describe("possessionsByTeam", () => {
  it("has 12 possessions for both Denver and Kansas City", () => {
    expect(possessionsByTeam.DEN).toHaveLength(12);
    expect(possessionsByTeam.KC).toHaveLength(12);
  });

  it("validates every possession entry against the ESA schema", () => {
    for (const entries of Object.values(possessionsByTeam)) {
      for (const entry of entries) {
        expect(possessionEntrySchema.safeParse(entry).success).toBe(true);
      }
    }
  });

  it("never labels a turnover with the bare generic term — every turnover carries its mechanism", () => {
    for (const entries of Object.values(possessionsByTeam)) {
      for (const entry of entries) {
        if (entry.result === "TURNOVER") {
          expect(entry.turnoverType).toBeDefined();
          expect(entry.coachingNote).not.toBe("Turnover");
          expect(["Interception", "Fumble"]).toContain(entry.coachingNote);
        }
      }
    }
  });

  it("preserves the original source label separately from the normalized coaching note", () => {
    const scoringDrive = possessionsByTeam.KC.find((p) => p.possessionNumber === 1)!;
    expect(scoringDrive.sourceLabel).toBe("Throughput achieved");
    expect(scoringDrive.coachingNote).toBe("Turn possessions into points");
  });

  it("does not use any banned pre-ESA vocabulary in coachingNote", () => {
    const banned = [
      "Throughput achieved",
      "Series survival",
      "Red-zone conversion",
      "Lead management",
      "Ball security",
      "Clock termination",
    ];
    for (const entries of Object.values(possessionsByTeam)) {
      for (const entry of entries) {
        expect(banned).not.toContain(entry.coachingNote);
      }
    }
  });

  it("reconciles Denver's scoring possessions to the final score of 10", () => {
    const points = possessionsByTeam.DEN.reduce((sum, p) => sum + p.points, 0);
    expect(points).toBe(10);
  });

  it("reconciles Kansas City's scoring possessions to the final score of 31", () => {
    const points = possessionsByTeam.KC.reduce((sum, p) => sum + p.points, 0);
    expect(points).toBe(31);
  });
});
