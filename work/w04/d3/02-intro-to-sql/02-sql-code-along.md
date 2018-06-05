# SQL Setup, Insert, Update and Delete

### Objectives
*After this lesson, students will be able to:*

- Create a database table
- Insert, retrieve, update, and delete a row or rows into a database table

## We know about Databases, but what is SQL? Intro

Let's review: at it's simplest, a relational database is a mechanism to store and retrieve data in a tabular form.  Spreadsheets are a good analogy!  But how do we interact with our database: inserting data, updating data, retrieving data, and deleting data? That's where SQL comes in!

#### What is SQL?

SQL stands for Structured Query Language, and it is a language universally used and adapted to interact with relational databases.  When you use a Database Management System (DBMS) and connect to a relational database that contains tables with data, the scope of what you can do with SQL commands includes:

- Inserting data
- Querying or retrieving data
- Updating or deleting data
- Creating new tables and entire databases
- Control permissions of who can have access to our data

Note that all these actions depend on what the database administrator sets for user permissions: a lot of times, as an analyst, for example, you'll only have access to retrieving company data; but as a developer, you could have access to all these commands and be in charge of setting the database permissions for your web or mobile application.

#### Why is SQL important?

Well, a database is just a repository to store the data and you need to use systems that dictate how the data will be stored and as a client to interact with the data.  We call these systems "Database Management Systems", they come in _many_ forms:

