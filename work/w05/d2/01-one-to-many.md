<img src="https://i.imgur.com/J97x6wY.gif" width="700">

# One-to-Many Associations in Rails

### Learning Objectives

| SWBAT: |
| --- |
| Identify 1:M Scenarios |
| Define a 1:M Parent Model |
| Define a 1:M Child Model |
| Traverse a Parent Model's Children |
| Access a Child Model's Parent |

---

## Associations?

In Rails, an association is a connection between two ActiveRecord Models.

We define associations in our models so that ActiveRecord will know how to form the SQL when performing CRUD on related models.

**Once again, let's identify some real-world one-to-many associations.**

## Informing ActiveRecord an Association Exists

#### Setup

We're going to need a Rails app to be able to define models and try out associations in the Rails console.

`$ rails new rails_associations -d postgresql -T`

**YOU DO: Please do the other two steps after creating a new Rails app.**

When you're done, open the app in your text editor **and** open the Rails console in another Terminal session (tab).

Now let's model the association between a `Bank` and an `Account` model...

#### The `Bank` Model

Let's create a very simple `Bank` Model with only a single `name` attribute:

`$ rails g model Bank name`

**YOU DO: We just generated a model, what shall we do next?**

#### `has_many`

We use the `has_many` method within a model's class to inform ActiveRecord of a one-to-many association between two models:

```ruby
class Bank < ApplicationRecord
	has_many :accounts
end
```

In the parent `Bank` Model above, we are informing AR that a **bank** object *has many* **account** objects.

>Note that the model name is pluralized so that it reads better. This is a Rails convention and it knows that the actual model we are associating to is `Account`.

#### Create a `Bank` model in the DB

Within the Rails console:

`> Bank.create({name: 'Chase'})`

You'll see that AR has sent the proper SQL to the database and that the model has been created successfully - even though we don't have the `Account` model created.

Let's fetch our newly created bank:

```
> Bank.first
=> #<Bank id: 1, name: "Chase", created_at: "2017-04-16 22:56:32", updated_at: "2017-04-16 22:56:32">
```

#### Accessing the children models

The `has_many` method in a Model will create an instance method with the same name as the associated model we specify.

Therefore `has_many :accounts` in the `Bank` Model will create an `accounts` method callable by all Banks model instances.

Let's see what happens if we invoke the `accounts` method on a bank instance:

```
> Bank.first.accounts
NameError: uninitialized constant Bank::Account...
```

We're going to need our `Account` model now.

**You Do:**

1. Generate an `Account` model with these attributes:
	- **acct_no** (integer)
	- **is_savings** (boolean)
	- **balance** (float)

2. Don't forget to update the database's schema by running the migration.

Now that we have an `Account` Model, let's try it again:

```
> Bank.first.accounts
ActiveRecord::StatementInvalid: PG::UndefinedColumn: ERROR:  column accounts.bank_id does not exist...
```

Looking closely reveals an UndefinedColumn for a column called **bank_id**...

## Database Implementation Requirements

Remember, ActiveRecord is amazing at sending SQL commands to a database, processing the returned data, etc.

However, all types of associations require that the database have a way to link the related models.

Specifically, in a one-to-many association, the child table must have a column, called a **foreign key**, that holds the **primary key** of the parent record (the _one_ side of the association).

Therefore, in our example, the table for our `Account` Model needs a _foreign key_ column - and by default, Rails will expect that column to be named `bank_id`.

Currently, our database schema looks like this:

<img src="https://i.imgur.com/dXJ8DzI.png" width="400">

Examining _schema.rb_ confirms that there is no foreign key column in the _accounts_ table to store which bank it belongs to.

It's easier to create a foreign key at the time a child Model is being generated, however, we can create a ___________ to change our schema at anytime.

If we name our migration properly, Rails will know what we want to do!

When adding a column, the format is **Add[Column]To[Model]**.

