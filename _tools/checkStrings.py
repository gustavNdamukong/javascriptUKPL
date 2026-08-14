#!/usr/bin/env python3
"""Scan chapter .md files for the recurring code defects in The JavaScript Blueprint.
Usage:  python3 checkStrings.py <glob>     e.g. 'Chapter8-*/*.md'  or  'Chapter*/*.md'
Catches: string literals split across lines, curly quotes in code, non-breaking
spaces, en/em dashes in code, emoji, and capitalised globals (Console.log)."""
import io, re, glob, os, sys
NB, EN, EM = chr(0xA0), chr(0x2013), chr(0x2014)
CODEY = re.compile(r'(console\.|document\.|\.textContent|\.innerHTML|alert\(|prompt\(|\breturn\s+["\'\u2018\u201c]|=\s*["\'\u2018\u201c]|\.push\(|\.log\(|\bnew\s+\w+\(\s*["\'\u2018\u201c]|\w\(\s*[\u2018\u201c])')
ANY    = re.compile(r'(console\.|function\s|=>|\breturn\b|document\.|alert\(|\.log\(|=\s*[\[\{\'"]|\bnew\s+\w+\(\s*["\'\u2018\u201c]|\w\(\s*[\u2018\u201c])')

def strip_comment(s):
    """Return s with any // line comment removed - but only when the // sits
    outside a string. XPath expressions ("//p", "//book/title") and URLs live
    inside quotes and are not comments."""
    out, quote, i = [], None, 0
    while i < len(s):
        c = s[i]
        if quote is None:
            if c in '"\'`\u2018\u2019\u201c\u201d':
                quote = c
            elif c == '/' and i + 1 < len(s) and s[i+1] == '/':
                break
        else:
            if c == '\\':
                out.append(c)
                i += 1
                if i < len(s): out.append(s[i])
                i += 1
                continue
            # treat any of the curly/straight partners as a closer
            if c == quote or (quote in '\u2018\u201c' and c in '\u2019\u201d'):
                quote = None
        out.append(c)
        i += 1
    return ''.join(out)

pat = sys.argv[1] if len(sys.argv) > 1 else 'Chapter*/*.md'
total = 0
for path in sorted(glob.glob(pat)):
    for i, l in enumerate(io.open(path, encoding='utf-8').read().split('\n'), 1):
        hits = []
        indented, codey = l.startswith((' ', '\t')), ANY.search(l)
        if indented and CODEY.search(l):
            body = strip_comment(l)
            # strip escaped backslashes FIRST, then escaped quotes, so that
            # "a backslash: \\" is not misread as an escaped closing quote
            body = body.replace('\\\\', '')
            body = re.sub(r'\\.', '', body)
            if body.count('"') % 2 == 1: hits.append('SPLIT STRING (")')
            if body.count("'") % 2 == 1 and not re.search(r"\w'\w", body): hits.append("SPLIT STRING (')")
            # a curly quote opening a string is always wrong in code, and often
            # means the closing one is missing entirely
            if re.search(r'=\s*[\u2018\u201c]', body): hits.append('CURLY-OPENED STRING')
        # strip contractions (It's, you'll) - those are prose apostrophes,
        # not broken code quotes - and only flag what is left
        decontracted = re.sub(r'(?<=\w)\u2019(?=\w)', '', l)
        if indented and codey and re.search(r'[\u201c\u201d\u2018\u2019]', decontracted):
            hits.append('curly quote in code')
        # ';' alone is not enough - this author writes "For example;" in
        # prose, so require an assignment or a brace to call a line code
        if indented and codey and re.search(r'[={}]', l) and (EN in l or EM in l):
            hits.append('en/em dash in code')
        if NB in l: hits.append('non-breaking space')
        if re.search('[\U0001F300-\U0001FAFF☀-➿️]', l): hits.append('emoji')
        # require a method after the dot - "a real XML Document." ending a
        # sentence is prose, not a mis-capitalised global
        if re.search(r'\b(Console|Document|Alert|Math\.MAX)\.[a-z]', l): hits.append('capitalised global')
        if hits:
            total += 1
            print('%-46s %5d  %-22s %s' % (path, i, '/'.join(hits), l.strip()[:62]))
print('--- %d flagged ---' % total)
