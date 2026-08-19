
# Chapter 14 — DATES AND TIME
- Date and time in JavaScript
- Create a date
- Formatting Dates
- Working with Time Zones
  - Understanding UTC
  - Handling UTC in JavaScript
  - Converting local time to UTC
    - A trap worth knowing about
    - What Date.UTC() is actually for
  - Convert UTC to local time
- Working with Timers: setTimeout() and setInterval()
  - setTimeout()
  - setInterval()
    - Real-life setInterval use case for Dates
  - Stopping a timer
  - Performing animations with the timer functions
    - Make a ball move across the screen
    - Create a slideshow of images
- A datepicker library in vanilla JS & Bootstrap



This has to do with how dates and time are managed by your programming language, including timezone configurations and formatting of the date and time values displayed to users. 

  
## Date and time in JavaScript

JavaScript provides a built-in Date object for handling dates and times. The Date object allows you to create, manipulate, and format dates, making it essential for tasks like scheduling events, logging timestamps, or working with time zones.
  JavaScript dates are based on milliseconds since January 1, 1970 (UTC) (the Unix epoch).
  The Date object works with both local time and UTC (Coordinated Universal Time). Unlike some other languages, JavaScript’s Date object is mutable, meaning its values can change after creation.


## Create a date
  You can create a date in several ways, here are some examples:

	   // Current date & time
	   let now = new Date();

	   // Mar 16, 2024 (Months are 0-indexed)
	   let specificDate = new Date(2024, 2, 16);

	   // ISO 8601 format (UTC)
	   let fromString = new   
	        Date("2024-03-16T12:00:00Z");

	   // Using milliseconds
	   let fromTimestamp = new 
	        Date(1710590400000);



## Formatting dates
JavaScript provides basic date formatting with various methods of the Date object. The way you use them is to first of all create a date—which will be an instance of the Date object, then call any of the formatting methods on it to format the date. Here are the Date formatting methods in action:

	  let now = new Date();

	 // Make a string of the date eg: "Sat Mar 16
	// 2024"
	console.log(now.toDateString());

	// show the date in terms of time eg: 
	// "12:34:56 GMT+0200"
	console.log(now.toTimeString()); 

	// convert to an ISO string eg: 
	// "2024-03-16T10:34:56.789Z" (UTC)
	console.log(now.toISOString()); 

	// Formats based on user's locale
	console.log(now.toLocaleString());

  However, for advanced formatting, Intl.DateTimeFormat is recommended. For example:

	  let now = new Date();

```
let formatter = 
     new Intl.DateTimeFormat(
         "en-US", 
         { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
         }
     );
```

	   // this will print to the console something
	   // like this: "Saturday, March 16, 2024"
	   console.log(formatter.format(now));

As you can see, the way the DateTimeFormat() method of the Intl object works, is as follows:
- the first argument is the locale, which is a language-and-region
  code rather than a place (en-US is English as used in the USA)
- the second argument is an object literal in which you specify
  how you would like the various components of your date to
  be displayed. The components of a date include the day,
  weekday (different from day), the month, the year etc. In
  this case, we specify that we want the weekday to be long
  meaning, we want it to be spelled out fully (so Sunday, not
  Sun), we also specify that we want the day and the
  year to be numeric—which are standard anyway, and then
  we also indicate that we want the month to be long, meaning
  we want it spelled out fully as in, for example March instead
  of Mar.




## Working with Time Zones

### Understanding UTC
  UTC (Coordinated Universal Time) is the primary time standard used worldwide to keep clocks and time zones synchronized. It is not affected by daylight savings time or local time zones.
  When you create a Date object in JavaScript using new Date(), it automatically adjusts the date and time to match your computer’s local time zone. But sometimes, especially in international applications, you need a consistent, universal reference for time that does not change based on the user's location. That’s where UTC comes in. Let us look at an example.

	let now = new Date();

	console.log(
		"Local Time:", now.getFullYear(), now.getHours()
	);
 
	console.log("UTC Time:", now.getUTCFullYear(), 	
		now.getUTCHours()
	);

What happens here is that getFullYear() and getHours() return values in your local time zone while getUTCFullYear() and getUTCHours() return values in Coordinated Universal Time (UTC).
  So, for example, if you're in New York (UTC-4) and your local time is 10:00 AM, then now.getHours() will produce 10, while 
