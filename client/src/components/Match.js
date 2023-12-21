import React from 'react'
import { updateMatchWinner } from '../apiUtils'



export default function Match({ bracketId, match, setMatch, handleWinner }) {

    const handleChange = (match, currentSubmatch) => {
        setMatchWinner({ "matchId": match.id, "submatchId": match.submatches[currentSubmatch].id, "bracketId": bracketId });
    }

    const setMatchWinner = (currentWinnerInfo) => {
        updateMatchWinner(currentWinnerInfo)
            .then(data => setMatch(data))
    }

    const displaySubmatch = (match, idx) => {
        const submatch = match.submatches[idx]
        return (
            <Match key={submatch.id} match={submatch} setMatch={setMatch} bracketId={bracketId} handleWinner={() => handleChange(match, idx)} />
        )
    }

    return (
        <div className='space-x-2'>
            <div className='grid grid-rows-1 w-full'>
                {match.winner ? <div className={`text-xl text-center mb-2 p-3 place-self-center circle${Math.floor(Math.random() * 6)}`} onClick={handleWinner}>{match.winner}</div> : <div className=" text-white p-5 rounded-md text-center"></div>}
            </div>
            <div className='grid grid-cols-2 space-x-2'>
                {match.submatches && match.submatches[0] ? displaySubmatch(match, 0) : <></>}
                {match.submatches && match.submatches[1] ? displaySubmatch(match, 1) : <></>}
            </div>
        </div>
    )
}


// return (
//     <div className="space-x-2">
//         {match.submatches && match.submatches.length > 0 && (
//             <>
//                 <div className="flex items-center justify-center space-x-4 space-y-6 w-64">
//                     <Match key={match.submatches[0].id} match={match.submatches[0]} setMatch={setMatch} bracketId={bracketId} />
//
//                         {match.submatches[0].winner ? `${match.submatches[0].winner} WINS!`: "Waiting for teams"}
//                     </button>
//                 </div>
//                 <div className="flex items-center justify-center space-x-4 space-y-2">
//                     <Match key={match.submatches[1].id} match={match.submatches[1]} setMatch={setMatch} bracketId={bracketId} />
//                     <button
//                         onClick={() => handleChange(match, 1)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit">
//                         {match.submatches[1].winner ? `${match.submatches[1].winner} WINS!`: "Waiting for teams"}
//                     </button>
//                 </div>
//             </>
//         )}
//     </div>
// );
