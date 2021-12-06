import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import AlreadyUser from '../components/AlreadyUser';
import { SignInWithEP } from '../Firebase/firebase';


const LogIn = (props) => {

    let emptyUser = {email: '', password:''}
    const [aUser, setAUser] = useState(emptyUser)
    const handleChange= (event) => {
        setAUser({...aUser, [event.target.name]: event.target.value})
    }

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = aUser
        SignInWithEP(email, password)
        navigate("/home")
    }
    
    return (
        <>
        {props.loggedIn ?
        <AlreadyUser currentUser={props.currentUser}/>
        :
        <>
        <h2>Log in</h2>
        
            <form className="my-6" onSubmit={handleSubmit}>
            <label htmlFor="name">Email: </label>
            <input type="text" name="email" onChange={handleChange} value={aUser.email} /><br/>
            <label htmlFor="name">Password: </label>
            <input type="password" name="password" onChange={handleChange} value={aUser.password} />
                <button type="submit">Submit</button>
            </form>

            <h3>Or use your <button className="h-9 hover:bg-red-900 bg-red-600 ml-1" onClick={props.handleLogin}>Google </button>account to login. </h3>
            </>
        }
        </>
    )
}

export default LogIn
