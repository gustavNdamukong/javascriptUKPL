# QUIZ — Cookies

This page contains the Q & A (questions and answers) for this chapter — Chapter 8: Cookies. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 6 to 8 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) What is a cookie, and name two things websites commonly use them for.

   Clue: the key word is "remember" — something has to survive from one visit to the next.


2) The HttpOnly flag and the Secure flag are often mentioned in the same breath, but they do
   two different jobs. What does each one do?

   Clue: one is about who can read the cookie. The other is about how it travels.


3) You have set three cookies. What does this print, and what separates one cookie from the
   next in the result?

        console.log(document.cookie);

   Clue: you get them all back as one single piece of text, not as a list.


4) How do you delete a cookie? There is no deleteCookie() built into JavaScript, so what is the
   trick?

   Clue: you do not remove it so much as convince the browser it is already past its bedtime.


5) What is wrong with this line, and what would the cookie actually end up containing?

        document.cookie = `username=JohnDoe; expires=$
            {expiryDate.toUTCString()}; path=/`;

   Clue: look very closely at the two characters that should be sitting next to each other.


6) EXERCISE. Set a cookie called theme with the value dark, which expires 7 days from now, and
   is available across the whole site.

   Clue: work the date out with the Date object rather than typing one in by hand — start from
   today and add 7 to it.


7) EXERCISE. Write a function called getCookie(name) that returns the value of a single cookie
   by its name, or null if there is no such cookie.

   Clue: document.cookie hands you one long string, so you will need to split it twice — once to
   separate the cookies from each other, and once to separate each name from its value.


8) EXERCISE. Write a function called deleteCookie(name) that deletes a cookie, but only after
   checking it exists. Print a message either way.

   Clue: some() will tell you whether any item in an array passes a test, and startsWith() will
   tell you whether a piece of text begins with something.


## ANSWERS

1) A cookie is a small piece of data stored in the user's browser, which lets a website remember
   information between visits or between pages.

   Common uses include:

- **User authentication** — keeping someone logged in as they move around the site.
- **Session management** — remembering what is in a shopping cart.
- **Personalisation** — storing preferences such as a theme or a language choice.

   The browser sends the cookie back automatically with each request, which is how the server
   recognises a returning visitor.


2) They protect against quite different things:

- **HttpOnly** stops the cookie from being read by JavaScript at all. Even
  `document.cookie` will not show it. This protects it from any script running on the page.
- **Secure** does not affect JavaScript. It tells the browser to send the cookie only over
  HTTPS, never over plain HTTP, so it cannot be read in transit.

   One is about *who can read it on the page*, the other about *how it travels across the
   network*. You would typically want both on anything sensitive.


3) It prints all the cookies for that site as one single string, something like:

        username=JohnDoe; theme=dark; loggedIn=true

   Each cookie is separated from the next by a **semicolon and a space** ("; ").

   Note what you do not get: there is no array, no object, and no way to ask for one cookie
   directly. That is exactly why question 7 exists — if you want a single cookie you have to
   pull the string apart yourself.


4) You set its expiry date to a date in the past. The browser then removes it for you:

        document.cookie =
            "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

   The date used here, 1 January 1970, is a common choice because it is the earliest date many
   systems recognise, but any past date works.

   Two details matter. Set the value to an empty string, and give the same path=/ the cookie was
   created with — a cookie set on one path will not be deleted by an instruction aimed at
   another.


5) The `$` and the `{` have been separated by a line break.

   In a template literal, `${` is a single unit meaning "work this bit out and drop the result
   in here". Split it and JavaScript stops recognising it, treats the whole thing as ordinary
   text, and your cookie ends up containing the literal characters:

        username=JohnDoe; expires=$
        {expiryDate.toUTCString()}; path=/

   rather than an actual date. Nothing errors — it just quietly does the wrong thing, which is
   the hardest kind of bug to spot.

   The fix is to keep `${ ... }` together on one line:

        document.cookie =
            `username=JohnDoe; expires=${expiryDate.toUTCString()}; path=/`;


6) 
        let expiryDate = new Date();

        // make it expire in 7 days
        expiryDate.setDate(expiryDate.getDate() + 7);

        document.cookie =
            `theme=dark; expires=${expiryDate.toUTCString()}; path=/`;

   Working the date out this way is far better than typing one in. A hand-written date is
   correct on the day you write it and quietly wrong forever afterwards.

   `getDate()` gives you the day of the month, and `setDate()` puts a new one back. Adding 7
   rolls into the next month or year on its own, so you do not have to think about it.
   `toUTCString()` then formats it the way cookies expect.

   `path=/` makes the cookie available across the whole site rather than just the page that set
   it.


7) 
        function getCookie(name) {
            // Split cookies into an array
            let cookies = document.cookie.split("; ");

            for (let cookie of cookies) {
                // Split key-value pair
                let [key, value] = cookie.split("=");

                // Return the matching cookie value
                if (key === name) return value;
            }

            // Return null if not found
            return null;
        }

        // Output: JohnDoe
        console.log(getCookie("username"));

   The first split breaks the one long string into separate cookies. The second breaks each
   cookie into its name and its value.

   The line `let [key, value] = cookie.split("=")` is called destructuring: it takes the two
   items the split produced and puts them straight into two variables in one go. There is more
   on it in Chapter 17.

   Returning null when nothing matches is a deliberate choice. It gives the caller a clear
   "there was no such cookie" rather than leaving them with undefined.


8) 
        function deleteCookie(name) {
            if (document.cookie.split("; ").some(cookie =>
                cookie.startsWith(name + "="))) {

                document.cookie =
                    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

                console.log(`Cookie "${name}" deleted.`);
            } else {
                console.log(`Cookie "${name}" not found.`);
            }
        }

        deleteCookie("username");            // Cookie "username" deleted.
        deleteCookie("nonExistingCookie");   // Cookie "nonExistingCookie" not found.

   some() runs the test on each cookie and stops the moment one passes, handing back true or
   false. We check with `startsWith(name + "=")` rather than just the name, so that looking for
   "user" does not accidentally match a cookie called "username".

   Note that the whole cookie string is written on one line. A template literal is allowed to
   run across several lines, but if you let it, the line break and the indentation become part
   of the text — and a cookie with a newline in the middle of its expiry date will not work.
