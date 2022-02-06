import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'

const PublicSpace = (props) => {

    const {setCurrentDeck, currentDeck, currentQuiz, setCurrentQuiz, publicDecks,
        publicQuizzes, gatherCards, gatherQuestions} = props

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


    useEffect(
        () => {
            gatherCards()
            gatherQuestions()
        }, []
    )

    // useEffect(
    //     () => {
    //         setCurrentQuiz(usersQuizzes[0])
    //     }, [usersQuizzes, setCurrentQuiz]
    // )

    return (
        <>
            <section> <Link to={"/login"}>
                <button className ="h-8">Log in</button>
            </Link>
            <Link to={"/signup"}>
                <button className ="h-8">Sign up</button>
            </Link>
                
                <h1 className="my-6">Public decks and quizzes</h1>
                <h4 className="mt-9 text-green-900">Flashcard decks</h4>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {publicDecks[0].name !== "Loading"  ? publicDecks.map((deck) => {
                        return (
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={deck.id}>
                                <h2>{deck.name}</h2>
                                <p>{deck.description}</p>
                                <button onClick={() => {
                                    handleOnClick(deck, "flash")
                                }}>Go</button>
                            </div>
                        )
                    }
                    ) : <h2 className="loading mt-3">Loading...</h2>}
                </div>
                <h4 className="mt-6 text-blue-900">Quizzes</h4>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {publicQuizzes[0].name !== "Loading" ? publicQuizzes.map((quiz) => {
                        return (
                            
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={quiz.id}>
                                <h2>{quiz.name}</h2>
                                <p>{quiz.description}</p>
                                <button onClick={() => {
                                    handleOnClick(quiz, "quiz")
                                }}>Go</button>
                            </div>
                        )
                    }
                    ) : <h2 className="loading mt-3">Loading...</h2>}
                </div>
            </section>
        </>
    )
}

export default PublicSpace
