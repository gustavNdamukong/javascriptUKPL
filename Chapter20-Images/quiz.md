# QUIZ — Images

This page contains the Q & A (questions and answers) for this chapter — Chapter 20: Images. Work
through these after reading the chapter, while the material is fresh — recall practice is what
cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 9 to 12 are proper exercises where you write and run real code. The answers
are all together in the Answers section further down, numbered to match the questions.


## QUESTIONS

1) You apply a grayscale effect with `img.style.filter = 'grayscale(100%)'`. Why can the user
   not download the grey version of that image?

   Clue: think about what you actually changed.


2) So what do you use instead when the change has to be permanent, and why does that work?

   Clue: one HTML element, and it holds real pixels.


3) In the preview example, why is `URL.createObjectURL(file)` enough, with no FileReader in
   sight?

   Clue: you are not reading the file, only pointing at it.


4) This line appears in the chapter. What does it do, and why must the code that uses the image
   live inside it?

        img.onload = function () { ... };

   Clue: setting `src` starts something that takes time.


5) Walk through the four steps of making a canvas edit downloadable.

   Clue: draw, edit, export, link.


6) In the pixel loop below, why does the counter go up in fours, and why is `data[i + 3]` never
   touched?

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i+1] + data[i+2]) / 3;
            data[i] = data[i+1] = data[i+2] = avg;
        }

   Clue: each pixel is four numbers, and one of them is not a colour.


7) Two filters are set like this. One of them would silently do nothing if you copied the
   pattern of the other. Which, and why?

        ctx.filter = `contrast(${slider.value})`;
        ctx.filter = `blur(${slider.value}px)`;

   Clue: look at what is on the end.


8) The chapter's grayscale button does this. Spot the bug.

        btn.addEventListener('click', applFilter);

        function applyFilter() { ... }

   Clue: read the two names side by side, slowly.


9) EXERCISE. Write the toggle that switches an image between full grayscale and none each time a
   button is clicked, using a ternary.

   Clue: read the current value, then set the opposite.


10) EXERCISE. Given a 2×1 canvas with one red pixel and one blue pixel, apply the averaging
  grayscale from question 6 and print the resulting pixel values.

  Clue: 255 divided by 3.


11) EXERCISE. Write the download handler: turn the canvas into a data URL and trigger a download
  named `edited-image.png`.

  Clue: three lines and a click.


12) EXERCISE. A resize slider holds a multiplier from 0.1 to 2, but its label reads "%". Write
  the line that displays it correctly.

  Clue: 1 should read as 100.


## ANSWERS

1) Because a **CSS filter only changes how the image is displayed**. It does not touch the image
   data at all. The browser paints the picture differently on screen, but the file behind it is
   exactly as it was.

   So there is nothing new to download. If you saved that image you would get the original,
   in full colour.

   That is not a failing — CSS filters are perfect when all you want is a visual effect, and
   they are cheap and instant. They are simply the wrong tool when the change has to be kept.


2) You use the **`<canvas>` element**.

   A canvas holds actual pixels that you can read and write. When you draw an image onto it and
   then change those pixels, the change is real: it exists in the canvas, not just in how the
   browser is rendering something.

   From there you can export the canvas as a new image with `toDataURL()` and offer it for
   download.

   One thing to hold on to, because it explains the whole shape of this chapter: JavaScript
   cannot modify the original file on disk. What actually happens is that you **read** the
   original, **rebuild** it on a canvas, and **save that as a new file**. The original is never
   touched.


3) Because `URL.createObjectURL()` does not read the file's contents — it just creates a short
   temporary address that points at the file already sitting in the browser's memory.

        preview.src = URL.createObjectURL(file);

   An `<img>` only needs an address, so that is all you have to give it. No reading, no waiting,
   no callback.

   You need a `FileReader` when you actually want the **contents** — the text of a file, or
   base64 data you are going to feed to an `Image` object before drawing it on a canvas.

   One habit worth keeping: an object URL stays in memory until you release it with
   `URL.revokeObjectURL()`.


4) Setting `img.src` **starts a load**, and loading takes time — even for a base64 string.
   `img.onload` is the callback that runs once the picture is genuinely there.

   That matters because until it fires, the image has no real width or height and nothing to
   draw. Code like this, placed after `img.src = ...`, would run too early:

        img.src = event.target.result;
        canvas.width = img.width;
        // 0 - the image has not loaded yet
        ctx.drawImage(img, 0, 0);      // draws nothing

   So the order looks backwards but is not: you say what should happen *when* it loads, and only
   then give it a `src` to set the loading off.


