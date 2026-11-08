import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import OpportunityAssessment from "./OpportunityAssessment";
import SecurityReadiness from "./SecurityReadiness";
import SolutionExplorer from "./SolutionExplorer";
import RoiCalculator from "./RoiCalculator";
import ToolShell from "./ToolShell";
import { QUESTIONS } from "@/lib/tools/opportunity";
import { ITEMS } from "@/lib/tools/security";
import sitemap from "@/app/sitemap";

vi.mock("next/navigation", () => ({ usePathname: () => "/tools" }));
vi.mock("next/link", () => ({ default: ({ href, children, ...r }: any) => <a href={href} {...r}>{children}</a> }));

const pick = async (u: ReturnType<typeof userEvent.setup>, legend: string | RegExp, label: string | RegExp) => {
  const group = screen.getByRole("group", { name: legend }); await u.click(within(group).getByLabelText(label));
};

describe("AI Opportunity Assessment (UI)", () => {
  it("asks for the missing answers instead of guessing, then shows a summary and moves focus to it", async () => {
    const u = userEvent.setup(); render(<OpportunityAssessment />);
    await u.click(screen.getByRole("button", { name: /see my summary/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/8 questions still need an answer/);
    for (const q of QUESTIONS) await pick(u, q.text, q.options[q.kind === "fit" ? 3 : 0].label);
    await u.click(screen.getByRole("button", { name: /see my summary/i }));
    const h = await screen.findByRole("heading", { name: /worth a conversation/i }); await waitFor(() => expect(h).toHaveFocus());
    expect(screen.getByText(/does not tell you/i)).toBeInTheDocument();
  });
  it("shows the regulated-data caution and never says compliant", async () => {
    const u = userEvent.setup(); render(<OpportunityAssessment />);
    for (const q of QUESTIONS) await pick(u, q.text, q.options[q.id === "sensitivity" ? 3 : q.kind === "fit" ? 3 : 0].label);
    await u.click(screen.getByRole("button", { name: /see my summary/i }));
    expect(await screen.findByText(/Do not use real records/)).toBeInTheDocument(); expect(document.body.textContent).not.toMatch(/compliant|certified/i);
  });
  it("Start over clears answers and the result", async () => {
    const u = userEvent.setup(); render(<OpportunityAssessment />);
    for (const q of QUESTIONS) await pick(u, q.text, q.options[1].label);
    await u.click(screen.getByRole("button", { name: /see my summary/i })); expect(await screen.findByRole("heading", { level: 2 })).toBeInTheDocument();
    await u.click(screen.getByRole("button", { name: /start over/i })); expect(screen.queryByRole("heading", { level: 2 })).toBeNull(); expect(screen.getAllByRole("radio").every((r) => !(r as HTMLInputElement).checked)).toBe(true);
  });
  it("is operable by keyboard alone (tab to a radio group, arrow to choose, Enter submits)", async () => {
    const u = userEvent.setup(); render(<OpportunityAssessment />);
    await u.tab(); expect(document.activeElement?.getAttribute("type")).toBe("radio"); await u.keyboard("{ArrowDown}");
    expect((document.activeElement as HTMLInputElement).checked).toBe(true);
  });
});

describe("Security Readiness (UI)", () => {
  it("lists gaps, the not-an-audit disclaimer and a health note that decides nothing", async () => {
    const u = userEvent.setup(); render(<SecurityReadiness />);
    for (const i of ITEMS) await pick(u, i.text, i.id === "mfa" ? "No" : i.id === "backup" ? "Not sure" : "Yes");
    await pick(u, /patient or health information/i, "Yes");
    await u.click(screen.getByRole("button", { name: /gap summary/i }));
    const h = await screen.findByRole("heading", { name: /10 of 12 basics in place/i }); await waitFor(() => expect(h).toHaveFocus());
    expect(screen.getByText(/not a security assessment or audit/)).toBeInTheDocument(); expect(screen.getByText(/may apply/)).toBeInTheDocument(); expect(screen.getByText(/answered No/)).toBeInTheDocument(); expect(screen.getByText(/not confirmed/)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/(?<!tell you that )you are (secure|compliant)|HIPAA compliant/i);
  });
  it("reports unanswered questions", async () => {
    const u = userEvent.setup(); render(<SecurityReadiness />); await u.click(screen.getByRole("button", { name: /gap summary/i })); expect(screen.getByRole("alert")).toHaveTextContent(/13 questions still need an answer/);
  });
});

describe("Solution Explorer (UI)", () => {
  it("filters, shows human checkpoints and always labels examples as illustrative", async () => {
    const u = userEvent.setup(); render(<SolutionExplorer />);
    expect(screen.getAllByText(/Illustrative example/i).length).toBeGreaterThan(0); expect(screen.getByTestId("explorer-notes")).toHaveTextContent(/not recommendations, prices or promises/);
    await u.selectOptions(screen.getByLabelText(/what kind of work/i), "reporting"); expect(screen.getByRole("heading", { level: 3, name: /weekly report/i })).toBeInTheDocument(); expect(screen.getByText(/Where a person stays in charge/)).toBeInTheDocument();
  });
  it("shows the health caution when asked, and an honest empty state", async () => {
    const u = userEvent.setup(); render(<SolutionExplorer />);
    await u.click(screen.getByLabelText(/patient or health information/i)); expect(screen.getByTestId("explorer-notes")).toHaveTextContent(/HIPAA may apply/);
    await u.selectOptions(screen.getByLabelText(/what kind of work/i), "reporting"); await u.click(screen.getByLabelText("Paper or scanned forms")); expect(screen.getByText(/does not mean it cannot be done/i)).toBeInTheDocument();
  });
});

describe("ROI Calculator (UI)", () => {
  const fill = async (u: ReturnType<typeof userEvent.setup>, v: Record<string, string>) => { for (const [id, val] of Object.entries(v)) { const el = document.getElementById(id) as HTMLInputElement; await u.clear(el); await u.type(el, val); } };
  const good = { tasksPerMonth: "200", minutesPerTask: "15", hourlyCostUsd: "30", reviewMinutesPerAutomatedTask: "3", shareConservativePct: "20", shareBasePct: "40", shareOptimisticPct: "60", oneTimeCostUsd: "5000", monthlyRunCostUsd: "300", horizonMonths: "12" };
  it("starts empty (nothing pre-filled) and explains each field problem next to the field", async () => {
    const u = userEvent.setup(); render(<RoiCalculator />);
    for (const el of screen.getAllByRole("textbox")) expect((el as HTMLInputElement).value).toBe("");
    await u.click(screen.getByRole("button", { name: /three cases/i })); expect(screen.getAllByRole("alert").length).toBe(1); expect(screen.getByRole("alert")).toHaveTextContent(/10 things to fix above/); expect(screen.getAllByText(/Enter a number for/).length).toBe(10);
    expect(screen.getByLabelText(/How many times a month/)).toHaveAttribute("aria-invalid", "true");
  });
  it("shows three cases, names the cautious case as the one to plan around, and shows assumptions", async () => {
    const u = userEvent.setup(); render(<RoiCalculator />); await fill(u, good); await u.click(screen.getByRole("button", { name: /three cases/i }));
    const h = await screen.findByRole("heading", { name: /three cases from your numbers/i }); await waitFor(() => expect(h).toHaveFocus());
    const t = screen.getByRole("table"); expect(within(t).getAllByRole("row").length).toBe(4); expect(within(t).getByText(/the one to plan around/)).toBeInTheDocument();
    expect(within(t).getByText(/not within these numbers/)).toBeInTheDocument(); expect(screen.getByText(/not a prediction or a promise/)).toBeInTheDocument(); expect(screen.getByText(/25%/)).toBeInTheDocument();
  });
  it("rejects shares out of order and non-numbers; Start over clears", async () => {
    const u = userEvent.setup(); render(<RoiCalculator />); await fill(u, { ...good, shareConservativePct: "70" }); await u.click(screen.getByRole("button", { name: /three cases/i })); expect(screen.getByText(/Shares must rise/)).toBeInTheDocument();
    await fill(u, { ...good, tasksPerMonth: "abc" }); await u.click(screen.getByRole("button", { name: /three cases/i })); expect(screen.getByText(/Enter a number for tasks per month/)).toBeInTheDocument();
    await u.click(screen.getByRole("button", { name: /start over/i })); expect((document.getElementById("tasksPerMonth") as HTMLInputElement).value).toBe("");
  });
  it("every input has a visible label and described help text", () => {
    render(<RoiCalculator />); for (const el of screen.getAllByRole("textbox")) { expect(el.id).toBeTruthy(); expect(document.querySelector(`label[for="${el.id}"]`)).not.toBeNull(); expect(el.getAttribute("aria-describedby")).toContain(`${el.id}-help`); }
  });
});

describe("Shell", () => {
  it("states that nothing is sent or saved and that the page is a hidden preview", () => {
    render(<ToolShell eyebrow="e" title="t" intro="i"><div /></ToolShell>);
    expect(screen.getByTestId("privacy-note")).toHaveTextContent(/Nothing is sent, saved or tracked/); expect(screen.getByText(/hidden from search engines/)).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: /email elliyeen/i }).getAttribute("href")!; expect(mail).toMatch(/^mailto:/); expect(mail).not.toMatch(/body=/);
  });
});

