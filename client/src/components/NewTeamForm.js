import React, { useState } from 'react'




export default function NewTeamForm({ handleAddTeam }) {

    const [formData, setFormData] = useState({
        name: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        console.log("Hello world")
        e.preventDefault()
        const newTeam = {
            name: formData.name,
        }
        if (formData.name !== ""){
            handleAddTeam(newTeam)
        }
        setFormData({
            name: ""
        })
    }

    return (
        <div className="flex flex-wrap max-w-full flex-col space-y-3 items-center">
            <form className='flex flex-row space-x-3'>
                <label className='text-3xl'>Add a Team: </label>
                <input
                className='form-input rounded-full'
                    name="name"
                    onChange={handleChange}
                    placeholder='Please enter a name'
                    value={formData.name}
                />
                <button onClick={handleSubmit} className="bg-blue-500 rounded-full text-white py-2 px-4 font-bold text-xl hover:bg-blue-700" type='submit'>Submit</button>
            </form>
        </div>
    )


}