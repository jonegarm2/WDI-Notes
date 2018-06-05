![](https://i.imgur.com/yxikhiY.jpg
)
# JavaScript Functions & Scope

| Learning Objectives - SWBAT |
| :--- |
| Understand the Use Case of Functions |
| Define Functions With & Without Parameters |
| Call Functions With & Without Arguments |
| Describe Scope |

## Roadmap
1. Why Functions Anyway? (5 mins)
2. Defining and Calling Functions (40 mins)
3. Parameters (15 mins)
4. Scope (15 mins)
5. Further Study

### 1. Why Functions Anyway?<small> (5 mins)</small>

The best way to understand why functions exist in programming is to imagine what programming would be like **without** functions...

Without functions:

- ...we would not be able to break up our programs into manageable chunks - our code would be a huge monolithic scroll. As developers, we solve complex problems with complex programs; and as humans, we tackle complexity by breaking it down into more manageable pieces.

- ...if we needed to execute the same block of code more than once (outside of a loop), we would have to write the same code again and again. In programming, there's a key principle known as **DRY** - Don't Repeat Yourself!

- ...we could not easily find a section of code that needs debugging and/or modification.

Coding without functions would be unproductive, error-prone, tedious; nay, **impossible**!

#### So, what is a function?

A function is a group of statements that can be called by our code, including from within other functions, as many times as necessary.

Typically, a JavaScript **program** consists of a collection of functions.  These functions typically get called in response to events being triggered due to user interaction, timers timing out, etc.  Also, it is likely that a program will call a "main" or "initialize" function upon the script being loaded to "kickoff" the application.

**If ALL of the program's code was within functions and there weren't any event listeners or initial code being invoked, what would happen?**

### 2. Defining and Calling Functions<small> (40 mins)</small>

Having endured the pre-work, you should be somewhat familiar with functions.

#### Defining Functions

There are two primary ways to define functions in JS:

**Function Declaration**

```js
function sayHello(name) {
    console.log('Hello ' + name + '!');
}
```

**Function Expression**

```js
var sayHello = function(name) {
    console.log('Hello ' + name + '!');
};
```

**? - What similarities between the two approaches are there?**

**? - Differences?**

#### Calling Functions

In both cases, we could call, or **invoke**, the function like this:

```js
sayHello('Mickey');
// "Hello Mickey!"
```

#### Function Declarations vs. Function Expressions

##### Why Are There Function Expressions?

Functions in JS were always meant to be treated as first-class objects. In fact, they **are** objects - we can pass them as arguments to other functions, we can return them as the result of a function, and we can even dynamically add properties on them!

Soon enough, you will learn about the convenience of using **anonymous functions**, and these babies are made possible by function expressions.

Lastly, function expressions can be **immediately invoked**, which can come in handy as you'll see when we talk about scope.

With the above in mind, function expressions just feel right to many JS developers.

##### Why Are There Function Declarations?

A developer coming over from most other programming languages would be more familiar with the Function Declaration method of defining functions.

One advantage function declarations (also called function definitions) have is that they are fully parsed by the interpreter prior to execution and can therefore be invoked even if they are defined later in the source code. For example:

```js
var t = f1();  // thank you function declarations :)
var s = f2();  // blows chunks!


function f1() { return "I'm coming from a function declaration"; }

var f2 = function() { return "I'm coming from a function expression"; };
```

For all practical purposes, the above distinction, that function expressions cannot be invoked before they are defined, is really the only "functional" difference you need to be concerned with.

Remember, attempting to execute a function expression before it's been defined is the source of many an error for JS developers!

##### A Simple Function

In the pre-work, you should have written several basic functions.

