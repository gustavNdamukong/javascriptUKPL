# QUIZ — Regular Expressions

This page contains the Q & A (questions and answers) for this chapter — Chapter 6: Regular Expressions. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 9 to 13 are proper exercises where you write real patterns.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) A friend tells you that the asterisk in a regular expression "matches any number of
   characters". Are they right? What does /go*d/ match, and why is /*/ on its own not even a
   valid pattern?

   Clue: the asterisk always has its eye on whatever sits immediately before it.


2) What does the dot (.) match, and what is the one common character it will not match?

   Clue: it matches a single character of almost any kind, but it stops at the end of a line.


3) What will /gr[ae]y/ match? And what changes if you write /gr[ae]+y/ instead?

   Clue: square brackets mean "any one of these". The + is a quantifier, and you know from
   question 1 what quantifiers attach themselves to.


4) What does the caret (^) mean inside square brackets, and what does it mean outside them?
   Give an example of each.

   Clue: it does two completely unrelated jobs depending on where you put it.


5) Both of these try to match an HTML tag. Run them in your head against the text
   `<p><b>`Hello`</b></p>` and say what each one grabs:

        /<.+>/
        /<[^>]+>/

   Clue: one of them is greedy and runs on as far as it can. The other is stopped in its
   tracks by something it is forbidden to match.


6) The dot is a special character in regular expressions. So how would you write a pattern that
   matches the literal text 5.0, with a real full stop in it?

   Clue: you need to tell the pattern to stop treating the dot as special.


7) What is the difference between the g modifier and the m modifier?

   Clue: one of them is about how many results come back. The other is about what counts as a
   line.


8) Name the three JavaScript methods this chapter uses for working with regular expressions,
   and say what each one hands back.

   Clue: one gives you true or false, one gives you what it found, and one gives you a changed
   copy of the string.


9) EXERCISE. Write a regex pattern to match a social security number in the format:

123-45-6789

  Then say how your pattern would need to differ depending on whether you are validating a
  form field that should contain nothing else, or searching for an SSN inside a longer
  sentence.

Clue: \d matches a digit, and the curly braces let you say how many of them you want.


10) EXERCISE. Write a regex pattern to match five word characters in a row. Then write a
  second pattern that matches a genuine five-letter word standing on its own.

  Clue: for the second one you will need to rule out digits, and mark both ends.


11) EXERCISE. Write a regex pattern to match a word of one or more characters.

  Clue: one quantifier is all you need.


12) EXERCISE. Write a regex pattern that matches 'my' only when it begins the subject string.
  Then say what it does with the text "I love my cat", and why.

  Clue: this is one of the two jobs the caret does.


13) EXERCISE. Write a regex pattern that matches 'cats' only when it ends the subject string.
  Then say what it does with "cats are fun. I like cats too", and why.

  Clue: the mirror image of the previous question.


## ANSWERS

1) Your friend is not right, and this is one of the most common misunderstandings about regular
   expressions.

   The asterisk is a quantifier. It means "zero or more of whatever comes just before it". It
   does not mean "any characters" on its own.

/go*d/  matches "gd", "god", "good", "goood" and so on

   because the * is attached to the letter o, and asks for zero or more of them.

   Written by itself, /*/ is not a valid pattern at all. JavaScript rejects it with the error
   "Nothing to repeat", because there is nothing in front of the asterisk for it to work on.

   What your friend was probably thinking of is /.*/ — a dot followed by an asterisk, meaning
   "zero or more of any character". That really does match anything, or nothing at all. The
   same reasoning applies to +, which means "one or more of the thing before it".


2) The dot matches any single character, with one exception: it will not match a newline (\n).

   The word "single" matters. /./ on its own matches exactly one character, which is why it is
   almost always combined with a quantifier, as in /.*/ or /.+/, when you want to cover a run
   of them.


3) /gr[ae]y/ matches "gray" and "grey". The square brackets say "any one of the characters
   inside me", so the pattern is "g, r, then either an a or an e, then y".

   Adding the + turns it into a quantifier applying to the whole class, so /gr[ae]+y/ asks for
   one or more of those letters in any combination. It still matches "gray" and "grey", but it
   now also matches "graay", "greey", "greay" and "graey".


4) Inside square brackets, at the start, the caret means negation:

/[^0-9]/   matches any single character that is NOT a digit

   Outside square brackets, at the start of a pattern, it is an anchor meaning "the match must
   begin at the start of the text":

