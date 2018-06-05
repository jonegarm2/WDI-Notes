This presentation can be viewed here:<br>[https://presentations.generalassemb.ly/c595e0c707dc5429ba9e#/1](https://presentations.generalassemb.ly/c595e0c707dc5429ba9e#/1)

---

![](https://i.imgur.com/vUOu9NW.jpg)
<br>
# Intro to the<br>Express Framework<br>for Node

---

## Learning Objectives

- Create a Basic App From Scratch With the Express Framework

- Configure an Express Application's Settings

- Render Views

- `require` and Mount (`use`) Middleware

- Describe the Request/Response Cycle in an Express App

- Use the Express Generator to Scaffold a Skeleton App

- Create and Mount Express Routes

---
## Roadmap
<br>

- Intro to Express
- Setup our App
- Express "Hello World"
- Basic Structure of an Express App
- Our First Route
- The Route's Callback Function
- Define a Simple Route (Practice)
- Request Parameters
- Query String Values

continued on next slide...

---
## Roadmap (cont.)
<br>

- Ways to Respond to a Request
- Rendering Views
- Passing Data to a View / Todos App
- Express Middleware
- The Request/Response Cycle in Express
- Adding Our Own Middleware
- Modules (Practice)
- Express Generator
- Bonus: Best Practice Routing

---
### Express Framework - Intro
<br>

- Express is the most popular web framework for Node.js.

- It is minimalistic and lightweight, especially when compared to a massive framework such as Rails.

- Express uses Node's built-in HTTP server, but extends its capability by giving us the ability to:
	- Define Routes
	- Add functionality with third-party Middleware
	- Define our own Custom Middleware
	- Use View Engines to Render Views

---
### Setup our App
<br>

- Create a folder and cd into it:

	```sh
	$ mkdir first-express
	$ cd first-express
	```
	
- Create our `package.json`. Accept the defaults, **except** for the **entry point** - set this to be "**server.js**":

	```sh
	$ npm init
	```

- `code .`


---
### Install the Express Module
<br>

- Use `npm` to install the Express module in this project:

	```sh
	$ npm install express --save
	```
	
- The `--save` option makes an entry in the dependency section of our `package.json` file (since npm v. 5, `--save` is optional).

- Create a `server.js` to put our web app's main code in:

	```sh
	$ touch server.js
	```

---
### Express - Hello World!

- To test our setup, let's make our app return "Hello World!" when we browse to `localhost:3000`.  In `server.js`:

	```js
	// Load express
	var express = require('express');
	
	// Create our express app
	var app = express();
	
	// Define a root route directly on app
	// Later, we will use the router object
	app.get('/', function(req, res) {
	  res.send('<h1>Hello World!</h1>');
	});
	
	// Tell the app to listen on port 3000
	app.listen(3000, function() {
	  console.log('Listening on port 3000');
	});
	```

---
### Express - Hello World! (cont.)
<br>

- Run the app:

	```sh
	$ node server
	```
	
- Browsing to `localhost:3000` will hit our app's root route that we defined and return "Hello World!".


---
### Basic Structure of Express App

- Here is a helpful outline of what we need to do in our main Express app file - let's put this guide right in our `server.js`:

	```js
	// Require modules
	var express = require('express');
	
	// Create the Express app
	var app = express();
	
	// Configure the app (app.set)
	
	
	// Mount middleware (app.use)
	
	
	// require and mount (app.use) routes

	
	// Tell the app to listen on port 3000
	app.listen(3000, function() {
	  console.log('Listening on port 3000');
	});
	```

---
### Update Our First Route

- Now let's update our route to return "Hello Express" instead of "Hello World":

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- If you refresh the page, you'll see that it still says "Hello World!" - what's up?  Well, unlike with Rails, Node does not automatically restart the server for us when we make changes to our code.

- Of course there are utilities to perform the restart for us, but until we install one later this week, get used to stopping the server with `control-c` and restarting it.

---
### Our First Route (cont.)
<br>

- Looking at our first route in our editor, note that we are defining a route using the `get` method on the Express `app` object. Later, we will learn a preferred way of defining routes using the Express `Router` object, but you need to be aware of defining routes this way because you will see it quite often.

- Besides the `get` method, there are other methods such as `post`, `put` and `delete`, that map to the other HTTP verbs.

---
### Our First Route (cont.)
<br>

- In the case of our first route, we have specified a HTTP method of `get` and a path of `/`.

- Only HTTP **get** requests matching a path of `/` (root path) will invoke the callback function.

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

---
### The Route's Callback
<br>

- Again, looking at our first route:

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- The route's callback function will be executed if a matching HTTP request (HTTP Verb + Path) comes along.

---
### The Route's Callback
<br>

- As usual, instead of an anonymous function for the callback, we can always use a named function if we wish:

	```js
	app.get('/', handleRoot);
	
	function handleRoot(req, res) {
		res.send('<h1>Hello Express</h1>');
	}
	```

---
### The Route's Callback (cont.)
<br>

- The route's callback function defines two parameters, the first representing the [request](http://expressjs.com/api.html#req) object, the second the [response](http://expressjs.com/api.html#res) object:

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- These two arguments are automatically provided to the callback by Express.
  - The `request` object has properties and methods pertaining to the HTTP request and we use the `response` object primarily to send back our app's response to the request.

---
### The Route's Callback (cont.)
<br>

- Because they are just parameter names, you can change them. For example, feel free to use `request` for `req` and `response` for `res`:

	```js
	app.get('/', function(request, response) {
	  response.send('<h1>Hello Express</h1>');
	});
	```

---
### Practice (3 mins)<br>Define a Simple Route
<br>

- Define another route that matches a `get` request to a path of `/goodbye` that sends a text response of "Goodbye World".

- Don't forget to restart the server and test your new route by browsing to `localhost:3000/goodbye`.

---
### Question - Basic Routing
<br>

- **Is it okay to define more than one route on the same path?<br>For example:**

	```js
	app.get('/cars', function(req, res) {
  		res.send("Here's a list of my cars...");
	});
	
	app.post('/cars', function(req, res) {
  		res.send('Thanks for the new car!');
	});
	```

---
### Request Parameters
<br>

- Remember the `params` hash in Rails? Well, the _request_ object in Express has a `params` object.

- However, it **only** contains the parameters contained in _named routes_:

- Let's add another route:

	```js
	app.get('/goodbye/:name', function(req, res) {
  		res.send('Goodbye ' + req.params.name);
	});
	```

---
### Request Parameters
<br>

- Restart and check it out:

	```sh
	localhost:3000/goodbye/PeeWee
	```

- **For what purpose did we commonly use _named parameters_ in routes in Rails?**

- Now, instead of using `params[:id]` like you did in Rails, you'll use `req.params.id` in an Express app.

---
### Query String Values
<br>

- Who remembers **what a `query string` is?**

- In Express, we can access them in our route handlers using the `query` object attached to the _request_ object. Let's modify our root route to try this out:

	```js
	app.get('/', function(req, res) {
		var msg = req.query.msg ? req.query.msg : '!';
  		res.send('<h1>Hello Express ' + msg + '</h1>' );
	});	
	```

- **What can we type in the address bar to test this out?**

---
### Body Data in the Request
<br>

- Later you'll see that data being sent in the HTTP request's body, for example, the data being posted from a form, will be accessed via `req.body` thanks to the `body-parser` middleware (more on this later). 

- In summary, **how is accessing _named parameters_ in routes, _query string_ key/value pairs, and _data in the body_ different in Express than what we saw in Rails?**

---
### Ways to Respond to a Request

- So far we have responded in our route handler (callback) code by using the `send` method on the _res_ (response) object.

- Here is a list of other methods that can be used to terminate the request/response cycle:
  
  - `res.redirect()` -	Redirect a request
  - `res.render()` - Render a view template
  - `res.json()` - Send a JSON response
  - `res.jsonp()` - Send a JSON response with JSONP support
  - `res.send()` - Send a response of various types
  - `res.sendFile()` - Send a file as an octet stream

- The most commonly used are the first three.

---
### Ways to Respond to a Request (cont.)
<br>

- Let's change our `/goodbye` route to return `json` instead of plain text:

	```js
	app.get('/goodbye', function(req, res) {
  		res.json( {msg: 'Goodbye World'} );
	});
	```

- Try it out!

---
### Rendering Views

- We can use the `render` method on the _response_ object to render templates.

- Express can work with a multitude of _view engines_.

- [`Pug`](https://pugjs.org/api/getting-started.html) (formerly `Jade`) is a template language that leverages indentation to create HTML with a "shorthand" syntax.

- When we scaffold an app using the _Express Generator_ (more on this later), Pug is the default because it is written by the same fine people that brought us the Express framework.

- [`EJS`](https://www.npmjs.com/package/ejs) (embedded JavaScript) templates look and work very much like **ERB** templates - that looks better!

---
### Rendering Views (cont.)

- To try out views in Express, let's say we decided to render a `home` view for the root route.

- Like in Rails, it's common to organize views inside of a separate folder. However, unlike Rails, we can call it and put it anywhere we want within our project. Rails' conventions are pretty genius though:

	```sh
	$ mkdir views
	$ touch views/home.ejs
	```

- `ejs` is the file extension for the EJS view engine.

- Note that we don't use a `.html.` before the file extension like we did in Rails.

---
### Rendering Views (cont.)
<br>

- We're not going to go into depth on EJS templates in this lesson. In fact, because single-page applications rely mostly on client-side rendering, server-side view engines are not used as often as they used to be. Besides - you already know ERB and EJS is almost the same.

- One disadvantage of EJS is that is does not have layout templates by default. However, it does have partials. To learn more, there's a link in the References section regarding EJS templating.

---
### Rendering Views (cont.)

- If your editor does not recognize EJS templates by default, you may need to install an extension/plug-in.

- VS Code includes Emmet and EJS support, so you will be able to type `!` and press tab to generate the HTML boilerplate in `home.ejs`:

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
  		<meta charset="UTF-8">
  		<title>Document</title>
	</head>
	<body>
	</body>
	</html>
	```

---
### Rendering Views (cont.)
<br>

- Add an `<h1>` inside the `<body>` so that we see something :)

	```html
	<body>
  		<h1>Home Page</h1>
	</body>
	```

---
### Rendering Views (cont.)
<br>

- Okay, now let's modify our callback in our root route to render our new `home.ejs` template:

	```js
	app.get('/', function(req, res) {
  		res.render('home');
	});
	```

- Just the file name, not the `ejs` extension.

- Restart, browse, why didn't it work?...

---
### Rendering Views (cont.)

- First off, we'll notice that Express' error messages aren't as "pretty" as those in Rails. Remember, Express is "lightweight".

- Express' errors sometimes won't be as helpful as in Rails either, but this one, _Error: No default engine was specified..._, makes it clear that we need to specify a view engine.

- This is our first opportunity to configure our app:

	```js
	// Configure the app (app.set)
	app.set('view engine', 'ejs');
	```
- The `set` method on the Express `app` object is used to configure the app's settings...

---
### Rendering Views (cont.)
<br>

- We also need to tell Express **where** are views can be found:

	```js
	// Configure the app (app.set)
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, 'views'));
	```

- Don't be intimidated by this code:<br>`path.join(__dirname, 'views')`...

---
### Rendering Views (cont.)
<br>

- `path.join` is just a method that builds a properly formatted path from segment strings passed to it. `__dirname` is always available and represents the path of the current folder where the currently running code lives; and `views` is the name of the folder we created to hold our views.

- `path` is a core Node module, but it still must be required before we can use it...

---
### Rendering Views (cont.)
<br>

- Core Node modules don't have to be installed with `npm install`, but we do have to `require` them:

	```js
	// Require modules
	var express = require('express');
	var path = require('path');
	```

- Restart and let's see what the next error is...

---
### Rendering Views (cont.)
<br>

- _Error: Cannot find module 'ejs'_ - this error is telling us that we need to install the EJS view engine package:

	```sh
	$ npm i ejs -S
	```
	
- The `i` is a short for `install` and `-S` is short for `--save`.

- We don't need to `require` the view engine - Express knows how to find it.

- Restart and bam!

---
### Passing Data to a View
<br>

- View engines are used to dynamically render views, usually incorporating provided data, on the server before sending it to the client.

- We just used the `render` method, passing in the view name as an argument.

- We can also pass in a JavaScript object as a second argument, and all of it's properties will be available for use directly in the view within `ejs` tags!

---
### Passing Data to a View (cont.)
<br>

- Let's add a route to display a list of To Do's (still in **server.js**):

	```js
	var todos = [
	  {todo: 'Feed dogs', done: true},
	  {todo: 'Learn Express', done: false},
	  {todo: 'Have fun', done: true}
	];
	
	app.get('/todos', function(req, res) {
	  res.render('todos/index', {
	  	todos: todos
	  });
	});
	```
	
	
- Note the JS object provided as the second argument.

---
### Passing Data to a View (cont.)
<br>

- Note that we are putting the array of _todos_ within **server.js**, this would not be a great practice.

- **What would be a better approach?**

- Don't worry, you'll get a chance to refactor soon enough...

---
### Passing Data to a View (cont.)
<br>

- Based on the path of `todos/index`, we will have to create a folder inside of our views folder named `todos` and add a filed named `index.ejs` to it:

	```sh
	$ mkdir views/todos
	$ touch views/todos/index.ejs
	```

---
### Passing Data to a View (cont.)

- Now let's code our `todos/index.ejs`. Start by copying over the HTML from `home.ejs` and fix it up to look like this:

	```html
	<body>
	  <h2>Todos</h2>
	  <ul>
	    <% todos.forEach(function(t) { %>
	      <li>
	      <%= t.todo %>
	       - 
	      <%= t.done ? 'done' : 'not done' %>
	      </li>
	    <% }); %>
	  </ul>
	</body>
	```

---
### Passing Data to a View (cont.)
<br>

- This template syntax should look very familiar to you. Lovers of Squids - rejoice!

- Restart and browse to `localhost:3000/todos` - not bad :)

---

### Passing Data to a View (cont.)
<br>

- If you have data that you want available to **all** views, the Express `app` object has a `locals` object on it that you can add properties to.

- Let's see how we can use `locals` to provide our app's `title`. In `server.js`:

	```js
	app.set('views', path.join(__dirname, 'views'));
	// new code below
	app.locals.title = 'First Express';
	```

---

### Passing Data to a View (cont.)
<br>

- Then in both `home.ejs` and `index.ejs`, update the `<title>` element in the `<head>`:

	```html
	<meta charset="UTF-8">
  	<title><%= title %></title>
	```
	Restart and check out the browser tab!

---

### Add a Todo
<br>

- To demonstrate how we can add a todo (albeit, not persisted in the case of a server restart), let's add a `<form>` element to `index.ejs` below the `</ul>` tag:

	```html
	...
	  </ul>
		
	  <form action="/todos" method="POST">
	    <input type="text" name="newTodo">
	    <input type="submit" value="Add Todo">
	  </form>
	```

- Wait...!

---
### Add a Todo (cont.)
<br>

- **Don't restart** the server and refresh the page. Why did the newly updated view appear without restarting? Well, view templates are processed during each request, so the server always sees the current version of views.

- Now we need to create a route to handle the request that's going to be sent by submitting the form. **What's will this new route's HTTP verb and URI be?**

---
### Add a Todo (cont.)
<br>

- Let's stub it up like so:
	
	```js
	app.post('/todos', function(req, res) {
		res.render('todos/index');
	});
	```
	
- Now, restart, click the "Add Todo" button and we'll get an error. **Why?  What did we forget?**

---
### Add a Todo (cont.)
<br>

- Yup, we forgot to pass the array of _todos_ within an object to the `render` method.

- This will fix it:
	
	```js
	app.post('/todos', function(req, res) {
		res.render('todos/index', { todos });
	});
	```
	
- Note the use of **ES2015 Shorthand Properties**. They look weird at first, but you'll get used to them.

---

### Add a Todo (cont.)
<br>

- Let's submit a new Todo and check DevTools' Network tab to see what the request looks like...

- Checking the `Content-Type` of the Request Headers will show that by default, an HTML `<form>`'s data is submitted to the server in the HTTP request body in a format known as `application/x-www-form-urlencoded`.

- This form data does not come in on the `params` object like it does in Rails, it comes in on the _request_'s `body` object...

---

### Add a Todo (cont.)
<br>

- Let's try logging it out first:

	```js
	app.post('/todos', function(req, res) {
	  console.log(req.body.newTodo);
	  res.render('todos/index', { todos });
	});
	```

- Restart and submit a new todo.

- Damn! What now...

---

### Add a Todo (cont.)
<br>

- Unlike the `req.params` and `req.query` objects that we saw earlier, Express by default does not parse the body for data by default.

- This is due to Express's minimalistic approach. It does not provide much functionality by default - we get to pick and choose what we want our app to spend time doing!

- The solution is **middleware**.

---

### Express Middleware Detour

- Each request in an Express app is essentially processed by a series of middleware functions.

- Even our route definitions are handled by Express's middleware stack - it just so happens they ended the request by calling `res.render`, `res.json`, `res.redirect`, etc.

- We'll come back to adding a todo in a bit, but let's first take a closer look at middleware and the request/response cycle in Express.

---

### Express Middleware
<br>

- Middleware are functions that execute on each request made to the server.

- You can have any number of middleware that will process the request one by one in the order they were _mounted_ with `app.use()`.

---

### Express Middleware (cont.)
<br>

- Middleware can be used to, log info, compile css, do authentication, make changes to the req/res object, end the request-response cycle, etc.

- Once a piece of middleware has done its job, it either calls `next()` to pass control to the next middleware in the pipeline **or** ends the request as we've been doing with the `render` method.

---

### The Request/Response Cycle in Express
<br>

<img src="https://i.imgur.com/HMRyxyl.png" width="900">

---

### Adding our own Middleware

- Just to demonstrate, let's write and mount a simple middleware to log out the `user-agent` of each request:

	```js
	// Use middleware (app.use)
	// Be sure to mount before routes
	app.use(function(req, res, next) {
	  console.log(req.headers['user-agent']);
	  next();
	});
	```

- Note that we must call the `next` function that is passed in after the middleware has accomplished its task  - otherwise our app stops dead in it's tracks!

- Restart, refresh - neato!

---

### Common Express 4.0 Middleware

- __morgan__: Logger that logs requests.

- __body-parser__: Parses the body so that you can access data being sent in the request body with the `req.body` object.

- __cookie-parser__: Populates the `cookies` object on the _request_ object so that you can access data in cookies. For example, `req.cookies.name`. _cookie-parser_ is middleware which deals with the incoming _request_. To __set__ a cookie, you would use the `cookie` object on the _response_ object.

- __serve-favicon__: Serves the favicon from route _/favicon.ico_.

---

### Middleware
<br>

- Based upon the last slide, it should be clear that we need to mount the **body-parser** middleware. But let's take a look at [Express's docs pertaining to middleware](http://expressjs.com/guide/using-middleware.html).

- Let's look at the section entitled **Built-in middleware**.  Interestingly, since version 4.x, Express no longer includes it's own middleware (with the exception of `express.static`).  Instead, Express expects its developers to choose from the numerous modules available to install.

---

### Middleware (cont.)

- Before we install **body-parser**, let's mount Express' `express.static` middleware so that when the client requests any static assets, such as CSS, JavaScript, image or HTML files, it will immediately find and send the requested asset to the client:

	```js
	app.use(express.static(path.join(__dirname, 'public')));
	```

- That's all there is to it! Now, all we have to do is put our static assets into a folder named `public` and the middleware will return the asset when it is requested by the browser.

- Let's check this out...

---

### Middleware (cont.)
<br>

- Let's create a `public` folder and a `about.html` file inside of it:

	```sh
	$ mkdir public
	$ touch public/about.html
	$ echo "<h1>About Page</h1>" > public/about.html
	```

- Restart the server and browse to `localhost:3000/about.html` to test it out.

- Note that we do not include "public" when specifying the path to the resource.

---

### Add a Todo (cont.)

- Okay, let's get back to adding new todos! Here is the [link to the middleware officially supported by the Express team](https://github.com/senchalabs/connect?_ga=1.31418111.1784656250.1446759094#middleware).

- `body-parser` just happens to be at the top of the list :)

- First we need to install it:

	```sh
	$ npm install body-parser --save
	```
	
- Next we need to `require` it:

	```js
	var path = require('path');
	// new code below
	var bodyParser = require('body-parser');
	```

---

### Add a Todo (cont.)
<br>

- Let's mount the `body-parser` middleware to process both _application/json_ and _application/x-www-form-urlencoded_ data in the body:

	```js
	app.use(express.static(path.join(__dirname, 'public')));
	// new code below
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	```

- Note that `bodyParser` has methods on it that we need to invoke. This is just the way this middleware is designed to work

---

### Add a Todo (cont.)
<br>

- With the middleware installed and mounted, we can now use the `body` object on the _request_ to access the new Todo being submitted and add it to the `todos` array:

	```js
	app.post('/todos', function(req, res) {
	  todos.push({
	    todo: req.body.newTodo,
	    done: false
	  });
	  res.render('todos/index', { todos });
	});
	```
	
- Restart - sweeeeet!

---

### Practice (5 mins) - Modules

- To get a little more practice using modules, let's refactor our code a bit.

- Instead of using an **array literal** in `server.js`, let's return the array of _todos_ from a module!

- Let's create a module named `todos.js` inside of a folder named `data`.

- When you are done, this is how the line of code in `server.js` should look:

	```js
	var todos = require('./data/todos');
	```

---

## <span style="text-transform:lowercase">express-generator</span>

---

### <span style="text-transform:lowercase">express-generator</span>
<br>

- Okay, so we've had big fun getting an Express app up and running from scratch.

- We've included some basic routes and even mounted some common and custom middleware!

- In this part of the lesson we'll take a look at how a tool, `express-generator`, structures an Express app and mounts key middleware by default.

- Think of `express-generator` as a **very** lightweight `rails new...`
 
---

### <span style="text-transform:lowercase">express-generator</span> (cont.)
<br>

- `express-generator` is a command line tool that quickly generates a skeleton Node app that incorporates the Express framework.

- Let's install it:

	```sh
	$ npm install express-generator -g
	```

- `express-generator` has a CLI that we want to be able to run from any project, that's why we install it using the global `-g` flag.

---

### <span style="text-transform:lowercase">express-generator</span> (cont.)
<br>

Let's take a look at the options available to us:

```sh
$ express -h
```
<br>

```sh
  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to pug)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)
    -f, --force         force on non-empty directory
