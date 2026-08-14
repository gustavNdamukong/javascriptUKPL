QUIZ — Chapter 17: OOP
======================

This page contains the Q & A (questions and answers) for this chapter — Chapter 17: OOP. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

This chapter carries more ideas than any other in the book, so the quiz is a long one. Try every
question before you look below. Each one carries a clue. Questions 12 to 16 are proper exercises
where you write and run real code. The answers are all together in the Answers section further
down, numbered to match the questions.


QUESTIONS
—————————

1) Two different things in JavaScript are called "prototype". What are they, and which kind of
   thing has each one?

   Clue: one is a property you can see and only one kind of value has it. The other is a link
   that everything has.


2) Given `function Person() {}` and `let p = new Person();` — what is `p`'s prototype? Write down
   the full chain from `p` to the end.

   Clue: it is not `Person` itself, and the chain always finishes at the same value.


3) What does this print, and why?

        console.log(({}).prototype);

   Clue: see question 1. This is the quickest way to prove the point.


4) A method is passed to `setTimeout()` and suddenly `this` is not what you expected. Explain
   why, and name three ways to fix it.

   Clue: the function arrives without the object it belongs to.


5) What is the difference between `call()`, `apply()` and `bind()`?

   Clue: two of them run the function immediately. Of those two, only one thing separates them.


6) `Object.freeze()` stops an object being changed. What happens if you try to change one
   anyway?

   Clue: the answer depends on strict mode, and one of the two possibilities is nastier than the
   other.


7) In destructuring, what is the difference between these two lines?

        let { msg: greeting } = obj;
        let { msg = greeting } = obj;

   Clue: one is about a name, the other is about a missing value.


8) `rex` is created from `class Dog extends Animal`. What do these three give you?

        rex instanceof Dog
        rex instanceof Animal
        Dog instanceof Animal

   Clue: two of them agree and the third is the interesting one.


9) A static method is defined on a class. Can an instance of the class use it? Can a child class
   use it?

   Clue: the answers are different, and that is the whole point of the question.


10) Why does this fail, and what is the fix?

        {
            let name = "John Bands";
            let age = 40
        }

        export {name, age};

    Clue: think about scope, and about what the braces in `export { ... }` actually mean.


11) What kind of error do you get from reading a `#private` field outside its class, and why is
    that stricter than it first appears?

    Clue: it happens earlier than you would think.


12) EXERCISE. Write a `Person` constructor function taking a name, add a `greet()` method to its
    prototype after the fact, then create two people and prove they both have it.

    Clue: add the method to the mould, not to each object.


13) EXERCISE. Prove in code that a method added to `Person.prototype` is not an own property of
    the instance.

    Clue: one method name from `Object.prototype` answers this directly.


14) EXERCISE. Write `Animal` with a `speak()` method, and `Dog extends Animal` whose constructor
    also takes a breed. Call the parent constructor properly and override `speak()`.

    Clue: one keyword does both jobs, in two different forms.


15) EXERCISE. Take `{ name: 'Ada', age: 36 }`, convert it to JSON, print it, convert it back, and
    print the name.

    Clue: two methods, both starting with JSON.


16) EXERCISE. Destructure `{ msg: 'Hello' }` into three variables — `msg`, `title` and `footer` —
    where the two missing ones fall back to sensible defaults.

    Clue: question 7 tells you which character you need.


ANSWERS
———————

1) **`.prototype`** — a real, visible property that **only functions have**. It holds the object
   that instances made from that function will inherit from.

   **`__proto__`** — the internal link that **every object has**, pointing at the object it
   actually inherits from. Its proper name in the specification is `[[Prototype]]`, and modern
   browser consoles display it that way.

   They are not two kinds of the same thing. They are two ends of one relationship:

        person1.__proto__ === Person.prototype   // true

   A function owns a mould. An object remembers which mould it came from.