now.getUTCHours() will produce 14 (14:00). This is because UTC is 4 hours ahead of New York time.
  This may seem confusing at first. On international apps, it is still important for the application to display dates based on specific user times, depending on where in the world they are located. Let’s use Facebook as a case study. When a user makes a post, all their friends (contacts) around the world still need to see what time the post was made relative to their local times, which will vary for the different contacts depending on where they are. So if UTC means that all users worldwide will have the same time, that surely cannot be right, because it’s not practical. Yes it is definitely not practical, and users should indeed be shown the time that matches their local time zones. However, on computer servers behind the scenes, if everyone stored and processed dates in different time zones, it would create inconsistencies across different users and systems. For example, imagine that a user Alice in New York (UTC-4) makes a post at 10:00 AM her time. At the exact same moment, Bob in London (UTC+0) sees it on his feed.
If Facebook only stored local times exactly as it is in their databases, then it would save Alice’s post time as 10:00 AM in their database, and the problem is that all users all over the world will see 10:00 am which will be wrong. That wouldn’t make sense to Bob, because 10:00 AM New York time would have been 2:00 PM in London. This tells you that some conversion is needed when it comes to times. There needs to be a mechanism that saves data with some type of reference that will  let the system know what the local time is for Alice in New York, and be able to work out and display the right local date and time to any user, anywhere on the globe, based on the local time where the post was made. 
  This is where UTC comes in. UTC solves this problem by acting as a universal reference point. Think of UTC as the one true time that the servers agree on, with every user’s local time being that same moment dressed up for where they happen to be. Facebook (or any global platform) in code by convention would store all timestamps in UTC, then convert them when displaying times to each user. So, for our example above, Facebook would store the timestamp of Alice’s post in UTC: 2025-03-20 14:00 UTC. When Bob views the post in London (UTC+0), it will display 2:00 PM. When Alice views it in New York (UTC-4), it displays 10:00 AM. When Charlie in Tokyo (UTC+9) sees the same post, it will show 11:00 PM. This way, the same timestamp (UTC) is correctly adjusted for every user.

![Figure 14.1 — One moment in time, three clocks](images/ch14-fig-01-one-instant-three-clocks.svg)

- Figure 14.1 — One moment in time, three clocks*

  Let’s talk about some cases where UTC is useful. When it comes to timestamps and databases, UTC ensures that time records are consistent and don't get mixed up by daylight saving or different time zones. This is particularly useful for global applications that need to store user actions (posts, messages, payments, etc.). This is why most database systems like PostgreSQL and MySQL etc all store timestamps in UTC by default when using the TIMESTAMP or DATETIME data types. This is done to ensure consistency across different time zones.
When you insert a timestamp without specifying a time zone, the database usually assumes it's in UTC. If you store a timestamp with a time zone (e.g., TIMESTAMPTZ in PostgreSQL), the database converts it to UTC internally but can return it in the local time zone when queried. When querying that data from such backend database systems, applications (like a JavaScript frontend eg via APIs) can convert the UTC timestamps to the user's local time zone for display. Why do databases use UTC? Here are some key reasons:
  - Consistency—a globally standardised time avoids
  confusion when multiple users across different time
  zones access the same data.
  - Avoids daylight saving issues—since UTC does not
  change with daylight saving time, it prevents errors in
  time calculations.
  - Easier calculations—time differences are easier to
  compute without worrying about time zone offsets.
  Another system where timezone conversion occurs is with airline tickets. When booking a flight from New York to London, for example, the airline must show your departure time to you in New York time and your arrival time in London time, otherwise it will not make sense. Behind the scenes however, what the airline’s system is actually doing is storing everything in UTC and converting it for every passenger.
  During debugging and logging of computer system faults, using the right date and time is crucial too. If an application logs errors or user activity, UTC ensures all events are in the same reference frame, making debugging easier.
  Live events like sports and webinars with participants from different time zones taking part need to get the timing right too. A global live event (e.g., FIFA World Cup) must be scheduled in UTC.
  


### Handling UTC in JavaScript
  When we use the Date object in JavaScript, the date is displayed to us in the user’s own time zone, but it can be read back in UTC whenever we need it, using methods like getUTCFullYear(). So, when you create a Date object in JavaScript like this:

	let now = new Date();
	console.log(now); 

It automatically shows you the date and time in the user's local time zone.
But if you need to read that same moment as UTC, you can use methods like:

	now.getUTCFullYear();   // UTC year
	now.getUTCMonth();      // UTC month (0-based, Jan = 0)
	now.getUTCDate();       // UTC day of the month
	now.getUTCHours();      // UTC hours
	now.getUTCMinutes();    // UTC minutes
	now.getUTCSeconds();    // UTC seconds

These methods return the same moment in time but adjusted to UTC instead of the user's local time.





### Converting local time to UTC
  Here is the thing that catches almost everybody out when they first meet
