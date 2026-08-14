#!/usr/bin/env python3
"""Scan chapter .md files for the recurring code defects in The JavaScript Blueprint.
Usage:  python3 checkStrings.py <glob>     e.g. 'Chapter8-*/*.md'  or  'Chapter*/*.md'
Catches: string literals split across lines, curly quotes in code, non-breaking
spaces, en/em dashes in code, emoji, and capitalised globals (Console.log)."""
import io, re, glob, os, sys
NB, EN, EM = chr(0xA0), chr(0x2013), chr(0x2014)
CODEY = re.compile(r'(console\.|document\.|\.textContent|\.innerHTML|alert\(|prompt\(|\breturn\s+["\'\u2018\u201c]|=\s*["\'\u2018\u201c]|\.push\(|\.log\()')
ANY    = re.compile(r'(console\.|function\s|=>|\breturn\b|document\.|alert\(|\.log\(|=\s*[\[\{\'"])')
pat = sys.argv[1] if len(sys.argv) > 1 else 'Chapter*/*.md'
total = 0
for path in sorted(glob.glob(pat)):
    for i, l in enumerate(io.open(path, encoding='utf-8').read().split('\n'), 1):
        hits = []
        indented, codey = l.startswith((' ', '\t')), ANY.search(l)
        if indented and CODEY.search(l):
            body = re.sub(r'(?<!:)//.*', '', l)   # do not treat the // in https:// as a comment
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
        if indented and codey and re.search(r'[=;{}]', l) and (EN in l or EM in l):
            hits.append('en/em dash in code')
        if NB in l: hits.append('non-breaking space')
        if re.search('[\U0001F300-\U0001FAFF☀-➿️]', l): hits.append('emoji')
        if re.search(r'\b(Console|Document|Alert|Math\.MAX)\.', l): hits.append('capitalised global')
        if hits:
            total += 1
            print('%-46s %5d  %-22s %s' % (path, i, '/'.join(hits), l.strip()[:62]))
print('--- %d flagged ---' % total)