We could generate a simple _integer_ column, however, it's better if we inform Rails that we're generating a foreign key so that it can create an [index](https://stackoverflow.com/questions/1108/how-does-database-indexing-work) in the database for better join performance.

Here's the command we're looking for:

`$ rails g migration AddBankRefToAccount bank:references`

then

`$ rails db:migrate`

Let's take a look at both the migration file and the updated _schema.rb_.

Note there's brand new `bank_id` column in the schema. The naming convention for foreign keys is `<model name>_id`.

One more time:


`> Bank.first.accounts`

No more errors!

An empty `ActiveRecord::Associations::CollectionProxy` (an array like object) was returned as it should be since we don't have any _accounts_ yet!

## Adding Children

Note that we can create a `Bank` without concern about associations. **Why is this the case?**

However, when we want to save a model that is a child of a parent model, as is the case with the `Account` Model, we need to make sure that ActiveRecord knows which parent (`Bank`) the child (`Account`) belongs to so that it can fill in the ______ attribute properly.

There's lot of ways to do things in Rails, here are a couple of code examples that demonstrate how we can create Accounts so that they are properly linked to a Bank:

#### Example 1 - shovel operator (or `push`)

```ruby
# new up an in-memory instance of Account
a = Account.new({acct_no: 12345, is_savings: false, balance: 111.22})

# note that a has its id and bank_id set to nil

# working with Bank.first here to save effort while testing
# let's use the shovel operator (push will work also)
Bank.first.accounts << a

# verify that there's now an account
Account.first

# a bank instance has an accounts method
Bank.first.accounts
# Rails, I love you!
```

#### Example 2 - `create`

```ruby
@bank = Bank.first
@new_account = @bank.accounts.create({acct_no: 23456, is_savings: false, balance: 44.55)
# if @new_account.persisted? is true, it was created successfully
```

#### Review Questions

**A column that holds the primary key of a parent record is called a ___________.**

**True or False: ActiveRecord takes care of adding the column referred to in the previous question to the database.**

**What is the name of the method we add to the parent Model class that informs ActiveRecord that the Model has a one-to-many association with another Model?**

**What attribute type should we use for creating a foreign key?**


## Avoiding Errors and/or Orphaned Records

If we delete a parent model instance that has related children records, one of two things will happen:

1. An error will be generated if the foreign key was created using `references` (best practice), or
2. If the FK was created as a regular _integer_ column, the parent will be removed, and any related children will become _orphaned_ records (the parent will no longer exist).

The solution to this problem is to modify the `has_many` in the `Bank` Model as follows:

```ruby
class Bank < ApplicationRecord
	has_many :accounts, dependent: :destroy
end
```

By adding `dependent: destroy`, ActiveRecord will now automatically destroy all associated _accounts_ also.

## Accessing a Child's Parent

Thanks to `has_many :accounts`, we are able to write code like this:

```html
<h2> Accounts at <%=@bank.name %></h2>
<ul>
	<% @bank.accounts.each do |account| %>
		<li>
			<h4>Account Number: <%= account.acct_no %></h4>
			<p>Type: <%= account.is_savings ? 'Savings' : 'Checking' %></p>
			<p>Balance: <%= number_to_currency(account.balance) %></p>
		</li>
	<% end %>
</ul>
```

However, you will often want to be able to access the parent model from the child, for example:

```html
<h2><%= @account.bank.name %> - Account Details</h2>
<hr>
<h4>Account Number: <%= @account.acct_no %></h4>
<p>Type: <%= @account.is_savings ? 'Savings' : 'Checking' %></p>
<p>Balance: <%= number_to_currency(@account.balance) %></p>
```

This is accomplished by informing ActiveRecord of the association like this:

```ruby
class Account < ApplicationRecord
	belongs_to :bank
end
```

On the child side of the relationship, we use the `belongs_to` method and the model is specified using is singular name.

Besides the template code above, code such as the following will now work as well:

```ruby
@bank = Bank.find(params[:id])

@account = Account.new({
	acct_no: 87654, 
	is_savings: true,
	balance: 123.45,
	bank: @bank
})
```

Rails is genius!

## Practice Lab

1. Get some practice creating one-to-many model associations by creating a `Post` Model:

	| Post |
	| --- |
	| title (string) |
	| content (text) |
	
	and a `Comment` Model:
	
	| Comment |
	| --- |
	| content (text) |

	Obviously, the association is a `post` would have many `comments`
	
2. Use Rails console to create posts and related comments to verify the relationships work.