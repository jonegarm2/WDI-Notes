<img src="https://i.imgur.com/35mXCrc.png" width="700">

# Many-to-Many Associations in Rails

## Learning Objectives

| SWBAT: |
| --- |
| Identify M:M Scenarios |
| Explain Why Join Tables are Necessary |
| Generate a Join Table for a `has_and_belongs_to_many` Association |
| Use `has_many, through:` (HMT) to Establish a M:M Association  |
| Create Data When Using HMT |

## Intro

The many-to-many association is very common in data models for most applications. 

**Can you identify some real-world many-to-many associations.**

Cool. So this is another lesson about how to **inform** ActiveRecord what SQL it should send to the database when performing CRUD - **where do we put the code to do this?**

## Database Implementation

The image at the top of this document depicts a M:M scenario:

**_An Employee has many Roles and a Role has many Employees_**

We saw in the one-to-many lesson that it was necessary to have a foreign key column in the many-side (child) table.

In many-to-many associations, a FK column just won't cut it - **can you explain why?**

The solution to implementing M:M in a relational database requires a separate **join table** (also called a _junction table_).

The _join table_ at a minimum has two FK columns, holding the PKs of the rows in the two tables being linked.

## Our Scenario

We're going to expand upon the scenario in the previous lesson adding the ability to **tag** a _post_ with keywords.

The following depicts the association between the Models:

`Tag >---< Post |---< Comment`

#### Setup

Hopefully you completed the `Post |---< Comment` exercise last lesson.

- **IF NOT:**

	```
	$ rails g model Post title content:text
	$ rails g model Comment content:text post:references
	```
	Then, don't forget to run the migrations!
	
	Lastly, be sure to modify the `Post` model:
	
	```ruby
	class Post < ApplicationRecord
	  has_many :comments
	end
	```

Once up to date:

**Add a `Tag` Model to the _rails\_associations_ project. Give the `Tag` Model a single _string_ `keyword` attribute.**

Run the migration.
 
Now let's take a look at how we can inform ActiveRecord of this relationship...

## Two Options

In Rails, we have two different methods available we can use to inform AR of a M:M association:

- `has_and_belongs_to_many` (HABTM)
- `has_many, through:` (HMT)

#### `has_and_belongs_to_many`

When using `has_and_belongs_to_many`, a **minimal** join table is used to join the two Models. The join table often does not even have it's own `id` column because the two FK columns can uniquely identify a row (this is called a composite primary key).

HABTM is an option when we don't care about any information "between" the two models being joined.

For example, in our `Tag >---< Post` scenario, perhaps we simply want to link a _tag_ and _post_, we don't care about _when a post was tagged_, _which user tagged the post_, etc.

Rails is **not** going to create the join table for us, so we have to create it ourselves - by now, I hope you know where we're going with this.

