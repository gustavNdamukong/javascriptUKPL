
# Chapter 9 — STRINGS

  - Escaping nested quotes
  - Single vs double quotes
  - Escape sequence characters
    - Examples of usage
  - Concatenating strings
  - Template literals and string
    interpolation
  - String properties and functions
    - length
    - charAt()


- A string in computer programming refers to
  the data structure that is a piece of text.
  A string is denoted by wrapping it within  a   
  pair of opening and closing quotation 
  marks or backticks. In JavaScript, you can create a string by wrapping the text within either 
  Double quotes, single quotes, or backticks. For example:

	let firstName = "John";
	let surname = 'Doe';
	let nickname = `Johnny`;



### Escaping nested quotes
  You cannot nest a string inside another using the same type of quotes. This will 
  cause a conflict and you will get an error. For example this is wrong:

	const sentence = "He said hello to "her"";

  To prevent the error, you should use a different type of quote for the sub string.
  For example, this will work.

	const sentence = "He said hello to 'her'";

  The only way you can nest strings using the same type of quotes is if you escape the nested string. There is something in JavaScript called the escape character, and it is simply a back slash (\). The way to use it is to place it right before the opening quote that you know will cause a conflict (because that quote type is already in use) and also just before the closing quote. Here is an example that will work:

	const sentence = "He said hello to \"her\"";

  The escape character (\) tells the JavaScript parser not to treat the character that follows it as part of the syntax, but to take it as an ordinary character belonging to the text.
  When a string contains quotes of one type, using the opposite type for the string helps avoid escaping.

  Many coding styles and linters (like ESLint) recommend sticking to one quote style for 
  consistency. When working with inline JavaScript in HTML, single quotes are often used for JavaScript strings to avoid conflicts with the quotes often used in HTML attributes.
  For example:

	<button onclick="alert('Hello!')">Click me</button>



### Single vs double quotes
  At the end of the day, the type of quotes you use comes down to choice, and which ever you 
use will not affect performance or functionality. Both single and double quotes represent strings and behave identically in JavaScript.



### Escape sequence characters
 These are characters that you can use in your program to escape characters in different 
scenarios as shown below. They are basically a combination of the escape character (\) and 
one or more characters that represent a specific character or behaviour. They are used for formatting or representing special characters within strings.

  \n  a newline character
  \t   a tab
  \'  escape a single quote
  \"  escape a double quote
  \\  escape a backslash, when you want the backslash itself to appear in the text rather than act as an escape character
  \r   carriage return 
  \b  a backspace
  \uXXXX escape a unicode character


#### Examples of usage
  \n Create a new line eg

		const text = "Hello\nWorld!"; 
		console.log(text); 

The output:
  Hello
  World!

	\t Create a horizontal tab by tabbing in
		const tabbed = "Column1\tColumn2"; 
		console.log(tabbed); 

the output:
  Column1 Column2

	\’  Escape quotes (single/double quotes)
		const sentence = 'It\'s a beautiful day!'; 
		console.log(sentence);

the output:
  It's a beautiful day!
  

	\\ Escape a backslash to display it as a literal character
		const backslash = "This is a backslash: \\"; 
		console.log(backslash); 

The output:
  This is a backslash: \

\r Insert a carriage return (rarely used on its own, often
  combined with \n for compatibility).

		const carriageReturn = "First part\rSecond part"; 
		console.log(carriageReturn); 

		The output may depend on platform; overwrites 
			"First part" on some systems.

	
	\b Insert a backspace (removes one character to the left; rarely used).
		const backspace = "AB\bC"; 
		console.log(backspace); 

The output:
  AC

	\uXXXX Escape a unicode character
		const heart = '\u2764'; 
		console.log(heart); 

The output: ❤  (a black heart symbol)

The \u tells JavaScript that the next four characters are a
hexadecimal code identifying one character in the Unicode
set. 2764 happens to be the heart. This is how you write
characters your keyboard cannot type.




### Concatenating strings
  This refers to how you can programmatically join two or more strings together. Different languages do it in different ways. 
  In JavaScript, we use the + character which is also known as the concatenation operator, to do this. The syntax is this; say you are combining two strings, you start by opening and closing the quotes wrapping the first string, then type in the concatenation operator, followed by another opening and closing quotes containing the second string. 

	"String one" + "string two";

Here is an example:

	let stringOne = "string one and ";
	let stringTwo = "string two"; 
	let oneString = stringOne + stringTwo;

	console.log(oneString);
	console.log("This is another example of concatenating "
		+ "strings without variables");

Outputs:
  string one and string two

This is another example of concatenating strings without variables

	  You can also concatenate strings using the += operator. However, though the += operator is mostly used for adding up numbers (see notes under operators), when used with strings, it simply appends a new string to the end of another. Here is an example:

	let oneString = "string one and ";
	oneString += "string two"; 
	
	console.log(oneString);
	console.log(oneString + " make up one long string.");

