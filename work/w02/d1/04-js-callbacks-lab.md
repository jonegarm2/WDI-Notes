![](https://pbs.twimg.com/profile_images/499022165404946432/2Kpm7afx_400x400.png)

# JavaScript Callbacks Lab

## Introduction

This lab provides an opportunity to practice working with callbacks.

>**Note:** This can be a pair programming activity or done independently.

## Exercise

### Setup

1. If you haven't done so already, create an account on _codepen.io_. CodePen is a great place to play with, and keep scratch code that you don't want to push to your GitHub account.
2. Copy each exercise to CodePen
3. Code away!

### Exercises

```js
// Exercise 1

// A fellow student shows you this code.  When he runs it, he expects it to
// wait three seconds, then write "Ding!" to the console.  Instead, it writes
// "Ding!" immediately.  Find the bug and fix it.

function writeDing() {
  console.log('Ding!');
}

var dingHandle = setTimeout(writeDing(), 3000);
```

```js
// Exercise 2

// Javascript arrays have a built-in sort method that can take
// a callback to tell it how to compare the things you want to sort.

// Research the array sort method.

// Write the sorting callback as a named function declaration

// Write the callback function to provide to the sort method so that
// the following code sorts the words from shortest to longest.

var words = ['short', 'medium', 'delicious', 'nice', 'lengthy'];

var sortedWords = words.sort(/* pass in your callback here */);

// Check that logging sortedWords outputs
// ["nice", "short", "medium", "lengthy", "delicious"]
```

```js
// Exercise 3
//
// Change Exercise 2 so that:
//   1. The words sort longest to shortest
//   2. Use an anonymous inline function

var longWordsFirst = words.sort(/* write an anonymous inline function here */);

// Check that logging longWordsFirst outputs
// ["delicious", "lengthy", "medium", "short", "nice"]
```

```js
// Exercise 4

// Let's pretend that we want to build a sandwich, but adding each
// ingredient is very cpu intensive, so we want to write each function
// that adds a certain ingredient to be written as an asynchronous
// function that, of course, accepts a callback that it will call after
// the ingredient has been added.

// The following are the completed functions to build a sandwich with:

function getBread(sandwich, cb) {
  setTimeout(function() {
    sandwich.push('bread');
    cb(sandwich);
  }, 1000);
}

function addMayo(sandwich, cb) {
  setTimeout(function() {
    sandwich.push('mayo');
    cb(sandwich);
  }, 900);
}

function addTurkey(sandwich, cb) {
  setTimeout(function() {
    sandwich.push('turkey');
    cb(sandwich);
  }, 800);
}

function addCheese(sandwich, cb) {
  setTimeout(function() {
    sandwich.push('cheese');
    cb(sandwich);
  }, 700);
}

// Variable to hold the sandwich's ingredients
var mySand = [];

// Assignment: Call the above functions so that logging mySand
// after "cheese" has been added
// produces these ingredients in the following order:
// ["bread", "mayo", "turkey", "cheese"]

```

### Solution Code

[This links to a CodePen containing the solution code](http://codepen.io/jim-clark/pen/yYbYBo?editors=001)