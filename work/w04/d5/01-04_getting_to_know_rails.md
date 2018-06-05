<img src="https://i.imgur.com/4pK7Q5f.png">

# Getting to Know Rails

## Learning Objectives

By the end of this walk-through: 
  
 * Explain the use case of Rails 
 * Create a new Rails app 
 * Describe how Rails uses MVC to organize code 
 * Generate a Model 
 * Define RESTful routes 
 * Generate a controller 
 * Create a basic view using ERB templates
 * Perform basic CRUD in a Rails app 
 * Use the [Rails Guides](http://guides.rubyonrails.org/) as a source of information 

## Intro

Finally, the day has come when we're going to experience the power of Rails first hand!

### What's Rails?

**Ruby on Rails** (RoR), or simply "rails", is an open-source, server-side web application framework written in Ruby.

It was created around 2004 by David Heinemeier Hansson (DHH) while working on the project management tool [Basecamp](https://basecamp.com/).

As developers, we use *web application frameworks* such as Rails to create robust web applications quickly.

The web applications we develop run on web servers and basically respond to requests from clients. 

**What clients are we talking about here?** Web browsers!

Rails is designed to be extremely productive - **what does being productive mean to you as a developer?**

Most web applications need to manipulate and display data - and Rails has been the go to framework for building data-centric (CRUD) web apps.

### What Makes Rails so Productive?

Rails leverages several software development principles and technologies that help developers organize code and do more with less of it:

- **Model-View-Controller (MVC)**:<br>
	Rails applies the battle-tested MVC pattern, originally used to develop user interface software, to the server-side. In doing so, the code in a Rails app is highly organized - **you always know where each piece of code should live**.
	
- **Convention Over Configuration (CoC)**:<br>
	DHH pioneered the principle of _convention over configuration_ with Rails. Thanks to CoC, a developer can rely on several "conventions", or "rules", and therefore does not have to write as much code.<br><br>For example, based on how we name a model, Rails will, by convention, know the name of the table in the database used to store the data for the model (resource), the name of the controller where we write our program logic, the name of folder where the views for the resource are placed, etc.<br><br>Thanks to CoC, we can get down to the business of writing code that pertains to the problem we are trying to solve, code that is unique to our app, instead of writing mundane boilerplate code that wires stuff up.
	
- **ActiveRecord (AR)**<br>
	**ActiveRecord** is a piece of software known as an **Object Relational Mapper** (ORM). This powerful software enables us to easily perform CRUD on a database using 100% object-oriented Ruby code instead of having to deal with SQL. Basically, ActiveRecord rocks!
	
### Model-View-Controller (MVC)

Rails is organized around the Model-View-Controller (MVC) software design pattern.

- **Models:** (from the Rails docs): "A model represents the information (data) of the application and the rules to manipulate and interact with that data. In the case of Rails, models are primarily used for managing the rules of interaction with a corresponding database table. In most cases, *one table* in your database will correspond to *one model* in your application. The bulk of your application's business logic will be concentrated in the models."

- **Views:** (from the Rails docs): "Views represent the user interface of your application. In Rails, views are often HTML files with embedded Ruby code that performs tasks related *solely to the presentation of the data*."

- **Controllers:** (from the Rails docs): "Controllers provide the 'glue' between models and views. In Rails, controllers are responsible for processing the incoming requests from the web browser, interrogating the models for data, and passing that data on to the views for presentation."

### Request/Response Flow in Rails

<img src="https://i.imgur.com/yeBjXTa.jpg" width="900">

### Review Questions

- **Explain the use case of Rails.**

- **Where does a Rails application execute?**

- **What are the responsibilities of models?**

- **What are the responsibilities of views?**

- **What are the responsibilities of controllers?**

## Let's Do This!

### How are we Going to Learn Rails in WDI?

It would be difficult to teach Rails without first seeing how the parts fit together to create full-blown web applications.

After witnessing the power and productivity of Rails (some call it magic), we'll look at some of the individual components, i.e., routes, models, views & controllers within the app.

As always, questions are encouraged!

Finally, next week, we will go deeper into the concepts and put in the repetition and time necessary to learn this stuff.

## Discovery

First, we are going to use some of Rails **generators** to quickly build a functioning app.

Here's what we'll do:

- Create a Rails app using the `rails new` command
- Start the Rails server
- Generate a **scaffold** for a model
- Review the structure of the app
- Update the database schema with migrations

#### Create a Rails app using the `rails new` command

All Rails apps start by entering this command in Terminal: `rails new <name_of_app> <options>`

Running the command will create a new directory named whatever you typed in the place of `<name_of_app>`.

Now let's create our Rails discovery app:

1. `rails new discovery_app -d postgresql -T`

    This command will create a new Rails app called `discovery_app`.
    
    We use the `-T` or `--skip-test-unit` flag because we wont' be using Rails' built-in testing tools for this application.
    
    The `-d` is a shortcut for the `--database=` option and we're telling Rails that we want to use PostgreSQL as our Relational Database Management System (RDBMS). If we don't specify `-d postgresql`, the app will be configured to use SQLite instead. However, SQLite is not a database system that is [suitable](https://devcenter.heroku.com/articles/sqlite3) for being deployed via Heroku. 

2. `$ cd discovery_app`

    When we ran the `rails new` command in step one, it created a new directory called `discovery_app`, it's where our application lives. Be sure to `cd` into it.

3. `$ code .` to open our app in VS Code.

#### Starting the Rails server

Remember, Rails apps run on a web server.

In order to run our app during development on our computer, Rails provides a built-in web server.

We will want to start the server in a **separate** Terminal session (window or tab - press `cmd`+`tab`in Terminal) so that we can continue entering other commands during development.

Here's the command to start Rails' server: `$ rails s`

`rails s` is a shortcut for `rails server`.

The Rails server is listening on `localhost:3000`, so let's type this in your browser's address bar and...

We'll get our first look at Rails' **amazingly helpful error messages**!

#### Rails Error Messages

Rails was designed to provide the developer with helpful error messages.

>Reminder: Developers do not fear error messages. They are a big part in the everyday life of developers. 

This particular error message states **_FATAL: database "discovery_app_development" does not exist_**


Let's fire up `psql` and take a look at what databases we see using the `\l` command. 

We fix this error by creating the database with this command: `rails db:create`

Let's fire up `psql` *again* and take a look at what databases we see using the `\l` command. 

It's a good habit to run the `rails db:create` command immediately after you `cd` into a new Rails app.

Refresh the page in the browser and be greeted with:

<img src="https://i.imgur.com/Aq1iwk2.png" width="600">

In case you didn't notice, we did not have to restart the Rails server.  In most cases, the server will restart itself as necessary.

#### Generate a _scaffold_ for a model

Rails has the ability to automatically "scaffold", or "build", the controller and views for a specified model.

The generated code provides full CRUD functionality for a given _resource_ (model).

**Scaffolding is to be used only for educational purposes!**

**Promise, never ever to scaffold any of the code in any of your apps!**

Let's create a scaffold for a **Course** model:

`rails g scaffold Course course_name room:integer challenging:boolean`

The `g` is a shortcut for `generate`.

`Course` is the name of the model.

The name of the model is followed by a list of attributes for the model.  Note that the default type for an attribute is `string` - that's why we didn't specify a type for `course_name`, but we could have like this: `course_name:string`.

This created a table in our database named `courses` with the following schema: 

| courses Table          |
|------------------------|
| id (Integer)           |
| course_name (String)   |
| room (Integer)         |
| challenging (Boolean)  |
| created_at (Timestamp) |
| updated_at (Timestamp) |

#### Review the structure of a Rails app

Now that we have generated a model with its controller and views, let's take a look how a Rails app is organized.

`$ code .`

As discussed earlier, a Rails app is based on the MVC design pattern.

Most of the code we write will live in the `app` folder.

After we're done looking around, let's refresh our app and - another error message :)

#### Update the database schema with migrations

Whenever we create a new model, the database's schema will need to be updated to persist the data for that model.

Luckily, we won't need to write and execute the SQL ourselves necessary to update our schema thanks to Rails' **migrations**.

When the `Course` model was generated, a migration file was created as well.  You will find it in the `db/migrate` folder.

We will learn more about migrations in a future lesson, for now, let's just fix our error by "running" our migration:

`$ rails db:migrate`

A quick refresh of the page will reveal that the error has been fixed.

#### Try out the app!

Rails apps are driven by REST!

In Rails, the URL used to display the view that lists all of _resource_ on _localhost:3000_ is: `localhost:3000/resource`

So, let's checkout our _courses_ resource at: `localhost:3000/courses`

We refer to the _action_ and _view_ that shows all of a resource as its `index` - more on this later.

No data in there yet - let's use the _New Course_ link to add a couple of courses!

Finally, try editing, deleting, and showing a single _course_.

Note how the URL changes as we use the app? **What pattern are we seeing?** 

Before we move on to starting a new Rails app from scratch - **are there any questions?**

## Our First Rails App From Scratch

Now that you've seen the "magic", let's start over and make our first Rails app from scratch!

Time permitting, here's all of the things we'll do:

##### Create the Application and Model
* Create the application using `rails new`
* Create a model

##### Display _All_ Model Data
* Create an `index` route
* Create a controller
* Seed data
* Create the `index` action
* Create the `index` view
* Define a `root` route

##### Display a _Single_ Model
* Create a `show` route
* Create the `show` action
* Create the `show` view

##### Add Navigation Links

##### Add _New_ Model Data
* Create a `new` route
* Create the `new` action
* Create the `new` template
* Create the `create` route
* Create the `create` action

##### Delete (_Destroy_) Model Data
* Create a `destroy` route
* Create the `destroy` action

##### _Edit_ Model Data
* Create a `edit` route
* Create the `edit` action
* Create the `edit` template
* Create the `update` route
* Create the `update` action

### Create the Application and Model

Stop the Rails server for the _discovery\_app_ with `ctrl`+`c`.

Now move out of the scaffolded app's folder: `$ cd ..`

Now let's do another app - sans scaffold...

#### Create the app

- `$ rails new coffeeshop -T -d postgresql`

**What's the -T for?**

- `$ cd coffeeshop`

**What should we do after we `cd` into a new Rails app?**

Cool, let's fire up the server in a new Terminal tab - **what's the command?**

Open the app in the browser **with what URL?**

#### Create a model

A Coffee Shop might have `Bean` model - let's give it one:

1. `$ rails g model Bean name roast origin quantity:float`

    - The **rails g model** part of the command will generate a new model for us.
    * The first word after **rails g model** is the name of our model (in this case, `Bean`).  **Model names are ALWAYS singular in Rails.**
    * All the subsequent words in this command will be names of our model attributes.  The default data type for these attributes is `string`.  If you want to use a different data type, you specify that as follows: "**name:type**".  See how we specified "**quantity:float**" above.

2. We can see that, in addition to creating a new file called `app/models/bean.rb`, Rails also created a new migration file for us.

3. Let's run that migration: `$ rails db:migrate`. Remember that migrations modify our database schema in some way.

4. Now let's take a peek at the `app/models/bean.rb` file that represents our `Bean` model class. It will look something like this:

    ```ruby
	class Bean < ApplicationRecord
	end
    ```

We see that the `Bean` model class inherits from `ApplicationRecord`, which all models will.

>Note: Prior to Rails 5, models inherited from `ActiveRecord::Base`

Despite there not being any code within the class, our `Bean` model has lots and lots of functionality thanks to the power of inheritance.

Interestingly though, there's no information about which attributes our `Bean` model has! To see our attributes, we need to take a look at the `db/schema.rb` file.

`schema.rb` is the single-source of truth regarding the structure of our database, which tables it has, etc.

**Never modify** `schema.rb` manually!  **Bit if we don't modify it ourselves, how did it get updated?**

We will learn more about the details of models next week.

### REST in Rails Review

A Rails app heavily follows the REST methodology.

As we proceed today, we will be implementing features according to this table:

| HTTP Verb | Path/URI  | Rails controller#action | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    GET    |  /beans          |   beans#index    |  index.html.erb | List all beans |
|    GET    |  /beans/:id      |   beans#show     |  show.html.erb  | Show a single bean | 
|    GET    |  /beans/new      |   beans#new      |  new.html.erb   | Provide form for<br>submitting new bean<br>to the create action |
|    POST   |  /beans          |   beans#create   |  no default     | Create a new bean,<br>then redirect to ? |
|    GET    |  /beans/:id/edit |   beans#edit     |  edit.html.erb  | Provide form for<br>editing a bean<br>and sending to the<br>update action |
|    PUT    |  /beans/:id      |   beans#update   |  no default     | Update a bean,<br>then redirect to ? |
|    PATCH  |  /beans/:id      |   beans#update   |  no default     | Same as PUT |
|    DELETE |  /beans/:id      |   beans#destroy  |  no default     | Delete a bean,<br>then redirect to ? |

### Display _All_ Model Data

First up is the `index` functionality:

| HTTP Verb | Path/URI  | Rails controller#action | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    GET    |  /beans          |   beans#index    |  index.html.erb | List all beans |

#### Create an `index` route

**Routes map an HTTP request to code in our Rails app!**

If we want code to run when the server receives a request, we must have a route defined that matches the request (_HTTP Verb_ and _URI_) with the _controller_ and _action_ (commonly denoted as _controller#action_) to run.

Later we will let Rails generate routes for us, but we need to do it ourselves at first so that we know what's up!

According to the chart, we need to create a route that maps a `GET /beans` request to `beans#index` (controller#action).

In Rails, all routes are defined in the `config/routes.rb` file.

Let's define our first route:

```ruby
Rails.application.routes.draw do
  
	get 'beans', to: 'beans#index'
	
	# get 'beans' => 'beans#index' (older syntax)

end
```

As you can see, we specify the _HTTP Verb_ and the _path_, then a comma, followed by an _implicit hash_ of `to: 'beans#index'`.  An implicit hash is when we have key/value pairs without the curly braces.

Now, a `GET` HTTP request to `/beans` will run the code in the `index` action/method within the controller (_app/controllers/bean\_controller.rb_).

Before we move on to creating that controller, let me show you a helpful command that we will use regularly when developing in Rails:

`$ rails routes`

The above command will list all of the active route definitions.

The list is mostly self-explanatory, however, the first column, `prefix` refers to a "helper" path that Rails creates so that we don't have to hard-code our URI/paths. For example, in our code and views, we can now use the `beans_path` helper method to help us generate links, etc.

>Note: In the route listing, the helper will be shown without the `_path` extension. For example, the prefix `bean` actually refers to the `bean_path` helper method. 

Time to create that controller!

#### Create a controller

Controllers are where we will write the vast majority of our Ruby.

**What's the responsibility of controllers?**

We can easily create controller files manually, however, we're going to generate this first controller:

`$ rails g controller beans`

Note we are using the plural "beans" *NOT* the singular "bean" which is required by convention.

Looking at the output in Terminal, we'll see that an `app/controllers/beans_controller.rb` file has been created along with some other things, including a folder named `app/views/beans` where we will keep all of the views pertaining to the _beans_ resource.

Note the naming convention for controller files, `beans_controller.rb`, in this case. It will always be named as the _resource_, i.e., the pluralized version of the model.

In Rails, each model commonly has one controller dedicated to holding controller code pertaining to that model.

#### Seed data

In your apps, you will often want to "seed" data, i.e., provide some initial data so that your app has something to work with.

In a real app, it is quite common to seed an instance of a _User_ model that has administrator or super-user privileges.

We want to be able to see our `index` view do it's thing pronto, so we will create a couple of _beans_.

Of course, Rails has already created a file for this purpose - let's open the `db/seeds.rb` file.

The comments in this file can be a helpful, but they fail to mention an important task - removing all existing data first, so that no duplicate data will be created.

Consider seeding your database as **initializing** it - and remember that all existing data will be lost!

Here's the code to remove all _beans_ and then create two of them:

```ruby
Bean.destroy_all

beans = Bean.create([
    {name: "Jim's Jittery Java", roast: "Medium", origin: "Bogota, Colombia", quantity: 50.25},
    {name: "Jon's Coldest of Brews", roast: "Mind Bending", origin: "Lagos, Nigeria", quantity: 101}
])
```

After briefly reviewing the code, this is the command to seed our database:

`$ rails db:seed`

If the command finished silently, it was successful.

#### Create the `index` action

The `index` route is mapped to the `index` action (method) in the controller.

It will be the responsibility of this action to provide all of the _beans_ to the view.

One line of code within an `index` method is all it takes:

```ruby
class BeansController < ApplicationController

  def index
    @beans = Bean.all
  end

end
```

**Instance variables will automatically become available for use with the rendered view.**

In this case, `@beans` will hold an array of all of the _beans_ in the database fetched by `Bean.all`.

`Bean`, is our model class and you can see that it has an `all` method to return all _beans_.

#### Create the `index` view

Rails views use a templating language known as **_ERB_** - embedded Ruby.

FYI, it's "legit" to refer to a view as a template.

Thanks to the conventions in Rails, the controller will look to automatically render a view:

- Named the same as the _action_, appended with the file extension of `.html.erb`

- That lives in a folder named the same as the _resource_ that's nested within the `app` folder.

Therefore, we will need to create this file (feel free to use VS Code to create the file):

`$ touch app/views/beans/index.html.erb`

The following code will use that `@beans` variable (an array) and iterate over it and "stamp out" HTML to display each bean:

```html
<h1>Today's Beans</h1>

<ul>
    <% @beans.each do |bean| %>
        <li>
            <strong><%= bean.name %></strong> - <%= bean.roast %>
        </li>
    <% end %>
</ul>
```

Notice the _ERB_ tags in this code (`<% ... %>` and `<%= ... %>`). The equal sign denotes that the contents should be evaluated and then displayed in the view, while the absence of an equal sign means that the content should only be evaluated but not be displayed in the view.

To help you remember this, Jim and I will often refer to the ERB tags as **squids** and **squids with ink**.

Let's browse to `localhost:3000/beans` and check out our seeded beans.

It's not too pretty, but it's functional :)

If we were to inspect the HTML delivered to the browser, we'd see that there's HTML in there that we didn't put in our `index.html.erb` - where's it coming from?

I'm sure you noticed the `views/layouts` folder next to our `views/beans` - looking inside of it, you'll find a file named `application.html.erb`.

Each template by default is rendered "inside" of this template where the `<%= yield %>` is.

>The _application.html.erb_ layout template is the key place to put things that you want in every view - things like navigation, footers, etc.

#### Define a `root` route

If a user comes to our app, will they know that they have to enter something like `localhost:3000/beans` in the address bar?  If they don't, they'll be greeted by Rails' welcome page - definitely not what we want.

Luckily the solution is to define a `root` route.

The _root_ of an application is typically what we expect to see if we don't enter anything after the hostname.

Here's how we define a root route in Rails:

```ruby
# inside of routes.rb
Rails.application.routes.draw do
  
  root to: "beans#index"
  
  get 'beans', to: 'beans#index'
	
end
```

The root route definition maps to the **controller#action** we want to run anytime the user browses to `http://localhost:3000/`.

It's customary to list the _root_ as the first route definition.

With our root route defined, try browsing to `localhost:3000`

Sweet!

Congrats!  Our `index` functionality has been implemented!

We will continue to build out the remaining functionality as we just did with `index`, with the following workflow...

##### Model -> Routes -> Controller -> View Workflow

The workflow we just followed is pretty typical:

- Once we have a model, the only way code can run is if there's a route defined that maps to it, so we would define a route next if necessary.

- Then, the route is going to look to run the code in the mapped _controller#action_ - so we write that next.

- Finally, the _controller#action_ will then look to render a view and return it to the client - so finally, we write the view.

### Display a _Single_ Model

Next we're going to focus on displaying a _single_ resource - this is known as the `show` action:

| HTTP Verb | Path/URI  | Rails controller#action | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    GET    |  /beans/:id      |   beans#show     |  show.html.erb  | Show a single bean | 

#### Create a `show` route

The `show` functionality typically is used to display the details of a single resource.

**What route would we need to define?**

**What controller and action should it map to?**

Let's add it below the others:

```ruby
get 'beans/:id, to: 'beans#show'
```

If we run `$ rails routes` to check our routes, we'll see that Rails did not automatically provide a named helper for our new route.

We can use the `:as` option to provide one.  Update the route as follows:

```ruby
get 'beans/:id, to: 'beans#show', as: :bean
```

`rails routes` again - that's better.

We'll see later how these named helpers can be handy.

Now that we have a route defined for the `show` functionality, and it happens to be a `GET` request, let's browse to `localhost:3000/beans/1` and see what happens.

>Note: You can never depend on ids existing like this.  If we were to `rails db:seed` again, we would not have an id of 1 anymore.

##### Slight detour - using Rails Console

So, we've used IRB/Pry to work with Ruby. Rails includes a nice console tool we can use to work with the classes in our Rails app, including our models.

In another tab: `$ rails c`

`rails c` is short for `rails console`

We can now see what `Bean` records we have by typing:

`$ Bean.all`

Or the first _bean_ with `$ Bean.first`

##### Okay, back to the "show"...

We should see another helpful Rails error: _The action 'show' could not be found for BeansController_

Can't find the `show` action?  Let's create it...

#### Create the `show` action

We will define the `show` action in our controller like this:

```ruby
def show
  @bean = Bean.find(params[:id])
end
```

Because this controller action will be responsible for retrieving a single record, our instance variable, `@bean`, is singular this time.

`find` is a method available on our Bean model class that takes in a single parameter.  In this case, we will be giving it the _id_ of a bean.

That _id_ can be found in the `params` hash. This hash is always available in our actions.

Let's `puts` out `params` from within the action and see what it looks like.

```ruby
puts "Params hash look like this: #{params.to_s}"
```

**Why does `params` have an `id` key in it and where did it get the name of _id_ from?**

Okay, we have the action done, refresh for the next error please...

#### Create the `show` view

Now that we have a route and action for the `show` functionality, let's build a view template so that we can actually see a specific _bean_ in our browser.

Again, the name of the view template file is the name of the _action_, plus **what extension?**

**What folder are we putting it in?**

Remember, the `show` controller action is returning a single Bean object, which we assigned to the `@bean` instance variable.

`@bean`, because it is an instance variable in a controller, can be used to display its attributes in the view as follows:

```html
<h1><%= @bean.name %></h1>

<p>This coffee is a <%= @bean.roast %> roast from <%= @bean.origin %>, and we have <%= @bean.quantity %> pounds available.</p>

<%= link_to "Back to the list!", beans_path %>
```

We are using a `link_to` helper to generate an `<a>` element that will send a user back to the **index** view. We provided two arguments to the helper method, the text for the link, and the `beans_path` named route helper.

Refresh the browser and use DevTools to check out what the HTML that was generated.

### Add Navigation Links

As it stands currently, our `index` view does not allow us to click on a _bean_ in the list to view its details (the `show` view).

Let's use the `link_to` helper in `index.html.erb` to make this happen:

```html
<h1>Today's Beans</h1>

<ul>
  <% @beans.each do |bean| %>
    <li>
      <strong> <%= link_to bean.name, bean_path(bean) %> </strong> - <%= bean.roast %>
    </li>
  <% end %>
</ul>
```

We're of course using the `bean.name` as the text for the link.

Also, the `bean_path` helper, in order to write out the correct URI for a given _bean_, must be provided a _bean_ instance, or an _id_.  Here we are just giving it the _bean_ instance in the current `each` iteration and the helper does the rest!

Refresh and check it out!

### Add _New_ Model Data

| HTTP Verb | Path/URI  | Rails controller#action | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    GET    |  /beans/new      |   beans#new      |  new.html.erb   | Provide form for<br>submitting new bean<br>to the create action |
|    POST   |  /beans          |   beans#create   |  no default     | Create a new bean,<br>then redirect to ? |

It takes two requests to create a new resource:

1. A GET request has to be made to retrieve a form for the new resource.  This is the `new` action.

2. A POST request is made to send the form data to the `create` action.

Thus, `new` and `create` are good friends.

>Note: We won't always want to show a form on its own via a `new` action. We may choose instead to "embed" a form within the _show_ view of a parent resource. For example, the `show` page for a _blog\_post_ may list its comments and prefer to have a form to create a new comment on that page instead of it's own page.

#### Create a `new` route

Back to our `routes.rb` file!

We need a route that maps to `beans#new`.

What **HTTP Verb** and **URI Endpoint** will it have?

**IMPORTANT:** An incoming request is matched by the router's definitions from top to bottom. Because of this, we must put our `new` route **before** the route for our `show` route. **Can you figure out why?**

After you've added it, run `rails routes` to check it out - hey there's a named route helper too!

**It would be nice to have a link to this `new` route - can you do it?  How about putting it on the _application.html.erb_ view so that it shows on every page? Try it - you can't break anything, there's nothing to be afraid of :)**

#### Create the `new` action

It is the `new` action's responsibility to provide an _empty_ model instance to the view (we'll see why in a bit).  Here's the code:

```ruby
def new
  @bean = Bean.new
end
```

`Bean.new` returns an empty new instance of a _bean_. This object has not been saved to the database.

#### Create the `new` template

The `new` action by default wants to render a `new.html.erb` view template.

Similar to what we've been doing so far, let's create the `new.html.erb` file in the `app/views/beans` folder.

Generally, we will want to return a form that allows the user to enter a new _bean_ record.  

Here's how we'll build out our form:

```html
<h1>Add a new bean!</h1>

<%= form_for @bean do |f| %>
  <div>
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>
  <div>
    <%= f.label :roast %>
    <%= f.text_field :roast %>
  </div>
  <div>
    <%= f.label :origin %>
    <%= f.text_field :origin %>
  </div>
  <div>
    <%= f.label :quantity %>
    <%= f.text_field :quantity %>
  </div>
  <%= f.submit "Add New Bean!" %>
<% end %>

<%= link_to "Back to the list!", beans_path %>
```

Due to Rails' security mechanism, it's important to use its form helpers to generate forms. A form written "by hand" will not work in Rails.

The `form_for` helper method generates a `<form>` element for the provided instance variable (`@bean`).

Rails will inspect `@bean` and will know that this bean is not from the database and will therefore, generate the correct method and _form action_ (not to be confused with our controller actions).

We will be looking closer at forms in Rails in a future lesson.

It's definitely worth inspecting the HTML generated - so let's do it.

Note where the form is going to be posted.  That's the RESTful route for the `create` action...

#### Create the `create` route

You know what route we need for the `create` action - **do you need help with it?**

After the route has been added, `rails routes` and check it out.  Note that we will be able to use the _bean\_path_ named route helper since the URI is the same as for `show` - path helpers only pertain to the URI, they have nothing to do with HTTP verbs.

#### Create the `create` action

Time to provide the missing friend of `new` - the `create` action.

The `create` action is responsible for taking the data out of the `params` hash, putting it in a new model, and saving it to the database.

There are a couple of different ways to do this, here's one way:

```ruby
def create
  @bean = Bean.new(params.require(:bean).permit(:name, :roast, :origin, :quantity))

  if @bean.save
    redirect_to beans_path
  else
    render :new
  end
end
```

- Let's break down the first line:

    ```ruby
    @bean = Bean.new(params.require(:bean).permit(:name, :roast, :origin, :quantity))
    ```

    We're creating a new `Bean` object, so we're going to `require` the bean key in our `params` hash and `permit` the fields for which we created input elements in the `form_for` of our _new.html.erb_.
    
    The use of `require` and `permit` is another built-in security mechanism called _strong parameters_.

- Next, let's break down the conditional:

    ```ruby
    if @bean.save
      redirect_to beans_path
    ```

    If our new record saves to the database successfully, we'll **redirect** to the **index** view (the `beans_path` in this example), where we should see that our new record has been added to the list.
    
    >A `redirect` sends a response back to the server with a status code of `302 Found` and includes a path that the browser will use to immediately issue a new request. So a redirect "starts" over, the request will flow through the router, etc.  However, a `render` simply renders a view and returns it as the response. 
    
    Referring to the RESTful Routing in Rails table, we'll see that the `create` action does not have a default view associated with it. You can render any view you want - maybe you want to go to the `show` view for the newly created resource - the choice is yours. 

    ```ruby
    else
      render :new
    end
    ```

    If our new record doesn't save for any number of reasons, such as when a validation rule fails, etc., we'll **render** the form again so the user may re-attempt the submit.  This time, the `@bean` variable will have its existing data rendered in the form :)

