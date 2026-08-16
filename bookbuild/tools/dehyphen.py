#!/usr/bin/env python3
"""Third pass: rejoin words split by a hyphen across a line break.

"Parent-\nchild relationships" renders as "Parent- child relationships" because
markdown turns the newline into a space. Only touches prose runs, never code.
"""
import io, re, sys

CODEY = re.compile(r'[{};=<>]|=>|\bfunction\b|\bconst\b|\blet\b|\bvar\b|console\.'
                   r'|document\.|\breturn\b|^\s*[\}\)\]]|^\s*//|^\s*<')
SPLIT = re.compile(r'([A-Za-z]{2,}-)$')

def convert(src):
    lines = src.split('\n')
    # mark which lines sit inside a code-ish run
    incode, i = [False] * len(lines), 0
    while i < len(lines):
        if not lines[i].strip():
            i += 1; continue
        j = i
        while j < len(lines) and lines[j].strip():
            j += 1
        body = [l for l in lines[i:j] if l.strip()]
        if body and sum(1 for l in body if CODEY.search(l)) / len(body) >= 0.30:
            for k in range(i, j):
                incode[k] = True
        i = j

    out, n, i = [], 0, 0
    while i < len(lines):
        cur = lines[i]
        if (i + 1 < len(lines) and not incode[i] and not incode[i + 1]
                and SPLIT.search(cur.rstrip())
                and re.match(r'^[ \t]*[a-z]', lines[i + 1])):
            out.append(cur.rstrip() + lines[i + 1].lstrip())
            n += 1; i += 2; continue
        out.append(cur); i += 1
    return '\n'.join(out), n

if __name__ == '__main__':
    src = io.open(sys.argv[1], encoding='utf-8').read()
    res, n = convert(src)
    io.open(sys.argv[2], 'w', encoding='utf-8').write(res)
    print('rejoined %d hyphen-split word(s)' % n)
