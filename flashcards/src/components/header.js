import { Link } from 'react-router-dom'

const Header = (props) => {



    return (
        <nav className="mt-4  justify-between items-baseline text-green-800 flex justify-left h-16 ">
            <h1 className="mt-1"> Quizzr</h1>
           <div> <Link to={"/home"} className='pl-6 mt-2'>Home</Link></div>
            

            

            {props.loggedIn && <button className="h-8 ml-6 mt-1" onClick={
                props.handleSignOut}>
                Log out
            </button>
            }

        </nav>
    )
}

export default Header
