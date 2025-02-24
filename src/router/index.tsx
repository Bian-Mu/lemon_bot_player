import { createBrowserRouter, } from "react-router-dom";

//import components
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/playerv2",
                element: <App />,
            }
        ]
    },

])

export default router;