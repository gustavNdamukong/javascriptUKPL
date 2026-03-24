
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
  two groups that make them-primitive and 
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
  reference types which much closer to data 
  structures. Let us see why.
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
  not exist in others. For example, 
  dictionaries exist in Python but not in PHP. 
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
    We will proceed with the list if data 
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
    The focus of code examples will be in 
  Python, JavaScript and PHP, except that 
  data structure does not exist in any of 
  these three languages-in which case i will 
  give a code example in the relevant 
  language.


           ARRAYS
           ————
    Arrays are a collection of elements of the 
  same data type, stored in contiguous 
  memory locations. They provide quick 
  access to elements using an index and are 
  a foundational structure in most 
  programming languages.
  
   Languages: PHP, JavaScript, Python
     Implementation: Stored in contiguous 
         memory, accessed by index.
   Problems it solves: Efficient storage and 
         access of fixed-size data collections.
   Limitations: Fixed size in some languages 
         (e.g., arrays in JavaScript can be 
         resized dynamically).

       Python example:
           # Creating an array (list in Python)
           arr = [1, 2, 3, 4]

       JavaScript example:
           // Creating an array in JavaScript
           let arr = [1, 2, 3, 4];

       PHP example:
           // Creating an array in PHP
          $arr = array(1, 2, 3, 4);
  

  
          LINKED LISTS

    Linked lists are data structures consisting 
  of nodes where each node contains a 
  value and a pointer to the next node. They 
  allow dynamic resizing but require 
  traversal to access elements.
  
     Languages: Python, PHP (manually 
           implemented), JavaScript (manually 
           implemented)
     Implementation: A series of nodes, where 
           each node points to the next.
     Problems it solves: Efficient insertion and 
           deletion, especially in the middle of 
           the list.
      Limitations: Slower access compared to 
            arrays due to the need to traverse 
            nodes.

         Python example
         ———————
        # Simple linked list node class in Python
        class Node:
               def __init__(self, data):
                       self.data = data
                       self.next = Non

        JavaScript example
        —————————-
        // Linked list implementation in 
        // JavaScript
        class Node {
                   constructor(data) {
                          this.data = data;
                          this.next = null;
                   }
          }
 

        PHP example
        ———————
        // Linked list implementation in PHP
        class Node {
            public $data;
            public $next;

            public function __construct($data)      
            {
                     $this->data = $data;
                     $this->next = null;
             }
        }
  


          STACKS
          ————-
    Stacks are LIFO (Last In, First Out) data
  structures, meaning that the last element 
  added is the first to be removed. They are 
  useful for operations such as undo 
  functionality or managing function calls in 
  recursion.
  
     Languages: PHP, JavaScript, Python
     Implementation: Can be implemented 
           using arrays or linked lists.
     Problems it solves: Undo operations, 
           function call management, and 
           backtracking.
     Limitations: Restricted access (only the 
            top element can be accessed).

     Python example
     ————————-
     # Stack implemented using list in Python
     stack = []
     stack.append(1)  # Push
     stack.pop()      # Pop
  

    JavaScript example
    ——————————-
    // Stack using an array in JavaScript
    let stack = [];
    stack.push(1);    // Push
    stack.pop();      // Pop

    PHP example
    ———————
    // Stack using an array in PHP
    $stack = array();
    array_push($stack, 1);  // Push
    array_pop($stack);      // Pop
  

             QUEUES
             —————

    Queues are FIFO (First In, First Out) data 
  structures, meaning that the first element 
  added is the first to be removed. They are 
  commonly used for task scheduling and 
  handling ordered data processing.
  
      Languages: Python, PHP, JavaScript
      Implementation: Implemented using 
             arrays or linked lists.
      Problems it solves: Ideal for handling 
             tasks in the order they are added 
             (e.g., print jobs, task scheduling).
      Limitations: Restricted access (only front 
              and rear elements can be 
              accessed).

      Python example
      ————————-
      # Queue implemented using deque in     
      # Python
      from collections import deque
      queue = deque()
      queue.append(1)  # Enqueue
      queue.popleft()  # Dequeue
  

      JavaScript example
      ——————————
      // Queue implemented using array in   
      // JavaScript
      let queue = [];
      queue.push(1);    // Enqueue
      queue.shift();    // Dequeue
  

      PHP example
      ———————-
      // Queue using an array in PHP
      $queue = array();
      array_push($queue, 1);  // Enqueue
      array_shift($queue);    // Dequeue
  


             TUPLES
             ————-

    Tuples are immutable, ordered collections 
  of elements, often of different types. They 
  are useful for returning multiple values 
  from functions or creating fixed records of 
  data.
  
        Languages: Python (native tuples), 
               JavaScript, PHP (as array-like 
               structures)
       Implementation: Immutable collections, 
               often used for storing multiple 
               related values.
       Problems it solves: Useful for returning 
              multiple values from functions, or 
              representing fixed groups of values.
       Limitations: Immutable, meaning you 
              cannot modify them once created.

       Python example:
       ————————-
            # Tuple in Python
            tup = (1, "apple", 3.14)

      JavaScript example:
      —————————
           // No native tuple in JavaScript, arrays 
           // can be used for similar purposes
           let tup = [1, "apple", 3.14];
  
      PHP example:
      ———————-
           // PHP doesn’t have native tuples, but 
           // you can use arrays
           $tuple = array(1, 'apple', 3.14);



      Dictionaries (Maps/HashMaps)
      ————————————————
    Dictionaries, or hash maps, store data in 
  key-value pairs. They offer fast lookup, 
  insertion, and deletion by key and are used 
  for tasks such as caching or implementing 
  key-value stores.
  
        Languages: Python, PHP, JavaScript
        Implementation: Typically implemented 
               with hash tables.
        Problems it solves: Fast data retrieval 
               based on unique keys, useful for 
               tasks like lookups, caching, and 
               indexing.
        Limitations: Keys must be unique, 
               because hash collisions can affect 
               performance.

        Python example:
       ————————-
       # Dictionary in Python
       my_dict = {'name': 'Alice', 'age': 30}
  
      JavaScript example:
      ——————————-
      // Object as dictionary in JavaScript
      let my_dict = {'name': 'Alice', 'age': 30};
  

      PHP example:
      ———————-
      // Associative array in PHP (like a 
      // dictionary)
      $my_dict = array('name' => 'Alice', 'age'   
           => 30);
  


                  Sets
                ————
    Sets are unordered collections of unique
  elements. They are commonly used for 
  removing duplicates or performing set 
  operations like union or intersection.
  
        Languages: Python, JavaScript, PHP   
               (array can be used)
        Implementation: Typically backed by a 
               hash table or balanced tree.
        Problems it solves: Efficient 
               membership testing, removing 
               duplicates.
        Limitations: Unordered and doesn’t 
               allow duplicate values.

        Python example:
               # Set in Python
               my_set = {1, 2, 3, 4}
  
        JavaScript example:
               // Set in JavaScript
              let my_set = new Set([1, 2, 3, 4]);
  
        PHP example:
             // No native set type in PHP, but 
             // arrays can be used
             $my_set = array_unique(array(1, 2, 
                   3, 4));
  

                   Structs
               ———————
    Structs are user-defined data types that 
  group different types of data together. 
  They are commonly used in languages like   
  C and Go to create records of related 
  fields.
  
        Languages: C, Go
        Implementation: A collection of fields 
              that group data types together.
        Problems it solves: Useful for grouping 
              related data like a simple record.
        Limitations: No built-in methods like 
              objects in OOP languages.

        Go example:
               // Struct in Go
               type Person struct {
                    name string
                    age  int
               }
  


         Trees (Binary Trees, AVL Trees, etc.)
         —————————————————— 
    Trees are hierarchical data structures 
  that store data in nodes, with each node 
  having child nodes. They are useful for 
  representing hierarchical data like file 
  systems or organizational structures.
  
        Languages: Python, PHP, JavaScript
        Implementation: Nodes that point to 
               child nodes.
        Problems it solves: Efficient searching 
               and sorting of hierarchical data, 
               used in things like file systems or 
               databases.
         Limitations: Trees can become 
               unbalanced, leading to inefficient 
               operations.

         Python example:
                # Binary tree node in Python
                class Node:
                        def __init__(self, data):
                               self.data = data
                               self.left = None
                               self.right = None

                # Example usage
                root = Node(10)
                root.left = Node(5)
                root.right = Node(20)
  

         JavaScript example:
                // Binary tree node in JavaScript
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

 
        PHP example
              // Binary tree node in PHP
              class Node {
                      public $data;
                      public $left;
                      public $right;

                  public function  
                      __construct($data) {
                              $this->data = $data;
                              $this->left = null;
                              $this->right = null;
                      }
                }

           // Example usage
           $root = new Node(10);
           $root->left = new Node(5);
           $root->right = new Node(20);

        In these examples, we created a simple 
      binary tree with a root node and two 
      children (left and right). This basic 
      structure can be extended to support 
      more complex tree operations such as 
      traversal, insertion, and deletion.



                COLLECTIONS
                ———————-
    Collections are a broad category of data 
  structures that provide a way to group 
  multiple values into a single entity. They 
  abstract away how the data is stored and 
  offer various operations for adding, 
  removing, or modifying the data. They can 
  store data of the same type (homogeneous 
  collections) or different types 
  (heterogeneous collections).

         Languages: Python, JavaScript, PHP 
                (Collections can be implemented 
                using arrays, sets, dictionaries, 
                etc.)
         Implementation: Collections can be 
                implemented as arrays, 
                dictionaries, sets, and other 
                structures, each with specific 
                behaviors and performance 
                characteristics.
         Problems it solves: Efficient storage, 
                retrieval, and manipulation of 
                multiple elements in a structured 
                way.
         Limitations: Depending on the 
                collection type, some may impose 
                limitations like immutability, lack of 
                random access, or performance 
                constraints for certain operations.


        Python example:
              # Collections in Python (using the 
              # collections module)
              from collections import deque, 
                   defaultdict

              # Deque (Double-ended queue) as 
              # a collection
              my_deque = deque([1, 2, 3])

              # Add to the right
              my_deque.append(4) 

              # Add to the left
              my_deque.appendleft(0) 

              # Defaultdict as a collection that   
              # defaults to list
              my_dict = defaultdict(list)
              my_dict['key'].append('value')

        JavaScript example:
        ——————————
           // Collections in JavaScript (using 
           // Array, Map, Set)
           let arr = [1, 2, 3];  // Array collection
          arr.push(4);

          // Map collection
          let myMap = new Map(); 
          myMap.set('key', 'value');

          // Set collection
          let mySet = new Set([1, 2, 3]); 
          mySet.add(4);


      PHP example:
      ———————-
          // Collections in PHP (using arrays,        
          // collections class from Laravel for 
          // example. An Array collection
         $my_array = array(1, 2, 3); 
         array_push($my_array, 4);

          // Associative array as a collection
          $my_assoc_array = 
                          array('key' => 'value'); 

          // Using the Laravel Collections class 
          // (if using Laravel)
          use Illuminate\Support\Collection;

          $collection = collect([1, 2, 3]);
          $collection->push(4);

          In summary, Collections provide a 
          flexible way to manage data. In    
          Python, the ‘collections’ module offers 
          specialized data structures like 
          ‘deque’ and ‘defaultdict’. In JavaScript, 
          collections can be implemented using 
          arrays, maps, or sets, depending on 
          the need. PHP provides arrays, and 
          frameworks like Laravel offer more 
          robust collection handling. 

     Limitations: Some collections like sets 
           only store unique values, while others, 
           like arrays, have ordered but slower 
           search performance.