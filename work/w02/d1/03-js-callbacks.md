<img src="https://i.imgur.com/uizE4Zt.png" height="500">

# JavaScript Callback Functions

| Learning Objectives - SWBAT: |
| :--- |
| Identify 3 Use Cases for Callbacks |
| Use a Named Function as a Callback |
| Use an Anonymous Function as a Callback |

## Roadmap
1. What's a Callback Function? (5 mins)
2. When are Callbacks Used? (5 mins)
3. Anonymous vs. Named Functions (5 mins)
4. Using Callbacks with Iterating Methods (20 mins)
5. Using Callbacks with Asynchronous Methods (40 mins)

### 1. What's a Callback Function?<small>  (5 mins)</small>

First, relax, **callback functions** are not a new type of function that you have to learn - they are just functions.

In fact, you've already seen callbacks in use in the DOM Manipulation lesson and you used them in your Tic-Tac-Toe project because your event listener(s) needed a function to call, a _callback function_, when an event like _click_ happens.

When we pass a function to another function as an argument, and execute that function that's being passed in, we often refer to the function being passed in as a **_callback_** function.

Something like this should look familiar:

```js
var myElement = document.getElementById('my-element');

myElement.addEventListener('click', function(event) {
  alert('Clicked!');  
});
```

The function that's the second argument in the `addEventListener` method is a _callback function_.

**?: Besides being a _callback function_, what's another distinction of that function?**

### 2. When are Callbacks Used?<small>  (5 mins)</small>

Again, callback functions are functions that get called later by the method/function we pass them to.

**Here are three use cases (when to use) for callback functions:**

1. To provide a function to an iterator method, for example, the `forEach` method on arrays.

2. To provide a function that should be executed each time an event happens - just like the `addEventListener` example above.

3. To provide a function that should be executed when an _asynchronous_ process has completed.

In a bit, we're going to take a look at and practice with each of these scenarios...

### 3. Anonymous vs. Named Functions<small>  (5 mins)</small>

#### Anonymous Functions are Convenient

Not surprisingly, an **anonymous** function is an unnamed function.

Often in JavaScript we don't need certain functions to have a name - anonymous functions to the rescue!

Anonymous functions save us from having to unnecessarily think up names when _we_ are not going to be invoking the function from anywhere else in our code.

Let's take a look at that `addEventListener` example from above again:

```js
myElement.addEventListener('click', function(event) {
  alert('Clicked!');  
});
```

Since we are not going to be calling the function from anywhere else in our code, we don't need to name it and thus we are using an anonymous function as our callback.

#### Using Named Functions as Callbacks

We don't always have to write an inline anonymous function as our callback, we can pass a named function like this:

```js
myElement.addEventListener('click', myCallback);

function myCallback(event) {
	alert('Clicked!');
}
```
Note that we need to be sure to include any required parameters, like the `event` param above, when defining our function - just as if we had used an inline anonymous function.


>Important: When we pass a function as an argument, we usually want to provide the actual function definition, so don't type parenthesis after the name of the function! Otherwise, we will be invoking it and end up passing the result of executing that function instead of the function definition itself.

**?: When would it be advantageous to using a named function vs. an anonymous function?**

**?: Could we have used a function expression to define `myCallback` instead of a function declaration?  If so, would we have to make any other changes in the code?**

### 4. Using Callbacks with Iterating Methods<small>  (20 mins)</small>

The `forEach` method on arrays is a popular method for iterating over all of the elements in an array. We provide `forEach` a callback function and it will be called once for each element in the array.

**?: In the following example, how many times would the anonymous callback function would be executed?**:

```js
var flowers = ['rose', 'orchid', 'daisy'];
	
flowers.forEach(function(flower, idx) {
	console.log((idx + 1) + ') ' + flower);
});
```
>Note: The second parameter, `idx`, is optional, as is a third parameter which is a reference to the entire array itself.

Copying the code into the `console` will result in the following output:
	
