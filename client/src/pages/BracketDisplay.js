import Tournament from "../components/Tournament"
import React, { useState, useEffect } from 'react'
import { getAllTeams, teamAssociation, getTeamsByBracketId, generateMatches, getBracketById } from "../apiUtils"
import { Link } from "react-router-dom"
import CurrentTeams from "../components/CurrentTeams"
import { useParams } from "react-router-dom"

export default function BracketDisplay() {
    const params = useParams()

    const [teams, setTeams] = useState([])
    const [selectMode, setSelectMode] = useState(false)
    const [displayMode, setDisplayMode] = useState(false)
    const selectedTeams = new Set([])
    const [bracketTeams, setBracketTeams] = useState([])
    const [bracket, setBracket] = useState({matches: {}})

    useEffect(() => {
        getAllTeams()
            .then(data => setTeams(data))
        getBracketById(params.bracketId)
            .then(bracket => {
                console.log(bracket)
                
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

    const color = selectMode ? "bg-green-800 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-800"

    const swapToCurrentTeamList = () => {
        teamAssociation([...selectedTeams.keys()], params.bracketId)
            .then(() => getTeamsByBracketId(params.bracketId))

            .then(data => {
                setBracketTeams(data)
                setDisplayMode(!displayMode)
                return generateMatches(params.bracketId)
            })
            .then(bracket => {
                bracket.matches = JSON.parse(bracket.matches)
                console.log(bracket)
                setBracket(bracket)
            })
    }

    const handleFlip = () => {
        if (displayMode) {
            return <CurrentTeams bracketTeams={bracketTeams} />
        } else {
            return <>
                {teams.map(team => <div className="team" onClick={handleTeamClick(team.id)} key={team.id}>{team.name}</div>)}
                <button className="bg-blue-500 rounded-full text-white py-2 px-4 font-bold text-xl hover:bg-blue-700" onClick={swapToCurrentTeamList}>Add Teams to Bracket</button>
                <button className={`flex ${color} rounded-full text-white px-2 font-bold text-lg`} onClick={() => setSelectMode(!selectMode)}>Select Teams to Add</button>
            </>
        }
    }

    const setTournamentBracket = (bracket) => {
        
        bracket.matches = JSON.parse(bracket.matches)
        setBracket(bracket)
    }

    return (
        <div className="flex flex-nowrap">
            <Link className="font-bold text-2xl" to={"/"}>GO BACK HOME</Link>
            <div className="flex flex-wrap flex-col h-96 items-center gap-y-2">
                {handleFlip()}
            </div>
            <div className="w-2/3 mac-h-full content-center">
                <Tournament bracket={bracket} setBracket={setTournamentBracket} />
            </div>
        </div>

    )
}