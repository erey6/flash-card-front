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
            <Link to={"/login"}>
                <button className ="h-8">Log in</button>
            </Link>
            <Link to={"/signup"}>
                <button className ="h-8">Sign up</button>
            </Link><div className="mt-9">
                <h2 className="mb-6 text-2xl"> Welcome to BIGGERBRAIN. </h2>
                <h2 className="mb-6 text-2xl">Make flashcards. Make quizzes. </h2>
                <h2 className="mb-6 text-2xl">Try flashcards. Try quizzes.  </h2>
                <h2 className="mb-6 text-green-900 text-2xl">Grow your brain.</h2>
                <Link to={"/publicspace"}>
                <button className="bg-white text-blue-600 border-2 hover:bg-gray-300 h-8 border-gray-900">Try public decks and quizzes</button>
            </Link><div className="mt-9">
                <p>Create an account to make your own flashcard deck or quiz.</p>
            </div>
            </div>
        </div>
    )
}

export default Welcome
