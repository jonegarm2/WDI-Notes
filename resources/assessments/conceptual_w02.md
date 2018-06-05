# Week 2 Conceptual - NAME: __________ `__/10` 

```js
var color = 'yellow';

var crimeFighters = {
  turtles: ["Leonardo", "Raphael", "Michelangelo", "Donatello"],
  rangers: {
    red: "Jason",
    black: "Zack",
    yellow: "Trini",
    blue: "Billy",
    pink: "Kimberly",
    green: "Tommy"
  }
};

if (crimeFighters.rangers.red === 'Jason') crimeFighters.rangers.blue = 'Bob';
```
#### Assuming the above code has been run:

##### 1. What does the expression `crimeFighters.turtles[3]` return?
<br>

##### 2. What does the expression `crimeFighters.rangers[color]` return?
<br>

##### 3. What does the expression `crimeFighters.rangers.blue` return?
<br>

```js
var b = "cat";
var a = "dog";
a = b;
a === "duck"
```

#### Assuming the above code has ran:

##### 4. What is the value of `a`?
<br>


```js
var myFunc = function() {
  "hello world";
};
console.log(myFunc)
```

##### 5. The student that wrote the code above expected "hello world" to log in the console. Explain what change(s) are needed to make the code work as expected - without `console.log` being added within the `myFunc` function?
<br><br><br>

```js
var dog = 'Spot';
function start(){
  var dog = 'Rusty';
}
start();
alert(dog);
```

##### 6. What value will be shown in the above `alert`?
<br><br>

```js
var stuff = [
  ['one', 2, false],
  {
	apples: 12,
	fn: function() { return this.apples; }
  },
  false
];

var a = 2;
```
#### Assuming the above code has ran:

##### 7. What does the expression `stuff[a]` evaluate to?
<br>

##### 8. What does the expression `stuff[0][a]` evaluate to?
<br>

##### 9. What does the expression `stuff[0][1]` evaluate to?
<br>

##### 10. What does the expression `stuff[1].fn()` return?
