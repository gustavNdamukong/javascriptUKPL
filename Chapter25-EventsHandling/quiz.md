QUIZ — Chapter 25: Events Handling
==================================

This page contains the Q & A (questions and answers) for this chapter — Chapter 25: Events
Handling. Work through these after reading the chapter, while the material is fresh — recall
practice is what cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 8 to 11 are proper exercises where you write and run real code. The answers
are all together in the Answers section further down, numbered to match the questions.


QUESTIONS
—————————

1) There are two ways to attach an event handler to an element. Name both, and say which you
   should prefer and why.

   Clue: one lives in your HTML, the other in your JavaScript.


2) What is event bubbling, and what is event capturing?

   Clue: same journey, opposite directions.


3) How do you make a listener run during the capture phase instead?

   Clue: `addEventListener` takes a third argument you have probably never used.


4) A parent has a capturing listener and a child has an ordinary one. You click the child. Which
   handler runs first?

   Clue: think about which direction the capture phase travels.


5) What is event delegation, and why does it depend on bubbling?

   Clue: one listener instead of fifty — and it keeps working for elements that do not exist yet.


6) Inside a handler, what is the difference between `e.target` and `e.currentTarget`?

   Clue: with delegation these are usually two different elements.


7) What does `e.stopPropagation()` do, and how is it different from `e.preventDefault()`?

   Clue: one stops the journey, the other stops the browser's own reaction.


8) EXERCISE. Attach a click listener to a button that prints the button's id, using
   `addEventListener`.

   Clue: the event object knows which element was clicked.


9) EXERCISE. Prove the bubbling order: put a listener on a parent and on a child, click the
   child, and print the order they fire in.

   Clue: no third argument on either.


10) EXERCISE. Now make the parent's listener capture instead, and show that the order reverses.

    Clue: one word changes.


11) EXERCISE. Use event delegation: put a single listener on a `<ul>` that reports which `<li>`
    was clicked — and show it still works for an `<li>` added afterwards.

    Clue: question 6 tells you which property identifies the actual item.


ANSWERS
———————

1) The two ways are:

   - **The inline HTML attribute**:

            <button onclick="myFunction(event)">Click me</button>

   - **`addEventListener()` in JavaScript**:

            button.addEventListener("click", myFunction);

   **Prefer `addEventListener()`.** Three reasons:

   - It keeps your JavaScript out of your HTML, so the markup stays about structure and the
     script stays about behaviour.
   - You can attach **several** listeners for the same event on the same element. An `onclick`
     attribute can only hold one thing; adding a second replaces the first.
   - You can remove a listener again with `removeEventListener()`.

   Inline handlers are still worth recognising, because you will meet them in older code.


2) They are the same journey through the same elements, travelling in opposite directions.

   - **Bubbling** starts at the **target** — the element actually clicked — and travels **upward**
     through its parents to `document`. This is the default.
   - **Capturing** starts at the **root** and travels **downward** through the parents until it
     reaches the target.

   Every click actually does both: the browser runs the capture phase down, reaches the target,
   then bubbles back up. Which of your handlers fires when depends on which phase each one
   registered for.


3) Pass `true` as the third argument to `addEventListener()`:

        element.addEventListener("click", myFunction, true);

   That third argument defaults to `false`, which is why bubbling is what you get when you do
   nothing. You may also see it written as an options object, which reads more clearly:

        element.addEventListener("click", myFunction, { capture: true });

   Both mean the same thing.


4) **The parent's capturing handler runs first**, then the child's.

   That surprises people, because the parent is "further away" from the click. But capturing
   travels **downward from the root**, so the parent is reached on the way *to* the target:

        document → #parentDiv (capturing handler fires) → #item1 (target, its handler fires)

   If the parent's listener had been an ordinary one, the order would be the other way round —
   child first, then parent on the way back up.


5) **Event delegation** is putting one listener on a **parent** and using it to handle events
   from any of its children, instead of attaching a listener to each child individually.

        list.addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                console.log("You clicked:", e.target.textContent);
            }
        });

   It depends on bubbling because that is what carries the event **up** from the clicked child to
   the parent where your listener is waiting. With no bubbling, the parent would never hear about
   it.

   Two reasons it is worth knowing. It is far cheaper than fifty listeners on fifty items. And
   more importantly, it **keeps working for elements added later** — a new `<li>` needs no
   listener of its own, because the one on the parent was never about any particular child.


6) 
   - **`e.target`** is the element the event actually **happened on** — the thing the user
     clicked.
   - **`e.currentTarget`** is the element whose **listener is currently running** — the one you
     called `addEventListener` on.

   When you put a listener directly on a button and click it, these are the same element, which
   is why the difference is easy to miss.

   With delegation they differ, and that difference is the whole point:

        list.addEventListener("click", function (e) {
            console.log(e.target);         // the <li> you clicked
            console.log(e.currentTarget);  // the <ul> holding the listener
        });


7) 
   - **`e.stopPropagation()`** stops the event travelling any further through the DOM. Handlers
     on parents (or on children, if capturing) will not run. It affects **your other handlers**.
   - **`e.preventDefault()`** stops the **browser's own default reaction** — a link navigating, a
     form submitting, a checkbox ticking. It does not stop the event moving through the DOM at
     all.

   They solve different problems and are not interchangeable:

        form.addEventListener("submit", function (e) {
            e.preventDefault();     // do not reload the page
        });

        button.addEventListener("click", function (e) {
            e.stopPropagation();    // do not let the parent hear this
        });

   A common mistake is reaching for `stopPropagation()` when a form keeps reloading. That will
   not help — the reload is the browser's default behaviour, so `preventDefault()` is what you
   need.


8) 
        <button id="myButton" class="btn btn-primary">Click me</button>

        document.getElementById("myButton")
            .addEventListener("click", function (e) {
                console.log("ID is: " + e.target.id);   // ID is: myButton
            });

   The handler receives the **event object** as its first parameter — usually called `e` or
   `event` — and `e.target` is the element the click landed on.


9) 
        <div id="parent">
            <button id="child">Click me</button>
        </div>

        document.getElementById("child").addEventListener("click", () => {
            console.log("Child clicked");
        });

        document.getElementById("parent").addEventListener("click", () => {
            console.log("Parent clicked");
        });

   Output when you click the button:

        Child clicked
        Parent clicked

   The child fires first, then the event bubbles up to the parent. Neither listener passed a
   third argument, so both are bubbling-phase listeners.


10) 
        document.getElementById("parent").addEventListener("click", () => {
            console.log("Parent clicked");
        }, true);            // <- the only change

        document.getElementById("child").addEventListener("click", () => {
            console.log("Child clicked");
        });

    Output:

        Parent clicked
        Child clicked

    Exactly reversed, from adding one word. The parent is now listening on the way **down**, so
    it hears the click before the click has even reached the button.


11) 
        <ul id="list">
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>

        const list = document.getElementById("list");

        // ONE listener, on the parent
        list.addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                console.log("You clicked:", e.target.textContent);
            }
        });

        // now add a third item, AFTER the listener was set up
        const newItem = document.createElement("li");
        newItem.textContent = "Item 3";
        list.appendChild(newItem);

    Clicking any of the three — including the one added afterwards — prints its text.

    That last part is the real reward. If you had attached a listener to each `<li>` in a loop,
    "Item 3" would have been dead on arrival, because the loop ran before it existed. The
    delegated listener never knew about individual items in the first place, so a new one needs
    no special treatment.

    The `if (e.target.tagName === "LI")` check matters: clicks on padding inside the `<ul>` also
    reach the listener, and without the check you would report those too.
