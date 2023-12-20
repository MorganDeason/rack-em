import React, { useState } from 'react'

export default function NewTeamForm({ handleAddTeam }) {

    const [formData, setFormData] = useState({
        name: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newTeam = {
            name: formData.name,
        }
        if (formData.name !== "") {
            handleAddTeam(newTeam)
        }
        setFormData({
            name: ""
        })
    }

    return (
        <div className="flex flex-wrap max-w-full flex-col items-center">
            <form className='flex flex-row space-x-3 items-center'>
                <input
                    className='form-input rounded-full py-2'
                    name="name"
                    onChange={handleChange}
                    placeholder='Please enter a name'
                    value={formData.name}
                />
                <button onClick={handleSubmit} className="bg-blue-500 rounded-full text-white py-2 px-4 font-bold text-xl hover:bg-blue-700" type='submit'>Add Team</button>
            </form>
        </div>
    )


}