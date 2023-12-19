import React, { useState, useEffect } from 'react'
import NewTeamForm from './NewTeamForm'
import { getAllTeams, createNewTeam, deleteTeam } from '../apiUtils'



export default function TeamList({teams, setTeams}) {

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
        <div>
            <h1 className='font-bold text-5xl text-center py-8'>Available teams...</h1>
            <div className="flex flex-wrap flex-col h-96 items-center gap-y-2">
                {teams.map(team => <div className=" team" onClick={handleTeamClick(team.id)} key={team.id}>{team.name}</div>)}
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


