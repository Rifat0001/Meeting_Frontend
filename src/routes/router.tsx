import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/about-us",
                element: <About />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
])