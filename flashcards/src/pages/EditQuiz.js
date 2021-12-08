import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assertFunctionDeclaration } from '@babel/types'

const EditQuiz = (props) => {
    const emptyQuestion = {
        "id": 0,
        "query": "",
        "options": [
            "",
            "",
            ""
        ],
        "quizId": null,
        "quiz": null
    }
    const [updatedQuiz, setUpdatedQuiz] = useState(props.currentQuiz)
    const [checkbox, setCheckbox] = useState(!props.currentQuiz.private)
    const [updatedQQ, setUpdatedQQ] = useState([emptyQuestion])
    const [quizOptions, setQuizOptions] = useState(["a", "b"])
    const [changingQuestion, setChangingQuestion] = useState()
    // const [changingIndex, setChangingIndex] = useState()

    const navigate = useNavigate()
    const handleChange = (event) => {
        setUpdatedQuiz({ ...updatedQuiz, [event.target.name]: event.target.value })
    }
    const handleQuestionChange = (e) => {
        setChangingQuestion(e.target.value)
    }

    const handleQuestionSubmit = (e) => {
        e.preventDefault()
        console.log(e.target[0].value);
        for (const iterator of e.target) {
            console.log(iterator.value)
        }

    }

    const handleCheck = () => {
        setCheckbox(!checkbox)
        setUpdatedQuiz({ ...updatedQuiz, ["private"]: checkbox })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log()
        axios
            .put(`https://flashcard6.azurewebsites.net/api/Quizzes/${props.currentQuiz.id}`,
                updatedQuiz)
            .then((response) => {
                props.findUsersQuizzes(response.data)
                navigate("/home")
            })
    }

    useEffect(() => {
        setUpdatedQQ(props.quizQuestions)
    }, [props.quizQuestions])
    // useEffect(() => {
    //     setUpdatedQQ(props.quizQuestions)
    // }, [])

    return (
        <>
            <h1>Edit quiz</h1>

            <form className="my-3" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" className="w-2/3" onChange={handleChange} defaultValue={updatedQuiz.name} />
                <label className="block" htmlFor="description">Description: </label>
                <textarea className="shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2 w-2/3" type="text" name="description" value={updatedQuiz.description} onChange={handleChange} autoComplete="off"> </textarea>
                <div className="block my-3" >
                    <input className="inline" type="checkbox" id="private" name="private" value="private" onChange={handleCheck} />
                    <label htmlFor="private" className="ml-2">Share with public</label>
                </div>
                <button className="h-8" type="submit">Submit Name/Description Changes</button>
            </form>


            {updatedQQ.map((question, index) => {
                return (

                    <div key={question.id} className="p-4 my-6 w-2/3 bg-gray-300 rounded-sm border-2 border-gray-300">
                        <form onSubmit={handleQuestionSubmit}>
                            <label htmlFor="query">Question</label>
                            <input className="w-full shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name={`${index}`} defaultValue={question.query} onChange={handleQuestionChange} autoComplete="off" />
                            <label>Options</label>
                            {question.options.map((anOption, index) => (<input name={index} className="w-full" key={index} defaultValue={anOption} />))}

                            <button className="h-8" type="submit">Submit changes to this question</button>
                        </form>
                    </div>

                )
            })}




        </>
    )
}

export default EditQuiz
