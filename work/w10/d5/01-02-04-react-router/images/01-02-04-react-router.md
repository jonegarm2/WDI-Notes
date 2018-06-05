# React Router Tutorial

**Routing** is the process by which URL's determine what a user sees in a web browser. For example, when we visit the URL `www.example.com/photos/4` we expect to see a web page with a `photo` resource that has an `id` of 4.

I want to be very clear about the difference between **server-side** and **client-side** routing:

* **Server-side routing**: Our web browser makes HTTP requests for HTML pages located on the server based on the current web page's URL
* **Client-side routing**: Our UI is updated based on the URL, but **NO** HTTP request to the server is made to show another view

It should be noted that URL's are an important aspect of a user's web experience because they enable:

* A user to bookmark a page
* A user to share a web page via its URL on a social media site
* A web browser's back and forward functionality

The `react-router-dom` library is a library that allows us to selectively render React components based on the current URL of a web browser.

From the React documentation:

> React Router is a collection of navigational components that compose declaratively with your application.

The term **compose** refers to the fact that we can put components inside components to compose more components. In the example below we are composing `<OuterComponent>` out of `<InnerComponent1 />` and `<InnerComponent2 />`.

```
<OuterComponent>
  <InnerComponent1 />
  <InnerComponent2 />
</OuterComponent>
```

## A Little Bit of History on the Browser History API

The DOM window object provides access to the browser's history through the `history` object. It exposes useful methods and properties that let you move back and forth through the user's history as well as manipulate the contents of the history stack.

To move back through history using the HTML5 History API:

```js
window.history.back()
```

To move forward in history using the HTML5 History API:

```js
window.history.forward()
```

React Router is built on top of the HTML history API.

## The React Router API

*React Router is really just a library that is used to display and hide React components based on the URL of a web page.*

All components that will either be hid or displayed using React Router should be inside a `<Router />` component. This `<Router />` component keeps track of the URL and previous URLs of a user's current session in a `history` object. With `react-router-dom` we call our Router component `<BrowserRouter />`.

**Quiz**: What piece of browser functionality is React Router able to emulate because it keeps track of a web browser's previous URLs?

`<Router />` components only expect a single child component, therefore it is common practice to wrap your application in a container component before passing it to your `<Router />` component.

When building an application using React Router it is useful to create components that will be used to render content that will always be present on the page (e.g., Nav Bar, Side Menu) and different components that will be used to render page specific content (e.g., About Me page, specific user data).

The `<Route />` component is the fundamental component in React Router. Anytime you want to selectively render a component based on a URL you should use a `<Route />` component. A `<Route />` component expects a `path` prop that describes a possible pathname for your application. When we say a route "matches" we mean that the current URL path and the value of the `path` prop are matched up. When a route's path matches, a `match` object with the following properties will be created:

* `url` - the matches part of a URL's pathname
* `path` - routes `path`
* `isExact` - `true` or `false` based on if `path === pathname` (i.e., the path on a web browser's URL) are the *exact* same
* `params` - an object containing values from the pathname

Let's play around with [Route Tester](https://pshrmn.github.io/route-tester/#) to see what a valid path looks like and to explore the match object.

Don't use `<a>` tags with React Router. By default an `<a>` tag submits a `GET` request that will cause the whole page to reload. Use React Router's `<Link />` component to enable linking between pages.

## Let's Route

We will be building a simple application that displays some information a sports team. [Here's](localhost:3000) the finished product.

This application uses four React Router methods:

* `<BrowserRouters />` - a `<Router>` object that uses the hash (`#`) portion of your URL to keep your app in sync
* `<Link />` - creates an anchor tag
* `<Switch />` - renders the first child that matches the location
* `<Route />` - renders UI when a `pathname` matches the routes `path`

## Lab: A Bunch of Beans

We've now seen a basic usage of React Router. It's now your turn to build a simple application using client-side routing.
This will be a simple application with three views. The designs for each view are below.

Things to note about this application:

* The navigational bar should not be re-rendered.
* On the Home view there should be a check box. If this box is *NOT* checked when you try to view a specific bean you should be redirected back to the Home view. If this box is checked you should be able to see data for a specific bean. To create this functionality you should use the `<Redirect />` [component](https://reacttraining.com/react-router/web/api/Redirect) that comes with `react-router-dom`.
* Just like in the Sports app you should create a separate file that will act as your Bean API. Seed this JS object with some bean data and use this data to render views.

Here are the designs:

![show](./images/home.jpg)

![home](./images/all_beans.jpg)

![index](./images/a_beans.jpg)
