<img src="https://i.imgur.com/4pK7Q5f.png" width="900">

# Nested Resources and Routing in Rails

### Lesson Objectives

| SWBAT: |
| :--- |
| Nest routes based on relationships between models |
| Write a migration to add a column to an existing table |
| Set default values for attributes using the DB and the Model |
| Define "shallow" routes for nested resources |
| Use `form_for` with nested resources |

## Nested Resources

A _nested resource_ is a result of two models having an association with each other.

The _nested resource_ is the "child", or _many_ side of the relationship.  For example:

```
a Scientist has many Experiments, which has many Logs
```
Both `experiments` and `logs` are nested resources - **Why?**

### Set Up a New Rails app

Create a new Rails app named _experiments\_app_.

Don't forget to specify the `-d` and `-T` options.  You've got this!

Now would be a great time to create our database too!

## Creating the Models

In our database, we'll have three models: `Scientist`, `Experiment`, & `Log`.

As already discussed, these models have the following `belongs_to`/`has_many` relationships between them:

```
Scientist |----< Experiment |----< Log
```

> Note: `belongs_to`, `has_many` etc. are class methods.

**Question: Based upon the relationship diagram above, which of the `belongs_to`, `has_many`, etc. class methods should be added to the `Experiment` model?**

Now let's generate our models:

#### `Scientist`

We'll first give the `Scientist` model the following attributes:

| Attribute  | Data Type   |
| :---       | :---    |
| name       | String  |
| discipline | String  |
| mad     | Boolean |

`rails g model Scientist name discipline mad:boolean`

**Don't run the migration yet!** We're not going to run the migrations until we've generated all three models...

As this is the base of our relationships, the Scientist model is the **one** side of the association.  Accordingly, the schema will not require a foreign key.

> **Key Point: Model's that are children (have a `belongs_to`), will always need a foreign key that points to the parent it belongs to.**

This is why we are generating this model first because the other two models will require a foreign key and it's easier to generate a FK when we generate the models.

##### Default Values

Establishing default values for attributes means that the attribute will be set to a value if we don't provide one at the time we create the model instance.

First, let's see how we can use the database engine to automatically assign default values.

Go ahead and open up the migration file we just generated. Since we've yet to `rails db:migrate`, we can still edit this file. Add `, default: true` to the end of the `mad` column, so it looks like this:

```ruby
# migration for ...create_scientists.rb
      # other code...
      t.boolean :mad, default: true
```

Now every new Scientist will have a default value of `true` for the `mad` attribute unless we set it to `false`.

#### `Experiment`

Experiments `belongs_to` the `Scientist` model , so we'll need a 
reference to our previous model in our migration.

| Attribute    | Data Type |
| :----------- | :------ |
| title        | String  |
| budget       | Integer |
| scientist_id | Integer |

`rails g model Experiment title budget:integer scientist:references`

The `scientist:references` will result in a foreign-key column named `scientist_id`. Rails also configures indexing when we generate the foreign-key using `references` resulting in better performance than if you were to add the foreign-key on your own later.

However, if the `Scientist` model does not exist, this will trigger an error when the migration is run - this is why we generated the `Scientist` first!

> Note the importance of the sequencing of migrations!

Let's generate the last migration before we `rails db:migrate`...

#### `Log`

A Log `belongs_to` `Experiment`.

| Key           | Data Type   |
| :------------ | :------ |
| entry         | Text    |
| experiment_id | Integer |


Okay, we're going to **purposely** make a little mistake on this next command:

`rails g model Log entry:text`

Now let's `rails db:migrate`.

