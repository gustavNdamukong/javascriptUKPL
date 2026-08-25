// First, grab references to important
	// HTML elements by their ID
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

    		// Get the selected/uploaded file.
    		// Store it in a variable 'file'
    		const file = this.files[0]; 

    		// Create a FileReader to read the file
    		const reader = new FileReader(); 

    		// When the file has been read...
    		reader.onload = function (event) {
        
			// Create an image object. It has no picture in it yet -
			// it is an empty frame waiting for a src
       			img = new Image(); 

        		// Setting src starts a download,
        		// which takes time, so we
        		// say in advance what should
        		// happen once it has finished.
        		// Nothing is drawn until this fires
        		img.onload = function () {
            			// By now the picture really
            			// is loaded, so draw it
            			drawImageAtScale(scaleInput.value); 
        		}; 

        		// Giving it a src is what sets
        		// everything above in motion.
        		// The file was read as base64
        		// text, which an Image can
        		// take as a source just like a URL
        		img.src = event.target.result; 
    		};

    		// Start reading the image file as a data URL
    		// We do not assign file to img
    		// because the Image() object doesn't
		// accept a file directly. Instead,
		// you read the file as a base64 URL,
		// then assign it to the src attribute
		// of img (the newly drawn image
		// object)
    		reader.readAsDataURL(file); 
    		downloadBtn.style.display = 'inline-block'; 
	});

	// This function draws the image on
	// the canvas, resized based on the
	// slider
	function drawImageAtScale(scale) {
    		// Convert slider value (string) to
    		// a number so we can use that to
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
    		// Show the scale value next to
    		// the slider. The slider holds a
    		// MULTIPLIER (1 = full size),
    		// but the label reads "%", so we
    		// convert. Without this you
    		// would see "Resize (%): 1.5%"
    		// beside an image that had just grown by half.
    		scaleValue.textContent = Math.round(this.value * 100); 

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