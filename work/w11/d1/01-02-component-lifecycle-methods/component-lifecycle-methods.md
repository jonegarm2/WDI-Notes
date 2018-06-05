<img src="https://i.imgur.com/fx2orT2.png">

# Component Lifecycle Methods
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case for lifecycle methods |
| List the three phases lifecycles are grouped into |
| Override a lifecycle method |

## Roadmap

- The Lifecycle of Components
- The Lifecycle Methods
- Review the Starter Code
- Overriding the Lifecycle Methods
- Adding a Game Timer to Mastermind
- Essential Questions
- Practice Exercises

## The Lifecycle of Components

#### Quick Review:

- **What method do we use to change a component's state?**
- **What happens when we invoke the above method?**

#### What are Lifecycle Methods

When a React app first loads and/or when state is changed, React components may be instantiated, updated, and destroyed.

These three **phases** represent a component's **lifecycle** and are more formally called:

- **Mounting** - the phase that occurs when an instance of a component is being created and inserted into the DOM
- **Updating** - the phase that occurs when a component is already in the DOM but is being re-rendered when state changes
- and **Unmounting** - the phase that occurs when a component is being removed from the DOM and destroyed

React's `Component` base class, that we subclass using `extends`, has several methods that React automatically invokes during a component's lifecycle process.

For example, you are already familiar with a couple of them: `constructor` and `render`.

#### Why do Lifecycle Methods Exist?

In many React apps, sometimes overriding just the `render` method is not enough.

**Lifecycle methods enable developers to write code that executes during the stages of a component's lifetime.**

The ability to "hook" code into a component's lifetime is why these methods are also referred to as "lifecycle hooks".

Some use cases that require overriding certain lifecycle methods include:

- Making AJAX calls
- Performing animations
- Performance optimization
- Adding/removing event listeners & timers

Before we look at specific lifecycle methods, let's set up the provided starter code...
 
## Review the Starter Code

Ensure the starter code is ready to go:

1. `cd` to  the project folder in Terminal
2. Install the Node modules: `$ npm install`
3. Open the project in your text editor
4. Spin up the dev server: `$ npm start`

The dev server should automatically open Mastermind in the browser, which should look like this:
<img src="https://i.imgur.com/4sllgdP.png">

Since the last time you saw the Mastermind app in the _Handling Events in React_ lesson, routing has been implemented using components from the `react-router-dom` module.

There are two route paths:

- The `/` (root route) URL is for playing the game
- and `/settings` is for selecting the difficulty level of the game:

<img src="https://i.imgur.com/eSR0qLR.png">

## The Lifecycle Methods

The following diagram lists the lifecycle methods available on components:

<img src="https://i.imgur.com/R1WSXS6.jpg">

#### Mounting Phase (Initial Render of a Component)

| Lifecycle Method | When Invoked | Uses |
| --- | --- | --- |
| `componentWillMount`<br>Args: `()` | Before `render()` & mounting | Use to further initialize `state` without triggering another `render()`. |
| `render`<br>Args: `()` | Called after `componentWillMount()`. The only method required to be overridden. Never modify state within. | Renders the component to the virtual DOM. Nothing will be rendered if `false` is returned. |
| `componentDidMount`<br>Args: `()` | Invoked after the component has been added to the DOM. | One of the most useful methods. Access raw DOM nodes, add event listeners & timers, load data via AJAX, etc. |

#### Updating Phase (State or Props Change)

| Lifecycle Method | When Invoked | Uses |
| --- | --- | --- |
|`componentWillReceiveProps`<br>Args: `(nextProps)` | Invoked before a mounted component receives new props. Called even if props may not have changed. Not called on inital rendering. | Use to examine props and compute state if based on values of props. |
| `shouldComponentUpdate`<br>Args: `(nextProps, nextState)` | Invoked before rendering when props or state are updated. | Performance optimization - gives us a chance to exit the remaining lifecycle by returning `false`, however, does not prevent child components from rendering if their state has changed. |
|`componentWillUpdate`<br>Args: `(nextProps, nextState)` | Invoked immediately before rendering. Won't be invoked if `shouldComponentUpdate()` returns `false`. | Use to prep for an update about to happen (not too common) |
|`componentDidUpdate`<br>Args: `(nextProps, nextState)` | Invoked after rendering. | Perform AJAX based on prop values changing. Manipulate DOM using libraries such as jQuery (although this is not recommended). |

