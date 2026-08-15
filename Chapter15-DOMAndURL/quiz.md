# QUIZ — Chapter 15: DOM and URL Manipulation

This page contains the Q & A (questions and answers) for this chapter — Chapter 15: DOM and URL
Manipulation. Work through these after reading the chapter, while the material is fresh — recall
practice is what cements new knowledge into long-term memory.

This is the longest chapter in the book, so it has the longest quiz. Try every question before
you look below. Each one carries a clue, so nothing here should leave you stuck. Questions 12 to
16 are proper exercises where you write and run real code. The answers are all together in the
Answers section further down, numbered to match the questions.


## QUESTIONS

1) What is the difference between a node and an element? Given this markup, how many nodes does
   `parent.childNodes` return, and how many does `parent.children` return?

        <div id="parent">
            Text Node
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
        </div>

   Clue: count the line breaks, not just the tags. One answer is larger than most people expect.


2) Name the three document methods that return more than one element, and say which type each
   one hands back.

   Clue: two return the same type as each other. The odd one out is the newest of the three.


3) What is the difference between a "live" HTMLCollection and a "static" NodeList?

   Clue: one of them notices when the page changes underneath it.


4) True or false: you can use a `for...of` loop on an HTMLCollection. And what is the one array
   method a NodeList has that an HTMLCollection does not?

   Clue: this catches people out because the two answers point in opposite directions.


5) Neither an HTMLCollection nor a NodeList is a real array. Give the two ways of turning one
   into a real array.

   Clue: one is a method on the Array object. The other is three dots.


6) What is the difference between `textContent` and `innerHTML`, and why is one of them a
   security risk?

   Clue: the risk has a three-letter name and involves an image that fails to load.


7) `innerText` and `textContent` both give you the text inside an element. What makes them
   different?

   Clue: one of them cares what the CSS is doing.


8) You are inside a click handler and need to find the nearest ancestor with the class
   `.editFormDiv`. Which method, and what exactly do you pass it?

   Clue: it is a CSS selector, so it needs its punctuation.


9) What is wrong with each of these two lines?

        element.setAttribute("disabled");
        Object.assign(li, { className: ['list-item', 'draggable'] });

   Clue: one throws immediately. The other silently gives you one class where you wanted two.


10) `document.evaluate()` takes five arguments. What is the fourth one for, and why does it
    change how you read your results?

  Clue: asking for a number and asking for a list of nodes cannot possibly be read back the
  same way.


11) What is the difference between the `window` object and the `document` object? Give one thing
  that belongs to each.

  Clue: one is the browser, one is the page. And one of them owns the other.


12) EXERCISE. Given three paragraphs with the class `note`, select them all and print the text
  of each — using a real array method, not a plain loop.

  Clue: you will need question 5 to get there.


13) EXERCISE. Create a `<div>`, give it the classes `card` and `wide` in one go, put a
    `<p>Hello</p>` inside it, and add it to the page.

  Clue: remember what question 9 taught you about multiple classes.


14) EXERCISE. Using XPath, count the `<li>` elements on a page and print the number. Then use
    XPath again to get the text of the first `<li>`.

  Clue: two different XPathResult types, and two different properties to read the answer from.


15) EXERCISE. Take the URL `https://shop.example.com:8080/cart?item=42#summary` and print its
    protocol, hostname, port, pathname, the value of the `item` query parameter, and its hash.

  Clue: one built-in constructor gives you all six.


16) EXERCISE. Take the current page's URL, add a query parameter `sort=asc` to it, and print the
    resulting full URL — without reloading the page.

  Clue: build a URL object from it, set the parameter, then read `.href` back.


## ANSWERS

1) A **node** is any item in the DOM — that includes elements, but also text and comments. An
- *element** is the specific kind of node that represents an actual HTML tag.

- `parent.childNodes` returns **5** nodes.
- `parent.children` returns **2** elements.

   The five are:

        [0] #text     the line break and "Text Node"
        [1] <p>       Paragraph 1
        [2] #text     the line break between the two paragraphs
        [3] <p>       Paragraph 2
        [4] #text     the line break before </div>

   Three of the five are whitespace you never typed on purpose. Every line break and run of
   spaces between your tags becomes a text node of its own, which is exactly why `childNodes`,
   `firstChild`, `lastChild`, `nextSibling` and `previousSibling` so often surprise people.

   When you want elements and only elements, use `children`, `firstElementChild`,
   `lastElementChild`, `nextElementSibling` and `previousElementSibling`.


2) 
        document.getElementsByClassName()   ->  HTMLCollection
        document.getElementsByTagName()     ->  HTMLCollection
        document.querySelectorAll()         ->  NodeList

   The first two return a **live** HTMLCollection. `querySelectorAll()` is the newest of the
   three and returns a **static** NodeList.

   Note that `querySelectorAll()` is not the only source of a NodeList — `childNodes` gives you
   one too, and that one is live.


