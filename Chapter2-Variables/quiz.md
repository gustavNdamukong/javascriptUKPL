# QUIZ — Variables

This page contains the Q & A (questions and answers) for this chapter — Chapter 2: Variables. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 10 to 12 are proper little exercises where you write and run real
code. The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) Which of these are valid JavaScript variable names, and why are the others not allowed?

myAge
my age
1stPrize
_total
$price
first-name

   Clue: think about spaces, about punctuation, and about what a name is not allowed to begin
   with.


2) What is the difference between declaring a variable and initialising it? And if you declare
   a variable but never give it a value, what does it hold?

   Clue: it is not null. It is the other one.


3) What is a block, and which of these three create one?

        if (true) { ... }
        let person = { name: "Alice" };
        function greet() { ... }

   Clue: all three use curly braces, but one of them is storing data rather than grouping code.


4) Look at this code and say what each console.log() prints:

        if (true) {
            var a = 10;
            let b = 20;
        }

        console.log(a);
        console.log(b);

   Clue: one of these two keywords respects blocks and the other does not.


5) What does this print, and what would happen if you swapped var for let?

        console.log(price);
        var price = 100;

   Clue: the name of the behaviour begins with H, and the let version gives you an error
   message rather than a value.


6) You have written this:

        const colours = ["red", "green"];

   Can you do `colours.push("blue")`? Can you do `colours = ["blue"]`? Explain the difference.

   Clue: const protects the label on the box, not what is inside the box.


7) Of var, let and const declared at the top level of a script in a browser, which one becomes
   a property of the window object?

   Clue: it is the oldest of the three.


8) What is the difference between re-declaring a variable and re-assigning it? Give a one-line
   example of each.

   Clue: one of them uses a keyword like let, and the other does not.


9) What does this code print, and what is the name for what is happening?

        var item = 'shoe';

        function displayItem() {
            var item = 'dress';
            console.log(item);
        }

        displayItem();
        console.log(item);

   Clue: the inner variable hides the outer one, but only inside the function.


10) EXERCISE. This exercise will teach you how to generate HTML elements in JavaScript and
  insert them into the HTML section of your code.

a) Create a div element in your HTML with a specific ID
b) Within your JavaScript tag, create a variable assigning it a paragraph HTML element
c) Dynamically (using JavaScript) grab the div and insert that <p> tag inside of it

Clue: you will need document.getElementById() to grab the div, and innerHTML to put
something inside it. Remember that an HTML tag written in JavaScript is just a string, so
it goes in quotes.


11) EXERCISE. This exercise will teach you how to get the user to supply some information to
  your application, and then take and use that information.

  - Display a prompt on screen asking the user to enter their forename
  - Display a prompt on screen asking the user to enter their surname
  - Store those values in variables, then
  - Show an alert telling them what their forename and surname are

  When you refresh your web page in the browser, you should see two prompt dialog popups one
  after the other; one asking you to enter your forename, and if you enter the value for your
  forename and press enter or hit OK, another popup will appear asking you to enter your
  surname. After entering the value for your surname, you will get an alert popup on screen
  with text saying something like "Your forename is theForenameYouEntered, and your surname is
  theSurnameYouEntered".

  Clue: prompt() asks the user for something and hands back what they typed. alert() shows a
  message. Join your text and your variables together with the + sign.


12) EXERCISE. This one will show you how to modify the value of an HTML element.

  - Create a div in your HTML and give it an ID
  - Place a p tag with some text manually in the div in your HTML. Refresh your web page in
    the browser and you should see the text in the p tag displayed on screen
  - Next, create a variable in JavaScript and assign an image tag to it
  - Dynamically grab the div, remove the p tag with text inside of it, and replace it with
    the image you have created in JavaScript

  When you refresh your web page, the image should be displaying in the place of the text
  that was being displayed before.

  Clue: emptying an element is just a matter of setting its innerHTML to an empty string.
  Watch your quotes carefully on this one — the img tag needs quotes of its own inside the
  string.


## ANSWERS

1) Valid: myAge, _total, $price.

- my age is not allowed, because names may not contain spaces.
- 1stPrize is not allowed, because a name may not begin with a digit. Digits are fine
  anywhere after the first character, so prize1st would be fine.
- first-name is not allowed, because the hyphen is punctuation. JavaScript would read it as
  "first minus name".

   Remember that $ is allowed but is best avoided, as other tools and libraries such as jQuery
   use it for their own purposes.


2) Declaring a variable means creating it. Initialising it means giving it its first value.

        let a;              // declared only
        let b = 5;          // declared and initialised in one go

   A variable that has been declared but never given a value holds the special value
   undefined. It does not hold null. undefined means "nothing has been put in here yet",
   whereas null is a value you deliberately assign yourself. There is more on the difference in
   Chapter 10 (Data Types).


