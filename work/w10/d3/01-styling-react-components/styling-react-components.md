<img src="https://i.imgur.com/fx2orT2.png">

# Styling React Components
---

## Learning Objectives

#### Students Will Be Able To:

- Include external CSS frameworks
- Style components using imported CSS
- Style components using inline styling
- Use Flexbox for basic layouts

## Roadmap

- Overview of Styling in React
- The Starter Code
- Adding External CSS Frameworks to a React App
- Importing CSS Stylesheets
- Inline Styling With JavaScript
- CSS Stylesheets or Inline Styling?
- Essential Questions

## Overview of Styling in React

Like many things React, styling is done a little differently than what we've become accustomed to.

For example, we said that inline styling should be avoided. Well, React actually encourages inline styling!

#### Two Options for Styling React Components

Today, we will look at a couple of the more popular ways to style the components that comprise a React UI:

- **Using CSS**: This is the approach that `create-react-app` sets us up with. Notice there is a CSS file, **App.css**, that is imported into the **App.js** component module. Using this approach, each component that needs styling would have it's own **[ComponentName].css** file.

- **Inline Styling**: This approach uses the `style` prop, that is assigned a JS object of key/value pairs, where the keys are camel-cased CSS properties; and the values for those properties.

## The Starter Code

The repo has starter code for this lesson and a lab that we will start after the lesson.

Be sure to `$ npm install` the node_modules.

It's the Mastermind app that we started yesterday. A couple of the components were tweaked slightly and state has been added to the `<App>` container component.

**That state is then being passed to nested components as _______.**

We will be begin styling this app during the lesson and completing the styling as a lab.

## Adding External CSS Frameworks to a React App

#### Loading Via CDN

If you want to use third-party CSS frameworks like Bootstrap, Materialize, etc., feel free to continue to link in the CDNs (both CSS and JS) as usual.

Even though we don't intend to use any Bootstrap classes in Mastermind, let's link it in for old times' sake.

You will find the **index.html** in the **public** folder:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <title>React Mastermind</title>
  </head>