### Delete (_Destroy_) Model Data

| HTTP Verb | Path/URI  | Rails controller#action | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    DELETE |  /beans/:id      |   beans#destroy  |  no default     | Delete a bean,<br>then redirect to ? |

The `destroy` action allows us to delete a resource record from the database.

However, the HTTP verb for Rails' destroy is **DELETE**.

#### Create a `destroy` route

You're probably getting tired by now, so I'll throw you a bone:

```ruby
delete 'beans/:id', to: 'beans#destroy'
```

#### Create the `destroy` action

We will define the **destroy** action in our controller like this:

```ruby
def destroy
  @bean = Bean.find(params[:id])
  @bean.destroy
  redirect_to beans_path
end
```

**What's going on in the above code?**

#### Sending a `delete` request from a page

We obviously have to be able to issue the RESTful request to destroy a resource from the web application.

A popular approach in Rails is to render a link using the `link_to` helper with some extra arguments like this:

```html
<%= link_to "Delete this bean!", bean_path(@bean), method: :delete, data: { confirm: "Are you sure you want to delete this bean?"} %>
```

Using the above code, let's modify our _show.html.erb_ to add a delete link for the displayed bean.

Use DevTools to inspect the way Rails is going to inform the server that it wants to make a `delete` request instead of the `get` initially being sent by the link.

