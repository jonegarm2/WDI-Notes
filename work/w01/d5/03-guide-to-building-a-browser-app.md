# Guide on How to Build a Browser App

1. Analyze the app's functionality from user's point of view and document with _User Stories_.  Example user story: _As a user, I would like a backspace button in case I press the wrong number_

2. Think about the basic design (look & feel) you're pursuing 
	- Take your users (audience) into consideration.
	- Should the app have a clean, minimalist UI (current trend)?

3. Wireframe UI	
	- Wireframes provide blueprint for the HTML & CSS. 
	- Wireframing often reveals an applications data (state) and functionality.

4. Pseudocode
	- Lays out app's logic in clear English.
	- Pseudocode the app's **overall** functionality first.
	- More detailed pseudocode may be required later.

5. Analyze the known application's state (data)
	- What does the application need to "remember" throughout its execution?
	- Use the wireframe(s) and pseudocode as a guide.
	- Note that in an application with a database, we would work on the application's database design at this point.

6. Set up the project
	- Create project directory OUTSIDE of the class repo.
	- Create the starting project files. Here's a possible structure:
		- **index.html**
		- **css/main.css**
		- **js/main.js**
	- Create the HTML boilerplate within **index.html**.
	- Link **main.css** in the `<head>`.
	- Loading **main.js** just above the closing `</body>` tag ensures that the DOM is ready before the script runs.

7. Create a local repo
	- `$ git init`
	- Create a remote repo in your GitHub account following instructions that GitHub provides.  After this project it will be ok to use `hub create`

8. Organize JS into sections - for starters, add the following comments from top to bottom:
	- `/*----- constants -----*/`
	- `/*----- app's state (variables) -----*/`
	- `/*----- cached element references -----*/`
	- `/*----- event listeners -----*/`
	- `/*----- functions -----*/`

9. Code away!
	- Iterate between adding HTML, CSS & JS is one approach.
	- Start with some markup for the basic UI.
	- Declare, but don't initialize, the application-wide variables (state). The initialization of the variables to their "start-up" state should be done within an **initialize**, or similarly named function, i.e., **reset**.
	- Write that **initialize** function.
	- Register event listeners - browser apps are typically _event-driven_.
	- Must have a _reset_ or _initialize_ function that resets all variables to their initial state.

10. Recommended approach for most interactive browser app's, such as games
	- Create a main `render` function that is responsible for rendering the state of the app.
	- If the `render` function becomes lengthy, add additional rendering oriented functions, for example:
	
	```js
	function render() {
		renderScore();
		renderBoard();
		if (winner) {
			renderWinnerMessage();
		} else {
			renderTurnMessage();
		}
	}
	```
11. **Important**, as the user interacts with the application (or other events such as timers trigger), code the app such that it:
		- Updates state, then...
		- Call `render`!

12. Make frequent git commits of working code. Typically, commit each "milestone" or feature implementation.

13. Experiment and refactor code as necessary.

14. Have fun!