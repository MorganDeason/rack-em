import React from "react";

export default function CurrentTeams({ bracketTeams }) {

    return (
        <div className="flex flex-col space-y-5 items-center">
            <h1 className='font-bold text-3xl text-center py-8'>Current teams in your tournament</h1>
                <div className="flex flex-wrap flex-col h-96 items-center gap-2">
                    {bracketTeams.map(team => <div className=" team" key={team.id}>{team.name}</div>)}
                </div>
        </div>
    )
}