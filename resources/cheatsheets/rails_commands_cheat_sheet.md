# `rails` Commands Cheat Sheet

The most common `rails` commands:

* `rails new` [APP-PATH] Create a new Rails application. "rails new my_app" creates a
             new application called MyApp in "./my_app". This command requires an argument of app path (which you might as well consider to be the app name) `rails new APP_PATH` [options]
	* `-d`, [--database=DATABASE]<br>If not specified, default database engine will be sqlite3.
	* `-T`, [--skip-test-unit], [--no-skip-test-unit]<br>Skip Test::Unit files

* `rails generate`    Generate new code (shortcut: `rails g`)
	* `model` generates a new model. Always use singular naming convention for your model.
	* `controller` generates a new controller. Always use plural naming convention for controllers.
	* `helper` 
	* `mailer`
	* `migration` generate a migration. Google for syntax available.
	* `scaffold` good learning tool to experiment with, but try holding off on this for as long as possible. It will do lots of stuff that you don't understand.
* `rails destroy`      Undo code generated with "generate" (shortcut: `rails d`)
 
* `rails console`     Start the Rails console (shortcut: `rails c`)
 
* `rails server`      Start the Rails server (shortcut: `rails s`) 
 
* `rails routes` shows a list of all available routes

* `rails db:migrate` runs all db migrations that follow the current schema version number

* `rails db:migrate:status` returns the up/down status of migrations

* `rails db:seed` runs the seed file and populates our database with seed records (if there are any)

* `rails db:create` not necessary for sqlite3, however it is essential for postgres. 

* `rails db:drop` drops the current db

