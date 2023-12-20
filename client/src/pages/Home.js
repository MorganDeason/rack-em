import { useEffect, useState } from "react"
import { getAllTeams } from "../apiUtils";
import TeamList from '../components/TeamList'
import BracketList from '../components/BracketList';


export default function Home() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    getAllTeams()
      .then(data => setTeams(data))
  }, [])

  return (
    <div className='flex flex-nowrap'>
      <div className='w-1/3 max-h-full mr-4'>
        <TeamList teams={teams} setTeams={setTeams} />
      </div>
      <div className='w-2/3 max-h-full'>
        <BracketList />
      </div>
    </div>
  );
}


