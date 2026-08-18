
# Chapter 22 — Extensions (APIs & Libraries)

- APIs
  - Introduction to APIs and HTTP Requests
  - REST API Requests
    - How to send a REST request
  - Understanding SOAP APIs (and why they’re usually handled outside
    the browser)
    - XML namespaces and why we need a namespace resolver
    - Must you use a Namespace in every SOAP request?
    - How to send a SOAP request
    - CORS work-arounds for making SOAP requests from frontend
    - Setting up a local SOAP server with Node.js
    - To use or not to use a WSDL file
  - Why Use APIs
  - How JavaScript Communicates with APIs
  - Sending HTTP Requests
  - What Happens on the server-side
  - HTTP Status Codes
- AJAX
  - How does it relate to JavaScript?
  - AJAX in Action (Examples)
  - Old Way (Using XMLHttpRequest)
    - The responseType property
    - The readyState property
  - Modern Way (Using fetch())
  - Asynchronous programming
    - a) Callback
    - b) A promise
      - promise.all()
    - c) Async/Await
  - Using Axios (External Library)
- WebSockets
  - Why Use WebSockets
  - Why it works
- Where networking actually lives
  - Networking in the browser
  - Networking in Node.js
- Libraries
  - notie







  Here we talk about external tools in the ecosystem of your programming language that make it even more powerful. We are talking here about any existing APIs, development frameworks, and off the shelf libraries available for you to use extend any kind of functionality.


## APIs

### Introduction to APIs and HTTP Requests
  Let’s start by talking about what an API is. API stands for Application Programming Interface. It’s like a messenger that allows different pieces of software to talk to each other. In JavaScript, when we talk about APIs, we usually mean web APIs. These are systems created and put out there on the internet by people-companies, or other programmers, so that your browser can send requests to and receive data from them. These APIs often provide data in a format like JSON (JavaScript Object Notation), which is easy to work with in JavaScript.
  However, vanilla JavaScript cannot create a server-side API. This is because client-side JavaScript, which runs in a browser (frontend) is not a server-side programming language, as you already know. It therefore lacks access to server resources like databases, full access to file systems etc.
  To create an API, you need a server-side programming language-also referred to as a backend language. Examples of backend languages are Python, PHP, Node.js, Ruby, Java etc and they can all be used to build APIs.
  Frontend JavaScript can only consume APIs. We will therefore dwell here only on how to make requests to consume APIs, and how to handle the data that we get back. Having said this, I must say that there are different types of APIs-notably, REST and SOAP APIs. Whilst we are not concerned in this book about how to create the APIs, knowing the type of API we are trying to consume is important because it will determine how we make the requests to them. 
  When consuming APIs in JavaScript, whether they are REST or SOAP, you typically use tools like fetch(), which is more modern and promise-based, or axios, a third-party library with more features, or XMLHttpRequest, which is older but still used in some cases. These tools are the same, but the key differences in how you make the requests to the different API types lie in the content of the request, what you send in the HTTP headers, and the format of the data you are sending and receiving. Let’s look at REST and SOAP APIs, and see how there is a difference in how to make requests to them and handle the response we get back.




### REST API Requests
  REST stands for Representational State Transfer-an architectural style for designing networked applications. It relies on stateless, client-server communication, typically over HTTP. The frontend (client) and the backend (server) operate independently. Rest resources are identified by their URLs or endpoints. For example: /users. Data is usually transmitted using JSON format e.g., {"name": "Alice"}
  You send data to the API server in JSON format using different HTTP methods, depending on the kind of request being made. Here is a list of the HTTP methods supported in a REST API:

| Method | Purpose |
|---|---|
| `GET` | Read. Ask the server for data |
| `POST` | Create. Send some data to the server to create a new resource |
| `PUT` | Update, by replacing the entire existing resource (data) |
| `PATCH` | Update. Partially update an existing resource. |
| `DELETE` | Delete existing resource (data) |

These are the HTTP/1.1 protocol methods defined in the RFC 7231 specification. There are a few more, like HEAD, OPTIONS, TRACE, and CONNECT, but these last four are used only in specific circumstances and are less common. Of the five (5) HTTP request methods listed above, GET and POST are the most commonly used in the browser. You will see them in action when I talk about AJAX, which is an easy way to send HTTP requests asynchronously from a browser to a server.
  The PUT and PATCH methods handle update operations, but as you can see from their purposes, while PUT entirely replaces what existed of the record previously, PATCH will only update some fields of that existing data.


#### How to send a REST request
  Here is and example POST request to a REST API using fetch(): 

	fetch(
		"https://api.example.com/users", 
		{
  			method: "POST",
  			headers: {
    				"Content-Type": "application/json"
  			},
  			body: JSON.stringify({ name: "Jane", age: 30 })
		}
	)
  	.then(response => response.json())
  	.then(data => console.log(data))
	.catch(error => console.error('Error', error));

The first argument to fetch() is the URL or endpoint of the resource. This is basically the path of the API server we are sending the request to. You can usually tell from the URL what resource is being targeted-in this case, the resource we need in this users (/users).
  The second argument passed to fetch() is an object which usually contains things like the HTTP method (eg POST, UPDATE etc), headers, and the body. This object is referred to as the init object, or options object. In some documentations, it is referred to as the configuration object that controls settings like:

