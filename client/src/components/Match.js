import React from 'react'
import uuid from 'react-uuid'
import { useState } from 'react'



export default function Match({ match, setMatches }) {

    const [currentWinnerInfo, setCurrentWinnerInfo] = useState({
        "matchId": '',
        "submatchId": ''
    })

    const handleChange = (match, currentSubmatch) => {
        setCurrentWinnerInfo({ "matchId": match.id, "submatchId": match.submatches[currentSubmatch].id });
        // console.log(match)
        setMatchWinner(currentWinnerInfo)
        // setCurrentWinnerInfo({
        //     "matchId": '',
        //     "submatchId": ''
        // })
    }

    const setMatchWinner = (currentWinnerInfo) => {
        console.log(currentWinnerInfo)
        fetch("http://127.0.0.1:5000/api/bracket", {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentWinnerInfo)
        })
            .then(res => res.json())

            .then(data => setMatches(data))
            // .then(data => console.log(data))

        
    }









    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="bg-gray-200 w-25 h-25 flex items-center justify-center border border-gray-400 rounded-md">
                    {match.winner}
                </div>
                {match.submatches.length > 0 && (
                    <div className="flex mt-2 space-x-4">
                        <Match key={match.submatches[0].id} match={match.submatches[0]} setMatches={setMatches} />
                        <button
                            onClick={() => handleChange(match, 0)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {`${match.submatches[0].winner} WINS!`}
                        </button>
                    </div>
                )}
                {match.submatches.length > 0 && (
                    <div className="flex mt-2 space-x-4">
                        <Match key={match.submatches[1].id} match={match.submatches[1]} setMatches={setMatches} />
                        <button
                            onClick={() => handleChange(match, 1)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {`${match.submatches[1].winner} WINS!`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

