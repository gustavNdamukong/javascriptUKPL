

//————————————————————//
	CHAPTER 19 - IMAGES
//————————————————————//

	-JavaScript and images
	-What JavaScript can do with images
	-Image manipulation
		-Image preview before upload
		-Add a grayscale filter Effect to an image
		-Toggle a grayscale filter Effect on an image (on/off)
		-Permanently grayscale an image using Canvas
		-Resizing an image using Canvas
		-Rotate an image in 2d
			-Add feature to download the rotated image
		-Adding image filters
			-Increase the brightness of an image
			-Adding contrast to an image
			-Add a blur filter
			-Bonus tip - Combining filters





JavaScript and images
—————————————
  
  JavaScript can be used to handle images — and it’s actually quite versatile in that area. It’s capable of managing many image-related tasks, especially when combined with browser features or server-side tools. That said, how you use it depends on what you're building.
For small web projects and learning vanilla JavaScript, you’ll mostly use it to change images on a webpage or handle basic uploads. But if you go deeper into building real-world apps — like photo editors, e-commerce platforms, or social networks — JavaScript has the tools to do even more.
You’ve already learned how to preview images using the DOM, load files with the FileReader API, and respond to file input events in earlier chapters. But what if we want to go beyond simply displaying images?
What if we want to edit them — crop, apply filters, draw over them, or change their content in more advanced ways? That’s where the power of the HTML5 <canvas> element comes in.
You were introduced to <canvas> in the DOM Manipulation chapter, where we used it for drawing shapes and making interactive graphics. In this chapter, we’ll take it further and explore how the canvas can act as a powerful tool for image processing.
The canvas allows us to:

    * Draw images onto it using drawImage()
    * Access and manipulate pixel data with getImageData() and putImageData()
    * Apply transformations, filters, overlays, and more

In short, while the DOM and FileReader can help load and preview images, it’s the canvas that enables us to edit and process them directly in the browser.


	What JavaScript can do with images
	———————————————————————
On the frontend (in the browser), you can use JavaScript to:
* Preview uploaded images before sending them to a server
* Resize or crop images using the <canvas> element
* Switch images dynamically (e.g., for image sliders or galleries)
* Apply filters or effects (like converting to black-and-white)
* Delete images from the webpage view (e.g., in a gallery)
On the backend (e.g., using Node.js), JavaScript can also:
* Upload images to a server or cloud storage
* Resize or compress images automatically (with libraries like Sharp)
* Rename or delete image files from disk
* Convert image formats (e.g., PNG to JPEG)
For backend image handling, you’ll need to explore the documentation of the backend platform you're using — such as Node.js, Express, or cloud services like AWS S3.


What you’ll learn in this chapter is all practical-based. 
I will go ahead and give you practical, real-world image handling examples using vanilla JavaScript. All the examples run entirely in the browser — no backend required. You’ll even build a basic image editor that uses the canvas to transform images right on the page. Let’s dive straight in.



