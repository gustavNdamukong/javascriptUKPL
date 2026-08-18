
# Chapter 7 — FUNCTIONS

- Introduction
  - Giving Functions Tools to Work With (Parameters)
  - Built-in Functions vs Custom Functions
  - Quick Note on document.write()
  - Rules for Naming Functions
- Functions demonstrated
- The arguments object
- Handling varied arguments as Rest
  Parameters
- Arguments with default values
- To return something or to do something
- Functions and variable scope
- Anonymous and arrow functions
- Convert an anonymous function into an
   arrow function
- Quick object literals from function arguments
- Anonymous and arrow functions and the
   this keyword
- Passing arguments to an arrow function
- Immediately Invoked Function Expression
   (IIFE)
  - Why should you use an IIFE
  - Private Variables with IIFE
  - IIFE with Parameters
  - Arrow Function IIFE


## INTRODUCTION

In programming, we often need to perform certain tasks over and over again. Instead of writing the same code multiple times, we can put that code into a function and just call it whenever we need it.

What Is a Function?

A function is simply a block of code that does a specific job. Think of it as a mini-program inside your program. You write it once, and then you can use (or "call") it whenever you want to carry out that task.
For example:

	function greet() {
  		console.log("Hello!");
	}

	greet(); // Calls the function


### Giving Functions Tools to Work With (Parameters)
Sometimes, just like a person needs tools to do a job, a function may also need some information to do its task. This information is passed into the function through parameters, which go inside the parentheses () when you define the function. The actual values you hand over when you call it are known as arguments.

	function greetUser(name) {
  		console.log("Hello, " + name + "!");
	}

	greetUser("Sam"); // Output: Hello, Sam!

Here, "Sam" is an argument, and name is the parameter. You can pass multiple parameters by separating them with commas:

	function add(a, b) {
  		return a + b;
	}

	console.log(add(3, 4)); // Output: 7

The arguments you pass can be:

- Literal values (like "hello" or 5)
- Variables (like name or age)
- Even other functions!

Yes, in JavaScript, you can pass a function to another function, especially when one task depends on another already-defined task.


### Built-in Functions vs Custom Functions
  In JavaScript (and most programming languages), there are two kinds of functions:
  - 1) Built-in functions: These are provided by JavaScript itself to help
    you do common tasks.

    * Example: document.write("Hello") displays text in the browser.
    * Another example: Math.max(3, 10, 7) gives you the highest number.
	
  - 2) Custom functions: These are the functions you create yourself, like
    greetUser() above.

While built-in functions are helpful for routine tasks, custom functions allow you to build powerful and unique behaviours into your program.


### Quick Note on document.write()
  Although document.write() is a built-in JavaScript function, it is no longer recommended in modern web development. It can cause issues with page rendering and often doesn't work well after the page has finished loading.
Instead, use this modern approach:

	document.body.innerHTML = "Hello, world!";

This method is safer and works well in all modern browsers.


### Rules for Naming Functions
When you create your own functions, JavaScript has some rules for naming them:
  - A function name must start with a letter, an underscore (_) or a
    dollar sign ($). It may not start with a digit.
  - After the first character, the name can include:

    - Letters (a-z, A-Z)
    - Digits (0-9)
    - Underscores (_)
    - Dollar signs ($)

  - Function names are case-sensitive (myFunction is different from
    myfunction).
  - Use camelCase naming (also called bumpyCaps), where the first word
    is lowercase and each following word starts with a capital letter.
    For example:

			function calculateTotal() { }


## FUNCTIONS DEMONSTRATED

  The syntax of a function is as follows: the keyword function, 
followed by the name of the function, followed by a pair of 
opening and closing parentheses (), followed by another pair 
of opening and closing curly brackets {}. Here is an example:

	function greeting() {
		console.log("Hello");
	}

The code that you place in between the opening and closing curly
braces is the thing/task that the function is meant to do. 

  Explained in layman terms, a function is like a program you create 