the Date object: there is nothing to convert.
  A Date does not store a local time. Inside itself it holds a single
number—the count of milliseconds since January 1, 1970 UTC, which we met at
the start of this chapter. That number is exactly the same number whether
the computer running your code is in New York, London or Tokyo. What
changes from one country to the next is not the date, but how it is
displayed.
  So the moment you write this:

	let localTime = new Date();

you already have a UTC time. You do not convert it to UTC—you just ask it to
show itself as UTC whenever you want that:

	let localTime = new Date();

	// one instant, printed two different ways
	console.log("Local Time:", localTime.toString());
	console.log("UTC Time:", localTime.toUTCString());

The output for a user in New York (UTC-4) will look like this:

Local Time: Thu Mar 20 2025 12:00:00 GMT-0400 (Eastern
  Daylight Time)
UTC Time: Thu, 20 Mar 2025 16:00:00 GMT

Notice how UTC is 4 hours ahead of New York time. But notice something more
important than that: we only called new Date() once. There is a single
moment in time here, and we printed it twice.
  Reading individual pieces off the date works the same way. That is what
the getUTC... methods under the ‘Handling UTC in JavaScript’ heading above
are for:

	let now = new Date();

	now.getHours();      // 12 - the hour where the user is
	now.getUTCHours();   // 16 - the same instant, read as UTC

One date. Two ways of reading it. No conversion anywhere.


#### A trap worth knowing about
  Sooner or later you will run into code that tries to convert to UTC like
this. It looks perfectly sensible, and it is wrong:

	// this does NOT do what it appears to do
	let utcTime = new Date(
		Date.UTC(
			localTime.getFullYear(),
			localTime.getMonth(),
			localTime.getDate(),
			localTime.getHours(),
			localTime.getMinutes(),
			localTime.getSeconds()
		)
	);

  Read slowly through what that actually does. getHours() hands you the hour
on the user’s own clock—12, for somebody in New York at midday. Date.UTC()
then takes that 12 and treats it as though it had been 12 o’clock in UTC all
along. What comes back is not your moment converted. It is a different
moment altogether, four hours earlier than the one you started with.
  Print it and you get:

  Thu, 20 Mar 2025 12:00:00 GMT

not the 16:00 you were expecting. The numbers on the clock face were copied
across, and the time zone they belonged to was quietly thrown away.


#### What Date.UTC() is actually for
  Date.UTC() does have a real job. It is simply not converting. Its job is
the opposite direction—building a date out of components that you already
know are in UTC.
  Compare these two lines:

	// "the 20th of March 2025 at
	// 16:00, wherever this code runs"
	let a = new Date(2025, 2, 20, 16, 0, 0);

	// "the 20th of March 2025 at 16:00 UTC, everywhere"
	let b = new Date(Date.UTC(2025, 2, 20, 16, 0, 0));

  The first one depends on where it runs. Run it in New York and it means
20:00 UTC. Run the very same line in Tokyo and it means 07:00 UTC—a
different moment entirely, from identical code. The second one means one
single moment everywhere on earth, no matter where it runs.
  What Date.UTC() gives you is the milliseconds for those components read as
UTC, and handing that number to new Date() turns it back into a Date object.
  This is exactly what you want when a date arrives from somewhere that has
already told you it is in UTC—a database record, or a response from an
API—and you need to rebuild a Date from its parts.
  The rule to hold on to is this: a Date is a moment, and a moment is always
stored in UTC. Local time is a way of displaying that moment, not a
different kind of value.




### Convert UTC to local time
  Let's say we have a UTC timestamp and need to show it in the user's local time:

	// UTC time
	let utcDate = new Date("2025-03-20T16:00:00Z");

	console.log("UTC Time:", utcDate.toUTCString());

	// converts to the user’s local time
	console.log("Local Time:", utcDate.toString());

Here is the output for a user, who is for example, in New York (UTC-4):

  UTC Time: Thu, 20 Mar 2025 16:00:00 GMT

Local Time: Thu Mar 20 2025 12:00:00 GMT-0400 (Eastern
  Daylight Time)

So basically, to convert a UTC time to local time we just need to call the .toString() method on the Date object. JavaScript automatically adjusts the time to match the user's system time zone.








## Working with Timers: setTimeout() and setInterval()
  When working with time in JavaScript, it's not just about getting the current time or formatting a date—sometimes you want to run actions after a specific time delay, or repeatedly at timed intervals. That's exactly what setTimeout() and setInterval() allow you to do.




