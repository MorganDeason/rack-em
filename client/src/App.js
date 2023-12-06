import logo from './logo.svg';
import './App.css';
import uuid from 'react-uuid'
import { useEffect, useState, useId } from "react"
import Pairinfo from './components/PairInfo'
import NewTeamForm from './components/NewTeamForm'

function App() {

  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/teams/pairs")
      .then(res => res.json())
      .then(data => setTeams(data))
  }, [])

console.log(teams)

  const handleAddTeam = (newTeam) =>{
    fetch("http://127.0.0.1:5000/api/teams",{
      method: "POST",
      headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(newTeam)
  })
    .then(res => res.json())
    .then(data => setTeams([...teams, data]))
  }




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <NewTeamForm handleAddTeam={handleAddTeam}/>
        <h1>{teams.length > 0 ? "Here are your competitors..." : "Loading"}</h1>
        <div>
          {teams.map(team => <Pairinfo key={uuid()} team={team} />)}
        </div>
      </header>
    </div>
  );
}

export default App;