3) A block is any section of code enclosed within curly braces {}. It groups statements
   together and creates a scope for let and const variables.

   The if statement and the function both create blocks. The object literal does not — even
   though it uses curly braces, it is a data structure that stores values as key-value pairs,
   and it creates no scope at all.


4) It prints:

10
Error: ReferenceError: b is not defined

   var does not respect block scope, so a leaks out of the if block and is still reachable
   afterwards. let is block-scoped, so b only exists inside the braces. Reaching for it outside
   gives a ReferenceError, which is JavaScript telling you it cannot find that name at all.


5) It prints undefined — not an error.

   This is hoisting. Before your code runs, JavaScript makes a note of every variable you have
   declared, and a var variable is given the value undefined straight away. So the name already
   exists by the time console.log() runs, it just has nothing useful in it yet.

   Swap var for let and you get an error instead:

Error: ReferenceError: Cannot access 'price' before initialization

   because a let variable sits in the temporal dead zone until the line declaring it has
   actually run. The error is the more helpful outcome of the two, which is a good reason to
   prefer let.


6) Yes to the first, no to the second.

        colours.push("blue");   // fine - colours is now ["red", "green", "blue"]
        colours = ["blue"];     // TypeError: Assignment to constant variable

   const stops you from pointing the name at something else. It does not freeze what is inside.
   With an array or an object, the contents can still be changed. This catches almost everybody
   out at least once. See Chapter 4 (Constants) for more.


7) var.

        var x = 10;
        let y = 20;
        const z = 30;

        console.log(window.x);   // OK: 10
        console.log(window.y);   // undefined
        console.log(window.z);   // undefined

   A top-level var becomes a property of the window object. let and const do not. They still
   work everywhere on the page, but they are not stored on window.


8) Re-declaring means using the keyword again, as though creating the variable for the first
   time. Re-assigning means simply updating the value of a variable that already exists.

        let count = 0;
        let count = 1;    // re-declaring - SyntaxError with let

        let total = 0;
        total = 1;        // re-assigning - perfectly fine

	   var allows re-declaration, which is one of the ways it lets mistakes slip through unnoticed.
	   let and const do not.


9) It prints:

dress
shoe

   This is called shadowing. The item inside displayItem() is a separate, local variable that
   hides the global item for as long as we are inside that function. Outside the function, the
   global item is untouched and still holds 'shoe'.


10) Here is the whole page:

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Exercise 1</title>
        </head>
        <body>
            <div id="myDivElem"></div>

            <script>
                let pTag = "<p>This is my awesome p tag</p>";
                let div = document.getElementById('myDivElem');

                div.innerHTML = pTag;
            </script>
        </body>
        </html>

  Take note of how you need to put HTML tags within quotes when you create them in
  JavaScript, as in:

        let pTag = "<p>This is my awesome p tag</p>";

  As far as JavaScript is concerned that is simply a piece of text. It only becomes real HTML
  at the moment you hand it to innerHTML.

  When you refresh your web page, you will see the text "This is my awesome p tag" displayed,
  and it is coming from the p tag you dynamically created and injected into the myDivElem div.


11) Here is the code:

        let forename = prompt('Please enter your forename', 'Enter forename');
        let surname = prompt('Please enter your surname', 'Enter surname');

        alert('Your forename is ' + forename + ' and your surname is ' + surname);

  prompt() takes two arguments. The first is the message shown to the user, and the second is
  the text that starts off in the input box. Whatever the user types is handed back, and here
  we store it in a variable.

  Notice how the alert message is built by joining pieces together with the + sign: some
  text, then the value of a variable, then more text, then another variable. This is called
  concatenation, and we will look at it properly in Chapter 9 (Strings).


12) Here is the whole page:

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Exercise 3</title>
        </head>
        <body>
            <div id="myImgDiv"><p>My manual p tag here</p></div>

            <script>
                let image = "<img src='visa.png' />";
                let div = document.getElementById('myImgDiv');

                // remove what is already in the target div
                div.innerHTML = '';
                div.innerHTML = image;
            </script>
        </body>
        </html>

  Notice how we dynamically create an image tag in JavaScript and insert it as a value into
  another HTML element, in this case the myImgDiv div. Again, when we create the HTML element,
  we must enclose it within quotes as a string.

  There is one more thing worth studying in that image tag. Because we used double quotes
  around the whole tag, the src attribute inside it cannot also use double quotes. You cannot
  nest the same type of quote inside itself, or JavaScript will think the string has ended
  early and the code will fail. There are two ways round this. Either use the other type of
  quote for the inner ones, as we did above with single quotes, or escape the inner quotes
  using a backslash (\).

  So either of these lines would work perfectly well:

        let image = "<img src='visa.png' />";

        let image = "<img src=\"visa.png\" />";

  The escape character tells JavaScript that the quote coming straight after it is not the
  matching partner of the one that opened the string. It should simply be included as part of
  the text. There is more on quotes and escaping in Chapter 9 (Strings).