- The HTTP method eg GET, POST, etc
- Request headers as an object or instance of the built-in JavaScript Headers class. Here is an example of how you can use a Headers class instead of an object literal like in our example above:

 			// create the headers object
  			const myHeaders = new Headers();
  			myHeaders.append('Content-Type', 'application/json');
  			myHeaders.append(
				'Authorization', 'Bearer your-token-here');

  			// define the fetch options
  			const requestOptions = {
    				method: 'POST',
    				headers: myHeaders, // use the Headers instance
    				body: JSON.stringify(
					{key: 'value'}
				), // request data (aka payload)
    				mode: 'cors' // enable CORS
  			}

  			// make the request
  			fetch(
    				"https://api.example.com/users", 
    				requestOptions
  			)
  			.then(response => response.json())
  			.then(data => console.log(data))
  			.catch(error => console.error('Error', error));

  - The body is also sent within the request’s options object. This body option contains whatever data you are sending to the server. This data is also referred to as the payload (of the request). It is typically sent with requests like: POST, PUT, and PATCH. Sometimes data is sent with DELETE requests too, and that will only contain the id of the resource to be deleted. For the PATCH request, only data intended for the field or fields to be updated are sent.

  It is okay for no request object to be sent with an API request. A GET request does not need it, and so none is sent with GET requests. Actually, a request is assumed to be a GET request by default, unless you pass in an options object to specify another request method.
  Whenever you pass a JavaScript object as the body in the body of a fetch() request, you must wrap it in a JSON.stringify() function, because:

  - HTTP Requests only  accept strings (or binary data). The body
  property in fetch() cannot handle JavaScript objects. The HTTP
  protocol needs the request body (data) to be sent as either of
  these:
      - A string which can be a JSON string, or a URL-encoded form data.
      - A Blob/Buffer (for binary data like files)
	
  - Another reason to use JSON.stringify() on the fetch() body is
  because JSON.stringify() converts objects to JSON strings.
  - The data type declared as the type of data being sent in the headers
  section must match the type of the data being sent in the body,
  obviously. Therefore, because we set the request data type as
  JSON

		headers: {
    				"Content-Type": "application/json"
  			},

  We therefore have to make sure what is being sent via the body
  matches that. Hence we use JSON.stringify() to convert that data
  into a JSON string.
   With that said, if you are not sending JSON data, you do not have to use JSON.stringify() on the body. This also means you would not set the datatype as JSON ("application/json") in the headers section, obviously.





	
  Understanding SOAP APIs (and why they’re usually handled outside
#### the browser)

  While modern frontend development mostly revolves around REST APIs and JSON, there's another important type of web service called SOAP—short for Simple Object Access Protocol, and it works differently. SOAP uses XML to structure messages used for communication between applications over a network. It was widely adopted since the early 2000s in enterprise software systems for building web services, before REST became popular. Although SOAP is still in use today (especially in finance, healthcare, telecom and enterprise software, where strict message formats and contracts are important.), it's important to know that most SOAP APIs are not accessible directly from the browser. This is because browsers block cross-origin requests unless the API explicitly allows it through something called CORS (Cross-Origin Resource Sharing)—which SOAP APIs often don't.
So why learn about SOAP in a JavaScript book? Because understanding SOAP helps you:

- Work with XML-based data formats (which are still common),
- Understand legacy systems in enterprise environments,
- Parse XML using XPath and namespaces (a skill useful beyond SOAP),
- Recognize when and why you'd use tools like Postman or server-side code to interact with APIs.

This section will show you how SOAP works, what its XML messages look like, and how you'd parse a SOAP response using JavaScript's XML tools—not necessarily to run it in your browser, but to prepare you for when you’ll encounter it in the real world.
  SOAP messages are typically sent over HTTP and have a predefined envelope structure that looks like this:

	<soap:Envelope
		xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  		<soap:Body>
    			<GetPriceResponse>
      				<Price>29.99</Price>
    			</GetPriceResponse>
  		</soap:Body>
	</soap:Envelope>

This XML structure is what you parse when working with SOAP responses.




#### XML namespaces and why we need a namespace resolver
  In XML, namespaces are used to avoid name conflicts when different elements share the same name. They do this by associating elements with a unique URI (a web-like address).
For example:

	<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  			...
	</soap:Envelope>

This means that every element with the soap: prefix (like soap:Envelope, soap:Body) belongs to the SOAP XML namespace, which ensures it’s interpreted correctly.
Without the correct namespace, XPath queries (a technology for reading XML data, which we will use to read SOAP responses to extract the data we need) won’t match anything. See Chapter 15 (DOM manipulation) where I talk about XPath and document.evaluate()-which is a DOM method meant for running XPath queries to read data from XML and HTML objects.
  JavaScript’s document.evaluate() function however, doesn't automatically understand what "soap:" means in your XPath query string. You must help it by supplying a namespace resolver: a function that maps prefixes (like "soap") to their full namespace URI. Here is an example of how to create a namespace resolver for your SOAP request:

	const nsResolver = (prefix) => {
  		if (prefix === "soap") {
			return "http://schemas.xmlsoap.org/soap/envelope/";
		}
  		return null;
	};

Then use this resolver when calling document.evaluate():

  const result = xmlDoc.evaluate(
    "//soap:Body//Price/text()", // your XPath query
    xmlDoc,
    nsResolver,
    XPathResult.STRING_TYPE,
    null
  );





#### Must you use a Namespace in every SOAP request?
  You do not need it sometimes. If your XML doesn't use prefixes (e.g. just `<Envelope>` instead of `<soap:Envelope>`), you don’t need a resolver. But in most real-world SOAP responses, you will need one, because namespaces are standard practice.






#### How to send a SOAP request
  SOAP messages are not something you "guess"—they follow a predefined structure called a WSDL, or Web Services Description Language file. A WSDL is an XML document provided by the API provider that describes the operations (functions or methods) the service offers, and how to structure the request you send. It will also tell you about the structure of the response to expect back.
For example, the WSDL might tell you:

  - The name of the operation (e.g. GetPrice)
  - The expected input and its format
  - The required XML namespaces
  - The response structure

Always check if the service provides a .wsdl file or documentation. It helps you to build the correct SOAP message. Here’s a simple SOAP request message structure:

	<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  		<soap:Body>
    			<GetWeather>
      				<City>London</City>
    			</GetWeather>
  		</soap:Body>
	</soap:Envelope>

This structure must match what the server expects. If you get it wrong, you’ll usually get a "SOAP fault" (an error message in XML format).
Let us look at a complete example of how you would prepare and send a SOAP request including a namespace resolver, and how you would parse (extract) the XML response returned using document.evaluate().
  In the following example, we will send the SOAP request using an XMLHttpRequest object. For the response, we expect XML data, so we will handle that:

	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://example.com/soap-endpoint');

	// Important: Set the Content-Type to indicate a SOAP message
	xhr.setRequestHeader('Content-Type', 'text/xml');

	// Optional but useful: expect an XML document
	xhr.responseType = 'document';

	// Build your SOAP XML string
	const soapMessage = `
	<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  		<soap:Body>
    			<GetPriceRequest/>
  		</soap:Body>
	</soap:Envelope>`;

	// When the response arrives...
	xhr.onload = () => {
  		const xmlDoc = xhr.response;

 		 // Use XPath to extract data from the XML
  		const nsResolver = (prefix) => {
        		if (prefix === "soap") {
         			 return "http://schemas.xmlsoap.org/soap/envelope/";
        		}
        		return null;
      		};

    const result = xmlDoc.evaluate(
      "//soap:Body//Price/text()",
      xmlDoc,
      nsResolver,
      XPathResult.STRING_TYPE,
      null
    );

  		console.log("Price: $" + result.stringValue);
	};

	xhr.send(soapMessage);

  In the SOAP message-which is the XML string stored in the variable soapMessage, the body or contents of the message you are sending to the sever are within the `<soap:Body>` section or element. In this example, we are making a call to a function named GetPriceRequest which is located on the API server. We would have known about the existence of this function from the WDSL (Web Service Description Language) that the API providers supplied to us. The WDSL which is the documentation of the API would also contain information about arguments we need to pass to the function, if any is required.
  The first argument passed to the .evaluate() method is the XPath query string ("//soap:Body//Price/text()”). XPath stands for XML Path Language. It’s a way to navigate and select parts of an XML document, like querying a database but for XML.
In the example above, the XPath string "//soap:Body//Price/text()" tells JavaScript:

* Look anywhere (//) for the `<soap:Body>` element
* Then go inside it and look for the `<Price>` element
* Extract its text content (using /text())

You use document.evaluate() to run XPath queries in JavaScript. It requires a valid XML document (not just a string), which is why using either xhr.responseType = 'document' or using DOMParser is essential because they first of all convert the returned data into a document (DOM) object before you can use DOM methods like document.evaluate() on it. Again, visit chapter 15 (DOM Manipulation) for a full explanation of XPath and the document.evaluete() method.

  Note on CORS: 
  CORS is a security mechanism implemented by browsers to control how web pages from one domain (origin) can request resources (e.g. APIs, fonts, images etc) from another domain. This is for security reasons-imagine if anyone was allowed to make their application request and use data from the application of another business, like a bank without their permission. This would facilitate the work of malicious users and hackers. That is why CORS was introduced.
  If you try to send a SOAP (or REST) request to an external API from your browser and see a CORS error, it's not a problem with your code. For example, trying to run the code in this example above might give you this error in your console:

  "Access to XMLHttpRequest at 'https://example.com/soap-endpoint'
  from origin 'http://127.0.0.1:5500' has been blocked by CORS
  policy: Response to preflight request doesn't pass access control
  check: No 'Access-Control-Allow-Origin'
  header is present on the requested resource."

This is because your browser is protecting your local environment from making requests to a different origin (i.e., https://example.com/soap-endpoint). This is a very common issue when testing SOAP or REST APIs locally. Modern browsers block requests made from one origin (like your localhost) to another (like example.com) unless the server explicitly says it’s okay by sending (enabling) CORS headers like:

  Access-Control-Allow-Origin: *

But in most real SOAP APIs, especially enterprise-grade ones, CORS headers are not enabled, because they assume you are calling from server-side code, not from a browser. This makes them inaccessible directly from browser code, which is what JavaScript is.

Browsers block such requests by default for security. You can work around this by using:

- A local proxy server
- Tools like Postman or Insomnia
- Server-side code (Node.js, PHP, Python, etc.)

APIs are usually meant to be accessed from backend systems, which do not have CORS restrictions like browsers do. Let’s look at the ways to work-around CORS errors when making test API requests from the frontend.



#### CORS work-arounds for making SOAP requests from frontend
- 1) Set up a local proxy server that makes the SOAP request on your
  behalf (from Node.js, PHP, etc.). Your browser talks to your proxy,
  and the proxy talks to the API. This bypasses CORS. That is beyond
  the scope of this book. But I make you aware of these solutions just
  to deepen your knowledge of APIs.

- 2) Use a Tool Like Postman or Insomnia (No CORS in Desktop Tools). If
  you're just testing SOAP requests, use Postman or Insomnia
  instead of your browser. These are tools meant to help you test API’s,
  by manually sending and inspecting SOAP messages. One thing great
  about them is that they don’t enforce CORS

- 3) Host your code on a server that allows CORS. If you're not just testing
  but building a real application, host your frontend and backend on
  the same domain or configure the backend to allow CORS (only if
  you control it). We will test this option below under the “Setting up a
  local SOAP server with Node.js” section. There I will show you how to
  use Node.js to set up a simple SOAP service that you can send
  requests to from the frontend code, and it will work because both
  your frontend and SOAP (backend) service are running in the same
  domain.

In conclusion, we must remember that browser JavaScript cannot reliably consume SOAP APIs. Unlike REST, SOAP APIs have the following limitations:

  - The require XML-formatted requests with strict headers (e.g.
  SOAPAction).
  - They block browser requests due to CORS restrictions (unless the
  server explicitly allows it).
  - SOAP APIs often lack HTTPS (which triggers mixed content errors in
  browsers).

Due to all of that, here are the best practices or recommendations:

  - In production (real-life applications), SOAP requests should be
  handled by a backend server using for example: Node.js, Python, or
  PHP.
  - Such a backend server will process the SOAP request securely
  - Such a backend server will also return a simplified response-for
  example in JSON format, to your frontend code.

As I indicated earlier, setting up such a backend server is beyond the scope of this book. That is why all the examples I have given you are focused on REST APIs-the modern standard of web development. My coverage of SOAP here is to prepare you and make you well balanced in your knowledge of the APIs, even if you will rarely ever consume a SOAP API directly from JavaScript.




#### Setting up a local SOAP server with Node.js
	  If you have a local server and hosted a SOAP API on your local server, it will be possible to access this SOAP API from frontend code running on the same server. Let us just say you host a SOAP API on your local server (e.g., localhost:3000/soap-api) and your frontend code (HTML/JS) is also served from the same origin (e.g., `localhost:3000/index.html`), you can access the SOAP API without CORS issues. The reason why it works is simple; 

  - The Same-Origin Policy (SOP) allows frontend code to freely interact
  with APIs on the same domain/port/protocol.
  - There are no CORS restrictions applicable, since there’s no cross-origin request.

Let’s see how to set a Node.js server on your local machine to host a simple SOAP API that we can send a request to from the frontend and get a response back. In this example, we will be using Express, a very popular Node.js framework that makes setting up and working with servers in Node.js very easy. It comes packed with libraries that provide services to handle most things to do with servers so that you don’t have to build them by yourself-like security, validation, receiving and responding to HTTP requests, and much, much more. This is not a book on Node.js, but I want to leave you with a clear understanding of what happens on the side of a server when it comes to APIs. If you ever decide to go on and learn Node.js, it will be a great choice after mastering vanilla JavaScript. Node.js is a JavaScript engine that runs on a server. Thanks to it, JavaScript is no longer limited to a browser. It is one of the biggest reason’s for JavaScript’s popularity soaring in the last decade. It means with your current JavaScript knowledge, you will be able to build a full stack (frontend and backend) application that is fast and reliable. You will even be able to build backend systems for mobile applications as APIs, and much more. It’s very powerful. Let’s get right into building our SOAP API. Follow these steps, and remember, you should be in the root of your project in the Terminal when you run all of these commands:
  
  - Make sure you have Node.js installed on your local machine, and if
  not, install it. Open the Terminal application on your local machine
  and navigate to your project folder, or in your IDE (code editor eg
  VSCode), open the integrated (built-in) Terminal application in it by
  going to Terminal (menu bar above), then choose New Terminal.
  Now that you’re in the terminal, check if Node.js is installed by
  running this command:

node --version

If it is installed, you should get a response with the version number
like this:
  v20.12.2
If it’s not installed, go ahead and install Node.js. The best way to do
this is to visit their website: https://node.js.org and download the
LTS (Long-Term Support) version for your system (Windows/
macOS). Run the installer and follow the instructions-the default
settings are fine. It will install both Node.js and npm (Node Package
Manager) on your computer. Once done, confirm the installation by 	   running the same command above:

node --version

  - Next, setup a package manager file named package.json. All
  Node.js applications need you to have this file in the root of your
  application. Node uses it to keep track of, and manage which
  packages (libraries) your application is using, and their versions. In
  web development, these packages are also known as
  dependencies, because they are libraries that your application
  depends on to do its job.
  You do not have to create this file yourself, Node has a command
  that will do it for you and place the necessary code to start you off
  with a server that you can build on. But this basic one will be
  sufficient to handle our example application right now. Run this
  command to create the package.json file:
		
npm init -y

  It will create a package.json in the root of your project, and place
  the following code in it:

		{
  			"name": "js-test",
  			"version": "1.0.0",
  			"main": "index.js",
  			"scripts": {
    				"test": "echo \"Error: no test specified\" && exit 1"
  			},
  			"keywords": [],
  			"author": "",
  			"license": "ISC",
  			"description": ""
		}

  - Install Express. Do so by running the following command:

npm install express

  This will add express as a dependency in your package.json and
  create a node_modules/ folder.

  - Install the following two Node.js packages that we will be needing:
    - 'xmldom' (the Node.js equivalent of DOMParser)
    - 'xpath' (the Node.js package used to perform XPath operations
    on files on the server-side.)
  Install them both using these commands:
		
npm install xmldom
npm install xpath

  - Optionally, modify this package.json
  file slightly by adding the following line in the “scripts” section if it
  doesn’t exist in it:

"start": "node index.js"

  Your package.json file should now look like this:

    {
      "name": "js-test",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1”,
      "start": "node index.js"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "description": “”,
      "dependencies": {
      "express": "^5.1.0”,
      "xmldom": "^0.6.0",
      "xpath": "^0.0.34"
      }

		}

  Note how the new section "dependencies”:… has been added. It
  was added when you ran the command to install Express. Then,
  henceforth, every time you install new dependency for you project,
  they will be added in there. For example, notice how both 'xmldom'
  and 'xpath' are all listed in there. They are all dependencies used
  by your application.
  Adding the ‘start’ entry to the ‘scripts’ section is optional, because
  it just allows you to be able to start your server by typing in the
  Terminal:

npm start

It will run this command specified in it for you:
  node index.js
If not, you can run that command yourself whenever you want to
start your server:
  node index.js
To stop the server, just hit Control+c. Note that what this start
command does is to serves a file index.js where your Node.js code
to start a server should be. Let’s go ahead and write the code that
will create the server.

-Next, let’s proceed to write the code on both the backend to create
  a server in Node.js and Express that will receive API (in this case
  SOAP) requests and send back responses, and also the frontend
  code that will send the requests to the backend and get back the
  response. Before we do that, let’s establish what the file structure
  of the application should look like in your project folder.

your-project-folder/
│
| ├── index.js | ← Your SOAP server |
|---|---|
| ├── index.html | ← Your frontend |
| ├── package.json | ← Auto-generated by `npm init -y` |
| └── node_modules/ | ← Created by `npm install express` |

  Here is the code to go in the files. We have already seen what goes
  in the package.json file above:


#### FRONTEND CODE (index.html)
	<!DOCTYPE html>
    	<head>
        	<title>The JavaScript Blueprint</title>
    	</head>
    	<body>

		<h1>SOAP Request for Product Price</h1>
        	
		<input type="text" 
            		id="product" 
            		placeholder="Enter product name (e.g., Apple)">

        	<button onclick="getPrice()">Get Price</button>


	<script>
            function getPrice() {
            const product = document.getElementById('product').value;

            const soapBody = `
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <GetPriceRequest>
                    <Product>${product}</Product>
                    </GetPriceRequest>
                </soap:Body>
                </soap:Envelope>
            `;

            fetch('/soap-api', {
                method: 'POST',
                headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': 'GetPrice'
                },
                body: soapBody
            })
            .then(response => response.text())
            .then(str => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(str, "text/xml");

      const product = xml.evaluate(
      "//Product",
      xml,
      null,
      XPathResult.STRING_TYPE,
      null
    ).stringValue;

      const price = xml.evaluate(
      "//Price",
      xml,
      null,
      XPathResult.STRING_TYPE,
      null
    ).stringValue;

                console.log(`Product: ${product}`);
                console.log(`Price: $${price}`);
            })
            .catch(err => console.error(err));
            }

        </script>
    	</body>
	</html>



