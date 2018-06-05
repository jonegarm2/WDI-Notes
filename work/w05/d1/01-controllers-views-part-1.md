This presentation is available at:<br>[https://presentations.generalassemb.ly/c1ad554e549d5dca5807#/1](https://presentations.generalassemb.ly/c1ad554e549d5dca5807#/1)

---

<img src="https://i.imgur.com/4pK7Q5f.png" width="500">

## Controllers & Views in Rails<br><small>Part 1</small>

---

## Learning Objectives

- Explain the Request/Response Cycle in Rails

- Describe What _Convention Over Configuration_ Means

- Create a Rails Controller & Actions (Methods) Within it

- Use Controllers to Pass Data to a View

- Render an Action's Default View

---

## The Rails Request/Response Cycle

---

### What is the Request/Response Cycle?
<br>

- A **Request/Response Cycle** in Rails:
  - **Begins** when a client sends a request to a web server<br>and<br>**Ends** when the user sees the result of the request in the browser.

- Let's take a look at a graphic that will help us visualize these two endpoints, and what happens in between them...

---

<img src="https://i.imgur.com/Qkw1JnR.jpg">

This diagram is gold - let's review it.

---
### Convention Over Configuration
<br>

- **Convention Over Configuration** is a software design methodology that enables developers to write less code.

- _Ruby on Rails_ pioneered this methodology.

---
### Convention Over Configuration (cont)
<br>

- Rails expects our models, controllers and views to be named a certain way and placed in certain folders.

- These **conventions** save Rails developers from writing much of this **configuration** related code, thus making them more productive.

---
### Code Along
<br>

- To see this request/response cycle in action, we're going to code a tiny app that will incorporate the three Rails components involved in the request/response cycle:<br>&nbsp;&nbsp;&nbsp;&nbsp;The **Router**, a **Controller** and a **View**

- We'll work with some models later today.

- The requirement of our tiny app will be to simply display the current time of day.

- Let's go...

---
### Setup

- Get into your code directory. We're not going to use a database or testing in this "time" app, so let's create our app like this:

	```sh
	$ rails new time_of_day -T
	```

- `-T` is a shortcut for the `--skip-test-unit` option. This option tells the `rails new` command **not** to create and configure the default testing framework (reducing the number of generated files).

- This next step is easy to forget:

	```sh
	$ cd time_of_day
	```
	
---

### Setup (cont.)

- The `bundle install` command, that installs the gems listed in the `Gemfile`, was automatically run for us. However, if we ever add/remove gems in the `Gemfile`, we must manually run this command in Terminal ourselves.

- To test that our app is ready for us to start working on, open a new Terminal window (`cmd-t`), and start up the built-in Rails server:

	```sh
	$ rails server
	```

- Browse to `localhost:3000` and you should see...

---

### Setup (cont.)

- Rails' _Welcome Aboard_ page:

	<img src="https://i.imgur.com/Aq1iwk2.png" height="500">

---

### Configure our Route
<br>

- Key Point: Routes connect HTTP requests to the controller actions (methods).

- To configure a route, we must specify these three things:
  - The **HTTP Verb** of the request
  - The **URI Path**  of the request
  - The **Controller** and **Action** you want mapped to the request

---
### Configure our Route (cont.)
<br>

<p style="text-align:left">With this in mind, let's craft our route like this:</p>

```ruby
get '/timeofday', to: 'meaningless#time'
```

- **What's the HTTP Verb and URI path for the above route?**

- **Can we "activate" this route using our browser?  If so, how?**

---
### Configure our Route (cont.)
<br>

```ruby
get '/timeofday', to: 'meaningless#time'
```

- Since we're not working with a **resource** (data entity/model in our database), we can name our router and action method anything we like, just as we have here.<br>**In the above route definition, what Action will be invoked and within what Controller?**

- Cool. Let's put this route in our `config/routes.rb`!

---
### Question - Routing
<br>

- **The purpose of a route is to connect what to what?**

- **Assuming a resource of `animals`, what would be the route in _routes.rb_ for the `show` action**

---
### Controllers - What are they for?

- **Controllers** are the **C** in the **MVC** software design pattern.

- Controllers use **models** to perform CRUD, and provide data as necessary to a **view**. They are the middleman between the **model** and **view**.

- We write code in our controllers to respond to the users' interaction sent to the server via an HTTP request.<br>**We put this code into ______ within the controller?**

- Ultimately, the controller needs to return a response to the user.<br>**How might controllers respond?**

---

### Writing our Controller
<br><br>
<p style="text-align:left">With our route in place, let's browse to `localhost:3000/timeofday` and see what happens...</p>

---

### Writing our Controller (cont.)

- One of the wonderful things about Rails is its helpful error messages! The error message, _uninitialized constant MeaninglessController_, is telling us that it can't find the _MeaninglessController_ - that's because we haven't written it yet!

- First, we need to create a file named `meaningless_controller.rb` inside of the `app/controllers` folder:

	```sh
	$ touch app/controllers/meaningless_controller.rb
	```

- Note the naming convention.

---
### Writing our Controller (cont.)
<br>

- Cool, now we need to code our controller as a class, and make it **inherit** attributes and behavior from the Rails framework's `ApplicationController`:

	```ruby
	class MeaninglessController < ApplicationController
	
	end
	```

- All of the Rails controllers we will write during WDI will inherit from `ApplicationController` and follow the _upper camel case_ naming convention of all Ruby classes.

---
### Writing our Controller (cont.)
<br>

- Refresh and check the next error, which will inform us that _The action 'time' could not be found for MeaninglessController_

- Digging these error messages yet?

---
### Writing our Controller (cont.)
<br>

- Let's stub up that `time` action!

	```ruby
	class MeaninglessController < ApplicationController
	
  		def time
		
  		end
	
	end
	```

---
### Writing our Controller (cont.)
<br>

- Refresh and check the next error, which will look a little more complex.  However, the key is in the first several words: _Missing template meaningless/time_...

- **Template** is another word for **view**. In our case, it's looking for a view file named `time.html[.erb]` in a folder named `meaningless`, which would belong inside the existing `views` folder. Do you see how organized Rails is?

- We'll get into views next, but first...

---

### Questions - Controllers
<br>

- **Controllers can be thought of as the middleman between the __________ and the __________.**

- **A controller is responsible for providing data to the view - True or False?**

- **What are the methods inside of a controller are called?**

- **Ultimately, it's important that the controller do what?**

---
### Views - Convention
<br>

- Let's take another look at our current error message: _Missing template meaningless/time_

- We never even put code in our `time` action, **so obviously controllers try to do what by default?**

---
### Views - Convention (cont.)
<br>

- Yes, Rails controllers, by convention, attempt to render a view that has the same name as the action (`time`) stored within a folder named the same as the controller (`meaningless`).

- **What folder would the `meaningless` folder referenced above live in?**

---
### View Engine
<br>

- Okay, let's get on with it and stub up a minimal view.

- We could write a static HTML file, but we're going to use an `erb` file, which is the file type for Ruby's default _view engine_.

- Think of a _view engine_ as a compiler that will compile a file of text into HTML.

---
### View Engine (cont.)
<br>

- So, what's so special about an `erb` file you ask? Consider what those letters stand for: _embedded ruby_. No kidding, we can **embed** regular Ruby code within an HTML template file!

- We'll see `erb` in action later, but let's stub up our template first...

---
### Create Our Template
<br>

- Okay we are going to create an `erb` template, so our file will need to be named `time.html.erb`. We also know that it needs to go into a `meaningless` folder inside of the `views` folder:

	```sh
	$ mkdir app/views/meaningless
	$ touch app/views/meaningless/time.html.erb
	```

- Now let's put in a piece of HTML inside our `time.html.erb`:

	```html
	<h1>We have Time</h1>
	```
	
---
### The Layout Template
<br>

- Refresh and holy cow Batman, no more errors!

- You may have noticed that we never wrote any _boilerplate_ HTML, just a single `<h1>` tag. Well, the boilerplate is provided by the `views/layouts/application.html.erb` file - check it out!

- Our `time.html.erb` template is being inserted right where you see the `<%= yield %>`! This happens automatically for every template being rendered.

---
### Partial Templates
<br>

- **Partials**, as they are more commonly referred to, allow you to break up your views into more manageable, reusable chunks. Think of them as a way to make your templates more dry.

- They are especially useful for creating forms that are usable for both creating and editing resources.

---
### Rendering Partial Templates
<br>

- To render a partial within another view, you use the `render` method:

	```ruby
	<%= render "posts/form" %>
	```
	Would insert the template with the path of `views/posts/_form.html.erb` (note the underscore in the name of the template file)

- Soon we'll write a bit of code to display the current time, but first some review... 

---

### Questions - Views

- **What is a view engine?**

- **What is the file extension of views used with the default Rails view engine?**

- **What does that extension stand for?**

- **A template that is designed to be rendered within other templates is called a __________.**

- **The name of the above type of template must start with what character?**

- **What method inserts the above type of template within another view?**


---
### Coding the <em><span style="text-transform:lowercase">time</span></em> Action
<br>

- Now, since we can write Ruby inside of an `erb` template, we could do something like this inside our _time.html.erb_:

	```erb
	<h1>We have Time</h1>
	<p><%= Time.now.strftime("%H:%M:%S") %></p>
	```

- Those erb `<%=` and `%>` tags allow us to print the results of any Ruby expression, **anywhere** within our HTML.  Think of the `<%=` tag as the `erb` equivalent of Ruby's `print` method.

- Refresh - not bad. However, more commonly, we will want to render data coming from our controller actions.  Let's see how...

---
### Coding the <em><span style="text-transform:lowercase">time</span></em> Action
<br>

- Here's how we can provide data to a view from the `MeaninglessController`'s `time` action:

	```ruby
	class MeaninglessController < ApplicationController
	
  		def time
    		@current_time = Time.now
  		end
	
	end
	```

- So, the secret sauce is to put data in **instance variables** and those variables will be available in our view automagically!

---
### Tweak the <em><span style="text-transform:lowercase">time.html.erb</span></em> View
<br>

- Now let's refactor the `time.html.erb` view to print out the `@current_time` instance variable coming from the controller:

	```html
	<h1>
  		The current time is: &nbsp;
  		<%= @current_time.strftime("%H:%M:%S") %>
	</h1>
	```

- Refresh - **Great Job!**

---
### Example / Practice
<br>

- Let's say we want to add some functionality to our app - display a list (an array) of houses (each house's info will be stored in a hash).

