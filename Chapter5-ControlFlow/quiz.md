# QUIZ — Control Flow

This page contains the Q & A (questions and answers) for this chapter — Chapter 5: Control Flow. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should
leave you stuck. Questions 11 to 15 are proper exercises where you write and run real code.
The answers are all together in the Answers section further down, numbered to match the
questions.


## QUESTIONS

1) What does this print, and why?

        let fiveString = '5';
        let fiveNumber = 5;

        console.log(fiveString == fiveNumber);
        console.log(fiveString === fiveNumber);

   Clue: one of these two operators cares about the type of the value as well as the value
   itself.


2) What does the % operator give you, and how would you use it to test whether a number is
   even?

   Clue: it hands back what is left over after a division.


3) What are the values of value and count after each of these two lines?

        let count = 1;
        let value = count++;

   And what would change if you wrote ++count instead?

   Clue: it depends on which side of the variable the ++ sits.


4) Rewrite each of these using a compound assignment operator:

        j = j + 2;
        j = j * 4;
        j = j % 6;

   Clue: the operator always goes before the equal sign.


5) Rewrite this if...else as a single line using the ternary operator:

        let action;

        if (light == 'green') {
            action = 'Go';
        } else {
            action = 'Stop';
        }

   Clue: the shape is condition ? runIfTrue : runIfFalse.


6) In an if...else if...else chain, what is the else clause for, and why does it take no
   parentheses?

   Clue: the chapter calls it the catch-all.


7) Match each job to the loop you would reach for:

  a) You want to run something exactly 10 times  
  b) You want to keep going until something happens, and you have no idea how many turns
    that will take  
  c) You want the code to run at least once before the condition is even checked  
  d) You want to go through the named properties of an object  
  e) You want to go through the values in an array, simply and readably

   Clue: five of the six loop types from this chapter, one each.


8) This loop never stops. Why, and how would you fix it?

        let trafficLightColor = 'green';

        while (trafficLightColor != 'red') {
            console.log('You can go');
        }

   Clue: ask yourself what would ever make the condition false.


9) What is the difference between break and continue?

   Clue: one of them leaves the building. The other just skips a turn.


10) What does this print, and what is the name for what has gone wrong?

        let day = 2;

        switch (day) {
            case 1:
                console.log("Monday");
            case 2:
                console.log("Tuesday");
            case 3:
                console.log("Wednesday");
            default:
                console.log("Invalid day");
        }

  Clue: look very carefully at what is missing from every single case.


11) EXERCISE. Create an array in a constant containing people's names. Use a while loop to
  loop through the array and display the elements on screen. This will help you practise
  working with while loops.

  Clue: you will need a counter starting at 0, and the loop should keep going while that
  counter is less than the array's length. Do not forget to increase the counter inside the
  loop, or you will meet question 8 again.


12) EXERCISE. Create a numbers array containing the numbers 1 to 10, stored in a constant. In
  a while loop, loop through the numbers and use the modulus operator to check whether each
  number is even, and if so display it on screen.

  This will help you practise using while loops and the less commonly used but powerful
  modulus operator.

  Clue: a number is even when dividing it by 2 leaves nothing over.


13) EXERCISE. Create a numbers array containing the numbers 1 to 10, stored in a constant.
  Create three empty arrays: evenNumbers, divisibleBy3 and otherNumbers. Loop through the
  numbers array with a while loop and, using an if...else if conditional and the modulus
  operator, do the following checks:  

  i) check whether the number is divisible by 2, and put it in evenNumbers if it is  
  ii) check whether the number is divisible by 3, and put it in divisibleBy3 if it is  
  iii) otherwise put the number in otherNumbers

  Once out of the loop, display the contents of all three arrays.

  This exercise is meant to help you master how if...else if statements work. When you look
  at your results, check the divisibleBy3 array carefully — there is a lesson hiding in it.

  Clue: use push() to add to an array, and join(', ') to display one neatly.


14) EXERCISE. Practise the do...while loop.

  Create an array called names containing some names. Use a do...while loop to go through
  the names array and display them on screen.

  Clue: remember the block runs first and the condition is checked afterwards.


15) EXERCISE. Practise using the ternary operator.

  Create an array named light with one string element, 'green', in it. Create an action
  variable and use a ternary operator to give it the value 'Go' if the string in the light
  array is 'green', or 'Stop' if it is 'red'. Use an alert popup to display the value of
  action.

  Clue: the array has only one element, so it sits at index 0.


