<img src="https://i.imgur.com/fx2orT2.png">

# Intro to SPAs and ReactJS
---

## Learning Objectives

#### Students Will Be Able To:

- Explain the difference between a SPA and a traditional web application
- Explain how client-side routing avoids full-page refreshes
- Explain the use case of React
- Explain the role tooling plays when developing a React app

## Roadmap

- Intro to SPA Architecture
- Intro to React
- Tooling
- Essential Questions

## Intro to SPA Architecture

### Review - What is a Single-Page App?

We've talk about them quite a bit - **what are they?**

<img src="https://i.imgur.com/m01TbLF.png">

In a traditional web app, if we click a link, submitted a form, or type in the address bar and press [enter], **what happens?**

In a SPA, we still want to be able to access different views by clicking links, submitting forms, etc., however, we want the UI to change without triggering a full-page refresh.

There are three main concepts that make this possible:

1. AJAX communication between client and server
2. Client-side routing
3. Client-side rendering

### Concept 1: Client/Server Communication via AJAX

As you've seen, and as some of you have used in your project 3, the `fetch` API and utilities such as jQuery's AJAX methods can be used to send HTTP requests to a server using JavaScript instead of the browser.

The server then responds and we handle this response in JavaScript.

Although the server typically responds to an AJAX request with **____________**, the server can send back whatever it wants. For example, some front-end frameworks, like the original AngularJS, make AJAX requests to fetch "partial" HTML templates and then "inject" them into the current HTML page.

In a React app however, all of the code that generates the app's UI will have been loaded in the browser with _index.html_, so AJAX will be used most commonly to fetch and provide data in JSON format.

### Concept 2: Client-side vs. Server Routing

In a SPA, we want to continue to use the address bar's URL to access the different views and functionality the SPA has to offer. This way you can still bookmark and email URLs that access specific functionality of the app. 

However, as we've seen, when the URL in the address bar is changed, the browser automatically sends an HTTP request to the host, **unless** the address bar's URL is manipulated in one of two ways: by using the browser's **History API** or **Hash URIs**.

Let's take a brief look at these two techniques...

#### Browser History

Using the browser's HTML5 **History API**, our client-side app is able to manipulate the browser's current URL without triggering a server request.

When the browser's history (URL) is changed, likely by the client-side router software, an `onpopstate` event will be triggered.
 
The client router will listen to this event and can then load different "screens" and perform other magic accordingly.

For example, the client router can change the URL to `https://www.domain.com/admin/dashboard` using the **History API**, and the app will switch to the dashboard functionality without triggering a full-page refresh.

This approach works wonderfully when the client router is in charge and is the only thing manipulating the URL in the address bar. However, what about when a user enters a URL manually, or a link external to the app is clicked? These cases require a small bit of configuration on the server - a simple "catch all" route that handles all requests that don't match requests for static assets, api routes, etc. The catch all route will then return the **index** view and all is well.

