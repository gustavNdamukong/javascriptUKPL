// Stops comments inside listings running long enough to wrap.
//
// A wrapped comment is worse than a long one. The reader sees
//
//     scores[0] = 99;        // fine - scores is now
//     [99, 20, 30]
//
// and the second line, carrying no //, reads as code. Two shapes are treated
// differently:
//
//   TRAILING   a comment after a statement. The comment is lifted onto its own
//              line ABOVE the code, which is what Gustav asked for and what
//              most programming books do - EXCEPT where the line is a
//              console.log and the comment is its output, which belongs below
//              the call that produces it.
//
//   FULL LINE  a comment already on its own line. Simply wrapped onto as many
//              // lines as it needs, so every line begins with //.
//
// Only lines over the threshold are touched, so the diff stays on the problem.
//
//   node tools/wrapComments.mjs                report (default)
//   node tools/wrapComments.mjs --write        apply
//   node tools/wrapComments.mjs --limit 56     different threshold

import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';
import { relative } from 'path';
import { bookFiles } from './checkCodeProse.mjs';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
marked.use({ renderer: {
    html(t) { return esc(typeof t === 'string' ? t : t.raw); },
    codespan(t) { return '<code>' + esc(typeof t === 'string' ? t : t.text) + '</code>'; }
}});
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

const argv = process.argv.slice(2);
const dry = !argv.includes('--write');
const LIMIT = +(argv[argv.indexOf('--limit') + 1] || 0) || 60;

// Where does a real comment start? Not inside a string, and not the // of a URL.
function commentAt(line) {
    let quote = null, esc = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (esc) { esc = false; continue; }
        if (c === '\\') { esc = true; continue; }
        if (quote) { if (c === quote) quote = null; continue; }
        if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
        if (c === '/' && line[i + 1] === '/') return i;
    }
    return -1;
}

const indentOf = l => l.length - l.replace(/^[ \t]*/, '').length;

const pack = (words, w) => {
    const out = [];
    let cur = '';
    for (const x of words) {
        if (cur && (cur + ' ' + x).length > w) { out.push(cur); cur = x; }
        else cur = cur ? cur + ' ' + x : x;
    }
    if (cur) out.push(cur);
    return out;
};

// Wrap, every line carrying its own //. Filling each line to the brim leaves a
// stray word on its own at the end - "...with 1 left / over" - so once the line
// count is known, the narrowest width giving that same count is used instead.
// Same number of lines, evenly filled.
function commentLines(pad, text, limit) {
    const room = Math.max(30, limit - pad.length - 3);
    const words = text.split(/\s+/).filter(Boolean);
    const n = pack(words, room).length;
    let lo = Math.max(...words.map(w => w.length)), hi = room, best = room;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (pack(words, mid).length <= n) { best = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    return pack(words, best).map(t => pad + '// ' + t);
}

// Does this comment report what the line above just printed?
//
// A comment hanging off a console call is describing what appears in the
// console - the value, the error, "the <li> you clicked". Reading it before
// the call that produces it puts the answer before the question, so those go
// below. Every other trailing comment explains the line it sits on, and reads
// better above it.
// A bare value counts too, wherever it hangs: `.sort(...)  // [1, 2, 20, 100]`
// is the answer to the line, not a note about it. But a sentence that merely
// opens with a value - "fine - colours is now [...]" - is still an explanation,
// which is why this tests the FIRST character rather than searching the text.
const isOutputOf = (code, text) =>
       /\bconsole\.(log|error|warn|info|table|dir)\s*\(/.test(code)
    || /^["'`\[\{]/.test(text)
    || /^-?\d/.test(text)
    || /^(true|false|null|undefined|NaN)\b/.test(text)
    || /^(prints?|outputs?|returns?|logs?|gives|yields)\b/i.test(text);

let moved = 0, wrapped = 0, files = 0;
for (const path of bookFiles()) {
    const src = readFileSync(path, 'utf8');
    const lines = src.split('\n');

    // which source lines end up inside a listing
    const html = marked.parse(src);
    const codeText = new Set();
    for (const m of html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g))
        for (const l of unesc(m[1]).split('\n')) { const t = l.trim(); if (t) codeText.add(t); }

    const out = [];
    let inFence = false, touched = 0;
    const notes = [];
    for (const line of lines) {
        if (line.trim().startsWith('```')) { inFence = !inFence; out.push(line); continue; }
        const t = line.trim();
        const isCode = inFence || (indentOf(line) >= 1 && codeText.has(t));
        if (!isCode || !t || line.replace(/\s+$/, '').length <= LIMIT) { out.push(line); continue; }

        const pad = line.slice(0, line.length - line.replace(/^[ \t]*/, '').length);
        const at = commentAt(line);
        if (at < 0) { out.push(line); continue; }

        const before = line.slice(0, at).replace(/\s+$/, '');
        const text = line.slice(at + 2).trim();
        if (!text) { out.push(line); continue; }

        if (!before.trim()) {                       // a full-line comment: wrap it
            out.push(...commentLines(pad, text, LIMIT));
            wrapped++; touched++;
            notes.push(['wrap ', t.slice(0, 64)]);
        } else if (isOutputOf(before, text)) {      // output belongs under its call
            out.push(before);
            out.push(...commentLines(pad, text, LIMIT));
            moved++; touched++;
            notes.push(['below', t.slice(0, 64)]);
        } else {                                    // explanation belongs above
            out.push(...commentLines(pad, text, LIMIT));
            out.push(before);
            moved++; touched++;
            notes.push(['above', t.slice(0, 64)]);
        }
    }
    if (!touched) continue;
    files++;
    console.log('\n' + relative(BASE, path) + '  (' + touched + ')');
    for (const [k, s] of notes.slice(0, 4)) console.log('   ' + k + '  ' + s);
    if (notes.length > 4) console.log('   ...  and ' + (notes.length - 4) + ' more');
    if (!dry) writeFileSync(path, out.join('\n'));
}

console.log('\n' + '-'.repeat(58));
console.log('trailing comments moved onto their own line:', moved);
console.log('full-line comments wrapped                 :', wrapped);
console.log('files                                      :', files);
console.log('threshold                                  :', LIMIT, 'characters');
if (dry) console.log('\nDRY RUN - nothing written. Re-run with --write to apply.');