### _Edit_ Model Data

| HTTP Verb | Path/URI  | Rails controller#action | Default View    | Purpose |
|-----------|------------------|------------------|-----------------|-----------------|
|    GET    |  /beans/:id/edit |   beans#edit     |  edit.html.erb  | Provide form for<br>editing a bean<br>and sending to the<br>update action |
|    PUT    |  /beans/:id      |   beans#update   |  no default     | Update a bean,<br>then redirect to ? |
|    PATCH  |  /beans/:id      |   beans#update   |  no default     | Same as PUT |

Just like `new` & `create`, the `edit` & `update` actions are good friends too!

It takes two requests to update an existing resource:

1. A GET request has to be made to retrieve a form with the existing resource's data filled in, ready to be edited. This is the `edit` action.

2. An PATCH request (via Rails magic) is made to send the form data to the `update` action.

#### Create an `edit` route

The `edit` route is another one of those non-RESTful Rails routes: 

```ruby
get 'beans/:id/edit', to: 'beans#edit', as: :edit_bean
```

Yeah, we need to provide the name for the path helper this time.

We're going to need links to edit our beans! This time, we'll put them in the _index.html.erb_ template:

```html
<h1>Today's Beans</h1>

<ul>
  <% @beans.each do |bean| %>
    <li>
      <strong> <%= link_to bean.name, bean_path(bean) %> </strong> - <%= bean.roast %> 
      | <%= link_to "Edit this bean!", edit_bean_path(bean) %>
    </li>
  <% end %>
</ul>
```

