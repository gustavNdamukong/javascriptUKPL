# QUIZ — Design Patterns

This page contains the Q & A (questions and answers) for this chapter — Chapter 12: Design Patterns. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 9 to 12 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) The patterns in this chapter fall into three groups. Name them, and say in a few words what
   each group is concerned with.

   Clue: one group is about making things, one about arranging things, and one about how things
   talk to each other.


2) What problem does the Singleton pattern solve, and why can JavaScript not implement it the
   way most other languages do?

   Clue: the usual approach relies on a kind of constructor JavaScript does not have.


3) What is the build() method for in the Builder pattern, and what is wrong with creating an
   object like this?

        const user = new User("John", 25, true, false, "admin");

   Clue: read that line and try to say out loud what the third and fourth arguments mean.


	4) What does the Factory pattern give you that calling `new Dog()` directly does not?

   Clue: think about who has to know the name of the class.


5) In the Proxy example, `image.display()` is called twice. What appears in the console, and why
   is that the whole point of the pattern?

   Clue: count how many times the word "Loading" appears.


6) What is the difference between the Facade pattern and the Adapter pattern? Both sit in front
   of something else.

   Clue: one hides complexity you do not want to deal with. The other translates between two
   things that do not fit together.


7) The Observer pattern is described as things "subscribing" to a subject. Where have you
   already met this idea in JavaScript, probably without knowing its name?

   Clue: you have been attaching one to a button since Chapter 1.


8) What does the Strategy pattern let you change, and when would you reach for it instead of a
   long if...else chain?

   Clue: the word "strategy" is doing real work here — think of several different ways to
   accomplish the same task.


9) EXERCISE. Write a Singleton called Logger, so that no matter how many times you create one,
   you always get the same object back. Prove it with ===.

   Clue: store the instance on the class itself, and hand it back if it already exists.


10) EXERCISE. Write a small Factory that returns a Circle, a Square, or throws an error for
  anything else. Each shape should have an area() method.

  Clue: a static method on the factory class is enough. It does not need to be instantiated.


11) EXERCISE. Using the Builder pattern, build a Pizza step by step — size, then two toppings —
  and finish with build(). Make the calls chain together on one line.

Clue: each setter has to return something for the next call to attach to.


12) EXERCISE. Write a Subject that keeps a list of observers and notifies them all. Add two
  observers that print different messages, then notify.

Clue: the subject holds an array; notifying means looping over it and calling the same
method on each.


## ANSWERS

1) 
- **Creational patterns** — concerned with how objects are made. Singleton, Factory, Abstract
  Factory, Builder, Prototype.
- **Structural patterns** — concerned with how objects are put together and arranged.
  Adapter, Decorator, Facade, Composite, Proxy, Bridge, Flyweight.
- **Behavioural patterns** — concerned with how objects communicate and share
  responsibilities. Observer, Strategy, Template Method, Command, Iterator.

   A rough way to remember it: creational is about birth, structural is about arrangement,
   behavioural is about conversation.


2) The Singleton makes sure a class has only **one** instance, and gives everyone the same one.
   It suits shared resources such as a database connection, an application's configuration, or
   a logger — things you want exactly one of.

   Most languages implement it with a **private constructor**, so that no outside code can call
   `new` at all, and a static method hands out the single instance. JavaScript has no private
   constructors, so that route is closed.

   What JavaScript does instead is check inside the constructor whether an instance already
   exists, and if so return that one:

        class DatabaseConnection {
            constructor() {
                if (DatabaseConnection.instance) {
                    return DatabaseConnection.instance;
                }

                DatabaseConnection.instance = this;
            }
        }

   Returning something from a constructor is unusual, but perfectly legal, and it is what makes
   the pattern work here.


3) `build()` is the finishing step of the Builder pattern. It hands back the completed object,
   and it is the natural place to check the object is valid before letting it out.

   What is wrong with that `new User(...)` line is that it is unreadable:

        const user = new User("John", 25, true, false, "admin");

   What is `true`? What is `false`? You cannot tell without opening the User class and counting
   the parameters. And the moment somebody swaps two of them by mistake, nothing complains —
   you simply get a user who is not an admin when they should be.

   The Builder pattern fixes it by naming each step:

        class UserBuilder {
            constructor(name) {
                this.user = { name };
            }

            setAge(age) {
                this.user.age = age;
                return this;
            }

            setAdmin(isAdmin) {
                this.user.isAdmin = isAdmin;
                return this;
            }

            build() {
                return this.user;
            }
        }

        const user = new UserBuilder("John")
            .setAge(25)
            .setAdmin(true)
            .build();

   Now every value says what it is. The `return this` in each setter is what allows the calls to
   be chained one after another — each one hands the builder back so the next can be called on
   it.


4) It means the code asking for the object **does not need to know the class name**.

        const animal = AnimalFactory.createAnimal("dog");

   The caller passes a string and gets back something that can `speak()`. It never mentions
   `Dog` at all. So if you later rename the class, split it in two, or decide that "dog" should
   return a `Puppy` on Tuesdays, you change the factory and nothing else.

   With `new Dog()` scattered through your program, every one of those places has to change.