2) `p`'s prototype is **`Person.prototype`** — not `Person` itself. The full chain:

        p  →  Person.prototype  →  Object.prototype  →  null

   You can walk it:

        Object.getPrototypeOf(p) === Person.prototype;               // true
        Object.getPrototypeOf(Person.prototype) === Object.prototype; // true
        Object.getPrototypeOf(Object.prototype);                      // null

   Every chain ends at `null`. That is how JavaScript knows to stop looking.


3) It prints **`undefined`**.

   Ordinary objects do not have a `.prototype` property at all — only functions do. If you want
   an object's prototype you have to ask for it the other way:

        Object.getPrototypeOf({});   // Object.prototype

   Getting this the wrong way round is the single most common confusion in JavaScript objects,
   which is why it is worth being able to prove it in one line.


4) Because the method was **separated from the object it belongs to**. `setTimeout()` receives
   the function on its own and calls it with no owner, so `this` is no longer `person`. In strict
   mode it becomes `undefined`; in non-strict mode it falls back to the global object. Either
   way, `this.name` is not what you wanted.

   The three fixes all amount to the same idea — send the owner along with the function:

        // 1. wrap it, so the owner is named again at call time
        setTimeout(function () { person.getName(); }, 1000);

        // 2. bind it, which returns a NEW function with this fixed
        let f = person.getName.bind(person);
        setTimeout(f, 1000);

        // 3. call or apply it, which run it straight away
        person.getName.call(person);


5) **`call()` and `apply()` run the function immediately.** The only difference between those two
   is how you hand over the arguments:

        car.multiply.call(bike, 2, 2);      // a list of arguments
        car.multiply.apply(bike, [2, 2]);   // an array of arguments

   **`bind()` does not run anything.** It returns a *new* function with `this` already fixed, for
   you to call whenever you like:

        let multiply = car.multiply.bind(bike, 2, 2);
        multiply();   // 4 - runs now

   A way to remember it: call and apply are verbs you do to the function now; bind is a
   preparation for later.


6) **In non-strict code it fails silently.** No error, nothing in the console — the line simply
   has no effect:

        let car = { brand: 'Toyota', model: 'Corolla' };
        Object.freeze(car);
        car.model = 'Camry';
        console.log(car.model);   // still 'Corolla'

   **In strict mode the same line throws a `TypeError`.**

   The silent version is the nastier of the two, because there is nothing to tell you what
   happened. If an assignment seems to be ignored for no reason, a frozen object is worth
   checking.

   Note that freezing also blocks *adding* and *deleting*, not just changing. `Object.seal()` is
   the gentler one: existing properties can still be changed, but nothing may be added or
   removed.


7) 
        let { msg: greeting } = obj;   // RENAME
        let { msg = greeting } = obj;  // DEFAULT

   The **colon renames**: take the value of `obj.msg` and put it in a variable called `greeting`.

   The **equals sign supplies a fallback**: put `obj.msg` in a variable called `msg`, but if
   `obj.msg` is missing, use `greeting` instead.

   This trips people up because everywhere *else* in an object a colon separates a key from its
   value. Inside destructuring it does not. You can use both together, and they read in that
   order — rename first, then default:

        let { msg: greeting = "No message" } = obj;


8) 
        rex instanceof Dog      // true
        rex instanceof Animal   // true
        Dog instanceof Animal   // false

   The first two are true because `rex` really was made from `Dog`, and `Dog` extends `Animal`,
   so `Animal.prototype` is in `rex`'s chain as well.

   The third is the interesting one. `Dog` is a **class** — a blueprint. It was never made *from*
   `Animal` with `new`; it merely extends it. `instanceof` asks "was this thing built from that
   blueprint?", and a blueprint is not a thing built from a blueprint.

   That is the difference between a child class and an instance in one line.


9) **An instance cannot use it. A child class can.**

        class MathHelper {
            static add(a, b) { return a + b; }
        }

        MathHelper.add(5, 3);          // 8  - on the class, fine

        let obj = new MathHelper();
        obj.add(3, 3);                 // TypeError: obj.add is not a function

        class ChildHelper extends MathHelper {}
        ChildHelper.add(5, 3);         // 8  - the child class inherits it
        new ChildHelper().add;         // undefined - but its instances do not

   So the dividing line is not parent versus child. It is **class versus instance**. Statics
   travel down the class line and never appear on the objects made from those classes.


