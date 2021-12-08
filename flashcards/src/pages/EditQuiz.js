import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const EditQuiz = (props) => {
    const [updatedQuiz, setUpdatedQuiz] = useState(props.currentQuiz)
    const [checkbox, setCheckbox] = useState(!props.currentQuiz.private)

    const navigate = useNavigate()
    const handleChange = (event) => {
        setQuiz({ ...quiz, [event.target.name]: event.target.value })
    }
    const handleCheck = (event) => {
        setCheckbox(!checkbox)
        setQuiz({...updatedQuiz, ["private"]: checkbox})

        
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
            <h1>Edot quiz</h1>

            <form className="my-3" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={handleChange} defaultValue={updatedQuiz.name} />
                <label className="block" htmlFor="description">Description: </label>
                <textarea className="shadow resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="description" value={updatedQuiz.description} onChange={handleChange} autoComplete="off"> </textarea>
                <div className="block my-3" >
                    <input className="inline" type="checkbox" id="private" name="private" value="private" onChange={handleCheck} />
                    <label htmlFor="private" className="ml-2">Share with public</label>
                </div>
                <button className="h-8" type="submit">Submit</button>
            </form>

        </>
    )
}

export default EditQuiz
