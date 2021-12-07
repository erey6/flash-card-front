import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const Question = (props) => {
    const { currentQuiz, quizQuestions, currentUser } = props
    const [queryIndex, setQueryIndex] = useState(0)
    const [correct, setCorrect] = useState(quizQuestions[queryIndex].options[0])
    const [answerOptions, setAnswerOptions] = useState(quizQuestions[queryIndex].options)
    const [randomOrder, setRandomOrder] = useState([2,0,1])
    const [chosen, setChosen] = useState()
    const [score, setScore] = useState(0)
    const [onQuestion, setOnQuestion] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [answeredCorrect, setAnsweredCorrect] = useState()


    const handleChange = (e) => {
        setChosen(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setOnQuestion(onQuestion+1)
        setAnswered(true)
        if(chosen===correct) {
            console.log("yay!")
            setScore(score+1)
        } else {
            console.log("boo")
        }
    }

    //get a random order for the options
    useEffect(() => {
        const nums = Array.from(Array(answerOptions.length).keys())
        const rndNums = nums.sort((a, b) => 0.5 - Math.random())
        setRandomOrder(rndNums)
    }, [answerOptions])

    return (
        <>
            <h1>{currentQuiz.name}</h1>
            <h3 className="my-3">{currentQuiz.description}</h3>
            <h4 className="my-2">There will be {answerOptions.length} questions in this quiz. Good luck!</h4>
            <h4 className="my-2">Your score: {score} / {onQuestion} </h4>
            <div className="mb-4 border-4 p-6 rounded-sm ">
            
                <p className="Question">
                    Q: {quizQuestions[queryIndex].query}
                </p>
                <form onSubmit={handleSubmit}>
                {randomOrder.map((index) => {
                     return(
                        <div>
                         
                            <input
                            className="inline mr-2"
                              type="radio"
                              name="answer"
                              value={answerOptions[index]}
                              onChange={handleChange}
                              
                            /> <label>
                            {answerOptions[index]}
                          </label>
                        </div>
                     )
                })}
                <button type="submit">Check answer</button>
                 </form>
            </div>


        </>
    )
}

export default Question
