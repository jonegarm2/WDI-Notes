## A Primer on Data Modeling 

![edgar](https://upload.wikimedia.org/wikipedia/en/5/58/Edgar_F_Codd.jpg)

---

## Learning Objectives 

SWBAT...

* Identify data that has one-to-one, one-to-one and many-to-many relationships
* Construct an ERD that has one-to-one, one-to-many and many-to-many relationships

---

## Relational Database Review 

* Relational databases are made up of tables 

![table-db](https://docs.google.com/drawings/d/1GCC-L5Tdt7eLpN137sdexqKRmpNRedzQEuDai8BU4lg/pub?w=960&h=420)

---

## Tables in Relational Databases

* Tables are comprised of rows (a.k.a., records) and columns 

![table](https://cloud.githubusercontent.com/assets/25366/8589355/2646c588-25ca-11e5-9f2d-3d3afe8b7817.png)

---

## What is Data Modeling?

Data modeling is...

* an art
* creating a conceptual model of relationships in your data 
* a process where you ask how data in one table is related to data in another table
* a way of creating tables that allow you to retrieve data quickly and easily

---

Data modeling is **NOT** a trivial endeavor.

---

## Data Modeling 

The end result of data modeling is a "document" called an **Entity-Relationship Diagram** (ERD) to come up with our schemas. This involves two steps: 

1. **Requirements Analysis**: Ask what data do you need to store (this involves "business people")
2. **Conceptual Design**: Coming up with a way to structure the data you want to store in tables (this is the step where we actually write an ERD)

---

## Definition: Schema 

A **schema** of a table is the table's name, its attribute's names and its attribute's types

---

## What's a Primary Keys

**Quiz**: What is a primary key?

---

## Foreign Keys 

|Player            |Goals|Age|Team         |
|------------------|-----|---|-------------|        
|Lionel Messi      |25   |29 |FC Barcelona |    
|Luis Suarez       |23   |30 |FC Barcelona |
|Cristiano Ronaldo |19   |32 |Real Madrid  |

AND

| Team Name  | Position | Titles |
|------------|----------|--------|
|FC Barcelona|    2     |   24   |
|Real Madrid |    1     |   32   |


A **foreign key** is a column in one table that uniquely identifies a row of another table

**Quiz**: What is the foreign key in the Player Table?

---

## Relationships

We say that data has relationships:

* One-to-one
* One-to-many
* Many-to-many

---

We use the term **entity** to refer to an abstract piece of data.

---

## One-to-one 

* A row in a table is associated to one and only one row in another table 
* An example of a one-to-one relationship is a person can have one social security number and a social security number can only be assigned to one person
* In most cases we put data with a one-to-one relationship in the same row

---

## With a Partner (5 mins)

Come up with an example of a one-to-one relationship.

---

## One-to-many

* The most common relationship used when creating relational databases.  
* A row in a table in a database can be associated with one or (likely) more rows in another table.  
* An example of a one-to-many relationship is a single team has many players on that team. 

---

## With a Partner (5 mins)

Give me an example of a one-to-many relationship.

---

## Many-to-many

* When one or more rows in a table are associated with one or more rows in another table.  
* An example of a many-to-many relationship is a table of customers who can purchase many different products and a table of products that can be purchased by many different customers.

---

## With a Partner (5 mins)

Give me an example of a many-to-many relationship.

---

## Entity Relationship Diagrams

An Entity Relationship (ER) Diagram is a type of flowchart that illustrates how “entities” such as people, objects or concepts relate to each other within a system.

Let's take at look at this [ERD](https://camo.githubusercontent.com/21f01e4fb4c8af8a32afecb64d15e8220b997637/687474703a2f2f7777772e766976656b6d636861776c612e636f6d2f636f6e74656e742f696d616765732f323031332f4465632f4552445f52656c6174696f6e736869705f53796d626f6c735f517569636b5f5265666572656e63652d312e706e67)

---

## Exercise (10 mins)

With a partner create an ERD for storing some information about books. 

* A book can have one title 
* A book can have multiple authors 
* A book can be in one or more genre

---

## Data Access Patterns

Let's start with an example.

Let's say you had the following data:

|Name    | Favorite Color |
|--------|----------------|
|Steve   |Green           |
|Jenny   |Blue            |
|Samantha|Red             |
|Eric    |Yellow          |
|Bob     |Orange          |

What's the best **JavaScript** data structure to store this information in? **Note**: Each *friend* has a unique name.

---

## First Attempt

|Name    | Favorite Color |
|--------|----------------|
|Steve   |Green           |
|Jenny   |Blue            |
|Samantha|Red             |
|Eric    |Yellow          |
|Bob     |Orange          |

You might want to store this data in an array:

```js
var friends_and_colors = ["Steve", "Green", "Jenny", "Blue", ....]
```

But, suppose you wanted to get a friend's favorite color. Imagine having to write a function that did this.

---

## First Attempt (Cont.)


```js
var friends_and_colors = ["Steve", "Green", "Jenny", "Blue", ....]
```

Suppose you wanted to write a function that returns to you an array with the name of your friend along with their favorite color.

For example this function would return this,

```js
["Steve", "Green"]
```

This would be a really awkward function to write. We would need to...

* Get the index of the friend in question 
* Add one to this index to get their favorite color
* Extract these elements from an array

Can we do better?

---

Yes! We can put this data into an object. Like this:

```js
var friends_and_colors = {"Steve":"Green", "Jenny":"Blue", ....}
```

To get Steve's favorite color all we do is write:

```js
friends_and_colors.Steve
```

---

The way we organized our data matters! 

A **data access pattern** is the way that you will commonly want to access your data. You want to structure your database in a way that makes accessing data easier for you (e.g., using an object instead of an array in the previous example).

---

## Data Modeling Challenge 

Create a data model for an e-commerce site. This site has 3 entities: 

* User
* Products 
* Cart

A user can purchase many products.
A product can be purchased by many users. 
A user has one cart. 
A cart can have many products in it.

---

# FIN
