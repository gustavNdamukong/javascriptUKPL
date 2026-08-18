// Prints each finding from checkCodeProse with its surrounding source, tabs
// made visible, so a fix can be chosen with the context in view.
//   node tools/showFindings.mjs <file.md> [context]
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const file = process.argv[2];
const ctx = +(process.argv[3] || 4);
const out = execSync(`node ${new URL('./checkCodeProse.mjs', import.meta.url).pathname} ${file}`,
                     { encoding: 'utf8' });
const lines = readFileSync(file, 'utf8').split('\n');
const vis = s => s.replace(/\t/g, '»···').replace(/ +$/, m => '·'.repeat(m.length));

for (const m of out.matchAll(/^  line \d+  (.+?) - lines (\d+)-(\d+), (.+)$/gm)) {
    const [, kind, from, to, detail] = m;
    console.log(`\n=== ${kind}  (${detail})`);
    const a = Math.max(1, +from - ctx), b = Math.min(lines.length, +to + ctx);
    for (let i = a; i <= b; i++) {
        const mark = i >= +from && i <= +to ? '>' : ' ';
        console.log(`${mark}${String(i).padStart(5)}| ${vis(lines[i - 1]).slice(0, 120)}`);
    }
}
