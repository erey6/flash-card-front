// import { SignOutUser } from '../Firebase/firebase'
import { useNavigate, Link } from 'react-router-dom'

// import { useState } from 'react';

const Header = (props) => {
    // const [loggedIn, setLoggedIn] = useState(false)
    // const navigate = useNavigate()
    // const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         const uid = user.uid;
    //         console.log("fromheader", uid);
    //         setLoggedIn(true);
    //     } else {
    //         setLoggedIn(false)
    //     }
    // });


    return (
        <>
            <div className="nav">
                <ul>
                <Link to={"/home"}><li>Home</li></Link>
                    <li>Profile</li>
                </ul>
                <h1> Quizzr</h1>

                {props.loggedIn && <button onClick={
                    props.handleSignOut}>
                    Log out
                </button>
                }

            </div>
        </>
    )
}

export default Header