/^my/      matches "my cat", but not "I love my cat"

   Two completely different jobs, told apart only by where the caret sits.


5) 
        /<.+>/      grabs the whole thing:  "<p><b>Hello</b></p>"
        /<[^>]+>/   grabs just the first tag:  "<p>"

   The first is greedy. The .+ is happy to match any characters at all, including the closing
   angle brackets in the middle, so it runs on to the last > on the line.

   The second cannot do that. [^>] means "any character that is not a >", so the moment the
   pattern reaches the first >, it can go no further and the match ends there. That is exactly
   why the negated class fixes the greedy version.


6) Put a backslash in front of the dot to escape it:

/5\.0/

   The backslash tells the pattern to stop treating the next character as special and match it
   literally. It works on any special character, including a backslash itself.

   If you also wanted to allow 5.00 or 5.000, add a quantifier to the zero:

/5\.0*/


7) They do quite different jobs, though both sound as though they mean "match more".

**g is about how many matches you get back. m is about where ^ and $ apply.**

   Take this three-line string:

        const text = "cat sat here\ndog barked\ncat slept";

   Without g you get the first match only. With it, you get all of them:

    text.match(/cat/)     // ["cat"]
    text.match(/cat/g)    // ["cat", "cat"]

   The word "here" sits at the end of the first line, but the string as a whole ends with
   "slept". So $ on its own finds nothing, because $ means the end of the whole string. Add m
   and $ comes to mean the end of any line:

    text.match(/here$/)   // null
    text.match(/here$/m)  // ["here"]

   And because they are independent, they combine:

    text.match(/^cat/g)   // ["cat"]
    text.match(/^cat/gm)  // ["cat", "cat"]

   A useful way to remember it: g asks "how many times?", m asks "what counts as a line?".


8) 
- **test()** is called on the pattern and hands back true or false:

    /cats/i.test("Cats are fun.")            // true

- **match()** is called on the string and hands back what it found:

    "Cats are fun.".match(/cats/i)           // ["Cats"]

- **replace()** is called on the string and hands back a changed copy of it:

    "I like cats".replace(/cats/gi, "dogs")  // "I like dogs"

   Note that replace() gives you a new string. It does not alter the one you called it on.


9) 
        /^\d{3}-\d{2}-\d{4}$/

   \d matches a digit, and the curly braces say how many: three, then a hyphen matched
   literally, then two, another hyphen, then four.

   Which version you want depends on the job:

- **Validating a form field** that should contain nothing but an SSN — keep the anchors. The
  ^ and $ demand that the whole string is the number and nothing else.
- **Searching for an SSN inside a sentence** — drop them:

        const pattern = /\d{3}-\d{2}-\d{4}/;
        const text = "My SSN is 123-45-6789";

        if (pattern.test(text)) {
            console.log("Valid SSN!");
        } else {
            console.log("Invalid SSN.");
        }

   This catches people out. Use the anchored pattern on that sentence and you will be told
   "Invalid SSN.", because the string does not consist solely of the number.


10) Five word characters in a row:

        /\w{5}/

  A genuine five-letter word on its own:

        /\b[a-zA-Z]{5}\b/

  The first is looser than its description suggests. \w covers letters, digits and the
  underscore, and nothing marks where the word begins or ends, so it matches the first five
  characters of "helloworld", and matches "abc12" too.

  The second fixes both problems. [a-zA-Z] rules out the digits, and \b marks a word boundary
  at each end, so the run of five must stand alone. It matches the "hello" in "say hello now"
  but finds nothing in "helloworld".


11)
  /\w+/

  The + asks for one or more word characters.

  You will often see this written as /[\w]+/, with square brackets round it. That works just
  as well, but the brackets add nothing here, because \w is already a class in its own right.
  Worth recognising both forms, since you will meet them out in the wild.


12)
  /^my/

  The ^ pins the match to the very start of the text.

  On "I love my cat" it matches **nothing at all**, even though there is a perfectly good
  "my" sitting in the middle. The anchor is about position, not about which occurrence.

  If what you want is the first "my" wherever it happens to fall, use /my/ with no anchor —
  a pattern without the g modifier stops at the first match anyway.


13)
  /cats$/

  The $ pins the match to the very end of the text.

  On "cats are fun. I like cats too" it matches **nothing**, because that string ends with
  "too". It would match "I like cats", where the word really is at the end.

  Same lesson as the previous question, mirrored: $ does not mean "the last cats you come
  across". It means "cats, and only if it finishes the text".
