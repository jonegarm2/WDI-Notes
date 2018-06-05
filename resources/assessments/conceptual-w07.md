# Week 7 Conceptual - NAME: ___________  `__/15`


## JavaScript

```js
var x = 25;
var a = ['apple', true];

function fn(p1, p2) {
	p2 = p2 * 2;
	p1.push(p2);
};

fn(a, x);

console.log(x);
console.log(a);
```

##### Q1) What will be logged out when the above code is executed?
<br><br>

```js
var prices = {aa: 1.11, bb: 2.22, cc: 3.33};
function getPrice(sku) {
	setTimeout(function() {
		for (key in prices) {
			prices[key] += 1;
		}
	}, 0);
	return prices[sku];
}
var price = getPrice('bb');
```

##### Q2) When the above code executes, what will be the value of the variable `price`?
<br><br>

```js
let accounts = [
	{acctNo: 123, type: 'Checking', balance: 150},
	{acctNo: 234, type: 'Checking', balance: 200},
	{acctNo: 345, type: 'Savings', balance: 550},
	{acctNo: 456, type: 'Checking', balance: 550},
	{acctNo: 567, type: 'Savings', balance: 1500}
];
```
#### Assuming the above array of _account_ objects and the following array methods:

`forEach` `map` `reduce` `some` `filter` `find` `findIndex` `every`

#### Identify the MOST SUITABLE method to use for each of the following tasks:
> Hint: No method is used more than once

##### Q3) Obtain a new array with the _accounts_ having a `balance` greater than a certain amount
<br>

##### Q4) Obtain the _account_ object having an `acctNo` equal to 456
<br>

##### Q5) Check if there are any _accounts_ with a negative `balance`
<br>

##### Q6) In an ejs template, create an `<li>` for each of the _accounts_
<br>

##### Q7) Obtain a new array having the values of each _account_ object's `acctNo` property
<br>

##### Q8) Compute the sum of the balances for _accounts_ of `type` equal to 'Savings'
<br>

##### Q9) Check if all of the _accounts_ have a `balance` greater than 100
<br>

## Node

##### Q10) Node is (circle the best answer):

```
a) a programming language				c) only used on the server
b) a runtime environment for JS			d) a JavaScript library
```

#### Assuming the following two modules:

```js
// data.js

var api = {
	one,
	two,
	three: 3,
	four: 'four'
};

function one() {
	return 'something';
}

function two(a, b) {
	return a > b;
}

module.exports = api;
```
```js
// main.js

var data = require('./data');
var a = data.one;
var b = data.two(10, 5);
var c = data.three;
var d = require('./data').three;
```

##### Q11) What **data type** is `data.four`?
<br>

##### Q12) What **data type** is variable `a`?
<br>

##### Q13) What is the **value** of variable `b`?
<br>

##### Q14) What is the **value** of variable `c`?
<br>

##### Q15) What is the **value** of variable `d`?
<br>