#### BACKEND CODE (index.js)
	// server.js (SOAP API running on localhost:3000)
	const express = require('express');
	const path = require('path');
	const { DOMParser } = require('xmldom');  // npm install xmldom
	const xpath = require('xpath');           // npm install xpath

	const app = express();
	const PORT = 3000;

	// This line says "Please treat any request with 
	// Content-Type: text/xml as text and populate req.body"
	app.use(express.text({ type: 'text/xml' }));

	// Dummy function to return product prices
	function getProductPrice(productName) {
	  // in a live app, products & their prices would ideally come from a database
	  const prices = {
	    "Apple": 1.2,
	    "Banana": 0.5,
	    "Orange": 0.8
	  };

	  // convert the first character of product name to uppercase 
	  // & return its price
	  return prices[productName.charAt(0).toUpperCase() + productName.slice(1)] || 0;
	}

	// Serve frontend HTML
	app.get('/', (req, res) => {
	  res.sendFile(path.join(__dirname, 'index.html'));
	});

	// Serve WSDL hint (optional)
	app.get('/wsdl', (req, res) => {
	  res.sendFile(path.join(__dirname, 'service.wsdl'));
	});
	/*
	OR
	app.get('/wsdl', (req, res) => {
	  res.type('text/xml').send(`<!-- Insert WSDL XML as string here -->`);
	});
	*/

	app.post('/soap-api', (req, res) => {
	  console.log('SOAP Request Received:', req.body);

	  const xml = req.body;
	  const doc = new DOMParser().parseFromString(xml);
	   const node = xpath.select1('//Product/text()', doc);
	   const productName = node ? node.nodeValue : undefined;


	  console.log('Product requested:', productName);

	  const price = getProductPrice(productName);

	  const soapResponse = `
	    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	      <soap:Body>
	        <GetPriceResponse>
	          <Product>${productName}</Product>
	          <Price>${price}</Price>
	        </GetPriceResponse>
	      </soap:Body>
	    </soap:Envelope>
	  `;

	  res.set('Content-Type', 'text/xml');
	  res.send(soapResponse);


	});

	app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


Let me explain what the code does more clearly. The frontend code sends a SOAP request, specifying that it wants to make a call to the SOAP function getProductPrice(). We make this request using JavaScript’s Fetch API.

	const soapBody = `
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <GetPriceRequest>
                    <Product>${product}</Product>
                    </GetPriceRequest>
                </soap:Body>
                </soap:Envelope>
            `;

            fetch('/soap-api', {
                method: 'POST',
                headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': 'GetPrice'
                },
                body: soapBody
            })

The server (backend) extracts the values sent in the SOAP message-which in this case is the name of a product the client wants to get the price of, calls a function getProductPrice(), then builds and returns a proper SOAP response containing the price of the requested product. On the frontend, we parse (extract) that response using xpath, and log the data to the console as we have been doing in many examples before. 
  I wish to pull your attention here to a key learning point-which is how on the backend, we extract the data sent via the SOAP message to use. The message comes available in the request object of the post() function, and can be accessed from the body property like so:

	const xml = req.body;

We then use DOMParser which we installed into our project using npm earlier-specifically, its parseFromString() method to convert the SOAP message from a string to a DOM object so we can run DOM (document) functions on it.

	const doc = new DOMParser().parseFromString(xml);

Next, we extract the data we need from the SOAP message, which in this case is the product name, and we know it is in a `<Product>` tag. We use xpath (which we installed into our project using npm earlier)-specifically its select1() method. Here is how we do it: 

	const productName = xpath.select1('//Product/text()', doc)?.nodeValue;

Once we got the product name, we used it to get the price of that product, then built and returned a SOAP response:

	const price = getProductPrice(productName);

	  const soapResponse = `
	    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	      <soap:Body>
	        <GetPriceResponse>
	          <Product>${productName}</Product>
	          <Price>${price}</Price>
	        </GetPriceResponse>
	      </soap:Body>
	    </soap:Envelope>
	  `;

Back to the frontend, we receive this response, and extract its text:

	.then(response => response.text())
Then, we use skills we have seen before when we learned all about DOM manipulation, the DOMParser object, and XPath using the DOM’s evaluate() method in chapter 15. To refresh your memory, DOMParser converts the text (string) into a DOM-like object so that we can manipulate the data as easily as we manipulate other DOM elements using DOM properties-which .evaluate() is part of. 

	const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");

We then use XPath with evaluate() to extract the product name and its price sent back from the XML data of the SOAP response.

  const product = xml.evaluate(
    "//Product",
    xml,
    null,
    XPathResult.STRING_TYPE,
    null
  ).stringValue;

    const price = xml.evaluate(
    "//Price",
    xml,
    null,
    XPathResult.STRING_TYPE,
    null
  ).stringValue;

