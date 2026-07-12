
//————————————————————//
	CHAPTER 12 - DESIGN PATTERNS
///————————————————————//

Design patterns are reusable solutions to 
  common software design problems. They 
  provide a way to solve issues in your 
  code's structure while promoting 
  maintainability and scalability. Design 
  patterns are categorised into three groups:

   1) Creational Patterns
        These are concerned with object 
         creation.

         -SINGLETON
         -FACTORY
         -ABSTRACT FACTORY
         -BUILDER
         -PROTOTYPE
   2) Structural Patterns
         These patterns focus on the 
          composition (structure) of classes or 
          objects.

         -ADAPTER PATTERN
         -DECORATOR PATTERN
         -FACADE PATTERN
         -COMPOSITE PATTERN
         -PROXY PATTERN
   3) Behavioral Patterns
          These patterns deal with object 
          interaction and responsibility 
          distribution.

         -OBSERVER PATTERN
         -STRATEGY PATTERN
         -TEMPLATE METHOD PATTERN
         -COMMAND PATTERN
         -ITERATOR PATTERN


    These design patterns are global and 
  programming-language agnostic, however, 
  each programming language has its own 
  way of implementing them. In the 
  explanations of all these design patterns 
  below, i provide examples in JavaScript. If you 
  program in another language, you just 
  have learn how each of the patterns are 
  implemented in that language. I can assure 
  you that the approach is generally always 
  the same, with syntactical differences of 
  course.

         1) Creational Design Patterns
         ————————————-
    Creational design patterns deal with 
  object creation mechanisms, trying to 
  create objects in a manner suitable to the 
  situation. These patterns provide flexibility 
  in how objects are instantiated and 
  constructed. By using these creational 
  patterns, you can better manage object 
  creation processes in your applications, 
  ensuring efficiency, flexibility, and 
  maintainability.
    The following are the patterns in this 
  group:

        -SINGLETON
        -FACTORY
        -ABSTRACT FACTORY
        -BUILDER
        -PROTOTYPE


    SINGLETON PATTERN
    —————————
    The singleton pattern ensures that a class has only one instance and provides a global point of access to it. It's commonly 
used for shared resources like databases, configuration, or logging. The following is an example of a singleton implementation in JavaScript to make a database connection.
  
    JavaScript example
    ————————

          class DatabaseConnection {
  		constructor() {
    			if (DatabaseConnection.instance) {
      				return DatabaseConnection.instance;
   	 		}

    			// Simulated database connection
    			this.connection = this.#connectToDatabase();
    			DatabaseConnection.instance = this;
  		}

  		// Simulate a private connection method
  		#connectToDatabase() {
    			console.log("Establishing new database connection...");
    			return { connected: true, db: "my_database" };
  		}

  		getConnection() {
    			return this.connection;
  		}
	}

	// Usage
	const db1 = new DatabaseConnection();
	const db2 = new DatabaseConnection();

	console.log(db1.getConnection()); 
	console.log(db1 === db2); 

  The output will be as follows:

	Establishing new database connection...
	{connected: true, db: 'my_database'}
	true // true — same instance




      Key Points:
      —————
	-Normally, to implement a singleton, you would create a private 
	   constructor in whichever programming language you are using. A 
	   private constructor will ensure that no external code can directly create 
	   an instance of the class. Only the class itself can create 
           an instance, and in our example, that happens in the constructor. 
	   Notice how, in that constructor we check if a database connection has 
	   already been created and return the existing one if it is. A new instance 
	   is only created if no earlier connection exists.
	     In JavaScript classes however, private constructors are not supported 
	   like they are in PHP, for example. But we can still achieve a Singleton
	   behaviour by storing the instance in a static property and returning it if 
	   it already exists.
	     This is the whole idea behind a singleton-multiple calls to create a 
	   database connection will all return the same instance. This ensures 
	   that only one database connection is used throughout the application, 
	   which can improve performance and prevent multiple connections from 
	   being opened unnecessarily, which could lead to inefficiency and 
	   resource exhaustion. This is why this pattern is commonly used in 
  	   situations like managing a single database connection in web 
	   application.
	-The connectToDatabase() method method is declared private using the 
	   # prefix. Because the connectToDatabase() is a private method, it 
	   cannot be called directly, and that is the intention. That is why it is 
	   called by the class itself, constructor when you instantiate the class in 
	   order to make the database connection. 
	-The connectToDatabase() method (which is private) is where we make 
	   the database connection. Normally, in a real application, this is where 
	   you will have the code on your server to make and return the 
	   connection to your database server. But since working on a server is 
	   beyond the scope of this book, I have mimicked that process by logging 
	   some text to the console saying we are making a connection with the 
	   database. Here it what it looks like:

		#connectToDatabase() {
    			console.log("Establishing new database connection...");
    			return { connected: true, db: "my_database" };
  		}
	-Finally, note that we have logged the result of the expression that 
	   checks if the db1 and db2 instances are the same instance to see if the 
	   Singleton implementation worked. 

		console.log(db1 === db2); 

	   The result of this is true.






       FACTORY PATTERN
       ——————————-
    The factory pattern provides a way to 
  create objects without specifying the exact 
  class. It delegates the object creation 
  process (logic) to subclasses or another object.

    JavaScript example:
    ——————

         class Dog {
  		speak() {
    			return "Woof";
  		}
	}

	class Cat {
  		speak() {
    			return "Meow";
  		}
	}

	class AnimalFactory {
  		static createAnimal(type) {
    			if (type === "dog") {
     			 	return new Dog();
    			} 
			else if (type === "cat") {
      				return new Cat();
    			}
    			throw new Error("Unknown animal type");
  		}
	}



        Using the factory class
        ——————————
       const animal = AnimalFactory.createAnimal("dog");
	console.log(animal.speak()); // Woof




    ABSTRACT FACTORY PATTERN
    ——————————————— 
    The Abstract Factory Pattern provides an 
  interface for creating families of related or 
  dependent objects without specifying their 
  concrete classes. It allows the client to 
  create objects that are part of a specific 
  family, where the exact class of each 
  object is determined by the factory. It is ideal for UI libraries or platform-dependent logic.

    Example Scenario:  
    ——————-
    Let's say you’re building an application 
  that can work with two types of user 
  interfaces: Windows and Mac. Each UI has 
  its own specific elements (like buttons, 
  checkboxes), and the abstract factory will 
  help you create the appropriate family of 
  UI components based on the environment.

 
    JavaScript Code Example
    ———————
         
