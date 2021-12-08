import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'

const Home = (props) => {

    const {currentUser, usersDecks, usersQuizzes,
        setCurrentDeck, setCurrentQuiz, publicDecks,
        publicQuizzes, currentDbId} = props

    const navigate = useNavigate()

    const handleOnClick = (chosen, type) => {
        console.log(chosen, type)
        if (type === "flash") {
            setCurrentDeck(chosen)
            navigate("/card")
        } else {
            setCurrentQuiz(chosen)
            navigate("/question")
        }
    }

    const handleEditClick = (chosen) => {
        if (type === "flash") {
        setCurrentDeck(chosen)
        navigate("/editdeck")
        } else {
            setCurrentQuiz(chosen)
            navigate("/editquiz")
        }

    }

    useEffect(
        () => {
            setCurrentDeck(usersDecks[0])
        }, [usersDecks, setCurrentDeck]
    )

    useEffect(
        () => {
            setCurrentQuiz(usersQuizzes[0])
        }, [usersQuizzes, setCurrentQuiz]
    )



    return (
        <>
            <div className="mb-6 flex">
                <Link to="/deckbuilder">
                    <button className="h-8 hover:bg-green-400 bg-green-600">Create flashcard deck</button>
                </Link>
                <Link to="/addquiz">
                    <button className="h-8 hover:bg-green-400 bg-green-600">Create quiz</button>
                </Link>
            </div>
            <section>
                <h1 className="py-3 border-t-2 border-b-2">Decks and quizzes for {currentUser.email}</h1>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {usersDecks.map((deck) => {
                        return (
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={deck.id}>
                                <h2>{deck.name}</h2>
                                <p>{deck.description}</p>
                                <button onClick={() => {
                                    handleOnClick(deck, "flash")
                                }} >Go</button>
                                <button onClick={() => {
                                    handleEditClick(deck, "flash")
                                }}>Edit</button>
                            </div>
                        )
                    }

                    )}
                </div>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {usersQuizzes.map((quiz) => {
                        return (
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={quiz.id}>
                                <h2>{quiz.name}</h2>
                                <p>{quiz.description}</p>
                                <button onClick={() => {
                                    handleOnClick(quiz, "quiz")
                                }} >Go</button>
                                <button onClick={() => {
                                    handleEditClick(quiz, "quiz")
                                }}>Edit</button>
                            </div>
                        )
                    }

                    )}
                </div>
                <h2>Public decks and quizzes from other users</h2>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {publicDecks.map((deck) => {
                        return (
                            deck.userId !== currentDbId &&
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={deck.id}>
                                <h2>{deck.name}</h2>
                                <p>{deck.description}</p>
                                <button onClick={() => {
                                    handleOnClick(deck, "flash")
                                }}>Go</button>
                            </div>
                        )
                    }
                    )}
                </div>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {publicQuizzes.map((quiz) => {
                        return (
                            quiz.userId !== currentDbId &&
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={quiz.id}>
                                <h2>{quiz.name}</h2>
                                <p>{quiz.description}</p>
                                <button onClick={() => {
                                    handleOnClick(quiz, "quiz")
                                }}>Go</button>
                            </div>
                        )
                    }
                    )}
                </div>
            </section>
            <Link to="/addquestion">remove later go to add q </Link>
        </>
    )
}

export default Home
