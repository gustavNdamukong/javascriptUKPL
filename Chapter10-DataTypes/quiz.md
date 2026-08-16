# QUIZ — Data Types

This page contains the Q & A (questions and answers) for this chapter — Chapter 10: Data Types. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 9 to 11 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) What is the difference between null and undefined? Which one does JavaScript give you on
   its own, and which one do you have to ask for?

   Clue: both mean "nothing here". The difference is who put the nothing there.


2) JavaScript has exactly eight falsy values. Name as many as you can, then say which of these
   three is NOT among them:

        []          {}          ""

   Clue: two of those three surprise people, because in several other languages they would be
   falsy.


3) What does this print, and why might it catch you out?

        if ([]) {
            console.log("Yes");
        } else {
            console.log("No");
        }

   Clue: see question 2.


4) A friend writes this to check whether an array is empty, and it never works. Why not, and
   what should they write instead?

        if (myData === []) {
            console.log("It is empty");
        }

   Clue: think back to Chapter 3, and what it means for an array to be a reference type.


5) What does `typeof null` return, and is that correct?

   Clue: the answer is famously wrong, and has been since 1995.


6) What does this print? Look very carefully at the order things happen in.

        console.log(typeof 2 + 2);

   Clue: typeof grabs hold of what is next to it before the + gets a look in.


	7) What is the difference between == and === when comparing null and undefined?

   Clue: one of them cares about the type, the other does not.


8) You have a value and you want to know whether it is a number. Name a built-in way to check,
   and say what it would give you for the string "5".

   Clue: the operator from questions 5 and 6.


9) EXERCISE. Write code that declares one variable left unset and one deliberately set to null.
   Print both, and print the result of comparing them with == and with ===.

   Clue: you should get undefined, null, true and false, in that order.


10) EXERCISE. Write a function called isEmptyArray(value) that returns true only when the value
  really is an array with nothing in it. Test it with an empty array, an array with items, an
  empty string, and null.

  Clue: you need two checks joined with &&: that it is an array at all, and that its length is
  zero.


11) EXERCISE. Take an array and an object, convert each into a string, and print them.

  Clue: there is one built-in method that does this for both, and it has JSON in the name.


## ANSWERS

1) Both mean "there is nothing here". The difference is in who put the nothing there.

- **undefined** is what JavaScript gives you on its own. You get it from a variable that was
  declared but never assigned, from a property that does not exist, and from a function that
  returns nothing.
- **null** is one you set deliberately. It is a programmer saying "this is empty, and I meant
  it". JavaScript will never hand you null by itself.

        let notSetYet;                  // undefined - nobody assigned anything
        let deliberatelyEmpty = null;   // null - we chose this

   A short way to hold on to it: undefined is the absence of a value, null is the presence of an
   empty one.


2) The eight falsy values are:

false     0     -0     0n     ""     null     undefined     NaN

   Of the three given, only **""** is falsy. Both **[]** and **{}** are truthy.

   That surprises a lot of people, and it is worth knowing why: in several other languages,
   PHP among them, an empty array counts as false. In JavaScript it does not. Anything that is
   not on the list of eight above is truthy, and an empty array is an object, so it is truthy.


3) It prints:

Yes

   Because `[]` is truthy, the if branch runs. If you have come from a language where an empty
   array is falsy, you would expect "No", and this is exactly the sort of thing that produces a
   bug you stare at for an hour.

   If what you meant was "does this array have anything in it", ask about its length:

        if (myArray.length > 0) { ... }


4) It never works because two arrays are never strictly equal to one another, even when both
   are empty:

        console.log([] === []);   // false, always

   An array is a reference type, as we saw in Chapter 3. The name does not hold the array
   itself, only a pointer to where it lives. So `myData === []` is comparing a pointer to your
   array against a pointer to a brand new empty array that was just created on that line. They
   are two different arrays, so they are never the same one.

   What to write instead:

        if (Array.isArray(myData) && myData.length === 0) {
            console.log("It is empty");
        }

   Two checks: that it is an array at all, and that it has nothing in it.


5) It returns "object".

        console.log(typeof null);   // "object"

   And no, that is not correct. null is not an object. It is a bug that has been in JavaScript
   since the very first version in 1995, and it can never be fixed now, because far too much
   existing code relies on the current behaviour.

   So do not use typeof to test for null. Use strict equality:

        if (value === null) { ... }


6) It prints:

number2

   not "number". `typeof` binds more tightly than `+`, so JavaScript reads it as `(typeof 2) + 2`
   — that is, the string "number" joined to the number 2, which gives the string "number2".

   If you meant to check the type of the sum, put brackets round it:

        console.log(typeof (2 + 2));   // "number"


7) 
        null == undefined     // true
        null === undefined    // false

   The loose operator == treats null and undefined as two ways of saying the same thing, so it
   reports them as equal. The strict operator === compares the type as well, and they are
   different types, so it reports them as different.

   This matters when you are testing for one specifically. If you write `if (value == null)`
   you are also catching undefined, which may or may not be what you wanted. Use === when you
   need to tell them apart.


8) The typeof operator:

        console.log(typeof 5);     // "number"
        console.log(typeof "5");   // "string"

   For the string "5" it gives you **"string"**, not "number". The quotes are what matter, not
   what is inside them. A number that arrived from a form field or a URL will be a string until
   you convert it — which is why the conversion section in this chapter exists.


9) 
        let notSetYet;
        let deliberatelyEmpty = null;

        console.log(notSetYet);                          // undefined
        console.log(deliberatelyEmpty);                  // null
        console.log(notSetYet == deliberatelyEmpty);     // true
        console.log(notSetYet === deliberatelyEmpty);    // false

   The last two lines are the whole point. Loosely, JavaScript considers them the same sort of
   nothing. Strictly, it does not, because their types differ.


10) 
        function isEmptyArray(value) {
            return Array.isArray(value) && value.length === 0;
        }

        console.log(isEmptyArray([]));          // true
        console.log(isEmptyArray([1, 2, 3]));   // false
        console.log(isEmptyArray(""));          // false
        console.log(isEmptyArray(null));        // false

   The `Array.isArray()` check has to come first, and not only for tidiness. An empty string
   also has a length of 0, so without it `isEmptyArray("")` would wrongly say true. And null has
   no length property at all, so reading `.length` on it would throw a TypeError — the && stops
   before it ever gets that far.


11) 
        let testData = [5, 10, 20, 25];

        let customer = {
            name: 'Tom Sawyer',
            age: 10,
            brother: 'Sid',
            aunt: 'Polly'
        };

        console.log("The testData array contains: " + JSON.stringify(testData));
        console.log("The customer object: " + JSON.stringify(customer));

   Output:

        The testData array contains: [5,10,20,25]
        The customer object: {"name":"Tom Sawyer","age":10,"brother":"Sid","aunt":"Polly"}

   `JSON.stringify()` handles both arrays and objects. Without it, joining an object to a string
   gives you the unhelpful "[object Object]", which is a message most JavaScript programmers
   have seen more often than they would like.
