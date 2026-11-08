// @vitest-environment node
import { describe, it, expect } from "vitest";
// @ts-ignore plain ESM helpers
import { parseCsv, toCsv, buildSheet, validateSheet, disagreements, toGoldCases, itemId, COLUMNS } from "./rubric/review/lib.mjs";

const gold = { cases: [{ fixture: "f1", viewport: "desktop", detector: "R1" }] };
const detectors = { R1: { desc: "rule one" }, R2: { desc: "rule, two" } };

describe("blind review sheet", () => {
  it("csv round-trips commas, quotes and newlines", () => {
    const rows = [{ item_id: "a", fixture: 'f"x', viewport: "d", rule_id: "R", rule_text: "a,b\nc", page_file: "p", expected: "", reviewer_note: "" }];
    expect(parseCsv(toCsv(rows))).toEqual(rows);
  });
  it("excludes labelled pairs, mixes flagged with decoys and does not reveal which is which", () => {
    const flagged = new Set(["f1@mobile:R1", "f2@desktop:R2"]);
    const { rows, key } = buildSheet({ fixtures: ["f1", "f2", "f3"], detectors, gold, flaggedKeys: flagged, decoys: 3 });
    expect(rows.some((r: any) => r.fixture === "f1" && r.viewport === "desktop" && r.rule_id === "R1")).toBe(false);
    expect(rows).toHaveLength(5);
    expect(Object.values(key).filter((v) => v === "flagged")).toHaveLength(2);
    expect(Object.keys(rows[0])).toEqual(COLUMNS);
    expect(JSON.stringify(rows)).not.toMatch(/flagged|decoy/);
  });
  it("draws decoys only from rules that were flagged", () => {
    const { rows } = buildSheet({ fixtures: ["f1", "f2", "f3"], detectors, gold, flaggedKeys: new Set(["f2@desktop:R2"]), decoys: 10 });
    expect(new Set(rows.map((r: any) => r.rule_id))).toEqual(new Set(["R2"]));
  });
  it("is deterministic for a seed", () => {
    const a = buildSheet({ fixtures: ["f1", "f2", "f3"], detectors, gold, flaggedKeys: new Set(), decoys: 4, seed: 7 });
    const b = buildSheet({ fixtures: ["f1", "f2", "f3"], detectors, gold, flaggedKeys: new Set(), decoys: 4, seed: 7 });
    expect(a.rows).toEqual(b.rows);
  });
  it("rejects blanks, bad labels, altered columns, missing reviewer", () => {
    const blank = [{ item_id: itemId("f2", "desktop", "R1"), fixture: "f2", viewport: "desktop", rule_id: "R1", rule_text: "t", page_file: "p", expected: "", reviewer_note: "" }];
    expect(validateSheet(blank, [{ ...blank[0], expected: "" }], "A").errors.join()).toMatch(/must be one of/);
    expect(validateSheet(blank, [{ ...blank[0], expected: "maybe" }], "A").errors.join()).toMatch(/must be one of/);
    expect(validateSheet(blank, [{ ...blank[0], fixture: "zzz", expected: "positive" }], "A").errors.join()).toMatch(/altered/);
    expect(validateSheet(blank, [{ ...blank[0], expected: "positive" }], "").errors.join()).toMatch(/reviewer name/);
    expect(validateSheet(blank, [], "A").errors.join()).toMatch(/missing item/);
    expect(validateSheet(blank, [{ ...blank[0], expected: "positive" }], "A").errors).toEqual([]);
  });
  it("finds disagreements and keeps excluded items out of gold", () => {
    const l = (id: string, e: string) => ({ item_id: id, fixture: "f", viewport: "desktop", rule: "R1", text: "t", expected: e, note: "" });
    expect(disagreements([l("a", "positive"), l("b", "negative")], [l("a", "negative"), l("b", "negative")]).map((d: any) => d.item_id)).toEqual(["a"]);
    const cases = toGoldCases([l("a", "positive"), l("b", "exclude")], "Rev", () => "high");
    expect(cases).toHaveLength(1);
    expect(cases[0]).toMatchObject({ agent: "09", expected: "positive", severity: "high", adjudication: null });
  });
});
