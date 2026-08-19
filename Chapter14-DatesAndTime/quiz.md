# QUIZ — Dates And Time

This page contains the Q & A (questions and answers) for this chapter — Chapter 14: Dates And Time. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 9 to 12 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) What date does this create, and why is it not the 3rd of March?

        let d = new Date(2024, 2, 16);

   Clue: JavaScript counts months the way it counts array indexes.


2) A Date object is often described as holding "a local time". Why is that wrong, and what
   does it actually hold?

   Clue: one number, counted from a fixed moment in 1970.


3) You have one Date. Name the method that shows it in the user's own time zone and the one
   that shows it in UTC.

   Clue: one of them is the plain, ordinary one you would guess.


4) This code claims to convert a local time to UTC. It does not. What does it really do?

        let utcTime = new Date(
            Date.UTC(
                localTime.getFullYear(),
                localTime.getMonth(),
                localTime.getDate(),
                localTime.getHours()
            )
        );

   Clue: think about what getHours() hands you, and what Date.UTC() then assumes about it.


5) So what IS Date.UTC() for? Give the one situation where you genuinely want it.

   Clue: it builds rather than converts.


6) What is the difference between setTimeout() and setInterval(), and what unit do they both
   take their delay in?

   Clue: one happens once. And the unit trips up everybody at least once.


7) Both timers hand you something back when you call them. What is it, and what is it for?

   Clue: you cannot cancel something you cannot name.


8) Why do database systems like PostgreSQL and MySQL store timestamps in UTC rather than in
   local time?

   Clue: think about two users in different countries looking at the same record.


9) EXERCISE. Create a date for the 25th of December 2025 at 9:30 in the morning, then print it
   as a readable date string.

   Clue: remember what question 1 taught you about the month.


10) EXERCISE. Take one Date and print the same moment twice — once in local time and once in
  UTC — proving they are the same instant.

  Clue: call new Date() only once. Compare getTime() on it against itself if you want the
  proof in numbers.


11) EXERCISE. Build a live digital clock that updates every second, then make it stop after
  ten seconds.

  Clue: you need setInterval to start it and setTimeout to end it — and the ID from the
  first one.


12) EXERCISE. Write a countdown that starts at 5, prints each number one second apart, and
  prints "Liftoff!" when it reaches zero — stopping itself cleanly.

  Clue: the timer has to cancel itself from inside its own callback.


## ANSWERS

1) It creates the **16th of March 2024**, not the 3rd.

        let d = new Date(2024, 2, 16);
        console.log(d.toDateString());
        // "Sat Mar 16 2024"

   The months are **0-indexed**, exactly like array positions. So January is 0, February is 1,
   and March is 2. The day of the month, confusingly, is not — the 16 really does mean the
   16th.

   This is one of the oldest complaints about the Date object, and it catches everybody at
   least once. When you are reading somebody else's code and the month looks wrong by one, it
   probably is not wrong at all.


2) A Date does not store a local time, and it does not store a time zone either. What it holds
   is **a single number: the count of milliseconds since January 1, 1970 UTC.**

   That number identifies one moment in the history of the universe. It is exactly the same
   number whether the computer running the code sits in New York, London or Tokyo.

   The local time you see is produced only when the date is **displayed**. It is a way of
   dressing that number up for wherever the user happens to be, not a different value.


3) 
        // the user's own time zone
        localTime.toString();
        // the same instant, as UTC
        localTime.toUTCString();

   `toString()` is the plain one, and it is what you get automatically if you print a Date
   without calling anything. For a user in New York at midday:

Local Time: Thu Mar 20 2025 12:00:00 GMT-0400 (Eastern Daylight Time)
UTC Time: Thu, 20 Mar 2025 16:00:00 GMT

   One date. Two ways of writing it down.


4) It **copies the numbers off the clock face and throws the time zone away.**

   `getHours()` gives you the hour where the user is — 12, for somebody in New York at midday.
   `Date.UTC()` then takes that 12 and assumes it was 12 o'clock *in UTC* all along.

   What you get back is not your moment converted. It is a **different moment altogether**,
   four hours earlier than the one you started with:

Thu, 20 Mar 2025 12:00:00 GMT     // what it really gives
Thu, 20 Mar 2025 16:00:00 GMT     // what people expect

   And it is worse than simply wrong, because it looks right. The date is right, the minutes
   are right, and only the hour is quietly off by the size of your time zone offset — which is
   zero if you happen to test it in London, so it can pass every test you run and then fail for
   your users.

   The honest answer is that there was never anything to convert. Use `toUTCString()`.


