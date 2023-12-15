import Tournament from "../components/Tournament"
import TeamInfo from "../components/TeamInfo"
import { Link } from "react-router-dom"

export default function BracketDisplay() {








    return (
        <div className="flex flex-nowrap">
            <Link className="font-bold text-2xl" to={"/"}>GO BACK HOME</Link>
            <div className="w-1/3 max-h-full mr-4">
                <TeamInfo />
            </div>
            <div className="w-2/3 mac-h-full content-center">
                <Tournament />
            </div>
        </div>

    )
}