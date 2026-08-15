# QUIZ — Chapter 4: Constants

This page contains the Q & A (questions and answers) for this chapter — Chapter 4: Constants. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. The answers are all together in the Answers section further down, numbered
to match the questions.


## QUESTIONS

1) What exactly does const protect? Finish this sentence in your own words:

        "const protects the ______, not the ______."

   Clue: it is the reason the next two questions have the answers they do.


2) Which of these two lines throws an error, and what does the error say?

        const scores = [10, 20, 30];

        scores[0] = 99;
        scores = [99, 20, 30];

   Clue: one of them is changing what is inside the box. The other is trying to swap the box
   for a different one.


3) Now the same question for an object. Which line fails?

        const person = { name: "Alice", age: 30 };

        person.age = 31;
        person = { name: "Alice", age: 31 };

   Clue: the rule is exactly the same as for arrays.


4) Look at this code from the chapter:

        const TAX_RATE = 0.15;

        function calculateTotalPrice(price) {
            const taxAmount = price * TAX_RATE;
            const totalPrice = price + taxAmount;
            return totalPrice;
        }

   All four of those names use const, but TAX_RATE is written differently from the others.
   Why?

   Clue: one of them is a setting somebody chose. The other three are worked out by the
   program while it runs.


5) You want a value that genuinely cannot be changed at all, contents included. Is const enough
   on its own? If not, what would you reach for?

   Clue: the chapter names the tool at the very end, and points you to Chapter 17.


6) EXERCISE. Write a small piece of code that proves the rule from question 1 to yourself.

    -Create a const holding an array of three of your favourite foods
    -Change the first one to something else, and print the array to show that it worked
    -Then try to replace the whole array, and see what the browser tells you

  Clue: keep the second part last, because once it throws an error the lines after it will
  not run.


## ANSWERS

1) "const protects the NAME, not the CONTENTS."

   In other words, const stops you pointing that name at a different value. It does not freeze
   whatever the value happens to be. If the value is a simple one, like a number or a piece of
   text, there is nothing inside it to change, so const feels completely locked. But as soon as
   the value is an array or an object, the difference matters.


2) The second line throws.

        scores[0] = 99;        // fine - scores is now [99, 20, 30]
        scores = [99, 20, 30]; // TypeError: Assignment to constant variable.

   Changing scores[0] reaches inside the array and changes one of its elements. The array
   itself is still the same array, sitting in the same place in memory, so const has nothing to
   object to.

   The second line is different. It is trying to make the name scores point at a brand new
   array, and that is exactly what const forbids.


3) The second line again.

        person.age = 31;                        // fine
        person = { name: "Alice", age: 31 };    // TypeError: Assignment to constant variable.

   Setting person.age changes a property inside the object that person already points at.
   The second line tries to swap in a different object altogether, which const will not allow.


4) TAX_RATE is a fixed setting. It is a value somebody decided on and typed into the program,
   and it never changes while the program runs.

   The convention for those is capital letters with underscores between the words, so that
   anyone reading the code can see at a glance that it is a dial someone chose. You will meet
   the same style in names like MAX_LOGIN_ATTEMPTS or API_URL.

   taxAmount, totalPrice and itemPrice are different. They are worked out by the program as it
   goes along, so even though they are declared with const they follow the ordinary camel
   casing convention from Chapter 2.

   The short version: camel case for almost everything, including most of your consts, and
   CAPITALS_WITH_UNDERSCORES only for fixed settings.


5) No, const is not enough on its own.

   const only stops the name being pointed somewhere else. To freeze the contents as well, you
   would use Object.freeze(), which we come to in Chapter 17 (Object Oriented Programming).


6) Here is one way to do it:

        const foods = ["rice", "beans", "plantain"];

        // this works, because we are changing what is inside the array
        foods[0] = "yam";
        console.log(foods);
        // Output: ["yam", "beans", "plantain"]

        // this fails, because we are trying to swap the whole array
        foods = ["bread", "eggs", "tea"];
        // TypeError: Assignment to constant variable.

   Run it and watch the console. The first change prints happily. The second one stops the
   program with a TypeError, and nothing after it runs — which is why it is worth putting that
   line last while you are experimenting.

   If you want to see both halves work without the error cutting things short, comment out the
   last line once you have seen the message, and run it again.
