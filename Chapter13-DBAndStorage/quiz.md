# QUIZ — Chapter 13: Databases and Storage

This page contains the Q & A (questions and answers) for this chapter — Chapter 13: Databases and Storage. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 8 to 10 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) Name the three ways of storing data in the visitor's browser covered in this chapter, and
   give the one thing that most distinguishes each from the other two.

   Clue: one survives everything, one dies with the tab, and one gets posted to the server
   whether you like it or not.


2) You want to remember a visitor's chosen theme, dark or light, so it is still there when they
   come back next week. Which of the three would you use, and why not the other two?

   Clue: next week is a long time. And the server does not need to know.


3) Which of the three is sent to the server with every request, and why is that both its
   greatest strength and its main cost?

   Clue: think about what has to travel with every single image, script and page your site
   loads.


4) localStorage and sessionStorage both offer four methods with the same names. Name them and
   say what each does.

   Clue: get, set, remove, and one that clears the lot.


5) Why can JavaScript running in a browser not talk directly to a database, and what has to sit
   in between?

   Clue: the answer is about security, and about where databases actually live.


6) Read this SQL query and say in plain English what it asks for:

        SELECT * FROM products WHERE category = 'books'

   Clue: three of the four words do most of the work — one picks, one says where from, and one
   narrows it down.


7) None of the three storage types is a safe place for sensitive data. Why not?

   Clue: think about whose computer the data is sitting on.


8) EXERCISE. Save a visitor's theme preference to localStorage, read it back, and print it.
   Then delete it and show that it has gone.

   Clue: you need three of the four methods from question 4.


9) EXERCISE. localStorage can only hold text. Save an array of three to-do objects, then read
   it back as a real array and print the second one's name.

   Clue: two methods with JSON in the name — one on the way in, one on the way out.


10) EXERCISE. Write a small helper called remember(key, value) that saves to localStorage, and
  recall(key) that reads it back, returning null if nothing was stored under that key.

  Clue: getItem already returns null when it finds nothing, which does half the job for you.


## ANSWERS

1) **localStorage** — stays until you delete it. Closing the browser makes no difference.

- *sessionStorage** — wiped the moment the tab is closed.

- *Cookies** — you set the expiry yourself, and they are sent to the server automatically
   with every request.

   The clearest way to separate them is by how long the data lives and who can see it.
   localStorage and sessionStorage never leave the browser. Cookies do.


2) **localStorage.**

   Not sessionStorage, because that is emptied as soon as the tab closes, so it would be gone
   long before next week.

   Not a cookie, because the server has no need to know which theme they picked. Sending that
   choice to the server with every single request would be waste, and cookies are limited to
   about 4KB in any case.

        localStorage.setItem("theme", "dark");


3) **Cookies.**

   The strength is that the server sees them without you doing anything. That is exactly what
   you want for a login token: the server can tell who is asking on every request, without the
   page having to attach it each time.

   The cost is that "every request" means *every* request — every image, every stylesheet,
   every script, not just page loads. A large cookie is therefore paid for many times over on
   every visit. That is part of why the 4KB limit exists.


4)
| setItem(key, value) | // store something |
|---|---|
| getItem(key) | // read it back, or null if there is nothing |
| removeItem(key) | // delete one item |
| clear() | // delete everything for this site |

   Both storage types offer all four with identical names, which is why you can swap one for
   the other by changing a single word.


5) Because **databases live on servers, not in browsers**, and because letting the browser
   connect directly would be a serious security hole. Anything the browser can do, a visitor
   can do — they could read the connection details out of your JavaScript and then help
   themselves to the whole database.

   What sits in between is **server-side code**, written with something like Node.js, PHP or
   Go. The browser sends an HTTP request to that backend, the backend talks to the database,
   and it sends the results back.

   So the chain is: browser → API → server code → database, and back again.


6) "Get me every column, from the products table, for the rows whose category is 'books'."

   Word by word:

- `SELECT` means "get data"
- `*` is a wildcard meaning "all columns"
- `FROM products` says which table to look in
- `WHERE category = 'books'` narrows it to just the rows that match

   SQL is deliberately readable, which is one of the reasons it has lasted since the 1970s.


7) Because all three sit **on the visitor's own computer**, in their own browser. The visitor
   can open the developer tools and read every one of them in a few seconds. So can any script
   running on the page, which is what makes cross-site scripting attacks so damaging.

   Never put passwords, card details or anything private in any of the three. Store a token
   that the server can check instead, and keep the sensitive data on the server.


8) 
        // save it
        localStorage.setItem("theme", "dark");

        // read it back
        console.log(localStorage.getItem("theme"));    // "dark"

        // delete it
        localStorage.removeItem("theme");

        console.log(localStorage.getItem("theme"));    // null

   Notice that reading a key which is not there gives you `null`, not an error and not
   undefined. That is useful, because it means you can check for it directly:

        if (localStorage.getItem("theme") === null) {
            // nothing saved yet, use the default
        }


9) 
        const todos = [
            { id: 1, name: "Buy milk" },
            { id: 2, name: "Walk the dog" },
            { id: 3, name: "Write chapter 13" }
        ];

        // On the way in: turn the array into text
        localStorage.setItem("todos", JSON.stringify(todos));

        // On the way out: turn the text back into an array
        const stored = JSON.parse(localStorage.getItem("todos"));

        console.log(stored[1].name);   // "Walk the dog"

   This is the single most important thing to know about localStorage: **it stores text and
   nothing else.** Hand it an array or an object without `JSON.stringify()` and it will store
   the string "[object Object]", which is of no use to anybody.

   `JSON.stringify()` on the way in, `JSON.parse()` on the way out. Always both.


10) 
        function remember(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        function recall(key) {
            const stored = localStorage.getItem(key);

            if (stored === null) {
                return null;
            }

            return JSON.parse(stored);
        }

        remember("user", { name: "Alice", theme: "dark" });

        console.log(recall("user").name);    // "Alice"
        console.log(recall("nothingHere"));  // null

    The null check matters. `JSON.parse(null)` happens to return null without complaining, so
    this one would survive without the check — but `JSON.parse()` throws a SyntaxError on most
    other rubbish it is given, so checking first is the habit worth having.

  Using `JSON.stringify()` on everything, even plain text, keeps the pair symmetrical: whatever
  you put in through remember() comes back out of recall() as the same type it went in as.
