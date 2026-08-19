# QUIZ — The Canvas Element

This page contains the Q & A (questions and answers) for this chapter — Chapter 16: The Canvas
Element. Work through these after reading the chapter, while the material is fresh — recall
practice is what cements new knowledge into long-term memory.

Try every question before you look below. Each one carries a clue, so nothing here should leave
you stuck. Questions 9 to 13 are proper exercises where you write and run real code. The answers
are all together in the Answers section further down, numbered to match the questions.


## QUESTIONS

1) What makes a `<canvas>` different from an `<img>` or a `<div>`, and what is the very first
   thing you must do in JavaScript before you can draw on one?

   Clue: the element itself is empty. You have to ask it for something before anything can
   happen.


2) What is the difference between these two pairs, and when would you use each?

    ctx.fillStyle  +  ctx.fill()
    ctx.strokeStyle +  ctx.stroke()

   Clue: one colours the inside, the other draws the outline.


3) Read this line and say what each of the five arguments does:

        ctx.arc(150, 75, 40, 0, 2 * Math.PI);

   Clue: two are a position, one is a size, and two are angles measured in something other than
   degrees.


4) After calling `ctx.arc(...)`, is anything visible on the canvas yet? Why or why not?

   Clue: think of arc() as tracing with a pencil that has no lead in it.


5) A reader copies this from a tutorial and gets a black circle instead of a red one. What went
   wrong?

        ctx.beginPath();
        ctx.arc(150, 75, 40, 0, 2 * Math.PI);
        ctx.StrokeStyle = "red";
        ctx.stroke();

   Clue: look very closely at the third line. Nothing will appear in the console to help you.


6) In the drawing app, why is `ctx.beginPath()` called on mouseup, and what would happen without
   it?

   Clue: think about what the pen does between the end of one stroke and the start of the next.


7) The corrected drawing app keeps two separate variables, `mouseDown` and `isErasing`. Why is
   it important that these are two variables and not one?

   Clue: they answer two completely different questions.


8) What does `canMove()` return when the ball has hit the rock — `true` or `false`? And how does
   the function's name help you remember?

   Clue: read the name as a question and answer it out loud.


9) EXERCISE. Draw a green rectangle 100 wide and 50 tall, starting 20 pixels from the left and
   30 pixels from the top of the canvas.

   Clue: one property and one method, and the four numbers go in a particular order.


10) EXERCISE. Draw a circle outline (no fill) with a radius of 30, in the middle of a canvas
  that is 200 by 200.

  Clue: the middle of a 200 by 200 canvas is not 200, 200.


11) EXERCISE. Write the words "Hello Canvas!" onto a canvas in 20 pixel blue text, 70 pixels
  from the left and 50 pixels from the top.

  Clue: three lines, and one of them is the text equivalent of fill().


12) EXERCISE. Given a ball with `x`, `y` and `radius`, and a canvas, write a check that returns
  true only if the ball is completely inside the canvas.

  Clue: four comparisons, one per wall, and every one of them needs the radius.


13) EXERCISE. The ball is at (250, 200) with a radius of 15. The rock sits at (220, 170) and is
  60 by 60. Work out, by hand, whether the bounding-box check says they are touching.

  Clue: write down the four edges of each, then compare them in pairs.


## ANSWERS

1) A `<canvas>` has **no content of its own**. A `<div>` can hold text and an `<img>` shows a
   picture you gave it, but a canvas starts as a blank rectangle and stays blank until
   JavaScript draws on it.

   The first thing you must do is ask it for its **drawing context**:

        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

   The context is the actual drawing tool — every method in this chapter is called on `ctx`, not
   on the canvas element. That is why every canvas program in this chapter starts with those two
   lines.

   In every other respect the canvas is an ordinary DOM element: you can create it with
   `createElement()`, find it with `getElementById()`, style it with CSS and append it to the
   page.


2) **`fillStyle` and `fill()`** colour the **inside** of a shape — a solid circle, a solid
   rectangle.

- *`strokeStyle` and `stroke()`** draw the **outline** only, leaving the middle empty.

   They pair up, and mixing them is a common mistake — setting `fillStyle` and then calling
   `stroke()` gets you an outline in the default black, because `stroke()` never looks at
   `fillStyle`.

        // solid red circle
        ctx.fillStyle = "red";
        ctx.fill();

        // red outline, hollow middle
        ctx.strokeStyle = "red";
        ctx.stroke();

   Note that neither of the two *style* properties draws anything by itself. They only say what
   colour the next fill or stroke will use.


3) 
    ctx.arc(150, 75, 40, 0, 2 * Math.PI);
      |    |   |   |      |
      x    y   r  start  end

- **150** and **75** are the x and y coordinates of the **centre** of the circle.
- **40** is the **radius** — how far the circle reaches out from that centre.
- **0** is the starting angle and **2 * Math.PI** is the ending angle.

   The angles are in **radians**, not degrees. A full circle is 360 degrees, which is
   `2 * Math.PI` radians, so going from 0 to `2 * Math.PI` draws the whole way round. If you only
   went to `Math.PI` you would get half a circle.


4) **No, nothing is visible yet.**

   `arc()` only defines a **path**. It traces the shape's outline without putting any colour
   down — like drawing with a pencil that has no lead in it. The canvas now knows the shape you
   mean, but has not painted it.

   Something appears only when you call `fill()` or `stroke()`. That is the pattern for every
   shape in this chapter:

        ctx.beginPath();        // start a new shape
        ctx.arc(...);           // describe it
        ctx.fillStyle = "red";  // choose the colour
        ctx.fill();             // NOW it appears

   `fillRect()` is the exception that proves the rule — it describes *and* paints in one go,
   which is why the rectangle example is shorter than the circle one.


