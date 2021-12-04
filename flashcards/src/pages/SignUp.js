import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CreateWithEmail } from '../Firebase/firebase';

const SignUp = (props) => {
    let emptyUser = {email: '', password:''}
    const [newUser, setNewUser] = useState(emptyUser)
    const handleSubmit = (e) => {    
        e.preventDefault();  
       const {email, password} = newUser
        CreateWithEmail(email, password)

    };

    const handleChange= (event) => {
        setNewUser({...newUser, [event.target.name]: event.target.value})
    }
    //These next few lines won't let loggedinuser get here
    const navigate = useNavigate();
    useEffect(() => {
        if (props.loggedIn) {
            navigate("/home")
        }
    }
        , [props.loggedIn, navigate])

    return (
        <>
            <h1>Sign up for Flashcards!</h1>
            <h3>Create a login with email and password, or simply use your <a href="#" onClick={props.handleLogin}>Google account to login. </a></h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Email: </label>
            <input type="text" name="email" onChange={handleChange} value={newUser.email} /><br/>
            <label htmlFor="name">Password: </label>
            <input type="password" name="password" onChange={handleChange} value={newUser.password} />
                <button type="submit">Submit</button>
            </form>

        </>
    )
}

export default SignUp
