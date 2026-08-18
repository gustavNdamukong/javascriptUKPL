// Finds author's notes left in the book.
//
// Every tag in this book's prose is escaped rather than interpreted, because
// it is example markup the reader is meant to see. That includes HTML
// comments - which is how
//
//     <!-- FIGURE 1.1 PLACEHOLDER - image not yet created. ... -->
//
// came to be printed in the finished EPUB. The renderer must not strip
// comments to hide this, because Chapter 15 teaches DOM comment nodes and
// prints `<!-- This is a comment node -->` on purpose. So the note is caught
// here instead, before publishing, rather than swallowed at render time.
//
// Also reports figure references whose image file is missing, and images that
// exist but are never referenced.
//
//   node tools/checkPlaceholders.mjs

import { readFileSync, existsSync, readdirSync } from 'fs';
import { dirname, join, relative, basename } from 'path';
import { bookFiles } from './checkCodeProse.mjs';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const NOTE = /\b(PLACEHOLDER|TODO|FIXME|XXX|TO DO|WRITE ME|NOT YET CREATED)\b/i;

let notes = 0, missing = 0, unused = 0;
const referenced = new Set();

for (const path of bookFiles()) {
    const lines = readFileSync(path, 'utf8').split('\n');
    const src = lines.join('\n');
    const rel = relative(BASE, path);

    // author's notes inside HTML comments
    for (const m of src.matchAll(/<!--[\s\S]*?-->/g)) {
        if (!NOTE.test(m[0])) continue;                     // a real example comment
        const line = src.slice(0, m.index).split('\n').length;
        console.log(`${rel}:${line}  AUTHOR NOTE LEFT IN THE BOOK`);
        console.log('    ' + m[0].split('\n')[0].slice(0, 96));
        notes++;
    }

    // figure references, and whether the file is there
    for (const m of src.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
        const file = join(dirname(path), m[2]);
        // The text refers to figures by .svg or .png interchangeably - the build
        // rasterises SVG for the EPUB - so match on the stem, extension removed.
        referenced.add(file.replace(/\.(png|jpe?g|svg)$/i, ''));
        const svg = file.replace(/\.png$/i, '.svg');
        if (existsSync(file) || existsSync(svg)) continue;
        const line = src.slice(0, m.index).split('\n').length;
        console.log(`${rel}:${line}  FIGURE FILE MISSING - ${m[2]}`);
        missing++;
    }
}

// images sitting in the tree that nothing points at
for (const d of readdirSync(BASE).filter(x => /^Chapter\d+-/.test(x))) {
    const dir = join(BASE, d, 'images');
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
        if (!/\.(png|jpe?g|svg)$/i.test(f)) continue;
        const stem = join(dir, f).replace(/\.(png|jpe?g|svg)$/i, '');
        if (referenced.has(stem)) continue;
        console.log(`${relative(BASE, join(dir, f))}  IMAGE NEVER REFERENCED`);
        unused++;
    }
}

console.log('\n' + '-'.repeat(56));
console.log('author notes left in   :', notes);
console.log('figures missing a file :', missing);
console.log('images never referenced:', unused);