```
1) rose
2) orchid
3) daisy
```
Several other iterating methods that use callback functions can be found here: [MDN - Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Practice - Callbacks with Iterator Methods

To practice in today's lesson, we will use [repl.it](https://repl.it/). Let's open it up and test it using the above flowers code above.

You may work with a partner on this exercise.  Read all of the requirements below before you start:

1. Research the array `filter()` method.
2. Use `filter()` to retrieve the car objects which have been driven more than 20,000 miles per year from the following array of "car" objects:

	```js
	var cars = [
	  { make: 'Toyota', yrsOld: 5, mileage: 92399 },
	  { make: 'Ford', yrsOld: 12, mileage: 255005 },
	  { make: 'Ferrari', yrsOld: 9, mileage: 12966 },
	  { make: 'Subaru', yrsOld: 9, mileage: 111266 },
	  { make: 'Toyota', yrsOld: 2, mileage: 41888 },
	  { make: 'Audi', yrsOld: 3, mileage: 57720 }
	];
	```

3. Instead of an anonymous inline function for the callback, use a function declaration or function expression for the callback.
4. Store the new array returned `filter` in a variable named `wellDrivenCars`.
5. Call the `forEach` method on `wellDrivenCars`, passing to it an anonymous function that accepts two parameters: the current car and the current index. Within the callback, use `console.log` to log out each well-driven car formatted like this: `Car 1 - Ford (21250 miles/year)`

We'll review a solution in 15 minutes...


### 5. Using Callbacks with Asynchronous Methods<small>(40 mins)</small>

#### Synchronous Code Execution

Synchronous code is code that executes line-by-line and each line finishes executing before the next line runs. For example look at this code:

```js
var count = 0;
var sync1 = function() { count++; console.log('count: ' + count) };
var sync2 = function() { count++; console.log('count: ' + count) };
var sync3 = function() { count++; console.log('count: ' + count) };

sync1();
sync2();
sync3();
```
The output would be just as you would expected:

```
count: 1
count: 2
count: 3
```

Each function finished executing before the next function was called.

#### Asynchronous Code Execution

Imagine that one of the above functions might take a significant amount of time to finish executing. Perhaps it needs to fetch some data from a database or from the internet.

In our web applications, this would cause a problem because our browser window has only **one** CPU thread to render the DOM, handle user events and execute JavaScript. Thus, our thread would be spending much of its time just waiting for the long-running operation to complete - meanwhile, our app would be completely unresponsive.

To prevent our application's UI from freezing up when performing these long-running tasks, JavaScript insists that certain operations to be performed _asynchronously_.

The asynchronous programming model allows JavaScript to start an asynchronous function, let it run in the background while continuing to execute subsequent code. Then at some point, when the asynchronous function finishes with its operation, it will invoke the provided callback function.

The asynchronous programming model is also known as an **event programming model** and is implemented by JavaScript's [Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop).

When we start working with NodeJS & MongoDB, we will be calling lots of async functions. Also, we will be using either jQuery or JavaScript's own _fetch_ API to make AJAX calls across the network/Internet. **Guess what the "A" in AJAX stands for?**

However, until we start calling async functions in those libraries, in this lesson we will use JavaScript's `setTimeout()` function to write some asynchronous code.

Now let's see how the synchronous example above would operate differently if one of the functions were a long-running async function:

```js
function async() {
  // simulate a long-running async operation
  setTimeout(function() {
    console.log('async finished');
  }, 1000);
};
function sync1() { console.log('sync1 executed'); };
function sync2() { console.log('sync2 executed'); };

sync1();
async();
sync2();
```
Running the above code produces the following output:

```
sync1 executed
sync2 executed
async1 finished
```
Note how `sync2 executed` was printed before `async finished` - even though it was called afterwards. JS did not wait for `async` to finish before executing the next line of code - this is JavaScript's event-driven/asynchronous programming model in action.

Another good example of asynchronous code execution is the browser itself loading a web page. The browser does not load one image at a time. It kicks off the requests for the images and they run in parallel, informing the browser when they have loaded so that they can then be displayed.

JavaScript's event-driven programming model is very performant and efficient, however, it can be more complex to code than synchronous languages such as Ruby.

What makes it more complex? It's more complex because you have to take into consideration that the **results** of calling an async function are not immediately available to work with in subsequent code.

For example, the `getFriends()` function below is synchronous, it returns the array of friends immediately when invoked, and everything works just fine:

```js
// synchronous function
function getFriends() {
  return ['Fred', 'Barney'];
};

var friends = getFriends();

friends.forEach(function(friend) {
  console.log(friend);
});
``` 

Now let's use `setTimeout` in `getFriends()` to simulate fetching data from the network/Internet asynchronously:

```js
// asynchronous function
function getFriendsAsync() {
  setTimeout(function() {
    return ['Fred', 'Barney'];
  }, 0);
};

var friends = getFriendsAsync();

// will fail because friends does not yet hold an array
friends.forEach(function(friend) {
  console.log(friend);
});
```

Running the above code will generate an error because the `friends` variable will not be an array of data before we call `forEach` on it.

What's a programmer to do?

#### Callbacks to the Rescue 

The async programming model requires the use of our new found friend, callbacks (or promises, which is a lesson for another day).

We're going to make it possible to work with the `getFriendsAsync` function by refactoring it to accept a callback function:

```js
// refactored to accept a callback
function getFriendsAsync(cb) {
  setTimeout(function() {
    // pass the results to the provided callback
    cb(['Fred', 'Barney']);
  }, 0);
};

// execute and provide it with an anonymous callback function.
getFriendsAsync(function(friends) {
  friends.forEach(function(friend) {
    console.log(friend);
  });
});
```

Now that the `getFriendsAsync` function has been refactored to accept a callback function, it can invoke that function when it's ready, passing it the array of friends!

Key point to remember, asynchronous functions, whether from a library, or our own, will have to either:

1. Require a callback parameter, or
2. Return a _promise_.

#### Practice

Do this exercise in pairs.

Below is an asynchronous function named `withdrawFunds` that uses `setTimeout` to simulate accessing a database. The `withdrawFunds` function is complete - there's no need to change any of the code in it.

`withdrawFunds` defines the following parameters:

- The **_account_** to withdraw funds from
- the **_amount_** to withdraw, and
- a callback function, **cb**, that will be invoked along with the updated account balance after the withdraw as its sole argument.

Note that if there is not enough funds in the account, `withdrawFunds` does not deduct from the account's balance and returns the current balance.

There is an object named `accountBalances` that has a few key/value pairs, where the keys represent _account numbers_ (string) and the value is that account's balance (number). This object demonstrates one way to associate something like an account number to information such as its balance.

Lastly, there is a variable named `curAcct` that you should use as an argument to specify the account we want to withdraw funds from - based on the code, **what account are we going to be working with?**

```js

var accountBalances = {
  '01234': 100,
  '56789': 800,
  '13579': 375
};

var curAcct = '01234';

function withdrawFunds(account, amount, cb) {
  setTimeout(function() {
    if (accountBalances[account] < amount) {
      console.log('NSF');
      cb(accountBalances[account]);
    } else {
      var newBal = accountBalances[account] - amount;
      console.log('New Balance: ' + newBal); 
      cb(newBal);
    }
  }, 500);
}

// Your code here...
```

**Quick check: Why do we need to provide a callback function again?**

Note that the `withdrawFunds` function does not modify the balance in the `accountBalances` object - that is going to be the calling code's responsibility (using the updated balance passed into our callback function).

Your goal is to call the `withdrawFunds` function three times, passing in `curAcct` (which holds account number _01234_), and withdrawing amounts in this sequence: 40, 20 & 90.

Correctly written code will result in the following values being displayed in the console's output, one at a time, a half-second from each other:

```
New Balance: 60
New Balance: 40
NSF
Final Balance: 40  // console.log this in the your final callback function
```

**Hint**: You cannot invoke `withdrawFunds` the second and third time until the prior call has completed because we have to wait for that updated balance.  Keeping this important point in mind, where is the code that withdraws the second and third time have to go?  Remember, the second call can't be made until the first call has finished, etc.

We'll review a solution in 15 minutes...

For reference, here's [a CodePen with a possible solution](http://codepen.io/jim-clark/pen/PZRGNq?editors=0012). Remember, you are only cheating yourself :)

#### Pyramid of Doom

You'll notice that when invoking multiple async functions with callbacks, the nested code starts to look like something referred to as "The Pyramid of Doom", also known as "Callback Hell".  JavaScript **promises** can be used to "flatten" the Pyramid of Doom.

### Essential Question

**Take one minute to discuss the use case for callbacks with a partner. <br>Prepare to discuss...**

## References

[Understand JavaScript Callback Functions and Use Them](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)
