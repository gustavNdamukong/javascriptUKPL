# QUIZ — Chapter 21: Error, Debugging and Testing

This page contains the Q & A (questions and answers) for this chapter — Chapter 21: Error,
Debugging and Testing. Work through these after reading the chapter, while the material is fresh
— recall practice is what cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 9 to 12 are proper exercises where you write and run real code. The answers
are all together in the Answers section further down, numbered to match the questions.


## QUESTIONS

1) Why is `document.write()` considered bad practice, and what should you use instead?

   Clue: it depends entirely on *when* it runs.


2) `prompt()` takes a second argument. What is it, and why is calling it a "placeholder"
   misleading?

   Clue: one of them disappears when you type. The other does not.


3) When would you reach for an exception rather than a plain `if` statement?

   Clue: think about which errors you can see coming, and which you cannot.


4) Where does a `throw` statement actually live — in the `try` block or somewhere else?

   Clue: look at which piece of code *detects* the problem, and which piece *decides what to do*
   about it.


5) Name the three kinds of thing you can throw, and say which one you should normally use.

   Clue: one of them gives you a `.message` and a stack trace for free.


6) Match each built-in error type to what causes it:

TypeError      ReferenceError      RangeError      SyntaxError

   Clue: try `null.someMethod()`, an undeclared variable, and `(5).toFixed(-1)`.


7) What does the `finally` block do, and when is it worth using?

   Clue: it runs in a case where neither of the other two blocks does everything you need.


8) Does `console.assert()` stop your program when the check fails?

   Clue: this one catches people out, and the chapter says both things in different places.


9) EXERCISE. Write a `divide(a, b)` function that throws an `Error` when `b` is zero, then call
   it inside a `try...catch` and print the message.

   Clue: the throw goes in the function, the try goes around the call.


10) EXERCISE. Write a `ValidationError` class that extends `Error`, throw one, and print both its
  name and its message.

  Clue: two lines in the constructor, one of which is `super`.


11) EXERCISE. Write a `try...catch` that tells a `TypeError` apart from any other error.

  Clue: one operator does the checking.


12) EXERCISE. Write two manual tests for an `add(a, b)` function — one with an `if`, one with
    `console.assert()` — and make the second one fail on purpose so you can see what happens.

  Clue: question 8 tells you what to expect from the failure.


## ANSWERS

1) Because of **when** it runs. While the page is still loading, `document.write()` simply adds
   content. But once the browser has finished loading and closed the document stream, calling it
   **reopens that stream — which wipes the entire page** and starts fresh.

   So the same line behaves completely differently depending on timing, which is a horrible
   property for a function to have.

   The replacement is `innerHTML`, and specifically `+=` rather than `=`:

        document.body.innerHTML += "My data here";

   The `+=` appends. A plain `=` would replace everything already inside the element — which,
   if you are writing values in a loop, means you end up seeing only the last one.


2) The second argument is the **default value** of the input box.

        prompt('Enter surname', 'Enter surname here');

   Calling it a placeholder is misleading because the two behave differently in a way that
   matters:

- A **placeholder** is grey hint text that **vanishes the moment you type**. It is never a
  value.
- A **default** is real text **already sitting in the box**. If the user presses OK without
  touching it, that text is exactly what `prompt()` returns to you.

   So a default can arrive in your program as though the user had typed it, and your code should
   be ready for that.


3) Use a plain `if` for the ordinary, expected checks — is the list empty, is this number too
   big, did the user leave the field blank. These are things you can see coming.

   Reach for an **exception** when the problem is **mission-critical** or unforeseeable: the
   database is unreachable, a user is trying to open an account that is not theirs, a file that
   must exist does not. These are cases where carrying on is not an option, and where the code
   that *notices* the problem is usually not the code that should *decide what to do* about it.

   That last point is the real dividing line. An `if` handles a problem where it finds it. An
   exception hands the problem upwards, to whoever is in a position to respond.


4) A `throw` lives **inside the function that detects the problem** — not in the `try` block.

        function viewAccount(account, user_id) {
            if (account.user_id != user_id) {
                throw new Error("Not your account");   // detected here
            }
        }

        try {
            viewAccount(account, user_id);   // called here
        } catch (error) {
            console.error(error.message);    // handled here
        }

   The `try` block is where you **call** the risky function; the `catch` block is where the
   thrown value arrives. That separation is the whole point: one piece of code knows something
   is wrong, another decides what to do about it.