Image manipulation
———————————
	Image preview before upload
	————————————————

	Add this code to your HTML file (eg index.html)

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>My JavaScript Project</title>
		</head>
		<body>

  			<h1>The JavaScript Blueprint</h1>

			<input type="file" id="imageInput" />
        		<img 
            			id="preview" 
            			src="" 
            			alt="Image preview will appear here" 
            			style="max-width: 300px; 
					display: block; margin-top: 10px;" />


  			<script src=“index.js"></script>
		</body>
		</html>

	Add this code to your JavaScript file (eg index.js) 

		const imageInput = document.getElementById('imageInput');
  		const preview = document.getElementById('preview');

  		imageInput.addEventListener('change', function () {
    			const file = this.files[0];
    	
			if (file) {
      				preview.src = URL.createObjectURL(file);
    			}
  		});

	In this code as you can see, there is an <img> tag in the HTML 
	code, which will be used to preview the image. There is also a file upload 	
	input field where you will upload a file that you select from your 
	computer. The uploaded file is then grabbed and dynamically inserted 
	into the image tag for you to preview it before submission.  This is a 
	simple but very practical example of a feature you can add to enhance 
	the user experience of your application.


	
	Add a grayscale filter Effect to an image
	————————————————————
  Make sure you have Ian images/ directory in the same folder in which this index.html file is, and have an image in it named ‘urban.jpg’. This is because the image is being used as the source (src attribute) of the image page in this index.html, and it is the image we are practicing how to add a grayscale filter on. 

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>My JavaScript Project</title>
		</head>
		<body>

  			<h1>The JavaScript Blueprint</h1>

			<img 
				id="myImage" 
				src="images/urban.jpg" style="width: 300px;" />
        		<br />

        		<button id="grayScaleBtn">Make Grayscale</button>



  			<script src=“index.js"></script>
		</body>
		</html>

	Add this code to your JavaScript file (eg index.js) 

		const btn = document.getElementById('grayScaleBtn');
		btn.addEventListener('click', applFilter);


  		function applyFilter() {
    			const img = document.getElementById('myImage');

			// give the image filter a grayscale effect
			img.style.filter = 'grayscale(100%)’;
		}




	Toggle a grayscale filter Effect on an image (on/off)
	—————————————————————————
  This effect is so cool, but we cannot reverse it. Let’s make it possible to add and reverse the grayscale effect on the image. Make sure you have Ian images/ directory in the same folder in which this index.html file is, and have an image in it named ‘urban.jpg’. This is because the image is being used as the source (src attribute) of the image page in this index.html, and it is the image we are practicing how to add a grayscale filter on. 
  Here is the code to make that happen:

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>My JavaScript Project</title>
		</head>
		<body>

  			<h1>The JavaScript Blueprint</h1>

			<img 
				id="myImage" 
				src="images/urban.jpg" style="width: 300px;" />
        		<br />

        		<button id="grayScaleBtn">Make Grayscale</button>



  			<script src=“index.js"></script>
		</body>
		</html>

	Add this code to your JavaScript file (eg index.js) 

		const btn = document.getElementById('grayScaleBtn');
		btn.addEventListener('click', toggleFilter);


  		function toggleFilter() {
    			const img = document.getElementById('myImage');
    			
			/* This will still work, but let's use a ternary operator which is 
			    cleaner
    				if (img.style.filter == 'grayscale(100%)')
    				{
       					img.style.filter = 'grayscale(0%)'
    				} else {
        				img.style.filter = 'grayscale(100%)'
    				} 
    
    			*/
    
			img.style.filter = img.style.filter == 'grayscale(100%)' ? 
				'grayscale(0%)' : 'grayscale(100%)';

		}

	Notice the modifications of the previous code:
		-Now when the ‘Make Grayscale’ button is clicked, we check the 
		   previous value of the img.style.filter, and if it was 
		   'grayscale(100%)’, we update to 'grayscale(0%)' (it will work the 
		   same if we updated it to ‘img.style.filter = 'none’;), else we update 
		   it to 'grayscale(100%)’.
		-We renamed the function from applyFilter() to toggleFilter() so it 
		   reflects what it is really does now-which is to turn the grayscale 
		   filter on the image on or off.
		-Notice also how, though using an if statement inside index.js will still
		   work just the same, using a ternary operator to do the logic makes 
		   for less and cleaner (readable) code.
This exercise is a great example, for interactive photo editors or learning about CSS filters through JavaScript.



	Permanently grayscale an image using Canvas
	———————————————————————
  The grayscale effect using CSS filters (like in the previous example) only affects how the image looks in the browser. It doesn’t actually modify the image data itself. So, that effect isn’t permanent and can’t be saved as-is.
However, as I mentioned above; It is a great example for interactive photo editors or learning about CSS filters through JavaScript.
But If you want to make the grayscale change, or any change to an image file permanent so that the user can download or upload the edited image-you have to use the <canvas> element. This is because, the canvas API’s context which is the thing the image is built on, and all the changes you make on it are saved, makes the changes persist. You just have to then make the image downloadable as a new image file. Always remember that because of JavaScript’s restriction on local files, what essentially happens is this; you read an (original) image, re-create it as a new image on the canvas, then download the new image as a new, separate file. The original file remains unmodified. Back to our greyscale example, here is what the <canvas> element will do:

	-Draw the image to the canvas,
	-Apply grayscale pixel by pixel,
	-Export the result as a new image (base64 or blob),
	-Let the user download or upload it.

Your index.html code, should look like this:

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>My JavaScript Project</title>
		</head>
		<body>

  			<h1>The JavaScript Blueprint</h1>

			<input type="file" id="upload" />

			<a id="downloadLink" 
				style="display: none; margin-top: 10px;">Download Image
			</a>

        		<canvas id="canvas" 
				style="display: block; margin-top: 10px;"></canvas>

  			<script src=“index.js"></script>
		</body>
		</html>


