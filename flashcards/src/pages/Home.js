import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.loggedIn) {
            navigate("/welcome")
        }
    }
        , [props.loggedIn, navigate])

    return (
        <>
        <div className="button-set">
            <button>Create flashcard deck</button>
            <button>Create quiz</button>
        </div>
        <section>
            <h3>Your decks and quizzes:</h3>
        <div className="user-decks">

        </div>
        <p>Public decks and quizzes</p>
        </section>

        </>
    )
}

export default Home
