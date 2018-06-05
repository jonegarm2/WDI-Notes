## Week 8 Conceptual - NAME: ______________ &nbsp;&nbsp;&nbsp;&nbsp; ___ / 10

### Auth

>Please read all of the auth questions before answering any of them.

##### 1) In your own words, briefly describe authentication:
<br><br><br>

##### 2) In your own words, briefly describe OAuth:
<br><br><br>
  
##### 3) In your own words, briefly describe authorization:
<br><br>

### APIs

##### 4) We code a traditional web app to respond to HTTP requests with _____________.

##### 5) We code an API to respond to HTTP requests with  _____________ .

##### 6) True or False: The same web application can behave as a traditional web app (process requests, render views, etc.) AND serve as an API?

### AJAX, etc.

##### 7) True or False: If we want to send data via AJAX to a server from a web page, we must use a `<form>` tag to contain the `<input>`, `<select>` and/or `<textarea>` elements.

##### 8) True or False: We must use JavaScript to make an AJAX request.

##### 9) ActiveRecord is to PostgreSQL as _______________ is to MongoDB.


```js
var students;

Student.find({}, function(err, docs) {
	students = docs;
});
```

##### 10) Is the above code functionally equivalent to the code below?

```js
var students;

Student.find({})
.then(function(docs) {
	students = docs;
});
```