Add the following code to your JavaScript file (eg index.js) 

	const upload = document.getElementById('upload');
  	const canvas = document.getElementById('canvas');
  	const ctx = canvas.getContext('2d');
 	 const downloadLink = document.getElementById('downloadLink');

  	upload.addEventListener('change', function () {
    		const file = this.files[0];
    		const reader = new FileReader();

    		reader.onload = function (event) {
      			const img = new Image();
      			img.onload = function () {
        			canvas.width = img.width;
        			canvas.height = img.height;
        			ctx.drawImage(img, 0, 0);

        			// Apply grayscale pixel by pixel
        			const imageData = ctx.getImageData(
					0, 0, canvas.width, canvas.height
				);
        
				const data = imageData.data;

        			for (let i = 0; i < data.length; i += 4) {
          				const r = data[i];
          				const g = data[i + 1];
          				const b = data[i + 2];
          				const avg = (r + g + b) / 3;

					// Set all to avg for gray
          				data[i] = data[i + 1] = data[i + 2] = avg; 
        			}

        			ctx.putImageData(imageData, 0, 0);

        			// Make it downloadable
        			const finalImage = canvas.toDataURL('image/png');
        			downloadLink.href = finalImage;
        			downloadLink.download = 'grayscale-image.png';
        			downloadLink.textContent = 'Download Grayscale Image';
        			downloadLink.style.display = 'inline-block';
      			   };

      			   img.src = event.target.result;
    		      };

    		      reader.readAsDataURL(file);
  	     });

This is a very cool feature which can be used in a simple photo editing app so that a user can change an image to grey, and then save it on their computer, and, or upload it to a server.





	Resizing an image using Canvas
	——————————————————
  This will let you shrink an image in the browser before uploading or displaying it. Let’s add some styling to make the web page look nice and professional. Create a CSS file eg index.css in the same folder as your index.html file. Place this code in it:

body {
    font-family: Arial, sans-serif;
    padding: 30px;
    max-width: 600px;
    margin: auto;
    background: #f9f9f9;
    color: #333;
}

h1 {
    margin-top: 40px;
    color: blue;
}

#openWindowBtn {
    background-color: cornflowerblue;
}


input[type="file"] {
    display: block;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

#scale {
    width: 100%;
    margin-top: 5px;
}

canvas {
    display: block;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    max-width: 100%;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007acc;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #005fa3;
}

#scaleValue {
    font-weight: normal;
    color: #007acc;
}



Your index.html code, should look like this:

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>My JavaScript Project</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>

  			<h1>The JavaScript Blueprint</h1>

			<input type="file" id="upload" accept="image/*" />
        		<br /><br />

        		<button id="download">Download Resized Image</button>
       			<br /><br />

        		<label for="scale">Resize (%): 
				<span id="scaleValue">100</span>%</label>
        		<input type="range" id="scale" min="0.1" max="2" step="0.1" 					value="1">

        		<br /><br />

        		<canvas id="canvas"></canvas>


  			<script type="module" src="index.js" defer></script>
		</body>
		</html>



