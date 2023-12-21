import React, { useState } from 'react'
import NewTeamForm from './NewTeamForm'
import { getAllTeams, createNewTeam, deleteTeam } from '../apiUtils'



export default function TeamList({ teams, setTeams }) {

    const [deleteMode, setDeleteMode] = useState(false)

    const handleAddTeam = (newTeam) => {
        createNewTeam(newTeam)
            .then(data => setTeams([...teams, data]))
    }

    const handleTeamClick = (teamId) => (e) => {
        if (deleteMode)
            deleteTeam(teamId)
                .then(() => getAllTeams())
                .then(data => setTeams(data))
    }

    const color = deleteMode ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800"

    return (
        <div className="flex flex-col space-y-5 items-center">
            <h1 className='font-bold text-5xl text-center py-8'>All Teams</h1>
            <div className="flex flex-wrap flex-col h-96 items-center gap-2">
                {teams.map(team => <figure className={`circle${Math.floor(Math.random() * 6)}`} onClick={handleTeamClick(team.id)} key={team.id}>{team.name}</figure>)}
            </div>
            <div >
                <NewTeamForm className='space-y-3' handleAddTeam={handleAddTeam} />
            </div>
            <div className='flex items-center justify-center py-1'>
                <button className={`flex ${color} rounded-full text-white px-2 font-bold text-lg`} onClick={() => setDeleteMode(!deleteMode)}>Remove Teams</button>
            </div>
        </div>
    )
}


