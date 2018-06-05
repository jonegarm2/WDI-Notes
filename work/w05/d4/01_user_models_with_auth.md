
<img src="https://i.imgur.com/4pK7Q5f.png" style="width:900px">

# User Models with Auth
---

## Learning Objectives
*After this lesson, students will be able to:*

- Explain the difference between Authentication & Authorization

- Explain what `has_secure_password` does

- Create a `User` Model that includes `has_secure_password`

- Save a user with a hashed password

## Intro to Authentication

### Why We Need Authentication

An application's functionality often revolves around a particular user.

For example, when we use online banking, or more importantly, save songs to our playlists in Spotify, the application has to know who we are - and this is where _authentication_ comes in.

### What is Authentication?

Authentication is the process that allows your app to know the **identity** of the person using it.

A common form of authentication is when a user logs in with a username, e.g. an email address, and a password - this username/password authentication is what we're going to learn about today.

Later in WDI, we will learn about two other types of authentication: _OAuth_ (logging in with Facebook, etc.), and _Token-based Auth_. 

#### Isn't There a Gem for Authentication?

There are several gems, such as Devise and OmniAuth, that implement authentication in Rails applications.

However, Rails makes "hand rolling" our own username/password authentication painless. It's lean, effective and fun!

For basic username/password authentication, libraries such as Devise, are simply overkill.

After rolling your own authentication, later if you do decide to use a gem, at least you'll have an understanding what's involved.

### Authentication vs. Authorization

_Authentication_ and _authorization_ are not the same thing:

- **Authentication** verifies a user's identity.

- **Authorization** determines what functionality a given user can access.<br><br>For example:
	- What features are available to an authenticated (logged in user) vs. an anonymous visitor.<br>- or -
	- What functionality certain types (roles) of authenticated users have access to.  **What's an example of this?**

### Encryption & Hashing

Both _encryption_ and _hashing_ perform a similar task - they both process data and make it unreadable.

However, there is a significant difference between the two:

- **Encryption** is the process of encoding data so that it cannot be understood unless it is decoded using a key.

- **Hashing** is a one-way process that makes it practically impossible to invert back to the original value once it has been hashed.

**Which approach, _encryption_ or _hashing_, do you suppose is the better approach when it comes to "hiding" a user's password?**

## Intro to Authentication - Questions

- **Explain the difference between _authorization_ & _authentication_?**

- **If we _encrypt_ a password, would it be possible to decrypt it?**

## Steps to Add Username/Password Authentication & Authorization to a Rails App

Cool, now that we know what authentication is and why we need it, here's a peek at what we're going to do in this lesson:

1. Create a `User` Model that utilizes Rails' `has_secure_password` helper method.

2. Implement a _Sign Up_ page that the app can use to create new users.

In the next lesson, we'll build upon the app in this lesson to:

3. Implement a _Log In_ page that will allow users to log in.

4. Persist the login between requests.

5. Automatically login a new user.

6. Add some basic authorization.

## A Peek at the Finished App by End of Day

Allow me to demo the final app we are building today that uses authentication and authorization...

## Setup our App

To learn how to roll our own authentication system, we're going to first build a minimal app.

### Create the Rails App

Here we go. In your code folder:

```
$ rails new homes_for_sale -d postgresql -T
```
Then...

```
$ cd homes_for_sale
$ rails db:create
```

### Scaffolding our `houses` Resource

We will use scaffolding in this lesson to quickly create a working app that we can add auth to. However, never never scaffold any of your apps in WDI - **a scaffold is for learning purposes only!**

Let's generate a scaffold for a a `House` Model, which will create a migration, routes, controller, views, and a touch of CSS for a **houses** resource:

```
$ rails g scaffold House address bedrooms:integer baths:float price:integer
```

**Now that we have a new migration, what do we need to do?**

### Enable the `bcrypt` Library

`bcrypt` is a library that provides encryption and hashing algorithms to developers.

> Note: There's a `bcrypt` library available for most programming languages.

We will need it because ActiveRecord uses it behind the scenes to hash passwords.

Because `bcrypt` is so popular, it already exists in the _Gemfile_ by default, however, it is commented out.

If you haven't done so already, open the project in your text editor.

Then, uncomment the `bcrypt` gem in the _Gemfile_.

We just made a change in the _Gemfile_, and anytime we do, we need to `$ bundle install`.

#### Start Your Server!

Now let's:

- Start the Rails server in another Terminal session (`cmd+tab`)
- Browse to `localhost:3000`

There's the familiar "Welcome Aboard" page.

**We want to greet our users with the current list of all houses instead - what do we need to do?**

Now let's add a couple of houses and briefly explore the app.

## Add a `User` Model for Authentication

If our app is going to manage users, we're obviously going to need a `User` Model so that we can CRUD and authenticate them.

