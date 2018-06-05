<img src="https://i.imgur.com/fx2orT2.png">

# React Event Handling, etc. Lab

---

## Intro

Okay, you just saw how we can:

1. Pass methods via props to child components.
2. Define methods in a class component that are always bound to that component - thanks to ES7's _class properties_ (AKA _property initializer_) syntax.
3. Assign a method to an event prop, such as `onClick`.
4. Wrap a method with an arrow function if the method needs to be invoked with an argument or arguments.

Now it's time to have some fun building out Mastermind using what you know about components, state, props, styling, methods, event handlers, and of course, JavaScript.

If you can implement each of the exercises below - you will have a fully functioning game of Mastermind!

Here's what our starter code looks like:

<img src="https://i.imgur.com/ZMsT9nH.png">

The code that we wrote for changing the selected color is working great - be sure to reference it for help.

## Exercises

1. Write the code that initializes the game's state when the  `[ New Game ]` button is clicked.
2. Make the **Score** button disabled until all four pegs for the current guess have a color chosen. Hint: Disable the button if the current guess' `code` **includes** a `null`.
3. Add an `onClick` event handler for the four `<GuessPeg>` components. Clicking pegs for only the current guess row should update the state of the guess. Remember - baby steps!
  
  Here's an updated UI pic for you:

  <img src="https://i.imgur.com/GO0ceZ4.png">
	
4. Score the guess when the Score (checkmark) button is clicked! Hint: Compute the number of **perfect** (correct color & position) first. Then compute the number of **almost**, but be sure not to reuse colors that have already been scored as perfect!
5. After scoring, if the game is not won, push a new guess object into the guesses array, otherwise if there is a winner, don't push a new guess and instead update the message in the footer to something like "You Won in X Guesses!".

	<img src="https://i.imgur.com/7djSHnI.png">

## Hints

- Baby steps! Check your code for each baby step!
- Use the React DevTool to test as you go. For example, use it to change state in `<App>` then click the `[ New Game ]` button to see if it resets the state as planned.

## Super Bonus Exercises

Here are some additional features that would be a challenge (fun) to implement!

- Add a timer to measure how long it takes to win.

- Persist "High Scores" in the browser's local storage. Persist the best times for each difficulty (assuming the difficulty feature has been implemented).

 

