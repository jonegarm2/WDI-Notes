# Intro to HTML

By the end of this lecture you should be able to: 

* build a basic static HTML webpage from scratch
* identify common HTML elements
* assign attributes to elements
* correctly indent content according to the document's hierarchy
* recognize the name and purpose of HTML5 semantic elements

---

## Roadmap

* HTML in Context
* HTML Fundamentals
* Nesting
* Semantic HTML

---

## HTML in Context

All modern front ends of web applications are built using three languages: 

1. HTML
2. CSS
3. JavaScript

### HTML 
* HTML is an acronym that stands for **H**yper**t**ext **M**arkup **L**anguage
* HTML allows us to specify the content and structure of our web pages

### CSS
* CSS is another acronym that stands for **C**ascading **S**tyle **Sheets**
* with CSS we specify a web pages layout and style 

### JavaScript

---

## HTML Fundamentals

* HTML Documents consist of *elements* that define the structure and content of a web page
* HTML does not specify how to display content, however, browsers have default styling for each type of element
* The W3C recommends lowercase be used for tags and attribute names

### HTML Tags

* **tags** commonly have an opening and closing tag name inside angle brackets like this: 

```html
<p>This is a paragraph</p>
```
* some tags such as `<img>` and `<br>` are called **self-closing** because they never have content and thus do not need a closing tag

<img src="https://i.imgur.com/HeyHpUx.gif">

### Elements

* an **element** consist of a *tag* and its contents (if any), which may include other tags

```html
<p>Have a <em>great</em> day!</p>
```
* some elements, such as a table cell `<td>`, would be pointless unless nested inside of a `<tr>` row element
* most elements are defined as either *block level* or *inline* elements.
    * **block** displayed elements normally display on their own line and take up the full width available to them (they don't allow other elements next to them, unless they are styled to do so).

      Examples: `<div>`, `<h1>`, `<p>`
  * **inline** display elements are normally displayed without line breaks and occupy only enough space to contain their contents.

      Examples: `<span>`, `<td>`, `<img>`

### Attributes

* elements may contain **attributes**, which provide additional information about an element
* attributes are placed within the opening tag and are typically *name/value* pairs separated by an equals sign (`=`)
* the *value* should always be put in double-quotes

```
<div class="my-class">My Content</div>
```

* there are a few attributes, such as `required` `checked` `novalidate` and `disabled`, that stand alone without a value - these are called *boolean attributes*
* you can add your own custom attributes too! The HTML5 specification recommends that you prefix them with `data-`
* the most common attribute is `class`
* the `id` attribute is used to target a specific element (or its contents) for styling or JS access.  The value of an `id` attribute should be unique in the document. The `id` attribute is optional and should be used only when necessary - the less we clutter our code, the better

### Whitespace

* multiple spaces created by the space bar, tab key and return key are reduced down to a single space between pieces of text
* one way to create extra spaces is by using the HTML *entity* **`&nbsp;`**

### Comments

* you can add comments to an HTML document using the following syntax:

   ```
   <!-- This is a comment -->
   ```
* comments can span multiple lines and elements in a comment tag will not be rendered


Many other tags exist...

`<a>`, `<blockquote>`, `<br>`, `<button>`, `<div>`, `<dl>`, `<form>`, `<h1>..<h6>`, `<img>`, `<input>`, `<link>`, `<ol>`, `<p>`, `<script>`, `<select>`, `<span>`, `<table>`, `<ul>`

---

## Nesting

<img src="https://i.imgur.com/9m8w40Y.png">

* when an element contains another element, the contained element is considered to be *nested* inside the outer element.  The HTML graphic above, has colored boxes drawn around elements to help visualize the relationship between parent and child elements
* it is a best practice to indent nested elements.  
    * properly indenting elements makes the markup more readable and less prone to errors
* an element is considered a **descendant** if it is nested anywhere within its **ancestor**
* an element is considered a **child** if it is a direct descendant of its **parent**
* two or more elements are considered **siblings** if they have the same **parent**

---

## Semantic HTML

* Semantic HTML helps express the **meaning** or purpose of the content in a webpage:

	<img src="https://i.imgur.com/2jxmD28.png">

* Benefits for the developer:
    * semantic HTML makes the developer's intentions more clear as to what the developer is trying to accomplish.
* Benefits for the user:
    * more accurate web searches via better SEO (search engine optimization).
    * improves accessibility for the vision impaired because screen readers can do their job better.

Many semantic tags exist...

* `<section>`
* `<article>`
* `<aside>`
* `<figure>`
* `<footer>`
* `<header>`
* `<main>`
* `<nav>`