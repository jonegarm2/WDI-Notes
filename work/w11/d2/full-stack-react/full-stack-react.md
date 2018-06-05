<img src="https://i.imgur.com/fx2orT2.png">

# Full-stack React
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Build a React app for production |
| Logically layout a full-stack project's structure |
| Configure an Express app to serve a React app's **index.html** file |
| Configure an Express app to accommodate client-side routing |
| Configure a React app for full-stack development |

## Roadmap

- Why Full-stack?
- Architecting a Full-stack React App
- Ready the Starter Code
- Build the React App's Production Code
- Code the Express App
- Configure React for Full-stack Development
- Essential Questions
- Bonus - Deploying to Heroku
- Lab

## Why Full-stack?

Thus far, our React apps have been static, front-end only apps that don't communicate with a server after the _index.html_ has been delivered.

It's _possible_ for static front-end only SPAs to have a reasonable amount of functionality if they incorporate calls to **third-party** APIs or cloud services like Firebase.

However, it's more common for a SPA to be architected to include a back-end server app for tasks such as:

- Performing CRUD
- Authenticating users

Such an app, where we code the front-end and the back-end, as you know, is a full-stack application.

## Architecting a Full-stack React App

Up until this point, we've taken for granted that full-stack apps, like your Express and Rails projects, we're a single, integrated project.

However, when thinking about developing a full-stack React project, you have to consider complexities such as tooling, React's integrated development server, etc.

There are complications in both **development and production** environments that have to be addressed.

#### Development Environment Complications

If we're going to develop using the MERN-stack, we have to figure out how we're going to:

- Use React's Development Server (`npm start`)
- **and**, run `nodemon` to productively develop the Express back-end that responds to AJAX requests sent from the React front-end 

<details>
<summary>There's a conflict, what is it?</summary>
They both run on port 3000 by default.
</details>

> Key Point: When developing a MERN-stack app, you will need to launch **both** React's development server (`$ npm start`) **and** the Express app (`$ nodemon server`).

#### Production Environment Complications

To be able to deploy our MERN-stack app, we're going to have to:

- **Build** the React front-end code to make it production ready, and...
- Configure the Express app to serve that production code

#### Possible Full-stack Architectures

There are two general architectures we could pursue:

1. Maintain **two** separate projects, one for the React SPA, the other for the Express back-end.
1. Integrate the codebase for both the React front-end and the Express back-end.

| Architecture | Pros | Cons |
| --- | --- | --- |
| Separate Projects | Easier to set up. | Manage two projects and git repos. Must deploy to two separate hosts, **or**, copy over the front-end production code to the server project before each deployment. |
| Single Project | A single codebase. | More difficult to set up and configure. |

Me likey the single, integrated project approach, however, what does the structure of a single project look like?

Again, two options:

1. Start with an Express app, then generate the React app within it (naming it `client` or something similar). This approach will result in nested **package.json** files and **node_modules** folders requiring you to "know where you are" when installing additional Node modules.
1. Start with a React app, then add an Express **server.js** and other server related folders/files "around" it. This approach results in a single **package.json** file and **node_modules** folder.

INHO, the second option is slightly "cleaner" and since we're going to take an existing React app (Mastermind) full-stack, we'll opt for that approach...

## Ready the Starter Code

The starter code is the React Mastermind app that includes the timer and practice exercises implemented from the previous lesson.

#### Setup

Ensure the starter code is ready:

1. `cd` to  the project folder in Terminal
2. Install the Node modules: `$ npm install`
3. Open your text editor

## Build the React App's Production Code

The Express server app is only concerned with two things:

1. Serving the `index.html`, and
2. Responding to AJAX requests from the JavaScript (the React app) loaded by that page.

The Express server is not concerned with any of the source code for the **React project**. It simply wants to deliver a **production-ready** `index.html`, which will in turn request the **production-ready** `bundle.js`.

So, how do we make the `index.html` & React's JavaScript production-ready? 

Thankfully, the `create-react-app` CLI also has a build utility and a **build** script in **package.json** that, when ran, converts the the code in the `src` and `public` folders of the React project into production code.

Let's run it:

`$ npm run build`

> Note: npm requires us to use the `run` command for scripts other than `start`.
 
After building, examining our project's structure reveals a new **build** folder containing a production ready **index.html**, along with **css** & **js** folders and code.

