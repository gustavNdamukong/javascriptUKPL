// Renders the book's markdown to XHTML fragments.
// Shared by the PDF build and the EPUB build so both get identical content.
import { marked } from 'marked';
import { readFileSync, existsSync } from 'fs';
import { basename, dirname, join } from 'path';

const BASE = '/Users/user/UKPL/javascriptUKPL';

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Nothing in this book is live markup - every tag in the prose is example
// code the reader is meant to see. Escaping it is what stops a stray
// </body> in an example from closing the document early.
// Do NOT strip HTML comments here. It is tempting - it would have hidden the
// "FIGURE 1.1 PLACEHOLDER" note that reached the finished EPUB - but Chapter 15
// teaches DOM node types, and `<!-- This is a comment node -->` is the example
// the reader is meant to see. Silently swallowing comments deletes the lesson.
// Forgotten author notes are caught by tools/checkPlaceholders.mjs instead.
marked.use({
    renderer: {
        html(t) { return esc(typeof t === 'string' ? t : t.raw); },
        codespan(t) { return '<code>' + esc(typeof t === 'string' ? t : t.text) + '</code>'; }
    }
});

// The reading order of the finished book.
export function chapterFiles() {
    const { readdirSync } = require('fs');
    const chapters = readdirSync(BASE)
        .filter(d => /^Chapter\d+-/.test(d))
        .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));
    const out = [];
    if (existsSync(join(BASE, 'ContentsAndPreface.md')))
        out.push({ path: join(BASE, 'ContentsAndPreface.md'), id: 'front' });
    for (const c of chapters) {
        const n = +c.match(/\d+/)[0];
        const main = readdirSync(join(BASE, c)).find(f => f.endsWith('.md') && f !== 'quiz.md');
        if (main) out.push({ path: join(BASE, c, main), id: `ch${n}`, chapter: n, dir: c });
        if (existsSync(join(BASE, c, 'quiz.md')))
            out.push({ path: join(BASE, c, 'quiz.md'), id: `ch${n}quiz`, chapter: n, dir: c, quiz: true });
    }
    if (existsSync(join(BASE, 'Conclusion.md')))
        out.push({ path: join(BASE, 'Conclusion.md'), id: 'conclusion' });
    // CoverPrint.md is back-cover copy and deliberately NOT part of the book.
    return out;
}

// Rewrites images/foo.svg -> a path the output can actually resolve,
// and reports which figures a file uses.
export function renderFile(f, imgPrefix = 'images/', svgToPng = true) {
    let md = readFileSync(f.path, 'utf8');
    const figures = [];
    md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, src) => {
        const file = basename(src).replace(/\.svg$/, svgToPng ? '.png' : '.svg');
        figures.push({ src: join(dirname(f.path), src), out: file });
        return `![${alt}](${imgPrefix}${file})`;
    });
    return { html: normaliseCode(marked.parse(md)), figures };
}

// Pulls the headings out so the EPUB can build a real navigable TOC.
export function headings(html) {
    return [...html.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/g)].map(m => ({
        level: +m[1],
        text: m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim()
    }));
}

// ---- code indentation ----------------------------------------------------
// The book was written in a notes app, so listings carry 2-3 tabs of indent
// and ragged one-off spaces. Markdown only strips the first four columns, so
// the rest survives into the page and nested blocks look 3-4 levels deep.
// This re-indents each block to one clean level per nesting step, without
// touching the author's source.
const unesc = s => s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"')
                    .replace(/&#39;/g,"'").replace(/&amp;/g,'&');
const reesc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function indentOf(l) {
    let c = 0;
    for (const ch of l) {
        if (ch === ' ') c++;
        else if (ch === '\t') c += 4 - (c % 4);
        else break;
    }
    return c;
}

export function normaliseCode(html) {
    return html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (m, body) => {
        const lines = unesc(body).replace(/\s+$/, '').split('\n');
        const live = lines.filter(l => l.trim());
        if (!live.length) return m;

        // shift the whole block flush left
        const base = Math.min(...live.map(indentOf));
        const raw = lines.map(l => (l.trim() ? indentOf(l) - base : null));

        // A line that is nothing but closing brackets belongs at its opener's
        // level, not at whatever column the author happened to leave it in.
        // Keeping such lines out of the clustering stops them inventing a
        // level of their own and pushing the block's real body a step deeper.
        const isCloser = l => /^[)\]}>;,\s]+$/.test(l.trim());
        const forLevels = lines
            .map((l, i) => (raw[i] !== null && !isCloser(l) ? raw[i] : null))
            .filter(v => v !== null);

        // cluster indents within 2 columns of each other, so a stray space
        // does not invent a whole new nesting level
        const uniq = [...new Set(forLevels)].sort((a, b) => a - b);
        const clusters = [];
        for (const v of uniq) {
            if (clusters.length && v - clusters[clusters.length - 1][0] <= 2)
                clusters[clusters.length - 1].push(v);
            else clusters.push([v]);
        }
        const level = new Map();
        clusters.forEach((c, i) => c.forEach(v => level.set(v, i)));

        const lvlOf = v => {
            if (level.has(v)) return level.get(v);
            let best = 0;                       // nearest cluster at or below
            for (const [k, n] of level) if (k <= v && n > best) best = n;
            return best;
        };

        let prev = 0;
        const out = lines.map((l, i) => {
            if (raw[i] === null) return '';
            let n;
            // Each closer steps out one from the last line, and consecutive
            // closers keep stepping so a nested block unwinds properly. But
            // stepping out by one is wrong when the line before was a wrapped
            // continuation rather than a nesting level:
            //
            //     thing.textContent =
            //         JSON.stringify(x);
            //     }              <- steps out from the continuation, not the {
            //
            // So take the author's own column when it asks for a shallower
            // level than that, and only fall back to stepping out when the
            // closer was left too deep.
            if (isCloser(l)) n = Math.min(lvlOf(raw[i]), Math.max(0, prev - 1));
            else n = lvlOf(raw[i]);
            prev = n;
            return ' '.repeat(n * 4) + l.trim();
        });
        return '<pre><code>' + reesc(out.join('\n')) + '</code></pre>';
    });
}
