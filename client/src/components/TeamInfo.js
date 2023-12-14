import React, { useState, useEffect} from 'react'
import NewTeamForm from './NewTeamForm'
import uuid from 'react-uuid'

const testTeams = ["Morgan", "Ethan", "Emmy", "Tre"]
export default function TeamInfo() {
    const [teams, setTeams] = useState([])

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







    return (
        <div className="flex flex-col space-y-3 items-center">
                <h1 className='font-bold text-3xl'>Available teams...</h1>
                {teams.map(team => <div key={team.id}>{team.name}</div>)}
            
                <NewTeamForm key={uuid()} handleAddTeam={handleAddTeam} />
        </div>
    )
}