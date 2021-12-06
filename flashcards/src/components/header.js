import { Link } from 'react-router-dom'

const Header = (props) => {



    return (
        <nav className="mt-4 flex justify-left h-16 ">
            <h1 className="mt-1"> Quizzr</h1>
            <Link to={"/home"} className='pl-6 mt-2'>Home</Link>
            <Link to={"/home"} className='pl-6 mt-2'>Profile</Link>

            

            {props.loggedIn && <button className="h-8 ml-6 mt-1" onClick={
                props.handleSignOut}>
                Log out
            </button>
            }

        </nav>
    )
}

export default Header
