import React from 'react'

const AlreadyUser = (props) => {

    return (
        <>
            <h1> {props.currentUser.displayName || props.currentUser.email } is currently logged in. </h1>
            <p>Log out to continue as another user.</p>
        </>
    )
}

export default AlreadyUser