#### Create the `edit` action

We will define the `edit` action in our controller like this:

```ruby
def edit
  @bean = Bean.find(params[:id])
end
```

The `edit` action is responsible for retrieving a single resource (the one the user wants to edit), and assigning it to an instance variable (`@bean`) for the `form_for` in the _edit_ view.

#### Create the `edit` template

The form generated in the `edit` template typically looks identical to the form in the `new` template.

This is because the logic built into the `form_for` helper will ensure the `<form>` tag is generated correctly for either scenario.

Next week, we will see how to use _partial forms_ to DRY up our code.  Until then, we'll just put duplicate code in the _edit.html.erb_ file (create it first, of course):

```html
<h1>Edit the <%= @bean.name %> Bean</h1>

<%= form_for @bean do |f| %>
  <div>
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>
  <div>
    <%= f.label :roast %>
    <%= f.text_field :roast %>
  </div>
  <div>
    <%= f.label :origin %>
    <%= f.text_field :origin %>
  </div>
  <div>
    <%= f.label :quantity %>
    <%= f.text_field :quantity %>
  </div>
  <%= f.submit "Update Bean!" %>
<% end %>

<%= link_to "Back to the list!", beans_path %>
```

We pretty much just updated the header and text in the submit button.

#### Create the `update` route

**You've got this one (I mean two)!**

