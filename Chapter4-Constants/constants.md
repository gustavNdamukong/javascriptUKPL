

//————————————————————//
	CHAPTER 4 - CONSTANTS
//————————————————————//

	   -Mutating a const array


A constant is like a variable, but with one 
   key difference: its value is immutable,   
   meaning that once a constant is 
    assigned a value,that value cannot be 
    changed. It is created by declaring it 
    with the const keyword, for example:

	const fee = 20;

-Like a variable, a constant stores a single 
   value in the computer’s memory.
-However, unlike variables, constants 
   cannot be reassigned after their initial 
   definition.
-Constants are useful for storing fixed 
  values that should remain the same 
  throughout the program, such as tax rates, 
  company names, or configuration settings.
-Here are the key points about constants:
    ✔ Use const when you never want the 
           value to change.
   ✔ Constants help make your code more 
           predictable and error-free.
   ✔ Trying to reassign a constant will 
          cause an error.

-Here’s a real-world example using 
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
       console.log(`Final price: 
           $${calculateTotalPrice(itemPrice)}`); 

       // Output: Final price: $115

Why Use a Constant Here?
    - The tax rate shouldn’t change 
       throughout the program.
    -It makes the code clearer—you instantly 
       know what TAX_RATE represents.
    -It prevents accidental changes that 
       could cause calculation errors.



Mutating a const array
————————————
  I know we said above that the value of a 
const variable is immutable. However there is an exception. Though you cannot re-assign the value of a const variable, if that value is an array, you can actually change the values of specific keys in that array. 

	const testData = [5, 10, 20, 25];

	function tryToMutateConstVar() {
    		testData = [15, 110, 120, 125];
    
    		console.log(testData);
	}

	tryToMutateConstVar();

The output of this code will be an error like so:

	TypeError: Assignment to constant 
       variable.

But you can work around that since the const variable is an array and target and mutate the values of specific keys of it. Here is how; to modify the array key values, you would use the bracket notation.

	const testData = [5, 10, 20, 25];

	function tryToMutateConstVar() {
    		testData[0] = 200;
    		testData[1] = 0;

    		console.log(testData);
	}

	tryToMutateConstVar();

The output will return the changed contents of The array like so:

	[200, 0, 20, 25]