// Abstract Products
class Button {
  	render() {}
}
class Checkbox {
  	check() {}
}

// Concrete Products for Windows
class WindowsButton extends Button {
  	render() {
    		console.log("Rendering Windows Button");
  	}
}

class WindowsCheckbox extends Checkbox {
  	check() {
    		console.log("Checking Windows Checkbox");
  	}
}

// Concrete Products for Mac
class MacButton extends Button {
  	render() {
    		console.log("Rendering Mac Button");
  	}
}

class MacCheckbox extends Checkbox {
  	check() {
    		console.log("Checking Mac Checkbox");
  	}
}

// Abstract Factory
class GUIFactory {
  	createButton() {}
  	createCheckbox() {}
}

// Concrete Factories
class WindowsFactory extends GUIFactory {
  	createButton() {
    		return new WindowsButton();
  	}
  	
	createCheckbox() {
    		return new WindowsCheckbox();
  	}
}

class MacFactory extends GUIFactory {
  	createButton() {
    		return new MacButton();
  	}
  
	createCheckbox() {
    		return new MacCheckbox();
  	}
}

// Client
function renderUI(factory) {
  	const button = factory.createButton();
  	const checkbox = factory.createCheckbox();
  
	button.render();
  	checkbox.check();
}




// Example of using the abstract    
renderUI(new WindowsFactory());
renderUI(new MacFactory());

Key points
—————-
-Abstract Factory pattern allows 
       creating families of related objects.
-You can easily switch between different 
       families (e.g., Windows vs Mac).






    BUILDER PATTERN
    ——————————
    The Builder Pattern is used to create 
  complex objects step by step. It separates 
  the construction of a complex object from 
  its representation, allowing different representations of the object to be created using the same process.

  Example Scenario:
  ————————
    Consider building a ‘House’ with various 
  customisable features like walls, doors, 
  windows, and roof. Each house may differ 
  in terms of these features, but the 
  construction process is the same.


 JavaScript Code Example:
  ———————-
// Product
class House {
	constructor() {
    		this.walls = "";
    		this.doors = "";
    		this.windows = "";
    		this.roof = "";
  	}

  	show() {
    	    	console.log(
      			`House with ${this.walls} walls, ${this.doors} doors, 
			${this.windows} 	windows, and a ${this.roof} roof`
   		);
  	}
}


// Builder Interface
class HouseBuilder {
  	buildWalls() {}
  	buildDoors() {}
  	buildWindows() {}
  	buildRoof() {}
  	getHouse() {}
}

// Concrete Builder
class WoodenHouseBuilder extends HouseBuilder {
  constructor() {
    super();
    this.house = new House();
  }

  buildWalls() {
    this.house.walls = "Wooden";
  }

  buildDoors() {
    this.house.doors = "Wooden";
  }

  buildWindows() {
    this.house.windows = "Wooden";
  }

  buildRoof() {
    this.house.roof = "Wooden";
  }

  getHouse() {
    return this.house;
  }
}

// Director
class ConstructionEngineer {
  constructor(builder) {
    this.builder = builder;
  }

  constructHouse() {
    this.builder.buildWalls();
    this.builder.buildDoors();
    this.builder.buildWindows();
    this.builder.buildRoof();
    return this.builder.getHouse();
  }
}

// Usage
const builder = new WoodenHouseBuilder();
const engineer = new ConstructionEngineer(builder);
const house = engineer.constructHouse();
house.show();

The output of this code will be:

	“House with Wooden walls, Wooden doors, Wooden windows, and a Wooden roof”


      Key points:
      ——————
   -The Builder Pattern focuses on step-by-
     step construction of complex objects.
   -The same building process can create 
     different results (e.g., WoodenHouse or 
     BrickHouse).




    PROTOTYPE PATTERN
    ———————————-
    The Prototype Pattern involves creating 
  new objects by copying an existing object 
  (the prototype). This is useful when the 
  cost of creating a new object is expensive, 
  and you can avoid it by cloning an existing 
  object. This pattern basically clones existing objects instead of creating new ones from scratch.

  Example Scenario:  
  ———————-
    Imagine you are creating a ‘Document 
  Editor’ where you need to create copies of 
  documents. The prototype pattern allows 
  you to create new documents by cloning 
  existing ones instead of creating them from 
  scratch.


    JavaScript Code Example:
    —————————-
        
 class TextDocument {
  	constructor(content) {
    		this.content = content;
  	}

  	clone() {
    		return new TextDocument(this.content);
  	}

  	showContent() {
    		console.log("Document content: " + this.content);
  	}
}


