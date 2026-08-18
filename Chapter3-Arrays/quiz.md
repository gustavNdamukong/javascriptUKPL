# QUIZ — Arrays

This page contains the Q & A (questions and answers) for this chapter — Chapter 3: Arrays. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 11 to 14 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) JavaScript has two types of array. Name them, and say what the difference between them is.

   Clue: the difference is not in what they store, but in what marks the spot of each item.


2) Your friend writes this and expects student.length to be 4:

        let student = [];
        student["name"] = "Amina";
        student["age"] = 12;
        student["grade"] = "6";
        student[0] = "Math";

   What does student.length actually print, and what should your friend have used instead?

   Clue: only one of those four lines added a real array element.


3) An array has 4 elements in it. What is the index of the last one, and what does .length
   report? Explain why those two numbers are not the same.

   Clue: one of them starts counting at zero and the other does not.


4) Given this object, which two of these three lines will work, and why does the third one fail?

        const person = { "first-name": "Tom", aunt: "Polly" };

person.aunt
person["first-name"]
person.first-name

   Clue: think about what JavaScript sees when it meets a hyphen in the middle of an expression.


5) What is the difference between slice() and splice()?

   Clue: one of them leaves the original array exactly as it found it. The other does not.


6) Explain in your own words what reduce() does, and what its second argument is for.

   Clue: the chapter calls the running result a snowball.


7) Four methods add or remove items at the ends of an array: push(), pop(), shift() and
   unshift(). Say which end each one works on, and whether it adds or removes.

   Clue: two of them work at the end, two at the beginning.


8) Why does [1, 100, 2, 20].sort() give you [1, 100, 2, 20] rather than [1, 2, 20, 100],
   and how do you fix it?

   Clue: sort() compares them as though they were words, not numbers.


9) Look at this code:

        let array1 = ['a', 'b', 'c'];
        let array2 = array1;
        array2[0] = "word";

        console.log(array1);

   What does it print, and why? How would you make array2 a genuinely independent copy?

   Clue: the fix uses three dots.


10) Objects do not have array methods like .filter() or .map(), and they have no .length
  either. Name the three methods JavaScript gives you to get around this, and say what each
  one hands back.

  Clue: the chapter gives them the nickname KVE.


11) EXERCISE. Loop through an array running a function on each element.

Write a function of your own that takes a number and returns that number multiplied by two.
Then use it on every element of an array of numbers, and display the results.

Clue: think about which array method takes a function and runs it on every element of an
array, handing you back a new array of the results. You met it in this chapter.


12) EXERCISE. Loop through an array of images and display the images on screen.

  - Create a div in your HTML code and give it an ID
  - Within your JavaScript code, create an array
  - Put in this array a number of elements which should be names of images as strings,
  including their image extensions. Make sure these are the names of actual images on
  your computer
  - Select the div you created in your HTML. This is where you will be displaying the images
  whose names you have stored in the array. Let us refer to it as the target div
  - Loop through the array grabbing the names of the images one by one, placing them within
  an <img /> tag, and then placing the image tag in the target div, so that the image
  displays
  - Use a timer function so that only one image is displayed at a time, and the image changes
  every 5 seconds

Clue: setInterval() takes two arguments — a function to run, and how long to wait between
runs, in milliseconds. Keep a counter of which image you are up to, and send it back to 0
when it reaches the end.


13) EXERCISE. Create an array of the numbers 1, 3, 2, 5, 2, 9, 2, 9, 2, 1.

  - Then create another, empty array
  - Loop through the array of numbers and check each one. If the number is a 2 or a 9, put it
  into the other array
  - Finally, display the contents of that second array in an alert popup

  The popup should display 2, 2, 9, 2, 9, 2

  This exercise should teach you how to loop through an array and scan its contents for
  specific values, filtering out what is not needed. In doing so, you will use the comparison
  operator to check whether a value is equal to another value. We have not covered comparison
  operators yet, so treat this as a gentle introduction. When we come to them in Chapter 5
  (Control Flow), and you see those and many other operators in action, you will grasp their
  essence and power in programming.

Clue: == checks whether two values are equal. push() adds to an array.


14) EXERCISE. Finally, we should not proceed without exercising with multi-dimensional arrays
  too.

  - Create an array called food which contains three arrays of different food types. Each of
  those three arrays should have three elements in it
  - Loop through this food array and display the elements of each of the inner arrays in the
  console, on separate lines

  Clue: one level of array needs one loop. Two levels need a loop inside a loop.


## ANSWERS

1) Numeric arrays (also called indexed arrays) and associative arrays.

   The difference lies in what marks the spot of each element. In a numeric array the key is a
   number, called an index, and JavaScript assigns those for you starting from zero. In an
   associative array the key is a name, a short piece of text that you choose yourself.

   Numeric arrays are the true arrays of JavaScript. What people call an associative array in
   JavaScript is really a plain object.


