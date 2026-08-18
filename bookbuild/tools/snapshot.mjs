// Renders every file of the book and writes the result to a directory, so a
// formatting fix can be proved to have changed only what it was aimed at.
//
//   node tools/snapshot.mjs /tmp/book-before      before editing
//   node tools/snapshot.mjs /tmp/book-after       after editing
//   diff -ru /tmp/book-before /tmp/book-after
//
// Alongside the XHTML each file gets a .blocks listing - one line per rendered
// block, giving its tag and its opening text. That is the view worth reading:
// a listing wrongly set as prose shows up as a `pre` turning into a `p`, which
// is legible in a diff in a way that a wall of re-wrapped markup is not.

import { renderFile } from '../render.mjs';
import { writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'fs';
import { join, relative } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const OUT = process.argv[2];
if (!OUT) { console.error('usage: node tools/snapshot.mjs <outdir>'); process.exit(1); }
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

function bookFiles() {
    const f = [];
    if (existsSync(join(BASE, 'ContentsAndPreface.md'))) f.push(join(BASE, 'ContentsAndPreface.md'));
    for (const c of readdirSync(BASE).filter(d => /^Chapter\d+-/.test(d))
            .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))) {
        const main = readdirSync(join(BASE, c)).find(x => x.endsWith('.md') && x !== 'quiz.md');
        if (main) f.push(join(BASE, c, main));
        if (existsSync(join(BASE, c, 'quiz.md'))) f.push(join(BASE, c, 'quiz.md'));
    }
    for (const x of ['Conclusion.md', 'AboutTheAuthor.md', 'Copyright.md', 'Dedication.md'])
        if (existsSync(join(BASE, x))) f.push(join(BASE, x));
    return f;
}

let blocks = 0;
for (const p of bookFiles()) {
    const { html } = renderFile({ path: p }, 'images/');
    const name = relative(BASE, p).replace(/\//g, '__');
    writeFileSync(join(OUT, name + '.xhtml'), html);

    // one line per top-level block: its tag, and the text it opens with
    const list = [];
    for (const m of html.matchAll(/<(h[1-6]|p|pre|ul|ol|table|blockquote|hr)\b[^>]*>([\s\S]*?)<\/\1>|<(hr)\s*\/?>/g)) {
        const tag = m[1] || m[3];
        const text = (m[2] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        list.push(`${tag.padEnd(10)} ${text.slice(0, 110)}`);
        blocks++;
    }
    writeFileSync(join(OUT, name + '.blocks'), list.join('\n') + '\n');
}
console.log('snapshot written to', OUT, '-', blocks, 'blocks');
