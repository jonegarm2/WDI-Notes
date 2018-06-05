<img src="https://i.imgur.com/OFRKDgT.png" width="500">

# Ruby Classes - Lab

## Intro

Let's do some Object Oriented Programming with Ruby!


## Lab

### Define the `Calculator` class

In a file named _calculator.rb_, define a `Calculator` class with the following...

#### Attributes

- **num1** & **num2** whose values can be set on the instance.

- **Do not** allow these attributes to be set at the time of instantiation. In other words, you might not need that _special_ method.

#### Methods

Define methods for the four basic math operations:

- **add**

- **subtract**

- **multiply**

- **divide**

Each of these methods will perform math using **num1** as its first operand and **num2** as its second operand and return a string formatted as follows:

- _5 plus 6 equals 11_

- _5 minus 6 equals -1_

- _5 times 6 equals 30_

- _5 divided by 6 equals 0.8333333333333334_

#### Bonus

Verify that both **num1** and **num2** are set when any of the math methods are called. If either **num1** and **num2** do not have a value, the method should return the string:

_Both num1 and num2 must be set first!_

### Test the `Calculator` class

After the class has been defined, test it as follows in IRB:

```sh
> require './calculator'
> calculator = Calculator.new
> calculator.num1 = 5
> calculator.add
"Both num1 and num2 must be set first!"
> calculator.num2 = 6
> calculator.multiply
"5 times 6 equals 30"
```