10) It fails with **`SyntaxError: Export 'age' is not defined in module`**.

    Two things are going on, and the second is the important one.

    First, the braces in `export { ... }` are **not a block of code**. They are a *list of names*
    you are handing out. That is why declarations never go inside them.

    Second — and this is why the code above fails — a pair of braces creates a **block**, and
    `let` and `const` are block-scoped. So `name` and `age` exist only inside those braces and
    are gone by the time the `export` line runs. There is nothing left to export.

    The fix is to drop the block entirely:

        let name = "John Bands";
        let age = 40;

        export {name, age};


11) You get a **`SyntaxError`**:

        SyntaxError: Private field '#privateAge' must be declared in an enclosing class

    It is stricter than it looks because a SyntaxError happens when JavaScript *reads* your file,
    before a single line has run. So this is not a value coming back as `undefined`, and not an
    error thrown when execution reaches that line — **the whole script fails to start**.

    That is what makes `#` fields genuinely private. The old convention of naming something
    `_age` to signal "please do not touch" relies on everyone being polite. A `#` field is
    enforced by the language.


12) 
        function Person(name) {
            this.name = name;
        }

        // add the method to the MOULD, after the fact
        Person.prototype.greet = function () {
            return "Hello, " + this.name;
        };

        let p1 = new Person("Tom");
        let p2 = new Person("John");

        console.log(p1.greet());   // "Hello, Tom"
        console.log(p2.greet());   // "Hello, John"

    Both objects get the method even though it was added after they were created. That is the
    power of the prototype: they do not each hold a copy, they all look up the same one.


13) 
        console.log(p1.greet);                        // function - it can use it
        console.log(p1.hasOwnProperty("greet"));      // false - but it does not own it
        console.log(Person.prototype.hasOwnProperty("greet"));  // true - the mould owns it

    `hasOwnProperty()` asks only about the object itself, ignoring everything up the chain. So
    this is the tool for telling "this object has it" apart from "this object can reach it".

    The same is true of class methods, which is worth knowing: `class Dog { speak() {} }` puts
    `speak` on `Dog.prototype`, not on each dog.


14) 
        class Animal {
            constructor(name) {
                this.name = name;
            }

            speak() {
                return this.name + " makes a noise.";
            }
        }

        class Dog extends Animal {
            constructor(name, breed) {
                // pass what the parent constructor needs
                super(name);
                this.breed = breed;
            }

            speak() {
                return this.name + " barks.";
            }
        }

        let rex = new Dog("Rex", "Alsatian");

        console.log(rex.speak());   // "Rex barks."
        console.log(rex.breed);     // "Alsatian"

    The one keyword doing two jobs is `super`. As `super(...)` it calls the parent's
    **constructor**; as `super.speak()` it calls the parent's **method**.

    `super(name)` must run before you touch `this` — reaching for `this` first throws a
    `ReferenceError`. In practice, put it on the first line.


15) 
        let person = { name: 'Ada', age: 36 };

        let json = JSON.stringify(person);
        console.log(json);              // {"name":"Ada","age":36}

        let back = JSON.parse(json);
        console.log(back.name);         // Ada

    Note what JSON gives you back is a **new** object, not the original one. And remember what
    does not survive the trip: functions and `undefined` values are dropped entirely, and a
    `Date` comes back as a string rather than as a Date.


16) 
        let obj = { msg: 'Hello' };

        let {
            msg = "No message",
            title = "No title",
            footer = "No footer"
        } = obj;

        console.log(msg);      // "Hello"    - present, so kept
        console.log(title);    // "No title"  - missing, so defaulted
        console.log(footer);   // "No footer" - missing, so defaulted

    The equals sign is what you need, as question 7 established. Reach for a colon here and you
    get `SyntaxError: Invalid destructuring assignment target`, because a colon expects a
    variable name on its right, not a value.
