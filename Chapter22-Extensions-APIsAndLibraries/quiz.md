# QUIZ — Chapter 22: Extensions (APIs and Libraries)

This page contains the Q & A (questions and answers) for this chapter — Chapter 22: Extensions
(APIs and Libraries). Work through these after reading the chapter, while the material is fresh —
recall practice is what cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 9 to 13 are proper exercises where you write and run real code. The answers
are all together in the Answers section further down, numbered to match the questions.


## QUESTIONS

1) What is an API, in one sentence, and what does an "endpoint" mean?

   Clue: the chapter's restaurant analogy is the one to reach for.


2) What are the main differences between a REST API and a SOAP API, and why is SOAP usually
   handled outside the browser?

   Clue: one speaks JSON, one speaks XML, and only one of them trips over browser security.


3) Match these status codes to their meanings: 200, 201, 400, 401, 404, 500.

   Clue: they come in bands, and the first digit tells you who is at fault.


4) `response.ok` is true for which status codes? Why is checking it not the same as checking
   whether `fetch()` succeeded?

   Clue: a 404 is a perfectly successful request.


5) What does AJAX stand for, and why is the "X" a little out of date?

   Clue: what format do APIs actually return these days?


6) Put these in order from oldest to newest, and say what each improved on: `async/await`,
   callbacks, `XMLHttpRequest`, promises, `fetch()`.

   Clue: two are about *making requests*, three are about *handling the waiting*.


7) In the chapter's posts example, `createPost()` adds a post inside a `setTimeout()`, and the
   new post never appears on the page. Why?

   Clue: nobody waited.


8) What does `Promise.all()` do, and what happens if one of the promises rejects?

   Clue: it is all or nothing.


9) EXERCISE. Write a function that returns a promise resolving to "Done!" after a short delay,
   then use `.then()` to print it.

   Clue: `new Promise` takes a function with two parameters.


10) EXERCISE. Rewrite that same call using `async/await` inside a `try...catch`.

    Clue: `await` only works inside an `async` function.


11) EXERCISE. Fix the posts example using a callback, so that the third post appears.

    Clue: pass the function itself, not the result of calling it.


12) EXERCISE. Use `Promise.all()` to wait for two promises and print both results together.

  Clue: what comes back is an array, in the order you passed them.


13) EXERCISE. Write a `fetch()` call that checks the status code and throws if the response was
  not OK.

  Clue: question 4 tells you which property to test.


## ANSWERS

1) An **API (Application Programming Interface) is an agreed way for one program to ask another
   program for something**, without needing to know how that other program works inside.

   The chapter's analogy is the right one: you are at a table with a menu. You do not go into the
   kitchen and cook — you tell the waiter what you want and food arrives. The kitchen is the
   application, the menu and the waiter are the interface.

   An **endpoint** is one particular thing you can ask for, expressed as a URL:

http://my-api.com/shoes
http://my-api.com/clothes

   Same API, same domain, different endpoints — one item on the menu each.


2) 
- **REST** uses ordinary HTTP methods (GET, POST, PUT, PATCH, DELETE) against URLs, and
  normally exchanges **JSON**. It is simple, lightweight, and what you will meet almost
  everywhere today.
- **SOAP** is a stricter, older protocol built on **XML**, with a fixed envelope structure and
  usually a WSDL file describing the service. It is still common in banking, insurance and
  other enterprise systems.

   SOAP is usually handled outside the browser mainly because of **CORS**. A SOAP service on
   another domain will not normally send the headers a browser demands before it will let your
   JavaScript read the response, so the request is blocked. Backends have no such restriction,
   which is why SOAP calls are typically made server-side and the result passed on to the
   frontend.

   There is also the XML itself: you need `DOMParser` and usually XPath with a namespace
   resolver to dig a value out of a SOAP envelope, where a REST reply is one `response.json()`
   away.


3)
  200   OK                      it worked
  201   Created                 it worked, and something new exists
  400   Bad Request             your request was malformed
  401   Unauthorised            you need to log in
  404   Not Found               that resource does not exist
  500   Internal Server Error   the server broke

   The first digit is the useful part. **2xx** means success. **4xx** means the problem is at
- your* end — you asked wrongly, or you are not allowed. **5xx** means the problem is at the
- server's* end and there may be nothing wrong with your request at all.

   That distinction decides what you do next: a 4xx usually means fix your request, a 5xx
   usually means try again later.


