import React from "react"
import { Link } from "react-router-dom"


export default function NavBar() {
    return (
        <div className="navbar bg-base-100 sticky top-0">
            <div className="flex-1">
                <Link  className="btn btn-ghost text-2xl" to="/">Rack 'Em</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    
                    <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}