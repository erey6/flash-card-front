import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddQuiz = (props) => {
    const emptyDeck = { "name": '', "description": '', "private": true, "UserId": props.currentDbId }
    const [deck, setDeck] = useState(emptyDeck)
    const [checkbox, setCheckbox] = useState(false) 

    const navigate = useNavigate()
    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value })
    }
    const handleCheck = (event) => {
        setCheckbox(!checkbox)
        setDeck({...deck, ["private"]: checkbox})

        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('https://flashcard6.azurewebsites.net/api/Decks',
                deck)
            .then((response) => {
                props.setCurrentDeck(response.data)
                navigate("/cardbuilder")

            })
    }

    return (
        <>
            <h1>Build your deck!</h1>
            <h3>First give your deck a name and a description.</h3>
            <blockquote>
                <p>For example:</p>
                <p className="italic text-gray-500 pl-3">Name: State Capitals</p>
                <p className="italic text-gray-500 pl-3">Description: Given the state, can you name the capital city?</p>
            </blockquote>

            <form className="my-3" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input className="shadow border rounded py-1 px-3 ml-3 my-2" type="text" name="name" onChange={handleChange} value={deck.name} /><br />
                <label className="block" htmlFor="description">Description: </label>
                <textarea className="shadow resize-none border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="description" value={deck.description} onChange={handleChange} autoComplete="off"> </textarea>
                <div className="block my-3" >
                    <input type="checkbox" id="private" name="private" value="private" onChange={handleCheck} />
                    <label htmlFor="private" className="ml-2">Share with public</label>
                </div>
                <button className="h-8 rounded-md px-4 py-1 bg-gray-600 text-gray-100 mt-1" type="submit">Submit</button>
            </form>

        </>
    )
}

export default AddQuiz;
