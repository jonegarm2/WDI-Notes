This presentation is available at:<br> [https://presentations.generalassemb.ly/4c5ca2cc4e86d897d357#/1](https://presentations.generalassemb.ly/4c5ca2cc4e86d897d357#/1)

---

![](http://files.meetup.com/1611353/ruby-logo-crop.png)

# Ruby Classes, Objects & Methods

---

## Learning Objectives

- Code a Ruby class

- Instantiate objects using a class

- Code attributes (data) in a class

- Write methods to access attributes

- Write an `initialize` method to initialize an object at the time of instantiation

- Use `attr_reader`, `attr_writer` & `attr_accessor` to accomplish Ruby's mission of writing less code

---

## What's an Object?
<br>

- In OOP, the programs we develop consist of **objects** that model the purpose of our application.

- These objects interact with each other by invoking each other's methods, also known as sending messages.

- By now, it's no big secret that **everything** in Ruby is an object.

- Objects encapsulate:

  -  **Attributes**<br>and
  -  **Methods**

---

### Attributes of an Object
<br>

- **Attributes** are data held within an object.

- They define the "properties" of an object. For example, if we had a _house_ object, there might be attributes such as `square_footage`, `num_bedrooms`, etc.

- **Name a couple of attributes that a _car_ object might have...**

---

### Methods of an Object
<br>

- **Methods** define the behavior or actions available in an object.

- They define what an object does. For example, that _house_ object might have methods `set_alarm`, `sell`, `open_door`, etc.

- **Name a couple of methods that a _car_ object might have...**

---

### Objects in Summary

#### <p style="text-align:left">A program uses objects to:</p>

   - Model real-world objects that pertain to an application, for example, the user, the game board, the bank account, etc.

   - Interact with each other by calling each other's methods.

   - Contain attributes that describe the traits of the object.

   - Contain methods that implement the object's actions and behavior.


![](http://leadinganswers.typepad.com/leading_answers/images/fist_of_five.jpg)

---

## What's a Class?

- In Object Oriented Programming, the canonical analogy for describing a class is that it's a **blueprint used to create objects**.

- Another good analogy is to think of a class as a **factory that produces object instances of a certain class**.

<img src="http://phpenthusiast.com/theme/assets/images/articles/classes_and_objects.jpg" height=300>

---

## Defining a Class in Ruby

- Let's define our first class!<br>Create a file named `banana_stand.rb` and open it in your editor.

- Something fun & simple:

	```ruby
	class BananaStand
   end
   ```
- **First question of the day: What's the naming convention used to name classes in Ruby?**

- There are no attributes or methods defined in there yet. No information, no behavior - we'll get to that later. However, although it doesn't contain anything yet, we can still create objects from it...

---

## Defining a Class in Ruby (cont.)
<br>

- Let's see how we would create a new _BananaStand_ object instance!

	```ruby
   my_stand = BananaStand.new
   puts my_stand
   ```

- As you can see, classes have a `new` method that's used to create an **instance** of a class. A process, not surprisingly, known as **instantiation**.

---

## Defining a Class in Ruby (cont.)

- If you haven't done so already, run the program. The result look something like this:

	```sh
	#<BananaStand:0x007fabd98501b0>
	```

- What you see is the result of calling `to_s` on a custom object. It shows the object's `class` and some crazy number that we don't need to worry about.

- Remember, you can always override this default behavior by defining a `to_s` method in your class to return a more useful representation of your object.

---

### You've written a Ruby class that instantiates B<span style="text-transform:lowercase">anana</span>S<span style="text-transform:lowercase">tand</span> objects!
<br><br>

### Questions:

- **What's the difference between a Class and an Object?**

- **An object's traits/properties are defined by its __________?**

- **An object's behavior is defined by its __________?**

---

### How About Some Attributes?
<br>

- Let's add some attributes to our silly `BananaStand` class - it's time to use those **instance variables** we talked about yesterday.

- What? You mean **instance variables** hold data in object instances of a class? Is that crazy or what? Not!

- Remember, **instance variables** start with an `@` character:

	```ruby
	class BananaStand
    	@color = "Yellow"
    	@year_opened = 2003
    	@manager = "George Michael"
    end
	```

---

### Accessing Attributes

- Now that we've added some attributes, how do we access them?

- It would be logical to believe that we could access them using _dot notation_ like we did in JS or as in other languages like Java or C#.

- You better sit down for this (never mind you're already seated)...

#### Objects in Ruby only expose methods, not attributes!

-  What's a coder to do? Well, this isn't the first time you've heard the words **getter** and **setter** methods!

---

### Accessor Methods - Getters

- Let's write some methods to return the values of our attributes!

	```ruby
	class BananaStand
		@color = "Yellow"
  		@year_opened = 2003
  		@manager = "George Michael"

  		def color
    		@color
  		end
	end

	```

- **Now it's your turn, write the methods to return the `@year_opened` and `@manager` attributes.**

---

### Accessor Methods - Getters (cont.)
<br>

- Now we can call those methods like any other method in Ruby:

	```ruby
	puts my_stand.manager
	```

- Try it out.<br>**What happened? I don't see s#%@!**

---

### The <span style="text-transform: lowercase">initialize</span> Method
<br>

- It turns out that the code in a class outside of a method only runs **once** when the class is loaded. If the variables were class variables, not instance variables, they would remain in scope to all instances of the class - but this would result in all BananaStands having the same attribute values - boring and not very useful!

- Allow me to demo for you changing the variables to have class scope.

---

### The <span style="text-transform: lowercase">initialize</span> Method
<br>

- Since each BananaStand object should be able to have its own attributes, we definitely need to use instance variables to hold the attribute values.

- However, to successfully initialize instance variables, we need to initialize them within a special method named `initialize`.

- So, let's wrap our instance variables in an `initialize` like this:

	```ruby
  	def initialize
   		@color = "Yellow"
    	@year_opened = 2003
    	@manager = "George Michael"
 	end
	```

---

### The <span style="text-transform: lowercase">initialize</span> Method
<br>

- Now try it!

- Bravo, the `initialize` method is automatically called for us!

- **What method does `initialize` mimic in JavaScript?**

---

### Accessor Methods - Setters

- George Michael has been a terrible manager, so how can we change the value of the `@manager` variable?

- Let's see what setter methods look like - they look a little funky at first, but you'll get used to them:

	```ruby
	def manager=(new_manager)
   		@manager = new_manager
  	end
  	```

- So, when we write `manager = "Anyone but George"`, you're telling me that we're actually calling that object's `manager=` method and passing in the new manager name as an argument? Yup, that's what's going on all righty!

---

### Accessor Methods - Setters (cont.)

- Time to fire George:

	```ruby
	my_stand = BananaStand.new
	my_stand.manager = "Pee-wee Herman"
	puts my_stand.manager
	```
	Excellent!

- **Now it's your turn:**
	- Write the setter methods for the `color` and `year_opened` attributes
	- You have 3 minutes...

---

#### Congrats, you've now written a B<span style="text-transform:lowercase">anana</span>S<span style="text-transform:lowercase">tand</span> class with attributes and accessor methods that get and set the values of those attributes.<br><br>

#### Question:

- **What's the special method in a class that is automatically called by Ruby when we create an instance of it?**

---

### More on Initialization

- Obviously it would be nice to be able to set the values of our object's attributes at the time we instantiate the object instead of having to set each attribute separately after we create it.

- Since `initialize` is just a method, we can write it to accept arguments!

	```ruby
   def initialize(color, year_opened, manager)
       @color = color
       @year_opened = year_opened
       @manager = manager
   end
   ```

- Now we can create all the custom `BananaStands` we want!

	```ruby
   my_stand = BananaStand.new "Pink", 1985, "Pee-wee Herman"
   ```
---

## Did Matz Lie To Us About Less Code?

- Coding all those getters and setters for every attribute gets tedious in a hurry.

- Not surprisingly, Ruby has methods for just about anything you can think of.

- To provide read and write access to attributes we can use the `attr_reader` and `attr_writer` methods respectively:

	```ruby
	# Replaces all getter methods
  	attr_reader :color, :year_opened, :manager
  	# Replaces all setter methods
  	attr_writer :color, :year_opened, :manager
  	```

> Note how we can use symbols to save memory when specifying the attribute names.

---

### The <span style="text-transform:lowercase">attr_accessor</span> Method

- Providing both read and write access to an object's attributes is so popular, Ruby provides us with a one-stop solution:

	```ruby
  	class BananaStand
  	  attr_accessor :color, :year_opened, :manager

      def initialize(color, year_opened, manager)
          @color = color
          @year_opened = year_opened
          @manager = manager
      end
   end
	```

- That's what were talking about!

---

### Practice: <span style="text-transform:lowercase">class</span> and <span style="text-transform:lowercase">attr_accessors</span>
<br>

- Define a class called `Game`.

- Give the `Game` class two attributes, `player1` and `player2`. Allow two player's names to be passed in at time of instantiation.

- Provide `attr_accessor` methods for the `player1` and `player2` attributes.

---

### Final Questions:
<br>
<p>Take 2 minutes to review these questions before we review them in class:</p>

- **Unlike in JavaScript, we cannot read or change the values of an object's attributes directly. Instead, we must write ________ and/or ________ methods or use Ruby's ________ methods.**

- **What's instantiation?**

- **What sort of variable do we use inside an object to share information throughout that object, including inside all of its methods?**