We then use that data-in our example, we simply log them to the console:

	console.log(`Product: ${product}`);
        console.log(`Price: $${price}`);

  If you got this to work, congratulations, you have had a crash course on Node.js and have already understood the underlying principles behind backend API programming. You are well on your way to becoming a full stack JavaScript developer. 
  This great example demonstrates how a soap server can have a function that returns something (in this case the price of a product). Finally, I give you a hint as to how a WSDL file could be provided for your service clients to use.
  I do not go into showing you what the contents of the WSDL file for such an application should look like, because;

  - browsers do not support consuming a WSDL on the frontend
  - Using WSDL is optional

However, I will still explain to you how it is used. To have one in our above example, create the file in your application folder, and give it a name with ideally, a .wsdl extension like so: 

  service.wsdl or soap.wsdl

It’s recommended to name the file with an .wsdl extension because:
  - It would help text editors recognize and highlight XML syntax.
  - External tools (like SOAP clients or validators) properly detect file
  type.

Once you have created the service.wsdl file in your project folder, serve it like this:

	app.get('/wsdl', (req, res) => {
  		res.sendFile(path.join(__dirname, 'service.wsdl'));
	});

Your clients can then retrieve it from your application endpoint which is being served from your backend:

  http://localhost:3000/wsdl.




#### To use or not to use a WSDL file
  A WSDL file is not required for a SOAP service to function. You will find that this example will work, and you can send and receive SOAP envelopes manually. This is called using SOAP without contract (WSDL-less) — and it also works just fine for tightly coupled or controlled integrations.
  A WSDL is required when the client is auto-generating code from the WSDL (e.g., using wsimport in Java or Add Service Reference in .NET), or when you want to make your service discoverable and self-documented for external consumers, or when you’re using tools like SoapUI, Postman (for SOAP), or API Gateways that need to understand your contract.
  Internal SOAP services may skip WSDL, as well as local servers like the one we just setup to use. Public/external SOAP services on the other hand (e.g., airline APIs, payment gateways, legacy ERPs) almost always provide a WSDL.


	



### Why use APIs
  Imagine you're building a weather app. You probably don’t want to build your own satellite or temperature sensor. Instead, it would be wise for you to use an API provided by a weather service. They have already done the work to gather all the data that you need, probably more efficiently that you would if you tried to, because they may have more expertise in that domain. Using their data would be allow you deliver your application faster. Examples of what APIs provide:

  - Weather data
  - Currency exchange rates
  - News headlines
  - User authentication (e.g., login with Google)
  - Product details from a store




### How JavaScript Communicates with APIs
  To communicate with an API, your JavaScript code sends an HTTP request to a server and waits for a response.
This is the same principle that web browsers use when you visit a website. The browser sends a request, and the server sends back HTML, CSS, JavaScript, or data.





### Sending HTTP Requests
  JavaScript gives you tools to send HTTP requests. The modern way to do that is through using fetch(). Here is an example of how you would send a GET request to a web application hosted on the following domain: 'https://api.example.com/users'

	fetch('https://api.example.com/users')
  	.then(response => response.json())
  	.then(data => console.log(data))
  	.catch(error => console.error('Error:', error));

Here is an explanation of the request:

  - Your web application sends a GET request by default.
  - .json() reads the response body and parses it as JSON.
  - .catch() handles any potential errors, such as if the server is down.

Keep in mind that using fetch() is the modern way of sending HTTP requests, but the traditional way for a long time, was to use the XMLHttpRequest object to do so, and that still works today. It is just more popular to use fetch() due to its simpler syntax of fetch(), and its promise-based syntax.




### What Happens on the server-side
  Although we’re focusing on JavaScript in the browser, it helps to know what happens on the backend (also often referred to as the server-side), when a request is sent to the server from the frontend (browser). The following are the things to know, and the chain of events that unfold in the process:

  - Server-side languages like PHP, Python, Node.js, Java, or Ruby etc live on the server.
  - They receive your request, process it (e.g., look up something in a database), and send back a response, often in JSON format.
  - JavaScript on your page then receives this response and can update the page dynamically without reloading.

You don’t need to know the server-side code. Just know that it’s doing the work behind the scenes. If you go on later to learn one of those server-side languages-or maybe you are a backend (server-side) programmer already, you will be able to write the code to handle such requests coming from the frontend.



### HTTP Status Codes
  When your code talks to a server, it gets back a status code—also known as a response code—to indicate how the request went. Here is a list of the most common HTTP response codes, and what they mean:

| HTTP Code | Meaning |
|---|---|
| 200 | OK (everything worked) |
| 201 | Created (something was added) |
| 400 | Bad Request (your request had an error) |
| 401 | Unauthorised (you need to log in) |
| 404 | Not Found (the thing/resource doesn’t exist) |
| 500 | Internal Server Error (server crashed) |

Here is how you can check the status from the response you get back after a fetch() HTTP request:

	fetch('https://api.example.com/users')
	  .then(response => {
	    	if (!response.ok) {
	      		throw new Error('Request failed with status ' + response.status);
	    	}
	    	return response.json();
	  })
	  .then(data => console.log(data))
	  .catch(error => console.error(error));


  In conclusion, the take-away points on APIs can be summed up as such. APIs allow your JavaScript code to talk to external systems (like databases or services). JavaScript uses HTTP requests (usually through fetch(), but also using the older XMLHttpRequest) to send or get data.
GET and POST are the most common request methods. The server code—which may well be written in a different language—processes your request and sends back a response. JavaScript reads that response (usually in JSON format) and can use it to update the web page.
As a developer, you can use console.log() or browser tools to inspect the results and debug your requests.





## AJAX
AJAX stands for Asynchronous JavaScript and XML. AJAX is a technique that allows web pages to communicate with a server without reloading the page. This makes web applications faster, more dynamic, and user-friendly.
For example, when you type in Google Search, the search suggestions appear without refreshing the whole page—that’s AJAX at work!

How Does AJAX Relate to JavaScript?
AJAX is not a programming language. It’s just a way of using JavaScript to send and receive data from a server in the background.
JavaScript provides different tools to implement AJAX, such as:

- XMLHttpRequest (XHR) — the old way (still
  works).
- Fetch API — a modern, simpler way to make
  requests.
- Axios — a popular external library that simplifies
  AJAX requests.
- Promises and async/await — tools that help
  manage asynchronous AJAX requests more
  easily.




### AJAX in Action (Examples)
Let's say we want to fetch user data from a server and display it on a webpage without refreshing.

### Old Way (Using XMLHttpRequest)

	let xhr = new XMLHttpRequest();

	xhr.open(
		"GET",
		"https://jsonplaceholder.typicode.com/users",
		true
	);
	xhr.onload = function () {
    		if (xhr.status === 200) {
		    // Logs the response from the server
        	    console.log(xhr.responseText); 
    		}
	};

	xhr.send();

The example above shows how to make a simple HTTP request using JavaScript’s XMLHttpRequest object. Let’s look at how it works step-by-step whilst understanding the properties and methods of the XMLHttpRequest object:

- let xhr = new XMLHttpRequest(); 
		This creates a new HTTP request object. You can use this object 
		to fetch data from a server without reloading the entire page (a 
		key part of AJAX).
- xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
		This sets up the request, and does the following:
		
        * "GET" tells the server you want to retrieve data.
        * The URL "https://jsonplaceholder.typicode.com/users" points to a demo API (more on this below).
        * The true means the request should be asynchronous—it won’t block the rest of your script while waiting for a response.
- xhr.onload = function () { ... }
		This is an event listener on the AJAX request, that calls or runs 	
		this anonymous function when the event onload occurs o the 
		request. This event (onload) always fires (occurs) when the 
		AJAX request is finished. The code we place in the function to be 
		ran is as follows:

        * xhr.status === 200 checks if the request was successful.
        * xhr.responseText holds the raw data sent back from the server, usually as a JSON string. It gets printed to the browser console with console.log().
- xhr.send();
		This send() method sends the actual request to the server.

Here is the meaning of the "https://jsonplaceholder.typicode.com/users"
URL which I used in the xhr.open(…) code line above. It is a free fake online REST API used for testing and learning. It's not connected to any real user database. It's perfect for trying out AJAX, fetch(), or XMLHttpRequest() without needing to set up your own backend.
In this example, the /users endpoint simply returns a list of fake user profiles in JSON format—ideal for practice.

Note: This URL is safe to use in demos and practice code. However, in real applications, you would replace it with your actual server or API endpoint.
  The drawback of using XMLHttpRequest (XHR) is that XHR has a syntax that is a little more complex compared to the more modern approaches.
However, it is still effective and very  much supported by all browsers. The above example is a GET request, here is an example making a POST request with the XMLHttpRequest object:

#### HTML code

	<input type="text" id="username" /><span id="info"></span>


#### JavaScript code

	let username = document.getElementById('info').value;

	const request = new XMLHttpRequest();
	const params = "username=" + username.value;

	request.open("POST", "auth/checkUsername", true);
	request.setRequestHeader(
		"Content-type", "application/x-www-form-urlencoded"
	);

	request.onreadystatechange = function () {
    		if (this.readyState === 4) {
        		if (this.status === 200) {
            			if (this.responseText !== null) {
                			document.getElementById("info")
					.innerHTML = this.responseText;
            			} 
				else 
				{
                			alert("Ajax error: No data received");
            			}
        		} 
			else 
			{
            			alert("Ajax error: " + this.statusText);
        		}
    		}
	};

	request.send(params);

This JavaScript code sends a POST request to a server using the XMLHttpRequest object (also known as AJAX). The goal is to send a username to the server and check if it's already taken, then display a message back in the web page.