![](http://www.northalsted.com/wp-content/uploads/2015/10/ItsAlive.jpg)

##### Oh no! We forgot to the `references` foreign-key link for Logs to Experiments!!

Have no fear! Mistakes happen and adding columns to an existing table is a common use case for migrations.

We can generate a migration too (without generating a model). With most things rails, there's a convention:

``` bash
# DO NOT TYPE THIS IN!
$ rails g migration AddColumnNameToTableName column_name:type
```

Whenever you're adding columns to a table (attributes to a model), you should specify what you're doing in your migration name. This will help Rails figure out what you're changing.

```bash
# USE THIS ONE:
$ rails g migration AddExperimentRefToLogs experiment:references
```

Check out the migration to make sure it looks right, then

```
rails db:migrate
```

#### Rolling back migrations

Perhaps you've generated a model and the migration would not run due to a typo, etc.  We would be able to edit the migration file because it was in the "down" state and re-run the migration.

However, let's say your migration ran, but you noticed that you made a mistake.  For example, perhaps you meant to make an attribute a `float` instead of an `integer`.

Again, we can only modify previous migration files if their status is **down**!

**Who remembers how to check the status of our migrations?**

Luckily, we can turn a migration's status from **up** to **down** with this command:

`rails db:rollback`

The above command will rollback one migration at a time - always the most recent migration whose status is **up**.

You may need to rollback a few times to get to the migration file you'd like to modify.

You can then edit the migration you want and `rails db:migrate` again, which always runs all **down** migrations from oldest to newest.

### Establish Model Relationships

Now that we've generated our models, we can now add association class methods and other goodness to our models:

```ruby
# scientist.rb
class Scientist < ApplicationRecord
  after_initialize :set_defaults

  has_many :experiments, dependent: :destroy

  private

  def set_defaults
    self.discipline = "General Science" if self.discipline.nil?
  end
end
```

Okay, there's a bit going on here.  Let's review...

First, understand that `has_many`, `belongs_to`, etc. associations inform Active Record how to generate proper SQL. They do not modify the database in any way.

We've also added `dependent: :destroy`, meaning to remove all child (dependent) model instances if the parent resource is removed. This prevents what is known as "orphaned" records. You can take advantage of this feature in your `seeds.rb` file by having only to call `destroy_all` on "parent" Models. There basically is no downside to always adding `, dependent: destroy` to a `has_many ...` association.

We are using the `after_initialize` callback method in Active Record to implement default values in our model vs. how we did it with the database engine when we modified the migration for the _Scientist_ model when we set _mad_ to default to true.

`after_initialize` is one of several [Active Record Callback methods](http://guides.rubyonrails.org/active_record_callbacks.html).  Similar to how the `before_action` method is used to invoke methods in controllers before the requested action is executed, `after_initialize` allows us to specify a method to run immediately after a model has been instantiated.

Now let's inform Active Record of the associations for the other two models, first the `Experiment` model:

```ruby
# experiment.rb
class Experiment < ApplicationRecord
  belongs_to :scientist
  has_many :logs, dependent: :destroy
end
```
Notice how Rails had already written the `belongs_to` relationship for us. This was because we used `scientist:references` when we generated the `Experiment` model.

We purposely forgot to use `scientist:references` when we generated the `Log` model, so we'll have to set the `belongs_to` ourselves:

```ruby
# log.rb
class Log < ApplicationRecord
  belongs_to :experiment
end
```

We now have our relationships set up in our database...

### Let there be data!

It's time to create some data!

Let's write some code in `seeds.rb` to create some data.

>Note: If things ever go really bad, you can always use `rails db:drop` (…then `rails db:create`, `rails db:migrate`) to delete and re-create the database.

Take the next 15-20 minutes to write the code within `seeds.rb` to build the following:

- First, before creating data in a seeds file, be sure to remove all data from the tables that you're seeding.  In this app, you simply need to `Scientist.destroy_all`, which will also remove all data from `experiments` and `logs` **thanks to ______________?** 

- 1 scientist with 1 experiment that has 1 log

- Another scientist with 2 experiments, one of those experiments should have 2 logs, the other has no logs.

If we forget the names/types of the attributes for a model, **where do we look?**

> VSCode shortcut to duplicate lines of code: (1) Select multiple lines of code with `cmd-i`; (2) Duplicate the selected lines using `shift-option-downarrow`.

When `seeds.rb` is ready, run it: `rails db:seed`.

Now that we have some data, let's discuss routing...

### Nested Resource Routing

When we talk about _resources_, it ultimately leads to talking about REST:

**What HTTP verb and URI path should we use to create a new `Scientist`?**

The path is simple because the `Scientist` model does not depend on any other model.

Now let's think about what happens when we want to create a new `Experiment`...

**If we do a `POST` to `/experiments`, what info would be missing that we would need in the `experiments#create` action?**

Luckily, the REST methodology has a solution for us...

Here's the path we'd `POST` to if we wanted to create an `Experiment` for the `Scientist` with an _id_ of 3: `/scientists/3/experiments`

Experiments is what's known as a **nested resource**.

Note that when using nested resources, our concept of a nested resource's `index` will typically represent **all** of those resource instances related to  parent - **not** all of the resources in the database.  For example, a `GET /scientists/3/experiments` would map to the `experiments#index` action.

But what if your application needs to access all of the _experiments_ in the database? This scenario would require a "custom" action such as:

`get '/experiments', to: 'experiments#all'`

You can call the custom action anything you want, but `all` makes good sense.

### Using the `resources` method in `routes.rb`

Rails has a nifty helper method for generating resourceful routes.

The `resources` method can, and from this point forward, be used to generate all routes for a resource!

Here's what we would type for the `scientists` resource:

``` ruby
# routes.rb

  resources :scientists
```

`$ rails routes` and count 'em.

<img src="https://i.imgur.com/bKJ0Bb8.png">

Everything we need for full CRUD on a resource - including all path helpers!

The `resources` helper can be used to create the routes for nested resources too!

In `routes.rb`:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments
  end
```

Notice that we put a nested resource within a Ruby code block (`do ... end`).

Let's `rails routes` again.

Holy Mad Scientist, that's a lot of routes!

<img src="https://i.imgur.com/vfilCpH.png">

> Note: Pay attention to how how Rails names the **named parameters** in nested routes. For example, in `POST   /scientists/:scientist_id/experiments`, it's `scientist_id` instead of `id`. This means that in the controller code you would need to use `params[:scientist_id]` to access the id of the scientist.
>
> _When in doubt... rails your routes!_

Examining the list of routes above reveals that some of them are unnecessarily "long".  Take this route for example:

<img src="https://i.imgur.com/3jMewGL.png">

**Do you see what's "unnecessary"?**

Let's say we want to update an experiment with an id of 13, wouldn't the URI path of `/experiments/13` be sufficient?

"Shorter" paths work well for nested resources, except for the actions where we **need** to know the id of the parent resource. **Identify with your pair which actions would these be?**.

We can manually implement these "shorter" routes by defining them separately as follows:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments, only: [:index, :new, :create]
  end
  resources :experiments, only: [:show, :edit, :update, :destroy]
```
In the above code, we've taken advantage of the `only` option, but note that you can also use `excludes` if you wish.

Cool, but Rails knows that shorter paths are a good thing and thus has a way of generating the same routes as above more easily:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments, shallow: true
  end
```

`rails routes` Not bad - thanks `shallow` option!

<img src="https://i.imgur.com/U7Uyjim.png">

Same number of routes, but shorter paths whenever the parent's `id` is not necessary.

#### But I don't need all of these routes!

Chances are, you won't actually need all of those routes because of your application's functionality/requirements.

For example, would we commonly need the `index` action for a nested resource?  Think - **in what action/view would we typically want to list all of the experiments for a given scientist?**

Another example, instead of using a dedicated `experiments/new.html.erb`, you would probably prefer the form for creating a new experiment to be on the _show_ view for a scientist.  Makes sense - no?

However, the choice of removing unnecessary routes with `only` and/or `except` is up to you.  Keeping them around may clutter up your routes a bit but it doesn't break your app, so feel free to ignore them during development. Then, consider removing unused routes post-development.

### Handling Resources Nested More Than One Level Deep

Let's not forget about the `logs` resource which is nested two levels within `scientists`.

Well, as we saw with `experiments`, we only need to know the immediate parent's `id` for the `create` action; and perhaps `index` & `new` actions (if you require them).

Therefore, there is absolutely no need to concern ourselves with the `scientists` resource when dealing with `logs` - just its immediate parent, `experiments`.

Let's see what routes Rails gives us with this code:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments, shallow: true do
    	resources :logs
    end
  end
```

`rails routes` and we'll find that Rails has done it again!  Note that we didn't need to specify `shallow: true` on the `logs` resource thanks to it already being on `experiments`.

<img src="https://i.imgur.com/p5HtDSV.png">

### Using `form_for` with Nested Resources

Rails' `form_for` helper generates forms in our views for a resource like this:

```html
<%= form_for @scientist do |f| %>
    <div>
        <%= f.label :name, "Name of the scientist:" %>
        <%= f.text_field :name %>
    </div>
    # other fields here
    <%= f.submit "Save New Scientist!" %>
<% end %>
```

> Note how we can "override" the text rendered in a label.

The above `form_for` would result in the following _action_ attribute (the path) in the form element:  `<form action="/scientists" method="POST"...>`.

Now, turning to a nested resource such as `experiments`.  If we simply provide a new'd up `Experiment` model (from the controller action) like we did for the `Scientist` model above, we would end up with a path of `/experiments` in the form, but checking our routes, this is not what we need.

Rails'ing our routes shows that, if we want to create an experiment (`experiments#create`), we need the action in the form to look something like `<form action="/scientists/13/experiments"...>`.

So, here's how we can use `form_for` to generate the correct HTML to create a new `Experiment` (don't type this code yet):

```html
<%= form_for [@scientist, @experiment] do |f| %>
    <div>
        <%= f.label :title, "Title of Experiment:" %>
        <%= f.text_field :title %>
    </div>
    <div>
        <%= f.label :budget %>
        <%= f.text_field :budget %>
    </div>
    <%= f.submit "Save New Experiment" %>
<% end %>
```

By providing both `@scientist` (an existing model instance) and `@experiment` (a new empty instance) **in an array**, `form_for` will know to generate the form for an experiment that belongs to `@scientist`.

Setting both the `@scientist` and `@experiment` instance variables is of course the responsibility of the controller action that resulted in the form being displayed - **what controller and action is likely?**.

The form would correctly look like something like this:

<img src="https://i.imgur.com/nGDag0L.png">

#### Practice Exercise

To see this in action let's code the `scientists#show` action that, in addition to displaying a particular scientist, includes the above `form` under the scientist's details to create an experiment for that scientist.

The routes are done, so a good start would be to create a ________ controller with a `show` action...

Don't worry about styling (yes, "jagged" forms are okay for this exercise).

I'll circle around and help - shouldn't take longer than 15-20 minutes...

### Accessing and Displaying Nested Models

As you've seen, Active Record creates methods we can use to access the related models on a parent.

```ruby
@scientist.experiments  # returns an array of the scientist's experiments
```

**How could we access all of the `logs` for the first experiment for `@scientist`?**

Cool.

For reference, here's how we might code the `experiments#show` action and view...

#### First the controller:

```ruby
# experiments_controller.rb

class ExperimentsController < ApplicationController
    
    def show
    	@experiment = Experiment.find(params[:id])
    	@log = Log.new
    end
    
end
```

#### Now the view:

For some basic styling, let's add the Bootstrap CDN inside of `layouts/application.html.erb`'s head:

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```
Now for the markup:

```html
# experiments/show.html.erb

<h1 class="jumbotron">Experiment Detail</h1>

<%= link_to "Return to All Experiments", scientist_path(@experiment.scientist) %>

<hr>

<div class="panel panel-default">
    <div class="panel-heading">
        <h4>Experiment Last updated: <%= @experiment.updated_at.strftime("%b %d, %Y %I:%M%p") %></h4>
        <h5>Budget: <%= @experiment.budget %></h5>
    </div>
    <div class="panel-body">
        <p><%= @experiment.title %></p>
    </div>
    <div class="panel-footer">
        <h4>Logs</h4>
        <% if @experiment.logs.count > 0 %>
            <% @experiment.logs.each do |log| %>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h5><%= log.updated_at.strftime("%b %d, %Y %I:%M%p") %></h5>
                        <p><%= log.entry %></p>
                    </div>
                </div>
            <% end %>
        <% else %>
            <p>No Logs Yet</p>
        <% end %>
    </div>
</div>
<hr>

<%= form_for [@experiment, @log] do |f| %>
    <div class="form-group">
        <%= f.label :entry, "Entry:" %>
        <%= f.text_area :entry, class: "form-control" %>
    </div>
    <%= f.submit "Add Log Entry", class: "btn btn-success" %>
<% end %>
```

**Take a few minutes to read the code above and note any questions/comments you may have. We'll review in 5 minutes.**

### It's Your App! (Flexibility)

We've witnessed many conventions of Rails.  However, Rails conventions do not necessarily restrict what we can do in our apps.

For example, take a look at how we stubbed up a new `Log` for the `form_for` in the _experiments#show_ action.  Perhaps you didn't realize that you could create a new model instance of _any_ model within a controller for a different model. Absolutely you can. It's just code. It's your app!

#### Filtering

Maybe in this science app we would like a view that displays all _experiments_ for a scientist that have a title partially matching a filter string...

One way for us to implement this would be to use a form, not for a model, but for entering a filter value in an input like this:

```html
<%= form_tag scientist_experiments_path(@scientist), method: :get do %>
  <%= text_field_tag 'term', nil, placeholder: 'Find Experiment...' %>
  <%= submit_tag 'Find', name: nil %>
<% end %>
```

We're using a `form_tag` vs. `form_for` to generate a generic form not tied to a model.

With `form_tag` we need to specify the path for the _action_ attribute in the `<form>` element.

The `name: nil` attribute on the `submit_tag` prevents a querystring from being added in the address bar.

Also note how, in this case, we are specifying that the form should issue a `GET` instead of a `POST`.

Then something like this in the controller:

```ruby
class ExperimentsController < ApplicationController

  def index
    if params[:term].present?
    	@experiments = Experiment.where('lower(title) LIKE ?', "#{params[:term].downcase}")
    else
    	@experiments = Experiment.where(scientist_id: params[:scientist_id])
    end
  end

end
```

Note that if the request was made by clicking the form's **Find** button, the `params` hash will have a `term` key containing the value of what the user typed into the `<input>`.  Then, we're using the `.where` method to select only the experiments whose `title` partially matches `term`.

We've made the filtering case insensitive by using `lower()` within the version of `where` that allows us to specify a SQL _where clause_ and provide a value for the `?` placeholder.

## Practice Lab

For practice:

- Create an _index_ view for scientists.
- Clicking on a scientist would render a _show_ view for that scientist.
- In the _show_ view for a scientist, list all of that scientist's experiments.  If there are no experiments for a scientist, display a message "This Scientist Currently Has No Experiments".
- Also in the _show_ view for a scientist, show a button to click to add a new experiment which would render the _new_ view for an experiment.
- After the user submits a new experiment, return to the scientist's _show_ view where the newly added experiment will be displayed along with the others.
- Provide a way to view a _show_ view for an experiment displayed on the scientist's _show_ view.
- On the _show_ view for an experiment, provide links for editing and deleting that experiment.
- Implement editing of an experiment.
- Implement deleting an experiment.

#### Bonus

- Implement CRUD for logs.