```

Let's change the `<title>` while we're at it!

Checking our app, we can see Bootstrap is loaded because our header is now messed up due to Bootstrap setting the CSS `box-sizing` property to `border-box` instead of the default of `content-box`.

Let's fix the prob by updating **App.css** as follows:

```css
.App-header {
  background-color: #222;
  height: 50px;
  padding: 10px;
  color: white;
  font-size: 22px;
  text-align: center;
}
```

#### Using the Classes

With the Bootstrap framework now loaded, all of the classes it defines are available for use.

In React, we use the `className` prop to set class(es) on a DOM component. **Why doesn't React use `class` instead of `className`?**

If you inspect the elements in DevTools though, you'll see that the `className` prop does indeed result in a `class` attribute being added to the DOM element.

>**KEY POINT**: Note that we can only style React's built-in HTML/DOM components (lowercase-named components). This is because they are the only components that actually get rendered in the DOM and understand standard attributes such as _class_, _style_, _onclick_, etc.

The `<header>` in **App.js** shows how to use the `className` prop to  apply a CSS class.

#### Practice Exercise

Quickly add Bootstrap's:

- `container` class to the `<body>` element.
- `btn` & `btn-default` classes to the `<NewGameButton>` component's UI. 

#### Loading Via NPM Packages

If you are the type that prefers enlarging your **bundle.js**, increasing both load-time and bandwidth usage, you're in luck, chances are your framework of choice is available as an NPM package.

Look [here](https://www.npmjs.com/package/bootstrap) if you'd like to install Bootstrap.

As a final note regarding external CSS frameworks, due to the popularity of React, component libraries that encapsulate a framework's styling into custom React components are popping up. Knowing how much you love Bootstrap, here's a [link to React-Bootstrap](https://react-bootstrap.github.io/introduction.html).

## Importing CSS Stylesheets

#### Benefits of Importing CSS Stylesheets

- You already know how to use them.
- Great for better organizing CSS rules, usually grouping styles that pertain to a particular component.
- Loaded once, and optimized by the browser.

#### Implementation

- When importing styles for a component:
	- The file is typically named the same as the component (**App.css** for a **App.js** component).
	- That CSS file would then be imported into the component's module.
- You can also import CSS for application-wide CSS rules - they're not just for components. General purpose CSS modules can be imported by any component that needs those styles.
- Importing CSS files require tooling. In a React app started with the `create-react-app` CLI, Webpack has been configured to process and import CSS stylesheets.

>**KEY POINT:** When we import a CSS stylesheet into a component, those styles are actually merged into the application globally. This is just like when multiple external stylesheets are loaded in an app. So, it's important to prevent rules from conflicting and overriding each other...

#### Importance of Namespacing

Class names are like global variables, so it's a good idea to namespace them with the component's name to avoid _name collisions_.

Look at how `create-react-app` namespaces the classes used for the `<App>` component, for example, `App-header`. Following this practice in your own imported stylesheets is highly recommended.

#### Import a Stylesheet

Currently, our `<GuessRow>` component lays out the _row number_, `<GuessPegs>` and `<GuessScore>` stacked vertically because they all have `<div>`s (block elements) as their root node:

<img src="https://i.imgur.com/7fXoMh4.png" height="200">

Let's import a CSS stylesheet for the `<GuessRow>` component so that we can style it to lay out its children horizontally as planned:

1. Create a CSS stylesheet file named **components/GuessRow/GuessRow.css**.
2. `import` it in **GuessRow.js**:

	```js
	import React from 'react';
	import GuessPegs from '../GuessPegs/GuessPegs';
	import GuessScore from '../GuessScore/GuessScore';
	// CSS stylesheets don't export anything, so just import the file:
	import './GuessRow.css';
	```
3. Create a class named **GuessRow** within **GuessRow.css**:

	```css
	.GuessRow {
	  display: flex;
	  flex-direction: row; // FYI, 'row' is the default
	  flex-wrap: nowrap; // FYI, 'nowrap' is the default
	  /* below is a shortcut for the above two declarations */
	  /* flex-flow: row nowrap; */
	  align-items: center;
	}
	```
	>**flexbox** has been recently added to CSS3. It's an amazing improvement to layout - once you start using them you will never float another `<div>` again. This lesson will discuss a few of the basics, but I encourage you to checkout the article referenced by this lesson and in today's lab.
4. Finally, apply the `GuessRow` class to the `<GuessRow>` component **with the __________ prop**.

Now we've got our horizontal layout:

<img src="https://i.imgur.com/AYs4SId.png" height="200">

#### Exercise: Import another CSS stylesheet (5 mins)

Now it's your turn:

1. Create and import a CSS stylesheet into the `<GuessScore>` component.
2. Create a class and apply it like we just did.

Use the same flexbox properties as the `<GuessRow>` component, however, we're going to want 2 rows of 2 scores each. You can easily accomplish this by changing `flex-flow: row nowrap;` to `flex-flow: row wrap;`, then set a width, adjusting it until you have the scores looking like this:

<img src="https://i.imgur.com/zsG2RDg.png" height="200">

In a bit, when the `<div>`s for the individual scores are sized and styled, we will come back and further adjust the width to ensure they wrap in a 2-by-2 pattern.

#### Review Questions: Importing CSS Stylesheets

- **True or False: Tooling is needed to import CSS stylesheets.**

- **Would it be okay to define the following CSS class in more than one CSS stylesheet?**

	```css
	.big-text {
		font-size: 50px;
	}
	```

## Inline Styling With JavaScript

#### About Inline Styling

Contrary to what we've been told about avoiding styling elements inline (using the `style` attribute), React actually encourages inline styling!

Inline styling in React uses the `style` prop, however, unlike the `style` attribute on an HTML element, we assign a JS object instead of a string.

#### Adding Inline Styling to the `<GuessScore>` Component

Let's apply some inline styling to the `<GuessScore>` component. Here's the component's code as it stands thus far:

```js
const GuessScore = (props) => {
  let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) +
    'I'.repeat(4 - score.perfect - score.almost)).split('');
  return (
    <div className="GuessScore">
      {scores.map((score, idx) => <div key={idx}>{score}</div>)}
    </div>
  );
}
```
Reviewing the above code reveals that we are building a `scores` array of 4 characters - this seems strange, but this approach will enable an elegant approach to styling. The values of the characters represent as follows:

- `P` represents the correct color in the correct position
- `A` represents the correct color, but in the wrong position
- `I` represents no match

Let's first create a JS object for the base styles of the score `<div>`s:

```js
let scores = ('P'.repeat(score.perfect) + 'A'.repeat(score.almost) + 
  'I'.repeat(4 - score.perfect - score.almost)).split('');
// existing code above

// object for base styling of score pegs (base styling is common to all pegs)
let baseStyle = {
  width: 10,
  height: 10,
  margin: 1,
  border: '2px solid',
  borderRadius: '50%'
};
```
Yup, the objects we use for inline styling are plain 'ol JS objects, where:

- CSS property names are camel-cased.
- Pixel values can be provided as integers if we wish.
- Other units like the `50%`, or values like the `2px solid` must be a string.

Now let's apply the styling by assigning the `baseStyle` object to the `style` prop within a JS expression (within curly braces):

```js
<div className="GuessScore">
  {scores.map((score, idx) => <div key={idx} style={baseStyle} />)}