to perform a task for you. That function then becomes in charge of 
that task. It will be the function you will call whenever you need that 
task doing. That is why we give functions names, and that is why 
you will always hear the terminology ‘call’ or ‘function call’ when 
you hear programmers speak of functions. 
  If the function were a person, a task master, then depending on your 
agreement with them you may need to tell them what task to perform 
whenever you call them, unless they have a specific task, in which 
case you would not need to pass the task to them whenever you 
call them. The task you pass to a function when you call it is known 
as an argument. Imagine you asking your mathematician or calculator
to add some numbers up for you. You would pass to them the numbers 
you want adding up, and then expect the results back. The numbers 
you pass in are the arguments. A function argument can be one or 
multiple depending on what you want done. 
So in brief, a function is a program you write to do a task for you, 
while function arguments are the values you provide to the function 
to help it accomplish what it needs to do for you. Here is the 
same function above, given an argument.
  As I mentioned above, the task meant to be performed by the 
greeting() function is the code that you put within the curly brackets 
of the function, also known as the body of the function. Our greeting() 
function above does not need an argument because it has a specific 
task, to respond with a “Hello”, and it will do just that as often 
as you call it. You can call a function from anywhere in your code by 
simply writing its name followed by the pair of parentheses. Make the 
function call at exactly the part of your application where you want 
its response to be output. To call our greeting() function, do it like so:

	greeting();

Notice how we put a pair of parentheses as we call the function. This 
has to be done even if you are not passing any arguments to the function, 
else the function call will not work.

  If you want the function to do anything other than return the text “Hello”,
and maybe say “Hello” addressed to whatever name you pass to it as 
its argument, you can modify the function by passing it an argument. 
You would also need to then modify its body to use that argument in its 
result. Here is how to do it: 

	let username = "John";

	function greeting(userName) {
		console.log("Hello " + userName);
	}

	// call the function 
	greeting(username);

The output of this function call will be:

  Hello Gustav

Notice how the function takes the value handed to it and, in combining 
it with the string “Hello”, closes that string first and then joins it to 
the value using the “+” character.
  That is the same + you would use to add two numbers together, but 
when it is given strings rather than numbers it does something 
different: it joins them end to end. Used this way it is called the string 
concatenation operator. In this case, it combines the string 
“Hello” with the value of the username variable, which is also a string. 
So string concatenation means combining two or more strings into one, 
whether one or all of those strings are literal strings, or they are strings 
stored in a variable.   


## THE ARGUMENTS OBJECT

In JavaScript, there is a concept known as the `arguments` object. It's an array-like object that is automatically available inside all functions, and contains all the arguments passed to a function, even if the function doesn't explicitly list them as parameters. Eg:

```
function sumAll() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
```

	let result = sumAll(1, 2, 3, 4); // result will be 10

Key Points:

- `arguments` Object: Inside any function, `arguments` is an array-like object that holds all the arguments passed to the function.
- I say “array-like” because it behaves like an array (you can access elements with `arguments[0]`, `arguments[1]`, etc.), but it doesn't have all the array methods like `.map()`, `.forEach()`, etc.
  

#### HANDLING VARIED ARGUMENTS AS REST PARAMETERS
Besides the arguments object, there is a more modern and flexible way to handle a variable number of arguments passed to a function when it is called—using rest parameters (...).
Rest parameters (...rest) collect multiple arguments into an array. They are written inside the parentheses of a function, such as ...numbers or ...args, though ...rest is commonly used as a placeholder name.
However, rest parameters do not "convert" function arguments into an array in the same way as Array.from(arguments). Instead, they create a true array of the collected arguments, making it more convenient to use array methods like .map(), .filter(), and .reduce().
See the notes in Chapter 3 (Arrays), where we discuss how rest parameters are useful for handling a variable number of function arguments and how they differ from the spread operator (...spread). The spread operator is used to expand an array (or other iterable) into individual elements rather than collecting elements into an array.
It's important to note that the spread operator does not "convert" an array into a string of comma-separated items—instead, it breaks an array into separate values that can be passed into functions, array literals, or object literals. (For converting an array into a string, we use .join(",").)

  In a way, rest parameters can be seen as the opposite of the spread operator, since rest parameters collect multiple values into a single array while the spread operator takes an array and expands it into multiple values.
  The main thing however, is to understand these points about rest parameters:
  - They are used in function parameters
  to collect multiple arguments into a
  single array.
  - They are always placed at the end of
  the function parameter list.

