import React from 'react'
import { useState } from 'react'
import { updateMatchWinner } from '../apiUtils'


export default function Match({ bracketId, match, setMatch }) {

    const handleChange = (match, currentSubmatch) => {
        setMatchWinner({ "matchId": match.id, "submatchId": match.submatches[currentSubmatch].id, "bracketId": bracketId });
    }

    const setMatchWinner = (currentWinnerInfo) => {
        updateMatchWinner(currentWinnerInfo)
            .then(data => setMatch(data))
    }

    return (
        <div className="flex flex-col items-center">
            {match.submatches && match.submatches.length > 0 && (
                <>
                    <div className="flex items-center justify-center space-x-4 space-y-4 w-64">
                        <Match key={match.submatches[0].id} match={match.submatches[0]} setMatch={setMatch} bracketId={bracketId} />
                        <button
                            onClick={() => handleChange(match, 0)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md w-50">
                            {`${match.submatches[0].winner} WINS!`}
                        </button>
                    </div>
                    <div className="flex items-center justify-center space-x-4 space-y-2">
                        <Match key={match.submatches[1].id} match={match.submatches[1]} setMatch={setMatch} bracketId={bracketId} />
                        <button
                            onClick={() => handleChange(match, 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {`${match.submatches[1].winner} WINS!`}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
