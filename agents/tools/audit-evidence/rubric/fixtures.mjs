// Synthetic fixtures. Truth is set by CONSTRUCTION (the HTML below is the evidence), never from agent output.
// truth: { detector: [desktopExpectation, mobileExpectation] } with 'pos' | 'neg' | 'nm' (Not Measured expected).
// Viewports: desktop 1440x900, mobile 390x844.
const base = "*{margin:0}body{font:16px Arial,sans-serif;color:#111;background:#fff}.cta{position:absolute;left:40px;display:block;width:300px;height:54px;line-height:54px;color:#111}";
const page = ({ body, css = "", title = "Fixture", desc = true, canonical = true, lang = "en", h1 = true, ld = [] }) =>
  `<!doctype html><html${lang ? ` lang="${lang}"` : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>${desc ? '<meta name="description" content="A synthetic fixture page">' : ""}${canonical ? '<link rel="canonical" href="https://fixture.test/">' : ""}${ld.map((j) => `<script type="application/ld+json">${j}</script>`).join("")}<style>${base}${css}</style></head><body>${h1 ? "<h1>Fixture</h1>" : ""}${body}</body></html>`;
const cta = (top, label, href = "/book") => `<a class="cta" style="top:${top}px" href="${href}">${label}</a>`;
const sp = (h) => `<div style="height:${h}px"></div>`;
const ov = (style) => `<div style="position:fixed;width:50px;height:50px;background:#06c;${style}"></div>`;
const txt = (style, content, extra = "") => `<p style="position:absolute;left:40px;top:200px;${style}" ${extra}>${content}</p>`;
const T = (D, M = D) => [D, M];

