This presentation is available at:<br>[https://presentations.generalassemb.ly/ab06625d4d1e0c2ab158#/1](https://presentations.generalassemb.ly/ab06625d4d1e0c2ab158#/1)

---

<img src="https://i.imgur.com/4pK7Q5f.png">

# Intro to Models in A<span style="text-transform:lowercase">ctive</span>R<span style="text-transform:lowercase">ecord</span>

---

## Learning Objectives
<br>

- Explain the Use Case for ActiveRecord

- Generate a Model

- Run a Migration

- Explain What a Migration Does

- Create Data With a Model

---

## What is A<span style="text-transform:lowercase">ctive</span>R<span style="text-transform:lowercase">ecord</span>?
<br>

- _ActiveRecord_ is the layer of the Rails framework dedicated to working with data.

- _ActiveRecord_ implements the M in the MVC application architecture.

- Previously, you saw how how data is stored in _rows_ in a relational database where each row represented a single instance of a specific data entity, e.g., a blog post, a comment, an author, etc...

---

## What is A<span style="text-transform:lowercase">ctive</span>R<span style="text-transform:lowercase">ecord</span>? (cont.)
<br>

- As "fun" as it is writing SQL commands to create tables and perform CRUD on data, _ActiveRecord_ provides us with a more productive, a more objected-oriented way to work with data in our application.

- _ActiveRecord_ is known as an _Object-Relational-Mapper_, or ORM for short. ORM's are very popular in the world of software development because they allow us to work with data in our code via objects and methods, abstracting away the DB to the point we don't even know it's there.

---

## Models

---

### Intro to Models

- In Rails, a Model is a class that represents a data entity. For example:

<img src="http://guides.rubyonrails.org/images/has_many.png" height="300">


- We will use Model classes to create, update and delete data entities in the database.

- For example, if you wanted to create a new book, you would create an instance of the `Book` class and "save" it.<br>**How do we create an instance of a class in Ruby?**

---
### Intro to Models

![](http://guides.rubyonrails.org/images/has_many.png)

- Every model in our app will have a dedicated table in the database. There is a one-to-one mapping between them.

- Note that the name of the Model class is singular (and upper camel case like all classes in Ruby) and the table name is plural (and snake cased).

---
### Intro to Models
<br>

- When we create a Model class, you will see that no attributes are defined in the Model class. The attributes are defined in the database table's schema.

- In addition to performing CRUD, we use Models primarily to:
	- Inform ActiveRecord of the relationships with other Models (as shown in the previous diagram).
   - Define optional data validations.
   - Add custom behavior, for example, provide a `full_name` method.

---

### Intro to Models
<br>

- Here's another example showing `Customer` and  `Order` Models:


![](http://guides.rubyonrails.org/v3.2.21/images/belongs_to.png)

- **A database review question: What type of column is the `customer_id` column in the `orders` table?**

---
### Working with Models - Workflow

<p style="text-align:left">For your reference, here's a list of steps you might follow to start a new Rails app that uses Models:</p>

- First, we need to create the Rails app before we create any Models:
	- We'll be working with the PostreSQL database (**why?**) so be sure to create your new app like this:<br>`rails new my_app -d postgresql -T`
	- `cd my_app`
	- Run this command to create the database:<br>`rails db:create`
	- Start the Rails server with `rails s` and browse to `localhost:3000` to ensure all is well before creating any Models.

<p style="text-align:left">Now we can generate our Model(s)...</p>

---
### Working with Models - Workflow
<br>

- With the Rails app created, here's what we need to do to create Models:
	- Use `rails g model <Model name> <attribute list>...` to generate your Model's class file and database migration file.
	- Run `rails db:migrate` to update the database's schema (structure) with any pending migrations.
	- Code your routes, controller & views as usual.

<p style="text-align:left">Ready? Let's try it out...</p>

---
## Creating our First Model

---

### Setup our App
<br>

1. Create a new app and specify PostrgeSQL:<br>`rails new car_app -d postgresql -T`

2. `cd car_app`

3. Create the database:<br>`rails db:create`

4. Open the project in your text editor.

5. In a new Terminal tab, `rails s` then browse to `localhost:3000`

---
### Generating our Model
<br>

- Let's generate a simple Model to represent car objects:<br>`rails generate model Car make:string year:integer price:float`

- After running this command, there will be a `car.rb` file in the `models` folder that has the following code:

	```ruby
	class Car < ApplicationRecord
	end
	```

---
### Generating our Model (cont.)
<br>

- We will always define our Models with a name that represents a singular data object, e.g. `Car`, not `Cars`.	

- Wait, there's no attributes or anything else in there.<br>**Who can tell us where to find which attributes our Model has?**

---

### Migrations
<br>

- Besides the Model class file, the model generator created a **migration** as well.

- A migration file contains code that `rails` runs to modify our database's structure. **What do we call the database's structure?  What file in a Rails app represents it?**

- We will find the migration we just created in the `db/migrate` folder - let's check it out...

---

### Migrations (cont.)

- Note the filename is prefaced with a timestamp so that it sorts in chronological order.

- We create migrations to modify the database over time as our application evolves.

- We'll see that a migration is a class that inherits from `ActiveRecord::Migration`. The code inside of the class is a [Ruby DSL](http://archive.oreilly.com/pub/post/what_is_a_dsl.html).

- Migrations can generate new or modify existing tables, e.g., to add/remove columns (attribute). These [docs](http://guides.rubyonrails.org/active_record_migrations.html) explain how.

---

### Database Schema

- You can check what the database schema file looks like by looking at the `db/schema.rb` file. But it doesn't exist yet because we haven't run a migration yet.

- Before we run the migration we created, let's see the command that reports the status of our migrations:<br>`rails db:migrate:status`

- You will see that the status of our create car migration is "down", that means it has not been run yet...

---

### Database Schema (cont.)
<br>

- Let's change the migration's status to "up":<br>`rails db:migrate`<br>This will run **all** unprocessed (down) migrations.

- Now that we've run a migration, there will be a `schema.rb` file.

- Look, but never touch the `schema.rb` file - consider it read-only. **Our database schema must only be modified with _________!**

---

### Database Schema (cont.)
<br>

- The naming convention for tables is the pluralized, snake-cased version of the Model class it represents.

- Besides the `make`, `year` and `price` attributes we generated, note that Rails automatically generated `created_at` and `updated_at` _datetime_ attributes for us.

- Lastly, although not shown in `schema.rb`, there will always be an `id` attribute of type _integer_ in every table/model.

---

## Creating Data with Models

---

### The Rails Console
<br>

- Before we start using Models in controllers and views, let's see how we can do some CRUD in the Rails console.

- Make sure that you're in your app's folder and run:<br>`rails console`<br>or<br>`rails c` for short.

- The console will load all of our app's Model classes automatically so that we can use them.

---

### Creating New Model Objects
<br>

- There are two methods we can use to create model instances in our database: `new` and `create`.

- The difference between the two being that `new` creates an **in memory** instance of the Model that still needs to be saved to the database, while `create` will create an instance **and** save it to the database automatically.

---

### Creating New Model Objects (cont.)
<br>

- First, let's take a look at the `new` method:

	```ruby
	car = Car.new
	car.make = "Toyota"
	car.year = 2015
	car.price = 25000
	# the above code is same as this one line:
	# car = Car.new(make: "Toyota", year: 2015, price: 25000)
	```

---

### Creating New Model Objects (cont.)

- Typing `car` will reveal that the `id` is equal to `nil`. This signifies that this is an in memory object only and has not been saved to the database yet.

- Let's save it:

	```ruby
	car.save
	```

- Looking at the console's output will show us the SQL that ActiveRecord is abstracting us from, but more importantly, the result of the `car.save` method, which should be `true`.

---

### Creating New Model Objects (cont.)
<br/><br/>

<p>The process of saving in-memory data to a more permanent storage, such as a database, is known as:</p>
<br/><br/>

#### Persistence

---

### Creating New Model Objects (cont.)

- If the `save` method fails, it will return `false`. This can happen for example if data is missing for required attributes or there's invalid data. This allows us to take different actions in our controllers. For example:

	```ruby
	if @car.save
		# redirect to the show view
		redirect_to car_path(@car)
	else
		# render the new view again
		render :new
	end
	```

---

### Creating New Model Objects (cont.)
<br/>

- Now let's look at the `create` method.

- Calling `create` basically is like calling `new` + `save`:

	```ruby
	car2 = Car.create(make: "Mini", year: 2016, price: 20000)
	```

---

### Creating New Model Objects (cont.)
<br/>

- Another difference between `create` and `new + save` is that `create` will always return an object, which always evaluates to truthy.

- So, to check if the model was saved successfully in the database, use the `valid?` method like this:

	```ruby
	if Car.create(make: "Mini", year: 2016, price: 20000).valid?
		#successfully saved
	...
	```

---

## Quick Review
<br><br><br>
####Let's go around the room and review the workflow when creating a basic Rails app with a model.


---

## Practice
<br>

1. Create another Model named `Person` with these attributes:
	- `first_name` (string)
	- `last_name` (string)
	- `age` (integer)

2. Add one `Person` to the database using `new`.

3. Add another `Person` to the database using `create`.

---

## Final Questions
<br>

- **Models have a one-to-one mapping with __________ in the database.**

- **A database's schema should only be modified using __________.**

- **If we have a Model class called `LineItem`, what will the table be named?**

- **As our application evolves over time, we use __________ to modify our database's schema.**

- **What benefit does an ORM provide to developers?**

---

## References
<br>

- [ActiveRecord Basics](http://guides.rubyonrails.org/active_record_basics.html)

- [Rails Migrations](http://guides.rubyonrails.org/active_record_migrations.html)


