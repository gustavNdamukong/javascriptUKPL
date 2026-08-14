QUIZ — Chapter 25: Events Handling
==================================

This page contains the Q & A (questions and answers) for this chapter — Chapter 25: Events Handling. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.


1) What is event bubbling?

    Event bubbling is how events move up the DOM tree.

    When you click a child element, the event:

    Runs on the child
    Then its parent
    Then its parent’s parent… up to document
    <div id="parent">
    <button id="child">Click me</button>
    </div>
    document.getElementById("child").addEventListener("click", () => {
    console.log("Child clicked");
    });

    document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent clicked");
    });

    Clicking button prints:

    Child clicked
    Parent clicked

    🧠 Stop bubbling:

    event.stopPropagation();