3) A **live** collection is tracked by the browser and updates itself when the page changes. Add
   a matching element to the DOM after you took the collection, and it appears in the collection
   without you doing anything.

   A **static** NodeList is a snapshot. It shows what matched at the moment you asked, and it
   never changes afterwards, no matter what happens to the page.

   This matters more than it sounds. Looping over a live collection while adding elements that
   match it is a classic way to write an infinite loop.


4) **True** — `for...of` works on an HTMLCollection, and on a NodeList. Both are iterable.

   The array method a NodeList has and an HTMLCollection does not is **`.forEach()`**.

   That is the pairing worth memorising, because the two facts pull in opposite directions:

    for...of    HTMLCollection: yes    NodeList: yes
    .forEach()  HTMLCollection: NO     NodeList: yes

   Neither of them has `.map()`, `.filter()` or any of the rest.


5) 
        // 1. Array.from()
        const items = Array.from(document.getElementsByTagName("p"));

        // 2. the spread operator
        const nodes = [...document.querySelectorAll("p")];

   Both work on either type. Once you have a real array you get the whole Array object —
   `.map()`, `.filter()`, `.reduce()` and everything else.

   Note that it is the square brackets in the second one that create the array; the three dots
   just spread the collection out inside them.


6) `textContent` treats everything you give it as **plain text**. Hand it `"<h1>Hello</h1>"` and
   the page shows those angle brackets literally.

   `innerHTML` treats what you give it as **real HTML**. Hand it `"Hello <b>World</b>"` and you
   get World in bold.

   The security risk is **XSS (Cross-Site Scripting)**, and it belongs to `innerHTML`:

        elem.innerHTML = "<img src='x' onerror='alert(\"Hacked!\")'>";

   The `src='x'` points at an image that does not exist, so loading it fails, so the browser
   fires the `onerror` handler — and runs whatever JavaScript is sitting in it. Now imagine that
   string came from a comment box on your blog, and instead of an alert it reads the visitor's
   session cookie.

   The rule: **when you are inserting anything a user typed, use `textContent`.** If you
   genuinely must use `innerHTML`, sanitise the input first.


7) `textContent` gives you all the text that is in the HTML, whether the visitor can see it or
   not. `innerText` gives you only what is actually rendered on screen.

        <div id="myDiv">Visible <span style="display:none">hidden</span> text</div>

div.textContent   // "Visible hidden text"
div.innerText     // "Visible text"

   Two more differences. `innerText` collapses runs of spaces and line breaks the way the browser
   does when it draws the page, while `textContent` hands the whitespace back exactly as it sits
   in your markup. And because `innerText` has to know what is visible, the browser may need to
   work out the page layout before it can answer, which makes it slower.

   Default to `textContent`. It is faster, and its answer does not change when somebody edits
   the CSS.


8) `closest()`:

        let editFormDiv = e.target.closest(".editFormDiv");

   You pass it a **CSS selector**, written exactly as you would write it in a stylesheet — so
   `".editFormDiv"` with the dot for a class, `"#myId"` with the hash for an id, or a bare tag
   name. Passing `"editFormDiv"` with no dot would look for a `<editFormDiv>` tag and find
   nothing.

   Two things worth knowing about it. It **starts with the element you called it on** — if that
   one matches, that is what you get back — and only then works upwards. And it returns `null`
   if it reaches the top without finding anything, which is why the chapter's example checks
   before using the result.


9) **Line 1 throws immediately.**

        element.setAttribute("disabled");
        // TypeError: 2 arguments required, but only 1 present

   `setAttribute` always needs both. For attributes that do not take a value, like `disabled` or
   `required`, you pass an empty string:

        element.setAttribute("disabled", "");   // <input disabled="">

- *Line 2 fails silently, which is worse.** `className` is a *string*, so handing it an array
   makes JavaScript convert that array to text — and arrays convert by joining with commas:

        className: ['list-item', 'draggable']   ->  "list-item,draggable"

   That is **one** class with a strange name, not two classes. No error, nothing in the console,
   and your CSS simply never applies. What you want is one string with spaces:

        Object.assign(li, { className: 'list-item draggable' });
        // classList -> ['list-item', 'draggable']


