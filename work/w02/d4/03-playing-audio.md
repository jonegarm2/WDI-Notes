<img src="https://i.imgur.com/Ae7LmVX.jpg">
# Playing Audio in the Browser

### Intro

Playing audio in the browser is straightforward thanks to:

1. HTML5's `<audio>` element which can be added to any webpage (multiple instances if need be), and
2. the _HTMLAudioElement_ DOM interface that can be used to create an audio element in code using JS.

### The `<audio>` element

In the JS Bin code (link below), the `<audio>` element is being used in the webpage to demonstrate how to play a background audio clip in a continuous loop.  There's a checkbox on the page that has an event handler for the _change_ event used to pause/play the sound.

Attributes can be set in the `<audio>` element directly and/or manipulated via JS. For example, the element may have it's default controls shown by adding the **controls** attribute (no value is necessary). Here are the docs for more info: [Audio HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

### The `HTMLAudioElement` API

Also in the example, an audio element is being created dynamically in code like this `var player = new Audio();`.  It is being used to play the sound effect selected in radio input. All of the attributes, properties & methods available on an `<audio>` element are available on the HTMLAudioElement that's being created.  More information on the HTMLAudioElement can be found here: [HTMLAudioElement interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

Be sure to browse the `HTMLAudioElement`'s object hierarchy, starting with it's parent class, `HTMLMediaElement`.
  
### Example Code

The example code can be found in this [JS Bin](http://jsbin.com/zujoja/edit?html,js,output).