5) You can throw:

   - an **`Error` object** (built-in or your own subclass) — `throw new Error("...")`
   - an **object literal** — `throw { code: 401, message: "Account not theirs" }`
   - a **plain string** — `throw "something went wrong"` (least common)

   Normally you should throw an **`Error` object**. You get `.message` and `.name` for free, you
   get a stack trace showing where it happened, and `instanceof` works so a catch block can tell
   error types apart. A thrown string gives you none of that.


6) 
    TypeError       null.someMethod()        — doing something to a value that
      cannot do it
    ReferenceError  using an undeclared      — the name does not exist at all
      variable
    RangeError      (5).toFixed(-1)          — a number outside an allowed range
    SyntaxError     a missing bracket        — the code cannot even be parsed

   `SyntaxError` is the odd one out. The others happen while your program is *running*;
   a SyntaxError happens when JavaScript *reads* your file, which means the program never
   starts at all — so you cannot catch it in a `try...catch` in the same file.


7) `finally` runs **whether or not an exception was thrown**. It runs after the `try` succeeds,
   and it runs after the `catch` handles a failure.

        try {
            openConnection();
        } catch (error) {
            console.error(error.message);
        } finally {
            closeConnection();   // happens either way
        }

   It is worth using when there is **cleanup that must happen regardless** — closing a
   connection, hiding a loading spinner, releasing a lock. Put that in `try` and it is skipped
   when things go wrong; put it in `catch` and it is skipped when things go right. `finally` is
   the only place that always runs.


8) **No.** `console.assert()` logs an error message to the console and then **carries straight
   on**.

        console.assert(1 === 2, 'this will not stop anything');
        console.log('and this line still runs');

   Output:

Assertion failed: this will not stop anything
and this line still runs

   That is worth being clear about, because "assert" sounds forceful and in some other languages
   a failed assertion does halt the program. In JavaScript it is purely a reporting tool. If you
   want execution to stop, you need to `throw`.


9) 
        function divide(a, b) {
            if (b === 0) {
                throw new Error("Cannot divide by zero");
            }
            return a / b;
        }

        try {
            console.log(divide(10, 2));   // 5
            console.log(divide(10, 0));   // throws
        } catch (error) {
            console.error("Error:", error.message);   // Error: Cannot divide by zero
        }

  Note that the first call prints `5` before the second one throws. Everything in a `try` block
  up to the point of the throw runs perfectly normally — the block is abandoned from the throw
  onwards, not from the beginning.


10) 
        class ValidationError extends Error {
            constructor(message) {
                super(message);
                this.name = "ValidationError";
            }
        }

        try {
            throw new ValidationError("Username is too short");
        } catch (error) {
            console.error(error.name, "-", error.message);
            // ValidationError - Username is too short
        }

  `super(message)` passes the message up to `Error`, which is what makes `.message` work.
  Setting `this.name` is what makes the error identify itself properly — without it, the name
  would still say "Error", which rather defeats the purpose of having made your own.

  A custom error also means a catch block can pick it out specifically with
  `error instanceof ValidationError`.


11) 
        try {
            null.someMethod();
        } catch (error) {
            if (error instanceof TypeError) {
                console.error("TypeError caught:", error.message);
            } else {
                console.error("Some other error:", error.message);
            }
        }

  JavaScript has only one `catch` block per `try` — unlike some languages, you cannot write
  several catches for different types. So `instanceof` inside a single catch is how you tell
  them apart.


12) 
        function add(a, b) {
            return a + b;
        }

        // Test 1: the manual if
        if (add(2, 3) === 5) {
            console.log('Test passed');
        } else {
            console.log('Test failed');
        }

        // Test 2: console.assert, deliberately wrong
        console.assert(add(1, 2) === 4, 'Test failed: add(1, 2) should equal 4');

        console.log('Still running');

  Output:

Test passed
Assertion failed: Test failed: add(1, 2) should equal 4
Still running

    The last line is the point of the exercise. The assertion failed, said so, and the program
    carried on regardless — which is exactly why `console.assert` is fine for a quick check but
    not something to build a real test suite on. That is what Jest, Mocha and Vitest are for.
