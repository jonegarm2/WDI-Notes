![](https://i.imgur.com/DslMarA.png)

# Debugging and Logging in Node

| Learning Objectives - SBAT: |
| :--- |
| Use `morgan` Middleware for Logging |
| Use `nodemon` to Restart Node App Automatically |
| Debug Node inside of Chrome's DevTools |

## Roadmap
- Intro to Debugging
- Create a Skeleton Express App
- Morgan, Your Friendly Logger
- Stop Server, Start Server - Not!
- Step-by-Step Debugging

## Intro to Debugging<br><small>(5 mins)</small>

Debugging is the process of fixing our code and is fundamental to software development.

Debugging server-side code, especially Node's asynchronous code can be tricky.

In this lesson, we will look at three npm packages that are helpful to debugging and development as a whole:

  - Server-side logging with `morgan`, a middleware package.
  - Auto-restart of our Node/Express server using `nodemon`.
  - Live debugging of server-side code using `node-inspector`.

## Create a Skeleton Express App<br><small>(Code Along - 5 mins)</small>
This lesson will require an Express app to work with, so let's use the `express-generator` to build a skeleton app for us.

Remember, it's the Wild West out there, and you will undoubtedly come across multiple structures for Node apps.

The `express-generator` was authored by the TJ Holowaychuk, the same person that authored Express itself.

It scaffolds a **minimal** Express app that includes the vital middleware and configuration necessary for most web apps.

We already installed `express-generator` earlier this week. As a reminder, this is how we did it:

```
$ npm install express-generator -g
```

Even though we will not be using views in this lesson, let's generate our app as if we are using the **ejs** template engine:

```
$ express debug-app -e
$ cd debug-app
$ npm install
```

Then, test that the app starts up with<br>`$ npm start`<br>which will run the command associated with the `start` key in `package.json`.

Browse to `localhost:3000` and observe Express's welcome page.

Lastly, open the project in your text editor.

## Morgan, Your Friendly Logger<br><small>(Code Along - 15 mins)</small>

Take a gander at your Terminal output for our Node server.  You will see something like this:

```
...
GET / 304 284.925 ms - -
GET /stylesheets/style.css 304 2.426 ms - -
```

Obviously, this is the server logging out our request for the root path of our app and the request from the browser for the stylesheet that was linked in the `<head>`.

No big deal, right? Heck, we've seen this time and time again with Rails. However, there's very little magic in Node. In Node, nothing gets done without the use of modules.

The logging we are seeing here is provided by a piece of _middleware_ required and then mounted in the app's middleware stack.

Remember, think of **middleware** as a stack of processes that requests flow through. Each piece of middleware can perform tasks such as logging, authentication, compiling CSS, etc.

<img src="http://media.developeriq.in/images/nodeexpress_2_9_2015_1.png" style="width:900px">

Now let's take a look at `app.js`.

>Earlier this week we changed the name of `app.js` to `server.js` - you're going to see both names out in the Wild West...

This is the line that loads the `morgan` module used for logging requests:

```js
var logger = require('morgan');
```

and this is the line that plugs it into, or mounts it, into the middleware stack:

```js
app.use(logger('dev'));
```
> Note: The `'dev'` specifies one of Morgan's available format options.

Let's comment out the `app.use(logger('dev'));` line of code and restart the server. Watch your Terminal's output while refreshing the browser - nothing, nada...

**What would happen if we moved our logger middleware between our two routes like this?**

```js
app.use('/', routes);
app.use(logger('dev'));
app.use('/users', users);
```
**Test it out to confirm...**

## Stop Server, Start Server - Not!<br><small>(Code Along - 5 mins)</small>

Unfortunately, every change in the JS source code requires a server restart. This is because Node loads the entire application into memory at startup.

There's nothing quite as fun as stopping and starting the server right? If you answered "Yes", you may skip to the next section :)

Fortunately, there's a Node module, [`nodemon`](http://nodemon.io/), that will watch for changes saved to our files and restart the server for us. Let's install it globally so that we can use it in terminal as a command:

```
$ npm install nodemon -g
```

Now we can start our server like this:

```
$ nodemon
```
`nodemon` by default will run the command specified by the "start" key in `package.json`. 

To try it out, let's move...

```js
app.use(logger('dev'));
```

back above

```js
app.use(bodyParser.json());
```
Watch the terminal window when you save the file, and you'll see the server restart automatically!

A tool like `nodemon` is virtually mandatory for Node development because it saves a tremendous amount of time!

## Step-by-Step Debugging<br><small>(20 mins)</small>

### Debugging Server-Side Code

Debugging applications is a huge part in the life of a developer.

Hopefully you experienced how useful Chrome's debugger in DevTools could be when you were developing your game.

You will find being able to use an instance of Chrome's debugger to debug server-side Node script to be just as useful!

Also, being able to set breakpoints, step through code line-by-line, inspect variables, etc., is not only valuable for debugging, it's a great way to learn how code masters craft their programs & libraries!

### How to Use DevTools to Debug Node

There is exciting news in regards to debugging JavaScript running in Node!

Debugging Node used to be a pain in the ass - but not anymore!

> Note: The following is based upon recent additions and are considered to be experimental and subject to change.

Debugging Node requires us to do both of the following:

- Launch the Node application in debugging mode, and
- Use a client tool such as Chrome's DevTools or VSCode designed to "attach" to the Node debugging process.

#### Launching the Server for Debugging

To launch Node in debugging mode we use the `--inspect` or `--inspect-brk` option.

For example, to launch a typical Express generated app, we would type this:

```sh
$ node --inspect bin/www
```

The app will load and a the message `Debugger attached` along with other information will appear in Terminal.

It's important to note at this point that although we can set breakpoints on code that will execute **as the application runs**, i.e., controller code/callback functions that handle requests, **all** of the modules in the Express app, including `server.js`, have already been required (loaded), so that code has already been run and will not run again.

Does this mean it's not possible to debug `server.js` or other modules loaded as a result of `server.js` being loaded?  Luckily the answer is no!

To debug a Node application and immediately break on the first line of code, start Node with the `--inspect-brk` option like this:

```sh
$ node --inspect-brk bin/www
```

#### Use Chrome's DevTool Debugger

When your app is launched using the `--inspect` or `--inspect-brk` option, a special Node debugging will appear in Chromes DevTools:

<img src="https://i.imgur.com/gzlhMC2.png">

No way!  Are you kidding?  This is a dream come true!  Go ahead - click it!

Ensure that the `Sources` tab is selected and now you can browse your modules on the left-side, set breakpoints, step through/over code, inspect variables, etc. as discussed below.

#### Debug in VSCode

We can also debug Node apps within VSCode!

VSCode can both start the app in debug mode and attach to a Node app already running in debug mode.

First press `shift`+`cmd`+`d` to open the debugging panel.

In order to debug for the first time, a debug configuration must be set. You can tell if it needs to be set if you see a red dot near the config icon:

<img src="https://i.imgur.com/WGbq3WC.png">

By clicking the icon and saving the created `launch.json` file, you can now start debugging by clicking the green start icon. **However, be sure that the app is not already running in another terminal session.**

#### Setting a Breakpoint

We can view the source code by clicking on the files within the _Sources_ tab of the the debugger.

Let's set a breakpoint in our `/users` route handler. The handler code is in the `routes` folder. Click on `user.js` to view its source.

To set a breakpoint, we click on the line number - line 6 is where we want to break at. Click it and a blue breakpoint marker will appear.

Browsing to `localhost:3000/users` will trigger the breakpoint and the app will not continue until we tell it to.

The blue line highlights the next line of code to be executed.

There are lots of things we can do now, just take a look at those **Call Stack** & **Scope Variables** windows on the right!

One of the niftiest things to do is to hover over variables that are in scope and drill into their values if they are objects.

Hover over the `req` parameter  and explore it a bit. There are lots of properties in there like `body`, `params` and `query` that you will likely find useful when developing your apps!

Note that you can use the console and access any variables and methods that are within scope.

Continue the code (click on the bluish resume icon), then let's browse to `localhost:3000/users?includeDetail=true`.

When we hit our breakpoint, check the `query` property on the `req` object - sweet!

#### Stepping Through Code

Next to the blue resume button are buttons that allow you to step through, into and out of functions. Try clicking the _Step into next function call_ button.

You're now looking at the `send` function inside of the `response.js` module's source code!

Click the _Step out of current function_ button several times and watch the _Call Stack_ shrink - amazing!

Click the _Resume script execution_ button when you've been dazzled enough...

## Individual Practice - Set Up a New App for Debugging<br><small>(until 5 mins remain)</small>

To get some practice, you're going to set up a new app.

1. Create a new app using the `express` generator.
2. Ensure that you can browse to the Express welcome page.
3. Both `nodemon` and `node-inspector` were installed globally, so you won't have to install them again...
4. Start your app in debug mode (feel free to reference the lesson on how to do this).
5. Experiment as follows:
	1. Set a breakpoint on line 6 of `routes/user.js`.
	2. Browse to `localhost:3000/users`, which should trigger the breakpoint.
	3. What is the `baseUrl` of the `req` object?
	4. What does `this` point to?
	5. Step into the `res.send` method, then...
	6. What is the value of the `body` argument?
	7. Set a breakpoint on the `switch` statement on line 134.
	8. Using your mouse, select/highlight the expression `typeof chunk` then hover over the selection, what is the result of that expression?
	9. Click the "Step over next function call" icon once.
	10. Hover over `this.get` - what line number is the `get` method at?
	11. Click the "Step into next function call" icon - there we are, inside of the `get` method.
	12. Over over the `getHeader` method, note the file it defined in and the line number within the file.
	13. Click the "Step into next function call", there you are, in that file!
	14. Click the "Resume" icon.
	15. Explore on your own!

## Conclusion

- **Why can't you use the Chrome console to debug Node.js code without using `node-inspector`?**

- **If we want to debug our Express app, before browsing to our app, we need to browse where first?**

- **What is middleware?**

- **What is the middleware used to perform server-side logging in an Express app?**


## References

- [Morgan](https://github.com/expressjs/morgan)
- [Nodemon](https://github.com/remy/nodemon)
- [Express](http://expressjs.com/)
