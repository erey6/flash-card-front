import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddQuestion = (props) => {
    const emptyQuestion = { "query": '', "options": [], "quizid": props.currentQuiz.id }
    const [question, setQuestion] = useState(emptyQuestion)
    const [optionsArray, setOptionsArray] = useState([0,1])
    const [answers, setAnswers] = useState([])
    const navigate = useNavigate()
    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value })
    }

    const handleOptionsChange = (e) => {
        setAnswers({...answers, [e.target.id]: e.target.value})
    }

    const pushToOptions = () => {
        const lastNum = optionsArray.pop()
        const nextNum = lastNum + 1
        setOptionsArray([...optionsArray, lastNum, nextNum])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const answersArray = Object.keys(answers).map((key) => { 
            return answers[key]            
        })
        let questionCopy = {...question, "options": answersArray}
        setQuestion({ ...question, "options": answersArray})
        axios
        .post('https://flashcard6.azurewebsites.net/api/Questions',
        questionCopy)
        .then((response) => { 
          navigate("/addquestion")     
        })
    }

    return (
        <>
            <h1>Add questions to your quiz: {props.currentQuiz.name}</h1>
            <h3>Each question has at least two options for the answer. Enter the first option as the correct one. They will be presented in a random order during the quiz. </h3>
            <blockquote>
                <p>For example:</p>
                <p >Who was the first American-born President?</p>
                <p >Martin Van Buren</p>
                <p >Andrew Jackson</p>
                <p >Franklin Roosevelt</p>
            </blockquote>
            <form className="my-3" onSubmit={handleSubmit}>

                <div className="flex-column">
                    <div className="w-auto my-3">
                        <label className="block" htmlFor="front">Question: </label>
                        <textarea className="w-4/6 shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="query" value={question.query} onChange={handleChange} autoComplete="off"> </textarea>
                    </div>
                    <button type="button" className="block" onClick={pushToOptions}>Add more answer options</button>
                    {optionsArray.map(num=>{return(
                    <div key={num} className="w-auto my-3">
                        <label className="block" htmlFor="option">Option</label>
                        <textarea id={num} className="w-4/6 shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name={answers.num} onBlur={handleOptionsChange} autoComplete="off"> </textarea>
                    </div>
                
            )})}
            </div>
                <button className="h-8" type="submit">Submit</button>
            </form>
            <div className="w-3/12 h-8 rounded-md px-4 py-1 bg-gray-600 text-gray-100 mt-1 mb-3">
                <Link to="/home">Done adding questions</Link>
            </div>
        </>
    )
}

export default AddQuestion
