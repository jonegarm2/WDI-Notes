# JavaScript Prototypes

By the end of this lecture students should be able to: 

* Explain JS's prototype model
* Use prototypes to save memory 
* Use prototypes to implement prototypal inheritance
* Use prototypes to share data between all instances of a constructor 
* Use prototypes to add functionality to built-in object types 
* Use prototypes to change a method's behavior (polymorphism)

## Roadmap

* Why learn about JS Prototypes?
* Refresher on constructor functions
* Understanding the *prototype chain*
* Using prototypes to save memory
* Create our own object model using prototypal inheritance
* Share data between all instances of a type
* Add functionality to built-in object types
* Change the behavior of an inherited method

## Why learn about JS Prototypes?

#### Object Oriented Programming

As web developers, we write programs using Object Oriented Programming (OOP) techniques.

With OOP, our programs are crafted from objects that usually model real world objects that interact with each other.

Often, these objects have small amounts of common functionality, e.g., a `User` object and a `Student` object would both have _name_ and _email_ properties, etc.

Coding this common functionality over and over in similar objects would be wasteful and inefficient.

This inefficiency is addressed in OOP with a fundamental principle known as _inheritance_. _Inheritance_ helps us make our code more DRY.

Inheritance allows objects to "inherit" properties from other objects as a starting point, then they can customize, or specialize, them as necessary.

Just like in nested HTML, objects can have _parent/child_ and _ancestor/descendent_ relationships between them.

We often graph these relationships, or _object models_, which can look something like this:

