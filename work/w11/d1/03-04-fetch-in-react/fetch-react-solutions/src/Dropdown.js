import React from 'react'

const Dropdown = ({updateUser, currentUser}) => {
    let users = ["Leanne Graham", "Ervin Howell", "Clementine Bauch", "Patricia Lebsack", "Chelsey Dietrich"]
    return (
        <select onChange={(e) => updateUser(e.target.value)} value={currentUser}>
            { users.map(user => <option value={user} key={user}>{user}</option>) }
        </select>

    )
}

export default Dropdown