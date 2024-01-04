import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiUrl, bracketEndpoint, getAllBrackets, deleteBracket } from "../apiUtils"

export default function BracketList() {

    const [brackets, setBrackets] = useState([])
    const [deleteMode, setDeleteMode] = useState(false)
    const color = deleteMode ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800"
    const [formData, setFormData] = useState({
        name: ""
    })

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getAllBrackets()
            .then(data => setBrackets(data))
    }, [])

    const bracketDelete = (bracketId) => (e) => {
        if (deleteMode) {
            deleteBracket(bracketId)
                .then(() => getAllBrackets())
                .then(data => setBrackets(data))
        }
    }

    const generateBracket = async (formData) => {
        const res = await fetch(`${apiUrl}${bracketEndpoint}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)

        })
        console.log(formData)
        const data = await res.json()
        setBrackets([...brackets, data])
    }

    const bracketItem = (bracket) => {
        const style = "border-4 border-zinc-400 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 to-green-600 rounded-full flex text-center text-black justify-center w-3/4 h-8"
        if (deleteMode) {
            return <div className={style} key={bracket.id} onClick={bracketDelete(bracket.id)}>{bracket.name}</div>
        } else {
            return <Link className={style} key={bracket.id} to={`/bracket/${bracket.id}`}>{bracket.name}</Link>
        }
    }

    return (
        <div className="flex flex-col space-y-5 items-center">
            <h1 className='font-bold text-5xl text-center py-8'>Current Tournaments</h1>
            <div className="flex flex-wrap flex-col w-2/3 h-96 items-center gap-y-2">
                {brackets.map(bracketItem)}
            </div>
            <form className='flex flex-row space-x-3 items-center'>
                <input
                    className='form-input rounded-full'
                    name="name"
                    onChange={handleFormChange}
                    placeholder="Enter a tournament name..."
                    value={formData.name}
                />
                <button className="bg-blue-500 rounded-full text-white py-2 px-4 font-bold text-xl hover:bg-blue-700" onClick={() => generateBracket(formData)} type="submit">Generate Tournament</button>
            </form>
            <button className={`flex ${color} rounded-full text-white px-2 font-bold text-lg`} onClick={() => setDeleteMode(!deleteMode)}>Remove Tournament</button>
        </div>
    )
}