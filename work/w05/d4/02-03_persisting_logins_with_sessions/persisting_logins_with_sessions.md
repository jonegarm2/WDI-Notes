![](https://i.imgur.com/wKAzwmn.jpg)

# Persisting Logins with Sessions

---

## Learning Objectives
*After this lesson, students will be able to:*

- Create a `sessions` controller responsible for persisting a user's login

- Authenticate (log in) a user

- Write a helper method that returns the logged in user's model

- Log out a user

- Restrict access to specific routes to logged in users only (authorization)

## Intro to Managing Sessions

### First, a User Logs In

When a user attempts to login, we will look them up in the database using their `email` and call the `authenticate` method on that user's model instance.

We will pass to the `authenticate` method the password provided by the login form - **that we will find where?**

So far so good, but if we think about it, after a user has been authenticated, and we have a user model in our hot little hands at that very moment inside the controller, but then what?  How do we "remember" that the user has logged in?

### HTTP is Stateless

HTTP is stateless, which means, the server can't remember anything about a user's previous requests unless it sets headers and/or cookies that would then be sent with subsequent requests by the user.

So, the server cannot remember if an incoming request is from a logged in use - unless we write some code to make it happen.

A common solution is to store information into something known as server-based **sessions**.

### Sessions

All web servers use a form of _sessions_ as a way to identify requests made from the same user.

There are two things the Rails server will do to implement sessions:

1. When the browser first visits the web app, the server sets a _session id_ in a secure cookie. This cookie will then get passed by the browser to the server with every subsequent request.
2. Provide us developers with a key/value store tied to a given _session id_. We can then get and set data for a session in the store - and that data will be accessible in our controllers with every request by that user.

### Remembering a Logged in User

In this lesson, we will use sessions to "persist" the fact that we have a logged in user. We will accomplish this by storing their user model's `id` in the session when a user logs in.

Then, after a user has logged in and we have set the `id` in the session, in future requests we will be able to:

1. Grab the user's `id` out of the session.
2. Fetch the user from the database using that `id`.
3. Identify anonymous users - if there's no `id` is in the session, the user has not logged in.

## Our Plan for this App

So, here's the plan to implement persisted logins in this lesson's application:

1. Present a **Log In** form to allow a user to submit their email/password for authentication.

2. When the form is submitted, find the user model in the database that matches the email, and call the `authenticate` method on that user model passing in the password as an argument.

3. If the `authenticate` method returns true, save the user's `id` in Rails' `session` object using a key named `user_id`.

4. On each subsequent request, check the `user_id` in the `session`, and if one exists, fetch the user from the database so that we can access the user's information in our controllers and views.

5. Provide a **Log Out** link that maps to a controller#action dedicated to removing `user_id` from the session.

Ready?  Let's go!

## Starting Code

This lesson picks up exactly where we left off in the previous lesson.

If you followed along in that lesson and are able to create users with the _Sign Up_ page, then keep building upon that code.

However, if things didn't quite work out, be sure to copy the starter code being provided in this lesson's folder and then prep that code with these commands:

```
$ bundle install
$ rails db:reset
$ rails db:migrate
$ rails s
```

> Note: `rails db:reset` drops (database lingo for "delete") and creates the database.

Ensure that you are able to sign up a new user before moving on.

## The `SessionsController`

A key to remember is that when developing in Rails, not much is going to happen unless we put code in controller actions - actions hold the bulk of our code in a Rails app.

Conceptually, the `UsersController` is dedicated to CRUD and rendering views related directly to the `users` resource, not **sessions**.

Therefore, the `UsersController` is **not** the best place to write code that manages the process of logging in and out.

Instead, we will create a controller dedicated to manage the login sessions, a _sessions_ controller:

```
$ touch app/controllers/sessions_controller.rb
```

In `sessions_controller.rb` we'll need to code the `SessionsController` class and add some logic to handle logging a user in and out:

```ruby
class SessionsController < ApplicationController

  def new
    # Nothing to do here other than render new.html.erb
  end

  def create
    # Not using an instance variable since
    # we're not providing the user to a view
    user = User.find_by(email: params[:email])
    # Taking advantage of the && logical operator's
    # short-circuiting
    if user && user.authenticate(params[:password])
      # Successful log in!
      session[:user_id] = user.id
      # notice: is a special flash[:notice] accessor
      redirect_to root_path, notice: 'Logged in!'
    else
      # flash.now is used for messaging
      # during the CURRENT request
      flash.now.alert = 'Invalid login credentials - try again!'
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged out!"
  end

end
```

Some of you may have noticed that we don't have a `Session` Model.<br>**Do we need one?**

Now let's review the above code:

- `new` action:
  - This action simply results in `new.html.erb` (our Log In page) being rendered.
  - Unlike the `new` action for a typical resource, there's no need to create an instance of a Model - because there is no Model for sessions :)

- `create` action:
  - This is the action that will run when the user submits the Log In form. All the authentication logic happens in here.
  - First, we try to find a user that matches the _email_ the user entered into the login form. Note the use of the `find_by` method instead of the `find` method.
  - If we find the user, we call the `authenticate` method passing in the _password_ available in the `params` hash.
  - If the `authentication` method returns true, we:
      - Set a `user_id` key on Rails' `session` object and assign it the logged in user model's `id`.
      - Redirect to the root route.  `notice:` is special accessor for `flash[:notice]`.
  - Otherwise, if the authentication returns false, back to the log in form we go and an 'Invalid login credentials' will be displayed. We have to use the `flash.now` method because we are rendering within the same request vs. redirecting.
- `destroy` action:
  - The user clicked the Logout link to get to this action, so set `session[:user_id]` to `nil` and the user's session will be "forgotten".

## Add Routes to Map to `SessionsController` Actions

Remember, routes map HTTP requests to controller#actions!

So, we need routes for our `SessionsController`.  We've been using the nifty `resources` method in `routes.rb` to generate routes for us - and there's no reason to stop now!  But, we only need `new`, `create` and `destroy` actions, which we can specify by using the `only:` option.

However, because the RESTful route for logging in, `/sessions/new`, may look weird to our users in the address bar, we're also going to create an additional route that's more visually appealing for logging in.

After adding the routing described above, our `routes.rb` will look something like this:

```ruby
Rails.application.routes.draw do
  root 'houses#index'
  resources :houses
  resources :users, only: [:new, :create]
  resources :sessions, only: [:new, :create, :destroy]
  # Create a better looking URL for logging in
  get '/login', to: 'sessions#new'
end
```

> Note: It's best to stick to RESTful routing conventions when dealing with resources. However, feel free to create _custom_ routes as you see fit for your app.

**While we're at it, let's create a custom route to log out as well - go for it!**

> Note: Although not *RESTful*, coding the custom Log Out route to use a GET request can really come in handy by allowing us to logout via the address bar!

## The Log In View

With controller and routes in place, let's write the `erb` that will be displayed when the user clicks a Log In link.

First, create the file:

```
$ mkdir app/views/sessions
$ touch app/views/sessions/new.html.erb
```

This `html/erb` will display a login form:

```html
<h1>Log In</h1>
<p id="alert"><%= alert %></p>
<%= form_tag sessions_path do %>
  <div class="field">
    <%= label_tag :email %>
    <%= text_field_tag :email, params[:email] %>
  </div>
  <div class="field">
    <%= label_tag :password %>
    <%= password_field_tag :password %>
  </div>
  <div class="actions"><%= submit_tag "Log In" %></div>
<% end %>
```

The `<%= text_field_tag :email, params[:email] %>` fills in the email input in the case of failed log ins. We don't want to do this for the password though.

**If we forget what _path helpers_  are available, or how they are named, what do we do?**

You may have noticed that we're using a `form_tag` and other helpers here that differ from the `form_for` and the other helpers we used for the sign up form in the previous lesson. **Why?**

## Log In!

If your Rails server isn't already running, start it up.

Next, create a new user if you don't have any, or if you can't remember the credentials you created last lesson.

We don't have a **Log In** link to click yet, so we have to enter the appropriate URL in the address bar.

**There are two URL's we can enter in the address bar to login, what are they?**

Go to one of them and you will be greeted with a login page.

Log in with valid credentials and you should be redirected to the root and see a _Logged in!_ message.

If your login was not successful, you will see the Log In page again along with a _Invalid login credentials - try again!_ message.

## Putting the `ApplicationController` to Good Use

You're already aware of the power of **inheritance** in object oriented programming.

You've seen how all of our controllers inherit from the `ApplicationController`.

Thanks to inheritance, any methods we add to the `ApplicationController`, will automatically become available in **all** of our app's controllers!

Let's leverage the power of inheritance by writing a helper method named `current_user` that will return the model instance of the currently authenticated user.

In `app/controllers/application_controller.rb`:

```ruby
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

private

  # Make the current_user method available to views, not just controllers!
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

end
```

The line of code `helper_method :current_user`, allows us to call the `current_user` method in views, in addition to the controllers.

Note how we used the `User.find_by` method instead of `User.find` - **Why?**

The Or-Equals operator (`||=`) we first saw in the Ruby Control Flow lesson, ensures that we only fetch the user from the database once during any given request. This allows us to call `current_user` as many times as we wish without incurring a performance hit.

You might not realize how useful the `current_user` method is - but you will soon enough!

You're going to use `current_user` in your controllers and your views to more easily:

- Assign the logged in user to a model being created.
- Display a name's in the top nav bar if a user is logged in, 
- Display a **Log Out** link if a user is logged in, or a **Log In** link if a user is logged in.

## Improving Our Layout View

As we just discussed, let's change the `layouts/application.html.erb` page to display different HTML based upon a user being logged in or not:

- **Logged in**: Show "Welcome" text along with the user's name; and a link to log out.
- **Not logged in**: Show two links, one for logging in and another one for signing up.

**Remove** the following snippet that we added above `<%= yield %>` last lesson:

```html
<p>
  <%= link_to 'Sign Up', new_user_path %>
</p>
```

and replace it with this:

```html
<p>
  <% if current_user %>
    Welcome, <%= current_user.name %>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <%= link_to 'Log Out', session_path('dummy'), method: :delete %>
  <% else %>
    <%= link_to 'Log In', login_path %>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <%= link_to 'Sign Up', new_user_path %>
  <% end %>
</p>
```

The **Log Out** link maps to the `sessions#destroy` action.

Note the `session_path('dummy')` path helper?<br>**Kudos if you can explain why we need to pass in a "dummy" argument!**

**Congrats!** - you can now log out!

### Test it Out!

You should now be able to `sign up`, `login` and `logout`!

### For Future Reference :)

The `current_user` method is more useful than perhaps you realize!

Remember, the `current_user` method returns the model instance of the currently logged in user; and with it available to all of your controllers, when you go to create instances of other models, like a _comment_ for a blog post for example, you will be able to assign who created it with code like this:

```ruby
@comment.author = current_user
```
How cool is that!

But, it's not just cool, it's more secure than putting `user_id`s in routes!

> IMPORTANT: Although many of your models will be children of your `User` model, do not use nested routing for those resources!  For example, you should never have a route URI that looks like `/users/:id/posts`. **Why would this pose a problem?**

## Improving the User Experience

Here's the scenario:
> A visitor just signed up as a user for your application, however, they must then turn around and immediately login. That sucks and it will piss your users off!

In Rails, all it takes is one line of code to prevent this and automatically log in your users after they sign up!

In the `create` action in `users_controller.rb`:

```ruby
  def create
    @user = User.new(user_params)
    if @user.save
      # add the line below to automatically login a new user
      session[:user_id] = @user.id
      flash[:notice] = "You have successfully signed up!"
      redirect_to root_path
      ...
```

That's it, one line of code, and now your users won't complain!

## Restricting Access to Certain Routes

We've got **authentication**  working just swell. Now it's time to touch upon **authorization**.

The goal of authorization is to restrict access to certain controller actions based upon the authenticated user's permissions, or _roles_.  However, we're not going to implement _roles_ in this lesson, instead, we will simply restrict access to certain routes depending upon whether the user is logged in, or not.

Once again, we can use our `ApplicationController` to provide a method with some special functionality.

The method will make it easier to check in our controllers if there's an authenticated user and redirect to the login page if necessary.

Using a **before_action** filter, we can have the specified method automatically called on some, or all of a controller's actions - whatever your app requires!

In this app, if an anonymous user tries to access a route that requires an authenticated user, we will redirect to the login route.

In `application_controller.rb`, at the bottom, add:

```ruby
# Other code above
    def authorize
      redirect_to login_path, alert: 'Not authorized - you must be logged in!' if current_user.nil?
    end
```

In a moment, we'll see how we can easily call this `authorize` method from any controller that needs to restrict access to any of its actions. But first, a quick question:

**Notice that we did not make the `authorize` method a `helper_method` like we did with `current_user`. Why not?**

Now, to demonstrate authorization, let's use our new `authorize` method to disallow creating or editing new houses, unless the user is logged in. So basically, a visitor that is not logged in will only be able to view the `index` and `show` pages.

**What actions will we need to restrict access to?**

Cool, now let's see the single line of code we need to add at the top of our `HousesController`:

```ruby
class HousesController < ApplicationController
  before_action :set_house, only: [:show, :edit, :update, :destroy]
  # Prevent anonymous users from 
  # performing CUD on houses
  before_action :authorize, except: [:index, :show]
```

The `before_action` will execute the method corresponding to the name passed as an argument - before allowing the code in the targeted action to run.

The `except` option works like the `only` option that you've already seen - just the opposite.

In this app, we want to run the `authorize` method before all actions, _except_ for `index` and `show`.

Check it out!

**Congrats on implementing authorization!**

## Essential Questions

Take a minute to review, then I will go to the picker:

- **What is the name of the controller we use for coding our application's login and logout logic**?

- **If we want all of the controllers we code to have a method common to all of them, what do we do?**

- **How do we make a method in a controller callable from inside of a view?**

- **What is the name of the special Rails object that allows us to persist data between multiple requests?**
