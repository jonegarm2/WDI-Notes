<img src="https://i.imgur.com/fx2orT2.png">

# Token-based Auth with React & JWTs
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case of token authentication |
| Encode/decode a JSON Web Token (JWT) |
| Configure an Express app to provide JWTs |
| Persist a JWT on the client |
| Send a JWT with each request |
| Verify a JWT on the server |
| Protect "private" client-side routes |
| Protect "private" server routes with middleware |

## Roadmap

#### Token-based Authentication:

- Review of session-based authentication
- What's a JSON Web Token (JWT)?
- Flow of token-based authentication
- Advantages of JWT-based authentication

#### Review the Starter App:

- Set up the code
- Review the code

#### Steps to Implement Token-based Authentication & Authorization:

1. Refactor the server to hash the password when a user signs up. 
2. Refactor the server to provide a JWT when a user signs up.
3. Persist the token (JWT) on the client.
4. Update the `<App>` component's state to hold the authenticated user's info.
5. Refactor the `<NavBar>`'s display based on auth status.
6. Implement Log Out functionality.
7. Update the `user` in `<App>`'s state when signing up.
8. Implement Log In functionality.
9. Provide the token when making AJAX requests.
10. Verify JWTs sent by the client and add the `user` to the Express `request` object.
11. Implement authorization: Protect the `/topscores` client-side route.
12. Implement authorization: Protect server-side routes with custom middleware.

#### Essential Questions & Lab

## Token-based Authentication

### Review of Session-based Authentication

Before we talk about token-based authentication, let's review one of the types of auth that you've already used, session-based authentication.

<img src="https://i.imgur.com/TZoeAVv.png" width="900">

### What's a JSON Web Token (JWT)?

A _JSON Web Token_ is a single encoded (not encrypted) string that plays the role of a "token".

The key points about a JWT are:

- The token can contain whatever custom data (called _claims_) we want to put in it.
- The token is cryptographically _signed_ by the server when it is created so that if the token is changed in any way, it is considered invalid.
- The token is _encoded_, but **not encrypted**.  It is encoded using a standard known as _base64url_ so that it can be easily serialized across the internet or even be included in a URL's _querystring_. Some developers look at **encoded** data and think that it's content cannot be read - this is not the case, as you'll soon see.

Here is how a JWT is structured:

<img src="https://i.imgur.com/8J6Rhx9.jpg">

