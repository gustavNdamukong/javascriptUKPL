// Finds places where the book's markdown does not render the way it reads.
//
// Two faults, both caused by indentation:
//
//   CODE AS PROSE  an indented listing that markdown did not turn into a code
//                  block. The usual cause is a listing that follows a bullet:
//                  inside a list item a code block needs the item's content
//                  indent PLUS four, so a listing indented one tab is absorbed
//                  into the bullet and set as running prose. Where part of the
//                  listing happens to be indented deeper it clears the bar, and
//                  the block is torn in half - some lines code, the rest prose.
//
//   PROSE AS CODE  a sentence indented four or more columns, which markdown
//                  reads as a listing and sets in monospace.
//
// Measures what marked actually produces rather than re-deriving the CommonMark
// rules, so it agrees with the EPUB and the PDF by construction.
//
// The unit of judgement is the chunk - the run of lines between blank lines -
// because that is the unit markdown itself works in.
//
//   node tools/checkCodeProse.mjs                 whole book
//   node tools/checkCodeProse.mjs ../Chapter2-Variables/variables.md

import { marked } from 'marked';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';

// Same escaping the real build uses, so the rendered output matches.
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
marked.use({
    renderer: {
        html(t) { return esc(typeof t === 'string' ? t : t.raw); },
        codespan(t) { return '<code>' + esc(typeof t === 'string' ? t : t.text) + '</code>'; }
    }
});
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

const indentOf = l => {
    let c = 0;
    for (const ch of l) {
        if (ch === ' ') c++;
        else if (ch === '\t') c += 4 - (c % 4);
        else break;
    }
    return c;
};

// ---- is a line code, or a sentence? -------------------------------------
// Deliberately conservative. Prose in this book names functions inline
// ("the fetchUserData() function"), so a bare pair of parentheses proves
// nothing; these look for structure a sentence does not have.
// A sentence may open with the word "var" ("var becomes a property of
// window..."), so a keyword alone is not enough - it has to be followed by a
// name and then something a declaration would actually have.
const STRONG = [
    /<\/[a-z][a-z0-9]*>|<[a-z][a-z0-9]*(\s[^>]*)?\/?>/i,   // an HTML tag
    /<!DOCTYPE/i,
    /^\s*(let|const|var)\s+[A-Za-z_$][\w$]*\s*([=;,)]|$)/,
    /^\s*(function|async|class|import|export)\s+[A-Za-z_${*]/,
    /=>/,
    /^\s*[)\]}]+[;,]?\s*(\/\/.*)?$/,                        // a line of closers
    /^\s*\{\s*$/,
    /;\s*$/,
    /^\s*\/\//                                              // a comment line
];
const WEAK = [/\w+\.\w+\(/, /===|!==|\+=|&&|\|\|/, /^\s*(if|for|while|else|switch|case|try|catch)\b/];
const isStrongCode = l => STRONG.some(re => re.test(l));
const isCodeish = l => isStrongCode(l) || WEAK.some(re => re.test(l));

// A sentence: several words, mostly letters, no code structure.
const isProseish = l => {
    const t = l.trim().replace(/^[-*]\s+/, '').replace(/^\d+[.)]\s+/, '');
    if (t.length < 30) return false;
    if (t.split(/\s+/).length < 7) return false;
    // A trailing comment is the one place a listing carries a real sentence
    // ("sayHello();   // now it runs"). Judge the code in front of it.
    const code = t.replace(/\/\/.*$/, '').trim();
    if (/[{};]\s*$/.test(code) || /=>/.test(code) || /^\/\//.test(t)) return false;
    if (/^[A-Za-z_$][\w$.]*\s*\([^)]*\)\s*;?$/.test(code)) return false;   // a bare call
    if (/^<|^(let|const|var)\s+[A-Za-z_$][\w$]*\s*[=;,]/.test(t)) return false;
    const alpha = (t.match(/[A-Za-z ]/g) || []).length / t.length;
    return alpha > 0.84;
};