5) 
        // 1. draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        // 2. edit the pixels (or set
        // ctx.filter before drawing)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // ...change imageData.data...
        ctx.putImageData(imageData, 0, 0);

        // 3. export the canvas as an image
        const finalImage = canvas.toDataURL('image/png');

        // 4. hand it to a link with a download attribute
        downloadLink.href = finalImage;
        downloadLink.download = 'grayscale-image.png';

   `toDataURL()` gives you a base64 string beginning `data:image/png;base64,...`, which a link
   can use as its `href` exactly like an ordinary URL.


6) **The counter goes up in fours because each pixel is four numbers**, laid out end to end in
   one long list:

[ R, G, B, A,   R, G, B, A,   R, G, B, A,  ... ]
pixel 1        pixel 2        pixel 3

   So `data[i]` is red, `data[i+1]` green, `data[i+2]` blue, and `data[i+3]` is the **alpha** —
   how opaque that pixel is.

   Alpha is left alone because it is not a colour. Averaging it in would make the picture grey
- and* partly transparent. By skipping it, the image keeps exactly the transparency it had.


7) **`blur()` is the one that would silently fail** if you wrote it like `contrast()`.

   `contrast()` takes a plain number: `contrast(1)` means unchanged, `contrast(1.5)` means 150%.
   No unit needed.

   `blur()` takes a **length**, so it needs a unit. `blur(5)` is not valid CSS, and an invalid
   filter string is ignored — the image is simply drawn with no blur at all, and nothing warns
   you. That is why the chapter appends `px`:

        ctx.filter = `blur(${blurSlider.value}px)`;

   A filter that quietly does nothing is harder to debug than one that throws, so this is worth
   remembering.


8) The listener names **`applFilter`** while the function is called **`applyFilter`** — the `y`
   is missing.

   This does not fail on click. It fails immediately, when that line runs, because JavaScript
   looks for a variable called `applFilter` and there is no such thing:

ReferenceError: applFilter is not defined

   Two names that differ by one letter are hard to spot, which is a good argument for letting
   your editor autocomplete function names rather than typing them again.


9) 
        const btn = document.getElementById('grayScaleBtn');
        btn.addEventListener('click', toggleFilter);

        function toggleFilter() {
            const img = document.getElementById('myImage');

            img.style.filter =
                img.style.filter === 'grayscale(100%)'
                    ? 'grayscale(0%)'
                    : 'grayscale(100%)';
        }

   Read the ternary as a sentence: *is it currently full grayscale? then set it to none,
   otherwise set it to full.*

   The first click works because the filter starts as an empty string, which is not
   `'grayscale(100%)'`, so it takes the second branch. `'none'` would do just as well as
   `'grayscale(0%)'`.


10) 
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(255,0,0)';   ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = 'rgb(0,0,255)';   ctx.fillRect(1, 0, 1, 1);

        const imageData = ctx.getImageData(0, 0, 2, 1);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i+1] + data[i+2]) / 3;
            data[i] = data[i+1] = data[i+2] = avg;
        }

        console.log(data[0], data[1], data[2]);
        // 85 85 85
        console.log(data[4], data[5], data[6]);
        // 85 85 85

  Both pixels come out as **85**, because 255 ÷ 3 is 85 whether the 255 was in the red slot or
  the blue one. Two very different colours land on the same grey — which is exactly what
  averaging does, and why this simple method is not how professional tools convert to
  greyscale. They weight the channels, because our eyes are far more sensitive to green than
  to blue.


11) 
        downloadBtn.addEventListener('click', function () {
            const link = document.createElement('a');

            link.download = 'edited-image.png';
            link.href = canvas.toDataURL();

            link.click();
        });

  The link never has to be added to the page. Creating it, pointing it at the data URL and
  clicking it in code is enough to start a download.

  Note that `download` is what makes the browser save the file rather than navigate to it, and
  it is also where the filename comes from.


12) 
        scaleValue.textContent = Math.round(this.value * 100);

  The slider holds a **multiplier** — `1` means full size, `0.5` means half, `2` means double.
  The label says `%`. Printing the raw value beside a percent sign gives you "Resize (%): 1%"
  next to an image at its original size, which is confusing.

  Multiplying by 100 makes the two agree: `1` reads as `100`, `0.5` reads as `50`. `Math.round`
  tidies away the floating-point dust that a step of `0.1` can produce.
