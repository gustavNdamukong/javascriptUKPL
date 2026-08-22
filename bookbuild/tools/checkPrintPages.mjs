// Screenshots two laid-out pages so the folio, running head and contents page
// numbers can be checked by eye. They are all CSS generated content, which
// textContent cannot read - looking at them is the only honest check.
import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({
  executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless:'new', args:['--no-sandbox','--disable-gpu']});
const p = await b.newPage();
await p.setViewport({width:1400,height:1900,deviceScaleFactor:2});
await p.goto('file:///tmp/kdpsample/out/paged.html',{waitUntil:'load',timeout:0});
await p.waitForFunction('window.__pagedDone === true',{timeout:0,polling:2000});
const idx = await p.evaluate(() => {
  const pages=[...document.querySelectorAll('.pagedjs_page')];
  const toc = pages.findIndex(pg => pg.querySelector('.toc a'));
  return {toc, total: pages.length};
});
console.log('pages:', idx.total, ' first contents page:', idx.toc+1);
for (const [name,i] of [['toc',idx.toc],['body',200]]) {
  const el = await p.$(`.pagedjs_page:nth-of-type(${i+1})`);
  if (el) { await el.screenshot({path:`/tmp/page-${name}.png`}); console.log('  wrote /tmp/page-'+name+'.png'); }
}
await b.close();