### setTimeout()
This function lets you run code once after a specified delay (in milliseconds). Think of it like saying: "Do this, but wait a little bit first."

	// Waits 2 seconds (2000 milliseconds)
	// and runs this code once
	setTimeout(() => {
  		console.log("Hello after 2 seconds");
	}, 2000);

Such functionality would be useful for the following:

  - Showing a splash screen and then hiding it after a few seconds
  - Delaying a tooltip
  - Performing cleanup tasks after an action
  - Staggering animations






### setInterval()
  This one keeps repeating the action after each time interval—until you tell it to stop. Basically, it will run code repeatedly at intervals of the time period in milliseconds, as specified by the second parameter. Here is its syntax:

	setInterval(callback, ms); 

	// Logs "Ping!" every second
	const intervalId = setInterval(() => {
  			console.log("Ping!");
	}, 1000);

You can program it to stop the cycle by using clearInterval(intervalId).
Here are some scenarios where such a helper function will be useful:

  - Clocks or countdown timers
  - Polling a server every few seconds
  - Repeated animations (like a blinking element, or bouncy ball)
  - Updating the UI on a regular schedule


#### Real-life setInterval use case for Dates
  Let’s say you want to build a live digital clock. This is a perfect job for setInterval().

	<p id="clock"></p>

	<script>
  		function updateClock() {
    			const now = new Date();
    			const time = now.toLocaleTimeString();
    			document.getElementById("clock").textContent = time;
 		 }

  		// Call immediately to avoid delay
  		updateClock();

  		// Update every second
  		setInterval(updateClock, 1000);
	</script>

This updates the clock on your webpage every second, giving your users a real-time view of the current time.




### Stopping a timer
  Both setTimeout() and setInterval() return an ID that you can use to cancel them:

	const timeoutId = setTimeout(() => {
  		console.log("This will NOT show");
	}, 5000);

	// cancels the above timeout
	clearTimeout(timeoutId); 


	const intervalId = setInterval(() => {
  		console.log("Still running...");
	}, 1000);

	
	setTimeout(() => {
		// stops the repeated action after 5 seconds
  		clearInterval(intervalId); 
	}, 5000);


Both setTimeout() and setInterval() use time in milliseconds (not seconds), so:
    * 1000 ms = 1 second
    * 5000 ms = 5 seconds
    * 60000 ms = 1 minute




### Performing animations with the timer functions
  In the introduction to the timers—setTimeout() and setInterval()—I mentioned that they are very useful for creating animations and repeated actions that are time-based. Whether you want to code a quick image slideshow to impress your family and friends, or build the next Pacman game, these two functions have got what you need. As always, I have to let you see that in action with some simple, but practical examples.
		

#### Make a ball move across the screen
  We are going to create a circle on screen which will be nothing other than a div that we will style to appear as a circle. Next, with JavaScript, we will use X and Y position coordinates—which you always have to deal with whenever you want to deal with objects moving on the screen—to make the ball start from the left edge of the screen and move towards the right edge. Once the ball arrives at the right edge of the screen, it will start moving in the opposite direction back towards the left of the screen. When it hits the left edge, it will switch direction again and keep repeating that cycle.
  What makes the ball move is simply the value of the left property of the ball’s (div) style that we will keep increasing at intervals in JavaScript. The left style property of an element is essentially the distance the element sits from the left edge of whatever contains it — for our ball, which is positioned absolutely, that is the browser window itself. By increasing that value, the element will keep moving towards the right of the screen. The right property of the style of an element is the direct opposite of that. JavaScript is also used to detect when the object hits the edge of your browser window, so we can make it switch direction.


#### CSS code
Here is the code to style the ball

	#ball {
    		width: 50px;
    		height: 50px;
    		background-color: red;
    		border-radius: 50%;
    		position: absolute;
    		top: 100px;
    		left: 0;
  	}


#### HTML code
Create the div element that will be the ball

	<div id="ball"></div>

#### JavaScript code

	const ball = document.getElementById("ball");
  	let position = 0; // starting left position
  	let direction = 1; // 1 means right, -1 means left
  	const speed = 5; // pixels per frame

  	const intervalId = setInterval(() => {
    		position += speed * direction;
    		ball.style.left = position + "px";

    		// detect edges
    		if (
			position + ball.offsetWidth >= window.innerWidth || 
			position <= 0
		) 
		{
			// reverse direction
      			direction *= -1; 
    		}

		// run every 20 milliseconds (~50 frames per second)
  	}, 20); 

Let me explain this code. The magic really happens here:

	if (
			position + ball.offsetWidth >= window.innerWidth || 
			position <= 0
		) 
		{
			// reverse direction
      			direction *= -1; 
    		}

