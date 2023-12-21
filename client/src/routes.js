import Home from "./pages/Home"
import BracketDisplay from "./pages/BracketDisplay"
import ErrorPage from "./pages/ErrorPage"
import App from "./App"




const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/bracket/:bracketId",
                element: <BracketDisplay />,
                errorElement: <ErrorPage />
            }
        ]
    },

]

export default routes