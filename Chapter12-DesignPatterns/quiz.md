QUIZ — Chapter 12: Design Patterns
==================================

This page contains the Q & A (questions and answers) for this chapter — Chapter 12: Design Patterns. Work through
these after reading the chapter, while the material is fresh — recall practice is what cements
new knowledge into long-term memory.


1) What is the build() function in JavaScript?

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
