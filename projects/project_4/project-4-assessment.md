<img src="https://i.imgur.com/ser5chI.png">

# Project 4 - Assessment

## Introduction (By Instructor)

This **Introduction** section will be read in class by the instructor.

Students are to have their laptops closed until directed to open them.

Students will be self-directed beginning with the **Instructions & Time Guidelines** section below.

### GOAL

The goal of Project 4's Assessment is to gauge your ability to develop a minimal ReactJS application that renders user-defined components and reacts to some basic user interaction.

### OVERALL APPLICATION REQUIREMENTS

The application, as you will soon see in the demo, requires that you code two components, `<CircleSelector>` and `<Circles>`, and render them within the existing `<App>` component.

When the user clicks one of the four buttons in `<CircleSelector>`, the corresponding "circle" within the `<Circles>` component will be styled differently to make it appear "selected".

In addition, the button clicked within `<CircleSelector>` has its text changed and is also styled differently to make it look "selected" as well.

Let the hi-fi wireframes guide you.

A few more notes about **the application**:

- **It will** be a front-end only application - no server-side code is required. 
- **It will not** require the use of client-side routing and thus has no dependency on `react-router-dom`.
- All necessary **CSS has been provided** below. You will simply have to ensure that your components include the proper classnames (often dynamically). **Pay special attention to the provided CSS's selectors as they will need to be incorporated into the design of the two components!**

### DEMO

The instructor will now demonstrate the app you will be building.

### PROCESS

This assessment is an **individual** assignment - no collaboration please.

This project's assessment is **"open book"** - you may reference anything on your computer, Google, use notes, etc. 

Be wary of spending too much time researching unless you're stuck - **do not over-think this application!**

You have until the end of class to complete this assessment and no further work on the assessment will be considered afterwards.

### CREATE AND SET UP THE REACT APP

You will be using the `create-react-app` CLI to generated the application.

#### Create the Application

Open your laptop, then:

1. Open Terminal.
2. Move to a directory that is **not** a git repository.
3. Create the React app with this command `$ create-react-app project-4-assessment`.
4. When the process has completed, `$ cd project-4-assessment`.

#### Set Up the Generated Application

1. Replace the contents of **App.js** with this starter code:
The "cleaned up" **App.js** looks like this:

	```js
	import React, { Component } from 'react';
	import './App.css';
	
	class App extends Component {
	  render() {
	    return (
	      <div className="App">
	        <header className="App-header">PROJECT 4 ASSESSMENT</header>
	        <main>
	          YOUR TWO COMPONENTS WILL GO HERE
	        </main>
	      </div>
	    );
	  }
	}
	
	export default App;
	```
2. Replace the contents of **App.css** with the following CSS that uses flexbox to layout `<App>`:

	```css
	body, * {
	  box-sizing: border-box;
	}
	
	.App {
	  height: 100vh;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	
	.App-header {
	  width: 100%;
	  padding: 20px;
	  font-size: 24px;
	  background-color: grey;
	  color: white;
	  text-align: center;
	  letter-spacing: 3px;
	}
	
	.App main {
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  flex: 1;
	}
	```

3. Use `$ npm start` to spin up the dev server and ensure that the application looks like this:
	<img src="https://i.imgur.com/FXiVSJZ.png">

4. Close your laptop.

### COMPONENT HIERARCHY

Here is a diagram of the application's component hierarchy:

<img src="https://i.imgur.com/qPz8HjD.png">

Note that both the `<App>` and `<header>` components are already in place.

## Instructions & Time Guidelines (You've Got This!)

Please follow the following steps in order:

- **STEP 1 - Prepare**
- **STEP 2 - Implement the App's Requirements**
- **STEP 3 - Deploy to GitHub Pages**

## Assessment Steps to Complete

### STEP 1 - Prepare

- Briefly read through the rest of this assignment to better understand what is required before starting to code.

- After watching the demo of the app and once again examining the component hierarchy, you should identify what state is necessary. Here's a hint: not much :)

