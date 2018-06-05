This presentation is available at:
[https://presentations.generalassemb.ly/2e967bd4959638cac82f](https://presentations.generalassemb.ly/2e967bd4959638cac82f)

---

![](http://files.meetup.com/1611353/ruby-logo-crop.png)

# Intro to Ruby

---

## Objectives
<br>

__*After this lesson, students will be able to:*__
<br>

- Identify Ruby's data types

- Use variable naming to determine a variable's scope

- Run a Ruby program in the terminal

---

## Intro to Ruby
<br>

- We've gotten our feet wet with the in-browser technologies:
	- HTML, CSS, and JavaScript

- This week we are going to learn a new programming language called _Ruby_.

- After learning the basics of Ruby, we'll look at how to use the language, along with the extremely popular _Ruby on Rails_ framework, to write full-stack web apps!

---

#### Pair up and research the background and other facts you can learn about the<br> "Ruby Programming Language"<br>in 2 minutes
<br>

- Avoid information related to **Ruby on Rails** - we're only interested in the **Ruby** programming language!

- Be prepared to share your findings...

---

### Some Facts About Ruby

- Created By: **Yukihiro "Matz" Matsumoto** (of Japan)

- When Created: **mid-1990's**

- Characteristics:
  - **Great readability - designed for programmers**
  - **Feels "natural" in a way that mirrors life**
  - **Fun to use, less typing**
  - **OOP Language - everything is an Object**

<br>
> "I hope to see Ruby help every programmer in the world to be productive, and to enjoy programming, and to be happy. That is the primary purpose of Ruby language."<br>Matz

---

## Follow Along!
<br>

- Interactive Ruby Shell
  - **IRB** - the default
  - **Pry** - an improved shell that was installed during Installfest

- Open a Terminal window and type `IRB`<br>**Welcome to your Ruby playground!**

- Type: `"Hello" + " World!"`<br>`=> "Hello World!"`

- Good to go!

---

## Ruby Basics vs. JavaScript

- You've already been exposed to several programming **concepts** that are common to all programming languages:
  - Datatypes & variables (including scope)
  - Flow control
  - Comparison expressions
  - Functions/Methods
  - Etc.

- You've become familiar with JavaScript - perhaps your first programming language. So...

- A good starting point for your journey to become a Rubyist is to compare some of the basics of Ruby to that of JavaScript's...

---

## Objects in Ruby

---

### Objects in Ruby
<br>

- **Everything** in Ruby is an Object!

	```ruby
	"hello".methods
	=> wow!...
	```
	
	When you get tired of scrolling down through the list of methods with the arrow key, pressing `q` will return to command mode.

---

### Objects in Ruby
<br>

- Unlike JavaScript, in Ruby, **every** "property" on an object is a **method**, it never contains data.

- Don't misunderstand, objects contain data, it's just that the data needs to be set and retrieved using method calls.

- Enough about objects for now, we'll cover them more in detail in upcoming lessons.

---

### Basic Ruby Syntax
<br>

- Take a look again at what we typed earlier:

	```ruby
	"hello".methods
	```
	
- Notice anything different as compared to JavaScript?...

---

### Basic Ruby Syntax
<br>

- In Ruby, semicolons are optional and rarely used!

- Typically, you would only use semicolons to separate multiple statements written on the same line, which is usually a bad idea.<br>For example (don't try to run):

	```ruby
	cat.name = "Felix"; cat.age = 3
	```

---

### Basic Ruby Syntax

- We can invoke methods without parenthesis, and commonly do!

	```ruby
	my_car.make = "Toyota"
	```
	Don't let the `=` fool you, we are not assigning "Toyota" to a `make` property, we are actually calling a method named `make=` passing in "Toyota" as an argument. The following three statements do the exact same thing:

	```ruby
	my_car.make=("Toyota")
	# parens are optional
	my_car.make= "Toyota"
	# space allowed thanks to syntactic sugar
	my_car.make = "Toyota"
	```

---

### Basic Ruby Syntax
<br>

- Type this into our REPL window:

	```ruby
	x = 5
	puts x
	x += 3
	puts x
	```

> Note: The `puts` method outputs to the standard output and appends a newline character. The `print` method does the same, but does not append the newline character.

- **Contrast the above with JavaScript...**

---

### Basic Ruby Syntax
<br>

- Variable and method names are typically snake-cased, not camel-cased as in JS.

- There is no `var` or equivalent keyword in Ruby. Variables are automatically declared when they are used for the first time.

- The `+=` (_in place addition_) operator works the same as it does in JS. You will find that the majority of operators work like they do in JS.

---

## Datatypes

---

### Datatypes
<br>

- In classical OOP languages such as Ruby, all objects are created by **Classes**. Think of classes as a blueprint for objects.

- An object's class, is in essence, it's type.

- Ruby has built-in classes that map very closely to the datatypes we saw in JavaScript.

---

### Datatypes
<br>

- Let's start with a quick review of the datatypes we've seen in JavaScript.

- **? - How many datatypes are there in JS?**

- I'll write them on the board as you call them out...

---

### Datatypes - JavaScript
<br>

- **boolean** (`true` or `false`)
- **number** (`12`, `3.95`, etc.)
- **string** (`"awesome"`)
- **object**
  - `{key: 'value', nice: true, stuff: [1,2,3]}`
  - Built-in special objects<br>(_arrays_, _dates_, _functions_, _regex_)
- **null** (used to represent no value explicitly)
- **undefined** (uninitialized variable or nothing returned)

<br>
#### Let's see how Ruby's datatypes compare...

---

### Booleans
<br>

- Booleans are the same as in JS because they contain either `true` or `false`.

- A key difference however is in **truthy** and **falsy** comparisons:

	```ruby
	!!0
	=> true     # zero is false in JS
	!!""
	=> true     # empty string is false in JS
	```
- Just remember, **everything** in Ruby is _truthy_ **except**:
  - `false`
  - `nil`

---

### Numbers - Integers
<br>

- Unlike JavaScript with its sole `number` datatype, Ruby distinguishes internally between **floats** and **integers**.

	```ruby
	15.class
	=> Integer
	12345678912345678912.class
	=> Integer
	```
- Since everything in Ruby is an object, we can find out what **class** was used to create that object by calling its `class` method.
- You may see `Fixnum` or `Bignum` instead of `Integer` if your Ruby version is not up to date.

--- 

### Numbers - Floating Point (aka Floats)
<br>

- The class used to create floats is `Float`:

	```ruby
	2.34.class
	=> Float
	```
	
- Ruby automatically converts one type of number to another for us.  Try this:

	```ruby
	my_number = 15 + 5.2
	=> 20.2
	```
	
- **What will the datatype of `my_number` be?**

--- 

### Numbers (cont.)
<br>

- Check this out:

	```ruby
	5 / 2
	=> 2
	```
	Wow, we divide two integers and the result is an integer, which may not be what you expect!
	
- Now try this:

	```ruby
	5 / 2.0
	=> 2.5
	```
	That's better :)

---

### Strings
<br>

- Strings are pretty much the same as in JavaScript but with a slew of more methods available.

- Just like in JS, we can use single or double quotes for string literals. Double quotes are a little more popular due to _string interpolation_.

- It's okay if you don't remember _string interpolation_, we'll review it in a bit...
 
---

### Strings - <span style="text-transform: lowercase;">to_s</span> Method
<br>

- Unlike JS, Ruby will not automatically convert numbers into strings for us:

	```ruby
	age = 21
	"She is " + age.to_s + " years old"
	=> "She is 21 years old"
	```

- Every object in Ruby has the `to_s` method.
- `to_s` has a default implementation, but its behavior can be overridden (just like any method can be).

---

### Strings - Interpolation
<br>

- With **String Interpolation**, Ruby will evaluate an expression embedded in a string and automatically call `to_s` on it:

	```ruby
	more_years = 5
	"In #{more_years} years, she will be #{age + more_years} years old"
	=>  "In 5 years, she will be 26 years old"
	```

- Multiple `#{}` sequences can be used in the same string.
- Double quotes (`"`) must be used with interpolation.
- FYI, there are no _template strings_ (back-tick) like we saw in ES2015.

---

### Arrays
<br>

- **Arrays** in Ruby are similar to JS, but of course with more methods.

- Just like in JavaScript, they can be created using an **array literal** and indexed with **bracket notation**:
	
	```ruby
	my_array = ['Hello', 'World']
	my_array[0] + " " + my_array[1]
	=> "Hello World"
	```

- More on Arrays and Ruby's Symbols & Hashes (closest thing to JS's plain objects) coming later today!

---

### Null & Undefined
<br>

- The equivalent of JavaScript's `null` in Ruby is `nil`

- There is no `undefined` in Ruby.  If you access a variable that has not been initialized by assigning a value to it, it returns an error.

---

### Hashes
<br>

- So we know that arrays are awesome at storing lists of data elements. However, we also know that a great data structure to have around is one that holds _key/value_ pairs.

- **What data type did we use in JavaScript when we needed to store _key/value_ pairs?**

- In CS terms, this data type is known as a _dictionary_.

- In Ruby, we use a **hash** to hold key/value pairs.

---

### Hashes (cont.)
<br>

- Here's how we might create a hash in Ruby:
	
	```ruby
	person1 = {'name' => 'Suzy', 'age' => 23}
	=> {"name"=>"Suzy", "age"=>23}
	person1['name']
	=> "Suzy"
	person1.keys
	=> ["name", "age"]
	person1.values
	=> ["Suzy", 23]
	```

---

### Hashes (cont.)
<br>

- Note how _square bracket notation_ must be used to access the values in a hash - there is no _dot notation_:

	```ruby
	person1 = {'name' => 'Suzy', 'age' => 23}
	=> {"name"=>"Suzy", "age"=>23}
	person1['name']
	=> "Suzy"
	```

- **Why would _dot notation_ not be possible?**

---

### Hashes (cont.)
<br>

- The `=>` is called a _hash rocket_, and it is used to designate what _value_ the _key_ holds ("points to"):

	```ruby
	person1 = {'name' => 'Suzy', 'age' => 23}
	=> {"name"=>"Suzy", "age"=>23}
	person1['name']
	=> "Suzy"
	```

- Ruby version 1.9 presented a more concise way to write hashes using another data type known as **Symbols**...

---

### Symbols
<br>

- _Symbols_ allow for a more concise syntax:

	```ruby
	person2 = {name: 'Joe', age: 12}
	=> {:name=>"Joe", :age=>12}
	person2[:age]
	=> 12
	```

- With a colon to the right of the key name, using _symbols_ this way will feel a lot like working with JS objects.

---

### Symbols (cont.)
<br>

- Except when using the concise syntax to assign values within a hash, symbols actually _begin_ with a colon, for example, look how Ruby returned the hash we defined:
 
	```ruby
	person2 = {name: 'Joe', age: 12}
	=> {:name=>"Joe", :age=>12}
	```

- And how we used the symbol within the brackets to access the value:

	```ruby
	person2[:age]
	=> 12
	```
---

### Symbols (cont.)
<br>

- The newer concise syntax will save you some typing, however, you will see this "longer" syntax using the _hash rocket_ to define hashes in plenty of existing code bases and when googling:

	```ruby	
	person2 = {:name => 'Joe', :age => 12}
	=> {:name=>"Joe", :age=>12}
	```

---

### Symbols (cont.)

- Think of **symbols** as efficient strings used to identify stuff.

- Ruby uses them internally all over the place because of their efficiency:

	```ruby
	"hello".object_id
	=> 70345675970460
	"hello".object_id
	=> 70345675973588
	:hello.object_id
	=> 1088348
	:hello.object_id
	=> 1088348
	```
- Notice each time we use a string with the same text, it creates a new object in memory. Symbols on the other hand are only created once, saving memory, and increasing execution speed.

---

### Ruby's datatypes - Review

- Is the value of 0 (zero) considered _truthy_ or _falsey_?

- In Ruby, **everything** is an ________.

- String ____________ allows us to embed an expression within a string.

- Assuming the following code:

	```ruby
	s = "apples: "
	n = 25
	p = s + n
	```
	What is the result in Ruby?<br>In JavaScript?

---

## Variable Scope

---

### Variable Scope

- Review of Scope:
  - The scope of a variable determines where in the code the variable is accessible.
  - If you can access a variable (or method), it's considered to be *in scope*, otherwise it's *out of scope*.<br><br>**Variables in JavaScript had either _______ or _______ scope**.

- Levels of Scope in Ruby:
	- Global
	- Local
	- Instance
	- Class

---

### Variable Scope - Names Matter
<br>

- In Ruby, variables are scoped according to the way they are named!

- If the Variable identifier begins with:
  - **`[a-z]`** or `_` - Local variable
  - **`$`** - Global variable
  - **`@`** - Instance variable
  - **`@@`** - Class variable
  - **`[A-Z]`** - A constant (class/module/global)

---

### Variable Scope - Names Matter
<br>

<img src="https://i.imgur.com/lbBDx8Q.jpg" style="width:900px">

---

## Variables - Code Along

---

### Local Variables

- A local variable is only available to the block of code or method it's defined in.

	```ruby
	num_cars = 3
	
	def get_car_count
  		return num_cars
  		# FYI, the return keyword is optional :)
	end
	
	num_cars
	=> 3
	
	get_car_count
	=> NameError: undefined local variable or method `num_cars'...
	```

- Local variables are typically used to hold temporary data within methods.

---

### Global Variables
<br>

- Global variables are in scope everywhere within your program.

	```ruby
	$name = "Rose"
	
	def say_hello
  		"Hello #{$name}"
	end

	say_hello
	=> "Hello Rose"
	```

- As usual, the use of global variables should be minimized.

---

### Instance Variables

- An instance variable is in scope inside of an instance of a class.

- Tomorrow, we will look at defining classes and instance variables. For this example, just realize that we are actually in an instance of a class when using `IRB`:

	```ruby
	@apples = 25
	
	def pick_apples(num_picked)
  		@apples += num_picked
	end
	
	pick_apples 5
	=> 30
	@apples
	=> 30
	```

- The lifetime of an instance variable is the same for the object instance itself.

---

### Class Variables

- Class variables (defined using `@@`) live inside of the class and are in scope to all instances of that same class.

- There is only one copy in memory of a given **class**, therefore there is only one copy of a class variable.

- The class, and all instances of that class share that same variable and when changed by one instance, all the others will see that change.

- You will see classes in action later this week.

---

### Constants

- Unlike variables, once set, the value of a constant is not **meant** to be changed.

	```ruby
	API_BASE_URL = "http://pokeapi.co/api/v1/"

	def build_endpoint(path)
  		API_BASE_URL + path
	end

	
	build_endpoint "pokemon/1/"
	=> "http://pokeapi.co/api/v1/pokemon/1/"
	```

- **What makes `API_BASE_URL` a constant?**
- The scope of constants is based upon where they are declared:
  - Globally
  - Module
  - Class

---

## Running a Ruby Program in Terminal
<br>

- Before we do some practice, let's see how we can put Ruby code in a file and execute it in Terminal:

	```sh
	$ touch first_ruby.rb
	$ echo "puts 12345" > first_ruby.rb
	$ ruby first_ruby.rb
	$ 12345
	```

- Now you can open `first_ruby.rb` and write Ruby code for the following exercise...

---

## Practice Exercise
<br>

#### Feel free to collaborate...

- Declare a constant that contains your name.

- Declare a local variable that contains your age.

- Use the `puts` method to print out a string that uses string interpolation and says:<br><br>**"Hi there, my name is ________ and I'm ___ years old."**

---

## Conclusion
<br>

- **Is an empty string ("") truthy or falsey in Ruby? JavaScript?**

- **In addition to global variables, what other 3 types of variables did we talk about?**


<br>
#### Next up we're going to learn about control flow in Ruby, then more about its arrays & hashes.

---

## References
<br>

- [Official Ruby Documentation](http://ruby-doc.org/)
