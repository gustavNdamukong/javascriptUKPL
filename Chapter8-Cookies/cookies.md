
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
	-A cookie consent solution



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


A cookie consent solution
——————————————
  Let's put the whole chapter to work with a small, real example: a cookie
consent popup, the kind almost every website now has to show. It is worth
building because it uses cookies for exactly what they are for - remembering
one small fact about a visitor between visits.
  We will also write it so that you can switch between the three ways of
storing data on the visitor's machine, since the popup does not much care
which one you use. Those other two, localStorage and sessionStorage, are
covered in Chapter 13 (Databases and Storage).

  First the markup for the popup itself:

	<div id="consent-popup" class="consent-hidden">
		<p>
			Be aware that we use cookies to improve your
			experience, and nothing more
			<a href="#">Link to your Terms and Conditions
			or Data Policy here</a>.

			<a href="#" id="accept-cookie-use"
				class="btn btn-primary rounded-pill">
				Okay
			</a>
		</p>
	</div>

  And the little bit of CSS that hides it. Without this the popup would
simply always be on show, since all our JavaScript does is add and remove
that one class:

	.consent-hidden {
		display: none;
	}

  Now the JavaScript. Cookies are written and read differently from
localStorage and sessionStorage, so the first thing we do is wrap them in an
object with getItem() and setItem() methods. That way the rest of the code
can treat all three the same way:

	const cookieStorage = {
		getItem: (key) => {
			// Get the whole cookie string and turn it
			// into an object of key-value pairs
			const cookies = document.cookie
				.split(';')
				.map(cookie => cookie.split('='))
				.reduce(
					// The {} at the end is the starting
					// value, so we build up an object
					(acc, [name, value]) =>
						({ ...acc, [name.trim()]: value }),
					{}
				);

			return cookies[key];
		},

		setItem: (key, value) => {
			document.cookie = `${key}=${value}; path=/`;
		}
	};

  Take care with that last line. There must be no spaces around the equals
sign. Writing `${key} = ${value}` would create a cookie whose name ends in a
space and whose value begins with one, which is not what you asked for and
leads to some baffling afternoons.

  With that in place, the rest reads plainly:

	const storageType = cookieStorage;
	const consentPropertyName = 'jdc_consent';

	// Show the popup only if we have not already been told "Okay"
	const shouldShowPopup = () => !storageType.getItem(consentPropertyName);

	const saveToStorage = () =>
		storageType.setItem(consentPropertyName, true);

	const consentPopup =
		document.getElementById('consent-popup');
	const consentAcceptBtn =
		document.getElementById('accept-cookie-use');

	// When the accept button is clicked
	const acceptFunc = event => {
		saveToStorage();
		consentPopup.classList.add('consent-hidden');
	};

	consentAcceptBtn.addEventListener('click', acceptFunc);

	if (shouldShowPopup()) {
		// Delay the popup by 2 seconds so it does not
		// appear before the page has settled
		setTimeout(() => {
			consentPopup.classList.remove('consent-hidden');
		}, 2000);
	}

  If you would rather store the visitor's answer in localStorage or
sessionStorage instead of a cookie, you only have to change one line:

	const storageType = localStorage;      // survives the browser closing
	const storageType = sessionStorage;    // forgotten when the browser closes
	const storageType = cookieStorage;     // our own wrapper, above

  That is the benefit of having wrapped the cookie code to look like the
other two. Everything below that line stays exactly as it is.
