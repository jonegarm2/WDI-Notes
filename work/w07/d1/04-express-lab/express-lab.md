![](https://i.imgur.com/vUOu9NW.jpg)

# Express Practice/Lab/After Hours
---

## Intro

It's been a long day and you've covered a lot of ground.

It's natural, in fact, **expected**, to feel "uncomfortable" and confused by Node.js & Express at this point.

As always, the journey toward competence requires practice - so let's get on with it!

## Exercise

>This exercise can be worked on individually or in pairs/groups.

The goal of the exercise is to continue to build-out your `first-express` app to include full RESTful CRUD on `todos`.

#### Hints:

1. If feeling overwhelmed, be sure to isolate tasks into smaller, more manageable chunks.

2. Move `todos` into a separate module so that the array can be required wherever it is needed.
	
	```js
	module.exports = [
	  {todo: 'Feed dogs', done: true},
	  {todo: 'Learn Express', done: false},
	  {todo: 'Have fun', done: true}
	];
	```

3. Start with defining the routes. Remember to make them RESTful by making them follow the design conventions of a RESTful resource!

4. Fancy styling in your views is not a priority, but feel free to sprinkle in some styling if you have the time.

5. You'll have to get used to writing your HTML forms and links - there are no built-in helpers like we had in Rails.

6. If you can't remember how to write an HTML `<form>`, `<a>`, etc., I recommend:
	- Inspecting the HTML sent over by the views in your Rails apps for guidance.  You can ignore the `authenticity-token` stuff.
	- Google for docs, StackOverflow, tutorials, etc.

7. Be sure to include full HTML document boilerplate in each EJS template file - remember, there is no `application.html.erb` layout file like in Rails!  However, you can improve matters a bit by using partials, i.e., a partial for the stuff above the body that includes the nav, etc.

8. **IMPORTANT:** Like in Rails, RESTful CRUD requires Update & Delete requests to "simulate" HTTP `PUT` and `DELETE` methods. For this, your app will need the [method-override middleware](https://github.com/expressjs/method-override?_ga=1.86160592.957573653.1456704853). For the easiest way to use it, follow the example shown in the **override using a query value** section of the docs.

## Bonus

- Use EJS partial views to make your templates more DRY (see link in Reference section of the lesson) and/or [this link](https://www.npmjs.com/package/ejs#includes).

- Include Bootstrap, or another CSS framework, if you want your app to look sweet like bear meat.
