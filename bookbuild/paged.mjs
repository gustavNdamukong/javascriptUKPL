// Assembles the book for WeasyPrint: heading ids, a generated page-numbered
// table of contents, and the running-header hooks.
import { renderFile } from './render.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const SP = '/private/tmp/claude-501/-Users-user/5cb49476-179c-47d7-9348-055b74d5737b/scratchpad';
const OUT = '/tmp/kdpsample/out';
mkdirSync(join(OUT, 'images'), { recursive: true });

const files = [];
if (existsSync(join(BASE, 'ContentsAndPreface.md'))) files.push(join(BASE, 'ContentsAndPreface.md'));
for (const c of readdirSync(BASE).filter(d => /^Chapter\d+-/.test(d))
        .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))) {
    const main = readdirSync(join(BASE, c)).find(f => f.endsWith('.md') && f !== 'quiz.md');
    if (main) files.push(join(BASE, c, main));
    if (existsSync(join(BASE, c, 'quiz.md'))) files.push(join(BASE, c, 'quiz.md'));
}
if (existsSync(join(BASE, 'Conclusion.md'))) files.push(join(BASE, 'Conclusion.md'));

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
                execSync(`rsvg-convert -d 300 -p 300 "${fig.src}" -o "${OUT}/images/${fig.out}"`);
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
        return `<h${lvl} id="${id}"${cls}>${inner}</h${lvl}>`;
    });
    body += withIds + '\n';
}

// The hand-written CONTENTS section in the source has no page numbers and can
// drift from the chapters. Replace it in the OUTPUT only - the markdown keeps
// what the author wrote - with one generated from the headings themselves.
const tocHtml =
    '<div class="toc"><h1 id="contents">CONTENTS</h1><ul>' +
    toc.filter(t => t.level <= 2 && t.id !== 'contents')
       .map(t => `<li class="lvl${t.level}${t.quiz ? ' quiz' : ''}">` +
                 `<a href="#${t.id}">${t.text}</a></li>`).join('') +
    '</ul></div>';

// The dedication sits on its own page after the title and before the
// contents, which is where a reader expects it.
if (existsSync(join(BASE, 'Dedication.md'))) {
    const ded = renderFile({ path: join(BASE, 'Dedication.md') }).html;
    body = body.replace(/<h1[^>]*id="contents-at-a-glance"/,
        '<div class="dedication">' + ded + '</div>$&');
    console.log('dedication inserted');
}

const before = body.length;
body = body.replace(/<h1[^>]*>CONTENTS<\/h1>[\s\S]*?(?=<h1)/, tocHtml);
console.log('hand-written CONTENTS replaced:', body.length !== before);

const css = readFileSync(join(SP, 'book.css'), 'utf8');
writeFileSync(join(OUT, 'paged.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>The JavaScript Blueprint</title><style>${css}</style></head><body>${body}</body></html>`);

console.log('files      :', files.length);
console.log('figures    :', nfig);
console.log('tables     :', ntab);
console.log('toc entries:', toc.filter(t => t.level <= 2).length);
console.log('headings   :', toc.length);
