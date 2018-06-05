<img src="https://i.imgur.com/2mZHtjU.png">

# Challenge Lab

## Requirements

- Continue to build out this GitHub users app to add search functionality that finds GitHub usernames based upon a provided partial GitHub username's actual name.

- For the UI, display a search form to the left of the existing form.

- When the search form is submitted, display a new view that lists the matching usernames (the way we are listing repos would work well).  Here's the result of searching for `Jim Clark`:

	<img src="https://i.imgur.com/nIZSDb3.png">

- Clicking on a username in the resulting list would then perform the search and display the user info as the current version of the app does.

## Hints

- The _index.js_ routes file might look something like this when you're done:

	```js
	router.get('/', githubCtrl.userDetails);
	router.post('/', githubCtrl.userDetails);
	
	// new route for searching for a user
	router.post('/search', githubCtrl.search);
	```
	
	Note that we are able to use the same route handler code (`userDetails`) in both of these cases:
	- When a username is submitted as a `POST /` (implemented in the lesson)
	- Or, as part of this exercise, when one of the usernames in the above screenshot is clicked to submit a `GET /` with the username sent within a query string. How to enable this flexibility of being able to extract a username from either a form's `POST` or as a query string in `userDetails` is shown below...

- Refactor by putting the code for the POST route in _routes/index.js_ into a separate controller module.  Refactoring will allow us to reuse the code from another route. The `userDetails` handler might start like this:

	```js
	function userDetails(req, res) {
	  var username = req.body.username || req.query.username;
	  if (!username) return res.render('index', {userData: null});
	```
	Notice how this allows for reuse of the `userDetails` handler and the _index.ejs_ view - whether a username is submitted or not!
	

- Since displaying the name-based search results will be very similar to that of the GitHub username search, after you add the new name-based search form on the left-side of _index.ejs_, copying _index.ejs_ to another view would helpful and productive. Naming this new view something like _search-results.ejs_ make sense.

- The new search will require using the GitHub API's _**user\_search\_url**_ endpoint that accepts a `?q={query}` query string.

- Here are the search docs that explains how to search for users:<br>[https://developer.github.com/v3/search/#search-users](https://developer.github.com/v3/search/#search-users)

- Use the `in:fullname` qualifier so that you can enter part of a name and find matches.


#### Collaboration with your fellow students is suggested - and so is having fun!

