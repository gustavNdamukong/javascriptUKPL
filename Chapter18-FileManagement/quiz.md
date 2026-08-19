# QUIZ — File Management

This page contains the Q & A (questions and answers) for this chapter — Chapter 18: File
Management. Work through these after reading the chapter, while the material is fresh — recall
practice is what cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 10 to 14 are proper exercises where you write and run real code. The
answers are all together in the Answers section further down, numbered to match the questions.


## QUESTIONS

1) JavaScript in the browser cannot open any file it likes from your hard drive. What are the
   only two ways a file can get in, and why is it restricted like this?

   Clue: in both cases the visitor has to do something deliberate.


2) Name the three FileReader methods you would actually use, and say what each gives you back.

   Clue: their names all start the same way, and the ending tells you the format.


3) Why must the code that uses a file's contents live inside `reader.onload` rather than on the
   line after `reader.readAsText(file)`?

   Clue: reading a file is not instant.


4) You have read a text file and changed it. Why can you not simply save it back over the
   original, and what do you do instead?

   Clue: the answer to the first half is the same reason as question 1.


5) Getting a file from an `<input type="file">` and getting one from a drag-and-drop are almost
   the same, but not quite. What is the one difference?

   Clue: both end in `.files[0]`. It is what comes before that differs.


6) What is a "magic number" in a file, and what problem does checking one solve?

   Clue: renaming `virus.exe` to `holiday.jpg` takes about two seconds.


7) The chapter gives four ways to read XML. Match each to the situation it suits best:

    FileReader + DOMParser
    fetch() + DOMParser
    XMLHttpRequest
    XPath with document.evaluate()

   Clue: one is for local files, one is the modern remote way, one is the old remote way, and
   one is not about fetching at all.


8) `XMLHttpRequest` has both a `responseText` and a `responseXML` property. When would you use
   each, and which one saves you a step?

   Clue: one of them has already done some work for you.


9) Why send a large file over a WebSocket in chunks rather than all at once? Give two reasons.

   Clue: think about what happens when the connection drops at 95%.


10) EXERCISE. Write the code to let a user pick a `.txt` file and show its contents in a
  `<pre id="output">`, rejecting anything that is not a plain text file.

  Clue: one event, one FileReader method, and one check on `file.type`.


11) EXERCISE. Take the array below, turn it into CSV text, and print it.

[['Name','Age'], ['Alice','25'], ['Bob','30']]

  Clue: two joins, with different separators.


12) EXERCISE. Given CSV text, split it into rows and cells and print the second row's cells as
  an array.

  Clue: the reverse of question 11, and `trim()` first saves you an empty last row.


13) EXERCISE. Given this XML in a string, print every book's title and author.

        <library>
          <book><title>Book One</title><author>Ann</author></book>
          <book><title>Book Two</title><author>Ben</author></book>
        </library>

  Clue: parse it first, then treat it exactly like HTML.


14) EXERCISE. Take some text, wrap it in a Blob, and build a link that downloads it as
  `notes.txt`.

  Clue: three steps — Blob, URL, anchor — and one thing to remember to clean up.


## ANSWERS

1) The two ways in are:

   - the visitor **selects a file** with an `<input type="file">` element
   - the visitor **drags and drops** a file onto the page

   In both cases the *visitor* chose the file. That is the whole point. If a web page could read
   any file on your machine just by running JavaScript, every site you visited could quietly
   help itself to your documents, your photos and your saved passwords. So the browser only ever
   hands over files a person has deliberately offered.

   And even then, access is **read-only**. JavaScript cannot modify or delete the file on disk.


2)
| readAsText(file) | gives you the file as plain text |
|---|---|
| readAsDataURL(file) | gives you a Base64-encoded string |
| readAsArrayBuffer(file) | gives you the raw binary data |

   `readAsText()` is for text, CSV, XML and JSON. `readAsDataURL()` is what you use for images,
   because the result can go straight into an `<img src="...">`. `readAsArrayBuffer()` is for
   when you need the actual bytes — checking a file signature, or sending binary over a
   WebSocket.

   There is a fourth, `readAsBinaryString()`, but it is deprecated. Use `readAsArrayBuffer()`
   instead.


3) Because reading a file is **asynchronous**. `readAsText()` does not return the contents — it
   only *starts* the reading. The line after it runs immediately, long before the file has
   finished being read, so at that moment there is nothing to use.

        const reader = new FileReader();

        reader.onload = function (e) {
            // this runs LATER, when the read has finished
            console.log(e.target.result);
        };

        // this just starts it off
        reader.readAsText(file);

   `onload` is the callback that fires when the read completes, and `e.target.result` is where
   the contents arrive. Put your code anywhere else and you will be working with `undefined`.


