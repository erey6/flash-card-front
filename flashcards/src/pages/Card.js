import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

const Card = (props) => {
    const [showFront, setShowFront] = useState(false)
    const [cardIndex, setCardIndex] = useState(0)

    const handleFlip = () => {
        setShowFront(!showFront)
    }

    const previousCard = () => {
        setCardIndex(cardIndex - 1)
        setShowFront(true)
    }

    const nextCard = () => {
        setCardIndex(cardIndex + 1)
        setShowFront(true)
    }

    const restart = () =>{
        setCardIndex(0)
        setShowFront(true)
    }
    useEffect(() => {
        setShowFront(true)
    },[])
    
    return (
        <>
            <h1>{props.currentDeck.name}</h1>
            <h3 className="my-3">{props.currentDeck.description}</h3>
            <div className={showFront ? "border-4 p-6 rounded-sm border-green-300" :
                "border-4 p-6 rounded-sm border-blue-300 "}>

                <h2>
                    {showFront ?
                        <>{props.deckCards[cardIndex].front}</> :
                        <>{props.deckCards[cardIndex].back}</>
                    }
                </h2>

            </div>
            {cardIndex > 0 &&
                <button className="mr-6 mt-3 py-1" onClick={previousCard}>Previous</button>
            }
            <button className="mr-6 mt-3 py-1" onClick={handleFlip}>Flip</button>
            {cardIndex < props.deckCards.length -1 ?
            <button className="mr-6 mt-3 py-1" onClick={nextCard}>Next</button> :
            <button className="mr-6 mt-3 py-1" onClick={restart}>Restart</button>
            }
        </>
    )
}

export default Card