// Usage
const originalDocument = new TextDocument("Original Content");
const clonedDocument = originalDocument.clone();


// Display the contents of both the 
// original and the cloned document

// The output: “Document content: Original Content”
originalDocument.showContent(); 

// The output: “Document content: Original Content”
clonedDocument.showContent();   


    Key points:
    —————-
   -Prototype Pattern allows creating new 
     objects by copying an existing object.
   -It is useful for cases where object 
     creation is expensive, and copying is 
     more efficient.






    2) STRUCTURAL DESIGN PATTERNS
    ———————————————
    Structural design patterns focus on how objects and classes are composed   
(structured). They focus on how objects and classes are composed to form larger structures, making code easier to manage and scale. They help ensure that if one part of a system changes, the entire structure doesn’t need to change. These structural patterns help organise and manage the relationships between classes and objects in your applications, providing 
flexibility, reusability, and better organization. The following design patterns 
fall under this group:



    -ADAPTER PATTERN
    -DECORATOR PATTERN
    -FACADE PATTERN
    -COMPOSITE PATTERN
    -PROXY PATTERN
    -BRIDGE PATTERN
    -FLYWEIGHT PATTERN



    ADAPTER PATTERN
    ——————————-
    The Adapter Pattern allows objects with 
  incompatible interfaces to work together. It 
  acts as a bridge between two interfaces 
  that otherwise couldn’t interact directly. 
  This is useful when you want to integrate a 
  class with a different interface into your 
  system.

    Example Scenario:
    ——————-
    Imagine you have a Media Player that 
  only supports playing MP3 files, but you 
  want to add support for playing MP4 files. 
  The adapter pattern helps convert the MP4 
  interface to be compatible with the MP3 
  player.

    JavaScript code example
   ——————————
// Old API
class OldPrinter {
  	printText(text) {
    		console.log(`Old Printer: ${text}`);
  	}
}

// New expected interface
class NewPrinter {
  	print(text) {
    		console.log(`New Printer: ${text}`);
  	}
}

// Adapter
class PrinterAdapter {
  	constructor(oldPrinter) {
    		this.oldPrinter = oldPrinter;
  	}

  	print(text) {
    		this.oldPrinter.printText(text); // adapts the method
  	}
}

// Usage
const oldPrinter = new OldPrinter();
const adaptedPrinter = new PrinterAdapter(oldPrinter);

adaptedPrinter.print("Hello World!"); // works like the new printer

  Imagine you bought a new phone charger, but your wall socket is old and doesn't match the charger plug. What do you do? Use a plug adapter! It lets the new charger connect to the old socket.
In this pattern, PrinterAdapter plays the role of the plug adapter. It makes the old printer work with new code that expects a different method (print instead of printText).


Key points
—————-
   -The Adapter Pattern enables objects with 
     incompatible interfaces to work together.
   -You can introduce new functionality to an 
     existing system without changing its 
     structure.





      DECORATOR PATTERN
      ————————————
  The decorator pattern allows behaviour to be added to individual objects, either statically or dynamically, without affecting the behaviour of other objects from the same class. Basically, you can use this pattern to add behaviour to objects dynamically without changing their structure.

    JavaScript example:
    ———————-
// Base
class Coffee {
  	cost() {
    		return 5;
  	}
}

// Decorator
class MilkDecorator {
  	constructor(coffee) {
    		this.coffee = coffee;
  	}

  	cost() {
    		return this.coffee.cost() + 1;
  	}
}

class SugarDecorator {
  	constructor(coffee) {
    		this.coffee = coffee;
  	}

  	cost() {
    		return this.coffee.cost() + 0.5;
  	}
}

// Usage
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);

console.log(`Total cost: $${myCoffee.cost()}`);

The result in the console will be something like this:

	Total cost: $6.5