2) It prints 1.

   Only student[0] = "Math" added a real array element. The other three added named properties
   to the array object, and .length counts only the numbered elements. Those named properties
   are also skipped by for loops, .map() and .forEach().

   Your friend wanted an object:

        let student = {
            name: "Amina",
            age: 12,
            grade: "6",
            subjects: ["Math"]
        };

   The rule of thumb: arrays are for ordered lists, objects are for key-value pairs. If you
   find yourself writing array["name"] = "value", stop and ask whether you really wanted an
   object.


3) The last element is at index 3, but .length reports 4.

   Indexes are zero-based, so a 4-element array uses indexes 0, 1, 2 and 3. The .length
   property is not zero-based; it is a plain count of how many items there are. This is why the
   last element of any array sits at index length - 1.


4) person.aunt and person["first-name"] both work. person.first-name fails.

   Dot notation only works when the key is a valid identifier — no spaces, no hyphens, not
   starting with a digit. "first-name" has a hyphen, so JavaScript does not read it as one
   name. It reads it as a subtraction:

person.first - name

   which gives you NaN rather than "Tom".

   Bracket notation always works, so when in doubt, reach for it.


5) slice() copies. splice() changes the original.

        let arr = [1, 2, 3, 4];

        // slice - takes a copy of part of the array
        let newArr = arr.slice(1, 3);
        // newArr is [2, 3], and arr is still [1, 2, 3, 4]

        // splice - cuts items out of the array itself
        arr.splice(1, 2);
        // removes [2, 3], so arr is now [1, 4]

   In short: slice() leaves the original array untouched and hands you a new one. splice()
   modifies the array it is called on, and hands you back whatever it removed. It can also
   insert new items at the same time.


6) reduce() boils a whole array down to a single value.

        let nums = [1, 2, 3, 4];

        let sum = nums.reduce((acc, curr) => {
            return acc + curr;
        }, 0);

        console.log(sum); // 10

   The function you give it receives two things: the running result so far (here called acc,
   short for accumulator — the chapter's snowball), and the current element. Whatever you
   return becomes the running result for the next element.

   The second argument to reduce() itself — the 0 above — is the starting value of that running
   result. Think of it as the size of the snowball before it starts rolling.


7) 
  - push()    adds an item to the END of the array
  - pop()     removes the item at the END of the array
  - unshift() adds an item to the BEGINNING of the array
  - shift()   removes the item at the BEGINNING of the array

   pop() and shift() both hand back the item they removed, so you can catch it in a variable if
   you still need it.


8) Because sort() converts everything to strings before comparing.

   As text, "100" comes before "2", in the same way that "apple" comes before "b" in a
   dictionary — it compares character by character, and "1" is lower than "2".

   The fix is to pass sort() a compare function:

        [1, 100, 2, 20].sort((a, b) => a - b);   // [1, 2, 20, 100]

   It works because if a - b is negative, a is placed before b; if positive, b goes first; and
   if 0, their order stays as it was. Swap it to b - a to sort in descending order.


9) It prints ['word', 'b', 'c'] — the change to array2 also changed array1.

   Arrays are a reference type. Writing array2 = array1 did not copy anything; it simply made
   both names point at the same array in memory. Changing it through one name changes what you
   see through the other, because there is only one array.

   To get a genuinely independent copy, use the spread operator:

        let array2 = [...array1];

   Now array2 is a brand new array with its own place in memory, holding copies of the
   elements. Changing it leaves array1 alone. There is more on reference types in Chapter 10
   (Data Types).


10) Object.keys(), Object.values() and Object.entries() — KVE.

        const person = { name: "Alice", age: 30, city: "London" };

        console.log(Object.keys(person));
        // ["name", "age", "city"]

        console.log(Object.values(person));
        // ["Alice", 30, "London"]

        console.log(Object.entries(person));
        // [["name", "Alice"], ["age", 30], ["city", "London"]]

   All three hand you back a real array, which means you can then use any array method on the
   result. That includes .length, which is how you count an object's properties:

        console.log(Object.keys(person).length);   // 3


11) When you meet a problem in programming, the first thing to do is think about what tool the
  language already gives you. Here we are dealing with an array, so ask what JavaScript
  provides for arrays — the array methods come to mind. Is there one that runs a function on
  every element? Yes: map(). Once you have found the tool, the problem is half solved.

map() can be given a built-in function or one you write yourself. We will write our own,
taking a number as its argument and returning that number doubled:

        function multiplier(num)
        {
            return num * 2;
        }

        let numbers = [1, 2, 3, 4, 5];
        let newNumbers = numbers.map(multiplier);

        alert(newNumbers);

  This displays a popup saying 2,4,6,8,10.