This line builds the data we want to send to the server.

	params = "username=" + username.value

We take the value from an input field called username and create a string like this:
  "username=JohnDoe"

This string will be sent to the server just like a form submission.

	request = new XMLHttpRequest()

This creates a new XMLHttpRequest object.

We are opening a new request here:

	  request.open("POST", "auth/checkUsername", true)

- "POST" means we're sending data (not just fetching).
- "auth/checkUsername" is the URL (a file or route on the server) that will
  handle the request.
- true, the second argument passed to request.open() means the request
  is asynchronous-it will run in the background so the page doesn’t
  freeze while waiting.
- This next block of code sends a Content-Type value meant to be sent as
  part of the header of the request. This particular Content-Type is important for this request. It tells the server how the data it is sending across is formatted:

  ```
  request.setRequestHeader(
      "Content-Type", "application/x-www-form-urlencoded"
  )
  ```

  We're saying: "Hey server, I'm sending form-style data — just like a
  normal HTML form would."

-This next line sets a function to run every time the state of the request 	changes:

	request.onreadystatechange = function () {
		…
	}

- The request goes through different "states" (0 to 4) as it progresses-and
  these are stored in the readyState property of the XMLHttpRequest
  object. When it gets to state 4, it means the response has been fully
  returned 	from the server. So, this is where we check if the request is
  finished:

  ```
   if (this.readyState == 4) {
      …
  }
  ```

  See below, the different values of the readyState property and what
  they mean. So here, we confirm if the request is done. If it is, we move
  on to check if it worked properly.

- This next line checks if the server responded with success:

  ```
  if (this.status == 200) {
      …
  }
  ```

  Universally, in API programming, the group of status codes normally returned are as follows:

    * 200 = Success
    * 404 = Not found
    * 500 = Server error
    * …and so on.

- Now we check: Did the server actually send us back some text?

  ```
  if (this.responseText != null) {
      // use thisResponseText here
  }
  ```

	The “this.responseText” line is referencing the responseText property of the current object, which is XMLHttpRequest object. Basically, if its value is null, therefore, nothing was returned from the server. That is why we check to see if its value is not equal to null (this.responseText !== null) before we proceed to use the data returned within that block. In this example, we take the data returned by the server, and inject it into the DOM as the value of an element on our web page with the id attribute of “info”.

	document.getElementById('info').innerHTML = this.responseText

For example: If the server replies with "Username already taken", that   
message will appear in the page.
  On the other hand, if “this.”responseText contains nothing (is null), the code in the else block will be run, and we display something on the screen, an alert popup message to inform the user that no data was received:

	if (this.responseText !== null) {
        	…	
        } 
	else 
	{
                alert("Ajax error: No data received");
        }  

- If the the server returned another status code other than an OK status (200), it means the AJAX request was not successful, hence we also inform the user using a popup alert that there was an Ajax error and whatever the the text that was returned with the status code (this.statusText):

	} else alert("Ajax error: " + this.statusText)

-This is how we send the request to the server — along with the
  params we built earlier (username=JohnDoe):

	  request.send(params)

- That’s all the JavaScript frontend code needed to make the AJAX
  request. But let’s talk a little about how the backend (server-side) will
  work, so you have a full-rounded perspective about how this works.
  The server-side code that receives, processes the parameter passed
  in (username intros case), and sends back the response could be
  handled by any one of the following server-side programming
  languages:
	
  - PHP file like checkUsername.php
  - Node.js route like /auth/checkUsername
  - Python/Django/Flask handler

  That server script receives the username, checks it (e.g. in a
  database), and sends back a message like:

  "Username is available" or "Username is already taken"


  In the early days of the web, developers had to jump through hoops to make AJAX calls that worked in different browsers-especially Internet Explorer. But modern browsers now universally support XMLHttpRequest.
Although XMLHttpRequest is mostly used to fetch plain text or JSON today, it was originally built for XML data.
You can still use it to:

  - Send or receive XML from a server
  - Parse XML using responseXML

To receive and XML response, you would use the responseXML property of the XMLHttpRequest object instead of the responseText. For example:

	if (this.responseXML !== null) {
        	// Get data from this.responseXML, not this.responseText e.g.
		let xmlData = this.responseXML 
        } 
	else 
	{
                alert("Ajax error: No data received");
        } 

Basically, the property that will contain the returned data always depends on the type of the data that is returned from the server.
  Newer APIs like fetch() make asynchronous calls even easier to write and manage. I will talk about how to use the built-in JavaScript fetch() API next.




#### The responseType property

  Sometimes, you will see developers use the .responseType property when sending an AJAX request with the XMLHttpRequest object. This specifies the type of the data you want to get back as the response from the server. In our example above we did not use it, but if we did, we would have added it like this:

	let xhr = new XMLHttpRequest();

	xhr.open(
		"GET",
		"https://jsonplaceholder.typicode.com/users",
		true
	);
	xhr.responseType = 'document'; // specifying doc type wanted back
	xhr.onload = function () {
    		if (xhr.status === 200) {
		    // Logs the response from the server
        	    console.log(xhr.responseText); 
    		}
	};

	xhr.send();

The new line we have added is:

	xhr.responseType = 'document';

Here we are specifying that the data type of the response we expect back should be a document. This ‘document’ means a Document Object Model (DOM) so the data should be parsed (converted) into DOM format for us. We would then be able to directly use DOM methods we are already familiar with on it to extract the data we need, or even inject it into the DOM if it is an HTML document, and we need to inject HTML and not text to any part of a web page.
  Using the responseType property in your request is good because it will determine how the XMLHttpRequest object formats the data it gets back to get it ready for you to use. You do not have to send it with every request. Let me show you why.
  When you use the XMLHttpRequest object to fetch data from a server, the browser usually treats the response as plain text by default. But sometimes, you may want the response to be treated as a different type of data, like XML or JSON. That’s where the .responseType property comes in. Setting xhr.responseType tells the browser how to handle and interpret the response. For example If you are loading an XML file, and you want the browser to automatically parse it into a usable document (just like an HTML or XML page), you can do it like this:

	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'books.xml');

	// Ask the browser to treat the response as a document
	xhr.responseType = 'document'; 

	xhr.onload = () => {
		// Now this is a parsed XML document
  		const xmlDoc = xhr.response; 
  		const titles = xmlDoc.getElementsByTagName('title');

  		for (let i = 0; i < titles.length; i++) {
    			console.log("Book Title:", titles[i].textContent);
 		}
	};

	xhr.send();

By setting xhr.responseType = 'document', we tell the browser to treat the response like a real XML or HTML document, which allows us to use powerful DOM methods on it. Notice that we retrieved the response in this case from the .response property of the XMLHttpRequest object.

	const xmlDoc = xhr.response; 

We are then able to use a DOM method getElementsByTagName() on the parsed data like this:

	const authors = xmlDoc.getElementsByTagName('author');

The xhr.response property is not meant to hold XML data, but because we requested for it to be parsed into a doc (xhr.responseType = 'document'; ),
That data was made available on the .response property (const xmlDoc = xhr.response; ).

  However, you do not have to set the .responseType with every request. If the server returns the XML with the correct Content-Type (like application/xml or text/xml), then the browser will automatically parse the result and make it available for you to use on the .responseXML property-a property which is reserved to hold data if only XML is returned. You can grab the returned data to use like so:

	const xmlDoc = xhr.responseXML;

Here’s a version that works without setting responseType. Note that you have to retrieve the data on the .responseXML property:

	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'books.xml');

	xhr.onload = () => {
		// Also gives you a usable XML
  		const xmlDoc = xhr.responseXML;  document
  		const authors = xmlDoc.getElementsByTagName('author');

  		for (let i = 0; i < authors.length; i++) {
    			console.log("Author:", authors[i].textContent);
  		}
	};

	xhr.send();

Notice you can use a document object method like getElementsByTagName(), and if you try to try to get the data from the .response property instead of .responseXML, you will get an error: 

"xmlDoc.getElementsByTagName is not a function
  at xhr.onload"

This works as long as the server sends the XML file with the correct content type.

  Your take-away from here should be that 
  - Setting .responseType = 'document' is helpful when loading XML or
  HTML and you want to work with it using DOM methods.
  - But if you're loading XML from a well-configured server that
  communicates back the right headers-that include the response
  data type it is sending, using xhr.responseXML will also work just
  fine even without setting responseType.

I though I should let you know about this responseType property so you’re prepared when you need more control over how data is handled in the browser.










#### The readyState property
  The readyState property of an XMLHttpRequest object tells you the 
current status or stage of the request. It changes as the request 
progresses. There are five (5) different states the request goes through from start to finish, and they are all recorded on the readyState property. To know what state the request is in, at any given time, you just have to check for the value of readyState. Here's a complete list of the 5 readyState values and what they mean:


| Value | Name | Meaning |
|---|---|---|
| 0 | UNSENT | The request has been created, but .open() has not been called yet |
| 1 | OPENED | .open() has been called. You can now set headers or call .send() |
| 2 | HEADERS_RECEIVED | .send() has been called, and the response headers have been received |
| 3 | LOADING | The browser is receiving the response body (data is loading) |
| 4 | DONE | The request is complete, and the response is fully received |


You can use an event listener to track the changes in the value of this readyState property as the request progresses, and react to them. This is very powerful because even though your AJAX request calls are happening behind the scenes (asynchronously) of your application without your user being aware, you still have complete control over their progress because you can track these changes, and update your users on what’s going on at any given point.   
  To do this tracking, you do so using another property of the XMLHttpRequest object known as the onreadystatechange which is an event listener, albeit a JavaScript built-in one. Here is an example of how you can use the onreadystatechange event to track these stages of your AJAX request:

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
  		console.log("readyState:", xhr.readyState);
  	
		if (xhr.readyState === 4 && xhr.status === 200) {
    			console.log("Response:", xhr.responseText);
  		}
	};

	xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

	xhr.send();

