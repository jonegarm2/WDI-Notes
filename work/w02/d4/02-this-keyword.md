<img src="https://i.imgur.com/oY0P1r0.png" width="500">

# The What, Why & How<br>of `this`

---
## Learning Objectives

Students will be able to:

- Describe **what** `this` is

- Explain **why** `this` is necessary

- Determine **how** the value of `this` is set

## Roadmap

- What is `this`?

- Why does `this` exist?

- Implicit binding of `this` within functions

- The binding of `this` within _arrow functions_ (ES2015)

- Explicitly determining the binding of `this`

- Essential questions

## What is `this`?

`this` is a keyword in JavaScript available for use inside of functions/methods.  **When is a function considered to be a method?**

When we introduced functions last week we briefly discussed another JS keyword automatically available inside of functions - **____________**?

So, the keyword `this`, is another pre-defined variable inside every function.

The value of `this` is set by the JS engine implicitly (automatically) - a process known as "binding".

Although JS automatically sets the value of `this` when a function/method is invoked, there are methods available on every function object that allow the programmer to **explicitly** set the value of `this` to what the programmer wants it to be. However, in this lesson, we are going to focus on the **implicit** (automatic) binding - after all, before you can willfully change what `this` is set to, you need to know what it's going to be in the first place.

The value of `this` is often referred to as the **context** within the function.

Understanding `this`, is important as a developer, and as a job-seeker. There's a very good chance you will be asked about `this` during an interview for a front-end developer job.

## Why `this` is necessary

The mechanism provided by _this_ is necessary in all object oriented programming languages to:

1. **Provide access to an object's properties & methods** from other methods within that object.<br><br>and<br>

2. **Implement code reuse**.<br>For example, during the lesson on JS Classes, we learned about _prototype methods_ - where those methods are defined once, but able to be called by every instance of that class.

#### Example 1

Provide a way for methods (functions assigned to object properties) to access the other properties & methods within that object:

```js
var person = {
	firstName: 'Katie',
	intro: function() {
		console.log(`Hello, I'm ${this.firstName}!`);
	}
};
```

#### Example 2

Efficiency via code reuse.

Imagine a poorly written constructor function that constructs sprites for a game:

```js
function Sprite(color, pos) {
  this.color = color;
  this.pos = pos;
  this.move = function(direction) {...};
  this.rotate = function(direction) {...};
  this.accelerate = function() {...};
  this.checkCollision = function() {...};
}
```

> We're using a _constructor function_ to demonstrate instead of a _class_ because classes shield the fact that their instance methods, like with constructor functions, are attached to the prototype object.

In the app, there may be tens, hundreds, even thousands of sprite instances; and if so, as written above, each sprite would have it's own copy of every method - the code for the functions will be duplicated over and over again...
	
However, by attaching a method function to the constructor's prototype like this:
	
```js
function Sprite(color, pos) {
  this.color = color;
  this.pos = pos;
}
	
