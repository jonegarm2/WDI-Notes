# Walk-Thru of Array Iterator Methods

## Intro

JavaScript Arrays have lots of helpful built-in methods.

These methods allow you to write more **declarative/functional** code as opposed to **imperative** code.

#### Imperative Programming

Imperative programming is a more step-by-step way of writing code.

`for` loops, for example, are imperative: 

```js
for (var index = 0; index < array.length; index++) {
    // do stuff
}
```

With a `for` loop we're saying:

1. Initialize a looping variable
2. Use the looping variable to access an element in the array
3. Increment the looping variable
4. If the looping variable is less than the length of the array, loop again

#### Declarative Programming

In declarative programming, we write code that describes what we want to do:

```js
array.forEach(function(val) {
    // do stuff
})
```

*How* are we iterating? Don't need to worry about that.

#### Trends in Development

Current trends in development are pushing toward using declarative code over imperative code.

This walk-thru summarizes popular _iterator_ methods, that is, methods that declaratively iterate over an array's elements, invoking a callback function for each iteration (one element at a time).

## Method Summary

| Method | Purpose | Returns | Callback Should | Callback's Args |
| --- | --- | :-: | --- | --- |
| `forEach(cb)` | General purpose |`undefined` | Do whatever you want | `(elem, idx, array)` | 
| `map(cb)` | Create new array from source array | new array | Modify each element as desired and return it | `(elem, idx, array)` | 
| `reduce(cb, initAcc)` | Reduce the array to a single value/object | final value of `acc` | Return the new value for `acc` | `(acc, elem, idx, array)` | 
| `filter(cb)` | Filter source array | new array | Return truthy if `elem` is to be included | `(elem, idx, array)` | 
| `find(cb)` | Find an element | the first `elem` found | Return truthy if `elem` is what you're looking for | `(elem, idx, array)` |
| `findIndex(cb)` | Find a certain element's **index** | the index of the first `elem` found | Return truthy if `elem` is what you're looking for | `(elem, idx, array)` |
| `some(cb)` | Check if array has something | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx, array)` |
| `every(cb)` | Check if every `elem` passes condition | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx, array)` |

## Code Examples

---

## `forEach`

```js
let friends = ["Melissa", "Marc", "Andrew", "Nick"];

friends.forEach(function(elem) {
    console.log(`I have a friend named ${elem}`)
})

// logs out "I have a friend named <friend's name>" for each friend
```

**YOU DO**: Using `forEach` log out each of my `friends` but with the first letter of their name lower-cased. Use the `<str>.toLowerCase()` method. 

```js
let cats = "Cats";
cats.toLowerCase() //=> cats
``` 

---

## `map`

```js
var nums = [1, 2, 3];
var squared = nums.map(function(num) {
    return num * num
});

// squared is [1, 4, 9]
```

What data type are all property names in an object?

```js
const obj = {
    a: "A",
    b: "B",
    c: "C",
    one: 1,
    two: 2,
    three: 3
};

let types = Object.keys(obj).map(function(elem) {
    return typeof elem;
});

console.log(types);
```

**YA DO**: Given an array of instructors,

```js
let instructors = ["Jim", "Jon", "AJ", "Jerry"];
```

Use `map` to create a new array that adds the string "is awesome" to element in the array.

```js
["Jim is awesome", "Jon is awesome", "AJ is awesome", "Jerry is awesome"]
```
---

## `reduce`

```js
var nums = [25, 6, 100, 3];
var sum = nums.reduce(function(acc, num) {
	return acc + num;
}, 0);

// sum equals 134
```

```js
var votes = ['Yes', 'No', 'No', 'Yes', 'Yes'];
var tally = votes.reduce(function(acc, vote) {
	acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
	return acc;
}, {});

// tally is {"No": 2, "Yes": 3}
```

---

## `filter`

```js
let nums = [100, 2, 5, 42, 99];
let odds = nums.filter(function(num) {
    return num % 2;
});

console.log(odds);
```

**U DO**: Filter out all "jerks". 

```js
let people = ["jerks", "nice people", "jerks", "nice people", "nice people"];
```

---

## `find`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];

var firstWhiteCar = cars.find(function(car) {
    return car.color === 'white';
});
// firstWhiteCar is {color: 'white', make: 'Toyota', year: 2013}

var missingCar = cars.find(function(car) {
    return car.color === 'black';
});
// missingCar = undefined
```

**Please sir. Could you do?**: `find()` my apple.

```js
let fewd = ["apple", "pizza", "taco", "skittles"];
let appple = /* fill code in here */
```

## `findIndex`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];

var firstWhiteCarIdx = cars.findIndex(function(car) {           
	return car.color === 'white'
});
// firstWhiteCarIdx equals 1

var missingCarIdx = cars.findIndex(function(car) {
    return car.color === 'black';

});
// missingCarIdx = -1
```

## `some`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];

var hasFord = cars.some(function(car) {
	return car.make === 'Ford';
});
// hasFord is true
```

**You-ey do-ey**:  Do I have an evil monkey in my room? 

```js
let myRoom = ["evil monkey", "bed", "lamp"];
let isEvilMonkeyInRoom = /* Fill code in here */
```

## `every`

```js
var cars = [
	{color: 'red', make: 'BMW', year: 2001},
	{color: 'white', make: 'Toyota', year: 2013},
	{color: 'blue', make: 'Ford', year: 2014},
	{color: 'white', make: 'Tesla', year: 2016}
];
var everyCarIsWhite = cars.every(function(car) {
	return car.color === 'white';
});

// everyCarIsWhite is false
```

## Reference

[Array Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