Here is an example:

	function sum(...numbers) {
   		return numbers.reduce(
		    	(acc, num) => acc + num, 0);
	}

	console.log(sum(1, 2, 3, 4)); // 10
	console.log(sum(5, 10));      // 15

Rest gathers the multiple arguments passed to the function into an array for use within the function (numbers becomes [1, 2, 3, 4] in the first call). Now that numbers is an array, that’s why in this example, the array function reduce() is called on numbers. Again, be reminded that ...numbers could just as well be ...data or ...rest and it will all still work in the same way.
  

-A JavaScript function like this that accepts 
rest parameters can be considered a variadic function. A variadic function in any programming language is one which is capable of accepting a varying (or unknown) number of arguments. Hence the name variadic. Rest parameters are the specific JavaScript syntax 
used to implement this capability. The keyword ‘rest’ in ‘rest parameters’ comes from the significance of the ‘...’ characters. They hint at the fact that the rest of the arguments will follow, thereby indicating that there can be multiple and an unknown number of arguments.
  
-In conclusion; the `arguments` object is useful, but in modern JavaScript, rest parameters (`...`) are generally preferred for better readability and functionality.


## ARGUMENTS WITH DEFAULT VALUES
  There are times when you write a function and want one or more of the arguments you pass into it to have default values. These are values that will be used by the function even if no argument is passed in. Here is a simple example:

	let member = {
    		name: "",
    		type: "member",
    		setMember: function(name, type = "member") {
       		     this.name = name;
        	     this.type = type;
    		}
	};

	member.setMember("Dolph");
	console.log(member.type); // "member"

	member.setMember("Dolph", "admin");
	console.log(member.type); // "admin"


This code has a member object named member. Once a new member is created by calling setMember on the object, if a desired member type is not given, the type will be set to ‘member’. The creator of this code would do this because they want a minimum type of ‘member’ to be applied to all new users. The first time we run the function like so:

 	member.setMember("Dolph");

we get ‘member’ written to the console.

The second time we run the function like so:

 	member.setMember("Dolph", "admin");

we get ‘admin’ written to the console.
  Note that we call it as member.setMember(...) and not just 
setMember(...). The function belongs to the member object, so you 
have to reach for it through that object. Calling it on its own would 
give you a ReferenceError.
  You will also have spotted the word "this" inside the function. That is 
a keyword meaning "the object I belong to", and it has a section of its 
own later in this chapter.


## TO RETURN SOMETHING OR TO DO SOMETHING

  Most often, you want a function to return some kind of
data to you, which you need in your program. This could be
the result of a mathematical operation which the function
has performed, or just some data that the function has
fetched for us. In this case we use a ‘return’ keyword within
the body of the function to return the data after the function
has completed its job.
  It is very common to capture that returned
data in a variable so that you can use it further in your
program. Here is an example of a function returning
its result.

	function addNumbers(numOne, numTwo)
	{
		return numOne + numTwo;
	}

	// capture/store the result of calling addNumbers() in 
	// a variable
	let sum = addNumbers(5, 5);

	//use the result
	console.log('The sum of the two numbers is: ' + sum);


  However, there are times when you do not want a 
function to return anything. In these scenarios, you 
just want the function to do something and hand nothing back.
Here is an example of a function that changes the value
of a variable and does not return anything:

	let appStatus = true;

	function updateStatus()
	{
		// if the appStatus is true, set it to false & vice versa
		if (appStatus == true) {
			appStatus = false;
		}
		else 
		{
			appStatus = true;
		}
	}

	// no need to capture/store the result of calling the 
	// function updateStatus() since nothing is returned
	updateStatus();


