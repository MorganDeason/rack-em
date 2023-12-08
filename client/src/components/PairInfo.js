import React from 'react'
import TeamInfo from './TeamInfo'
import uuid from 'react-uuid'



export default function PairInfo({ pair }) {
    // console.log(pair)
    return (
        <ul>
            <TeamInfo key={uuid()} team={pair[0]}/>
            <TeamInfo key={uuid()} team={pair[1]}/>
        </ul>
    )
}