There is a great website dedicated to JWTs that explains in detail their format as well as has the ability to create them:  [https://jwt.io/](https://jwt.io/)

Allow me to take a JWT from the website and demonstrate the fact that the token can be easily decoded in the browser's console:

```js
> var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
> var payload = jwt.split('.')[1]  // only interested in the payload (claims)
> window.atob(payload)
< "{"sub":"1234567890","name":"John Doe","admin":true}"
```
> The `atob()` method decodes a base-64 encoded string and `btoa()` base-64 encodes data.

Okay, JWTs are cool, how does the client get one; and how do we use them?

### Flow of Token-based Authentication

<img src="https://i.imgur.com/3quZxs4.png">

The diagram above shows that the client app:

1. Attempts to log in a user by sending an HTTP POST request, sending along the user's credentials.
2. The server will, if the creds check out, generate a JWT and send it back to the client. It may be sent back as JSON, or in a header (usually named **Token**).
3. Not shown on the diagram, but important, is the fact that the token needs to be persisted somewhere on the client. In a web app, the token is typically persisted in `localStorage`.
4. The reason a client needs to persist a token is that now, whenever the client makes a request, it can send along the token in the HTTP request, either as a querystring, in the request's body, or, as a best practice, in a header named `Authorization`.
5. The server will then validate the token and respond to the request.

What are some advantages of token-based vs. session-based auth...

### Advantages of JWT-based Authentication

Here's a graphic contrasting sessions and tokens:

<img src="https://i.imgur.com/HlzMMRq.jpg" width="900">

Sessions are stateful on the server - they have to be maintained in a server's memory or a database.  The more active users there are, the more sessions there are to keep track of. High-volume websites require multiple servers and would therefore require special software to manage the sessions.

The key to token-based authentication is that it's **stateless**, meaning there is no _state_ being stored on the server regarding the session/login.

A JSON web token is self-contained, it can itself contain the user's identity, etc. There's no need to fetch the user from a database with each request on the server (an expensive operation). You will only have to query the database for the user if you need to modify the user or obtain additional information from the user document that is not included in the JWT.

The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.

When making an HTTP request, a token can be sent in an HTTP header. They don't have to be sent in a cookie, which are implemented by browsers. Thus, you can use token-based authentication without a web browser - can you say _native mobile app_?

## Review the Starter Code

The starter code is the full-stack Mastermind app without the high-score implementation and some minor additions to aid our authentication implementation.

#### Set Up

As usual, you will need to `$ npm install` to install the dependencies.

Next, do `$ npm run build` so that the server can boot up without errors (it needs a favicon in the build folder).

Also, there is a `config/database.js` module that connects to a hosted MongoDB. The `DATABASE_URL` is stored in a a **.env** file, which you will need to create because they are git ignored. I will provide the connection string or you can use your own.

#### Review the Code

Here are a few of the highlights of the starter code:

**SERVER CODE**

- The `dotenv` module has been installed and required in **server.js**.

- We are connecting to a MongoDB using a **config/database.js** module as usual.

- There is a simple `User` model defined in **models/user.js**.

- API Routes for `User` are defined in **routes/api/users.js** (just one for now).

- There is a **controllers/users.js** module that at this point, only has a `signup` method for creating user models when they sign up. Currently, the method returns the JSON of the created user, however, we will ultimately refactor this to return a JWT.

- Top scores API routes will be defined in **routes/api/topscores.js**.

- There is a **controllers/topscores.js** module with just an **index** action method that returns a few bogus top scores. During the lesson, we will make this a "protected" routes that requires a user to be logged in. 

**CLIENT CODE**

- Client-side routes and components have been defined for:
	- `/signup`: Shows the `<SignupPage>` component.
	- `/login`: Shows the `<LoginPage>` component.
	- `/topscores`: Shows the `<TopScoresPage>` component. Has no functionality but in this lesson we will learn how how to make this a "protected" route that allows only authenticated users to access it.

- A `<NavBar>` component has been created and added that currently has `<Link>`s to the `/signup` and `/login` routes.

- `<LoginPage>` displays a `<LoginForm>` component which includes **controlled** `<input>`s. **What are "controlled" inputs and how do they differ from "uncontrolled" inputs?** There's a `handleSubmit` method defined, but all it does right now is call `preventDefault`. Check out the use of ES2015's **computed property name** in the `handleChange` method - one method to handle any number of controlled inputs! That's good stuff.

- `<SignupPage>` displays a `<SignupForm>` component similar to the `<LoginForm>` above, however, it is working! Submitting the form adds a user to the database, via the `userService.signup` method. Also note how the `Sign Up` button is disabled using a custom `isFormInvalid` method. After a user signs up, we want to switch to the root route, thus on line 28 we are **programmatically** changing the route using `this.props.history.push('/')`. Where did the `history` prop come from? Well, each `<Route>` component has the `history` object as a prop. As usual, we would need to pass it along to nested components via props. Check out how this is being done where the `<SignupPage>` is being rendered (around line 175) in **App.js**.

- `<TopScoresPage>` - not much to see here (literally).

- There is a **utils/userService.js** "utility" module that provides user related functionality. It will be imported by any component that needs to perform anything user related, including signing up, logging in and logging out. Currently, it only has a `signup` method.

- There's also a **utils/userAPI.js** module that handles AJAX communications with the backend. This module is used by the **userService** module as a layer of abstraction for communicating with the server (Single-Responsibility Principle in action!).

## Implement Token-based Authentication & Authorization

Implementing token-based auth will require plenty of code in both the Express server app and the React client app.

There's lots to do, so let's get going!

### Step 1: Refactor the server to hash the password when a user signs up

Currently, when a user signs up, the password is being stored in the database as cleartext (plain text) - not good!

Let's fix this security flaw by refactoring the server to salt and hash the users' password.

Open up **models/user.js**.

We're already using Mongoose's `set` method on the schema to ensure that a user's password is not included when serialized to JSON.

Now we will take advantage of Mongoose middleware to salt and hash the password whenever a user instance is being saved **and** the password has changed (including when a user is being created for the first time).

To perform the actual salting and hashing, we will use the ever so popular **bcrypt** library - let's install and save it as a dependency:

`$ npm install bcrypt`

First, bring in **bccypt**:

```js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
```

**bcrypt** has a setting that tells it how many times to randomize the generation of salt. Let's add a constant in the module to set it - usually 6 is enough:

```js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;
```

Now for the middleware. We will be writing a function that runs before a user is saved. This is called **pre** middleware, also known as a "hook".

Type in this skeleton just above the `module.exports`:

```js
userSchema.pre('save', function(next) {
  // this will be set to the current document
  var user = this;

});
```

Note that we are assigning `this` (the user document being saved) to a variable. The reason is that we will need to access this user doc from within the `bcrypt.hash()` method's callback (see code below). **What is another option we have at our disposal to solve this problem?**

Now let's add the code that checks if the password for this user document has been changed, and if so, salt & hash it, then assign the hash to password, replacing the cleartext version:

```js
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // override the user provided password with the hash
    user.password = hash;
    next();
  });
});
```

Let's check our code by signing up a new user and using the Mongo Shell to check that the password has been hashed:

```
$ mongo mongodb://<user>:<pw>@ds064799.mlab.com:64799/mastermind
> use mastermind
> db.users.find({})
```

The user's password should be hashed!

You can use the following command to remove all users from the collection:

`> db.users.remove({})`

Keep the mongo shell running just in case we need it later.

Done with Step 1, on to Step 2...

### Step 2: Refactor the server to provide a JWT when a user signs up.

The starter code was set up to temporarily return the new user document when a user signs up, however, we need to return a JWT instead - thus, auto-logging in when a user signs up.

First, we're going to need to install the Node module that can create and verify JWTs.

[https://jwt.io](https://jwt.io) lists libraries available for your programming language of choice.

Let's install the one for Node apps:

`$ npm install jsonwebtoken`

> Note: There are additional modules available to help implement JWTs in Express apps. However, it does not take much code to do what needs to be done and at WDI, we want to give you your money's worth :)

With **jsonwebtoken** installed, **controllers/users.js** is where we're going to use it:

```js
var User = require('../models/user');
var jwt = require('jsonwebtoken');
```

As we saw, creating a JWT requires a "secret" string. Let's define one in our **.env** file:

```
DATABASE_URL=mongodb://<user>:<pw>@ds064799.mlab.com:64799/mastermind
SECRET=WDIRocks!
```

Let's create a shortcut variable in our controller to hold the SECRET:

```js
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;
```

The **jsonwebtoken** library has a `sign` method that creates JWTs. Let's write a `createJWT` helper function within **controllers/users.js** that we can use both when a user signs up and when they log in:

```js
/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
```

> Note: There are several ways to specify the expiration of the JWT. Check [the docs](https://www.npmjs.com/package/jsonwebtoken) for more info.

Now let's refactor the `signup` method to return a JWT:

```js
function signup(req, res) {
  var user = new User(req.body);
  user.save()
    .then(user => {
      res.json({token: createJWT(user)});
    })
    // User data invalid (probably a duplicate email)
    .catch(err => res.status(400).json(err));
}
```

The `signup` method is transporting the token string to the client within an object (assigned to a key named `token`). Keep this in mind because we'll need to refactor **userAPI.js** on the client to extract only the token string.

Check that it's working by signing up another user and inspecting the request/response in Chrome's DevTools.

Moving on to Step 3...

### Step 3: Persist the token (JWT) in the client

As discussed, token-based authentication requires the client to send the token with the request to a server's API. To pull this off, we're going to have to persist it somewhere in the browser...

`localStorage` is typically where web apps persist data in the browser.

> Note: Data saved in `localStorage` is persisted by domain until removed. If you want to save data for only the duration of the browser session, use `sessionStorage` instead.

Keeping the token string stored in `localStorage` allows users to remain logged in until the token expires. We will be logged in, even if we close the browser and come back tomorrow! However, you get to determine how long the token is good for when you generate it on the server.

We'll keep all token related code in it's own utility module, but first, let's do that quick refactor to **userAPI.js** I mentioned a bit ago...

#### Refactor the `signup` method in **userAPI.js**

Again, we only want to store the token **string** in `localStorage`, however, the token string is received by the client within an object.

Here's a small refactor to the last line of the `signup` method:

```js
function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // if not res.ok, chances are duplicate email...
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => token);
  // the above could have been written as
  //.then((token) => token.token);
}
```
This funky syntax, `.then(({token}) => token);`, is object parameter destructuring! Yes, it's possible to destructure a function's parameters. Only array destructuring was part of ES2015, however most browsers can now destructure objects as well.

#### Creating the `tokenService` utility module

Following again the single-responsibility principle, in this case, dealing with tokens, we will create a module for:

- Storing, retrieving and removing tokens from `localStorage`
- Verifying that a token has not expired and removing it from storage if it has.
- Extracting the data payload (the user's info).

Let's create a file for our token service:

`$ touch src/utils/tokenService.js`

Just a `setToken` method for now:

```js
function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  } 
}

export default {
  setToken
};
```

We'll add other methods in a bit, but for now, this is all we need to persist the token...

#### Persisting the token to `localStorage`

Now let's refactor the `signup` method in **userService.js** to use the `setToken` method we just created.

First, we need to import **tokenService.js**:

```js
import userAPI from './userAPI';
import tokenService from './tokenService';
```

Now, the refactor of `signup`:

```js
function signup(user) {
  return userAPI.signup(user)
    .then(token => tokenService.setToken(token));
}
```

Now sign up another user and go to **Local Storage** within the **Application** tab of DevTools. Verify that the token is in `localStorage` stored as a string.

> For fun, decode the payload portion of the token string.

Nice, Step 3 is done.

### Step 4: Update the `<App>` component's state to hold the authenticated user's info

We will want to keep a `user` object in the `<App>` component's state so that it can be passed via props to components that need to be aware of the logged in status/user, such as `<NavBar>`.

If there is no user logged in, we will set the `user` property on the `state` object to `null`.

#### Add a `getUser` method to the `userService`

Anytime the app is loaded or refreshed, we're going to want to check to see if there's a valid token in `localStorage` and "log in" that user automatically.

In addition, apps from time-to-time, will need to obtain the logged in user's info or check if there is a user logged in. A method for this purpose in `userService` would make sense.

Let's add a `getUser` method to **userService.js**:

```js
function getUser() {
  return tokenService.getUserFromToken();
}

export default {
  signup,
  getUser
}
```

Again, as you can see, we want to delegate dealing with tokens to the `tokenService`.

First, let's write a `getToken` method that retrieves and verifies that the token has not expired; and if it has expired, remove it!

In **tokenService.js**:

```js
function getToken() {
  var token = localStorage.getItem('token');
  if (token) {
    // check if expired, remove if it is
    var payload = JSON.parse(atob(token.split('.')[1]));
    // JWT's exp is expressed in seconds, not milliseconds, so convert Date.now()
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    } 
  }
  return token;
}
```

> Note: We needed to divide Date.now() by 1000. This is because the JWT spec says the `exp` claim should be in Unix time - Unix Time is the number of seconds since the Unix epoch (Jan 1, 1970). However, JS returns the number of milliseconds (not seconds) since the Unix epoch. We therefore must divide by 1000 to convert milliseconds to seconds.

Next, let's code a `getUserFromToken` method that decodes the token, then extracts and returns the `user` object:

```js
function getUserFromToken () {
  var token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export default {
  setToken,
  getToken,
  getUserFromToken
};
```

Be sure to update the `export default` as shown above as well.

#### Add `user` to `<App>`'s state

First, import the `userService` in **App.js**:

```js
import userService from '../../utils/userService';
```

Next, in order to add `user` to the state when the app is loaded or refreshed, we will implement the `componentDidMount` lifecycle method.

Above the `render` method:

```js
/*---------- Lifecycle Methods ----------*/

componentDidMount() {
  let user = userService.getUser();
  this.setState({user});
}
```

The last user we signed up should now be in the state of `<App>`. Use the React DevTool to check it out!

### Step 5: Refactor the `<NavBar>`'s display based on auth status

As we've done in the other two authentication lessons, we will want to change the navigation links according to whether there is a user logged in or not:

- **Logged in:** Display a greeting and a **Log Out** link.
- **Not logged in:** Display **Log In** and **Sign Up** links like we are currently doing.

Now that we have added a `user` property to `<App>`'s `state` object, we need to pass it on down to the `<NavBar>` component as a prop.

**I bet you can do it in 5 minutes or less!**

Now that `<NavBar>` has a `user` prop, let's refactor **NavBar.js**.

We want to display one of two choices - another opportunity to use a ternary operator as follows:

```js
const NavBar = (props) => {
  let nav = props.user ?
    <div>
      <Link to='/topscores' className='NavBar-link' >TOP SCORES</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to='' className='NavBar-link' onClick={props.handleLogout} >LOG OUT</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span className='NavBar-welcome'>WELCOME, {props.user.name}</span>
    </div>
    :
    <div>
      <Link to='/login' className='NavBar-link'>LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};
```

In case you're wondering, "yes", we could have inlined the entire ternary expression within the `return` statement instead of assigning it to the variable `nav`.

A tiny class added to **NavBar.css** for the welcome text:

```css
.NavBar-welcome {
  color: grey;
}
```

<img src="https://i.imgur.com/p5SX6EP.png">

Awesome!

### Step 6: Implement Log Out functionality

Note that we added a `<Link to='' className='NavBar-link'>LOG OUT</Link>` for logging out.

When the **LOG OUT** link is clicked, we won't want to change routes, instead we want to:

1. Remove the token from `localStorage`
2. and set  `state.user` to `null`

First let's add an `onClick` prop to the link:

```js
<Link to='' className='NavBar-link' onClick={props.handleLogout} >LOG OUT</Link>
```

**Where does the `handleLogout` method needs to go?**

```js
handleLogout = () => {
  userService.logout();
  this.setState({user: null});
}
```

**As usual, pass that method down to where it's needed (NavBar.js) - you got this.**

Now let's add the `logout` method to **userService.js**:

```js
function logout() {
  tokenService.removeToken();
}

export default {
  signup,
  getUser,
  logout
}
```

Finally, we need that `removeToken` method added to **tokenService.js**:

```js
function removeToken() {
  localStorage.removeItem('token');
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken
};
```

Test it out and verify that the LOG OUT link is working - sweet!

Sign up again and yikes, the nav bar didn't update!

Let's fix this problem in the next step...

## Step 7: Updating the `user` in `<App>`'s State When Signing Up

**Why didn't the display update?**

Let's first add a `handleSignup` method in **App.jsx**:

```js
handleSignup = () => {
  this.setState({user: userService.getUser()});
}
```
Need to pass it from `<App>` all the way down to `<SignupForm>` via props - **do it now please, but be careful!**.

Here's the refactor that adds the call to `<App>`'s `handleSignup` in **SignupForm.jsx**:

```js
  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      // successfully signed up - show GamePage
      .then(() => {
      	 // inform <App> that a user has signed up!
        this.props.handleSignup();
        this.props.history.push('/');
      })
      // invalid user data
      .catch(err => this.props.updateMessage(err.message));
  }
```

That should do the trick! Feel free to sign up and log out all you want!

What's that? You're tired of signing up different users?

We're here to please...

## Step 8: Implement Log In functionality

I'm tied of signing up all these users too!

We're going to need to write code to implement logging in on both the client and server...

### Implement logging in on the client

We already have `<LoginPage>` and `<LoginForm>` components.

<img src="https://i.imgur.com/wyS2TzB.png">

We're using controlled `<input>`s here, however, the `handleChange` method in the `onChange` is not yet implemented:

```js
handleChange = (field, e) => {
  this.setState({
    // Using ES2015 Computed Property Names
    [field]: e.target.value
  });
}
```

The above code is sweet like bear meat because this one method can handled updating the state for any number of `<input>`s! This is more elegant than writing dedicated methods for each `<input>`.

Now the form is pretty much ready to go, we just need to refactor the `handleSubmit` method to, just like signing up, inform `<App>` that a user has logged in and then route to the home page:

```js
  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
        this.props.history.push('/');
      })
      // invalid credentials - don't alert in YOUR app :)
      .catch(err => alert('Invalid Credentials!'));
  }
```

Since we're using `userService`, we need import it:

```js
import userService from '../../utils/userService';
```

Oh boy, another callback method to put in **App.js**:

```js
handleLogin = () => {
  this.setState({user: userService.getUser()});
}
```

Make sure that we are passing the props from the `<Route>` component as well so that we can use the `history` object to route to `/` programmatically:

```js
// IMPORTANT: Pass "props" as an argument on next line
<Route exact path='/login' render={(props) => 
  <LoginPage
    {...props}
    handleLogin={this.handleLogin}
  />
}/>
```
and again in **LoginPage.jsx**, pass them props to `<LoginForm>`:

```js
const LoginPage = (props) => {
  return (
    <div className='LoginPage'>
      <LoginForm
        {...props}
      />
    </div>
  );
};
```

Next we need to add the `login` method to **userService.js**:

```js
function login(user) {
  return userAPI.login(user)
    .then(token => tokenService.setToken(token));
}

export default {
  signup,
  getUser,
  logout,
  login
}
```

The `userAPI.login` method returns a promise that will resolve with a JWT.

The only problem is that it doesn't exist yet!  On to **userAPI.js** to add the `login` method:

```js
function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad credentials');
  })
  .then(({token}) => token);
}

export default {
  signup,
  login
};
```

Whew, that should take care of the client, on to the server...

### Implement logging in on the server

When adding functionality on the server, a great place to start is defining the route.

In **routes/api/users.js**:

```js
/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
```

Need that `usersCtrl.login` - in **controllers/users.js**:

```js
function login(req, res) {
  User.findOne({email: req.body.email}).exec().then(user => {
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        var token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  }).catch(err => res.status(401).json(err));
}

// don't forget this:

module.exports = {
  signup,
  login
};
```

The above code is using a `comparePassword` instance method on the `User` model that doesn't exist yet. We need it!

When we want to add custom functionality to a particular instance of a Mongoose model, we can define instance methods like this:

In **models/user.js**:

```js
userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};
```
As you can see, `bcrypt` includes a 	`compare` method for verifying that a cleartext password matches a given hash.

Also note that we coded the `comparePassword`'s function to accept a callback function that has the same signature that bcrypt's `compare` method expects, which results in that single line of sweet code.

> Interestingly, bcrypt's `compare` method is written as an asynchronous method, thus the necessity to provide a callback. The developers of bcrypt made this decision due to the fact that hashing is a CPU intensive task. There is a synchronous version available, `compareSync`, but it's use is not recommended.

Okay, now that we've implemented logging in on the client and server, try it out!

## Step 9: Provide the token when making AJAX requests

The server is going to want to verify that a user has a JWT and that it's valid before allowing access to protected routes in the API.

If we are logged in, we want to ensure that we send our JWT in a header.

We already have set up a GET `/api/topscores` route on the server. For the purpose of this lesson, we will want to make it a protected route that requires a valid JWT to access...

#### Create the **topscoresAPI.js** service module

We've been using `utils/usersAPI.js` to handle user related communications with the server from the client, we're going to use a `utils/topscoresAPI.js` module to do the same:

`$ touch src/utils/topscoresAPI.js`

Here's the code for **topscoresAPI.js**:

```js
import tokenService from './tokenService';

const BASE_URL = '/api/topscores/';

function index() {
  return fetch(BASE_URL, getAuthRequestOptions('GET'))
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad credentials');
  })
  .then(scores => scores);
}

/*----- Helper Functions -----*/

function getAuthRequestOptions(method) {
  return {
    method: method,
    headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()})
  };
}

export default {
  index
};
```
We created a `getAuthRequestOptions` helper function to stay DRY when adding more methods to within _topscoresAPI.js_. **How might we make this method even more reusable?**

Note the pre-pending of the word **Bearer** to the token. This is a standard to follow when using token-based authentication.

#### Displaying Top Scores

In this particular app, we're going to make the `<TopScoresPage>` component a container component responsible for holding the top scores state.

If you think about it, whenever a player views `<TopScoresPage>`, that's the time you'll want to fetch high scores - that way they don't become stale, which would be the case if you fetched them from within `<App>`.

Let's add some UI and code to the `<TopScoresPage>` component to display fetched top scores:

In **TopscoresPage.jsx**:

```js
import React, {Component} from 'react';
import './TopScoresPage.css';
import topscoresAPI from '../../utils/topscoresAPI';
import ScoresTable from '../../components/ScoresTable/ScoresTable'

// be sure to add this import
import {Link} from 'react-router-dom';

class TopScoresPage extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    }
  }
  componentDidMount() {
    topscoresAPI.index().then(scores =>
    	this.setState({scores})
    );
  }
  render() {
    return (
      <div className='TopScoresPage'>
        <header className="header-footer">Top Scores</header>
        <Link to='/'>RETURN</Link><br />
        <ScoresTable scores={this.state.scores} />
      </div>
    );
  }
}

export default TopScoresPage;
```

The `componentDidMount` lifecycle method is the place to perform AJAX and update the component's state.

We are going to use a `<ScoresTable>` component to display the scores passed as a `scores` prop. 

We have already imported the module at the top - let's go create it so that we can compile without errors...

#### Create the `<ScoresTable>` component

Create a **ScoresTable** folder within the **components** folder.

Create a **ScoresTable.jsx** file and let's code the component as a stateless functional component:

```js
import React from 'react';

const ScoresTable = (props) => {

  function formatElapsedTime(seconds) {
    function pad(val, places) {
      var s = val.toString();
      return '0'.repeat(places - s.length) + s;
    } 
    return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
  }

  return (
    <table className='table table-striped table-bordered'>
      <thead>
        <tr>
          <th>Player</th>
          <th className='text-center'># Guesses</th>
          <th className='text-center'>Time</th>
        </tr>
      </thead>
      <tbody>
        {props.scores.map(score => 
          <tr key={score.player}>
            <td>{score.player}</td>
            <td className='text-center'>{score.guesses}</td>
            <td className='text-center'>{formatElapsedTime(score.seconds)}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ScoresTable;
```

Interestingly, React will get pissed off if we make a `<tr>` a child of `<table>` - it wants us to be "proper" by putting them only within `<thead>` or `<tbody>` React elements.

Included above is the same `formatElapsedTime` function used in the `<GameTimer>` component - do not do this at home! **What's a better practice?**

Browse to `localhost:3000/topscores`!

Looking good, on to step 10...

## Step 10: Verify JWTs sent by the client and add the `user` to the Express `request` object

Remember how **passport** added the logged in `user` object to Express' `request` (req) object?

We want some of that!

We just sent the JWT in an `Authorization` header of the request. Remember, the token will already contain the user's info, so we won't have to hit the database, we can use the token's user info contained in the payload instead! No session, no querying the database - that's scalability!

> Note, although we will have `req.user` like when we used **passport**, this `user` property will **not** be an actual Mongoose document, it's just a plain JS object we're grabbing from the token. This is very lightweight and performant. However, if you need to perform any CRUD on an actual user document, you will have to query the DB to obtain the user document first.

#### Create the Custom Middleware

On the server, we're going to create a module that will export a custom middleware function.

We will want the middleware function to:

- Check if there's a token in the headers of the HTTP request (for additional flexibility, we'll also check for a token being sent in a querystring or the body of the request).
- Verify the token is valid and hasn't expired
- Decode it to obtain the user data from the token's payload
- and finally, add the user payload to the Express request object

First, let's create a module file for the middleware function:

`$ touch config/auth.js`

Here's the custom **auth.js** middleware:

```js
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  // check for the token being sent in three different ways
  var token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    // remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        // valid token, so add user to req
        req.user = decoded.user;    
        next();
      }
    });
  } else {
    next();
  }
};
```

We're using the `jsonwebtoken` module's sweet `verify` method to verify the token.

Again, we are checking for a token being sent in the request in three different ways by a client:

- In the header (this is how we are currently sending it)
- In a querystring, or
- In the body

This extra flexibility may allow our API to be accessed from other apps more easily.

#### Mount the Custom Middleware

We could mount the auth middleware in each router that needs it, but we can also mount it earlier in the middleware stack by mounting it in **server.js**:

```js
app.use(bodyParser.json());

// Mount our custom auth middleware
app.use(require('./config/auth'));
```

Just be sure to mount it before mounting any routers that may need to access to `req.user`.

To test, let's log out `req.user` from the **controllers/topscores.js**:

```js
function index(req, res) {
  console.log(req.user);
  res.json(bogusScores);
}
```

Check Terminal - there's the user data!

## Step 11: Protect the `/topscores` client-side route

Although we have navigation UI that does not show the **TOP SCORES** link unless someone is logged in, it does not stop a user from typing `/topscores` in the address bar in an attempt to route to the feature.

If they do, let's send that rebel to `/login`.

One best practice approach is to define your protected routes as follows:

```js
<Route exact path='/topscores' render={() => (
  userService.getUser() ?
    <TopScoresPage />
   	:
    <Redirect to='/login' />
)}/>
```

Note the use of another `react-router-dom` component, `<Redirect>`. This component is great for performing client-side redirects.

Be sure to update the import to include `Redirect`:

```js
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
```

The final step, coming up!

## Step 12: Protect server-side routes with custom middleware

We protected certain server routes back in unit 3 - remember `isLoggedIn`? 

Once again, we'll use a tiny middleware function inserted before the controller action.  This time, we'll call it `checkAuth`...

Here's the updated **routes/api/topscores.js**:

```js
/*---------- Protected Routes ----------*/

router.get('/', checkAuth, topscoresCtrl.index);


/*----- Helper Functions -----*/

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
}
```

Well, feed the babies and wash my hair!

We did it!

## Essential Questions

After what we just went through? No friggin' way!

## Lab

First, refactor the `formatElapsedTime` function into a utility module.

Second, definitely consider using token-based authentication using JWTs in your Project 4!




