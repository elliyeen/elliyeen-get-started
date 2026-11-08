// Pure analysis helpers for agents 07, 09 and 24. No I/O, no network. Unit-tested with synthetic data.
// Every function returns plain objects. Values that cannot be measured are the string "Not Measured".

export const NOT_MEASURED = "Not Measured";

const CTA_RE = /call|verify|get started|schedule|contact|apply|admission|start treatment|get in touch|book/i;
const GENERIC_LABELS = /^(learn more|read more|get started|submit|click here|contact us|more)$/i;

/** CTA candidates and how much of each is visible in the first viewport. */
export function foldCtas(items, vh) {
  const ctas = items.filter((i) => CTA_RE.test(i.text || "") || /^tel:/i.test(i.href || ""));
  const rows = ctas.map((i) => {
    const visiblePx = Math.max(0, Math.min(i.top + i.height, vh) - Math.max(i.top, 0));
    const status = visiblePx === 0 ? "below-fold" : visiblePx >= i.height ? "fully-visible" : "partially-visible";
    return { text: i.text, href: i.href, top: i.top, height: i.height, inHeader: !!i.inHeader, fixed: !!i.fixed, visiblePx, status };
  });
  const body = rows.filter((r) => !r.inHeader && !r.fixed);
  const heroStatus = body.length === 0 ? "none-found"
    : body.some((r) => r.status === "fully-visible") ? "fully-visible"
    : body.some((r) => r.status === "partially-visible") ? "partially-visible" : "below-fold";
  return { rows, heroStatus, headerCtaVisible: rows.some((r) => r.inHeader && r.status === "fully-visible") };
}

/** Label/destination checks: "verify" labels that only place a call, and labels that never say what happens. */
export function labelChecks(items) {
  const out = [];
  for (const i of items) {
    const text = (i.text || "").trim();
    if (!text) continue;
    if (/verify/i.test(text) && /^tel:/i.test(i.href || "")) out.push({ kind: "verify-label-calls", text, href: i.href });
    if (GENERIC_LABELS.test(text)) out.push({ kind: "generic-label", text, href: i.href });
  }
  const generic = out.filter((o) => o.kind === "generic-label");
  const counts = {};
  for (const g of generic) counts[g.text.toLowerCase()] = (counts[g.text.toLowerCase()] || 0) + 1;
  return { issues: out, genericCounts: counts };
}

const digits = (s) => (s || "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");

/** Distinct phone numbers in tel: links vs numbers shown as text. Intent (tracking numbers) is never inferred. */
export function phoneTargets(telHrefs, visibleText) {
  const targets = [...new Set(telHrefs.map((h) => digits(decodeURIComponent(h.replace(/^tel:/i, "")))).filter((d) => d.length === 10))];
  const shown = [...new Set((visibleText.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4}/g) || []).map(digits))];
  return { linkTargets: targets, visibleNumbers: shown, linkOnly: targets.filter((t) => !shown.includes(t)), intent: NOT_MEASURED };
}

/** Types declared more than once across JSON-LD blocks. blocks: string[][] of @type values. */
export function jsonLdDuplicates(blocks) {
  const counts = {};
  for (const b of blocks) for (const t of b) counts[t] = (counts[t] || 0) + 1;
  return { counts, duplicates: Object.entries(counts).filter(([, n]) => n > 1).map(([type, n]) => ({ type, n })) };
}

/** URL-pattern consistency for same-site pages. */
export function urlPatterns(urls) {
  const paths = urls.map((u) => { try { return new URL(u).pathname; } catch { return null; } }).filter(Boolean);
  const segs = paths.map((p) => p.split("/").filter(Boolean));
  const depths = [...new Set(segs.map((s) => s.length))].sort();
  const suffix = segs.filter((s) => s.length).map((s) => s[s.length - 1].endsWith("-treatment"));
  return {
    pages: paths.length,
    depths,
    mixedDepth: depths.length > 1,
    withTreatmentSuffix: suffix.filter(Boolean).length,
    withoutTreatmentSuffix: suffix.filter((x) => !x).length,
    suffixInconsistent: suffix.some(Boolean) && suffix.some((x) => !x),
  };
}

export const rectsIntersect = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/** Fixed overlays in the first viewport and which text blocks they cover. */
export function overlays(fixedRects, textRects) {
  const rows = fixedRects.map((o) => ({ name: o.name, rect: o, coversText: textRects.filter((t) => rectsIntersect(o, t)).map((t) => t.text.slice(0, 40)) }));
  return { count: rows.length, rows, covering: rows.filter((r) => r.coversText.length) };
}

