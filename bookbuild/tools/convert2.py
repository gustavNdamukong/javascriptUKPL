#!/usr/bin/env python3
"""Convert a Blueprint chapter to markdown headings.

Heading LEVEL comes from the chapter's own contents list at the top of the
file, which already encodes the hierarchy. Body headings not listed there
(HTML code, JavaScript code, and so on) go a level deeper so they are still
styled, but stay out of the navigation.
"""
import io, re, sys

UNDERLINE = re.compile(r'^[ \t]*[—–\-=_~]{3,}[ \t]*$')
BANNER    = re.compile(r'^[ \t]*//[—–\-]{3,}//[ \t]*$')
TOCLINE   = re.compile(r'^(?P<ind>[ \t]*)-(?P<text>\S.*?)\s*$')

def norm(s):
    return re.sub(r'[^a-z0-9()]+', '', s.lower())

def read_toc(lines, stop):
    """{normalised heading: depth} from the contents list above `stop`."""
    toc = {}
    for l in lines[:stop]:
        m = TOCLINE.match(l)
        if not m: continue
        ind = m.group('ind')
        depth = ind.count('\t') if '\t' in ind else len(ind)//4
        toc.setdefault(norm(m.group('text')), depth)
    # the whole list may sit indented one level; rebase so the top topic is H2
    if toc:
        base = min(toc.values())
        toc = {k: v - base for k, v in toc.items()}
    return toc

def convert(src):
    lines = src.split('\n')
    # the contents list sits between the banner and the first real heading
    first_heading = next((i for i in range(len(lines)-1)
                          if lines[i].strip() and UNDERLINE.match(lines[i+1])
                          and not UNDERLINE.match(lines[i])), len(lines))
    toc = read_toc(lines, first_heading)

    out, review, unlisted, i = [], [], [], 0
    while i < len(lines):
        line = lines[i]
        if BANNER.match(line) and i+2 < len(lines) and BANNER.match(lines[i+2]):
            t = lines[i+1].strip()
            m = re.match(r'CHAPTER\s+(\d+)\s*[-–—]\s*(.+)', t, re.I)
            out.append('# Chapter %s — %s' % (m.group(1), m.group(2).strip()) if m else '# ' + t)
            i += 3; continue

        if (i+1 < len(lines) and line.strip() and UNDERLINE.match(lines[i+1])
                and not UNDERLINE.match(line)):
            text = line.strip()
            if len(text) > 70 or text.endswith(('.', ',', ':')) or text.startswith(('*','//')):
                review.append((i+1, text[:58])); out.append(line); i += 1; continue
            depth = toc.get(norm(text))
            if re.match(r'^[ \t]*=+[ \t]*$', lines[i+1]):
                lvl = 1                          # author's own setext H1 (quiz titles)
            elif depth is None:
                # no contents list at all (the quiz files) -> unlisted means top level,
                # not a stray sub-heading as it does inside a chapter
                lvl = 2 if not toc else 4
                unlisted.append(text)
            else:
                lvl = min(2 + depth, 6)
            out.append('#'*lvl + ' ' + text)
            i += 2; continue

        out.append(line); i += 1
    return '\n'.join(out), review, unlisted

if __name__ == '__main__':
    src = io.open(sys.argv[1], encoding='utf-8').read()
    res, review, unlisted = convert(src)
    io.open(sys.argv[2],'w',encoding='utf-8').write(res)
    print('wrote %s' % sys.argv[2])
    if unlisted:
        from collections import Counter
        print('\n%d heading(s) not in the contents list -> set to H4 (styled, not navigable):' % len(unlisted))
        for t,n in Counter(unlisted).most_common(8): print('   %-38s x%d' % (t[:38], n))
    if review:
        print('\n%d line(s) left alone for you to check:' % len(review))
        for n,t in review: print('   %5d  %s' % (n,t))