Imagine you buy a basic coffee. Then you say, “Add milk.” Then, “Add sugar.” Each time, you’re upgrading the same coffee without changing the original cup.
The Decorator pattern works exactly like that—wrapping extras around something, layer by layer, without touching its core.



        Key points
        —————-
   -The purpose of the Decorator Pattern is 
     to allow behavior to be added to 
     individual objects dynamically, without 
     affecting the behavior of other objects 
     from the same class. This is done by 
     “wrapping” the object with decorator 
     classes that enhance or modify its 
     functionality.
   -The pattern is called a decorator 
     because the decorator class is used to 
     “decorate” or wrap the original class, 
     adding additional features or 
     responsibilities to the object being 
     decorated. Each decorator class 
     implements the same interface or inherits 
     from the same parent class as the 
     original object.
   -Here is how the Code really Works:
	Component class Coffee:
          -This Coffee class defines the core 
             functionality, which in this case is 
             The method cost()
           -This sets the contract for both the 
             base class (Coffee) and the 
             decorators.
	Concrete Classes( like MilkDecorator or SugarDecorator):
           -These classes implement the basic 
             behavior of the Coffee class. In 
             this case, it represents a simple 
             coffee with a base cost.
	Decorator Classes (MilkDecorator and 
         SugarDecorator):
           -These decorator classes implement 
             the same Coffee class but 
             enhance the functionality of the 
             base class (Coffee). They add 
             their own behavior-in this case 
             flavour (adding milk or sugar) while 
             still calling the base class’s methods 
             to maintain the existing functionality.
	       For example, MilkDecorator adds 
             the cost of milk to the base cost of coffee. Similarly, 
             SugarDecorator adds the cost.
   -The decorator pattern also allows for 
     dynamic and flexible behavior addition. 
     You can apply multiple decorators in 
     sequence, as shown in the example 
     where we first decorate the coffee with 
     milk and then with sugar. Each decorator 
     adds to the cost and description, building 
     on top of the previous one.
	
    Use Case:
    ——————
    The Decorator Pattern is useful when you 
  want to add functionality to an object 
  without modifying its code, especially 
  when you need to apply different 
  combinations of behavior (e.g., coffee with 
  milk, coffee with sugar, coffee with milk 
  and sugar, etc.). Instead of creating 
  multiple subclasses to represent each 
  combination, you can achieve this through 
  decorators.
	This decorator pattern provides 
  flexibility because you can “stack” multiple 
  decorators in any order and combine them 
  as needed without altering the underlying 
  object.


  

      FACADE PATTERN
      —————————-
    The facade pattern provides a simplified 
  interface to a complex subsystem. It hides 
  the complexities of the system behind a 
  unified, easy-to-understand interface.

    JavaScript example:
    ———————
        
	class CPU {
  		start() {
    			console.log("CPU started");
  		}
	}

	class Memory {
  		load() {
    			console.log("Memory loaded");
  		}
	}

	class HardDrive {
  		read() {
    			console.log("Hard drive read");
  		}
	}

	// Facade
	class Computer {
  		constructor() {
    			this.cpu = new CPU();
    			this.memory = new Memory();
    			this.hardDrive = new HardDrive();
  		}

  		start() {
    			this.cpu.start();
    			this.memory.load();
    			this.hardDrive.read();
  		}
	}


                 
	// Usage
        const myComputer = new Computer();
	myComputer.start();

	The output of this code will be:

		CPU started
		Memory loaded
		Hard drive read



      Key points:
      ——————
	Starting a computer involves many parts—CPU, memory, hard drive—all working together. But you don’t push ten buttons to turn it on. You press one power button. The Facade pattern is like that power button—it hides the 
messy details behind a single, simple interface.
   -The Facade Pattern provides a simplified 
     interface to a complex system or a set of 
     classes. It hides the complexity of the 
     subsystems and offers a unified, easier-
     to-use interface for the client.
   -It is called a Facade because it acts as 
     the “front” or “face” of a set of 
     subsystems. Instead of interacting 
     directly with complex subsystems (like 
     CPU, Memory, and HardDrive in this 
     example), the client interacts with a 
     single class (the ComputerFacade) that 
     manages the communication with the 
     subsystems behind the scenes.
   -Here is how the Code Works:
	Subsystem Classes:
	   -The CPU, Memory, and HardDrive are 
            the individual subsystems that 
            perform specific tasks.
	  -Each class has its own methods 
           (start(), load(), read(), etc.) that are 
           specific to its responsibility.
	Facade Class (Computer):
	   -This class aggregates (brings 
           together) the subsystems (CPU, 
           Memory, and HardDrive) and exposes 
           a simple start() method to the client.
	  -The start() method internally 
           coordinates the necessary calls to the 
           subsystems, such as freezing the 
           CPU, loading data into memory, 
           reading from the hard drive, and 
           finally executing instructions.
	  -The client only needs to call start(), 
          without worrying about the individual 
          steps required to boot the computer.
	

    Use Cases:
    ——————
   -This can be used anywhere to simplify   
     complex systems. When you have a 
     system composed of several intricate 
     components (such as hardware or APIs), 
     a facade can simplify interactions by 
     consolidating them into a single, 
     easy-to-use interface. For example, in 
     this case, starting a computer requires 
     multiple steps, but the facade hides all 
     that complexity.
   -It can be used to Reducing Tight 
     Coupling. The client code is only coupled 
     with the facade (ComputerFacade), not 
     with the individual subsystems (CPU, 
     Memory, HardDrive). This makes the 
     code easier to maintain and modify.
   -It can also be used to Improve Code 
     Readability. Facade patterns are often 
     used to improve code readability. If the 
     client had to call each subsystem’s 
     methods directly, the code would be 
     more complex and harder to read.
   -Another great benefit of the facade 
     pattern allows for a clean, organized 
     separation between the client and the 
     complex internals of a system. It also 
     allows for easier maintenance because 
     changes to the subsystem do not affect 
     the client, as long as the facade’s 
     interface remains consistent.
   -You can see how the Facade Pattern 
     simplifies interactions with a complex 
     system by creating a single entry point 
     for the client to use.




      COMPOSITE PATTERN
      ————————————
    The Composite Pattern is used to treat 
  individual objects and compositions of 
  objects uniformly. This pattern allows you 
  to build a tree structure where individual 
  objects and groups of objects are handled 
  the same way.

  Example Scenario:
  —————————
    A company might have employees who 
  can be regular staff members or managers 
  who supervise other employees. The 
  composite pattern helps manage this 
  hierarchy by treating both employees and 
  managers uniformly.

    JavaScript Example:
    ————-
     
  // Leaf
  class File {
  	constructor(name) {
    		this.name = name;
  	}

  	display(indent = '') {
    		console.log(`${indent}- File: ${this.name}`);
  	}
  }

 // Composite
 class Folder {
  	constructor(name) {
    		this.name = name;
    		this.children = [];
  	}

  	add(item) {
    		this.children.push(item);
  	}

  	display(indent = '') {
    		console.log(`${indent}+ Folder: ${this.name}`);
    		this.children.forEach(child => child.display(indent + '  '));
  	}
}