This is because it checks whether the ball has reached the edge of the screen, and if it has, it makes the ball turn around (move in the opposite direction). This is a conditional statement that does two checks. Let me start by describing what all the parameters and variables are meant to do. 
  Firstly, the ‘position’ variable is used to set the current horizontal position (in pixels) of the ball from the left side of the browser window. We use 0 because we want it to start from the left edge of the window.

‘ball.offsetWidth’ gives the width of the ball, including borders. We need this because the ball takes up space — we don’t want its right edge to go past the right edge of the screen.

‘window.innerWidth’ is the width of the visible part of the browser window (the viewport).

Two conditions are as follows:

	position + ball.offsetWidth >= window.innerWidth

This checks if the right edge of the ball has reached (or passed) the right edge of the screen. 

If position = 750, and ball.offsetWidth = 50, then
750 + 50 = 800 — and if the window is also 800px
wide, the ball is touching the right edge.

The second condition is:

	position <= 0

This checks if the left edge of the ball has reached (or passed) the left edge of the screen. This happens when position is 0 or less — meaning the ball is fully against the left wall.

If this returns true, then we reverse the direction:

	direction *= -1;

Which is short for:

	direction = direction * -1;

So if direction was 1 (moving right), now it becomes -1 (move left).
If it was -1, now it becomes 1. 

The movement is then done in multiples of the speed (pixels per frame), which is 5.

	position += speed * direction;
    	ball.style.left = position + "px";

Ultimately, the movement happens because we are increasingly setting the ball.style.left value. That on its own will keep an object moving, because each time we do it, the value is applied as an increment to its current position which will be changing each time we increment it. The repetition is made possible because that code is wrapped inside a setInterval() function:

	const intervalId = setInterval(() => {
    		position += speed * direction;
    		ball.style.left = position + "px";
		// ...
	}, 20);





#### Create a slideshow of images
  This will use setInterval at intervals of 3 seconds (3000 milliseconds) to cycle through a collection of images that you have listed in an array, and also have the images locally in a folder ‘/images’.

#### HTML code
Create the `<img>` tag in your HTML code. Notice I have given it a width and height of 500 by 300, and that is relative to the images I have. Tip: to make it work nicely, make all the images have the same dimensions, so the slideshow will flow seamlessly.

	<img id="slideshow" src="" width="500" height="300" />

#### JavaScript code

```
const images = [
  "/images/blurred-image.png",
  "/images/brightened-image.png",
  "/images/contrasted-image.png",
  "/images/grayscale-image.png",
  "/images/resized-image.png",
];
```
  
  	// start at the first image
  	let index = 0; 
  	const imgElement = document.getElementById("slideshow");
  
  	// Set the first image
  	imgElement.src = images[index];
  
  	// Change image every 3 seconds (3000 milliseconds)
  	setInterval(() => {
    		// move to next image
    		index++; 
  
    		// if we've reached the end,
    		// start again at the beginning
    		if (index >= images.length) {
      			index = 0;
    		}
  
    		// update image
    		imgElement.src = images[index]; 
  	}, 3000);

This piece of code is pretty simple, but there are four key parts to it. They are as follows:

- We need to start by setting the src attribute of the image element to the first image in the array (the element at index 0):

		imgElement.src = images[index];

  This is why we had to initialise the value of index to 0.

* In the setInterval() function, you need to increment the value by 1. That is how a different image will be displayed each time from a different index of the array.

		index++; 

- If you update the index value, then you have to update the src reference of that index in the image element

		imgElement.src = images[index];

- Finally, you must perform some kind of check to make sure that if the cycling through the images has come to the last image in the array, then it should restart from index 0. This is why we reset the value of index to 0 within this conditional that ascertains that the current index is either greater than or equal to the number of items in the images array.

		if (index >= images.length) {
      			index = 0;
    		}

In these animation examples, you have learned the following:
  - Arrays and indexes
  - DOM manipulation using .src
  - Time-based actions with setInterval()
  - Cycling (looping back to start)





## A datepicker library in vanilla JS & Bootstrap
- Use this awesome JS library:
  https://mymth.github.io/vanillajs-datepicker

- You can do all sorts eg inline date pickers, date ranges etc. It's about copying and pasting the CDN links into your code in the JavaScript sections of your HTML page, then pasting in the JavaScript code that calls the datepicker class. For a date range, I did something like this:

  ```
  <input type="date" id="dateField" name="dateFields" />
  ```

  	const elem = document.getElementById("dateField");

  ```
  const rangePicker = new DateRangePicker(
          elem, 
          {
              format: "dd-mm-yyyy"
          }
      );
  ```