</div>
```

Note that we also removed the content from the `<div>` and made it self-closing because we are now "visualizing" the score using styling, not content.

Looking good, except we need to increase the CSS `width` property in the `GuessScore` class to `24px` so that we can get a nice 2x2 display of scores like this:

<img src="https://i.imgur.com/CCQFz9k.png" height="200">

Now we want to apply one of three additional style objects depending upon the score character ('P', 'A' or 'I').

Now for that elegant styling solution. Let's define the style objects within another object, using the score character as keys like this:

```js
let pegStyles = {
  'P': {
    borderColor: 'black',
    backgroundColor: 'black'
  },
  'A': {
    borderColor: 'black',
    backgroundColor: 'white'
  },
  'I': {
    borderColor: 'white',
    backgroundColor: 'lightgrey'
  }
};
```
Then, we can _merge_ the styles using the [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method:

```js
  return (
    <div className="GuessScore">
      {scores.map((score, idx) =>
        <div key={idx} 
             style={Object.assign({}, baseStyle, pegStyles[score])}
        />
      )}
    </div>
  );
```
`Object.assign` merges the properties of one or more objects into a target object (the first argument) and returns that target object. Note that we are creating a new object as the target, which is then returned after the `baseStyle` and `pegStyles[score]` objects are merged - nice!!

To test out the styling, let's use the React DevTool to change the `score` state in the `<App>` component to two Perfect and one Almost resulting in the following being rendered:

<img src="https://i.imgur.com/17ltinX.png">

Looking good!

#### Advantages of Inline Styling

Some advantages of inline styling with JS objects:

1. You don't have to get too creative thinking up a bunch of unique class names;

2. Since it's JS, you can compute the value of any CSS property dynamically - remember, a component and all of its nested components are re-rendered when any state changes. Consider how nifty this would be for data visualization components where properties width, height, top, left, etc. are computed dynamically.

3. Again, because it's just JS, we can assign any valid JS expression to the `style` prop like what we just did. Opportunities for the ternary operator abound!<br>For example, let's update the `<GuessRow>` component to render the row number for the current row in black, all others in lightgrey:

	```js
	const GuessRow = (props) => {
	  return (
	    <div className="GuessRow">
	      <div style={{color: props.currentGuess ? 'black' : 'lightgrey'}} >
	        {props.rowIdx + 1}
	      </div>
	      <GuessPegs code={props.guess.code} colors={props.colors} />
	      <GuessScore score={props.guess.score} />
	    </div>
	  );
	}
	```

>Be aware that inline styling in React, no different than using the `style` attribute in HTML, may impact nested built-in DOM components due to the ordinary way DOM elements inherit certain CSS properties, such as `font-family` & `box-sizing`. Not that this is a bad thing, you just need to be aware of it.

## Import CSS Stylesheets or use Inline Styling?

The approach you choose to style your components is up to you (or your future boss).

Generally, a blended approach makes sense where we use:

- Imported CSS stylesheets for styling layout and the "static" parts of the web app
- Inline JS for styling "state", the dynamic part of the web app

React seems to encourage inline styling as a way to improve the portability/reusability of presentational components. Personally, I think it encourages it because it's "cool". However, the following 35 minute video suggests an [80%-CSS / 20%-Inline approach](https://www.awesomereact.com/playlists/all/tkuxR-b9aTI) - for what it's worth, I kind of agree.

Regardless of what you do, as always, keep your eyes open for new approaches. There's currently two of note:

- [CSS Modules](https://glenmaddern.com/articles/css-modules): These are like what we just saw with importing stylesheets, however, the imported styles are kept local to the component they are imported in. This is a huge benefit, however, Webpack has to be configured slightly differently than it is by the `create-react-app` CLI. [Here's an article](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2) that discusses the situation.
- [Styled Components](https://styled-components.com/) is interesting and gaining traction. However, they are a little more complex than the other approaches than the others.

Lastly, there are several open-sourced libraries that make inline styling more powerful. For example, it's not easy to style pseudo-classes, such as `:hover`. One of these popular libraries is [Radium](https://github.com/FormidableLabs/radium).

## Essential Questions

- **What is the name of the prop used to style inline?**
- **What is assigned to the above prop that defines the inline styles?**
- **When using CSS Stylesheets, it's important that class names be _______.**
- **What styling approach is best to use if you need to compute styles dynamically?**

## References

[A Visual Guide to CSS3 Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties?utm_content=bufferbb7b2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#comments-section)






