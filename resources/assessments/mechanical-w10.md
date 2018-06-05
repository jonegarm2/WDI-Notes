# Week 10 Mechanical Assessment
## Name: __________________________ &nbsp;&nbsp;&nbsp;Score:  ____ / 3

## JavaScript


##### Q1) Using the `map()` method, finish the line of code that assigns to `doubledNums` a new array containing the numbers in the `nums` array doubled. 

```js
const nums = [1, 5, 2, 6];

// finish the line of code below

const doubledNums = 


```

## ReactJS

##### Q2) The `<Panel>` component below will receive a prop from its parent component named `content` (a string). Write the line of code that will render the value of the `content` prop within a `<p>` React element:

```js
const Panel = (props) => {
	return (
		// write the line of code below
		
		
	);
};
```

##### Q3) The `<Blog>` component below iterates over its `posts` array (held in its `state` object). Write the line of code that will properly render the text of each `post` in  a `<Panel>` component (as defined above):

```js
import Panel from './Panel';

class Blog extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [
				'Planet of the Apes',
				'Beneath the Planet of the Apes',
				'Escape from the Planet of the Apes',
				'Conquest of the Planet of the Apes',
				'Battle for the Planet of the Apes',
			]
		};
	}
	
	render() {
		return (
			<div>
				{this.state.posts.map(post => 
					// write the line of code below
					
					
				)}
			</div>
		);
	}
}
```

