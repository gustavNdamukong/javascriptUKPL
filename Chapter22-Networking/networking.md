

//——————————————————//
	CHAPTER 22 -  NETWORKING 
//——————————————————//

	-Networking in the browser
	-Networking in Node.js


  Here we talk about all the tools that are available for you to use to make your application communicate and exchange data between itself and other computers on a network. JavaScript itself doesn’t handle networking natively-it relies on the environment it's running in. It depends on whether it’s running in the browser or on a server like Node.js

  JavaScript does not have built-in low-level networking features like opening sockets or handling TCP/UDP packets like some other languages (e.g. C, Python, or Go).
But this means it can do networking by using tools provided by the platform it runs on, and the platform is the browser, or Node.js-in case you are writing the code to run on a Node.js server. Let us therefore look at those two environments and see to what extent it can do networking in them.


	Networking in the browser
	——————————————
  In the Browser (Client-Side JavaScript)
In the browser, JavaScript can do networking through browser APIs, such as:

    * fetch() – for making HTTP requests
    * XMLHttpRequest – old-school way of doing AJAX
    * WebSocket – for real-time communication
    * <script src=""> – loading external scripts

However, as mentioned; all of these rely on the browser’s built-in networking capabilities.


	Networking in Node.js
	————————————
  When JavaScript runs on a server (like with Node.js), it can do much more. Here are some things it can do on a Node.js server:

    * Open TCP/UDP sockets
    * Handle HTTP/HTTPS servers and requests
    * Make API calls to other servers
    * Use modules like http, net, dns, or ws for full networking control

So in Node.js, JavaScript can act like a full networking language.