10) The fourth argument is the **XPathResult type**. It tells `document.evaluate()` what shape
    of answer you want — a number, a string, a boolean, an iterator of nodes, or a snapshot list
    of nodes.

  It changes how you read the results because each type puts the answer in a different place:

        NUMBER_TYPE                  ->  .numberValue
        STRING_TYPE                  ->  .stringValue
        BOOLEAN_TYPE                 ->  .booleanValue
        ORDERED_NODE_ITERATOR_TYPE   ->  .iterateNext()
        ORDERED_NODE_SNAPSHOT_TYPE   ->  .snapshotItem(i), with .snapshotLength
        FIRST_ORDERED_NODE_TYPE      ->  .singleNodeValue

  There are ten types in all, numbered 0 to 9. `ANY_TYPE` is 0, and it is the one that does not
  commit you up front — you ask for it, then read `.resultType` to find out what you actually
  got.

  Ask for a number and try to read `.snapshotItem(0)` and you will get nothing useful, so the
  type you request and the property you read must always be chosen together.


11) `window` is the **browser window or tab**. `document` is the **page loaded inside it**.

  And `document` is a property of `window`, so `window.document` and `document` are the same
  object.

  - Belonging to `window`: `alert()`, `confirm()`, `prompt()`, `innerWidth`, `location`,
  `history`, `open()`, `scrollTo()`, `getComputedStyle()`, `pageXOffset`.
  - Belonging to `document`: `getElementById()`, `querySelector()`, `querySelectorAll()`,
  `createElement()`, `body`, `evaluate()`.

  A useful way to keep it straight: if it is about the page's *content*, it is on `document`.
  If it is about the *browser* around that content — its size, its address bar, its history —
  it is on `window`.

    One more thing worth remembering: every global variable or function you declare becomes a
    property of `window`.


12) 
        // three ways in, all equivalent
        const notes = [...document.querySelectorAll(".note")];

        notes.forEach(note => console.log(note.textContent));

  Output, for three paragraphs reading "First note", "Second note", "Third note":

First note
Second note
Third note

  `querySelectorAll()` would actually let you call `.forEach()` directly, because NodeLists
  have it. But spreading it into a real array first is the habit worth having, because it works
  whichever of the three selection methods you used, and it gives you `.map()` and `.filter()`
  as well.


13) 
        const div = document.createElement("div");

        // one string, spaces between the class names
        div.className = "card wide";

        const p = document.createElement("p");
        p.textContent = "Hello";

        div.appendChild(p);
        document.body.appendChild(div);

        console.log(div.outerHTML);
        // <div class="card wide"><p>Hello</p></div>

  Two alternatives for the classes, both fine:

        div.classList.add("card", "wide");
        div.setAttribute("class", "card wide");

  Note the order of the last two lines. We build the whole thing first and append it to the
  page once, at the end. Appending an element and then filling it works too, but doing it this
  way means the browser only has to redraw the page a single time.


14) 
        // 1. count the list items - we want a NUMBER back
        const countResult = document.evaluate(
            "count(//li)",
            document,
            null,
            XPathResult.NUMBER_TYPE,
            null
        );
        console.log("Number of items: " + countResult.numberValue);

        // 2. the text of the first one - we want a STRING back
        const textResult = document.evaluate(
            "(//li)[1]/text()",
            document,
            null,
            XPathResult.STRING_TYPE,
            null
        );
        console.log("First item: " + textResult.stringValue);

  For a page with three list items reading "one", "two" and "three":

Number of items: 3
First item: one

  Notice that the two calls differ in exactly two places: the type asked for in the fourth
  argument, and the property read from the result. That is the whole idea of question 10.

  Notice too that XPath counts from **1**, not 0 — `(//li)[1]` is the first one. It is one of
  the few places in this book where you will not be counting from zero.


15) 
        const url = new URL(
            "https://shop.example.com:8080/cart?item=42#summary"
        );

        console.log("Protocol: " + url.protocol);
        console.log("Hostname: " + url.hostname);
        console.log("Port: " + url.port);
        console.log("Path: " + url.pathname);
        console.log("Item: " + url.searchParams.get("item"));
        console.log("Hash: " + url.hash);

  Output:

Protocol: https:
Hostname: shop.example.com
Port: 8080
Path: /cart
Item: 42
Hash: #summary

  Two details that catch people. `protocol` includes the colon — `"https:"`, not `"https"`.
  And `hash` includes the `#`, just as `search` would include the `?`.

  Doing this by splitting the string yourself is possible, and it is how everybody did it
  before the URL API existed. It is also fiddly and easy to get wrong, which is precisely why
  the URL API was created.


16) 
        const url = new URL(window.location.href);

        url.searchParams.set("sort", "asc");

        console.log(url.href);

  If the page was at `https://example.com/products`, this prints:

        https://example.com/products?sort=asc

  Remember which method does what: **`get()` reads** a parameter, **`set()` writes** one. And
  `set()` replaces the parameter if it is already there rather than adding a second copy of it,
  which is usually what you want.

  To actually navigate to the new URL you would then assign it:

        window.location.href = url.href;

  That reloads the page at the new address. Leave that line out, as we did above, and you have
  simply built the URL string without going anywhere — which is often all you need, for
  instance when you are putting it into a link.
