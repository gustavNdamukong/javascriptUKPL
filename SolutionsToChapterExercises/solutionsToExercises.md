
//—————————————————————//
      SOLUTIONS TO CHAPTER EXERCISES
//—————————————————————//

	-Exercises with variables
	-Exercises with arrays
	-Exercises with control flow





——————————————————————
	Exercises with variables
——————————————————————



	Exercise 1: 	

This exercise will teach you how to generate HTML elements in JavaScript and insert them in the HTML section of your code.

	-a) Create a div element in your HTML with a specific ID
	-b) Within your JavaScript tag, create a variable assigning it a paragraph 
 		HTML element. 	
	-c) Dynamically (using JavaScript) grab the div and insert that <p> tag 
		inside of it.

		<html>
		<body>
			<div id="myDivElem"></div>

			<script type=”text/javascript”>
				let pTag = "<p>This is my awesome p tag</p>";
				let div = document.getElementById('myDivElem');

				div.innerHTML = pTag;
			</script>
		</body>
		</html>
		
Take note of how you need to put HTML tags within quotes when you create them in JavaScript. e.g. in let pTag = "<p>This is my awesome p tag</p>";
When you refresh your web page, you will see the text “This is my awesome p tag” displayed, and it is coming from the p tag you dynamically created and injected into the ‘myDivElem’ div tag 

	

Exercise 2: 

  This exercise will teach you how to get the user to supply some information to your application and take and use that information.
		
	-a) Display a prompt on screen asking the user to enter their forename
	-b) Display a prompt on screen asking the user to enter their surname
	-c) Store those values in variables, then 
	-d) Show an alert with a text telling them what their forename and 
		surnames are.
	
  When you refresh your web page in the browser, you should see two prompt dialog popups one after the other; one asking you to enter your first name, and if you enter the value for your first name and press enter or hit Ok, another popup will appear asking you to enter your surname. After entering the value for your surname and hitting Ok, you will get a final alert popup on saying something like “Your first name is theForenameYouEntered, and your surname is theSurnameYouEntered”. 

	let firstname = prompt('Please enter your first name', 'Enter first name');
	let surname = prompt('Please enter your surname', ' Enter surname');

	alert('Your first name is '+firstname+' and your surname is '+surname);
                



Exercise 3:

	This one will show you how to modify the value of an HTML element.
		-a) Create a div in your HTML and give it an ID
		-b) Place a p tag with some text manually in the div in your HTML. 
			Refresh your 	web page in the browser and you should see the 
			text in the p tag displayed on screen. 
		-c) Next, create a variable in JavaScript and assign an image tag to 
			it
		-d) Dynamically grab the div, remove the p tag with text inside of it 
			and replace it with the image you have created in JavaScript. 

	When you replace your web page, the image should be displaying in the 
	place of the text that was being displayed before.

		<html>
		<body>

			<div id="myImgDiv"><p>My manual p tag here </p></div>


			<script type=”text/javascript”>
				let image = "<img src='visa.png' />";
				let div = document.getElementById('myImgDiv');
		
				//remove what is already in the target div
				div.innerHTML = '';
				div.innerHTML = image;
			</script>
		</body>
		</html>

Notice how we dynamically create an image tag in JavaScript and insert it as a value into another HTML element, in this case the myDiv tag.
  Again, when we create the HTML element, we must enclose it within quotes as a string. Another comment I will like to make is that if you look at the image tag being assigned to (stored in) the image variable,  and you will see that because we use used double quotes around the entire image tag, the source attribute which also needs quotes cannot have double quotes as well. You cannot nest the same type of quotes inside another set of quotes or it will have a conflict and fail. To resolve this, you can do one of two things; either use another type of quotes for the internal quotes 	as we have done in this case for the src attribute (single quotes), or escape the internal quotes using an escape character, which is a back slash (\).
  Therefore either of the following lines would work just fine:

		let image = "<img src=\”visa.png\” />";

		let image = "<img src='visa.png' />";

  The escape character basically tells the browser that the quote coming after the escape character is not to be seen as a matching quote of the preceding one around the tag, and so it will be ignored and just included as part of the string to be stored. 






——————————————————————
	Exercises with arrays
——————————————————————

