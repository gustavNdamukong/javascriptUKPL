
//————————————————————//
	CHAPTER 11 - DATA STRUCTURES
//————————————————————//

    
  Intro
  Data Structures and Data Types
  List of data structures
     -Arrays
     -Linked lists
     -Stacks 
     -Queues
     -Tuples
     -Dictionaries (Maps/HashMaps)
     -Sets
     -Structs
     -Trees (Binary Trees, AVL Trees, etc)
     -Collections



    The topic of data structures is like an 
  extended study of data types. When we 
  studied data types; we learned about the 
  two groups that make them: primitive and 
  reference types. Data structures are 
  closely related to reference types in 
  programming because they often deal with   
  collections of data and more complex data 
  management, as opposed to the simple, 
  single-value nature of primitive types.

 Data Structures and Data Types
 —————————-
    We know that where programming 
  languages are similar when it comes to 
  handling data types is in the fact that they 
  all have the core concepts of primitive and 
  reference types. They only differ in the way 
  they implement these concepts.
    Before we introduce data structures, let 
  us briefly remind ourselves of what 
  primitive types are again. Primitive types 
  are the simplest, indivisible data types that 
  store single values. Examples are integers, 
  booleans, and characters. They don't 
  involve any structure or organization 
  beyond the basic storage of a single piece 
  of data. There is the other group known as 
  reference types, which are much closer to 
  data structures. Let us see why.
    Data structures are ways of organizing 
  and storing data so that they can be 
  accessed and modified efficiently. Since 
  data structures often involve collections of 
  data (e.g., lists, trees, hash tables), they 
  need to store references to multiple pieces 
  of data, rather than the actual values 
  themselves. This is why data structures are 
  typically implemented using reference 
  types. Next, let us look at how data 
  structures use reference types.
    Reference types hold the address (or 
  reference) to the actual data in memory. 
  When you work with data structures like 
  arrays, lists, or dictionaries, you're dealing 
  with references to elements, not the actual 
  values themselves.
    Mutable or Immutable. Many data 
  structures allow you to change (mutate) 
  the data they contain. This is possible 
  because reference types can point to new 
  or modified data without changing the 
  variable itself. For instance, in a list, you 
  can update individual elements without 
  changing the whole structure. Also, with 
  classes, you can change the property of an 
  object without changing that data on the 
  class where the object came from.
    Some examples of data structures are:
        -Arrays/Lists:
           They are collections of items stored in 
            contiguous memory. Each element in 
            the array is accessed through its 
            reference (i.e., the index points to the 
            location of the data).
        -Dictionaries/Maps:
            They store key-value pairs where 
             each value is referenced by a key. 
             The actual values and keys are 
             reference types.
        -Trees:
             Trees are hierarchical structures 
             where each node references its child 
             nodes, creating a complex network 
             of relationships between the data.
        -Stacks/Queues:
             These are collections of data 
             organised in a specific order (e.g., 
             Last In, First Out for stacks). Each 
             item in the structure is referenced, 
             making it easy to manage more 
             complex data flows.

    So, while primitive types represent single,     
  indivisible data points (e.g., an integer or a 
  character), data structures are complex 
  ways of organizing multiple pieces of data 
  and are built using reference types, 
  because they need to handle multiple 
  values, often of varying or unknown sizes, 
  efficiently. In essence, data structures rely 
  on reference types to manage and 
  manipulate collections of data, while 
  primitive types serve as the fundamental 
  building blocks for individual data 
  elements.


      List of data structures
      ———————————-
    With that said, we are ready to study the 
  different data structures. There are some 
  things to keep in mind. Some data 
  structures exist in certain languages but do 
  not exist in others. For example, C and Go 
  have structs, while JavaScript has none, and 
  Python has a real tuple type where JavaScript 
  has to make do with an array. 
    Some data structures come built into 
  a programming language, while in other 
  languages, you would have to create them 
  yourself in code. 
    When studying each data structure, make 
  sure with each, you are studying how the 
  individual language you are learning 
  handles that in memory, and that you are
  understanding the weaknesses and 
  strengths of the data structure. This will 
  help you know which one to use in which 
  scenario when solving problems in 
  programming.
    We will proceed with the list of data 
  structures by listing each one and 
  examining everything about it from which 
  language uses it, how is it implemented, 
  what kind of problems it can solve, what 
  limitations it has etc. We will look at only 
  the most popular structures. With this 
  guidance, you will be able to pick any data 
  structure from any new language you are 
  learning and master them, if we have not 
  covered them here already.
    All the code examples here are in
  JavaScript. For each structure I will say
  plainly whether JavaScript has it built in or
  not. Where it does not, the code is there to
  show you how the structure behaves, built
  out of the pieces JavaScript does give you,
  rather than something the language hands
  you ready made. I will also say where each
  one actually turns up in real JavaScript
  work, because knowing a structure exists is
  only half of it; knowing when you would
  reach for it is the other half.


           ARRAYS
           ————
    Arrays are a collection of elements, stored
  one after another and reached by an index.
  They provide quick access to any element by
  its position, and are a foundational structure
  in most programming languages.

   In JavaScript: built in. Arrays are part of the
         language and you have been using them
         since Chapter 3.
   Implementation: elements held in order and
         reached by index, counting from 0.
   Problems it solves: efficient storage and
         access of a list of values.
   Limitations: in many languages an array has a
         fixed size. JavaScript arrays grow and
         shrink freely, which is convenient, but it
         also means an array can hold a mixture
         of types, which other languages would
         not allow.

       // Creating an array
       let arr = [1, 2, 3, 4];

       arr.push(5);        // add to the end
       console.log(arr[0]); // 1
       console.log(arr.length); // 5

   Used in JavaScript for: almost everything.
         Lists of items, results from an API,
         collections of DOM elements, and as
         the building block for several of the
         structures below.


          LINKED LISTS
          ——————————

    Linked lists are made of nodes, where each
  node holds a value and a pointer to the next
  node. They allow easy insertion and removal
  anywhere in the list, but you have to walk
  through them from the start to find anything.

     In JavaScript: NOT built in. There is no
           linked list type, so you build one
           yourself out of objects or classes. The
           code below is a demonstration of how
           the structure works, not something the
           language hands you.
     Implementation: a series of nodes, each
           pointing to the next.
     Problems it solves: efficient insertion and
           deletion, especially in the middle.
     Limitations: slower access than an array,
           because you must traverse the nodes
           to reach one.

        // A node, built by hand
        class Node {
            constructor(data) {
                this.data = data;
                this.next = null;
            }
        }

        // Joining three of them into a chain
        let first = new Node(10);
        first.next = new Node(20);
        first.next.next = new Node(30);

        // Walking the chain from the start
        let current = first;

        while (current !== null) {
            console.log(current.data);
            current = current.next;
        }

        // Output: 10, 20, 30, each on its own line

     Used in JavaScript for: very little, in
           practice. An ordinary array does the
           same job with less effort, so you will
           rarely build one. It is worth
           understanding because it comes up in
           technical interviews, and because the
           idea of one thing pointing to the next
           turns up everywhere, including in the
           tree structure further down.


          STACKS
          ————-
    Stacks are LIFO (Last In, First Out)
  structures, meaning the last item added is
  the first one removed. Think of a stack of
  plates: you take from the top.

     In JavaScript: no separate stack type, but
           you do not need one. An ordinary array
           already behaves as a stack, because
           push() adds to the end and pop() takes
           from the end.
     Implementation: usually an array, sometimes
           a linked list.
     Problems it solves: undo operations,
           managing function calls, and
           backtracking.
     Limitations: restricted access, since you
            can only reach the top item.

     // A stack, using a plain array
     let stack = [];

     stack.push(1);       // push
     stack.push(2);
     console.log(stack.pop());  // 2 - last in, first out
     console.log(stack);        // [1]

     Used in JavaScript for: undo and redo
           features, "go back" navigation, and
           checking that brackets or tags are
           properly nested. JavaScript itself uses
           one internally, the call stack, which
           keeps track of which function called
           which - it is the thing you see listed
           when an error is thrown.


             QUEUES
             —————
    Queues are FIFO (First In, First Out)
  structures, meaning the first item added is
  the first one removed. Think of a queue at a
  till: first come, first served.

      In JavaScript: no separate queue type, but
             an array does the job. push() adds to
             the back and shift() takes from the
             front.
      Implementation: usually an array or a
             linked list.
      Problems it solves: handling tasks in the
             order they arrived, such as print jobs
             or scheduled work.
      Limitations: restricted access, since you
              can only reach the front and the
              back. Also, shift() has to renumber
              every remaining element, so on a
              very large array it is slower than it
              looks.

      // A queue, using a plain array
      let queue = [];

      queue.push("first");    // enqueue
      queue.push("second");
      console.log(queue.shift());  // "first" - first in, first out
      console.log(queue);          // ["second"]

      Used in JavaScript for: anything that must
             happen in order - a list of jobs
             waiting to run, messages waiting to
             be sent, or walking through a tree
             level by level. JavaScript's own event
             loop works on a queue, which is why
             things you schedule run in the order
             you scheduled them.


             TUPLES
             ————-
    Tuples are ordered collections of a fixed
  size, often holding values of different types,
  which cannot be changed once created.

        In JavaScript: NOT built in. There is no
               tuple type, so an array is used
               instead. The code below is a
               demonstration of the idea rather
               than a real tuple, because nothing
               stops you changing an array
               afterwards - unless you freeze it.
       Implementation: a small, fixed group of
               related values.
       Problems it solves: returning more than
              one value from a function, or
              representing a fixed record.
       Limitations: in languages that have real
              tuples they cannot be modified at
              all. JavaScript only gets close to
              that with Object.freeze().

           // An array standing in for a tuple
           let tup = [1, "apple", 3.14];

           // Pulling the values back out, using
           // destructuring from Chapter 17
           let [count, fruit, price] = tup;
           console.log(fruit);   // "apple"

           // Freezing it, to get closer to a
           // real tuple
           const frozen = Object.freeze([1, "apple"]);
           frozen[0] = 99;            // silently ignored
           console.log(frozen[0]);    // still 1

       Used in JavaScript for: returning several
              values from one function. You will
              meet this constantly in modern
              JavaScript, where a function hands
              back a small array and the caller
              unpacks it in one line.


      Dictionaries (Maps/HashMaps)
      ————————————————
    Dictionaries, also called maps or hash maps,
  store data as key-value pairs. They offer fast
  lookup, insertion and deletion by key.

        In JavaScript: built in, and in two forms.
               A plain object gives you key-value
               pairs with string keys, and the Map
               type gives you the same thing with
               keys of any type at all.
        Implementation: typically a hash table
               under the surface.
        Problems it solves: fast retrieval of a
               value when you know its key. Useful
               for lookups, caching and indexing.
        Limitations: keys must be unique. With a
               plain object, keys are always text,
               so a number key quietly becomes a
               string.

      // As a plain object
      let person = { name: "Alice", age: 30 };
      console.log(person.name);      // "Alice"

      // As a Map, which allows any type of key
      let scores = new Map();
      scores.set("alice", 10);
      scores.set(42, "the answer");

      console.log(scores.get("alice"));  // 10
      console.log(scores.size);          // 2

        Used in JavaScript for: settings and
               configuration, counting how often
               something appears, caching results
               so they are not worked out twice,
               and any time you want to look
               something up by name rather than
               by position. Reach for a Map when
               your keys are not strings, or when
               you need to know how many entries
               there are.


                  Sets
                ————
    Sets are collections of unique values. Adding
  something twice has no effect the second
  time.

        In JavaScript: built in, as the Set type.
        Implementation: typically backed by a
               hash table.
        Problems it solves: checking quickly
               whether something is present, and
               removing duplicates.
        Limitations: values must be unique, and
               you cannot reach an item by index
               the way you can in an array.

        // A Set
        let mySet = new Set([1, 2, 3, 4]);

        mySet.add(4);       // already there, ignored
        console.log(mySet.size);       // 4
        console.log(mySet.has(3));     // true

        // The neatest use: removing duplicates
        // from an array
        let withDuplicates = [1, 2, 2, 3, 3, 3];
        let unique = [...new Set(withDuplicates)];
        console.log(unique);   // [1, 2, 3]

        Used in JavaScript for: stripping
               duplicates out of a list, which is
               the one-line trick shown above, and
               keeping track of things you have
               already seen or already processed.


                   Structs
               ———————
    Structs are user-defined types that group
  several related pieces of data together into
  one record.

        In JavaScript: NOT built in. There is no
               struct keyword. JavaScript uses an
               object literal, or a class when you
               want the same shape made
               repeatedly. The code below is
               therefore the JavaScript equivalent
               of a struct rather than a struct
               itself.
        Implementation: a group of named fields
              held together as one value.
        Problems it solves: keeping related data
              together as a single record instead
              of loose separate variables.
        Limitations: in languages like C and Go a
              struct holds only data, with no
              methods. A JavaScript object has no
              such restriction, which makes it more
              flexible but also less strict.

        // The JavaScript equivalent: an object
        // literal
        let person = {
            name: "Alice",
            age: 30
        };

        // Or a class, when you need to make many
        // of the same shape
        class Person {
            constructor(name, age) {
                this.name = name;
                this.age = age;
            }
        }

        let alice = new Person("Alice", 30);
        console.log(alice.name);   // "Alice"

        Used in JavaScript for: any time you have
              several facts about one thing and
              want to keep them together - a user,
              a product, a setting. This is so
              ordinary in JavaScript that you will
              do it constantly without ever calling
              it a struct.


         Trees (Binary Trees, AVL Trees, etc.)
         ——————————————————
    Trees are hierarchical structures that store
  data in nodes, where each node has child
  nodes. They suit anything shaped like a family
  tree or a folder structure.

        In JavaScript: NOT built in as a type, but
               you meet trees constantly all the
               same. You build your own out of
               objects or classes, as below.
        Implementation: nodes that point to child
               nodes.
        Problems it solves: efficient searching
               and sorting of hierarchical data.
        Limitations: a tree can become
               lopsided, which makes searching it
               slower.

         // A binary tree node, built by hand
         class Node {
             constructor(data) {
                 this.data = data;
                 this.left = null;
                 this.right = null;
             }
         }

         // Example usage
         let root = new Node(10);
         root.left = new Node(5);
         root.right = new Node(20);

         console.log(root.left.data);   // 5

        Used in JavaScript for: more than you
               might expect. The DOM - the
               structure of the web page itself,
               which we come to in Chapter 15 - is
               a tree, where every element has a
               parent and may have children. Any
               nested JSON you get back from an
               API is a tree too. So although you
               will rarely build one from scratch,
               you will spend a great deal of time
               walking through them.

        In the example above, we created a simple
      binary tree with a root node and two
      children, left and right. This basic structure
      can be extended to support more complex
      tree operations such as traversal, insertion
      and deletion.


                COLLECTIONS
                ———————-
    Collections are a broad category rather than
  a single structure. The word covers any
  structure that groups multiple values into one
  thing and offers ways to add, remove and
  modify them.

         In JavaScript: built in. Array, Map, Set,
                WeakMap and WeakSet are all
                collections. You have met the first
                three already in this chapter.
         Implementation: each collection type
                stores its data differently, with its
                own strengths.
         Problems it solves: storing, retrieving
                and manipulating several values in
                a structured way.
         Limitations: each type has its own. A Set
                holds only unique values, an array
                is ordered but slower to search, a
                Map keeps insertion order but
                takes more memory than a plain
                object.

           // The three collections you will use most
           let arr = [1, 2, 3];      // Array
           arr.push(4);

           let myMap = new Map();    // Map
           myMap.set("key", "value");

           let mySet = new Set([1, 2, 3]);  // Set
           mySet.add(4);

           console.log(arr.length, myMap.size, mySet.size);
           // Output: 4 1 4

         Used in JavaScript for: choosing the right
                one for the job. Use an array for an
                ordered list, a Set when every value
                must be unique, and a Map when
                you want to look things up by a key
                that is not a string.
