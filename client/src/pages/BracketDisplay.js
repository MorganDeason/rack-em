import Tournament from "../components/Tournament"
import React, { useState, useEffect } from 'react'
import { getAllTeams, teamAssociation, getTeamsByBracketId, generateMatches, getBracketById } from "../apiUtils"
import CurrentTeams from "../components/CurrentTeams"
import { useParams } from "react-router-dom"

export default function BracketDisplay() {
    const params = useParams()

    const [teams, setTeams] = useState([])
    const [selectMode, setSelectMode] = useState(false)
    const [displayMode, setDisplayMode] = useState(false)
    const selectedTeams = new Set([])
    const [bracketTeams, setBracketTeams] = useState(() => getTeamsByBracketId(params.bracketId).then(data => setBracketTeams(data)))
    const [bracket, setBracket] = useState({name:"",  matches: {} })
    const color = selectMode ? "bg-green-800 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-800"
    
    useEffect(() => {
        if (bracketTeams.length > 0) {
            setDisplayMode(true)
        }
    })

    useEffect(() => {
        getAllTeams()
            .then(data => setTeams(data))
        getBracketById(params.bracketId)
            .then(bracket => {
                setBracket(bracket)
            })
    }, [])

    const handleTeamClick = (teamId) => (e) => {
        if (selectMode) {
            if (selectedTeams.has(teamId)) {
                selectedTeams.delete(teamId)
                e.target.className = "team"
            } else {
                selectedTeams.add(teamId)
                e.target.className = "selectedTeam"
            }
        }
    }

    const swapToCurrentTeamList = () => {
        teamAssociation([...selectedTeams.keys()], params.bracketId)
            .then(() => getTeamsByBracketId(params.bracketId))
            .then(data => {
                setBracketTeams(data)
                setDisplayMode(true)
                return generateMatches(params.bracketId)
            })
            .then(bracket => {
                bracket.matches = JSON.parse(bracket.matches)
                setBracket(bracket)
            })
    }

    const handleFlip = () => {
        if (displayMode) {
            return <CurrentTeams bracketTeams={bracketTeams} />
        } else {
            return <div className="flex flex-col space-y-5 items-center">
                <h1 className='font-bold text-5xl text-center py-8'>Available Teams</h1>
                <div className="flex flex-wrap flex-col h-96 items-center gap-2">
                    {teams.map(team => <div className="team" onClick={handleTeamClick(team.id)} key={team.id}>{team.name}</div>)}
                </div>
                <button className="bg-blue-500 rounded-full text-white py-2 px-4 font-bold text-xl hover:bg-blue-700" onClick={swapToCurrentTeamList}>Add Teams to Bracket</button>
                <button className={`flex ${color} rounded-full text-white px-2 font-bold text-lg`} onClick={() => setSelectMode(!selectMode)}>Select Teams to Add</button>
            </div>
        }
    }

    const setTournamentBracket = (bracket) => {
        bracket.matches = JSON.parse(bracket.matches)
        setBracket(bracket)
    }
    
    return (
        <div className="grid grid-cols-3 max-h-screen">
            <div className='col-span-1 max-h-full mr-4'>
                {handleFlip()}
            </div>
            <div className="col-span-2 h-screen ">
                <Tournament bracket={bracket} setBracket={setTournamentBracket} />
            </div>
        </div>

    )
}