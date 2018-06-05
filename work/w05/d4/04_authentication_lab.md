![](https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS77dTZfMjKpOPNhxPNj-hd5rTkSgsCPXZaVOKBd_1nqVxPV_Xm)

# Authentication Lab
---

## Intro

You just had the time of your life hand rolling authentication to a Rails app. 

But you know by now that this stuff doesn't stick without practice. So let's practice!

## Exercise

Here is your mission:

1. `rails new <insert an app name here> -d postgresql -T`
2. Generate a `User` model compatible with `has_secure_password` authentication. Hint: Don't forget a certain critical attribute...
3. Your choice on whether to use an `email` or `username` attribute to uniquely identify your user, however, as a user and a dev, I prefer to use an `email` only.
4. Include in your model any additional fields you want (`first_name`, `age`, etc.).
5. Do not generate any other models in this lab! You will only need the `User` model.
6. Code out your `User` model so that you can create new users in the Rails console and verify that:
  - Saving fails unless a unique `email` or `username` is provided.  Test this by attempting to create the same user twice.
  - Saving fails if the `password` and `password_confirmation` don't match.
  - The saved user has a `password_digest`.
7. Provide a `users#index` action that displays all users in the database. Display each user's `email` or `username`. 
8. In the `application.html.erb` view, include a `Sign Up` link that displays a sign up form, creates the user in the database when submitted and returns to the `index` view.
9. On the `application.html.erb` view, include a `Log In` link that displays a login form that logs in the user when submitted with valid credentials and returns to the `index` view.
10. On the `application.html.erb` view, if a user IS logged in, don't show the `Sign Up` or `Log In` links. Show a `Log Out` link instead that when clicked, logs out the user shows the `index` view. This functionality should hold up if the page is refreshed (requires that the login be persisted in the session).

## Bonus

- Require that passwords be at least 4 characters in length.
- If, and only if, a user is logged in, and except for the user that is currently logged in, display a `delete` link next to each `email` or `username` on the `index` view. Clicking the `delete` link should remove that user from the database and return to the `index` view.

## The Good News

- If you complete this lab, you will in essence have an excellent starting point for your Project 2!