import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Welcome = (props) => {
    const navigate = useNavigate();

    

    useEffect(() => {
        if (props.loggedIn) {
            navigate("/home")
        }
    }
        , [props.loggedIn, navigate])

    return (
        <div>
            <button onClick={props.handleLogin}>Log in</button>
            <Link to={"/signup"}>
                <button>Sign up</button>
            </Link>
            <p className="home-chatter">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id diam vel quam elementum. Diam quam nulla porttitor massa id neque aliquam vestibulum. Sed adipiscing diam donec adipiscing tristique risus nec. Diam sit amet nisl suscipit. Dignissim enim sit amet venenatis urna cursus.
            </p>

        </div>
    )
}

export default Welcome
