# QUIZ — Functions

This page contains the Q & A (questions and answers) for this chapter — Chapter 7: Functions. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 11 to 14 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) In this code, which of name and "Sam" is the parameter, and which is the argument?

        function greetUser(name) {
            console.log("Hello, " + name + "!");
        }

        greetUser("Sam");

   Clue: one of them is written when you define the function, the other when you call it.


2) Look at this function. It prints "Hello John" — but there is a bug in it. What is it, and how
   would you know?

        let username = "John";

        function greeting(user_name) {
            console.log("Hello " + username);
        }

        greeting(username);

   Clue: try calling it with a different name and see what happens.


3) What is wrong with each of these two lines?

        greeting;
        Console.log("Hello");

   Clue: one is missing something small but essential. The other has a capital letter where it
   should not.


4) When would you write a function that returns something, and when would you write one that
   just does something? Give a one-line example of each.

   Clue: think about whether you need an answer back that you can store and use.


5) What does this print, and what is the name of the error?

        function updateStatus() {
            var testLocalVar = "wild";
        }

        updateStatus();
        console.log(testLocalVar);

   Clue: the variable exists, but not where you are standing when you ask for it.


6) Rewrite this anonymous function as an arrow function, in two stages: first keeping the curly
   braces, then in its shortest possible form.

        let greet = function() {
            return "Hello";
        }

   Clue: in the shortest form, two things disappear — the braces and one keyword.


7) Why is this a SyntaxError, and what are the two correct ways to write it?

        const double = (num) => return num * 2;

   Clue: with a single expression, one of those words is doing a job that is already being done
   for you.


8) What does each of these print, and why are they different?

        const obj = {
            value: 10,
            regularFunction: function() { console.log(this.value); },
            arrowFunction: () => { console.log(this.value); }
        };

        obj.regularFunction();
        obj.arrowFunction();

   Clue: one of these two kinds of function brings its own this. The other borrows one from
   wherever it was written.


9) This function is meant to return an object, but it returns undefined. Why, and what is the
   one-character-each-side fix?

        const createObject = (make, model) => {make, model};

   Clue: JavaScript cannot tell whether you meant those braces as an object or as the
   function's body — so it guesses, and it guesses the other one.


10) What is an IIFE, and what is the main reason for using one?

Clue: the first word of the abbreviation tells you when it runs; the benefit has to do with
keeping things to yourself.


11) EXERCISE. Write a function called addNumbers that takes two numbers and returns their sum.
  Call it, store the result in a variable, and print a sentence using that result.

Clue: you will need the return keyword, and the + sign will do two different jobs in this
exercise.


12) EXERCISE. Write a function that can add up any quantity of numbers — two, five, twenty —
  without you having to say in advance how many there will be. Call it twice with different
  amounts of numbers.

  Clue: three dots in the parameter list will gather them all into an array for you, and then
  an array method from Chapter 3 will add them up.


13) EXERCISE. Write a function called setMember that takes a name and a type, where type
  defaults to "member" if nothing is passed for it. Prove that the default works by calling it
  both ways.

  Clue: you give the default right there in the parameter list, with an equals sign.


14) EXERCISE. Take this array and use map() with an arrow function to produce a new array where
  every number has been tripled. Print both arrays to show the original is untouched.

        const data = [1, 2, 3, 4];

    Clue: map() hands each element to your function one at a time and collects up whatever you
    return.


## ANSWERS

1) name is the parameter. "Sam" is the argument.

   The parameter is the name you write inside the parentheses when you **define** the function.
   It is a placeholder, standing in for whatever will be handed over later.

   The argument is the actual value you pass when you **call** it.

   A way to keep them straight: parameters are Placeholders, arguments are the Actual values.


2) The bug is that the function never uses its parameter.

   The parameter is called user_name, but the body reads username — which is the variable
   declared outside the function. So the function ignores whatever you hand it and always
   prints the outer value.

   You would find it the moment you called it with anything else:

        // still prints "Hello John"
        greeting("Somebody Else");

   The fix is to make the body use the parameter it was given:

        function greeting(userName) {
            console.log("Hello " + userName);
        }

   Note also that user_name should be userName. JavaScript convention is camelCase, as covered
   in the naming rules earlier in this chapter.


3) 
   - `greeting;` is missing its parentheses. Without them you are only mentioning the function,
     not calling it. Nothing happens. It must be `greeting();`, and the parentheses are
     required even when you are passing nothing.
   - `Console.log` has a capital C. JavaScript is case-sensitive, so this gives you
     `ReferenceError: Console is not defined`. It is `console.log`.


4) Write a function that **returns** something when you need an answer back that you can store
   and use further on:

        function addNumbers(a, b) {
            return a + b;
        }

        // sum is 10
        let sum = addNumbers(5, 5);

   Write a function that just **does** something when there is no answer to hand back — it
   changes something, or displays something, and that is the whole job:

        function updateStatus() {
            appStatus = false;
        }

        // nothing to capture
        updateStatus();

   The giveaway is whether it makes sense to put the call on the right-hand side of an equals
   sign.


