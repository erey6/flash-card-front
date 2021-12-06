import React, {useState} from 'react'
import axios from 'axios'

const EditCard = (props) => {

    const [newFront, setNewFront] = useState(props.changingCard.front)
    const [newBack, setNewBack] = useState(props.changingCard.back)
    const [newCard, setNewCard] = useState(props.changingCard)
    
    const handleOnChange = (e) => {
        setNewCard({...newCard, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        props.editCard(newCard)
    }

    const handleCancel = () => {
        props.setTargetCard(false)
    }

    return (
        <>
            <h1 className="mt-9">Edit Card</h1>
            <form>
            <div className="p-4 my-6 bg-gray-300 rounded-sm border-2 border-gray-300">             
                <div className="my-3">
                    <h3>Front</h3>
                    <input className="shadow bg-gray-100  resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" name="front" value={newCard.front} onChange={handleOnChange}/>
                       
                    <h3>Back: </h3>
                    <input className="shadow bg-gray-100 resize-vertical border block rounded py-1 px-3 text-gray-700 my-2" name="back" value={newCard.back} onChange={handleOnChange}/>
                </div>
                <button type="submit" className="h-6 rounded-md px-4 bg-green-600 text-gray-100 mt-1 mr-3" onClick={handleSubmit}
                            >Submit Card Edits</button>
            </div>
            </form>
            <button className="h-6 rounded-md px-4 bg-red-600 text-gray-100 mt-1 mr-3"
                            onClick={handleCancel}
                            >Cancel Card Edits</button>
        </>
    )
}

export default EditCard
