# A Hint of Ruby: Arrays, Hashes and Blocks 

## Introduction 

We continue our treatment of Ruby by discussing arrays, hashes and blocks. These constructs allow us to store, retrieve and manipulate *collections*. A collection is a general term in computer science that refers to something that holds some variable number of data items. Arrays and hashes all fit under the umbrella of collections. After reading this article you should be able to do the following in the Ruby programming language:

* Use basic array methods including `count`, `first`, and `last`
* Iterate through arrays with the `each` method
* Get and set values for specific hash key
* Get a list of all keys in a hash

## A Brief, Practical Review of the Ruby Programming Language

Remember that everything in Ruby is an object. In object-orientated programming objects are created by classes. We can determine what class an object belongs to in Ruby: 

```ruby
3.class #=> Fixnum
3.14.class #=> Float
"hello".class #=> String
[1,2,3].class #=> Array
```

Unlike JavaScript *every* property on an object is a method. In Ruby, methods allow you to set and get data from objects.

In Ruby variables are scoped by the way they are named. Here are the various variable identifiers: 

* **Local variables**: `[a-z]` or `_` 
* **Global variables**: `$`
* **Instance variables**: `@`
* **Class variables**: `@@`
* **Constants**: `[A-Z]`

**Question**: Define scope.

Ruby variables follow these rules:

* A **local variable** is only available to the block of code or method it is defined in 
* **Class variables** live inside of a class and are in scope to all instances of some class 
* **Global variables** are in scope everywhere in your program
* An **instance variable** is only defined within an instance of a class (i.e., within a particular object)
* A  **constant** is not meant to have its value altered (although Ruby will technically allow it)

> What's the difference `puts` vs `print`: `puts` prints to the output *with* a newline at the end, while `print` prints to the output *without* a newline. 

By convention we use `snake_case` for variable names in Ruby. 

Symbols are immutable, reusable constants represented internally by Ruby using an integer value. They are often used instead of strings to efficiently represent a specific value. They are created once in memory.

```ruby 
:pending.class #=> Symbol 
status = :pending  
status == :pending #=> true 
status == "pending" #=> false
status == :approved #=> false
status.object_id #=> (on my computer) 115938
:pending.object_id #=> (on my computer) 115938
```

## Arrays in Ruby

Generally in programming arrays are used for storing one or more values in an *ordered* fashion. By *ordered* I mean that you can select objects from an array based on a consistent, consecutive numerical index. We can create arrays using 2 different syntaxes:

1. Using array literal syntax (`[]`)

```ruby
nums = [1,2,3]
```

2. Use array constructor syntax (`Array.new`)

```ruby
ary = Array.new(5, "cats") #=> ["cats", "cats", "cats", "cats", "cats"]
```

Arrays in Ruby are 0-indexed meaning that the element in the first position in the array can be referred to by the 0<sup>th</sup> index. You can access elements in an array using bracket (`[]`) notation or by using a number of built-in Ruby methods:

* `last` - Retrieves the last element in an array
* `first` - Retrieves the first element in an array 

```ruby
array = ["Ristretto", "Cortado", "Espresso", "Americano"] 

ristretto = array.first #=> "Ristretto"
cortado = array[1] #=> "Cortado"
espresso = array[2] #=> "Espresso"
americano = array.last #=> "Americano"
```

**Task**: Spend 5 minutes researching the `count` method then come up with a way to use `count` to tell me how many of my friend's names start with a capital "A".

```ruby
friends = ["Anna", "Sam", "Steve", "Alex"] 
```

We can use the `push` method or the shovel operator (`<<`) to add an element to an array.

```ruby
num = [1,2,3,4]
num.push(5) #=> [1,2,3,4,5]
num << "not a num" #=> [1,2,3,4,5, "not a num"]
```

We can use the `delete` method to remove an element from an array.

```ruby
nums.delete "not a num" #=> [1,2,3,4,5]
```

We can iterate through arrays in Ruby using a traditional `for-loop` or by using the `each` method.

**Question**: Can someone give me the name of the array method in JavaScript that behaves just like Ruby's `each` method?

Type out both ways to iterate through an array below.

```ruby
good_food = ["banana", "Pop Tart", "pizza"]
bad_food = ["Gazpacho", "Balut", "Rocky Mountain Oysters"]

for item in good_food
        print "I like #{item}\n"
end

bad_food.each do |item|
        puts "I don't like #{item}"
end
```

Ruby programmers don't write `for-loops` and instead use `each` to iterate through arrays. It should be noted that you pass a **block** to an `each` method.

## Blocks in Ruby

A `block` in Ruby is code you put between a `do` and an `end`. You can then essentially pass a block to a method as an argument. Blocks can actually be written using 2 different syntaxes:

1. When multi-line they can be written between a `do` and an `end`

```ruby
odds_and_evens = [1,2,3,4,5,6,7,8]

odds_and_evens.select do |num|
  num.even?
end
```

2. When written as a single line you can use a `{` and an `}`

```ruby
nums = [1,2,3]

nums.map {|num| num + 1} 
```

![block](https://docs.google.com/drawings/d/1WBX9QZHmacJ476XUl1kth0sVqE0LvWeg7eVAWZrjjHM/pub?w=958&h=530)

A block is similar to an anonymous functions in JavaScript. Here we use `forEach` in JavaScript.


```js
[1,2,3].forEach(function(elem) {
  console.log(elem)
})
```

Below we use `each` in Ruby.

```ruby 
[1,2,3].each do |elem| 
  puts elem
end
```

## Methods in Ruby

Ruby methods are similar to functions in JavaScript. Generally methods are used to extract common code into one place and re-use this code anywhere. Unlike JavaScript we use the `def` keyword to *define* methods in Ruby and `end` to close our block.

```ruby 

def add(a,b) 
  a + b
end
```

In the `add` function above `a` and `b` are parameters passed to the `add` function. We can *invoke* methods just like we *invoke* functions in JavaScript: by passing it arguments.

```ruby
def add(a,b) 
  a + b
end

def identity x 
  x 
end

add(2,3)
identity 4
```

You may have noticed we didn't include a `return` statement in our `add` or `identity` functions. This is because in Ruby every method returns the evaluated result of the last line that is executed.

## Hashes in Ruby 

Hashes are how we store key-value pairs in Ruby. Hashes are good for storing related data (e.g., a `name` property and with a `value` of "Jonathan").

**Question**: What JavaScript data type is a Ruby hash most like?

We can create a hash using a *hash-rocket* to delimit keys and values.

```ruby
person = {"name" => "Seymour", "age" => 56}
person["age"] #=> 56
person["name"] #=> "Seymour"
```

We can also use *symbols* as our keys.

```
person = {name: "Seymour", age: 56}
person[:third] = "property"
```

In the example above `name:` and `age:` are both properties. Note we also added a property with a key of `:third` to the `person` hash.

We can iterate through a hash using `each` and passing it a block.

```ruby
x = {a: 1, b: 2}

x.each do |key, value|
  puts "The key is #{key} and the value is #{value}"
end
```

The `key` and `value` of each property in a hash are passed to the block as parameters.

We can list the keys of a given hash using the `keys` method.

```ruby
x = {a: 1, b: 2}
x.keys #=> [:a, :b]
```

## Conclusion

You now know how to create and manipulate collections in Ruby. This is something that you will be doing a lot in the next three weeks when writing code using Ruby on Rails.