## FUNCTIONS AND VARIABLE SCOPE
  Scope relates to the visibility of a variable. We cover 
everything about scopes in Chapter 2 (Variables), but I 
will briefly hint at how it applies to code used within 
functions. There are three scopes of variables you can 
use within a script. There is the global scope, there is 
the function scope (which is still a type of block) and 
there is the block scope. Let and const variables can 
only be made local (scoped) within blocks—and remember 
that a function is itself a kind of block—because let and 
const variables are block-scoped. Variables declared with the var keyword
can only be made local (scoped) within functions because 
they are function-scoped. Any variable (var, let or const) 
declared outside of a function or block is a global variable.
Please see Chapter 2 (Variables) for a thorough explanation
of the concept of scopes and blocks. Let’s see this in an 
example:

	var appStatus = true;

	function updateStatus()
	{
		var testLocalVar = "wild"; 
	}


	console.log(appStatus);

	updateStatus();

	console.log(testLocalVar);


  Because the variable appStatus is declared outside 
of any function, it is a global variable and can be 
accessed from anywhere in your code, whether that 
code is inside of a function or outside of it. That is 
why appStatus can be read from inside the 
updateStatus() function just as easily as from outside 
it. Wherever you log it from, you get the same value, 
true, displayed in the console.
  If a variable is declared inside a function like 
the testLocalVar variable that is declared using the 
var keyword inside the function updateStatus(), it will 
always be a variable local to the updateStatus() function. 
This is because var variables are function-scoped. If the 
testLocalVar variable had not been declared with the 
var keyword at all, it would instead have become a 
global variable. When the variable is local, it cannot be 
seen from outside that function, so any attempt to use 
it from outside will result in JavaScript throwing a 
ReferenceError, saying that testLocalVar is not defined. 
It is always recommended not to declare global variables 
inside of functions or blocks, because that defeats the 
whole purpose of encapsulating code within functions or 
blocks. To respect the integrity of your code therefore, it 
is the popular convention among JavaScript developers to 
always declare variables with let or const, so that the 
variables respect the scope (local area) in which they 
have been declared. You will still meet the older var 
keyword in existing code, which is why it is worth knowing, 
but it is not what you should reach for in new code.
To learn everything about variable scopes, see Chapter 2 
(Variables).


## ANONYMOUS AND ARROW FUNCTIONS
  An anonymous function is a function without a name. It is often assigned to a variable or passed as an argument.

	const greet = function(name) {
	    return `Hello, ${name}!`;
	};

	// Output: "Hello, Alice!"
	console.log(greet("Alice")); 

Here are the key points on anonymous functions:
  - It can be stored in a variable or passed as
  an argument.
  - It uses the function keyword.
  - It has its own this context.

  Arrow functions can be said to be the new and simplified way of writing functions in general that was introduced since ES6. An arrow function has a shorter syntax for writing functions using the arrow character =>. It has lexical this binding.
  That phrase is worth unpacking, because you will meet it often and it
is rarely explained. ‘Lexical’ simply means ‘to do with the written text
of your code’. A lexical rule is one settled by WHERE something appears
on the page, rather than by what happens while the program is running.
  So ‘lexical this binding’ means that an arrow function’s this is fixed
by where the arrow function was written in your source code, and nothing
afterwards can change it. A regular function is quite different: its this
is worked out at the moment it is called, from whatever it was called on.
The same regular function handed to two different objects will report a
different this for each of them, whereas an arrow function will report
the same one no matter who calls it.
  We will see this in action shortly, in the section on the this keyword.
