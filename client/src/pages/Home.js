import uuid from 'react-uuid'
import { useEffect, useState } from "react"
import NewTeamForm from '../components/NewTeamForm';
import TeamInfo from '../components/TeamInfo'
import BracketList from '../components/BracketList';


export default function Home() {

  return (
    <div className='flex flex-nowrap h-screen '>
      <div className='w-1/3 max-h-full mr-4'>
        <div>
          <TeamInfo />
        </div>
      </div>
      <div className='w-2/3 max-h-full'>
        <BracketList />
      </div>
    </div>

  );
}


