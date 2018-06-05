<img src="https://i.imgur.com/sX12DTc.png">

# Unit 2 - Final Assessment

## Introduction (By Instructor)

This **Introduction** section will be read in class by the instructor.

Students are to have their laptops closed until directed to open them.

Students will be self-directed beginning with the **Instructions & Time Guidelines** section below.

### GOAL

The goal of this final assessment is to gauge your ability to develop a **minimal** fullstack web application using the Ruby-on-Rails framework, including your ability to:

- Define a root route and routes for a resource.
- Generate a model.
- Run a migration.
- Define a controller.
- Code actions in a controller to perform basic CRUD.
- Code a view using a combination of HTML & ERB.

### DEMO

The instructor will now demonstrate the app you will be building.

### OVERALL APPLICATION REQUIREMENTS

As you saw, the application consist of:

- A single page, "Wacky Widgets" that displays all widgets in the database and provides a form to add a new widget.
- When browsing to the root route of the application (`http://localhost:3000`), the "Wacky Widgets" page is displayed - not the "Yay! You're on Rails" page.
- In addition to displaying the `description` (string) and `quantity` (integer) attributes for each widget in a table row, there is a link (styled to look like a red button) displayed to remove that widget from the database.
- After a widget is added, or removed, the application redirects back to the "Wacky Widgets" view.
- If there are no widgets in the database, show a message "No Widgets Exist"

Use the screenshots below as your "wireframes".

In addition, you will find some hints and CSS along the way.

Lastly, the styling does not have to be exact, however, the closer it is to the screenshots, the better!

### PROCESS

This assessment is an **individual** assignment - no collaboration please.

The good news is that it's "open book" - you may reference anything on your computer, Google, use notes, etc. 

However, don't spend valuable time researching unless you're stuck - **do not over-think this application!**

You will be allotted **90 minutes** to complete this assessment.

You must slack the link to your Heroku deployment by the cutoff time (written on the wall).

## Instructions & Time Guidelines (You've Got This!)

Please follow the following steps in order:

- **STEP 1 - Prepare** (&asymp; 5 minutes)
- **STEP 2 - Set Up the App** (&asymp; 5 minutes)
- **STEP 3 - Implement the App's Requirements** (&asymp; 70 minutes)
- **STEP 4 - Deploy to Heroku** (&asymp; 10 minutes)

**Total time allowed to complete this assessment is 60 minutes.**

## Assessment Steps to Complete

### STEP 1 - Prepare (5 minutes)

Briefly read through the rest of this assignment to better understand what is required before starting to code.

### STEP 2 - Set Up the App (5 minutes)

Follow the standard workflow for creating a new Rails app.

Since you will be deploying this app, be sure to specify the correct database engine.

Speaking of databases, don't forget that it doesn't exist until you create it!

Lastly, the demo application takes advantage of the Bootstrap CSS framework.  You can add the following to your `application.html.erb` to play along:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```

### STEP 3 - Implement the App's Requirements (70 minutes)

#### STEP 3.1

The app should display something like this when we browse to `http://localhost:3000` without any widgets in the DB and the new widget form not added to the page yet:

<img src="https://i.imgur.com/Fq4YagB.png">

The `Widget` model, along with the related controller and the single view have been defined. Again, the `Widget` model only has two attributes: `description` (string) and `quantity` (integer).

The "Wacky Widget" page header is an `<h1>` element and styled by adding Bootstrap's `jumbotron` and `text-center` classes.

The "No Widgets Exist" message should be displayed when there are no widgets in the database. It is an `<h3>` with a class of `text-center`.

#### STEP 3.2

After the form for adding a new widget has been added to the view, the display should look something like this:

<img src="https://i.imgur.com/of3ogCG.png">

The "Add Widget:" heading is an `<h4>` and above it is an `<hr>`.

You can style the form elements by wrapping each label/input with a `<div class="form-group">` and by adding the class of `form-control` to the `<input>`.

Hint: Adding the `form-control` to the generated input can be done like this:

```html
<%= f.text_field :description, class: "form-control" %>
```
and similarly to make the "Add Widget" submit button green:

```html
<%= f.submit "Add Widget", class: "btn btn-success" %>
```

#### STEP 3.3

When there are widgets in the database, the display should look something like this:

<img src="https://i.imgur.com/JQXkrXq.png">

The table's header row (`<tr>`) has three header cells (`<th>`): **Description**, **Quantity** & **Remove**
Each widget is being displayed as a table row within a table.

The table and its cells have been styled by adding this CSS to the `application.css` file:

```css
table {
  width: 100%;
}

th:nth-child(2), th:nth-child(3), td:nth-child(2), td:nth-child(3) {
  height: 40px;
  text-align: center;
}
```

The red "X" remove button is generated using a `link_to` as usual. It is styled to look like a button by adding Bootstrap classes similar to the way we saw above - by adding a `class: <string>` key/value pair at the end of the helper like this:<br>`<%= link_to ... , class: "btn btn-xs btn-danger" %>`


#### STEP 3.4

Clicking one of the remove buttons will remove that widget from the page. For example, no more Candy Apples:

<img src="https://i.imgur.com/HEGpuT5.png">

Congrats, that's all there is to it!

### STEP 4 - Deploy to Heroku (10 minutes)

Please follow these steps to deploy your app to Heroku:

1. Rails has already initialized a local git repository, so there's no need to `$ git init`.

1. In Terminal, make a commit: `$ git add -A && git commit -m "Initial commit"`

1. To save time, there's no need to create a repo in your GitHub account.

1. Still in Terminal, the following command will create a project in your Heroku account: <br>`$ heroku create`

1. Deploy to Heroku with this command:<br>`$ git push heroku master` 

1. Run the migrations on the deployment:<br> `$ heroku run rails db:migrate`

1. Test it out:<br>`$ heroku open`

**Slack the deployed app's link to your instructors - congrats, you are done!**

### STEP 5 - Bonus (optional)

Show the total quantity for all widgets in a final row at the bottom of the table like this:

<img src="https://i.imgur.com/DiKMo9E.png">

Here's some additional CSS to style the final row:

```css
tr:last-child td {
  border-top: 1px solid grey;
  font-weight: bold;
}

tr:last-child td:first-child {
  text-align: right;
}
```

