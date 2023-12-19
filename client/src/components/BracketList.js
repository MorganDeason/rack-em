import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiUrl, bracketEndpoint, getAllBrackets, deleteBracket, generateMatches } from "../apiUtils"

export default function BracketList() {

    const [brackets, setBrackets] = useState([])
    const [deleteMode, setDeleteMode] = useState(false)

    useEffect(() => {
        getAllBrackets()
            .then(data => setBrackets(data))
    }, [])

    const bracketDelete = (bracketId) => (e) => {
        if (deleteMode) {
            deleteBracket(bracketId)
            .then(() => getAllBrackets())
            .then(data => setBrackets(data))
        }
    }

    const bracketItem = (bracket) => {
        const style = "border-4 border-zinc-400 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 to-green-600 rounded-full flex text-center justify-center w-1/2 h-8"
        if (deleteMode) {
            return <div className={style} key={bracket.id} onClick={bracketDelete(bracket.id)}>{bracket.id}</div>
        }
        else {
            return <Link className={style} key={bracket.id} to={`/bracket/${bracket.id}`}>{bracket.id}</Link>
        }

    }

    const generateBracket = async () => {
        const res = await fetch(`${apiUrl}${bracketEndpoint}`, { method: "POST" })
        const data = await res.json()
        // // const data2 = await generateMatches(data.id)
        setBrackets([...brackets, data])
    }
    const color = deleteMode ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800"
    return (
        <div className="flex flex-col space-y-5 items-center">
            <h1 className='font-bold text-5xl text-center py-8'>Current Tournaments</h1>
            {brackets.map(bracketItem)}
            <button className="bg-blue-500 rounded-full text-white py-2 px-4 font-bold text-xl hover:bg-blue-700" onClick={generateBracket}>Generate New Bracket</button>
            <button className={`flex ${color} rounded-full text-white px-2 font-bold text-lg`} onClick={() => setDeleteMode(!deleteMode)}>Remove Bracket</button>
        </div>
    )
}