5) The console shows:

Loading cat.png
Displaying cat.png
Displaying cat.png

   The word "Loading" appears **once**, even though `display()` was called twice. That is the
   whole point. The proxy holds off creating the real, expensive image until it is genuinely
   needed, and once it exists it is reused. The second call skips straight to displaying.

   This is why the pattern is useful for large images, heavy network calls, or anything else you
   would rather not do until you must — and never twice.


6) Both sit in front of something else, but for different reasons.

- **Facade** hides complexity. Behind it are several parts that all have to be used together,
  and the facade gives you one simple way in. The chapter's example is starting a computer:
  CPU, memory and hard drive all have to start, but you press one button.
- **Adapter** translates. It exists because two things that need to work together have
  incompatible shapes — an old interface and a new one, say — so the adapter converts between
  them.

   Put simply: a facade **simplifies** something that already works; an adapter **converts**
   something that otherwise would not fit.


7) In **event listeners**.

        button.addEventListener("click", handleClick);

   That is the Observer pattern exactly. The button is the subject, your function is the
   observer, and `addEventListener` is the subscription. When the click happens, everything that
   subscribed gets told.

   You have been using it since Chapter 1 without needing the name. That is worth noticing:
   patterns are mostly names for things good programmers already do.


8) The Strategy pattern lets you swap out **how** something is done, while what is being done
   stays the same. In the chapter's example, paying is always paying — but it might happen by
   PayPal or by credit card.

   You would reach for it instead of a long `if...else` chain when:

- the list of options is likely to grow, since adding a strategy means adding a class rather
  than editing a chain everybody depends on
- you want to choose the approach while the program is running
- the branches are big enough that the chain becomes hard to read

   For two or three short branches an `if...else` is perfectly fine. The pattern earns its place
   when there are many, or when they keep changing.


9) 
        class Logger {
            constructor() {
                if (Logger.instance) {
                    return Logger.instance;
                }

                this.messages = [];
                Logger.instance = this;
            }

            log(message) {
                this.messages.push(message);
                console.log(message);
            }
        }

        const logger1 = new Logger();
        const logger2 = new Logger();

        logger1.log("First message");
        logger2.log("Second message");

        console.log(logger1 === logger2);        // true
        console.log(logger1.messages.length);    // 2

   The last two lines are the proof. They are the same object, so the message logged through
   `logger2` is sitting in `logger1`'s list as well.


10) 
        class Circle {
            constructor(radius) {
                this.radius = radius;
            }

            area() {
                return Math.PI * this.radius * this.radius;
            }
        }

        class Square {
            constructor(side) {
                this.side = side;
            }

            area() {
                return this.side * this.side;
            }
        }

        class ShapeFactory {
            static createShape(type, size) {
                if (type === "circle") {
                    return new Circle(size);
                } else if (type === "square") {
                    return new Square(size);
                }

                throw new Error("Unknown shape type");
            }
        }

        const c = ShapeFactory.createShape("circle", 2);
        const s = ShapeFactory.createShape("square", 3);

        console.log(c.area().toFixed(2));   // 12.57
        console.log(s.area());              // 9

   `static` means the method belongs to the class itself, so you call it as
   `ShapeFactory.createShape(...)` without ever making a ShapeFactory object. There would be no
   point making one, since the factory holds no data of its own.


11) 
        class PizzaBuilder {
            constructor() {
                this.pizza = { toppings: [] };
            }

            setSize(size) {
                this.pizza.size = size;
                return this;
            }

            addTopping(topping) {
                this.pizza.toppings.push(topping);
                return this;
            }

            build() {
                return this.pizza;
            }
        }

        const pizza = new PizzaBuilder()
            .setSize("large")
            .addTopping("cheese")
            .addTopping("mushrooms")
            .build();

        console.log(pizza);
        // { toppings: [ 'cheese',
        // 'mushrooms' ], size: 'large' }

The chaining works because every setter ends with `return this`. Each call hands the builder
straight back, so the next call has something to attach to. Take one `return this` out and
the chain breaks at that point with "Cannot read properties of undefined".


12) 
        class Subject {
            constructor() {
                this.observers = [];
            }

            addObserver(observer) {
                this.observers.push(observer);
            }

            notify() {
                this.observers.forEach(observer => observer.update());
            }
        }

        class EmailObserver {
            update() {
                console.log("Email sent");
            }
        }

        class LogObserver {
            update() {
                console.log("Written to the log");
            }
        }

        const subject = new Subject();

        subject.addObserver(new EmailObserver());
        subject.addObserver(new LogObserver());

        subject.notify();

  Output:

Email sent
Written to the log

  Notice that the subject knows nothing about what its observers actually do. It only knows
  they each have an `update()` method. That is what makes the pattern useful: you can add a
  third observer tomorrow without touching the Subject class at all.