You will also meet the same word in ‘lexical scope’, where it means the
same thing again: which variables a piece of code can see is decided by
where that code sits in the source, not by who calls it.

  The left side of the arrow has the argument(s) being passed to the function, while the right side of the arrow constitutes the return value. Let us simplify the above greet() anonymous function by converting it into an arrow function:

	const greet = (name) => `Hello, ${name}!`;

	// Output: "Hello, Alice!"
	console.log(greet("Alice")); 

Here are the key points about arrow functions:
  - More concise than traditional functions.
  - Does not use the function keyword
  - Do not have their own this, but rather
    inherit it from the surrounding scope
    (lexical).
  - Cannot be used as a constructor
    (new keyword won’t work).
  - Implicit return when using a single
    expression.
  - The left side of the arrow has the
  argument(s) being passed to the
  function, while the right side of the arrow
  constitutes the return value.
	
    ```
    (arguments) => value;
    ```

Note that there is no return keyword in that
line. With a single expression the return is
implied, and writing (arguments) => return value
is a SyntaxError. If you do want to write return
out in full, you need the curly braces around it:

	   (arguments) => { return value; }


#### Convert an anonymous function into an arrow function

	An anonymous function can always be converted into an arrow function. Let’s convert the above anonymous function into an arrow function. To do so, simply replace ‘function()’ with ‘()  =>’:

	let greet = function() {
		return "Hello";
	}

	//make the change (this is the same greet, rewritten,
	//not a second one)
	let greet = () => {
		return "Hello";
	}

We can shorten the syntax even further. If all we are returning in the function is one single expression, then we do not need the opening and closing curly braces, nor do we even need the return keyword. Here is what the function can be reduced to:

	let greet = () => "Hello";

	You therefore see how short and concise our code can be as a result. Always remember that whatever comes after the arrow (=>) is automatically implied to be the return value of the function. What comes on the left side of the arrow will be any parameters—if applicable—with or without parentheses. 


## Quick object literals from function arguments
  You sometimes have a function in your code that simply needs to return an object literal from arguments passed to the function. If you do not know what object literals are, quickly hop over to Chapter 17 (Object Oriented Programming) and read about objects and object literals before hopping back here to continue. Here is an example of such a function. Since we are on the topic of functions, just for the purpose of better understanding of the differences, I will write three versions of the same function; one using the traditional function syntax, one in anonymous function syntax, and one in the arrow function syntax. The differences should be very subtle, and you should be able to distinguish between them by now:

(These three are alternatives to each other, not three things
to write out one after the other. Pick whichever you prefer.)

```
// traditional function
function createObject (make, model, year) {
        return {
            make: make,
            model: model,
            year: year
        };
    };
```


```
// anonymous function version
const createObject = function(make, model, year) {
        return {
            make: make,
            model: model,
            year: year
        };
    };
```


```
// arrow function version
const createObject = (make, model, year) => {
        return {
            make: make,
            model: model,
            year: year
        };
  };
```
    
console.log(
	createObject('Toyota', 'Rav4', '2025')
);


This function return value will be the object:

   {make: 'Toyota', model: 'Rav4', year: '2025'}


  Notice that the keys of the object literal returned by the function exactly match the parameters of the function. This seems like a repetition of the same names, first in the function argument, and then again in the keys of the object literal being returned, as seen in make, model, and year in the createObject() function above. With the coming of arrow functions in ES6 (ECMAScript 2015), and as part of the code simplification effort, came the provision of a simplified way for this exact same situation. Basically, if you are creating a simple function that returns an object literal, and you know the object it will return is going to, or should have keys that exactly match the names of the arguments you are passing to the function, then you can really simplify the function return code in one line by placing the parameter names in curly braces separated by commas. Here is how:

	const createObject = 
		(make, model, year) => 
			({make, model, year});

	console.log(
		createObject('Toyota', 'Rav4', '2025')
	);

 One detail there is easy to miss and worth pausing on. The object
 literal is wrapped in its own pair of round brackets:

	({make, model, year})

 Those brackets are not decoration. Without them, JavaScript reads the
 curly braces as the function's body rather than as an object you want
 back, and the function quietly returns undefined. The round brackets
 are what tell it "this is a value, not a block".

 The return value of this simplified code is still the same:

	  
     {make: 'Toyota', model: 'Rav4', year: '2025'}


