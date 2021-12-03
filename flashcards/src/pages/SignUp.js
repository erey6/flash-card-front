import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SignUp = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (props.loggedIn) {
            navigate("/home")
        }
    }
        , [props.loggedIn, navigate])

    return (
        <div>
            <h1>Sign up for this app!</h1>
        </div>
    )
}

export default SignUp
