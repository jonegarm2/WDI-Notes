
<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

# Lab - Updating & Deleting Movies

## Intro

Okay, today in the Mongoose lesson you Created and Read documents using Mongoose.

This lab builds upon the code you wrote earlier today.  Starter code has been provided if the dog ate your lunch.

Now it's up to you to implement the Update and Delete functionality for the movies resource.

## Hints

### Update

- There are a couple of different ways to update documents using Mongoose:
	1. Use `findById`, to fetch the document.  Update the doc's properties.  Finally, call the `save` method on the document.
	2. You can fetch and update in one step using the `findOneAndUpdate` or `findByIdAndUpdate` static methods (on the model, not an instance).

- You will need to add two routes (remember to mimic Rails).

- You will need a view to edit a Movie.  Copying `new.ejs` would be a good place to start.

- Ummm, what attribute on an `<input>` element can we use to initialize its _value_? (shucks, gave it away).

- `method-override` middleware module will be necessary.  You need to install, require, and this is how you mount it for use with query strings:

	```js
	app.use(methodOverride('_method'))
	```
	
	Then you can use it in a `form`'s action like this:
	
	```js
	<form method="POST" action="/resource?_method=DELETE">
	  <button type="submit">Delete Resource</button>
	</form>
	```
	
	or this:
	
	```js
	<form method="POST" action="/comments/<%= c.id %>?_method=PUT">
	  <input name="commentText" value="<%= c.commentText %>">
	  <button type="submit">Update Comment</button>
	</form>
	```

### Delete

- Similar to updating, there are a couple of different ways to delete documents as well:
	1. Use `findById`, to fetch the document and call the `remove` method on the document.
	2. You can fetch and delete in one step using the `findOneAndRemove` or `findByIdAndRemove` static methods (on the model). 

- Adding an additional column to the table to hold an _edit_ and _delete_ link is an easy way to implement this functionality in the UI.

- How many routes are needed?

- Again, the `method-override` module will be necessary.

## Bonus

- Use a partial for the form that can be shared between the new and edit views.

- Add Bootstrap to make the app far less sucky looking.  For example, Bootstrap has some cool icons you can easily use in your _edit_ and _delete_ links.