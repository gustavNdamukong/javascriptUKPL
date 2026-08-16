import { renderFile } from './render.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
const src = process.argv[2], out = process.argv[3];
mkdirSync('/tmp/kdpsample/out/images', { recursive: true });
const { html, figures } = renderFile({ path: src });
for (const fig of figures) {
  try { execSync(`rsvg-convert -d 300 -p 300 "${fig.src}" -o "/tmp/kdpsample/out/images/${fig.out}"`); } catch {}
}
const css = readFileSync('./book.css','utf8');
writeFileSync(out, `<!doctype html><html><head><meta charset="utf-8"><title>The JavaScript Blueprint</title><style>${css}</style></head><body>${html}</body></html>`);
console.log('tables:', (html.match(/<table>/g)||[]).length, ' figures:', figures.length);
