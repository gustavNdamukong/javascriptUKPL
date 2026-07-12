QUIZ — Chapter 3: Arrays
========================

This page contains the Q & A (questions and answers) for this chapter — Chapter 3: Arrays. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.


1) What's the difference between slice() and splice()

    Feature	slice()	splice()
    Mutates original array?	❌ No	✅ Yes
    Purpose	Copy portion	Add/remove items
    let arr = [1,2,3,4];

    // slice
    let newArr = arr.slice(1,3); 
    // [2,3], original unchanged

    // splice
    arr.splice(1,2); 
    // removes [2,3], arr becomes [1,4]


2) How does reduce() work?

    It reduces an array to one value

    let nums = [1,2,3,4];

    let sum = nums.reduce((acc, curr) => {
    return acc + curr;
    }, 0);

    console.log(sum); // 10

    Think of it as:

    “Carry a result (accumulator) through the array”
