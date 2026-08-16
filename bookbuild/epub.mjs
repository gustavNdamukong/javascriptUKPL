// Builds an EPUB 3 by hand: one XHTML file per chapter, a navigation
// document, and a package manifest. KDP accepts EPUB for the Kindle edition.
import { renderFile } from './render.mjs';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, basename } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const OUT = '/tmp/kdpsample/epub';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'OEBPS', 'images'), { recursive: true });
mkdirSync(join(OUT, 'META-INF'), { recursive: true });

const esc = s => s.replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// ---- reading order -------------------------------------------------------
const files = [];
if (existsSync(join(BASE, 'ContentsAndPreface.md')))
    files.push({ path: join(BASE, 'ContentsAndPreface.md'), name: 'front' });
for (const c of readdirSync(BASE).filter(d => /^Chapter\d+-/.test(d))
        .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))) {
    const n = +c.match(/\d+/)[0];
    const main = readdirSync(join(BASE, c)).find(f => f.endsWith('.md') && f !== 'quiz.md');
    if (main) files.push({ path: join(BASE, c, main), name: `ch${n}` });
    if (existsSync(join(BASE, c, 'quiz.md')))
        files.push({ path: join(BASE, c, 'quiz.md'), name: `ch${n}quiz`, quiz: true });
}
if (existsSync(join(BASE, 'Conclusion.md')))
    files.push({ path: join(BASE, 'Conclusion.md'), name: 'conclusion' });
if (existsSync(join(BASE, 'AboutTheAuthor.md')))
    files.push({ path: join(BASE, 'AboutTheAuthor.md'), name: 'author' });

// ---- stylesheet: reflowable, so no page geometry ------------------------
const css = `
html, body { margin: 0; padding: 0; }
body { font-family: sans-serif; line-height: 1.5; }
h1, h2, h3, h4, h5, h6 { font-family: sans-serif; line-height: 1.2; page-break-after: avoid; }
h1 { font-size: 1.7em; margin: 1em 0 0.8em; border-bottom: 2px solid #000; padding-bottom: 0.2em; }
h1.quiz { font-size: 1.25em; font-weight: 500; border-bottom: 1px solid #999; }
h2 { font-size: 1.3em; margin: 1.4em 0 0.5em; }
h3 { font-size: 1.12em; margin: 1.2em 0 0.4em; }
h4, h5, h6 { font-size: 1em; margin: 1em 0 0.3em; }
p { margin: 0 0 0.6em; text-indent: 1.2em; }
li > p, li p + p { text-indent: 0; }
ul, ol { margin: 0.4em 0 0.7em; }
li { margin-bottom: 0.25em; }
pre {
    font-family: monospace; font-size: 0.82em; line-height: 1.4;
    margin: 0.7em 0; padding: 0.2em 0 0.2em 0.8em;
    white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;
}
code { font-family: monospace; font-size: 0.88em; }
p code, li code { background: #f2f2f2; padding: 0 0.2em; overflow-wrap: anywhere; }
pre code { background: none; padding: 0; font-size: inherit; }
img { max-width: 100%; height: auto; display: block; margin: 1em auto 0.3em; }
table { border-collapse: collapse; margin: 0.8em 0; font-size: 0.9em; }
th, td { border: 1px solid #bbb; padding: 0.25em 0.5em; text-align: left; }
th { background: #f2f2f2; }
`;
writeFileSync(join(OUT, 'OEBPS', 'style.css'), css);

// ---- chapters ------------------------------------------------------------
const nav = [];
const manifest = [];
const spine = [];
const images = new Set();