We generate a migration for the join table like this (don't do this though):

`rails g migration CreateJoinTablePostsTags posts tags`

By convention, the join table will be named using the name of the two tables being joined in alphabetical order.  For example: `posts_tags`.

Note that join tables don't have to have an `id` column - if we told you that all tables in a relational DB have ids, we lied :)

Although `has_and_belongs_to_many` does the job, the `has_many, through:` option discussed next is often considered the way to go...

### `has_many, through:`

In the `has_many, through:` technique, the join table is provided by another Model.

This approach provides the capability to "supplement" the join with extra data - like _when a post was tagged_, _which user tagged the post_, etc.

Even if you don't intend initially to supplement the join table with extra attributes, there's really no downside to using the `HMT` approach.

In fact, the `HMT` approach is just plain easier considering that generating a Model is more straight forward than generating a migration for a plain join table.

## Creating the `through:` Model

Now that we know we're going to be using `has_many, through:`, we need to create a Model that will be used as the `through` Model.

How does this read - "posts have many tags through taggings"?

A `Tagging` Model it is!

This time, we will plan a little better and generate the `Tagging` Model using the `references` attribute type to generate the foreign keys for us:

`$ rails g model Tagging post:references tag:references`

**What will the two foreign keys be named in the database schema?**

Note that we didn't put any extra "info/attributes" in there. However, we will automatically have a `created_at` (and `updated_at`) attribute available to tell when a `Tag` was added.  If this were a real app, we would probably also include an attribute to reference the `User` that tagged the post. 

Migrate and let's take a look at `schema.rb` - yup, there's foreign keys in there!

#### Informing ActiveRecord of the HMT Association

The database implementation details have been handled but we still need to inform ActiveRecord of the HMT association like this:

```ruby
class Post < ApplicationRecord
  has_many :comments
  has_many :taggings
  has_many :tags, through: :taggings
end
```
Notice that we have to add `has_many :taggings` in order to use `has_many :tags, through: :taggings`.

With the above code in place, we are now able to access a post's tags like this:

```ruby
tags = Post.first.tags

# or, assuming @post is an instance of the Post Model:
@post.tags # would return all of the tags for @post
```

Notice that we don't need to worry about the `Tagging` relation in the code above - Rails knows SQL to send (be sure to read in Terminal some of the SQL ActiveRecord sends on our behalf when your apps' perform CRUD.

**YOU DO: We will probably want to be able to find all posts with a certain tag, to do this, we have to inform ActiveRecord of the other side of the association as well. Write the two lines of code in the `Tag` Model.**

FYI, we didn't have to add any code in the `Tagging` Model to inform ActiveRecord of the associations, it's already in there:

```ruby
class Tagging < ApplicationRecord
  belongs_to :post
  belongs_to :tag
end
```

**How did Rails know to put the `belongs_to` methods in there for us?**

## Creating Data (HMT)

With HMT associations, we link the many-to-many records by creating a new instance of the `through: ` Model.

Let's `rails c` and create a couple of tags:

```
> Tag.create([{keyword: 'amazing'}, {keyword: 'nature'}])
```
Then let's create a post:

```
> Post.create({title: 'My Trip to Yosemite', content: 'It was a beautiful day...'})
```

Now let's say we want to "tag" the post we just created with the 'nature' tag.  One way is like this:

```ruby
tag = Tag.find_by(keyword: 'nature')
post = Post.find(1)
post.tags << tag
```

The above would automatically create a `Tagging` model instance that "joins" the Post with an id of 1 to the 'nature' tag.

**What can we type in Rails console to see what `Tagging` instances we have?**

Obviously, your app would need routing and UI functionality to add tags to a post. Here is how you might code a `taggings#create` action:

```ruby
def create
	tagging = Tagging.new(post_id: params[:post_id], tag_id: params[:tag_id])
	tagging.save
	redirect_to post_path(params[:post_id])
end
```

>Note how we don't always have to pass model instances to Rails helpers like the `post_path()` helper.  Here we just passed it the `post_id` that came in as a named parameter on the route.


## Practice Exercise

#### The Data-Model

Implement the following Models and associations:

`Patron |---< Tickets >---| Concert`

Use the `has_many, through:` approach.

#### Create the Models

Here are the Models:

| Patron |
| --- |
| name (string) |
| age (integer) |

| Concert |
| --- |
| when (datetime) |
| artist (string) |
| venue (string) |

| Ticket |
| --- |
| seat (string) |
| price (float) |

#### Create some data

First create some _patrons_ and _concerts_.

Then hook some of those patrons up with some sweet _tickets_!

#### Query!

1. Write the code to access all of the concerts a patron of your choosing is going to.

2. Write the code to list all of the patrons going to a concert of your choosing.

3. Write the code to list all of the tickets a patron of your choosing has.

4. Write the code that returns the number of tickets that exist for a concert of your choosing.

#### Bonus

5. Write the code that returns all patrons under the age of 18 going to a concert of your choosing.

# Further Study

## Accessing Data

Once your associations are defined in your Models, there's quite a few possibilities depending on what you're looking for...

`@post.taggings`

`@post.tags`
Note that we don't use `taggings` between `post` and `tags`

`@tag.posts`

`@tag.taggings`

`@tagging.post`

`@tagging.tag`

## Querying

ActiveRecord query methods are ready to rock!

_Find all posts with a given tag:_<br>
`Tag.find_by(keyword: 'wdi').posts`

_Find all tags for a post that start with "s":_<br>
`@post.tags.where("keyword like 's%'")`

## Preventing Duplicates

It's possible to create duplicates, for example assigning the same tag to a certain post more than once.

To prevent this, you can use the `exists?` method to check if a tag has already been linked to a post:

_Check if post has a certain tag:_<br>
`@post.tags.exists?(keyword: 'javascript')`<br>
_Or, if you happen to have an instance of Tag that you want to check:_<br>
`@post.tags.exists?(@the_tag)`

You can then use `exists?` like this:<br>
`@thing.tags << @tag unless @thing.tags.exists?(@tag)`

## Other Actions

#### Deleting a certain `tagging`

`Tagging.find_by(post: @post, tag: @tag).destroy`

Be careful to destroy the through model instance, not the model(s) being joined.

### Advanced HMT

So, let's say users have many posts (that they created).  The User model would have this association:<br>`has_many :posts`

Now consider that you want to be able to have "liked" posts (whether your own, or the posts of other users).

We know we'd need a through model to implement the many-to-many relationship - let's call the model Like.

However, we aren't able to establish a HMT relationship like we have thus far:<br>`has_many :posts, through: :likes`<br>Bummer, no likey because we already have `has_many :posts`.

The problem is if we were to try `current_user.posts`, it would be ambiguous - do we want the posts we created, or the ones we liked?

Of course Rails has a solution:<br>
`has_many :liked_posts, through: :likes, source: :post`

The above establishes an alias (of our choosing) for the posts we are after and we are informing Rails that we are after posts with the `source: :post` key/value.  Note that it's `:post` (singular).

#### Like a Post

`Like.create(user: current_user, post: @post)`

#### How many likes does a post have?

`@post.likes.count`

#### Has a user already liked a certain post?

`current_user.likes.exist?(@post)`