Notice that you pass multiplier without brackets after it. You are handing map() the
function itself, not the result of calling it. At each turn of the loop, map() passes the
current element into multiplier() as num.

  One more thing worth knowing while we are here. map() itself takes just one argument, the
  function. But the function it hands your elements to can accept a second parameter, and
  JavaScript will fill that one in with the index of the current element. This is handy when
  you need to know where in the array you are:

        let names = ['Ada', 'Grace', 'Alan'];

        let numbered = names.map(function(name, i) {
            return (i + 1) + ": " + name;
        });

        console.log(numbered);
        // ["1: Ada", "2: Grace", "3: Alan"]

  We add 1 to i because the index starts at 0, and a numbered list that starts at 0 would
  look odd to a reader. The same second parameter is available in forEach() and filter() too.


12) Here is the whole page:

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Image slideshow</title>
        </head>
        <body>
            <div id="myImgDiv"></div>

            <script>
                let images = new Array();

    ```
    // put the images in the array
    images.push(
    "amex.png",
    "visa.png",
    "pexels-photo.jpeg",
    "pexels-photo2.jpeg",
    "logo.jpeg"
    );
    ```

                // grab the target div
                let div = document.getElementById("myImgDiv");
                let pos = 0;
                let numOfImages = (images.length - 1);

                setInterval(function()
                {
                    div.innerHTML = "<img src='" + images[pos] + "' />";

                    if (pos < numOfImages)
                    {
                        pos++;
                    }
                    else
                    {
                        pos = 0;
                    }
                }, 5000);
            </script>
        </body>
        </html>

The code loops through the array of image names, puts each one inside an <img /> tag, and
inserts that into the div.

The looping is done by setInterval(). It takes two arguments: a function to perform, and
the time to wait between each run. We have passed it an anonymous function to do the work,
and 5000 milliseconds, which is 5 seconds. So the images appear in the target div and keep
changing every five seconds.

  The pos counter keeps track of which image we are showing. When it reaches the last one, we
  set it back to 0 so the slideshow starts over. Congratulations, you have just built your
  first image slideshow.


13) Here is the code:

        let arr1 = [1, 3, 2, 5, 2, 9, 2, 9, 2, 1];
        let arr2 = [];

        for (let i = 0; i < arr1.length; i++)
        {
            if (arr1[i] == 2)
            {
                arr2.push(arr1[i]);
            }

            if (arr1[i] == 9)
            {
                arr2.push(arr1[i]);
            }
        }

        alert(arr2);

  As expected, the alert popup displays 2, 2, 9, 2, 9, 2.

  The if () block we use to check each item is a conditional statement, which we look at
  properly in Chapter 5. Notice the word conditional: a condition is checked, and what
  happens next depends on the answer.

  Instead of two separate if statements, we could check both conditions in one, by joining
  them with the OR operator (||):

        let arr1 = [1, 3, 2, 5, 2, 9, 2, 9, 2, 1];
        let arr2 = [];

        for (let i = 0; i < arr1.length; i++)
        {
            if ((arr1[i] == 2) || (arr1[i] == 9))
            {
                arr2.push(arr1[i]);
            }
        }

        alert(arr2);

  This still displays 2, 2, 9, 2, 9, 2. The double pipe (||) means "if the test on either
  side is true, do the thing". Notice we end up with rather less code than before.


14) Here is the code:

        let food = [
            ['tomatoes', 'pepper', 'cabbage'],
            ['apple', 'pineapple', 'banana'],
            ['rice', 'pasta', 'beans']
        ];

        for (let i = 0; i < food.length; i++)
        {
            let sub = "";

            for (let j = 0; j < food[i].length; j++)
            {
                sub += ' ' + food[i][j];
            }

            console.log(sub);
        }

  The result in the console is:

tomatoes pepper cabbage
apple pineapple banana
rice pasta beans

  The key to mastering loops is this: for every level you move down into the array, you need
  another loop block. This array is two levels deep, so we use two for loops, one nested
  inside the other.

  Notice that the outer loop uses a counter called i, and the inner one uses j. It has to be
  a different name, because i is already in use by the outer loop. There is nothing magic
  about i and j — any names would work — but by convention those are the ones programmers
  reach for. If the array went deeper still, we would carry on in the same way.

  Remember too that you use one set of square brackets for each level. food[1] gives you the
  second inner array, ['apple', 'pineapple', 'banana'], and food[1][0] then gives you the
  first element of that, 'apple'. That is exactly what food[i][j] is doing inside the loop.
  The sub += ' ' + part is simply building up a string of all three items so we can print
  them on one line.