5) Date.UTC() is for **building** a date out of components you already know are in UTC.

        // "16:00, wherever this code happens to run"
        let a = new Date(2025, 2, 20, 16, 0, 0);

        // "16:00 UTC, everywhere on earth"
        let b = new Date(Date.UTC(2025, 2, 20, 16, 0, 0));

   The first line means different moments in different countries. Run it in New York and it is
   20:00 UTC; run the identical line in Tokyo and it is 07:00 UTC. The second line means one
   single moment no matter where it runs.

   So you want it when the parts of a date arrive from somewhere that has already told you
   they are UTC — a database row, or an API response — and you need to rebuild a Date from
   them.


6) **setTimeout()** runs your code **once**, after a delay. **setInterval()** runs it **over
   and over**, once per interval, until something stops it.

   Both take their delay in **milliseconds**, not seconds:

        1000 ms  = 1 second
        5000 ms  = 5 seconds
        60000 ms = 1 minute

   Passing 5 when you meant 5 seconds gives you five *thousandths* of a second, which is
   effectively instant. It is a rite of passage.


7) They return a **timer ID** — a number identifying that particular timer.

        const intervalId = setInterval(tick, 1000);

   It exists so you can cancel the timer later, with `clearInterval(intervalId)` or
   `clearTimeout(timeoutId)`. Without holding on to the ID there is no way to refer to that
   timer again, so a `setInterval` you did not capture will keep running for as long as the
   page is open.

   Get into the habit of storing it even when you think you will not need it.


8) Because UTC gives every record **one single reference point**, so the same moment means the
   same thing to everybody.

   If a database stored each user's local time as it arrived, then Alice's 10:00 AM in New York
   and Bob's 10:00 AM in London would look identical in the table while being four hours apart
   in reality. Sorting would be wrong, comparing would be wrong, and working out which of two
   events happened first would be impossible.

   Three reasons in particular:

- **Consistency** — one standard time avoids confusion across time zones.
- **No daylight saving problems** — UTC never shifts, so an hour never happens twice or
  goes missing.
- **Easier calculations** — differences between times are simple subtraction, with no
  offsets to juggle.

   The display conversion happens at the very last moment, when the value is shown to a
   particular user.


9) 
        // remember: month 11 is December, not November
        let christmas = new Date(2025, 11, 25, 9, 30, 0);

        console.log(christmas.toDateString());
        // "Thu Dec 25 2025"
        console.log(christmas.toString());
        // "Thu Dec 25 2025 09:30:00
        // GMT+0000 (Greenwich Mean Time)"

   If you wrote `new Date(2025, 12, 25)` you would get the **25th of January 2026**, because
   month 12 has run off the end of the year and JavaScript rolls it over without complaining.
   No error, just a date a month later than you wanted.


10) 
        const moment = new Date();

        console.log("Local Time:", moment.toString());
        console.log("UTC Time:", moment.toUTCString());

        // the proof: one object, one underlying number
        console.log("Milliseconds:", moment.getTime());
        console.log("Local hour:", moment.getHours());
        console.log("UTC hour:", moment.getUTCHours());

  Run this anywhere outside the UTC+0 zone and the two hours will differ, while
  `getTime()` gives one number that never changed. That single number is the moment. The two
  printed times are just two ways of writing it down.


11) 
        function updateClock() {
            const now = new Date();
            console.log(now.toLocaleTimeString());
        }

        // start it - and keep the ID
        // so we can stop it later
        updateClock();
        const clockId = setInterval(updateClock, 1000);

        // stop it after ten seconds
        setTimeout(() => {
            clearInterval(clockId);
            console.log("Clock stopped.");
        }, 10000);

  Two things worth noticing. First, `updateClock()` is called directly once before the
  interval starts — without that, the display would sit blank for a whole second before the
  first tick. Second, the whole thing only works because `clockId` was stored; the
  `setTimeout` needs it to know which timer to cancel.

  On a web page the only change is where the time goes:

        document.getElementById("clock").textContent = now.toLocaleTimeString();


12) 
        let count = 5;

        const countdownId = setInterval(() => {
            if (count === 0) {
                console.log("Liftoff!");
                clearInterval(countdownId);
                return;
            }

            console.log(count);
            count--;
        }, 1000);

  Output, one line per second:

5
4
3
2
1
Liftoff!

  The interesting part is that the timer cancels itself from inside its own callback, using
  the ID stored just outside it. That works because `const countdownId` is assigned before
  the first tick ever runs — a second passes before the callback is called for the first
  time.

The `return` matters too. Without it, execution would carry on to `console.log(count)` and
print a stray 0 after "Liftoff!", because `clearInterval()` stops future ticks but does
not abandon the one currently running.