## ANSWERS

1) It prints:

true
false

   The == operator compares only the values. JavaScript is happy to convert the string '5'
   into the number 5 in order to make the comparison, so it reports them as equal.

   The === operator, sometimes called the identical or strict equality operator, compares the
   type as well as the value. '5' is a string and 5 is a number, so they are not the same, and
   it reports false.

   The rule of thumb: when == does not seem to behave, reach for ===, because it checks both
   the value and the type.


2) The % operator, called modulo, gives you the remainder left over after dividing one number
   by another.

        console.log(10 % 5);
        // 0, because 5 goes into 10 exactly
        console.log(11 % 2);
        // 1, because 2 goes into 11
        // five times with 1 left over

   To test whether a number is even, divide it by 2 and see whether anything is left over. If
   nothing is, the number is even:

        let number = 7;

        if (number % 2 == 0) {
            console.log("Even number");
        } else {
            console.log("Odd number");
        }


3) After those two lines, value is 1 and count is 2.

   With the ++ on the right of the variable (count++), the current value is handed over first,
   and only then is count increased. So value receives the old value, 1.

   With the ++ on the left (++count), the increase happens first, and the new value is handed
   over. So value would be 2, and count would be 2 as well.

   The decrement operator -- works in exactly the same way, only downwards.


4) 
        j += 2;
        j *= 4;
        j %= 6;

   These are called compound assignment operators, or sometimes short form operators. They are
   a compact way of running an operation and storing the result back into the same variable in
   one go.

   Remember that they only work on a variable. You cannot write 1 += 5, because there is
   nothing there to update — 1 is just the number 1, and it will always be the number 1.


5) 
        let action = light == 'green' ? 'Go' : 'Stop';

   The part before the question mark is the condition. The part between the question mark and
   the colon runs if it is true, and the part after the colon acts as the else clause.

   Ternaries are ideal when all you are doing is choosing between two values. If either branch
   needs more than that, use a full if...else, which is far easier to read.


6) The else clause is the catch-all. It stands for whatever is left over once every condition
   above it has failed to match.

   It takes no parentheses because it has nothing to check. Every other branch in the chain
   needs a condition inside parentheses; else is simply "in all other cases, do this".

   So in the traffic light example, once you have checked whether the light is green and then
   whether it is amber, and neither matched, the else branch can only mean red.


7) 
| - a) exactly 10 times | →  the for loop |
|---|---|
| - b) unknown number of turns | →  the while loop |
| - c) run at least once first | →  the do...while loop |
| - d) properties of an object | →  the for...in loop |
| - e) values in an array, readably | →  the for...of loop |

   The sixth, forEach(), is an array method rather than a loop keyword. You would use it when
   you want to run a function on every element of an array.


8) It never stops because nothing inside the loop ever changes trafficLightColor. The
   condition is true when the loop starts and stays true forever. This is an infinite loop,
   and it can freeze your browser.

   The fix is to make sure something inside the loop can eventually make the condition false:

        let trafficLightColor = 'green';
        let timesChecked = 0;

        while (trafficLightColor != 'red') {
            console.log('You can go');

            timesChecked++;

            if (timesChecked === 3) {
                trafficLightColor = 'red';
            }
        }

   This prints "You can go" three times and then stops. Whenever you write a while loop, ask
   yourself straight away: what will eventually make this condition false?


9) break leaves the loop altogether. Execution jumps to the first line after the loop, and no
   further turns happen at all.

   continue skips only the current turn. The loop carries on with the next one.

        for (let i = 0; i < 5; i++) {
            if (i === 2) { break; }
            console.log(i);
        }
        // prints 0, 1

        for (let i = 0; i < 5; i++) {
            if (i === 2) { continue; }
            console.log(i);
        }
        // prints 0, 1, 3, 4


10) It prints:

Tuesday
Wednesday
Invalid day

  What has gone wrong is called fall-through, and it is the single most common mistake made
  with switch statements.

  Every case is missing its break. Once a case matches, JavaScript runs its code and then
  carries straight on into the next case, and the next, all the way to the bottom, without
  testing any of them again. It matched case 2, and then simply fell through everything
  below it.

  Adding break to each case fixes it, and the output becomes just Tuesday:

        case 2:
            console.log("Tuesday");
            break;

  This is exactly why the break statement matters so much in a switch, and it is worth
  checking for whenever a switch behaves strangely.


