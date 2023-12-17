import React, { useState, useEffect } from 'react'
import NewTeamForm from './NewTeamForm'
import uuid from 'react-uuid'

export default function TeamInfo() {

    const [teams, setTeams] = useState([])
    const [deleteMode, setDeleteMode] = useState(false)

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/teams")
            .then(res => res.json())
            .then(data => setTeams(data))
    }, [])

    const handleAddTeam = (newTeam) => {
        fetch("http://127.0.0.1:5000/api/teams", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTeam)
        })
            .then(res => res.json())
            .then(data => setTeams([...teams, data]))
    }

    const teamDelete = (teamId) => (e) => {
        if (deleteMode)
            fetch(`http://127.0.0.1:5000/api/teams?team_id=${teamId}`, { method: 'DELETE' })
                .then(() => fetch("http://127.0.0.1:5000/api/teams")
                    .then(res => res.json())
                    .then(data => setTeams(data))
                )
    }


    const color = deleteMode ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800"

    return (
        <div>
            <h1 className='font-bold text-5xl text-center py-8'>Available teams...</h1>
            <div className="flex flex-wrap flex-col h-96 items-center gap-y-2">
                {teams.map(team => <div className="w-20 h-20 bg-black shadow-xl rounded-full flex items-center justify-center text-white text-lg font-bold " onClick={teamDelete(team.id)} key={team.id}>{team.name}</div>)}
            </div>
            <div>
                <NewTeamForm handleAddTeam={handleAddTeam} />
            </div>
            <div className='flex items-center justify-center py-1'>
                <button className={`flex ${color} rounded-full text-white px-2 font-bold text-lg`} onClick={() => setDeleteMode(!deleteMode)}>Remove Teams</button>
            </div>
        </div>
    )
}