- MySQL
- SQLite
- PostgreSQL (what we'll be using!)

...and all of these management systems use SQL (or some adaptation of it) as a language to manage data in the system.


## Connect, Create a Database

Let's make a database!  First, make sure you have PostgreSQL running.  Once you do, open your terminal and type:

```bash
$ psql
```

You should see something like:

```bash
your_user_name=#
```

Great! You've entered the PostgreSQL equivalent of IRB: now, you can execute PSQL commands, or PostgreSQL's version of SQL.

Let's use these commands, but before we can, we must create a database.  Let's call it wdi:

```psql
your_user_name=# CREATE DATABASE wdi;
CREATE DATABASE
```

The semicolon is important! Be sure to always end your SQL queries and commands with semicolons.

Now let's _use_ that database we just created:

```psql
your_user_name=# \c wdi
You are now connected to database "wdi" as user "your_user_name".
wdi=#
```

## Create a table

Now that we have a database, let's create a table (think of this like, "hey now that we have a workbook/worksheet, let's block off these cells with a border and labels to show it's a unique set of values"):

#### SQL style guide (see http://www.sqlstyle.guide)
1. Fields should *always* be lowercase
2. SQL _keywords_ should always be CAPS
2. Never name a field `id`; always correlate it to the table name (e.g. `student_id`).
3. Always check your company's style guide, or follow the convention; never create your own style.

```sql
CREATE TABLE instructors (
  instructor_id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  experience INT NOT NULL,
  website VARCHAR(50)
);
```

Typing the above query into `SQL` looks like this:

```psql
wdi=# CREATE TABLE instructors (
wdi(#  instructor_id  SERIAL PRIMARY KEY   NOT NULL,
wdi(#  name           TEXT          NOT NULL,
wdi(#  experience     INT           NOT NULL,
wdi(#  website        CHAR(50)
wdi(#  );
CREATE TABLE
```

Notice the different parts of these commands:

```psql
wdi=# CREATE TABLE instructors (
```
This starts our table creation, it tells PostgreSQL to create a table named "instructors"...

```psql
wdi(#  instructor_id        SERIAL   PRIMARY KEY   NOT NULL,
wdi(#  name      TEXT                NOT NULL,
```

...then, each line after denotes a new column we're going to create for this table, what the column will be called, the data type, whether it's a primary key, and whether the database - when data is added - can allow data without missing values.  In this case, we're not allowing `name`, `instructor_id` to be blank; but we're okay with `website` being blank.

## Create a student table and insert data

Now that we're keeping track of our instructors, let's create a table for students that collects information about:

- an id that cannot be left blank
- the students name that cannot be left blank
- their age
- and their address that cannot be left blank.

This is what that query would look like:

```sql
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
         age INT NOT NULL,
     address VARCHAR(50)
);
```

In psql that will look like:

```psql
wdi=# CREATE TABLE students (
wdi(#  student_id  SERIAL   PRIMARY KEY   NOT NULL,
wdi(#  name        TEXT                NOT NULL,
wdi(#  age         INT                 NOT NULL,
wdi(#  address     VARCHAR(50)
wdi(#  );
CREATE TABLE
```
Great job! Now let's finally _insert_ some data into that table - remember what cannot be left blank!

We'll insert five students, Jack, Jill, John, Jackie, and Slagathorn. The syntax is as follows:

```psql
INSERT INTO table_name VALUES (value1, value2, value3,...);
```

Let's do it for Jack, together:

```sql
INSERT INTO students VALUES (DEFAULT, 'Jack Sparrow', 28, '50 Main St, New York, NY');
```
In psql that will look like:

```psql
wdi=# INSERT INTO students VALUES (DEFAULT, 'Jack Sparrow', 28, '50 Main St, New York, NY');
INSERT 0 1
```

## Insert Data - Independent Practice (10 mins)

Now, you try it for more students, and pay attention to the order of Jack's parameters and the single quotes - they both matter.

- Jill's full name is Jilly Cakes; she's 30 years old, and lives at 123 Webdev Dr. Boston, MA
- Johns's full name is Johnny Bananas; he's 25 years old, and lives at 555 Five St, Fivetowns, NY
- Jackie's full name is Jackie Lackie; she's 101 years old, and lives at 2 OldForThis Ct, Fivetowns, NY
- Slagathorn's full name is Slaggy McRaggy; he's 28 and prefers not to list his address

**At the end of the 10 minute period I will show ya the solutions**


## What's in our database?

So now that we have this data saved, we're going to need to access it at some point, right?  We're going to want to _select_ particular data points in our data set provided certain conditions.  The PostgreSQL `SELECT` statement is used to fetch the data from a database table which returns data in the form of result table. These result tables are called **result-sets**. The syntax is just what you would have guessed:

```psql
SELECT column1, column2, column3 FROM table_name;
```
We can pass in what columns we want to retrieve - like above - or even get all our table records:

```psql
SELECT * FROM table_name;
```

The `*` is the wildcard symbol. It stands for *everything*. In this case it stands for all columns.

For us, we can get all the records back:

```psql
wdi=# SELECT * FROM students;
 id |      name      | age |                      address
----+----------------+-----+----------------------------------------------------
  1 | Jack Sparrow   |  28 | 50 Main St, New York, NY
  2 | Jilly Cakes    |  30 | 123 Webdev Dr. Boston, MA
  3 | Johnny Bananas |  25 | 555 Five St, Fivetowns, NY
  4 | Jackie Lackie  | 101 | 2 OldForThis Ct, Fivetowns, NY
  5 | Slaggy McRaggy |  28 |
(5 rows)
```

We can get just the name and ages of our students:

```psql
wdi=# SELECT name, age FROM students;
      name      | age
----------------+-----
 Jack Sparrow   |  28
 Jilly Cakes    |  30
 Johnny Bananas |  25
 Jackie Lackie  | 101
 Slaggy McRaggy |  28
(5 rows)
```

#### Getting more specific

Just like Ruby or JavaScript, all of our comparison and boolean operators do work for us to select more specific data.

- I want the names of all the students who aren't dinosaurs. Done:

```psql
wdi=# SELECT name FROM students WHERE age < 100;
      name
----------------
 Jack Sparrow
 Jilly Cakes
 Johnny Bananas
 Slaggy McRaggy
(4 rows)
```

- How about the names of students ordered by age? Done!:

```psql
wdi=# SELECT name, age FROM students ORDER BY age;
      name      | age
----------------+-----
 Johnny Bananas |  25
 Jack Sparrow   |  28
 Slaggy McRaggy |  28
 Jilly Cakes    |  30
 Jackie Lackie  | 101
(5 rows)
```

- How about reversed? DONE!:

```psql
wdi=# SELECT name, age FROM students ORDER BY age DESC;
      name      | age
----------------+-----
 Jackie Lackie  | 101
 Jilly Cakes    |  30
 Jack Sparrow   |  28
 Slaggy McRaggy |  28
 Johnny Bananas |  25
(5 rows)
```

## Updates to our database

Let's say that there are some mistakes we've made to our database, but that's cool, cause we can totally update it or delete information we don't like. Let's start by adding one more student:

```psql
wdi=# INSERT INTO students VALUES (6, 'Miss Take', 500, 'asdfasdfasdf');
INSERT 0 1
```

But oh no, we messed them up - Miss Take doesn't live at asdfasdfasdf, she lives at 100 Main St., New York, NY.  Let's fix it:  

```psql
wdi=# UPDATE students SET address = '100 Main St., New York, NY' where address = 'asdfasdfasdf';
UPDATE 1

wdi=# SELECT * FROM students;
 id |      name      | age |                      address
----+----------------+-----+----------------------------------------------------
  1 | Jack Sparrow   |  28 | 50 Main St, New York, NY
  2 | Jilly Cakes    |  30 | 123 Webdev Dr. Boston, MA
  3 | Johnny Bananas |  25 | 555 Five St, Fivetowns, NY
  4 | Jackie Lackie  | 101 | 2 OldForThis Ct, Fivetowns, NY
  5 | Slaggy McRaggy |  28 |
  6 | Miss Take      | 500 | 100 Main St., New York, NY
(6 rows)
```

But wait, actually, she just got abducted by aliens - no big!

```psql
wdi=# DELETE FROM students where name = 'Miss Take';
DELETE 1

wdi=# SELECT * FROM students;
 id |      name      | age |                      address
----+----------------+-----+----------------------------------------------------
  1 | Jack Sparrow   |  28 | 50 Main St, New York, NY
  2 | Jilly Cakes    |  30 | 123 Webdev Dr. Boston, MA
  3 | Johnny Bananas |  25 | 555 Five St, Fivetowns, NY
  4 | Jackie Lackie  | 101 | 2 OldForThis Ct, Fivetowns, NY
  5 | Slaggy McRaggy |  28 |
(5 rows)

```

## Let's Get Some More Practice

Do all the basic questions here on your own(https://pgexercises.com/questions/basic/).

## Conclusion

When we finally hook our apps up to databases - especially with Rails - we will have a whole slew of shortcuts we can use to get the data we need? So, wait, why the heck are we practicing SQL?  Well, let's look at what happens when you call for a particular user from a users table - with some nifty methods - in a Rails environment when you're connected to a database:

```ruby  
User.last
  User Load (1.5ms)  SELECT  "users".* FROM "users"   ORDER BY "users"."id" DESC LIMIT 1
=> #<User id: 1, first_name: "jay", last_name: "nappy"...rest of object >
```

There's SQL!!!

```SQL
SELECT  "users".* FROM "users"   ORDER BY "users"."id" DESC LIMIT 1
```

The Ruby/Rails scripts get converted to raw SQL before querying the database.  You'll know the underlying concepts and query language for how the data you ask for gets returned to you.

#### Common PostgreSQL Commands

Here are a list of some common Postgresql commands that you might need:

All of these commands can be executed in `psql`:

* `\l` - List all databases 
* `\c <db-name>` - Connects to a new database with name `<db-name>`
* `\dt` - List all tables
* `\d <table-name>`- List details for a table with name `<table-name>`
* `\?` - List all psql commands 
* `\q` - Quit psql 
* `\h` - List documentation for a SQL command