11) Here is the code:

        const people = ['Alice', 'Bob', 'Charlie', 'Diana'];
        let i = 0;

        while (i < people.length) {
            document.body.innerHTML += people[i] + '<br>';
            i++;
        }

  This displays the names like so:

Alice
Bob
Charlie
Diana

We loop through the people array with a while loop and print each name to the screen. Note
the use of += on document.body.innerHTML, which keeps adding each name to what is already
there instead of wiping it out and replacing it.


12) Here is the code:

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let i = 0;

        while (i < numbers.length) {
            if (numbers[i] % 2 === 0) {
                document.body.innerHTML += numbers[i];
            }

            i++;
        }

  We loop through the numbers and use the modulus operator (%) to check whether each one is
  divisible by 2, which is to say even. If it is, we print it. This displays only the even
  numbers:

246810

  They run together because we are printing each one straight after the last with nothing in
  between. If you would rather see them separated, add something to the end:

        document.body.innerHTML += numbers[i] + ' ';


13) Here is the code:

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const evenNumbers = [];
        const divisibleBy3 = [];
        const otherNumbers = [];

        let i = 0;

        while (i < numbers.length) {
            if (numbers[i] % 2 === 0)
            {
                evenNumbers.push(numbers[i]);
            }
            else if (numbers[i] % 3 === 0)
            {
                divisibleBy3.push(numbers[i]);
            }
            else
            {
                otherNumbers.push(numbers[i]);
            }

            i++;
        }

        document.body.innerHTML += 'Even Numbers: ' + evenNumbers.join(', ') + '<br>';
        document.body.innerHTML += 'Divisible by 3: ' + divisibleBy3.join(', ') + '<br>';
        document.body.innerHTML += 'Other Numbers: ' + otherNumbers.join(', ') + '<br>';

  The result on screen is:

Even Numbers: 2, 4, 6, 8, 10
Divisible by 3: 3, 9
Other Numbers: 1, 5, 7

  Now, the lesson hiding in there. The divisibleBy3 array should arguably contain 6 as well,
  and it does not. That is because 6 is divisible by 2, so it matched the very first
  condition, and once a branch of an if...else if chain matches, none of the branches below
  it are even looked at. 6 went into evenNumbers and never got the chance to be tested
  against 3.

  That is the whole point of an else if chain: at most one branch ever runs.

  If you want a number to be able to land in more than one array, use a series of separate
  if statements instead, with no else at all, so that every check runs regardless of what
  the ones before it did:

        while (i < numbers.length)
        {
            if (numbers[i] % 2 === 0)
            {
                // it is an even number
                // (exactly divisible by 2)
                evenNumbers.push(numbers[i]);
            }

            if (numbers[i] % 3 === 0)
            {
                // it is divisible by 3
                divisibleBy3.push(numbers[i]);
            }

            if ((numbers[i] % 2 != 0) && (numbers[i] % 3 != 0))
            {
                otherNumbers.push(numbers[i]);
            }

            i++;
        }

  This is perfectly legal code. It just means every if statement is checked every time,
  regardless of what any of the others did. Now 6 appears in both evenNumbers and
  divisibleBy3.


14) Here is the code:

        const names = ['John', 'Susan', 'Mary', 'Ann'];
        let i = 0;

        do {
            document.body.innerHTML += names[i] + '<br>';
            i++;
        } while (i < names.length);

  This prints:

John
Susan
Mary
Ann

  To prove to yourself that a do...while really does run its first turn before checking
  anything, try adding a condition that says to stop when the name 'John' is met:

        const names = ['John', 'Susan', 'Mary', 'Ann'];
        let i = 0;

        do {
            document.body.innerHTML += names[i] + ',';
            i++;
        }
        while ((i < names.length) && (names[i] != 'John'));

  This still runs through all four names and displays John, Susan, Mary, Ann. The first turn
  happens regardless, without the condition being looked at, and by the time it is checked we
  are past John, so nothing else matches it.

  Change the name in the condition to one further along and you will see the loop stop:

        while ((i < names.length) && (names[i] != 'Mary'));

  This runs only twice, because 'Mary' is the third name, so only John and Susan are printed.


15) Here is the code:

        const light = ['green'];
        const action = (light[0] === 'green') ? 'Go' : 'Stop';

        alert(action);

  As it stands, the alert popup displays 'Go'. Change the string in the light array to 'red'
  and refresh the page, and the popup will say 'Stop' instead.

  Note that light is an array with a single element, which is why we read it with light[0]
  rather than just light. Comparing the whole array to 'green' would never be true.