5) It prints nothing, and throws:

ReferenceError: testLocalVar is not defined

   testLocalVar was declared with var inside the function, which makes it function-scoped. It
   exists only while the function is running, and only inside it. From outside, the name means
   nothing at all.

   Note that this is a ReferenceError, not "undefined". undefined is a value a variable can
   hold; a ReferenceError is JavaScript telling you the name does not exist here.


6) With the braces kept:

        let greet = () => {
            return "Hello";
        }

   And in its shortest form:

        let greet = () => "Hello";

   In the short form both the curly braces and the return keyword disappear. Whatever sits
   after the arrow is automatically treated as the value to return.


7) It is a SyntaxError because with a single expression the return is already implied. Writing
   return as well is asking for it twice, and JavaScript rejects it with
   `SyntaxError: Unexpected token 'return'`.

   The two correct forms are:

        // implicit return, no braces
        const double = (num) => num * 2;

        // explicit return, with braces
        const double = (num) => { return num * 2; };

   Pick one or the other. You cannot half-do it.


8) It prints:

10
undefined

   regularFunction is an ordinary function, and when you call it as obj.regularFunction(), its
   this refers to the object it was called on. So this.value is 10.

   arrowFunction is an arrow function, and arrow functions do not get their own this. They take
   it from wherever they were written. This one was written directly on the object literal, and
   the scope surrounding that is not the object — it is the enclosing scope, where there is no
   value property. So this.value is undefined.

   The rule worth memorising: **an arrow function takes its this from where it was written, not
   from what it was called on.**

   Note that an arrow written *inside* a regular method behaves differently, and usually the
   way you want, because the method's this is what it inherits:

        const obj = {
            value: 10,
            method: function() {
                const inner = () => console.log(this.value);
                inner();   // 10
            }
        };


9) It returns undefined because JavaScript reads those curly braces as the **function's body**,
   not as an object you want back. Inside a body, `{make, model}` is just two statements that do
   nothing, and a function that never returns anything gives you undefined.

   The fix is a pair of round brackets around the object:

        const createObject = (make, model) => ({make, model});

   Those brackets tell JavaScript "this is a value, not a block". It is a small thing that
   causes a lot of confusion the first time, because nothing goes wrong loudly — there is no
   error, you simply get undefined.


10) An IIFE is an Immediately Invoked Function Expression: a function that runs the moment it is
  defined, rather than waiting to be called. It is wrapped in parentheses to make it an
  expression, and then followed by () to invoke it:

        (function() {
            console.log("I run immediately!");
        })();

  The main reason for using one is to **keep things private**. Anything declared inside stays
  inside, so it never touches the global scope and cannot clash with names elsewhere in your
  program:

        const result = (function() {
            let secret = "Hidden Data";
            return secret;
        })();

        console.log(result);
        // "Hidden Data"
        console.log(typeof secret);
        // "undefined" - it never escaped

  It is also handy for setup code that should run exactly once.


11) Here is one way:

        function addNumbers(numOne, numTwo) {
            return numOne + numTwo;
        }

        let sum = addNumbers(5, 5);

        console.log('The sum of the two numbers is: ' + sum);

  Output:

The sum of the two numbers is: 10

Notice the two jobs the + sign does here. Inside the function it adds two numbers together.
In the console.log line it joins a piece of text to a value, which is called concatenation.
Same character, different behaviour depending on what sits either side of it.


12) Use a rest parameter:

        function addAll(...numbers) {
            return numbers.reduce((total, num) => total + num, 0);
        }

        console.log(addAll(1, 2, 3, 4));
        // 10
        console.log(addAll(5, 10));
        // 15

  The three dots gather however many arguments were passed into a real array called numbers.
  Because it is a genuine array, you can use array methods on it — here reduce(), from Chapter
  3, to add them all up starting from 0.

A function that accepts a varying number of arguments like this is called a variadic
function.


13) 
        function setMember(name, type = "member") {
            console.log(name + " has type: " + type);
        }

        // Dolph has type: member
        setMember("Dolph");
        // Dolph has type: admin
        setMember("Dolph", "admin");

The `= "member"` in the parameter list is the default. It is used only when nothing is
passed for that parameter. Pass something and yours wins.

  Defaults must come after the parameters that have none, otherwise you would have no way of
  skipping them.


14) 
        const data = [1, 2, 3, 4];

        const tripled = data.map(num => num * 3);

        console.log(data);
        // [1, 2, 3, 4]
        console.log(tripled);
        // [3, 6, 9, 12]

    map() hands each element to your arrow function one at a time and collects up whatever you
    return, giving you a brand new array. The original is left exactly as it was, which is why
    printing both shows data unchanged.

    Because there is only one parameter, num needs no parentheses around it. The name is yours
    to choose — `n => n * 3` would work just as well, so long as both sides of the arrow agree.