// Usage
const root = new Folder('Root');
const file1 = new File('file1.txt');
const file2 = new File('file2.txt');

const subFolder = new Folder('SubFolder');
subFolder.add(new File('file3.txt'));

root.add(file1);
root.add(subFolder);
root.add(file2);

root.display();

The output will look like so:

	+ Folder: Root
	- File: file1.txt
	+ Folder: SubFolder
	- File: file3.txt
	- File: file2.txt

Think of your computer's folders and files. A folder can contain both files and other folders. Whether it's a file or a folder, you can click and view it the same way. The Composite pattern lets you treat both single items (files) and groups (folders with files) the same, simplifying how you interact with them.


    Key points
    —————-
   -The Composite Pattern allows you to 
     treat individual objects and groups of 
     objects the same way.
   -It is useful for representing hierarchical 
     structures like employees, files, or GUI 
     components.





      PROXY PATTERN
      —————————
    The Proxy Pattern provides a placeholder 
  or surrogate for another object to control 
  access to another object. It’s used to add an extra level 
  of control before accessing the actual 
  object, such as in cases of lazy loading, 
  access control, or logging.

    Example Scenario:
    ————————
    Imagine you have a large image that 
  takes time to load. Instead of loading it 
  directly, you can use a proxy that loads the 
  image only when it’s needed.

   JavaScript Code Example:
    —————————-
          
   // Real object
   class RealImage {
  	constructor(filename) {
    		this.filename = filename;
    		this.load();
  	}

  	load() {
    		console.log(`Loading ${this.filename}`);
  	}

  	display() {
    		console.log(`Displaying ${this.filename}`);
  	}
   }

   // Proxy
   class ProxyImage {
  	constructor(filename) {
    		this.filename = filename;
    		this.realImage = null;
  	}

  	display() {
    		if (!this.realImage) {
      			this.realImage = new RealImage(this.filename);
    		}
    		
		this.realImage.display();
  	}
   }

// Usage
const image = new ProxyImage('cat.png');
image.display(); // Loads and displays
image.display(); // Only displays, doesn't load again

The output will be:

	Loading cat.png
	Displaying cat.png

Imagine opening a large image file. The first time, it takes time to load. But after that, it opens instantly. The Proxy pattern works like a smart assistant that only loads the heavy image when truly needed—saving time and resources.


     Key points:
     ——————
   -The Proxy Pattern provides a surrogate to 
     control access to another object.
   -It’s useful for lazy initialization, access 
     control, or logging.







    BRIDGE AND FLYWEIGHT PATTERNS
    —————-—————————
    These remaining two structural patterns are less common than the others and you therefore may not find it listed in some books or documents. This is because Some beginner-level articles or tutorials only introduce the most common patterns. Besides, patterns like Bridge and especially Flyweight are used less often or are harder to grasp, so they sometimes get left out of beginner resources. Also, some blog authors may occasionally incorrectly group patterns or exclude a few based on personal interpretation.
Nonetheless, I will teach you about them here.

    BRIDGE PATTERN
    ——————————
  The bridge pattern separates an abstraction from its implementation so both can change independently.

    JavaScript example
    ————————

    // Implementation
    class DrawingAPI1 {
  	drawCircle(x, y, radius) {
    	console.log(`API1 drawing circle at (${x}, ${y}) with radius ${radius}`);
  	}
    }

    class DrawingAPI2 {
  	drawCircle(x, y, radius) {
    	     console.log(`API2 drawing circle at (${x}, ${y}) with radius ${radius}`);
  	}
    }

    // Abstraction
    class Circle {
  	constructor(x, y, radius, drawingAPI) {
    		this.x = x;
    		this.y = y;
    		this.radius = radius;
    		this.drawingAPI = drawingAPI;
  	}

  	draw() {
    		this.drawingAPI.drawCircle(this.x, this.y, this.radius);
  	}
    }


// Usage
const circle1 = new Circle(5, 10, 15, new DrawingAPI1());
const circle2 = new Circle(2, 4, 8, new DrawingAPI2());

circle1.draw();
circle2.draw();