5) The third line says **`StrokeStyle` with a capital S**. The property is `strokeStyle`, with a
   small s.

   JavaScript is case-sensitive, so `ctx.StrokeStyle = "red"` does not set the stroke colour. It
   simply creates a brand new property called `StrokeStyle` on the context object and puts
   `"red"` in it, where nothing will ever look at it. The canvas carries on using its default
   stroke colour, which is black.

   What makes this one nasty is that **nothing goes wrong**. There is no error, no warning, no
   red text in the console. You just get a black circle and no explanation. If a canvas colour
   is being ignored, checking the capitalisation of your property name is a good first move.


6) Because it **lifts the pen off the paper**.

   The canvas keeps a current path as you draw. If you finish a stroke and do not clear that
   path, then the next time the user presses down somewhere else and moves, the canvas draws a
   line joining the end of the old stroke to the start of the new one.

   So without it, every separate stroke would be connected by a straight line running across
   your drawing — as though you never lifted the pencil.

        canvas.addEventListener("mouseup", () => {
            painting = false;
            ctx.beginPath();   // lift the pen
        });


7) Because they answer **two completely different questions**:

- `mouseDown` — *is the button being held right now?*
- `isErasing` — *which tool has the user chosen?*

   These change independently. You can be erasing with the button up, or drawing with the button
   down, or any other combination. Trying to store both in one variable, or deriving one from
   the other, produces exactly the bug that made this fix necessary: releasing the mouse did not
   stop the pen, and simply moving the mouse across the canvas erased whatever it passed over.

   The general lesson is worth more than the canvas detail: **when two things can vary
   independently, they need two variables.** If you find yourself writing
   `a = !b ? true : false`, stop and ask whether `a` and `b` are really the same fact.


8) `canMove()` returns **false** when the ball has hit something, and **true** when the way is
   clear.

   The name is the memory aid. Read it as a question — *"can the ball move?"* — and the answer is
   yes or no. It is not asking *"has it crashed?"*, which would be the other way round.

   That is why the calling code reads the way it does:

        if (canMove(dx, dy)) {
            ball.x += dx;
            ball.y += dy;
            draw();
        }

   Move only if we are allowed to. Naming a function so that its name reads as the question it
   answers is a small habit that saves a lot of confusion later.


9) 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "green";
        ctx.fillRect(20, 30, 100, 50);

   The four numbers go in the order **x, y, width, height** — so 20 across, 30 down, then 100
   wide and 50 tall. Getting them in the wrong order is easy and the shape simply appears
   somewhere unexpected, with no error.

   Note that `fillRect()` needs no `beginPath()` and no `fill()`. It is a shortcut that describes
   and paints in one call.


10) 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(100, 100, 30, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.stroke();

  The middle of a 200 by 200 canvas is **(100, 100)** — half the width and half the height, not
  the width and height themselves. Since `arc()` takes the coordinates of the *centre*, that is
  exactly what it wants.

  Use `strokeStyle` and `stroke()` because we want an outline. Swap them for `fillStyle` and
  `fill()` and you get a solid disc instead.


11) 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

        ctx.font = "20px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Hello Canvas!", 70, 50);

  `fillText()` is the text equivalent of `fill()` — it is what actually puts the text on the
  canvas. So the pattern matches the shapes: `fillStyle` chooses the colour, and the `fill`
  method does the painting.

  The `font` property takes the same kind of value you would write in CSS, size first and then
  the typeface.


12) 
        function isInsideCanvas() {
            // the left edge of the ball must
            // not be past the left wall
            if (ball.x - ball.radius < 0) {
                return false;
            }

            // the right edge must not
            // be past the right wall
            if (ball.x + ball.radius > canvas.width) {
                return false;
            }

            // the top edge must not be past the top wall
            if (ball.y - ball.radius < 0) {
                return false;
            }

            // the bottom edge must not
            // be past the bottom wall
            if (ball.y + ball.radius > canvas.height) {
                return false;
            }

            // nothing was out of bounds, so we are inside
            return true;
        }

The radius is the whole point. `ball.x` is the **centre**, so comparing it to the walls on
its own would let half the ball disappear off the edge before anything complained. Subtract
the radius to get the left and top edges, add it to get the right and bottom.

  The same four checks written more compactly, once you are comfortable with them:

        return ball.x - ball.radius >= 0 &&
               ball.x + ball.radius <= canvas.width &&
               ball.y - ball.radius >= 0 &&
               ball.y + ball.radius <= canvas.height;


13) **Yes — the bounding-box check says they are touching.**

  Work out the eight edges:

        ball at (250, 200), radius 15        rock at (220, 170), 60 by 60
        ballLeft   = 250 - 15 = 235          rockLeft   = 220
        ballRight  = 250 + 15 = 265          rockRight  = 220 + 60 = 280
        ballTop    = 200 - 15 = 185          rockTop    = 170
        ballBottom = 200 + 15 = 215          rockBottom = 170 + 60 = 230

  Now the four comparisons:

        ballRight  > rockLeft     265 > 220   true
        ballLeft   < rockRight    235 < 280   true
        ballBottom > rockTop      215 > 170   true
        ballTop    < rockBottom   185 < 230   true

  All four are true, so `hitRock` is true, so `canMove()` returns false and the ball is not
  allowed to move there.

  That makes sense if you picture it: the ball's centre at (250, 200) is inside the rock, which
  spans 220 to 280 across and 170 to 230 down. The ball is sitting right on top of it.

  Remember that all four must be true. If even one is false the shapes have missed each other,
  because a gap on any single side is enough to keep them apart.
