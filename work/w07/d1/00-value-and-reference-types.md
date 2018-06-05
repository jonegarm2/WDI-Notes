<img src="https://i.imgur.com/oY0P1r0.png" width="200">

# Walk-thru of Value vs. Reference Types

### Review: The Data Types of JavaScript

1. Number
2. String
3. Boolean
4. Null
5. Undefined
6. Object (including the built-in special objects: Array, Date, Function and RegExp)
7. Symbol (ES2015)

All of the data types, **except Objects**, are _primitive_ types. They are considered primitive because they can only hold a single value.

**Objects** (and the special objects such as Arrays, Dates, etc.) are _reference_ types. They're certainly more capable than that of a primitive. This is why they are also known as _complex_ types. 

### Primitive Types

When we assign a primitive value to a variable/property, the variable/property 's identifier and its value is being stored in a table in memory:

```js
var x = 5;
```

var | value
:-: | :-:
x | 5

```js
var y = x;
```
Now `y` also holds the value of 5 because we assigned `x`'s value to `y`:

var | value
:-: | :-:
x | 5
y | 5

Changing one variable's value does not change any other variable's value:

```js
var x = 10;
```

var | value
:-: | :-:
x | 10
y | 5

#### Key Concept to Remember

Whenever one variable is assigned to another, the **value** of the source variable is copied to the **value** of the target variable.

This principle is true regardless of whether the source variable is a primitive or reference type.

### Passing Arguments to Functions

Passing variables and properties as arguments to functions is exactly the same as assigning their values to other variables:

Consider:

```js
var someone = 'Fred';

function sayHello(name) {
  console.log('Hello ' + name);
}

sayHello(someone);
```

The above would result in the _global_ scope looking like this:

var | value
:-: | :-:
someone | "Fred"

and the scope of _sayHello_ during its execution looking like this:

var | value
:-: | :-:
name | "Fred"

**If `name` was changed within the `sayHello` function, would the value of `someone` also change?**

### Reference Types

As mentioned, reference types are not limited to holding a single value like primitive types.

Consider:

```js
var a = [1, 2, 3, 4];
```

The memory table is incapable of holding all of a reference type's values, so objects are stored in a separate part of memory called the _heap_.

Then, instead of a value being stored in the memory table, a "reference" to the object in the heap is stored instead:

var | value
:-: | :-:
a | reference pointing to<br>the array in the heap

>Note: It may help to think of the _reference_ as a "pointer" to an **object** (or one of the built-in special objects) in the heap.
	
Now let's assign a variable to another variable like we did earlier but this time the source variable will be `a` (an array):

```js
var b = a;
```

Due to the fact that assigning one variable to another simply copies the value from the source var to the target, `b` holds the same reference as `a`:

var | value
:-: | :--
a | reference pointing to<br>the array in the heap
b | same reference as `a`
	
Knowing this, here's a couple of questions:

**Does `a === b`?**

**Does `a[1] === b[1]`?**

The key thing to consider is that there is only one array with two variables, `a` and `b`, referencing it.

#### Changing a Reference Type

Before, we saw this when changing primitive types:

```js
var x = 5;
var y = x;  // y now holds the value 5
x = 10;  // y is unchanged and is still 5
```

Now let's change array `a`:

```js
a.push(5);
```

`a` now contains `[1, 2, 3, 4, 5]`

**What does `b` contain?**

#### Another Reference Type Example

Let's look at another example:

```js
var cart = {};
cart.items = {};
```

Now consider this function:

```js
function addItem(items, itemDesc, itemPrice) {
	items[itemDesc] = itemPrice;
}
```
Finally, let's invoke the function as follows:

```js
addItem(cart.items, 'Item 1', 9.99);
```

**What does the object `cart` equal?**

### Copying Complex (Reference) Types

Let's make a copy of an array:

```js
var a = ['hello', {x: 5}];
// Four ways to make a copy of an array:
//   var b = a.slice();
//   var b = a.concat();
//   var b = Object.assign([], a);
//   var b = [...a];  // ES2015
var b = a.slice(); 
```

**Does `a === b`?**

**Does `a[1] === b[1]`?**

Copying arrays using JavaScript's built-in methods results in what is known as a "shallow" copy, that is, a copy that simply copies each element's value, whether it is a primitive value, or reference to a complex type.

#### Making Deep Copies

JavaScript libraries such as jQuery, Lodash & Underscore have utility methods for creating _deep_ copies of objects.  A _deep_ copy is when all referenced objects are duplicated, regardless of there level of nesting.

Here's a technique we can use to create a deep copy that works in most cases:

```js
var a = ['hello', {x: 5}];
var c = JSON.parse(JSON.stringify(a));
```

The above technique first _serializes_ the object into a JSON string, then that JSON string is parsed to create a new object.

**Does `a === c`?**

**Does `a[1] === c[1]`?**

In this case, the `{x: 5}` was created as an entirely new object instead of just having its reference copied as we saw in the shallow copy example above.