Take a look at those production ready files just ready to be served up by an Express back-end...

## Code the Express App

We're going to code our own Express app from scratch. This will be easier than using `express-generator` since we're starting with a fully-built React app and want to build a server app "around" it within the same project.

#### Install the Modules for the Express Server

The full-stack architecture we decided on uses a single **package.json** file (the one that was created by `create-react-app`).

What's cool is that the backend Express project can share that **package.json** with the React project.

For now, we're only going to install a minimal number of modules for the Express app:

`$ npm i express morgan serve-favicon`

> Note: We don't need a view engine because our server will be either serving static assets (index.html & CSS and JS files) or responding to AJAX requests with JSON. There will not be any *.ejs templates rendered - just a single index.html.

In the future, to add additional features such as database access, etc., we would install additional modules like `mongoose`, `body-parser`, `dotenv`, etc..

#### Create and Code the Express App (`server.js`)

Let's write our server:

1. Ensure that you're still in the root folder of the React project.
2. `$ touch server.js`.
3. At the top of **server.js**, let's do all the familiar stuff: `require` the modules; create the Express app; and mount the `morgan` logging middleware:

	```js
	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	
	var app = express();
	
	app.use(logger('dev'));
	```
4. Mount and configure the `serve-favicon` & `static` middleware so that they serve from the **build** (production-ready) folder:

	```js
	// Configure both serve-favicon & static middlewares
	// to serve from the production 'build' folder
	app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'build')));
	```
5. A single "catch all" route is required for client-side routing to work properly:

	```js
	// Put API routes here, before the "catch all" route
	
	// The following "catch all" route is necessary for
	// a SPA's client-side routing to properly work
	app.get('/*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	```
	> Note: Since this route is a "catch all" that matches every `get` request, be sure to mount API or other routes before it!
	
	The "catch all" route is necessary for when:
	- A user types a path into the address bar and presses enter.
	- A link is clicked in an external website, email, etc., that has its `href` set to our SPA's hostname.

	For example, we slack the following link to a friend: `https://myapp.herokuapp.com/sales/dashboard`. The friend clicks on it, initiating an HTTP request to our server.
	
	However, the `/sales/dashboard` part of the URL is supposed to be for the client router - not the server!  But there it is, and the server has to deal with it...
	
	The server deals with it by, thanks to the "catch all" route, sending back  **index.html** - which is what we want. When **index.html** loads in the browser, and our SPA's router kicks into action, it will see the path of `/sales/dashboard` and route to the correct feature, just as if the link was clicked from within the SPA!

6. Set the port for development to use 3001 so that React's dev server can continue to use 3000 and finally, tell the Express app to listen for incoming requests:

	```js
	// Configure to use port 3001 instead of 3000 during
	// development to avoid collision with React's dev server
	var port = process.env.PORT || 3001;
	
	app.listen(port, function() {
	  console.log(`Express app running on port ${port}`)
	});
	```

#### Try It Out

Again, React is using the **start** script, so be sure to start the Express app with `$ nodemon server.js` or `$ nodemon server`.

Because the server app is running on `localhost:3001` (not port `3000`), that's where we would browse to check out the production-ready full-stack SPA.

> Important: During development, you don't want to browse to `localhost:3001`. Instead, you want the browser to be loading the React app from React's dev server on `localhost:3000`.

So, when you are hacking out code and nothing seems to be updating in the browser - be sure to verify that you are browsing on `localhost:3000`.  

**When browsing to `localhost:3001`, what version of the app will you be viewing?**

**What command must we run in Terminal to update the production code?**

## Configure React for Full-stack Development

So far, so good, but there will be a problem **during development** (not production)...

Because the React app is being served from `localhost:3000`, that's where all AJAX calls made from the browser to the server will go. However, our Express server is listening for AJAX calls at `localhost:3001`!

Luckily, the React team has created an easy fix for this dilemma. The React development server allows us to specify which host to send API/AJAX calls, such as `GET /api/posts` to.

The fix is to add a `"proxy"` key to **package.json**:

```js
...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:3001"
}
```
Now during development, the SPA can make AJAX calls to the server, such as `fetch('/api/todos)`, and they will be sent to `localhost:3001` instead of `localhost:3000`.

Welcome to the MERN-stack!

## Essential Questions

