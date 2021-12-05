import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CardBuilder = (props) => {
    const [cardCount, setCardCount] = useState(1)
    const emptyCard = { "front": '', "back": '', "deckid": props.currentDeck.id}
    const [card, setCard] = useState(emptyCard)
    const navigate = useNavigate()
    const handleChange= (event) => {
        setCard({...card, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
            e.preventDefault()
            axios
            .post('https://flashcard6.azurewebsites.net/api/Cards',
            card)
            .then((response) => { 
              navigate("/cardbuilder")     
            })
    }

    return (
        <>
            <h1>Add cards to your deck: {props.currentDeck.name}</h1>
            <h3>Each card has a front and a back</h3>
            <blockquote>
                <p>For example:</p>
                <p className="italic text-gray-500 pl-3">Front: Indiana</p>
                <p className="italic text-gray-500 pl-3">Back: Indianapolis</p>
            </blockquote>
            <form className="my-3" onSubmit={handleSubmit}>
            
            <div className="flex">
            <div>
            <label className="block" htmlFor="front">Front: </label>
            <textarea className="shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="front" value={card.front} onChange={handleChange} autoComplete="off"> </textarea>
            </div>
            <div className="ml-5">
            <label className="block" htmlFor="description">Back: </label>
            <textarea className="shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="back" value={card.back} onChange={handleChange} autoComplete="off"> </textarea>
            </div>
            </div>
            <button className="h-8 rounded-md px-4 py-1 bg-gray-600 text-gray-100 mt-1" type="submit">Submit</button>
            </form>
            <div className="w-3/12 h-8 rounded-md px-4 py-1 bg-gray-600 text-gray-100 mt-1 mb-3">
            <Link to="/home">Done adding cards</Link>
            </div>
        </>
    )
}

export default CardBuilder