This code will make an AJAX request to the same URL we used above to get sample user data, but it will print the value of the readyState property of the request object (XMLHttpRequest) each time it changes, so you can observe how the request progresses from start to finish.




### Modern Way (Using fetch())
  The fetch() function is a built-in JavaScript function used to make HTTP requests. It allows you to retrieve data from APIs, send data to servers, and handle responses asynchronously.
Unlike Axios, fetch() returns a Promise and does not automatically convert JSON responses—you need to call .json() manually. It is widely used because:

  - It’s native to JavaScript (no need to install anything).
  - It supports modern async/await syntax for cleaner code.
  - It provides fine control over requests, including headers
  and methods.

  However, fetch() does not reject on HTTP errors (e.g., 404 or 500), so you must manually check response.ok to handle errors properly. Despite this, it remains a powerful and lightweight tool for making AJAX requests in JavaScript. Here is an example of using fetch() to make an Ajax request to the following endpoint: "https://jsonplaceholder.typicode.com/users”, logging the result to console, and handling any errors that occurred in the request:


	fetch(
			"https://jsonplaceholder.typicode.com/users"
		)
    	.then(response => response.json()) 
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));

This line converts the response to JSON:
	 .then(response => response.json()) 

Let’s convert the exact same example we wrote above for the XMLHttpRequest object using fetch. Just like before, we're sending a POST request with the username, and showing the server's response inside an element with id="info".

	const params = new URLSearchParams();
	params.append("username", username.value);

	fetch("auth/checkUsername", {
  		method: "POST",
  		headers: {
    			"Content-Type": "application/x-www-form-urlencoded"
  		},
  		body: params
	})
	.then(response => {
  		if (!response.ok) {
   			throw new Error("Network response was not OK");
  		}
 		return response.text(); // Read the response as plain text
	})
	.then(data => {
  		document.getElementById("info").innerHTML = data;
	})
	.catch(error => {
  		alert("Fetch error: " + error.message);
	});

Explanation: 
  - We create a URLSearchParams object — a fancy way to build form-style data. It’s like saying: username=JohnDoe.
  - This tells the browser where to send the request — to a server file or
    route (same as before).

  - This waits for the server’s reply:

		.then(response => {
  			if (!response.ok) {
    				throw new Error("Network response was not OK");
  			}
  			return response.text();
		})

If the response is not OK (e.g. 404 or 500), we throw an error,
otherwise, If all is good, we grab the response as plain text and
display it inside the #info element in the HTML.
		
		.then(data => {
  			document.getElementById("info").innerHTML = data;
		})

If something goes wrong anywhere above (bad URL, server
offline, etc.), we catch the error and alert the user.

		.catch(error => {
  			alert("Fetch error: " + error.message);
		});

Some reasons why you may want to use fetch() over XMLHttpRequest are as follows:

  - fetch() uses promises (cleaner code) but XMLHttpRequest does not
  - fetch() has less code, and is easier to write
  - fetch() has built-in error handling while XMLHttpRequest  does not




### Asynchronous programming
  Asynchronous programming is when code runs but the rest of your program does not have to wait for it to finish. You can still interact with your application program in different ways while waiting for the result of the running code. There would naturally be some kind of code that listens for the event of the result of the asynchronous (background) task returning being completed. That listener will take some action based on that, even if that action is simply to display a notification on screen to inform the user of the background task’s completion.  
  If a function is run synchronously-and this is the default behaviour, the code parser will wait at that line for it to run completely before moving on to the next line. Asynchronous is the opposite of that. If a function is run asynchronously, it means that the JavaScript parser will not stop at that line and wait for it to finish its job before proceeding. Rather, that function will simply be made to run in the background while the parser will carry on executing the rest of the lines of code after that line. JavaScript has some of its own (built-in) asynchronous functions, one of which you have seen above; the setTimeout() function. So in brief, an asynchronous function schedules a task to run later without blocking the execution of other code.
   This is where callbacks come in handy, hence why they have always been used in JavaScript. A callback is usually a function (usually anonymous) to be run when a program has finished running. It is therefore ideal in asynchronous (background) programs. In fact, call backs was always the de-facto way to write these kind of programs.
  ES6 (ECMAScript 2015) saw the introduction of promises which replaced callbacks. Then in 2017 came the even more refined way to do the same thing that Promises do, and that was async/await. Async/await, though not meant to replace Promises, was a different way to do what promises do. It deals with the response in such an elegant and seamless way that it looks more like synchronous programming. 
  JavaScript has many built-in asynchronous functions that are useful to know. Here is a list of the important ones including with simple examples. You may not understand the examples now, but as we delve into those concepts immediately following below, all will be explained

-1) setTimeout() – Runs a function after a delay (already 
		mentioned).

		setTimeout(
			() => console.log("This runs after 2 seconds"),
			2000
		);


-2) setInterval() – Repeats a function at a fixed time interval.

		let interval = setInterval(
			() => console.log("Runs every second"),
			1000
		);

		// Stops it when needed.
		clearInterval(interval); 


- 3) fetch() – Makes network requests (AJAX calls, APIs).

  ```
  fetch("https://jsonplaceholder.typicode.com/posts")
          .then(response => response.json())
          .then(data => console.log(data));
  ```


-4) Promise-based APIs – Many modern APIs return Promises, 
		which are inherently asynchronous.

		navigator.geolocation.getCurrentPosition(
    			position => console.log(position), 
    			error => console.log(error)
		);


-5) requestAnimationFrame() – Optimised function for 
		animations.

		function animate() {
    			console.log("Frame rendered");
    			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);


- 6) WebSockets & Event Listeners – These run
    asynchronously, waiting for events to happen.

  ```
  document.addEventListener("click", () =>    
      console.log("Clicked!"));
  ```


- 7) async/await functions – Used to simplify Promises.

  ```
  async function getData() {
          let response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
      );

      let data = await response.json();
          console.log(data);
  }
  ```

		getData();


  Before we look at promises and async/await, it’s essential to understand the concept of a call back, which existed to solve more or less the same problem that they are solving.

![Figure 22.1 — The same wait, written three ways](images/ch22-fig-01-three-async-styles.svg)

