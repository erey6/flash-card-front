import React, {useState} from 'react';
import AlreadyUser from '../components/AlreadyUser';
import { SignInWithEP } from '../Firebase/firebase';


const LogIn = (props) => {

    let emptyUser = {email: '', password:''}
    const [aUser, setAUser] = useState(emptyUser)
    const handleChange= (event) => {
        setAUser({...aUser, [event.target.name]: event.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = aUser
        console.log(email, password)
        SignInWithEP(email, password)
    }
    
    return (
        <>
        {props.loggedIn ?
        <AlreadyUser currentUser={props.currentUser}/>
        :
        <>
        <h2>Log in</h2>
        <h3>Use your <a href="/" onClick={props.handleLogin}>Google account to login. </a></h3>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Email: </label>
            <input type="text" name="email" onChange={handleChange} value={aUser.email} /><br/>
            <label htmlFor="name">Password: </label>
            <input type="password" name="password" onChange={handleChange} value={aUser.password} />
                <button type="submit">Submit</button>
            </form>
            </>
        }
        </>
    )
}

export default LogIn