#### Anonymous and arrow functions and the this keyword

Here is an example of how the this keyword works differently with both function types:

	const obj = {
    		value: 10,
    		regularFunction: function() {
        	   console.log(this.value); // Works: 10
   	       },
    	   	arrowFunction: () => {
		   // Undefined (inherits from parent scope)
        	   console.log(this.value); 
    	   	}
	};
	obj.regularFunction();
	obj.arrowFunction();

To modify obj.arrowFunction() so that it successfully 
accesses the value property, you need to use a regular 
function instead of an arrow function. Since arrow 
functions do not have their own this, they inherit it from 
the surrounding lexical scope, which in this case is the 
global scope (or undefined in strict mode). 
To make the arrowFunction() above work, here is a good 
fix that replaces the arrow function with a regular function:

const obj = {
    value: 10,
    regularFunction: function() {
        console.log(this.value); // Works: 10
    },

	    // Changed from an arrow function to a regular one.
	    // Note the name no longer really fits, but it is kept
	    // here so you can see exactly what changed.
	    arrowFunction: function() { 
	        // Works: 10
	        console.log(this.value); 
	    }
	};

	obj.regularFunction(); // 10
	obj.arrowFunction();   // 10 - now it works

Alternatively, if you still want to use an arrow function, one 
older trick is to capture (store) the ‘this’ word in a variable 
(often called self) inside a regular function, then use an arrow 
inside that function so that the arrow can reach that variable. 
Here is an example:

```
const obj = {
    value: 10,
    fixUsingLexicalScope: function() {
        const self = this; // Capture this
        const arrowFunction = () => {
            console.log(self.value); // Works: 10
        };
        arrowFunction();
    }
};
```

	obj.fixUsingLexicalScope(); // 10

  That pattern is worth recognising, because you will meet it in
older code written before arrow functions existed. These days you
do not actually need it. An arrow function written inside a regular
method already inherits that method's this, so the self variable is
doing no work:

```
const obj = {
    value: 10,
    fixWithoutSelf: function() {
        const arrowFunction = () => {
            console.log(this.value); // Works: 10, no self needed
        };
        arrowFunction();
    }
};
```

	obj.fixWithoutSelf(); // 10

  The thing to hold on to is that an arrow function takes its this
from wherever it was written. Written directly on an object literal,
that is the surrounding scope, not the object. Written inside a
method, it is the method's this, which is what you usually want.

As a reminder, here is an anonymous function again. It does not 
have a name:

	let greet = function() {
		return "Hello";
	}


## Passing arguments to an arrow function
  Say we have a regular function as below:

	let addThemUp = function(arg1, arg2) {
		return arg1 + arg2;
	}

	// Output: 7
	console.log(addThemUp(4, 3));

	To convert it into an arrow function and yet keep the arguments being passed to it, instead of replacing function() with () => as before, we need to keep the arguments passed. The right way to do it is this:

	let addThemUp = (arg1, arg2) => arg1 + arg2;

Some functions in JavaScript accept functions as arguments for processing collections of data, for example higher order functions like map(), filter(), and reduce() etc. Whenever a function accepts another function as an argument, that is a good time to use an arrow function.

  If the arrow function only accepts a single argument, then you do not even need to put the argument in parentheses—though it will still work if you do. For example, this function

	const square = function(num) {
		 return num * num;
	}

 Will become:

	const square = num => num * num; 

  Still on the subject of arguments being passed to arrow functions, there is a way arguments work when it comes to higher order functions that we need to understand too. First of all, let’s define what a higher order function in JavaScript is. A higher-order function (HOF) is a function that either takes one or more functions as arguments or returns a function as its result. Simply put, higher-order functions work with other functions, treating them as first-class citizens (meaning functions can be assigned to variables, passed as arguments, and returned from other functions). Again, as I said, examples of such functions are map(), filter(), and reduce() etc. We have already come across these functions before so I am not here to explain how they work. Rather, I mention them to demonstrate how such functions handle the arguments that they receive in a unique way.
  These higher order functions all have something in common—they perform some kind of iteration on some data, while running the function on each one of them. I will take just one of them as an example; map(). Take a look at this example:

	const data = [1, 2, 3, 4];
	const doubled = 
		data.map(num => num * 2);

	console.log(doubled); // [2, 4, 6, 8]