Outputs:
  string one and string two

string one and string two make up one long string.
 
 Notice how it is possible to combine literal strings, variables containing strings, or two variables containing strings, as seen in the example above:

	var oneString = stringOne + stringTwo;
Or
	oneString + " make up one long string"

 I leave a space at the end of the first string and the start of the following string in order to have some space between the last word of the first string and first word of the following string when the two strings are joined together and displayed on screen.
 So you see that, whether the strings are stored in variables or not, it works in the same way.





#### Template literals and string interpolation
  Template literals are a modern way of handling strings in JavaScript, introduced in ES6 (ECMAScript 2015). They allow us to create multi-line strings, embed expressions, and make string formatting more readable and convenient. Unlike normal strings which use single quotes (') or double quotes ("), template literals use backticks (``). Here is a basic syntax of template literals:

	const message = `Hello, world!`;

	 // Output: Hello, world!
	console.log(message);

  String interpolation is the process of embedding variables or expressions inside a string without needing manual concatenation which we have seen above using the concatenation operator (+). In JavaScript this is done using template literals.
  Template literals enable string interpolation using the ${} syntax inside backticks. Here is an example of template literal with string Interpolation:

	const name = "Alice";
	const age = 25;

	const greeting = `My name is ${name} and I am ${age} years old.`;

	// Output: My name is Alice and I am 25 years old.
	console.log(greeting);

  Keep that one on a single line. A template literal is allowed to
  run across several lines, but if you let it, the line break and
  the indentation become part of the text - which is exactly what
  the next example puts to good use, but is rarely what you want
  in the middle of a sentence.

Without template literals, we would have to use string concatenation, like so:

	const greeting = "My name is " + name
		+ " and I am " + age + " years old.";

You can see how messy that can be. String interpolation therefore makes it much cleaner, readable and less error prone. Here are the benefits of template literals:

  - Makes it so easy to embed variables
  and expressions inside strings (using ${})
  - Within a template literal, you can write
  multi-line Strings with no need for \n or
  + (to join strings) for new lines, or any
  other escape sequence characters for
  formatting like space, tabbing etc. Within
  a template literal, format your text as you
  would have it, eg adding space, tabbing
  to indent, hitting enter for new lines,
  adding quotes where you you need them
  etc, and the text will be rendered
  formatted in exactly that same way. This
  makes the handling of large blocks of
  text easier.
  - Freely use quotes within your string
  without having to worry about escaping
  quotes in order to prevent quote type
  conflicts.

Let’s look at an example on how to write multi-line strings in a template literal:

	const multiline = `This is line 1.
		This is line 2.
		This is line 3.`;

	// Output:
	// This is line 1.
	//		This is line 2.
	//		This is line 3.
	console.log(multiline);

You can see how the multiple (separate) lines are displayed without you having had to write any \n character in the code. Just press enter to create new lines when you write the code.
  Look closely at that output though. Lines 2 and 3 come out indented, because the tabs you typed in front of them inside the backticks are part of the text too. A template literal keeps everything exactly as you laid it out, spaces and all. That is its strength when you want it, and a trap when you do not.

Let’s look at another example on how to embed expressions within a template literal. So, just like when adding variables (string interpolation), you can do calculations (expressions) inside a template literal by using the ${} syntax. Here is how: 

	const a = 5, b = 10;

	// Output: The sum of 5 and 10 is 15.
	console.log(`The sum of ${a} and ${b} is ${a + b}.`);





### String properties and functions
 There are many built-in functions and properties offered by JavaScript to help you work with 
  strings. We will look at a few examples:
 
- length is a property used for measuring the length of a string in characters
- charAt(index) used to get the character at a specific position (index) in a string.

#### length
	let fullName = "John Doe";
	let stringLength = fullName.length;
	console.log(stringLength);

The output is:
  8

  This is because length counts the blank space between the two parts of the name.


#### charAt()
	const str = "Hello, World!"; 
	console.log(str.charAt(0)); // Outputs "H" 
	console.log(str.charAt(7)); // Outputs: "W" 
	console.log(str.charAt(20)); // Outputs: "" (empty string, index out of range)

  Another quick way to get the character at an index is to use the bracket notation.
  Here is how to do it:

		let sport = "Boxing";
		let firstLetterOfSport = sport[0];
		console.log(firstLetterOfSport);

Outputs:
  B

  Note that when using the bracket notation, the counting starts from 0.

  You can even place an expression within the brackets to work out the desired index to
  get a character of the string from. For example, to get the last character of the string,
  you can do this:

		let sport = "Boxing";
		let lastLetterOfSport = sport[sport.length - 1];
		console.log(lastLetterOfSport);

Outputs:
g

  In the same way, to get the last but one character of a string, just increase the number
  you are deducting, eg:

		let sport = "Boxing";
		let lastButOneLetterOfSport = sport[sport.length - 2];
		console.log(lastButOneLetterOfSport);

Outputs:
n





