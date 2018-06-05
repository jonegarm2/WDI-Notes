<img src="https://i.imgur.com/sX12DTc.png">

# Unit 1 - Final Assessment

## Introduction (By Instructor)

This **Introduction** section will be read in class by the instructor.

Students are to have their laptops closed until directed to open them.

Students will be self-directed beginning with the **Instructions & Time Guidelines** section below.

### GOAL

The goal of this final assessment is to gauge your ability to develop a **minimal** front-end web application using HTML, CSS & JavaScript, including your ability to:

- Write HTML that provides the application's overall structure and content. 
- Use CSS to provide styling.
- Use JavaScript to:
	- Define variables that hold application state, cache DOM elements, hold lookup data (constants), etc.
	- Select elements in the DOM.
	- Listen for browser events, such as `click`, being dispatched by DOM elements.
	- Manipulate a DOM element's content and style. 

### DEMO

The instructor will now demonstrate the app you will be building.

### OVERALL APPLICATION REQUIREMENTS

As you saw, the application's UI consists of:

- A count display
- Two buttons ("+" & "-")
- An `<input>` element

Use the screenshots below as your "wireframes".

Lastly, the styling does not have to be exact, however, the closer it is to the screenshots, the better!

### PROCESS

This assessment is an **individual** assignment - no collaboration please.

The good news is that it's "open book" - you may reference anything on your computer, Google, use notes, etc. 

However, don't spend valuable time researching unless you're stuck - **do not over-think this application!**

You will be allotted **one hour** to complete this assessment and no further work on the assessment will be allowed after the cutoff time (written on the wall).

## Instructions & Time Guidelines (You've Got This!)

Please follow the following steps in order:

- **STEP 1 - Prepare** (&asymp; 5 minutes)
- **STEP 2 - Set Up the App** (&asymp; 5 minutes)
- **STEP 3 - Implement the App's Requirements** (&asymp; 40 minutes)
- **STEP 4 - Deploy to GitHub Pages** (&asymp; 10 minutes)
- **STEP 5 - Bonus**

**Total time allowed to complete this assessment is 60 minutes.**

## Assessment Steps to Complete

### STEP 1 - Prepare (5 minutes)

Briefly read through the rest of this assignment to better understand what is required before starting to code.

### STEP 2 - Set Up the App (5 minutes)

Be sure to follow best practices when setting up the project:

- Create a folder named `unit-1-assessment` outside of all repos.
- Create a `js` and `css` folder.
- Touch `index.html`
- Touch `js/main.js`, and include it in `index.html` such that it runs after the DOM is ready.
- Touch `css/main.css` and link it in.

### STEP 3 - Implement the App's Requirements (40 minutes)

#### Upon Loading

When the application initially loads, the `<input>`'s value should be set to `1` and the initial count of `0` is rendered such that the display looks something like this:

<img src="https://i.imgur.com/nsLfnoG.png">

#### When the "+" Button is Clicked

When the "+" button is clicked, the value entered in the `<input>` is added to the count and the new count value displayed.

For example, if the "+" button is clicked immediately after the app loading, the display should look something like this:

<img src="https://i.imgur.com/xNdlBn2.png">

#### When the "-" Button is Clicked

When the "-" button is clicked, the value entered in the `<input>` is subtracted from the count and the new count value displayed.

Continuing from the previous example, if the number 200 is typed in the `<input>` and the "-" button is clicked, the display should look something like this:

<img src="https://i.imgur.com/QjtcAJT.png">

#### Hovering Over the "+" or "-" Button

When the mouse is over the "+" or "-" button, the button should reverse its background and text colors:

<img src="https://i.imgur.com/agT3aGX.png">

Congrats, that's all there is to it!

### STEP 4 - Deploy to GitHub Pages (10 minutes)

Please follow these steps to deploy your app to GitHub Pages:

1. In Terminal, create a local git repo: `$ git init`

1. Make a commit: `$ git add -A && git commit -m "Initial commit"`

1. In your GitHub account, create a new repository named `unit-1-assessment`.

1. Back in Terminal, add the `origin` remote:<br>`$ git remote add origin https://github.com/<your github username>/unit-1-assessment.git`

	> Be sure to replace **\<your github username\>** with your GitHub username!

1. Create the `gh-pages` branch:<br>`$ git checkout -b gh-pages` 

1. Now run the command `$ git push origin gh-pages` to deploy! Enter your credentials if necessary.

1. Browse to `https://<your github username>.github.io/unit-1-assessment` to check it out!

> Note that the link might take a minute to become active.

**Slack the deployed app's link to your instructors - congrats, you are done!**

### STEP 4 - Bonus

As a bonus, display the count in red if it is a negative value:

<img src="https://i.imgur.com/LCSG1Wg.png">

## Hints

- The principles in [Guide on How to Build a Browser App](https://github.com/ga-students/wdi-dt-57/blob/master/work/w01/d5/03-guide-to-building-a-browser-app.md) apply!
- Use CSS flexbox to ease horizontal and vertical centering:

	```css
	section {
		display: flex;  /* defaults to row layout */
		justify-content: center;  /* centers items horizontally in row layout */
		align-items: center;  /* centers vertically in row layout */
		/* flex-direction: column; will set layout to column instead of row */
	}
	```