/** WCAG relative luminance and contrast ratio. Colors are [r,g,b] 0-255. */
const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
export const luminance = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export function contrastRatio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return Math.round(((a + 0.05) / (b + 0.05)) * 100) / 100;
}
/** Contrast verdict. bgKind "image" is indeterminate: the measured pixel under text is not read. */
export function contrastVerdict(fg, bg, bgKind, largeText = false) {
  if (bgKind === "image" || !bg) return { ratio: NOT_MEASURED, pass: NOT_MEASURED, reason: "background is an image or unresolved" };
  const ratio = contrastRatio(fg, bg);
  return { ratio, pass: ratio >= (largeText ? 3 : 4.5) };
}

/** Where a landmark sits on the page. */
export function position(top, pageH, vh) {
  return { top, pctDown: Math.round((top / pageH) * 100), viewportsDown: Math.round((top / vh) * 10) / 10 };
}

/** FEEDBACK.md record. Findings default to pending_human_review; outcomes default to Not Measured. */
export function buildFeedbackRecord({ agent, version, runId, inputs, evidenceLinks, findings, pattern = NOT_MEASURED, runsAgreeing = 1 }) {
  return {
    agent, version, run_id: runId, inputs, evidence_links: evidenceLinks, runs_agreeing: runsAgreeing,
    findings: findings.map((f) => ({ id: f.id, disposition: "pending_human_review", confidence: f.confidence, uncertainty: f.uncertainty ?? NOT_MEASURED })),
    outcome: NOT_MEASURED, pattern,
  };
}

const CONF = ["high", "medium", "low", NOT_MEASURED];
/** Returns a list of problems; empty list means valid. */
export function validateFeedbackRecord(r) {
  const p = [];
  for (const k of ["agent", "version", "run_id", "inputs", "evidence_links", "findings", "outcome", "pattern"]) if (r?.[k] === undefined || r?.[k] === "") p.push(`missing ${k}`);
  if (r && !Array.isArray(r.evidence_links)) p.push("evidence_links must be an array");
  if (r && Array.isArray(r.findings)) r.findings.forEach((f, i) => {
    if (!f.id) p.push(`findings[${i}] missing id`);
    if (!CONF.includes(f.confidence)) p.push(`findings[${i}] confidence must be high|medium|low|Not Measured`);
    if (f.confidence === "high" && !(r.runs_agreeing >= 2)) p.push(`findings[${i}] high confidence requires runs_agreeing >= 2`);
    if (!f.disposition) p.push(`findings[${i}] missing disposition`);
    if (f.disposition && f.disposition !== "pending_human_review" && !["accepted", "rejected", "ignored"].includes(f.disposition)) p.push(`findings[${i}] invalid disposition`);
  });
  else if (r) p.push("findings must be an array");
  return p;
}

/* ---------- v1.2: evidence-supported confidence, referral, detectors ---------- */

/**
 * Confidence is derived from evidence, never from the existence of an object.
 * measured: the value came from a deterministic extraction. ambiguous: the method cannot settle it.
 * runsAgreeing: how many independent loads produced the same result (1 or 2 here).
 */
export function evidenceConfidence({ measured, ambiguous = false, runsAgreeing = 1 }) {
  if (!measured) return NOT_MEASURED;
  if (ambiguous) return "low";
  return runsAgreeing >= 2 ? "high" : "medium";
}

const REFERRAL_RE = /better off dead|hurting yourself|self[- ]?harm|suicid|kill myself|end my life/i;
/** Crisis-sensitive wording that must go to a human reviewer. Presence only; never judges whether help is shown. */
export function referrals(text) {
  const m = (text || "").match(REFERRAL_RE);
  return m ? [{ kind: "out-of-scope-referral", matched: m[0].toLowerCase(), action: "route to human clinical/safety reviewer; not assessed here" }] : [];
}

