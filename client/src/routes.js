import Home from "./pages/Home"
import BracketDisplay from "./pages/BracketDisplay"
import ErrorPage from "./pages/ErrorPage"




const routes = [
    {
        path:"/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path:"/bracket/:bracketId",
        element: <BracketDisplay />,
        errorElement: <ErrorPage />
    }
]

export default routes