

# Chapter 4 — CONSTANTS

	   -Mutating a const array
	   -Mutating a const object


A constant is like a variable, but with one 
   key difference: once a constant has been 
   given a value, you cannot point it at a 
   different one. It is created by declaring 
   it with the const keyword, for example:

	const fee = 20;

- Like a variable, a constant stores a single
   value in the computer’s memory.
- However, unlike variables, constants
   cannot be reassigned after their initial 
   definition.
- Constants are useful for storing fixed
  values that should remain the same 
  throughout the program, such as tax rates, 
  company names, or configuration settings.
- Here are the key points about constants:
  - Use const when you never want the
  value to change.
  - Constants help make your code more
  predictable and error-free.
  - Trying to reassign a constant will
  cause an error.

- Here’s a real-world example using
   constants in a shopping cart scenario to 
   calculate a total price with a constant 
   tax rate. Imagine you’re building an online 
   store. You want to calculate the final price 
   of an item after adding tax. Since the tax 
   rate never changes, it’s a perfect use 
   case for a constant.

       // 15% tax rate (constant)
       const TAX_RATE = 0.15;

       function calculateTotalPrice(price) {
          // Calculate tax
          const taxAmount = price * TAX_RATE;

         // Add tax to price
         const totalPrice = price + taxAmount;

         return totalPrice;
       }

       // Example usage
       const itemPrice = 100;
       console.log(`Final price: $${calculateTotalPrice(itemPrice)}`);

       // Output: Final price: $115

Why Use a Constant Here?
  - The tax rate shouldn’t change
  throughout the program.
  - It makes the code clearer—you instantly
  know what TAX_RATE represents.
  - It prevents accidental changes that
  could cause calculation errors.

  You may have noticed something about the name TAX_RATE. Back in Chapter 2 we said that
programmers normally name variables using camel casing, like taxAmount or itemPrice, and
that is still true. Look at the example above and you will see that taxAmount, totalPrice
and itemPrice all follow that rule, even though they are declared with const.
  TAX_RATE is different because it is a fixed setting: a value written into the program
once and never worked out from anything else. For those, the convention is to use capital
letters with underscores between the words. It is a signal to anyone reading the code that
this is a dial someone chose, not a value the program calculated. You will see the same
style used for things like MAX_LOGIN_ATTEMPTS or API_URL.
  So the rule of thumb is: camel case for almost everything, including most of your consts,
and CAPITALS_WITH_UNDERSCORES only for fixed settings of this kind.



### Mutating a const array
  We said above that you cannot point a const 
at a different value. That is true, and it is worth being precise about what it does and does not protect. const guards the name, not the contents. So although you cannot re-assign a const variable, if the value it holds is an array, you can still change the values at specific keys inside that array. 

	const testData = [5, 10, 20, 25];

	function tryToMutateConstVar() {
    		testData = [15, 110, 120, 125];
    
    		console.log(testData);
	}

	tryToMutateConstVar();

The output of this code will be an error like so:

  TypeError: Assignment to constant
  variable.

But since the const variable holds an array, you can target and change the values at specific keys inside it. Here is how: to modify the array key values, you use the bracket notation.

	const testData = [5, 10, 20, 25];

	function tryToMutateConstVar() {
    		testData[0] = 200;
    		testData[1] = 0;

    		console.log(testData);
	}

	tryToMutateConstVar();

The output will be the changed contents of the array, like so:

  [200, 0, 20, 25]


### Mutating a const object
  The very same thing is true of objects. If a const holds an object, you cannot point the
name at a different object, but you can change what is inside the one it already holds.
  Trying to replace the whole object fails:

	const person = { name: "Alice", age: 30 };

	// TypeError: Assignment to constant variable.
	person = { name: "Bob", age: 25 };

  But changing a property inside it works perfectly well:

	const person = { name: "Alice", age: 30 };

	person.name = "Bob";
	person.age = 25;

	// Output: { name: 'Bob', age: 25 }
	console.log(person);

  So it is worth holding on to this one sentence, because it catches almost everybody out at
least once: const protects the name, not the contents. If you genuinely need the contents
frozen too, JavaScript has a separate tool for that called Object.freeze(), which we will
meet when we come to objects in Chapter 17.