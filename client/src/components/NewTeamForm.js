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
        if (formData.name !== ""){
            handleAddTeam(newTeam)
        }
        setFormData({
            name: ""
        })
    }

    return (
        <div>
            <h1>Add a Team!</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    name="name"
                    onChange={handleChange}
                    placeholder='Please enter a name'
                    value={formData.name}
                />
                <input type='submit'/>
            </form>
        </div>
    )


}