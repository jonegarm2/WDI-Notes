# Week 10 Conceptual Assessment
## Name: __________________________ &nbsp;&nbsp;&nbsp;Score:  ____ / 12 

## JavaScript

##### 1) What Array method is best suited for transforming an array of objects into a new array of React components?<br><br>

##### 2) What Array method is best suited for "selecting" certain elements into a new array?<br><br>


```js
var a = !undefined;

var b = [1, 2, 3];

var [c] = b;

var d = {size: 'large', color: 'green', price: 1.23};

var {color} = d;

const test = ({price}) => console.log(price);
```
Assuming the code above has been executed:

##### 3) What is the value of variable `a`?<br><br>

##### 4) What is the value of variable `c`?<br><br>

##### 5) What is the value of variable `color`?<br><br>

##### 6) What is logged out when `test(d);` is invoked?<br><br>

## ReactJS

##### 7) When developing in React, we build the application's User Interface by composing<br><br>_________________?<br><br>

##### 8) A component without it's own state can be written as a `class`.<br>`TRUE` &nbsp;&nbsp;&nbsp; -or- &nbsp;&nbsp;&nbsp; `FALSE`<br><br>

##### 9) A component that has its own state can be written as a _stateless functional component_.<br>`TRUE` &nbsp;&nbsp;&nbsp; -or- &nbsp;&nbsp;&nbsp; `FALSE`<br><br>

```js
const Comment = (props) => {
	render() {
		return (
			<div>{props.comment}</div>
		);
	}
};
```

##### 10) The above `<Comment>` component has no chance of working. Why?<br><br>

##### 11) A component can pass data and functions to its child components via<br><br>_________________?<br><br>

##### 12) What triggers the User Interface to re-render in a React app?<br><br><br><br>

