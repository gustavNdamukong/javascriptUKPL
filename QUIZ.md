
-1) What is event bubbling?

    Event bubbling is how events move up the DOM tree.

    When you click a child element, the event:

    Runs on the child
    Then its parent
    Then its parent’s parent… up to document
    <div id="parent">
    <button id="child">Click me</button>
    </div>
    document.getElementById("child").addEventListener("click", () => {
    console.log("Child clicked");
    });

    document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent clicked");
    });

    Clicking button prints:

    Child clicked
    Parent clicked

    🧠 Stop bubbling:

    event.stopPropagation();



-2) What's the difference between slice() and splice()
    Feature	slice()	splice()
    Mutates original array?	❌ No	✅ Yes
    Purpose	Copy portion	Add/remove items
    let arr = [1,2,3,4];

    // slice
    let newArr = arr.slice(1,3); 
    // [2,3], original unchanged

    // splice
    arr.splice(1,2); 
    // removes [2,3], arr becomes [1,4]


-3) How does reduce() work?

    It reduces an array to one value

    let nums = [1,2,3,4];

    let sum = nums.reduce((acc, curr) => {
    return acc + curr;
    }, 0);

    console.log(sum); // 10

    Think of it as:

    “Carry a result (accumulator) through the array”




-4) What is the build() function in JavaScript?

    It is part of the Builder Pattern. 

    Here is the problem it solves

    When creating complex objects step-by-step:

    The following approach, for example, is bad ❌:

        const user = new User("John", 25, true, false, "admin");


    That is because it is hard to read, and easy to mess up

    Enter the Builder pattern:

        class UserBuilder {
            constructor(name) 
            {
                this.user = { name };
            }

            setAge(age) {
                this.user.age = age;
                return this;
            }

            setAdmin(isAdmin) {
                this.user.isAdmin = isAdmin;
                return this;
            }

            build() {
                return this.user;
            }
        }

    Usage:

        const user = new UserBuilder("John")
        .setAge(25)
        .setAdmin(true)
        .build();

Why .build() exists

It:

    Finalizes the object
    Returns the finished version
    Optionally validates before returning

