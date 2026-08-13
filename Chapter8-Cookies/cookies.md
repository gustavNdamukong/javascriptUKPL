
//————————————————————//
	CHAPTER 8 - COOKIES
//————————————————————//

	-How cookies work
	-Security considerations
	-Managing cookies
		-Setting a cookie
		-Retrieving a cookie
		-Get a specific cookie by name
		-Delete a cookie by name



  A cookie is a small piece of data stored in a user's browser that helps websites remember information between visits. It plays a key role in frontend-server communication, allowing websites to track user sessions, store preferences, and manage authentication. Cookies are commonly used for:

	-User authentication — keeping users logged in across pages.
	-Session management — tracking shopping cart items or user actions.
	-Personalisation — storing user preferences like themes or language settings.



How cookies work
————————
  When a user visits a website, the server or client-side JavaScript can set a cookie in the browser. On subsequent requests, the browser automatically includes the cookie, enabling the server to recognise returning users.



Security considerations
————————————
  	-Same-Origin Policy. Cookies are only accessible to the 
		domain that set them.
	-The HttpOnly flag. This stops a cookie from being 
		read by JavaScript at all, which protects it from 
		scripts running on the page.
	-The Secure flag. This is a different job: it makes the 
		browser send the cookie only over HTTPS, never over 
		plain HTTP.
	-Expiration & Storage Limits – Cookies have expiration 
		times and are limited in size (~4KB).

While cookies are useful for storing small amounts of data, they are not suitable for storing sensitive information, as they can be accessed by client-side scripts unless secured properly.



Managing cookies
———————
Let us look at how to work with cookies.
Cookies are written and read differently from how localStorage and sessionStorage are written to and read from the browser (we come to those in Chapter 13, Databases and Storage). Here is how to create a cookie and its value.

Setting a cookie
—————-

	document.cookie =
		"username=JohnDoe; expires=Fri, 31 Dec 2027 23:59:59 GMT; path=/";

	What this does is
		-Sets a cookie named "username" with the value 
		    "JohnDoe".
		-The cookie expires on 31 Dec 2027 (after this, it will 
		    be deleted automatically).
		-The path=/ makes the cookie accessible across the 
		    entire site.

  	However, instead of writing a long string like "Fri, 31 Dec 2025 23:59:59 GMT", you can generate it dynamically using JavaScript's Date object. Here is an example:

	let expiryDate = new Date();

	// make it expire in 7 days
	expiryDate.setDate(expiryDate.getDate() + 7); 

	document.cookie =
		`username=JohnDoe; expires=${expiryDate.toUTCString()}; path=/`;

	Take care to keep the ${ ... } together on one line. If the $
	and the { get separated, JavaScript stops seeing it as a slot
	to fill in and just treats the whole thing as ordinary text,
	so your cookie ends up with a literal ${expiryDate...} in it
	rather than the date.

This code does the following:
	-gets the current date.
	-Adds 7 days to the expiry date.
	-converts it to a proper UTC string format 
	     using .toUTCString().
	-Sets the cookie with a clear expiration time.

	This method is easier and more flexible than writing the 	
	date manually.



Retrieving a cookie
————————
  To retrieve all cookies as a single string, do it like so:

	console.log(document.cookie);

The output will be something like this:

	"username=JohnDoe; theme=dark; loggedIn=true"

Each cookie is separated from the next by a semicolon and a space ("; ").




Get a specific cookie by name
——————————
  The way to do it is to retrieve all the cookies in one string, as in the above example, then loop through the result, whilst maybe checking for the keys or values of each against the value you want to match with. Once you find the match, end the loop and there you have your cookie by the name/value you searched for.
  Say we need to find a cookie with a key named “username”, here is how to do it:

	function getCookie(name) {
		// Split cookies into an array
    		let cookies = document.cookie.split("; "); 
   
	 	for (let cookie of cookies) {
			// Split key-value pair
        		let [key, value] = cookie.split("="); 

			// Return the matching cookie value
        		if (key === name) return value; 
    		}
    
		// Return null if not found
		return null; 
	}

	// Output: JohnDoe
	console.log(getCookie("username")); 

So, what the code does is:
	-Splits the document.cookie string into an array of key-
		value pairs.
	-Loops through the array to find the matching key.
	-Returns the cookie's value if found, otherwise returns null.




Delete a cookie by name
———————————————
  To delete a cookie, you simply set its expiration date to a past date. This makes the browser automatically remove it. For example:

	document.cookie =
		"username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

This code does the following:
	-Sets the cookie's value to an empty string ("").
	-Sets the expires attribute to a past date (Jan 1, 1970), 
		effectively deleting it.
	-Uses path=/ to ensure it deletes the cookie from all paths 
		on the site.

It would be nice to create a re-usable function to delete any cookie by name. We can make it even better and get it to first of all check whether the cookie exists before deleting it. Here it is:

	function deleteCookie(name) {
    		if (document.cookie.split("; ").some(cookie => 
			cookie.startsWith(name + "="))) {
        			document.cookie =
				`${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        
				console.log(`Cookie "${name}" deleted.`);
    		} else {
        		console.log(`Cookie "${name}" not found.`);
    		}
	}


Here is how to use it:

	// Deletes 'username' if it exists
	deleteCookie("username"); 

	// Outputs: Cookie "nonExistingCookie" not found.
	deleteCookie("nonExistingCookie"); 

What it does is:
	-Retrieves all cookies as a string (document.cookie).
	-Splits them into an array using "; " as the separator.
	-Checks if any cookie starts with name=.
	-Deletes it only if it exists.