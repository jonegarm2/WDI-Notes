import React from 'react'

const Users = (props) => {
    let user = props.users.filter(elem => elem.name === props.selectedUser)[0]

    
    return (
        <div>
            {user ? <div><h1>{user.name}</h1><h4>{user.phone}</h4><p>{user.email}</p></div> : <p>Select a user</p>}
        </div>
    )

}

export default Users