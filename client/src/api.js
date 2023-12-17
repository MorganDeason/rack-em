export const apiUrl = "http://127.0.0.1:5000"
export const bracketEndpoint = "/api/brackets"
export const teamsEndpoint = "/api/teams"

export async function getAllBrackets(){
    const res = await fetch(`${apiUrl}${bracketEndpoint}/all`)
            return await res.json()
}