describe("Privacy and staging policy (source scan)", () => {
  const walk = (d: string): string[] => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
  const files = [...walk("components/tools"), ...walk("lib/tools"), ...walk("app/tools")].filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\./.test(f));
  it("finds the files it is supposed to scan", () => expect(files.length).toBeGreaterThanOrEqual(15));
  it.each(["fetch(", "XMLHttpRequest", "WebSocket", "sendBeacon", "localStorage", "sessionStorage", "document.cookie", "indexedDB", "next/script", "gtag", "plausible", "posthog", "dangerouslySetInnerHTML", "eval(", "new Function"])("no tool file uses %s", (needle) => {
    for (const f of files) expect(readFileSync(f, "utf8").includes(needle), `${f} contains ${needle}`).toBe(false);
  });
  it("every tool page is noindex,nofollow", async () => {
    for (const p of ["app/tools/page", "app/tools/ai-opportunity/page", "app/tools/security-readiness/page", "app/tools/automation-explorer/page", "app/tools/roi-calculator/page"]) {
      const m = (await import(/* @vite-ignore */ `@/${p}`)).metadata; expect(m.robots).toEqual({ index: false, follow: false });
    }
  });
  it("the sitemap does not list the staged tools", () => expect(sitemap().some((e) => e.url.includes("/tools"))).toBe(false));
  it("the site navigation does not link to the staged tools", () => expect(readFileSync("app/SiteNav.tsx", "utf8")).not.toMatch(/\/tools/));
  it("no promise language in any tool copy", () => { for (const f of files) expect(readFileSync(f, "utf8"), f).not.toMatch(/guarantee|risk-free|will save you|100% secure|HIPAA[- ]compliant/i); });
});
