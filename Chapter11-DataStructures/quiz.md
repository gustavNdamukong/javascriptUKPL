# QUIZ — Chapter 11: Data Structures

This page contains the Q & A (questions and answers) for this chapter — Chapter 11: Data Structures. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 8 to 11 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) Of the structures in this chapter, which ones does JavaScript give you built in, and which
   do you have to build yourself?

   Clue: three are handed to you ready made. The rest you assemble out of what the language
   already has.


2) What is the difference between a stack and a queue? Which array methods give you each one?

   Clue: a stack is a pile of plates. A queue is people waiting at a till.


3) JavaScript has no tuple type. What is used instead, and what is the one thing you lose by
   doing it that way?

   Clue: the missing quality is in the definition of a tuple.


4) You have a plain object and a Map, both storing key-value pairs. Name two things a Map can do
   that a plain object cannot.

   Clue: one is about what you are allowed to use as a key. The other is about counting.


5) Write the one-line trick for removing duplicates from an array, and explain how it works.

   Clue: it uses a structure from this chapter plus the three dots from Chapter 3.


6) JavaScript has no struct. What do you use in its place, and when would you pick a class over
   an object literal?

   Clue: one is for a single record. The other is for making many of the same shape.


7) The chapter says you will rarely build a tree yourself, but will spend a lot of time walking
   through them. Why?

   Clue: look at the page you are reading this on, and at what an API sends back.


8) EXERCISE. Build a stack that holds the pages someone has visited, so that a "back" button
   could return to the previous one. Push three pages, then go back twice.

   Clue: an ordinary array already is a stack.


9) EXERCISE. Build a queue of three jobs waiting to be processed, and process them in the order
   they arrived.

   Clue: add to one end, take from the other.


10) EXERCISE. Build a linked list of three nodes by hand and print every value in it, without
  knowing in advance how many nodes there are.

  Clue: start at the first node and keep following .next until there is no next.


11) EXERCISE. Given a list of names with repeats in it, produce a list of the unique names, and
  then say how many unique names there are.

  Clue: one structure from this chapter does both jobs.


## ANSWERS

1) **Built in:**

- **Arrays** — the ones you have used since Chapter 3
- **Maps and plain objects** — for key-value pairs
- **Sets** — for collections of unique values

- *Built by you, out of what JavaScript already has:**

- **Stacks and queues** — an ordinary array already behaves as both
- **Tuples** — an array stands in for one
- **Structs** — an object literal or a class stands in
- **Linked lists and trees** — assembled from objects or classes

   That is a useful thing to notice in itself: JavaScript gives you a small number of flexible
   structures and expects you to build the rest from them, where a language like C or Go hands
   you more specialised types.


2) A **stack** is Last In, First Out. The last thing you added is the first thing you get back,
   like taking a plate off the top of a pile.

   A **queue** is First In, First Out. The first thing you added is the first thing you get
   back, like people served in the order they joined the line.

   Both use an array:

        // stack - add and remove at the same end
        stack.push(item);
        stack.pop();

        // queue - add at one end, remove from the other
        queue.push(item);
        queue.shift();

   The only difference is `pop()` versus `shift()`.


3) An **array** is used instead. What you lose is **immutability**.

   A real tuple cannot be changed once created. A JavaScript array can be changed by anyone at
   any time, so nothing stops the values being altered afterwards.

   The nearest you can get is to freeze it:

        const frozen = Object.freeze([1, "apple"]);
        frozen[0] = 99;            // silently ignored
        console.log(frozen[0]);    // still 1

   Note that the attempt fails quietly rather than throwing an error, which is worth knowing.


4) A Map can:

- **Use any type as a key.** A plain object turns every key into text, so `person[42]` and
  `person["42"]` are the same key. A Map keeps them separate, and will happily use a number,
  an object or even a function as a key.
- **Tell you how many entries it has**, through `.size`. A plain object has no equivalent —
  you have to count its keys with `Object.keys(obj).length`, which you met in Chapter 3.

        let scores = new Map();
        scores.set("alice", 10);
        scores.set(42, "the answer");

        console.log(scores.get("alice"));  // 10
        console.log(scores.size);          // 2


5) 
        let withDuplicates = [1, 2, 2, 3, 3, 3];
        let unique = [...new Set(withDuplicates)];

        console.log(unique);   // [1, 2, 3]

   It works in two steps. `new Set(withDuplicates)` builds a Set from the array, and because a
   Set only ever holds unique values, the repeats are dropped as it is built. Then the three
   dots — the spread operator from Chapter 3 — expand that Set back out into a new array.

   Without the spread you would be left holding a Set rather than an array, which is fine if
   that is what you wanted, but usually you want an array back.


6) You use an **object literal**, or a **class**.

        // one record
        let person = { name: "Alice", age: 30 };

        // many records of the same shape
        class Person {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
        }

        let alice = new Person("Alice", 30);

   Pick an object literal when you need one particular record. Pick a class when you will be
   making many things of the same shape, so that the shape is written down once instead of
   being repeated every time.


7) Because two of the things you work with constantly in JavaScript **are already trees**.

- The **DOM** — the structure of the web page itself, which Chapter 15 covers — is a tree.
  Every element has a parent, and may have children.
- **Nested JSON** coming back from an API is a tree too. An object holding objects holding
  arrays is a tree by another name.

   So the skill worth having is not building trees, but moving around inside one and finding
   what you need in it.


8) 
        let history = [];

        history.push("home");
        history.push("products");
        history.push("checkout");

        console.log(history.pop());   // "checkout" - go back
        console.log(history.pop());   // "products" - go back again
        console.log(history);         // ["home"]

   A stack is exactly right here, because "back" always means the most recent page, which is
   the last one added. That really is how the back button works.


9) 
        let jobs = [];

        jobs.push("print report");
        jobs.push("send email");
        jobs.push("update record");

        while (jobs.length > 0) {
            console.log("Processing: " + jobs.shift());
        }

   Output:

Processing: print report
Processing: send email
Processing: update record

   They come out in the order they went in, because `shift()` takes from the front while
   `push()` adds to the back. Swap `shift()` for `pop()` and you would process them backwards,
   which for a job queue would be quite wrong.


10) 
        class Node {
            constructor(data) {
                this.data = data;
                this.next = null;
            }
        }

        let first = new Node(10);
        first.next = new Node(20);
        first.next.next = new Node(30);

        let current = first;

        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }

  Output: 10, 20 and 30, each on its own line.

  The loop is the important part. We hold on to where we are in `current`, print it, then move
  `current` along to whatever it points at next. When we reach a node whose `next` is null,
  there is nowhere further to go and the loop stops. That is why we never needed to know how
  many nodes there were.


11) 
        const names = ["Ada", "Grace", "Ada", "Alan", "Grace", "Ada"];

        const unique = [...new Set(names)];

        console.log(unique);          // ["Ada", "Grace", "Alan"]
        console.log(unique.length);   // 3

  A Set does both jobs at once. Building one from the array removes the repeats, and you can
  either spread it back into an array as above, or ask the Set itself how many it holds:

        console.log(new Set(names).size);   // 3

  Notice the order is preserved: Ada, Grace, Alan appear in the order they were first seen.
  A Set will not hold duplicates, but it does remember the order things arrived in.
