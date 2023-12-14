import React from "react"
import Match from "./Match"

export default function Tournament({ match, setMatches }) {



    return (
        <div>

            <div className="text-blue-600">
                <h3>Hopefully a tournament soon</h3>
            </div>
            <Match key={match.id} match={match} setMatches={setMatches} />

        </div>

    )
}



