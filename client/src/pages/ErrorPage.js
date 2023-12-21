
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)
    
    return (
        <>
        <main>
            <h1>Whoops! Something went wrong!</h1>
        </main>
        </>
    )
}