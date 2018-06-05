# Ric-Rac-Roe Ruby Lab
<img src="https://i.imgur.com/d51LMkh.jpg" width="300">

---
## MVP

### Program Features
- User will type `ruby rrr.rb` in Terminal to play a single game of tic-tac-toe.
- Print out a welcome message at start of game.
- Print out the board before each player's turn, such as:

```
Let's play Ric-Rac-Roe!

    A   B   C

1)  X |   | O 
   -----------
2)    | X |  
   -----------
3)  X | O | O 
  
```
- Prompt for each player to enter their move such as:

```
Player X's Move (e.g., B2):  
``` 
- Allow players to type upper or lower case letter (a/A, b/B or c/C) for the column.
- Print out winner or tie message

### Requirements
- It's a best practice that classes be defined in their own file, so in a separate file named _game.rb_, create a `Game` class.
- Load the `Game` class in the main _rrr.rb_ file using the `require` or `require_relative` method (Google if you must).
- Add a `play` method to the `Game` class. In `rrr.rb` you will create an instance of `Game` and call the `play` method on that instance to play the game!

### Hints
- Think through the game play of TTT and, if necessary, pseudocode it.
- Think about how/where looping makes sense, i.e., loop until the player enters a correct move, until the game's over, etc.
- Write several small methods, each performing a single purpose, e.g., `new_game`, `print_board`, or `get_move`.
- Consider using a hash to model your game board. If you name your keys appropriately, accessing the cell that the user types in can be trivial thanks to the fact that we can take a string like `b2` and convert it into the symbol `:b2` using the `to_sym` method.
- **Ranges** are a cool feature not available in Ruby.  Letters can make ranges also and they have methods on them such as `.include?` which is handy for checking if a range of letters contains a character.  For example `if ('a'..'c').include?(move[0]) && ...` you get the idea.
- Don't forget to use chaining when it makes sense, e.g., `gets.chomp.downcase`

## Bonus

- If the player enters an invalid move (improper col/row or cell already taken), print out an "Invalid Move" message.
- Prompt for target number of wins to play to, then, after each game, print out the score as:

	```
	SCORE:
	Player X: xx   Player O: xx   Ties: xx
	```
	Continue to play until the target number of wins is reached by either player -OR- until either user types in 'Q' or 'q' to quit.
