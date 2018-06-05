import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dropdown from './Dropdown'
import Users from './Users'
const API = "https://jsonplaceholder.typicode.com/users"


class App extends Component {
    constructor() {
        super()
        this.state = {
            users: null,
            selectedUser: "Leanne Graham"
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = (event) => {

        console.log(event)

        this.setState({ 
            users: null,
            selectedUser: ""
        })
        
        fetch(API, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log('Fetch request made!')
            console.log(event)
            this.setState({
                selectedUser: event,
                users: data
            })
        })  
    }

    render(){
        return (
            <div>
                <h2>User Profiles</h2>
                <Dropdown updateUser={this.getUsers} currentUser={this.state.selectedUser} />
                { this.state.users ? <Users users={this.state.users} selectedUser={this.state.selectedUser} />: <h2>Loading</h2> }
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))