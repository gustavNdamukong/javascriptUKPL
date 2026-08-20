// Screenshots any single page of the paginated book, for eyeballing a proof
// without a PDF rasteriser installed.
//
//   node tools/proofpage.mjs 421 /tmp/proof.png
//   node tools/proofpage.mjs contents /tmp/toc.png
//
// Run `node paged.mjs` first. Paged.js lays the pages out as real elements, so
// a page can simply be photographed.
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const want = process.argv[2] || '1';
const out = process.argv[3] || '/tmp/proof.png';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'] });
try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 2 });
    await page.goto('file:///tmp/kdpsample/out/paged.html', { waitUntil: 'load', timeout: 0 });
    await page.waitForFunction('window.__pagedDone === true', { timeout: 0, polling: 2000 });

    const idx = want === 'contents'
        ? await page.evaluate(() => {
            const el = document.querySelector('.toc');
            const pg = el && el.closest('.pagedjs_page');
            return pg ? [...document.querySelectorAll('.pagedjs_page')].indexOf(pg) + 1 : 0;
          })
        : +want;

    const el = await page.evaluateHandle(i => document.querySelectorAll('.pagedjs_page')[i], idx);
    const box = el.asElement();
    if (!box) { console.error('no such page:', idx); process.exit(1); }
    await box.screenshot({ path: out });
    console.log('page index', idx, '->', out);
} finally {
    await browser.close();
}
