#!/usr/bin/env python3
"""Turn a run of separator-aligned lines into a real markdown table.

Usage: table.py <file> <first-line> <last-line> [--code-col1] [--dry]

The book's tables came out of a notes app as tab- or space-aligned rows,
which markdown collapses into one run-on paragraph. This rebuilds them.
"""
import io, re, sys

def split_row(l):
    return [c.strip() for c in re.split(r'\t+|\s{3,}', l.strip()) if c.strip()]

def convert(path, lo, hi, code_col1=False, dry=False):
    lines = io.open(path, encoding='utf-8').read().split('\n')
    rows = [split_row(l) for l in lines[lo-1:hi] if l.strip()]
    widths = {len(r) for r in rows}
    if widths != {2}:
        print('  refusing: rows do not all have 2 columns -> %s' % sorted(widths))
        for r in rows:
            if len(r) != 2: print('     %d cols: %s' % (len(r), r))
        return None

    head, body = rows[0], rows[1:]
    def cell(v, first):
        v = v.replace('|', '\\|')
        # a bare identifier in column one is code, so mark it as such
        if first and code_col1 and re.fullmatch(r'[A-Za-z_$][\w$.]*', v):
            return '`%s`' % v
        return v
    out = ['| %s | %s |' % (head[0], head[1]), '|---|---|']
    out += ['| %s | %s |' % (cell(r[0], True), cell(r[1], False)) for r in body]

    if dry:
        print('\n'.join(out[:6])); print('   ... %d rows total' % len(body)); return None
    new = lines[:lo-1] + out + lines[hi:]
    io.open(path, 'w', encoding='utf-8').write('\n'.join(new))
    print('  %s lines %d-%d -> markdown table, %d rows' % (path.split('/')[0], lo, hi, len(body)))

if __name__ == '__main__':
    a = sys.argv
    convert(a[1], int(a[2]), int(a[3]), '--code-col1' in a, '--dry' in a)
