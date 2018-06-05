<img src="https://i.imgur.com/4pK7Q5f.png" width="300">
<img src="https://i.imgur.com/I36cWOq.png" width="200">

# Building Your First Rails App
---

## Introduction


We've covered many of the basics of Ruby on Rails, but coding is about practice.

In this exercise, you will create a new rails app applying the concepts we've covered so far:

- Adding a model
- Adding a controller
- Adding routes that map to controller's actions. 

Although this exercise is not about CSS - it's always better to have a nice looking app!  Use Bootstrap as a starter!

The application is going to be called `rails_twitter`.

## Exercise

#### Requirements

- Create a new Rails app called `rails_twitter` with `rails new` that uses PostgreSQL as the database and skips testing:<br>`? rails new rails_twitter -d postgresql -T`

- Create a repo and make commits as you complete parts of your app.  In addition, please create and push to a GitHub remote so that we can check your awesome work!

- `rails_twitter` is going to be a full-CRUD app, capable of displaying, creating, updating and deleting tweets.

- Since our app is a CRUD app, we're going to need to generate a single model - `Tweet`. The `Tweet` model will have two attributes `handle` (string) and `content` (text).

- Create a controller, naming it using Rails' convention for naming controllers for resources.

- Define all 8 resourceful routes for the Tweet model.

- Define all necessary actions in the controller and write the code necessary to provide full CRUD functionality.

- Write HTML & erb code as necessary in each view file to display the desired HTML/UI (show one tweet, list all tweets, enter a new tweet and edit a tweet).

- Ensure that there are links providing navigation from page to page.  You decide what makes sense for this app of yours.  Remember that for parts of the UI that you want to appear on every page, such as an **ALL TWEETS** or **HOME** link, belong in the _application.html.erb_ file.

- In addition to displaying the `handle` and `content` of tweets, display the date and time that the tweet was added. Remember, there's an attribute we get free of charge for this exact purpose! Note that this attribute should not show up on the add or edit forms.

#### Bonus

- Add a static `home` view served by a `pages#show` controller#action.

- There is a way to add CSS classes and other attributes when using Rails helpers (`form_for`, `link_to`, `text_field`, etc.).  Google it.

- Code a delete "confirmation" message before allowing a tweet to be deleted. Google it or inspect a scaffolded model.

- In addition to the date/time the tweet was created, display an updated at date/time, but only if the tweet has been updated.  Not as tough as you may think... 

- Code "flash messages" when a tweet is added, removed or updated.  Google it or inspect a scaffolded model.

#### Super Bonus

- Provide two links on the `index` view, `Sort by Date` and `Sort by Handle` that displays the tweets in the appropriate sort order when clicked.

- Hint: You can use a key/value pair in the query string like you saw in the CaTinder app.  For example:

	```html
	<a href="/tweets?sort=handle">Sort by Handle</a>
	```
- Another Hint: You can bet that ActiveRecord has methods to sort!


## Additional Resources

- Check the [Rails Guides](http://guides.rubyonrails.org/)

- More details about routing [Routing](http://guides.rubyonrails.org/routing.html)

