import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";


export default function App() {
    return (
        <div className="max-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-blue-700 to-gray-800">
            <NavBar />

            <Outlet />
        </div>
    )
}