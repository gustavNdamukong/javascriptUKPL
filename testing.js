// Parent class
    class Animal {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(`${this.name} makes a noise.`);
        }
    }

    // Child class
    class Dog extends Animal {
        speak() {
            console.log(`${this.name} barks.`);
        }
    }

    const rex = new Dog("Rex");
    rex.speak(); // Rex barks.