-1) Loop through an array running a function on each element. When you 
	get a problem to solve in programming, the first thing you need to do 
	is think of what tool is available in the programming language you are 
	using that can achieve what you are trying to accomplish. Think of 
	the structure of the data form you have been given to deal with in the 
	problem. Data structure is also referred to as the data construct. In 
	this case we are dealing with an array, so ask yourself what tool 
	JavaScript provides for dealing with arrays; the many array methods 
	come to mind. Now, ask yourself if any of those methods can solve 
	this problem. Sure enough a bell may ring in your head about the 
	map() method which takes a function and runs it on all the elements 
	of a given array. Now that you have thought of the tool; the problem 
	is half solved. You just need to make it happen by writing the code, so 
	let's do that.
	  We are going to use an example of an array of numbers, and run a 
	function that 	multiplies every number in that array by two. Before we 
	do it, be aware that map() can be passed a JavaScript built-in 
	function or a custom built one by you. We are going to write our own 
	function that takes a number as its argument (num) and simply 
	returns that number multiplied by two. We will name our custom 
	function multiplier(). So when map() runs it against any element in 
	the array, at each iteration, the element in the array will be 
	automatically injected (passed as an argument) to multiplier which 
	will be used as num inside of multiplier().

		function multiplier(num)
		{
   			return num * 2;
		}

		let numbers = [1, 2, 3, 4, 5];
		let newNumbers = numbers.map(multiplier);
		alert(newNumbers);

	This works, and displays a popup alert on screen saying 2,4,6,8,10


