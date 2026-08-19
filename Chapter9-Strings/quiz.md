# QUIZ — Strings

This page contains the Q & A (questions and answers) for this chapter — Chapter 9: Strings. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 8 to 10 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) Name the three ways you can wrap a piece of text to make it a string in JavaScript.

   Clue: two of them are the ordinary quote marks. The third is the slanted one, usually found
   next to the number 1 on a keyboard.


2) Why does this line fail, and give two different ways to fix it?

        const sentence = "He said hello to "her"";

   Clue: JavaScript reads along until it meets the next quote of the same kind, and then thinks
   the string has finished.


3) What do each of these escape sequences do?

\n    \t    \\    \"

   Clue: the first two are about layout, the second two are about characters that would
   otherwise be taken as syntax.


4) What is string concatenation, and which character does it?

   Clue: it is the same character you would use to add two numbers, doing a different job.


5) What does this print? Look carefully at the line break.

        const name = "Alice";

        const greeting = `My name is ${name} 
            and I am 25 years old.`;

        console.log(greeting);

   Clue: a template literal keeps everything exactly as you laid it out.


6) What is the length of "John Doe", and why?

   Clue: count everything between the quotes, not just the letters.


7) Given `const sport = "Boxing";`, what do each of these give you?

sport[0]
sport[sport.length - 1]
sport[sport.length - 2]

   Clue: counting starts at 0, which is why the last one is at length minus 1 rather than
   length.


8) EXERCISE. Create a string containing a sentence that has both a single quote and a double
   quote inside it — for example, He said "it's fine". Do it twice: once by choosing your outer
   quotes carefully, and once using escape characters.

   Clue: backticks make the first version easy, because neither kind of quote conflicts with
   them.


9) EXERCISE. You have two variables, a first name and a surname. Produce the sentence
   "Hello, John Doe!" twice — once using concatenation, and once using a template literal.

   Clue: watch where the spaces go. It is the most common thing to get wrong with
   concatenation.


10) EXERCISE. Write a piece of code that prints the last character of any string, without
  knowing in advance how long the string is. Test it on two strings of different lengths.

  Clue: the property from question 6 will tell you how long it is, and question 7 shows you
  what to do with that number.


## ANSWERS

1) Double quotes, single quotes, and backticks:

        let firstName = "John";
        let surname = 'Doe';
        let nickname = `Johnny`;

   The first two behave identically. The third, the backtick, creates a template literal, which
   can do things the other two cannot — we come to those in question 5.


2) It fails because JavaScript reads along the line until it meets the next double quote, and
   decides the string ended there. So it sees the string "He said hello to ", then runs into
   the word her sitting outside any string, and does not know what to do with it.

   Two ways to fix it:

**Use a different kind of quote inside:**

        const sentence = "He said hello to 'her'";

**Or escape the inner quotes with a backslash:**

        const sentence = "He said hello to \"her\"";

   The backslash tells the parser not to treat the character after it as part of the syntax,
   but to take it as an ordinary character belonging to the text.

   Of the two, choosing a different quote is usually the tidier option. Escaping is there for
   when you have no choice.


3) 
- `\n` — a newline. Everything after it starts on a fresh line.
- `\t` — a tab. Useful for lining things up in columns.
- `\\` — a single literal backslash. You need two, because one on its own would be read as
  the start of an escape sequence.
- `\"` — a literal double quote, one that does not end the string.


4) Concatenation is joining two or more pieces of text together into one. In JavaScript it is
   done with the **+** character:

        "String one" + " string two";

   That is the same + you would use for arithmetic. Given numbers it adds them; given strings it
   joins them end to end.

   There is also `+=`, which appends to a string you already have:

        let oneString = "string one and ";
        oneString += "string two";
        // oneString is now "string one and string two"


5) It prints:

My name is Alice
  and I am 25 years old.

   on two lines, not one — with the indentation included.

   A template literal keeps whatever you put inside it exactly as you laid it out. Because the
   text was written across two lines with a tab in front of the second, the line break and the
   tab both become part of the string.

   That is a real strength when you want it, which is how multi-line strings work:

        const multiline = `This is line 1.
        This is line 2.`;

   But in the middle of a sentence it is almost never what you meant. Keep an ordinary sentence
   on one line.


6) Eight.

        let fullName = "John Doe";
        console.log(fullName.length);   // 8

   J-o-h-n is four, D-o-e is three, and the space between them counts as a character too, which
   makes eight. `length` counts every character, not just the letters.


7)
| sport[0] | // "B"  - the first character |
|---|---|
| sport[sport.length - 1] | // "g"  - the last character |
| sport[sport.length - 2] | // "n"  - the last but one |

   "Boxing" has six characters, so `length` is 6. But counting starts at 0, so the positions run
   0 to 5. That is why the last character sits at `length - 1` and not at `length` — asking for
   `sport[6]` would give you undefined, because there is nothing there.


8) Two ways:

        // 1. Choose outer quotes that
        // do not clash. Backticks work
        //    for both kinds at once.
        const line1 = `He said "it's fine"`;

        // 2. Or escape whichever ones
        // clash with your outer quotes
        const line2 = "He said \"it's fine\"";

        console.log(line1);
        // He said "it's fine"
        console.log(line2);
        // He said "it's fine"

   Both print the same thing. The first is easier to read, which is a good reason to prefer it.
   Notice that in the second version the single quote in "it's" needs no escaping at all, because
   the string is wrapped in double quotes and so a single quote poses no threat to it.


9) 
        const firstName = "John";
        const surname = "Doe";

        // with concatenation
        console.log("Hello, " + firstName + " " + surname + "!");

        // with a template literal
        console.log(`Hello, ${firstName} ${surname}!`);

   Both print:

Hello, John Doe!

   The spaces are the fiddly part of the concatenated version. There is one after the comma,
   inside the first piece of text, and another between the two names that has to be added as a
   piece of text all of its own. Miss it and you get "Hello, JohnDoe!".

   The template literal version has no such problem: the spaces are simply where you typed them,
   which is much of the reason template literals are worth using.


10) 
        function lastCharacter(text) {
            return text[text.length - 1];
        }

        console.log(lastCharacter("Boxing"));
        // g
        console.log(lastCharacter("Football"));
        // l

  Because we work the position out from `text.length` rather than typing a number in, this
  works on a string of any length without being told how long it is.

  You could also use charAt() for the same job:

        return text.charAt(text.length - 1);

  The difference between the two shows up only when you ask for a position that does not
  exist: brackets give you undefined, whereas charAt() gives you an empty string.
