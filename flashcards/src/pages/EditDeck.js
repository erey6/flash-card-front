import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditDeck = (props) => {
    const [updatedDeck, setUpdatedDeck] = useState(props.currentDeck)
    const [checkbox, setCheckbox] = useState(!props.currentDeck.private)
    const [updateCards, setUpdatedCards] = useState(props.deckCards)
    const [changingCard, setChangingCard] = useState({ "front": 'e', "back": '', "deckid": props.currentDeck.id })
    const [targetCard, setTargetCard] = useState()


    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(`https://flashcard6.azurewebsites.net/api/Decks/${props.currentDeck.id}`,
                updatedDeck)
            .then((response) => {
                // props.setCurrentDeck(response.data)
                navigate("/home")

            })
    }

    const handleChange = (e) => {
        setUpdatedDeck({ ...updatedDeck, [e.target.name]: e.target.value })
    }

    const handleCheck = () => {
        setCheckbox(!checkbox)
        setUpdatedDeck({ ...updatedDeck, "private": checkbox })
    }

    const handleCardSubmit = (e) => {
        e.preventDefault()
        console.log(changingCard)

    }

    const selectCard = (index) => {
        setTargetCard(index)

    }

    useEffect(
        () => {
            setUpdatedCards(props.deckCards)
        },
        [props.deckCards]
    );

    return (
        <>
            <form className="my-3" onSubmit={handleSubmit}>
                <h1 className="mb-6">Edit deck information</h1>
                <label htmlFor="name">Name: </label>
                <input className="shadow border block rounded py-1 px-3 my-2" type="text" name="name" onChange={handleChange} defaultValue={updatedDeck.name} />
                <label className="block" htmlFor="description">Description: </label>
                <textarea className="shadow resize-none border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="description" value={updatedDeck.description} onChange={handleChange} autoComplete="off"> </textarea>
                <div className="block my-3" >
                    <input type="checkbox" id="private" name="private" value="private" onChange={handleCheck} checked={checkbox} />
                    <label htmlFor="private" className="ml-2">Share with public</label>
                </div>
                <button className="h-8 rounded-md px-4 py-1 bg-gray-600 text-gray-100 mt-1" type="submit">Submit deck information edits</button>
            </form>

            <h1 className="mt-9">Edit Cards</h1>

            {updateCards.map((card, index) => {
                return (
                    <div key={index} className={index === targetCard ? "p-4 shadow-inner my-6 rounded-sm border-2 border-green-400" : "p-4 my-6 bg-gray-300 rounded-sm border-2 border-gray-300"}>
                        <button className="h-6 block rounded-md px-4 bg-green-600 text-gray-100 mt-1 mr-3"
                            onClick={() => {
                                selectCard(index)
                            }}>Select to edit this card</button>
                        <div className="my-3">
                            <h3>Front</h3>
                            <p className="shadow bg-gray-100  resize-vertical border block rounded py-1 px-3 text-gray-700 my-2">
                                {card.front}
                            </p>
                            <h3>Back: </h3>
                           <p className="shadow bg-gray-100 resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" >
                               {card.back}
                            </p> 
                        </div>
                    </div>
                )
            })}

        </>
    )
        }

export default EditDeck
