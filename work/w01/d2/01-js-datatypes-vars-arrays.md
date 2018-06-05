<img src="https://i.imgur.com/DEsPVNw.png">

# Intro to JavaScript Data Types, Variables & Arrays

| Learning Objectives |
| :--- |
| Identify JavaScript's Data Types |
| Define Variables |
| Create and Manipulate Arrays |

## Roadmap
1. Intro to JavaScript (5 mins)
2. Explore JavaScript's Data Types (25 mins)
3. Variables (10 mins)
4. Arrays (35 mins)
5. Further Study

### 1. Intro to JavaScript<small> (5 mins)</small>

> _Atwood's Law:_<br>
> "Any application that can be written in JavaScript will eventually be written in JavaScript."<br>
> _\- Jeff Atwood, co-founder of Stack Overflow_

*Languages on GitHub - Percentage of Monthly Active Users:*
![](https://i.imgur.com/HJapAIF.png)

**? - Any thoughts as to why JavaScript has become so popular?**

#### JavaScript's Role

The main purpose of JavaScript is to provide behavior to our web applications via client-side script.

![](https://i.imgur.com/FwvjQVO.jpg)

> The popularity of a technology known as _Node.js_ has made JavaScript popular outside the browser as well.  We'll learn about _Node.js_ in week 7.

#### A Few Facts About JavaScript:

- Created in 10 days in 1995 by Brendan Eich.
- Not to be confused with Java (although both have syntaxes based upon the "C" programming language).
- JavaScript is an implementation of ECMAScript, a standard maintained by the European Computer Manufacturers Association).
- The version of ECMAScript currently implemented in most modern browsers is ES2015 (formerly named ES6). [This website](http://kangax.github.io/compat-table/es6/) reports the implementation status in all major browsers. ES2015 represents a major upgrade, adding lots of new features, from its predecessor, ES5.  However, because ES2015 has become implemented fairly recently, the vast majority of code out in the wild is ES5 code. During WDI, we will focus mainly on learning ES5 **at first** and will gradually learn about ES2015 features as the WDI progresses.
- Contrary to what you may have heard or read, JavaScript is an object oriented programming (OOP) language. We use "objects" heavily in JS and these objects have properties and methods like in other OOP languages.  However, JS is not considered to be a "classical" OOP language thanks to its use of _prototypal_ inheritance.  Yes, thanks to ES2015, JS now has _classes_ used to create objects, but the implementation of _classes_ in JS is just "syntactic sugar" on its prototypal paradigm.

> Don't let all of these buzzwords confuse or scare you. By the end of the course, you too will be dropping much of this vocab!

### 2. Explore JavaScript's Data Types<small> (25 mins)</small>

JavaScript is an _untyped_ language. This means that we do not explicitly specify the _type_ of data we are working with.

In _strongly typed_ languages such as Java, data types are explicitly specified for a variable - and will trigger an error if a different data type is assigned.

> _Strongly typed_ languages require a little more effort to code in, however, many developers agree that it's worth it because it makes code less error prone. There is a newer language called _TypeScript_ you might hear about - this language is a superset of JS and adds strong typing.

Although we don't specify data types in JavaScript, every value (piece of data) **still has a type**! For example, when we assign some text to a variable like this:

```js
var myName = "Joe Cool";
```
the variable `myName` **would have a data type of ________?**

JavaScript has six main data types (ES2015 adds a new _symbol_ data type - that we don't need to worry about).

![](https://i.imgur.com/E4JR95G.png)

Let's examine each of these...

#### Setup

We are going to use Chrome's DevTools in this lesson to inspect and manipulate data.

Open Chrome and press `command+option+j` to open the _console_. The _console_ allows us to enter JS expressions and statements.

#### Explore JavaScript's Data Types

##### string

A _string_ represents textual data with zero or more characters wrapped by single or double quotation marks such as `"John"` or `'Jane'`. A pair of quotes with nothing between them is still a _string_ - an _empty string_.

```
> 'Hello World'
< "Hello World"
> typeof "I'm a string"
< "string"
```

Notice that the `typeof` operator itself always returns a string describing the data type.

> ES2015 Note: In addition to using single and double quotes to delimit a string, ES2015 adds a third way by using the back-tick character to create what's called a _template string_.  We'll learn more about _template strings_ in a future lesson.

##### number

A _number_ represents a numeric value.

Unlike many other programming languages, there is no distinction between integer (`15`, `3`, etc.) and floating-point/decimal types (`17.24`, `3.1416`, etc.).

Internally, JS represents all numbers as floating-point values.

```
> 15
< 15
> typeof 15
< "number"
> typeof 12.34
< "number"
> typeof '12.34'  // what will this return as the type?  
```

##### boolean

Whereas strings and numbers can have a virtually unlimited number of different values, the _boolean_ data type only has two possible values: __true__ and __false__.

<hr>
Before moving on to more data types, lets pair up and think of a couple examples where we might use each of the three data types we've covered thus far (string, number & boolean) to represent data in our programs.<br><br>For example, we would represent a person's name in our program using a **string** - right?<br><br>In five minutes, I'll ask you to share what you've come up with...
<br>

**? - If we needed to store a person's _social security number_, would you use a number or a string? Why?**

<hr>

Let's continue looking at the other data types...

##### null

The _null_ data type has only one value: __null__.

We often assign the value _null_ to a variable to represent the fact that it has no "real" value :)

```
> typeof null
< "object"  // Fail! Remember, JS was written in 10 days by one dude!
```

##### undefined

A variable that has not been assigned a value is of type _undefined_.  For example:

```js
var cohort;  // cohort currently holds undefined
```

Also, a function by default returns _undefined_ if a value was not explicitly returned using the `return` keyword or if the function was called as a _constructor function_ (a function prefaced with the `new` keyword when invoked).

Lastly, you will see _undefined_ a lot in the console when it evaluates a statement that does not return a value.

```
> typeof undefined
< "undefined"
> console.log('hello')
  "hello"
< undefined
```

##### object

Virtually all programming languages have the concept of two classifications of data types:

- **Primitive** data types
- **Complex** data types

Variables that hold a _primitive_ data type can hold only one value at a time. Therefore, the five data types that we've looked at thus far are classified as _primitive_ data types.

That brings us to _complex_ data types. _Complex_ data types can be thought of as containers capable of holding several pieces of data.

Accordingly, in JavaScript, the **object** data type is a _complex_ type.

> Note: Similar to what we just discussed about _primitive_ and _complex_ types, there's an important concept of **value types** and **reference types** as well. These will also be discussed later in WDI.

Typically, when we discuss _objects_ in JS, we are referring to plain vanilla _objects_ that have a collection of zero or more properties (key/value pairs) like this:

- **Object**<br>`{name: 'Joe Cool'}`

However, there are several other types of data we will work with that are special versions of the JS object.  Here they are:


- **Array**<br>`[1, 2, 3]`
- **Date**<br>`new Date()`
- **RegExp**<br>`/.*/`
- **Function**<br>`function() {}`

Note that it is okay to refer to these as their own data type, for example, if asked what type of data `['cat', 'dog', 'fish']` is, it would be acceptable to answer "an array". However, _technically_, there are only six data types, and _array_ is not one of them :)

We will learn more about _objects_ in the next lesson.

For now, let's just verify what `typeof` returns:

```
> typeof {course: 'WDI', cohort: 53}
< "object"
> typeof []
< "object"
> typeof /./
< "object"
```

Although _functions_ are also considered objects (_callable objects_ to be exact), the `typeof` operator returns a more helpful data type:

```
> typeof function(){}
< "function"
```

Yay, we've covered all six data types!

**? - Do all variables have a data type?**

### 3. Variables<small> (10 mins)</small>

_Variables_ are ubiquitous in computer programming. Think of them as containers in memory for storing data.

We name variables with _identifiers_ and we declare variables using the `var` keyword:

```js
var myVar;
```
> With ES2015, there's a new `var` in town known as `let` 

**? - What is the identifier of the variable above?**

We can also assign a value to a variable at the time we declare it by using the `=` (assignment) operator:

```js
var name = "Fred Flintstone";  // two birds with one stone!
```

and change it's value later...

```js
name = "Barney";  // note that we only declare a "var" once
```

Multiple variables can be defined in a single statement, separated by commas:

```js
var name = 'Wilma',
    age,
    town = 'Bedrock';

// above is equivalent to
var name = 'Wilma';
var age;
var town = 'Bedrock';
```

**? - What does the variable `age` equal?**

##### Naming Variables

In JavaScript, when naming variables, the convention is to name the identifiers using _Lower Camel Case_, e.g.,  `myLittleHouse`.

Identifiers in JS:

- Are case-sensitive!
- Cannot begin with a number
- Can contain letters, digits, underscores, and dollar signs

**? - Are the following valid variable declarations?**

```
var hello;
Var car1 = 'BMW';
var good_bye = "Adios " + "Muchacho";
var car-2 = 'Toyota';
var 1_person = 'Sally';
```

**Any questions regarding variables?**

### 4. Arrays<small> (25 mins)</small>

#### What are Arrays?

- In JS, technically there is no "array" data type. Arrays are actually a special type of object.
- Arrays are often the data structure of choice to hold an ordered "list" of data items.
- Each item in an array is called an _element_ (not to be confused with an HTML element).
- Elements can contain data of the same or different types, however, they most commonly hold the same type of data such as a list of strings.
- Elements in an array can even be objects, functions, even other arrays!
- Arrays dynamically grow and shrink in size as we add data to, and remove data from them.

#### Creating Arrays

There are two ways to create an array...

```js
// using a Constructor Function (less common syntax)
var nums = new Array(2, 4, 18);

// using Array Literal syntax (recommended best practice)
var nums = [2, 4, 18];
```

**IMPORTANT: In WDI, we will often show you alternative ways of doing things, including ways that are not necessarily the best or recommended way. Why do you think we do this?**

#### Accessing the Elements in an Array

We access elements in an array using **bracket notation**, passing in the "index" (position) of the element you want to access:

```js
var superheroes = ['Batman', 'Swamp Thing', 'Captain Marvel'];
var firstHero = superheroes[0];  // 'Batman'
```

Since when is `0` the first item in anything?  Since computer science came along! Internally, programs prefer to think in terms of "offsets" in memory and we access the first item using an offset of zero - this is referred to as being "zero-based".

**? - How would we access the element that contains the value "Captain Marvel"?**

> FYI, the individual characters in a string can be accessed using bracket notation also - try it!

#### Working with Arrays

It's time to practice working with arrays.

To start, in the console, create an array with several elements containing your favorite sports teams, animals, baby names, or whatever... Be sure to assign your array to a variable. You have 3 minutes...

The following are some of the methods available on array objects:

1. `Array.push()`
2. `Array.pop()`
3. `Array.shift()`
4. `Array.unshift()`
5. `Array.concat()`
6. `Array.indexOf()`
7. `Array.lastIndexOf()`
8. `Array.join()`
9. `Array.slice()`
10. `Array.splice()`

Let's pair up and I'll divvy out these methods...

Each pair will then have 5 minutes to research their assigned method.

Be prepared to explain your findings with the class:

- **What's the purpose of the method?**
- **What is the return value of the method?**
- **Is the original array mutated (changed)?**

## Further Study

### Data Type Classifications

Part of becoming a developer is learning to talk like one. This of course requires learning the vocabulary of programming.

When hanging with devs, you may hear some of the following lingo in regards to data types...

#### Primitive Data Types

Variables holding a **primitive** data type can hold only one value at a time.

In JS, we can further group primitive data types into two sub-types:

- Simple Data Types
  - string
  - number
  - boolean

- Special Data Types
  - undefined
  - null

#### Complex Data Types

Complex data types can be thought of as containers consisting of primitive data type values.

Accordingly, the **object** data type is a complex type.

> Note: You will come across **arrays** being referred to as a data type - and that's cool. In fact, your instructors may refer to arrays as if they are a data type. However, be aware that technically, arrays in JS are just special objects (as are functions).

Complex data types are also referred to as **reference types**. This is because when we assign one object to another, we are simply assigning a "reference" to the original object, whereas primitive types copy their value when assigning one variable to another. Let's see this in action by copying the following in to the console:

```js
// primitives (value type)
var x = 5;
var y = x;
console.log(x, y);
x = 10;
console.log(x, y);  // y is still equal to 5

// complex (reference type)
var o = {x: 5};
var p = o;
console.log(o, p);
o.x = 10;
console.log(o, p);  // p.x changed too!
```

Notice how the value of `y` did not change, yet object `p` did. Again, this is because `p` simply holds a reference, or points to, `o`.

### Type Conversion

JavaScript is very relaxed when it comes to data types. Contrary to non-dynamic languages, a variable can change its type.

```js
var m = 15;  // I'm a number
m = 'hey';   // Now I'm a string!
```

#### Beware of Implicit Conversion

JavaScript is friendly and tries to help us whenever it can. However, we all know that sometimes its better to be left alone.

__Try adding a string to a number.  What did JS do?__

__Now try comparing a number and a string containing the same digits using the equality (`==`) comparison operator__

```js
13 == "13"  // returns true!
```

This is why, unless there's a reason not to, use the _strict equality operator_ (`===`) as it will not perform type conversion. 

#### Explicit Type Conversion

We can easily convert a number to a string using the `toString()` and `toFixed()` methods:

```js
var n = 123.456;
var s1 = n.toString();  // "123.456"
var s2 = n.toFixed(2);  // "123.46"
```

There are a couple of handy methods used to convert strings to numbers: `parseInt()` and `parseFloat()`

```js
var s = "1234.567";
var n1 = parseInt(s);  // 1234
var n2 = parseFloat(s);  // 1234.456
```
Remember however, that the data type for both flavors, integer and float (short for floating-point), is _number_.

### Array - Practice

#### Simple Iteration with a `for` loop

Iterating through the elements of an array, one at a time, is a very common practice in programming.

We can use a `for` loop to iterate over the elements of an array like this:

```js
var teams = ['Bruins', 'Cal Bears', 'Ravens', 'Ducks'];
for (var i = 0; i < teams.length; i++) {
	console.log(teams[i]);
}
```

However, `for` loops are sooooo old school. Take a look at the next section to see how the cool kids iterate through an array. 

#### Iterating Over an Array's Elements

JavaScript arrays have several advanced _iterator methods_.

These methods require a function be supplied as an argument, so they are a little more complex to work with UNTIL you get comfortable with functions in general, and functions being supplied as arguments.

As an example, lets look at the `forEach` method that we can use instead of a `for` loop to iterate the elements:

```js
var teams = ['Bruins', 'Cal Bears', 'Ravens', 'Clippers'];
teams.forEach(function(el) {
    console.log(el);
});
```

Would you agree that this code's intention is clearer than that of the for loop?

The following are a couple of other iterator methods for you to research and practice with:

- `Array.filter()`
- `Array.map()`
- `Array.reduce()`

Finding a particular element within an array, or it's index (position) within the array, is very common. These two "newer" array methods work great for this task:

- `Array.find()`
- `Array.findIndex()`

User the following methods to check if some or all of the elements in an array meet a condition:

- `Array.some()`
- `Array.every()`

Feel free to use these arrays to practice with:

```js
var names1 = ["Plato", "Linus", "Rashad", "Aidan", "Hunter", "Rudyard", "Kaseem", "Armand", "Clayton"];
var names2 = ["Ferris", "Erich", "Alvin", "Brody", "Justin"];
```

## References

[MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

