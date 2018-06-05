<img src="https://i.imgur.com/fx2orT2.png">

# Event Handling in React
---

## Learning Objectives

#### Students Will Be Able To:

- Identify which components trigger browser events
- Pass an event handler (method) to a child component
- Ensure event handlers that need to modify state have `this` bound to the proper context (component)
- Use ES7's Class Properties to efficiently and concisely bind methods
- Optionally pass arguments to event handlers

## Roadmap

- Review the Starter Code
- Intro to Browser Events in React
- Event Handlers (methods)
- Essential Questions

## Review the Starter Code

#### Setup

The supplied starter code is the styled Mastermind game app thus far (the same code as the solution code for the styling lab).

We will learn about event handling by implementing it in Mastermind, so:

1. `cd` to  the project folder (_react-mastermind_, **not** _starter-code_) in Terminal
2. Install the Node modules: `$ npm install`
3. Open the project in your text editor
4. Spin up the dev server: `$ npm start`

The dev server should automatically open Mastermind in the browser, which should look like this:

<img src="https://i.imgur.com/GjPY7qY.png">

#### Refactoring the App's State

Notice that for styling purposes, **line 25** of **App.js** is filling the `guesses` array with 4 calls to `this.getNewGuess()`.

Let's change this so that the game loads correctly with only one pending guess:

```js
this.state = {
  colors,
  code: this.genCode(colors.length),
  selColorIdx: 0,
  // Update below to only one call to getNewGuess
  guesses: [this.getNewGuess()]
};
```

That's a good start, but we also don't want to "pre-select" the player's color choices as we're currently doing (again, for styling purposes).

On **line 32** you'll see that we are returning a new guess with the **code** array set like this: `code: [3, 2, 1, 0]`. **What do those numbers correspond to?**

Instead, we are going to represent a "no color choice" with a `null` value which has been set up on **line 31** - uncomment it and **delete line 32**.

With that done, the pegs will no longer have any visual representation (but the `<div>`s are still there). Our goal should be to show an "empty" peg. Let's update the `style` object in **GuessPeg.jsx** as follows:

```js
let style = {
  width: 40,
  height: 40,
  margin: 5,
  borderRadius: '50%',
  backgroundColor: props.color,
  opacity: 0.85,
  // Add a border unless there's a color
  border: props.color || '1px dashed grey'
};
```

> Refresher: JS's logical `OR` operator returns the first value if it's truthy, otherwise, the second value is returned.
 
That's a tidy example of dynamic styling for the **border** property.

Looking really good now, but let's make the pegs in the **current** guess row look "clickable" by making the cursor a pointer. Yay, another opportunity to put the `currentGuess` prop to good use.

**Use React DevTools and browse the component hierarchy until you find the first component that has a `currentGuess` prop. Yell it out when you find it!**

Cool, **now write the code to pass the `currentGuess` down to each of the four `<GuessPeg>` components**.

Lastly, just add the following property to the `style` object:

```js
cursor: props.currentGuess && 'pointer'
```
> Refresher: JS's logical `AND` operator returns the first value if it's falsey. Otherwise, the second value (`props.currentGuess`) is returned.

Note that React does not get pissed off if we assign `false` to the `cursor` property - it just ignores it!

Here's what we should be seeing at this point:

<img src="https://i.imgur.com/mPDHwRz.png">

Excellent! Now let's talk about events...

## Intro to Browser Events in React

First, **what are some common browser events we've worked with during WDI so far?**

