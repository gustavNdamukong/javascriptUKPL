// Assembles the book for WeasyPrint: heading ids, a generated page-numbered
// table of contents, and the running-header hooks.
import { renderFile } from './render.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const SP = '/private/tmp/claude-501/-Users-user/5cb49476-179c-47d7-9348-055b74d5737b/scratchpad';
const OUT = '/tmp/kdpsample/out';
mkdirSync(join(OUT, 'images'), { recursive: true });
// the polyfill has to sit beside the page that loads it
copyFileSync(new URL('./node_modules/pagedjs/dist/paged.polyfill.js', import.meta.url),
             join(OUT, 'paged.polyfill.js'));

const files = [];
if (existsSync(join(BASE, 'ContentsAndPreface.md'))) files.push(join(BASE, 'ContentsAndPreface.md'));
for (const c of readdirSync(BASE).filter(d => /^Chapter\d+-/.test(d))
        .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))) {
    const main = readdirSync(join(BASE, c)).find(f => f.endsWith('.md') && f !== 'quiz.md');
    if (main) files.push(join(BASE, c, main));
    if (existsSync(join(BASE, c, 'quiz.md'))) files.push(join(BASE, c, 'quiz.md'));
}
if (existsSync(join(BASE, 'Conclusion.md'))) files.push(join(BASE, 'Conclusion.md'));
if (existsSync(join(BASE, 'AboutTheAuthor.md'))) files.push(join(BASE, 'AboutTheAuthor.md'));

// A paragraph containing hard line breaks is a list or a verse - the contents
// at a glance, the closing poem - not running prose. Indenting its first line
// only makes that line look stray.
const markVerse = h => h.replace(/<p>((?:(?!<\/p>)[\s\S])*?<br\s*\/?>[\s\S]*?)<\/p>/g,
    '<p class="verse">$1</p>');

const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

let body = '', nfig = 0, ntab = 0;
const seen = new Map();
const toc = [];

for (const p of files) {
    const { html, figures } = renderFile({ path: p });
    for (const fig of figures) {
        try {
            if (/\.svg$/i.test(fig.src))
                // -d/-p are only DPI HINTS, and these SVGs carry an explicit width="900",
                // which wins - so the print build was quietly producing the same 900px
                // file as the screen build, about 165 DPI across the text measure. An
                // explicit output width is what actually controls it. 2400px across the
                // 5.45in measure is ~440 DPI, comfortably past the 300 KDP asks for.
                execSync(`rsvg-convert -w 2400 "${fig.src}" -o "${OUT}/images/${fig.out}"`);
            else
                execSync(`cp "${fig.src}" "${OUT}/images/${fig.out}"`);
            nfig++;
        } catch { console.log('  figure failed:', fig.src); }
    }
    ntab += (html.match(/<table>/g) || []).length;

    // A quiz belongs to the chapter it follows - it is not a chapter of its
    // own. So its title is marked, which keeps it out of the running header
    // and lets it be set lighter than a chapter opener, and its QUESTIONS /
    // ANSWERS headings are kept out of the contents entirely.
    const isQuiz = p.endsWith('quiz.md');

    const withIds = html.replace(/<h([1-3])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
        let id = slug(text) || 'h';
        const n = (seen.get(id) || 0) + 1;
        seen.set(id, n);
        if (n > 1) id += '-' + n;
        const cls = isQuiz ? ' class="quiz"' : '';
        if (!isQuiz || lvl === '1') toc.push({ level: +lvl, text, id, quiz: isQuiz });

        // The running head takes the TITLE only, not "Chapter 15 - " as well.
        // The full string wraps onto two lines in the margin box, and the
        // number is redundant sitting next to the folio anyway. Marking the
        // part after the dash gives the header something short to use, while
        // the heading on the page still reads in full.
        let out = inner;
        if (lvl === '1' && !isQuiz) {
            const dash = inner.indexOf('\u2014');
            if (dash > -1)
                out = inner.slice(0, dash + 1) +
                      '<span class="runhead">' + inner.slice(dash + 1).trim() + '</span>';
            else
                out = '<span class="runhead">' + inner + '</span>';
        }
        return `<h${lvl} id="${id}"${cls}>${out}</h${lvl}>`;
    });
    body += markVerse(withIds) + '\n';
}

