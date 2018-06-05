[click to view as a presentation](https://presentations.generalassemb.ly/84f0b589e03909f33106e14b9bf00a97#/1)

---
# Producing an API in Express

<img src="https://i.imgur.com/5B1lPHz.jpg" height="500">

---
# Learning Objectives
<br>

- Know the use case for adding an API to apps

- Create name-spaced routes dedicated to an API

- Respond to API requests with JSON and appropriate status codes

---
# Roadmap
<br>

- Why expose API access to an app?
- Views not required
- Postman
- We need an Express app
- Install Mongoose and connect to a DB
- Model?  Puppies, of course!
- API RESTful routes
- Proper response codes
- Set up the routes for the API
- Responding with JSON and a Status Code
- CORS
- Essential Questions

---
### Why expose API access to an app?
<br>

- Earlier we made request to third-party API endpoints. Now it's our turn to expose our own endpoints.

- Exposing an API in our own app enables:
	- Development of single-page applications (no full-page refreshes).
	- Our app's RESTful resources and functionality to be accessed by multiple front-ends (web, mobile and desktop).

---
### Views not required
<br>

- Our app's API routes will return JSON, not HTML views.

- This being the case, views do not apply when developing an API.

- However, your web app may continue to work using views as we've been doing, even after we expose an API.  They are not mutually exclusive.

---
### Postman
<br>

- In this lesson we'll be using a Chrome extension called Postman.

- Postman enables us to make any type of HTTP request, including sending along a data payload.

- Install it in Chrome by browsing to `chrome://extensions` and clicking the _Get more extensions_ link at the bottom.

- Search for and install **Postman**. 

---
### We need an Express app
<br>

- I bet you don't need me to show you how to create an Express app anymore.

- Create one named `puppies-api`

---
### Install Mongoose and connect to a DB
<br>

- Again, you're on your own (you and your classmates that is).

- Install **Mongoose** and connect to a database named `puppies`.

---
### Model?  Puppy, of course!
<br>

- You're on a roll so keep on rolling!

- Create a schema/model called `Puppy` with the following paths:
	- **name**: String / required
	- **breed**: String / default to "Mixed"
	- **age**: Number / default to 0

- When ready, we'll test in Node's REPL.

---
### API RESTful routes
<br>

- Setting up our API's routes will be very similar to how we've set up non-API routes.

- However, it's a best practice to "namespace" API related routes & code from our app's non-API code.

- Let's start by renaming the generated _routes/users.js_ file to _routes/api.js_.  We'll use this file to hold the routes for our API.

- Make the necessary changes in _server.js_. If done correctly, requests will have to be made as follows...

---
### API RESTful routes (cont.)
<br>

- <p>These are the RESTful routes we need to implement:</p>

<img src="https://i.imgur.com/Y9n4SPT.png" width="900">

---
### Proper response codes

- Virtually all web APIs respond with JSON.

- However, well designed APIs also set the _status code_ of the HTTP response appropriately as depicted in this graphic:

<img src="https://i.imgur.com/TbZcD8Z.png" width="900">

---

- <p>Here's a more complete list of status codes:</p>

<img src="https://i.imgur.com/tze2uod.jpg" width="900">

---
### Set up the routes for the API
<br>

- Assuming we are going to require the following controller within _routes/api.js_<br>

	```js
	var puppiesCtrl = require('../controllers/api/puppies');
	```
	
	Let's create the routes for these actions:
	- `puppiesCtrl.getAllPuppies`
	- `puppiesCtrl.getOnePuppy`
	- `puppiesCtrl.createPuppy`
	- `puppiesCtrl.updatePuppy`
	- `puppiesCtrl.deletePuppy`
	
---
### Responding with JSON and a Status Code
<br>

- We will be sending JSON and a Status Code with every request to our API.

- This is how we can do it:

	```js
	function getAllPuppies(req, res) {
		Puppy.find({}, function(err, puppies) {
			res.status(200).json(puppies);
		});
	}
	```
- Notice how we chained on to the `status` method.

---
### Responding with JSON and a Status Code (cont.)
<br>

- First, create and require the controller module.

- Create the route in _routes/api/puppies.js_ for retrieving all puppies.

- Code the `getAllPuppies` route handler code in the controller.

- When you're done, we'll use Postman to test out our first API route!

---
### Responding with JSON and a Status Code (cont.)
<br>

- Now, let's build out the other 5 routes.

- Let's write the `createPuppy` route next because we need puppies!

- We'll use Postman to test the routes as we go - be sure to double-quote all JSON keys in the data payload (body) because Postman is strict.

---
### Congrats on exposing an API for your app!

- Although we have built-out an API for a RESTful resource, be aware that an API can also provide functionality such as logging in/out.

- Tomorrow, you'll see how to make requests from within a webpage using AJAX; as well as render the JSON response using client-side rendering.

---
### CORS
<br>

- Browsers have a security mechanism that prevents JS from making a request for a resource to a domain different from the one that the current web page was loaded from.

- The domain is made up of the **host** and **port**. Therefore, `localhost:3000` is considered a different domain than `localhost:8080`.

---
### CORS (cont.)
<br>

- To improve web applications, developers asked modern browser vendors to allow cross-origin requests and the **_cross-origin resource sharing_ (CORS)** standard came to be.

- The details can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

- To enable access to our server's API by clients not from our server's domain, we need to enable CORS.

- We implement CORS in an Express app using middleware, of course!

---
### CORS (cont.)
<br>

- Install the [CORS](https://www.npmjs.com/package/cors) module:

	```
	$ npm install cors
	```

- Then we simply have to mount the middleware in _server.js_:

	```js
	var cors = require('cors');
	...
	var app = express();
	
	app.use(cors());
	```

- As usual, check the docs for additional info and options.

---
### Essential Questions
<br>

- How would these two routes be expected to behave differently?<br>
	`GET /accounts` and<br>`GET /api/accounts`
	
- In addition to responding with JSON, it is proper to set the HTTP Response's _______ _______ as well.

- What is the use case for exposing an API in our app?
