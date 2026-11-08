import { describe, it, expect } from "vitest";
// @ts-ignore plain ESM helper
import * as a from "./analyze.mjs";

// All inputs are synthetic.
describe("foldCtas", () => {
  const vh = 900;
  it("flags a hero CTA below the fold and a header CTA separately", () => {
    const r = a.foldCtas([
      { text: "(949) 555-0100 call", href: "tel:+19495550100", top: 102, height: 44, inHeader: true },
      { text: "Call Now", href: "tel:+18005550101", top: 920, height: 54 },
    ], vh);
    expect(r.heroStatus).toBe("below-fold");
    expect(r.headerCtaVisible).toBe(true);
  });
  it("reports partial visibility with pixels", () => {
    const r = a.foldCtas([{ text: "Call Now", href: "tel:1", top: 817, height: 54 }], 844);
    expect(r.rows[0].status).toBe("partially-visible");
    expect(r.rows[0].visiblePx).toBe(27);
    expect(r.heroStatus).toBe("partially-visible");
  });
  it("treats tel: links as CTA candidates even when the label is a number", () => {
    const r = a.foldCtas([{ text: "(949) 555-0100", href: "tel:+19495550100", top: 920, height: 54 }], 900);
    expect(r.rows[0].status).toBe("below-fold");
    expect(r.heroStatus).toBe("below-fold");
  });
  it("ignores fixed side tabs when deciding the hero status", () => {
    const r = a.foldCtas([{ text: "VERIFY BENEFITS", href: "#x", top: 360, height: 180, fixed: true }], vh);
    expect(r.heroStatus).toBe("none-found");
  });
});

describe("labelChecks", () => {
  it("finds verify labels that call and counts generic labels", () => {
    const r = a.labelChecks([
      { text: "Verify Insurance", href: "tel:(877) 555-0102" },
      { text: "Learn More", href: "/a" }, { text: "Learn More", href: "/b" }, { text: "Get Started", href: "/c" },
    ]);
    expect(r.issues.some((i) => i.kind === "verify-label-calls")).toBe(true);
    expect(r.genericCounts).toEqual({ "learn more": 2, "get started": 1 });
  });
});

describe("phoneTargets", () => {
  it("dedupes formats and never infers intent", () => {
    const r = a.phoneTargets(["tel:+19495550100", "tel:(949)%20555-0100", "tel:(877)%20555-0102"], "Call (949) 555-0100");
    expect(r.linkTargets.sort()).toEqual(["8775550102", "9495550100"]);
    expect(r.linkOnly).toEqual(["8775550102"]);
    expect(r.intent).toBe("Not Measured");
  });
});

describe("jsonLdDuplicates", () => {
  it("reports repeated types across blocks", () => {
    const r = a.jsonLdDuplicates([["WebSite", "Organization"], ["MedicalClinic", "MedicalClinic", "WebSite"], ["WebSite"]]);
    expect(r.duplicates).toEqual([{ type: "WebSite", n: 3 }, { type: "MedicalClinic", n: 2 }]);
  });
});

describe("urlPatterns", () => {
  it("flags mixed depth and inconsistent -treatment suffix", () => {
    const r = a.urlPatterns(["https://x.test/depression-treatment/", "https://x.test/mental-health/bipolar-disorder-treatment/", "https://x.test/mental-health/ptsd/"]);
    expect(r.mixedDepth).toBe(true);
    expect(r.suffixInconsistent).toBe(true);
  });
  it("passes a consistent set", () => {
    expect(a.urlPatterns(["https://x.test/a-treatment/", "https://x.test/b-treatment/"]).suffixInconsistent).toBe(false);
  });
});

describe("overlays", () => {
  it("lists overlays and the text they cover", () => {
    const r = a.overlays([{ name: "a11y", x: 10, y: 800, w: 50, h: 50 }, { name: "chat", x: 300, y: 780, w: 60, h: 60 }], [{ x: 20, y: 790, w: 200, h: 30, text: "Flexible Scheduling" }]);
    expect(r.count).toBe(2);
    expect(r.covering.map((c) => c.name)).toEqual(["a11y"]);
  });
});

describe("contrast", () => {
  it("computes known ratios", () => {
    expect(a.contrastRatio([0, 0, 0], [255, 255, 255])).toBe(21);
    expect(a.contrastRatio([119, 119, 119], [255, 255, 255])).toBeCloseTo(4.48, 1);
  });
  it("refuses to guess over images", () => {
    const v = a.contrastVerdict([255, 255, 255], null, "image");
    expect(v.ratio).toBe("Not Measured");
    expect(v.pass).toBe("Not Measured");
  });
  it("applies the large-text threshold", () => {
    expect(a.contrastVerdict([119, 119, 119], [255, 255, 255], "solid", true).pass).toBe(true);
    expect(a.contrastVerdict([119, 119, 119], [255, 255, 255], "solid", false).pass).toBe(false);
  });
});

describe("position", () => {
  it("reports percent and viewports down", () => {
    expect(a.position(9657, 14611, 900)).toEqual({ top: 9657, pctDown: 66, viewportsDown: 10.7 });
  });
});

describe("feedback records", () => {
  const base = { agent: "09-conversion", version: "1.1", runId: "r1", inputs: "https://example.test/", evidenceLinks: ["E1"], findings: [{ id: "09-1", confidence: "high" }] };
  it("builds a valid record with Not Measured outcome", () => {
    const r = a.buildFeedbackRecord(base);
    expect(a.validateFeedbackRecord(r)).toEqual([]);
    expect(r.outcome).toBe("Not Measured");
    expect(r.findings[0].disposition).toBe("pending_human_review");
  });
  it("rejects bad records", () => {
    const r = a.buildFeedbackRecord({ ...base, findings: [{ id: "x", confidence: "certain" }] });
    expect(a.validateFeedbackRecord(r).join()).toMatch(/confidence/);
    expect(a.validateFeedbackRecord({}).length).toBeGreaterThan(3);
  });
});