- In addition to coding the `<CircleSelector>` and `<Circles>` components, you will also need to add some additional code to `<App>`.

### STEP 2 - Implement the App's Requirements

#### The `<CircleSelector>` Component

The `<CircleSelector>` component can be defined as a Stateless Functional Component and is responsible for letting `<App>` know that the user wants to select a certain circle in the `<Circles>` component.

Here's CSS that can be used for `<CircleSelector>`:

```css
.CircleSelector {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  width: 150px;
  border: 4px solid purple;
  border-radius: 8px;
  margin-right: 20px;
}

.CircleSelector button {
  height: 30px;
  width: 125px;
  background-color: purple;
  color: white;
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
}

.CircleSelector button:hover {
  background-color: limegreen;
}

/* Adding a class of 'selected' to the selected button dynamically is secret sauce */
.CircleSelector button.selected {
  background-color: white;
  color: limegreen;
  border: none;
  cursor: default;
}
```

When `<CircleSelector>` is coded, styled with the above CSS, and rendered within `<App>`, your app should look like this:

<img src="https://i.imgur.com/gEvVjaQ.png">

Note that the app should load with the first button selected (think: state initialization). If the user were to click the third button, `<CircleSelector>` would look like this:

<img src="https://i.imgur.com/hCsEA9j.png">

#### The `<Circles>` Component

The `<Circles>` component can also be defined as a SFC and renders four "circles" (`<div>s`) with the currently "selected" circle rendered differently courtesy of the following CSS:

```css
.Circles {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  width: 200px;
  border: 4px solid limegreen;
  border-radius: 8px;
}

.Circles div {
  height: 75px;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: limegreen;
  color: white;
  font-size: 30px;
  border: 5px solid limegreen;
  border-radius: 50%;
  margin: auto 10px;
}

/* Another dose of dynamic className goodness is the winning ticket */
.Circles div.selected {
  background-color: white;
  color: purple;
  border: 5px solid purple;
}
```

When `<Circles>` is coded, styled with the above CSS, and rendered within `<App>`, your app should look like this:

<img src="https://i.imgur.com/Gyg5Cek.png">

Or this when the user selects the second circle:

<img src="https://i.imgur.com/sMKPjbB.png">

You get the idea...

That's all there is to it!

### STEP 3 - Deploy to GitHub Pages

The following instructions allow you to deploy any of your front-end **only** React apps using GitHub pages (will not work for full-stack apps).

Please follow these steps to deploy your app to GitHub Pages:

1. In Terminal, create a local git repo: `$ git init`

1. In your GitHub account, create a new repository named `project-4-assessment`.

1. Back in Terminal, add the `origin` remote:<br>`$ git remote add origin https://github.com/<your github username>/project-4-assessment.git`

	> Be sure to replace **\<your github username\>** with your GitHub username!

1. To save time, there's no need to make a commit, the tool we are going to use will automatically make a commit and create a `gh-pages` branch.

1. In VS Code, open your **package.json** and add an additional top-level key/value pair:<br>`"homepage": "https://<your github username>.github.io/project-4-assessment",`.

1. Also in **package.json**, add two additional key/value pairs, `"predeploy"` and `"deploy"`, inside of the `"scripts"` key:

	```js
		"scripts": {
	  		// add these two new keys, don't forget to add a comma above
	  		"predeploy": "npm run build",
	  		"deploy": "gh-pages -d build"
		}
	```

1. In Terminal, let's install the `gh-pages` npm package we just referenced in the `"deploy"` entry:<br>`$ npm i gh-pages` 

1. Now run the command `$ npm run deploy` to deploy! (enter your GitHub credentials if asked).

> The `"predeploy"` script automatically builds the app.

> The `https://<your github username>.github.io/project-4-assessment` link might take a minute to become active.

**Slack the deployed app's link to your instructors - congrats, you are done!**

## Hints

- A CSS class can conditionally be added to a React element with a ternary expression (gotta love the ternary operator!) like this:

	```jsx
		<div className={<conditional expression> ? 'name-of-class' : ''}>
	```