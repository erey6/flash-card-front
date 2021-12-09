import { useNavigate, Link } from 'react-router-dom'


const PublicSpace = (props) => {

    const {setCurrentDeck, setCurrentQuiz, publicDecks,
        publicQuizzes} = props

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


    // useEffect(
    //     () => {
    //         setCurrentDeck(usersDecks[0])
    //     }, [usersDecks, setCurrentDeck]
    // )

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
                    {publicDecks.map((deck) => {
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
                    )}
                </div>
                <h4 className="mt-6 text-blue-900">Quizzes</h4>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {publicQuizzes.map((quiz) => {
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
                    )}
                </div>
            </section>
        </>
    )
}

export default PublicSpace
