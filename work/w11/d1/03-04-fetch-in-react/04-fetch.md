# Making Fetch Requests in React 

This is an introduction to incorporating AJAX requests into your React application in order to render an API's data. This lesson can be thought of a way to apply your knowledge of life-cycle methods in React.

## Learning objectives: 

* You should be able to use the fetch API to display an API's data in your React application 
* Explain why AJAX requests should be put in the `componentDidMount` method 

## So Fetch: GET Requests with fetch 

The `fetch` API is used to make Promise-based AJAX requests. It returns a Promise. Let's briefly review how we make a `GET` request using the `fetch` API. I will also use `async/await`.

We can use the fetch API to make an API call to get a given user's GitHub user data. We can paste the code below into DevTools to log the result of the `GET` request. 

```js
async function loadJSON(url) {
    let response = await fetch(url);

    if (response.status === 200) {
        let json = response.json();
        return json
    }

    throw new Error(response.status);
}

loadJSON('https://jsonplaceholder.typicode.com/posts')
    .then(data => console.log(data))
    .catch(alert)
```

The `json()` method on the `response` object takes a completely resolved Promise and converts it to JSON. It then passes this newly converted JSON to the next `then`. We use `catch` to handle the scenario where the API call is unsuccessful and the Promise is *NOT* resolved.

## Promise.all 

I want to take a brief detour and discuss a useful mechanism for when you have more than one Promise (i.e., more than one API call) and you want the data returned from each asynchronous only when *ALL* three asynchronous events have resolved.

For example, suppose you need to gather information from three separate remote API calls and when you have the results from all three API calls, you then need to run some further code using all three results. That situation would be perfect for `Promise.all()`. You could do something like this:

```js
Promise.all([apiRequest(...), apiRequest(...), apiRequest(...)]).then((results) => {
    // API results in the results array here
    // processing can continue using the results of all three API requests
}, (err) => {
    // an error occurred, process the error here
});
```

`Promise.all` returns a master Promise that will reject as soon as the first Promise you passed it rejects.

We can see `Promise.all` in action here:

```js
//Used to display results
let write = (msg) => {
  document.write(msg);
};

//Different speed async operations
let slow = new Promise((resolve) => {
  setTimeout(resolve, 2000, 'slow');
});

let instant = 'instant';

let quick = new Promise((resolve) => {
  setTimeout(resolve, 50, 'quick');
});

//The order is preserved regardless of what resolved first
Promise.all([slow, instant, quick]).then((responses) => {
  responses.map(response => write(response + "/"));
});
```

In the above example we have three "asynchronous" operations:

* slow 
* instant 
* quick

`responses` is an iterable that we can `map` over and apply a callback to each element in `responses`.

## Building an Application that Makes an AJAX Request 

Today we will building an application that hits the GitHub API. This application will "fetch" some data and display it for the user. We will be using the fetch API outlined above. Before we begin there a few things worth mentioning.

First, is that all AJAX requests in a React application should go inside the `componentDidMount` lifecycle method. Remember that `componentDidMount` is invoked immediately after a component is mounted. It is possible that our AJAX request will return data before the component mounts. If our AJAX request resolves before we mount our component this means we will calling `setState` on an unmounted component which results in a React bug. A component must be mounted for `setState` to be called on it. Performing our AJAX request in `componentDidMount` will guarantee that there's a component to call `setState` on.

Second, since our AJAX request is asynchronous we will need to create some conditional logic in our JSX to render data only once its returned.

Third, we have decided to make our AJAX request in our root component (`App.js`) and pass data down to our child components. Make note of this decision. 

## Configuration 

We are going to use `create-react-app`. 


```bash
$ create-react-app fetch-practice
```

We should create the following directory structure in `src`:

```
src
 |- api
     |- api.js
 |- components
 |       |- App.js
 |       |- ReposGrid.js
 |       |- SelectLanguage.js
 |- index.css
 |- index.js
```

Let's start of by copying the CSS file I provided you with into `index.css`.