for (const f of files) {
    let { html, figures } = renderFile(f, 'images/');
    if (f.name === 'front' && existsSync(join(BASE, 'Copyright.md'))) {
        const cp = renderFile({ path: join(BASE, 'Copyright.md') }, 'images/').html;
        html = html.replace(/<h1>CONTENTS AT A GLANCE<\/h1>/,
            '<div class="copyright">' + cp + '</div>$&');
    }
    if (f.name === 'front' && existsSync(join(BASE, 'Dedication.md'))) {
        const ded = renderFile({ path: join(BASE, 'Dedication.md') }, 'images/').html;
        html = html.replace(/<h1>CONTENTS AT A GLANCE<\/h1>/,
            '<div class="dedication">' + ded + '</div>$&');
    }
    for (const fig of figures) {
        const dest = join(OUT, 'OEBPS', 'images', fig.out);
        try {
            if (/\.svg$/i.test(fig.src)) execSync(`rsvg-convert -d 200 -p 200 "${fig.src}" -o "${dest}"`);
            else copyFileSync(fig.src, dest);
            images.add(fig.out);
        } catch { console.log('  figure failed:', fig.src); }
    }

    // heading ids, and collect the navigation entries
    let title = f.name;
    const withIds = html.replace(/<h([1-3])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
        const id = slug(text) || 'h';
        if (lvl === '1' && title === f.name) title = text;
        if (lvl === '1' || (!f.quiz && lvl === '2'))
            nav.push({ level: f.quiz ? 2 : +lvl, text, href: `${f.name}.xhtml#${id}` });
        const cls = f.quiz ? ' class="quiz"' : '';
        return `<h${lvl} id="${id}"${cls}>${inner}</h${lvl}>`;
    });

    // XHTML must be well formed. Void elements need closing, and a bare
    // ampersand - legal in HTML, and common in prose like "HTMLCollections
    // & NodeLists" - is a parse error here.
    const xhtml = withIds
        .replace(/<(img|br|hr)([^>]*?)\s*\/?>/g, '<$1$2 />')
        .replace(/&nbsp;/g, '&#160;')
        .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

    writeFileSync(join(OUT, 'OEBPS', f.name + '.xhtml'),
`<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head><meta charset="utf-8" /><title>${esc(title)}</title>
<link rel="stylesheet" type="text/css" href="style.css" /></head>
<body>
${xhtml}
</body></html>`);
    manifest.push(`<item id="${f.name}" href="${f.name}.xhtml" media-type="application/xhtml+xml"/>`);
    spine.push(`<itemref idref="${f.name}"/>`);
}

// ---- navigation document -------------------------------------------------
let navList = '', depth = 0;
for (const n of nav) {
    while (depth < n.level - 1) { navList += '<ol><li>'; depth++; }
    while (depth > n.level - 1) { navList += '</li></ol>'; depth--; }
    navList += (navList.endsWith('<li>') ? '' : (depth >= 0 && navList ? '</li><li>' : '<li>'));
    navList += `<a href="${n.href}">${esc(n.text)}</a>`;
}
while (depth-- > 0) navList += '</li></ol>';
navList = '<ol><li>' + navList.replace(/^<li>/, '') + '</li></ol>';

writeFileSync(join(OUT, 'OEBPS', 'nav.xhtml'),
`<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
<head><meta charset="utf-8" /><title>Contents</title>
<link rel="stylesheet" type="text/css" href="style.css" /></head>
<body>
<nav epub:type="toc" id="toc"><h1>Contents</h1>
${navList}
</nav>
</body></html>`);

// ---- package -------------------------------------------------------------
const imgItems = [...images].map((n, i) =>
    `<item id="img${i}" href="images/${n}" media-type="image/${n.endsWith('.png') ? 'png' : 'jpeg'}"/>`).join('\n    ');

writeFileSync(join(OUT, 'OEBPS', 'content.opf'),
`<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">urn:uuid:javascript-blueprint-ndamukong</dc:identifier>
    <dc:title>The JavaScript Blueprint</dc:title>
    <dc:creator>Gustav Ndamukong</dc:creator>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">2026-01-01T00:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
    ${manifest.join('\n    ')}
    ${imgItems}
  </manifest>
  <spine>
    <itemref idref="nav"/>
    ${spine.join('\n    ')}
  </spine>
</package>`);

writeFileSync(join(OUT, 'META-INF', 'container.xml'),
`<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);
writeFileSync(join(OUT, 'mimetype'), 'application/epub+zip');

console.log('documents :', files.length);
console.log('nav entries:', nav.length);
console.log('images    :', images.size);
