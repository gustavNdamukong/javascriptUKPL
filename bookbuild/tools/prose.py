#!/usr/bin/env python3
"""Decide whether a run of lines is prose or code, by looking for prose.

An earlier version only looked for code signals, so any sentence mentioning
document.getElementById() or a <p> tag counted as code, and a good deal of
the book's explanatory text ended up set in monospace.

The trap in a programming book is that code words appear constantly in the
prose - "the class name", "a function which should exist", "return the
value". So the code patterns here are structural (a declaration, an
assignment, a statement ending in a semicolon) rather than bare keywords.
"""
import re

FUNC = {'the','of','to','is','a','and','you','it','that','this','which','when',
        'for','with','as','are','be','will','can','not','but','so','in','on',
        'from','they','its','an','we','or','if','by','at','all','your','their',
        'have','has','was','were','do','does','what','how','there','then','than',
        'because','would','should','could','about','into','only','also','just',
        'them','these','those','some','any','each','every','my','me','here',
        'like','other','same','more','most','such','who','whose','why','one'}

HARD_CODE = re.compile(
    r'^\s*(?://|#|/\*|\*/)'                        # a comment line
    r'|^\s*[\}\)\]];?\s*$'                         # only closes a block
    r'|^\s*</?[a-zA-Z][\w:.-]*[^>]*>\s*$'          # only a tag (incl. ns:name)
    r'|;\s*(?://.*)?$'                             # ends in a semicolon
    r'|^\s*(?:const|let|var)\s+[\w$]+'             # a declaration
    r'|^\s*(?:return|import|export|def|elif|else)\b'
    r'|\bfunction\s*[\w$]*\s*\('                   # function declaration
    r'|\bclass\s+[A-Z][\w$]*'                      # class declaration, not "the class name"
    r'|\bnew\s+[A-Z][\w$]*\s*\('                   # constructor call
    r'|=>|===|!==|\+='
    r'|^\s*[\w.$\[\]]+\s*=\s*[^=]'                 # an assignment
    r'|^\s*[\w.$]+\([^)]*\)\s*;?\s*$'              # a bare call
    r'|^\s*[.#][\w-]+\s*\{'                        # a CSS rule
    r'|^\s*[\w-]+\s*:\s*[^\s].*;\s*$'              # a CSS declaration
)

def is_prose_line(l):
    w = [x.lower() for x in re.findall(r"[A-Za-z']+", l)]
    if len(w) < 6 or HARD_CODE.search(l):
        return False
    return sum(1 for x in w if x in FUNC) >= 3

def is_code_line(l):
    return bool(HARD_CODE.search(l))

def classify(run):
    """-> 'prose' or 'code'. Ties go to code: leaving a listing alone is
    always safer than reflowing it."""
    body = [l for l in run if l.strip()]
    if not body:
        return 'code'
    prose = sum(1 for l in body if is_prose_line(l))
    code = sum(1 for l in body if is_code_line(l))
    if code == 0 and prose:
        return 'prose'
    return 'prose' if prose > code else 'code'
