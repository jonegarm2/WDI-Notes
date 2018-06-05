![](https://i.imgur.com/Ga2O5gM.png)
# jQuery - Part 2 

| Learning Objectives - SWBAT:
| :---
| Use jQuery to add & remove classes
| Use jQuery to modify attributes
| Use jQuery to add and remove DOM elements
| Bind to events with jQuery
| Use jQuery to perform simple animations

## Roadmap

- Page Setup (10 mins)
- Adding & Removing Classes (10 mins)
- Creating New DOM Elements (15 mins)
- Modifying Attributes (5 mins)
- Adding Event Listeners (15 mins)
- More on DOM Manipulation (10 mins)
- Practice Challenge - Add New Homes

## Page Setup<small> (10 mins)</small>

### Create `app.js`

For this lesson, we're going to use the same `index.html` inside the `first-jquery` directory we created in the _Intro to jQuery_ lesson.

However, we're going to create an `app.js` file inside of a `js` directory to put our JavaScript in:

```
mkdir js
touch js/app.js
```

### Load Order Matters

The browser parses JavaScript in the order it is loaded. So we have to be sure to load jQuery before any code that uses it.

In our projects, a best practice load order looks like this:

1. jQuery -  has no dependencies, so load it first
2. Other third-party libraries - several of which depend upon jQuery
3. Third-party frameworks - for example, AngularJS
4. Your application's `.js` file(s).

So we now know that we need to add our `app.js` **after** jQuery:

```html
...
    <script
  		src="https://code.jquery.com/jquery-3.2.1.min.js"
  		integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  		crossorigin="anonymous"></script>
    <script src="js/app.js"></script>
...
```

### Sprinkle in Some CSS - Bootstrap

Let's also include the CDN of [Bootstrap](http://getbootstrap.com/), a CSS framework that we will learn more about later, but will make our simple demo apps easier on the eyes. Here's what we should have so far:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome Back to jQuery</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="js/app.js"></script>
</head>
<body>
    
</body>
</html>
```

[Bootstrap](http://getbootstrap.com/) changes the default styling of most elements and provides numerous classes we can use.

### Starting HTML

Our sample app is going to display a list homes for sell in Lake Arrowhead.

Here's some HTML to get us started - replace the existing `<body>` tags with the following:

```html
<body class="container">

  <h1 class="jumbotron">Lake Arrowhead Homes For Sale</h1>

  <table id="homes" class="table">
    <thead>
      <tr>
        <th>Address</th>
        <th>Sq. Ft.</th>
        <th>Bedrooms</th>
        <th>Baths</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>27374 Matterhorn Drive</td>
        <td>1,664</td>
        <td>3</td>
        <td>2</td>
        <td>$279,500</td>
        <td><button class="btn btn-xs btn-danger">Remove</button></td>
      </tr>
      <tr>
        <td>243 El Dorado</td>
        <td>4,900</td>
        <td>6</td>
        <td>6.5</td>
        <td>$990,000</td>
        <td><button class="btn btn-xs btn-danger">Remove</button></td>
      </tr>
      <tr>
        <td>1228 Klondike Drive</td>
        <td>2,158</td>
        <td>4</td>
        <td>2.5</td>
        <td>$400,000</td>
        <td><button class="btn btn-xs btn-danger">Remove</button></td>
      </tr>
    </tbody>
  </table>
  <br>
  <button id="addHome" class="btn btn-danger">Add Home</button>

</body>
```

### Ensuring that the DOM is Ready

Since our script is in the `<head>`, it will be parsed before the DOM. If our code references any DOM elements, and since this is a jQuery lesson it most certainly will, we need to delay our code's execution until the DOM is fully built by the browser.

jQuery knows that we should not run any code before the DOM is ready and provides the following to help us out:

```js
$(document).ready(function() {
  // all of your app's js goes within this function
  alert("Everything is ready, let's do this");
});

// or, the shortcut version
$(function(){
  // all of your app's js goes within this function
  alert("Everything is ready, let's do this");
});
```

Regardless of which approach you use, all of your code should be placed inside the callback function (where the `alert` statements are).

**What's an additional benefit of putting our code inside of jQuery's ready methods?**

### Open it Up!

We're all set to get started. If you have the VS Code extension installed, you can right-click anywhere on `index.html` in the editor and select `Open in Browser`.

Your page should load and the alert should appear.

## Adding & Removing Classes<small> (10 mins)</small>

<img src="https://i.imgur.com/li8qvF7.png">

It looks like our designer styled our _Add Home_ button with Bootstrap's `btn-danger` class making it red. We may be code junkies, but even we know that a button that adds something new should probably be colored something other than red. Let's make it green instead. 

Change the button from red to green by removing the `btn-danger` class and adding the `btn-success` class with jQuery:

```js
$(function() {

  $('#addHome').removeClass('btn-danger').addClass('btn-success');

});
```
That's better!

**?: What's it called when we call a method immediately after a previous method like we did above?**

**Your turn. Using jQuery, add the Bootstrap class named "text-center" to the `<h1>` tag.**

>Note: In case you're wondering, NO, we would not ordinarily style our page initially using jQuery vs. the `class` attribute :)  We would use jQuery to change styling dynamically.

### Does an Element have class?

jQuery's has a `hasClass(<the class(es) as a string>)` method that returns true/false depending if all of the element in the wrapped set have the class:

For example:

```js
var isStyled = $('p').hasClass('left-aligned big');
// the isStyled var will be true if all <p> elements have 
// the classes of "left-aligned" and "big"
```

There's also a `toggleClass(<the class as a string>)` method - **guess what it does?**

## Creating New Elements<small> (15 mins)</small>

jQuery makes creating new elements easy. Lets add a hyperlink (`<a>`) to our page that, when clicked, takes our users to Zillow's website!

### New Element from an HTML String

As you've seen, the jQuery function performs different functionality depending upon its arguments.  Now let's see how it can create elements!

One way is to just provide a string representing the HTML to the jQuery function:

```js
var $newLink = $( '<br><br><a id="zillowLink" href="http://www.zillow.com">Visit Zillow.com</a>' );
```

We'll see how to add the new elements contained in the jQuery object to the DOM in a bit. But first...

>Note that the jQuery function recognizes the fact that we are passing in a string that resembles HTML instead of a CSS selector - that's how it knows to create a new element instead of selecting elements. jQuery - you're so smart!

**?: Notice the variable begins with a `$` - why?**

Lastly, remember that there are many ways to skin a cat, for example, these three code examples are all equivalent ways of creating a certain element:

```js
var $p = $('<p class="bold">');
```

```js
var $p = $('<p>', {class: 'bold'});
```

```js
var $p = $('<p>').addClass('bold');
```

Which approach you use is up to you (or your boss).

### Adding the Element to the DOM

The `$newLink` variable now holds our newly created elements, however, we still need to add it to the page. One of the ways is to use the `append()` method:

```js
$('body').append($newLink);
```
`append()` will insert new elements at the end, but still inside of the specified element's closing tag.

Other methods available include:

- `appendTo()`
- `insertBefore()`
- `insertAfter()`
- `before()`
- `after()`
- `prepend()`
- `prependTo()`

The practice challenge will provide an opportunity to practice adding elements...

### Check it Out

Refresh your page and there's the link!

However, we have a UX problem - the link takes us away from our app. Wouldn't it be better instead to open Zillow in another tab? We'll do that in the next section!

## Modifying Attributes<small> (5 mins)</small>

jQuery makes it easy to add/modify the attributes of an element with the `attr()` method.

Lets use it to add a `target` attribute to our link:

```js
  $('#zillowLink').attr( "target", "_blank" );
```
Refresh - Yay!!!

**? - Guess how we would retrieve the value of an attribute...<br>`console.log` the value of the link's `href` attribute.**

There's also a `removeAttr()` method we can use to remove attributes.

## Adding Event Listeners<small> (15 mins)</small>

### Basic Event Listeners

When our shiny green _Add Home_ button is clicked, we want to add one of the homes from an array that we will preloaded with a few homes.

Here is how we can add a _click_ event listener to the _Add Home_ button:

```js
  $('#addHome').on('click', function(evt) {
    console.log(evt, this);
  });
```
Refresh the page and open the console to see what the `evt` argument (jQuery's _event_ object) passed in by jQuery looks like and what `this` is set to.

The _event_ object is pretty much the same as in native JS and can come in handy, especially when listening to mouse events. It's the _event_ object, for example, that would make writing a drawing or paint application possible.

When googling, you will find plenty of jQuery code using a different syntax for adding a event listeners similar to this:

```js
  $('#addHome').click(function(evt){
    console.log(evt, this);
  });
```
This syntax in fact uses the `.on` method internally.

However, **use of the `.on` method is considered to be the best practice.**

In addition, you will find code examples out in the wild that use other event methods such as `.live()` & `.die()`, these methods are obsolete and should not be used in new code.

>Note: Generally, more weight should be given to newer results when googling for answers to development questions.

[These docs](http://api.jquery.com/category/events/) has a complete list of event methods.

### Event Delegation

We already learned about _event delegation_ in native JavaScript.

**?: In your own words, what is it?**

However, _event delegation_ in jQuery is more powerful because we can specify **which descendants** we're interested in listening to by specifying a selector.

For example, if you would like to listen for clicks on all `<div>` elements with a class of `circle`, you could use jQuery to set a delegated event listener on the `<body>` as follows:

```js
$('body').on('click', 'div.circle', function() {
	// 'this' will be a <div> with a class of 'circle'
});
```

Taking advantage of _event delegation_ seems like a perfect approach for our _Remove_ buttons that are on each home. One event listener, regardless of how many homes in our table?! One event listener for all of the current rows in our table now, and for ones that we add later?! Yes, thanks to _event delegation_!

We just need to decide on which **ancestor** element to use to attached our delegated event listener to.<br>
**Let's identify the ancestor elements of our `<button>` elements**

The `<table>` element with an id of `#homes` is stable and would be a great place to attach our handler:

```js
  $('#homes').on('click', 'button', function() {
    console.log(this);
  });
```

**?: In jQuery, what's the difference about the way we attach a delegated event listener vs. a regular event listener?**

## More on DOM Manipulation<small> (10 mins)</small>

### Removing Elements

If our users click on the _Remove_ button, we obviously want to remove that home's row from the table:

```js
  $('#homes').on('click', 'button', function() {
    $(this).closest('tr').remove();
  });
```
Because we want to remove the `<tr>`, not the `<button>` represented by `this`, we can use `closest('tr')` to move up through the ancestors until the first `<tr>` element is found.

Yes, it's really that easy!

>Take a look at the `.find()` and `.children()` methods if you need to look for the nearest descendent going down the DOM instead of up the DOM like we just saw using the `closest()` method.

### Removing Elements "Gracefully"

Currently, the sudden disappearance of the home's row is a little harsh. jQuery has some nice built-in [effects](http://learn.jquery.com/effects/intro-to-effects/) to help us out:

```js
  $('#homes').on('click', 'button', function() {
    $(this).closest('tr').fadeOut(1000, function() {
      // now that the tr is hidden, let's completely remove it from the DOM
      $(this).remove();
    });
  });
```
Here, we are taking advantage of the fact that we can provide a callback function to the `fadeOut` method that will be called once the fade is complete.

That's better!

## Practice Challenge - Add New Homes


Now for a fun challenge. You've already seen everything you need to make this happen! jQuery's there for you and Google is your friend.

When the "Add Home" button is clicked:

1. Takes a home out of an array of home objects (see below)
2. Appends a row containing the data for the home to the table.

First, copy this array of new home data to your script:

```js
var newHomes = [
  {address: "27569 Cedarwood Drive", sf: "2,535", bedrooms: 3, baths: 2.5, price: "$496,500"},
  {address: "316 Annandale Drive", sf: "1,326", bedrooms: 4, baths: 2, price: "$275,000"},
  {address: "251 Grandview Road", sf: "3,800", bedrooms: 3, baths: 2, price: "$699,900"},
  {address: "28571 Manitoba", sf: "2,960", bedrooms: 4, baths: 3.5, price: "$775,000"}
];
```
### Hints:

- Don't forget that the jQuery function can create HTML by passing in a string that looks like HTML - just like we did when we added the Zillow hyperlink earlier in the lesson. This string of HTML can include everything you want to be inserted, the cells, classes, content, button, etc.
- You can use DevTools to inspect an existing row and copy its text to use as a "template" for the string used to create the new row.
- Use the home data to "fill" in the cells of newly created rows.
- It always helps to pseudocode (write the coding steps in plain, non-technical English).

### Extra Challenge

- Include a check for there being no more homes in the array to add and disable the _Add Home_ button.

### Extra Extra Challenge

- Add a button, that when clicked, restores all previously removed homes and appends them to the bottom of the table.

	Hint: Take a look at the "Removing Elements" section in [these docs](http://learn.jquery.com/using-jquery-core/manipulating-elements/).

## References

[Manipulating Elements - jQuery Learning Center](http://learn.jquery.com/using-jquery-core/manipulating-elements/)

[jQuery Learning Center](https://learn.jquery.com/)