Sprite.prototype.move = function(direction) {
  switch (direction.toUpperCase()) {
  	case 'R':
    	this.pos.x < 999 ? this.pos.x++ : this.pos.x = 0;
      break;
    case 'D':
    ...
}
```

Now, there is only a single copy of each method.

When we invoke a method on an object, `this` will be bound to that object - allowing that method to work with an unlimited number of objects.

Now that's code reuse!

### Review Questions

Before looking at how the value of `this` is determined, a few review questions;

- **The `this` keyword is accessible within every ____________?**

- **What is one of the reasons we need `this` in JavaScript?**

- **What's the other reason?**

## Determining **how** the value of `this` is set

#### Key Point Regarding HOW `this` is Set

> **KEY POINT**: In non-arrow functions (discussed below), the value of `this` is set by JS depending on **how a function/method is called**, not on how it is written. This means that the same function could have `this` set differently...

### Implicit Binding of `this`

Since the value of `this` is **determined by _how_ we call a function**, we'll take a look at the following scenarios of how functions are called:

- As "freestanding", simple, non-method functions
- As Methods
- As Classes & Constructor Functions
- As DOM Event Handlers
- As Generic Callback functions

Let's look at examples for each of these four scenarios:

#### Non-method Functions

- When called as a simple, _non-method_ function (not attached to an object):

	```js
	function thisCheck() {
		console.log(this);
	}
	thisCheck();  // Window {...} or 
	```
	or in the case when _strict mode_ is set:
	
	```js
	function thisCheck() {
		'use strict';
		console.log(this);
	}
	thisCheck();  // undefined
	```

#### Methods

- Now let's call this very same function as a method (assigned to a property of an object):

	```js
	var ninja = {
		name: 'JS Ninja',
		f: thisCheck
	};
	function thisCheck() { console.log(this); }
	
	// call thisCheck() as a method
	ninja.f();  // Object {name: "JS Ninja"}
	```
	So, the rule is, the object left of the dot is the context object `this` is bound to!
	
	No dot?  `this` is the `Window` object (the `global` object in Node) because that's where the function is being executed.

#### Classes & Constructor Functions
	
- `this` in a class's constructor method or a constructor function is set to the new shiny object that is implicitly returned.

- See the _Sprite_ constructor function above for an example.

#### Event Handlers

- Within an event handler callback function, JS will bind `this` to the element listening to the event.

- For example:

	```js
	var myDiv = document.getElementById('my-div');
	myDiv.addEventListener('click', function() {
		console.log(this);
	});
	// <div id="my-div">...
	```

#### Generic Callback Functions

> Note: In the examples below, we will use a **ninja** object that's created as an object literal. Since we are assigning the object is assigned to a variable known in advance, we could solve some of the issues below by directly accessing the **ninja** variable. However, typically we won't be so lucky and the solutions we will discuss will work whether the object was created as an object literal or using a class/constructor function.

- You just learned that when a function is called as a non-method, `this` is bound to `Window` or is `undefined` in _strict mode_.

- Callback functions are called as simple "freestanding" functions (non-methods), so guess what `this` will be set to:

	```js
	var ninja = {
	  ninjaName: 'JS Ninja',
	  chop: function(numChops) {
	  	setTimeout(function() {
	    	if (numChops > 0) {
	      	console.log(`${this.ninjaName} chop!`);
	        this.chop(--numChops);
	      }
	    }, 500);
	  }
	};
	ninja.chop(2);  //  undefined chop! / then an error
	```
	The code didn't work as expected because `this` is not set to the object containing the code.
	
	Instead, when the callback executes, it's being called as a free-standing, simple function, thus `this` is bound to the `Window` (or _____ if strict mode is true).

- One way to "fix" the above problem is to set another variable to reference the object `this` is originally bound to:

	```js
	var ninja = {
	  ninjaName: 'JS Ninja',
	  chop: function(numChops) {
	  	var _this = this;
	  	setTimeout(function() {
	    	if (numChops > 0) {
	      	console.log(`${_this.ninjaName} chop!`);
	        _this.chop(--numChops);
	      }
	    }, 500);
	  }
	};
	ninja.chop(2);  // JS Ninja chop! (two times)
	```
	
	The `_this` variable above would "remember" the value of `this` when it correctly points to the object.

- Other ways to fix the async callback issue is by _explicitly_ setting the binding of `this` with the `call`, `apply` and `bind` methods available on non-arrow functions.

- The newest solution however is to take advantage of the _lexical_ binding of `this` in arrow functions...

## Arrow Functions (ES2015)

- When executed in the global context (outside of a function), an arrow function is **always** the global object (`Window` in browser; `global` in node, but not `undefined`):

	```js
	var foo = () => console.log(this);
	foo();  // Window {...}
	```

- Unlike how `this` is set to the object left of the dot when invoking a method, in an _arrow function_ it is set to the context of its enclosing function (or the global object if the method is not being invoked within another function.

	For example, assuming `obj` below is declared in the global scope, calling the `foo` method shows that `this` is bound to the global context, not the object:
	
	```js
	var obj = {
		foo: () => console.log(this)
	};
	
	obj.foo();  // Window {...}
	```
		
	This is because there is not an enclosing function like the following:
			
	```js
	var obj = {
		foo: function() {
	  		var logThis = () => console.log(this);
	    	logThis();
	  	}
	};
	
	obj.foo();  // Object {...}
	```

- Okay, it looks like an arrow function would have taken care of our ninja chop problem:

	```js
	var ninja = {
	  ninjaName: 'JS Ninja',
	  chop: function(numChops) {
	    setTimeout(() => {
	      if (numChops > 0) {
	        console.log(`${this.ninjaName} chop!`);
	        this.chop(--numChops);
	      }
	    }, 500);
	  }
	};
	ninja.chop(2);  // JS Ninja chop! (two times)
	```

- The value of `this` within an arrow function cannot be set or changed using `call`, `apply` or `bind`.
	
## Explicitly Setting `this`

Every function has three methods on it that allow the programmer to explicitly set the binding of `this`:

- `call` & `apply`
- `bind`

We will examine explicitly binding `this` in another lesson.
	
## Good Advice

If you need to know what context will be bound to `this` in a given scenario, I would advise that you write some quick code like we've done here and test it out!

BTW, this is good advice in lots of cases - sometimes it's just better to write a little code and check the result than to run to docs or google.

## Essential Questions

I'll give you a moment to review these with your pair:

**What type of programming languages rely on the concept of `this`?**

**True or false? The value of `this` can be always be determined by examining the definition of a function. Explain your answer.**

**If asked in an interview, "Explain `this` in JS", what would you say?**

**What is `this` bound to when a class or constructor function is invoked?**

**What is `this` bound to in an event handler?**

**In this code:**

```js
var foo = function() {
  console.log(this);
};

var bar = {
  foo: foo
};

// Scenario 1:
foo();

// Scenario 2:
bar.foo();
```

**What will be logged out in _Scenario 1_, if not in strict mode?**

**What will be logged out in _Scenario 1_, if in strict mode?**

**What will be logged out in _Scenario 2_?**