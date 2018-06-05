
[click here to view as a presentation](https://presentations.generalassemb.ly/85fb003f3063e6d152da8a1ab51a51ab#/1)

---

# Intro To
<br>
<img src="https://i.imgur.com/cD5R8OG.png" width="900px">

---

# Learning Objectives
<br>

- Describe the use case for Mongoose

- Define a basic Schema for a single Model

- Create and Read documents using a Model

- Define default values in a Schema

- Define validations in a Schema

---

# Roadmap
<br>

1. Intro to Mongoose
1. Including Mongoose in an app
1. Defining Schemas in Mongoose
1. Built-in Types for Properties
1. Compiling Schemas into Models
1. Use a Model to Create data
1. Use a Model to Read data
1. Defining default values for a Property
1. Defining validations for a Property
1. Essential Questions

---
# Intro to Mongoose
---
## Intro to Mongoose
<br>

- What is Mongoose?

- Sneak peak of some Mongoose code

- The big picture

---
### What is Mongoose?

---
<p>Yes, this guy, but not in the context of MongoDB...</p>

<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

---
### What is Mongoose?
<br>

- Remember _ActiveRecord_?  **What is it?**

- _Mongoose_ is to MongoDB as _ActiveRecord_ is to a SQL database. However, because it maps code to Mongo's _documents_, it is referred to as an **Object Document Mapper (ODM)** instead of an ORM, but their general purpose is the same.

---
### What is Mongoose? (cont.)
<br>

- Using the Mongoose ODM is by far the most popular way to perform CRUD on a MongoDB.

- Let's check out the landing page for Mongoose and see what it has to say for itself...

	<a href="http://mongoosejs.com/index.html" target="_blank">Mongoose Homepage</a>

---
### What is Mongoose? (cont.)

- So, Mongoose's homepage says it best:

>"Mongoose provides a straight-forward, schema-based solution to model your application data"

- Wait a second, what's with this "schema" business, isn't MongoDB schema-less?  

- Well, yes it is, however, the vast majority of applications benefit when their data conforms to a defined structure (schema).

- Mongoose allows us to define schemas and ensures that documents conform.

---
### What is Mongoose? (cont.)
<br>

- Mongoose also provides lots of other useful functionality:
	- Default property values
	- Validation
	- Automatic related model population via the `populate` method
	- _Virtual properties_ - create properties like "fullName" that are not persisted in the database
	- Custom _Instance methods_ which operate on the document
	- _Static methods_ which operate on the entire collection 
	- `pre` and `post` event lifecycle hooks (Mongoose "middleware")

---
### Sneak peak of some Mongoose code
<br>

- For a preview of what Mongoose does, let's review the small amount of code shown on the Mongoose homepage...

---

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
```

<p>So, the big picture is...</p>

---
### The Big Picture 
<br>

- Here is the big picture overview of the components we'll be working with:

<img src="https://i.imgur.com/Q6A7KTQ.png" width="900">

---
### Big Picture Example 

- Assuming the following schema:

	```js
	var postSchema = new mongoose.Schema({
		content: String
	});
	```

- It can be compiled into a model and that model exported like this:

	```js
	module.exports = mongoose.model('Post', postSchema);
	```

- The model can then be required and used to perform CRUD on the `posts` collection in the MongoDB:

	```js
	var Post = require('./models/post');
	Post.create({content: 'Amazing post...'});
	```

---
## Review Question
<br>

**In your own words, describe the use case for Mongoose (what is it's purpose and when might you choose to use it?).**

---
# Including Mongoose<br>in an App
---
## Including Mongoose in an App
<br>

- Create an Express app

- Install Mongoose

- Configure Mongoose in a module

- Adding event listeners to the Mongoose connection

---
### Create an Express App
<br>

- Let's use Express Generator:

	```sh
	$ express first-mongoose -e
	```
	then
	
	```sh
	$ cd first-mongoose && npm install
	```
	
- Let's also change `app.js` to `server.js` - **what do we have to do?**

---
### Install Mongoose
<br>

- Installing the Mongoose package is straight forward:

	```sh
	$ npm i mongoose
	```
	Note: `i` is a shortcut for `install`
	
---
### Configure Mongoose in a module
<br>

- We're going to create a separate module named `database.js` and put it in a folder named `config`:

	```sh
	$ mkdir config
	$ touch config/database.js
	```

---
### Configure Mongoose in a module (cont.)

- Then in `database.js`, let's connect to a database named `movies`:

	```js
	var mongoose = require('mongoose');
	// It used to be necessary to set the mongoose library to avoid
	// warnings. Not anymore with ver. 5.x
	// mongoose.Promise = Promise;

	mongoose.connect('mongodb://localhost/movies');
	```
	
- **What happens if a database named `movies` does not exist?**

---
### Configure Mongoose in a module (cont.)
<br>

- Time to require our `database.js` module in `server.js`:

	```js
	var bodyParser = require('body-parser');
	
	// connect to the database with Mongoose
	require('./config/database');
	```

---
### Configure Mongoose in a module (cont.)
<br>

- <p>Note that we aren't assigning our module to a variable. That's because there's no need to because:</p>
	- We didn't export anything.
	- We didn't need to export anything because we will be requiring the `mongoose` module as needed and...
	- Since Mongoose is a singleton, changes and configuration on it is reflected everywhere we require it.

---
### Configure Mongoose in a module (cont.)
<br>

- <p>Time to check if our app starts up without errors:</p>
	- Ensure that the MongoDB engine is running in a separate Terminal session:<br>`$ mongod`
	- Start our app:<br>`$ node bin/www`
	- Browse to:<br>`localhost:3000`

- No errors?  Great!  However, wouldn't it be nice to know that our connection to our database was successful?  Sure it would...

---
### Adding event listeners to the Mongoose connection
<br>

- The Mongoose connection object inherits from Node's `EventEmitter` which allows us to listen to defined events.

- Let's listen to the `open` and `error` events...

---
### Adding event listeners (cont.)

- Let's modify our _database.js_ module as follows:

	```js
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/movies');
	
	// shortcut to mongoose.connection object
	var db = mongoose.connection;
	
	db.once('open', function() {
  		console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
	});
	
	db.on('error', function(err) {
  		console.error(`Database error:\n${err}`);
	});
	```

- Now check it out with both the MongoDB engine running and not running (to trigger an error).

---
## Review Questions
<br>

1. **What is the advantage of creating a `database.js` module?**

2. **What method on the Mongoose object connects to a MongoDB database?**

---
# Defining Schemas in Mongoose

---
## Defining Schemas in Mongoose
<br>

- Create a module for the Schema/Model

- Define a basic Schema for a `Movie` model

---
### Create a module for the Schema/Model

- Now that we are connected to the MongoDB engine, it's time to define our first schema.<br>**Review: Do we use schemas to perform CRUD?**

- So, where are we going to put our app's schemas and models?  In their own folder - of course!

- Just like Rails, we are inspired by the MVC design pattern:

	```sh
	$ mkdir models
	$ touch models/movie.js
	```

- It is customary to have a single file per model where we define and compile its schema.

---
### Define a basic Schema for a _Movie_ model
<br>

- In our schema/model files, we will always do this:

	```js
	var mongoose = require('mongoose');
	// shortcut to the mongoose.Schema constructor function
	var Schema = mongoose.Schema;
	```

- Creating the shortcut to the `mongoose.Schema` constructor function is optional but convenient when defining complex schemas.

- Now let's define our schema...

---
### Define a basic Schema (cont.)
<br>

- Here's our basic _Movie_ schema:

	```js
	var Schema = mongoose.Schema;
	
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: Number,
  		rating: String,
  		cast: [String]
	});
	```

- Note the `cast` property's type is an Array of Strings.

---
### Define a basic Schema (cont.)
<br>

- Vocab note:
	- A **property** may be referred to as a "**path**", or "**field**".

- **YOU DO:**
	- Add an additional path named `nowShowing` with a type of `Boolean`.

---
### Define a basic Schema (cont.)
<br>

- What we have defined is a very basic schema. Later we will see much more complex schemas.

- For now, let's take a look at the eight built-in types available...

---
## Built-in Types for Properties
<br>

- The types that we can assign to properties are known as `SchemaTypes`

- There are 8 built-in types that we can specify for our properties:
	- **String**
	- **Number**
	- **Boolean**
	- **Date**
	- **mongoose.Schema.Types.ObjectId**
	- **mongoose.Schema.Types.Buffer**
	- **Array - []** 
	- **mongoose.Schema.Types.Mixed**

---
# Compiling Schemas into Models

---
## Compiling Schemas into Models
<br>

#### **Are schemas used to perform CRUD?**

---
### Compiling Schemas into Models

- Just like we saw with ActiveRecord, CRUD is performed using a **Model**.

- Compiling a schema into a model is as easy as this:

	```js
	var Schema = mongoose.Schema;
		
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: Number,
  		rating: String,
  		cast: [String],
  		nowShowing: Boolean
	});
	
	// Compile the schema into a model and export it
	module.exports = mongoose.model('Movie', movieSchema);
	```

---
### Compiling Schemas into Models
<br>

- **There is a one-to-one mapping between Mongoose models and MongoDB collections**.

- By default, the collection will be named as the pluralized version of the model in all lower-case.

- The collection name can be overridden when compiling the model, but it's uncommon to do so.

---

# Use a Model to Create data

---
### Use a Model to Create data
<br>

- Now that we have a model, we're ready to perform some CRUD!

- First up is **creating** data.

- Like in ActiveRecord, we have two ways to create documents:
	- `new` + `save`
	- `create`

- For a treat, let's `create` a document in Node's REPL...

---
### Use a Model to Create data (cont.)
<br>

```sh
$ node
> require('./config/database')
> var Movie = require('./models/movie')
> Movie.create({
... title: 'Star Wars',
... releaseYear: 1977
... }, function(err, doc) {
... console.log(doc);
... })
```

- <p>Logged out will be a document that looks something like...</p>

---
### Use a Model to Create data (cont.)

```js
{ __v: 0,
  title: 'Star Wars',
  releaseYear: 1977,
  _id: 57ea692bab09506a97e969ba,
  cast: [] }
