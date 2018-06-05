<img src="https://i.imgur.com/fx2orT2.png">

# Styling React - Lab
---

## Exercise

In the _Styling React Components_ lesson we used a combination of imported CSS stylesheets and inline styling to style the _React Mastermind_ game app.

The purpose of this lab is to practice these two techniques and style React components by:

1. Importing CSS stylesheets that contain normal CSS rules and target the DOM elements emitted by the components.
2. Writing JS objects that contain key/value pairs that represent CSS properties within component modules and applying those styling objects to DOM components using the [`style`](https://facebook.github.io/react/docs/dom-elements.html#style) prop.

## Deliverables

When finished, you might have something that looks like this:

<img src="https://i.imgur.com/9CyR3WO.png">

>Note: Four bogus guesses were added to the state to demonstrate how the app might look with multiple guess rows. 

Feel free to add your own personal touches.

Don't be afraid to add extra `<div>` components, etc. to group other components to ease layout.

## Flexbox Layout Basics

A word of advice - start using `flexbox` for laying out your web apps!

Flexbox dramatically **improves** our ability to layout a page's elements.

Flexbox makes it easier to:

- Align items (including centering horizontally & vertically)
- Spreading out items evenly
- Displaying items at one end or the other
- Changing the order items are laid out
- And more!


No more floats! No more CSS tricks to center vertically!

Flexbox can even modify the width/height of its children to fill available space on different screen sizes.

Simply by setting the CSS property to flex like so:

```css
.GameBoard {
  display: flex;
}
```

...makes the `<GameBoard>` component become a **flexbox container**. Accordingly, all of its children become **flexbox items**.

By default, a flexbox container lays out its children in a row - this is the **opposite** of how the browser lays out block elements by default, where elements stack on top of each other, not laid out horizontally.

In regards to the `<GuessRow>` components, we want them to stack vertically like in a column. Simply adding a `flex-direction: column;` declaration will do the trick:

```css
.GameBoard {
  display: flex;
  flex-direction: column;
}
```

Now the `<GuessRow>` components stack vertically, however, we want them to stack with the most recent guess on top (see diagram), we can modify the `flex-direction` as follows:

```css
.GameBoard {
  display: flex;
  flex-direction: column-reverse;
}
```

Note that adding the `-reverse` also caused the stacking to start at the bottom, which is exactly what we wanted. However, the `justify-content` property can be used to control this behavior, including spacing out the guesses equally if you wish.

As you continue to style Mastermind, be sure to bring up [A Visual Guide to CSS3 Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties?utm_content=bufferbb7b2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#comments-section) to help you with using flexbox for layouts! 

## References

[A Visual Guide to CSS3 Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties?utm_content=bufferbb7b2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#comments-section)






