[Click here to view as a presentation](https://presentations.generalassemb.ly/6027631efafdd1f316be#/1)

---

<img src="http://4.bp.blogspot.com/-zRlTGTWQWDc/UFbvX12cZVI/AAAAAAAAAZM/uzPsKSSBvEg/s1600/control+flow.png" style="width: 400px">

# Control Flow in Ruby

---

## Learning Objectives
<br>

- Identify the three main types of Control Flow

- Use `if` & `unless` to perform branching

- Use `while` & `until` to perform looping

---

## Roadmap
                                            

- Control Flow Review (5 mins)

- Setup (5 mins)

- Boolean Logic - Review (5 mins)

- Branching Statements (15 mins)

- Looping Statements (15 mins)

- Other Useful Operators (5 mins)

- Closing Questions (5 mins)

- Practice Exercises (20 mins)

---

## Control Flow Review <small>(5 mins)</small>
<br>

> #### "The execution sequence of instructions in a program determined at run time with the use of control structures"

- The **_Good News_**: _Thanks to the JS knowledge you've acquired, you already have a nice grounding in the programming concepts of **conditional expressions** and **control flow**._

- The **_Bad News_**: _There are more options in Ruby, and thus more to learn. However, the basics will suffice and serve you well._

---

<p style="margin-top: -50px"></p>
### Control Flow<br><small><em>Three Primary Types</em></small>

- **Sequence**:
	- Statements executed one at a time in sequence.

		```ruby
		car = Car.new
		car.start
		car.drive
		```
- **Branching (selection)**:
	- `if` & `unless` Statements
- **Looping (iterative)**:
	- `while` & `until` Loops
	- `each`, `times`, `for`, etc., Iterating Methods

---

## Setup <small>(5 mins)</small>
<br>

- We won't write much code during this lesson, however, to complete the exercises, you will write code in a Ruby (`.rb`) file and run it in Terminal.

- In your daily working directory:

	```
	$ touch cf.rb
	```

- Then open in your code editor.

---

## Setup
<br>

- Type a bit of Ruby inside `cf.rb` and save it:

	```ruby
	puts "Hello WDI"
	```
- Run `cf.rb` in Terminal:

	```
	$ ruby cf.rb
	> Hello WDI
	```
	
---

## Boolean Logic - Review  <small>(5 mins)</small>
<br>

- True/Truthy & False/Falsey

- Comparison Expressions

---

### Boolean Logic<br><small><em>True/Truthy & False/Falsey</em></small>
<br>

- **Everything in Ruby is considered to be truthy except for ________ and ________.**

- **As compared to JS, there are a couple of _values_ that have different truthiness. What are they?**

---

### Boolean Logic<br><small><em>Comparison Operators</em></small>
<br>

- These Comparison Operators work exactly like they do in JS:
	- **`==`**
	- **`!=`**
	- **`<`**
	- **`>`**
	- **`<=`**
	- **`>=`**

- So do these logical combinators:
	- **`||`**
	- **`&&`**

---

### Boolean Logic<br><small><em>Comparison Operators</em></small>

- Here's an Operator we don't have in JavaScript, the _Spaceship Operator_:
	- **`<=>`**

		```
		> 5 <=> 10
		=> -1
		```

- The _Spaceship Operator_ is unique in that it returns one of three values:
	- `-1` if  the expression on the **left is less** than the expression on the right.
	- `1` if  the expression on the **left is greater** than the expression on the right.
	- `0` if the expressions are equal.

---

## Branching Statements <small>(15 mins)</small>
<br>

- Branching in Ruby is similar to that in JS, but with a few more options.

- In this lesson, we'll touch upon these:

	- **`if`** statement

	- **`unless`** statement

---

### Branching Statements<br><small><em>if</em> (single path)</small>

- Single path `if`:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

	```ruby
	if val == 1
	  puts "is one"
	end
	```

- Parens surrounding the logical expression are optional.

---

### Branching Statements<br><small><em>if</em> (inline conditional)</small>

- Remember, when possible, Ruby tries to read like English.

- If you have a single path `if`, the following code

	```ruby
	if val == 1
	  puts "is one"
	end
	```
	can be written as

	```ruby
	puts "is one" if val == 1
	```

---

### Branching Statements<br><small><em>unless</em></small>

- Speaking of reading like English, the `unless` statement is designed to do just that. Think of it as the opposite of `if`.

- For example, if you don't like using a _not_ logical expression, you can use `unless` to remove the _not_ logic:

	```ruby
	if val != 1
	  puts "is not one"
	end
	```
	can be written as

	```ruby
	unless val == 1
		puts "is not one"
	end
	```
- You can also use `unless` inline just like with `if`. Like many things in Ruby, it's a matter of preference.

---

### Branching Statements<br><small><em>if</em> (dual path)</small>
<br>

- Dual paths `if` with `else`:

	```ruby
	if val == 1
		puts "is one"
	else
		puts "not one"
	end
	```

- `then` is optional unless you want to write an entire `if` statement on one line:

	```ruby
	if val == 1 then puts "is one" else puts "not one" end
	```

---

### Branching Statements<br><small><em>if</em> (three or more paths)</small>
<br>

- Three or more paths `if` with `elsif` and optionally `else`:

	```ruby
	if val == 1
		puts "is one"
	elsif val == 2
		puts "is two"
	elsif val == 3
		puts "is three"
	else
		puts "not one, two, or three"
	end
	```

- That's not a typo, it's actually spelled as `elsif`!

---

### Branching Statements<br><small><em>if</em> is an expression</small>
<br>

- Unlike in JavaScript, the `if` statement is actually an expression and can be used to return a value. For example:

	```ruby
	# set the message variable to the appropriate string
	message = if val == 1
		"is one"
	elsif val == 2
		"is two"
	elsif val == 3
		"is three"
	else
		"not one, two, or three"
	end
	```

---

### Question - Branching Statements
<br>

Discuss the following with your pair and be prepared to share your code:

- **How could we write an `if` statement, on one line, that `puts` the text "Congrats!" if a variable named _correct_ equals `true`?**

---

## Looping Statements <small>(15 mins)</small>
<br>

- Again, lots of options. We'll just look at these:

	- **`while`**

	- **`until`**

---

### Looping Statements<br><small><em>while</em></small>

- The first looping statement we'll look at is `while`:

	```ruby
	word = ""
	words = []
	while word != "end"
	  print "Enter a word ('end' to quit): "
	  word = gets.chomp
	  words.push(word) if word != "end"
	  puts "You've entered: #{words}"
	end
	```

- Use `while` when you want to continue to execute a block of code _while_ a condition is true.

- Beware of infinite loops!

---

### Looping Statements<br><small><em>until</em></small>

- The next looping statement we'll look at is `until`:

	```ruby
	word = ""
	words = []
	until word == "end"
	  print "Enter a word ('end' to quit): "
	  word = gets.chomp
	  words.push(word) if word != "end"
	  puts "You've entered: #{words}"
	end
	```

- `until` works like a mirror image of `while` - it continues to execute a block of code _until_ a condition is true.

- Again, beware of infinite loops!

---

### Looping Statements<br><small><em>modified while/until</em></small>

- You can also put the `while`/`until` condition at the bottom of the code block as follows:

	```ruby
	words = []
	begin
	  print "Enter a word ('end' to quit): "
	  word = gets.chomp
	  words.push(word) if word != "end"
	  puts "You've entered: #{words}"
	end until word == "end"
	```

- This approach guarantees that the code block will be executed at least once.

- Notice also with this construct that there's no longer a need to initialize the `word` variable to prevent an error from occurring.

---

### Looping Statements<br><small><em>for loop</em></small>
<br>

- Where's my `for` loop you ask?

- Ruby does have a `for` loop, but it isn't much like that of JavaScript's, nor as commonly used.

- It operates more like an `each` method.

- Learning it's specifics is left up to you.

---

### Question - Looping Statements
<br>

- **When using a `while` or `until` loop, we must be careful not put the program's execution into an __________ loop.**

- **How do we avoid the above scenario?**

---

## Other Useful Operators <small>(5 mins)</small>
<br>

- **`||=`** (_or equals_ operator)

- Ternary Operator:<br>&nbsp;&nbsp; \<condition> `?` \<exp-if-true> `:` \<exp-if-false>

---

<p style="margin-top:-50px"></p>
### Other Useful Operators<br><small><em>or equals</em></small>

- The **_or equals_** operator is used to assign a value to a variable if it currently has no value, or is equal to either `nil` or `false`.

- **What will `name` equal after this code runs?**

	```ruby
	name = "Fred"
	name ||= 25
	```

- **After this code runs?**

	```ruby
	name = false
	name ||= "Cool"
	```

- **After this code runs?**

	```ruby
	# assume name has never been used...
	name ||= false
	```
---

### Other Useful Operators<br><small><em>ternary</em></small>

- Our useful friend, the _ternary_ operator works just like it does in JavaScript.

- Just in case you forgot, it's ideal when you need to return one of two values depending upon a condition:

	```ruby
	message = score > 100 ? "You rock!" : "Keep trying!"
	```

- It can also be used to evaluate one of two expressions, so you can even run a method if you'd like:

	```ruby
	score > 100 ? game.winner : game.loop
	```

---

## Closing Questions <small>(5 mins)</small>

I'll give you a couple of minutes to review the following questions, meanwhile, I'll warm up the picker :)

- **In your own words, how would you describe _Control Flow_?**

- **The three primary types of _control flow_ are:<br>1) Sequence<br>2) ___________<br>3) ___________**

- **Why might you decide to use the modified version of the _while_/_until_ loop, where the condition test is put at the end of the code block?**

---

## Practice Exercises <small>(20 mins)</small>

---

### Practice Exercises
#### Exercise 1 - Branching

- The following Ruby code will accept string input from the user, remove the automatic EOL character with `chomp` and store the string in a variable named `choice`:

	```ruby
	print "Enter a, b or c: "
	choice = gets.chomp
	```

- **Write an `if` statement that 	`puts` the following messages**:
	- _a_ entered - "a is for apple"
	- _b_ entered - "b is for banana"
	- _c_ entered - "c is for cantaloupe"
	- anything else - "you're a rebel"

---

### Practice Exercises
#### Exercise 2 - Looping
<br>

- **Use one of the looping statements to continue to execute the code you wrote in the previous exercise until _no more fruit_ is entered by the user.**
