// Repairs what checkCodeProse finds.
//
//   CODE AS PROSE  the listing is wrapped in ``` fences, which no indentation
//                  can misread.
//   PROSE AS CODE  the sentences are dedented back below the code threshold.
//
// The indent a fence needs depends on whether the listing sits inside a list
// item, and getting that wrong either leaves the fault in place or splits the
// enclosing list and re-spaces its bullets. So nothing is worked out from the
// CommonMark rules: each candidate fix is applied to a copy, re-rendered, and
// kept only if it provably (a) moves the target lines across the code/prose
// line, and (b) leaves every other block in the file untouched. A site where
// no candidate does both is reported and left alone for hand-fixing.
//
//   node tools/fixCodeProse.mjs <file.md> ...            report only (default)
//   node tools/fixCodeProse.mjs --write <file.md> ...    write
//   node tools/fixCodeProse.mjs --write                  whole book

import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';
import { relative } from 'path';
import { check, bookFiles, indentOf, isProseish, isCodeish } from './checkCodeProse.mjs';

const BASE = '/Users/user/UKPL/javascriptUKPL';
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
marked.use({ renderer: {
    html(t) { return esc(typeof t === 'string' ? t : t.raw); },
    codespan(t) { return '<code>' + esc(typeof t === 'string' ? t : t.text) + '</code>'; }
}});
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

// column reached after a prefix, tabs expanded on 4s
const colAfter = p => { let c = 0; for (const ch of p) c += ch === '\t' ? 4 - (c % 4) : 1; return c; };
const expand = l => {
    let o = '';
    for (const ch of l) { if (ch === '\t') { do { o += ' '; } while (o.length % 4); } else o += ch; }
    return o;
};

// The content indent of the list item this line sits in, or null if none.
function listContentIndent(lines, idx) {
    for (let k = idx - 2; k >= 0; k--) {
        const l = lines[k];
        if (!l.trim()) continue;
        const m = l.match(/^([ \t]*)([-*+]|\d+[.)])([ \t]+)/);
        if (m) return colAfter(m[0]);
        if (indentOf(l) === 0) return null;   // a top-level block closes the list
    }
    return null;
}

// ---- candidate fixes -----------------------------------------------------
function candidates(lines, f) {
    const out = [];
    const ci = listContentIndent(lines, f.from);

    if (f.type === 'code') {
        // A chunk can hold a sentence and a listing with no blank line between
        // them - "Change the value of the 'name' property like this:" sitting
        // directly on top of the code. Fencing the whole chunk would set that
        // sentence in monospace, so the fence is pulled back to where the code
        // actually starts and ends, and a blank line put in its place.
        //
        // Trimming on "does this line look like code?" rather than "does it
        // look like prose?" matters: a wrapped paragraph ends on a short line
        // ("Singleton implementation worked.") that is too brief to read as
        // prose on its own, but is plainly not code either.
        let a = f.from, b = f.to;
        while (a <= b && !isCodeish(lines[a - 1])) a++;
        while (b >= a && !isCodeish(lines[b - 1])) b--;
        if (a > b) return out;

        const body = lines.slice(a - 1, b).map(expand);
        const live = body.filter(l => l.trim());
        const base = Math.min(...live.map(indentOf));
        const dedented = body.map(l => (l.trim() ? l.slice(base) : ''));
        const gapBefore = a > 1 && lines[a - 2].trim() ? [''] : [];
        const gapAfter  = b < lines.length && (lines[b] ?? '').trim() ? [''] : [];
        for (const ind of [...new Set([ci ?? 0, 0])]) {
            const pad = ' '.repeat(ind);
            out.push({
                label: `fence at ${ind}${a > f.from || b < f.to ? ' (prose trimmed)' : ''}`,
                from: a, to: b,
                text: [...gapBefore, pad + '```',
                       ...dedented.map(l => (l ? pad + l : '')),
                       pad + '```', ...gapAfter]
            });
        }
    } else {
        const body = lines.slice(f.from - 1, f.to).map(expand);
        // only the lines the renderer actually set as code get moved
        const lo = Math.min(...f.targets), hi = Math.max(...f.targets);
        const seg = lines.slice(lo - 1, hi).map(expand);
        const live = seg.filter(l => l.trim());
        const base = Math.min(...live.map(indentOf));
        for (const target of [...new Set([ci ?? 0, 0, 2])].filter(t => t < base)) {
            const shift = base - target;
            out.push({
                label: `dedent ${shift} to col ${target}`,
                from: lo, to: hi,
                text: seg.map(l => (l.trim() ? l.slice(shift) : ''))
            });
        }
    }
    return out;
}