```

- The `__v` field is added by Mongoose to track versioning - ignore it.

- Note that although we did not supply a value for the `cast` property, it was initialized to an array - ready to have cast members pushed into it!

- Also note that we did not provide a value for `nowShowing`, so it is not in our document.

---
### Use a Model to Create data (cont.)
<br>

- That was fun. Exit the REPL and let's see how we can use<br>`new` + `save` to create movie documents - but this time from within our app.

---
### Use a Model to Create data (cont.)
<br>

- As we build out our CRUD functionality, here is the process we will repeat:
	1. Determine the verb + URI for the route.  Use RESTful convention whenever possible.
	2. Add the UI (link and/or forms) to the view that will trigger the request.
	3. Define the route in the appropriate router module for the request, mapping it to the `<controller>.<method>`.
	4. Add the controller code.

---
### Use a Model to Create data (cont.)
<br>

- For those of you missing Rails, we'll mimic the `new` action/view followed by a `create` action.

- We need a route that will take us to a `new.ejs` view. Express generator stubbed up a `users.js` route file, rename the file to `movies.js`.

- Due to the above renaming, we'll need to make a couple of changes in `server.js` - **what are they?**

---
### Use a Model to Create data (cont.)
<br>

- Inside of `routes/movies.js`, let's code our first route - responsible for showing a form for entering a movie.

- Make it RESTful:

	```js
	var express = require('express');
	var router = express.Router();
	
	// GET /movies/new
	router.get('/new', function(req, res) {
  		res.render('movies/new');
	});
	
	module.exports = router;
	```

---
### Use a Model to Create data (cont.)
<br>

- Now for the view.

- As we've discussed, organizing views for a certain model into a dedicated folder makes sense:

	```
	$ mkdir views/movies
	$ touch views/movies/new.ejs
	```
	
- Next, add the HTML boilerplate to `new.ejs`.

- The next slide has our ugly form...

---
```html
<h2>Enter a New Movie</h2>
<form action="/movies" method="post">
	<label>Title:
	  <input type="text" name="title">
	</label><br>
	<label>Release Year:
	  <input type="text" name="releaseYear">
	</label><br>
	<label>Rating
	  <select name="rating">
	    <option value="G">G</option>
	    <option value="PG">PG</option>
	    <option value="PG-13">PG-13</option>
	    <option value="R">R</option>
	  </select>
	</label><br>
	<label>Cast (separate actors with commas):
	  <input type="text" name="cast">
	</label><br>
	<label>Now Showing:
	  <input type="checkbox" name="nowShowing" checked>
	</label><br>
	<input type="submit" value="Add Movie">
