QUIZ — Chapter 1: Introduction
==============================

This page contains the Q & A (questions and answers) for this chapter — Chapter 1: Introduction. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. The answers are all together in the Answers section further down, numbered
to match the questions.


QUESTIONS
—————————

1) A web page is built from three separate technologies. Name all three, and say in one short
   sentence what each one is responsible for.

   Clue: one gives the page its content and structure, one controls how it looks, and one
   makes it do things.


2) Look at this line taken from a web page:

        <script src="/js/main.js"></script>

   Why is there nothing written between the opening <script> and the closing </script>?

   Clue: look at what the src attribute is pointing to.


3) Where in an HTML document is it usually best to place your <script> tag, and why?

   Clue: think back to the fax machine, and to which parts of the page actually exist at the
   moment your code runs.


4) Here are two lines of JavaScript with no semicolons anywhere:

        let x = 5
        console.log(x)

   Will this still work? What is the name of the JavaScript feature that makes this possible,
   and what is this book's advice on the matter?

   Clue: the feature's initials are ASI.


5) Write one single line of JavaScript that is commented out. Then write a block of three
   lines that are all commented out together.

   Clue: one of them starts the line with two characters. The other wraps the whole block,
   opening with one pair of characters and closing with another.


6) What is the difference between an expression and a statement? Give one tiny example of each.

   Clue: one of them produces a value. The other is a complete instruction to the computer.


7) A friend tells you their web page is broken. Their JavaScript sits inside the <head>, and
   when it runs they get the error "Cannot read properties of null". What has gone wrong, and
   what are two different ways they could fix it?

   Clue: one fix is a single word added to the script tag. The other is an event you can
   listen for.


8) What is the <noscript> tag for, and would you say every website today must have one?

   Clue: think about what the browser does with the content inside it, and about how common it
   is nowadays for a visitor to have JavaScript switched off.


9) What does "vanilla JavaScript" mean, and why does this book teach it before teaching any
   framework?

   Clue: think about what every framework is built on top of.


10) You want to test your code on your own computer. Name the VS Code extension this book
    recommends and say who made it. Then explain what the 5500 refers to in this address:

        http://127.0.0.1:5500/index.html

    Clue: the chapter describes that last part as a numbered door.


ANSWERS
———————

1) HTML, CSS and JavaScript.

   - HTML (HyperText Markup Language) provides the content and the structure — the headings,
     paragraphs, images, buttons and form fields.
   - CSS (Cascading Style Sheets) controls how all of that looks — the colours, fonts, spacing
     and layout.
   - JavaScript makes the page do things — it gives the page movement and interactivity.

   Or, as the chapter puts it: HTML is the skeleton, CSS is the skin and clothes, and
   JavaScript is the muscle.


2) Because the src attribute is already telling the browser where to find the code. The
   JavaScript lives in the separate file at /js/main.js, so there is nothing to write inside
   the tags. When you use src, you leave the space between the tags empty.


3) Just before the closing </body> tag.

   The browser reads an HTML page from top to bottom, in order. If your script sits at the top
   in the <head>, it runs before the rest of the page has been built, so any element it tries
   to reach further down does not exist yet. Putting the script at the bottom guarantees the
   whole page has been read first, so every element your code needs is already there.


4) Yes, it will still work.

   The feature is called Automatic Semicolon Insertion (ASI). The JavaScript interpreter
   generally treats a new line as the end of a statement and quietly adds the semicolon for
   you.

   The book's advice, though, is to end all your statements with semicolons anyway. ASI is not
   always accurate, and it can join two lines together that you meant to keep apart, which
   produces confusing errors. When in doubt, use a semicolon.


5) A single commented-out line uses two forward slashes at the start:

        // let userName = "Peter";

   A commented-out block opens with a forward slash and an asterisk, and closes with an
   asterisk and a forward slash:

        /*
            let a = 1;
            let b = 2;
            let c = 3;
        */


6) An expression is a piece of code that produces a value. A statement is a single complete
   instruction telling the computer to do something.

        2 + 3            <- an expression. It produces the value 5.
        let x = 2 + 3;   <- a statement. It instructs the computer to store that value in x.

   A statement will often contain one or more expressions inside it. Think of a statement as a
   full sentence and an expression as a phrase within that sentence.


7) The script in the <head> is running before the elements it wants have been built. When the
   browser cannot find an element, it hands back null, which means "nothing found" — hence the
   error message.

   Two ways to fix it:

   - Add the defer attribute to the script tag, so the script waits until the HTML has finished
     being parsed:

        <script src="/your-script.js" defer></script>

   - Wrap the code in a DOMContentLoaded listener, so it only runs once every element exists:

        document.addEventListener('DOMContentLoaded', function () {
            // your code here
        });

   A third option, of course, is simply to move the script down to just before </body>.


8) The <noscript> tag holds content that the browser will display only if JavaScript is
   disabled or unsupported. It is a fallback — typically a short message, or a simplified
   version of whatever your JavaScript would have provided.

        <noscript>
            <p>JavaScript is required to use this website. Please enable it in your
                browser settings.</p>
        </noscript>

   No, not every site needs one today. Almost all modern browsers support JavaScript and most
   people have it enabled. It is still worth using where accessibility matters, or where you
   want to show a warning that JavaScript is required. But it is no longer something that must
   appear in every project.


9) "Vanilla" simply means plain. Vanilla JavaScript is JavaScript on its own, with nothing
   added — no frameworks, no libraries, no extra tools.

   The book teaches it first because every framework, React, Vue, Angular and the rest, is
   built on top of it. Once you understand the core language, you have the foundation to pick
   up any framework, and to move between them with confidence.


10) The extension is Live Server, made by Ritwick Dey. (Take care to pick that one — copycat
    extensions exist with very similar names, and some have been removed for being malicious.)

    The 5500 is a port number. A port is a door into your computer that programs can use. The
    port number is a numbered door on your computer that a program running on your computer can
    listen at for any other program trying to connect with or communicate with it, or through
    which it can make information available for other programs to connect to and make use of.
    Those other programs are often somewhere else on a network, but they can just as easily be
    sitting on the very same computer — which is exactly what is happening here, since it is
    your own browser doing the connecting. Live Server has opened door number 5500 and is
    serving your project files through it, which is why that number appears in the address.
