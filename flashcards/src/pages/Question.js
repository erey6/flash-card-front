import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const Question = (props) => {
    const { currentQuiz, quizQuestions, currentUser } = props
    const [queryIndex, setQueryIndex] = useState(0)
    // const [correct, setCorrect] = useState(quizQuestions[queryIndex].options[0])
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
        if(chosen==="0") {
            console.log(chosen)
            setAnsweredCorrect(true)
            setScore(score+1)
        } else {
            setAnsweredCorrect(false)
        }
    }

    const nextQuestion = () => {
        setAnswered(!answered)
        setAnsweredCorrect(null)
        setQueryIndex(queryIndex+1)
    }

    //get a random order for the options
    useEffect(() => {
        const nums = Array.from(Array(answerOptions.length).keys())
        const rndNums = nums.sort((a, b) => 0.5 - Math.random())
        setRandomOrder(rndNums)
    }, [answerOptions])

    //if query index changes get new answer Options
    useEffect(() => {
        setAnswerOptions(quizQuestions[queryIndex].options)
        
    }, [queryIndex])

    return (
        <>
            <h1>{currentQuiz.name}</h1>
            <h3 className="my-3">{currentQuiz.description}</h3>
            <h4 className="my-2">There will be {quizQuestions.length} questions in this quiz. Good luck!</h4>
            <h4 className="my-2">Your score: {score} / {onQuestion} </h4>
            <div className="mb-4 border-4 p-6 rounded-sm ">
            
                <p className="Question">
                    Q: {quizQuestions[queryIndex].query}
                </p>
                <form onSubmit={handleSubmit}>
                {randomOrder.map((i) => {
                     return(
                        <div>
                         
                            <input
                            className="inline mr-2"
                              type="radio"
                              name="answer"
                              value={i}
                              onChange={handleChange}
                              
                            /> <label>
                            {answerOptions[i]}
                          </label>
                        </div>
                     )
                })}
                {!answered && <button type="submit">Check answer</button>}
                 </form>
                 {(answered && answeredCorrect ===true) && <h3 className="mr-3 inline text-green-600">Correct!</h3>}
                 {(answered && answeredCorrect ===false) &&  <h3 className="mr-3 inline text-red-600">Wrong</h3> }
                 {(answered && queryIndex < quizQuestions.length-1) && <button type="button" className="bg-green-400 hover:bg-green-600" onClick={nextQuestion}> Next question</button> }
            </div>


        </>
    )
}

export default Question
