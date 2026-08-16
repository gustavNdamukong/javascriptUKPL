# Build

The markdown in this repo is the book. Everything about how it *looks* lives
here, not in the chapters, so the two can be changed independently.

    book.css      typography - 6x9 trim, 12.5pt Georgia body, 10.5pt code
    render.mjs    markdown -> XHTML, plus code re-indentation
    tools/        one-off passes already applied to the source

## Producing a PDF

    node one.mjs <chapter.md> out.html
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        --headless --disable-gpu --no-pdf-header-footer \
        --virtual-time-budget=20000 --print-to-pdf=out.pdf file://out.html

Chrome lingers after writing the file; wait for the PDF rather than for the
process. pandoc will not build on this machine (Command Line Tools too old),
which is why Chrome does the typesetting.

## tools/

These were applied once each to the chapters and are kept for reference and
for re-running if the source is ever re-imported from the notes app.

    convert2.py   em-dash underlines -> # headings, levels from the chapter's
                  own contents list
    fixlists.py   "-Item" -> "- Item", indentation remapped, prose dedented
    dehyphen.py   rejoins words split across a line break
    undent.py     prose never sits at 4+ columns, where markdown would read
                  it as code. Skips runs containing list markers - rebasing
                  those flattens sub-lists into their parent.
    table.py      separator-aligned rows -> markdown table. Refuses rather
                  than guesses when rows disagree on column count.