4) `response.ok` is **true for status codes in the 200–299 range**, and false for everything
   else.

   It is not the same as `fetch()` succeeding, and this catches almost everyone once:

        fetch('https://api.example.com/nope')
            .then(response => {
                // we ARE here, even for a 404
                console.log(response.ok);      // false
                console.log(response.status);  // 404
            });

   `fetch()` only rejects when the request itself could not be made — no network, DNS failure,
   CORS refusal. A 404 or a 500 is a **successful round trip** that happened to carry bad news,
   so the promise resolves and your `.catch()` never runs.

   That is why the chapter checks explicitly:

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }


5) **Asynchronous JavaScript And XML.**

   The X is dated because almost nothing returns XML any more — modern APIs return **JSON**. The
   name stuck from the early 2000s, when `XMLHttpRequest` really was fetching XML.

   The important half of the name is **Asynchronous**: the page carries on working while the
   request is in flight, rather than freezing or reloading. That is what AJAX actually gave us,
   and it is still exactly what `fetch()` does.


6) 
    XMLHttpRequest   the original way to make a request without reloading
    callbacks        the original way to handle "when it finishes"
    promises         fixed callback nesting; gave us .then() and .catch()
    fetch()          a cleaner request API, promise-based from the start
    async/await      made promise code read like ordinary sequential code

   Two of them (`XMLHttpRequest`, `fetch`) are about **making the request**. Three (callbacks,
   promises, `async/await`) are about **handling the wait**.

   They are not mutually exclusive. `fetch()` returns a promise, and `await` is just a nicer way
   to unwrap that same promise.


7) Because **nothing waited for the timeout to finish**.

        createPost({ title: 'post three' });   // schedules a push in 2 seconds
        ul.innerHTML = getPosts();             // runs immediately

   `setTimeout()` is asynchronous. `createPost()` returns straight away, having only *scheduled*
   the work. So `getPosts()` runs about two seconds too early, reads an array that still has two
   posts in it, and renders those.

   The fix — in any of its three forms — is to make the display step happen **after** the push,
   rather than merely after the call.


8) `Promise.all()` takes an array of promises and returns a single promise that resolves once
- *every one** of them has resolved. What you get back is an **array of results, in the order
   you passed them in** — not the order they finished.

        Promise.all([p1, p2, p3])
            .then(results => console.log(results));   // [r1, r2, r3]

   If **any one of them rejects**, the whole thing rejects immediately with that first error, and
   you never see the results of the ones that succeeded. It is all or nothing.

   That makes it right for "I need all of these before I can carry on", and wrong for "get me
   whatever you can" — for which there is `Promise.allSettled()`.


9) 
        function getData() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("Done!");
                }, 1000);
            });
        }

        getData().then(result => console.log(result));   // Done!

    The function you hand to `new Promise` receives two functions of its own: call **`resolve`**
    with the value on success, or **`reject`** with an error on failure. Nothing happens until
    one of them is called — which is exactly why the promise can sit and wait.


10) 
        async function showData() {
            try {
                const result = await getData();
                console.log(result);          // Done!
            } catch (error) {
                console.error("Failed:", error);
            }
        }

        showData();

    `await` pauses inside the async function until the promise settles, so the code reads top to
    bottom even though it is asynchronous. It only works inside a function marked `async`.

  Note that `try...catch` here does the job `.catch()` does in the `.then()` style — which is
  one of the nicest things about `async/await`, since it means asynchronous errors are caught
  the same way as ordinary ones.


11) 
        function createPost(post, callback) {
            setTimeout(() => {
                posts.push(post);
                callback();          // now the list refreshes
            }, 2000);
        }

        createPost({ title: 'post three' }, getPosts);

  Result: all three posts appear.

    The detail worth getting right is on the last line. You pass **`getPosts`**, not
    **`getPosts()`**. With the brackets you would call the function immediately and hand
    `createPost` whatever it returned. Without them you hand over the function itself, for
    `createPost` to call when it is ready.


12) 
        const promise1 = Promise.resolve('Hello world');
        const promise2 = new Promise(resolve =>
            setTimeout(() => resolve('Second result'), 500)
        );

        Promise.all([promise1, promise2])
            .then(results => {
                console.log(results);      // ['Hello world', 'Second result']
                console.log(results[0]);   // Hello world
            });

  Notice that `promise1` was ready instantly and `promise2` took half a second, yet the results
  come back in the order they were **passed in**, not the order they finished.


13) 
        fetch('https://api.example.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed with status ' + response.status);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));

  Throwing inside a `.then()` sends control to the `.catch()` at the end, so both kinds of
  failure — a dead network and a 404 — end up in the same handler. Without the `!response.ok`
  check, a 404 would sail past and you would try to read JSON from an error page.