Add the following code to your JavaScript file (eg index.js). Note all the comments between the lines to explain everything the code does:

	// First, grab references to important HTML elements by their ID
	// File input
	const upload = document.getElementById('upload'); 

	// Canvas to display image
	const canvas = document.getElementById('canvas'); 

	// Get the drawing context from canvas
	const ctx = canvas.getContext('2d'); 

	// Slider for resizing
	const scaleInput = document.getElementById('scale'); 

	// Download button
	const downloadBtn = document.getElementById('download'); 

	// Where we show the scale value (like "1.0")
	const scaleValue = document.getElementById('scaleValue'); 

	// We'll store the image here once it's loaded
	let img = new Image();

	// When the user selects an image file...
	upload.addEventListener('change', function () {

    		// Get the selected/uploaded file. Store it in a variable 'file'
    		const file = this.files[0]; 

    		// Create a FileReader to read the file
    		const reader = new FileReader(); 

    		// When the file has been read...
    		reader.onload = function (event) {
        
			// Create an empty image object
       			img = new Image(); 

        		// When the (empty) image has finished loading (is fully loaded 	
			// into memory) only then do we draw it to the canvas
        		img.onload = function () {
            			// Draw it (the empty image) at the current slider scale
            			drawImageAtScale(scaleInput.value); 
        		}; 

        		// Set image source to the file data (as base64)
        		// this is the magic-where the uploaded file (stored in 'file') 
        		//  is made to replace the new drawn empty image   
        		img.src = event.target.result; 
    		};

    		// Start reading the image file as a data URL
    		// We do not assign file to img because the Image() object doesn't 
		// accept a file directly. Instead, you read the file as a base64 URL, 
		// then assign it to the src attribute of img (the newly drawn image 
		// object)
    		reader.readAsDataURL(file); 
    		downloadBtn.style.display = 'inline-block'; 
	});

	// This function draws the image on the canvas, resized based on the 
	// slider
	function drawImageAtScale(scale) {
    		// Convert slider value (string) to a number so we can use that to 
		// calculate percentages
    		const scaleNum = parseFloat(scale); 

    		// Set canvas width based on scale
    		canvas.width = img.width * scaleNum; 

    		// Set canvas height based on scale
    		canvas.height = img.height * scaleNum; 

    		// Clear previous image
    		ctx.clearRect(0, 0, canvas.width, canvas.height); 

    		// Draw the image at new size
    		ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
	}

	// When the slider is moved...
	scaleInput.addEventListener('input', function () {
    		// Show the scale value next to the slider
    		scaleValue.textContent = this.value; 

   	 	// Redraw the image with the new scale
    		drawImageAtScale(this.value); 
	});

	// When the download button is clicked...
	downloadBtn.addEventListener('click', function () {
    		// Create a temporary link
   		const link = document.createElement('a'); 

    		// Set the filename for the download
    		link.download = 'resized-image.png'; 

    		// Convert canvas image to a downloadable URL
    		link.href = canvas.toDataURL(); 

    		// Trigger the download dynamically
    		link.click(); 
	});

  If it seems as if the code is complicated, do not be daunted by the length of it, it really isn’t hard. Here is some more explanation on how it all works:

    * You create a FileReader and tell it what to do when it's done reading the file. Here is the code, but it does not run straight away:

        	reader.onload = function (event) {
			// We'll do stuff after the file is read here
        	};

    *  You start the file-reading process:
        
			// Asynchronous operation
			reader.readAsDataURL(file); 

    *  JavaScript doesn't block or wait. It moves on and comes back later when the file is fully read.

    *  When it's finally read, the reader.onload function gets triggered with the result. Inside this same function:
        
            		reader.onload = function (event) {
                		...
            		}
        
        	is where you should then set: 
        
            		img.src = event.target.result;

    *   In summary; here are the steps:
        
        * reader.readAsDataURL(file) triggers the reading.
        * Only after the reading is done does reader.onload run.
        * Inside that callback, we assign that file value to img.src.

  The img.src = event.target.result; doesn't run immediately — it only runs after the FileReader has finished loading the file and fired the onload event.
The key in grasping this process lies in understanding that the event that is triggered when a file is uploaded has a result property which is the uploaded file itself. That is why when we listen in the code for that upload event like so:

	reader.onload = function (event) {
		…
	}

It is the event (file upload) object’s target.result that we assign to the src attribute of img. We are hereby pointing the src attribute of the newly drawn (created) image to the location of the uploaded image.
   
  Even though it looks like we are assigning the uploaded image to the src attribute of the new canvas image (img.src = …) before we have read the data from the uploaded image-by calling readAsDataURL(file), I want to assure you that the call to readAsDataURL(file) really happens first. Only after this call is done does the new image get its src attribute value. Here is where the trick is; JavaScript handles this whole process in a non-blocking (asynchronous) way using event listeners. This a common theme you'll see in many real-world JS apps. This is called asynchronous programming.
  In the HTML code, where we have the range (slider) input field. The value of that field’s step attribute controls how much we want to incrementally resize the image-like zooming in or out. Making its value 0.1 as we have done means that we will be able to use values like 0.5 or 1.5 so that the image is resized by a percentage (e.g., 50% smaller or 150% bigger).
If we had used big numbers like 100 or 200, the image would have become huge (100 times bigger!), which your browser might not be able to display, making it look like nothing happened. So we stick to small numbers between 0.1 and 2 for safe and smooth resizing.





		Rotate an image in 2d
		—————————————
  With the Canvas you can rotate an image, and it’s a nice thing to be able to do with your mages. We will look at a full working example with a button that allows you upload an image, and another button which rotates the image in increments of 45 degrees clockwise. When you are happy with the rotation, you can download the image as usual. The rotation done is in 2D. Canvas alone does not support real 3D transforms. It's strictly 2D.
