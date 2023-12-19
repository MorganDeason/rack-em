import React, { useState, useEffect } from "react";

export default function CurrentTeams({ bracketTeams }) {

    return (
        <>
            {bracketTeams.map(team => <div className=" team" key={team.id}>{team.name}</div>)}
        </>
    )
}