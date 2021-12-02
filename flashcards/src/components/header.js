

const Header = (props) => {


    return (
        <>
            <div className="nav">
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                </ul>
                <h1> Quizzr</h1>
                <button onClick={props.handleLogin}>
                    {props.loggedIn ? "Log out" : "Log In"}
                </button>
            </div>
        </>
    )
}

export default Header
