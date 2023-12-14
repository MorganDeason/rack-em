import logo from './logo.svg';
import './App.css';
import uuid from 'react-uuid'
import { useEffect, useState } from "react"
import NewTeamForm from './components/NewTeamForm'
import TeamInfo from './components/TeamInfo'
import Match from './components/Match';
import Bracket from './components/Tournament'
import Tournament from './components/Tournament';

function App() {

  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/teams")
      .then(res => res.json())
      .then(data => setTeams(data))
  }, [])

  // console.log(matches)

  const handleAddTeam = (newTeam) => {
    fetch("http://127.0.0.1:5000/api/teams", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTeam)
    })
      .then(res => res.json())
      .then(data => setTeams([...teams, data]))
  }




  


  const displayBracket = () => {
    fetch("http://127.0.0.1:5000/api/bracket")
      .then(res => res.json())
      .then(data => setMatches(data))
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <NewTeamForm handleAddTeam={handleAddTeam} />
        <h1>{teams.length > 0 ? "Here are your competitors..." : "Loading"}</h1>
        <div style={{ display: "flex" }}>
          <div style={{ paddingRight: "250px" }}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={displayBracket}>Generate Bracket</button>
            <ol>
              {teams.map(team => <TeamInfo key={uuid()} team={team.name} />)}
            </ol>
          </div>
          <div>
            {matches.map(match => <Tournament key={match.id} match={match} setMatches={setMatches} />)}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