![](http://www.cs.rit.edu/~atk/JavaScript/manuals/jsobj/hier01.gif)

To help us discover potential relationships between objects, it helps to ask if an "is-a" relationship exists.  For example, "a manager _is-a_ employee".

JavaScript’s flavor of inheritance is known as _Prototypal Inheritance_ that is implemented by using an object known as a Prototype.  When we create new objects, the new object "inherits" the properties that exist in the constructor's prototype object. Yes, the prototype is just an regular JavaScript object.

This differs from "classical" inheritance where _classes_ serve as the blueprints from which new objects are created.


**?: What is the OOP principle are we using when design a new object that builds upon, or specializes, the design of a base object?**

**?: What benefits does inheritance provide?** 

## Refresher on Constructor Functions

In JS, we can create objects in a few basic ways:

- By using the `Object.create()` method.
- By using a Constructor Function.
- By using an Object Literal.

#### `Object.create()`

Used to create objects from other objects, including prototype objects (instead of using constructor functions).

#### Constructor Functions

A regular JS function designed and written to be used to construct objects.

By convention, we always name the function using upper camel case.

**?: The JS engine knows we are calling a function as a constructor function when we precede with it with ______?**

The JS engine will create a shiny new object and assign it to the `this` keyword.

We write our constructor functions to add properties to the new `this` object.

JS _automatically_ returns the shiny new object (`this`) from the constructor function - no `return` statement is necessary.

Here is an example of a Constructor Function:

```js
function Car(make, model, myColor) {
	this.make = make;
	this.model = model;
	this.color = myColor;
}

var myCar = new Car('Tesla', 'Model S', 'Black');

// myCar =
// {
// 		make: 'Tesla',
//		model: 'Model S',
//		color: 'Black'
// }
```

#### Object Literal

You've all created new objects using Object Literal syntax:

```js
var myCar = {
	make: 'Tesla',
	model: 'Model S',
	color: 'Black'
};
```

**?: When would it be advantageous to use a Constructor Function instead of an Object Literal?**

**?: When would it be advantageous to use an Object Literal instead of a Constructor?**

## Understanding the Prototype Chain

Lets create a new object in the console:

```
> var myObj = { prop1: "value1" };
```
Now lets type `myObj` followed by a dot.  Look at all of those properties that `myObj` has in addition to the `prop1` property that we created.

You are witnessing inheritance and something called the _prototype chain_ in action!

Every object has a **secret link** to the _prototype_ object of its constructor - and the properties on that prototype object are made available to the child object.

But "wait", we did not use a constructor to create `myObj` - **What did we use?**

How can we check the constructor function used to create an object? Try this:

```
> myObj.constructor
< function Object()
```

> So, creating an object using object literal notation is just a shortcut for `var myObj = new Object();` and therefore `Object()` is the constructor function

Again, objects inherit the properties of their constructor's `prototype` property. Let's take a gander at what the prototype of `Object` is then:

```
> Object.prototype
< Object {}
```
Okay, so there's the proof that the prototype is a JS object. Expand it in console and there they are - the extra properties that `myObj` has!  Proof that objects inherit the properties of its constructor's prototype!
 
`Object.prototype` is special because all objects ultimately derive from it, unless an object is created like this:  `var bareObject = Object.create(null);`.

Think of the `Object.prototype` as always being at the top of our program's object model.

Next, lets create a string in the console:

```
var s = "hello";
```

**?: What is its constructor?**

**?: What are some properties that our string inherited from String.prototype?**

**?: Are the properties from Object.prototype still available?**

#### The Prototype Chain

Lets explore further by typing the following in the console:

```
> dir(String);
```
That `__proto__` object inside of String's prototype is the secret link to it's constructor's `prototype` referred to earlier. Although `__proto__` is an internal property and not recommended to use, we can use it to follow it to traverse the _prototype chain_.

> Note: It is recommended to use the `Object.getPrototypeOf()` function instead of the `__proto__` property.

**Let's see how the _prototype chain_ is traversed when properties are accessed using a diagram**

> Note: If the `Object.prototype` is reached, and it does not contain the property being accessed, _undefined_ is returned.

#### Checking if an Object Directly Owns a Property

Is there a way to check if a property on an object belongs to that object vs. being inherited from the prototype chain? Absolutely:

```
> myObj.hasOwnProperty('prop1')
< true
> myObj.hasOwnProperty('valueOf')
< false
```

## Using Prototypes to Save Memory

Let's build a constructor for creating bank accounts:

```js
function BankAccount(ownerName, begBalance) {
    var accountNumber = (new Date()).getTime();
    
    this.ownerName = ownerName;
    this.balance = begBalance;
    
    this.getAccountNumber = function() { return accountNumber;};
    this.deposit = function(amount) { this.balance += amount; return this.balance; };
    this.withdraw = function(amount) { this.balance -= amount; return this.balance; };
}
```
**?: Based upon the above code, what would be repeated in every instance of a `BankAccount`?**

**?: A banking application might create thousands of these BankAccount's. What is being repeated that seems to be wasteful?**

Instead, we can attach our methods to the prototype of the constructor we just wrote:

```javascript
function BankAccount(ownerName, begBalance) {
    var accountNumber = new Date().getTime() + '';
    
    this.ownerName = ownerName;
    this.balance = begBalance;
    
    this.getAccountNumber = function() { return accountNumber; };
}

BankAccount.prototype.deposit = function(amount) { this.balance += amount; return this.balance; };
BankAccount.prototype.withdraw = function(amount) { this.balance -= amount; return this.balance; };
```

There is only a single copy of the constructor function in memory, so by moving our object's methods to the prototype of the constructor, there will be only one copy of those functions, instead of thousands. Now that's saving memory!

#### Constructor Design Best Practices:

1. Add properties to `this` to hold instance data.
2. For efficiency, add non-initialization and non-getter/setter methods to the `prototype` object.
3. To prevent direct access to data in properties, hold the data in a `var` and provide access through a getter and/or setter function instead. **This creates what is known as a _________?**

## Create Our Own object Model Using Prototypal Inheritance

We're going to use prototypal inheritance to specialize, aka _extend_, our BankAccount object.  In OOP, this is often referred to as sub-classing.

Lets create a `CheckingAccount` constructor that includes the same properties as it's parent (`BankAccount`), plus any new parameters we want to add, in this case, an `overdraftEnabled` parameter:

```js
function CheckingAccount(ownerName, begBalance, overdraftEnabled) {
}
```
Next, we want to create the `ownerName` & `balance` properties on as we did in the `BankAccount` constructor, however, we will not simply assign them to `this`.  Instead, we will use the `BankAccount` (parent) constructor as a _super constructor_ (OOP term), to create them for us like this:

```javascript
function CheckingAccount(ownerName, begBalance, overdraftEnabled) {
    BankAccount.call(this, ownerName, begBalance);
}
```
Here we are using the `call` method that is available on all functions. `call` allows us to change the context of `this` inside any function.

**? Refresher: What does `this` represent inside of the `CheckingAccount` constructor?**

With the properties created by our parent constructor, we can now add our `CheckingAccount`'s `overdraftEnabled` property to our new object:

```javascript
function CheckingAccount(ownerName, begBalance, overdraftEnabled) {
    BankAccount.call(this, ownerName, begBalance);
    this.overdraftEnabled = overdraftEnabled || true;
}
```
Let's create a new `CheckingAccount` and verify that we have inherited the `ownerName` &`begBalance` properties from `BankingAccount` - check!

We even inherited the `getAccountNumber` as expected.

**However**, the methods we put on `BankAccount.prototype`,  `deposit` and `withdrawal`, are NOT available. If we think about it, this makes sense because we haven't done anything yet to properly set up our prototypal inheritance. This way's golden:

```js
// BankAccount and CheckingAccount constructor functions defined above

CheckingAccount.prototype = Object.create(BankAccount.prototype);
CheckingAccount.prototype.constructor = CheckingAccount;
```

**Now check, and `deposit` and `withdrawal` methods now exist and work!**

> **"You may also see it this way alert":** Sometimes you may see an actual object that's an instance of the parent constructor being used to set the prototype, however, using Object.create(_somePrototype_) in the way we did above is better because it does not duplicate instance properties on the prototype object.

Next, let's add some additional functionality to a `CheckingAccount` by attaching a new method to *its* prototype. Now that we have a `CheckingAccount`, let's provide a method to order checks!

```javascript
// CheckingAccount constructor function defined above...
CheckingAccount.prototype = Object.create(BankAccount.prototype);
CheckingAccount.prototype.constructor = CheckingAccount;

CheckingAccount.prototype.orderChecks = function() {
	return 'Checks have been ordered for Account: ' + this.getAccountNumber();
};
```
Now, order some checks!

**?: What is a _super constructor_?**

**?: What is the advantage of calling a super constructor vs. creating those properties in the sub-class constructor?**

#### Checking if an Object Inherits From a Constructor

We can use the `instanceof` operator to check if a constructor is in an object's prototype chain:

```js
var chkAcct = new CheckingAccount('I. M. Broke', 10, false);

console.log(chkAcct instanceof CheckingAccount);
// true
console.log(chkAcct instanceof BankAccount);
// true
console.log(chkAcct instanceof Object);
// true
console.log(chkAcct instanceof String);
// false
```

#### Review: Steps to Implement Prototypal Inheritance

When writing new object constructor functions that you intend to inherit from other constructors, here's a handy guide for you:

1. Create a new constructor function that includes the same parameter list as the parent constructor.
2. Add additional parameters as needed **after** those of the parent.
3. Inside of the new constructor, use the parent's constructor to add the instance properties to the new empty object (`this`) by calling the parent's constructor function (_super constructor_) using `call` and passing in `this` along with the arguments the super constructor needs.
4. Use the new parameters, etc. to specialize the object by creating properties on `this`.
5. Set the new constructor's prototype to an instance of the parent's `constructor.prototype` like this:  `Object.create(parentConstructor.prototype)`.
6. Create a `constructor` property on the `prototype` object and set it to a reference to the new constructor function.  This "circular" reference is a pattern that JavaScript itself follows.
7. Customize the new constructor's prototype by adding methods and/or _shared_ data to it.

## Share Data Between All Instances of a Type

Just like we can share the same copy of a function between all instances of a constructor by adding it to the prototype, we can share data in the same way.

For example, we can add a `bankName` property to the `BankAccount.prototype` like this:

```js
BankAccount.prototype.bankName = "Bank of WDI";
```

Now, any instance of `BankAccount`, or its sub-classes, will share the `bankName` property.

If its value is changed by any instance, all existing and future instances will see the new value.

`bankName` in OOP terminology may be referred to as a _static_, or class member, because it is shared by the entire class.

## Add Functionality to Built-in Object Types

Thanks to the dynamic nature of JavaScript objects, its quite easy to add additional functionality to **existing** types.

For example, the following code will add a new method called `zerofy` to Number's prototype.

```js
Number.prototype.zerofy = function(size) {
    var s = this.toString();
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
};
```
Once the above code has been run in your program, you can do this with any number:

```js
var strNum = (25).zerofy(6);
// strNum will be "000025"
var n = 8;
var strDay = n.zerofy(2);
// strDay will be "08"
```

## Change the Behavior of an Inherited Method

We can change the behavior of an inherited method by simply writing a method with the same name somewhere in the prototype chain, but before the original method.  This "overriding" of behavior is known as a form of _polymorphism_, another principle of OOP.

As an example, lets change the behavior of the `withdraw` method on `CheckingAccount`, which it inherited from `BankAccount`, to see if it's okay to make the withdrawal:

```js
CheckingAccount.prototype.withdraw = function(amount) {
    if ( this.overdraftEnabled || amount <= this.balance ) {
        this.balance -= amount;
        return this.balance;
    } else {
        return "NSF";
    }
};
```

Now, any object that is a `CheckingAccount` will use this new `withdraw` method instead of the one inherited from `BankAccount` - test it out!

## Independent Practice

- Write the constructor functions to build out the `Employee` object model shown above.  Group common properties on the parent classes and specialize the sub-classes with appropriate data and methods.

#### Looking for More?

- Create another sub-class of `BankAccount`, named `SavingsAccount`, that adds an additional instance property, `annualInterestRate`, and a new method called `computeMonthlyInterest`.

## Essential Questions

- **Name at least two purposes of JS prototypes.**

- **Describe how properties are accessed through the prototype chain.**

## References

[Wikipedia - Object Oriented Programming](http://en.wikipedia.org/wiki/Object-oriented_programming)

[BankAccount & CheckingAccount code](https://gist.github.com/jim-clark/e3fc426d73153fac6dc1)
