import React from 'react';
import TeamDisplay from './TeamDisplay';

export default function TeamsToAdd({ teams }) {


    return (
        <>
        {teams.map(team => <TeamDisplay key={team.id} team={team} />)}

        </>
    )
}