import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function BracketList() {

    const [brackets, setBrackets] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/brackets/all")
            .then(res => res.json())
            .then(data => setBrackets(data))
    }, [])
    // console.log(brackets)
    const generateBracket = () => {
        fetch("http://127.0.0.1:5000/api/brackets", {
            method: "POST",
        })
        .then(res => res.json())
        .then(data => fetch(`http://127.0.0.1:5000/api/brackets/generate?bracket_id=${data.id}`,{
            method: "POST",
        }))
        .then(res => res.json())
        .then(data => setBrackets([...brackets,data]))
        
    }

    return (
        <div className="flex flex-col space-y-3 items-center">
            <h1>Available Tournaments</h1>
                {brackets.map(bracket => <Link  className="bg-stone-400 rounded text-center w-2/4" key={bracket.id} to={`/bracket/${bracket.id}`}>{bracket.id}</Link>)}
            <button onClick={generateBracket}>Generate New Bracket</button>
        </div>
    )
}