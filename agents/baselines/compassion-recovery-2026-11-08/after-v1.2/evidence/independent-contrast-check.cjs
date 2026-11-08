// Independent contrast check: read the label's computed style, then compare against pixels actually rendered.
const { chromium } = require('/Users/yaqeen/elliyeen-get-started/node_modules/playwright-core');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('https://compassionrecoverycenters.com/', { waitUntil: 'load' });
  await p.waitForTimeout(2500);
  const info = await p.evaluate(() => {
    const e = [...document.querySelectorAll('p,span,div')].find((x) => (x.innerText || '').trim() === 'DUAL DIAGNOSIS CARE' && x.children.length === 0);
    const cs = getComputedStyle(e);
    const chain = [];
    for (let n = e; n && chain.length < 3; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none') chain.push([n.tagName, s.backgroundColor, s.backgroundImage.slice(0, 40), s.opacity]);
    }
    return { color: cs.color, size: cs.fontSize, weight: cs.fontWeight, opacity: cs.opacity, textShadow: cs.textShadow, chain, rect: e.getBoundingClientRect().toJSON() };
  });
  console.log(JSON.stringify(info));
  await p.screenshot({ path: process.argv[2], clip: { x: info.rect.x - 6, y: info.rect.y - 6, width: info.rect.width + 12, height: info.rect.height + 12 } });
  await b.close();
})();