At the end of the week, you will be introduced to the popular [React Router](https://github.com/ReactTraining/react-router), which uses the **History API** to perform client-side routing.

#### Browser Hash Navigation

The HTML specification includes what is known as **Hash URIs**.

Hash URIs include a "hash" (`#`) in the URI, for example:<br>[https://facebook.github.io/react/docs/react-dom.html#reference](https://facebook.github.io/react/docs/react-dom.html#reference)  

If we browse to the above link, we will see that it takes us directly to the "Reference" section on the page.

Hovering over other titles/sub-titles on the page reveals other links that have their href's set to a value prefaced with a "#", for example:

```html
<a class="hash-link" href="#unmountcomponentatnode">#</a>
```

Notice that when we can click on these links, the address bar changes, but the browser does **not** make an HTTP request.

Even though, the browser is not issuing an HTTP request, it is firing a `onhashchange` event whenever the hash has changed in the URL. Let's check this out by typing the following code in the console and then clicking different hash links on the React documentation page we are currently viewing:

```js
window.onhashchange = function(e) {
    console.log(window.location);
};
```

Hash URIs are bookmark-able. In a traditional website, this is useful for taking us to a specific section on a page. However, in the case of a SPA, it takes us to a specific client-side route - this is called deep-linking.

Many front-end frameworks have taken advantage of Hash URIs to implement client-side routing. However, most have, or are, moving to using the History API-based routing, due mainly to the fact that the URL's are "prettier" without the hash.

### Concept 3: Client-side Rendering

So, assume a user clicks an **Add Comment** button in a SPA...

There is no automatic request sent by the browser to the server, which would have processed the request and sent back a view.

**So, what do you think a SPA might do in response to user interaction instead?**

**Discuss with a pair and be prepared to share your ideas in three minutes.**

What about when a user clicks the **Dashboard** link in the navigation bar?

The current king of client-side rendering today is React...

## Intro to React

### What is React?

- An open-source JavaScript library for building User Interfaces.
- It was open-sourced in May of 2013.
- Created by Jordan Walke, a Facebook engineer.
- Initially used to implement Facebook's newsfeed in 2011 and in Instagram in 2012.
- Now being used by heavy hitters such as Netflix, Imgur, Airbnb, Walmart, and many more.
- A separate library, React Native, can be used to develop native iOS and Android mobile apps.

### When to Use React?

React is arguably the hottest front-end library around for building SPA user interfaces - especially in the Los Angeles area. 

Adoption = Jobs !!!

### React in Action - A Minimal Example

The React team has developed a wonderful CLI for starting a new app. The command will be `create-react-app <app name>` - think of it as `rails new...` or `express ...`.

However, before we use `create-react-app` we will use a most excellent code playground, [CodeSandbox](https://codesandbox.io/) to take a first look at how React works...

#### CodeSandbox Starting React App

Create an account and open a sandbox for React...

In CodeSandbox, we can browse our files in the left-pane, edit code in the center-pane, and see the output on the right.

#### Modern JavaScript

The first thing to take note in CodeSandbox's starting React app is that modern JavaScript is being used.

For example, note the use of `import` at the top of **index.js**.  Similar to how we used `require` in Node, `import` allows us to access the functionality that is exported by other JavaScript files (modules).

Modules were introduced with ES2015 and they're really cool. However, you're probably wondering if they're so cool, why haven't we used them yet. The answer is that their use requires "tooling", or more specifically, "module loader" software - which we will discuss later.

Also, as React developers, we will frequently be using features such as **arrow functions**, `const` & `let`, the **spread operator**, **destructuring assignment**, etc.

Don't be discouraged if the some of this code looks weird to you - just break it down and with some time, it will start looking groovy.

#### How Does this App Work?

In the next section we'll discuss some core concepts of React.

For now, let's briefly go through how this code is resulting in the view we are seeing.

When the app is loaded, here's what happens:

1. Note there's what looks like HTML in our JavaScript! That's called JSX and it's a special syntax that needs to be transpiled into pure JS. All JS files will be transpiled by the tooling.
2. All of the JS modules (files) are then processed and merged into a single JS file by the tooling.
3. The `main: src/index.js` entry in **package.json** specifies the starting point for the module loading and code execution.

Let's briefly read through the code in **index.js** and I'll describe how the view is ultimately being rendered.

#### Key Takeaways

At this point, the takeaway should be that:

- React apps consist of components we code using JavaScript (and it's special syntax known as JSX).
- The line of code that causes all of the components to be rendered is:

	```js
	render(<App />, document.getElementById('root'));
	```
- Rendering a React component, i.e., `<App>`, results in its nested components being rendered as well.

#### Try it Out and Make a Change

Now that you know a little bit about React components, try making some changes to the JSX within the `<App>` or `<Hello>` components, or tweak the `styles` object and see how your changes are realized in the view.

After this morning's intro, you'll get to write a real React app! But first, let's look closer at some of the key concepts of React...

### Key Concepts of React

Let's briefly review some key concepts of React. We'll dig deeper in future lessons.

#### Components

<img src="https://i.imgur.com/TqerRDf.png">

- A React app's UI consists of **components**.
- In React, we build an app's UI by composing built-in and user-defined components.
- React's built-in components are often referred to as **React Elements** and are used to emit in the HTML page DOM actual elements like `<div>`, `<h1>`, etc.
- The components we code are going to be used a lot like HTML tags, for example - check out the diagram above for examples.  While you're there, note how some components have other components nested within them.
- Ultimately, our React components must contain React Elements if we want anything to appear on the page.
- React Elements are often styled and can respond to user interaction.
- Components are created using 100% JavaScript - yes, even the UI. There is no HTML markup in a React component, just something that looks like it...

#### JSX

- Although a React component's UI is ultimately defined by JavaScript, there is a better way to define the UI using a special syntax known as **JSX**.
- The syntax is an XML-based syntax that looks like HTML - as it should since HTML is also based on XML.
- Since our browsers do not understand JSX, it must first be transpiled (converted) into pure JS.

#### State and Props

- Like most web applications, a React component may have **state** (data/information).
- State can only be changed by the component that "owns" that state.
- When a component's state is changed, the **entire** component is re-rendered, including all of its child components.
- A "stateful" component passes any state needed by child components as **props**.
- Props are accessible as key/value pairs on a **props** object. This props object is passed to the component every time it is rendered.
- **Props** in a component are always read-only. **What might cause the property values on props to change?**

#### Rendering

Consider that most **state** is held at or near the top of the component hierarchy. Further, you now know that a component, and all of its children are re-rendered if **any** state changes.

Yeah, there's a ton of rendering happening in a React app, but thanks to React's ingenious design, it's very fast and efficient because:

- First, React renders to an in-memory representation of the DOM, known as the **Virtual DOM**.
- After the rendering is done, React compares the latest Virtual DOM to the previous Virtual DOM and computes only the "difference", known as the **diff**.
- React then updates the browser's actual DOM with the actual changes (the computed **diff**).

	<img src="https://i.imgur.com/LC7wclE.jpg">

## Tooling

### What is Tooling?

Tooling enables the development of complex web applications by automating and enhancing the developer's workflow.

For example...

#### Compiling/Transpiling

Tooling takes our **source code** and processes it to make it production ready.

Take JSX for example. Its special syntax allows us to more easily define components, however, it must first be transpiled into JavaScript so that the browser can execute it.

#### Module Packaging and Loading

Today's complex front-end applications often consist of many components, general purpose modules, third-party libraries, etc. that have _dependencies_ between them.

How do all of these different parts that depend on each other find each other? Tooling of course - in this case a module bundler. A module bundler enables us to export and import functionality similar to what we have been doing in Node.

>Note: ES2015 introduced a module system that uses `import` and `export` statements, however, it does not currently implement a way to actually load those modules - thus it takes tooling to load imported modules.

#### Scaffolding

Setting up a project initially is pretty mundane, thus there are tools that do it for you.

For example, we've been using **express-generator** to set up our Express apps.

[**Yeoman**](http://yeoman.io/) is a general purpose scaffolding tool that has a huge ecosystem of _generators_ for just about any framework or workflow structure you can think of.

#### Developer Services / Task Runners

Tooling can also provide automation of other mundane tasks too.

They can watch for changes to our source code and automatically compile, reload, and refresh the app in the browser.

They can assist with testing.

Just about any task a developer does repeatedly manually, can benefit from tooling.

### Tooling for React

Developing a React app requires tooling because a typical React app is spread across numerous files/modules with dependencies, and JSX needs to be transpiled into JS.

When you need tooling, you have several options. One of the early build tools/task runners to become popular was [**Grunt**](https://gruntjs.com/). However, most developers have found [**Gulp**](http://gulpjs.com/) to be more friendly and faster.

Over time, [**webpack**](https://webpack.github.io/) has become the tool of choice in the React community.

Webpack is a module bundler that figures out dependencies, processes source code and other files, and in the end, provides a single `bundle.js` file to be loaded into the browser.

Configuring webpack can be a challenge due to the shear number of options available, however, a typical **webpack.config.js** file is just a google away. React's [docs regarding configuration](https://webpack.js.org/configuration/) shows lots of options.

Despite how much fun we could have configuring webpack (just kidding), luckily for us the `create-react-app` CLI takes care of setting an ideal React workflow using webpack.

We will be using `create-react-app` to start all React apps in WDI from this point forward.

## Essential Questions

- **What three key concepts enable single-page apps?**

- **What two approaches enable a client-side router to avoid full-page refreshes?**

- **In your own words, explain the role tooling plays when developing a React app.**

## References

[React Docs](https://facebook.github.io/react/)


