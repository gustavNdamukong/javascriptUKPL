# QUIZ — Chapter 19: Forms and Email

This page contains the Q & A (questions and answers) for this chapter — Chapter 19: Forms and
Email. Work through these after reading the chapter, while the material is fresh — recall
practice is what cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 8 to 11 are proper exercises where you write and run real code. The answers
are all together in the Answers section further down, numbered to match the questions.


## QUESTIONS

1) Name the three ways of getting data out of a form, and say when each is the right choice.

   Clue: one picks fields off one at a time, one gets the whole set, and one is built for
   sending to a server.


2) Two of the three approaches find fields by one attribute, and the third uses a different one.
   Which is which, and what happens to a field that lacks it?

   Clue: the odd one out is FormData.


3) Why does `e.preventDefault()` appear at the top of every form-submit handler in this chapter?

   Clue: without it you never get to see your own code work.


4) You have `<input type="file" id="myFile">`. What is wrong with reading `fileInput.value`, and
   what should you use instead?

   Clue: what you get back is a path, and not even a real one.


5) Does `.files` give you a `File` or a `FileList`? Does the answer change when the field has the
   `multiple` attribute?

   Clue: this is a trick question, and the trick is in the second half.


6) A form has two checkboxes with the same `name`. What does `formData.get()` return, and what
   should you use instead? What type comes back?

   Clue: watch the capital letter in the method name.


7) A field on your form has the `disabled` attribute. What does `formData.get()` give you for
   it, and why does that matter?

   Clue: it is not an empty string.


8) EXERCISE. Write a submit handler that stops the page reloading and prints the values of a
   `username` and an `email` field, using FormData.

   Clue: the form is `e.target`.


9) EXERCISE. Given a form with three checkboxes named `fruits`, of which two are checked, print
   all the checked values as an array.

   Clue: question 6 gives you the method.


10) EXERCISE. Using the `elements` property, get a form's `username` field and print its value —
  then print the same value using `getElementById`, to show they agree.

  Clue: `elements` is keyed by the name attribute, `getElementById` by the id.


11) EXERCISE. Write the check that runs only when a file really was chosen, and prints its name,
  type and size.

    Clue: `get()` on an empty file field does not return `undefined`.


## ANSWERS

1) 
- **Picking fields off individually** with `getElementById()` or `querySelector()`, then
  reading `.value`. Fine for a small form with two or three fields. Tedious and fragile for
  anything bigger, and awkward if fields are added dynamically.
- **The `elements` property** of the form. `form.elements` gives you every control in the
  form in one collection, so you are not writing a selector per field. Good when the form is
  large or its fields change.
- **The `FormData` object**. Built for the job of gathering everything up, and the one to
  reach for when you are sending the data to a server, because `fetch()` will take a
  `FormData` object directly.

   All three can handle file fields equally well.


2) `getElementById()` uses the **id** attribute. `form.elements` and `FormData` both use the
- *name** attribute.

    form.elements.username        // by name
    formData.get("username")      // by name

   A field with **no `name`** is ignored by `FormData` entirely — it simply will not appear.
   That is a quiet source of "why is my value missing?", because the field looks perfectly
   normal on the page and may well have an id.

   So: id for CSS and for grabbing one element; name for anything that submits.


3) Because submitting a form **reloads the page by default**. That is the browser's original
   behaviour, from long before JavaScript: gather the fields, send them off, load whatever comes
   back.

   If you let that happen, your page reloads the instant the user clicks Submit and your handler
   never gets to finish. `e.preventDefault()` tells the browser "I am handling this myself,
   don't do your usual thing."

        form.addEventListener("submit", function (e) {
            e.preventDefault();   // stop the reload first
            // ...now do the work
        });


4) `fileInput.value` gives you a **path string**, not the file. And it is not even a real path —
   browsers deliberately fake it (you will typically see something like
   `C:\fakepath\holiday.jpg`) so that a web page cannot learn how your folders are laid out.

   What you want is the `.files` property:

        let fileInput = document.getElementById("myFile");
        let file = fileInput.files[0];

   That gives you a real `File` object, with `.name`, `.type` and `.size`, which you can hand
   straight to a `FileReader`.


5) `.files` **always** gives you a `FileList` — and no, the `multiple` attribute does not change
   that.

        // both of these are FileList
        document.getElementById("one").files
        document.getElementById("many").files

   A `FileList` is a list even when it is holding a single item. What `multiple` changes is only
   how many items the list is allowed to contain.

   The `File` object is what you get by reaching into the list:

        let file = fileInput.files[0];      // a File
        let count = fileInput.files.length; // how many were chosen


6) `formData.get("fruits")` returns **only the first checked value**. To get them all, use
   `getAll()`:

        formData.getAll("fruits");   // ['apple', 'banana']

   Two things to note. The capital **A** matters — `getall()` does not exist, and JavaScript is
   case-sensitive, so you would get `TypeError: formData.getall is not a function`.

   And what comes back is an **ordinary array**, not a special collection. That is convenient:
   you can go straight to `.map()`, `.filter()` or `.length` without converting anything.

   The same applies to a file field with `multiple` — `getAll("photos")` gives you an array of
   `File` objects.


7) It gives you **`null`**.

        <input type="text" name="age" value="30" disabled />

        formData.get("age");   // null

   A disabled field is not included in `FormData` at all, so asking for it is like asking for a
   field that was never there.

   It matters because `null` is not an empty string. If your code does
   `formData.get("age").trim()` you get `TypeError: Cannot read properties of null` — and the
   cause is a `disabled` attribute somewhere in your HTML, which is not where most people look
   first.


8) 
        document.getElementById("myForm")
            .addEventListener("submit", function (e) {
                e.preventDefault();

                const formData = new FormData(e.target);

                const username = formData.get("username");
                const email = formData.get("email");

                console.log("Username:", username);
                console.log("Email:", email);
            });

  `e.target` is the form itself, because the form is the element the submit event happened on.
  That is why it can be passed straight to `new FormData(...)` without selecting the form
  again.


9) 
        const form = document.getElementById("myForm");
        const formData = new FormData(form);

        const chosen = formData.getAll("fruits");

        console.log(chosen);          // ['apple', 'cherry']
        console.log(chosen.length);   // 2

  Only the **checked** boxes appear. Unchecked checkboxes are not submitted at all — which is
  another way of saying they behave rather like disabled fields, in that asking for them gives
  you nothing back rather than `false`.


10) 
        const form = document.getElementById("myForm");

        // by name, through the form's elements collection
        const byName = form.elements.username.value;

        // by id, the direct way
        const byId = document.getElementById("username").value;

        console.log(byName);          // "JohnDoe"
        console.log(byId);            // "JohnDoe"
        console.log(byName === byId); // true

  Both reach the same input; they just arrive by different routes. `form.elements` is keyed by
  the **name** attribute, `getElementById` by the **id**. In the chapter's example form the
  field happens to have both, and they happen to match — but there is no rule that says they
  must, and mixing them up is a common source of confusion.

  You can also reach fields by position: `form.elements[0]`.


11) 
        const file = formData.get("myFile");

        if (file && file.name) {
            console.log("File name:", file.name);
            console.log("File type:", file.type);
            console.log("File size:", file.size, "bytes");
        } else {
            console.log("No file selected.");
        }

  The check is worth understanding rather than copying. When no file has been chosen,
  `formData.get()` on a file field does not give you `undefined` — it gives you an **empty
  File object**, whose `name` is an empty string. An empty File is still an object, and every
  object is truthy, so `if (file)` on its own would pass and you would go on to read a file
  that is not there.

  Testing `file.name` as well is what makes the check reliable.