In case you need to be reminder, [here you go!](https://developer.mozilla.org/en-US/docs/Web/Events).

Like many things in React, event handling is a little different than what we are used to.

Let's see how...

#### Connecting Handler Code to Events in React

In React, we do not add event listeners using JavaScript's `addEventListener` method. Instead, we use a component's props to connect that component's events to a handler.

Let's see this by adding an anonymous arrow function as a click handler on the colored circles within the `<ColorPicker>` component:

```js
const ColorPicker = (props) => {
  return (
    <div className="ColorPicker">
      {props.colors.map((color, idx) =>
        <div
          className="ColorPicker-color"
          style={{
            backgroundColor: props.selColorIdx === idx ? 'white' : color,
            border: props.selColorIdx === idx ? `14px solid ${color}` : false
          }}
          key={color}
          onClick={() => alert('clicked!')}
        />
      )}
    </div>
  );
}
```
Just an `alert` for now - test it out.

Observations:

- The names for event props are camel-cased (`onClick`). In HTML, the attribute would be `onclick`. Here's the [list of events](https://facebook.github.io/react/docs/events.html#supported-events) supported by React.
- The JS expression (always within curly braces) assigned to an event prop must evaluate to a **function**. A function type, **not** a function call (unless that function call returns a function).
- In native JS, if the event handler function returns `false`, it prevents the default behavior of that event and stops event bubbling (same as calling both the `preventDefault()` & `stopPropagation()` methods). However, in React we must call the `preventDefault()` method on the **Synthetic Event** object...

> One last observation - check out the best practice code formatting/indentation when a component has more than a couple of props!

#### The Synthetic Event Object

You've seen how event handlers are automatically passed an event object as an argument. In a React app however, this event object is a React [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html) that wraps the browser's native event object.

React does this because React has its own event system that:

- Handles lingering browser incompatibilities.
- Improves performance by implementing a single delegated event handler for all events.

The good news is that React's event system is transparent to us. More importantly, the API of the Synthetic Event object is pretty similar to the browser's, which means we can still invoke `preventDefault()`, `stopPropagation()`, access `target` & `clientX` properties, etc.

## Event Handlers (methods)

You just saw a silly inline anonymous arrow function used as an event handler that popped up an alert when one of the colors in the `<ColorSelector>` was clicked - not very useful.

More commonly, the event handler will need to update some state in response to an event.

Questions:

<details>
	<summary>What method do we call to update a component's state?</summary>
	setState()
</details>

<details>
	<summary>To what object is that method called on? In other words, where is that method callable?</summary>
	The component that owns the state
</details>

#### Defining a Method for Event Handling

Let's continue working with the `<ColorSelector>` with the intention of setting the `selColorIdx` to the index of the clicked color...

<details>
	<summary> What component owns the <strong>selColorIdx</strong> state property?</summary>
<code>&lt;App /&gt;</code>
</details>

<details>
	<summary>Where are we going to have to put the method that calls <code>setState()</code> to change the value of <code>selColorIdx</code>?</summary>
> Within <code>&lt;App /&gt;</code>, of course!
</details>

For now, a method in `<App>` that pops up an alert:

```js
handleColorSelection() {
  alert('color selected!');
}
	
render() {
  ...
```

#### Passing Event Handlers to Children Components

We need to be able to invoke the `handleColorSelected` that lives in `<App>`, from the `<ColorPicker>` component.

The **only way** to give `<ColorPicker>` a **reference** to the method is to pass it via props:

Update **App.js** like this:

```html
<ColorPicker
  handleColorSelection={this.handleColorSelection}
  colors={this.state.colors}
/>
```

Now, `<ColorPicker>` will have access to the `handleColorSelection` via `props.handleColorSelection`.

**What is the name of the prop we just added to `<ColorPicker>`?**

**Does the name of the prop HAVE to be this?**

Inside of `<ColorPicker>` we can now assign `handleColorSelection` to the `onClick` event on a **React element** component like so:

```js
const ColorPicker = (props) => {
  return (
    <div className="ColorPicker">
      {props.colors.map((color) =>
        <div
          onClick={props.handleColorSelection}
          className="ColorPicker-color"
          style={{backgroundColor: color}}
          key={color}
        />
      )}
    </div>
  );
}
```

> Note: We got lucky in that `<ColorPicker>` is a direct child of `<App>`. However, this often won't be the case, so, **what will we have to do?**

You should now see the alert when a color is clicked!

Can it really be this easy? In most cases, the answer is "No" due to the reasons we are going to discuss next...

#### Providing Arguments to Methods

We will need to pass the newly selected color's index as an argument to the `handleColorSelection` method when the color is clicked.

First, let's update the `handleColorSelection` method in **App.js** to accept the index as an argument:

```js
handleColorSelection(colorIdx) {
  alert(`color index ${colorIdx} selected!`);
}
```
Now on to `<ColorPicker>`...

As stated earlier, we must provide a function type, **not invoke** the function. So **this won't work**:

```js
onClick={props.handleColorSelection(idx)}
```

Writing the above code will actually invoke the method each time it's rendered - resulting in an alert each time, funny, but not really.

So, what's the solution? Try this on for size:

```js
onClick={() => props.handleColorSelection(idx)}
```

**What have we done here?**

Nice solution and testing out seems like things are going to great - except...

#### Context Binding

Now that we have the index of the newly selected color being passed to `handleColorSelection`, it seems like we should be able to easily call `setState` to update `state.selColorIdx` like this:

```js
handleColorSelection(colorIdx) {
  this.setState({selColorIdx: colorIdx});
}
```

However, testing it out reveals that it doesn't work and there's an error in the browser's console telling us why: `Uncaught TypeError: this.setState is not a function`.

We know that the component has a `setState` method on it, so what gives? The problem is that `this` is not bound to the `<App>` component!

Logging out `this` will verify that it's actually bound to `<ColorPicker>`'s `props` object - not `<App>` where the `handleColorSelection` method lives!

<details>
<summary>Why is <code>this</code> within <code>handleColorSelection()</code> being bound to the <code>props</code> object?</summary>
The binding of <code>this</code> is determined by how a function is called. In this case, since the <code>handleColorSelection</code> method is attached to the <code>props</code> object - it's that object because it's left of the dot!
</details>

So, we need to have `this` bound to the `<App />` component where the `setState()` method is.  There are a couple of ways to explicitly set the binding of _regular_ functions by using their `bind`, `call` and `apply` methods.

In React, prior to a new syntax coming that I'm going to show you next, the most popular way was to use `bind` in the constructor to create a **new** function that has `this` explicitly bound to its first argument:

```js
class App extends Component {
  constructor(props) {
    super(props);
    let colors = ['#155765', '#57652A', '#AB9353', '#4D2C3D'];
    this.state = {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    };
    // Explicit binding to this component
    this.handleColorSelection = this.handleColorSelection.bind(this);
  }
  ...
```

That one line of code fixed the problem!

However, there's a better way that's coming with ES7+ called **Property Initializers**. Property initializer syntax allows us to define properties within a class like we currently do with methods.

First, remove the explicit binding line of code we just added in the constructor:

```js
// remove this line of code!
this.handleColorSelection = this.handleColorSelection.bind(this);
```

Okay, here's the latest and greatest way, using **Property Initializers**, to define a method used as a callback:

```js
handleColorSelection = (colorIdx) => {
  this.setState({selColorIdx: colorIdx});
}
```

The reason this works is because property initializers are initialized from within the constructor method (even if you don't define one, there's always a default constructor method in hiding). Now, **what is `this` bound to within constructor functions?**

Accordingly, the arrow function expression will be bound to the component instance because they are always bound to their surrounding function's context. In this case, that function is the constructor function!

I can assure you that using property initializer syntax for defining callbacks in a React class component will become a best practice, if they haven't already.

#### Summary

Writing event handler code can be challenging and error prone until you get used to it.

If things aren't working, be sure to verify the value of `this` and closely read the error messages. Hey, instead of console.logging, use the `debugger` statement to programmatically set a breakpoint in the source code.

## Essential Questions

- **True or False: Does a method that updates a component's state have to be defined within that component? Explain your answer.**

- **How does a nested component obtain a reference to ancestor component's methods?**

- **Is this code bogus or cool? Why?**

	```js
	<Square className="Square" handleClick={this.handleClick(5)} />
	```

## References

[Synthetic Events](https://facebook.github.io/react/docs/events.html)





