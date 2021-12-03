import React, {useState} from 'react';

const DeckBuilder = () => {
    const emptyDeck = {Name: '', Description:'', Private: true , UserId:1}
    const [deck, setDeck] = useState({})

    return (
        <div>
            <h1>Build your deck!</h1>
            {/* Name, Description, Private, UserId */}



        </div>
    )
}

export default DeckBuilder
