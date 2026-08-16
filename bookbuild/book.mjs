import { renderFile } from './render.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const SP = '/private/tmp/claude-501/-Users-user/5cb49476-179c-47d7-9348-055b74d5737b/scratchpad';
mkdirSync('/tmp/kdpsample/out/images', { recursive: true });

// reading order of the finished book
const files = [];
if (existsSync(join(BASE, 'ContentsAndPreface.md'))) files.push(join(BASE, 'ContentsAndPreface.md'));
for (const c of readdirSync(BASE).filter(d => /^Chapter\d+-/.test(d))
        .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))) {
    const main = readdirSync(join(BASE, c)).find(f => f.endsWith('.md') && f !== 'quiz.md');
    if (main) files.push(join(BASE, c, main));
    if (existsSync(join(BASE, c, 'quiz.md'))) files.push(join(BASE, c, 'quiz.md'));
}
if (existsSync(join(BASE, 'Conclusion.md'))) files.push(join(BASE, 'Conclusion.md'));

let body = '', nfig = 0, ntab = 0, failed = [];
for (const p of files) {
    const { html, figures } = renderFile({ path: p });
    for (const fig of figures) {
        try {
            // most figures are SVG and need rendering; one is already a PNG
            if (/\.svg$/i.test(fig.src))
                execSync(`rsvg-convert -d 300 -p 300 "${fig.src}" -o "/tmp/kdpsample/out/images/${fig.out}"`);
            else
                execSync(`cp "${fig.src}" "/tmp/kdpsample/out/images/${fig.out}"`);
            nfig++;
        } catch { failed.push(fig.src); }
    }
    ntab += (html.match(/<table>/g) || []).length;
    body += html + '\n';
}

const css = readFileSync(join(SP, process.env.BOOKCSS || 'book.css'), 'utf8');
writeFileSync((process.env.BOOKOUT || '/tmp/kdpsample/out/book.html'),
    `<!doctype html><html><head><meta charset="utf-8">` +
    `<title>The JavaScript Blueprint</title><style>${css}</style></head><body>${body}</body></html>`);

console.log('files assembled :', files.length);
console.log('figures rendered:', nfig);
console.log('tables          :', ntab);
console.log('h1 (chapter starts):', (body.match(/<h1[ >]/g) || []).length);
console.log('words           :', body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
if (failed.length) console.log('FIGURES FAILED  :', failed);
