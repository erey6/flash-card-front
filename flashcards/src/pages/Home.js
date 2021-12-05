
import { useNavigate, Link } from 'react-router-dom'

const Home = (props) => {
    const navigate = useNavigate()

    const handleOnClick = (deck) => {
        console.log(deck)
          props.setCurrentDeck(deck)
          navigate("/card")       
    }

    const handleEditClick = (deck) => {
        console.log(deck)
          props.setCurrentDeck(deck)
          navigate("/editdeck")
          
    }

    return (
        <>
            <div className="mb-6 flex">
                <Link to="/deckbuilder">
                    <button className="h-8 rounded-md px-4 py-1 bg-green-600 text-gray-100 mt-1">Create flashcard deck</button>
                </Link>
                <button className="h-8 rounded-md px-4 py-1 bg-green-600 text-gray-100 mt-1 ml-8">Create quiz</button>
            </div>
            <section>
                <h1 className="py-3 border-t-2 border-b-2">Decks and quizzes for {props.currentUser.email}</h1>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {props.usersDecks.map((deck) => {
                        return(
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={deck.id}>
                            <h2>{deck.name}</h2>
                            <p>{deck.description}</p>
                            <button onClick={() => {
                                handleOnClick(deck)
                            }}className="h-6 rounded-md px-4 bg-gray-800 text-gray-100 mt-1" >Go</button>
                            <button onClick={() => {
                                handleEditClick(deck)
                            }}className="h-6 rounded-md px-4 bg-gray-600 text-gray-100 mt-1 ml-3" >Edit</button>
                            </div>
                        )
                    }

                    )}
                </div>
                <h2>Public decks and quizzes from other users</h2>
                <div className="mb-6 flex flex-wrap gap-x-4">
                    {props.publicDecks.map((deck) => {
                        return(
                            deck.userId != props.currentDbId &&
                            <div className="w-1/4 my-5 p-4 rounded-sm border-2 border-black-300" key={deck.id}>
                            <h2>{deck.name}</h2>
                            <p>{deck.description}</p>
                            <button onClick={() => {
                                handleOnClick(deck)
                            }}className="h-6 rounded-md px-4 bg-gray-900 text-gray-100 mt-1" >Go</button>
                            </div>
                        )
                    }
                    )}
                </div>
            </section>

        </>
    )
}

export default Home
