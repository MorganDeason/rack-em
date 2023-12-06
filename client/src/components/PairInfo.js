import React from 'react'
import TeamInfo from './TeamInfo'
import uuid from 'react-uuid'



export default function PairInfo({ team }) {
    
    return (
        <ul>
            <TeamInfo key={uuid()} team={team[0]}/>
            <TeamInfo key={uuid()} team={team[1]}/>
        </ul>
    )
}


