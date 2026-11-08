// Browser-side measurement shared by the CLI (collect.mjs) and the fixture evaluation (evaluate.mjs).
// measurePage never navigates and never interacts: it only reads the page it is given.
import * as A from "./analyze.mjs";

export const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };

export const initCwv = () => {
  window.__cwv = { lcpMs: null, cls: 0 };
  try {
    new PerformanceObserver((l) => { const e = l.getEntries().pop(); window.__cwv.lcpMs = Math.round(e.startTime); }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cwv.cls = Math.round((window.__cwv.cls + e.value) * 1000) / 1000; }).observe({ type: "layout-shift", buffered: true });
  } catch { /* unsupported: stays null */ }
};

/** Runs inside the page. opts.host is the host that counts as same-site. */
const probe = (opts) => {
  const top = (e) => Math.round(e.getBoundingClientRect().top + scrollY);
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden"; };
  const isFixed = (e) => { for (let n = e; n && n !== document.body; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === "fixed" || p === "sticky") return true; } return false; };
  const inHeader = (e) => !!e.closest("header, nav");
  const deep = (root) => [...root.querySelectorAll("*")].flatMap((e) => (e.shadowRoot ? [e, ...deep(e.shadowRoot)] : [e]));
  const ctaEls = [...document.querySelectorAll("a,button")].filter(vis).map((e) => ({ text: (e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 60), href: e.getAttribute("href") || "", top: top(e), height: Math.round(e.getBoundingClientRect().height), inHeader: inHeader(e), fixed: isFixed(e) })).filter((x) => x.text);
  const fixedRects = deep(document.body).filter((e) => vis(e) && getComputedStyle(e).position === "fixed" && e.getBoundingClientRect().width * e.getBoundingClientRect().height > 400 && !e.closest("header,nav")).map((e) => { const r = e.getBoundingClientRect(); return { name: (e.id || (typeof e.className === "string" ? e.className : "") || e.tagName).toString().slice(0, 40), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }).filter((r) => r.y < innerHeight && r.y + r.h > 0);
  const textRects = [...document.querySelectorAll("h1,h2,h3,p,li,label")].filter((e) => vis(e) && !isFixed(e) && (e.innerText || "").trim()).map((e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), text: e.innerText.trim() }; }).filter((r) => r.y < innerHeight && r.y + r.h > 0);

  /* ---- contrast: every visible text-bearing element in the first viewport (cap 150); ambiguity -> Not Measured ---- */
  const parse = (c) => { const m = (c || "").match(/^rgba?\(([^)]+)\)$/); if (!m) return null; const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number); if (p.length < 3 || p.some(Number.isNaN)) return null; return { c: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
  const over = (top_, a, bottom) => top_.map((x, i) => x * a + bottom[i] * (1 - a));
  const own = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const cand = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,a,button,span,label,td,th,div")].filter((e) => vis(e) && own(e) && e.getBoundingClientRect().top < innerHeight && e.getBoundingClientRect().bottom > 0);
  const resolve = (e) => {
    const layers = []; let reason = null;
    const s0 = getComputedStyle(e);
    if (s0.textShadow !== "none") reason = "text-shadow";
    for (let n = e; n && !reason; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (parseFloat(s.opacity) < 1) { reason = "opacity"; break; }
      if (s.filter !== "none" || s.backdropFilter !== "none" || (s.mixBlendMode && s.mixBlendMode !== "normal")) { reason = "filter or blend mode"; break; }
      if (s.backgroundImage !== "none") { reason = "background image or gradient"; break; }
      for (const ps of ["::before", "::after"]) { const p = getComputedStyle(n, ps); if (p.content !== "none" && p.content !== "normal" && (p.backgroundImage !== "none" || (parse(p.backgroundColor) && parse(p.backgroundColor).a > 0))) { reason = "pseudo-element background"; break; } }
      if (reason) break;
      const b = parse(s.backgroundColor);
      if (!b && s.backgroundColor !== "transparent") { reason = "unparsed color"; break; }
      if (b && b.a > 0) { layers.push(b); if (b.a >= 0.999) break; }
    }
    if (reason) return { reason };
    let bg = [255, 255, 255]; // canvas default; stops at the first opaque layer
    for (let i = layers.length - 1; i >= 0; i--) bg = over(layers[i].c, layers[i].a, bg);
    const fg = parse(s0.color); if (!fg) return { reason: "unparsed color" };
    const fgc = over(fg.c, fg.a, bg);
    const r = e.getBoundingClientRect(); const x = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1), y = Math.min(Math.max(r.top + r.height / 2, 0), innerHeight - 1);
    const hit = document.elementFromPoint(x, y);
    if (hit && !(e === hit || e.contains(hit) || hit.contains(e))) return { reason: "covered by another element" };
    const size = parseFloat(s0.fontSize), bold = parseInt(s0.fontWeight) >= 700;
    return { fg: fgc.map(Math.round), bg: bg.map(Math.round), size, bold, large: size >= 24 || (size >= 18.66 && bold) };
  };
  const sampled = cand.slice(0, 150).map((e) => ({ text: e.innerText.trim().slice(0, 50), ...resolve(e) }));

  const stepEls = (re) => [...document.querySelectorAll("h1,h2,h3,h4,div,span,p,a")].filter((e) => e.children.length < 3 && vis(e) && re.test((e.innerText || "").trim()) && (e.innerText || "").trim().length < 40).map((e) => ({ text: e.innerText.trim(), top: top(e) }));
  const links = [...document.querySelectorAll("a[href]")];
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return (j["@graph"] || [j]).flatMap((x) => (Array.isArray(x["@type"]) ? x["@type"] : [x["@type"]])).filter(Boolean); } catch { return []; } });
  const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content || null;
  return {
    pageH: document.documentElement.scrollHeight, h1: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim()),
    head: { title: document.title || null, metaDescription: meta("description"), canonical: document.querySelector("link[rel=canonical]")?.href || null, lang: document.documentElement.lang || null },
    ctaEls, fixedRects, textRects, sampled, candidates: cand.length,
    step1: stepEls(/^step\s*1$/i)[0] || null, step2: stepEls(/^step\s*2$/i)[0] || null, step3: stepEls(/^step\s*3$/i)[0] || null,
    howItWorks: stepEls(/how it works|our process|admissions process/i).slice(0, 3),
    telHrefs: links.map((a) => a.getAttribute("href")).filter((h) => /^tel:/i.test(h)), visibleText: document.body.innerText,
    jsonLd: ld, sameHostUrls: [...new Set(links.filter((a) => a.host === opts.host).map((a) => a.href))].filter((u) => !u.includes("#")),
    cwv: window.__cwv || {}, fontFamilies: [...new Set([...document.querySelectorAll("body *")].filter((e) => vis(e) && own(e)).map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g, "").trim()))],
  };
};

