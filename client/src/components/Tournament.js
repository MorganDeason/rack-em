import React, { useState, useEffect } from "react"
import Match from "./Match"
import { useParams } from "react-router-dom"

export default function Tournament() {

    const params = useParams()

    const [bracket, setBracket] = useState({})
    const [bracketId, setBracketId] = useState()

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/brackets?bracket_id=${params.bracketId}`)
            .then(response => response.json())
            .then(data => {
                setBracket(data.matches)
                setBracketId(data.id)
            })
    }, [])
    console.log(bracket)
    


    return (
        <div>

            <div className="text-blue-600">
                <h3>Hopefully a tournament soon</h3>
            </div>
            <Match key={bracket.id} match={bracket} setMatch={setBracket} bracketId={bracketId}/>

        </div>

    )
}