To give you a tip; in CSS, you can simulate a 3D flip (rotation) effect on an image using the transition an transform properties (just visually, not on canvas). For real 3D rendering in JavaScript, you would need WebGL or a 3D library like Three.js. Let’s look at how to rotate an image in 2D with JavaScript.

HTML code
——————
		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>My JavaScript Project</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>

  			<h1>The JavaScript Blueprint</h1>

			<input type="file" id="upload">
        		<button id="rotateBtn">Rotate Image</button>
        		<button id="downloadImgBtn">Download Image</button>
        		<canvas id="canvas"></canvas> 


  			<script type="module" src="index.js" defer></script>
		</body>
		</html>


index.js code
————————

const upload = document.getElementById('upload');
const rotateBtn = document.getElementById('rotateBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadImgBtn');

let img = new Image();
let rotation = 0; // Keep track of rotation in degrees

// When an image is uploaded
upload.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    img = new Image();
    img.onload = function () {
      rotation = 0; // Reset rotation
      drawRotatedImage();
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// When the rotate button is clicked
rotateBtn.addEventListener('click', function () {
  rotation = (rotation + 90) % 360; // Rotate by 90 degrees each time
  drawRotatedImage();
});

// Function to draw the image at the current rotation
function drawRotatedImage() {
  const angleInRadians = rotation * Math.PI / 180;

  // Adjust canvas size based on rotation (to fit image properly)
  if (rotation % 180 === 0) {
    canvas.width = img.width;
    canvas.height = img.height;
  } else {
    canvas.width = img.height;
    canvas.height = img.width;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  // Move the canvas "zero point" to the center
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Rotate the canvas
  ctx.rotate(angleInRadians);

  // Draw the image from the new origin, with image centered
  ctx.drawImage(img, -img.width / 2, -img.height / 2);

  ctx.restore(); // Go back to normal canvas settings
}


Use the same CSS code as all the other examples-in a file in the same directory as this index.js and index.html.
Here are important points to understand about the working of the above code:
    * ctx.translate() moves the canvas "zero point" to the center so we can rotate around the middle.
    * ctx.rotate() expects radians, not degrees, so we use degrees * Math.PI / 180.
    * We reverse the translate/rotate with ctx.restore() so future drawings are not affected.

  By default, the canvas starts drawing from the top-left corner (0, 0). So if you rotate from there, the image will spin off the canvas or get cut off.

What does ctx.translate(canvas.width / 2, canvas.height / 2) mean?
You're moving the canvas's drawing center to the middle — like saying:
“Hey canvas, pretend the center of this image is now the (0, 0) point.”
That way, when you rotate, the image spins around its own center, not from the corner.
  What does ctx.drawImage(img, -img.width / 2, -img.height / 2) mean?
This draws the image starting halfway left and halfway up from the center.
If you didn’t do this, the image would rotate but still be drawn from the top-left — which would cause it to appear off-center or clipped.
So in human terms:
	“First move to the center of the canvas. Then, rotate. Then place the 
	image so that its own center lines up with the canvas center.”

This is a very common pattern when rotating things in canvas:
		translate → rotate → draw → restore.



Add feature to download the rotated image
——————————————————————
  You are able to download your rotated image easily just like we did with the example of the resized images because it was done on the canvas.
Adding the ability to download the resized image will give you a nice feature which you can build and share with your family and friends to use. Achieving this is as simple as adding the following two pieces of code-a download button in your HTML code, and some code in your JavaScript file to listen for a click event on that download button, and download the already created image from the canvas. Here is the code:

	html (eg index.html)
	———————————
	
	<button id="downloadImgBtn">Download Image</button>


	JavaScript (eg index.js)
	———————————
Add this code to the already existing code above for rotating an image:

	const downloadBtn = document.getElementById('downloadImgBtn');

	…

	downloadBtn.addEventListener('click', function () {
    		// Create a temporary link
   		const link = document.createElement('a'); 

    		// Set the filename for the download
    		link.download = 'rotated-image.png'; 

    		// Convert canvas image to a downloadable URL
    		link.href = canvas.toDataURL(); 

    		// Trigger the download dynamically
    		link.click(); 
	});

From the previous example, it should be clear to you how that download code works. If not just refer back to the explanations in the previous examples. 




————————————-
Adding image filters
————————————
 Adding filters to images using the canvas is quite straight forward. You just have to add the relevant filter by calling its method and assigning its result to the context of the image canvas. Available filter methods are brightness(), contrast(), blur(). Without further ado, let’s see them in action.

	Increase the brightness of an image
	—————————————————————
  As usual, we will now look at code that allows you to upload an image of your choice, adjust its brightness using a range slider, then download the desired result to your computer. 
  To brighten an image, we just need to add the brightness filter to the canvas context. Let’s dive right into the code:

	HTML (eg index.html)
	————————————
	<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>The JavaScript Blueprint</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>

  			<h1>Brighten your image</h1>

			<input type="file" id="upload" accept="image/*" />
        		<br /><br />

        		<button id="downloadImgBtn">Download Image</button>

			<input type="range" id="brightness" min="0" max="2" 	
				step="0.1" value="1">
        
			<canvas id="canvas"></canvas>




  			<script type="module" src="index.js" defer></script>
		</body>
		</html>



	JavaScript code (eg index.js)
	————————————————
	const brightnessSlider = document.getElementById('brightness');
	const downloadBtn = document.getElementById('downloadImgBtn');
	const upload = document.getElementById('upload'); 
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	let img = new Image();


	upload.addEventListener('change', function () {
    		const file = this.files[0]; 

    		// Create a FileReader to read the file
    		const reader = new FileReader(); 

    		// When the file has been read...
    		reader.onload = function (event) {

        		// Create an empty image object
        		img = new Image(); 

        		img.onload = function () {
            			canvas.width = img.width;
            			canvas.height = img.height;
            			draw();
        		};

        		//img.src = 'your-image.jpg'; // Or load from file input
        		img.src = event.target.result; 
    		}
    		reader.readAsDataURL(file); 
	});

	brightnessSlider.addEventListener('input', draw);


	function draw() {
  		ctx.filter = `brightness(${brightnessSlider.value})`;
  		ctx.drawImage(img, 0, 0);
	}

	downloadBtn.addEventListener('click', function () {
    		// Create a temporary link
   		const link = document.createElement('a'); 

    		// Set the filename for the download
    		link.download = 'brightened-image.png'; 

    		// Convert canvas image to a downloadable URL
    		link.href = canvas.toDataURL(); 

    		// Trigger the download dynamically
    		link.click(); 
	});


  The line of code that does the magic is the line in the draw() function where we call the brightness() filter function and assign its result to the filter property of the canvas context (cox.filter). Here is the line:

	ctx.filter = `brightness(${brightnessSlider.value})`;

Understand that this works because the canvas context which we create at the beginning of every canvas job is the thing on which the dynamically created image is built. Changing the filter on the context therefore automatically makes the change on your image that is drawn on it.





		Adding contrast to an image
		————————————————
As with brightening up an image, let’s look an a code example that allows you to upload an image, adjust its brightness using a range slider, then download the desired result to your computer. 
  To add contrast to an image, we just need to add the contrast filter to the canvas context. Let’s take a look:

	
	HTML (eg index.html)
	————————————
		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>The JavaScript Blueprint</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>
  			<h1>Add contrast to your image</h1>

			<input type="file" id="upload" accept="image/*" />
        		<br /><br />

        		<button id="downloadImgBtn">Download Image</button>

			<input 
				type="range" 
				id="contrast" 
				min="0" max="3" step="0.1" value="1">

			<canvas id="canvas"></canvas>

  			<script type="module" src="index.js" defer></script>
		</body>
		</html>

  I would recommend you set up your slider input field with the following: min="0" max="3" step="0.1" value="1". A max range of 3 will give you more contrast room to play with. 



	JavaScript code (eg index.js)
	————————————————
	const contrastSlider = document.getElementById('contrast');
	const downloadBtn = document.getElementById('downloadImgBtn');
	const upload = document.getElementById('upload'); 
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	let img = new Image();


	upload.addEventListener('change', function () {
    		const file = this.files[0]; 

    		// Create a FileReader to read the file
    		const reader = new FileReader(); 

    		// When the file has been read...
    		reader.onload = function (event) {

        		// Create an empty image object
        		img = new Image(); 

        		img.onload = function () {
            			canvas.width = img.width;
            			canvas.height = img.height;
            			draw();
        		};

        		//img.src = 'your-image.jpg'; // Or load from file input
        		img.src = event.target.result; 
    		}
    		reader.readAsDataURL(file); 
	});

	contrastSlider.addEventListener('input', draw);


	function draw() {
  		ctx.filter = `contrast(${contrastSlider.value})`;
    		ctx.drawImage(img, 0, 0);

	}

	downloadBtn.addEventListener('click', function () {
    		// Create a temporary link
   		const link = document.createElement('a'); 

    		// Set the filename for the download
    		link.download = ‘contrasted-image.png'; 

    		// Convert canvas image to a downloadable URL
    		link.href = canvas.toDataURL(); 

    		// Trigger the download dynamically
    		link.click(); 
	});



		Add a blur filter
		————————————————
As with brightening or adding contrast to an image, the following code example will allow you to upload an image, adjust its blur level using a range slider, then download the desired result to your computer. 
  To add a blur filter to an image, add the blur filter to the canvas context. Here is how:


		HTML (eg index.html)
		—————————————

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>The JavaScript Blueprint</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>
  			<h1>Add blur to your image</h1>

			<input type="file" id="upload" accept="image/*" />
        		<br /><br />

        		<button id="downloadImgBtn">Download Image</button>

			<input 
				type="range" 
				id="blur" 
				min="0" max="10" step="1" value="0">


			<canvas id="canvas"></canvas>

  			<script type="module" src="index.js" defer></script>
		</body>
		</html>

  I would recommend you set up your slider input field with the following: min="0" max="10" step="1" value=“0”. The max of 10 gives you more room to fine-tune the blur filter effect.



	JavaScript code (eg index.js)
	————————————————
	const blurSlider = document.getElementById('blur');
	const downloadBtn = document.getElementById('downloadImgBtn');
	const upload = document.getElementById('upload'); 
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	let img = new Image();


	upload.addEventListener('change', function () {
    		const file = this.files[0]; 

    		// Create a FileReader to read the file
    		const reader = new FileReader(); 

    		// When the file has been read...
    		reader.onload = function (event) {

        		// Create an empty image object
        		img = new Image(); 

        		img.onload = function () {
            			canvas.width = img.width;
            			canvas.height = img.height;
            			draw();
        		};

        		//img.src = 'your-image.jpg'; // Or load from file input
        		img.src = event.target.result; 
    		}
    		reader.readAsDataURL(file); 
	});

	blurSlider.addEventListener('input', draw);


	function draw() {
  		ctx.filter = `blur(${blurSlider.value}px)`;
    		ctx.drawImage(img, 0, 0);

	}

	downloadBtn.addEventListener('click', function () {
    		// Create a temporary link
   		const link = document.createElement('a'); 

    		// Set the filename for the download
    		link.download = 'blurred-image.png';

    		// Convert canvas image to a downloadable URL
    		link.href = canvas.toDataURL(); 

    		// Trigger the download dynamically
    		link.click(); 
	});


Notice that the blur() filter function accepts its value in pixels, hence in the draw() function above, we append ‘px’ to the value we pass to blur() like so:

	ctx.filter = `blur(${blurSlider.value}px)`;





		Bonus tip - Combining filters
		————————————————
You can combine filters like this:

	ctx.filter = `brightness(1.2) contrast(1.5) blur(2px)`;
	ctx.drawImage(img, 0, 0);

This will apply all three filters at once!. Let’s just go ahead and create an application for that-editing an image using all three filters working together.
The following code is a working solution of all three filters. As always, the user can upload an image, and after the upload, the image is previewed in a canvas, with three sliders available below to apply all three filters; brightness, contrast and blur, separately to the same image and see all changes applied live. When they are happy with the result, they can hit on the Download Image button to save the edited file to their machine. Here is the code:


		CSS styling for the web page 
		————————————————

	body {
    		font-family: Arial, sans-serif;
    		padding: 20px;
    		background: #f2f2f2;
    		text-align: center;
	}

	#canvas {
    		margin-top: 20px;
    		border: 1px solid #ccc;
    		max-width: 100%;
	}

	.controls {
    		margin-top: 20px;
    		display: flex;
    		flex-direction: column;
    		gap: 15px;
    		max-width: 400px;
    		margin-inline: auto;
	}

	.control-group {
    		display: flex;
    		align-items: center;
    		justify-content: space-between;
	}

	label {
    		flex: 1;
    		text-align: left;
	}

	input[type="range"] {
    		flex: 2;
	}

	button {
    		margin-top: 20px;
    		padding: 10px 20px;
    		background-color: #007acc;
    		color: white;
   	 	border: none;
    		border-radius: 6px;
    		font-size: 16px;
    		cursor: pointer;
    		transition: background-color 0.3s ease;
	}

	button:hover {
    		background-color: #005fa3;
	}




		HTML (eg index.html)
		—————————————

		<!DOCTYPE html>
		<html lang="en">
		<head>
  			<meta charset="UTF-8">
  			<title>The JavaScript Blueprint</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>
  			<h1>Combined Filter Editor</h1>

        		<input type="file" id="upload" accept="image/*" />
        		<br /><br />

        		<button id="downloadImgBtn">Download Image</button> 
        
        		<canvas id="canvas"></canvas>

        		<div class="controls">
            			<div class="control-group">
                			<label for="brightness">Brightness</label>
                			<input type="range" id="brightness" min="0" 		
						max="200" 						
						value="100">
            			</div>

            			<div class="control-group">
                			<label for="contrast">Contrast</label>
                			<input type="range" id="contrast" min="0" 
						max="200" 						
						value="100">
            			</div>

            			<div class="control-group">
                			<label for="blur">Blur</label>
                			<input type="range" id="blur" min="0" max="10" 
						value="0" 					
						step="0.1">
            			</div>
        		</div>


  			<script type="module" src="index.js" defer></script>
		</body>
		</html>

 Note as usual, that the controls of the range slider input can be slightly different, depending on the filters.In this example, they are as follows: 
	-For brightness, min is 0, max is 200, value is 100
	-For contrast, min is 0, max is 200, and value is 100
	-For blur, the min is 0, max is 10, and value is 0.1



	JavaScript code (eg index.js)
	————————————————

	const downloadBtn = document.getElementById('downloadImgBtn');
	const upload = document.getElementById('upload');
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	const brightnessInput = document.getElementById('brightness');
	const contrastInput = document.getElementById('contrast');
	const blurInput = document.getElementById('blur');

	let img = new Image();


	// When an image is uploaded
	upload.addEventListener('change', function () {
    		const file = this.files[0];
    		const reader = new FileReader();

    		reader.onload = function (e) {
        		img = new Image();

        		img.onload = function () {
            			// Set canvas size
            			canvas.width = img.width;
            			canvas.height = img.height;

            			applyFilters(); // Initial draw
        		};

        		img.src = e.target.result;
    		};

    		reader.readAsDataURL(file);
	});

	// Attach filter sliders to re-draw function
	brightnessInput.addEventListener('input', applyFilters);
	contrastInput.addEventListener('input', applyFilters);
	blurInput.addEventListener('input', applyFilters);


	// Function to draw the image with current filter settings
	function applyFilters() {
    		const brightness = brightnessInput.value;
    		const contrast = contrastInput.value;
    		const blur = blurInput.value;

    		// Set the CSS filter style before drawing
    		ctx.filter = `
    		brightness(${brightness}%)
    		contrast(${contrast}%)
    		blur(${blur}px)
    		`;

    		// Clear and redraw image
    		ctx.clearRect(0, 0, canvas.width, canvas.height);
    		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	}

	downloadBtn.addEventListener('click', function () {
    		// Create a temporary link
   		const link = document.createElement('a'); 

    		// Set the filename for the download
    		link.download = 'blurred-image.png';

    		// Convert canvas image to a downloadable URL
    		link.href = canvas.toDataURL(); 

    		// Trigger the download dynamically
    		link.click(); 
	});


In all these image manipulation demos, you have learned so much, including the following:
    - [ ] How to use the <input type="range"> to create sliders
    - [ ] How to listen to slider events with .addEventListener('input', ...)
    - [ ] How to apply multiple filters at once using the ctx.filter property
    - [ ] How to work with <canvas> and FileReader
    - [ ] How to dynamically update image rendering based on user input

Do not worry much if you do not fully grasp the concepts explained in this image management chapter. Proceed with your learning of JavaScript in the other chapters, and it will click, and there will come a point when the dots begin to all connect. This is a promise. I was once that novice who did not have a clue. This book is not meant to be a one-time read anyway, but rather, a handy reference for whenever you want to refresh your mind on a topic. Even the most experienced programmers often have to look up references to refresh their knowledge. 
  If it encourages you, the canvas is so rich and fun that it needs a whole separate book of its own. But what I have shown you, most JavaScript books will not go into. But because this book is all about showing you the potential of JavaScript as a programming language, it felt only natural that I should talk about image management.