/** Read one loaded page and return the per-viewport measurement object consumed by deriveViewport. */
export async function measurePage(page, vp, host) {
  const raw = await page.evaluate(probe, { host });
  const fold = A.foldCtas(raw.ctaEls, vp.height);
  const ok = raw.sampled.filter((s) => s.fg), nm = raw.sampled.filter((s) => !s.fg);
  const verdicts = ok.map((s) => ({ text: s.text, ...A.contrastVerdict(s.fg, s.bg, "solid", s.large), fg: s.fg, bg: s.bg, size: s.size, bold: s.bold, required: s.large ? 3 : 4.5 }));
  return {
    viewport: vp, pageH: raw.pageH, h1: raw.h1, head: raw.head, fontFamilies: raw.fontFamilies,
    heroCta: fold, labels: A.labelChecks(raw.ctaEls), phones: A.phoneTargets(raw.telHrefs, raw.visibleText),
    overlays: A.overlays(raw.fixedRects, raw.textRects),
    contrast: { candidates: raw.candidates, sampled: raw.sampled.length, coverage: raw.candidates ? Math.round((raw.sampled.length / raw.candidates) * 100) / 100 : 1, measured: ok.length,
      failing: verdicts.filter((v) => v.pass === false), notMeasured: nm.map((s) => ({ text: s.text, reason: s.reason })), method: "computed colors; alpha layers composited over opaque ancestor or white canvas; image/gradient/opacity/filter/blend/pseudo-element/text-shadow/covered => Not Measured" },
    step1: raw.step1 && A.position(raw.step1.top, raw.pageH, vp.height), step2: raw.step2 && A.position(raw.step2.top, raw.pageH, vp.height), step3Present: !!raw.step3, howItWorksText: raw.howItWorks.length,
    jsonLd: A.jsonLdDuplicates(raw.jsonLd), urlPatterns: A.urlPatterns(raw.sameHostUrls.filter((u) => /treatment|mental-health|substance/.test(u))),
    referrals: A.referrals(raw.visibleText),
    lab: { ...raw.cwv, note: "Lab values: single run, unthrottled, not field data. INP Not Measured." }, inp: A.NOT_MEASURED,
  };
}