- When adding functionality, a great place to start with is by defining a new route...

---
### Example / Practice

- First step - create a new route:

	```ruby
	Rails.application.routes.draw do
  	
  		# route to display all homes
  		get '/homes', to: 'homes#index'
  		get '/timeofday', to: 'meaningless#time'
	
	end
	```
- **What are we going to need to do next?**

---
### Example / Practice (cont.)
<br>

- It's up to you to **stub up** the:
	- Controller
	- The action within the controller

- We'll move on in 5 minutes

- **Before we move on, what type of variable are we going to use in our action to hold our data?**

---
### Example / Practice (cont.)

- Now let's put some data in that `index` action:

	```ruby
	class HomesController < ApplicationController
  		def index
    		@homes = [
      			{description: 'Tiny', sf: 325},
      			{description: 'Small', sf: 900},
      			{description: 'Comfortable', sf: 1650},
      			{description: 'Sweet', sf: 3700}
    		]
  		end
	end
	```

- That's all there is to the controller.

- **What do we need now?**

- You have 3 minutes to stub it up.

---
### Example / Practice (cont.)

- Hopefully you now have a `homes/index.html.erb` file inside of the `views` folder.

- Here's a little `erb` for 'ya:

	```html
	<h1>Home List</h1>
	
	<table>
  		<% @homes.each do |home| %>
    		<tr>
      			<td><%= home[:description] %></td>
      			<td><%= home[:sf] %></td>
    		</tr>
  		<% end %>
	</table>
	```

- **What do you see going on here?**

---

### Example / Practice (cont.)
<br>

- **What URL do we have to browse to in order to see our list of homes?**

- Go check it out - how cool is that?!

---

## Summary
<br>

#### Isn't Rails sweet?!?!<br><br>Hang in there!<br><br>You know by now that with some practice, the clouds will part, and when it comes to Rails,<br>usually sooner than your think!

---

## Final Questions
<br>

#### Pair up and take a couple of minutes to nail these:

- **In the Rails request/response cycle, name the three Rails components typically involved in handling the request before a response is returned to the browser.**

- **Assuming a controller#action of `accounts#edit`, what is the full path of the template that will be rendered by default?**

- **Controllers typically provide ______ to a view.**

- **What is the final responsibility of a controller?**

---

## Resources
<br>

- [http://guides.rubyonrails.org/](http://guides.rubyonrails.org/)
