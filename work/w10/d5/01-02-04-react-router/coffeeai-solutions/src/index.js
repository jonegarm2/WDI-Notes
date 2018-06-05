import React, { Component } from 'react'
import {
    BrowserRouter,
    Link,
    Route,
    Redirect
} from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'

class App extends Component {
    
    constructor() {
        super()
        this.state = {
            beans: [
                {
                    id: 0, 
                    name: 'Bean A',
                    description: 'Really good bean',
                    price: '$2.95'
                },
                {
                    id: 1,
                    name: 'Bean B',
                    description: 'Bean with a really good roast',
                    price: '$5.55'
                }
            ],
            checked: false
        }
    }

    loggedIn = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return (

            <div>
                <Link to='/'>Home</Link>
                <Link to='/all-beans'>All Beans</Link>

                <Route exact path="/" render={() => <Home beans={this.state.beans} loggedIn={this.loggedIn} checked={this.state.checked} />} />
                <Route path="/all-beans" render={() => <AllBeans beans={this.state.beans} />} />

                <Route path="/beans/:bean_id" render={(props) => {
                    if (!this.state.checked) {
                        return <Redirect from="/all-beans" to="/" />
                    } else {
                        return <ShowBean {...props} beans={this.state.beans} checked={this.state.checked} />} 
                    }
                } />


            </div>
        )
    }
}

const Home = (props) => (
    <div>
        <p>Log In Status: {props.checked.toString()}</p>
        <input type="checkbox" checked={props.checked} onChange={props.loggedIn} />
    </div>
)

const AllBeans = (props) => (
    <div>
    {
        props.beans.map(bean => (
            <div key={bean.id}>
                <h4>{bean.name}</h4>
                <Link to={'beans/' + bean.id.toString()}>View Bean</Link>
            </div>     
        ))
    }
    </div>
)

const ShowBean = (props) => {

    let currentBean = props.beans[props.match.params.bean_id]

    return (
        <div>
            <h4>{currentBean.name}</h4>
            <p>{currentBean.description}</p>
            <p>{currentBean.price}</p>
        </div>
    ) 
}

const Root = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(Root, document.getElementById('root'))
