
//—————————————————————//
      SOLUTIONS TO CHAPTER EXERCISES
//—————————————————————//

	-Exercises with control flow

	(Exercises with variables have been migrated to
	 Chapter2-Variables/quiz.md, and exercises with
	 arrays to Chapter3-Arrays/quiz.md)






——————————————————————
	Exercises with Control Flow
——————————————————————

-1) Create an array in a constant containing people names. Use a while loop 
	to loop through the array and display the elements on screen.

		const people = ['Alice', 'Bob', 'Charlie', 'Diana'];
		let i = 0;

		while (i < people.length) {
  			document.body.innerHTML += people[i] + '<br>';
 	 		i++;
		}

		This is going to display the names in the array like so:
			Alice
			Bob
			Charlie
			Diana

	Here we loop through the people array using a while loop and print each name to the screen. We use document.body.innerHTML += to keep adding each name without deleting the previous one.



-2) Create a numbers array containing numbers from 1-10 stored in a 
	constant. In a while loop, loop through the numbers and use the modulus 
	operator to check if each of the numbers is an even number, and if so 
	display it on screen. This will help you practise using while loops and the 
	less-commonly used but powerful modulus operator.

		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		let i = 0;

		while (i < numbers.length) {
  			if (numbers[i] % 2 === 0) {
    				document.body.innerHTML += numbers[i];
  			}
  			i++;
		}

	We loop through the numbers and use the modulus operator (%) to check if a number is divisible by 2 (i.e., even). If it is, we print it. This should display only the even numbers:

		246810



-3) Create a numbers array containing numbers from 1-10 stored in a 
	constant. Create three empty arrays: evenNumbers, divisibleBy3, and 
	otherNumbers. Loop with a while loop through the numbers array and 
	while in the loop, using if...else if conditional statement and the modulus 
	operator, do the following checks: 
			
	-i) check if a specific number is divisible by 2 and put it in the 
		evenNumbers array if it is.
	-ii) check if a specific number is divisible by 3 and put it in the 
		divisibleBy3 	array if it is.
	-iii) otherwise put the number in the otherNumbers array
		Once out of the loop, display the contents of all the three arrays you 			created (the evenNumbers, divisibleBy3 and otherNumbers 
		arrays). This exercise is meant to master how if...else if statements 
		work. 

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

		document.body.innerHTML += 'Even Numbers: ' + 
			evenNumbers.join(', ') + '<br>';

		document.body.innerHTML += 'Divisible by 3: ' + divisibleBy3.join(', ') 
			+ '<br>';

		document.body.innerHTML += 'Other Numbers: ' + 
			otherNumbers.join(', ') + '<br>';





		The result will be displayed on screen as follows:
		
			Even numbers: 246810
			Divisible by 3: 3,9
			Other numbers: 1,5,7

	  Note that the second array should contain 6 but it doesn't. This is 
	because 6 was divisible by 2 in the first conditional check, and so it was 
	not checked for in the else if conditional that followed below it. 
	  To fix this, let all the conditional statements be if statements, and let the 
	else (last) statement also be an if statement that checks for two 
	conditions like so: if ((numbers[i] % 2 != 0) && (numbers[i] %3 != 0)). 
	You will therefore have a series of only if statements with no else clauses. 
	This is completely legal and valid code; but it just means that each if 
	statement will be ran by your code regardless of what action was taken 
	within any of the other previous statements. That example of all-if 
	blocks will look like so:

		while (i < numbers.length)
		{
			if (numbers[i] % 2 === 0)
			{
				//it is an even number (its exactly divisible by 2)
				evenNumbers.push(numbers[i]);
			}
			
			if (numbers[i] % 3 === 0)
			{
				//it is  divisible by 3
				divisibleBy3.push(numbers[i]);
			}
		
			if ((numbers[i] % 2 != 0) && (numbers[i] %3 != 0))
			{
				otherNumbers.push(numbers[i]);
			}
			i++;
		}

This example shows how to use conditional statements inside a loop. We use the modulus operator to sort the numbers into three different categories and then display each category.




-4) Practise the do...while loop.
	Create an array called names containing names.
	Use a do...while loop to iterate over the names array and display them 
	on screen.

		const names = ['John', 'Susan', 'Mary', 'Ann'];
		let i = 0;

		do {
  			document.body.innerHTML += names[i] + '<br>';
 		 	i++;
		} while (i < names.length);

	This will print on screen the following:

		John
		Susan
		Mary
		Ann

	To verify that the do...while loop actually runs the first iteration without checking for the conditional, let us write a conditional saying if the name 'John' is encountered, the loop should stop. 

		do {
			document.body.innerHTML += names[i]+',';
			i++;
		}
		while ((i < names.length) && (names[i] != 'John'));

This still runs the iteration through all the 4 elements in the names array and displays: 
		John
		Susan
		Mary
		Ann
		
This is because the first iteration is ran anyway without checking the conditional. By the second iteration, the conditional is checked but then none of the other elements match the string of 'John' so all the other names are displayed on screen as well. Now if you changed the name in the conditional to anything other than John, then the iteration will stop when it comes to that string in the names array. For example, 

		do {
			document.body.innerHTML += names[i]+',';
			i++;
		}
		while ((i < names.length) && (names[i] != 'Mary'));
	
This runs the iteration twice because the 'Mary' string is the third element in the names array and so it stops when it comes to it. Therefore only the following two names are printed on screen: 
		
		John
		Susan



-5) Practise using the ternary operator.
	Create an array named light with one string element 'green' in it.
	Create an 'action' variable and use a ternary operator to assign it a 
	value of 'Go' if the string in the light array is 'green', or 'stop' if the 
	string is 'red'.
	  Use an alert popup to display the value of the 'action' variable.

		const light = ['green'];
		const action = (light[0] === 'green') ? 'Go' : 'Stop';

		alert(action);

	As it stands, the alert popup will display: 'Go' But if you change the value 
	of light to 'red' and refresh your page, the alert popup will say: 'Stop'.