![](https://i.imgur.com/Ga2O5gM.png)
# Intro to jQuery 

| Learning Objectives - SWBAT:
| :---
| Explain the use case for jQuery
| Include jQuery in projects 
| Use the jQuery function to select DOM Elements
| Traverse the jQuery Object/Set
| Use jQuery to modify content of elements
| Use jQuery to modify the CSS of elements

## Roadmap
1. What is jQuery? (5 mins)
2. Setting up jQuery (10 mins)
3. Selecting Elements with jQuery (15 mins)
4. The jQuery Object/Set (15 mins)
5. Modifying the Content of Elements (15 mins)
6. Modifying the CSS of Elements (15 mins)
7. Further Study

## 1. What is jQuery?<small> (5 mins)</small>

### JavaScript Library

- jQuery is an open-source JavaScript **library** designed to make front-end development more productive and satisfying.

- Created by John Resig in 2006.

- jQuery has become the world's most popular JS library with more than 55% of the top 10,000 websites using it.

BTW, you'll see the terms _library_ and _framework_ thrown around quite a bit. Conceptually these two are similar, however, there is a subtle difference:

- Libraries, such as _jQuery_ and _lodash_ are focused on providing a set of utility or helper methods to make programming more efficient.
- Frameworks are more comprehensive, providing capabilities not found in utility JS libraries.
- Frameworks often use libraries to implement their features. But, you'll never find a library using a framework.
- For an analogy, you can think of libraries as the tools and frameworks as the construction crew.

### Why Use jQuery?

- **Browser Incompatibility**: jQuery provides a layer of abstraction that allows us not to worry about cross-browser compatibility issues. This, more than anything else, led to the widespread adoption of jQuery.  Developers no longer had to detect what browser their app was running in and code a bunch of if-else statements containing different code to do the same thing. The advancement of browsers, HTML, CSS and JS, have made compatibility issues less of a problem, but they still exist.
- **Productivity**: jQuery makes us more productive developers. jQuery's motto is:<br>_"write less, do more"_
- **Satisfaction**: Using the power of jQuery is just more fun than writing plain vanilla JS.

### What Can jQuery Do?

First, there is nothing jQuery can do that can't be accomplished with native JavaScript. This makes sense because jQuery **has** to use JS to do what it does.

Okay, so _what_ can it do?

- Manipulate DOM elements with ease.
- Easily create simple animations.
- Make binding to events more powerful.
- Make it easier to create apps that use AJAX (asynchronous JS and XML) to fetch data from, and send data to, servers.

### jQuery Documentation

[jQuery's main documentation](http://api.jquery.com/) can be unwieldy.

Those new to jQuery are best served by jQuery's newer [Learning Center](http://learn.jquery.com/) as the first reference.

**?: What is the difference between a _library_ and a _framework_?**

**?: What is the use case for jQuery? (what and when/why...)**

## 2. Setting up jQuery<small> (10 mins)</small>

### Create a Directory and Files

Lets create an _index.html_ page inside a directory called _first-jquery_:

With Terminal in a your daily working directory:

```
mkdir first-jquery
cd first-jquery
touch index.html
subl .
```
### HTML Boilerplate

Create your HTML boilerplate (with [Emmet](http://emmet.io/) type "!", then press [TAB]).

### Including jQuery

To use any JavaScript library in our web app, we need to ensure that the script files are included in _index.html_.

There are two ways we can include jQuery:

- [Download jQuery](http://jquery.com/download/) and save it somewhere within our project folder. Then include it using a `<script>` tag as we've done so far. For example:
  
  ```js
  <script src="js/jquery-3.2.1.min.js"></script>
  ```
- Use a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (content delivery network) like this:

   ```js
   <script
  		src="https://code.jquery.com/jquery-3.2.1.min.js"
  		integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  		crossorigin="anonymous"></script>
   ```

Downloading libraries and saving them to a folder in your project allows you to work with your project without an internet connection.

Using a CDN can provide performance benefits and save bandwidth on your server.

Let's use a CDN to load the jQuery library:

```html
<head>
    <meta charset="UTF-8">
    <title>Intro to jQuery</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
</head>
```

### Sample HTML

Now let's throw in some meaningless HTML that we can play with during the lesson. Copy and paste the following HTML between the `<body>` tags:

```html
<h1>Intro to jQuery</h1>
  
<div id="outer">
  Outer div
  <div id="inner" class="big-and-round">
    Inner div
  </div>
</div>
  
<p>Things we can do with jQuery:</p>
<ul>
  <li>Make it easier to select DOM elements and navigate between them</li>
  <li>Make it easier to modify properties of selected DOM elements.</li>
  <li>Easily create simple animations.</li>
  <li class="special-li">Make binding to events more powerful.</li>
  <li>Make it easier to create apps that use AJAX (asynchronous JS and XML), in other words dynamically get data from, and send data to, servers.</li>
</ul>
```

## 3. Selecting Elements with jQuery<small> (15 mins)</small>

Before we can change the properties of DOM elements, we must first _select_ them.

You've already had some practice doing this with native JavaScript.

**?: What native JS methods have we used to select elements in the DOM?**

### The _jQuery_ Function, aka - `$()`

The _jQuery function_ provides multiple functionality depending upon what we pass to it.

The function is actually named `jQuery()`, however, more commonly you will see and use the shorthand alias `$()`.

### Using `$()` to Select Elements

To select elements, we pass `$()` a string argument that represents a CSS3 selector, just like in a CSS3 rule. jQuery also has some non-standard selectors of its own.

Here is a nice summary of the ways we can select elements using the jQuery function:

<img src="https://i.imgur.com/AqB9VL3.jpg">

To select elements by the _type_ of the element, use the name of the tag, just like CSS. This would select all `<h1>` tags:<br>
`$('h1')`

To select by an element's _id_, again, you use the same syntax as CSS selectors.  This would select our outer div:<br>
`$('#outer')`

I bet you know how to elements by _class_ :)<br>
`$('.special-li')`

All CSS3 selectors rules apply. For example, this is how you could select just the first `<li>` tag using the `:first-child` _psuedo class selector_<br>
`$('li:first-child')`

**?: How would we select only `<div>` elements that have a class of `big-and-round` with jQuery?**

## 4. The jQuery Object/Set<small> (15 mins)</small>

The jQuery selector function, `$()`, returns a special object, known as the **jQuery Object**, also called a **jQuery set** or **wrapped set** because it "wraps" the selected DOM elements and provides them with jQuery's super-power methods:

<img src="https://i.imgur.com/Nmz13Kd.png">

Lets check out the structure of the _jQuery Object_. First, let's create a _jQuery Object_ using the jQuery function to select all of the `<li>` elements in the console:

```
> var $li = $('li');
< undefined
> dir($li)
< [...]  
```
>Note the convention to start the name of a variable used to hold a jQuery object with `$`. It is highly recommended that you follow this best-practice if you use jQuery in your projects.

Exploring `$li` in the console will reveal that it is an array-like object with lots of functionality - just look at all those methods in the \_\_proto\_\_!

To check how many elements a jQuery set contains in its array, we can use the `length` property:

```
> $li.length
< 5
```

Let's see what an element within the _jQuery Object_ array holds:

```
> $li[0]
< <li>...
```
So, each element in the array is a **native DOM element without jQuery's super powers**.

**?: When the jQuery function is passed a string representing a CSS3 selector rule, it will return a ______ ______, aka a "wrapped set"?**

**?: The _jQuery Object_ contains an array of zero or more native _____ ______.**

### Accessing the Native DOM Elements in a jQuery Object

As we've seen, the _jQuery Object_ contains an array of the selected native DOM elements. Therefore, you can access any of those DOM elements using bracket notation like any other array.

**What JS would we write to select the last `<li>` element contained in `$li` and assign to a variable named `lastLi`?**

Note how `lastLi` now references the actual native DOM element and has on it all of the native JS methods that DOM elements have.

### Adding jQuery Powers to Native DOM Elements

Although raw DOM elements have numerous useful methods and properties by default, they don't have jQuery's shortcuts and super powers like these:

```
> $li.fadeOut()
> $li.fadeIn()
```

Luckily, we can turn any regular DOM element into a super-powered jQuery object by wrapping it in the jQuery function.  Still in the console, type...

```js
// Set a var to reference a raw DOM element
var li = $li[0];

// Bummer, no super powers
li.fadeOut(); // generates an error

// Turn it into a jQuery object (wrapped set)
var $el = $(li);
$el.fadeOut();  // see you later alligator
// chaining is okay for one-time operations
$(li).fadeIn();  // back so soon?

// More big fun...
$el.hide();
$el.show();
$el.toggle();
$el.toggle(function() {
  console.log('toggled');
});
```

### Iterating Elements in a jQuery Object

Although the jQuery object is an array-like object, it does not have the built-in handy array methods like `forEach()`. However, jQuery usually provideds it's own methods, typically named using less characters :)
 
Instead of `forEach()`, jQuery provides the `.each()` method on the jQuery set that can be used to iterate over each raw DOM element.

Here's how we can use `.each()` along with jQuery's `.html()` shortcut method for getting & setting the native `innerHTML` property:

```js
$('li').each(function(idx) {
	console.log( idx + ': ' + $(this).html() );
});
```
Note that the `each()` method passes in an argument representing the current index to the callback. **How is this different from an array's `forEach()` method?**

Inside the callback function, jQuery has set the `this` keyword to point to the iteration's current native DOM element. Again, to perform jQuery's magic on it, **what must we do?**

### The jQuery `eq()` Method

The `eq()` method can be used to index into the array of DOM elements like we've done using square brackets.  However, `eq()` automatically wraps the DOM element in a jQuery object with all of the magic.

Knowing this, we could refactor the above iteration like this:

```js
var $li = $('li');

$li.each(function(idx) {
	console.log( idx + ': ' + $li.eq(idx).html() );
});

// The above code is just to demonstrate the eq() method.
// This code would be slightly more concise:
$li.each(function(idx) {
	console.log( idx + ': ' + $(this).html() );
});
```

## 5. Modifying the Content of Elements<small> (15 mins)</small>

[This page from the Learning Center](http://learn.jquery.com/using-jquery-core/manipulating-elements/) contains methods and techniques we can use to manipulate elements.

### The `html()` Method

**Using native JavaScript, how can we change the "inner" `<div>`'s content from "Inner div" to "jQuery Rocks!"?**

Here's the jQuery way:

```js
$('#inner').html('jQuery Rocks!');
```
Note that native JS uses a member _property_, `innerHTML`, whereas jQuery uses the `html()` _method_ to change the HTML contents of an element.

### Getters & Setters

Many of jQuery's methods are designed to both **get** and **set** data on an element.

Whether a method behaves as a _getter_ or _setter_ depends upon the arguments passed into it.

For example, the `html()` method:

- `html()`: No arguments, behaves as a getter
- `html('new value')`: One argument, behaves as a setter

When using a setter to modify the DOM, the change applies to **all elements in the jQuery set**. For example:

```js
// Change the content of all <li>'s
$('li').html('Hello World');
```

That's pretty powerful stuff and would have required several lines of code to accomplish without jQuery.

>Note: In programming, when the same method name performs different functionality when a different number and/or type of argument(s) are provided, we say that the method has been **overloaded** and has **multiple signatures**.

## 6. Modifying the CSS of Elements<small> (15 mins)</small>

### The `css()` Method

jQuery has a `css()` method that we can use to get and set the CSS properties of elements.

Here's how we can change the `color` and `font-weight` on all of the `<li>` elements:
 
```js
$('li').css({ 'color': 'green', 'font-weight': 'bold' });
```

Above we have passed the `css()` method an object where the keys represent the css property.

Notice how we had to write the key `font-weight` as a string - **why is this?**

You may also come across code that uses the JS lower-camel-case versions of the property names. For example we could have the above code like this:

```js
$('li').css({ color: 'green', fontWeight: 'bold' });
```

`css()` also has a different syntax we can use to set a single CSS property at a time:

```js
$('p').css('font-size', '30px');
```

**In the console, write code that will set the background color of _only the last_ `<li>` element to yellow.**

### Chaining Methods

Each jQuery method, **when used as a setter**, returns an updated jQuery Object containing the selected elements. This allows us to **"chain"** methods like this:

```js
// Change our <p> tag's content and color
$('p').html('Awesome things jQuery can do:').css('background-color', 'peachpuff');
```
Often, you will see method chaining indented like this to enhance readability:

```js
// Change our <p> tag's content and color
$('p')
  .html('Awesome things jQuery can do:')
  .css('background-color', 'peachpuff');
```

**?: What jQuery method can be used to get/set the content of the elements inside of a jQuery set?**

**?: What is it called in programming when a method behaves differently depending upon the number and/or type of arguments passed to it?**

## 7. Further Study

### Code Minification

Often you will see library and framework files end with `.min.js`. This is a naming convention used to signify that the code has been _minified_.

Minification is the process of making a javascript file smaller by removing all line breaks and whitespace, reducing the length of variable and function names, and stripping out all comments.

The **benefits** of using minified versions of libraries is that they use less memory; and take less time to load, parse and execute since they are significantly smaller - usually around a third in size.

The **downside** of using minified code is that it can't easily be understood or debugged. We won't have to worry about debugging jQuery, but reading source code is a great way to learn coding techniques and in this case you would want to use the non-minified versions.

In the future, we'll see that frameworks such as _Ruby on Rails_ will automatically minify and concatenate our app's JavaScript when it's deployed to a host.

## References

[Official jQuery website](https://jquery.com/)

[jQuery Cheat Sheet](http://overapi.com/jquery/)
