import React from "react"
import { Link } from "react-router-dom"


export default function NavBar() {
    return (
        <div className="navbar bg-base-100 sticky top-0 max-w-screen">
            <div className="flex-1">
                <Link className="btn btn-ghost text-2xl" to="/">Rack 'Em</Link>
            </div>
            <div className="flex justify-end">
                <ul className="menu menu-horizontal px-1 w-52">
                    <li>
                        <details>
                            <summary>
                                Rules
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none w-44">
                                <li><a href="https://poolplayers.com/8-9-ball-Rules.pdf">APA 8/9 Ball</a></li>
                                <li><a href="https://www.billiards.com/blogs/articles/official-bca-9-ball-rules">BCA 9 Ball</a></li>
                                <li><a href="https://www.billiards.com/blogs/articles/official-bca-8-ball-rules">BCA 8 Ball</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}