As a refresher, lets write one together within one of the many "code playgrounds", [JS Bin](http://jsbin.com/?js,console). Open it up and ensure that only the JavaScript & Console panels are open.

This function should look familiar:

```js
function areBothEven(n1, n2) {
  return !(n1 % 2) && !(n2 % 2);
}
```

The `areBothEven` function is defined to accept two arguments. These arguments should be numbers, otherwise the function as written won't work as expected.

The `return` keyword returns the result of that expression - which isn't as crazy as it looks when you break it down.

> Note: In the real world, much of the code you write will be code designed prevent and handle error conditions. However, in WDI, we choose to keep our code leaner to help illustrate what it is we're trying to teach.  There also just isn't enough time to write the extra code, as important as it is in real apps.

Let's invoke the function a couple of times to try it out.

**? - Is the above function a function _declaration_ or _expression_?**

Now it's your turn... 

#### Practice Writing Functions

You're going to write two functions, one as a function declaration & the other as a function expression.

This will be an individual exercise, however, feel free to seek guidance from your neighbors and instructor if you get stuck.

##### Write a Function Declaration

Write a function named _computeArea_ using the function declaration approach.

It will have two parameters: _width_ & _height_.

It will compute the area of a rectangle (_width_ X _height_) and return a string in the following form:

> The area of a rectangle with a width of ___ and a height of ___ is ___ square units.

Invoke the function to test it.

##### Write a Function Expression

Write a function named _planetHasWater_ using the function expression syntax.

It will have one parameter: _planet_.

Return _true_ if the _planet_ argument is either "Earth" or "Mars", otherwise return _false_.

Bonus points if you ensure the function will work regardless of the casing of the _planet_ being passed in ('earth', 'MARS', etc.).

Invoke the function a couple of times to test it!

### 3. Parameters/Arguments<small> (15 mins)</small>

There are a few tidbits about parameters/arguments to ponder:

- First, let me answer a common question:  _"What's the difference between a parameter and an argument?"_

  This question is best answered with an example (no need to run this):
  
  ```js
   var drive = function(miles) {    // miles is a parameter
     if (miles > 500) {
       return 'Take a break';
     } else {
       return 'Pedal to the metal';
     }
   };
   
   var result = drive(222);     // 222 is an argument
  ```

  So, they are called parameters when we are defining the function, and arguments when we are calling the function.
  
  FYI, in this example, our single argument is a number literal (`222`), however, you will commonly pass in variables as arguments also...

- Parameters in essence become local variables inside the function body. Therefore, in the example above, `miles` can be accessed anywhere within the function.

  **? - If we pass in a variable as an argument that holds a primitive type (string, number, boolean), and we change the parameter within the function, will the source variable's value also change?**
  
- Just like when naming variables and functions, we should name the parameters of our functions with meaningful names as well.

- Inside of the function we are automatically provided a variable named `arguments`.  `arguments` is an object that behaves like an array, that is, it has a `length` property and we can access the "elements" of `arguments` using _bracket notation_:

  ```js
   var func = function(p1, p2, p3) {
     console.log(arguments, arguments.length);
   };
   
   func(5, true, null, 'extra!');
   
   // console output: [5, true, null, "extra!"]   4
  ```
  
  Notice that we passed **more** arguments than there are parameters! JavaScript is very flexible and won't complain about this. That extra arg shows up nicely in the `arguments` variable.
  
  If we were to pass in fewer args than params, then the params without a matching argument would be set to `undefined`. 

  **? - In the above example, when `func` is executing, what are the values for `p1`, `p2` & `p3`?**
  
##### ES2015 Default Parameters

What if your function requires certain arguments and you want to provide a default value for the parameter if an argument is not supplied when the function is invoked?

Prior to ES2015, here is trivial example of what we had to do:

```js
function setColor(bicycle, color) {
	// set color to 'purple' if not provided
	color = color || 'purple';
	bicycle.color = color;
}

var bike = new Bicycle();
setColor(bike, 'blue');  // sets color to blue
setColor(bike);  // sets color to purple by default
```
Now, using **default parameters**, we can do this:

```js
function setColor(bicycle, color = 'purple') {
	bicycle.color = color;
}
```

Any value can be provided as a default, including objects, etc.

#### Functions as Arguments

  In JavaScript, it's amazingly easy to pass around functions just like objects (because they are objects).

  Tomorrow, you'll see this concept in action when you start to use JS to manipulate the DOM (document object model, aka, elements) and handle events.
  
##### Anonymous Functions

Often methods will require a function be provided as an argument.  For example, the `forEach` method on arrays:
	
```js
var a = ['red', 'green', 'blue'];
	
a.forEach(function(color) {
  console.log(color);
});
```
	
Since the function provided to the `forEach` will never be called anywhere else in the code, why create a separate named function and pass it in?  An **anonymous function** as shown above really comes in handy!
  
#### ES2015 Arrow Functions

ES2015 has given us yet another type of function, the _arrow function_.  It is a shorthand way of writing _anonymous functions_.
	
Let's see how we could use an _arrow function_ in the `forEach` example above:
	
```js
var a = ['red', 'green', 'blue'];
	
a.forEach(color => console.log(color));
```

Because we had a single statement, we didn't even need curly braces!  We'll learn more about _arrow functions_ and will be sure to sprinkle them in here and there in future lessons.
  
### 4. Scope<small> (15 mins)</small>

#### What is Scope?

> Disclaimer: This discussion of scope will not cover a third type of scope, block scope, ushered in by ES2015's `let` keyword.

In general, the concept of **scope** in computer programming pertains to the accessibility of variables and functions from a given point of the code. In other words, as you write a line of code, what variables and functions do you have access to?

JavaScript has a single **global scope** and as many **local scopes** as there are functions. That's right, each function creates a new scope as shown in this diagram:

![](https://i.imgur.com/UtIoe7F.png)

**? - How many scopes are there in the above diagram?**

#### You can look out, but you can't look in!

A key takeaway is that functions have access to the set of variables and functions defined within their own scope AND in the **outer** scopes, but **not the inner** scopes.

**? - What variables and functions are _accessible_ within the scope of `foo`?**

**? - What variables and functions are _accessible_ within the scope of `bar`?**

**? - Does the function `foo` have access to the variable `c`?**

Now let's examine this code:

```js
var x = 5;

var myFun1 = function () {
  console.log(x);   // logs out 5
  myFun2();
  
  var myFun2 = function () {
    console.log(x);   // logs out 5
  };
};

myFun1();
```
Note how we go right up the _scope chain_ looking for a variable (or function). Once the variable is found, the JS runtime engine will stop looking up the chain because, well, it found what it was looking for. If it progresses all the way up to the global scope and still does not find the the variable it's looking for, an error will be thrown.

**? - In the example above, what if `myFun1` had its own variable `x` defined like this:<br>`var x = 100;`<br>What would the value of `x` be within `myFun1`?**<br>**Within `myFun2`?** 

#### Global Scope

In our browsers, the global scope is represented by the `window` object. As far as scopes are concerned, it is at the top of the food chain and it's properties are available to **every** function we write.

It is generally bad form for our programs to create variables in the global scope.  Doing so risks us overwriting data in use by JS libraries/frameworks or other routines. Creating global variables is referred to as "polluting the global scope", and we all know that it's not nice to pollute!

If we define a variable within the global scope, it becomes a property on the `window` object. You can see this in action by typing `var pollution = 'sucks'` in the console, then type `window.` (don't forget the dot), scroll down and find the pollution we have created - yuck!

One way we can prevent our code from leaking into the global scope is by wrapping it with a construct known as an Immediately Invoked Function Expression, or "IIFE" (pronounced "iffy").  It looks like this:

```js
(function() {
	'use strict';

	// your code here...
	
})();
```
**? - Why does this construct virtually prevent variables and functions from being created in the global scope?**

One day, when _modules_ are fully implemented in JavaScript, we won't have to screw around with IIFE's :)

**? - Scope refers to the set of ________ and ________ that are accessible within a given point in the code.**

**? - When is a new scope created?**

### 5. Further Study

#### Nesting Functions

As the examples above have shown, we can define functions within functions!

Why would we want to do this? Well, Perhaps an outer function needs a "helper" function that would only be relevant only to a given function. It would be good programming practice to "hide" that function from the rest of the program by nesting it within the function that actually needs it.

For example (no need to execute this):

```js
function openNewAccount(name, openingBalance) {
  var acctNum = generateAcctNum();
  
  // createAccount is a function available outside this function
  var acct = createAccount(acctNum, openingBalance);
  return acct;
  
  // helper function that provides a unique account number
  function generateAcctNum() {
    return Date.now();  // super amazing algorithm :)
  }
}
```

As you can see, there's a nifty `generateAcctNum` function in there and it's only relevant to when a new account is opened, so it's nested within the `openNewAcount` function.


## References

[MDN Functions Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
