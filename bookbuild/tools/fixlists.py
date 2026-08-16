#!/usr/bin/env python3
"""Second pass: make indented prose and bullets render as prose and lists.

Leaves genuine code blocks alone. Works line by line, deciding whether an
indented run is code or prose before touching it.
"""
import io, re, sys

CODEY   = re.compile(r'[{};=<>]|=>|\bfunction\b|\bconst\b|\blet\b|\bvar\b|console\.'
                     r'|document\.|\breturn\b|^\s*[\}\)\]]|^\s*//|^\s*<')
# (?![*_]) so that a line opening with **bold** is not mistaken for a
# bullet whose marker is the first asterisk
BULLET  = re.compile(r'^([ \t]*)([-*•])(?![*_])(\s*)(\S.*?)\s*$')
HEADING = re.compile(r'^#{1,6} ')

def depth_of(ind):
    return ind.count('\t') if '\t' in ind else len(ind) // 4

def run_is_code(lines):
    """A blank-line-delimited run: is it code?"""
    body = [l for l in lines if l.strip()]
    if not body: return False
    hits = sum(1 for l in body if CODEY.search(l))
    return hits / len(body) >= 0.30

def convert(src):
    lines = src.split('\n')
    out, i = [], 0
    stats = {'bullets': 0, 'dedented': 0}
    while i < len(lines):
        if HEADING.match(lines[i]) or not lines[i].strip():
            out.append(lines[i]); i += 1; continue

        # gather this run up to the next blank line
        j = i
        while j < len(lines) and lines[j].strip() and not HEADING.match(lines[j]):
            j += 1
        run = lines[i:j]

        if run_is_code(run):
            out.extend(run)                       # untouched
        else:
            for l in run:
                m = BULLET.match(l)
                if m:
                    ind, ch, _, txt = m.groups()
                    d = min(depth_of(ind), 3)     # markdown nests at 2 spaces
                    out.append('  ' * d + '- ' + txt)
                    stats['bullets'] += 1
                else:
                    ind = re.match(r'^([ \t]*)', l).group(1)
                    if '\t' in ind or len(ind) >= 4:
                        out.append('  ' * min(depth_of(ind), 3) + l.strip())
                        stats['dedented'] += 1
                    else:
                        out.append(l)
        i = j
    return '\n'.join(out), stats

if __name__ == '__main__':
    src = io.open(sys.argv[1], encoding='utf-8').read()
    res, st = convert(src)
    io.open(sys.argv[2], 'w', encoding='utf-8').write(res)
    print('wrote %s   (%d bullets normalised, %d prose lines dedented)'
          % (sys.argv[2], st['bullets'], st['dedented']))
