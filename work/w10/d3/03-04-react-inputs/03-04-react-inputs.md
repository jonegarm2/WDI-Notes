## Forms in React

By the end of this lecture you should be able to: 

* Use React to create forms with `<input>`, `<textarea>` and `<select>` tags
* Know the differences between **controlled** and **uncontrolled** components
* Know how to use the `ref` prop to access a form's contents

## React is a Control Freak

How do we grab an `<input>`'s value?

Let take a look at [this](https://codepen.io/jtamsut/pen/yoERZB?editors=1010).

React is just like jQuery in that in order to access a DOM node's value (i.e., an `<input>`'s text) we call the `value` property on a DOM node - `DOMNode.value`)

We also know that we can create a [melange](https://codepen.io/jtamsut/pen/MmxxXZ) of different input types by adjusting the `type` attribute on `<input>` tags.

When working with an `<input>` tag in HTML the value of the `<input>`'s value is stored in the DOM (i.e., *literally* in the JS object that represents the DOM node).

```html
<input type="text" class="get-value" name="email" placeholder="example@example.com">
```

```js
$('.get-value').val() // will be equal to whatever is written in the form
```

**The DOM stores values and we can use a library like jQuery or just plain JavaScript to get that value.**

This poses an interesting problem for developers creating input fields in React: 

From the React docs:

> <em>"React components must represent the state of the view at any point in time and not only at initialization time"</em>

Therefore whenever building out an input in React we are forced to keep track of the value of our input field. *React encourages us to put whatever is currently in the input field in state*.

**React doesn't want us storing any data in the DOM. React wants us to store all data in state.**

This brings us to controlled components.

## Controlled Components

A **controlled component** is an input form element where the value of the `value` attribute of the input field is always recorded in state. This state is then passed down to the input field in question as `props`. It is the `props` passed down that is displayed. Controlled components make use of the `onChange()` event listener which executes a callback each time an `onChange` event is fired. An `onChange` event is fired on an input field whenever anything is typed in an `<input>` or `<textarea>` field or whenever someone selects an option in a `<select>` tag.

Let's take a look at an example of a controlled input field [![Edit m35vvx2jp9](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/m35vvx2jp9).

In the above example the `updateValue` function updates state each time an `onChange` event is fired. You can see the value of `this.state.text` each time the render method is called. Remember that `setState` calls a component's `render()` method.

## The textarea Tag

In HTML the `<textarea>` element defines its text by its children. HTML5 `<textarea>` tags **DO NOT** have a value attribute.

```html
<textarea>
	This is some text in a text area
</textarea>
```

In React, a `<textarea>` tags *does* have a `value` attribute which corresponds to the text inside the `<textarea>` tag. This is similar to how `<input>` fields work. `<textarea>` tags in HTML are self-closing so they should be written like this `<textarea />`.

#### Exercise 1: Controlled textarea

Tak a look a look at the example here: [![Edit w0x48o5j68](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/w0x48o5j68)

Finish the `updateValue` method in the `<TextArea>` component. This function should update the `text` property in state.

### Form Validation

One common use of controlled components is form validation. Here is some form validation telling the user that the text in an input field must start with a lowercase letter.

Let's take a look at this code [![Edit 8xwwnzwv30](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/8xwwnzwv30).

## Exercise 2: Make an Email Validator

Let's take a look at the start code:
[![Edit 8139759m10](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/8139759m10)

Let's create a controlled component that validates e-mail. Let's use RegEx to validate our e-mail.

```js
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
```

The `validateEmail` function returns `true` if the e-mail passed to it is valid and false if the e-mail passed to it is invalid.

## Uncontrolled Components

Writing every form using controlled components can be very tedious because you need to write an event handler for every way your form data can change (i.e., `onChange`, `onSubmit`, etc.). When this becomes too cumbersome you may want to use **uncontrolled components**. With uncontrolled components that value of a form is stored within the DOM itself.

### refs

There is a reserved `prop` name in React called `ref`. The `ref` prop has some interesting properties:

* `ref` takes a callback as its value; the argument passed to this callback is the underlying DOM node
* the parameter passed to this callback is the DOM node its written on

Let's take a look at an example [here](https://codepen.io/jtamsut/pen/bWZXEm?editors=1010):

```js
class Form extends React.Component {
      
  handleClickSubmit = () => {    
    const name = this.name.value
    alert(name)
  };
  
  render() {
    return (
      <div>
        <input type="text" ref={input => this.name = input} />
        <button onClick={this.handleClickSubmit}>Sign Up</button>
      </div>
    )
  };
  
}

ReactDOM.render(<Form />, document.getElementById('root'));
```

What's going on here:

* The `ref` attribute on the `<input>` tag takes a callback which is passed a DOM element
* We are assigning the `this.name` property a value of `input` which is the `<input>` DOM node
* The `this.name.value` is accessing the `value` property on the `this.name` DOM node object

## In Conclusion 

The real takeaway here is that we have 2 ways to make forms in React: 

1. **Controlled inputs** store an input's value in state 
2. **Uncontrolled inputs** do not store an input's value in state

## Lab: Markdown Previewer

**Task**: Using `create-react-app` create a live Markdown editor using React. You should be able to type Markdown into a `<textarea>` and have the rendered HTML appear to the right of the `<textarea>` *as you type it*.

It should look something like this: 

![html-preview](https://docs.google.com/drawings/d/e/2PACX-1vRLgF7eYdqNgnNTI5MCqG279ywaxuyBb6-I13b6hC-JhIro5k60bPwGlWpvWVHeuOqa6EseDnijcY-l/pub?w=626&h=293)

You should use the starter code in `markdown-starter`. All code should be written in `index.js`. No additional files should be made.

#### Component Hierarchy

You will have two components: 

```
<DisplayContainer>
    <RawInput />
```

`<DisplayContainer>` should be the parent component of `<RawInput>`.

Here are some guidelines: 

* Your state should be initialized within the constructor method of the `<DisplayContainer>` component and should have one property `value` that has a value of the raw Markdown string.

```js
this.state = {
  value: ""
}
```

* Use the native React `<textarea>` tag to make the area where you type the HTML into 
* You will need to use the `dangerouslySetInnerHTML` property which is how you do `innerHTML` using React (more information about this property can be found [here](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml))
* Use the `marked` library to convert your Markdown into HTML 
  * this is a npm module your must install (`npm i marked`)
  * Here is the basic usage of `marked`: 

```js
var marked = require('marked');
console.log(marked('I am using __markdown__.'));
// Outputs: <p>I am using <strong>markdown</strong>.</p>
```