// The hand-written CONTENTS section in the source has no page numbers and can
// drift from the chapters. Replace it in the OUTPUT only - the markdown keeps
// what the author wrote - with one generated from the headings themselves.
const tocHtml =
    '<div class="toc"><h1 id="contents"><span class="runhead">CONTENTS</span></h1><ul>' +
    toc.filter(t => t.level <= 2 && t.id !== 'contents')
       .map(t => `<li class="lvl${t.level}${t.quiz ? ' quiz' : ''}">` +
                 `<a href="#${t.id}">${t.text}</a></li>`).join('') +
    '</ul></div>';

// The copyright page sits immediately after the title page, and the
// dedication after that - the usual order of front matter.
if (existsSync(join(BASE, 'Copyright.md'))) {
    const cp = renderFile({ path: join(BASE, 'Copyright.md') }).html;
    body = body.replace(/<h1[^>]*id="contents-at-a-glance"/,
        '<div class="copyright">' + cp + '</div>$&');
    console.log('copyright page inserted');
}

// The dedication sits on its own page after the title and before the
// contents, which is where a reader expects it.
if (existsSync(join(BASE, 'Dedication.md'))) {
    const ded = renderFile({ path: join(BASE, 'Dedication.md') }).html;
    body = body.replace(/<h1[^>]*id="contents-at-a-glance"/,
        '<div class="dedication">' + ded + '</div>$&');
    console.log('dedication inserted');
}

// Anchored on the id, NOT on the heading's inner text. It used to match
// `<h1...>CONTENTS</h1>` literally, which the .runhead span added above breaks:
// the heading now renders as `<h1 id="contents"><span ...>CONTENTS</span></h1>`.
// The match silently failed and the book shipped the hand-written contents -
// the one with no page numbers - while this line printed `false` and nothing
// else complained. Hence the assert.
const before = body.length;
body = body.replace(/<h1[^>]*id="contents"[^>]*>[\s\S]*?(?=<h1)/, tocHtml);
if (body.length === before) {
    console.error('FAILED to replace the hand-written CONTENTS - the print book '
                + 'would have no page numbers in its contents. Refusing to build.');
    process.exit(1);
}
console.log('hand-written CONTENTS replaced: true');

// book.css comes from the REPO, not from a scratchpad. It used to be read from
// SP, a temp directory belonging to a long-finished session, so every change
// made to the tracked stylesheet - the h4 rule, the leading, all of it - was
// silently absent from the full print build while the single-chapter build
// (one.mjs, which reads ./book.css) showed it correctly.
const css = readFileSync(new URL('./book.css', import.meta.url), 'utf8');
writeFileSync(join(OUT, 'paged.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>The JavaScript Blueprint</title><style>${css}</style></head><body>${body}</body>
<!-- Chrome implements no CSS Paged Media at all: no @page margin boxes, so no
     folio and no running head; no target-counter, so a contents with no page
     numbers. The stylesheet was written for WeasyPrint, which does support
     them, and nothing warned that Chrome was dropping them silently. Paged.js
     paginates in the page itself and implements the lot. -->
<script>
  // Paged.js lays the book out asynchronously, long after the page reports
  // itself loaded. Chrome will happily print halfway through - it produced a
  // 4-page book that way. This flag is what the printer waits for.
  window.PagedConfig = { auto: true, after: () => { window.__pagedDone = true; } };
</script>
<script src="paged.polyfill.js"></script></html>`);

console.log('files      :', files.length);
console.log('figures    :', nfig);
console.log('tables     :', ntab);
console.log('toc entries:', toc.filter(t => t.level <= 2).length);
console.log('headings   :', toc.length);