In most apps, a Model named `User` is peachy, however, depending upon the app's 
purpose, it might make sense to name it something else, e.g., in an online shopping app, perhaps a Model named `Customer` would be more suitable.

### The Magic of `has_secure_password`

`has_secure_password` is a wonderful helper method in ActiveRecord.

We can use it in our `User` Model and it will handle the heavy lifting of authentication for us.

Here is what `has_secure_password` does for us when we add it to a Model class:

1. It verifies the presence of a `password` key/value pair when the user is created for the first time.
2. If we also provide a `password_confirmation` key/value, which is highly recommended, it will ensure that its value matches that of `password`.
3. **Salts** & Hashes the `password` and persists it in an attribute named `password_digest` - **a string attribute that we are responsible for creating** on the `User` Model.
4. The last piece of magic `has_secure_password` provides us with is an `authenticate` instance method that we can call to verify that a provided password successfully authenticates the user.

### Creating our `User` Model

Let's create our `User` Model, but before we do, please read this important announcement:

> PSA: We **do not** want to create `password` or `password_confirmation` attributes when generating our `User` Model. `has_secure_password` will automatically create these as "virtual" attributes, which means they are in-memory attributes only and will not be stored in the database. However, we **must** provide a `password_digest` string attribute that `has_secure_password` will use to store the password hash in! Thank you for listening and happy coding.

Now, with that out of the way...

```
$ rails g model User name email password_digest
```

**New Model means we should _________?**

#### Sprinkle in the Rails magic!

Cool, now let's add the magic of `has_secure_password` to the `User` Model:

```ruby
class User < ApplicationRecord
  has_secure_password
end
```

Bam!  Authentication magic is now available.

### Validating the `email` Attribute

In this app, we are going to be using a user's `email` as their username.

If we're going to rely on a user's email to identify them, **we're going to need to ensure what?**

This will do the trick:

```ruby
class User < ApplicationRecord
 has_secure_password
 # Verify that an email exists and that it does not already exist in the db
 validates :email, presence: true, uniqueness: true
end
```

### Test Drive our `User` Model

Time to check out the magic provided by `has_secure_password`.

Feel free to just observe me go through the following...

Open up the Rails console:

```
$ rails c
```

Then...

```ruby
user = User.new
user.name = "Snoopy"
user.save
=> false
user.errors.messages
=> {:password=>["can't be blank"], :email=>["can't be blank"]}
# Note: Errors are updated only after the save method is called
user.email = "snoop@email.com"
user.save
=> false
user.password = "abc123"
user.password_confirmation = "no-match"
user.save
=> false
user.errors.messages
=> {:password_confirmation=>["doesn't match Password"]}
user.password_confirmation = "abc123"
user.save
=> true
user.password_digest
=> "$2a$10$qx9N.4Y/EBDWTGEZuUqTAeHdgzlOn5cAuF14mlBv21IkQ39JwjfsW"
user.authenticate "bad_pw"
=> false
user.authenticate "abc123"
=> #<User id: 1...
```

> The long string of characters returned when we call the method `user.password_digest` is the salted & hashed password!
 
Thanks to the use of _salt_, if we were to re-set the user above's `password` to the same value of "abc123" and `save` the user, the hash would have a different value because the hash is generated using a random salt value every save.

Okay, show's over, `$ exit` or `$ quit` to get out of the Rails console.

Our `User` Model is ready to go for the rest of this lesson.

#### ActiveRecord Validations in Models

There are lots of ActiveRecord methods available to use in our Models to validate attributes.

It is highly recommended that you take advantage of them to help ensure data integrity in your applications.

