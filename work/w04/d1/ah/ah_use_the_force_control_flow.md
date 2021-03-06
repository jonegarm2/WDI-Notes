# Use the Force

<img src="https://i.imgur.com/aqidsn2.jpg">

> The more you tighten your grip, Tarkin, the more star systems will slip 
> through your fingers. — [Princess Leia](youtube0)

### Exercise 1 — *[Help me, Obi-Wan Kenobi...][youtube1]*

**File name:** `threepio.rb`

> C-3P0 is a well-known protocol droid from the Star Wars universe, famed for 
> having frantic resolve and for his snappy emotional outbursts. Your task is 
> to write a program modelling a simple interaction with C-3P0 as he searches 
> for the reclusive Jedi Master, Obi-Wan Kenobi.

Write a program that you run with the command:

```
$ ruby threepio.rb
```

This program should introduce itself with (print to standard output):

```
"Hello, I am C-3P0, human-cyborg relations."
```

Then it will, in order:

1. ask for the user's name: `And your name is?`
1. take the user's name as input,
1. **if** the user's answer **is** `Obi-Wan Kenobi` then print:

    ```
    Oh, marvelous! Simply marvelous! Say hello to R2-D2; 
    he's been looking all over for you!
    ```

1. **otherwise**,
	
	1. print:

		```
		It is a pleasure to meet you, [insert name here]. 
		I'm terribly sorry for prying, but you don't by any chance go by the alias 
		of Obi-Wan Kenobi, do you?
	   ```
	   
  	1. take the user's answer as input (any string),
  	1. **if** the user's answer **is** one of `yes`, `Yes`, `YES`, `y`, or `Y` 
     then print: 

      ```
      Oh, marvelous! Simply marvelous! Say hello to R2-D2; 
      he's been looking all over for you!
      ```

  	1. **if** the user's answer **is** one of `no`, `No`, `NO`, `n`, or `N` then print: 

	  ```
	  I've really enjoyed speaking with you, [insert name here], 
	  but if you'll please excuse me, I have to help my friend find 
	  someone named Obi-Wan Kenobi.
	
	  Well R2, I suppose we'll just have to keep looking. 
	  R2-D2: (Agreeable droid noises)
	  ```
	
	1. **otherwise**, **if** the user's answer **is not** one of the above, then print: 

	      ```
	      I'm sorry, I didn't hear you correctly. I only respond to "yes" or "no"...
				
	      Well R2, I suppose we'll just have to keep looking.
	      R2-D2: (Agreeable droid noises)
	      ```

      
**end of threepio.rb**

---

### Exercise 2 — *[You're a feisty little one...][youtube2]*

**File name:** `artoo.rb`

> R2D2, the astromech droid sidekick of C-3P0, is another fun character in Star 
> Wars. Where C-3P0 is famously grating and cowardly, R2D2 is a true hero. 
> Sadly, R2D2's finer qualities are often ignored, and he is treated as little 
> better than a serving tray or calculator. In the following exercise, we will 
> treat him as a calculator.

Write a program that you run with the command:

```
$ ruby artoo.rb
```

This program should begin by printing out:

```
(beep-boop whrrrrrr bleep)
Welcome to the R2D2 calculator!
```

Then it will **go into a loop**!

Inside the loop, it will do the following, in order:

1. print: 

	  ```
	  Please enter which operator you would like to use ('+', '-', '*', '/').
	  Enter 'q' to exit.
	  ```

1. take the user input,
1. if the user input is `q`, then:
  - exit the program!
1. otherwise:
  1. if the input is one of `+`, `-`, `*`, or `/`:
    1. print: `Enter your first operand:`
    1. take the first operand,
    1. print: `Enter your second operand:`
    1. take the second operand,
    1. apply the user's chosen operator to the two operands (do the math!). Hint: Checkout Ruby's `eval` method.
    1. print out the solution (for example, if the operator is `*` and the 
       operands are `2` and `10`), you should print: 

         ```
         The solution to 2 * 10 is 20.
         ```

  1. otherwise, print: 

    ```
    (whheeaaarrrrr! beee-ooohhh) You did not enter a viable operator!
    ```

1. return to the start of the loop!

**end of artoo.rb**

---

### Exercise 3 — *[Bounty hunters &ndash; we don't need that scum...][youtube3]*

**File name:** `ig_88a.rb`

> [IG-88A][ig_img] is a lesser-known droid from Star Wars: the Empire Strikes 
> Back. He is an assassin, and completely ruthless. You don't want to come 
> across him in the [expanded universe][ig_info]!

IG-88A has gone on a rampage, destroying everything in his path!

Write a program that you run with the command:

```
$ ruby ig_88a.rb
```

The program should immediately go in to a loop.

On each iteration of the loop, the program will ask the user: 
`Freeze! Who are you?`.

If the user writes anything other than `Han Solo`, the cold-hearted machine 
will gun them down, printing: `You must die! (zap zap kaboom)`. It will then 
loop back to the beginning, and ask who you are again.

The one exception is when the user doesn't type their name, but instead 
types in `(zap)` and shoots at the machine! If they do this, a gunfight will 
ensue: `(zap)` will print 20 times, and at the end the user will escape and 
exit the program.

If the user enters `Han Solo`, then the program will print: 
`You are mine at last, Solo!`. Then the program will go in to a gunfight: 
`(zap)` will print 20 times.

At the end of the gunfight there is a 50% random chance that the machine 
catches Solo and prints: 
`Solo is caught! Jabba the Hutt will pay handsomely...` and end the program. 
The other 50% of the time Han will escape, and the machine will print 
`I'll get you next time, Solo!`, and begin the loop over.

### Extra Bonuses!

#### Part 1

- Make C-3P0 run on a loop, and also respond to *Old Ben*.
- Have all input and logic work as case-insensitive automatically!

#### Part 2

- Add functionality for exponents and square roots
- Add functionality for trigonometric functions (sin, cos, tan)
- Add functionality to include a factorial option

#### Part 3

- Pull apart the aspects of the program into discrete methods:
  - `gunfight`
  - `encounter`
  - `ig_88`
- Add an ability to the `gunfight` method that makes the gun battle interactive,
  where the user has a 20% chance each time they shoot to kill IG-88A and win 
  the game!

[youtube0]: https://www.youtube.com/watch?v=-wntX-a3jSY
[youtube1]: https://www.youtube.com/watch?v=xIFJLMyUwrg
[youtube2]: https://www.youtube.com/watch?v=acTBJSEEZR4
[youtube3]: https://www.youtube.com/watch?v=6dEIfRH8VtU
[ig_img]:   http://img4.wikia.nocookie.net/__cb20131108204000/starwars/images/f/f7/DengarIG88Fett-TESB30.png
[ig_info]:  http://starwars.wikia.com/wiki/IG-88A