The output in the console here will be:

	API1 drawing circle at (5, 10) with radius 15
	API2 drawing circle at (2, 4) with radius 8




     Key points:
     ——————
   Let’s say you’re a designer, and you have two types of drawing tools: a pencil and a marker. You can draw the same circle with either tool. The Bridge pattern lets you separate what you draw (a circle) from how you draw it (pencil or marker). This means you can swap tools anytime without changing the actual process of drawing (the drawing logic).



     FLYWEIGHT PATTERN
    ——————————
  This pattern helps reduce memory usage by sharing common data between similar objects.

    JavaScript example
    ————————

    // Shared flyweight
    class TreeType {
  	constructor(name, color) {
    		this.name = name;
    		this.color = color;
  	}

  	draw(x, y) {
    	    console.log(`Drawing ${this.name} tree at (${x}, ${y}) in ${this.color}`);
  	}
    }

   // Factory
   class TreeFactory {
  	constructor() {
    		this.treeTypes = {};
  	}

  	getTreeType(name, color) {
    		const key = name + color;
    		if (!this.treeTypes[key]) {
      			this.treeTypes[key] = new TreeType(name, color);
    		}
    
		return this.treeTypes[key];
  	}
    }


// Usage
const factory = new TreeFactory();

const tree1 = factory.getTreeType('Oak', 'Green');
tree1.draw(10, 20);

const tree2 = factory.getTreeType('Oak', 'Green');
tree2.draw(15, 25);

console.log(tree1 === tree2); // true



The output in the console here will be:

	Drawing Oak tree at (10, 20) in Green
	Drawing Oak tree at (15, 25) in Green
	true


     Key points:
     ——————
  Imagine a video game with a forest of thousands of trees. If each tree has its own copy of “Oak, Green,” memory will run out fast. The Flyweight pattern makes all identical trees share the same blueprint and only store what’s unique (like position). This saves tons of memory.







    3) BEHAVIORAL DESIGN PATTERNS
    ———————————————-
    Behavioral design patterns focus on how 
  objects communicate and interact with 
  each other. They define the way in which 
  classes and objects collaborate. The   
  following design patterns fall under this 
  group:

    -OBSERVER PATTERN
    -STRATEGY PATTERN
    -TEMPLATE METHOD PATTERN
    -COMMAND PATTERN
    -ITERATOR PATTERN




      OBSERVER PATTERN
      ———————————
    The observer pattern is used when there 
  is one subject and multiple observers that   
  depend on the subject's state. Whenever 
  the subject changes its state, it notifies all 
  its observers.

   JavaScript example:
   ———————
    // Subject class
    class Subject {
  	constructor() {
    		this.observers = [];
  	}

    	addObserver(observer) {
    		this.observers.push(observer);
  	}

  	notify() {
    		this.observers.forEach(observer => observer.update());
  	}
    }

    // Observer class
    class Observer {
  	update() {
    		console.log("Observer notified");
  	}
    }

// Usage
const subject = new Subject();
const observer = new Observer();

subject.addObserver(observer);
subject.notify();


The output in the console will say:

	“Observer notified”


Key points:
——————

This is how this works:
-The Subject is like a news channel. It allows multiple subscribers (Observers) 
	to register with it.
-When the Subject has an update (something changes), it calls notify(), and 
	all subscribers get notified through their own update() method.
-This pattern is great for scenarios like chat apps (new messages notify all 
	listeners) or live price updates.




        STRATEGY PATTERN
        ———————————
    The strategy pattern allows you to define 
  a family of algorithms, encapsulate each 
  one, and make them interchangeable. It 
  lets the algorithm vary independently from 
  the clients that use it. In other words, the 
  clients use the algorithm relevant to them 
  through the family interface.
    This pattern needs 
      -an interface to define the algorithm 
       family
     -one or more strategy classes to 
       implement the different algorithms in 
       the family, each in its own way
     -one client-interfacing class (often 
       referred to as context) to bring the 
       two (interface and strategies) together, 
       which clients will use to vary their 
       strategies seamlessly.

   JavaScript example:
   ———————-
      // Strategy Interface: Just a shared shape in JS
      class PaymentStrategy {
  		pay(amount) {
    			throw new Error("This method should be overridden");
  		}
      }

      // Concrete strategy: PayPal
      class PayPalStrategy extends PaymentStrategy {
  		pay(amount) {
    			return `Paid $${amount} using PayPal`;
  		}
      }

      // Concrete strategy: Credit Card
      class CreditCardStrategy extends PaymentStrategy {
  		pay(amount) {
    			return `Paid $${amount} using Credit Card`;
  		}
      }

      // Context class
      class PaymentContext {
  		constructor(strategy) {
    			this.strategy = strategy;
  		}

  		executePayment(amount) {
    			return this.strategy.pay(amount);
  		}
      }

// Client usage
const paypalContext = new PaymentContext(new PayPalStrategy());
console.log(paypalContext.executePayment(100)); // Paid $100 using PayPal

