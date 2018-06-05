# Starting Your Rails App

## Create a New App

The very simple rules are this:

1. **Not inside another repo!**
2. If you re-use a former app's name, you'll have issues
   with the database; try not to *re-use* app names!

Then:

```
$ rails new app_name --database=postgresql --skip-test-unit
$ cd app_name # every action below assumes you are in the app directory!
```

What does this do? It creates a new Rails app that uses Postgres, and doesn't
create the unnecessary tests that we don't need for this class. By "skipping"
them we just have a cleaner repo.

For all the options, try `rails new --help`.

## Set Up the App

Go in to the app, and do necessary set up:

1.  Rename the README to use Markdown, and add a description of
    your app. Example:
    ```
    $ mv README.rdoc README.md
    $ echo "# New App\n\nThis is a new app." > README.md
    ```
    
2.  Add **Pry** and **BCrypt** to your project! In the `Gemfile`, add the 
    line `gem 'pry-rails'`, and *uncomment* the line with `gem bcrypt`.
    Aftwards, it should look like:
    ```ruby
    gem 'bcrypt', '~> 3.7.1'
    
    group :development, :test do
      gem 'pry-rails'
   
      # Call 'byebug' anywhere in the code to stop execution and get a debugger console
      gem 'byebug'
    end
    ```

## Begin Tracking the App with Git

Gittin' it!

```
$ git init                 # initialize a new repo
$ git add -A
$ git commit -m "initial commit"
$ hub create               # create a remote on GitHub
$ git push origin master   # copy up the repo
```

## Generate Your Boilerplate

As you've seen, we use the `rails` command to create Rails code. `rails new`
creates new app structures. We can use **[`rails generate` or `rails g`][g]**
to add boilerplate related to specific data types or entities from our ERDs!

Just run `rails` to learn more!

#### Scaffolds: *the Wrong Way*

```
$ rails g scaffold EntityName attribute_a:type attribute_b:type
```

This will create:

- an ActiveRecord migration (`/db/migrate/...rb`)
- an ActiveRecord model (`app/models/entity_name.rb`)
- an ActiveController (`app/controllers/entity_name_controller.rb`)
   - all of the "actions" or request handlers for the **[7 Railsy Routes][seven-routes]**
   - "helpers" for your controller logic (of little to no importance)
- a series of ERB views (`app/views/entity_name/*`) for the **7 Railsy routes**
- JSON "builders" for those routes (to be covered later)
- a standard `resource` statement in the router (`config/routes.rb`)
- a bunch of assets, or Coffeescript and Sass (`app/assets/*`)

#### [Models: *the Right Way*][g-model]

```
$ rails g model EntityName attribute_a:type attribute_b:type
```

The attribute name is whatever you want to name the column, and should
come from your ERD. The "type" is what data type it represents! There
are **[a few possible choices for types][types]**, but if none is given
then it defaults to `:string`.

Example:

```
$ rails g model Book isbn author title description:text edition:integer has_read:boolean
```

This will create:

- an ActiveRecord migration (`/db/migrate/..._create_books.rb`)
- an ActiveRecord model (`app/models/book.rb`)

And *that's it*! A lot cleaner, right!

From this point on, we write our own **routes**, **controllers**, **actions** 
(route handlers found inside the controllers), and **views**. If you want to
skip the process of adding some files, you can use `rails g resource`.

## Database Migrations

Finally, run:

```
$ rails db:create
$ rails db:migrate
```

We always need to remember that ***our Rails app is completely separate from
our database***!! Rails, through the tools of ActiveRecord (AR) migrations and
`rails`, however, let's us control the state of our database simply without
resorting to writing pure SQL (*not that there's anything wrong with that…*).

The most important things you can do are this:

1. `rails db:create` (create the database)
2. `rails db:drop` (delete the database)
3. `rails db:migrate` (run our AR migrations to build our database schema)
4. `rails db:seed` (run the AR code in `db/seeds.rb`, used to put dummy 
   data in our database)

You can only run `rails db:create` if the database doesn't exist!

You can only run `rails db:drop`, `rails db:migrate`, or `rails db:seed` 
if the database **DOES** exist!

You can only run `rake db:migrate` if the changes you are making are 
easily merged in to the current schema of the database. Otherwise,
you need to [**stop**, `drop`, `create`, and *then* `migrate`][ruff].

## Database Seeds

After you have generated your models and migrations, and then run
your `rake` tasks to ensure the database schema is correct, you
should create some dummy data in `rails console` or `rails c`
to test if all of your models are correct and don't create errors.

After that, you should add some simple setup to your `db/seeds.rb`
file to help you when you are building your app!

Example `db/seeds.rb`:

```ruby
book_list = [
  {isbn: "9487123", title: "Catcher in the Rye",  author: "JD Salinger", edition: 2, has_read: true},
  {isbn: "4328974", title: "Catch Me If You Can", author: "Someone",     edition: 1, has_read: false},
  {isbn: "1239410", title: "Rye Rye Rye",         author: "Beth Samson", edition: 4, has_read: false},
]

Book.create book_list
```

---

**Once you've done the above, you're ready to begin developing your
Rails app! Good luck!**

<!-- LINKS -->

[seven-routes]: https://gist.github.com/h4w5/36a8aaf7ea118e2c3aee#routes-for-resources-that-are-collections-and-members
[g]:       http://guides.rubyonrails.org/command_line.html#rails-generate
[g-model]: http://guides.rubyonrails.org/active_record_migrations.html#model-generators
[types]:   http://stackoverflow.com/questions/3956186/where-is-the-documentation-page-for-activerecord-data-types
[ruff]:    https://www.youtube.com/watch?v=ThlhSnRk21E
