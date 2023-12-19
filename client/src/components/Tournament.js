import React, { useState, useEffect } from "react"
import Match from "./Match"
import { useParams } from "react-router-dom"
import { getBracketById } from "../apiUtils"

export default function Tournament({bracket, setBracket}) {

    const params = useParams()


    return (
        <div>
            <h1>{bracket.matches.winner}</h1>
            <Match key={bracket.id} match={bracket.matches} setMatch={setBracket} bracketId={params.bracketId} />
        </div>

    )
}