const cardContext = new PaymentContext(new CreditCardStrategy());
console.log(cardContext.executePayment(200)); // Paid $200 using Credit Card


   // The output in the console: 
   Paid $100 using PayPal
   Paid $200 using Credit Card



      Key points and explanation 
      ————————————
   -You create different payment strategies (like PayPal or Credit Card).
   -The PaymentContext is like a wallet that lets you swap how you want to 
	pay.
   -This avoids messy if-else code and makes it easy to add new payment 
	methods without touching the core logic.
   -The purpose of the Strategy Pattern is to 
     define a family of algorithms (or 
     strategies) that can be used 
     interchangeably. Instead of hardcoding 
     specific behavior into a class, different 
     strategies are encapsulated in separate 
     classes, allowing the behavior to be 
     selected at runtime.
   -Here is how it works:
      -Strategy Interface (PaymentStrategy)
        This interface defines the common 
        method pay(amount) that all concrete 
        strategies must implement. It ensures 
        that all payment methods share the 
        same contract.

     -Concrete Strategies (PayPalStrategy, 
       CreditCardStrategy):
       These classes implement the 
       PaymentStrategy interface and provide 
       the specific behavior for how the 
       payment is processed. For example, 
       PayPalStrategy handles payments using 
       PayPal, while CreditCardStrategy 
       handles payments using a credit card.

     -Context Class (PaymentContext):
       The context class (PaymentContext) is 
       responsible for interacting with the 
       chosen strategy. It accepts a 
       PaymentStrategy object as a parameter 
       and uses it to process the payment 
       without knowing the details of how the 
       payment is handled. This decouples the 
       client code from the specific strategies.
	

      Use Cases:
      ——————-
   -Dynamic Behavior Selection. When you 
     need to switch between different 
     algorithms or behaviors at runtime, the 
     strategy pattern is useful. For example, 
     choosing different payment methods (like 
     PayPal or credit card) based on the 
     user’s preference.
   -Avoiding Conditional Logic. Instead of 
     using complex if-else or switch 
     statements to determine the behavior, 
     the strategy pattern encapsulates these 
     behaviors into separate classes, making 
     the code more maintainable and flexible.
   -The big benefit of the Strategy Pattern is
     that it promotes the open/closed 
     principle (the O in the SOLID principles). 
     It is open for extension in that new 
     strategies can be added without 
     changing the existing code in the 
     PaymentContext. The pattern allows for 
     flexibility by letting you swap out 
     behavior dynamically while keeping the 
     code structure clean and modular.




        TEMPLATE METHOD PATTERN
        ———————————————-
    The Template Method Pattern defines the 
  skeleton of an algorithm in a base class, 
  while allowing subclasses to override 
  specific steps of the algorithm without 
  changing its structure. It is called the 
  Template Method because it provides a 
  template for the overall process, with some 
  steps left open for customization by 
  subclasses.

  JavaScript Example:
   ———————-
    // Base class
    class MealPreparation {
  	prepareMeal() {
    		this.boilWater();
    		this.cook(); // this will be different in each subclass
    		this.serve();
  	}

  	boilWater() {
    		console.log("Boiling water");
  	}

  	serve() {
    		console.log("Serving the meal");
  	}

  	cook() {
    		throw new Error("You must override the cook method");
  	}
    }

    // Concrete class: Pasta
    class PastaMeal extends MealPreparation {
  		cook() {
    			console.log("Cooking pasta");
  		}
    }

    // Concrete class: Rice
    class RiceMeal extends MealPreparation {
  		cook() {
    			console.log("Cooking rice");
 		}
    }


// Usage
const pasta = new PastaMeal();
pasta.prepareMeal();
// Output: Boiling water, Cooking pasta, Serving the meal

const rice = new RiceMeal();
rice.prepareMeal();
// Output: Boiling water, Cooking rice, Serving the meal



   The output in the console will be: 

	Boiling water
	Cooking pasta
	Serving the meal
	Boiling water
	Cooking rice
	Serving the meal



    Key points
    —————-
   -The purpose of the template design 
     pattern is that it allows you define the 
     framework of an algorithm in a base 
     class, leaving the details of specific steps
     to be implemented by subclasses.
   -Here is How It Works:

	-The Template Method is a predefined “recipe” (a sequence of steps).
	-Some steps are shared (boiling, serving), while others (cooking) are left 
		open so that each type of meal (Pasta or Rice) can define them.
	-It ensures a consistent structure while allowing flexibility in specific 
		steps.

	Template Method (prepareMeal):
        This method is defined in the base 
         class (MealPreparation) where the 
         algorithm’s structure is defined. Here,  
         some steps (like boilWater and serve) 
         are common, while others (like cook) 
         are left abstract for subclasses to 
         implement.

     There are concrete Classes (PastaMeal, 
     RiceMeal):
     These classes implement the step (cook) 
     in their own way, allowing flexibility while 
     still following the overall process defined 
     by the base class.
	

      Use Case:
      ——————
    The Template Method Pattern is useful 
  when multiple classes share a similar 
  process but require customization for 
  specific steps. In the example, both pasta 
  and rice meals follow the same process but 
  differ in the cooking step.




        COMMAND PATTERN
        ———————————-
    The Command Pattern turns a request 
  into an object, allowing the 
  parameterization of clients with queues, 
  requests, or logs. It is called Command 
  because each object represents an 
  operation to be executed, stored, or 
  undone.

    JavaScript Example:
    ———————-
    // Command interface
    class Command {
  		execute() {
    			throw new Error("Execute method should be implemented");
  		}
    }

    // Receiver class
	class Light {
  		turnOn() {
    			console.log("Light is ON");
  		}

  		turnOff() {
    			console.log("Light is OFF");
  		}
    }

    // Concrete command: turn light on
    class LightOnCommand extends Command {
    		constructor(light) {
    			super();
    			this.light = light;
    		}

    		execute() {
    			this.light.turnOn();
    		}
    }

    // Concrete command: turn light off
    class LightOffCommand extends Command {
  		constructor(light) {
    			super();
    			this.light = light;
  		}

  		execute() {
    			this.light.turnOff();
  		}
    }

    // Invoker class
    class RemoteControl {
  		setCommand(command) {
    			this.command = command;
  		}

  		pressButton() {
    			this.command.execute();
  		}
    }

    // Client code
    const light = new Light();
    const remote = new RemoteControl();

    remote.setCommand(new LightOnCommand(light));
    remote.pressButton(); // Output: Light is ON

    remote.setCommand(new LightOffCommand(light));
    remote.pressButton(); // Output: Light is OFF