export const FIXTURES = {
  // ---- agent 09: CTA position and labels ----
  "cta-visible": { html: page({ body: cta(300, "Book a free consultation") + sp(2000) }), truth: { "D09-hero-fold": T("neg"), "D09-generic-labels": T("neg"), "D09-verify-calls": T("neg") } },
  "cta-below": { html: page({ body: cta(1000, "Book a free consultation") + sp(2000) }), truth: { "D09-hero-fold": T("pos") } },
  "cta-edge-850": { html: page({ body: cta(850, "Book a free consultation") + sp(2000) }), truth: { "D09-hero-fold": T("pos") } },
  "cta-edge-820": { html: page({ body: cta(820, "Book a free consultation") + sp(2000) }), truth: { "D09-hero-fold": T("neg", "pos") } },
  "cta-header-only": { html: page({ body: `<header><a href="tel:+19495550100">(949) 555-0100</a></header>${sp(2000)}` }), truth: { "D09-hero-fold": T("pos"), "D24-phone-linkonly": T("neg") } },
  "cta-fixed-tab-only": { html: page({ body: `<a style="position:fixed;right:0;top:300px;width:60px;height:180px;display:block" href="#x">VERIFY BENEFITS</a>${sp(2000)}` }), truth: { "D09-hero-fold": T("pos"), "D09-verify-calls": T("neg"), "D07-overlay-count": T("neg") } },
  "verify-call": { html: page({ body: cta(300, "Verify Insurance", "tel:+18775550102") + sp(2000) }), truth: { "D09-verify-calls": T("pos"), "D09-hero-fold": T("neg"), "D24-phone-linkonly": T("pos") } },
  "verify-form": { html: page({ body: cta(300, "Verify Insurance", "/verify") + sp(2000) }), truth: { "D09-verify-calls": T("neg"), "D09-hero-fold": T("neg") } },
  "generic-4": { html: page({ body: `<p>${["a", "b", "c", "d"].map((x) => `<a href="/${x}">Learn More</a>`).join(" ")}</p>${sp(1000)}` }), truth: { "D09-generic-labels": T("pos") } },
  "generic-2": { html: page({ body: `<p><a href="/a">Learn More</a> <a href="/b">Learn More</a></p>${sp(1000)}` }), truth: { "D09-generic-labels": T("neg") } },
  "generic-mixed-3": { html: page({ body: `<p><a href="/a">Get Started</a> <a href="/b">Learn More</a> <a href="/c">Read More</a></p>${sp(1000)}` }), truth: { "D09-generic-labels": T("pos") } },
  "specific-labels": { html: page({ body: `<p>${[1, 2, 3].map((i) => `<a href="/b${i}">Book a free consultation</a>`).join(" ")}</p>${sp(1000)}` }), truth: { "D09-generic-labels": T("neg") } },
  // ---- agent 09: process position (page height about 3337px) ----
  "process-buried": { html: page({ body: `<div style="position:absolute;top:3000px;left:40px">STEP 1</div>${sp(3300)}` }), truth: { "D09-process-buried": T("pos"), "D09-no-process": T("neg") } },
  "process-early": { html: page({ body: `<div style="position:absolute;top:400px;left:40px">STEP 1</div>${sp(3300)}` }), truth: { "D09-process-buried": T("neg"), "D09-no-process": T("neg") } },
  "process-none": { html: page({ body: sp(3300) }), truth: { "D09-no-process": T("pos"), "D09-process-buried": T("neg") } },
  "process-howitworks": { html: page({ body: `<h2>How it works</h2>${sp(3300)}` }), truth: { "D09-no-process": T("neg"), "D09-process-buried": T("neg") } },
  "process-halfway": { html: page({ body: `<div style="position:absolute;top:1650px;left:40px">STEP 1</div>${sp(3300)}` }), truth: { "D09-process-buried": T("neg") } },
  // ---- agent 09: crisis-sensitive wording (critical, referral only) ----
  "referral-crisis": { html: page({ body: `<form><label>Thoughts that you would be better off dead, or of hurting yourself in some way</label></form>` }), truth: { "D09-referral": T("pos") } },
  "referral-with-988": { html: page({ body: `<form><label>Thoughts of hurting yourself</label></form><p>Call or text 988 now.</p>` }), truth: { "D09-referral": T("pos") } },
  "referral-prevention-blog": { html: page({ body: `<p>Our blog covers suicide prevention.</p>` }), truth: { "D09-referral": T("pos") } },
  "referral-neutral": { html: page({ body: `<form><label>Preferred contact time</label></form>` }), truth: { "D09-referral": T("neg") } },
  "referral-clinical-neutral": { html: page({ body: `<p>We treat anxiety and depression.</p>` }), truth: { "D09-referral": T("neg") } },
  // ---- agent 07: overlays ----
  "overlay-3": { html: page({ body: ov("right:20px;bottom:20px") + ov("right:20px;bottom:90px") + ov("right:20px;bottom:160px") + sp(1500) }), truth: { "D07-overlay-count": T("pos"), "D07-overlay-cover": T("neg") } },
  "overlay-2": { html: page({ body: ov("right:20px;bottom:20px") + ov("right:20px;bottom:90px") + sp(1500) }), truth: { "D07-overlay-count": T("neg") } },
  "overlay-cover-mobile-only": { html: page({ body: ov("left:20px;bottom:20px") + `<p style="position:absolute;left:20px;top:800px;width:200px">Covered line</p>` + sp(1500) }), truth: { "D07-overlay-cover": T("neg", "pos"), "D07-overlay-count": T("neg") } },
  "overlay-cover-both": { html: page({ body: ov("left:20px;top:390px") + `<p style="position:absolute;left:20px;top:400px;width:200px">Covered line</p>` + sp(1500) }), truth: { "D07-overlay-cover": T("pos") } },
  "overlay-clear": { html: page({ body: ov("right:20px;bottom:20px") + `<p style="position:absolute;left:20px;top:400px;width:200px">Clear line</p>` + sp(1500) }), truth: { "D07-overlay-cover": T("neg") } },
  "overlay-fixed-header": { html: page({ body: `<header style="position:fixed;top:0;left:0;width:100%;height:60px;background:#06c;color:#fff">Brand</header>${sp(1500)}` }), truth: { "D07-overlay-count": T("neg") } },
  // ---- agent 07: contrast (WCAG 2.2 AA: 4.5 normal, 3 large = 24px or 18.66px bold) ----
  "contrast-low": { html: page({ body: txt("color:#999999;font-size:16px", "Low contrast text") }), truth: { "D07-contrast-fail": T("pos") } },
  "contrast-ok": { html: page({ body: txt("color:#111111;font-size:16px", "Readable text") }), truth: { "D07-contrast-fail": T("neg") } },
  "contrast-large-pass": { html: page({ body: txt("color:#888888;font-size:28px;font-weight:700", "Large text") }), truth: { "D07-contrast-fail": T("neg") } },
  "contrast-large-fail": { html: page({ body: txt("color:#aaaaaa;font-size:28px;font-weight:700", "Large pale text") }), truth: { "D07-contrast-fail": T("pos") } },
  "contrast-borderline-pass": { html: page({ body: txt("color:#767676;font-size:16px", "Borderline text") }), truth: { "D07-contrast-fail": T("neg") } },
  "contrast-borderline-fail": { html: page({ body: txt("color:#777777;font-size:16px", "Borderline text") }), truth: { "D07-contrast-fail": T("pos") } },
  "contrast-alpha-bg": { html: page({ body: `<div style="position:absolute;left:40px;top:200px;background:rgba(0,0,0,0.5);padding:8px"><p style="color:#fff;font-size:16px">Text on translucent layer</p></div>` }), truth: { "D07-contrast-fail": T("pos") } },
  "contrast-bold-18-fail": { html: page({ body: txt("color:#888888;font-size:18px;font-weight:700", "Bold but under 18.66px") }), truth: { "D07-contrast-fail": T("pos") } },
  "contrast-bold-19-pass": { html: page({ body: txt("color:#888888;font-size:19px;font-weight:700", "Bold and large enough") }), truth: { "D07-contrast-fail": T("neg") } },
  "contrast-dark-on-dark": { html: page({ body: `<div style="position:absolute;left:40px;top:200px;background:#222;padding:8px"><p style="color:#333;font-size:16px">Dark on dark</p></div>` }), truth: { "D07-contrast-fail": T("pos") } },
  "contrast-white-on-green": { html: page({ body: `<div style="position:absolute;left:40px;top:200px;background:#006600;padding:8px"><p style="color:#fff;font-size:16px">White on green</p></div>` }), truth: { "D07-contrast-fail": T("neg") } },
  "contrast-gradient-bg": { html: page({ body: `<div style="position:absolute;left:40px;top:200px;background-image:linear-gradient(#000,#fff);padding:8px"><p style="color:#fff;font-size:16px">Over a gradient</p></div>` }), truth: { "D07-contrast-fail": T("nm") } },
  "contrast-opacity": { html: page({ body: txt("color:#000;opacity:0.5;font-size:16px", "Half opacity") }), truth: { "D07-contrast-fail": T("nm") } },
  "contrast-text-shadow": { html: page({ body: txt("color:#111;font-size:16px;text-shadow:0 0 4px #f00", "Shadowed text") }), truth: { "D07-contrast-fail": T("nm") } },
  "contrast-pseudo-overlay": { html: page({ css: ".x{position:absolute;left:40px;top:200px}.x::before{content:'';position:absolute;inset:0;background:rgba(0,0,0,.6)}", body: `<p class="x" style="color:#111;font-size:16px">Under a pseudo overlay</p>` }), truth: { "D07-contrast-fail": T("nm") } },
  // ---- agent 07: typefaces ----
  "fonts-3": { html: page({ body: `<p style="font-family:Georgia,serif">a</p><p style="font-family:Arial,sans-serif">b</p><p style="font-family:'Courier New',monospace">c</p>` }), truth: { "D07-typefaces": T("pos") } },
  "fonts-4": { html: page({ body: `<p style="font-family:Georgia,serif">a</p><p style="font-family:Verdana,sans-serif">b</p><p style="font-family:'Courier New',monospace">c</p><p style="font-family:Tahoma,sans-serif">d</p>` }), truth: { "D07-typefaces": T("pos") } },
  "fonts-2": { html: page({ body: `<p style="font-family:Georgia,serif">a</p><p>b</p>` }), truth: { "D07-typefaces": T("neg") } },
  "fonts-1": { html: page({ body: `<p>a</p>` }), truth: { "D07-typefaces": T("neg") } },
  // ---- agent 24: head, h1, lang ----
  "head-complete": { html: page({ body: "" }), truth: { "D24-head-missing": T("neg"), "D24-h1-count": T("neg"), "D24-lang-missing": T("neg") } },
  "head-no-description": { html: page({ body: "", desc: false }), truth: { "D24-head-missing": T("pos") } },
  "head-no-canonical": { html: page({ body: "", canonical: false }), truth: { "D24-head-missing": T("pos") } },
  "head-no-title": { html: page({ body: "", title: "" }), truth: { "D24-head-missing": T("pos") } },
  "h1-two": { html: page({ body: "<h1>Second</h1>" }), truth: { "D24-h1-count": T("pos") } },
  "h1-none": { html: page({ body: "", h1: false }), truth: { "D24-h1-count": T("pos") } },
  "lang-missing": { html: page({ body: "", lang: "" }), truth: { "D24-lang-missing": T("pos") } },
  // ---- agent 24: JSON-LD (observation only; schema validity is Not Measured) ----
  "jsonld-duplicate": { html: page({ body: "", ld: ['{"@type":"WebSite"}', '{"@graph":[{"@type":"Organization"},{"@type":"WebSite"}]}'] }), truth: { "D24-jsonld-duplicate": T("pos") } },
  "jsonld-single": { html: page({ body: "", ld: ['{"@type":"WebSite"}', '{"@type":"Organization"}'] }), truth: { "D24-jsonld-duplicate": T("neg") } },
  "jsonld-multitype": { html: page({ body: "", ld: ['{"@type":["Organization","LocalBusiness"]}'] }), truth: { "D24-jsonld-duplicate": T("neg") } },
  "jsonld-malformed": { html: page({ body: "", ld: ['{"@type":"WebSite"'] }), truth: { "D24-jsonld-duplicate": T("neg") } },
  // ---- agent 24: URL patterns (same host fixture.test, service-like paths) ----
  "url-mixed": { html: page({ body: ["/depression-treatment/", "/mental-health/bipolar-disorder-treatment/", "/mental-health/ptsd/"].map((p) => `<a href="https://fixture.test${p}">x</a>`).join("") }), truth: { "D24-url-pattern": T("pos") } },
  "url-consistent": { html: page({ body: ["/a-treatment/", "/b-treatment/", "/c-treatment/"].map((p) => `<a href="https://fixture.test${p}">x</a>`).join("") }), truth: { "D24-url-pattern": T("neg") } },
  "url-depth-only": { html: page({ body: ["/a-treatment/", "/x/y-treatment/"].map((p) => `<a href="https://fixture.test${p}">x</a>`).join("") }), truth: { "D24-url-pattern": T("pos") } },
  "url-suffix-only": { html: page({ body: ["/mental-health/a-treatment/", "/mental-health/b/"].map((p) => `<a href="https://fixture.test${p}">x</a>`).join("") }), truth: { "D24-url-pattern": T("pos") } },
  "url-single": { html: page({ body: `<a href="https://fixture.test/a-treatment/">x</a>` }), truth: { "D24-url-pattern": T("neg") } },
  "url-external-only": { html: page({ body: ["/a-treatment/", "/x/b/"].map((p) => `<a href="https://other.test${p}">x</a>`).join("") }), truth: { "D24-url-pattern": T("neg") } },
  // ---- agent 24: phone targets ----
  "phone-linkonly": { html: page({ body: `<p>Office (949) 555-0100</p><a href="tel:+18775550102">Call us</a>` }), truth: { "D24-phone-linkonly": T("pos") } },
  "phone-matched": { html: page({ body: `<a href="tel:+19495550100">(949) 555-0100</a>` }), truth: { "D24-phone-linkonly": T("neg") } },
  "phone-none": { html: page({ body: `<p>No phone here</p>` }), truth: { "D24-phone-linkonly": T("neg") } },
  "phone-two-formats": { html: page({ body: `<p>(949) 555-0100</p><a href="tel:+19495550100">a</a><a href="tel:(949)%20555-0100">b</a>` }), truth: { "D24-phone-linkonly": T("neg") } },
  "phone-two-numbers-visible": { html: page({ body: `<p>(949) 555-0100 and (877) 555-0102</p><a href="tel:+19495550100">a</a><a href="tel:+18775550102">b</a>` }), truth: { "D24-phone-linkonly": T("neg") } },
};