// ---- validation ----------------------------------------------------------
const blocksOf = html => [...html.matchAll(
    /<(h[1-6]|p|pre|ul|ol|table|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/g)]
    .map(m => m[1] + '|' + unesc(m[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim());

const codeSetOf = html => {
    const s = new Set();
    for (const m of html.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g))
        for (const l of unesc(m[1]).split('\n')) { const t = l.trim(); if (t) s.add(t); }
    return s;
};

function evaluate(before, after, f, cand) {
    const hb = marked.parse(before.join('\n')), ha = marked.parse(after.join('\n'));
    const cb = codeSetOf(hb), ca = codeSetOf(ha);

    // (a) did the target lines actually move?
    const tgt = f.targets.map(n => before[n - 1].trim()).filter(t => t.length >= 12);
    if (!tgt.length) return { ok: false, why: 'no distinctive target line' };
    const moved = f.type === 'code' ? tgt.every(t => ca.has(t)) : tgt.every(t => !ca.has(t));
    if (!moved) return { ok: false, why: 'target lines did not move' };

    // (b) is every other block in the file untouched?
    const bb = blocksOf(hb), ba = blocksOf(ha);
    let p = 0; while (p < bb.length && p < ba.length && bb[p] === ba[p]) p++;
    let s = 0; while (s < bb.length - p && s < ba.length - p &&
                      bb[bb.length - 1 - s] === ba[ba.length - 1 - s]) s++;
    const changedB = bb.slice(p, bb.length - s), changedA = ba.slice(p, ba.length - s);

    // a changed block is explained if it draws on the edited region or its
    // immediate surroundings, which legitimately re-split around the fix
    const near = [];
    for (let k = Math.max(1, f.from - 3); k <= Math.min(before.length, f.to + 3); k++)
        near.push(before[k - 1]);
    for (const l of cand.text) near.push(l);
    // Compare on normalised text. Once a line leaves a code block markdown
    // starts reading it, and consumes the very characters a raw comparison
    // would key on - the bullet marker, the emphasis stars, the backticks.
    const norm = s => s.replace(/^\s*[-*+]\s+/, '').replace(/[*_`]/g, '')
                       .replace(/\s+/g, ' ').trim();
    const keys = near.map(norm).filter(t => t.length >= 14);
    const explained = b => {
        const nb = norm(b.replace(/^[a-z0-9]+\|/, ''));
        return nb.length < 14 || keys.some(k => nb.includes(k));
    };
    const bad = [...changedB, ...changedA].filter(b => !explained(b));
    return { ok: bad.length === 0, why: bad.length ? `${bad.length} unrelated block(s) changed` : '',
             unrelated: bad.slice(0, 2), churn: changedB.length + changedA.length };
}

// ---- drive ---------------------------------------------------------------
const argv = process.argv.slice(2);
const dry = !argv.includes('--write');          // writing is always explicit
const files = argv.filter(a => !a.startsWith('--'));
const targets = files.length ? files : bookFiles();

let fixed = 0, failed = 0;
for (const path of targets) {
    const findings = check(path);
    if (!findings.length) continue;
    let lines = readFileSync(path, 'utf8').split('\n');
    const notes = [];

    for (const f of [...findings].sort((a, b) => b.from - a.from)) {
        let best = null;
        for (const cand of candidates(lines, f)) {
            const after = [...lines];
            after.splice(cand.from - 1, cand.to - cand.from + 1, ...cand.text);
            const v = evaluate(lines, after, f, cand);
            if (v.ok && (!best || v.churn < best.v.churn)) best = { cand, after, v };
        }
        if (best) {
            lines = best.after;
            notes.push(`  ok   ${String(f.from).padStart(5)}-${String(f.to).padEnd(5)} ${f.kind.padEnd(36)} ${best.cand.label}`);
            fixed++;
        } else {
            notes.push(`  MISS ${String(f.from).padStart(5)}-${String(f.to).padEnd(5)} ${f.kind.padEnd(36)} no safe candidate`);
            failed++;
        }
    }
    console.log(relative(BASE, path));
    console.log(notes.join('\n'));
    if (!dry) writeFileSync(path, lines.join('\n'));
}
console.log('\n' + '-'.repeat(60));
console.log('fixed :', fixed);
console.log('missed:', failed, failed ? '(left alone, fix by hand)' : '');
if (dry) console.log('\nDRY RUN - nothing written. Re-run without --dry to apply.');
