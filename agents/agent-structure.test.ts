import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression: upgrades must not remove the v1.0 sections of agents 07, 09 and 24.
const ORIGINAL: Record<string, string[]> = {
  "07-apple-design.md": ["## Mission", "## Simplicity Test", "## White Space Audit", "## Typography Audit", "## Color Discipline", "## Premium Feel Assessment", "## The Trust Signal Question", "## Output", "**Design Score: X/100**"],
  "09-conversion.md": ["## Mission", "## Conversion Funnel Map", "## Hero Audit", "## CTA Audit", "## Lead Magnet Audit", "## Form Audit", "## Abandonment Prediction", "## Urgency and Momentum", "## Output", "**Conversion Score: X/100**"],
  "24-seo-growth-engineering.md": ["## Objective", "## Primary Goal", "## Produce Implementation Specifications", "## Information Architecture", "## Search Intent", "## Keyword Strategy", "## Content Specification", "## Technical SEO Specification", "## Internal Linking", "## AI Search Optimization", "## Engineering Deliverables", "## Performance Requirements", "**Supersedes:** Agent 14"],
};
const dir = __dirname;

describe.each(Object.entries(ORIGINAL))("%s", (file, sections) => {
  const text = readFileSync(join(dir, file), "utf8");
  it.each(sections)("keeps original section %s", (s) => { expect(text).toContain(s); });
  it("has a v1.1 version header and change log keeping v1.0", () => {
    expect(text).toMatch(/\*\*Version:\*\* 1\.1/);
    expect(text).toContain("- v1.0 — Baseline version header added.");
  });
  it("has the evidence protocol with Not Measured, referral and self-heal limits", () => {
    expect(text).toContain("## Evidence Protocol (v1.1)");
    expect(text).toContain("`Not Measured`");
    expect(text).toContain("Out-of-scope referral");
    expect(text).toContain("It may not edit this file");
  });
});

describe("agents not in the pilot are unchanged in version", () => {
  it.each(["01-purpose.md", "08-trust.md", "22-kaizen.md"])("%s stays at v1.0", (f) => {
    expect(readFileSync(join(dir, f), "utf8")).toMatch(/\*\*Version:\*\* 1\.0/);
  });
});