</form>
```

---
### Use a Model to Create data (cont.)
<br>

- **What RESTful route should we `POST` the form to?**

- First, let's require the `movies` controller like this:

	```js
	var express = require('express');
	var router = express.Router();
	// Add movies controller
	var moviesCtrl = require('../controllers/movies');
	```
	
- **YOU DO:** Assuming the `movies` controller exports a `create` method, write the route that will invoke it!

---
### Use a Model to Create data (cont.)
<br>

- Then let's create the controller for our _movies_ resource:

	```
	$ mkdir controllers
	$ touch controllers/movies.js
	```
- In `controllers/movies.js` we're going to be using our `Movie` model, so we need to require it:

	```js
	var Movie = require('../models/movie');
	```

---
### Use a Model to Create data (cont.)
<br>

- The next slide shows how we  use Mongoose in the controller to create the movie submitted by our form.

- We'll review it as we type it...

---

```js
function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  var movie = new Movie(req.body);
  movie.save(function(err) {
    // one way to handle errors
    if (err) return res.render('movies/new');
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect('/movies/new');
  });
}
```

---
### Use a Model to Create data (cont.)
<br>

- You should now be able to submit movies - congrats!

- We'll move on to displaying the movies in a bit, but first a little refactoring practice...

---
### Practice (5 mins)

- Refactor `router.get('/new', ...` by replacing the anonymous inline function with a function exported by `controllers/movies.js`.

- Hint: The controller's `module.exports` will look something like this:

	```js
	module.exports = {
	  new: newMovie,
	  create: create
	};
	```
	Note that we can't define a function named "new", because it's a reserved word in JS.

---
# Use a Model to Read data

---
### Use a Model to Read data
<br>

- After using `new.ejs` to create some movies, we now need an `index.ejs` to view them.

- The querying ability of Mongoose is very capable.  For example:

	```js
	Movie.find({rating: 'PG'})
		.where('releaseYear').lt(1970)
		.where('cast').in('John Wayne')
		.sort('-title')
		.limit(3)
		.select('title releaseYear')
		.exec(cb);
	``` 

---
### Use a Model to Read data (cont.)

- Here are the useful methods on the model for querying data:
	- `find`: Returns an array of all documents matching the _query object_
		
		```js
		Movie.find({rating: 'PG'}, function(err, movies) {...
		```
		
	- `findById`: Find a document based on it's `_id`
	
		```js
		Movie.findById(req.params.id, function(err, movie) {...
		```

	- `findOne`: Find the first document that matches the _query object_

		```js
		Movie.findOne({releaseYear: 2000}, function(err, movie) {...
		```

---
### Reading Data - Practice (15 min)
<br>

- **How can we find all movies documents?**

- Time for some practice!

- Write the RESTful route, write the controller code, and create an _index.ejs_ to display all of the movie documents in a HTML table.

- Hint: You can use an array's `join` method to concatenate the names in the _cast_ array in the view.

- We'll review in 15 minutes.

---
# Defining default values for a Property

---
## Defining default values for a Property
<br>

- Modifying the schema to add a simple default value

- Using a function to provide a default value

---
### Modifying the schema to add a simple default value

- To add a default value, we need to switch from this simple property definition syntax:

	```js
	var movieSchema = new Schema({
		title: String,
		releaseYear: Number,
  		...
	```

- To this object syntax:

	```js
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: {type: Number},
  		...
	```

---
### Modifying the schema to add a simple default value (cont.)

- Now we can add a `default` key to specify a default value:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {type: Number, default: 2000},
	  rating: String,
	  cast: [String],
	  nowShowing: {type: Boolean, default: true}
	});
	```

- Silly example defaulting the release year to 2000 - yes. But that's how we can add a simple default value.

- FYI, defaults for array types will not work - they require the use of Mongoose middleware.

---
### Modifying the schema to add a simple default value (cont.)

- Test it out and we'll see that it doesn't work because simply providing a key for `releaseYear` prevents the default from being assigned.

- We can fix this by deleting any key on `req.body` that is an empty string:

	```js
	if (req.body.cast) req.body.cast = req.body.cast.split(',');
  	// remove empty properties
  	for (var key in req.body) {
   		if (req.body[key] === '') delete req.body[key];
  	}
	```

- Now if we fail to enter a release year, the default will be set.

---
### Using a function to provide a default value
<br>

- You've seen how to add a simple default value, but we can also provide a function definition.

- The property's default would then be set to the value returned by the function!

---
### Using a function to provide a default value (cont.)

- For example, we can take our silly default for _releaseYear_ and make it just as silly like this:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {
  		 type: Number,
  		 default: function() {
  			return new Date().getFullYear();
  		 }
	  },
	  rating: String,
	  cast: [String],
	  nowShowing: {type: Boolean, default: true}
	});
	```

>Of course, a named function could also be used.

---
### Timestamps in Mongoose

- Mongoose will add `createdAt` and add/update `updatedAt` fields if we set the `timestamps` option as follows in the schema:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {
  		 type: Number,
  		 default: function() {
  			return new Date().getFullYear();
  		 }
	  },
	  ...
	}, {
	  timestamps: true
	});
	```

---
# Defining Validations for a Property

---
### Defining validations for a Property
<br>

- Remember validations in Rails?  We can do the same thing in our Mongoose schemas.

- There are several built-in validators we can use.

- However, endless flexibility is possible with custom asynchronous and synchronous validator functions and/or Mongoose middleware.

- We'll keep it simple :)

---
### Defining validations for a Property (cont.)
<br>

- First up will be the Mongoose equivalent of ActiveRecord's _presence: true_.  Let's make `title` required:

	```js
	var movieSchema = new mongoose.Schema({
	  title: {
	    type: String,
	    required: true
	  },
	...
	```
- Now, if we try saving a movie without a `title` an error will be set.

---
### Defining validations for a Property (cont.)
<br>

- For fields that are of type _Number_, we can specify<br>a `min` and `max`:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	  releaseYear: {
	    type: Number,
	    default: function() {
	      return new Date().getFullYear();
	    },
	    min: 1927
	  },
	  ...
	```

- No more silent movies!

---
### Defining validations for a Property (cont.)
	
- For fields that are of type _String_, we have:
	- **`enum`**: String must be in the provided list
	- **`match`**: String must match the provided regular expression
	- **`maxlength`** and **`minlength`**: Take a guess :)

- Here is how we use the `enum` validator:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	  rating: {
	    type: String,
	    enum: ['G', 'PG', 'PG-13', 'R']
	  },
	  ...
	```

---
# Essential Questions
<br>

<p>Take a couple of minutes to review before you get picked</p>

- In your own words, describe the use case for Mongoose.

- True or false:  A document's structure is defined in a Mongoose model.

- What line of code would compile a `drinkSchema` into a model named `Drink`?

- What do we need to export from the module that contains the schema definition and the compiled model?

---

# References
<br>

- [Official MongooseJS Documentation](http://mongoosejs.com/)


