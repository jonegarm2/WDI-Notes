![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Where In The World Is Carmen Sandiego?

![](http://i.giphy.com/13n8txR8c9UDHG.gif)

## Introduction

#### Use SQL to find Carmen Sandiego

We're going to use what we've learned already about searching with SQL commands, and apply it to chase down and capture an elusive and world-reknowned thief, Carmen Sandiego. Follow the clues, use the interweb - write down both the SQL commands /queries you used and your answers to the clues - and figure out where Carmen is headed, so we can catch her and bring her in.

## Exercise

#### Requirements

- Use the clues.sql file as your "answer sheet"
- From the command line, let's create a new database called ```carmen``` and populate it with the SQL found in ```world.sql```

```
# Enter psql
psql

# Create database
CREATE DATABASE carmen;

# Connect to carmen
\c carmen
\i world.SQL
```

Use the `\i` or **import** command to run your SQL queries from `clues.sql`. To run these queries type this in `psql`:

```psql
\i clues.sql
```

**Pro Tip:** You can do this in one step with the command:

```bash
psql -d carmen -f /your/path/to/this/file/starter-code/world.sql
```

Then, use the clues below to create the appropriate SQL queries to help you find Carmen and then, tell us where she's heading!!

#### Getting Started

First you should run all the commands in the `Requirements` section. Next you should add code to `clues.sql`. To test the results of `clues.sql` run
this in `psql`:

```psql
\i clues.sql
```

If you still have questions ask me (Jon).


#### Deliverable

Use the clues.sql file to write in the SQL queries that correspond with each clue and tell us where she's heading at the bottom:

<p align="center">
  <img src ="http://s3.postimg.org/8386vdt43/Screen_Shot_2015_07_08_at_8_11_25_PM.png">
</p>


## Additional Resources

- [PostgreSQL tutorial](http://www.tutorialspoint.com/postgresql/)
- [PostgreSQL official documentation](http://www.postgresql.org/docs/)

## Encore 

If you finish this exercise learn more about PostgreSQL and do [these](https://pgexercises.com/).
