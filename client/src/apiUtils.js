export const apiUrl = "http://127.0.0.1:5000"
export const bracketEndpoint = "/api/brackets"
export const teamsEndpoint = "/api/teams"


export async function getAllTeams() {
    const res = await fetch(`${apiUrl}${teamsEndpoint}`)
    return await res.json()
}

export async function getTeamsByBracketId(bracketId) {
    const res = await fetch(`${apiUrl}/api/teamsbyid?bracket_id=${bracketId}`)
    return await res.json()
}

export async function deleteTeam(teamId) {
    try {
        const res = await fetch(`${apiUrl}${teamsEndpoint}?team_id=${teamId}`, { method: 'DELETE' })
        const data = await res.json()
        if (data.error){
            console.error(data.error)
        }else{
            return data
        }
    }
    catch(error) {
        console.error(error)
    }

}

export async function createNewTeam(newTeam) {
    const res = await fetch(`${apiUrl}${teamsEndpoint}`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newTeam)
    })
    return await res.json()
}

export async function getAllBrackets() {
    const res = await fetch(`${apiUrl}${bracketEndpoint}/all`)
    return await res.json()
}

export async function getBracketById(bracketId) {
    const res = await fetch(`${apiUrl}${bracketEndpoint}?bracket_id=${bracketId}`)
    return await res.json()
}

export async function deleteBracket(bracketId) {
    return await fetch(`${apiUrl}${bracketEndpoint}?bracket_id=${bracketId}`, { method: 'DELETE' })

}

export async function updateMatchWinner(currentWinnerInfo) {
    const res = await fetch("http://127.0.0.1:5000/api/bracket", {
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentWinnerInfo)
    })
    return await res.json()
}

export async function teamAssociation(selectedTeams, bracketId) {
    return await fetch(`${apiUrl}${bracketEndpoint}/associate?bracket_id=${bracketId}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(selectedTeams)
    })
}

export async function generateMatches(bracketId) {
    const res2 = await fetch(`${apiUrl}${bracketEndpoint}/generate?bracket_id=${bracketId}`, {
        method: "POST",
    })
    return await res2.json()
}