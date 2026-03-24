
//————————————————————//
	CHAPTER 23 - TEMPLATES
//————————————————————//


-Introduction to Templates
-String Literals & Template Strings
-JavaScript Templating Engines
-Popular Modern Approaches
-Implementing Handlebars.js with Mustache




  This is about the available templating engine(s) available for your programming language, and how it works with them.

Introduction to Templates in JavaScript
Templates in JavaScript help dynamically generate HTML content by injecting variables into a predefined structure. They make it easier to manage dynamic UI updates and are widely used in modern web development.



String Literals & Template Strings
——————————————————-
  JavaScript introduced template literals (backticks: `...`) in ES6, allowing easy interpolation using ${}. Example:

	const name = "Alice";

	// Output: Hello, Alice!
	console.log(`Hello, ${name}!`); 

While useful for small templates, they are limited for larger or more complex UI generation.





JavaScript Templating Engines
——————————————————-
Templating engines provide more powerful ways to structure dynamic HTML. Popular options include:

	-EJS (Embedded JavaScript) – Works similarly to PHP or 
	    JSP, embedding JavaScript into HTML.

	-Handlebars & Mustache – Logic-less templates with 
	    placeholders ({{}}), often used together.

	-Pug – A whitespace-sensitive, minimalistic templating 
	    engine.

Among these, Handlebars & Mustache remain widely used due to their simplicity and flexibility.





Popular Modern Approaches
——————————————————-
  In modern JavaScript, frameworks handle templating in different ways:

	-React uses JSX, which blends HTML inside JavaScript.
	-Vue.js uses a declarative template syntax with directives.

These frameworks essentially replace traditional templating engines in many projects.





Implementing Handlebars.js with Mustache
————————————————————————
Step 1: Install Handlebars
————————
	-You can include it via a CDN or install via npm
	  Install it by running this command:

		npm install handlebars

	 Or use a CDN in the head tag of your HTML page:
		<head>	
		<script 
		    src="https://cdn.jsdelivr.net/npm/handlebars/dist/
			handlebars.min.js">
		</script>
		</head>



Step 2: Define a Template in HTML
———————————
  Here is an example code for creating a template. Place this code in your HTML file:

	index.html
	——————

	<!doctype html>
	<html>
    		<head>
        		<title>Templates</title>
			<script 
				src="https://cdn.jsdelivr.net/npm/handlebars/
					dist/handlebars.min.js"></script>
    		</head>
   	 	<body>

			<script 
				id="template" 
				type="text/x-handlebars-template">

    				<h1>{{title}}</h1>
    				<p>{{message}}</p>
			</script>

			<div id="output"></div>

			<script type="module" src="/index.js"></script>
    		</body>
	</html>


When using handlebars, a template is created within a script tag. This is the attribute that converts this script tag into a template: type="text/x-handlebars-template”.
Once that template has been created, you will select it, inject data into it using the variables, and then insert the template into any element of your HTML you desire.



Step 3: Compile & Render the Template in JavaScript
———————————
  This is referring to how you would go about passing pieces of data dynamically using JavaScript, that will be assigned to those variables (title and message in this case) that are being used in the HTML template. Note that in Handlebars, to parse variables or display their data within HTML code, you do so by wrapping the variables within double curly brackets.

	{{myVar}} 

The following is an example of how to create and inject the values for the variables used in your template. Do this in your JavaScript file:

	index.js
	————-

	const source = 	
		document.getElementById("template").innerHTML;

	// template will become a function template()
	const template = Handlebars.compile(source);

	// prepare data for our template variables
	const data = { title: "Hello World", message: "This is a 	
		Handlebars template!" };

	document.getElementById("output").innerHTML = 
		template(data);

Explanation
——————
In this example, we select our template script tag, which has the id attribute value of “template” which we assign to a variable named “source”. Next, we convert it into a template using the compile() method of Handlebars.

	Handlebars.compile(source);

Next, we prepare our data to inject into our template, to be assigned to the template variables, which in our case are title and message. We assign this data to a variable named data.

Next, we select the target element where we wish to inject the template on our web page. In our case, that target HTML element is the div with the attribute of “output”. As we select this target div, we inject our template and data into it by assigning to it the template() function (which our template has now become), that in turn takes our data as its argument. For clarity, it would also work if we did it like so:

	// our template is now a function that accepts our data
	const templateAndData = template(data);
	const targetDiv = document.getElementById("output”);

	// inject the data
	targetDiv.innerHTML = templateAndData;

Here is where the data was created:

	const data = { title: "Hello World", message: "This is a 	
		Handlebars template!" };

The values of the variables in this data which was injected into the template (as its argument)

	…template(data);

will now replace {{title}} and {{message}} in the <script> template


  Handlebars & Mustache are still used but are being replaced in modern apps by React, Vue, and other frameworks. They are useful for server-side rendering and simpler projects that don’t need full-fledged frameworks.