- **What is the command that readies a React app for production?**
- **What folder holds a React app's production-ready code?**
- **What Express middleware needs to be configured to serve assets from the `build` folder?**
- **Why does a "catch all" route need to be mounted in Express?**

## Bonus - Deploying to Heroku

You want to play Mastermind on your phone or have friends play it, right? Get it deployed! 

Once the Express server has been tested, it's **almost** ready to be deployed to Heroku.

Heroku, if the project does not have a **Procfile**, will look for a **start** script in **package.json**. Yes, we have a **start** script, but it's configured to start React's dev server - not our run **node server.js**.

The easy way out is to create that **Procfile** (named exactly without a file extension):

- `$ touch Procfile`

Then, adding a single line inside **Procfile** takes care of informing Heroku how to boot our app:

- `web: node server.js`

One more change, `create-react-app` creates a **.gitignore** file for the React project. You won't see it in the **starter code** because the **.gitignore** file itself was ignored by the student repo. However, your projects will have it and React adds the **/build** folder to the **.gitignore** which will prevent that important folder from being sent to Heroku.

- You will need to comment this out in the **.gitignore**:

	```
	# production
	#/build
	```

Create your Heroku project in your account and a git remote named `heroku`:

- `$ heroku create <optional_preferred_subdomain>`

Now you are set to deploy to Heroku:

1. Build the app: `$ npm run build`
2. Make a commit: `$ git add -A && git commit -m "Build"`
3. Push to Heroku: `$ git push heroku master`

Play it anywhere!
<img src="https://i.imgur.com/5mGAeIB.png">

> IMPORTANT: Be sure to re-build the React app if anything has been changed since the last deployment

## Lab

You enjoy challenges - you've come to the right place!

Now that we've taken Mastermind full-stack, you're ready to get some practice using a back-end's API by persisting high-scores!

#### Hints:

- Plan what the UI should look like. Perhaps another client-side route and React "page" component makes sense.

- The back-end API will work no differently than what we've already built in class. Define API routes on the server, return JSON - you've seen this movie.  Remember to follow the best practice of name-spacing your API routes with `/api/` and follow RESTful conventions whenever possible (CRUD pertaining to a data entity).

- What will the high-score schema/model look like? Keep it simple, the player's `initials`, `numGuesses` and `seconds` should work.

- Composing the query to return high-scores:  When determining high-scores, `numGuesses` should probably be prioritized over `seconds` - Mongoose's `sort` query method will help with this. Also, if you want to limit the number of top scores to say, the top 20 or so, look into chaining the Mongoose `limit` query method.

- When a player has won, that's the moment to check if the score made the list and, if so, get their initials and make the AJAX request to persist the score. FYI, the solution code took the easy way out and used a JS `prompt()` to ask the player for their initials. Feel free to improve upon this!

- Don't forget to install the necessary node modules like `dotenv`, `mongoose` & `body-parser`. You will **not** need `method-override` (you know why - right?).

- Also, you'll need a hosted MongoDB if you want to deploy. You already have an mLab account, so go for it.

#### Super Bonus

- If a score has made the list, how about letting the user know by moving to the high-score route! This requires that the `<App>` component be able to access `BrowserRouter`'s `history` object so that it can change routes "programmatically" using the `history.push()` method. However, this requires a refactor to ensure that:
	- `<App>` is nested within `BrowserRouter`
	- `<App>` is also wrapped by a `<Route>` component that has its `render` prop (vs. the simpler `component` prop) set to a function that provides the `<Route>` props to `<App>` and returns `<App>` to be rendered. See `index.js` in the solution code for help. Note also the minor refactoring of routing within **App.jsx**. 

- Program the back-end to limit the number of high-scores in the collection to what you want. Before adding a new high-score to the database, you will want to:
	1. Verify that the high score sent by the client is indeed a worthy high score (better than the "worst" high-score in the database). This would be a great use case for a **custom validator** function in the schema.  Check out the **Custom** section of [the docs](http://mongoosejs.com/docs/validation.html). For further assistance, perhaps [this StackOverflow](https://stackoverflow.com/questions/43962430/mongoose-how-to-prevent-mongodb-to-save-duplicate-email-records-in-database) will help.
	2. After adding the new high-score, remove the worst score if the collection grows larger than the number of high-scores you want to keep.  This would be a good use case for Mongoose **post save** [middleware](http://mongoosejs.com/docs/middleware.html) on the high score schema.







