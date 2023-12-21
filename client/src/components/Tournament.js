import React from "react"
import Match from "./Match"
import { useParams } from "react-router-dom"

export default function Tournament({ bracket, setBracket}) {

    const params = useParams()

    const handleFlip = () => {
        if (bracket.matches.winner) {
            return (
                <section className="stage">
                    <figure className="ball">
                        <span className="shadow"></span>
                        <span className="eight"><div className="ballz">{`${bracket.matches.winner} is your Winner!!!`}</div></span>
                    </figure>
                </section>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (    
            <div className="grid grid-cols-1 items-center w-full">
                <h1 className='font-bold text-5xl text-center py-8'>{bracket.name}</h1>
                {handleFlip()}
                {bracket.matches ? <Match key={bracket.id} match={bracket.matches} setMatch={setBracket} bracketId={params.bracketId} handleWinner={() => { }} /> : <></>}
            </div>
    )
}