/** Detector catalogue. severity is the human-readable impact if the detector is missed. */
export const DETECTORS = {
  "D09-hero-fold": { agent: "09", severity: "high", desc: "No fully visible non-header, non-fixed CTA in the first viewport" },
  "D09-verify-calls": { agent: "09", severity: "high", desc: "A 'Verify' label whose destination is a phone call" },
  "D09-generic-labels": { agent: "09", severity: "medium", desc: "Three or more generic CTA labels (Learn More, Get Started, ...)" },
  "D09-process-buried": { agent: "09", severity: "medium", desc: "Step 1 sits more than 50% down the page" },
  "D09-no-process": { agent: "09", severity: "medium", desc: "No Step 1 and no How It Works text" },
  "D09-referral": { agent: "09", severity: "critical", desc: "Crisis-sensitive wording present: route to a human reviewer" },
  "D07-overlay-count": { agent: "07", severity: "medium", desc: "Three or more fixed overlays in the first viewport" },
  "D07-overlay-cover": { agent: "07", severity: "medium", desc: "A fixed overlay covers visible text" },
  "D07-contrast-fail": { agent: "07", severity: "medium", desc: "Sampled text on a resolvable background below WCAG 2.2 AA (candidate failure)" },
  "D07-typefaces": { agent: "07", severity: "low", desc: "More than two first-party font families in visible text" },
  "D24-jsonld-duplicate": { agent: "24", severity: "low", desc: "A JSON-LD @type declared more than once (observation; schema validation required)" },
  "D24-url-pattern": { agent: "24", severity: "medium", desc: "Mixed depth or inconsistent -treatment suffix across same-site service URLs" },
  "D24-phone-linkonly": { agent: "24", severity: "medium", desc: "A tel: target that is not shown as visible text (intent not inferred)" },
  "D24-head-missing": { agent: "24", severity: "medium", desc: "Missing title, meta description or canonical" },
  "D24-h1-count": { agent: "24", severity: "medium", desc: "Page does not have exactly one H1" },
  "D24-lang-missing": { agent: "24", severity: "low", desc: "html lang attribute missing" },
};

/**
 * Turn one viewport's measurements into detector results.
 * Each result: { detector, flagged, notMeasured, observation?, evidence, confidence }.
 */
export function deriveViewport(v, { runsAgreeing = 1 } = {}) {
  const r = [];
  const add = (detector, flagged, evidence, o = {}) => {
    const notMeasured = !!o.notMeasured && !flagged;
    r.push({ detector, flagged: !!flagged, notMeasured, ...(o.observation ? { observation: true } : {}), evidence,
      confidence: evidenceConfidence({ measured: !notMeasured, ambiguous: !!o.ambiguous, runsAgreeing }) });
  };
  const hero = v.heroCta, labels = v.labels, c = v.contrast;
  add("D09-hero-fold", hero.heroStatus !== "fully-visible", { heroStatus: hero.heroStatus, rows: hero.rows.filter((x) => !x.inHeader && !x.fixed).slice(0, 5) });
  add("D09-verify-calls", labels.issues.some((i) => i.kind === "verify-label-calls"), labels.issues.filter((i) => i.kind === "verify-label-calls"));
  const generic = Object.values(labels.genericCounts).reduce((a, b) => a + b, 0);
  add("D09-generic-labels", generic >= 3, labels.genericCounts);
  add("D09-process-buried", !!v.step1 && v.step1.pctDown > 50, v.step1);
  add("D09-no-process", !v.step1 && v.howItWorksText === 0, { step1: v.step1, howItWorksText: v.howItWorksText });
  add("D09-referral", v.referrals.length > 0, v.referrals);
  add("D07-overlay-count", v.overlays.count >= 3, { count: v.overlays.count, names: v.overlays.rows.map((x) => x.name) });
  add("D07-overlay-cover", v.overlays.covering.length > 0, v.overlays.covering.map((x) => ({ name: x.name, covers: x.coversText })));
  const amb = c.notMeasured.length;
  add("D07-contrast-fail", c.failing.length > 0, { sampled: c.sampled, candidates: c.candidates, failing: c.failing.slice(0, 10), notMeasuredCount: amb, label: "candidate failure, not a site-wide verdict" }, { notMeasured: amb > 0, ambiguous: amb > 0 && c.failing.length > 0 });
  add("D07-typefaces", v.fontFamilies.length > 2, v.fontFamilies);
  add("D24-jsonld-duplicate", v.jsonLd.duplicates.length > 0, { duplicates: v.jsonLd.duplicates, schemaValidation: NOT_MEASURED }, { observation: true, ambiguous: true });
  add("D24-url-pattern", v.urlPatterns.pages >= 2 && (v.urlPatterns.mixedDepth || v.urlPatterns.suffixInconsistent), v.urlPatterns);
  add("D24-phone-linkonly", v.phones.linkOnly.length > 0, { ...v.phones }, { ambiguous: true });
  add("D24-head-missing", !v.head.title || !v.head.metaDescription || !v.head.canonical, v.head);
  add("D24-h1-count", v.h1.length !== 1, { h1: v.h1.length });
  add("D24-lang-missing", !v.head.lang, { lang: v.head.lang || null });
  return r;
}

/** Findings for the feedback record: only flagged or Not Measured detectors, with evidence-derived confidence. */
export function feedbackFindings(results, agent) {
  return results.filter((x) => x.detector.startsWith(`D${agent}-`) && (x.flagged || x.notMeasured))
    .map((x) => ({ id: x.detector, confidence: x.confidence, uncertainty: x.notMeasured ? "ambiguous method; value Not Measured" : x.observation ? "observation; requires schema validation" : NOT_MEASURED }));
}
