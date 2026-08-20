# QUIZ — Templating

This page contains the Q & A (questions and answers) for this chapter — Chapter 23: Templating. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. The answers are all together in the Answers section further down, numbered
to match the questions.


## QUESTIONS

1) A template literal lets you drop a variable straight into a piece of text. Two things make
   that work. What kind of quote mark has to wrap the whole string, and what do you put around
   the variable name inside it?

   Clue: the quote mark is neither the single one nor the double one — it is the third kind, and
   it usually shares a key with ~. The variable sits inside braces, with one symbol in front.


2) A Handlebars template is written inside a script tag, like this:

   ```
   <script id="template" type="text/x-handlebars-template">
       <h1>{{title}}</h1>
   </script>
   ```

   Why does that tag need type="text/x-handlebars-template"? What would the browser try to do
   with the tag if you left it out?

   Clue: a script tag normally holds one particular kind of thing, and the browser does not just
   store it — it runs it. Ask yourself what would happen if it tried to run `<h1>{{title}}</h1>`.


3) Look at this line:

   ```
   const template = Handlebars.compile(source);
   ```

   What kind of thing is template now?

   Clue: the very next line in the chapter uses it as `template(data)`. Those round brackets are
   the giveaway.


4) EXERCISE. You have this template already on the page, and this data in your JavaScript:

   ```
   <script id="template" type="text/x-handlebars-template">
       <h1>{{title}}</h1>
   </script>

   <div id="output"></div>
   ```

   ```
   const data = { title: "Hello World" };
   ```

   Write the JavaScript that reads the template, turns it into something you can call, and puts
   the finished HTML inside the div whose id is output.

   Clue: three steps, in this order — read the template's innerHTML, compile it, then assign the
   result of calling it with your data to the div's innerHTML.


5) Mustache and Handlebars both use the same {{ }} placeholders. What is the relationship
   between the two, and do you need to include both in a project?

   Clue: the chapter describes one of them as a superset of the other, and says plainly which
   you should reach for.


## ANSWERS

1) The string must be wrapped in backticks, and the variable goes inside `${ }`.

   ```
   const name = "Alice";

   // Hello, Alice!
   console.log(`Hello, ${name}!`);
   ```

   Both parts are required. With ordinary single or double quotes, `${name}` is just five
   characters of text and nothing is substituted. This is why the chapter says template literals
   are fine for small pieces of text but awkward once you are building a larger chunk of a page.


2) Without that type, the browser treats whatever is inside a script tag as JavaScript and tries
   to run it. `<h1>{{title}}</h1>` is not JavaScript, so it would fail.

   Giving the tag a type the browser does not recognise tells it to leave the contents alone. It
   does not run them; it simply holds them as text. That is exactly what you want, because you
   are going to read that text yourself with innerHTML and hand it to Handlebars.

   So the attribute is not decoration. It is the thing that turns a script tag into a place to
   keep a template.


3) It is a function.

   compile() takes the template text and gives you back a function that is ready to be called.
   You then call it with your data, and it returns the finished HTML as a string:

   ```
   const template = Handlebars.compile(source);
   const html = template(data);
   ```

   That is why the chapter's comment says the template "will become a function template()".


4) Here it is:

   ```
   const source = document.getElementById("template").innerHTML;
   const template = Handlebars.compile(source);

   const data = { title: "Hello World" };

   document.getElementById("output").innerHTML = template(data);
   ```

   Reading it in order: take the template's text off the page, compile that text into a function,
   then call the function with your data and put what comes back inside the target div. The
   {{title}} in the template is replaced by "Hello World".

   Written out one step at a time, the last line is the same as this:

   ```
   const finishedHTML = template(data);
   const targetDiv = document.getElementById("output");
   targetDiv.innerHTML = finishedHTML;
   ```


5) Handlebars is a superset of Mustache. It keeps Mustache's {{ }} syntax and adds helpers,
   conditionals and loops on top.

   You use one or the other, not both together. Of the two, Handlebars is the one you are more
   likely to meet, because it keeps Mustache's simplicity while giving you just enough logic to
   be practical.

   Worth remembering alongside that: in modern applications, both are largely being replaced by
   React, Vue and similar frameworks. They remain useful for server-side rendering and for
   simpler projects that do not need a full framework.
