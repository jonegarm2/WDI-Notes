
[Click to View this Presentation](https://presentations.generalassemb.ly/df29b268f26f6892036d#/1)

<p>Note: This lesson is not broken into distinct 1:15 modules. It is designed to be spread throughout a day...</p>

---
<img src="https://i.imgur.com/a6TDXws.jpg" style="width:500px">

## OAuth Authentication<br>with<br>Express & Passport

---
# Learning Objectives
<br>

- Identify the advantages OAuth provides for users and web apps

- Explain what happens when a user clicks "Login with [OAuth Provider]"

- Add OAuth authentication to an Express app using PassportJS

- Use Middleware & PassportJS to provide authorization

---
# Roadmap
<br>

- Why OAuth?
- What is OAuth?
- How Does OAuth Work?
- Preview the App
- The App's User Stories
- Review the Starter Code
- Today's Game Plan (11 Steps)

---
# Why OAuth?

---
### Why OAuth?
<br>

- In Unit 2, we learned how to implement username/password authentication.

- The users of your project had to sign up, providing their name, email, password, etc.

- **What are the pitfalls of username/password authentication from a _user's_ perspective?**

---
### Why OAuth?
<br>

<p style="text-align:left">Pitfalls from a user prospective:</p>

- Creating multiple logins requires you to remember and manage all of those login credentials.

- You will often use the same credentials across multiple sites, so if there's a security breach at one of the sites where you are a member, the hackers know that users often use the same credentials across all of their sites - oh snap!

- You are tempted to use simple/weak passwords so that you can remember all of them.

---
### Why OAuth?
<br>

- **<p>What would be the pitfalls from a<br><em>website or developer's</em> perspective?</p>**
  
---
### Why OAuth?
<br>

<p style="text-align:left">Pitfalls from a website or developer prospective:</p>

- Managing users' credentials requires carefully crafted security code written by highly-paid devs.

- Users (customers) are annoyed by having to create dedicated accounts, especially for entertainment or personal interest type websites.

- Managing credentials makes your site a target for hackers (internal and external) and that brings with it liability.

---
### Why OAuth?
<br>

- The bottom-line is that the majority of users prefer to use OAuth instead of creating another set of credentials to use your site.

- When users are your customers, you want to make them as happy as possible!

- OAuth is hot - use it!

---
# What is OAuth?

---
### What is OAuth?
#### Vocab
<br>

- **OAuth provider**: A service company such as _Google_ that makes its OAuth authentication service available to third-party applications.
- **client application**: Our web application!  Remember, this is from an _OAuth provider's_ perspective.
- **owner**: A user of a service such as _Facebook_, _Google_, _Dropbox_, etc.
- **resources**: An _owner's_ information on a service that **may** be exposed to _client applications_. For example, a user of Dropbox may allow access to their files.
- **access token**: An temporary key that provides access to an _owner's_ _resources_.
- **scope**: Determines what _resources_ and rights (read-only, update, etc) a particular _token_ has.

---
### What is OAuth?
<br>

- OAuth is an open standard that provides **client applications** access to **resources** of a service such as Google with the permission of the resources' **owner**.

- There are numerous OAuth Providers including:
	- Facebook
	- Google
	- GitHub
	- Twitter
	- [Many more...](https://en.wikipedia.org/wiki/List_of_OAuth_providers)

---
# How Does OAuth Work?

---
#### OAuth 2's Flow

<img src="https://i.imgur.com/tAVrCLP.png" width="900">

---
### How Does OAuth Work?
<br>

- The ultimate goal is for the _client application_ (our server app, not the browser app) to obtain an __access token__ from an OAuth provider that allows the app to access the user's resources from that server's API's.

- **Important:** We will only want access to the most basic of resources the user could grant us - their name and email. This is all our app typically cares about, unless it is designed to work with a user's Facebook friends, tweets, Dropbox data, etc.

---
### How Does OAuth Work?
<br>

- Interestingly, with OAuth, it is not _required_ for an application to persist its users in a database. That's right, no _user_ model!

- However, in most cases web applications want to persist its users in a database because:
	- The web app will want to persist additional information about its users not provided by the OAuth provider, for example, storing a user's preferences when using an app.
	- They want to track the number of users their app has, and perhaps their usage frequency, etc.

---
### How Does OAuth Work?
<br>

- OAuth is **token** based.

- Once a user okays our web app's access, our web app receives a _code parameter_ that is then exchanged for an **access token**.

---
### How Does OAuth Work?
<br>

- Each token has a **scope** that determines what resources an app can access for that user. Again, in this lesson, we will only be interested in accessing our users' basic profile info.

- If in your Project you would like to access more than a user's profile, you will need to modify the **scope** - check the specific provider's documentation on how to access additional resources.

---
### How Does OAuth Work?
<br>

- <p>Yes, OAuth is complex. But not to worry, we don't have to know all of the nitty gritty details in order to take advantage of it in our apps.</p>

- Plus, we will be using a very popular piece of middleware that will handle most of the OAuth _dance_ for us.

---
### OAuth Review Questions
<br>

- **True or false - if your site allows users to authenticate via OAuth, you should ensure they create a "strong" password.**

- **What are the advantages provided to users by OAuth?**

- **The advantages for web sites & developers?**

- **What is the _client application_ within the context of an OAuth provider?**

---
# Preview the App

---
### The App We Will Build Today
<br>

- Today, we are going to take a starter application and add OAuth authentication & authorization to it.

- The app will allow you, as WDI Students, to list fun facts about yourself and read facts about fellow students, past and present.

- The app will add you as a student to its database when you log in for the first time using Google's OAuth provider.

- Allow me to demo what the finished app will look like.

---
# The App's User Stories

---
### The App's User Stories
<br>

The following stories are COMPLETE in the starter code:

- **As a Visitor**:
	- I want to view fun facts about past and present WDI Students so that I can know more about them.
	- I want to be able to search for students by their name so that I don't have to scroll through a long list.
	- I want to sort the list of students by cohort or name so that I can more easily find the student I'm looking for.

---
### The App's User Stories
<br>

We will complete these stories today:
 
- **As an Authenticated Student**:
	- I want to add fun facts about myself so that I can amuse others.
	- I want to be able to delete a fact about myself, in case I embarrass myself.
	- I want to view the Google avatar instead of the placeholder icon.
	- I want to be able to designate what cohort I was a part of.

---

### Set Up the Starter Code

- Optionally, copy the `starter-code/wdi-students` folder.

- `npm install` to install the app's node modules.

- Open the project in your code editor.

- Create a `.env` file and add a key of `DATABASE_URL` and assign it a value provided by yours truly.

- `nodemon` and browse to `localhost:3000` to test.

---
# Review the Starter Code

---
### Review the Starter Code
<br>

- Let's discuss the app's structure and introduce a couple of tidbits that you may or may not have seen yet.

- First, this is a SPA - there is only one server-side _index.ejs_ view. However, logging in/out, triggers a full page refresh.

- The app was scaffolded using the `express-generator` and the main server script has been renamed to `server.js`.

---
### Review the Starter Code<br><small>CSS Framework</small>
<br>

- The app uses the [_Materialize_ CSS framework](http://materializecss.com/) based upon [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html).

- Materialize's CSS and JavaScript files are being loaded via a CDN.

---
### Review the Starter Code<br><small>SASS Middleware</small>

- The app has middleware installed and configured to process SASS stylesheets.

- The `node-sass-middleware` module is required, configured and mounted **before** the `static` middleware in _server.js_.

- When a `*.css` file is requested, the middleware will intercept the request and return the CSS file - if it exists. If it does not, it looks for a matching `.scss` or `.sass` file, compiles it to CSS, sends it to the browser, and saves it for next time.

- Its documentation can be found [here](https://github.com/sass/node-sass-middleware).

---
### Review the Starter Code<br><small>The View</small>
<br>

- Since this is a SPA, the page is dynamically updated with client-side templating using _Underscore_.

- Review `index.ejs` and `app.js` for the implementation details of rendering and responding to user interaction such as searching and sorting.

- Note in _server.js_ the _ejs_ view engine has been configured to use `$` as a delimiter to avoid the conflict with _underscore_ using the same tags.

---
### Review the Starter Code<br><small>Config</small>
<br>

- A `.env` file is being used to provide environment settings such as the database's connection string.

- Besides avoiding having secrets pushed to GitHub, `.env` allows us to configure our app with different settings locally vs. when deployed.

- The variables within `.env` are loaded on line 9 of _server.js_ allowing its values to be used as shown on lines 3 & 7 of `config/database.js`.

---
### Review the Starter Code<br><small>Database</small>
<br>

- The connection to MongoDB with Mongoose is done on line 12 of _server.js_.

- We are using a hosted MongoDB so that we can see each other's fun facts!

---
### Review the Starter Code<br><small>Models</small>
<br>

- Looking at `models/student` module reveals a single `Student` model.

- Of interest is `factSchema`. This second schema is used to define the structure of the _subdocuments_ **embedded** in the `facts` field of the Student model.

- The `avatar` property has been defined in advance for implementing a user story as an exercise later today.

---
### Review the Starter Code<br><small>Models (cont.)</small>

- As you know, in Mongoose, schemas define the structure of documents and only models are mapped to collections in the database.

- The embedding of a Student's _facts_ is highly improbable to cause any Student document to exceed the 16MB size limit and thus is a perfect use case for embedded docs.

- Thanks to the `factSchema`, when we push a new fact into the `facts` array, all we do is provide the `text` field, and an `_id` will automatically be created in the subdocument for us.

---
### Review the Starter Code<br><small>Routing</small>
<br>

- We have two separate route files: _index.js_ & _api.js_.

- In _index.js_, there is only the root route used to return our only view.

- _api.js_ contains our routes that will be accessed directly from the client using AJAX.

- Always put routes in separate modules if you would like to namespace them using a different base path when mounting them.

---

### Review the Starter Code<br><small>Controllers</small>
<br>

- Examining _routes/api.js_ reveals that we are going to be putting our route handler code in two controllers modules: `controllers/facts` and `controllers/students`.

- Currently, there is only one method, `index`, in _students.js_ that returns all students in the database.

- In _facts.js_ the `create` and `delete` methods have been stubbed up.

---
# Ready for Some OAuth?

---
### Today's Game Plan
<br>

- **Step 1:** Register our App with Google's OAuth Server
- **Step 2:** Discuss PassportJS
- **Step 3:** Install & Configure Session middleware
- **Step 4:** Install PassportJS
- **Step 5:** Create a Passport config module
- **Step 6:** Install a Passport Strategy for OAuth
- **Step 7:** Configure Passport
- **Step 8:** Define routes for authentication
- **Step 9:** Add Login/Logout UI
- **Step 10:** Code the First User Story
- **Step 11:** Add Authorization

---
### Step 1 - Register our App
<br>

- Every OAuth provider requires that our web app be registered with it.

- When we do so, we obtain a _Client ID_ and a _Client Secret_ that identifies **our application** (not a user) to the OAuth provider.

- For this lesson, we are going to use Google's OAuth server - the details of how to do so are [here](https://developers.google.com/identity/protocols/OAuth2).

- Time to register our app...

---
### Step 1.1 - Google Developers Console

- You must be logged into [Google Developers Console](https://console.developers.google.com):

<img src="https://i.imgur.com/HE95SsU.png">

---
### Step 1.2 - Create a Project

- Click **Select a project**, then click the create project button in the **Select** dialog box:

<img src="https://i.imgur.com/elx43Aa.png">

---
### Step 1.2 - Create a Project

- Type in a **Project name**, answer **No** & **Yes**, then click the **Create** button:

<img src="https://i.imgur.com/JTmOYgB.png">

---
### Step 1.3 - Enable Google+ API

- Once created, you need to re-select your new project so that we can configure it. First, we need to enable the **Google+** API by first clicking **ENABLE APIS AND SERVICES**:

<img src="https://i.imgur.com/PyivQBq.png">

---
### Step 1.3 - Enable Google+ API

- Click on **Google+ API** which is located within the _Social APIs_ section:

<img src="https://i.imgur.com/iCromwS.png">

---
### Step 1.3 - Enable Google+ API

- Then, click **ENABLE**:

<img src="https://i.imgur.com/uXeJ9cY.png">

---
### Step 1.4 - Obtain Credentials for App

- Now we need to create credentials for the app. Get started by clicking **Create Credentials**:

<img src="https://i.imgur.com/aT5USBT.png">

---
### Step 1.4 - Obtain Credentials for App

- We're interested in obtaining an OAuth **client ID**:

<img src="https://i.imgur.com/WN9mQ5Z.png">

---
### Step 1.4 - Obtain Credentials for App

- Click **Configure consent screen** to setup the screen users will see in order to obtain their consent:

<img src="https://i.imgur.com/JLvGOBC.png">

---
### Step 1.4 - Obtain Credentials for App

- Just enter a **Project name** and click **Save**:

<img src="https://i.imgur.com/VyTa68k.png" height="650">

---
### Step 1.4 - Obtain Credentials for App
<br>

- The next slide shows what to do next.

- The important thing to note is that you will have to add an _**additional**_ entry in the **Authorized redirect URIs** once you have deployed your application to Heroku - something like `https://<your app name>.herokuapp.com/oauth2callback`.

---

<img src="https://i.imgur.com/EmEOHIk.png">

---
### Step 1.4 - Obtain Credentials for App
<br>

- After clicking the _Save_ button, we will be presented with our app's credentials!

- Let's put **YOUR** credentials, along with that callback we provided, in our `.env` file so that it looks something like this:

```sh
DATABASE_URL=mongodb://<dbuser>:<dbpassword>@ds053954.mongolab.com:53954/wdi-students
GOOGLE_CLIENT_ID=245025414219-2r7f4bvh3t88s3shh6hhagrki0f6op8t.apps.googleusercontent.com
GOOGLE_SECRET=Yn9T_2BKzxr4zgprzKDGI5j3
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
```

---
### Congrats on Registering the App
<br>

- With registering our app now completed, just remember that each provider will have its own unique process.

- Any questions about what we just did?

---
### Step 2 - Passport Discussion
<br>

- Implementing OAuth is complex. There are redirects going on everywhere, access tokens that only last for a short time, refresh tokens used to obtain a fresh access token, etc.

- As usual, we will stand on the shoulders of giants that have done much of the hard work for us - enter **PassportJS**.

- Passport is by far the most popular authentication framework out there for Express apps.

---
### Step 2 - Passport Discussion
<br>

- [Passport's website](http://passportjs.org/) states that it provides _Simple, unobtrusive authentication for Node.js_.

- Basically this means that it handles much of the mundane tasks related to authentication for us, but leaves the details up to us, for example, not forcing us to configure our user model a certain way.

---
### Step 2 - Passport Discussion
<br>

- There are numerous types of authentication, if Passport itself was designed to do them all, it would be ginormous!

- Instead, Passport uses **Strategies** designed to handle a given type of authentication. Think of them as plug-ins for Passport.

- Each Express app with Passport can use one or more of these strategies.

- [Passport's site](http://passportjs.org/) currently shows over 300 strategies available.

---
### Step 2 - Passport Discussion
<br>

- OAuth, or more specifically, OAuth2, although a standard, can be implemented slightly differently by OAuth providers such as Facebook and Google.

- As such, there are strategies available for each flavor of OAuth provider.

- For this lesson, we will be using the [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth) strategy.

---
### Step 2 - Passport Discussion
<br>

- **Passport is just middleware designed to authenticate requests**.

- Passport's middleware will automatically add a `user` object to the `req` object if the request was made by an authenticated user.

- We will then have that `req.user` object available to our route handler code!

---
### Step 3 - Session Middleware
<br>

- Before we install Passport and a strategy, we need to install the [`express-session`](https://github.com/expressjs/session?_ga=1.40272994.1784656250.1446759094) middleware.

- Sessions, as we saw with Rails, are a server-side way of remembering a user's browser session.

- It remembers the browser session by setting a cookie that contains a _session id_. No other data is stored in the cookie, just the _id_ of the session.

---
### Step 3 - Session Middleware
<br>

- On the server-side, the application can store data pertaining to the session.

- Passport will use the session, which is an in-memory data-store by default, to store a nugget of information that will allow us to lookup the user in our database.

- FYI, since sessions are maintained in memory by default, if we restart our server, session data will be lost. You will see this happen when nodemon restarts the server and we are no longer logged in :)

---
### Step 3.1 - Installing Session Middleware
<br>

- Let's install the module:

	```sh
	$ npm install express-session
	```

- Next, require it below the `body-parser`:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

	```js
	var bodyParser = require('body-parser');
	// new code below
	var session = require('express-session');
	```

---
### Step 3.2 - Configure and Mount Session Middleware

- Finally, we can configure and mount our session middleware below the `cookieParser`:

	```js
	app.use(cookieParser());
	// new code below
	app.use(session({
	  secret: 'WDIRocks!',
	  resave: false,
	  saveUninitialized: true
	}));
	```

- The _secret_ is used to digitally sign the session cookie making it very secure. You can change it to anything you want. Don't worry about the other two settings, they are only being set to suppress deprecation warnings.

---
### Step 3.3 - Verifying Session Middleware
<br>

- `nodemon` to make sure your server is running.

- Browse to our app at `localhost:3000`.

- Open the _Resources_ tab in _DevTools_, then expand _Cookies_ in the menu on the left.

- A cookie named `connect.sid` confirms that the session middleware is doing its job.

---

####Congrats, the session middleware is now in place!

#### Time for a few questions :)

---
### Review Questions
<br>

- **Before a web app can use an OAuth provider, it must first ___________ with it to obtain a ___________ and a client secret.**

- **Passport uses ___________ designed to handle specific types of authentication.**

- **In your own words, explain what a _session_ is.**

- **If there is an authenticated user, the request (`req`) object will have what attached to it by Passport?**

---
### Step 4 - Install Passport
<br>

- The Passport middleware is easy to install, but challenging to set up correctly.

- First the easy part:

	```sh
	$ npm install passport
	```

- Require it as usual below `express-session`:

	```js
	var session = require('express-session');
	// new code below
	var passport = require('passport');
	```

---
### Step 4.1 - Mount Passport
<br>

- With Passport required, we need to mount it. Be sure to mount it **after** the session middleware and always **before** any of your routes are mounted that would need access to the current user:

	```js
	// app.use(session({... code above
	app.use(passport.initialize());
	app.use(passport.session());
	```
	
- The `passport.initialize()` is always required, however, `passport.session()` can be removed if you don't need persisted login sessions (like for a pure backend api where credentials are sent with each request).

---
### Step 5 - Create a Passport Config Module
<br>

- Because it takes a significant amount of code to configure Passport, we will create a separate module so that we don't further pollute _server.js_.

- Let's create the file:

	```sh
	$ touch config/passport.js
	```
- In case you're wondering, although the module is named the same as the `passport` module we've already required, it won't cause a problem because a module's full path uniquely identifies it to Node.

---
### Step 5.1 - Passport Module's Exports Code 

- Our `config/passport` module is not middleware.

- Its code will basically configure Passport and be done with it. Nor does it need to export any functionality, thus, we don't even need to store the empty object returned by _module.exports_.

- Requiring below our database is as good of a place as any in _server.js_:

	```js
	require('./config/database');
	// new code below
	require('./config/passport');
	```

---
### Step 5.2 - Require Passport 
<br>

- In our `config/passport.js` module we will certainly need access to the `passport` module:

	```js
	var passport = require('passport');
	```

- It's important to realize that this `require` returns the very same `passport` object that was required in _server.js_.<br>**Why is this?**

---
### Step 6 - Install the OAuth Strategy
<br>

- Time to install the strategy that will implement Google's flavor of OAuth:

	```sh
	$ npm install passport-google-oauth20
	```

- This module implements Google's OAuth 2.0 API. [It's docs can be found here.](https://github.com/jaredhanson/passport-google-oauth2)

- Note that _OAuth 1.0_ does still exist here and there, but it's pretty much obsolete.

---
### Step 6.1 - Require the OAuth Strategy
<br>

- Now let's require the `passport-google-oauth20` module below that of `passport` in our _passport.js_ module:

	```js
	var passport = require('passport');
	// new code below
	var GoogleStrategy = require('passport-google-oauth20').Strategy;
	```

- Note that the variable is named using upper-camel-case.<br>**What does that typically hint at?**

- Let's make sure there's no errors before moving on to the fun stuff!

--- 
### Step 7 - Configuring Passport

<p style="text-align:left">To configure Passport we will:</p>

1. Call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user has logged in using OAuth.

2. Define a _serializeUser_  method that Passport will call after _verify_ to let Passport know what data we want to store in the session to identify our user.

3. Define a _deserializeUser_ method that Passport will call for every request when a user is logged in. What we return will be assigned to the `req.user` object.

--- 
### Step 7.1 - <span style="text-transform:lowercase">passport.use</span>

- <p>Now it's time to call the `passport.use` method to plug-in an instance of the OAuth strategy and provide a _verify_ callback function that will be called whenever a user logs in with OAuth. In _passport.js_:</p>

```js
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// new code below
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
  }
));
```

---
### Step 7.1 - <span style="text-transform:lowercase">passport.use</span>
<br>

- Note the settings from the `.env` file being passed to the `GoogleStrategy` constructor function.<br>**What is the name of the module we've been using that loads the settings from the `.env` file?**

- Next we have to code the _verify_ callback function...

--- 
### Step 7.2 - The <em>Verfiy</em> Callback
<br>

- The callback will be called by Passport when a user has logged in with OAuth.

- It's called a _verify_ callback because with most other strategies we would have to verify the credentials, but with OAuth, well, there are no credentials!

- In this callback we must:
	- Fetch the user from the database and provide them back to Passport by calling the `cb` callback method, or...
	- If the user does not exist, we have a new user! We will add them to the database and pass along this new user in the `cb` callback method.

---
### Step 7.2 - The <em>Verfiy</em> Callback
<br>

- But wait, how can we tell what user to lookup?

- Looking at the callback's signature:

	```js
	function(accessToken, refreshToken, profile, cb) {
	```
	
- We can see that we are being provided the user's _profile_ - this object is the key. It will contain the user's _Google Id_.
	
- However, in order to find a user in our database by their _Google Id_, we're going to need to add a field to our `Student` model's schema to hold it...

---
### Step 7.3 - Modify the <em>Student</em> Model

- Let's add a property for `googleId` to our `studentSchema` inside `models/student.js` file:

	```js
	var studentSchema = new mongoose.Schema({
	  name: String,
	  email: String,
	  cohort: String,
	  avatar: String,
	  facts: [factSchema],
	  googleId: String
	}, {
	  timestamps: true
	});
	```

- Cool, now when we get a new user via OAuth, we can use the Google `profile` object's info to create our new user!

---
### Step 7.4 - Callback Code
<br>

- Now we need to code our callback!

- We're going to need access to our `Student` model:

	```js
	var GoogleStrategy = require('passport-google-oauth20').Strategy;
	// new code below
	var Student = require('../models/student');
	```

- Let's do another error check by ensuring our server is running and we can refresh our app.

- Cool, the next slide contains the entire `passport.use` method.<br>Copy/paste it, then we'll review it...

---

```js
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    Student.findOne({ 'googleId': profile.id }, function(err, student) {
      if (err) return cb(err);
      if (student) {
        return cb(null, student);
      } else {
        // we have a new student via OAuth!
        var newStudent = new Student({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newStudent.save(function(err) {
          if (err) return cb(err);
          return cb(null, newStudent);
        });
      }
    });
  }
));
```

---
### Step 7.5 - <span style="text-transform:lowercase">de/serialize</span>U<span style="text-transform:lowercase">ser</span> Methods
<br>

- Our `passport.use` method has been coded. Now we need to write two more methods inside of `config/passport` module.

- First the callback method we just created is called when a user logs in, then the `passport.serializeUser` method is called in order to set up the session.

- The `passport.deserializeUser` method is called everytime a request comes in from an existing logged in user - it is this method where we return what we want passport to assign to the `req.user` object.

---
### Step 7.5 - <span style="text-transform:lowercase">serialize</span>U<span style="text-transform:lowercase">ser</span> Method
<br>

- First up is the `passport.serializeUser` method that's used to give Passport the nugget of data to put into the _session_ for this authenticated user. Put this below the `passport.use` method:

	```js
	passport.serializeUser(function(student, done) {
	    done(null, student.id);
	});
	```

- Passport gives us a full user object when the user logs in, and we give it back the tidbit to stick in the session.

- Again, this is done for server scalability and performance reasons - a lot of session data sucks.

---
### Step 7.6 - <span style="text-transform:lowercase">deserialize</span>U<span style="text-transform:lowercase">ser</span> Method

- The `passport.deserializeUser` method is used to provide Passport with the user from the db we want assigned to the `req.user` object. Put it below the `passport.serializeUser` method:

	```js
	passport.deserializeUser(function(id, done) {
	  Student.findById(id, function(err, student) {
	    done(err, student);
	  });
	});
	```
	
- Passport gave us the `id` from the session and we use it to fetch the student to assign to `req.user`.

- Let's do another error check.

---
### Step 8 - Define Routes for Authentication
<br>

- Our app will provide a link for the user to click to login with Google OAuth. This will require a route on our server to handle this request.

- Also, we will need to define the route,<br>`/oauth2callback`<br> we told Google to call on our server after the user confirms or denies their OAuth login.

- Lastly, we will need a route for the user to logout.

---
### Step 8.1 - <span style="text-transform:lowercase">routes/index</span> Module
<br>

- We're going to code these three new auth related routes in our `routes/index` module.

- These new routes will need to access the `passport` module, so let's require it in _routes/index.js_:

	```js
	var router = require('express').Router();
	// new code below
	var passport = require('passport');
	```

---
### Step 8.2 - Login Route

- In `routes/index.js`, let's add our login route below our root route:

	```js
	// Google OAuth login route
	router.get('/auth/google', passport.authenticate(
	  'google',
	  { scope: ['profile', 'email'] }
	));
	``` 

- The `passport.authenticate` function will take care of coordinating with Google's OAuth server.

- The user will be presented the consent screen if they have not previously consented.

- Then Google will call our Google callback route...

---
### Step 8.2 - Login Route
<br>

- Note that we are specifying that we want passport to use the `google` strategy. Remember, we could have more than one strategy in use.

- We are also specifying the _scope_ that we want access to, in this case, `['profile', 'email']`.

---
### Step 8.3 - Google Callback Route
<br>

- Below our login route we just added, let's add the callback route that Google will call after the user confirms:

	```js
	// Google OAuth callback route
	router.get('/oauth2callback', passport.authenticate(
	  'google',
	  {
	    successRedirect : '/',
	    failureRedirect : '/'
	  }
	));
	```

- Note that we can specify the redirects for a successful and unsuccessful login. For this app, we will redirect to the root route in both cases.

---
### Step 8.4 - Logout Route
<br>

- The last route to add is the route that will logout our user:

	```js
	// OAuth logout route
	router.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
	```
	
- Note that the `logout()` method was automatically added to the request (`req`) object by Passport!

- Good time to do another error check.

---
### Step 9 - Add Login/Logout UI
<br>

- Before we can dynamically modify our _index.ejs_ view depending upon whether there's an authenticated user or not, we need to modify our root route to pass `req.user` to it:

	```js
	router.get('/', function(req, res) {
		res.render('index', { user: req.user });
	});
	```

- Now the logged in student is in a `user` variable that's available inside of `index.ejs`. If nobody is logged in, `user` will be undefined (falsey).

---

### Step 9.1 - Add the Login / Logout UI Logic

- We're going to need a link to for the user to click to login/out.<br>Let's modify our `index.ejs`:

	```html
	<a href="" class="brand-logo left">WDI Student Fun Facts</a>
	<!-- new html below -->
	<ul class="right">
	  <$ if (user) { $>
	  <li><a href="/logout"><i class="material-icons left">trending_flat</i>Logout</a></li>
	  <$ } else { $>
	  <li><a href="/auth/google"><i class="material-icons left">vpn_key</i>Login with Google</a></li>
	  <$ } $>
	</ul>
	```

- Note the use of `<$ $>` for ejs tags.<br>This was necessary due to the conflict with Underscore's<br>client-side templating and was set in _server.js_.

---

### Step 9 - Try Logging In!
<br>

- We've finally got to the point where you can test out our app's authentication!

- May the force be with us!

---

### Step 10 - Code the First User Story
<br>

- Our first user story reads:<br>_I want to add fun facts about myself so that I can amuse others._

- We will want to add an `<input>` for the fact's text and a button element to the logged in student's card only.

---

### Step 10.1 - Add Dynamic UI
<br>

- Add dynamic UI to add a fact. Ensure it's added in the correct location! It's around line 73 of _index.ejs_:

	```html
		<li class="collection-item ... ">
    <% }) %>
    <!-- new html below -->
    <% if (student._id === '<$= user && user.id $>') { %>
      <div class="card-action">
        <input type="text" id="fact" class="white-text">
        <input type="button" class="btn white-text"
        	onclick="addFact()" value="Add Fact">
      </div>
    <% } %>
	```

---

### Step 10.2 - AJAX, etc.

- Sprinkle in a AJAX inside _app.js_ to post our new fact, update our in-memory array, and re-render the view:

	```js
	function addFact() {
	  if ( !$('#fact').val() ) return;
	  fetch('/api/facts', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify( { fact: $('#fact').val() } ),
	    credentials: 'include'  // send the cookies!
	  })
	  .then(res => res.json())
	  .then(data => {
	    // clear the <input>
	    $('#fact').val('');
	    // find the updated student's index
	    var idx = allStudents.findIndex(s => s._id === data._id);
	    allStudents[idx] = data;
	    render();
	  });
	}
	```

---

### Step 10.3 - Controller Code
<br>

- Lastly, the controller code for the route (already defined). In `controllers/facts.js`:

	```js
	function create(req, res) {
	  req.user.facts.push({text: req.body.fact});
	  req.user.save(function(err) {
	    res.json(req.user);
	  });
	}
	```
- Note that `req.user` IS the Mongoose user document!

---

### Step 10 - Code the First User Story
<br>

- That should take care of our first user story - try it out!

- Cool, just one step left!

---

### Step 11 - Authorization
<br>

- **What is _authorization_?**

- Passport adds a nice method to the request object, `req.isAuthenticated()` that returns _true_ or _false_ depending upon whether there's a logged in user or not.

- We can easily write our own little middleware function to take advantage of `req.isAuthenticated()`.

---

### Step 11.1 - Authorization Middleware
<br>

- As we know by now, Express's middleware and routing is extremely flexible and powerful.

- We can actually **insert** additional middleware functions before a route's final middleware function!  Let's modify `routes/api.js` to see this in action:

	```js
	  // POST /api/facts
  	router.post('/facts', isLoggedIn, factsCtrl.create);
	```

- Take note of the inserted `isLoggedIn` middleware function!

---

### Step 11.2 - Authorization Middleware
<br>

- Our custom `isLoggedIn` middleware function, like all middleware, will either call `next()`, or respond to the request.

- Let's put our new middleware at the very bottom of<br>`routes/api.js` - just above the _module.exports_:

	```js
	// Insert this middleware for routes that require a logged in user
	function isLoggedIn(req, res, next) {
	  if ( req.isAuthenticated() ) return next();
	  res.redirect('/auth/google');
	}
	```

- That's all there is to it!

---

## Congrats!

### You have implemented OAuth authentication and authorization!

---

## Practice Exercises
<br>

- For a challenging practice, complete the remaining three _user stories_:
	- I want to be able to delete a fact about myself, in case I make a mistake.
	- I want to be able to designate what cohort I was a part of.
	- I want to show the user's Google avatar instead of the current icon.

- Start a new application from scratch that implements authentication and authorization as shown in this lesson. Remember, this is a requirement of Project 3!

---

## References
<br>

- [Google OAuth2](https://developers.google.com/identity/protocols/OAuth2)

- [Mongoose](http://mongoosejs.com/)

- [Materialize CSS](http://materializecss.com/)