// ---- per file ------------------------------------------------------------
function check(path) {
    const lines = readFileSync(path, 'utf8').split('\n');
    const html = marked.parse(lines.join('\n'));

    // Two pools: everything the renderer set as code, and everything else.
    // A line's fate is decided by which pool it turns up in. Short lines - a
    // lone brace, a `});` - occur all over the file and would match anywhere,
    // so only lines long enough to be distinctive get a vote.
    // Code is matched whole-line: a listing line is set as code only if it IS
    // a line of a code block. Substring matching would call this prose line
    //     "SELECT * FROM products WHERE category = 'books'"
    // code, because it appears inside a db.query(...) call listed above it.
    // Prose still needs substring matching, since a paragraph runs its source
    // lines together.
    const codeLines = new Set();
    for (const m of html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g))
        for (const l of unesc(m[1]).split('\n')) { const t = l.trim(); if (t) codeLines.add(t); }
    const prosePool = unesc(html.replace(/<pre><code[^>]*>[\s\S]*?<\/code><\/pre>/g, '')
                                .replace(/<[^>]+>/g, ''));
    const DISTINCT = 12;
    const fateOf = t => {
        if (t.length < DISTINCT) return 'unknown';
        if (codeLines.has(t)) return 'code';
        if (prosePool.includes(t)) return 'prose';
        return 'unknown';
    };

    const out = [];
    let i = 0;
    while (i < lines.length) {
        if (!lines[i].trim()) { i++; continue; }
        let j = i;
        while (j < lines.length && lines[j].trim()) j++;
        const chunk = [];
        for (let k = i; k < j; k++) chunk.push(k);

        const strong = chunk.filter(k => isStrongCode(lines[k])).length;
        const codey  = chunk.filter(k => isCodeish(lines[k])).length;
        const prosey = chunk.filter(k => isProseish(lines[k])).length;
        const minInd = Math.min(...chunk.map(k => indentOf(lines[k])));

        const fates  = chunk.map(k => fateOf(lines[k].trim()));
        // A sentence sitting at the foot of a listing with no blank line before
        // it - "Why did this work? The property was stored in a WeakMap..." -
        // is prose that correctly renders as prose, not a listing line that
        // failed to render as code. It must not count as evidence of a fault.
        const asProse = chunk.filter((k, n) => fates[n] === 'prose' && !isProseish(lines[k]));
        const asCode  = chunk.filter((k, n) => fates[n] === 'code');

        const isCodeChunk  = strong >= 1 && codey / chunk.length >= 0.6 && prosey / chunk.length < 0.34;
        const isProseChunk = prosey / chunk.length >= 0.6 && codey / chunk.length < 0.4;

        if (isCodeChunk && asProse.length && minInd >= 1)
            out.push({ type: 'code', from: i, to: j - 1, asProse, asCode, size: chunk.length });
        else if (isProseChunk && asCode.length && !asProse.length)
            out.push({ type: 'prose', from: i, to: j - 1, asProse, asCode, size: chunk.length });
        i = j;
    }

    // A listing broken by blank lines renders as ONE runaway paragraph, so
    // report it once rather than once per blank-line-separated piece.
    const merged = [];
    for (const f of out) {
        const prev = merged[merged.length - 1];
        if (prev && prev.type === f.type && f.from - prev.to <= 2) {
            prev.to = f.to; prev.size += f.size;
            prev.asProse = prev.asProse.concat(f.asProse);
            prev.asCode = prev.asCode.concat(f.asCode);
        } else merged.push({ ...f });
    }

    return merged.map(f => f.type === 'code' ? {
        type: 'code', from: f.from + 1, to: f.to + 1, targets: f.asProse.map(k => k + 1),
        kind: f.asCode.length ? 'CODE AS PROSE (listing torn in half)' : 'CODE AS PROSE (whole listing)',
        line: f.asProse[0] + 1,
        detail: `lines ${f.from + 1}-${f.to + 1}, ${f.asProse.length} listing line(s) set as prose`,
        sample: f.asProse.slice(0, 4).map(k => `${String(k + 1).padStart(4)}: ${lines[k].trim().slice(0, 96)}`)
    } : {
        type: 'prose', from: f.from + 1, to: f.to + 1, targets: f.asCode.map(k => k + 1),
        kind: 'PROSE AS CODE',
        line: f.from + 1,
        detail: `lines ${f.from + 1}-${f.to + 1}, ${f.asCode.length} sentence line(s) set in monospace`,
        sample: f.asCode.slice(0, 3).map(k => `${String(k + 1).padStart(4)}: ${lines[k].trim().slice(0, 96)}`)
    });
}
export { check, bookFiles, indentOf };

// ---- reading order -------------------------------------------------------
function bookFiles() {
    const f = [];
    if (existsSync(join(BASE, 'ContentsAndPreface.md'))) f.push(join(BASE, 'ContentsAndPreface.md'));
    for (const c of readdirSync(BASE).filter(d => /^Chapter\d+-/.test(d))
            .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))) {
        const main = readdirSync(join(BASE, c)).find(x => x.endsWith('.md') && x !== 'quiz.md');
        if (main) f.push(join(BASE, c, main));
        if (existsSync(join(BASE, c, 'quiz.md'))) f.push(join(BASE, c, 'quiz.md'));
    }
    for (const x of ['Conclusion.md', 'AboutTheAuthor.md'])
        if (existsSync(join(BASE, x))) f.push(join(BASE, x));
    return f;
}

// CLI only when run directly, so the fixer can import check()
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
const args = process.argv.slice(2);
const files = args.length ? args : bookFiles();
const quiet = process.env.QUIET === '1';
let total = 0;
const perFile = [];
for (const p of files) {
    const hits = check(p);
    if (!hits.length) continue;
    total += hits.length;
    perFile.push([relative(BASE, p), hits.length]);
    if (quiet) continue;
    console.log('\n' + relative(BASE, p));
    for (const h of hits) {
        console.log(`  line ${h.line}  ${h.kind} - ${h.detail}`);
        for (const s of h.sample) console.log('      ' + s);
    }
}
console.log('\n' + '-'.repeat(64));
for (const [f, n] of perFile) console.log(String(n).padStart(4), f);
console.log(String(total).padStart(4), 'TOTAL');
}