The way map() works with its arguments, it uses an arrow function. It iterates over the given data, which in this case is a series of numbers in an array. Note that the value in its parentheses is an arrow function, and it looks like this:

	num => num * 2

	It is important to note that num on the left side of the arrow (num =>) is always the argument, and in this case, num represents a different number in the data array at each iteration, which it passes in to be processed by the function or expression on the right side of the arrow (=> num * 2). 

	Note also that the name num is entirely your choice. It can be anything you like and the code will still work, so long as the name on the left of the arrow matches the one used in the expression on the right of it (=> num * 2). Therefore, in the above example, either of the following lines would work the same: 

	num => num * 2
	dat => dat * 2

I said everything above to talk about this num value on the left side of the arrow, which is the value map() passes into the arrow function at each iteration. Because num is only one parameter, it is used without parentheses around it. However, if we were dealing with more than one, we would have had to place them in parentheses. map() passes only one value in its iteration, hence we end up with the arrow function looking like this, with no parentheses around the single parameter on the left side of the arrow:

	num => num * 2;

Working with reduce() on the other hand, which takes a function as an argument and accumulates values into a single result, the arrow function it is given has two parameters, as seen in ‘acc’ and ‘num’ below

	const numbers = [1, 2, 3, 4];
	const sum = numbers.reduce((acc, num) => acc + num, 0);

	console.log(sum); // 10

Hence its arrow function looks like this:

	(acc, num) => acc + num

Note that we keep the two parameters within parentheses, because 
there is more than one of them.
  Take care not to read that trailing , 0 as part of the arrow 
function. It is not. It is reduce()'s own second argument, the value 
the accumulator starts from, and it sits outside the arrow function 
entirely.


Immediately Invoked Function Expression 
#### (IIFE)
  An IIFE (Immediately Invoked Function Expression) is a self-executing function that runs immediately after it is defined. It is wrapped in parentheses to make it an expression, and then followed by () to invoke it immediately.

Here is the basic syntax:

	(function() {
    		console.log("I run immediately!");
	})(); 

	// Output: "I run immediately!"

### Why should you use an IIFE
We use it for the following reasons:

  - It avoids polluting the global scope –
  variables inside the IIFE stay private.
  - It executes immediately – No need to
  call it separately.
  - It is useful for initialisation code –
  meaning, it would make a good place to
  run your application setup logic code
  just once.


### Private Variables with IIFE
  Let’s see how you can have private variables that are only available within an IIFE.
 
	const result = (function() {
    		let secret = "Hidden Data"; 
   		 return secret; 
	})(); 

	// Output: "Hidden Data"
	console.log(result); 

	// Output: undefined (because it's private)
	console.log(typeof secret); 

  In this example, the variable secret is not
  accessible outside the IIFE.


### IIFE with Parameters
  You can pass arguments into an IIFE like a normal function:

	(function(name) {
    		console.log(`Hello, ${name}!`);
	})("Alice");

	// Output: "Hello, Alice!"


### Arrow Function IIFE
	  With ES6, we can write IIFEs using arrow functions. We already know from studying arrow functions that you convert a regular function into an arrow one by replacing the “function” keyword with a pair of parentheses and an arrow like so “() =>”, and that if there are any parameters, they will go into the parentheses on the left side of the arrow.

	(() => {
    		console.log("Arrow function IIFE");
	})(); 
	// Output: "Arrow function IIFE"
