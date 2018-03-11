import React from 'react'

const Menu = ({ username, logout }) => {
    return (
        <div>
            <p>
                <a href="/blogs">blogs</a>
                <a href="/users">users</a>
                <span>Logged in as <b>{username}</b></span>
                <button onClick={logout}>Logout</button>
            </p>
        </div>
    )
}

export default Menu