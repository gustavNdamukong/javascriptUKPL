#!/usr/bin/env python3
"""Fourth pass: prose must never sit at 4+ columns.

The list pass remapped nesting to 2 spaces per level, so anything that was
two levels deep landed on exactly 4 spaces - markdown's code-block
threshold - and stayed a code block. Prose is capped at 2 columns here.
"""
import io, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prose import classify

CODEY = re.compile(
    r'[{};=<>]|=>'
    r'|\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b'
    r'|console\.|document\.'
    r'|^\s*[\}\)\]]'          # a line that only closes a block
    r'|^\s*//'                  # C-style comment
    r'|^\s*#'                   # Python / shell comment - these read as prose
    r'|^\s*<'                   # markup
    r'|^\s*[A-Za-z_$][\w$]*\s*='  # assignment
    r'|\.\w+\('                 # method call
    r'|\b(?:print|def|elif|import|from)\b'   # other languages appear in this book
)
HEADING = re.compile(r'^#{1,6} ')

def eff(l):
    c = 0
    for ch in l:
        if ch == ' ': c += 1
        elif ch == '\t': c += 4 - (c % 4)
        else: break
    return c

def run_is_code(run):
    return classify(run) == 'code'

def convert(src):
    lines = src.split('\n')
    out, i, n = [], 0, 0
    while i < len(lines):
        if HEADING.match(lines[i]) or not lines[i].strip():
            out.append(lines[i]); i += 1; continue
        j = i
        while j < len(lines) and lines[j].strip() and not HEADING.match(lines[j]):
            j += 1
        run = lines[i:j]
        # A run holding list markers carries nesting that this pass cannot
        # see - sub-lists sit in their own blank-line-delimited run, so
        # rebasing them to their own minimum flattens them into the parent.
        is_list = any(re.match(r'^[ \t]*([-*+]|\d+\.)\s', l) for l in run)
        if run_is_code(run) or is_list or max(eff(l) for l in run if l.strip()) < 4:
            out.extend(run)
        else:
            base = min(eff(l) for l in run if l.strip())
            for l in run:
                if not l.strip(): out.append(l); continue
                # keep relative nesting, but never reach 4 columns
                rel = min((eff(l) - base) // 2, 1)
                out.append('  ' * rel + l.strip()); n += 1
        i = j
    return '\n'.join(out), n

if __name__ == '__main__':
    s = io.open(sys.argv[1], encoding='utf-8').read()
    r, n = convert(s)
    io.open(sys.argv[2], 'w', encoding='utf-8').write(r)
    print('%-46s %d line(s) brought below the code threshold' % (sys.argv[1].split('/')[0], n))
