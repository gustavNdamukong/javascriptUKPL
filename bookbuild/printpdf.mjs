// Prints the assembled book to PDF, waiting for Paged.js to finish first.
//
// `chrome --print-to-pdf` cannot do this. Paged.js lays the book out
// asynchronously, well after the page reports itself loaded, and Chrome prints
// the moment it thinks loading is done - which produced a four-page book from
// an eight-hundred-page one. --virtual-time-budget does not help: it advances
// virtual time, it does not wait for real layout work.
//
// So the page sets window.__pagedDone in Paged.js's `after` hook, and this
// driver waits for that flag before asking for the PDF.
//
// puppeteer-core, not puppeteer: it drives the Chrome already installed rather
// than downloading a second copy of Chromium.
//
//   node printpdf.mjs [out.pdf]
import puppeteer from 'puppeteer-core';
import { existsSync, copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGE = '/tmp/kdpsample/out/paged.html';
const OUT = process.argv[2] || '/tmp/kdpsample/out/TheJavaScriptBlueprint-print.pdf';

if (!existsSync(PAGE)) {
    console.error('no assembled page - run `node paged.mjs` first');
    process.exit(1);
}

const started = Date.now();
const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none']
});

try {
    const page = await browser.newPage();
    page.on('pageerror', e => console.log('  page error:', String(e).slice(0, 120)));

    await page.goto('file://' + PAGE, { waitUntil: 'load', timeout: 0 });
    console.log('  loaded, paginating...');

    // Report progress, because on a book this size the wait is minutes.
    const tick = setInterval(async () => {
        try {
            const n = await page.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
            console.log(`  ${n} pages laid out  (${((Date.now() - started) / 1000).toFixed(0)}s)`);
        } catch { /* navigating */ }
    }, 30000);

    await page.waitForFunction('window.__pagedDone === true', { timeout: 0, polling: 2000 });
    clearInterval(tick);

    const pages = await page.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
    console.log(`  pagination finished: ${pages} pages in ${((Date.now() - started) / 1000).toFixed(0)}s`);

    // Paged.js has already produced page-sized boxes, so the PDF must not
    // re-paginate them: no margin here, and the size comes from the CSS.
    await page.pdf({
        path: OUT,
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        timeout: 0
    });
    console.log('  written:', OUT);

    // Also drop a copy in build/, which is committed. /tmp is cleared on
    // reboot and the Desktop is not in the repo; this is the copy that
    // survives a crash.
    const keep = '/Users/user/UKPL/javascriptUKPL/build/TheJavaScriptBlueprint-print.pdf';
    if (OUT !== keep) {
        mkdirSync(dirname(keep), { recursive: true });
        copyFileSync(OUT, keep);
        console.log('  kept in the repo:', keep);
    }
} finally {
    await browser.close();
}
