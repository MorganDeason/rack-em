import React from "react"
import Match from "./Match"
import { useParams } from "react-router-dom"

export default function Tournament({bracket, setBracket}) {

    const params = useParams()

    return (
        <div className="w-2/3 mac-h-full content-center">
            <h1>{bracket.matches.winner}</h1>
            <Match key={bracket.id} match={bracket.matches} setMatch={setBracket} bracketId={params.bracketId} />
        </div>

    )
}