-2) Loop through an array of images and display the images on screen. 
	Basically; create a div in your HTML code and maybe give it an ID.

	-Within your JavaScript code, create an array
	-Put in this array a number of elements which should be names of images 
		as strings, including their image extensions. Make sure these are the 
		names of actual images on your computer.
	-Select the div you created in your HTML code. This is where you will be 
		displaying the images whose names you have stored in the array. Let 
		us refer to it as the target div.
	-Loop though the array grabbing the names of the images in there one by 
		one and, placing them within an <img /> tag, and then placing the 
		images in the target div. 
	-Use a timer function so that only one image is displayed at a time and 
		then it the images changes after every 5 seconds.


	SOLUTIONS

	<html>
	<head>
	<body>
		<div id="myImgDiv">

		<script type="text/javascript" />
   
		let images = new Array();
	
		//put the images in the array
   		images.push(
			"amex.png",
			"visa.png", 
			"pexels-photo.jpeg", 
			"pexels-photo2.jpeg", 
			"logo.jpeg"
		);
   
		//grab the target div
		let div = document.getElementById("myImgDiv");
   		let pos = 0;
   		let numOfImages = (images.length – 1);

   		setInterval(function()
   		{
      			div.innerHTML = "<img src='"+images[pos]+"' />";
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


	-The above code will loop through the array of images images and put 
		them in an <img /> tag, then insert them into the div. 
	-The loop is made possible by the setInterval() function of JavaScript. We 
		use the setInterval function to make the images constantly change 
		ever so often. The setInterval() function takes two arguments, a 
		function to perform, and the time interval to to wait before 
		performing the function.We have passed it an anonymous function to 
		do the task we want, and its second argument is 5000 milliseconds, 
		which is 5 seconds. Therefore, the images will appear in the target 
		div and start changing keep changing every five seconds. 
		Congratulations, you just created your first image slideshow.


-3) Create an array of numbers 1, 3, 2, 5, 2, 9, 2, 9, 2, 1
	-then create another empty array. 		
	-Loop through the array of numbers and check the numbers. If the 
		number is a 2, or a 9, put it in the other empty array. 
	-Finally, display the contents of the initially empty array in an alert 
		popup.  
	
		The popup should display 2, 2, 9, 2, 9, 2
		This exercise should teach you how to loop through an array and 
		scan its contents for specific values, and filter out what is not 
		needed. In so doing, you will utilise the comparison operator to check 
		if a value is equal to another value. We have not learned about 
		comparison operators  yet, but this will serve as a gentle 
		introduction to it. When we come to it in the next chapter, and you 
		see that and many other operators in action, you will grasp their 
		essence and power in programming.

			let arr1 = [1, 3, 2, 5, 2, 9, 2, 9, 2, 1];
			let arr2 = [];
			for (let i = 0; i<arr1.length;i++)
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
	
		As expected; the alert popup displays 2, 2, 9, 2, 9, 2. 
		As mentioned before, we are learning a few things here. The if () 
		block that we use to check the value of individual items in the arr1 
		array is part of a series of what are known as conditional statements 
		that we will look into next. Notice the term conditional which 
		indicates that a condition is being checked for which the next action 
		depends on. Instead of having two if statements with one coming 
		after the other; an easier and shorter way would have been to check 
		for the two conditions in one block if statement. You do this by 
		adding one more condition to the condition being checked for inside 
		the parenthesis of the if() statement, and separate both by the OR 
		operator (||). The modified code will look as follows:

			let arr1 = [1, 3, 2, 5, 2, 9, 2, 9, 2, 1];
			let arr2 = [];
			for (let i = 0; i<arr1.length;i++)
			{
   				if ((arr1[i] == 2) || (arr1[i] == 9))
   				{
      					arr2.push(arr1[i]);
  				 }
			}
			alert(arr2);
	
		This alert popup still works the same and displays 2, 2, 9, 2, 9, 2. 
		Notice that we have wrapped the two conditions being checked for in 
		parenthesis and separated them with a double pipe character. This 
		character is the OR operator which means if the logic on either side 
		of it evaluates to true, then it will perform the action in its body. 
		Another thing to notice that we now end up with a little less lines of 
		code than in the previous example.



-4) Finally, we should not proceed without exercising with multi-dimensional 
	arrays too.
 
	-Create an array called food which contains three arrays of different 
		food types in it. Each of those three arrays have three elements in it. 
	-Loop through this food array and display the elements of each of the 
		arrays in the console on separate lines. The code to do that goes like 
		this:

		let food = [
  			 ['tomatoes', 'pepper', 'cabbage'],
   			['apple', 'pineapple', 'banana'],
  			 ['rice', 'pasta', 'beans']
		];

		for (let i=0;i<food.length;i++)
		{
   			let sub = "";
   			for (let j=0;j<food[i].length;j++)
   			{
      				sub += ' '+food[i][j];
   			}
   		
			console.log(sub);
		}

		The result in the console is the following:

		tomatoes pepper cabbage
		apple pineapple banana
		rice pasta beans


		I understand there is quite a bit to take in here. But rest assured, it 
		will all become clear in chapter 2 where we learn about loops. After 
		that, you can come back to this exercise and it will all be clear. 
		Nevertheless, let us take a close look at the example above to see 
		what is going on. The key to mastering loops is to understand that 
		for every level we move over in the array, there should be a new loop 
		block. For this two dimensional array therefore, we use two sets of 
		for () loops statements; one nested inside of the other to represent 
		the two levels of the array.
		  Another thing you may have noticed is that within the first loop we 
		created a variable 'i' to use as the iteration counter. You have to do 
		this with loops by the way, but when we came to the second level 
		array, we created another different iteration counter 'j'. This is 
		obviously because 'i' was already taken and so we had to use 
		another variable for that. It does not have to be 'i' and 'j'. Any two 
		characters will still work, but conventionally, 'i' and 'j' are always 
		used. If we had more deeper levels of arrays inside the food array, 
		we would have carried on creating more counter variables in the 
		same fashion.
		  The way to retrieve an element in a numeric array is to write the 
		name of the array, followed by square brackets in which you put the 
		index number of the element you want to retrieve. So to retrieve an 
		element from an array; always think of square brackets and index 	
		numbers. For example:

			let myArray = ['boy', 'girl'];
			let girl = myArray[1];

	The index is a number representing the position of the element in the 
	array, counting from zero (0). Arrays in programming always count 
	starting from 0. This index number is what the iteration counter ('i', or 'j') 
	represents. To grab an element from a sub (nested) array, it's real 
	simple; we write the name of the array followed by square brackets with 	
	the index number in it, followed by another square bracket with the index 
	of the target element in it. Okay this may sound long an confusing, so let 
	me make it easier. The trick is to remember that when it comes to 
	retrieving values from multi-dimensional arrays, you use one square 
	bracket for every level in the array. For example:

		let food = [
  			 ['tomatoes', 'pepper', 'cabbage'],
   			['apple', 'pineapple', 'banana'],
  			 ['rice', 'pasta', 'beans']
		];

		let apple = food[1][0];


	Basically, you have three elements in the food array. These elements just 
	happen to be arrays themselves. So you would first of all grab an element 
	from the first array as you would normally do like so: 
	
		food[1]

	This will get you the element at index 1 in the food array, which is also the 
	second element counting from 0 and that is 

		['apple', 'pineapple', 'banana']

	This is an array, and you want to grab the very first element inside of this 
	sub array. So the 	next thing to do is to simply add another square 
	bracket containing the index number of the element you want to the 
	end of that. For example:   

		food[1][0]

	This is the equivalent of 

		food[i][j];

 	that we had in the loop above. The sub +=''+ part in front of it was just 
	us building a string to keep appending the values of every item in the sub 
	(second level) array to, so that we end up with a string sub that has all 
	the 3 elements in the food array and their values listed:

		tomatoes pepper cabbage 
		apple pineapple banana
		rice pasta beans 










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