- Figure 22.1 — The same wait, written three ways*
 Let us dive right in, and demonstrate with examples, a callback, then move on to show how a promise would be used, and finally, how Async/Await would be used to solve the same problem.


  - a) Callback

		<!doctype html>
		<html>
    			<head>
        			<title></title>
    			</head>
    			<body>
				<ul id="gusUl">
                   		</ul>
			</body>
		</html>


		const posts = [
    			{ title: 'post one', body: 'This is one'},
    			{ title: 'post two', body: 'This is two'}
		];
    
		let ul = document.querySelector("#gusUl");

		function getPosts()
		{
    			let output = '';

    			posts.forEach((post, index) => {
        			output += `<li>${post.title}</li>`; 
    			});
     
    			return output;
		}

		function createPost(post)
		{
    			setTimeout(() => {
        			posts.push(post);
    			}, 2000);
		}
    
    

		createPost( 
    			{ title: 'post three', body: 'This is three'}
		);

		// display the post data in the UI (web page)
		ul.innerHTML = getPosts();


  You have here two functions, getPosts() that reads data from an array posts, and renders it as HTML list tags to display the posts. The other function, createPost() adds more data to the posts array.
  If you ran the code now and looked in your HTML you would find that only post one and post two are displayed as `<li>` elements. Though we first of all call createPost() before we call getPosts(), you would think that we will get three tags displayed, but we only get two. The `<li>` element post three created by createPost() above did not appear because the code in createPost() runs in a setTimeout() function which ensures that its task is only executed after a two seconds delay. The issue is that setTimeout() is asynchronous, meaning getPosts() returns before it completes. This means that the next function we call, getPosts(), runs and fetches the current posts data before the additional post is created, hence, it only finds two items in the posts array.
  To resolve this issue, you need to use callbacks, Promises, or async/await. Let’s see how a callback can fix the issue. We will modify the createPost() function to accept a callback function as its second argument. This callback function is getPosts() which should then be called by createPost() after it has finished doing its task of adding data to the posts array. This is to ensure that after updating the data in posts, the list of posts displayed on screen is refreshed by getPosts() to reflect that update. 
  Be sure to pass the getPosts() function then as the second argument to createPost() when you call it. The modified code will look like this:

		function getPosts()
		{
    			let output = '';

    			posts.forEach((post, index) => {
        			output += `<li>${post.title}</li>`; 
    			});
    
			ul.innerHTML = output;
		}		

		
		function createPost(post, callback)
		{
			setTimeout(() => {
				posts.push(post);

				// call the callback function
				callback();
			}, 2000);
		}

		// pass getPosts as a function reference, not as a 
		// function call meaning getPosts, not getPosts()
		createPost( { title: 'post three', body: 'This 
			is three'}, getPosts);

		// Initially display posts
		getPosts();


  Now when we call createPost() as we do above, because we pass it a callback, we get the three list items displayed correctly in the browser. It is crucial to understand why the callback solution works:
  - Note that earlier, we called both the createPost() and
  getPosts() functions separately, first to create a new post,
  and then to fetch all the posts to upload the list in the UI
  like so:

		createPost( 
    			{ title: 'post three', body: 'This is three'}
		);

		ul.innerHTML = getPosts();

  But that was because getPosts() was returning data (output), and we were using that to update the list in the UI outside of getPosts(). Well, we now know that it obviously did not work because getPosts() was returning posts data (output) which it was fetching before createPost() had done its job. This time we call both functions in one line, by calling createPost() and passing it getPosts() at the same time as a callback, then we call getPosts() one more time in the end just to get the initial, out-of-date posts, before the update happens in getPosts() thanks to the callback we are sending:

		createPost( { title: 'post three', body: 'This 
			is three'}, getPosts);

		// Initially display posts
		getPosts();

Note that we are now calling getPosts() like so:

	getPosts();

And not like so:

	ul.innerHTML = getPosts(); 

When getPosts() finishes its job, it is updating the UI update inside itself, because it has the updated post data from the delayed task of createPost(). This is the crucial part of how this code is made to work.

-We have now changed the code that calls getPosts() to be
  the callback that we pass to createPost(). That is why we
  get rid of the return statement from getPosts(). We will
  not need it to return the output variable, because by the
  time it does that within the setTimeout() function, the
  other code will have ran and so we will never see any
  update in the browser. To see that update, we need to
  make the UI update directly inside getPosts() so that the
  callback function will run that. That is why in getPosts()
  we replace the return statement with this code to update
  the UI:

		ul.innerHTML = output;

-Note that whenever you call another function and pass a
  function as a callback argument to it, that function being
  passed as a callback should be passed as a reference
  only. This means that you should not include parenthesis
  after the function name as you would do if you were
  running it directly. That is why when we call createPost(),
  we pass it the getPosts callback function as a reference
  like so getPosts and not getPosts():

		createPost( 
    			{ title: 'post three', body: 'This is three'},
    			getPosts
		);

	



-b) A promise
To convert the above example to use a promise, we will leave the getPosts() function exactly the same as when using the callback function above, but we will modify the createPost() function to look like this:

	function getPosts()
	{
    		let output = '';

    		posts.forEach((post, index) => {
        		output += `<li>${post.title}</li>`; 
    		});
    
		ul.innerHTML = output;
	}

		
	function createPost(post)
	{
		return new Promise((resolve, reject) => {
			//resolve is for when things go right, & 
			// reject is for when the request fails
			setTimeout(() => {
				posts.push(post);
				const error = false;

				if (!error)
				{
					resolve();
				}
				else
				{
					reject('Error: Something went wrong');
				}
			}, 2000);
				
		});
	}

	// pass the callback function (getPosts) inside .then()
	createPost( { title: 'post three', body: 'This is 
		three'}).then(getPosts)
		.catch(err => console.log(err));

	// Initially display posts
	getPosts();


  Note that the then() will only be called if it resolves. But if it fails and is rejected, it will be caught by the catch() section. Many get APIs now, as well as the Mongoose library, node.js etc use the promise feature. 



  -Promise.all()
The promise.all() function is used to handle several promises, for example, replace the call to createPosts() above with the following:
		
		const promise1 = Promise.resolve('Hello world');
		const promise2 = 10;
		const promise3 = new Promise(
		  (resolve, reject)
			=> setTimeout(resolve, 2000, 
				'Goodbye')
		);

		const promise4 = fetch('https://jsonplaceholder.typecode.com/users').then(res =>
			res.json());

		Promise.all(
			[promise1, promise2, promise3, 
			 promise4])
			.then(values => console.log(values)
		);

Note that promise4 uses the fetch API, an online free test API for json data. That is how it gets its json data. This data coming from the fetch API already uses promises, so you just get the response with then().
Promise3 uses the setTimeout() function to call after 2 seconds, so the total amount of time promise.all() takes to run is 2 seconds, as it always uses the longest time that any of its	promises takes to resolve.

	



  - c) Async/Await
  
  Async/await literally stands for asynchronous and await. You use them together on a block of code to get the desired result. Start by declaring it one space before the function keyword to mark that function so JavaScript knows that it should be run asynchronously. That is exactly its purpose; to allow you to create your custom asynchronous functions.

	async function myFunction() {
		// await … for this code to be run before proceeding 
		await functionToCall(anyArguments);
	}

  Async/await uses a significantly more simple and elegant syntax than promises:

	// then call it like so
	myFunction();
	
  Let’s modify our code above to use promises:
		
	const posts = [
   		{ title: 'post one', body: 'This is one'},
    		{ title: 'post two', body: 'This is two'}
	];
    
	let ul = document.querySelector("#gusUl");

	function getPosts()
	{
    		let output = '';

    		posts.forEach((post, index) => {
        		output += `<li>${post.title}</li>`; 
    		});
    
    		ul.innerHTML = output;
	}


	function createPost(post)
    	{
        	// Make createPost() return a Promise
        	return new Promise((resolve) => {
            		setTimeout(() => {
                		posts.push(post);
                		// Resolves the promise after pushing the post
               	 		resolve();
           	 	}, 2000);
        	});
    	}


	async function init() {
    		await createPost(
			{ title: 'post three', body: 'This is three'}
		);

    		// Runs after createPost() is done
    		getPosts(); 
	}

	init(); 


  We're basically saying that we will wait (await) for the new post to be created, then (before we) call getPosts() to get the update. This makes for cleaner and more readable code, and hence it is said that async/await it is a more elegant way to do a promise. Notice however, that though we used async/await to call the createPost() function, we still use a promise within createPost() so it returns a promise

	function createPost(post)
	{
		return new Promise((resolve) => {
			…
		});
	}

This is because you cannot use pure async/await to resolve the issue without using a promise in combination with it. Async/await is built to work with Promises. If there’s no Promise, await does nothing.This is because async/await is just syntactic sugar over Promises, and so they only work with Promises. If a the function being called (like createPost() in our example) does not return a Promise, await has nothing to wait for, and execution therefore will therefore move forward immediately with no asynchrony.
  The other thing to understand is that the line within createPost() that calls resolve() is so important. Calling resolve() ensures async/await works. It is the thing that makes a promise return itself. Any value to be returned by the function should be passed into resolve() as an argument eg:

	resolve(arguments);

With that in place, only then will the await code that calls createPost()

  await createPost(...)

be able to correctly pause execution until the Promise resolves. 
  Here is a modified example of using async/await with promises , structured slightly differently to achieve the same thing. Hopefully you can read through the code and understand everything about it without my explanations. Read the inline comments as a guide.

	const posts = [
    		{ title: 'post one', body: 'This is one'},
    		{ title: 'post two', body: 'This is two'}
	];
    
	function getPosts() {
    		return new Promise((resolve) => {
        		setTimeout(() => {
            			let output = '';
            			posts.forEach((post) => {
                		// List items are created as a template literal
                		output += `<li>${post.title}</li>`; 
            			});
            
            			// Return the final string after the delay
            			resolve(output); 
        		}, 1000);
    		});
	}

	function createPost(post) {
    		return new Promise((resolve) => {
        		setTimeout(() => {
            			posts.push(post);
            
            			// Ensure it waits before proceeding
            			resolve(); 
        		}, 2000);
    		});
	}

	// Wait for createPost() first, then update the UI
	async function updateUI() {
    		// Wait for post creation
    		await createPost(
			{ title: 'post three', body: 'This is three' }
		); 
    
		let ul = document.querySelector("#gusUl");
    
		// Wait for posts and update UI
    		ul.innerHTML = await getPosts(); 
	}

	updateUI();

Let me point out that, as you can see, you may use await as often as needed whenever you have to wait for some asynchronous code to return data—just make sure that the function being awaited returns a Promise. On the asynchronous side, the resolve() function inside a Promise is key: it signals that the operation is complete. Without resolve(), the Promise remains pending indefinitely, causing the awaiting code to hang. Additionally, resolve(value) is how data is passed back from the Promise, so make sure to pass any return values as arguments to resolve(). For error handling, reject(error) can be used to signal a failure, which can then be caught with .catch() or a try...catch block. 
  You should use a try-catch block when making a request to a promise and you expect it to send back an error (via its reject() function) if an error occurs. Here is an example of how to make a request to a promise using a try and catch to handle any returned errors:

	function fetchData() {
    		return new Promise((resolve, reject) => {
			// Simulate success or failure
        		let success = false; 

        		if (success) {
            			resolve("Data loaded successfully!");
        		} else {
            			reject("Error: Failed to fetch data.");
        		}
   		 });
	}

	async function loadData() {
    		try {
        		let data = await fetchData();

			// This runs if the promise resolves
        		console.log(data); 
    		} catch (error) {
			// This runs if the promise rejects
        		console.error(error); 
    		}
	}

	loadData();



  To reinforce the point, this is the reason why most modern API’s implement promises, so it will easier to consuming them using async/await. Here is an example of how to use async/await to consume an API using the fetch API of JavaScript. To use async with the fetch API, do it like so:

Without async/await:

	fetch("https://jsonplaceholder.typicode.com/users")
    	.then(response => response.json()) // Convert resp to JSON
    	.then(data => console.log(data)) // Log the response
    	.catch(error => console.error("Error:", error));


With async/await:

	async function fetchUsers()
	{
		try {
			const res = await fetch(
				'https://jsonplaceholder.typicode.com/users'
			);

			const data = await res.json();
			console.log(data);
		 } catch (error) {
			console.error("Error:", error);
   		 }
	}

	fetchUsers();	



  We call await the second time on the response from the 
fetch API 

	await res.json();

This is because .json() is a function that coverts the data into json format, and it might need time to do its work too. We therefore want to wait for that to happened before we use the data. 






### Using Axios (external library)
  Axios is a popular JavaScript library used for making HTTP requests (GET, POST, etc). It simplifies fetching data from APIs, sending data to servers, and handling responses. Axios works in both browsers and Node.js. When used in Node.js, it is installed as any of the other Node.js packages using the npm … command (e.g. npm install axios). When used in the browser, it can be included via a CDN, or just installed on a machine. Axios is often preferred over the built-in fetch() because:

  - It is promise-based, which is cleaner that callbacks
  - It automatically transforms JSON data (no need
  for .json()).
  - It handles errors better by rejecting failed requests.
  - It supports request timeouts, making it easy to prevent
  long waits.
  - It allows interceptors, which help modify requests or
  responses globally.
  - It works on browsers and Node.js, unlike fetch, which is browser-only

  With Axios, you can make GET, POST, PUT, DELETE requests easily, making it a great tool for handling AJAX operations in modern web development. Here is a simple example of how to make an Ajax request to the following endpoint: 
"https://jsonplaceholder.typicode.com/users”, log the response to the console and handle any errors that occur:

	axios.get("https://jsonplaceholder.typicode.com/users")
    	.then(response => console.log(response.data))
    	.catch(error => console.error("Error:", error));


Here is another example of using Axios with async/await:

#### CSS code

	body {
    		font-family: Arial, sans-serif;
    		padding: 20px;
    		background: #f7f7f7;
  	}

  	h1 {
    		font-weight:bold;
    		color:dodgerblue;
  	}


#### HTML code (eg index.html)
	<!DOCTYPE html>
    <head>
        <title>The JavaScript Blueprint</title>
        <link rel="stylesheet" href="index.css" type="text/css">
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    </head>
    <body>
        <h1 id="myHeading">The JavaScript Blueprint</h1>
        

        <h2>Read CSV File and Display as Table</h2>
        <button onclick="fetchPhotos()">Fetch Photos</button>
        <pre id="output"></pre>
            
        <script type="module" src="/index.js" defer></script>
       
    </body>
	</html>



#### JS code (eg index.js)

	async function fetchPhotos() {
      try {
        const response = 
		await axios.get(
			'https://jsonplaceholder.typicode.com/photos'
		);

        // Display in the page
        document.getElementById('output')
		.textContent = JSON.stringify(response.data, null, 2);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    }

	window.fetchPhotos = fetchPhotos;

In this example, we use Axios to access the publicly available endpoint for API testing. We specify that the data we want to get back as a response is photos. This is because we know the endpoint has that resource, and the API providers or their documentation has told us so. It is the same endpoint  we saw in a previous example which returned a collection of dummy users’ data. 

	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);

  In this case, however, we wanted to get data on photos, hence we used this endpoint:

	await axios.get(
			'https://jsonplaceholder.typicode.com/photos'
		);

Notice that for axios to work, we needed to reference the library’s Content Delivery Network (CDN) in our HTML code (index.html) like this:

	<script
		src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js">
	</script>

If you test this in your browser, you will find that it gets and returns all photos, that the endpoint can return. You can narrow down the result you get back by optionally passing an extra parameter or parameters to the axios.get() method. How you pass the parameter depends on what you want to get from the API. The following are two ways to pass in parameters with the API request, which determine the response returned.

a) You can choose to fetch and return only photos having an
  albumId that matches the albumId passed in. This means
  you get back only photos that belong to the album whose
  id you passed in. You can do that by passing an object
  literal ({…}) as the second argument to the axios.get()
  function. For example:

		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/photos',
			{
          			params: { albumId }
        		});

This object literal sent as a second argument to
axios.get() is also known as the request configuration
object.

b) You can also choose to fetch and return a specific (single)
  photo by passing in the unique id of the photo, if you
  know it. This id argument is not passed as a second
  argument to axios.get(). Rather, you have to do so by
  changing the last value in that endpoint path string-which in this case is /photos. Change it to the id of the
  photo eg /3 if the id is 3. For example:

		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/photos/3'
		)

