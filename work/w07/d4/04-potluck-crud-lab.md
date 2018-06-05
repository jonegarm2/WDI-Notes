### Potluck Lab
<img src="https://i.imgur.com/CHIRiWW.png" style="display:block;margin:0 auto" width="900">

---
#### So, this week we introduced you to several key technologies in the world of web development: NodeJS, Express and MongoDB/Mongoose.

#### Time for some reps with CRUD.

## Requirements for the _Potluck_ App
- Just like your lessons this week, this app will use NodeJS, the Express framework and Mongoose/MongoDB.

- The Potluck app will track which student is bringing which dish to the party!

- The app will _require_ a single **model**: `Student`.

- The schema for the Student model will define only two paths: `name` & `dishes`.

- `dishes` in the Student model are going to be sub-documents of the type `dishSchema`.

- The `dishSchema` is to have two paths: `cuisine` and `dish`.

- Use an `enum` validator to ensure that `cuisine` is limited to a list of a cuisines.  What's a good way to ensure that the user can only choose a cuisine listed in the enum when adding or editing?

- When the user browses to the root route ('/'), the _views/index.ejs_ home page should display a list of students along with each student's delicious dish(es) that the student is bringing to the potluck.

- From the root home page, display UI that allows navigation to the following functionality:
	- Add new Students.
	- Add or edit dishes.

- Also on the root home page, provide a link to delete a student and delete a dish.

- The actual design of the pages and styling is up to you.

## Hints

- Don't forget to install and use the `method-override` middleware.

## Bonus

- If a student has no dishes, display a message like "Moocher Alert!" for that student.

- Use partial templates for the forms used to submit new & edit Students and Dishes.



## References

[Express](http://expressjs.com/)

[MongoDB](http://www.mongodb.org/)

[Mongoose](http://mongoosejs.com/)

[EJS - Useful Docs](http://ejs.co/)

[EJS Template Tutorial](https://scotch.io/tutorials/use-ejs-to-template-your-node-application)