Hint: Be sure to include both HTTP verbs that can be used to update a resource.

#### Create the `update` action

This time we're going to provide the missing friend of `edit` - the `update` action.

The `update` action is responsible for:

- Fetching from the database the resource to be updated.

- Updating its attributes with the data in the `params` hash - **where did `params` get the data from?**

- Saving the resource to the database.

- Redirecting to a view (usually _show.html.erb_).

Here's one way:

```ruby
def update
  @bean = Bean.find(params[:id])

  if @bean.update_attributes(params.require(:bean).permit(:name, :roast, :origin, :quantity))
    redirect_to beans_path
  else
    render :edit
  end
end
```

Model instances have the handy `update_attributes` method that automatically updates and saves the resource to the database.

The rest of the code should look somewhat familiar.

Let's DRY up that strong parameter code...

### Refactoring our controller

If you think you saw some ugly duplication going on in our controller, you are correct! Our `create` and `update` actions use the same bit of code for the _strong parameters_.

We can DRY that up by extracting that duplication into a private method at the bottom of _beans\_controller.rb_:

```ruby
private

  def bean_params
    params.require(:bean).permit(:name, :roast, :origin, :quantity)
  end
```

Now that we have this code extracted into a private method, we can refactor our `create` and `update` actions to make use of it:

```ruby
  def create
    @bean = Bean.new(bean_params)

    if @bean.save
      redirect_to beans_path
    else
      render :new
    end
  end
```

and...

```ruby
  def update
    @bean = Bean.find(params[:id])

    if @bean.update_attributes(bean_params)
      redirect_to beans_path
    else
      render :edit
    end
  end
```

#### Give yourself a hand!

##### Next week's lessons and practice will be sure to fill in the details and help this stuff stick!