The output of this code in the console will be:
	
	Light is ON
	Light is OFF



       Key points
       —————-
  Purpose of the Command Pattern:
This pattern encapsulates requests as objects, allowing you to parameterize methods, delay execution, and queue operations. It decouples the invoker (client) from the object that performs the actual work (receiver).
	
   How It Works:
   ———————
  -Think of the command as a wrapper around an action.
  -Each Command holds a receiver (like Light) and tells it what to do (turn 
		on or off).
  -The RemoteControl is just a trigger—it doesn’t know how the light 
		works.
  -This pattern is great when you want to schedule, queue, or undo 
		operations.

  -Command Interface:
    -The Command interface defines a 
      method (execute()) that will be 
      implemented by different commands.
  Concrete Commands 
    -LightOnCommand, 
    -LightOffCommand):

       These command classes accept a 
        receiver class Light. This makes sense 
        because their command action is all 
        about light. 
       Through their execute() methods, these 
        classes indirectly implement the 
        specific actions (turnOn, turnOff) by 
        delegating the work to the Light 
        receiver class which is the class having 
        these turnOn() and turnOff() methods. 
        Which of them is called will depend on 
        the command interface-so it will be 
        turnOn() or turnOff() for 
        LightOnCommand and 
        LightOffCommand respectively.

  Invoker (RemoteControl):
      The invoker class stores a command and 
    executes it when the client presses a 
    button. The invoker doesn’t know the 
    details of what the command does, it 
    simply executes the execute() method on 
    the command.
      It is called the invoker because the 
    execution of the command starts from it. 
    It all starts from its PressButton() method. 
    It then runs the execute() method on the 
    command which it had already stored in 
    its ‘$command’ property.
	
  Use Case:
  —————-
    The Command Pattern is useful for 
  implementing undo/redo functionality, 
  executing commands in sequence, or 
  logging operations for future execution. In 
  the example, a remote control can switch 
  between different commands (turning the 
  light on or off) without knowing how each 
  command works internally.





        ITERATOR PATTERN
        ——————————-
    The Iterator Pattern provides a way to 
  access the elements of a collection (like an 
  array or list) sequentially without exposing 
  the underlying structure. It is called Iterator 
  because it “iterates” over a collection one 
  element at a time.

      JavaScript Example:
     ———————-

// Collection class
class BookCollection {
  	constructor() {
    		this.books = [];
  	}

  	addBook(book) {
    		this.books.push(book);
  	}

  	getIterator() {
    		return new BookIterator(this.books);
  	}
}

// Iterator class
class BookIterator {
  	constructor(books) {
    		this.books = books;
    		this.index = 0;
  	}

  	hasNext() {
    		return this.index < this.books.length;
  	}

  	next() {
    		return this.books[this.index++];
  	}
}

// Client usage
const collection = new BookCollection();
collection.addBook("Design Patterns");
collection.addBook("Clean Code");

const iterator = collection.getIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}


The output in the console will be:

	Design Patterns
	Clean Code


     Key points
    -—————-
    Purpose of the Iterator Pattern:
  This pattern allows clients to traverse 
  through the elements of a collection 
  without needing to know the underlying 
  structure of the collection. It provides a 
  standardised way to access and iterate 
  over data.
	
    How It Works:
    ———————
  -This pattern helps you walk through a collection one item at a time without 
	knowing how that collection is built internally.
  -The BookIterator takes the book list and lets us use hasNext() and next() to 
	access each book.
  -It’s like a movie queue: instead of grabbing all at once, you go through them 
	in order.

  Collection Interface (Collection):
     -This defines a method (getIterator()) to 
       return an iterator for the collection. 
     -Concrete collection classes (like 
       BookCollection) implement this method.
  Iterator Class (BookIterator):
    -The BookIterator class is a class that 
      stands on its own and is used by the 
      BookCollection classes (via their 
      getIterator() methods to which they will 
      pass their array of items-be it books or 
      anything else). It defines methods 
      like hasNext() and next() to access 
      elements in the collection one by one.

    Client Code:
    ——————-
    The client doesn’t need to know how the 
  BookCollection stores its books. It just uses 
  the iterator to access the books 
  sequentially using hasNext() and next().
	
    Use Case:
    ——————
    The Iterator Pattern is useful when you 
  need to traverse a collection without 
  exposing its internal details. It is especially 
  helpful when working with custom data 
  structures or complex collections. In the 
  example, the BookIterator provides a 
  simple way to loop through a collection of 
  books without directly accessing the array.