```css
body {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #d0021b;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}

.button {
  color: #e6e6e6;
  background: #0a0a0a;
  border: none;
  font-size: 16px;
  border-radius: 3px;
  width: 200px;
  text-align: center;
  display: block;
  padding: 7px 0;
  margin: 10px auto;
}

.button:hover:enabled {
  background: linear-gradient(#1a1a1a,#0a0a0a);
  color: #fff;
  text-decoration: none;
}

.button:active {
  transform: translateY(1px);
}

.avatar {
  width: 150px;
  border-radius: 50%;
}

.space-list-items {
  margin-bottom: 7px;
}

.languages {
  display: flex;
  justify-content: center;
}

.languages li {
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
}

.popular-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.popular-item {
  margin: 20px;
  text-align: center;
}

.popular-rank {
  font-size: 20px;
  margin: 10px;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav {
  display: flex;
}

.nav li {
  margin-right: 15px;
}

.active {
  font-weight: bold;
}

.row {
  display: flex;
  justify-content: space-around;
}

.column {
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
}

.column input {
  border-radius: 3px;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.43);
  font-size: 16px;
  width: 80%;
}

.column label {
  text-align: center;
  font-size: 30px;
  font-weight: 200;
}

.header {
  text-align: center;
  font-size: 30px;
  font-weight: 200;
}

.reset {
  border: none;
  background: transparent;
  color: #d0021b;
  display: block;
  width: 100%;
  text-align: center;
}

.reset:hover {
  cursor: pointer;
}
```

Next, let's make sure our `index.js` is properly configured.

Our state will comprise of two properties:

* `repos` - list of repos returned from the GitHub API 
* `selectedLanugage` - the current language we are viewing data for 

Our component hierarchy will look like this:

```
<App>
    <SelectLanuguage /> // corresponds to lanuguage selection view 
    <ReposGrid /> // corresponds to grid showing repos
</App>
``` 

Let's continue along together:

## Step 1: index.js 

Inside of `index.js` let's mount our top-level component: 

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Custom components 
import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'));
```

## Step 2: Use fetch To Grab GitHub Data 

Inside of `api.js`: 

```js
const API = {
    fetchPopularRepositories: function(language) {
        let URI = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        return (
            fetch(URI, {
                method: 'get'
            })
            .then(response => response.json())
        )
    
    }
};

export default API;  
```

**Note**: We are going to run into GitHub API rate limiting issues so at some point we need to get our private key from the GitHub API. 

## Step 3: Write ReposGrid Component 

Next, lets build a component called `<ReposGrid />` that takes an array of GitHub repositories and displays them all. 

```js
import React from 'react';

const ReposGrid = ({repos}) => {
    return (
        <ul className="popular-list">
            {repos.map((repo, index) => {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img 
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={`Avatar for ${repo.owner.login}`}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })
            }
        </ul>
    )
};

export default ReposGrid;
```

## Step 4: SelectLanguage Component 

Let's make a series of `<li>`'s that we can click on to filter repositories by language.

```js
import React from 'react';

const SelectLanguages = ({selectedLanguage, updateLanguage}) => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map((language) => {
                return (
                    <li
                        style={language === selectedLanguage ? {color: '#d0021b'} : null}
                        key={language}
                        onClick={ () => updateLanguage(language) }>
                        {language}
                    </li>
                )
            })}
        </ul>
    )
}

export default SelectLanguages;
```

## Step 5: Write App Component 

Lastly, let's write our top-level `App` component:

```js
class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
    };

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    };

    updateLanguage = (language) => {

        this.setState(() => ({
            selectedLanguage: language,
            repos: null
        }))


        API.fetchPopularRepositories(language)
            .then((data) => {
                this.setState({
                    selectedLanguage: language,
                    repos: data
                })
            })

    };

    render() {
        return (
            <div>
                <SelectLanguage updateLanguage={this.updateLanguage}
                                selectedLanguage={this.state.selectedLanguage} />
                {!this.state.repos
                    ? <p>LOADING</p>
                    : <ReposGrid repos={this.state.repos.items} />}
            </div>
        )
    };

};
```

At this point our application should be functional. If its not take the necessary changes to get it working.

## In Conclusion 

We can use the fetch API inside the `componentDidMount` life cycle method where we can fetch data and pass it as props to child components which can be in charge of rendering this data. We typically fetch data from a container component and pass data down to child components.

## Lab 

Use the following JSON Placeholder API Endpoint: `https://jsonplaceholder.typicode.com/users` to get all data for all users. 

Your final product should look something like this: 

![users](./fetch-lab.jpg)