Or, if you have the id of the photo as a variable, you can
pass it in dynamically like so:

		let photId = 6;
		const response = await axios.get(`https://
			jsonplaceholder.typicode.com/photos/${photoId}`);

Notice that because we are mixing a variable with a
string here, we  have to let JavaScript know that photoId
is a variable so it can parse. We do this by wrapping the
whole API endpoint path string in backtick (`…`) and
place the variable within ${} characters. This is a
template literal, which is what you use in JavaScript
whenever you wish to display a string that contains
dynamic variable, and you want to make it clear to
the JavaScript parser (interpreter) which of the elements
in the string are variables. See chapter 23 (Templates),
where I talk in depth about String Literals & Template
Strings. The variables must be wrapped in ${} like so:

`This is a string ${variableName} and more text`

Of course you do not need to use a string literal,
especially if there is only one variable. In our case, we
can also simply concatenate the variable to the end of
the string like so, and it will work just the same:

		const response = await axios.get(
			'https://jsonplaceholder.typicode.com/photos/' + photoId
		);

Now you know how to pass data to an API endpoint when using Axios. Remember that if you have many variables to send through, it’s usually easier for you to send that data in the second argument of axios.get() as an object literal. This is usually the case with POST requests when you want to create some resource on the server you are passing data to. This data could be user data you have collected from a signup form on your website, or their shopping cart data after they click on Checkout etc. This data, which is sent as an object literal, also known as a request configuration object can also just contain different kinds of data to be used by the receiving server to determine how it will respond to the request. Whatever the case, it is up to the creators of the API to determine what kind of data, or format of it is to be sent as data in requests to the API endpoints, and which endpoints (URLs) to use for each request type.
  Once more, here is how to fetch only one piece of data, the data of a photo with the id of 8:

	   async function fetchPhotos() {
	      try {
	        const photoId = 8;

        const response = await axios.get(
			'https://jsonplaceholder.typicode.com/photos/' + photoId
		); 

	        // Display in the page
	        document.getElementById('output').textContent = 
			JSON.stringify(response.data, null, 2);
	      	} catch (error) {
	        	console.error('Error fetching photos:', error);
	      	}
	   }

	   window.fetchPhotos = fetchPhotos;


  Another thing to be aware of is that you, as the consumer of the API are not responsible for what the endpoint, or the URL of the API should look like, or what kind of data is to be sent with the request you make to the API, or what kind of data it will return. All that is the job of the creators of the API service. You responsibility is to ask for, or look up the documentation online, so you can get all this information.  

   





## WEBSOCKETS
  Have you ever used a chat app where new messages just pop up instantly — without refreshing the page? Or maybe you've seen live sports scores update in real-time on a website? That kind of instant, back-and-forth communication is made possible by a powerful tool called WebSockets.
  So, what is exactly a WebSocket? A WebSocket is like opening a direct phone line between your browser and a server. Unlike regular HTTP requests (which are one-way and short-lived), a WebSocket connection is two-way and always open — until you decide to close it.

  - With HTTP: The browser makes a request → the server sends a response → done.
  - With WebSockets: The browser and server can both send messages to each other at any time-like chatting over a walkie-talkie.




### Why Use WebSockets
  WebSockets are useful when you need:

  - Real-time updates (e.g., chats, online games, live notifications)
  - Continuous data exchange (e.g., sensor readings, stock prices, collaborative apps)
  - Lower latency (no repeated "asking" the server — data just flows when needed)




### Why it works
  Here is how it works, in a nutshell:
  - Your browser opens a WebSocket connection to a server.
  - The server accepts and keeps that connection alive.
  - Both sides can now send and receive data as needed — no
    reloading, no waiting.

Think of it like opening a tunnel between your app and the server where they can toss messages back and forth instantly.
  Earlier in chapter 18 (File Management), we learned how to send binary file data over WebSocket. We saw how WebSockets can be used to send files-whether it is through the uploading of images or documents in real-time, or sending chunks of data such as audio or video. We also saw how using a WebSocket gives you a lot more control over a file transfer process, than traditional uploading does.





## Where networking actually lives
  We have now met every tool this chapter set out to cover — fetch(),
XMLHttpRequest, Axios and WebSockets — so this is a good moment to step back
and ask a question that is easy to get wrong: which of these is actually part
of JavaScript?
  The answer is none of them. JavaScript itself has no networking. The
language has no way to open a socket, no way to send a packet, nothing that
knows what HTTP is. What it has instead is the ability to use whatever
networking the surrounding platform hands it — and that platform is either
the browser or Node.js.
  This matters more than it sounds, because it explains why the same language
can feel so different in the two places.


### Networking in the browser
  In the browser, every networking tool you have used in this chapter is
supplied by the browser itself:

  - fetch() — for making HTTP requests
  - XMLHttpRequest — the older way of doing the same
  - WebSocket — for a two-way connection that stays open
  - <script src="..."> — loading an external script

  Notice what is missing from that list. There is no way to open a raw TCP or
UDP connection, no way to listen on a port, no way to act as a server. The
browser deliberately does not give you those, because a web page is untrusted
code running on somebody else's machine. Everything you are allowed to do
goes through the browser, and the browser applies its rules — which is exactly
why CORS kept turning up earlier in this chapter.


### Networking in Node.js
  On a server, the restrictions fall away. Node.js gives JavaScript the same
networking a language like Python or Go would have:

  - open TCP and UDP sockets
  - run HTTP and HTTPS servers, not just make requests to them
  - call other servers' APIs
  - use modules such as http, net, dns and ws for full control

  This is why the SOAP examples earlier had to be routed through a Node.js
server, and why the WebSocket server in Chapter 18 was a Node.js program
rather than a browser one. In Node.js, JavaScript can act as a full
networking language.
  So the honest summary is this: JavaScript is not a networking language, and
it is also not not one. It borrows the networking of wherever it is running.
In the browser you get a careful, guarded subset, and everything in this
chapter has been about using that subset well.




## LIBRARIES
#### -Notie, is an easy to use notification library
- Note: see how i implemented it in the
  Golang ‘Hotel-booking’ app on github.
- Get it from:

  http://github.com/jaredreich/notie

 -Paste the provided JS & CSS cdn
   references on your web page. Then write 
  custom function like this to use it:

  ```
  function notify(msg, msgType) 
  {
      notie.alert({
        type: msgType,
        text: msg
      });
  }
  ```

 -Finally; wherever you wish to use it in your 
   code, call your custom function to notify 
   the user of something in the browser like 
   so:

     notify("Thanks for confirming", "success");