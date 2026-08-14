#!/usr/bin/env python3
"""Extract code blocks with brace tracking, syntax-check, and triage."""
import io, re, os, glob, subprocess

ROOT = '/Users/user/UKPL/javascriptUKPL'
OUT  = '/private/tmp/claude-501/-Users-user/5cb49476-179c-47d7-9348-055b74d5737b/scratchpad/blocks2'
os.makedirs(OUT, exist_ok=True)
for f in glob.glob(os.path.join(OUT, '*')): os.remove(f)

JS_TOKEN = re.compile(r'''(
    \b(function|return|const|let|var|if|else|for|while|do|switch|case|break|continue|typeof|new|throw)\b
  | =>
  | console\.\w+ | document\.\w+ | alert\(|prompt\(|Object\.\w+|Array\.\w+|Math\.\w+
  | \.\w+\(
  | ^\s*//
  | ^\s*/\*
  | ^\s*[\}\)\]]+[;,]?\s*$
  | \w+\s*=\s*
)''', re.X)
PROSE = re.compile(r'\b(the|this|that|which|will|would|you|we|is|are|and|but|note|here|so|because|when)\b', re.I)

def looks_code(line):
    s = line.strip()
    if not s or not line.startswith((' ', '\t')): return False
    if s.startswith('//') or s.startswith('/*') or s.startswith('*'): return True
    if not JS_TOKEN.search(s): return False
    words = s.split()
    if len(words) > 9 and len(PROSE.findall(s)) >= 3: return False
    return True

def depth(t):
    t = re.sub(r'//.*', '', t)
    t = re.sub(r'"[^"]*"|\'[^\']*\'|`[^`]*`', '', t)
    return t.count('{') - t.count('}') + t.count('(') - t.count(')') + t.count('[') - t.count(']')

blocks = []
for path in sorted(glob.glob(os.path.join(ROOT, 'Chapter[1-7]-*/*.md'))):
    if int(re.search(r'Chapter(\d+)', path).group(1)) > 7: continue
    lines = io.open(path, encoding='utf-8').read().split('\n')
    cur, start, gap, d = [], None, 0, 0
    def flush():
        global cur, start, d
        while cur and not cur[-1].strip(): cur.pop()
        if len(cur) >= 1 and any(looks_code(x) for x in cur):
            blocks.append({'file': os.path.relpath(path, ROOT), 'line': start,
                           'code': list(cur), 'balanced': d == 0})
        cur, start, d = [], None, 0
    for i, l in enumerate(lines, 1):
        if looks_code(l) or (cur and d > 0 and l.strip()):
            if start is None: start = i
            cur.append(l); d += depth(l); gap = 0
        elif cur and not l.strip() and gap < 2 and d > 0:
            cur.append(l); gap += 1
        elif cur and not l.strip() and gap < 1:
            cur.append(l); gap += 1
        else:
            if cur: flush()
            gap = 0
    if cur: flush()

def classify(b):
    t = '\n'.join(b['code'])
    if re.search(r'<\s*/?\s*(html|head|body|div|script|p|ul|li|img|noscript|button|pre|em|b)\b', t, re.I): return 'html'
    if re.search(r'\b(initialisation|value1|value2|runIfTrue|iterable|arrayName|propertyName|condition\)|\.\.\.\s*\})', t): return 'pseudo'
    if '...' in t and not re.search(r'\.\.\.\w', t): return 'pseudo'
    if not b['balanced']: return 'truncated'
    if not re.search(r'(=|\breturn\b|console\.|function|=>|;)', t): return 'output'
    return 'js'

results = []
for n, b in enumerate(blocks):
    k = classify(b)
    b['kind'] = k
    if k != 'js':
        results.append((b, None)); continue
    strip = min((len(l) - len(l.lstrip()) for l in b['code'] if l.strip()), default=0)
    src = '\n'.join(l[strip:] if len(l) >= strip else l for l in b['code'])
    p = os.path.join(OUT, 'b%04d.js' % n)
    io.open(p, 'w', encoding='utf-8').write(src)
    r = subprocess.run(['node', '--check', p], capture_output=True, text=True)
    results.append((b, None if r.returncode == 0 else r.stderr.strip()))

kinds = {}
for b, e in results: kinds[b['kind']] = kinds.get(b['kind'], 0) + 1
print('blocks:', len(results), kinds)
fails = [(b, e) for b, e in results if e]
print('JS blocks failing node --check:', len(fails))
print('=' * 78)
for b, e in fails:
    m = re.search(r'(SyntaxError.*)', e)
    print('%s : line %d' % (b['file'], b['line']))
    print('   >>', (m.group(1) if m else e.split(chr(10))[-1])[:110])
    for l in b['code'][:9]: print('     |', l.rstrip()[:92])
    print()