#### Unmounting Phase

| Lifecycle Method | When Invoked | Uses |
| --- | --- | --- |
|`componentWillUnmount`<br>Args: `()` | Invoked immediately before a component is removed (unmounted) from the DOM and destroyed. | Perform any necessary cleanup in this method, such as cancelling timers, removing manually added event listeners, etc. |

## Overriding the Lifecycle Methods

In case it's not obvious, in order to use lifecycle methods, the component needs to be written as a `class`, not as a _stateless functional component_.

Overriding a lifecycle method is done the same way we override any method in a superclass - by simply defining the method within the subclass.

Let's override the `componentWillMount` method in **App.jsx**:

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {difficultyLevel: 0, colors: colorTable[0].colors},
      this.getInitialState()
    );
  }

  /*---------- Lifecycle Methods ----------*/

  componentWillMount() {
    console.log('App: componentWillMount');
  }
  
  ...
```

Checking the console of the browser should now show `App: componentWillMount` logged out.

#### Practice (5 mins)

1. Override the `componentDidMount` and the `componentWillUpdate` methods and log out a message like we just did above.
2. Add `console.log('render')` as the first line in the `render` method.

After the app refreshes, the console should look something like this:

<img src="https://i.imgur.com/D1AEFKG.png">

If you were ever super curious, you could override all of the lifecycle methods like we just did for `componentWillMount`, `render`, `componentDidMount` & `componentWillUpdate`.

## Adding a Game Timer to Mastermind

It would be cool to have a timer to keep track of how long it takes to break the code.  The user story might read something like:

> As a player, I want to see how long I'm taking to crack the code so that I can track my times and compare to other players.

#### Wireframe

Here's what we want the timer to look like when rendered:

<img src="https://i.imgur.com/dlftQyF.png">


#### App's Implementation Logic

The app will:

- Render a single `<GameTimer>` component between the `<ColorPicker>` and the `<Link>` component used for the [Difficulty] button.
- Maintain the `elapsedTime` in `<App>`'s state because we may want to persist the times one day.
- Pass four props to `<GameTimer>`:
	- `elaspedTime` (number) - the current elapsed time to render.
	- `interval` (number) - the "tick" interval. For this app, it will always be set to 1000 milliseconds (one second).
	-  `handleTick` (callback method) - the method to be invoked with every "tick"
	- `isTiming` (boolean) - let's `<GameTimer>` know if it should invoke `handleTick` or not. We will want to pass `true` when the game is being played, and `false` to stop the timer when the code has been guessed correctly.  Note how we are using this boolean prop to "start" and "stop" the timer - we are driving our app's functionality using "state" and thus following the "data is the single source of truth" principle.

#### Why Are Lifecycle Methods Necessary?

Each JavaScript timer consumes system resources (memory and CPU).

Since the `<GameTimer>` component will be using a timer, we want to make sure that it destroys the timer when itself is destroyed. For example, every time the player switches to the set difficulty route, `<GameTimer>` will be destroyed and then a new `<GameTimer>` created when the player returns to game play.

If `<GameTimer>` doesn't destroy the current JS timer before creating a new timer, timers will pile up.

The key to preventing this "memory leak" is to override the `componentDidMount` and `componentWillUnmount` lifecycle methods.

#### Component's Implementation

Although the `<GameTimer>` will not have any internal state of its own, we cannot write it as a _stateless functional component_ - **why?**

Let's do this:

1. Create a **src/components/GameTimer** folder.

2. Create a **GameTimer.jsx** file for the component's class.

3. Create a **GameTimer.css** file to hold CSS dedicated to the `<GameTimer>`.

4. Add some minimum code to define the component in **GameTimer.jsx**:

	```js
	import React, {Component} from 'react';
	import './GameTimer.css';
	
	class GameTimer extends Component {
	  render() {
	    return (
	      <div>
	          GameTimer
	      </div>
	    );
	  }
	}
	
	export default GameTimer;
	```

5. Render the component within **GamePage.jsx** (baby steps):

	Import `<GameTimer>`
	
	```js
	import NewGameButton from '../../components/NewGameButton/NewGameButton';
	// new import below
	import GameTimer from '../../components/GameTimer/GameTimer';
	```
	Render `<GameTimer>` after the `<ColorPicker>`:
	
	```html
	...
	<ColorPicker
	    handleColorSelection={props.handleColorSelection}
	    colors={props.colors}
	    selColorIdx={props.selColorIdx}
	  />
	  <GameTimer />
	  ...
	```

6. The text "GameTimer" should now be showing. Now let's add `elapsedTime` to `<App>`'s state by updating our custom `getInitialState` method:

	```js
	getInitialState() {
	  return {
	    code: this.genCode(colorTable[0].colors.length),
	    selColorIdx: 0,
	    guesses: [this.getNewGuess()],
	    // new state below
	    elapsedTime: 0
	  };
	}
	```

7. Pass `elapsedTime` as a prop:

	First to `<GamePage>` from within **App.jsx**:
	
	```js
	<GamePage
	  ...
	  handleScoreClick={this.handleScoreClick}
	  // new prop below
	  elapsedTime={this.state.elapsedTime}
	/>
	```
	
	Now down to `<GameTimer>` from within **GamePage.jsx**:

	```js
	<GameTimer elapsedTime={props.elaspedTime} />
	```

8. Update `<GameTimer>`'s `render` method to display `elapsedTime` formatted as `min:sec`:

	```js
	formatElapsedTime(seconds) {
	  function pad(val, places) {
	    var s = val.toString();
	    return '0'.repeat(places - s.length) + s;
	  } 
	  return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
	}
	
	render() {
	  return (
	    <div>{this.formatElapsedTime(this.props.elapsedTime)}</div>
	  );
	}
	``` 

9. Cool. Now let's style by adding a `className` prop to the `<div>` in **GameTimer.js**:

	```js
	<div className='GameTimer'>{this.formatElapsedTime(this.props.elapsedTime)}</div>
	```
	Then, define the CSS class within **GameTimer.css**:

	```css
	.GameTimer {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-family: 'Roboto Mono', monospace;
	  font-size: 20px;
	  color: grey;
	  height: 50px;
	  margin: 20px 0;
	}
	```
	Note that the **Roboto Mono** Google font is being loaded in the `<head>` of **index.html**.<br><br>Let's also update **ColorPicker.css** to remove the extra margin below it by removing the `margin-bottom` declaration - this will center `<GameTimer>` between the `<ColorPicker>` and the `Difficulty` link/button.
	
10. Import **GameTimer.css** into **GameTimer.jsx** - **you got this!**	
11. Let's create the `handleTick` callback method in **App.jsx**:

	```js
	handleTick = () => {
	  this.setState((prevState) => ({
	    elapsedTime: ++prevState.elapsedTime
	  }));
	}
	```
	Because we are using existing state to calculate new state, we should use the approach of providing `setState` with a function instead of an object. The function then returns an object that will be merged into the `this.state`.
	
12. Pass the `handleTick` method all the way down to the `<GameTimer>` component - **you got this!**

13. Time to add the `componentDidMount` lifecycle method in **GameTimer.jsx**:

	```js
	/*---------- Lifecycle Methods ----------*/
	
	componentDidMount() {
	  this.timerId = setInterval(
	    this.props.handleTick,
	    1000
	  );
	}
	```
	We are saving the returned timer id in a property of the component (we don't want to trigger a render by using `setState`). With the timer id stored, we can use it later to destroy the timer...
	
14. Add the `componentDidUnmount` lifecycle method to destroy the existing timer when `<GameTimer>` itself is destroyed:

	```js
	componentWillUnmount() {
	  clearInterval(this.timerId);
	}
	```
	JavaScript's `clearInterval` method removes the timer identified by the id passed to it.
	
Congrats - the `<GameTimer>` is looking sweet!

## Essential Questions

- **In your own words, what do lifecycle methods/hooks allow developers to do?**

- **What does it mean to "override" a method in a class?**

- **Name two lifecycle methods.**

## Practice Exercises

During the planning, we discussed passing in a couple of other props to `<GameTimer>`:

- Stop the timer by passing it an `isTiming` boolean as a prop. If the value is `false`, then do not invoke the `handleTick` callback. The value of the `isTiming` prop should be `true` unless the player has correctly cracked the code.

- Allow the amount of time (in milliseconds) between ticks to be set using an `interval` prop.

## References

[React Docs - The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)