[Here's a link to the docs](http://guides.rubyonrails.org/active_record_validations.html).

## Implement a Sign Up Form

### Outlining What Needs to be Done - Exercise

Okay, so we know we can create users manually in the Rails console, but now we're going to build-out our app so that it allows visitors to sign up!

If it isn't already clear, when a visitor signs up, that's when our app will need to create a new user model and persist it in the database.

An outline of what needs to be done to provide sign-up functionality is listed below.

After reading the outline, please pair-up and answer the questions.

> Hint: The answers to all of the below questions are based upon the methodology of RESTful resources/routing. Even though we don't have our routes for the `users` resource yet, you can look at the routes for the `houses` resource for guidance.

We will review in 5 minutes:

1. Display a _Sign Up_ link (`<a>` element) in _/layouts/application.html.erb_.
	- **Why put the link in _application.html.erb_?** 
	- **This link will have its `href` attribute set to what value?**
	- **What _controller#action_ will this link's `href` map to?**

2. Display the sign up view when the link is clicked by the user.
	- **What will be the filename of this view?** 
	- **What directory path will this template file be stored?**

3. We will need a form in the sign up view for the user to enter their _name_, _email_, _password_ and _password\_confirmation_. Rails has a helper that we will use to generate our `<form>` element. That `<form>` element in the HTML will have `method` (HTTP Verb) and `action` (URI path) attributes with values generated by the helper:
	- **What is the name of the helper method?**
	- **What will be the value of the _method_ attribute (HTTP verb)?**
	- **What will be the value of the _action_ attribute (URI path)?**<br>If you get stuck on the above two questions, it might help to answer the below question first, then come back...

4. **When the submit button is clicked, the form will be submitted to what controller#action?**

### Generate a Controller for the `users` Resource

Now let's generate a controller for the _users_ resource with the two actions that we need to create a new User:  

```sh
$ rails g controller Users new create
```

> Note that we're able to specify just the actions we want stubbed up.

In `controllers/users_controller.rb` let's write the code for the `new` and `create` actions that have been stubbed up for us:  

```ruby
class UsersController < ApplicationController
  def new
    # Provide the model instance to the form_for helper
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "You have successfully signed up!"
      redirect_to root_path
    else
      render :new
    end
  end

private

    # Implement Strong Params
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
```

**Why is necessary to implement *strong parameters*, as being done with the `user_params` method above?**

> The `flash` is a special session-based hash. The values stored in `flash` are available in the **next HTTP request** and are cleared after that request is made by the client. It is perfect for passing messages in our views. You can assign to `:notice`, `:alert` or the general purpose `:flash`.  The scaffold put a `<p>` tag right at the top of the _houses_ `index` view to display any value assigned to `:notice` when a house is created.

### Routes for the `users` Resource

Let’s define our routes for our _users_ resource using the `resources` method.

There are two routes that were created when we generated the controller - **delete them**. Here's the way the cool kids would write them instead:

```ruby
Rails.application.routes.draw do

  root 'houses#index'
  resources :houses

  # we only want to display a sign up page and create users
  resources :users, only: [:new, :create]

end
```

### Update Our Views

Okay, we've got the routes and controller in place.

Let's review once again:

- The `users#new` action needs to display the signup view with a form for the user to complete and submit.

- The `create` action is going to use the data in the `params` hash to create a new user and redirect to whatever view we want (`create` actions do not have a view associated with them). For this app, we'll redirect to the root route. However, when we generated our controller, it created a _create.html.erb_ - **delete it**, we don't want or need it.

#### The `new` View

Let's code the sign up form.  Yes, it's okay to copy/paste the following...

In **_views/users/new.html.erb_**:  

```html
<h1>Sign Up</h1>
<%= form_for @user do |f| %>
  <% if @user.errors.any? %>
    <div class="error_messages">
      <h2>Form is invalid</h2>
      <ul>
        <% for message in @user.errors.full_messages %>
          <li><%= message %></li>
        <% end %>
      </ul>
    </div>
  <% end %>
  <div class="field">
    <%= f.label :name %>
    <%= f.text_field :name %>
  </div>
  <div class="field">
    <%= f.label :email %>
    <%= f.text_field :email %>
  </div>
  <div class="field">
    <%= f.label :password %>
    <%= f.password_field :password %>
  </div>
  <div class="field">
    <%= f.label :password_confirmation %>
    <%= f.password_field :password_confirmation %>
  </div>
  <div class="actions"><%= f.submit %></div>
<% end %>
```

You already know that the `@user` instance variable is being used by `form_for` to construct the `<form>`.

Checkout how `@user.errors` is being used in the case of a failed `@user.save` in the controller - sweet like bear meat!

If you can't wait for a link to go to this form, **what can we type in the address bar to check it out?**

#### Display a _Sign Up_ Link

Now we need that link to take us to the _sign up_ page (the _new.html.erb_ template we just coded).

Let's have Rails build a tasty link for us.  Add this `erb` **above** the `<%= yield %>` in `layouts/application.html.erb`:

```html
<p>
  <%= link_to 'Sign Up', new_user_path %>
</p>
```

Now, there will be a _Sign Up_ link on every page.

In the next lesson, we hide it if the user is logged in and show a "log out" link instead.

## Sign Up!

Make sure everything is saved and refresh the app.

If you followed along and don't have any typos, you should be able to sign up (create) users!

Don't forget, you can use the Rails console to display and delete users.<br>**What would we type in Rails console to print out the user that just signed up?**

Next lesson, we're going to add the functionality for users to log in.

Also, we'll see how we can make our controllers and views aware of who is logged in!

If you didn't get this app to work, don't fret, a working version will be provided as starter code for the next lesson.

## Essential Questions

Review for a minute, then to the picker we go!

- **Describe the difference between hashing and encrypting data.**

- **What attribute must we ensure exists on the User Model for `has_secure_password` to perform its magic?**

- **What are the four key pieces of authentication magic `has_secure_password` provides?**

- **What two actions are needed in the `UsersController` to sign up new users?**
