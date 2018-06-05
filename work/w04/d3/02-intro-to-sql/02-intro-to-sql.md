[Here](https://presentations.generalassemb.ly/3216503baeffd15568105c7351eb3859#/) is a link to these slides.


# A Practical Introduction to Relational Databases

---

## Prelude 

All resources were shamelessly taken from [Stanford's CS 145](http://web.stanford.edu/class/cs145/).

---

## What is a Database?

* The word **database** refers to any "technology" that stores data in an organized fashion for an extended period of time
* A filing cabinet is a *type* of database. 
  - It stores files (the contents of the files are the *data*) in an organized manner 
    (possibly in alphabetical order by file name)
    
![filing](http://www.staples-3p.com/s7/is/image/Staples/s0288705_sc7?$splssku$)    

---    

## Why Do We Use Databases?

* Databases store information in a highly structured and searchable way 
* Data in a database must be organized in such a way that it can logically and quickly be retrieved 
* The rise of the Internet gave us a lot of info (~ millions of terabytes); we need a way of organizing this data so it can later be queried

---

#### What Makes Relational Databases Relational

* **Tables** (a.k.a, **relations**) are what make relational databases "relational"
* Relational databases store data in tables (a.k.a, **relations**)
* Relational databases are the only type of database that use tables
* Tables are made up of **rows** (a.k.a, **records** or **tuples**) and **columns** (a.k.a, **attributes**).

![table](https://cloud.githubusercontent.com/assets/25366/8589355/2646c588-25ca-11e5-9f2d-3d3afe8b7817.png)

---

#### What Else is Out There? 

* A relational database is one "flavor" of database. Remember that relational databases organize data into tables made up of attributes and tuples
* Other types of databases include: 
  * Key-value stores: stores data in a key-value associative array (like a JS object or Ruby hash) (Redis, MongoDB)
  * Blockchain: A highly distributed database comprised of "blocks" linked to one another

---

### For this lecture I will use the terms attribute, column and record 

---

## Wee Bit O' History 

* Edgar F. Codd, a British computer scientist working at IBM, came up with the "relational model" in the 1970's in [this](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.98.5286&rep=rep1&type=pdf) paper
* The core ideas of the relational model are rooted in a branch of mathematics called Set Theory 
* Since the 1970's relational DB's have become a big, BIG business (read: give me money and you can use my DB infrastructure)

---

## Database vs Database Management System 

* The term *database* is a generic term referring to anything that stores data
* *Database Management Software* is a piece of software used to manipulate a database
    - [PostgreSQL](https://www.postgresql.org/) (we will use this one)
    - [MySQL](https://www.mysql.com/)
    - [MariaDB](https://mariadb.com/kb/en/mariadb/introduction-to-relational-databases/)

**We will be using a DBMS called PostgreSQL to interact with a database**

---

## Relational Databases are Made Up of Tables

![table-db](https://docs.google.com/drawings/d/1GCC-L5Tdt7eLpN137sdexqKRmpNRedzQEuDai8BU4lg/pub?w=960&h=420)

---

### Attribute Constraints 

All data in a given attribute must be of the same type. Examples of different types you'll see an attribute having are: 

* `varchar(80)` - a string that is 80 characters in length or less
* `int` - a number without a decimal
* `real` - a number with a decimal
* `serial` - an autoincrementing integer (e.g., 1 then 2 then 3 ...)

---

### Attribute Constraints 

* Attributes can only store **atomic** types
* An atomic type is a single thing like a string or integer 
* Sets and lists are not atomic types; integers and characters are

---

### Cardinality and Arity

* The number of records is the **cardinality** of a relation 
* The number of attributes is the **arity** of the relation

---

## Olé, olé, olé: An Example

Here is an example of a table:

|Player Name           |Goals|Age|
|------------------|-----|---|
|Lionel Messi      |25   |29 |
|Luis Suarez       |23   |30 |
|Cristiano Ronaldo |19   |32 |

* Attributes: Player Name, Goals, Age
* Records: Lionel Messi, Luis Saurez, Cristiano Ronaldo

---

## Records and Columns

|Player Name           |Goals|Age|
|------------------|-----|---|
|Lionel Messi      |25   |29 |
|Luis Suarez       |23   |30 |
|Cristiano Ronaldo |19   |32 |

* All data in a single attribute should be of the same data type
  - e.g., all data in the `Goals` column is of type Integer
* All data in a record should be about the same thing
  - e.g., all data in a row is about a single player (e.g., Messi, Saurez, Ronaldo)
  
---

## Team Table 

Let's say we also wanted to store data about the teams these players were on. The data we want to store for each team is:
  
  * Team Name 
  * Current League Positions (abbreviated Position)
  * Number of La Liga Titles That Team Has Won (abbreviated Titles)
  
Where would we store this data?

---

### One-to-Many 

We say that something is one-to-many if their is many entities (e.g., players) for one entity (e.g., team).

*One* teams has many *players*

---

## Team Table 

We want to store Team Name, Position and Titles

What would our original table look like if we stored Team data and Player data in the same table?

|Player Name           |Goals|Age| Team Name  | Position | Titles |
|------------------|-----|---|------------|----------|--------|
|Lionel Messi      |25   |29 |FC Barcelona|    2     |   24   |
|Luis Suarez       |23   |30 |FC Barcelona|    2     |   24   | 
|Cristiano Ronaldo |19   |32 |Real Madrid |    1     |   32   |

Notice that we have duplicate data. 

**Question: How many records do we have to update when FC Barcelona wins a title?**

---

## Duplication is Bad

|Player Name           |Goals|Age| Team Name  | Position | Titles |
|------------------|-----|---|------------|----------|--------|
|Lionel Messi      |25   |29 |FC Barcelona|    2     |   24   |
|Luis Suarez       |23   |30 |FC Barcelona|    2     |   24   | 
|Cristiano Ronaldo |19   |32 |Real Madrid |    1     |   32   |

Generally we want all data to be stored at most **ONCE** in our database. This makes it easier to update. For example if we wanted to update the number of titles FC Barcelona has won we would have to update 2 rows. What if FC Barcelona had 1,000 players? Updating would be very inefficient.

---

#### Say No to Repeated Data

* Repeating data is a waste of storage space.
  * Use less storage space you save money which means you make more $.
* Repeating data makes it more likely that when you update it you will make a mistake

---

We say that a database that does not have duplicate info is **normalized**.

---

## Creating a Team Table 

A better way to do this is to construct two tables: a Player Table and a Team Table

|Player Name           |Goals|Age|Team         |
|------------------|-----|---|-------------|        
|Lionel Messi      |25   |29 |FC Barcelona |    
|Luis Suarez       |23   |30 |FC Barcelona |
|Cristiano Ronaldo |19   |32 |Real Madrid  |

AND

| Team Name  | Position | Titles |
|------------|----------|--------|
|FC Barcelona|    2     |   24   |
|Real Madrid |    1     |   32   |

**Questions**: What data is in both tables?
**Question**: How many records do we have to update when FC Barcelona wins a title?

---

## Primary Keys 

A **primary key** is a piece of data that uniquely identifies a record. A primary key is always in the same table as the record it identifies. 

|Player Name      |Goals|Age|Team         |
|------------------|-----|---|-------------|        
|Lionel Messi      |25   |29 |FC Barcelona |    
|Luis Suarez       |23   |30 |FC Barcelona |
|Cristiano Ronaldo |19   |32 |Real Madrid  |

Assuming no 2 humans can have the same name, data in the `Player` column is the primary key. Why is this a bad primary key?
What would be a better primary key?

---

|Player Name       |Goals|Age|Team         |
|------------------|-----|---|-------------|        
|Lionel Messi      |25   |29 |FC Barcelona |    
|Luis Suarez       |23   |30 |FC Barcelona |
|Cristiano Ronaldo |19   |32 |Real Madrid  |

AND

| Team Name  | Position | Titles |
|------------|----------|--------|
|FC Barcelona|    2     |   24   |
|Real Madrid |    1     |   32   |

A **foreign key** is a key that lives in one table but uniquely identifies a record in another table. The foreign key in the `Player` table is the `Team` attribute because it references the primary key in another table: the `Team` table.

---

## SQL 

SQL (pronounced "ess-kew-ell") or Structured Query Language is the programming language we use to add data, remove data, update data and delete data from a relational database.

---

## Quiz

|Player Name          |Goals|Age|Team         |
|------------------|-----|---|-------------|        
|Lionel Messi      |25   |29 |FC Barcelona |    
|Luis Suarez       |23   |30 |FC Barcelona |
|Cristiano Ronaldo |19   |32 |Real Madrid  |

AND

| Team Name  | Position | Titles |
|------------|----------|--------|
|FC Barcelona|    2     |   24   |
|Real Madrid |    1     |   32   |

**Quiz**: What are the name(s) of the players who scored over 20 goals?

---

## SQL 

```sql
SELECT Player Name 
FROM Player
WHERE Goals > 20;
```

---

## Asking Questions 

SQL is a declarative language where we **ask questions** of our database. We don't worry about *how* our database gets us the data.

For example if we had a class database, can you get me a list of people whose names start with "A"?

---

## DB CRUD 

Their are 4 broad things we want to do to a database: 

* **C**reate - create tables and databases
* **R**ead - read or "see" the data in a database
* **U**pdate - update the records for a given table
* **D**elete - delete any records for a table

---

## We Do CRUD with SQL 

The way we modify a database is with SQL statements that contain SQL keywords like these: 

* SELECT 
* WHERE 
* INSERT
* CREATE 
* DELETE 
* DROP
* LIKE

---

## LIKE Command

The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.

There are two wildcards used in conjunction with the `LIKE` operator:

`%` - The percent sign represents zero, one, or multiple characters
`_` - The underscore represents a single character


```SQL
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';
```

---

## PostgreSQL Server

* We will be using `psql` to interact with our PostgreSQL DB.`psql` allows you to execute SQL commands on your PostgreSQL database
* Databases have a server layer in front of them that listens for queries

---

### Let's Do a Code Along 