4) You cannot save over the original because JavaScript's access to the file is **read-only**,
   for the security reason in question 1. Overwriting a file in place would mean writing to your
   visitor's disk, which the browser will not allow.

   What you do instead is **offer the changed version as a download**:

        const blob = new Blob([modifiedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'modified-file.txt';
        a.click();

   The original file is untouched; the visitor gets a new one. There is a newer File System
   Access API that *can* write in place, but it needs permission every time and only works in
   the Chromium browsers, so it is not something to rely on.


5) The difference is **where you find the file**:

        // from a file input
        const file = e.target.files[0];

        // from a drag and drop
        const file = e.dataTransfer.files[0];

   A dropped file arrives on the event's `dataTransfer` property rather than on an input
   element. Everything after that — the FileReader, the `onload`, `readAsText()` — is identical.

   One other thing drag and drop needs: `e.preventDefault()` in the `dragover` and `drop`
   handlers. Without it the browser does its own default thing, which is usually to navigate
   away and open the file itself.


6) A **magic number** (or file signature) is the first few bytes of a file, which identify what
   the file really is. A PNG always begins `89 50 4E 47`; a JPEG always begins `FF D8`.

   The problem it solves is that **a file extension is just part of the name**, and anyone can
   change it. Renaming `virus.exe` to `holiday.jpg` takes seconds and fools any check that only
   looks at the extension — or even at the MIME type, which the browser largely infers from that
   same extension.

   Reading the actual bytes tells you the truth:

        const bytes = new Uint8Array(arrayBuffer);
        const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 &&
                      bytes[2] === 0x4E && bytes[3] === 0x47;

   You need `readAsArrayBuffer()` for this, because you are looking at raw bytes rather than
   text.


7) 
- **FileReader + DOMParser** — for a **local** XML file the visitor selected.
- **fetch() + DOMParser** — the **modern** way to read a **remote** XML file.
- **XMLHttpRequest** — the **older** way to read a remote one. Still works everywhere, and
  you will meet it in legacy code.
- **XPath with document.evaluate()** — not a way of *fetching* XML at all. It is a way of
  - querying* XML you already have, and it works with whichever of the other three brought
  you the document.

   The first three answer "how do I get the XML?"; the fourth answers "how do I find the bit I
   want inside it?".


8) 
- **`responseText`** gives you the response as a plain string. You then have to parse it
  yourself with `DOMParser` before you can use DOM methods on it.
- **`responseXML`** gives you an **already-parsed XML document**. No `DOMParser` needed.

   So `responseXML` saves you a step — that is the one to reach for when you know the response
   is XML. Use `responseText` when the response is something else, or when you want the raw
   string for another purpose.

   For `responseXML` to be populated, the server must send the response with an XML content
   type, or you must ask for one:

        xhr.responseType = 'document';


9) Any two of these:

- **Recovery.** If the connection drops, you retry only the failed chunk. Sending the whole
  file in one go means starting again from zero — painful at 95% of a large video.
- **Pause and resume.** Because you track your position with an offset, you can stop and
  pick up where you left off.
- **Real-time processing.** The server can begin working on the first chunks while the rest
  are still arriving, rather than waiting for the entire file.
- **Less overhead.** A WebSocket opens one persistent connection, instead of the repeated
  headers and connection setup of separate HTTP requests.

   The mechanism is `file.slice(offset, offset + chunkSize)`, reading each slice with
   `readAsArrayBuffer()` and moving the offset along until you reach `file.size`.


10) 
        const fileInput = document.getElementById('fileInput');
        const output = document.getElementById('output');

        fileInput.addEventListener('change', function () {
            const file = this.files[0];

            if (file && file.type === 'text/plain') {
                const reader = new FileReader();

                reader.onload = function (e) {
                    output.textContent = e.target.result;
                };

                reader.readAsText(file);
            } else {
                output.textContent = 'Please upload a plain text (.txt) file.';
            }
        });

  The `file &&` part of the check matters: if the visitor opens the file picker and then
  cancels, `files[0]` is `undefined`, and asking `undefined.type` would throw.


11) 
        const data = [['Name','Age'], ['Alice','25'], ['Bob','30']];

        const csv = data.map(row => row.join(',')).join('\n');

        console.log(csv);

  Output:

Name,Age
Alice,25
Bob,30

  Two joins doing two different jobs: the inner one puts commas **between the cells of a row**,
  and the outer one puts newlines **between the rows**.


12) 
        const csv = `Name,Age
        Alice,25
        Bob,30`;

        const rows = csv.trim().split('\n');
        const cells = rows[1].split(',');

        console.log(cells);   // ['Alice', '25']

  `trim()` first, because a CSV file usually ends with a newline. Without it, `split('\n')`
  hands you an empty string as a final row, and you end up building a blank table row from
  nothing.


13) 
        const xmlString = `<library>
          <book><title>Book One</title><author>Ann</author></book>
          <book><title>Book Two</title><author>Ben</author></book>
        </library>`;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        const books = xmlDoc.getElementsByTagName("book");

        for (let book of books) {
            const title = book.querySelector("title").textContent;
            const author = book.querySelector("author").textContent;
            console.log(`Title: ${title}, Author: ${author}`);
        }

  Output:

Title: Book One, Author: Ann
Title: Book Two, Author: Ben

  The point worth taking away is that once `DOMParser` has done its work, the XML behaves
  **exactly like HTML** — `getElementsByTagName()`, `querySelector()` and `.textContent` all
  work just as they did in Chapter 15.


14) 
        const text = "These are my notes.";

        // 1. wrap the text in a Blob
        const blob = new Blob([text], { type: 'text/plain' });

        // 2. make a temporary URL that points at it
        const url = URL.createObjectURL(blob);

        // 3. build a link and click it
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.txt';
        a.click();

        // 4. and clean up - but give the
        // download a moment to start first
        setTimeout(() => URL.revokeObjectURL(url), 1000);

  That last step is the one people forget. A blob URL holds the data in memory until you
  revoke it, so leaving them lying about is a memory leak.

  Note the small delay. Revoking on the very next line after `a.click()` can cancel the
  download before the browser has begun fetching the blob.
