import React, {useState} from 'react'

const EditDeck = (props) => {
    const [updatedDeck, setUpdatedDeck] = useState(props.currentDeck)

    const handleSubmit = (e) => {
        
    }

    const handleChange = (event) => {
        setUpdatedDeck({ ...updatedDeck, [event.target.name]: event.target.value })
    }

    const handleCheck = () => {
        
    }


    return (
        <>
             <form className="my-3" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input className="shadow border block rounded py-1 px-3 ml-3 my-2" type="text" name="name" onChange={handleChange} defaultValue={updatedDeck.name} />
                <label className="block" htmlFor="description">Description: </label>
                <textarea className="shadow resize-none border block rounded py-1 px-3 text-gray-700 my-2" type="text" name="description" value={updatedDeck.description} onChange={handleChange} autoComplete="off"> </textarea>
                <div className="block my-3" >
                    <input type="checkbox" id="private" name="private" value="private" onChange={handleCheck} />
                    <label htmlFor="private" className="ml-2">Share with public</label>
                </div>
                <button className="h-8 rounded-md px-4 py-1 bg-gray-600 text-gray-100 mt-1" type="submit">Submit</button>
            </form>
        </>
    )
}

export default EditDeck