```    
---

### Generating Our App's Skeleton with<br><span style="text-transform:lowercase">express-generator</span>
<br>

- We are going to generate a new app, so let's cd up and out of our `first-express` app.

- We will use the `-e` option to use the __ejs__ template engine instead of __pug__.

- From your new app's parent directory (just like `rails new...`)

	```sh
	$ express -e second-express
	$ cd second-express
	```

---

### Folder Structure

- Our scaffolded folder structure will look like this:

	```sh
	├── app.js
	├── bin
	│   └── www
	├── package.json
	├── public
	│   ├── images
	│   ├── javascripts
	│   └── stylesheets
	│       └── style.css
	├── routes
	│   ├── index.js
	│   └── users.js
	└── views
	    ├── error.js
	    └── index.js
	```

- Let's explore the above structure in our text editor...

---

### Install Dependencies
<br>

- A quick look at the `package.json` file reveals the default modules Express has set up.

- These modules are not installed in the `node_modules` folder by default.

- As we saw earlier, `$ npm install` without specifying a package name will install the modules listed in `package.json` into the `node_modules` folder.

---

### Starting the Application
<br>

- Starting a generated Express app properly is slightly different than what we've seen.

- Type `npm start`. This will execute the start script specified in *package.json*.

- `npm start`, then browse to `localhost:3000`.

---

### <span style="text-transform:lowercase">bin/www</span> - WTF?

- What's with this `./bin/www` file? Well, the Express team decided to partition out the HTTP server related code out of `app.js` to remove code that's not really key to our app.

- Take a look at how the Express app in `app.js` exports itself and how it is required inside `www` (no file extension - weird, but true).

- Normally, we don't need to make many changes inside of `www`. We will mess with it a bit when we look at doing a realtime app, but for now, we are just going to change our app's file name...

---

### Renaming <span style="text-transform:lowercase">app.js</span>
<br>

- In MERN/MEAN Stack apps, Angular's main module is often named `app.js` and this could get confusing having two `app.js` files. This is why many developers name their main Express file `server.js`.

- So let's rename it...

---

### Renaming <span style="text-transform:lowercase">app.js</span>
<br>

- First, rename `app.js` to `server.js`.

- Then, inside of `www`, change line 7 from:

	```js
	var app = require('../app');
	```
	
	to:
	
	```js
	var app = require('../server');
	```

- That's it! Restart and test.

---

## Bonus: Best Practice Routing

---
### Best Practice Routing - The Express <em>Router</em> Object

- It's been a long day, but if you're still looking for more, feel free to continue this presentation to learn about best practice routing...

- If not, don't worry, we will cover routing in more detail in the coming days.

---

### The Express <em>Router</em> Object
<br>

- There are several ways to set up [routing in an Express](http://expressjs.com/guide/routing.html) app.

- In our `first-express` app, we used Express' `app.get` and `app.post` methods to mount our routes.

- Express also provides a `Router` "factory" function that creates instances of "routers".

- The router objects can then be used to provide more flexible and powerful routing.

---

### The Express <em>Router</em> Object (cont.)
<br>

- As a model example of using this better approach, let's look at how the `express-generator` sets up its routing.

- First, there's a `routes` folder containing **_____________?**

- Next, those route modules are required on lines 8 & 9 of `server.js`.

- Let's take a look at what those modules export...

---

### The Express <em>Router</em> Object (cont.)

- Yes, those modules export instances of Express' `Router` object after they have had their specific routes defined with `get` methods, just like we did with `app.get()`.

- Lastly, the routers are mounted in the middleware stack with the `app.use` method in lines 25 & 26 like this:

	  ```js
		app.use('/', routes);
		app.use('/users', users);
	  ```
- **Developer Reasoning:  What do you suppose the Express router object _really_ is? Discuss with your pair for a minute.**

---

### The Express <em>Router</em> Object (cont.)
<br>

- <p>It's important to understand that the path specified in the `app.use` is **combined** with the path specified on the router objects...</p>

---

<p style="margin-top:-150px"></p>
### The Express <em>Router</em> Object (cont.)

<img src="https://i.imgur.com/My1rH4m.png" width="900">

---

### Pledge to Use RESTful Routes
<br>

- Although MEAN/MERN Stack apps have very little convention, pledge that you will define RESTful routes *whenever possible*.

- Thank you!

---

### Practice (10 mins)<br>Router Refactor

<p style="text-align:left">Let's refactor our <em>first-express</em> application to use the <em>Router</em> object as modeled by the app generated using <em>express-generator:</em></p>

1. Modularize with a module. Create a `routes` folder and name module `index`. 
	
2. Export an instance of `Router`
	
3. Mount the router instance using `app.use` with a path of `/`.

<p style="text-align:left">continued...</p>

---

### Practice (10 mins)<br>Router Refactor (cont.)
<br>

<p style="text-align:left">If you haven't already, put the <em>todos</em> related routes in it's own module.</p>

<p style="text-align:left"><strong>Bonus</strong>: Get the <em>router.post</em> route to work! Hint: You can require a module wherever you need access to it!</p>

---
## Essential Questions
<br>

Review briefly, then on with the picker:

- **What method do we call to render a view and on what object does that method exist?**
- **In an Express app, the request passes through a "stack" of __________.**
- **What function signature does a middleware function have? (what arguments are there and what do they represent)**
- **What method do we call to mount middleware?**
- **Does it matter what order middleware is mounted?**
- **How are functions that handle routes different from middleware?**

---
## References
<br>

<p style="text-align:left"><em>Note: When searching for info on the Express framework, be sure that you search for the info for version 4 only - there were significant changes made from earlier versions.</em></p>

- [Express](http://expressjs.com/)

- [Use EJS to Template Your Node Application](https://scotch.io/tutorials/use-ejs-to-template-your-node-application)
