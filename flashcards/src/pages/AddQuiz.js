import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddQuiz = (props) => {
    const emptyQuiz = { "name": '', "description": '', "private": true, "UserId": props.currentDbId }
    const [quiz, setQuiz] = useState(emptyQuiz)
    const [checkbox, setCheckbox] = useState(false) 

    const navigate = useNavigate()
    const handleChange = (event) => {
        setQuiz({ ...quiz, [event.target.name]: event.target.value })
    }
    const handleCheck = (event) => {
        setCheckbox(!checkbox)
        setQuiz({...quiz, ["private"]: checkbox})

        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('https://flashcard6.azurewebsites.net/api/Quizzes',
                quiz)
            .then((response) => {
                props.setCurrentQuiz(response.data)
                navigate("/addquestion")

            })
    }

    return (
        <>
            <h1>Build your Quiz!</h1>
            <h3>First give your quiz a name and a description.</h3>
            <blockquote>
                <p>For example:</p>
                <p >Name: Presidential Trivia</p>
                <p >Description: See if you can answer these questions about U.S. presidents! </p>
            </blockquote>

            <form className="my-3" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={handleChange} value={quiz.name} /><br />
                <label className="block" htmlFor="description">Description: </label>
                <textarea className="shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="description" value={quiz.description} onChange={handleChange} autoComplete="off"> </textarea>
                <div className="block my-3" >
                    <input className="inline" type="checkbox" id="private" name="private" value="private" onChange={handleCheck} />
                    <label htmlFor="private" className="ml-2">Share with public</label>
                </div>
                <button className="h-8" type="submit">Submit</button>
            </form>

        </>
    )
}

export default AddQuiz;
